import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'the-hound-of-the-baskervilles';
const prefix = 'hound-';
const pwkPath = path.join(root, 'library', `${slug}.pwk`);
const indexPath = path.join(root, 'library', 'index.json');
const world = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));
const now = Date.now();
const generated = [];
const addBlob = (id, relativePath) => {
  if (!fs.existsSync(path.join(root, ...relativePath.split('/')))) throw new Error(`Missing asset: ${relativePath}`);
  generated.push({ worldId: world.world.id, createdAt: now, updatedAt: now, id, mimeType: 'image/jpeg', url: relativePath });
  return id;
};

const coverId = addBlob(`${prefix}image-generated-cover`, `library/${slug}/art/generated/cover.jpg`);
world.world.coverImageId = coverId;
for (const character of world.characters) {
  const key = character.id.replace(`${prefix}char-`, '');
  character.portraitImageId = addBlob(`${prefix}image-generated-character-${key}`, `library/${slug}/art/generated/characters/${key}.jpg`);
}
for (const item of world.items) {
  const key = item.id.replace(`${prefix}item-`, '');
  item.imageId = addBlob(`${prefix}image-generated-item-${key}`, `library/${slug}/art/generated/items/${key}.jpg`);
}
for (const location of world.locationMarkers) {
  const key = location.id.replace(`${prefix}loc-`, '');
  location.imageId = addBlob(`${prefix}image-generated-location-${key}`, `library/${slug}/art/generated/locations/${key}.jpg`);
}

const mapIds = new Set(world.mapLayers.map((map) => map.imageId));
world.blobs = world.blobs.filter((blob) => mapIds.has(blob.id));
world.blobs.push(...generated);

const loreCovers = {
  [`${prefix}lore-1`]: `${prefix}image-generated-character-hugo`,
  [`${prefix}lore-2`]: `${prefix}image-generated-item-portrait`,
  [`${prefix}lore-3`]: `${prefix}image-generated-location-grimpen`,
  [`${prefix}lore-4`]: `${prefix}image-generated-location-dartmoor-portal`,
  [`${prefix}lore-5`]: `${prefix}image-generated-location-summer-house`,
  [`${prefix}lore-6`]: `${prefix}image-generated-item-hound`,
  [`${prefix}lore-7`]: `${prefix}image-generated-location-stone-hut`,
  [`${prefix}lore-8`]: `${prefix}image-generated-item-phosphorus`,
  [`${prefix}lore-9`]: `${prefix}image-generated-item-reports`,
  [`${prefix}lore-10`]: coverId,
  [`${prefix}lore-11`]: `${prefix}image-generated-character-holmes`,
  [`${prefix}lore-12`]: `${prefix}image-map-dartmoor`,
};
for (const page of world.lorePages) page.coverImageId = loreCovers[page.id] ?? page.coverImageId;
const sources = world.lorePages.find((page) => page.id === `${prefix}lore-12`);
if (sources) sources.body = 'The cover, character portraits, item plates, and location scenes are original generated illustrations created for the Kathala Library edition. The four linked maps remain preserved for geographic and navigational accuracy: Britain, Victorian London, Dartmoor, and the editorial plan of Baskerville Hall.';

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized, 'utf8');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const entry = index.entries.find((candidate) => candidate.id === slug);
if (!entry) throw new Error('Library index entry not found');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
entry.dataBytes = Buffer.byteLength(serialized);
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ characters: world.characters.length, items: world.items.length, locations: world.locationMarkers.length, maps: mapIds.size, generated: generated.length, blobs: world.blobs.length }, null, 2));
