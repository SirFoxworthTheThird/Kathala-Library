import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import{createRequire}from 'node:module'
import{createHash}from 'node:crypto'
import{createServer}from 'node:http'
import{execFileSync}from 'node:child_process'

const root=import.meta.dirname,appRoot=process.env.KATHALA_QA_APP_ROOT
assert.ok(appRoot,'Set KATHALA_QA_APP_ROOT to the app checkout')
const option=process.argv.find(value=>value.startsWith('--portraits='))
assert.ok(option,'Choose the portrait batch to review')
const batch=option.slice('--portraits='.length)
assert.match(batch,/^[a-z-]+$/)
const qa=path.join(root,'qa',`art-ui-${batch}`),base=process.env.KATHALA_QA_URL??'http://127.0.0.1:5178'
await fs.mkdir(qa,{recursive:true})
const require=createRequire(path.join(appRoot,'package.json')),{chromium}=require('playwright')
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server']})
const page=await browser.newPage({viewport:{width:1600,height:1100}}),errors=[]
page.on('pageerror',error=>errors.push(error.message))
page.on('console',message=>{if(message.type()==='error')errors.push(message.text())})
const report={scope:'Targeted portrait display in the ordinary full-data app; not full-book reading or playback approval',batch,images:[],errors}
let server
try{
 const json=await fs.readFile(path.join(root,'qa/world-review.pwk'),'utf8'),fixture=JSON.parse(json)
 report.fixtureSha256=createHash('sha256').update(json).digest('hex')
 report.applicationCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:appRoot,encoding:'utf8'}).trim()
 report.applicationDiffSha256=createHash('sha256').update(execFileSync('git',['diff','--binary'],{cwd:appRoot})).digest('hex')
 server=createServer((request,response)=>{
  if(request.url!=='/fixture.pwk'){response.writeHead(404);response.end();return}
  response.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':base});response.end(json)
 })
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve))
 await page.goto(base,{waitUntil:'domcontentloaded'})
 const imported=await page.evaluate(async url=>{const json=await fetch(url).then(r=>r.text());const{importWorldFromJson}=await import('/src/lib/exportImport.ts');return importWorldFromJson(json)},`http://127.0.0.1:${server.address().port}/fixture.pwk`)
 assert.equal(imported,fixture.world.id)
 await page.evaluate(async worldId=>{const{db}=await import('/src/db/database.ts');await db.worlds.update(worldId,{readingMode:false});const{useAppStore}=await import('/src/store/index.ts');useAppStore.getState().setActiveWorldId(worldId)},fixture.world.id)
 const selected=JSON.parse(await fs.readFile(path.join(root,`portrait-batch-${batch}-selected.json`),'utf8')).selected
 for(const[key]of selected){
  const character=fixture.characters.find(row=>row.id.endsWith(`-character-${key}`))
  assert.ok(character?.portraitImageId,`Accepted portrait required: ${key}`)
  report.currentCharacterId=character.id
  report.currentImageId=character.portraitImageId
  await page.goto(`${base}/#/worlds/${fixture.world.id}/characters/${character.id}`)
  report.currentDecoded=await page.evaluate(async imageId=>{const{db}=await import('/src/db/database.ts');const entry=await db.blobs.get(imageId);const url=URL.createObjectURL(entry.data);try{const img=new Image();img.src=url;await img.decode();return{width:img.naturalWidth,height:img.naturalHeight,type:entry.data.type}}finally{URL.revokeObjectURL(url)}},character.portraitImageId)
  await page.getByRole('button',{name:character.name,exact:true}).and(page.locator('img')).click()
  const picture=page.getByRole('dialog',{name:character.name,exact:true}).getByRole('img',{name:character.name,exact:true})
  await picture.evaluate(img=>img.decode())
  const size=await picture.evaluate(img=>({width:img.naturalWidth,height:img.naturalHeight}))
  assert.ok(size.width>=1000&&size.height>=1000)
  await picture.screenshot({path:path.join(qa,`${key}.png`)})
  await page.getByRole('button',{name:'Close image',exact:true}).click()
  report.images.push({key,imageId:character.portraitImageId,...size})
 }
 assert.equal(report.images.length,selected.length)
 assert.deepEqual(errors,[])
 await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n')
 console.log(`${report.images.length} portraits decoded and opened full-size; zero runtime errors`)
}catch(error){
 report.failure=error.message
 report.persisted=await page.evaluate(async([characterId,imageId])=>{const{db}=await import('/src/db/database.ts');const character=await db.characters.get(characterId),blob=await db.blobs.get(imageId);return{character,blob:blob?{id:blob.id,bytes:blob.data?.size,url:blob.url}:null}},[report.currentCharacterId,report.currentImageId]).catch(()=>null)
 report.imageElements=await page.locator('img').evaluateAll(images=>images.map(img=>({alt:img.alt,role:img.getAttribute('role'),src:img.src,complete:img.complete,width:img.naturalWidth}))).catch(()=>[])
 await page.screenshot({path:path.join(qa,'failure.png')}).catch(()=>{})
 await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n')
 throw error
}finally{await browser.close().catch(()=>{});if(server)await new Promise(resolve=>server.close(resolve))}
