import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const slug = 'a-tale-of-two-cities';
const pwkPath = path.join(root, 'library', `${slug}.pwk`);
const bytes = fs.readFileSync(pwkPath);
const world = JSON.parse(bytes);
const index = JSON.parse(fs.readFileSync(path.join(root, 'library', 'index.json'), 'utf8'));
const entry = index.entries.find(item => item.id === slug);
const blobs = new Map(world.blobs.map(blob => [blob.id, blob]));
const failures = [];
const requireBlob = (id, label) => {
  const blob = blobs.get(id);
  if (!blob) { failures.push(`${label}: missing blob ${id}`); return; }
  if (blob.url.startsWith('library/') && !fs.existsSync(path.join(root, ...blob.url.split('/')))) failures.push(`${label}: missing file ${blob.url}`);
};
requireBlob(world.world.coverImageId, 'world cover');
for (const item of world.characters) requireBlob(item.portraitImageId, `character ${item.id}`);
for (const item of world.items) requireBlob(item.imageId, `item ${item.id}`);
for (const item of world.locationMarkers) requireBlob(item.imageId, `location ${item.id}`);
for (const item of world.mapLayers) requireBlob(item.imageId, `map ${item.id}`);
for (const item of world.lorePages) requireBlob(item.coverImageId, `lore ${item.id}`);

const generated = world.blobs.filter(blob => blob.id.includes('image-generated-'));
const maps = new Set(world.mapLayers.map(map => map.imageId));
const external = world.blobs.filter(blob => /^https?:/.test(blob.url) && !maps.has(blob.id));
if (generated.length !== 69) failures.push(`expected 69 generated blobs, got ${generated.length}`);
if (maps.size !== 3) failures.push(`expected 3 maps, got ${maps.size}`);
if (external.length) failures.push(`external non-map illustrations remain: ${external.map(blob => blob.id).join(', ')}`);
if (!entry) failures.push('catalogue entry missing');
else {
  if (entry.dataBytes !== bytes.length) failures.push(`catalogue byte count ${entry.dataBytes} differs from ${bytes.length}`);
  if (entry.cover !== 'library/a-tale-of-two-cities/art/generated/cover.jpg') failures.push(`wrong catalogue cover: ${entry.cover}`);
}
const archivePath = path.join(root, 'scripts', slug, 'superseded-external-sources.json');
if (!fs.existsSync(archivePath)) failures.push('missing superseded source archive');
else {
  const archive = JSON.parse(fs.readFileSync(archivePath, 'utf8'));
  if (!Array.isArray(archive.blobs) || archive.blobs.length !== 73) failures.push(`expected 73 archived source records, got ${archive.blobs?.length ?? 0}`);
}
const hashes = new Map();
for (const blob of generated) {
  const file = path.join(root, ...blob.url.split('/'));
  if (!fs.existsSync(file)) continue;
  const data = fs.readFileSync(file);
  if (data.subarray(0, 2).toString('hex') !== 'ffd8' || data.subarray(-2).toString('hex') !== 'ffd9') failures.push(`${blob.url}: invalid JPEG boundary`);
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  if (hashes.has(hash)) failures.push(`duplicate generated files: ${hashes.get(hash)} and ${blob.url}`);
  hashes.set(hash, blob.url);
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(JSON.stringify({ generated: generated.length, characters: world.characters.length, items: world.items.length, locations: world.locationMarkers.length, loreCovers: world.lorePages.length, retainedMaps: maps.size, archivedSources: 73, dataBytes: bytes.length, duplicates: 0 }, null, 2));
