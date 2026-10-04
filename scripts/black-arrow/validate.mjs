import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { sections, retainedText, normalize, wordCount } from './source-text.mjs'
import { plans } from './event-plan.mjs'
import { snapshotNotes } from './snapshot-ledger.mjs'

// Validate the downloadable Library edition by default. --draft is available
// while authoring, but must not stand in for a release check.
const input = process.argv.includes('--draft') ? './draft.pwk' : '../../library/black-arrow.pwk'
const data = JSON.parse(fs.readFileSync(new URL(input, import.meta.url), 'utf8'))
const fail = message => { throw Error(message) }
if (data.chapters.length !== sections.length) fail('Chapter count mismatch')
const orderedEvents = [...data.events].sort((a,b) => a.sortOrder - b.sortOrder)
if (new Set(orderedEvents.map(e => e.sortOrder)).size !== orderedEvents.length) fail('Duplicate event order')
if (data.sceneTexts.length !== orderedEvents.length) fail('Scene count mismatch')
const scenes = orderedEvents.map(event => {
  const matches = data.sceneTexts.filter(scene => scene.eventId === event.id)
  if (matches.length !== 1) fail(`Event ${event.id} needs exactly one scene`)
  return matches[0]
})
const manuscript = scenes.map(scene => scene.text).join('\n\n')
if (normalize(manuscript) !== normalize(retainedText)) fail('Source reconstruction mismatch')
if (wordCount(manuscript) !== wordCount(retainedText)) fail('Manuscript word count mismatch')
for (let i = 0; i < sections.length; i++) {
  const chapter = data.chapters[i]
  if (chapter.number !== i + 1) fail(`Chapter order mismatch at ${i + 1}`)
  const text = orderedEvents.filter(event => event.chapterId === chapter.id).map(event => scenes[orderedEvents.indexOf(event)].text).join('\n\n')
  if (normalize(text) !== normalize(sections[i].text)) fail(`Chapter ${i + 1} mismatch`)
}
if (data.sceneTexts.reduce((sum, scene) => sum + scene.wordCount, 0) !== wordCount(retainedText)) fail('Scene word counts do not total source word count')
for (const scene of scenes) if (scene.wordCount !== wordCount(scene.text)) fail(`Scene word count wrong: ${scene.id}`)
console.log(`Manuscript reconstruction passed: ${sections.length} sections, ${orderedEvents.length} events/scenes, ${wordCount(manuscript)} words.`)

if (!process.argv.includes('--release')) process.exit(0)
if (plans.size !== sections.length) fail(`Only ${plans.size}/${sections.length} sections have reviewed event plans`)
if (data.timelines.length !== 1) fail('Expected a single story chronology')
const unique = values => new Set(values).size === values.length
const recordIds = []
for (const value of Object.values(data)) if (Array.isArray(value)) for (const record of value) if (record?.id) recordIds.push(record.id)
if (!unique(recordIds)) fail('Duplicate record IDs')
const ids = key => new Set(data[key].map(record => record.id))
const chapters = ids('chapters'), events = ids('events'), characters = ids('characters'), items = ids('items'), markers = new Map(data.locationMarkers.map(x => [x.id, x])), maps = new Map(data.mapLayers.map(x => [x.id, x])), blobs = ids('blobs')
const threads = ids('plotThreads'), motifs = ids('motifs'), facts = ids('knowledgeFacts'), factions = ids('factions'), relationships = ids('relationships')
if (data.events.some(event => !chapters.has(event.chapterId) || !event.title?.trim() || !event.description?.trim() || !markers.has(event.locationMarkerId))) fail('Event metadata or location incomplete')
if (data.events.some(event => !Number.isFinite(event.inWorldTime) || !Number.isFinite(event.travelDays) || event.travelDays < 0 || !Number.isInteger(event.tension) || event.tension < 1 || event.tension > 5)) fail('Calendar, elapsed time, or tension invalid')
for (let i = 1; i < orderedEvents.length; i++) if (orderedEvents[i].inWorldTime < orderedEvents[i - 1].inWorldTime) fail('Calendar runs backward')
for (let i = 1; i < orderedEvents.length; i++) if (Math.abs(orderedEvents[i].travelDays - (orderedEvents[i].inWorldTime - orderedEvents[i-1].inWorldTime)) > 1e-8) fail(`Elapsed time disagrees with calendar: ${orderedEvents[i].id}`)
const eventIndex = id => orderedEvents.findIndex(event => event.id === id)
const eventTitle = id => orderedEvents[eventIndex(id)]?.title
const expectedBeats = new Set(['hook','inciting-incident','plot-point-1','midpoint','plot-point-2','climax','resolution'])
if (!unique(orderedEvents.map(e=>e.structureBeat).filter(Boolean)) || orderedEvents.filter(e=>e.structureBeat).length !== expectedBeats.size || orderedEvents.some(e=>e.structureBeat && !expectedBeats.has(e.structureBeat))) fail('Structure spine incomplete or duplicated')
const expectedCalendar = [orderedEvents.find(e=>e.chapterId.endsWith('-1')),orderedEvents.find(e=>e.chapterId.endsWith('-14'))]
if (!(expectedCalendar[0]?.inWorldTime >= 120 && expectedCalendar[0].inWorldTime < 151 && expectedCalendar[1]?.inWorldTime >= 365 && expectedCalendar[1].inWorldTime < 372)) fail('May and first-week-of-January story positions incorrect')
for (const event of data.events) {
  if (!unique(event.involvedCharacterIds) || event.involvedCharacterIds.some(id => !characters.has(id))) fail(`Cast reference invalid: ${event.id}`)
  if (event.involvedItemIds.some(id => !items.has(id))) fail(`Item reference invalid: ${event.id}`)
  if (event.threadIds.some(id => !threads.has(id)) || event.motifIds.some(id => !motifs.has(id))) fail(`Thread or motif reference invalid: ${event.id}`)
  const snapshots = data.characterSnapshots.filter(x => x.eventId === event.id)
  if (!unique(snapshots.map(x => x.characterId))) fail(`Duplicate cast snapshot: ${event.id}`)
  if (JSON.stringify(snapshots.map(x => x.characterId).sort()) !== JSON.stringify([...event.involvedCharacterIds].sort())) fail(`Snapshot cast mismatch: ${event.id}`)
  if (!unique(snapshots.map(x => x.statusNotes))) fail(`Repeated status: ${event.id}`)
  const authored = snapshotNotes[event.title]
  if (!authored || Object.keys(authored).length !== snapshots.length) fail(`Incomplete individual snapshot ledger: ${event.title}`)
  for (const snapshot of snapshots) {
    const location = markers.get(snapshot.currentLocationMarkerId)
    const name = data.characters.find(c=>c.id===snapshot.characterId)?.name
    if (!snapshot.statusNotes?.trim() || snapshot.statusNotes !== authored[name] || / is (?:present during|dead after) “/.test(snapshot.statusNotes) || !location || snapshot.currentMapLayerId !== location.mapLayerId || snapshot.currentLocationMarkerId !== event.locationMarkerId) fail(`Snapshot state or place invalid: ${snapshot.id}`)
    if (snapshot.inventoryItemIds.some(id => !items.has(id))) fail(`Snapshot inventory invalid: ${snapshot.id}`)
  }
  const holders = snapshots.flatMap(snapshot=>snapshot.inventoryItemIds.map(id=>[id,snapshot.characterId]))
  if (!unique(holders.map(([id])=>id))) fail(`Item in two inventories: ${event.id}`)
}
for (const character of data.characters) {
  const states = data.characterSnapshots.filter(x => x.characterId === character.id).sort((a,b) => orderedEvents.findIndex(e => e.id === a.eventId) - orderedEvents.findIndex(e => e.id === b.eventId))
  if (states.some((x,i) => i && !states[i-1].isAlive && x.isAlive)) fail(`Resurrection in ${character.name}`)
  const reportedDeath = data.knowledgeFacts.find(fact=>fact.tags.includes(`offstage-death:${character.id}`))
  if (states.length && character.isAlive !== states.at(-1).isAlive && !(reportedDeath && !character.isAlive && states.at(-1).isAlive)) fail(`Final alive state wrong: ${character.name}`)
}
const expectedInventory = [
  ['Dick Shelton','Friar’s habit','A Friar’s Habit','Lawless’s Counsel'],
  ['Dick Shelton','Sir Daniel’s letter to Wensleydale','Throgmorton Discovered','Before Earl Risingham'],
  ['Dick Shelton','Lord Shoreby’s secret letter','The Dead Spy’s Warning','Lawless’s Counsel'],
  ['Throgmorton','Sir Daniel’s letter to Wensleydale','Throgmorton’s Errand','Throgmorton Escapes'],
]
for (const [name,itemName,first,last] of expectedInventory) {
  const character = data.characters.find(x=>x.name===name), item = data.items.find(x=>x.name===itemName)
  const held = data.characterSnapshots.filter(x=>x.characterId===character?.id && x.inventoryItemIds.includes(item?.id)).sort((a,b)=>eventIndex(a.eventId)-eventIndex(b.eventId))
  if (eventTitle(held[0]?.eventId)!==first || eventTitle(held.at(-1)?.eventId)!==last) fail(`Inventory span wrong: ${name} / ${itemName}`)
}
const expectedDeaths = new Map([['Appleyard','Appleyard Falls'],['Selden','Dick Calls to Selden'],['Throgmorton','Throgmorton Discovered'],['Lord Shoreby','The Wedding Procession'],['Earl Risingham','Dick Turns the Fight'],['Bennet Hatch','Bennet’s Men'],['The spy','The Spy Is Killed'],['Sir Daniel Brackley','A Black Arrow Strikes'],['Lawless','The Two Old Men']])
for (const character of data.characters) {
  const firstDeath = data.characterSnapshots.filter(x=>x.characterId===character.id && !x.isAlive).sort((a,b)=>eventIndex(a.eventId)-eventIndex(b.eventId))[0]
  if (eventTitle(firstDeath?.eventId) !== expectedDeaths.get(character.name)) fail(`Death transition wrong: ${character.name}`)
}
const tom = data.characters.find(character=>character.name==='Tom')
const tomDeath = data.knowledgeFacts.find(fact=>fact.tags.includes(`offstage-death:${tom?.id}`))
if (!tom || tom.isAlive || eventTitle(tomDeath?.readerLearnsAtEventId)!=='Arblaster’s Plea') fail('Tom’s reported offstage death is missing or premature')
if (data.characterSnapshots.some(snapshot=>snapshot.characterId===tom.id && !snapshot.isAlive)) fail('Tom has an invented death-scene snapshot')
for (const relationship of data.relationships) if (!characters.has(relationship.characterAId) || !characters.has(relationship.characterBId) || !events.has(relationship.startEventId)) fail(`Invalid relationship ${relationship.id}`)
for (const snapshot of data.relationshipSnapshots) if (!relationships.has(snapshot.relationshipId) || !events.has(snapshot.eventId)) fail(`Invalid relationship change ${snapshot.id}`)
for (const fact of data.knowledgeFacts) if (!events.has(fact.readerLearnsAtEventId) || !events.has(fact.originEventId)) fail(`Invalid knowledge fact ${fact.id}`)
for (const reveal of data.knowledgeReveals) {
  const fact = data.knowledgeFacts.find(x=>x.id===reveal.factId)
  if (!facts.has(reveal.factId) || !characters.has(reveal.characterId) || !events.has(reveal.eventId)) fail(`Invalid knowledge reveal ${reveal.id}`)
  if (orderedEvents.findIndex(x=>x.id===reveal.eventId) < orderedEvents.findIndex(x=>x.id===fact.readerLearnsAtEventId)) fail(`Premature knowledge reveal ${reveal.id}`)
}
for (const membership of data.factionMemberships) if (!factions.has(membership.factionId) || !characters.has(membership.characterId) || !events.has(membership.startEventId) || membership.endEventId && (!events.has(membership.endEventId) || eventIndex(membership.endEventId)<eventIndex(membership.startEventId))) fail(`Invalid faction membership ${membership.id}`)
for (const goal of data.characterGoals) if (!characters.has(goal.characterId) || !events.has(goal.startEventId) || !events.has(goal.endEventId) || eventIndex(goal.endEventId)<eventIndex(goal.startEventId)) fail(`Invalid character goal ${goal.id}`)
for (const placement of data.itemPlacements) if (!items.has(placement.itemId) || !events.has(placement.eventId) || !markers.has(placement.locationMarkerId)) fail(`Invalid item placement ${placement.id}`)
if (maps.size < 2 || data.mapLayers.filter(x => !x.parentMapId).length !== 1) fail('Map hierarchy incomplete')
for (const map of data.mapLayers) {
  if (!blobs.has(map.imageId) || !map.imageWidth || !map.imageHeight) fail(`Map image invalid: ${map.id}`)
  const blob = data.blobs.find(x=>x.id===map.imageId)
  const png = fs.readFileSync(path.resolve(import.meta.dirname,'../..',blob.url))
  if (blob.mimeType !== 'image/png' || png.toString('hex',0,8) !== '89504e470d0a1a0a' || png.readUInt32BE(16)!==map.imageWidth || png.readUInt32BE(20)!==map.imageHeight) fail(`Illustrated map dimensions invalid: ${map.id}`)
  if (map.parentMapId) {
    const gates = data.locationMarkers.filter(x => x.linkedMapLayerId === map.id)
    if (!maps.has(map.parentMapId) || gates.length !== 1 || gates[0].mapLayerId !== map.parentMapId) fail(`Gateway invalid: ${map.id}`)
    if (!data.locationMarkers.some(x => x.mapLayerId === map.id)) fail(`Unpopulated submap: ${map.id}`)
  }
}
for (const marker of data.locationMarkers) {
  const map = maps.get(marker.mapLayerId)
  if (!map || !blobs.has(marker.imageId) || marker.x < 0 || marker.y < 0 || marker.x > map.imageWidth || marker.y > map.imageHeight) fail(`Marker invalid: ${marker.id}`)
}
for (const route of data.mapRoutes) {
  if (!maps.has(route.mapLayerId) || route.waypoints.length < 2 || route.waypoints.some(id => markers.get(id)?.mapLayerId !== route.mapLayerId)) fail(`Route invalid: ${route.id}`)
}
const imageRefs = [data.world.coverImageId, ...data.characters.map(x => x.portraitImageId), ...data.items.map(x => x.imageId), ...data.locationMarkers.map(x => x.imageId), ...data.mapLayers.map(x => x.imageId)]
if (imageRefs.some(id => !id || !blobs.has(id)) || !unique(imageRefs)) fail('Missing or reused entity artwork')
const imageHashes = []
for (const blob of data.blobs) {
  if (!blob.url?.startsWith('library/black-arrow/')) fail(`Asset outside book folder: ${blob.id}`)
  const file = path.resolve(import.meta.dirname, '../..', blob.url)
  if (!fs.existsSync(file)) fail(`Missing artwork file: ${blob.url}`)
  imageHashes.push(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'))
}
if (!unique(imageHashes)) fail('Duplicate artwork bytes')
console.log(`Release validation passed: ${data.chapters.length} chapters, ${data.events.length} events, ${data.characters.length} characters, ${data.locationMarkers.length} locations, ${data.mapLayers.length} maps, ${data.blobs.length} unique images.`)
