import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import{createRequire}from 'node:module'
import{createHash}from 'node:crypto'
import{execFileSync}from 'node:child_process'
import{createServer}from 'node:http'

const appRoot=process.env.KATHALA_QA_APP_ROOT
assert.ok(appRoot,'Set KATHALA_QA_APP_ROOT to the local app checkout')
const base=process.env.KATHALA_QA_URL??'http://127.0.0.1:5178',root=import.meta.dirname,qa=path.join(root,'qa','world-ui')
await fs.mkdir(qa,{recursive:true})
const require=createRequire(path.join(appRoot,'package.json')),{chromium}=require('playwright')
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server']})
const context=await browser.newContext({viewport:{width:1600,height:1100}}),page=await context.newPage(),errors=[]
page.on('pageerror',error=>errors.push(error.message))
page.on('console',message=>{if(message.type()==='error')errors.push(message.text())})
const report={scope:'Initial complete-text review-fixture UI checks; not final release or exhaustive playback review',checks:[],errors}
let fixtureServer
try{
 const json=await fs.readFile(path.join(root,'qa','world-review.pwk'),'utf8'),fixture=JSON.parse(json),worldId=fixture.world.id
 report.fixtureSha256=createHash('sha256').update(json).digest('hex')
 report.applicationCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:appRoot,encoding:'utf8'}).trim()
 report.applicationDiffSha256=createHash('sha256').update(execFileSync('git',['diff','--binary'],{cwd:appRoot})).digest('hex')
 await page.goto(base,{waitUntil:'domcontentloaded'})
 // Chrome's DevTools pipe rejects messages above 100 MiB. Serve the actual
 // embedded export over loopback rather than passing it through that pipe.
 fixtureServer=createServer((request,response)=>{
  if(request.url!=='/world-review.pwk'){response.writeHead(404);response.end();return}
  response.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':base})
  response.end(json)
 })
 await new Promise(resolve=>fixtureServer.listen(0,'127.0.0.1',resolve))
 const fixtureUrl=`http://127.0.0.1:${fixtureServer.address().port}/world-review.pwk`
 const imported=await page.evaluate(async url=>{const json=await fetch(url).then(r=>r.text());const{importWorldFromJson}=await import('/src/lib/exportImport.ts');return importWorldFromJson(json)},fixtureUrl)
 assert.equal(imported,worldId)
 await page.goto(`${base}/#/worlds/${worldId}/manuscript`)
 await page.waitForFunction(()=>document.body.innerText.includes('Work Review'),null,{timeout:60000})
 await page.locator('[data-scene-event-id]').first().waitFor({timeout:60000})
 const manuscript=await page.locator('body').innerText()
 assert.ok(manuscript.includes('PREFACE')||manuscript.includes('Preface'))
 assert.ok(manuscript.replace(/\s+/g,' ').includes('So long as there shall exist'))
 assert.ok(!manuscript.includes('Unexpected Application Error'))
 await page.screenshot({path:path.join(qa,'manuscript-opening.png')})
 report.checks.push('Complete-text fixture imports and manuscript opening renders')
 const cursor=async eventId=>{
  await page.evaluate(async([worldId,eventId])=>{const{useAppStore}=await import('/src/store/index.ts');const s=useAppStore.getState();s.setActiveWorldId(worldId);s.setActiveEventId(eventId)},[worldId,eventId])
 }
 const characterPage=async(eventId,characterId,name,currentState=false)=>{
  await cursor(eventId)
  await page.goto(`${base}/#/worlds/${worldId}/characters/${characterId}`)
  await page.waitForTimeout(900)
  if(currentState){
   await page.getByRole('tab',{name:'Current State',exact:true}).click()
   await page.waitForTimeout(350)
  }
  const text=await(currentState?page.getByRole('tabpanel'):page.locator('body')).innerText()
  assert.ok(!text.includes('Unexpected Application Error'))
  await fs.writeFile(path.join(qa,name+'.txt'),text)
  await page.screenshot({path:path.join(qa,name+'.png')})
  return text
 }
 const prefix='lesmis-world-review'
 const before=await characterPage(`${prefix}-event-15-1`,`${prefix}-character-valjean`,'traveller-before-name')
 const after=await characterPage(`${prefix}-event-15-4`,`${prefix}-character-valjean`,'traveller-after-name')
 assert.ok(!before.includes('Jean Valjean'))
 assert.ok(after.includes('Jean Valjean'))
 report.checks.push('Traveller name is withheld before paragraph49 and displayed after its disclosure')
 await cursor(`${prefix}-event-15-1`)
 await page.goto(`${base}/#/worlds/${worldId}/characters/${prefix}-character-valjean`)
 await page.getByRole('tab',{name:/^Goals/}).click()
 await page.getByRole('tabpanel').getByText('Find food and a place to sleep without being driven away.',{exact:true}).waitFor()
 const goals=await page.getByRole('tabpanel').innerText()
 assert.ok(goals.includes('Find food and a place to sleep'))
 assert.ok(!goals.includes('Keep the child in his care'))
 assert.equal(await page.getByRole('tab',{name:/^Factions/}).count(),0)
 await page.screenshot({path:path.join(qa,'opening-goal.png')})
 report.checks.push('Opening goal is readable without revealing the later child-protection objective or future convent membership badge')
 const alive=await characterPage(`${prefix}-event-42-1`,`${prefix}-character-myriel`,'bishop-before-report',true)
 const dead=await characterPage(`${prefix}-event-43-1`,`${prefix}-character-myriel`,'bishop-after-report',true)
 assert.ok(alive.includes('Alive')&&!alive.includes('Deceased'))
 assert.ok(dead.includes('Deceased')&&dead.includes('Unknown'))
 report.bishopStateText={before:alive,after:dead}
 report.checks.push('Current State changes from Alive to Deceased/Unknown at the report, without an absent-character snapshot')
 await cursor(`${prefix}-event-363-13`)
 await page.goto(`${base}/#/worlds/${worldId}/relationships`)
 await page.waitForTimeout(1000)
 assert.ok(!(await page.locator('body').innerText()).includes('Unexpected Application Error'))
 await page.screenshot({path:path.join(qa,'relationships-late.png')})
 report.checks.push('Relationship screen renders late-book records')
 await page.goto(`${base}/#/worlds/${worldId}/factions`)
 await page.getByText('Friends of the A B C',{exact:true}).waitFor()
 assert.ok((await page.locator('body').innerText()).includes('The Petit-Picpus community'))
 assert.ok((await page.locator('body').innerText()).includes('Patron-Minette'))
 await page.screenshot({path:path.join(qa,'factions-late.png')})
 report.checks.push('Source-based associations and their distinct roles render in the reader view')
 await cursor(`${prefix}-event-57-6`)
 await page.goto(`${base}/#/worlds/${worldId}/items`)
 for(const key of ['valjean-old-outfit','valjean-thorn-cudgel']){
  const card=page.locator(`a[href$="/items/${prefix}-item-${key}"]`)
  await card.locator('[title="Condition: destroyed"]').waitFor()
  await card.screenshot({path:path.join(qa,key+'-destroyed.png')})
 }
 await cursor(`${prefix}-event-57-7`)
 await page.goto(`${base}/#/worlds/${worldId}/items`)
 const silver=page.locator(`a[href$="/items/${prefix}-item-silver-candlesticks"]`)
 await silver.locator('[title="Condition: intact"]').waitFor()
 await silver.screenshot({path:path.join(qa,'candlesticks-spared.png')})
 report.checks.push('Burned clothes and cudgel render as destroyed; spared candlesticks render intact at the later cut')
 const guide=await characterPage(`${prefix}-event-59-6`,`${prefix}-character-tinques-postilion`,'tinques-guide-joins',true)
 assert.ok(guide.includes('Rides on the cart’s shaft'))
 report.checks.push('Tinques guide has a source-specific Current State when he joins before the breakdown')
 const juror=await characterPage(`${prefix}-event-64-4`,`${prefix}-character-bamatabois`,'juror-retained',true)
 assert.ok(juror.includes('second recalled witness'))
 const alone=await characterPage(`${prefix}-event-62-4`,`${prefix}-character-valjean`,'council-chamber-alone',true)
 assert.ok(alone.includes('Stands alone after the usher leaves'))
 report.checks.push('Courtroom continuity retains the juror; the council-chamber state is explicitly solitary after the usher leaves')
 const nurse=await characterPage(`${prefix}-event-70-3`,`${prefix}-character-sister-perpetue`,'perpetue-watch',true)
 assert.ok(nurse.includes('Watches beside the dead patient'))
 assert.ok(nurse.includes(fixture.locationMarkers.find(r=>r.id===`${prefix}-location-montreuil-factory-infirmary`).name))
 const portress=await characterPage(`${prefix}-event-70-7`,`${prefix}-character-madeleine-portress`,'portress-outside-search',true)
 assert.ok(portress.includes('Protests outside the room'))
 assert.ok(portress.includes(fixture.locationMarkers.find(r=>r.id===`${prefix}-location-madeleine-bedroom-door`).name))
 const singer=await characterPage(`${prefix}-event-67-2`,`${prefix}-character-infirmary-yard-girl`,'yard-singer-departed',true)
 assert.ok(singer.includes('Unknown')&&singer.includes('voice fades'))
 report.checks.push('Separate infirmary/lodge/doorway positions render; the departed singer has no invented sickroom position')
 const officer=await characterPage(`${prefix}-event-92-6`,`${prefix}-character-orion-watch-officer`,'orion-officer-below-rescue',true)
 assert.ok(officer.includes(fixture.locationMarkers.find(row=>row.id===`${prefix}-location-orion-deck`).name))
 const missingConvict=await characterPage(`${prefix}-event-92-8`,`${prefix}-character-valjean`,'orion-report-not-certified-death',true)
 assert.ok(missingConvict.includes('Alive')&&!missingConvict.includes('Deceased'))
 report.checks.push('The watch officer stays on deck beneath the rescue; the unsupported newspaper drowning conclusion does not certify Valjean dead')
 const artDirectory=path.join(qa,'recent-art')
 await fs.mkdir(artDirectory,{recursive:true})
 report.illustrations=[]
 await cursor(fixture.events.at(-1).id)
 // Mention-only reference characters correctly stay hidden in reading mode.
 // Review their artwork in the ordinary full-data authoring view.
 await page.evaluate(async worldId=>{const{db}=await import('/src/db/database.ts');await db.worlds.update(worldId,{readingMode:false})},worldId)
 const portraitKeys=[]
 for(const batch of ['twelve','thirteen','fourteen']){
  const selected=JSON.parse(await fs.readFile(path.join(root,`portrait-batch-${batch}-selected.json`),'utf8'))
  portraitKeys.push(...selected.selected.map(([key])=>key))
 }
 const itemKeys=[]
 for(const batch of ['one','two','three'])itemKeys.push(...JSON.parse(await fs.readFile(path.join(root,`item-art-batch-${batch}-selected.json`),'utf8')).selected.map(([key])=>key))
 for(const[kind,keys]of [['characters',portraitKeys],['items',itemKeys]])for(const key of keys){
  const singular=kind==='characters'?'character':'item'
  const record=fixture[kind].find(r=>r.id===`${prefix}-${singular}-${key}`)
  const imageId=kind==='characters'?record.portraitImageId:record.imageId
  assert.ok(imageId,`Recent ${kind} art required: ${key}`)
  await page.goto(`${base}/#/worlds/${worldId}/${kind}/${record.id}`)
  await page.getByRole('button',{name:record.name,exact:true}).and(page.locator('img')).click()
  const dialog=page.getByRole('dialog',{name:record.name,exact:true})
  const enlarged=dialog.getByRole('img',{name:record.name,exact:true})
  await enlarged.evaluate(img=>img.decode())
  const size=await enlarged.evaluate(img=>({width:img.naturalWidth,height:img.naturalHeight}))
  assert.ok(size.width>=1000&&size.height>=1000,`Recent image failed to decode at full resolution: ${key}`)
  await enlarged.screenshot({path:path.join(artDirectory,`${singular}-${key}.png`)})
  await page.getByRole('button',{name:'Close image',exact:true}).click()
  report.illustrations.push({kind,key,imageId,...size})
 }
 assert.equal(report.illustrations.length,48)
 report.checks.push('In full-data view, thirty recent portraits and eighteen object illustrations load and open full-size using the actual image controls')
 const placeKeys=[]
 for(const batch of ['one','two'])placeKeys.push(...JSON.parse(await fs.readFile(path.join(root,`location-art-batch-${batch}-selected.json`),'utf8')).selected.map(([key])=>key))
 for(const key of placeKeys){
  const marker=fixture.locationMarkers.find(row=>row.id===`${prefix}-location-${key}`)
  await page.evaluate(async marker=>{const{useAppStore}=await import('/src/store/index.ts');const s=useAppStore.getState();s.setActiveMapLayerId(marker.mapLayerId);s.setSelectedLocationMarkerId(marker.id)},marker)
  await page.goto(`${base}/#/worlds/${worldId}/maps`)
  await page.getByRole('button',{name:marker.name,exact:true}).and(page.locator('img')).click()
  const picture=page.getByRole('dialog',{name:marker.name,exact:true}).getByRole('img',{name:marker.name,exact:true})
  await picture.evaluate(img=>img.decode())
  const size=await picture.evaluate(img=>({width:img.naturalWidth,height:img.naturalHeight}))
  assert.ok(size.width>=1000&&size.height>=1000)
  await picture.screenshot({path:path.join(artDirectory,`location-${key}.png`)})
  await page.getByRole('button',{name:'Close image',exact:true}).click()
  report.illustrations.push({kind:'locations',key,imageId:marker.imageId,...size})
 }
 assert.equal(report.illustrations.length,60)
 report.checks.push('Twelve ordinary place illustrations open full-size from the actual map location inspectors, separate from the map backgrounds')
 assert.deepEqual(errors,[])
 await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n')
 console.log(JSON.stringify(report,null,2))
}catch(error){
 report.failure=error.message
 report.failureBody=await page.locator('body').innerText().then(text=>text.slice(0,8000)).catch(()=>'<page unavailable>')
 await page.screenshot({path:path.join(qa,'failure.png')}).catch(()=>{})
 await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n')
 throw error
}finally{await browser.close().catch(()=>{});if(fixtureServer)await new Promise(resolve=>fixtureServer.close(resolve))}
