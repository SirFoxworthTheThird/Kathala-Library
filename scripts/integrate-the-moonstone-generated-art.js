import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'the-moonstone';
const prefix = 'moonstone-';
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
  [`${prefix}lore-page-1`]: coverId,
  [`${prefix}lore-page-2`]: `${prefix}image-map-estate`,
  [`${prefix}lore-page-3`]: `${prefix}image-generated-location-treasury-court`,
  [`${prefix}lore-page-4`]: `${prefix}image-generated-location-sacred-grove`,
  [`${prefix}lore-page-5`]: `${prefix}image-generated-character-betteredge`,
  [`${prefix}lore-page-6`]: `${prefix}image-generated-item-bank-receipt`,
  [`${prefix}lore-page-7`]: `${prefix}image-generated-item-laudanum`,
  [`${prefix}lore-page-8`]: `${prefix}image-generated-item-painted-door`,
  [`${prefix}lore-page-9`]: `${prefix}image-generated-location-shivering-sand`,
  [`${prefix}lore-page-10`]: `${prefix}image-generated-character-guardian-one`,
};
for (const page of world.lorePages) page.coverImageId = loreCovers[page.id] ?? page.coverImageId;

const sources = world.lorePages.find((page) => page.id === `${prefix}lore-page-1`);
if (sources) {
  sources.body = 'The structure follows the public-domain Project Gutenberg text, preserving its prologue, eight documentary narratives, and epilogue. The 1868 Harper’s Weekly engravings catalogued by the Victorian Web supplied the earlier linked illustration set and remain an editorial reference for period atmosphere. The cover, character portraits, item plates, and location scenes are now original generated illustrations created for the Kathala Library edition. Historical maps remain linked from Wikimedia Commons; the Yorkshire layer uses T. Langdale’s 1822 map supplied by the North Yorkshire County Record Office archive shop. The six maps are retained as historical and editorial spatial aids; the representative Verinder House plan is not a canonical floor plan.';
}

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized, 'utf8');

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const entry = index.entries.find((candidate) => candidate.id === slug);
if (!entry) throw new Error('Library index entry not found');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
entry.notice = 'Unofficial reading-mode reference for a public-domain novel. The manuscript contains the complete narrative text of Project Gutenberg eBook #155 across all 57 modeled sections; Gutenberg packaging and front matter are excluded. The retained linked maps, superseded public-domain illustration reference set, and original generated artwork are recorded in Lore.';
entry.dataBytes = Buffer.byteLength(serialized);
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({
  characters: world.characters.length,
  items: world.items.length,
  locations: world.locationMarkers.length,
  maps: mapIds.size,
  generated: generated.length,
  blobs: world.blobs.length,
}, null, 2));
