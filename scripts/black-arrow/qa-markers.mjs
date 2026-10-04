import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
const require = createRequire(path.resolve(import.meta.dirname, '../../../Plot'+'Weave/package.json'))
const { chromium } = require('playwright')
const root = path.resolve(import.meta.dirname, '../..')
const world = JSON.parse(await fs.readFile(path.resolve(root,'library/black-arrow.pwk'),'utf8'))
const browser = await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server','--host-resolver-rules=MAP fonts.googleapis.com ~NOTFOUND, MAP fonts.gstatic.com ~NOTFOUND']})
const context = await browser.newContext({viewport:{width:1500,height:950}})
await context.route('**/library/**',async route=>{const url=new URL(route.request().url());const name=decodeURIComponent(url.pathname.split('/library/')[1]??'');const file=path.resolve(root,'library',name);if(!file.startsWith(path.resolve(root,'library')+path.sep))return route.abort();try{const body=await fs.readFile(file);await route.fulfill({status:200,body,contentType:file.endsWith('.json')?'application/json':file.endsWith('.png')?'image/png':'application/octet-stream'})}catch{await route.fulfill({status:404,body:'Missing asset'})}})
const page=await context.newPage(),errors=[]
page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('pageerror',e=>errors.push(e.message))
await page.goto('http://127.0.0.1:5173/',{waitUntil:'domcontentloaded'})
await page.getByRole('button',{name:'Library',exact:true}).click()
await page.getByRole('textbox',{name:/Search the library/}).fill('Black Arrow')
await page.getByRole('button',{name:/Download \([\d,.]+ (?:KB|MB)\)/}).click()
await page.waitForURL(/#\/worlds\/black-arrow-world/,{timeout:60000})
await page.goto('http://127.0.0.1:5173/#/worlds/black-arrow-world/timeline',{waitUntil:'domcontentloaded'})
await page.getByRole('button',{name:'Read to here'}).last().click()
await page.goto('http://127.0.0.1:5173/#/worlds/black-arrow-world/maps',{waitUntil:'domcontentloaded'})
await page.waitForTimeout(700)
await page.getByRole('button',{name:'Next scene in this chapter'}).click()
await page.getByRole('button',{name:'Next scene in this chapter'}).click()
await page.getByRole('button',{name:'Characters',exact:true}).click()
const out=path.resolve(import.meta.dirname,'qa','markers')
await fs.mkdir(out,{recursive:true})
let checked=0
for(const layer of world.mapLayers){
  await page.getByRole('button',{name:layer.name,exact:true}).first().click()
  await page.waitForTimeout(300)
  const markers=world.locationMarkers.filter(x=>x.mapLayerId===layer.id)
  const section=page.getByRole('button',{name:new RegExp(`^Locations\\s*${markers.length}$`)})
  await section.click()
  for(const [index,marker] of markers.entries()){
    const row=page.locator('[data-sidebar-section-body="Locations"]').getByRole('button',{name:marker.name,exact:true})
    await row.click()
    await page.waitForFunction(name => {
      const images=[...document.querySelectorAll('main img')]
      return images.some(img=>img.alt===name) && images.every(img=>img.complete && img.naturalWidth>0)
    }, marker.name, {timeout:5000})
    await page.waitForTimeout(500)
    const panel=page.locator('main').getByText(marker.name,{exact:true}).last()
    if(!(await panel.count()))throw Error(`Panel missing for ${marker.name}`)
    const broken=await page.locator('main img').evaluateAll(xs=>xs.filter(x=>!x.complete||x.naturalWidth===0).map(x=>x.alt))
    if(broken.length)throw Error(`Broken image for ${marker.name}: ${JSON.stringify(await page.locator('main img').evaluateAll(xs=>xs.map(x=>({alt:x.alt,src:x.src,complete:x.complete,width:x.naturalWidth}))))}`)
    const filename=`${String(checked+1).padStart(2,'0')}-${marker.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.png`
    await page.screenshot({path:path.resolve(out,filename),clip:{x:310,y:48,width:1190,height:839}})
    checked++
  }
  await section.click()
  console.log('layer',layer.name,markers.length)
}
if(errors.length)throw Error(errors.join('\n'))
console.log('marker panels and artwork checked',checked,'console errors',errors.length)
await browser.close()
