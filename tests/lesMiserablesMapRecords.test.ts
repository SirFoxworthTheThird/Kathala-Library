import fs from 'node:fs'
import {createHash}from 'node:crypto'
import {expect,test}from 'vitest'
import {buildMapRecords}from '../scripts/les-miserables/map-records.mjs'

const stamp={worldId:'map-test',createdAt:1,updatedAt:1}
test('can namespace review records so importing the fixture cannot replace edition maps or images',()=>{
  const edition=buildMapRecords(stamp,{embedded:false})
  const review=buildMapRecords({...stamp,worldId:'review'},{embedded:false,idPrefix:'lesmis-map-review'})
  const ids=new Set([...edition.mapLayers,...edition.locationMarkers,...edition.blobs].map(row=>row.id))
  expect([...review.mapLayers,...review.locationMarkers,...review.blobs].some(row=>ids.has(row.id))).toBe(false)
  expect(review.locationMarkers.find(p=>p.id==='lesmis-map-review-location-corinthe')?.linkedMapLayerId).toBe('lesmis-map-review-map-corinthe-ground-floor')
})

test('converts top-left raster registration into the app upward Leaflet Y axis once',()=>{
  const {locationMarkers:places}=buildMapRecords(stamp,{embedded:false})
  const paris=places.find(p=>p.id==='lesmis-location-paris')
  const river=places.find(p=>p.id==='lesmis-location-seine-paris')
  expect([paris.x,paris.y]).toEqual([601,1208-614])
  expect([river.x,river.y]).toEqual([1260,969-800])
  expect(places.find(p=>p.id==='lesmis-location-corinthe-first-floor-window')?.y).toBe(1060-823)
})

test('exports the full root-to-Corinthe chain and shares the building door between floors',()=>{
  const {mapLayers:maps,locationMarkers:places}=buildMapRecords(stamp,{embedded:false})
  const byId=new Map(maps.map(row=>[row.id,row]))
  const chain=[]
  for(let row=byId.get('lesmis-map-corinthe-first-floor');row;row=byId.get(row.parentMapId))chain.push(row.id)
  expect(chain).toEqual(['lesmis-map-corinthe-first-floor','lesmis-map-chanvrerie-streets','lesmis-map-paris-les-halles','lesmis-map-paris','lesmis-map-paris-environs','lesmis-map-france','lesmis-map-atlantic-context'])
  expect(places.find(p=>p.id==='lesmis-location-paris-halles-gateway')?.linkedMapLayerId).toBe('lesmis-map-paris-les-halles')
  expect(places.find(p=>p.id==='lesmis-location-corinthe')?.linkedMapLayerId).toBe('lesmis-map-corinthe-ground-floor')
  expect(places.filter(p=>p.linkedMapLayerId==='lesmis-map-corinthe-first-floor')).toEqual([])
  expect(byId.get('lesmis-map-corinthe-first-floor')?.levelGroupId).toBe(byId.get('lesmis-map-corinthe-ground-floor')?.levelGroupId)
  expect(maps[0].id).toBe('lesmis-map-atlantic-context')
  expect(maps.every((map,index)=>!map.parentMapId||maps.findIndex(parent=>parent.id===map.parentMapId)<index)).toBe(true)
  expect(maps).toHaveLength(53)
  expect(places).toHaveLength(416)
  expect(new Set([...maps,...places].map(row=>row.id)).size).toBe(469)
  expect(maps.every(m=>m.scalePixelsPerUnit===null&&m.worldId==='map-test')).toBe(true)
})

test('embeds the actual reviewed image bytes and never uses map artwork as a place portrait',()=>{
  const model=buildMapRecords(stamp)
  const encoding=JSON.parse(fs.readFileSync(new URL('../scripts/les-miserables/MAP_ENCODING.json',import.meta.url),'utf8'))
  for(const map of model.mapLayers){
    const blob=model.blobs.find(b=>b.id===map.imageId)
    const key=map.id.replace('lesmis-map-','')
    expect(blob?.mimeType).toBe('image/webp')
    expect(createHash('sha256').update(Buffer.from(blob.dataBase64,'base64')).digest('hex')).toBe(encoding.images.find(i=>i.key===key).encodedSha256)
  }
  expect(model.locationMarkers.every(place=>place.imageId===null)).toBe(true)
  const external=buildMapRecords(stamp,{embedded:false})
  expect(external.blobs.every(blob=>blob.url.startsWith('library/les-miserables/maps/')&&!('dataBase64'in blob))).toBe(true)
})
