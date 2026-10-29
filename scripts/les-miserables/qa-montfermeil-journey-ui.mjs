import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import{createRequire}from 'node:module'
import{createHash}from 'node:crypto'
import{execFileSync}from 'node:child_process'
import{createServer}from 'node:http'

const appRoot=process.env.KATHALA_QA_APP_ROOT
assert.ok(appRoot,'Set KATHALA_QA_APP_ROOT to the local app checkout')
const sourceCorrections=process.argv.includes('--source-corrections')
const allArrasLegs=process.argv.includes('--all-arras-legs')
assert.ok(!allArrasLegs||(!sourceCorrections&&process.argv.includes('--playback-only')))
const chapterFilter=process.argv.find(arg=>arg.startsWith('--chapters='))?.slice(11).split(',').map(Number)
if(chapterFilter)assert.ok(sourceCorrections&&chapterFilter.every(n=>Number.isInteger(n)&&n>=1&&n<=365))
const base=process.env.KATHALA_QA_URL??'http://127.0.0.1:5178',root=import.meta.dirname,qa=path.join(root,'qa',sourceCorrections?`source-corrections-ui${chapterFilter?'-chapters-'+chapterFilter.join('-'):''}`:allArrasLegs?'arras-all-legs-ui':'montfermeil-journey-ui')
await fs.mkdir(qa,{recursive:true})
const require=createRequire(path.join(appRoot,'package.json')),{chromium}=require('playwright')
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server']})
const context=await browser.newContext({viewport:{width:1600,height:1100}}),page=await context.newPage(),errors=[]
page.on('pageerror',error=>errors.push(error.message))
page.on('console',message=>{if(message.type()==='error')errors.push(message.text())})
const report={scope:sourceCorrections?'Targeted source-correction character states and inventories; not full-book playback approval':'Targeted Montfermeil state and Arras first-leg playback review; not exhaustive full-book approval',checks:[],errors}
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
 await page.locator('[data-scene-event-id]').first().waitFor({timeout:60000})
 const prefix='lesmis-world-review'
 let cases=[
  ['96-2','madame-thenardier','The inn’s public room'],
  ['97-3','cosette','Cosette’s water bucket'],
  ['97-4','montfermeil-yellow-stranger','Cosette’s water bucket'],
  ['99-3','cosette','Cosette’s water bucket'],
  ['100-2','madame-thenardier','The substitute silver piece'],
  ['101-5','cosette','The gold piece in the shoe'],
  ['101-7','cosette','Catherine'],
  ['102-3','thenardier','Fantine’s authorization'],
  ['103-3','cosette','Catherine'],
  ['106-1','valjean','The child’s inner chamber'],
  ['108-4','cosette','The child’s inner chamber'],
 ]
 if(sourceCorrections){
  const{enrichedReview}=await import('./build-enrichment-audit.mjs'),review=enrichedReview()
  const rows=[
   [364,92,'homme-arme-portress','unlocated'],
   [240,14,'valjean','location','barriere-maine-timber-yard'],
   [240,14,'cosette','location','barriere-maine-timber-yard'],
   [240,14,'convoy-escort-captain','location','barriere-maine-road'],
   [240,14,'convoy-hooked-cudgel-guard','location','barriere-maine-road'],
   [240,14,'convoy-warning-woman','location','barriere-maine-road'],
   [240,14,'convoy-warning-boy','location','barriere-maine-road'],
   [232,66,'eponine','no-item','marius-prison-payment-coin'],
   [232,66,'marius','no-item','marius-prison-payment-coin'],
   [317,28,'valjean','location','chanvrerie-barricade'],
   [317,28,'javert','unlocated',null],
   [230,16,'brujon','location','la-force'],
   [230,16,'la-force-night-watchman','location','la-force-new-building'],
   [230,16,'la-force-watch-superintendent','location','la-force'],
   [293,54,'gavroche','item','javert-captured-musket'],
   [258,24,'eponine','unlocated',null],
   [181,3,'hotel-porte-saint-jacques-proprietor','unlocated',null],
   [309,5,'chanvrerie-rooftop-fireman','unlocated',null],
   [309,7,'chanvrerie-rooftop-fireman','unlocated',null],
   [309,7,'chanvrerie-rooftop-officer','unlocated',null],
   [307,7,'valjean','item','enjolras-borrowed-rifle'],
   [262,121,'gillenormand','location','gillenormand-bedroom'],
   [313,'start','gavroche','item','gavroche-cartridge-basket'],
   [313,12,'gavroche','item','gavroche-found-powder-flask'],
   [313,12,'gavroche','item','gavroche-cartridge-basket'],
   [313,19,'gavroche','item','gavroche-found-powder-flask'],
   [313,34,'gavroche','item','gavroche-cartridge-basket'],
   [313,34,'gavroche','item','gavroche-found-powder-flask'],
   [313,19,'gavroche','item','gavroche-cartridge-basket'],
   [315,'start','combeferre','item','gavroche-cartridge-basket'],
   [315,6,'combeferre','item','gavroche-cartridge-basket'],
   [181,43,'hotel-porte-saint-jacques-proprietor','location','hotel-porte-saint-jacques'],
   [306,14,'gavroche','item','javert-captured-musket'],
   [332,9,'marius','item','marius-body-return-pocketbook'],
   [336,11,'valjean','item','thenardier-offered-rope'],
   [337,39,'javert','item','marius-body-return-pocketbook'],
   [361,25,'valjean','location','homme-arme-dining-room'],
   [361,26,'homme-arme-doctor','location','homme-arme-house'],
   [363,207,'marius','location','gillenormand-garden'],
   [363,214,'cosette','location','seine-right-bank-reunion-coach'],
   [364,76,'homme-arme-doctor','location','homme-arme-dining-room'],
   [364,112,'homme-arme-doctor','location','homme-arme-dining-room'],
   [144,126,'gribier-wife','location','gribier-garret-87-vaugirard'],
   [171,34,'marius','item','pontmercy-last-instructions'],
   [177,'start','marius-musain-coachman','location','cafe-musain-entrance'],
   [178,7,'marius','location','cafe-musain-back-room'],
   [179,6,'musain-vaudeville-scribe','location','cafe-musain-back-room'],
   [179,6,'musain-duel-adviser','location','cafe-musain-back-room'],
   [180,21,'combeferre','location','cafe-musain'],
   [259,32,'toussaint','location','rue-plumet-pavilion'],
   [259,109,'eponine','location','rue-plumet-garden-gate'],
   [263,22,'valjean','location','rue-plumet-pavilion'],
   [288,12,'feuilly','location','corinthe'],
   [295,14,'cosette','location','homme-arme-cosette-room'],
   [295,42,'toussaint','location','homme-arme-dining-room'],
   [296,64,'valjean','location','homme-arme-doorstep'],
   [288,'start','gavroche','item','javert-captured-musket'],
   [290,8,'gavroche','item','javert-captured-musket'],
   [293,70,'marius','item','eponine-withheld-letter-for-marius'],
   [294,'start','marius','location','corinthe-taproom'],
   [294,'start','eponine','location','mondetour-small-barricade'],
   [294,11,'marius','item','marius-farewell-letter-to-cosette'],
   [294,18,'gavroche','item','marius-farewell-letter-to-cosette'],
   [296,36,'valjean','item','marius-farewell-letter-to-cosette'],
   [296,20,'gavroche','item','valjean-gavroche-five-franc-gift'],
   [191,3,'luxembourg-basin-father','location','luxembourg-grand-basin'],
   [191,4,'marius','location','luxembourg-pepiniere-alley'],
   [193,9,'voltaire-provincial-guest','location','cafe-voltaire'],
   [194,4,'marius','item','leblanc-uf-handkerchief'],
   [201,3,'marius','location','gorbeau-marius-room'],
   [202,4,'madame-bourgon','location','gorbeau-house'],
   [202,7,'boulevard-taller-ragged-girl','location','gorbeau-adjoining-boulevard'],
   [202,13,'marius','item','four-petitions-packet'],
   [204,46,'jondrette-elder-daughter','item','four-petitions-packet'],
   [204,63,'jondrette-elder-daughter','item','marius-five-franc-gift'],
   [209,35,'jondrette','item','leblanc-brown-greatcoat'],
   [210,18,'jondrette','item','leblanc-brown-greatcoat'],
   [214,26,'pontoise-substitute-inspector','item','marius-gorbeau-entrance-key'],
   [214,26,'marius','item','javert-signal-pistols'],
   [217,'start','marius','location','gorbeau-partition-aperture'],
   [217,37,'marius','item','javert-signal-pistols'],
   [218,20,'marius','item','javert-signal-pistols'],
   [215,'start','marius','item','javert-signal-pistols'],
   [220,21,'marius','location','gorbeau-partition-aperture'],
   [220,258,'marius','item','javert-signal-pistols'],
   [242,12,'gavroche','location','mabeuf-garden-hedge'],
   [242,66,'montparnasse','item','mabeuf-lane-gift-purse'],
   [242,73,'mabeuf','item','mabeuf-lane-gift-purse'],
   [244,7,'cosette','location','rue-plumet-cosette-room'],
   [244,29,'cosette','location','rue-plumet-cosette-room'],
   [244,29,'valjean','location','rue-plumet-garden-steps'],
   [244,31,'cosette','location','rue-plumet-cosette-room'],
   [244,31,'valjean','location','rue-plumet-garden-steps'],
   [244,37,'cosette','location','rue-plumet-pavilion'],
   [251,21,'babet','location','la-force'],
   [251,39,'thenardier','location','rue-roi-sicile-ruin-wall'],
   [251,59,'thenardier','location','rue-roi-sicile-ruin-wall'],
   [251,59,'brujon','item','brujon-escape-rope'],
   [251,59,'thenardier','no-item','brujon-rope-fragment'],
   [251,86,'thenardier','location','rue-roi-sicile-ruin-wall'],
   [251,108,'gueulemer','location','rue-roi-sicile-ruin-enclosure'],
   [251,108,'thenardier','location','rue-roi-sicile-ruin'],
   [251,108,'gavroche','no-item','brujon-escape-rope'],
  ]
  cases=rows.filter(([chapter])=>!chapterFilter||chapterFilter.includes(chapter)).map(([chapter,at,actor,type,key])=>{
   const index=review.get(chapter).findIndex(row=>row.at===at);assert.ok(index>=0)
   const event=`${chapter}-${index+1}`
   if(type==='unlocated'){
    const state=fixture.characterSnapshots.find(row=>row.eventId===`${prefix}-event-${event}`&&row.characterId===`${prefix}-character-${actor}`)
    assert.ok(state,`Missing directly present actor: ${event} ${actor}`)
    assert.equal(state.currentLocationMarkerId,null)
    assert.equal(state.currentMapLayerId,null)
    return[event,actor,'Unknown']
   }
   const itemType=type==='item'||type==='no-item'
   const collection=itemType?fixture.items:fixture.locationMarkers
   const record=collection.find(row=>row.id===`${prefix}-${itemType?'item':'location'}-${key}`)
   assert.ok(record,`Missing ${type}: ${key}`)
   return[event,actor,record.name,type==='no-item']
  })
 }
 for(const[event,actor,expected,absent]of(process.argv.includes('--playback-only')?[]:cases)){
  await page.evaluate(async([worldId,eventId])=>{const{useAppStore}=await import('/src/store/index.ts');const s=useAppStore.getState();s.setActiveWorldId(worldId);s.setActiveEventId(eventId)},[worldId,`${prefix}-event-${event}`])
  await page.goto(`${base}/#/worlds/${worldId}/characters/${prefix}-character-${actor}`)
  await page.getByRole('tab',{name:'Current State',exact:true}).click({timeout:60000})
  const panel=page.getByRole('tabpanel');await panel.waitFor()
  if(absent){
   const state=fixture.characterSnapshots.find(row=>row.eventId===`${prefix}-event-${event}`&&row.characterId===`${prefix}-character-${actor}`)
   assert.ok(state?.statusNotes)
   await panel.getByText(state.statusNotes,{exact:true}).first().waitFor()
   assert.equal(await panel.getByText(expected,{exact:true}).count(),0)
  }
  else await panel.getByText(expected,{exact:true}).first().waitFor()
  await page.screenshot({path:path.join(qa,`${event}-${actor}.png`)})
  report.checks.push(`${event} ${actor}: ${absent?'does not hold ':''}${expected}`)
 }
 if(!sourceCorrections){
 if(allArrasLegs){
  report.scope='Actual Play/Pause across all five Arras stage transitions and six modeled movements; not exhaustive full-book playback'
  report.playbacks=[]
  const targets=[...new Set(fixture.characterMovements.map(move=>move.eventId))]
  assert.equal(targets.length,5)
  await page.evaluate(async()=>{const{useAppStore}=await import('/src/store/index.ts');window.__qaPlaybackStore=useAppStore})
  for(const targetId of targets){
   const index=fixture.events.findIndex(event=>event.id===targetId),previous=fixture.events[index-1],target=fixture.events[index]
   assert.ok(index>0&&previous)
   const beforeLocation=fixture.locationMarkers.find(location=>location.id===previous.locationMarkerId)
   const afterLocation=fixture.locationMarkers.find(location=>location.id===target.locationMarkerId)
   assert.ok(beforeLocation&&afterLocation)
   await page.evaluate(([worldId,eventId,mapId])=>{const s=window.__qaPlaybackStore.getState();s.setActiveWorldId(worldId);s.setActiveEventId(eventId);s.setActiveMapLayerId(mapId)},[worldId,previous.id,beforeLocation.mapLayerId])
   await page.goto(`${base}/#/worlds/${worldId}/maps`)
   await page.locator('.leaflet-container').waitFor({timeout:60000})
   await page.waitForTimeout(500)
   await page.getByRole('button',{name:'Play story on the map',exact:true}).click()
   await page.waitForFunction(([eventId,mapId])=>{const s=window.__qaPlaybackStore.getState();return s.activeEventId===eventId&&s.activeMapLayerId===mapId&&!s.isAnimating},[targetId,afterLocation.mapLayerId],{timeout:45000})
   await page.getByRole('button',{name:'Pause',exact:true}).click()
   const state=await page.evaluate(()=>{const s=window.__qaPlaybackStore.getState();return{eventId:s.activeEventId,mapLayerId:s.activeMapLayerId,playing:s.isPlayingStory,animating:s.isAnimating}})
   assert.equal(state.eventId,targetId)
   assert.equal(state.mapLayerId,afterLocation.mapLayerId)
   assert.equal(state.playing,false)
   report.playbacks.push({fromEventId:previous.id,toEventId:targetId,fromMapLayerId:beforeLocation.mapLayerId,...state,movements:fixture.characterMovements.filter(move=>move.eventId===targetId).map(move=>move.id)})
   await page.screenshot({path:path.join(qa,`${targetId.replace(prefix+'-event-','')}-paused.png`)})
  }
  assert.equal(report.playbacks.flatMap(row=>row.movements).length,6)
 }else{
 await page.evaluate(async([worldId,prefix])=>{const{useAppStore}=await import('/src/store/index.ts');const s=useAppStore.getState();s.setActiveWorldId(worldId);s.setActiveEventId(`${prefix}-event-59-1`);s.setActiveMapLayerId(`${prefix}-map-montreuil-town`)},[worldId,prefix])
 await page.goto(`${base}/#/worlds/${worldId}/maps`)
 await page.waitForTimeout(1000)
 report.mapButtons=await page.getByRole('button').evaluateAll(bs=>bs.map(b=>({text:b.textContent,title:b.title,label:b.getAttribute('aria-label')})))
 await fs.writeFile(path.join(qa,'map-controls.json'),JSON.stringify(report.mapButtons,null,2)+'\n')
 await page.locator('.leaflet-container').waitFor({timeout:60000})
 await page.evaluate(async()=>{const{useAppStore}=await import('/src/store/index.ts');window.__qaPlaybackStore=useAppStore;window.__playbackTrace=[];useAppStore.subscribe((s,p)=>{if(s.activeEventId!==p.activeEventId||s.activeMapLayerId!==p.activeMapLayerId||s.isPlayingStory!==p.isPlayingStory||s.isAnimating!==p.isAnimating)window.__playbackTrace.push({at:performance.now(),eventId:s.activeEventId,mapLayerId:s.activeMapLayerId,playing:s.isPlayingStory,animating:s.isAnimating})})})
 await page.getByRole('button',{name:'Play story on the map',exact:true}).click()
 await page.waitForFunction(prefix=>{const s=window.__qaPlaybackStore.getState();return s.activeEventId===`${prefix}-event-59-2`&&s.activeMapLayerId===`${prefix}-map-france`&&!s.isAnimating},prefix,{timeout:45000})
 await page.getByRole('button',{name:'Pause',exact:true}).click()
 report.playback=await page.evaluate(async()=>{const{useAppStore}=await import('/src/store/index.ts');const s=useAppStore.getState();return{eventId:s.activeEventId,mapLayerId:s.activeMapLayerId,isAnimating:s.isAnimating,isPlaying:s.isPlayingStory}})
 report.playbackTrace=await page.evaluate(()=>window.__playbackTrace)
 await fs.writeFile(path.join(qa,'playback-trace.json'),JSON.stringify(report.playbackTrace,null,2)+'\n')
 assert.equal(report.playback.eventId,`${prefix}-event-59-2`,'Pause must retain the advanced scene')
 assert.equal(report.playback.mapLayerId,`${prefix}-map-france`,'The named road leg exits the town onto the country map')
 assert.equal(report.playback.isPlaying,false)
 await page.screenshot({path:path.join(qa,'arras-first-leg.png')})
 report.checks.push('Actual Play advances the reading cursor from59-1 to59-2 and Pause retains that scene; animation/layer evidence recorded separately')
 }
 }
 assert.deepEqual(errors,[])
 await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n')
 console.log(report)
}catch(error){report.failure=error.message;await page.screenshot({path:path.join(qa,'failure.png')}).catch(()=>{});await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n');throw error}
finally{await browser.close().catch(()=>{});if(fixtureServer)await new Promise(resolve=>fixtureServer.close(resolve))}
