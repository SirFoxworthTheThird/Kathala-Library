import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cantos, retainedText, stanzaCount, verseLineCount, wordCount } from '../os-lusiadas-en/source-text.mjs'
import { cuts } from './scene-cuts.mjs'
import { sceneState } from './scene-state.mjs'
import { snapshotNotes } from './snapshot-ledger.mjs'
import { places } from './map-model.mjs'

const here=path.dirname(fileURLToPath(import.meta.url))
const repo=path.resolve(here,'../..')
const book=JSON.parse(fs.readFileSync(path.join(repo,'library/os-lusiadas.pwk'),'utf8'))
const collections=['timelines','chapters','events','sceneTexts','mapLayers','locationMarkers','characters','characterSnapshots','items','itemPlacements','blobs','relationships','relationshipSnapshots','plotThreads','motifs','knowledgeFacts','knowledgeReveals','factions','factionMemberships','characterGoals','mapRoutes','loreCategories','lorePages','characterMovements','locationSnapshots','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships']
const ids=new Map()
for(const type of collections) {
  assert.ok(Array.isArray(book[type]),`${type} present`)
  const set=new Set()
  for(const row of book[type]) {
    assert.ok(row.id,`${type} id`)
    assert.ok(!set.has(row.id),`${type} duplicate ${row.id}`)
    set.add(row.id)
  }
  ids.set(type,set)
}
const has=(type,id,context)=>{if(id!==null&&id!==undefined) assert.ok(ids.get(type).has(id),`${context}: unresolved ${type} ${id}`)}
assert.equal(book.world.readingMode,true)
assert.equal(book.chapters.length,10)
assert.equal(book.events.length,cuts.reduce((n,rows)=>n+rows.length,0))
assert.equal(book.sceneTexts.length,book.events.length)
assert.equal(book.mapLayers.length,8)
assert.equal(book.locationMarkers.length,places.length)
assert.equal(book.characterSnapshots.length,Object.values(snapshotNotes).reduce((n,notes)=>n+Object.keys(notes).length,0))

// Reconstruction deliberately compares every stanza and every line, rather
// than accepting only a total word count or a digest of the whole file.
let sceneOffset=0
const reconstructed=[]
for(let cantoIndex=0;cantoIndex<10;cantoIndex++) {
  const canto=cantos[cantoIndex],entries=cuts[cantoIndex]
  assert.equal(book.chapters[cantoIndex].number,canto.number)
  assert.equal(book.chapters[cantoIndex].title,canto.title)
  for(let index=0;index<entries.length;index++) {
    const start=entries[index][0],end=(entries[index+1]?.[0]??canto.stanzas.length+1)-1
    const event=book.events[sceneOffset],scene=book.sceneTexts[sceneOffset]
    const expected=canto.stanzas.slice(start-1,end).map(s=>s.text).join('\n\n')
    assert.equal(scene.text,expected,`Canto ${canto.number}, scene ${index+1}, stanzas ${start}-${end}`)
    assert.equal(scene.eventId,event.id)
    assert.equal(scene.wordCount,wordCount(expected))
    assert.equal(event.chapterId,book.chapters[cantoIndex].id)
    assert.equal(event.title,entries[index][1])
    assert.equal(event.status,'final')
    assert.ok(Number.isFinite(event.inWorldTime),`${event.id} numeric calendar position`)
    assert.ok(event.travelDays>=0,`${event.id} nonnegative travel time`)
    assert.ok(event.tension>=1&&event.tension<=5,`${event.id} tension`)
    assert.equal(event.involvedCharacterIds.length,new Set(event.involvedCharacterIds).size,`${event.id} unique cast`)
    has('timelines',event.timelineId,event.id)
    has('locationMarkers',event.locationMarkerId,event.id)
    for(const id of event.involvedCharacterIds) has('characters',id,event.id)
    for(const id of event.involvedItemIds) has('items',id,event.id)
    for(const id of event.threadIds) has('plotThreads',id,event.id)
    for(const id of event.motifIds) has('motifs',id,event.id)
    const snapshots=book.characterSnapshots.filter(s=>s.eventId===event.id)
    assert.deepEqual(snapshots.map(s=>s.characterId).sort(),[...event.involvedCharacterIds].sort(),`${event.id} exactly one snapshot per present actor`)
    const state=sceneState[cantoIndex][index]
    assert.equal(event.locationMarkerId,state[1]?`os-lusiadas-loc-${state[1]}`:null)
    assert.equal(event.tension,state[3])
    for(const snapshot of snapshots) {
      has('characters',snapshot.characterId,snapshot.id)
      assert.equal(snapshot.locationMarkerId,event.locationMarkerId,`${snapshot.id} location`)
      assert.equal(snapshot.currentLocationMarkerId,event.locationMarkerId,`${snapshot.id} current location`)
      const code=snapshot.characterId.split('-').at(-1).toUpperCase()
      assert.equal(snapshot.statusNotes,snapshotNotes[`${canto.number}:${start}`]?.[code],`${snapshot.id} specific ledger note`)
      assert.ok(snapshot.statusNotes.length>=45)
      if(event.locationMarkerId) {
        const place=book.locationMarkers.find(p=>p.id===event.locationMarkerId)
        assert.equal(snapshot.currentMapLayerId,place.mapLayerId,`${snapshot.id} map`)
      }
    }
    reconstructed.push(scene.text)
    sceneOffset++
  }
}
assert.equal(reconstructed.join('\n\n'),retainedText,'Complete retained poem in order with no omission or duplication')
assert.equal(stanzaCount,1102)
assert.equal(verseLineCount,8816)
assert.equal(wordCount(retainedText),65812)
for(const layer of book.mapLayers) {
  has('mapLayers',layer.parentMapId,layer.id)
  has('blobs',layer.imageId,layer.id)
  assert.ok(layer.imageWidth>0&&layer.imageHeight>0,`${layer.id} dimensions`)
}
for(const marker of book.locationMarkers) {
  has('mapLayers',marker.mapLayerId,marker.id)
  has('mapLayers',marker.linkedMapLayerId,marker.id)
  has('blobs',marker.imageId,marker.id)
  const map=book.mapLayers.find(x=>x.id===marker.mapLayerId)
  assert.ok(marker.x>=0&&marker.x<=map.imageWidth&&marker.y>=0&&marker.y<=map.imageHeight,`${marker.id} pixel position`)
}
for(const map of book.mapLayers.filter(x=>x.parentMapId)) {
  assert.equal(book.locationMarkers.filter(x=>x.linkedMapLayerId===map.id).length,1,`${map.id} unique gateway`)
}
for(const blob of book.blobs) {
  if(blob.url?.startsWith('library/')) assert.ok(fs.existsSync(path.join(repo,blob.url)),`${blob.id} local file exists`)
}
for(const p of book.lorePages) {has('loreCategories',p.categoryId,p.id);has('events',p.visibleFromEventId,p.id)}
for(const fact of book.knowledgeFacts) {has('events',fact.readerLearnsAtEventId,fact.id);has('events',fact.originEventId,fact.id)}
const eventAt=(canto,start)=>`os-lusiadas-event-${String(canto).padStart(2,'0')}-${String(start).padStart(3,'0')}`
for(const [code,canto,start] of [['DI',3,98],['FE',4,1],['JI',4,50]]) {
  const characterId=`os-lusiadas-char-${code.toLowerCase()}`
  const eventId=eventAt(canto,start)
  const event=book.events.find(x=>x.id===eventId)
  assert.ok(event.mentionedCharacterIds.includes(characterId),`${code} reported at ${eventId}`)
  assert.ok(!event.involvedCharacterIds.includes(characterId),`${code} has no report-scene presence`)
  assert.ok(!book.characterSnapshots.some(x=>x.eventId===eventId&&x.characterId===characterId),`${code} has no report-scene snapshot`)
  assert.ok(book.knowledgeFacts.some(x=>x.readerLearnsAtEventId===eventId&&x.tags.includes(`offstage-death:${characterId}`)),`${code} death reveal gate`)
  assert.equal(book.characters.find(x=>x.id===characterId).isAlive,false,`${code} final death state`)
}
for(const [code,canto,start] of [['AH',3,83],['IN',3,132]]) {
  const characterId=`os-lusiadas-char-${code.toLowerCase()}`
  const eventId=eventAt(canto,start)
  assert.equal(book.characterSnapshots.find(x=>x.eventId===eventId&&x.characterId===characterId)?.isAlive,false,`${code} death-scene state`)
  assert.equal(book.characters.find(x=>x.id===characterId).isAlive,false,`${code} final death state`)
}
for(const reveal of book.knowledgeReveals) {has('knowledgeFacts',reveal.factId,reveal.id);has('characters',reveal.characterId,reveal.id);has('events',reveal.eventId,reveal.id)}
for(const rel of book.relationships) {has('characters',rel.characterAId,rel.id);has('characters',rel.characterBId,rel.id);has('events',rel.startEventId,rel.id)}
for(const snap of book.relationshipSnapshots) {has('relationships',snap.relationshipId,snap.id);has('events',snap.eventId,snap.id)}
for(const item of book.items) has('blobs',item.imageId,item.id)
for(const placement of book.itemPlacements) {has('items',placement.itemId,placement.id);has('events',placement.eventId,placement.id);has('locationMarkers',placement.locationMarkerId,placement.id)}
for(const snapshot of book.itemSnapshots) {has('items',snapshot.itemId,snapshot.id);has('events',snapshot.eventId,snapshot.id)}
for(const char of book.characters) {has('blobs',char.portraitImageId,char.id);if(char.revealedAs){has('characters',char.revealedAs.characterId,char.id);has('events',char.revealedAs.eventId,char.id)}}
for(const [code,canto,start,name,fact] of [['AD',5,51,'Adamastor','giant'],['AMP',6,22,'Amphitrite','amphitrite'],['MO',7,26,'Monçaide','moncaide'],['SAM',7,22,'Samorim','samorim']]) {
  const character=book.characters.find(x=>x.id===`os-lusiadas-char-${code.toLowerCase()}`)
  assert.deepEqual(character.nameChanges,[{eventId:eventAt(canto,start),name}],`${code} name disclosed at source stanza`)
  assert.equal(book.knowledgeFacts.find(x=>x.id===`os-lusiadas-fact-${fact}`).readerLearnsAtEventId,eventAt(canto,start),`${code} fact disclosed at source stanza`)
}
for(const faction of book.factions) has('blobs',faction.coverImageId,faction.id)
for(const membership of book.factionMemberships) {has('factions',membership.factionId,membership.id);has('characters',membership.characterId,membership.id);has('events',membership.startEventId,membership.id);has('events',membership.endEventId,membership.id)}
for(const goal of book.characterGoals) {has('characters',goal.characterId,goal.id);has('events',goal.startEventId,goal.id);has('events',goal.endEventId,goal.id);assert.ok(['want','need','fear','flaw'].includes(goal.type),`${goal.id} type`)}
for(const route of book.mapRoutes) {has('mapLayers',route.mapLayerId,route.id);assert.equal(route.routeType,'sea_route',`${route.id} route type`);for(const waypoint of route.waypoints){has('locationMarkers',waypoint,route.id);assert.equal(book.locationMarkers.find(marker=>marker.id===waypoint).mapLayerId,route.mapLayerId,`${route.id} waypoint on route map`)}}
for(const placeSnapshot of book.locationSnapshots) {has('locationMarkers',placeSnapshot.locationMarkerId,placeSnapshot.id);has('events',placeSnapshot.eventId,placeSnapshot.id)}
assert.equal(book.locationSnapshots.length,book.locationMarkers.length,'Every marker receives a reading-mode introduction')
assert.deepEqual(book.locationSnapshots.map(x=>x.locationMarkerId).sort(),book.locationMarkers.map(x=>x.id).sort(),'Each marker has one introduction')
assert.equal(book.items.length,6,'Every selected object has a record')
for(const item of book.items) assert.ok(book.events.some(event=>event.involvedItemIds.includes(item.id)),`${item.id} appears at an event`)
console.log(`PASS: ${book.chapters.length} cantos, ${book.events.length} scenes, ${stanzaCount} stanzas, ${verseLineCount} verse lines, ${wordCount(retainedText)} words; ${book.characterSnapshots.length} exact direct-presence snapshots; ${book.mapLayers.length} maps, ${book.locationMarkers.length} locations`)
