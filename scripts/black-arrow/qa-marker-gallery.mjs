import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const root=path.resolve(import.meta.dirname,'../..')
const require=createRequire(path.resolve(root,'../Plot'+'Weave/package.json'))
const {chromium}=require('playwright')
const source=path.resolve(import.meta.dirname,'qa','markers')
const files=(await fs.readdir(source)).filter(name=>name.endsWith('.png')).sort((a,b)=>Number(a.slice(0,2))-Number(b.slice(0,2)))
if(files.length!==45)throw Error(`Expected 45 marker screenshots; found ${files.length}`)
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-proxy-server']})
const context=await browser.newContext({viewport:{width:1500,height:1050}})
await context.route('http://marker.local/**',async route=>{
  const name=decodeURIComponent(new URL(route.request().url()).pathname.slice(1))
  if(!files.includes(name))return route.abort()
  await route.fulfill({status:200,body:await fs.readFile(path.join(source,name)),contentType:'image/png'})
})
const page=await context.newPage()
const out=path.resolve(import.meta.dirname,'qa','marker-gallery')
await fs.mkdir(out,{recursive:true})
for(let i=0;i<files.length;i+=9){
  const group=files.slice(i,i+9)
  const cards=group.map(name=>`<article><div>${name}</div><img src="http://marker.local/${encodeURIComponent(name)}"></article>`).join('')
  await page.setContent(`<style>body{margin:0;background:#201c19;color:#f4e9d3;font:15px Georgia,serif}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:6px}article{height:341px;background:#352f28;overflow:hidden}article div{height:24px;padding:3px 8px}img{display:block;width:100%;height:311px;object-fit:contain;background:#171411}</style><div class="grid">${cards}</div>`)
  await page.waitForFunction(()=>[...document.images].length===9&&[...document.images].every(img=>img.complete&&img.naturalWidth>0),null,{timeout:15000})
  const file=path.join(out,`${String(i/9+1).padStart(2,'0')}.png`)
  await page.screenshot({path:file,fullPage:true})
  console.log(path.basename(file),group.join(' | '))
}
await browser.close()
