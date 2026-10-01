import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'treasure-island';
const prefix = 'treasure-island-';
const pwkPath = path.join(root, 'library', `${slug}.pwk`);
const indexPath = path.join(root, 'library', 'index.json');
const world = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const now = world.world.updatedAt;
const generated = [];

const add = (kind, key, folder = '') => {
  const id = `${prefix}image-generated-${kind}${key ? `-${key}` : ''}`;
  const url = `library/${slug}/art/generated/${folder}${key || 'cover'}.jpg`;
  if (!fs.existsSync(path.join(root, ...url.split('/')))) throw Error(`Missing asset: ${url}`);
  generated.push({ id, worldId: world.world.id, mimeType: 'image/jpeg', url, createdAt: now, updatedAt: now });
  return id;
};

const cover = add('cover', '', '');
world.world.coverImageId = cover;
for (const character of world.characters) {
  const key = character.id.replace(`${prefix}char-`, '');
  character.portraitImageId = add('character', key, 'characters/');
}
for (const item of world.items) {
  const key = item.id.replace(`${prefix}item-`, '');
  item.imageId = add('item', key, 'items/');
}
for (const location of world.locationMarkers) {
  const key = location.id.replace(`${prefix}loc-`, '');
  location.imageId = add('location', key, 'locations/');
}

const mapIds = new Set(world.mapLayers.map(map => map.imageId));
const superseded = world.blobs.filter(blob => /^https?:/.test(blob.url) && !mapIds.has(blob.id));
if (superseded.length !== 20) throw Error(`Expected 20 superseded illustration sources; found ${superseded.length}`);
fs.writeFileSync(path.join(root, 'scripts', slug, 'superseded-external-sources.json'), `${JSON.stringify({ note: 'External non-map illustration source records superseded by original generated artwork. The four functional editorial maps remain linked in the PWK.', blobs: superseded }, null, 2)}\n`);
world.blobs = world.blobs.filter(blob => mapIds.has(blob.id));
world.blobs.push(...generated);

const loreCovers = [
  cover,
  `${prefix}image-map-atlantic`,
  `${prefix}image-generated-item-black-spot`,
  `${prefix}image-generated-character-silver`,
  `${prefix}image-generated-location-ship-deck`,
  `${prefix}image-generated-item-coracle`,
  `${prefix}image-map-island`,
  `${prefix}image-generated-location-bristol-entrance`,
  `${prefix}image-generated-item-treasure`,
  `${prefix}image-generated-character-gunn`,
  `${prefix}image-generated-character-parrot`,
];
if (world.lorePages.length !== loreCovers.length) throw Error('Lore inventory changed');
world.lorePages.forEach((page, i) => { page.coverImageId = loreCovers[i]; });
const factionCovers = new Map([
  [`${prefix}faction-loyal-party`, `${prefix}image-generated-character-smollett`],
  [`${prefix}faction-mutineers`, `${prefix}image-generated-character-silver`],
  [`${prefix}faction-flint-crew`, `${prefix}image-generated-character-flint`],
  [`${prefix}faction-hawkins-household`, `${prefix}image-generated-location-admiral-benbow`],
]);
for (const faction of world.factions) {
  const imageId = factionCovers.get(faction.id);
  if (!imageId) throw Error(`Unmapped faction cover: ${faction.id}`);
  faction.coverImageId = imageId;
}
const sourcePage = world.lorePages[0];
const note = ' The cover, all character portraits, item plates, and location scenes in this edition are original generated illustrations with a coherent mid-eighteenth-century maritime visual direction. The four linked editorial maps remain available for geography and ship layout. Twenty superseded external non-map illustration source records are archived with the integration documentation.';
if (!sourcePage.body.includes('original generated illustrations')) sourcePage.body += note;

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized);
const entry = index.entries.find(item => item.id === slug);
if (!entry) throw Error('Catalogue entry missing');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
entry.dataBytes = Buffer.byteLength(serialized);
if (!entry.notice.includes('original generated illustrations')) entry.notice += ' The original generated illustrations and four retained editorial maps are documented in Lore.';
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(JSON.stringify({ generated: generated.length, archived: superseded.length, maps: mapIds.size, dataBytes: entry.dataBytes }, null, 2));
