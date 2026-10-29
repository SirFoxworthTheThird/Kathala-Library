import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import{createRequire}from'node:module'
import{createHash}from'node:crypto'
import{createServer}from'node:http'
import{execFileSync}from'node:child_process'

const root=import.meta.dirname,appRoot=process.env.KATHALA_QA_APP_ROOT
assert.ok(appRoot,'Set KATHALA_QA_APP_ROOT')
const qa=path.join(root,'qa','mercy-knowledge-ui'),base=process.env.KATHALA_QA_URL??'http://127.0.0.1:5178'
await fs.mkdir(qa,{recursive:true})
const require=createRequire(path.join(appRoot,'package.json')),{chromium}=require('playwright')
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server']})
const page=await browser.newPage({viewport:{width:1600,height:1100}}),errors=[]
page.on('pageerror',e=>errors.push(e.message))
page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
const report={scope:'The actual Knowledge page at four narrative cursors; not full-book disclosure approval',checks:[],errors}
let server
try{
 const json=await fs.readFile(path.join(root,'qa/world-review.pwk'),'utf8'),fixture=JSON.parse(json),worldId=fixture.world.id
 report.fixtureSha256=createHash('sha256').update(json).digest('hex')
 report.applicationCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:appRoot,encoding:'utf8'}).trim()
 report.applicationDiffSha256=createHash('sha256').update(execFileSync('git',['diff','--binary'],{cwd:appRoot})).digest('hex')
 server=createServer((req,res)=>{if(req.url!=='/fixture.pwk'){res.writeHead(404);res.end();return}res.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':base});res.end(json)})
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve))
 await page.goto(base,{waitUntil:'domcontentloaded'})
 const imported=await page.evaluate(async url=>{const text=await fetch(url).then(r=>r.text());const{importWorldFromJson}=await import('/src/lib/exportImport.ts');return importWorldFromJson(text)},`http://127.0.0.1:${server.address().port}/fixture.pwk`)
 assert.equal(imported,worldId)
 await page.evaluate(async worldId=>{const{db}=await import('/src/db/database.ts');await db.worlds.update(worldId,{readingMode:false});const{useAppStore}=await import('/src/store/index.ts');useAppStore.getState().setActiveWorldId(worldId)},worldId)
 const fact=fixture.knowledgeFacts.find(r=>r.id.endsWith('-fact-javert-spared'))
 assert.ok(fact)
 const cases=[['before-release',317,2,false,false],['release',317,3,true,false],['before-proof',363,6,true,false],['printed-proof',363,7,true,true]]
 // Resolve the two late cursor IDs from the actual event titles, rather than
 // retaining scene numbers that could drift when the chapter is recut.
 cases[2][2]=Number(fixture.events.find(r=>r.chapterId===fixture.chapters.find(c=>c.number===363).id&&r.title==='The Accusations Reversed').id.split('-').at(-1))
 cases[3][2]=Number(fixture.events.find(r=>r.chapterId===fixture.chapters.find(c=>c.number===363).id&&r.title==='The Printed Proofs').id.split('-').at(-1))
 for(const[label,chapter,scene,javertKnows,mariusKnows]of cases){
  const eventId=`lesmis-world-review-event-${chapter}-${scene}`
  await page.evaluate(async eventId=>{const{useAppStore}=await import('/src/store/index.ts');useAppStore.getState().setActiveEventId(eventId)},eventId)
  await page.goto(`${base}/#/worlds/${worldId}/knowledge`)
  await page.locator('[data-fact-card]').filter({hasText:fact.title}).click({timeout:60000})
  const origin=await page.getByText('Becomes true at',{exact:true}).locator('..').getByRole('button').innerText()
  assert.match(origin,/The Cords Cut/)
  for(const[key,known]of[['valjean',javertKnows],['javert',javertKnows],['marius',mariusKnows]]){
   const name=fixture.characters.find(c=>c.id===`lesmis-world-review-character-${key}`).name
   const row=page.getByRole('button',{name:`${name} does not know this`,exact:true}).locator('..')
   await row.getByTitle(known?'Known as of the active cursor':'Not yet known at the active cursor',{exact:true}).waitFor()
  }
  await page.screenshot({path:path.join(qa,`${label}.png`)})
  report.checks.push({eventId,label,javertKnows,mariusKnows})
 }
 assert.deepEqual(errors,[])
 await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n')
 console.log('Four Knowledge-page cursors pass; zero runtime errors')
}catch(e){report.failure=e.message;await page.screenshot({path:path.join(qa,'failure.png')}).catch(()=>{});await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n');throw e}
finally{await browser.close().catch(()=>{});if(server)await new Promise(resolve=>server.close(resolve))}
