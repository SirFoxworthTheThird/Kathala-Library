import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'the-picture-of-dorian-gray';
const prefix = 'dorian-gray-';
const pwkPath = path.join(root, 'library', `${slug}.pwk`);
const indexPath = path.join(root, 'library', 'index.json');
const world = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));
const now = world.world.updatedAt;
const generated = [];

const addBlob = (id, relativePath) => {
  const absolutePath = path.join(root, ...relativePath.split('/'));
  if (!fs.existsSync(absolutePath)) throw new Error(`Missing asset: ${relativePath}`);
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
  [`${prefix}lore-1`]: `${prefix}image-generated-item-portrait`,
  [`${prefix}lore-2`]: `${prefix}image-generated-character-basil`,
  [`${prefix}lore-3`]: `${prefix}image-generated-character-sibyl`,
  [`${prefix}lore-4`]: `${prefix}image-generated-character-dorian`,
  [`${prefix}lore-5`]: `${prefix}image-generated-character-james`,
  [`${prefix}lore-6`]: `${prefix}image-generated-location-attic-room`,
  [`${prefix}lore-7`]: `${prefix}image-generated-location-club`,
  [`${prefix}lore-8`]: `${prefix}image-generated-location-vane-lodgings`,
  [`${prefix}lore-9`]: `${prefix}image-generated-item-yellow-book`,
  [`${prefix}lore-10`]: `${prefix}image-generated-item-mirror`,
  [`${prefix}lore-11`]: `${prefix}image-map-britain`,
  [`${prefix}lore-12`]: coverId,
};
for (const page of world.lorePages) page.coverImageId = loreCovers[page.id] ?? page.coverImageId;

const sources = world.lorePages.find((page) => page.id === `${prefix}lore-12`);
if (sources) {
  sources.body = 'The manuscript contains the complete preface and narrative text of Project Gutenberg eBook #174, divided across the novel’s 20 chapters and modeled events. Gutenberg packaging and the closing title are excluded. The cover, character portraits, item plates, and location scenes are original generated illustrations created for the Kathala Library edition in a coherent late-Victorian style. The six linked historical and editorial maps are retained as spatial aids. Superseded external illustration blobs have been removed, while their source context remains documented here.';
}

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized, 'utf8');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const entry = index.entries.find((candidate) => candidate.id === slug);
if (!entry) throw new Error('Library index entry not found');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
entry.notice = 'Unofficial reading-mode reference for a public-domain novel. The manuscript contains the complete preface and narrative text of Project Gutenberg eBook #174 across all 20 chapters; Gutenberg packaging is excluded. Six linked historical and editorial maps are retained, and original generated artwork is documented in Lore.';
entry.dataBytes = Buffer.byteLength(serialized);
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ characters: world.characters.length, items: world.items.length, locations: world.locationMarkers.length, maps: mapIds.size, generated: generated.length, blobs: world.blobs.length }, null, 2));
