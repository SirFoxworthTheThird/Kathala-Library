import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'the-lost-world';
const prefix = 'lost-world-';
const pwkPath = path.join(root, 'library', `${slug}.pwk`);
const indexPath = path.join(root, 'library', 'index.json');
const world = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));
const now = Date.now();
const generated = [];

const addBlob = (id, relativePath) => {
  const diskPath = path.join(root, ...relativePath.split('/'));
  if (!fs.existsSync(diskPath)) throw new Error(`Missing generated asset: ${relativePath}`);
  generated.push({ worldId: world.world.id, createdAt: now, updatedAt: now, id, mimeType: 'image/jpeg', url: relativePath });
  return id;
};

const coverId = `${prefix}image-generated-cover`;
addBlob(coverId, `library/${slug}/art/generated/cover.jpg`);
world.world.coverImageId = coverId;

for (const character of world.characters) {
  const key = character.id.replace(`${prefix}character-`, '');
  character.portraitImageId = addBlob(`${prefix}image-generated-character-${key}`, `library/${slug}/art/generated/characters/${key}.jpg`);
}
for (const item of world.items) {
  const key = item.id.replace(`${prefix}item-`, '');
  item.imageId = addBlob(`${prefix}image-generated-item-${key}`, `library/${slug}/art/generated/items/${key}.jpg`);
}
for (const location of world.locationMarkers) {
  const key = location.id.replace(`${prefix}location-`, '');
  location.imageId = addBlob(`${prefix}image-generated-location-${key}`, `library/${slug}/art/generated/locations/${key}.jpg`);
}

const mapIds = new Set([
  `${prefix}image-atlantic-map`,
  `${prefix}image-london-map`,
  `${prefix}image-approach-map`,
  `${prefix}image-plateau-map`,
]);
world.blobs = world.blobs.filter((blob) => mapIds.has(blob.id));
world.blobs.push(...generated);

const loreCovers = {
  [`${prefix}lore-lost-worlds`]: `${prefix}image-generated-location-plateau-gate`,
  [`${prefix}lore-field-evidence`]: `${prefix}image-generated-item-photographs`,
  [`${prefix}lore-amazon-frontier`]: `${prefix}image-generated-location-amazon-gate`,
  [`${prefix}lore-plateau-society`]: `${prefix}image-generated-location-indian-caves`,
  [`${prefix}lore-journalism`]: `${prefix}image-generated-character-malone`,
  [`${prefix}lore-sources`]: `${prefix}image-plateau-map`,
};
for (const page of world.lorePages) page.coverImageId = loreCovers[page.id] ?? page.coverImageId;
const sourcePage = world.lorePages.find((page) => page.id === `${prefix}lore-sources`);
if (sourcePage) sourcePage.body = 'The cover, character portraits, item plates, and location scenes are original generated illustrations created for the Kathala Library edition. The four linked historical maps remain preserved: London, the Atlantic crossing, the South American approach, and the plateau itself.';

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized, 'utf8');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const entry = index.entries.find((candidate) => candidate.id === slug);
if (!entry) throw new Error('Library index entry not found');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
entry.dataBytes = Buffer.byteLength(serialized);
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({ cover: world.world.coverImageId, characters: world.characters.length, items: world.items.length, locations: world.locationMarkers.length, maps: mapIds.size, generatedBlobs: generated.length, totalBlobs: world.blobs.length, dataBytes: entry.dataBytes }, null, 2));
