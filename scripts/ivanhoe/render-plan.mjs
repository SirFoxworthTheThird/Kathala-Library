// Render one retained native SVG plan without resizing or remote requests.
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import assert from 'node:assert/strict'
import fs from 'node:fs'
const key=process.argv[2]
assert.match(key??'',/^[a-z][a-z0-9-]+$/)
const require=createRequire(`${process.env.KATHALA_APP??'F:/Projects/WorldBreaker/Kathala-ivanhoe-qa'}/package.json`)
const {chromium}=require('playwright'),browser=await chromium.launch({headless:true})
try{
  const source=new URL(`./map-originals/${key}.svg`,import.meta.url)
  const header=fs.readFileSync(source,'utf8').match(/<svg[^>]*width="(\d+)"[^>]*height="(\d+)"/)
  assert.ok(header,'SVG requires explicit pixel dimensions')
  const width=Number(header[1]),height=Number(header[2])
  assert.ok(width>=800&&width<=2400&&height>=600&&height<=2400,'Reviewable plan dimensions')
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1})
  await page.goto(new URL(`./map-originals/${key}.svg`,import.meta.url).href)
  await page.screenshot({path:fileURLToPath(new URL(`./map-originals/${key}.png`,import.meta.url))})
  console.log(`${key}: Chromium ${browser.version()}, ${width}x${height}, deviceScaleFactor 1`)
}finally{await browser.close()}
