import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'

const root=path.resolve(new URL('../..',import.meta.url).pathname.slice(1))
const world=JSON.parse(fs.readFileSync(path.join(root,'library/little-women.pwk'),'utf8'))
const review=JSON.parse(fs.readFileSync(new URL('./art-review.json',import.meta.url),'utf8'))
const reviewed=new Map(review.assets.map(asset=>[asset.file,asset]))
const sha=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
const dimensions=file=>{
  const b=fs.readFileSync(file)
  assert.equal(b.toString('ascii',0,4),'RIFF',`${file} must be WebP`)
  assert.equal(b.toString('ascii',8,12),'WEBP',`${file} must be WebP`)
  const chunk=b.toString('ascii',12,16)
  if(chunk==='VP8 ')return[b.readUInt16LE(26)&0x3fff,b.readUInt16LE(28)&0x3fff]
  if(chunk==='VP8L')return[1+b[21]+((b[22]&0x3f)<<8),1+((b[22]>>6)|(b[23]<<2)|((b[24]&0xf)<<10))]
  if(chunk==='VP8X')return[1+b.readUIntLE(24,3),1+b.readUIntLE(27,3)]
  throw Error(`${file} has unsupported WebP chunk ${chunk}`)
}

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
  assert.equal(record.compression.format,'WebP',`${relative} lacks compression evidence`)
  assert.equal(record.compression.compressedBytes,fs.statSync(file).size,`${relative} compression byte count drift`)
  assert.ok(record.compression.compressedBytes/record.compression.originalBytes<=0.21,`${relative} does not meet the pilot size target`)
  assert.ok(record.compression.psnrDb>=35,`${relative} falls below the pilot fidelity threshold`)
  assert.match(record.compressionInspection,/^approved:/,`${relative} lacks compression visual approval`)
  assert.equal(path.extname(relative),'.webp',`${relative} must use compressed WebP`)
  assert.equal(world.blobs.find(blob=>blob.url===relative).mimeType,'image/webp',`${relative} has wrong MIME type`)
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
const originalBytes=[...used].reduce((sum,relative)=>sum+reviewed.get(relative).compression.originalBytes,0)
const compressedBytes=[...used].reduce((sum,relative)=>sum+reviewed.get(relative).compression.compressedBytes,0)
console.log(`Art PASS: ${used.size} WebP images hash-bound to visual approvals; ${originalBytes} -> ${compressedBytes} bytes (${((1-compressedBytes/originalBytes)*100).toFixed(1)}% smaller); PSNR >= 35 dB; duplicate hashes = 0.`)
