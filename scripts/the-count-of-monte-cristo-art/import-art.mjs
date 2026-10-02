import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'scripts/the-count-of-monte-cristo-art/manifest.json'), 'utf8'));
const worldFile = path.join(root, 'library/the-count-of-monte-cristo.pwk');
const world = JSON.parse(fs.readFileSync(worldFile, 'utf8'));
const indexFile = path.join(root, 'library/index.json');
const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
const entry = index.entries.find(x => x.id === 'the-count-of-monte-cristo');
if (!entry || manifest.slots.length !== 126 || manifest.slots.some(x => x.status !== 'generated_png')) throw Error('Art inventory incomplete');

const oldBlobs = new Map(world.blobs.map(blob => [blob.id, blob]));
const mapIds = new Set(world.mapLayers.map(map => map.imageId));
if (mapIds.size !== 6 || manifest.retainedMaps.length !== 6 || manifest.retainedMaps.some(map => !mapIds.has(map.blobId))) throw Error('Map inventory changed');
const oldArt = world.blobs.filter(blob => !mapIds.has(blob.id));
if (oldArt.length !== 138 || oldArt.some(blob => !/^https?:/.test(blob.url))) throw Error('Expected 138 original external illustration blobs');

const collections = {characters: 'characters', items: 'items', locations: 'locationMarkers', lore: 'lorePages', factions: 'factions'};
const now = Date.UTC(2026, 9, 2);
const generated = [];
for (const slot of manifest.slots) {
  const entity = slot.kind === 'cover' ? world.world : world[collections[slot.kind]]?.find(x => x.id === slot.objectId);
  if (!entity || entity[slot.field] !== slot.oldBlobId) throw Error(`Original reference changed: ${slot.number} ${slot.name}`);
  if (!oldBlobs.has(slot.oldBlobId)) throw Error(`Original blob missing: ${slot.oldBlobId}`);
  const file = path.join(root, ...slot.path.split('/'));
  if (!fs.existsSync(file)) throw Error(`Missing generated JPEG: ${slot.path}`);
  const bytes = fs.readFileSync(file);
  if (bytes.subarray(0, 2).toString('hex') !== 'ffd8' || bytes.subarray(-2).toString('hex') !== 'ffd9') throw Error(`Invalid JPEG: ${slot.path}`);
  entity[slot.field] = slot.newBlobId;
  generated.push({id: slot.newBlobId, worldId: world.world.id, mimeType: 'image/jpeg', url: slot.path, createdAt: now});
}

const archive = {
  book: 'the-count-of-monte-cristo',
  note: 'Original linked public-domain illustration source URLs retained for edition provenance. Six functional historical map layers remain active in the PWK.',
  blobs: oldArt,
};
fs.writeFileSync(path.join(root, 'scripts/the-count-of-monte-cristo-art/superseded-illustration-sources.json'), `${JSON.stringify(archive, null, 2)}\n`);
world.blobs = [...world.blobs.filter(blob => mapIds.has(blob.id)), ...generated];
world.world.updatedAt = now;
const sourcePage = world.lorePages.find(page => page.id === 'count-of-monte-cristo-lore-page-1');
if (!sourcePage) throw Error('Visual-source lore page missing');
sourcePage.body = sourcePage.body.replace(
  'Maps and illustrations are documented separately in this page.',
  'The original linked public-domain illustration sources are archived with this edition. The current cover, character, item, location, lore, and faction images are original generated illustrations; six historical map layers retain their source links.',
);
sourcePage.updatedAt = now;
fs.writeFileSync(worldFile, `${JSON.stringify(world, null, 2)}\n`);
entry.cover = manifest.slots[0].path;
entry.notice = entry.notice.replace(
  'Linked maps and public-domain illustrations are recorded in Lore.',
  'Original generated illustrations, six retained historical maps, and archived public-domain illustration sources are recorded in Lore.',
);
fs.writeFileSync(indexFile, `${JSON.stringify(index, null, 2)}\n`);
console.log(`Integrated ${generated.length} unique illustrations; retained ${mapIds.size} maps; archived ${oldArt.length} old sources.`);
