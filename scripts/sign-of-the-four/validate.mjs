import fs from 'node:fs'
import crypto from 'node:crypto'
import { retainedText, normalize, wordCount, sourceSha256 } from './source-text.mjs'

const release = process.argv.includes('--release')
const file = new URL(release ? '../../library/sign-of-the-four.pwk' : './draft.pwk', import.meta.url)
const data = JSON.parse(fs.readFileSync(file, 'utf8'))
const errors = []
const check = (value, message) => { if (!value) errors.push(message) }
const unique = (records, field, label) => check(new Set(records.map(x => x[field])).size === records.length, `Duplicate ${label}`)
const idSet = records => new Set(records.map(x => x.id))
const byId = records => new Map(records.map(x => [x.id, x]))
const eventById = byId(data.events), mapById = byId(data.mapLayers), locById = byId(data.locationMarkers)
const charIds = idSet(data.characters), itemIds = idSet(data.items), chapterIds = idSet(data.chapters)
const threadIds = idSet(data.plotThreads), motifIds = idSet(data.motifs), factionIds = idSet(data.factions)
const sceneEventIds = data.sceneTexts.map(x => x.eventId)
const allText = data.sceneTexts.map(x => x.text).join('\n\n')
check(data.world.readingMode === true, 'Reading mode is not enabled')
check(data.world.calendar.startYear===1888 && data.world.calendar.months.find(x=>x.name==='February')?.days===29, 'Editorial 1888 calendar must include leap day')
check(data.chapters.length === 12 && data.events.length === 87 && data.sceneTexts.length === 87, 'Expected 12 chapters and 87 events/scenes')
check(normalize(allText) === normalize(retainedText), 'Scene text does not reconstruct retained Gutenberg narrative')
check(data.sceneTexts.reduce((sum,x)=>sum+x.wordCount,0) === wordCount(retainedText), 'Scene word count differs from source')
check(wordCount(retainedText) === 43002, 'Source word count drifted')
check(sourceSha256 === '4cdea89cf6cd2567a556d0e6901edb89949dd79e200dbaf4ced4cabf1d5d2c26', 'Archived source bytes changed')
for (const [records,label] of [[data.chapters,'chapter'],[data.events,'event'],[data.sceneTexts,'scene'],[data.characters,'character'],[data.characterSnapshots,'snapshot'],[data.mapLayers,'map'],[data.locationMarkers,'location'],[data.blobs,'image']]) unique(records,'id',label)
unique(data.events,'sortOrder','event order')
check(new Set(sceneEventIds).size === data.events.length && sceneEventIds.every(id => eventById.has(id)), 'Scenes do not cover every event exactly once')
check(data.mapLayers.length === 6 && data.mapLayers.filter(x=>!x.parentMapId).length === 1, 'Expected six map layers with one London root')
for (const chapter of data.chapters) check(chapter.timelineId === data.timelines[0].id, `Chapter ${chapter.title} has wrong timeline`)
let previous = -Infinity
for (const event of [...data.events].sort((a,b)=>a.sortOrder-b.sortOrder)) {
  check(chapterIds.has(event.chapterId), `Missing chapter for ${event.title}`)
  check(locById.has(event.locationMarkerId), `Missing location for ${event.title}`)
  check(Number.isFinite(event.inWorldTime) && event.inWorldTime >= previous, `Calendar order at ${event.title}`)
  check(Number.isFinite(event.travelDays) && event.travelDays >= 0, `Negative/invalid elapsed time at ${event.title}`)
  check(Number.isInteger(event.tension) && event.tension >= 1 && event.tension <= 5, `Tension out of range at ${event.title}`)
  check(event.involvedCharacterIds.every(id=>charIds.has(id)), `Unknown cast at ${event.title}`)
  check(event.mentionedCharacterIds.every(id=>charIds.has(id)), `Unknown mentioned character at ${event.title}`)
  check(event.involvedItemIds.every(id=>itemIds.has(id)), `Unknown item at ${event.title}`)
  check(event.threadIds.every(id=>threadIds.has(id)) && event.motifIds.every(id=>motifIds.has(id)), `Unknown thread or motif at ${event.title}`)
  check(event.status === 'draft', `Unexpected status at ${event.title}`)
  check(event.povCharacterId === null || charIds.has(event.povCharacterId), `Unknown POV at ${event.title}`)
  const snapshots = data.characterSnapshots.filter(x=>x.eventId===event.id)
  check(snapshots.length === event.involvedCharacterIds.length, `Snapshot count at ${event.title}`)
  check(new Set(snapshots.map(x=>x.characterId)).size === snapshots.length, `Duplicate character snapshot at ${event.title}`)
  check(snapshots.every(x=>event.involvedCharacterIds.includes(x.characterId)), `Absent character snapshot at ${event.title}`)
  previous=event.inWorldTime
}
for (const map of data.mapLayers) {
  check(map.imageId && data.blobs.some(x=>x.id===map.imageId), `Map ${map.name} missing image`)
  if (!map.parentMapId) continue
  check(mapById.has(map.parentMapId), `Map ${map.name} missing parent`)
  const gateways=data.locationMarkers.filter(x=>x.linkedMapLayerId===map.id)
  const representative = !map.levelGroupId || map.levelIndex===0
  check(gateways.length===(representative ? 1 : 0), `Map ${map.name} has wrong gateway count for its floor group`)
  if (representative) check(gateways[0]?.mapLayerId===map.parentMapId, `Map ${map.name} gateway on wrong parent`)
  check(data.locationMarkers.some(x=>x.mapLayerId===map.id), `Map ${map.name} has no markers`)
}
const lodgeFloors=data.mapLayers.filter(x=>x.levelGroupId==='sign-four-levels-pondicherry')
check(lodgeFloors.length===3 && lodgeFloors.every(x=>x.parentMapId==='sign-four-map-london') && new Set(lodgeFloors.map(x=>x.levelIndex)).size===3 && [0,1,2].every(x=>lodgeFloors.some(f=>f.levelIndex===x)), 'Lodge floors are not one coherent three-level group')
check(lodgeFloors.every(x=>x.imageWidth===1536 && x.imageHeight===1024), 'Lodge floors must share one 1536×1024 image grid')
for (const [name,mapId,minX,maxX,minY,maxY] of [
  ['Upper passage','sign-four-map-pondicherry-upper',800,900,625,750],
  ['Bartholomew’s chamber','sign-four-map-pondicherry-upper',950,1120,450,620],
  ['Lodge roof','sign-four-map-pondicherry-roof',1030,1160,610,730],
]) {
  const marker=data.locationMarkers.find(x=>x.name===name)
  check(marker?.mapLayerId===mapId && marker.x*1400/1536>=minX && marker.x*1400/1536<=maxX && marker.y*1000/1024>=minY && marker.y*1000/1024<=maxY, `${name} is displaced from its aligned floor feature`)
}
for (const location of data.locationMarkers) {
  const map=mapById.get(location.mapLayerId)
  check(!!map, `Location ${location.name} on absent map`)
  if (map) check(location.x>=0 && location.x<=map.imageWidth && location.y>=0 && location.y<=map.imageHeight, `Marker ${location.name} outside map bounds`)
  check(location.imageId && data.blobs.some(x=>x.id===location.imageId), `Location ${location.name} missing artwork`)
}
for (const snapshot of data.characterSnapshots) {
  const loc=locById.get(snapshot.currentLocationMarkerId)
  check(charIds.has(snapshot.characterId) && eventById.has(snapshot.eventId), `Snapshot ${snapshot.id} has broken owner/event`)
  check(!!loc && loc.mapLayerId===snapshot.currentMapLayerId, `Snapshot ${snapshot.id} has broken location/map`)
  check(snapshot.inventoryItemIds.every(id=>itemIds.has(id)), `Snapshot ${snapshot.id} has unknown inventory item`)
  check(snapshot.statusNotes?.trim().length>15, `Snapshot ${snapshot.id} lacks specific status`)
}
check(new Set(data.characterSnapshots.map(x=>x.statusNotes)).size===data.characterSnapshots.length, 'Character snapshots reuse generic status notes')
for (const character of data.characters) {
  const states = data.characterSnapshots.filter(x=>x.characterId===character.id).sort((a,b)=>eventById.get(a.eventId).sortOrder-eventById.get(b.eventId).sortOrder)
  let dead=false
  for (const state of states) {
    check(!dead || !state.isAlive, `Character revived after death: ${character.name}`)
    if (!state.isAlive) dead=true
  }
}
for (const event of data.events) {
  const counts=new Map()
  for (const state of data.characterSnapshots.filter(x=>x.eventId===event.id)) for (const id of state.inventoryItemIds) counts.set(id,(counts.get(id)??0)+1)
  for (const [id,count] of counts) check(count===1 || data.items.find(x=>x.id===id)?.isCollective, `Non-collective item in multiple inventories at ${event.title}`)
}
for (const route of data.mapRoutes) {
  check(mapById.has(route.mapLayerId), `Route ${route.name} has missing map`)
  check(route.waypoints.length>=2 && route.waypoints.every(id=>locById.get(id)?.mapLayerId===route.mapLayerId), `Route ${route.name} crosses map layers or lacks waypoints`)
}
for (const item of data.items) check(item.imageId && data.blobs.some(x=>x.id===item.imageId), `Item ${item.name} missing artwork`)
for (const char of data.characters) check(char.portraitImageId && data.blobs.some(x=>x.id===char.portraitImageId), `Character ${char.name} missing portrait`)
for (const relation of data.relationships) check(charIds.has(relation.characterAId) && charIds.has(relation.characterBId) && eventById.has(relation.startEventId), `Broken relationship ${relation.label}`)
for (const state of data.relationshipSnapshots) {
  const relation=data.relationships.find(x=>x.id===state.relationshipId)
  check(!!relation && eventById.has(state.eventId), `Broken relationship state ${state.id}`)
  if (relation && eventById.has(state.eventId)) check(eventById.get(state.eventId).sortOrder>=eventById.get(relation.startEventId).sortOrder, `Relationship state before its start ${state.id}`)
}
for (const fact of data.knowledgeFacts) check(eventById.has(fact.readerLearnsAtEventId), `Broken fact gate ${fact.title}`)
for (const reveal of data.knowledgeReveals) {
  const fact=data.knowledgeFacts.find(x=>x.id===reveal.factId)
  check(!!fact && charIds.has(reveal.characterId) && eventById.has(reveal.eventId), `Broken reveal ${reveal.id}`)
  if (fact && eventById.has(reveal.eventId)) check(eventById.get(reveal.eventId).sortOrder>=eventById.get(fact.readerLearnsAtEventId).sortOrder, `Knowledge reveal before reader gate ${reveal.id}`)
}
for (const goal of data.characterGoals) check(charIds.has(goal.characterId) && eventById.has(goal.startEventId) && eventById.has(goal.endEventId), `Broken goal ${goal.id}`)
for (const placement of data.itemPlacements) check(itemIds.has(placement.itemId) && eventById.has(placement.eventId) && locById.has(placement.locationMarkerId), `Broken placement ${placement.id}`)
check(data.locationSnapshots.length===3, 'Expected three source-grounded offstage place reveals')
for (const state of data.locationSnapshots) check(locById.has(state.locationMarkerId) && eventById.has(state.eventId) && state.status?.trim() && state.notes?.trim(), `Broken location state ${state.id}`)
for (const member of data.factionMemberships) check(factionIds.has(member.factionId) && charIds.has(member.characterId) && eventById.has(member.startEventId) && (!member.endEventId || eventById.has(member.endEventId)), `Broken faction membership ${member.id}`)
for (const page of data.lorePages) check(eventById.has(page.visibleFromEventId) && data.loreCategories.some(x=>x.id===page.categoryId), `Broken lore gate ${page.title}`)
const eventWithTitle=title=>data.events.find(x=>x.title===title)
const oldSailor=eventWithTitle('The Old Sailor'), holmesRevealed=eventWithTitle('Holmes Revealed')
check(oldSailor.involvedCharacterIds.includes('sign-four-char-the-old-sailor') && !oldSailor.involvedCharacterIds.includes('sign-four-char-sherlock-holmes'), 'Old sailor identity leaks before unmasking')
check(holmesRevealed.involvedCharacterIds.includes('sign-four-char-sherlock-holmes'), 'Holmes missing at unmasking')
const sailor=data.characters.find(x=>x.id==='sign-four-char-the-old-sailor')
check(sailor?.revealedAs?.characterId==='sign-four-char-sherlock-holmes' && sailor.revealedAs.eventId===holmesRevealed.id, 'Old sailor identity must join Holmes at the unmasking scene')
const chase=eventWithTitle('The Aurora Runs'), custody=eventWithTitle('Small in Custody')
const auroraFigure=data.characters.find(x=>x.id==='sign-four-char-the-bare-footed-accomplice')
check(chase.involvedCharacterIds.includes(auroraFigure?.id) && !data.characters.some(x=>x.id==='sign-four-char-tonga'), 'Aurora figure must be one character record')
check(auroraFigure?.name==='The bare-footed accomplice' && auroraFigure?.nameChanges?.length===1 && auroraFigure.nameChanges[0].name==='Tonga' && auroraFigure.nameChanges[0].eventId===custody.id, 'Tonga name must change only when Small identifies him')
check(!/Tonga/i.test(auroraFigure?.description??''), 'Character description leaks Tonga before the name reveal')
check(custody.mentionedCharacterIds.includes(auroraFigure?.id), 'Named accomplice is not referenced at the reveal')
const imageHashes=new Map()
for (const blob of data.blobs) {
  const path=new URL(`../../${blob.url}`,import.meta.url)
  check(fs.existsSync(path), `Missing image file ${blob.url}`)
  if (!fs.existsSync(path)) continue
  const hash=crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex')
  check(!imageHashes.has(hash), `Duplicated artwork: ${blob.url} equals ${imageHashes.get(hash)}`)
  imageHashes.set(hash,blob.url)
}
const manifest=fs.readFileSync(new URL('./ARTWORK_MANIFEST.md',import.meta.url),'utf8')
for (const blob of data.blobs) check(manifest.includes('`'+blob.url.replace('library/sign-of-the-four/','')+'`'), `Artwork absent from manifest: ${blob.url}`)
console.log(JSON.stringify({file:file.pathname,chapters:data.chapters.length,events:data.events.length,scenes:data.sceneTexts.length,words:wordCount(retainedText),characters:data.characters.length,snapshots:data.characterSnapshots.length,locations:data.locationMarkers.length,maps:data.mapLayers.length,images:data.blobs.length,errors:errors.length},null,2))
if (errors.length) { console.error(errors.join('\n')); process.exitCode=1 }
