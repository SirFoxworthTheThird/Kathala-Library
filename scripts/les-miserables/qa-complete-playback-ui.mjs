import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {createServer} from 'node:http'

const appRoot=process.env.KATHALA_QA_APP_ROOT
assert.ok(appRoot,'Set KATHALA_QA_APP_ROOT')
const root=import.meta.dirname,base=process.env.KATHALA_QA_URL??'http://127.0.0.1:5178'
const qa=path.join(root,'qa','complete-playback-ui')
await fs.mkdir(qa,{recursive:true})
const require=createRequire(path.join(appRoot,'package.json')),{chromium}=require('playwright')
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server']})
const page=await browser.newPage({viewport:{width:1600,height:1100}}),errors=[]
page.on('pageerror',e=>errors.push(e.message))
page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
const report={scope:'Actual continuous Play through every ordered scene using the browser test clock; not real-time reading, source-state or artwork approval',checks:[],errors}
let server
try{
 const json=await fs.readFile(path.join(root,'qa','world-review.pwk'),'utf8'),fixture=JSON.parse(json),worldId=fixture.world.id
 report.fixtureSha256=createHash('sha256').update(json).digest('hex')
 report.applicationCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:appRoot,encoding:'utf8'}).trim()
 report.applicationDiffSha256=createHash('sha256').update(execFileSync('git',['diff','--binary','HEAD'],{cwd:appRoot})).digest('hex')
 const numbers=new Map(fixture.chapters.map(c=>[c.id,c.number]))
 const events=[...fixture.events].sort((a,b)=>(numbers.get(a.chapterId)-numbers.get(b.chapterId))||a.sortOrder-b.sortOrder)
 const locations=new Map(fixture.locationMarkers.map(l=>[l.id,l]))
 const firstMap=fixture.mapLayers.find(m=>!m.parentMapId)
 assert.ok(firstMap&&events.length)
 await page.goto(base,{waitUntil:'domcontentloaded'})
 server=createServer((request,response)=>{if(request.url!=='/fixture'){response.writeHead(404);response.end();return}response.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':base});response.end(json)})
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve))
 const url=`http://127.0.0.1:${server.address().port}/fixture`
 assert.equal(await page.evaluate(async url=>{const text=await fetch(url).then(r=>r.text()),{importWorldFromJson}=await import('/src/lib/exportImport.ts');return importWorldFromJson(text)},url),worldId)
 await page.evaluate(async([worldId,eventId,mapId])=>{
  const{useAppStore}=await import('/src/store/index.ts'),s=useAppStore.getState()
  s.setActiveWorldId(worldId);s.setActiveEventId(eventId);s.setActiveMapLayerId(mapId)
  window.__qaPlaybackStore=useAppStore;window.__qaEventTrace=[eventId]
  useAppStore.subscribe((s,p)=>{if(s.activeEventId!==p.activeEventId)window.__qaEventTrace.push(s.activeEventId)})
 },[worldId,events[0].id,null])
 await page.goto(`${base}/#/worlds/${worldId}/maps`)
 // The preface legitimately reveals no maps yet; playback is still available.
 await page.getByRole('button',{name:'Play story on the map',exact:true}).waitFor({timeout:60000})
 // Only timers are controlled. No event cursor is assigned after this setup.
 await page.clock.install()
 await page.getByRole('button',{name:'Play story on the map',exact:true}).click()
 await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now())+100))
 for(let index=0;index<events.length;index++){
  const event=events[index]
  // React/Dexie and image work complete between clock steps; only a movement
  // queue may consume further virtual animation frames in the current scene.
  let state
  for(let turn=0;turn<120;turn++){
   const active=await page.evaluate(()=>window.__qaPlaybackStore.getState().activeEventId)
   if(active===event.id)break
   assert.equal(active,events[index-1]?.id,`Playback skipped scene ${index}`)
   await page.clock.runFor(100)
  }
  await page.clock.runFor(50)
  const animationBudgetMs=Math.max(30_000,((event.involvedCharacterIds?.length??0)+2)*8_000)
  let animationMs=0
  for(let turn=0;turn<=animationBudgetMs/100;turn++){
   state=await page.evaluate(()=>{const s=window.__qaPlaybackStore.getState();return{eventId:s.activeEventId,mapId:s.activeMapLayerId,playing:s.isPlayingStory,animating:s.isAnimating}})
   assert.equal(state.eventId,event.id,`Playback skipped scene ${index}`)
   if(!state.animating)break
   await page.clock.runFor(100)
   animationMs+=100
  }
  assert.equal(state.animating,false,`Animation did not settle: ${event.id}`)
  const place=locations.get(event.locationMarkerId)
  // Marker focus dispatch is asynchronous; give it rendering frames without
  // advancing the reading hold far enough to reach another scene.
  if(place&&state.mapId!==place.mapLayerId){await page.clock.runFor(100);state=await page.evaluate(()=>{const s=window.__qaPlaybackStore.getState();return{eventId:s.activeEventId,mapId:s.activeMapLayerId,playing:s.isPlayingStory,animating:s.isAnimating}})}
  assert.equal(state.eventId,event.id)
  if(place)assert.equal(state.mapId,place.mapLayerId,`Wrong playback map: ${event.id}`)
  assert.equal(state.playing,true)
  report.checks.push({eventId:event.id,mapId:state.mapId,animationMs,animationBudgetMs})
  if(index===0||index===events.length-1||fixture.characterMovements.some(m=>m.eventId===event.id))await page.screenshot({path:path.join(qa,`${index}-${event.id.split('-event-').at(-1)}.png`)})
  const hold=await page.evaluate(async event=>{
   const{readingHoldMs}=await import('/src/lib/playbackTiming.ts')
   return readingHoldMs([event.title,event.description??''].join(' '),window.__qaPlaybackStore.getState().playbackSpeed)
  },event)
  // Skip the static reading pause; animation frames are exercised separately.
  await page.clock.fastForward(hold+5)
  if(index%10===0){await fs.writeFile(path.join(qa,'progress.json'),JSON.stringify({checked:index+1,total:events.length,last:event.id})+'\n');console.log(`Playback ${index+1}/${events.length}`)}
 }
 const final=await page.evaluate(()=>{const s=window.__qaPlaybackStore.getState();return{eventId:s.activeEventId,playing:s.isPlayingStory,trace:window.__qaEventTrace}})
 assert.equal(final.eventId,events.at(-1).id,'Natural stop must retain the final reading cursor')
 assert.equal(final.playing,false,'Continuous playback must stop at the end')
 assert.deepEqual(final.trace,events.map(e=>e.id),'Playback must visit every scene exactly once in source order')
 assert.deepEqual(errors,[])
 report.scenes=events.length;report.finalEventId=final.eventId;report.trace=final.trace
 await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n')
 console.log(`PASS: ${events.length} actual playback scenes in order; clean runtime and natural stop`)
}catch(error){report.failure=error.message;await page.screenshot({path:path.join(qa,'failure.png')}).catch(()=>{});await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n');throw error}
finally{await browser.close().catch(()=>{});if(server)await new Promise(resolve=>server.close(resolve))}
