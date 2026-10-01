import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'the-time-machine';
const prefix = 'time-machine-';
const pwkPath = path.join(root, 'library', `${slug}.pwk`);
const indexPath = path.join(root, 'library', 'index.json');
const world = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const now = world.world.updatedAt;
const generated = [];

const add = (kind, key, folder = '') => {
  const id = `${prefix}image-generated-${kind}${key ? `-${key}` : ''}`;
  const url = `library/${slug}/art/generated/${folder}${key || 'cover'}.jpg`;
  if (!fs.existsSync(path.join(root, ...url.split('/')))) throw Error(`Missing generated asset ${url}`);
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
if (superseded.length !== 26) throw Error(`Expected 26 external illustration sources; found ${superseded.length}`);
fs.writeFileSync(path.join(root, 'scripts', slug, 'superseded-external-sources.json'), `${JSON.stringify({ note: 'External non-map illustration sources superseded by original generated artwork. The two map images remain linked in the PWK.', blobs: superseded }, null, 2)}\n`);
world.blobs = world.blobs.filter(blob => mapIds.has(blob.id));
world.blobs.push(...generated);

const loreCovers = [
  `${prefix}image-generated-item-model`,
  `${prefix}image-generated-item-lever`,
  `${prefix}image-generated-location-future-portal`,
  `${prefix}image-generated-location-far-shore`,
  `${prefix}image-generated-character-eloi`,
  `${prefix}image-generated-location-green-palace`,
  `${prefix}image-generated-location-house-portal`,
  cover,
  `${prefix}image-map-richmond`,
];
world.lorePages.forEach((page, i) => { page.coverImageId = loreCovers[i]; });
const factionCovers = new Map([
  [`${prefix}faction-dinner-circle`, `${prefix}image-generated-location-house-portal`],
  [`${prefix}faction-eloi`, `${prefix}image-generated-character-eloi`],
  [`${prefix}faction-morlocks`, `${prefix}image-generated-character-morlocks`],
]);
for (const faction of world.factions) {
  const imageId = factionCovers.get(faction.id);
  if (!imageId) throw Error(`Unmapped faction cover: ${faction.id}`);
  faction.coverImageId = imageId;
}
const illustrationSources = world.lorePages.find(page => page.title === 'Illustration Sources');
if (!illustrationSources) throw Error('Illustration Sources lore page missing');
illustrationSources.body = illustrationSources.body
  .replace('The cover and future-world scenes use public-domain illustrations by Norman Saunders and Virgil Finlay.', 'The original visual edition used public-domain cover and future-world illustrations by Norman Saunders and Virgil Finlay; those source records are archived with the integration documentation.')
  .replace('their distinct portraits are clearly editorial public-domain period artworks rather than canonical likenesses.', 'their distinct portraits remain editorial interpretations rather than canonical likenesses.')
  .replace('Every story item likewise uses its own period object, botanical, or mechanical illustration. Images are linked from Wikimedia Commons.', 'Every story item has its own period object, botanical, or mechanical illustration. The current cover, character portraits, item plates, and location scenes are original generated illustrations made for this edition. The superseded external illustration sources are archived; the historical map links remain in use.');

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized);
const entry = index.entries.find(item => item.id === slug);
if (!entry) throw Error('Catalogue entry missing');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
entry.dataBytes = Buffer.byteLength(serialized);
if (!entry.notice.includes('original generated illustrations')) entry.notice += ' Original generated illustrations and retained historical maps are documented in Lore.';
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(JSON.stringify({ generated: generated.length, archived: superseded.length, mapLayers: world.mapLayers.length, distinctMaps: mapIds.size, dataBytes: entry.dataBytes }, null, 2));
