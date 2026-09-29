import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'pride-and-prejudice';
const prefix = 'pp-';
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
const sussexMap = world.blobs.find((blob) => blob.id === `${prefix}image-map-sussex`);
if (sussexMap) sussexMap.url = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/East%20Sussex%20UK%20location%20map.svg?width=1280';
const supersededExternal = world.blobs.filter((blob) => /^https?:/.test(blob.url) && !mapIds.has(blob.id));
const sourceArchivePath = path.join(root, 'scripts', 'pride-and-prejudice', 'superseded-external-sources.json');
fs.writeFileSync(sourceArchivePath, `${JSON.stringify({
  note: 'External non-map illustration blobs superseded by original generated artwork. Retained here as editorial source history.',
  blobs: supersededExternal,
}, null, 2)}\n`, 'utf8');
world.blobs = world.blobs.filter((blob) => mapIds.has(blob.id));
world.blobs.push(...generated);

const loreCovers = {
  [`${prefix}lore-1`]: `${prefix}image-generated-location-longbourn`,
  [`${prefix}lore-2`]: `${prefix}image-generated-item-settlement`,
  [`${prefix}lore-3`]: `${prefix}image-generated-item-dance-card`,
  [`${prefix}lore-4`]: `${prefix}image-generated-item-wedding-ring`,
  [`${prefix}lore-5`]: `${prefix}image-generated-location-brighton-camp`,
  [`${prefix}lore-6`]: `${prefix}image-generated-character-gardiner`,
  [`${prefix}lore-7`]: `${prefix}image-generated-character-wickham`,
  [`${prefix}lore-8`]: `${prefix}image-generated-item-darcy-letter`,
  [`${prefix}lore-9`]: `${prefix}image-generated-location-pemberley`,
  [`${prefix}lore-10`]: coverId,
  [`${prefix}lore-11`]: `${prefix}image-map-england`,
  [`${prefix}lore-12`]: coverId,
};
for (const page of world.lorePages) page.coverImageId = loreCovers[page.id] ?? page.coverImageId;

const sources = world.lorePages.find((page) => page.id === `${prefix}lore-12`);
if (sources) {
  const addition = ' The cover, character portraits, item plates, and location scenes are original generated illustrations created for the Kathala Library edition in a coherent Regency style. The six linked historical and editorial maps remain available as spatial aids. Superseded external non-map illustration blobs have been removed from the world package; their complete prior blob records are retained with the edition’s integration documentation.';
  if (!sources.body.includes('original generated illustrations')) sources.body += addition;
}

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized, 'utf8');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const entry = index.entries.find((candidate) => candidate.id === slug);
if (!entry) throw new Error('Library index entry not found');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
entry.notice = 'Unofficial reading-mode reference for a public-domain novel. The manuscript contains the complete narrative text of Project Gutenberg eBook #1342 across all 61 chapters; Gutenberg packaging and illustrated-edition front matter are excluded. Six linked historical and editorial maps are retained, and original generated artwork is documented in Lore.';
entry.dataBytes = Buffer.byteLength(serialized);
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ characters: world.characters.length, items: world.items.length, locations: world.locationMarkers.length, maps: mapIds.size, generated: generated.length, blobs: world.blobs.length }, null, 2));
