import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../..')
const read = relative => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'))
const original = read('library/os-lusiadas.pwk')
const localized = read('library/os-lusiadas-pt.pwk')
const translations = read('scripts/os-lusiadas-pt/translations.json')
const artwork = read('scripts/os-lusiadas-pt/artwork-manifest.json')
const index = read('library/index.json')
const restored = structuredClone(localized)
const oldId = id => id.replace(/^os-lusiadas-pt-/, 'os-lusiadas-')
const newId = id => id.replace(/^os-lusiadas-/, 'os-lusiadas-pt-')

assert.equal(localized.world.id, 'os-lusiadas-pt-world')
assert.equal(localized.world.readingMode, true)
assert.equal(localized.chapters.length, 10)
assert.equal(localized.events.length, 367)
assert.equal(localized.sceneTexts.length, 367)
assert.equal(localized.mapLayers.length, 8)
assert.equal(localized.locationMarkers.length, 68)
assert.equal(localized.characterSnapshots.length, 563)
assert.deepEqual(localized.sceneTexts.map(row => row.text), original.sceneTexts.map(row => row.text), 'Every source verse passage must be byte-for-byte identical')

for (const [key, entry] of Object.entries(translations)) {
  const [collection, id, field] = key.split('/')
  const target = collection === 'world' ? restored.world : restored[collection]?.find(row => row.id === newId(id))
  assert.ok(target, `Missing localized record ${key}`)
  assert.equal(typeof target[field], 'string', `Missing localized text ${key}`)
  assert.ok(target[field].trim(), `Blank localization ${key}`)
  assert.equal(original[collection] instanceof Array ? original[collection].find(row => row.id === id)?.[field] : original.world[field], entry.source, `Source drift ${key}`)
  target[field] = entry.source
}
restored.world.name = original.world.name
restored.world.calendar.months.forEach((month, index) => month.name = original.world.calendar.months[index].name)
for (const character of restored.characters) {
  if (character.id === 'os-lusiadas-pt-char-amp') character.nameChanges[0].name = 'Amphitrite'
}
for (const blob of restored.blobs) blob.url = blob.url.replace('library/os-lusiadas-pt/maps/', 'library/os-lusiadas/maps/')

function restoreIds(value) {
  if (Array.isArray(value)) return value.map(restoreIds)
  if (typeof value === 'string') return oldId(value).replace('offstage-death:os-lusiadas-pt-', 'offstage-death:os-lusiadas-')
  if (!value || typeof value !== 'object') return value
  for (const [key, child] of Object.entries(value)) value[key] = restoreIds(child)
  return value
}
restoreIds(restored)
assert.deepEqual(restored, original, 'Portuguese entry changed source structure beyond the documented locale fields')

for (const blob of localized.blobs) {
  const file = path.join(root, blob.url)
  assert.ok(fs.existsSync(file), `Missing image ${blob.url}`)
  assert.ok(fs.statSync(file).size > 0, `Empty image ${blob.url}`)
}
for (const map of localized.mapLayers) {
  const blob = localized.blobs.find(row => row.id === map.imageId)
  assert.ok(blob?.url.startsWith('library/os-lusiadas-pt/maps/'), `Wrong map image ${map.id}`)
  const bytes = fs.readFileSync(path.join(root, blob.url))
  assert.equal(bytes.readUInt32BE(16), map.imageWidth)
  assert.equal(bytes.readUInt32BE(20), map.imageHeight)
}
assert.equal(artwork.sharedNonMapAssets, 158)
assert.equal(artwork.assets.length, 8)
for (const asset of artwork.assets) {
  const bytes = fs.readFileSync(path.join(root, asset.path))
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), asset.sha256, `Map artwork hash ${asset.path}`)
  assert.ok(localized.blobs.some(blob => blob.url === asset.path), `Map artwork not used ${asset.path}`)
}
const catalogue = index.entries.find(row => row.id === 'os-lusiadas-pt')
assert.ok(catalogue, 'Missing Portuguese catalogue entry')
assert.equal(catalogue.worldId, localized.world.id)
assert.equal(catalogue.dataBytes, fs.statSync(path.join(root, catalogue.data.startsWith('library/') ? catalogue.data : `library/${catalogue.data}`)).size)
assert.deepEqual(catalogue.counts, {characters: 78, chapters: 10, events: 367, locations: 68})
console.log(`PASS: Portuguese entry, ${Object.keys(translations).length} localized fields, 10 cantos, 367 scenes, 8,816 identical verse lines, 8 maps, 166 resolvable images`)
