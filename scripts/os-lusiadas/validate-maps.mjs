import assert from 'node:assert/strict'
import fs from 'node:fs'
import { mapDefs, places } from './map-model.mjs'

const maps=new Map(mapDefs.map(([key,parent])=>[key,{parent}]))
assert.equal(maps.size,mapDefs.length)
for(const [key,entry] of maps) {
  const path=new URL(`../../library/os-lusiadas/maps/${key}.png`,import.meta.url)
  const bytes=fs.readFileSync(path)
  assert.equal(bytes.subarray(1,4).toString(),'PNG',`${key} PNG`)
  entry.width=bytes.readUInt32BE(16);entry.height=bytes.readUInt32BE(20)
  assert.ok(entry.width>=1500&&entry.height>=1200,`${key} size`)
  if(entry.parent) {
    assert.ok(maps.has(entry.parent),`${key} parent exists`)
    const gateways=places.filter(p=>p.map===entry.parent&&p.child===key)
    assert.equal(gateways.length,1,`${key} has exactly one parent gateway`)
  }
}
assert.equal(places.length,new Set(places.map(p=>p.key)).size,'unique place keys')
for(const place of places) {
  const map=maps.get(place.map)
  assert.ok(map,`${place.key} map exists`)
  assert.ok(place.x>=0&&place.x<map.width&&place.y>=0&&place.y<map.height,`${place.key} bottom-edge position`)
  assert.ok(place.description.length>25,`${place.key} place-specific description`)
}
for(const key of maps.keys()) assert.ok(places.some(p=>p.map===key),`${key} populated`)
assert.equal(mapDefs.filter(([,parent])=>parent===null).length,4,'ocean, tale, island, divine roots')
console.log(`PASS: ${maps.size} navigable maps, ${places.length} placed locations, four unique parent gateways, all pixels in bounds`)
