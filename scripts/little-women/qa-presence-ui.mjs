// Run against a local Kathala dev server (VITE_E2E=1). No app files are copied or edited.
// KATHALA_APP_DIR selects the checkout supplying Playwright; KATHALA_QA_URL selects its server.
import fs from 'node:fs'
import path from 'node:path'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import assert from 'node:assert/strict'
import {validatePresence} from './validate-presence.mjs'

const root=fileURLToPath(new URL('../..',import.meta.url))
const app=process.env.KATHALA_APP_DIR??path.resolve(root,'../Kathala-anne-qa')
const {chromium,expect}=createRequire(path.join(app,'package.json'))('@playwright/test')
const base=process.env.KATHALA_QA_URL??'http://127.0.0.1:5173'
const out=fileURLToPath(new URL('./qa/presence-ui',import.meta.url));fs.mkdirSync(out,{recursive:true})
if(fs.existsSync(path.join(out,'results.json')))fs.unlinkSync(path.join(out,'results.json'))
const inputBytes=fs.readFileSync(path.join(root,'library/little-women.pwk'))
const world=JSON.parse(inputBytes)
const layout=JSON.parse(fs.readFileSync(path.join(root,'scripts/little-women/map-layout.json'),'utf8'))
const browser=await chromium.launch({headless:true,args:['--no-proxy-server','--host-resolver-rules=MAP fonts.googleapis.com ~NOTFOUND, MAP fonts.gstatic.com ~NOTFOUND']})
const page=await browser.newPage({viewport:{width:1600,height:1000}})
const errors=[],failedAssets=[],shots=[],markerChecks=[],servedImages=new Map();let imageRequests=0
page.on('pageerror',e=>errors.push(String(e)))
page.on('console',m=>{if(m.type()==='error'&&!/fonts\.|ERR_NAME_NOT_RESOLVED/.test(m.text()))errors.push(m.text())})
page.on('response',r=>{if(r.url().includes('/library/little-women')&&r.status()>=400)failedAssets.push(r.url())})
await page.route('**/library/**',async route=>{
 const rel=decodeURIComponent(new URL(route.request().url()).pathname).replace(/^\//,'')
 const target=path.resolve(root,rel)
 if(!target.startsWith(path.join(root,'library')+path.sep)||!fs.existsSync(target))return route.fulfill({status:404,body:rel})
 const body=fs.readFileSync(target)
 if(rel.startsWith('library/little-women/')&&target.endsWith('.webp')){imageRequests++;servedImages.set(rel,body.length)}
 await route.fulfill({status:200,contentType:target.endsWith('.webp')?'image/webp':target.endsWith('.png')?'image/png':'application/json',body})
})
await page.addInitScript(()=>localStorage.setItem('kathala-tutorial',JSON.stringify({step:0,done:true})))
try{
 await page.goto(base,{waitUntil:'domcontentloaded'})
 await page.waitForFunction(()=>window.__pwlibrary&&window.__pwdb)
 const worldId=await page.evaluate(()=>window.__pwlibrary.install('Little Women'))
 await page.goto(`${base}/#/worlds/${worldId}/maps`,{waitUntil:'domcontentloaded'})
 await expect(page.getByRole('button',{name:'Map tools'})).toBeVisible({timeout:30000})
 const imported=await page.evaluate(async()=>{
  const db=window.__pwdb,result={}
  for(const table of ['events','characters','characterSnapshots','locationMarkers','mapLayers'])result[table]=await db[table].toArray()
  return result
 })
 const reviewedCases=validatePresence(imported)
 const scenarios=[
  ['Three Days Without Bhaer','The March House'],
  ['In the Garret','Concord and Its Roads'],
  ['A Bargain to Do Good','The Laurence Estate'],
  ['The Wedding Dance','The March House'],
  ['Laurie Attempts an Opera','The European Journey'],
  ['Made Ready for Sleep','The March House'],
  ['The Empty Room','The March House'],
 ]
 for(const [title,layer] of scenarios){
  const event=imported.events.find(row=>row.title===title)
  await page.evaluate(eid=>{
   const state=JSON.parse(localStorage.getItem('kathala-ui')??'{"state":{},"version":0}')
   state.state.activeEventId=eid
   if(state.state.eventByWorld)for(const id of Object.keys(state.state.eventByWorld))state.state.eventByWorld[id]=eid
   localStorage.setItem('kathala-ui',JSON.stringify(state))
  },event.id)
  await page.reload({waitUntil:'domcontentloaded'})
  await expect(page.getByRole('banner').getByText(layer,{exact:true})).toBeVisible({timeout:30000})
  await expect(page.getByRole('button',{name:'Map tools'})).toBeVisible()
  await expect.poll(()=>page.locator('.leaflet-image-layer').evaluateAll(imgs=>imgs.length>0&&imgs.every(img=>img.complete&&img.naturalWidth>0)),{timeout:20000}).toBe(true)
  const selected=await page.evaluate(()=>JSON.parse(localStorage.getItem('kathala-ui')??'{}').state?.activeEventId)
  assert.equal(selected,event.id,`${title}: cursor actually moved`)
  const shot=title.toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.png'
  await page.screenshot({path:path.join(out,shot),fullPage:true});shots.push({title,layer,file:shot})
 }
 await page.getByRole('button',{name:/^Beth March/}).first().click()
 await expect(page.getByText('Deceased',{exact:true})).toBeVisible({timeout:10000})
 await page.screenshot({path:path.join(out,'beth-remains-deceased.png'),fullPage:true})
 await page.evaluate(async id=>window.__pwdb.worlds.update(id,{readingMode:false}),worldId)
 await page.reload({waitUntil:'domcontentloaded'})
 await expect(page.getByRole('button',{name:'Map tools'})).toBeVisible({timeout:20000})
 for(const layer of imported.mapLayers){
  await page.locator('[data-layer-activate]').filter({hasText:layer.name}).click()
  await expect(page.getByRole('banner').getByText(layer.name,{exact:true})).toBeVisible({timeout:20000})
  await expect.poll(()=>page.locator('.leaflet-image-layer').evaluateAll(imgs=>imgs.length>0&&imgs.every(img=>img.complete&&img.naturalWidth>0)),{timeout:20000}).toBe(true)
  await page.waitForTimeout(400)
  for(const label of ['Close location panel','Close character panel']){const close=page.getByRole('button',{name:label,exact:true});if(await close.isVisible())await close.click()}
  await page.screenshot({path:path.join(out,`aligned-${layer.id}.png`),fullPage:true})
  // At larger zoom the decluttering policy exposes every location label.
  await page.locator('.leaflet-control-zoom-in').click({clickCount:2,delay:350})
  await page.waitForTimeout(700)
  const points=layout[layer.id.replace('little-women-map-','')]
  const locations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/})
  if(await locations.getAttribute('aria-expanded')==='false')await locations.click()
  for(const [key,[x,y]] of Object.entries(points)){
   const name=imported.locationMarkers.find(row=>row.id===`little-women-loc-${key.toLowerCase()}`).name
   // Selecting a location forces its label even when nearby labels are decluttered.
   await page.locator(`button:has(> span[title=${JSON.stringify(name)}])`).click()
   const readPosition=()=>page.evaluate(name=>{
    const img=document.querySelector('.leaflet-image-layer').getBoundingClientRect()
    const pin=[...document.querySelectorAll('.leaflet-marker-icon')].find(el=>[...el.querySelectorAll('div')].some(d=>d.childElementCount===0&&d.textContent===name))
    if(!pin)return null
    const r=pin.getBoundingClientRect()
    return {x:(r.x-parseFloat(pin.style.marginLeft)-img.x)/img.width,y:(r.y-parseFloat(pin.style.marginTop)-img.y)/img.height}
   },name)
   await expect.poll(async()=>{
    const position=await readPosition()
    return position!==null&&Math.abs(position.x-x/1400)<0.005&&Math.abs(position.y-y/900)<0.005
   },{timeout:10000}).toBe(true)
   const actual=await readPosition()
   assert.ok(actual,`${layer.name}: visible marker label for ${name}`)
   assert.ok(Math.abs(actual.x-x/1400)<0.005&&Math.abs(actual.y-y/900)<0.005,`${name}: marker must align with top-down artwork (${JSON.stringify(actual)})`)
   markerChecks.push({layer:layer.name,name})
  }
 }

 const pageChecks=[],gatewayChecks=[],playbackChecks=[],revealChecks=[]
 async function park(title,route='maps'){
  const e=imported.events.find(e=>e.title===title);assert.ok(e,title)
  await page.evaluate(eid=>{const s=JSON.parse(localStorage.getItem('kathala-ui')??'{"state":{},"version":0}');s.state.activeEventId=eid;s.state.isPlayingStory=false;s.state.playbackSpeed='fast';if(s.state.eventByWorld)for(const id of Object.keys(s.state.eventByWorld))s.state.eventByWorld[id]=eid;localStorage.setItem('kathala-ui',JSON.stringify(s))},e.id)
  await page.reload({waitUntil:'domcontentloaded'});await page.goto(base+'/#/worlds/'+worldId+'/'+route,{waitUntil:'domcontentloaded'})
  await expect(page.getByRole('button',{name:'Next moment',exact:true})).toBeVisible({timeout:30000})
  await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('kathala-ui')).state.activeEventId)).toBe(e.id)
  return e
 }
 const last=[...imported.events].sort((a,b)=>a.sortOrder-b.sortOrder).at(-1).title
 for(const reading of [true,false]){
  await page.evaluate(async({worldId,reading})=>window.__pwdb.worlds.update(worldId,{readingMode:reading}),{worldId,reading})
  await park(last)
  for(const route of ['manuscript','calendar','characters','arc','relationships','items','maps','lore','factions','knowledge']){
   await page.goto(base+'/#/worlds/'+worldId+'/'+route,{waitUntil:'domcontentloaded'})
   await expect(page.getByRole('button',{name:'Previous moment',exact:true})).toBeVisible({timeout:30000})
   await page.waitForTimeout(700)
   const body=await page.locator('body').innerText();assert.ok(body.length>250,route+' populated')
   assert.ok(!/Something went wrong|Application error|Failed to load world/i.test(body),route+' loaded')
   const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(img=>!img.complete||img.naturalWidth===0).map(img=>img.src));assert.deepEqual(broken,[],route+' images')
   const file='page-'+(reading?'reading':'writing')+'-'+route+'.png';await page.screenshot({path:path.join(out,file),fullPage:true})
   pageChecks.push({reading,route,file})
  }
 }
 // Each gateway is opened from its actual location panel, including both depths.
 await park(last)
 for(const marker of imported.locationMarkers.filter(m=>m.linkedMapLayerId)){
  const parent=imported.mapLayers.find(l=>l.id===marker.mapLayerId),child=imported.mapLayers.find(l=>l.id===marker.linkedMapLayerId)
  await page.locator('[data-layer-activate]').filter({hasText:parent.name}).click()
  const locations=page.locator('button[aria-expanded]').filter({hasText:/^Locations/});if(await locations.getAttribute('aria-expanded')==='false')await locations.click()
  await page.locator('button:has(> span[title='+JSON.stringify(marker.name)+'])').click()
  await page.getByRole('button',{name:'Open Sub-map',exact:true}).click()
  await expect(page.getByRole('banner').getByText(child.name,{exact:true})).toBeVisible({timeout:20000})
  await expect.poll(()=>page.locator('.leaflet-image-layer').evaluateAll(imgs=>imgs.length>0&&imgs.every(img=>img.complete&&img.naturalWidth>0))).toBe(true)
  const file='gateway-'+child.id+'.png';await page.screenshot({path:path.join(out,file),fullPage:true});gatewayChecks.push({parent:parent.name,child:child.name,file})
 }
 // Real playback moves the cursor and follows the scene's map, then the stepper returns.
 for(const target of ['Jo Slips Away to Town','The Baby Died in Her Arms','The Proposal in the Rain','Laurie Attempts an Opera']){
  const next=imported.events.find(e=>e.title===target),before=imported.events.find(e=>e.sortOrder===next.sortOrder-1)
  await park(before.title)
  await page.getByRole('button',{name:'Play story on the map',exact:true}).click()
  await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('kathala-ui')).state.activeEventId),{timeout:45000}).toBe(next.id)
  await page.getByRole('button',{name:'Pause',exact:true}).click()
  const marker=imported.locationMarkers.find(m=>m.id===next.locationMarkerId),layer=imported.mapLayers.find(l=>l.id===marker.mapLayerId)
  await expect(page.getByRole('banner').getByText(layer.name,{exact:true})).toBeVisible({timeout:20000})
  await page.getByRole('button',{name:'Previous moment',exact:true}).click()
  await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('kathala-ui')).state.activeEventId)).toBe(before.id)
  const file='playback-'+next.id+'.png';await page.screenshot({path:path.join(out,file),fullPage:true});playbackChecks.push({from:before.title,to:target,layer:layer.name,returned:true,file})
 }
 await page.evaluate(async id=>window.__pwdb.worlds.update(id,{readingMode:true}),worldId)
 await park('Christmas Without Presents','characters')
 await expect(page.getByText('Rob Bhaer',{exact:true})).toHaveCount(0)
 await expect(page.getByText('Professor Bhaer',{exact:true})).toHaveCount(0)
 await park('Christmas Without Presents','items')
 await expect(page.getByText('Four Christmas guidebooks',{exact:true})).toHaveCount(0)
 await park('Books Under the Pillows','items')
 await expect(page.getByText('Four Christmas guidebooks',{exact:true}).first()).toBeVisible({timeout:15000});revealChecks.push('Christmas books revealed at the pillows, not earlier')
 for(const [title,dead] of [['Work and Wait',false],['A Year of Work and Waiting',true]]){
  await park(title)
  const chars=page.locator('button[aria-expanded]').filter({hasText:/^Characters/});if(await chars.getAttribute('aria-expanded')==='false')await chars.click()
  await page.locator('button').filter({has:page.locator('span[title="Aunt March"]')}).click()
  if(dead)await expect(page.getByText('Deceased',{exact:true})).toBeVisible({timeout:15000})
  else await expect(page.getByText('Deceased',{exact:true})).toHaveCount(0)
  const file='aunt-death-'+(dead?'after':'before')+'.png';await page.screenshot({path:path.join(out,file),fullPage:true});revealChecks.push({title,dead,file})
 }

 assert.deepEqual(failedAssets,[],'no failed Little Women image requests')
 assert.deepEqual(errors,[],'no page or relevant console errors')
 assert.ok(inputBytes.equals(fs.readFileSync(path.join(root,'library/little-women.pwk'))),'The export changed during UI validation; rerun against stable bytes')
 const imageDelivery={format:'WebP',requests:imageRequests,uniqueImages:servedImages.size,uniqueBytes:[...servedImages.values()].reduce((sum,n)=>sum+n,0)}
 const expectedImages=world.blobs.filter(blob=>blob.mimeType==='image/webp')
 const expectedBytes=expectedImages.reduce((sum,blob)=>sum+fs.statSync(path.join(root,blob.url)).size,0)
 assert.equal(imageDelivery.uniqueImages,expectedImages.length,'all referenced WebP assets load in the exhaustive application pass')
 assert.equal(imageDelivery.uniqueBytes,expectedBytes,'served image bytes drifted')
 const report={date:new Date().toISOString(),worldSha256:(await import('node:crypto')).createHash('sha256').update(inputBytes).digest('hex'),reviewedCases,pageChecks,gatewayChecks,playbackChecks,revealChecks,scenarios:shots,bethRemainsDeceased:true,markerChecks,imageDelivery,failedAssets,errors}
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2)+'\n')
 console.log(JSON.stringify(report,null,2))
}catch(error){await page.screenshot({path:path.join(out,'failure.png'),fullPage:true});fs.writeFileSync(path.join(out,'failure.txt'),await page.locator('body').innerText());throw error}finally{await browser.close()}
