import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'scripts/the-count-of-monte-cristo-art/manifest.json'), 'utf8'));
const raw = fs.readFileSync(path.join(root, 'library/the-count-of-monte-cristo.pwk'));
const world = JSON.parse(raw);
const index = JSON.parse(fs.readFileSync(path.join(root, 'library/index.json'), 'utf8'));
const entry = index.entries.find(x => x.id === 'the-count-of-monte-cristo');
const archive = JSON.parse(fs.readFileSync(path.join(root, 'scripts/the-count-of-monte-cristo-art/superseded-illustration-sources.json'), 'utf8'));
const failures = [];
const blobs = new Map(world.blobs.map(x => [x.id, x]));
const mapIds = new Set(world.mapLayers.map(x => x.imageId));
const collections = {characters: 'characters', items: 'items', locations: 'locationMarkers', lore: 'lorePages', factions: 'factions'};
const ids = new Set();
const urls = new Set();
const hashes = new Set();

if (manifest.slots.length !== 126 || world.blobs.length !== 132 || archive.blobs.length !== 138) failures.push('Image inventory count changed');
// 42 since Andrea Cavalcanti became his own character, revealed to be Benedetto (scripts/names/the-count-of-monte-cristo.mjs).
if (world.characters.length !== 42 || world.items.length !== 17 || world.locationMarkers.length !== 50 || world.lorePages.length !== 10 || world.factions.length !== 7 || world.chapters.length !== 117) failures.push('Book content count changed');
for (const slot of manifest.slots) {
  const entity = slot.kind === 'cover' ? world.world : world[collections[slot.kind]]?.find(x => x.id === slot.objectId);
  const blob = blobs.get(slot.newBlobId);
  if (!entity || entity[slot.field] !== slot.newBlobId || !blob) { failures.push(`Broken reference: ${slot.number} ${slot.name}`); continue; }
  if (ids.has(blob.id) || urls.has(blob.url)) failures.push(`Repeated image ID or URL: ${slot.number}`);
  ids.add(blob.id); urls.add(blob.url);
  if (blob.url !== slot.path || blob.mimeType !== 'image/jpeg' || !blob.url.startsWith('library/')) { failures.push(`Invalid generated blob: ${slot.number}`); continue; }
  const file = path.join(root, ...blob.url.split('/'));
  if (!fs.existsSync(file)) { failures.push(`Missing image: ${slot.path}`); continue; }
  const bytes = fs.readFileSync(file);
  if (bytes.subarray(0, 2).toString('hex') !== 'ffd8' || bytes.subarray(-2).toString('hex') !== 'ffd9') failures.push(`Invalid JPEG: ${slot.path}`);
  const hash = crypto.createHash('sha256').update(bytes).digest('hex');
  if (hashes.has(hash)) failures.push(`Repeated image content: ${slot.number}`);
  hashes.add(hash);
}
if (mapIds.size !== 6 || manifest.retainedMaps.length !== 6) failures.push('Map inventory count changed');
for (const map of manifest.retainedMaps) {
  const blob = blobs.get(map.blobId);
  if (!mapIds.has(map.blobId) || blob?.url !== map.url) failures.push(`Map changed: ${map.name}`);
}
if (archive.blobs.some(blob => !/^https?:/.test(blob.url) || mapIds.has(blob.id))) failures.push('Source archive invalid');
if ([...blobs.values()].some(blob => !mapIds.has(blob.id) && !ids.has(blob.id))) failures.push('Unreferenced or old illustration blob active');
if (entry?.cover !== manifest.slots[0].path || entry.dataBytes !== raw.length) failures.push('Catalogue cover or byte size mismatch');
if (!world.lorePages[0]?.body.includes('original generated illustrations') || !entry?.notice.includes('Original generated illustrations')) failures.push('Source disclosure not updated');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(JSON.stringify({illustrations: manifest.slots.length, uniqueUrls: urls.size, uniqueHashes: hashes.size, retainedMaps: mapIds.size, archivedSources: archive.blobs.length}, null, 2));
