import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const slug = 'the-scarlet-pimpernel';
const world = JSON.parse(fs.readFileSync(path.join(root, 'library', `${slug}.pwk`), 'utf8'));
const blobs = new Map(world.blobs.map((blob) => [blob.id, blob]));
const failures = [];
const requireBlob = (id, label) => {
  const blob = blobs.get(id);
  if (!blob) return failures.push(`${label}: missing blob ${id}`);
  if (blob.url.startsWith('library/')) {
    const file = path.join(root, ...blob.url.split('/'));
    if (!fs.existsSync(file)) failures.push(`${label}: missing file ${blob.url}`);
  }
};
requireBlob(world.world.coverImageId, 'world cover');
for (const entity of world.characters) requireBlob(entity.portraitImageId, `character ${entity.id}`);
for (const entity of world.items) requireBlob(entity.imageId, `item ${entity.id}`);
for (const entity of world.locationMarkers) requireBlob(entity.imageId, `location ${entity.id}`);
for (const map of world.mapLayers) requireBlob(map.imageId, `map ${map.id}`);
for (const page of world.lorePages) requireBlob(page.coverImageId, `lore ${page.id}`);
const generated = world.blobs.filter((blob) => blob.id.includes('image-generated-'));
const mapIds = new Set(world.mapLayers.map((map) => map.imageId));
const externalNonMaps = world.blobs.filter((blob) => /^https?:/.test(blob.url) && !mapIds.has(blob.id));
if (generated.length !== 36) failures.push(`expected 36 generated blobs, got ${generated.length}`);
if (mapIds.size !== 4) failures.push(`expected 4 maps, got ${mapIds.size}`);
if (externalNonMaps.length) failures.push(`external non-map blobs remain: ${externalNonMaps.map((blob) => blob.id).join(', ')}`);
const archivePath = path.join(root, 'scripts', slug, 'superseded-external-sources.json');
if (!fs.existsSync(archivePath)) failures.push('missing superseded external source archive');
else {
  const archive = JSON.parse(fs.readFileSync(archivePath, 'utf8'));
  if (!Array.isArray(archive.blobs) || archive.blobs.length !== 16) failures.push(`expected 16 archived superseded external blobs, got ${archive.blobs?.length ?? 0}`);
}
const hashes = new Map();
for (const blob of generated) {
  const file = path.join(root, ...blob.url.split('/'));
  if (!fs.existsSync(file)) continue;
  const bytes = fs.readFileSync(file);
  if (bytes.subarray(0, 2).toString('hex') !== 'ffd8') failures.push(`${blob.url}: not a JPEG signature`);
  const hash = crypto.createHash('sha256').update(bytes).digest('hex');
  if (hashes.has(hash)) failures.push(`duplicate generated files: ${hashes.get(hash)} and ${blob.url}`);
  hashes.set(hash, blob.url);
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(JSON.stringify({ generated: generated.length, maps: mapIds.size, characters: world.characters.length, items: world.items.length, locations: world.locationMarkers.length, loreCovers: world.lorePages.length, externalNonMaps: 0, duplicates: 0 }, null, 2));
