import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '../..');
const get = (name) => path.join(root, name);
const manifest = JSON.parse(fs.readFileSync(get('scripts/the-wonderful-wizard-of-oz-art/manifest.json')));
const book = JSON.parse(fs.readFileSync(get('library/the-wonderful-wizard-of-oz.pwk')));
const index = JSON.parse(fs.readFileSync(get('library/index.json')));
const assert = (okay, message) => { if (!okay) throw new Error(message); };
const ids = new Set();
const hashes = new Set();
const collections = { characters: book.characters, items: book.items, locations: book.locationMarkers, factions: book.factions, lore: book.lorePages };
assert(manifest.slots.length === 107, 'Expected 107 art slots');
for (const slot of manifest.slots) {
  const object = slot.kind === 'cover' ? book.world : collections[slot.kind]?.find((entry) => entry.id === slot.objectId);
  assert(object?.[slot.field] === slot.newBlobId, `Art reference mismatch: ${slot.objectId}`);
  const blob = book.blobs.find((entry) => entry.id === slot.newBlobId);
  assert(blob?.url === slot.path && blob.mimeType === 'image/jpeg', `Blob mismatch: ${slot.objectId}`);
  assert(fs.existsSync(get(slot.path)), `Missing JPEG: ${slot.path}`);
  assert(!ids.has(blob.id), `Repeated art ID: ${blob.id}`);
  ids.add(blob.id);
  const hash = crypto.createHash('sha256').update(fs.readFileSync(get(slot.path))).digest('hex');
  assert(!hashes.has(hash), `Repeated art bytes: ${slot.path}`);
  hashes.add(hash);
  if (slot.oldUrl) assert(!fs.existsSync(get(slot.oldUrl)), `Superseded art still present: ${slot.oldUrl}`);
}
for (const map of manifest.maps) {
  const layer = book.mapLayers.find((entry) => entry.id === map.mapId);
  const blob = book.blobs.find((entry) => entry.id === map.blobId);
  assert(layer?.imageId === map.blobId && layer.imageWidth === map.width && layer.imageHeight === map.height, `Map layer mismatch: ${map.name}`);
  assert(blob?.url === (map.newUrl || map.oldUrl), `Map blob mismatch: ${map.name}`);
  assert(fs.existsSync(get(blob.url)), `Missing map: ${blob.url}`);
  if (map.newUrl) {
    assert(blob.mimeType === 'image/png', `Map type mismatch: ${map.name}`);
    assert(fs.existsSync(get(map.newUrl.replace(/\.png$/, '.svg'))), `Missing SVG map source: ${map.name}`);
    if (map.oldUrl) assert(!fs.existsSync(get(map.oldUrl)), `Superseded map still present: ${map.name}`);
  }
}
const layers = new Map(book.mapLayers.map((layer) => [layer.id, layer]));
const positions = new Set();
for (const marker of book.locationMarkers) {
  const layer = layers.get(marker.mapLayerId);
  assert(layer, `Unknown map for ${marker.name}`);
  assert(Number.isFinite(marker.x) && Number.isFinite(marker.y) && marker.x >= 0 && marker.x < layer.imageWidth && marker.y >= 0 && marker.y < layer.imageHeight, `Out-of-bounds marker: ${marker.name}`);
  const position = `${layer.id}:${marker.x},${marker.y}`;
  assert(!positions.has(position), `Repeated marker position: ${marker.name}`);
  positions.add(position);
  if (marker.linkedMapLayerId) assert(layers.get(marker.linkedMapLayerId)?.parentMapId === layer.id, `Broken map link: ${marker.name}`);
}
assert(book.locationMarkers.filter((marker) => marker.mapLayerId === 'oz-map-eastern-road').length === 12, 'Eastern Road stop count changed');
assert(book.locationMarkers.filter((marker) => marker.mapLayerId === 'oz-map-southern-road').length === 6, 'Southern Road stop count changed');
const entry = index.entries.find((item) => item.id === 'the-wonderful-wizard-of-oz');
assert(entry?.cover === manifest.slots[0].path, 'Catalogue cover mismatch');
assert(entry.dataBytes === fs.statSync(get('library/the-wonderful-wizard-of-oz.pwk')).size, 'Catalogue size mismatch');
assert(book.blobs.length === 116, `Unexpected blob count: ${book.blobs.length}`);
assert(book.characters.length === 21 && book.items.length === 12 && book.locationMarkers.length === 55 && book.factions.length === 8 && book.lorePages.length === 10 && book.mapLayers.length === 9, 'Book entity counts changed');
console.log('Validated 107 unique local illustrations, nine local maps, 55 placed locations, 116 live blobs, and catalogue references.');
