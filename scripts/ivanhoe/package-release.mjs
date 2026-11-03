// Local packaging only. This script neither invokes git nor makes network calls.
import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {validateManuscript} from './manuscript-validation.mjs'
import {validateEnrichment} from './enrichment-validation.mjs'
import {readReleaseApproval} from './release-approval.mjs'

const book=new URL('./',import.meta.url),root=new URL('../../',import.meta.url)
const read=path=>JSON.parse(fs.readFileSync(new URL(path,book),'utf8'))
const bytes=fs.readFileSync(new URL('./authoring-review.pwk',book))
const sha256=createHash('sha256').update(bytes).digest('hex')
const world=JSON.parse(bytes.toString('utf8'))
assert.equal(world.world.name,'Ivanhoe','Generate the final-name candidate with --candidate before its final application review')
assert.equal(world.world.id,'ivanhoe-world')
validateManuscript(world)
validateEnrichment(world)
readReleaseApproval(bytes)
const art=read('./asset-manifest.json'),maps=read('./map-manifest.json')
assert.equal(art.assets.length,304)
assert.equal(maps.maps.length,30)
assert.ok(art.assets.every(row=>row.appReviewed),'Release blocked: final ordinary artwork approval incomplete')
assert.ok(maps.maps.every(row=>row.appReviewed&&row.coordinatesReviewed&&row.gatewaysReviewed),'Release blocked: final map approval incomplete')
assert.equal(world.blobs.length,334)
for(const blob of world.blobs){
  assert.equal(blob.dataBase64,undefined,'Library delivery must not re-embed image data')
  assert.match(blob.url,/^library\/ivanhoe\/art\/generated\/(?:maps\/)?[a-z0-9-]+\.webp$/)
  const asset=[...art.assets,...maps.maps].find(row=>row.compressed.path.replace(/[^a-zA-Z0-9-]/g,'-')===blob.id.replace('ivanhoe-image-',''))
  assert.ok(asset,`Unmanifested URL image ${blob.id}`)
  const actual=createHash('sha256').update(fs.readFileSync(new URL(blob.url,root))).digest('hex')
  assert.equal(actual,asset.compressed.sha256,`Published asset differs from approved image ${blob.url}`)
}
assert.ok(bytes.length<10_000_000,'Reading download unexpectedly contains large image data')

const playback=read('./qa/continuous-playback.json')
assert.equal(playback.fixtureSha256,sha256,'Release blocked: playback belongs to different candidate bytes')
assert.equal(playback.complete,true)
assert.equal(playback.completed,world.events.length)
for(const field of ['pageErrors','networkFailures','consoleErrors'])assert.deepEqual(playback[field],[],`Playback ${field}`)
const pages=read('./qa/all-pages-review.json')
assert.equal(pages.fixtureSha256,sha256,'Release blocked: page review belongs to different candidate bytes')
assert.equal(pages.appBuildSha256,playback.appBuildSha256,'Release blocked: page review and playback used different app builds')
assert.equal(pages.observations.length,15,'Release blocked: application page coverage incomplete')
assert.deepEqual(pages.pageErrors,[])
const destination=new URL('./library/ivanhoe.pwk',root)
if(fs.existsSync(destination))assert.equal(JSON.parse(fs.readFileSync(destination,'utf8')).world.id,world.world.id,'Do not overwrite a different book')
fs.writeFileSync(destination,bytes)
const cover=art.assets.find(row=>row.id==='cover')
const coverDirectory=new URL('./library/ivanhoe/art/generated/',root)
fs.mkdirSync(coverDirectory,{recursive:true})
fs.copyFileSync(new URL(cover.compressed.path,root),new URL('cover.webp',coverDirectory))
const indexPath=new URL('./library/index.json',root),index=JSON.parse(fs.readFileSync(indexPath,'utf8'))
const entry={id:'ivanhoe',title:'Ivanhoe',author:'Walter Scott',blurb:world.world.description,data:'ivanhoe.pwk',dataBytes:bytes.length,counts:{characters:world.characters.length,chapters:world.chapters.length,events:world.events.length,locations:world.locationMarkers.length},notice:'Unofficial reading edition of Walter Scott’s public-domain English original from Project Gutenberg eBook 82. The complete 44-chapter narrative, introduction, dedicatory epistle, title and contents matter, ten chapter notes and footnotes are retained. Editorial scene divisions, approximate chronology, reconstructed maps and 334 generated illustrations are documented in the included Lore. Gutenberg’s distribution notice and licence are retained in a separate Lore page.',worldId:world.world.id,cover:'library/ivanhoe/art/generated/cover.webp',hasProse:true}
const existing=index.entries.find(row=>row.id==='ivanhoe')
if(existing)Object.assign(existing,entry)
else index.entries.push(entry)
fs.writeFileSync(indexPath,JSON.stringify(index,null,2)+'\n')
fs.writeFileSync(new URL('./LOCAL_PACKAGE.json',book),JSON.stringify({status:'PACKAGED LOCALLY; CATALOGUE, RELEASE TESTS, DIFF AND SHIPPED-ARTIFACT REVIEW STILL REQUIRED',path:'library/ivanhoe.pwk',sha256,bytes:bytes.length,counts:entry.counts},null,2)+'\n')
console.log(`Packaged library/ivanhoe.pwk (${bytes.length} bytes; SHA-256 ${sha256}). Run the remaining release gates before calling it ready.`)
