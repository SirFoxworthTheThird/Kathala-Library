import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const root=path.resolve(import.meta.dirname,'../..')
const world=JSON.parse(await fs.readFile(path.resolve(root,'library/black-arrow.pwk'),'utf8'))
const require=createRequire(path.resolve(root,'../Plot'+'Weave/package.json'))
const {chromium}=require('playwright')
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server']})
const context=await browser.newContext({viewport:{width:1500,height:1100},deviceScaleFactor:1})
await context.route('**/library/**',async route=>{
  const name=decodeURIComponent(new URL(route.request().url()).pathname.split('/library/')[1]??'')
  const file=path.resolve(root,'library',name)
  if(!file.startsWith(path.resolve(root,'library')+path.sep))return route.abort()
  try{await route.fulfill({status:200,body:await fs.readFile(file),contentType:'image/png'})}
  catch{await route.fulfill({status:404,body:'Missing image'})}
})
const byId=new Map(world.blobs.map(blob=>[blob.id,blob.url]))
const assets=[
  ['World',world.world.name,world.world.coverImageId],
  ...world.mapLayers.map(record=>['Map',record.name,record.imageId]),
  ...world.characters.map(record=>['Character',record.name,record.portraitImageId]),
  ...world.items.map(record=>['Item',record.name,record.imageId]),
  ...world.locationMarkers.map(record=>['Location',record.name,record.imageId]),
]
if(assets.length!==93||new Set(assets.map(x=>x[2])).size!==93)throw Error('Expected 93 unique artwork assignments')
const out=path.resolve(import.meta.dirname,'qa','art-gallery')
await fs.mkdir(out,{recursive:true})
const page=await context.newPage()
for(let i=0;i<assets.length;i+=9){
  const group=assets.slice(i,i+9)
  const cards=group.map(([kind,name,id])=>{
    const url=byId.get(id)
    if(!url)throw Error(`Missing blob for ${kind}: ${name}`)
    return `<article><div class="label">${kind}: ${name.replaceAll('&','&amp;').replaceAll('<','&lt;')}</div><img alt="${name.replaceAll('&','&amp;').replaceAll('<','&lt;')}" src="http://127.0.0.1:5173/${url}"></article>`
  }).join('')
  await page.setContent(`<style>body{margin:0;background:#201c19;color:#f4e9d3;font:16px Georgia,serif}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:8px}article{height:340px;background:#352f28;overflow:hidden}.label{height:28px;padding:7px 12px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}img{display:block;width:100%;height:302px;object-fit:contain;background:#171411}</style><div class="grid">${cards}</div>`)
  await page.waitForFunction(()=>[...document.images].length>0&&[...document.images].every(img=>img.complete&&img.naturalWidth>0),null,{timeout:15000})
  const file=path.join(out,`${String(i/9+1).padStart(2,'0')}.png`)
  await page.screenshot({path:file,fullPage:true})
  console.log(path.basename(file),group.length,group.map(x=>x[1]).join(' | '))
}
await browser.close()
