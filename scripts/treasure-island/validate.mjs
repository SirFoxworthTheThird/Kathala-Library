import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const slug = 'treasure-island';
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
for (const value of world.characters) requireBlob(value.portraitImageId, `character ${value.id}`);
for (const value of world.items) requireBlob(value.imageId, `item ${value.id}`);
for (const value of world.locationMarkers) requireBlob(value.imageId, `location ${value.id}`);
for (const value of world.mapLayers) requireBlob(value.imageId, `map ${value.id}`);
for (const value of world.lorePages) requireBlob(value.coverImageId, `lore ${value.id}`);
for (const value of world.factions) requireBlob(value.coverImageId, `faction ${value.id}`);
const scanImageReferences = (value, label = 'world') => {
  if (Array.isArray(value)) return value.forEach((child, i) => scanImageReferences(child, `${label}[${i}]`));
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (['imageId', 'coverImageId', 'portraitImageId'].includes(key) && typeof child === 'string' && child) requireBlob(child, `${label}.${key}`);
    scanImageReferences(child, `${label}.${key}`);
  }
};
scanImageReferences(world);

const generated = world.blobs.filter(blob => blob.id.includes('image-generated-'));
const mapIds = new Set(world.mapLayers.map(map => map.imageId));
const external = world.blobs.filter(blob => /^https?:/.test(blob.url) && !mapIds.has(blob.id));
if (generated.length !== 72) failures.push(`expected 72 generated blobs, got ${generated.length}`);
if (mapIds.size !== 4) failures.push(`expected four map images, got ${mapIds.size}`);
if (external.length) failures.push(`external non-map illustration blobs remain: ${external.map(blob => blob.id).join(', ')}`);
if (!entry) failures.push('catalogue entry missing');
else {
  if (entry.dataBytes !== bytes.length) failures.push(`catalogue dataBytes ${entry.dataBytes} differs from ${bytes.length}`);
  if (entry.cover !== 'library/treasure-island/art/generated/cover.jpg') failures.push(`wrong catalogue cover: ${entry.cover}`);
}
const archivePath = path.join(root, 'scripts', slug, 'superseded-external-sources.json');
if (!fs.existsSync(archivePath)) failures.push('missing superseded source archive');
else {
  const archive = JSON.parse(fs.readFileSync(archivePath, 'utf8'));
  if (!Array.isArray(archive.blobs) || archive.blobs.length !== 20) failures.push(`expected 20 archived sources, got ${archive.blobs?.length ?? 0}`);
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
console.log(JSON.stringify({ generated: 72, characters: world.characters.length, items: world.items.length, locations: world.locationMarkers.length, loreCovers: world.lorePages.length, factionCovers: world.factions.length, maps: mapIds.size, archivedSources: 20, dataBytes: bytes.length, duplicates: 0 }, null, 2));
