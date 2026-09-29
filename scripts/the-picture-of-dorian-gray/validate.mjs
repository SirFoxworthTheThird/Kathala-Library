import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const slug = 'the-picture-of-dorian-gray';
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
if (generated.length !== 77) failures.push(`expected 77 generated blobs, got ${generated.length}`);
if (mapIds.size !== 6) failures.push(`expected 6 maps, got ${mapIds.size}`);
if (externalNonMaps.length) failures.push(`external non-map blobs remain: ${externalNonMaps.map((blob) => blob.id).join(', ')}`);
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(JSON.stringify({ generated: generated.length, maps: mapIds.size, characters: world.characters.length, items: world.items.length, locations: world.locationMarkers.length, loreCovers: world.lorePages.length, externalNonMaps: 0 }, null, 2));
