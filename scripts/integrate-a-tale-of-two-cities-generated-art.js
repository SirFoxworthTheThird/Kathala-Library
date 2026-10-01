import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'a-tale-of-two-cities';
const prefix = 'tale-of-two-cities-';
const pwkPath = path.join(root, 'library', `${slug}.pwk`);
const indexPath = path.join(root, 'library', 'index.json');
const world = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const now = world.world.updatedAt;
const generated = [];
const add = (kind, key, subdir = '') => {
  const id = `${prefix}image-generated-${kind}${key ? `-${key}` : ''}`;
  const url = `library/${slug}/art/generated/${subdir}${key || 'cover'}.jpg`;
  if (!fs.existsSync(path.join(root, ...url.split('/')))) throw Error(`Missing asset: ${url}`);
  generated.push({ id, worldId: world.world.id, mimeType: 'image/jpeg', url, createdAt: now, updatedAt: now });
  return id;
};

const cover = add('cover', '', '');
world.world.coverImageId = cover;
for (const entity of world.characters) {
  const key = entity.id.replace(`${prefix}char-`, '');
  entity.portraitImageId = add('character', key, 'characters/');
}
for (const entity of world.items) {
  const key = entity.id.replace(`${prefix}item-`, '');
  entity.imageId = add('item', key, 'items/');
}
for (const entity of world.locationMarkers) {
  const key = entity.id.replace(`${prefix}loc-`, '');
  entity.imageId = add('location', key, 'locations/');
}

const mapIds = new Set(world.mapLayers.map(map => map.imageId));
const superseded = world.blobs.filter(blob => /^https?:/.test(blob.url) && !mapIds.has(blob.id));
if (superseded.length !== 73) throw Error(`Expected 73 superseded illustrations; found ${superseded.length}`);
const archivePath = path.join(root, 'scripts', slug, 'superseded-external-sources.json');
fs.writeFileSync(archivePath, `${JSON.stringify({ note: 'External non-map illustration source records superseded by original generated artwork. The three historical map sources are retained in the PWK.', blobs: superseded }, null, 2)}\n`);
world.blobs = world.blobs.filter(blob => mapIds.has(blob.id));
world.blobs.push(...generated);

const loreCovers = [cover,
  `${prefix}image-generated-location-paris-gate`,
  `${prefix}image-generated-location-bastille`,
  `${prefix}image-generated-location-conciergerie`,
  `${prefix}image-generated-location-old-bailey`,
  `${prefix}image-generated-location-st-pancras`,
  `${prefix}image-generated-item-knitted-register`,
  `${prefix}image-generated-location-shooters-hill`,
  `${prefix}image-generated-item-guillotine`,
  `${prefix}image-generated-character-carton`,
  `${prefix}image-generated-character-lucie`];
world.lorePages.forEach((page, i) => { page.coverImageId = loreCovers[i]; });
const sourcePage = world.lorePages[0];
const oldVisualStart = sourcePage.body.indexOf('Visuals link to mature period engravings');
if (oldVisualStart >= 0) {
  const oldVisualEnd = sourcePage.body.indexOf(' The route, London, and Paris layers', oldVisualStart);
  if (oldVisualEnd < 0) throw Error('Source disclosure changed unexpectedly');
  sourcePage.body = `${sourcePage.body.slice(0, oldVisualStart)}The original visual edition linked mature period engravings by Fred Barnard and Hablot K. Browne (Phiz) on Wikimedia Commons and Project Gutenberg; those source records are archived with the integration documentation.${sourcePage.body.slice(oldVisualEnd)}`;
}
const note = ' The cover, all character portraits, item plates, and location scenes in this edition are original generated illustrations in a historically grounded late-eighteenth-century style. The linked route, London, and Paris historical maps remain in use. Superseded external non-map illustration source records are archived with the integration documentation.';
if (!sourcePage.body.includes('original generated illustrations')) sourcePage.body += note;

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized);
const entry = index.entries.find(item => item.id === slug);
if (!entry) throw Error('Catalogue entry missing');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
if (!entry.notice.includes('original generated illustrations')) entry.notice += ' The edition uses original generated illustrations, documented in Lore; linked historical maps are retained.';
entry.dataBytes = Buffer.byteLength(serialized);
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(JSON.stringify({ generated: generated.length, archived: superseded.length, maps: mapIds.size, bytes: entry.dataBytes }, null, 2));
