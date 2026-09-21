import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { narrativeText, normalize, countWords, sourceSha256 } from './source-text.mjs'

const root=path.resolve(import.meta.dirname,'../..'),file=path.join(root,'library/a-princess-of-mars.pwk'),data=JSON.parse(fs.readFileSync(file,'utf8')),fail=m=>{throw Error(m)},unique=a=>new Set(a).size===a.length
if(data.chapters.length!==28)fail('Expected 28 chapters')
if(data.events.length!==data.sceneTexts.length||data.events.length<84)fail('Expected at least three covered events per chapter')
if(data.timelines.length!==1)fail('Expected one chronology')
const sourceWords=countWords(narrativeText),sceneWords=data.sceneTexts.reduce((n,s)=>n+s.wordCount,0)
if(sceneWords!==sourceWords||sourceWords!==67158)fail(`Manuscript word count drift: ${sceneWords}/${sourceWords}`)
if(normalize(data.sceneTexts.map(s=>s.text).join('\n\n'))!==normalize(narrativeText))fail('Manuscript does not reconstruct exact normalized source')
const eventIds=new Set(data.events.map(e=>e.id)),sceneEventIds=data.sceneTexts.map(s=>s.eventId)
if(!unique(sceneEventIds)||sceneEventIds.length!==eventIds.size||sceneEventIds.some(id=>!eventIds.has(id)))fail('Event-to-scene coverage is not exactly 1:1')
for(const c of data.chapters)if(!data.events.some(e=>e.chapterId===c.id))fail(`Chapter without event: ${c.title}`)
if(!data.events.every(e=>Number.isFinite(e.inWorldTime)&&Number.isFinite(e.travelDays)&&e.travelDays>=0&&e.tension>=1&&e.tension<=5))fail('Calendar, elapsed time, or tension invalid')
const snapshotsByEvent=Map.groupBy(data.characterSnapshots,s=>s.eventId)
for(const e of data.events){const snaps=snapshotsByEvent.get(e.id)||[],expected=[...e.involvedCharacterIds].sort(),actual=snaps.map(s=>s.characterId).sort();if(JSON.stringify(expected)!==JSON.stringify(actual))fail(`Snapshot cast mismatch: ${e.title}`);if(!unique(snaps.map(s=>s.characterId)))fail(`Duplicate snapshot: ${e.title}`);if(!unique(snaps.map(s=>s.statusNotes)))fail(`Repeated status in event: ${e.title}`);if(snaps.some(s=>!s.statusNotes.trim()))fail(`Blank status: ${e.title}`)}
for(const key of ['powell','bar','keeper','tal']){const ss=data.characterSnapshots.filter(s=>s.characterId===`mars-char-${key}`);if(!ss.some(s=>s.isAlive)||!ss.some(s=>!s.isAlive))fail(`${key} alive-state change missing`)}
const layers=new Map(data.mapLayers.map(m=>[m.id,m])),markers=new Map(data.locationMarkers.map(m=>[m.id,m]))
if(data.mapLayers.filter(m=>!m.parentMapId).length!==2)fail('Expected Barsoom and Earth root maps')
for(const m of data.locationMarkers){const layer=layers.get(m.mapLayerId);if(!layer)fail(`Missing layer for ${m.name}`);if(m.x<0||m.y<0||m.x>layer.imageWidth||m.y>layer.imageHeight)fail(`Out-of-bounds marker ${m.name}`)}
for(const l of data.mapLayers.filter(x=>x.parentMapId)){const gates=data.locationMarkers.filter(m=>m.linkedMapLayerId===l.id);if(gates.length!==1)fail(`Submap ${l.name} has ${gates.length} gateways`);if(gates[0].mapLayerId!==l.parentMapId)fail(`Gateway for ${l.name} is not on parent`);if(!data.locationMarkers.some(m=>m.mapLayerId===l.id))fail(`Empty submap ${l.name}`)}
for(const r of data.mapRoutes){if(!layers.has(r.mapLayerId)||r.waypoints.length<2)fail(`Invalid route ${r.name}`);for(const p of r.waypoints){if(typeof p==='string'&&(!markers.has(p)||markers.get(p).mapLayerId!==r.mapLayerId))fail(`Route waypoint off-layer: ${r.name}`)}}
const refs=[...data.characters.map(x=>x.portraitImageId),...data.items.map(x=>x.imageId),...data.locationMarkers.map(x=>x.imageId),...data.mapLayers.map(x=>x.imageId),data.world.coverImageId].filter(Boolean),blobIds=new Set(data.blobs.map(b=>b.id));if(refs.some(id=>!blobIds.has(id)))fail('Unresolved image reference')
const hashes=[];for(const b of data.blobs){const p=path.join(root,b.url.replaceAll('/',path.sep));if(!fs.existsSync(p))fail(`Missing image ${b.url}`);hashes.push(crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'))}if(!unique(hashes))fail('Duplicated artwork bytes detected')
if(refs.length!==data.characters.length+data.items.length+data.locationMarkers.length+data.mapLayers.length+1)fail('Every entity must have artwork')
if(!unique(data.blobs.map(b=>b.id)))fail('Duplicate blob IDs')
const ids=new Set;for(const value of Object.values(data))if(Array.isArray(value))for(const x of value)if(x?.id){if(ids.has(x.id))fail(`Duplicate record id ${x.id}`);ids.add(x.id)}
console.log(JSON.stringify({sourceSha256,chapters:data.chapters.length,events:data.events.length,scenes:data.sceneTexts.length,words:sceneWords,characters:data.characters.length,snapshots:data.characterSnapshots.length,locations:data.locationMarkers.length,maps:data.mapLayers.length,routes:data.mapRoutes.length,items:data.items.length,images:data.blobs.length,duplicateArtwork:0},null,2))
