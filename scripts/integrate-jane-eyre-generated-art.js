import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'jane-eyre';
const prefix = 'jane-eyre-';
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
  [`${prefix}lore-page-1`]: coverId,
  [`${prefix}lore-page-2`]: `${prefix}image-map-england`,
  [`${prefix}lore-page-3`]: `${prefix}image-generated-location-lowood-gate`,
  [`${prefix}lore-page-4`]: `${prefix}image-generated-location-third-floor`,
  [`${prefix}lore-page-5`]: `${prefix}image-generated-item-advertisement`,
  [`${prefix}lore-page-6`]: `${prefix}image-generated-item-john-letter`,
  [`${prefix}lore-page-7`]: `${prefix}image-generated-character-jane`,
  [`${prefix}lore-page-8`]: `${prefix}image-generated-location-rochester-room`,
  [`${prefix}lore-page-9`]: `${prefix}image-generated-item-drawings`,
  [`${prefix}lore-page-10`]: `${prefix}image-generated-character-st-john`,
};
for (const page of world.lorePages) page.coverImageId = loreCovers[page.id] ?? page.coverImageId;
const sources = world.lorePages.find((page) => page.id === `${prefix}lore-page-1`);
if (sources) sources.body = 'The structure follows Charlotte Brontë’s 1847 public-domain novel as presented by Project Gutenberg. Brontë’s chapters are numbered and carry no titles: the chapter names used here are editorial signposts written for this world, not the author’s words. The cover, character portraits, item plates, and location scenes are original generated illustrations created for the Kathala Library edition. The six linked maps remain preserved as editorial spatial aids—not canonical plans—for England, Gateshead Hall, Lowood Institution, Thornfield Hall, Thornfield Grounds, and the Midland Moors.';

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized, 'utf8');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const entry = index.entries.find((candidate) => candidate.id === slug);
if (!entry) throw new Error('Library index entry not found');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
entry.dataBytes = Buffer.byteLength(serialized);
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ characters: world.characters.length, items: world.items.length, locations: world.locationMarkers.length, maps: mapIds.size, generated: generated.length, blobs: world.blobs.length }, null, 2));
