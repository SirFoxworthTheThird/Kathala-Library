import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const root = path.resolve(import.meta.dirname, '../..')
const file = path.join(root, 'library/the-phantom-of-the-opera.pwk')
const data = JSON.parse(fs.readFileSync(file, 'utf8'))
const fail = message => { throw new Error(message) }
const unique = values => new Set(values).size === values.length

if (data.chapters.length !== 28) fail('Expected Prologue, 26 chapters, and Epilogue')
if (data.events.length !== 83 || data.sceneTexts.length !== 83) fail('Expected 83 events with 83 scene drafts')
if (data.timelines.length !== 1) fail('The novel must use one narrative timeline')
if (!data.events.every(event => Number.isFinite(event.inWorldTime))) fail('Every event needs a numeric calendar pin')
if (!data.events.every(event => event.tension >= 1 && event.tension <= 5)) fail('Tension must stay inside the 1–5 range')

const events = new Map(data.events.map(event => [event.id, event]))
for (const snapshot of data.characterSnapshots) {
  const event = events.get(snapshot.eventId)
  if (!event) fail(`Snapshot ${snapshot.id} points to a missing event`)
  if (!event.involvedCharacterIds.includes(snapshot.characterId)) {
    fail(`Snapshot ${snapshot.id} belongs to a character absent from its event`)
  }
  if (!snapshot.statusNotes?.trim()) fail(`Snapshot ${snapshot.id} has no event-specific status`)
}

const layers = new Map(data.mapLayers.map(layer => [layer.id, layer]))
for (const marker of data.locationMarkers) {
  const layer = layers.get(marker.mapLayerId)
  if (!layer) fail(`Location ${marker.name} points to a missing map`)
  if (marker.x < 0 || marker.x > layer.imageWidth || marker.y < 0 || marker.y > layer.imageHeight) {
    fail(`Location ${marker.name} lies outside ${layer.name}`)
  }
  if (marker.linkedMapLayerId && !layers.has(marker.linkedMapLayerId)) fail(`Broken submap gateway at ${marker.name}`)
}
for (const layer of data.mapLayers.filter(layer => layer.parentMapId)) {
  if (!data.locationMarkers.some(marker => marker.linkedMapLayerId === layer.id)) fail(`Submap ${layer.name} has no parent gateway`)
}

if (!unique(data.blobs.map(blob => blob.id))) fail('Duplicate image IDs')
for (const blob of data.blobs) {
  const asset = path.join(root, blob.url.replaceAll('/', path.sep))
  if (!fs.existsSync(asset)) fail(`Missing image: ${blob.url}`)
}
const assetHash = blob => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, blob.url))).digest('hex')
for (const group of ['art/characters/', 'art/items/']) {
  const images = data.blobs.filter(blob => blob.url.includes(group))
  const hashes = images.map(assetHash)
  if (!unique(hashes)) fail(`Repeated artwork detected in ${group}`)
}

const sceneWords = data.sceneTexts.reduce((sum, scene) => sum + scene.wordCount, 0)
if (sceneWords !== 85371) fail(`Unexpected manuscript word count: ${sceneWords}`)

console.log(JSON.stringify({
  chapters: data.chapters.length,
  events: data.events.length,
  manuscriptWords: sceneWords,
  characters: data.characters.length,
  locations: data.locationMarkers.length,
  maps: data.mapLayers.length,
  items: data.items.length,
  images: data.blobs.length,
  snapshots: data.characterSnapshots.length,
}, null, 2))
