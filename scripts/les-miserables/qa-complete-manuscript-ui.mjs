import fs from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'
import{createRequire}from'node:module'
import{createHash}from'node:crypto'
import{execFileSync}from'node:child_process'
import{createServer}from'node:http'

const appRoot=process.env.KATHALA_QA_APP_ROOT
assert.ok(appRoot,'Set KATHALA_QA_APP_ROOT')
const base=process.env.KATHALA_QA_URL??'http://127.0.0.1:5178',root=import.meta.dirname,qa=path.join(root,'qa','complete-manuscript-ui')
await fs.mkdir(qa,{recursive:true})
const require=createRequire(path.join(appRoot,'package.json')),{chromium}=require('playwright')
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server']})
const page=await browser.newPage({viewport:{width:1600,height:1100}}),errors=[]
page.on('pageerror',e=>errors.push(e.message))
page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
const report={scope:'Complete rendered manuscript text and scene order; not character, art or playback approval',errors}
let server
try{
 const json=await fs.readFile(path.join(root,'qa','world-review.pwk'),'utf8'),fixture=JSON.parse(json),worldId=fixture.world.id
 report.fixtureSha256=createHash('sha256').update(json).digest('hex')
 report.applicationCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:appRoot,encoding:'utf8'}).trim()
 report.applicationDiffSha256=createHash('sha256').update(execFileSync('git',['diff','--binary'],{cwd:appRoot})).digest('hex')
 await page.goto(base,{waitUntil:'domcontentloaded'})
 server=createServer((request,response)=>{if(request.url!=='/fixture'){response.writeHead(404);response.end();return}response.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':base});response.end(json)})
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve))
 const url=`http://127.0.0.1:${server.address().port}/fixture`
 const imported=await page.evaluate(async url=>{const json=await fetch(url).then(r=>r.text()),{importWorldFromJson}=await import('/src/lib/exportImport.ts');return importWorldFromJson(json)},url)
 assert.equal(imported,worldId)
 await page.goto(`${base}/#/worlds/${worldId}/manuscript`)
 await page.locator('[data-scene-event-id]').first().waitFor({timeout:60000})
 await page.waitForFunction(count=>document.querySelectorAll('[data-scene-event-id]').length===count,fixture.events.length,{timeout:60000})
 const result=await page.evaluate(async scenes=>{
  const{paragraphBlocks}=await import('/src/lib/manuscriptParagraphs.ts'),{emphasisSpans}=await import('/src/lib/proseEmphasis.ts')
  const normalize=text=>text.replace(/\s+/g,' ').trim()
  const nodes=[...document.querySelectorAll('[data-scene-event-id]')]
  const rendered=nodes.map(node=>({eventId:node.getAttribute('data-scene-event-id'),text:normalize([...node.querySelectorAll('p')].map(p=>p.textContent).join('\n\n'))}))
  const mismatches=[]
  scenes.forEach((scene,index)=>{
   const expected=normalize(paragraphBlocks(scene.text).map(block=>emphasisSpans(block.text).map(span=>span.text).join('')).join('\n\n'))
   const actual=rendered[index]
   if(actual?.eventId!==scene.eventId||actual?.text!==expected)mismatches.push({index,eventId:scene.eventId,actualEventId:actual?.eventId,expectedLength:expected.length,actualLength:actual?.text.length,expectedStart:expected.slice(0,100),actualStart:actual?.text.slice(0,100)})
  })
  return{chapters:document.querySelectorAll('[data-chapter-id]').length,scenes:rendered.length,mismatches}
 },fixture.sceneTexts.map(({eventId,text})=>({eventId,text})))
 Object.assign(report,result)
 assert.deepEqual(result.mismatches,[],'Rendered scene prose differs from the source-backed fixture')
 assert.equal(result.chapters,fixture.chapters.length)
 await page.evaluate(async()=>{const{useAppStore}=await import('/src/store/index.ts');window.__qaManuscriptStore=useAppStore})
 report.readingCursors={}
 for(const[number,eventId]of[['opening',fixture.events[0].id],['ending',fixture.events.at(-1).id]]){
  const paragraphs=page.locator(`[data-scene-event-id="${eventId}"] p`)
  await(number==='opening'?paragraphs.first():paragraphs.last()).scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  // The opening viewport can contain both the short preface and the next
  // scene; the reading cursor correctly advances to the furthest visible one.
  if(number==='ending')await page.waitForFunction(eventId=>window.__qaManuscriptStore.getState().activeEventId===eventId,eventId,{timeout:15000})
  report.readingCursors[number]=await page.evaluate(()=>window.__qaManuscriptStore.getState().activeEventId)
  if(number==='opening')assert.equal(fixture.events.find(event=>event.id===report.readingCursors.opening)?.chapterId,fixture.events[0].chapterId)
  await page.screenshot({path:path.join(qa,`${number}.png`)})
 }
 assert.deepEqual(errors,[])
 await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n')
 console.log(`${result.chapters} chapters / ${result.scenes} rendered scenes match; zero runtime errors`)
}catch(e){report.failure=e.message;await page.screenshot({path:path.join(qa,'failure.png')}).catch(()=>{});await fs.writeFile(path.join(qa,'results.json'),JSON.stringify(report,null,2)+'\n');throw e}
finally{await browser.close().catch(()=>{});if(server)await new Promise(resolve=>server.close(resolve))}
