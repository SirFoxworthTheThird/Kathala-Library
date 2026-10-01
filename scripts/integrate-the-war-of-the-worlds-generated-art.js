import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'the-war-of-the-worlds';
const prefix = 'war-of-the-worlds-';
const pwkPath = path.join(root, 'library', `${slug}.pwk`);
const indexPath = path.join(root, 'library', 'index.json');
const world = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const now = world.world.updatedAt;
const generated = [];

function add(kind, key, folder = '') {
  const id = `${prefix}image-generated-${kind}${key ? `-${key}` : ''}`;
  const url = `library/${slug}/art/generated/${folder}${key || 'cover'}.jpg`;
  if (!fs.existsSync(path.join(root, ...url.split('/')))) throw Error(`Missing asset: ${url}`);
  generated.push({ id, worldId: world.world.id, mimeType: 'image/jpeg', url, createdAt: now, updatedAt: now });
  return id;
}

const cover = add('cover', '', '');
world.world.coverImageId = cover;
for (const character of world.characters) character.portraitImageId = add('character', character.id.replace(`${prefix}char-`, ''), 'characters/');
for (const item of world.items) item.imageId = add('item', item.id.replace(`${prefix}item-`, ''), 'items/');
for (const location of world.locationMarkers) location.imageId = add('location', location.id.replace(`${prefix}loc-`, ''), 'locations/');

const mapIds = new Set(world.mapLayers.map(map => map.imageId));
const superseded = world.blobs.filter(blob => /^https?:/.test(blob.url) && !mapIds.has(blob.id));
if (superseded.length !== 27) throw Error(`Expected 27 superseded illustration sources; found ${superseded.length}`);
fs.writeFileSync(path.join(root, 'scripts', slug, 'superseded-external-sources.json'), `${JSON.stringify({ note: 'External non-map illustration source records superseded by original generated artwork. Three functional period maps remain linked in the PWK.', blobs: superseded }, null, 2)}\n`);
world.blobs = world.blobs.filter(blob => mapIds.has(blob.id));
world.blobs.push(...generated);

const image = (kind, key) => `${prefix}image-generated-${kind}-${key}`;
const loreCovers = [
  image('location','horsell'),
  image('character','martians'),
  image('item','heat-ray'),
  `${prefix}image-mapEnvirons`,
  cover,
  cover,
];
if (world.lorePages.length !== loreCovers.length) throw Error('Lore inventory changed');
world.lorePages.forEach((page, i) => { page.coverImageId = loreCovers[i]; });
const factionCovers = new Map([
  [`${prefix}faction-martians`, image('character','martians')],
  [`${prefix}faction-british`, image('character','thunder-child')],
  [`${prefix}faction-refugees`, image('character','crowd')],
]);
for (const faction of world.factions) {
  const id = factionCovers.get(faction.id);
  if (!id) throw Error(`Unmapped faction: ${faction.id}`);
  faction.coverImageId = id;
}
const sourcePage = world.lorePages.find(page => page.title === 'Illustration Sources');
if (!sourcePage) throw Error('Illustration sources lore page missing');
const note = ' This edition adds original generated illustrations for the cover, every character, every item, and every location, in a coherent late Victorian visual style. Three linked period maps remain available for geographic reference. Twenty-seven superseded external non-map illustration source records are archived with the integration documentation.';
if (!sourcePage.body.includes('original generated illustrations')) sourcePage.body += note;

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized);
const entry = index.entries.find(item => item.id === slug);
if (!entry) throw Error('Catalogue entry missing');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
entry.dataBytes = Buffer.byteLength(serialized);
if (!entry.notice.includes('original generated illustrations')) entry.notice += ' The original generated illustrations and three retained period maps are documented in Lore.';
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(JSON.stringify({ generated: generated.length, archived: superseded.length, maps: mapIds.size, dataBytes: entry.dataBytes }, null, 2));
