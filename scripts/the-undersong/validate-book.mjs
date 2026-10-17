import fs from 'node:fs'
import {state,holders} from './event-state.mjs'
import path from 'node:path'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'
import {chapters as sourceChapters,narrativeText,countWords,normalize,sourceSha256,reconstructedMarkdown,sourceText} from './source-text.mjs'

const root=path.resolve(import.meta.dirname,'../..')
const pwkPath=path.join(root,'library/the-undersong.pwk')
const d=JSON.parse(fs.readFileSync(pwkPath,'utf8'))
const ordered=[...d.events].sort((a,b)=>a.sortOrder-b.sortOrder)
const unique=a=>new Set(a).size===a.length

assert.equal(sourceSha256,'cbfc15db2a76e3cb1d90edbb0035febd65c01de6cfee020193d5eb7445c4ca65','Creator source SHA-256')
assert.equal(normalize(reconstructedMarkdown),normalize(sourceText),'All source packaging and prose reconstruct exactly')
assert.equal(sourceChapters.length,8);assert.equal(sourceChapters.reduce((n,c)=>n+c.sections.length,0),26)
assert.equal(countWords(narrativeText),15530)
assert.equal(d.world.readingMode,true);assert.equal(d.world.name,'The Undersong');assert.equal(d.world.wordTarget,15530)
assert.equal(d.chapters.length,8);assert.equal(ordered.length,42);assert.equal(d.sceneTexts.length,42)
const scenes=ordered.map(e=>{const found=d.sceneTexts.filter(s=>s.eventId===e.id);assert.equal(found.length,1,`One scene text for ${e.title}`);assert.equal(found[0].wordCount,countWords(found[0].text),`Word count ${e.title}`);return found[0]})
assert.equal(normalize(scenes.map(s=>s.text).join('\n\n')),normalize(narrativeText),'No omitted, duplicated, or reordered manuscript prose')
assert.equal(scenes.reduce((n,s)=>n+s.wordCount,0),15530)
assert.ok(scenes.at(-1).text.endsWith('each time he recognized them less as Agnes and more as the place where Agnes had been.'),'Final sentence retained')

const all=[];for(const value of Object.values(d))if(Array.isArray(value))for(const row of value)if(row?.id)all.push(row.id)
assert.ok(unique(all),'Every record id is unique')
const ids=Object.fromEntries(['chapters','events','characters','items','locationMarkers','mapLayers','plotThreads','motifs','lorePages','blobs','factions'].map(k=>[k,new Set(d[k].map(x=>x.id))]))
for(let i=0;i<ordered.length;i++){
 const e=ordered[i], snaps=d.characterSnapshots.filter(s=>s.eventId===e.id)
 assert.equal(e.status,'final');assert.ok(e.title&&e.description);assert.ok(ids.chapters.has(e.chapterId));assert.ok(ids.locationMarkers.has(e.locationMarkerId))
 assert.ok(Number.isFinite(e.inWorldTime)&&Number.isFinite(e.travelDays)&&e.travelDays>=0);assert.ok(e.tension>=1&&e.tension<=5)
 if(i)assert.ok(e.inWorldTime>=ordered[i-1].inWorldTime,`Nondecreasing time at ${e.title}`)
 assert.ok(unique(e.involvedCharacterIds));assert.ok(unique(e.mentionedCharacterIds));assert.ok(!e.involvedCharacterIds.some(x=>e.mentionedCharacterIds.includes(x)),`Present and mentioned sets disjoint: ${e.title}`)
 assert.deepEqual(snaps.map(s=>s.characterId).sort(),[...e.involvedCharacterIds].sort(),`Exactly one snapshot per physically present character: ${e.title}`)
 assert.ok(unique(snaps.map(s=>s.characterId)));for(const held of snaps.flatMap(s=>s.inventoryItemIds))assert.ok(!d.itemPlacements.some(p=>p.eventId===e.id&&p.itemId===held),`Held item must not also be left at a location: ${e.title}`);assert.ok(unique(snaps.map(s=>s.statusNotes)),`Distinct snapshots: ${e.title}`)
 const loc=d.locationMarkers.find(x=>x.id===e.locationMarkerId)
 for(const s of snaps){assert.ok(!/is physically present|during “/.test(s.statusNotes),`No generic state template: ${e.title}`);const key=s.characterId.replace('undersong-char-','');assert.equal(s.statusNotes,state[e.title][key]);assert.deepEqual(s.inventoryItemIds,(holders[e.title]?.[key]??[]).map(x=>`undersong-item-${x}`));assert.equal(s.currentLocationMarkerId,loc.id);assert.equal(s.currentMapLayerId,loc.mapLayerId);assert.equal(s.isAlive,true,'Disappearance is not represented as confirmed death')}
}
assert.equal(d.characters.length,11);assert.equal(d.locationMarkers.length,20);assert.equal(d.mapLayers.length,3);assert.equal(d.items.length,7);assert.equal(d.characterSnapshots.length,98)
const event=t=>ordered.find(e=>e.title===t)
const wren=d.characters.find(c=>c.id==='undersong-char-wren'),tom=d.characters.find(c=>c.id==='undersong-char-tom')
assert.deepEqual(wren.nameChanges,[{eventId:event('The Palm on Elias’s Name').id,name:'Elias Coyle'}]);assert.deepEqual(tom.nameChanges,[{eventId:event('Tom at the End of the Scar').id,name:'The Listener'}])
assert.equal(d.knowledgeFacts.find(f=>f.id==='undersong-fact-identity').readerLearnsAtEventId,event('The Palm on Elias’s Name').id)
assert.equal(d.knowledgeFacts.find(f=>f.id==='undersong-fact-agnes-gone').readerLearnsAtEventId,event('The School Command').id)
assert.equal(d.knowledgeFacts.find(f=>f.id==='undersong-fact-silas-gone').readerLearnsAtEventId,event('Silas Leaves Footprints').id)
assert.equal(d.timelines.length,1);assert.ok(d.timelines[0].description.includes('1891 loss is recounted'))
assert.equal(event('The Ebb Beyond the Marker').inWorldTime,13,'Opening is 14 September 1911')
assert.equal(event('The Note Stops').inWorldTime,31.083,'Collapse remains on 2 October 1911')
assert.equal(event('A Congregation of One').inWorldTime,61,'All Saints Day remains 1 November 1911')
assert.equal(event('The Watch Kept Dry').inWorldTime,65,'Watch scene remains 5 November 1911')
assert.equal(event('The Handwriting in the Ledger').inWorldTime,68,'Ledger scene remains 8 November 1911')
assert.ok(event('The Road Will Not Let Them Pass').inWorldTime>=69&&event('Silas Speaks Without the Pulpit').inWorldTime<70,'The low-tide day remains 9 November 1911')

assert.equal(d.mapLayers.filter(m=>!m.parentMapId).length,1)
for(const map of d.mapLayers){assert.equal(map.imageWidth,1600);assert.equal(map.imageHeight,1000);assert.ok(ids.blobs.has(map.imageId));if(map.parentMapId){assert.ok(ids.mapLayers.has(map.parentMapId));const gates=d.locationMarkers.filter(l=>l.linkedMapLayerId===map.id);assert.equal(gates.length,1,`One gateway to ${map.name}`);assert.equal(gates[0].mapLayerId,map.parentMapId)}}
for(const loc of d.locationMarkers){const map=d.mapLayers.find(m=>m.id===loc.mapLayerId);assert.ok(map);assert.ok(loc.x>=0&&loc.x<=map.imageWidth&&loc.y>=0&&loc.y<=map.imageHeight,`Bottom-origin marker inside ${map.name}: ${loc.name}`);assert.ok(ids.blobs.has(loc.imageId))}
const geo=JSON.parse(fs.readFileSync(new URL('./map-geometry.json',import.meta.url),'utf8'));for(const route of d.mapRoutes){const key=route.mapLayerId.replace('undersong-map-','');assert.deepEqual(route.waypoints,geo.routes[key][0].map(([x,y])=>({x,y})),`Terrain-traced route ${route.name}`)};for(const loc of d.locationMarkers){const m=loc.mapLayerId.replace('undersong-map-',''),k=loc.id.replace('undersong-loc-','');assert.deepEqual([loc.x,loc.y],geo.locations[m][k],`Reviewed marker ${loc.name}`)}
for(const blob of d.blobs){const p=path.join(root,blob.url);assert.ok(fs.existsSync(p),blob.url);assert.ok(fs.statSync(p).size>0)}
assert.ok(d.characters.every(c=>ids.blobs.has(c.portraitImageId)));assert.ok(d.items.every(i=>ids.blobs.has(i.imageId)));assert.ok(d.factions.every(f=>ids.blobs.has(f.coverImageId)));assert.ok(ids.blobs.has(d.world.coverImageId))

const manifest=JSON.parse(fs.readFileSync(path.join(root,'library/the-undersong/ARTWORK_MANIFEST.json'),'utf8'))
const review=JSON.parse(fs.readFileSync(new URL('./art-review.json',import.meta.url),'utf8'))
assert.equal(manifest.assets.length,45);assert.ok(unique(manifest.assets.map(a=>a.path)));assert.ok(unique(manifest.assets.map(a=>a.sha256)),'No duplicate final artwork bytes')
for(const a of manifest.assets){const p=path.join(root,a.path),bytes=fs.readFileSync(p),hash=crypto.createHash('sha256').update(bytes).digest('hex');assert.equal(hash,a.sha256,a.path);assert.equal(bytes.length,a.bytes);assert.equal(bytes.readUInt32BE(16),a.width);assert.equal(bytes.readUInt32BE(20),a.height);assert.equal(review[a.path]?.sha256,a.sha256);assert.ok(a.prompt&&a.sourceImage&&a.visualReview)}
const audit=JSON.parse(fs.readFileSync(new URL('./scene-boundary-audit.json',import.meta.url),'utf8'))
assert.equal(audit.length,42);for(let i=0;i<audit.length;i++){assert.equal(audit[i].eventTitle,ordered[i].title);assert.equal(audit[i].sha256,crypto.createHash('sha256').update(scenes[i].text).digest('hex'));assert.deepEqual(audit[i].physicalCast.map(x=>`undersong-char-${x}`).sort(),[...ordered[i].involvedCharacterIds].sort())}
assert.ok(d.lorePages.find(p=>p.id==='undersong-lore-source').body.includes('Copyright © 2026 Solomon Darko. All rights reserved.'))
const serialized=JSON.stringify(d);assert.ok(!serialized.includes('C:\\Users')&&!serialized.includes('PCcom')&&!serialized.includes('Downloads/'),'PWK does not expose creator workstation identity')

const indexPath=path.join(root,'library/index.json')
if(fs.existsSync(indexPath)){const catalogue=JSON.parse(fs.readFileSync(indexPath,'utf8')).entries.find(e=>e.id==='the-undersong');if(catalogue){assert.equal(catalogue.dataBytes,fs.statSync(pwkPath).size);assert.deepEqual(catalogue.counts,{characters:11,chapters:8,events:42,locations:20})}}
console.log(`PASS: 8 chapters, 26 authorial sections, 42 scenes, 15,530 words, 98 snapshots, 20 locations, 3 topographic maps, and 45 distinct inspected artworks.`)
