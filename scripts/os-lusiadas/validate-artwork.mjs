import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const here=path.dirname(fileURLToPath(import.meta.url))
const repo=path.resolve(here,'../..')
const manifest=JSON.parse(fs.readFileSync(path.join(here,'artwork-manifest.json'),'utf8'))
const world=JSON.parse(fs.readFileSync(path.join(repo,'library/os-lusiadas.pwk'),'utf8'))
const listed=new Set()
const hashes=new Map()
for(const asset of manifest.assets) {
  assert.ok(!listed.has(asset.path),`Duplicate manifest path ${asset.path}`)
  listed.add(asset.path)
  assert.ok(asset.path.startsWith('library/os-lusiadas/'),`${asset.path} inside single-copy layout`)
  assert.ok(asset.prompt&&asset.review&&asset.source,`${asset.path} provenance and visual review`)
  const bytes=fs.readFileSync(path.join(repo,asset.path))
  const hash=crypto.createHash('sha256').update(bytes).digest('hex')
  assert.equal(hash,asset.sha256,`${asset.path} approved bytes`)
  assert.ok(!hashes.has(hash),`${asset.path} duplicates ${hashes.get(hash)}`)
  hashes.set(hash,asset.path)
}
const referenced=new Set(world.blobs.filter(blob=>blob.url?.startsWith('library/os-lusiadas/')).map(blob=>blob.url))
assert.deepEqual([...referenced].sort(),[...listed].sort(),'Every local artwork reference has one manifest entry')
const missing={characters:world.characters.filter(x=>!x.portraitImageId).map(x=>x.name),
  places:world.locationMarkers.filter(x=>!x.imageId).map(x=>x.name),
  items:world.items.filter(x=>!x.imageId).map(x=>x.name),
  factions:world.factions.filter(x=>!x.coverImageId).map(x=>x.name)}
console.log(`PASS: ${listed.size} local artwork files match reviewed manifest and PWK references`)
for(const [type,names] of Object.entries(missing)) console.log(`${type} missing art: ${names.length}${names.length?` — ${names.slice(0,5).join(', ')}${names.length>5?'…':''}`:''}`)
if(process.argv.includes('--complete')) for(const [type,names] of Object.entries(missing)) assert.equal(names.length,0,`${type} art complete`)
