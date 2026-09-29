import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const pwkPath = path.join(root, 'library', 'the-moonstone.pwk');
const world = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));
const blobs = new Map(world.blobs.map((blob) => [blob.id, blob]));
const failures = [];

const requireBlob = (id, context) => {
  const blob = blobs.get(id);
  if (!blob) {
    failures.push(`${context}: missing blob ${id}`);
    return;
  }
  if (blob.url?.startsWith('library/')) {
    const file = path.join(root, ...blob.url.split('/'));
    if (!fs.existsSync(file)) failures.push(`${context}: missing local file ${blob.url}`);
  }
};

requireBlob(world.world.coverImageId, 'world cover');
for (const character of world.characters) requireBlob(character.portraitImageId, `character ${character.id}`);
for (const item of world.items) requireBlob(item.imageId, `item ${item.id}`);
for (const location of world.locationMarkers) requireBlob(location.imageId, `location ${location.id}`);
for (const map of world.mapLayers) requireBlob(map.imageId, `map ${map.id}`);
for (const page of world.lorePages) requireBlob(page.coverImageId, `lore ${page.id}`);

const generated = world.blobs.filter((blob) => blob.id.includes('image-generated-'));
if (generated.length !== 76) failures.push(`expected 76 generated blobs, found ${generated.length}`);
if (world.mapLayers.length !== 6) failures.push(`expected 6 maps, found ${world.mapLayers.length}`);
if (world.characters.some((character) => !character.portraitImageId)) failures.push('one or more characters lack portraits');
if (world.items.some((item) => !item.imageId)) failures.push('one or more items lack images');
if (world.locationMarkers.some((location) => !location.imageId)) failures.push('one or more locations lack images');

const externalNonMaps = world.blobs.filter((blob) => !blob.url?.startsWith('library/') && !world.mapLayers.some((map) => map.imageId === blob.id));
if (externalNonMaps.length) failures.push(`found ${externalNonMaps.length} superseded external non-map blobs`);

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  cover: 1,
  characters: world.characters.length,
  items: world.items.length,
  locations: world.locationMarkers.length,
  maps: world.mapLayers.length,
  lorePages: world.lorePages.length,
  generatedBlobs: generated.length,
  brokenLocalFiles: 0,
  unresolvedImageReferences: 0,
  externalNonMapBlobs: 0,
}, null, 2));
