import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import {createRequire}from 'node:module'
import {execFileSync}from 'node:child_process'
import {createHash}from 'node:crypto'
import {illustratedMapRegistration}from './map-registration-plan.mjs'

const appRoot=process.env.KATHALA_QA_APP_ROOT
assert.ok(appRoot,'Set KATHALA_QA_APP_ROOT to the local application checkout')
const base=process.env.KATHALA_QA_URL??'http://127.0.0.1:5178'
const root=import.meta.dirname,qa=path.join(root,'qa','map-ui')
await fs.mkdir(qa,{recursive:true})
const require=createRequire(path.join(appRoot,'package.json')),{chromium}=require('playwright')
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server']})
const context=await browser.newContext({viewport:{width:1600,height:1100}})
const page=await context.newPage(),errors=[]
page.on('pageerror',error=>errors.push(error.message))
page.on('console',message=>{if(message.type()==='error')errors.push(message.text())})
try{
  const json=await fs.readFile(path.join(root,'qa','map-review.pwk'),'utf8'),fixture=JSON.parse(json)
  await page.goto(base,{waitUntil:'domcontentloaded'})
  const id=await page.evaluate(async json=>{const {importWorldFromJson}=await import('/src/lib/exportImport.ts');return importWorldFromJson(json)},json)
  assert.equal(id,fixture.world.id)
  await page.evaluate(async()=>{window.__lesmisQaStore=(await import('/src/store/index.ts')).useAppStore})
  await page.goto(`${base}/#/worlds/${id}/maps`)
  await page.waitForTimeout(900)
  await page.screenshot({path:path.join(qa,'initial.png')})
  await page.getByRole('button',{name:'Labels',exact:true}).click()
  async function ready(map){
    await page.waitForFunction(expected=>window.__lesmisQaStore.getState().activeMapLayerId===expected,map.id)
    await page.waitForFunction(([w,h])=>{const im=document.querySelector('.leaflet-image-layer');return im?.complete&&im.naturalWidth===w&&im.naturalHeight===h},[map.imageWidth,map.imageHeight])
    await page.waitForTimeout(200)
    assert.ok(!(await page.locator('body').innerText()).includes('Unexpected Application Error'))
  }
  async function select(map){
    const close=page.getByRole('button',{name:'Close location panel',exact:true})
    if(await close.isVisible()){await close.click();await page.waitForTimeout(250)}
    const ground=map.levelGroupId?fixture.mapLayers.filter(m=>m.levelGroupId===map.levelGroupId).sort((a,b)=>a.levelIndex-b.levelIndex)[0]:map
    await page.getByRole('button',{name:ground.name,exact:true}).first().click()
    if(ground.id!==map.id)await page.getByTitle(`${map.levelLabel} — double-click to rename`,{exact:true}).click()
    await ready(map)
  }
  const layers=[]
  for(const map of fixture.mapLayers){
    await select(map)
    const geometry=await page.evaluate(()=>{
      const im=document.querySelector('.leaflet-image-layer'),r=im.getBoundingClientRect()
      const dots=[...document.querySelectorAll('.leaflet-marker-icon')].map(el=>el.getBoundingClientRect()).filter(b=>Math.abs(b.width-14)<1&&Math.abs(b.height-14)<1).map(b=>({x:b.x+b.width/2,y:b.y+b.height/2}))
      return {image:{left:r.left,top:r.top,width:r.width,height:r.height},dots}
    })
    const key=map.id.replace('lesmis-map-review-map-',''),registration=illustratedMapRegistration[key]
    const checked=Object.entries(registration.locations).map(([key,[x,y]])=>{
      const expected={x:geometry.image.left+x/map.imageWidth*geometry.image.width,y:geometry.image.top+y/map.imageHeight*geometry.image.height}
      const error=Math.min(...geometry.dots.map(dot=>Math.hypot(dot.x-expected.x,dot.y-expected.y)))
      assert.ok(error<3,`Misplaced/missing UI marker: ${key}: ${error.toFixed(2)} screen pixels`)
      return {key,screenErrorPixels:Number(error.toFixed(3))}
    })
    assert.equal(geometry.dots.length,checked.length,`UI location count: ${key}`)
    await page.screenshot({path:path.join(qa,`${key}.png`)})
    layers.push({key,positions:checked})
    console.log(`Checked ${key}: ${checked.length} rendered positions`)
  }
  const gateways=[]
  for(const marker of fixture.locationMarkers.filter(place=>place.linkedMapLayerId)){
    const parent=fixture.mapLayers.find(m=>m.id===marker.mapLayerId),target=fixture.mapLayers.find(m=>m.id===marker.linkedMapLayerId)
    await select(parent)
    console.log(`Checking gateway: ${marker.name}`)
    let image=await page.locator('.leaflet-image-layer').boundingBox()
    const nearby=fixture.locationMarkers.filter(place=>place.mapLayerId===parent.id&&place.id!==marker.id)
      .some(place=>Math.hypot((place.x-marker.x)/parent.imageWidth*image.width,(place.y-marker.y)/parent.imageHeight*image.height)<22)
    if(nearby){
      // Inspect crowded city pins at a useful zoom instead of clicking the
      // topmost overlapping neighbor or moving reviewed coordinates apart.
      await page.mouse.move(image.x+marker.x/parent.imageWidth*image.width,image.y+(parent.imageHeight-marker.y)/parent.imageHeight*image.height)
      await page.mouse.wheel(0,-600)
      await page.waitForTimeout(700)
      image=await page.locator('.leaflet-image-layer').boundingBox()
    }
    await page.mouse.click(image.x+marker.x/parent.imageWidth*image.width,image.y+(parent.imageHeight-marker.y)/parent.imageHeight*image.height)
    // The location inspector can cover a popup near the map’s right edge.
    const inspector=page.getByRole('button',{name:'Close location panel',exact:true})
    await inspector.waitFor({state:'visible',timeout:2000})
    await inspector.click()
    await inspector.waitFor({state:'hidden'})
    await page.waitForTimeout(300)
    try{await page.getByRole('button',{name:'Open sub-map →',exact:true}).click({timeout:5000})}catch(error){await page.screenshot({path:path.join(qa,'gateway-failure.png')});throw error}
    await ready(target)
    gateways.push({location:marker.id,from:parent.id,to:target.id})
    console.log(`Opened gateway: ${marker.name}`)
  }
  assert.deepEqual(errors,[],'Map fixture runtime errors')
  const result={scope:'Staged full-data map fixture only; not final book or scene visibility/playback QA',worldId:id,maps:layers,gateways,
    floorGroups:fixture.mapLayers.filter(m=>m.levelGroupId).map(m=>({map:m.id,group:m.levelGroupId,index:m.levelIndex})),
    errors,applicationCommit:execFileSync('git',['rev-parse','HEAD'],{cwd:appRoot,encoding:'utf8'}).trim(),
    applicationDiffSha256:createHash('sha256').update(execFileSync('git',['diff','--binary','HEAD'],{cwd:appRoot})).digest('hex'),
    fixtureSha256:createHash('sha256').update(json).digest('hex')}
  await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(result,null,2)+'\n')
  console.log(`PASS: ${layers.length} maps, ${layers.reduce((sum,m)=>sum+m.positions.length,0)} UI positions, ${gateways.length} gateways, all floor groups, clean runtime.`)
}finally{await browser.close()}
