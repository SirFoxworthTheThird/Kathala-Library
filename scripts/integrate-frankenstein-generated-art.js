import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'frankenstein';
const prefix = `${slug}-`;
const pwkPath = path.join(root, 'library', `${slug}.pwk`);
const indexPath = path.join(root, 'library', 'index.json');
const world = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));
const now = Date.now();
const blobs = [];

const addBlob = (id, relativePath) => {
  const diskPath = path.join(root, ...relativePath.split('/'));
  if (!fs.existsSync(diskPath)) throw new Error(`Missing generated asset: ${relativePath}`);
  blobs.push({ worldId: world.world.id, createdAt: now, updatedAt: now, id, mimeType: 'image/jpeg', url: relativePath });
  return id;
};

const coverId = `${prefix}image-generated-cover`;
addBlob(coverId, `library/${slug}/art/generated/cover.jpg`);
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

const keepIds = new Set(world.blobs.filter((blob) => blob.id.startsWith(`${prefix}image-map-`)).map((blob) => blob.id));
world.blobs = world.blobs.filter((blob) => keepIds.has(blob.id));
world.blobs.push(...blobs);

const loreCovers = {
  [`${prefix}lore-1`]: `${prefix}image-generated-item-chemistry`,
  [`${prefix}lore-2`]: `${prefix}image-generated-location-laboratory`,
  [`${prefix}lore-3`]: `${prefix}image-generated-item-paradise-lost`,
  [`${prefix}lore-4`]: `${prefix}image-generated-character-creature`,
  [`${prefix}lore-5`]: `${prefix}image-generated-location-geneva-prison`,
  [`${prefix}lore-6`]: `${prefix}image-generated-location-cottage-portal`,
  [`${prefix}lore-7`]: `${prefix}image-generated-location-lake-geneva`,
  [`${prefix}lore-8`]: `${prefix}image-generated-location-university`,
  [`${prefix}lore-9`]: `${prefix}image-generated-location-mer-de-glace`,
  [`${prefix}lore-10`]: `${prefix}image-generated-location-island-hut`,
  [`${prefix}lore-11`]: `${prefix}image-generated-location-walton-ship`,
  [`${prefix}lore-12`]: `${prefix}image-generated-character-victor`,
  [`${prefix}lore-13`]: `${prefix}image-generated-character-clerval`,
  [`${prefix}lore-14`]: coverId,
  [`${prefix}lore-15`]: `${prefix}image-map-europe`,
};
for (const page of world.lorePages) page.coverImageId = loreCovers[page.id] ?? page.coverImageId;
const sourcePage = world.lorePages.find((page) => page.id === `${prefix}lore-15`);
if (sourcePage) sourcePage.body = 'The cover, character portraits, item plates, and location scenes are original generated illustrations created for the Kathala Library edition. The ten linked maps remain carefully selected historical maps covering Europe, the Lake Geneva region, Geneva, Ingolstadt, Mont Blanc, Britain, Orkney, Ireland, the Arctic, and the De Lacey cottage area.';

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized, 'utf8');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const entry = index.entries.find((candidate) => candidate.id === slug);
if (!entry) throw new Error('Library index entry not found');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
entry.dataBytes = Buffer.byteLength(serialized);
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({ cover: world.world.coverImageId, characters: world.characters.length, items: world.items.length, locations: world.locationMarkers.length, maps: keepIds.size, generatedBlobs: blobs.length, totalBlobs: world.blobs.length, dataBytes: entry.dataBytes }, null, 2));
