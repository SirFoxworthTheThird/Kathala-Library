import {sourceVerse} from './verse-format.mjs'
import fs from 'node:fs'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import {cantos,countWords,normalize,sourceSha256,stanzaGroupCount,verseLineCount,verseText} from './source-text.mjs'
import {reviewedCantos,reviewedBoundaries,sceneCount} from './reviewed-scenes.mjs'
import {validateCorrections} from './validate-corrections.mjs'

const root=new URL('../../',import.meta.url)
const world=JSON.parse(fs.readFileSync(new URL('library/inferno.pwk',root),'utf8'))
assert.equal(world.world.name,'Inferno')
assert.equal(world.world.readingMode,true)
assert.equal(world.chapters.length,34)
assert.equal(world.events.length,sceneCount)
assert.equal(world.sceneTexts.length,sceneCount)
assert.equal(world.characters.length,66)
assert.equal(world.characterSnapshots.length,495)
assert.equal(world.locationMarkers.length,52)
assert.equal(world.mapLayers.length,6)
assert.equal(world.items.length,8)
assert.equal(world.timelines.length,7)
assert.equal(world.blobs.length,133)
validateCorrections(world)

const reconstructed=[]
for(const canto of cantos){
 const chapter=world.chapters.find(entry=>entry.number===canto.number)
 const events=world.events.filter(event=>event.chapterId===chapter.id).sort((a,b)=>a.sortOrder-b.sortOrder)
 const reviewed=reviewedCantos[canto.number-1],points=reviewedBoundaries(canto)
 assert.equal(events.length,reviewed.length,`Canto ${canto.label}: scene count`)
 const texts=[]
 for(const [index,event] of events.entries()){
  const sceneTexts=world.sceneTexts.filter(scene=>scene.eventId===event.id)
  assert.equal(sceneTexts.length,1,`${event.title}: one scene text`)
  assert.equal(event.title,reviewed[index].title)
  assert.equal(sourceVerse(sceneTexts[0].text),canto.lines.slice(points[index],points[index+1]).join('\n'),`${event.title}: exact reviewed lines`)
  assert.deepEqual(new Set(event.involvedCharacterIds),new Set(Object.keys(reviewed[index].states).map(key=>`inferno-char-${key}`)),`${event.title}: physical cast`)
  const snapshots=world.characterSnapshots.filter(snapshot=>snapshot.eventId===event.id)
  assert.equal(snapshots.length,event.involvedCharacterIds.length,`${event.title}: one snapshot each`)
  assert.deepEqual(new Set(snapshots.map(s=>s.characterId)),new Set(event.involvedCharacterIds),`${event.title}: no extra snapshot`)
  assert.equal(new Set(snapshots.map(s=>s.characterId)).size,snapshots.length,`${event.title}: unique snapshot characters`)
  for(const [key,state] of Object.entries(reviewed[index].states))assert.equal(snapshots.find(s=>s.characterId===`inferno-char-${key}`).statusNotes,state,`${event.title}: reviewed state`)
  texts.push(sourceVerse(sceneTexts[0].text))
 }
 const text=texts.join('\n')
 assert.equal(normalize(text),normalize(canto.text),`Canto ${canto.label}: reconstruction`)
 reconstructed.push(text)
}
const full=reconstructed.join('\n\n')
assert.equal(normalize(full),normalize(verseText),'complete ordered poem')
assert.equal(full.split('\n').filter(Boolean).length,verseLineCount)
assert.equal(countWords(full),37417)
assert.equal(stanzaGroupCount,1596)
for(const canto of cantos){const points=reviewedBoundaries(canto);assert.ok(points.slice(0,-1).every(point=>point%3===0),`Canto ${canto.label}: scene starts at stanza boundary`)}
assert.ok(full.trimEnd().endsWith('Thence we came forth to rebehold the stars.'))

for(const event of world.events){
 assert.ok(world.locationMarkers.some(location=>location.id===event.locationMarkerId),`${event.title}: valid location`)
 assert.ok(event.tension>=1&&event.tension<=5,`${event.title}: tension`)
 assert.ok(Number.isInteger(event.travelDays)&&event.travelDays>=0,`${event.title}: nonnegative whole travel days`)
 assert.ok(world.timelines.some(timeline=>timeline.id===event.timelineId),`${event.title}: timeline`)
}
for(const timeline of world.timelines){const times=world.events.filter(e=>e.timelineId===timeline.id).sort((a,b)=>a.sortOrder-b.sortOrder).map(e=>e.inWorldTime);for(let i=1;i<times.length;i++)assert.ok(times[i]>=times[i-1],`${timeline.name}: nondecreasing time`)}
for(const snapshot of world.characterSnapshots){assert.ok(snapshot.statusNotes.length>=30);assert.ok(world.locationMarkers.some(l=>l.id===snapshot.currentLocationMarkerId));assert.ok(world.mapLayers.some(m=>m.id===snapshot.currentMapLayerId))}
for(const event of world.events)for(const itemId of event.involvedItemIds)assert.ok(world.items.some(item=>item.id===itemId))
for(const marker of world.locationMarkers){const map=world.mapLayers.find(entry=>entry.id===marker.mapLayerId);assert.ok(map);assert.ok(marker.x>=0&&marker.x<=map.imageWidth);assert.ok(marker.y>=0&&marker.y<=map.imageHeight)}
const gateways=world.locationMarkers.filter(marker=>marker.linkedMapLayerId)
assert.deepEqual(gateways.map(g=>g.id).sort(),['inferno-loc-bolgia-ten','inferno-loc-cataract','inferno-loc-cocytus-region','inferno-loc-dis-gate','inferno-loc-dis-region','inferno-loc-hell-mouth','inferno-loc-malebolge-region'])
for(const child of world.mapLayers.filter(m=>m.parentMapId))assert.equal(gateways.filter(g=>g.mapLayerId==='inferno-map-overview'&&g.linkedMapLayerId===child.id).length,1,`${child.name}: one overview gateway`)
assert.equal(world.events.find(e=>e.title==='Manto’s Wandering').involvedCharacterIds.includes('inferno-char-dante'),false)
assert.equal(world.events.find(e=>e.title==='Ulysses Leaves Home').involvedCharacterIds.includes('inferno-char-dante'),false)
assert.equal(world.characters.find(c=>c.id==='inferno-char-geryon').nameChanges[0].eventId,world.events.find(e=>e.title==='Mounting Fraud').id)
assert.equal(world.characters.find(c=>c.id==='inferno-char-nicholas').nameChanges[0].eventId,world.events.find(e=>e.title==='Nicholas Names the Succession').id)
assert.ok(world.relationshipSnapshots.length>world.relationships.length,'relationship develops')
assert.ok(new Set(world.characterSnapshots.filter(s=>s.characterId==='inferno-char-dante').map(s=>s.statusNotes)).size>100,'Dante states vary')
assert.ok(new Set(world.characterSnapshots.filter(s=>s.characterId==='inferno-char-virgil').map(s=>s.statusNotes)).size>100,'Virgil states vary')

const imageRefs=[world.world.coverImageId,...world.mapLayers.map(m=>m.imageId),...world.characters.map(c=>c.portraitImageId),...world.items.map(i=>i.imageId),...world.locationMarkers.map(l=>l.imageId)].filter(Boolean)
assert.equal(imageRefs.length,133)
assert.equal(new Set(imageRefs).size,133)
for(const ref of imageRefs)assert.ok(world.blobs.some(blob=>blob.id===ref),`image ref ${ref}`)
const manifest=JSON.parse(fs.readFileSync(new URL('scripts/inferno/ARTWORK_MANIFEST.json',root),'utf8'))
assert.equal(manifest.assetCount,133)
assert.equal(manifest.assets.length,133)
for(const asset of manifest.assets){const bytes=fs.readFileSync(new URL(asset.finalPath,root));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),asset.sha256,`${asset.id}: artwork hash`);assert.equal(bytes.readUInt32BE(16),asset.width);assert.equal(bytes.readUInt32BE(20),asset.height);assert.ok(asset.prompt.length>100)}
assert.equal(sourceSha256,'10fad2f10aaffec3bfe3fd63266544f7fd5bba576cd5c63afe68e8212849754d')
const catalogue=JSON.parse(fs.readFileSync(new URL('library/index.json',root),'utf8')).entries.find(book=>book.id==='inferno')
const pwkBytes=fs.readFileSync(new URL('library/inferno.pwk',root))
assert.equal(catalogue.dataBytes,pwkBytes.length)
assert.deepEqual(catalogue.counts,{characters:66,chapters:34,events:197,locations:52})
console.log(`PASS: Inferno — 34 cantos, ${sceneCount} scenes, ${verseLineCount.toLocaleString()} verse lines, 37,417 words, 66 characters, 495 snapshots, 52 locations, 6 topographic maps, 133 images, ${pwkBytes.length.toLocaleString()} bytes, SHA-256 ${crypto.createHash('sha256').update(pwkBytes).digest('hex')}.`)
