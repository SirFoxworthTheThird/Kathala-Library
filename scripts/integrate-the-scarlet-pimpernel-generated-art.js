import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'the-scarlet-pimpernel';
const prefix = 'scarlet-pimpernel-';
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

const mapIds = new Set(world.mapLayers.map((map) => map.imageId));
const supersededExternal = world.blobs.filter((blob) => /^https?:/.test(blob.url) && !mapIds.has(blob.id));
const sourceArchivePath = path.join(root, 'scripts', slug, 'superseded-external-sources.json');
fs.writeFileSync(sourceArchivePath, `${JSON.stringify({
  note: 'External non-map illustration blobs superseded by original generated artwork. Retained here as editorial source history.',
  blobs: supersededExternal,
}, null, 2)}\n`, 'utf8');
world.blobs = world.blobs.filter((blob) => mapIds.has(blob.id));
world.blobs.push(...generated);

const loreCovers = {
  [`${prefix}lore-terror`]: `${prefix}image-generated-location-place-greve`,
  [`${prefix}lore-league-oath`]: `${prefix}image-generated-item-league-papers`,
  [`${prefix}lore-disguises`]: `${prefix}image-generated-character-percy`,
  [`${prefix}lore-chronology`]: `${prefix}image-channel-map`,
  [`${prefix}lore-sources`]: coverId,
};
for (const page of world.lorePages) page.coverImageId = loreCovers[page.id] ?? page.coverImageId;

const sources = world.lorePages.find((page) => page.id === `${prefix}lore-sources`);
if (sources) {
  const addition = ' The cover, character portraits, item plates, and location scenes are original generated illustrations created for the Kathala Library edition in a coherent late-eighteenth-century style. The four linked historical and editorial maps remain available as spatial aids. Superseded external non-map illustration records are retained with the edition’s integration documentation.';
  if (!sources.body.includes('original generated illustrations')) sources.body += addition;
}

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized, 'utf8');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const entry = index.entries.find((candidate) => candidate.id === slug);
if (!entry) throw new Error('Library index entry not found');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
if (!entry.notice.includes('original generated artwork')) entry.notice += ' Four linked historical and editorial maps are retained, and original generated artwork is documented in Lore.';
entry.dataBytes = Buffer.byteLength(serialized);
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ archived: supersededExternal.length, characters: world.characters.length, items: world.items.length, locations: world.locationMarkers.length, maps: mapIds.size, generated: generated.length }, null, 2));
