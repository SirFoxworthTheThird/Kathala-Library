import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'

const root=path.resolve(new URL('../..',import.meta.url).pathname.slice(1))
const world=JSON.parse(fs.readFileSync(path.join(root,'library/little-women.pwk'),'utf8'))
const review=JSON.parse(fs.readFileSync(new URL('./art-review.json',import.meta.url),'utf8'))
const reviewed=new Map(review.assets.map(asset=>[asset.file,asset]))
const sha=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
const dimensions=file=>{const b=fs.readFileSync(file);assert.equal(b.toString('ascii',1,4),'PNG',`${file} must be PNG`);return[b.readUInt32BE(16),b.readUInt32BE(20)]}

const used=new Set(world.blobs.map(blob=>blob.url))
assert.equal(used.size,world.blobs.length,'blob URLs must be unique')
const usedHashes=new Map()
for(const relative of used){
  const file=path.join(root,relative)
  assert.ok(fs.existsSync(file),`missing used image ${relative}`)
  const record=reviewed.get(relative)
  assert.ok(record,`used image lacks visual review ${relative}`)
  assert.equal(record.status,'approved',`used image is not approved ${relative}`)
  const digest=sha(file)
  assert.equal(digest,record.sha256,`review hash drift ${relative}`)
  assert.ok(!usedHashes.has(digest),`${relative} duplicates ${usedHashes.get(digest)}`)
  usedHashes.set(digest,relative)
  const [width,height]=dimensions(file)
  assert.ok(width>=768&&height>=768,`${relative} is too small at ${width}x${height}`)
}

for(const record of review.assets){
  const file=path.join(root,record.file)
  assert.ok(fs.existsSync(file),`reviewed file missing ${record.file}`)
  assert.equal(sha(file),record.sha256,`reviewed file changed ${record.file}`)
}

assert.equal(world.mapLayers.filter(layer=>layer.imageId).length,6,'six illustrated map layers')
assert.equal(world.characters.filter(character=>character.portraitImageId).length,16,'sixteen core and family portraits')
assert.equal(world.items.filter(item=>item.imageId).length,8,'all story items illustrated')
console.log(`Art PASS: ${used.size} used images hash-bound to visual approvals; 16 portraits, 8 items, 6 maps, 1 cover; duplicate hashes = 0.`)
