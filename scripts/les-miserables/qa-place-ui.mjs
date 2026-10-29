import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import{createRequire}from 'node:module'
import{createHash}from 'node:crypto'
import{execFileSync}from 'node:child_process'
import{createServer}from 'node:http'

const appRoot=process.env.KATHALA_QA_APP_ROOT
assert.ok(appRoot,'Set KATHALA_QA_APP_ROOT to the local app checkout')
const batch=process.argv.find(arg=>arg.startsWith('--places='))?.split('=')[1]??'two'
const base=process.env.KATHALA_QA_URL??'http://127.0.0.1:5178',root=import.meta.dirname,qa=path.join(root,'qa',`place-ui-${batch}`)
await fs.mkdir(qa,{recursive:true})
const require=createRequire(path.join(appRoot,'package.json')),{chromium}=require('playwright')
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server']})
const context=await browser.newContext({viewport:{width:1600,height:1100}}),page=await context.newPage(),errors=[]
page.on('pageerror',error=>errors.push(error.message))
page.on('console',message=>{if(message.type()==='error')errors.push(message.text())})
const report={scope:`Targeted place illustration batch ${batch} in full-data map inspectors; not full-book approval`,checks:[],errors}
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
 const prefix='lesmis-world-review',artDirectory=qa
 report.illustrations=[]
 await page.evaluate(async worldId=>{const{db}=await import('/src/db/database.ts');await db.worlds.update(worldId,{readingMode:false});const{useAppStore}=await import('/src/store/index.ts');useAppStore.getState().setActiveWorldId(worldId)},worldId)
 const placeKeys=JSON.parse(await fs.readFile(path.join(root,`location-art-batch-${batch}-selected.json`),'utf8')).selected.map(([key])=>key)
 for(const key of placeKeys){
  const marker=fixture.locationMarkers.find(row=>row.id===`${prefix}-location-${key}`)
  await page.evaluate(async marker=>{const{useAppStore}=await import('/src/store/index.ts');const s=useAppStore.getState();s.setActiveMapLayerId(marker.mapLayerId);s.setSelectedLocationMarkerId(marker.id)},marker)
  await page.goto(`${base}/#/worlds/${worldId}/maps`)
  await page.locator('.leaflet-container').waitFor({timeout:60000})
  await page.getByRole('button',{name:marker.name,exact:true}).and(page.locator('img')).click({timeout:60000})
  const picture=page.getByRole('dialog',{name:marker.name,exact:true}).getByRole('img',{name:marker.name,exact:true})
  await picture.evaluate(img=>img.decode())
  const size=await picture.evaluate(img=>({width:img.naturalWidth,height:img.naturalHeight}))
  assert.ok(size.width>=1000&&size.height>=1000)
  await picture.screenshot({path:path.join(artDirectory,`location-${key}.png`)})
  await page.getByRole('button',{name:'Close image',exact:true}).click()
  report.illustrations.push({kind:'locations',key,imageId:marker.imageId,...size})
 }
 assert.equal(report.illustrations.length,placeKeys.length)
 assert.deepEqual(errors,[])
 await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n')
 console.log(`${placeKeys.length} place images opened full-size from actual map inspectors; zero runtime errors`)
}catch(error){report.failure=error.message;await page.screenshot({path:path.join(qa,'failure.png')}).catch(()=>{});await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n');throw error}
finally{await browser.close().catch(()=>{});if(fixtureServer)await new Promise(resolve=>fixtureServer.close(resolve))}
