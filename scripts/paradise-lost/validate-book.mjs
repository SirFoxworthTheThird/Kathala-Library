import {webpDimensions} from '../lib/webp.mjs'
import fs from 'node:fs'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import {books,verseText,verseLineCount,countWords,normalize} from './source-text.mjs'
import {reviewedBooks,reviewedBoundaries} from './reviewed-scenes.mjs'
import {validateCorrections} from './validate-corrections.mjs'

const world=JSON.parse(fs.readFileSync(new URL('../../library/paradise-lost.pwk',import.meta.url),'utf8'))
assert.equal(world.world.name,'Paradise Lost')
assert.equal(world.world.readingMode,true)
assert.equal(world.chapters.length,12)
assert.equal(world.events.length,164)
assert.equal(world.sceneTexts.length,164)
assert.equal(world.mapLayers.length,4)
assert.equal(world.characters.length,25)
assert.equal(world.locationMarkers.length,25)
assert.equal(world.items.length,7)
assert.equal(world.timelines.length,6)
validateCorrections(world)
for(const book of books){const points=reviewedBoundaries(book);for(const [index,scene] of reviewedBooks[book.number-1].entries()){
 const event=world.events.find(entry=>entry.title===scene.title),text=world.sceneTexts.find(entry=>entry.eventId===event.id)
 assert.equal(text.text,book.lines.slice(points[index],points[index+1]).join('\n'),`${scene.title}: exact reviewed range`)
 assert.deepEqual(new Set(event.involvedCharacterIds),new Set(Object.keys(scene.states).map(key=>`paradise-lost-char-${key}`)),`${scene.title}: source reviewed cast`)
 for(const [key,state] of Object.entries(scene.states))assert.equal(world.characterSnapshots.find(snapshot=>snapshot.eventId===event.id&&snapshot.characterId===`paradise-lost-char-${key}`).statusNotes,state,`${scene.title}: authored individual state`)
}}
const reconstructed=[]
for(const chapter of world.chapters){const events=world.events.filter(event=>event.chapterId===chapter.id).sort((a,b)=>a.sortOrder-b.sortOrder);const text=events.map(event=>{const scenes=world.sceneTexts.filter(scene=>scene.eventId===event.id);assert.equal(scenes.length,1,`${event.title}: one scene text`);return scenes[0].text}).join('\n');assert.equal(normalize(text),normalize(books[chapter.number-1].text),`${chapter.title}: text`);reconstructed.push(text)}
assert.equal(normalize(reconstructed.join('\n\n')),normalize(verseText))
assert.equal(reconstructed.join('\n\n').split('\n').filter(Boolean).length,verseLineCount)
assert.equal(countWords(reconstructed.join('\n\n')),countWords(verseText))
for(const event of world.events){assert.ok(world.locationMarkers.some(loc=>loc.id===event.locationMarkerId),`${event.title}: location`);assert.ok(event.tension>=1&&event.tension<=5,`${event.title}: tension`);assert.ok(event.travelDays>=0,`${event.title}: travel`);const snapshots=world.characterSnapshots.filter(snapshot=>snapshot.eventId===event.id);assert.deepEqual(new Set(snapshots.map(s=>s.characterId)),new Set(event.involvedCharacterIds),`${event.title}: exact present cast`);assert.equal(snapshots.length,event.involvedCharacterIds.length,`${event.title}: one snapshot per present character`);assert.equal(new Set(snapshots.map(s=>s.statusNotes)).size,snapshots.length,`${event.title}: distinct states`);for(const snapshot of snapshots)assert.ok(!snapshot.statusNotes.includes(event.description),`${event.title}: state is not copied description`)}
for(const snapshot of world.characterSnapshots){assert.ok(snapshot.statusNotes.length>=40,`${snapshot.id}: substantial state`);assert.ok(!snapshot.statusNotes.includes('is physically present and responds'),`${snapshot.id}: non-formulaic state`);assert.ok(world.characters.some(char=>char.id===snapshot.characterId));assert.ok(world.locationMarkers.some(loc=>loc.id===snapshot.currentLocationMarkerId));assert.ok(world.mapLayers.some(map=>map.id===snapshot.currentMapLayerId))}
for(const event of world.events)for(const itemId of event.involvedItemIds)assert.ok(world.items.some(item=>item.id===itemId))
for(const map of world.mapLayers){assert.ok(map.imageId,`${map.name}: map artwork`);assert.ok(world.blobs.some(blob=>blob.id===map.imageId),`${map.name}: map blob`)}
for(const entity of [world.world,...world.characters,...world.items,...world.locationMarkers,...world.factions])assert.ok(entity.coverImageId||entity.portraitImageId||entity.imageId,`${entity.name}: artwork`)
const manifest=JSON.parse(fs.readFileSync(new URL('./ARTWORK_MANIFEST.json',import.meta.url),'utf8'))
assert.equal(manifest.assetCount,66,'artwork manifest count')
assert.equal(manifest.assets.length,66,'artwork records')
for(const asset of manifest.assets){assert.ok(asset.promptStatus.startsWith('exact submitted request'),`${asset.id}: exact prompt provenance`);const bytes=fs.readFileSync(new URL(`../../${asset.finalPath}`,import.meta.url));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),asset.sha256,`${asset.id}: artwork hash`);assert.equal(webpDimensions(bytes)[0],asset.width,`${asset.id}: width`);assert.equal(webpDimensions(bytes)[1],asset.height,`${asset.id}: height`)}
const bytes=fs.readFileSync(new URL('../../library/paradise-lost.pwk',import.meta.url));console.log(`PASS: Paradise Lost — 12 books, 164 scenes, ${verseLineCount.toLocaleString()} verse lines, ${countWords(verseText).toLocaleString()} words, ${world.characters.length} characters, ${world.characterSnapshots.length} snapshots, ${world.locationMarkers.length} locations, ${world.mapLayers.length} maps, ${world.blobs.length} images, ${bytes.length.toLocaleString()} bytes, SHA-256 ${crypto.createHash('sha256').update(bytes).digest('hex')}.`)

