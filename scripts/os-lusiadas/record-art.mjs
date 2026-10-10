import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

// Record a reviewed selection from the built-in generator without copying
// random image output into the shipped Library by hand. The pending file is
// a work queue, cleared only after all entries have been recorded.
const here=path.dirname(fileURLToPath(import.meta.url))
const repo=path.resolve(here,'../..')
const manifestPath=path.join(here,'artwork-manifest.json')
const pendingPath=path.join(here,'artwork-pending.json')
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'))
const pending=JSON.parse(fs.readFileSync(pendingPath,'utf8'))
for(const item of pending) {
  if(!item.sourcePath||!item.path||!item.entity||!item.prompt||!item.review) throw Error(`Incomplete art record ${item.path}`)
  const destination=path.resolve(repo,item.path)
  if(!destination.startsWith(path.resolve(repo,'library/os-lusiadas/art')+path.sep)) throw Error(`Outside book art directory: ${item.path}`)
  if(fs.existsSync(destination)) throw Error(`Art already exists: ${destination}`)
  fs.mkdirSync(path.dirname(destination),{recursive:true})
  fs.copyFileSync(item.sourcePath,destination)
  const sha256=crypto.createHash('sha256').update(fs.readFileSync(destination)).digest('hex')
  if(manifest.assets.some(asset=>asset.path===item.path)) throw Error(`Manifest already has ${item.path}`)
  manifest.assets.push({path:item.path,entity:item.entity,
    source:item.correctionPrompt?'OpenAI imagegen built-in tool, original generation and edit, 2026-10-10':'OpenAI imagegen built-in tool, original generation, 2026-10-10',
    prompt:item.prompt,...(item.correctionPrompt?{correctionPrompt:item.correctionPrompt}:{}),review:item.review,sha256})
  console.log(`${item.path} ${sha256}`)
}
fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n')
fs.writeFileSync(pendingPath,'[]\n')
