import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const root=path.resolve(import.meta.dirname,'../..')
const require=createRequire(path.resolve(root,'../Plot'+'Weave/package.json'))
const {chromium}=require('playwright')
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server','--host-resolver-rules=MAP fonts.googleapis.com ~NOTFOUND, MAP fonts.gstatic.com ~NOTFOUND']})
const context=await browser.newContext({viewport:{width:1500,height:950}})
await context.route('**/library/**',async route=>{
  const name=decodeURIComponent(new URL(route.request().url()).pathname.split('/library/')[1]??'')
  const file=path.resolve(root,'library',name)
  if(!file.startsWith(path.resolve(root,'library')+path.sep))return route.abort()
  try{await route.fulfill({status:200,body:await fs.readFile(file),contentType:file.endsWith('.json')?'application/json':file.endsWith('.png')?'image/png':'application/octet-stream'})}
  catch{await route.fulfill({status:404,body:'Missing asset'})}
})
const page=await context.newPage(),errors=[]
page.on('console',message=>{if(message.type()==='error')errors.push(message.text())})
page.on('pageerror',error=>errors.push(error.stack??error.message))
await page.goto('http://127.0.0.1:5173/',{waitUntil:'domcontentloaded'})
await page.getByRole('button',{name:'Library',exact:true}).click()
await page.getByRole('textbox',{name:/Search the library/}).fill('Black Arrow')
await page.getByRole('button',{name:/Download \([\d,.]+ (?:KB|MB)\)/}).click()
await page.waitForURL(/#\/worlds\/black-arrow-world/,{timeout:60000})
await page.goto('http://127.0.0.1:5173/#/worlds/black-arrow-world/timeline',{waitUntil:'domcontentloaded'})
await page.getByRole('button',{name:'Read to here'}).last().click()
for(const [scene,dead] of [['The Chase through Shoreby',false],['Arblaster’s Plea',true]]){
  await page.goto('http://127.0.0.1:5173/#/worlds/black-arrow-world/timeline',{waitUntil:'domcontentloaded'})
  await page.getByRole('button',{name:'Read to here'}).last().click()
  await page.goto('http://127.0.0.1:5173/#/worlds/black-arrow-world/maps',{waitUntil:'domcontentloaded'})
  await page.waitForTimeout(700)
  await page.getByRole('button',{name:'Characters',exact:true}).click()
  await page.locator('button[title*="'+scene+'"]').click()
  await page.goto('http://127.0.0.1:5173/#/worlds/black-arrow-world/characters',{waitUntil:'domcontentloaded'})
  await page.getByRole('textbox',{name:/Search characters/}).fill('Tom')
  await page.waitForTimeout(500)
  const card=page.locator('main a').filter({hasText:'Tom'}).first()
  const text=(await card.innerText()).replace(/\s+/g,' ')
  if(text.includes('deceased')!==dead)throw Error(`${scene}: Tom death state incorrect: ${text}`)
  console.log(scene,text)
}
if(errors.length)throw Error(errors.join('\n'))
console.log('console errors',errors.length)
await browser.close()
