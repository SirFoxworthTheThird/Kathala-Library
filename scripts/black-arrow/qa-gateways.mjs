import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
const require = createRequire(path.resolve(import.meta.dirname, '../../../Plot'+'Weave/package.json'))
const { chromium } = require('playwright')
const root=path.resolve(import.meta.dirname,'../..')
const world=JSON.parse(await fs.readFile(path.resolve(root,'library/black-arrow.pwk'),'utf8'))
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server','--host-resolver-rules=MAP fonts.googleapis.com ~NOTFOUND, MAP fonts.gstatic.com ~NOTFOUND']})
const context=await browser.newContext({viewport:{width:1500,height:950}})
await context.route('**/library/**',async route=>{const url=new URL(route.request().url());const name=decodeURIComponent(url.pathname.split('/library/')[1]??'');const file=path.resolve(root,'library',name);if(!file.startsWith(path.resolve(root,'library')+path.sep))return route.abort();try{const body=await fs.readFile(file);await route.fulfill({status:200,body,contentType:file.endsWith('.json')?'application/json':file.endsWith('.png')?'image/png':'application/octet-stream'})}catch{await route.fulfill({status:404,body:'Missing asset'})}})
const page=await context.newPage(),errors=[]
page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('pageerror',e=>errors.push(e.stack??e.message))
await page.goto('http://127.0.0.1:5173/',{waitUntil:'domcontentloaded'})
await page.getByRole('button',{name:'Library',exact:true}).click()
await page.getByRole('textbox',{name:/Search the library/}).fill('Black Arrow')
await page.getByRole('button',{name:/Download \([\d,.]+ (?:KB|MB)\)/}).click()
await page.waitForURL(/#\/worlds\/black-arrow-world/,{timeout:60000})
await page.goto('http://127.0.0.1:5173/#/worlds/black-arrow-world/timeline',{waitUntil:'domcontentloaded'})
await page.getByRole('button',{name:'Read to here'}).last().click()
await page.goto('http://127.0.0.1:5173/#/worlds/black-arrow-world/maps',{waitUntil:'domcontentloaded'})
await page.waitForTimeout(1200)
await page.getByRole('button',{name:'Characters',exact:true}).click()
let currentLayer='Tunstall, the Till, and Shoreby'
for(const [parent,gateway,child] of [
  ['Tunstall, the Till, and Shoreby','Tunstall hamlet','Tunstall Hamlet'],
  ['Tunstall, the Till, and Shoreby','Tunstall forest','Tunstall Forest'],
  ['Tunstall, the Till, and Shoreby','Moat House','The Moat House'],
  ['Tunstall, the Till, and Shoreby','Shoreby','Shoreby'],
  ['Shoreby','Shoreby harbour','The Good Hope'],
  ['Shoreby','Shoreby abbey','Shoreby Abbey'],
  ['Shoreby','Sir Daniel’s Shoreby house','Sir Daniel’s Shoreby House'],
  ['Tunstall, the Till, and Shoreby','Holywood Abbey','Holywood Abbey'],
]){
  if(currentLayer!==parent)await page.getByRole('button',{name:parent,exact:true}).first().click()
  await page.waitForTimeout(400)
  const parentId=world.mapLayers.find(x=>x.name===parent)?.id
  const locationCount=world.locationMarkers.filter(x=>x.mapLayerId===parentId).length
  const section=page.getByRole('button',{name:new RegExp(`^Locations\\s*${locationCount}$`)})
  const candidate=page.locator('[data-sidebar-section-body="Locations"]').getByRole('button',{name:gateway,exact:true})
  if(!(await candidate.count()) || !(await candidate.isVisible()))await section.click()
  if(!(await candidate.count()))throw Error(`Gateway ${gateway} is absent from ${parent}`)
  const html=await candidate.evaluate(x=>x.closest('button,a,[role="button"]')?.outerHTML.slice(0,450)??x.outerHTML.slice(0,450))
  console.log('gateway',parent,'->',gateway,'target',child,'html',html)
  await candidate.click()
  await page.getByRole('button',{name:/Open sub-map/i}).last().click()
  await page.waitForTimeout(450)
  if(!(await page.locator('header').count()))throw Error(`Header missing after gateway ${gateway}: ${page.url()} ${errors.join(' | ')} ${(await page.locator('body').innerText()).slice(0,250)}`)
  const header=(await page.locator('header').innerText()).replace(/\s+/g,' ')
  if(!header.includes(child))throw Error(`Gateway ${gateway} did not open ${child}: ${header}`)
  console.log('arrival',gateway,'->',child)
  currentLayer=child
  await page.getByRole('button',{name:'Close location panel'}).click()
}
await page.getByRole('button',{name:'Play story on the map'}).click()
await page.waitForTimeout(800)
console.log('playback first',page.url(),(await page.locator('body').innerText()).slice(0,350).replace(/\s+/g,' '),errors)
await page.waitForTimeout(12000)
console.log('playback next',page.url(),(await page.locator('body').innerText()).slice(0,350).replace(/\s+/g,' '),errors)
await page.getByRole('button',{name:'Pause'}).click()
await page.locator('button[title*="Arblaster and the Good Hope"]').click()
console.log('ship before', (await page.locator('header').innerText()).replace(/\s+/g,' '))
await page.getByRole('button',{name:'Play story on the map'}).click()
await page.waitForTimeout(16000)
console.log('ship after', (await page.locator('header').innerText()).replace(/\s+/g,' '),errors.length)
await page.getByRole('button',{name:'Pause'}).click()
for(const [before,after,layer] of [
  ['Farewell to Jack Matcham','The Moat House Gate','The Moat House'],
  ['The House in the Snow','Alicia in the Stairway','Sir Daniel’s Shoreby House'],
  ['Taken to Sir Oliver','Before the Abbey Altar','Shoreby Abbey'],
]){
  await page.goto('http://127.0.0.1:5173/#/worlds/black-arrow-world/timeline',{waitUntil:'domcontentloaded'})
  await page.getByRole('button',{name:'Read to here'}).last().click()
  await page.goto('http://127.0.0.1:5173/#/worlds/black-arrow-world/maps',{waitUntil:'domcontentloaded'})
  await page.waitForTimeout(800)
  await page.getByRole('button',{name:'Characters',exact:true}).click()
  await page.locator('button[title*="'+before+'"]').click()
  await page.getByRole('button',{name:'Play story on the map'}).click()
  await page.waitForFunction(({after,layer})=>{
    const header=document.querySelector('header')?.textContent??''
    return header.includes(after)&&header.includes(layer)
  },{after,layer},{timeout:35000,polling:100}).catch(async e=>{throw Error(`${e.message}; current header: ${(await page.locator('header').innerText()).replace(/\s+/g,' ')}`)})
  const header=(await page.locator('header').innerText()).replace(/\s+/g,' ')
  if(!header.includes(after)||!header.includes(layer))throw Error(`Playback ${before} -> ${after} missed ${layer}: ${header}`)
  console.log('playback transition',before,'->',after,'layer',layer,'errors',errors.length)
  await page.getByRole('button',{name:'Pause'}).click()
}
console.log('errors',errors)
if(errors.length)throw Error(errors.join('\n'))
await browser.close()
