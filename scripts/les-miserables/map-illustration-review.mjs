import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createHash}from 'node:crypto'
import {illustratedMapRegistration}from './map-registration-plan.mjs'
import {mapIllustrationRequirements}from './map-illustration-plan.mjs'

const root=new URL('./',import.meta.url)
const read=name=>JSON.parse(fs.readFileSync(new URL(name,root),'utf8'))
const sha=bytes=>createHash('sha256').update(bytes).digest('hex')
export const registrationHash=(imageHash,plan)=>sha(JSON.stringify({imageHash,...plan}))

// A staged illustration review does not replace the final in-app map pass.
export function applyIllustratedMaps(base,acceptance=read('MAP_ILLUSTRATION_ACCEPTANCE.json'),registration=illustratedMapRegistration){
  const layouts=structuredClone(base),accepted=new Set(),imageHashes=new Set()
  const encodings=acceptance.images.length?read('MAP_ENCODING.json').images:[]
  for(const row of acceptance.images){
    assert.ok(base[row.key]&&mapIllustrationRequirements[row.key],`Unknown illustrated map: ${row.key}`)
    assert.ok(!accepted.has(row.key),`Duplicate illustrated map: ${row.key}`)
    const encoding=encodings.find(image=>image.key===row.key),plan=registration[row.key]
    assert.ok(encoding&&plan,`Missing illustration encoding or registration: ${row.key}`)
    assert.equal(row.kind,mapIllustrationRequirements[row.key])
    assert.equal(encoding.source,`map-image-sources/${row.key}.png`)
    assert.equal(encoding.image,`${row.key}-illustrated.webp`)
    const source=fs.readFileSync(new URL(encoding.source,root)),target=fs.readFileSync(new URL(`map-staging/${encoding.image}`,root))
    assert.equal(sha(source),encoding.sourceSha256,`Changed map original: ${row.key}`)
    assert.equal(sha(target),encoding.encodedSha256,`Changed map encoding: ${row.key}`)
    assert.equal(row.sourceSha256,encoding.sourceSha256,`Map original needs fresh visual review: ${row.key}`)
    assert.equal(row.encodedSha256,encoding.encodedSha256,`Map encoding needs fresh visual review: ${row.key}`)
    assert.equal(source.length,encoding.sourceBytes)
    assert.equal(target.length,encoding.encodedBytes)
    assert.equal(source.toString('hex',0,8),'89504e470d0a1a0a')
    assert.deepEqual([source.readUInt32BE(16),source.readUInt32BE(20)],encoding.dimensions)
    assert.deepEqual([plan.width,plan.height],encoding.dimensions)
    assert.equal(target.toString('ascii',0,4),'RIFF')
    assert.equal(target.toString('ascii',8,12),'WEBP')
    assert.ok(!imageHashes.has(row.encodedSha256),`Reused map illustration: ${row.key}`)
    imageHashes.add(row.encodedSha256)
    assert.deepEqual(Object.keys(plan.locations).sort(),Object.keys(base[row.key].locations).sort(),`All map markers need fresh registration: ${row.key}`)
    assert.deepEqual(Object.keys(plan.landmarks).sort(),Object.keys(plan.locations).sort())
    for(const [key,point]of Object.entries(plan.locations)){
      assert.ok(point.length===2&&Number.isFinite(point[0])&&Number.isFinite(point[1])&&point[0]>=0&&point[0]<=plan.width&&point[1]>=0&&point[1]<=plan.height,`Invalid illustrated position: ${key}`)
      assert.ok(plan.landmarks[key].trim())
    }
    assert.equal(row.registrationSha256,registrationHash(row.encodedSha256,plan),`Map positions need fresh visual review: ${row.key}`)
    assert.equal(row.sourceAndEncodingReview,'passed')
    assert.equal(row.markerRegistrationReview,'passed')
    assert.ok(row.evidence.trim())
    layouts[row.key]={...layouts[row.key],width:plan.width,height:plan.height,image:encoding.image,locations:structuredClone(plan.locations),artworkKind:row.kind}
    accepted.add(row.key)
  }
  return {layouts,accepted:[...accepted],pending:Object.keys(base).filter(key=>!accepted.has(key))}
}
