import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const relative = (name) => path.join(root, name);
const manifest = JSON.parse(fs.readFileSync(relative('scripts/the-wonderful-wizard-of-oz-art/manifest.json'), 'utf8'));
const bookPath = relative('library/the-wonderful-wizard-of-oz.pwk');
const book = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
const stamp = Date.UTC(2026, 9, 2);
const oldIds = new Set(manifest.slots.map((slot) => slot.oldBlobId).filter(Boolean));
const oldMapBlobs = manifest.maps.filter((map) => map.newUrl).map((map) => book.blobs.find((blob) => blob.id === map.blobId));
const archivePath = relative('scripts/the-wonderful-wizard-of-oz-art/original-sources.json');
if (!fs.existsSync(archivePath)) {
  fs.writeFileSync(archivePath, JSON.stringify({ illustrations: book.blobs.filter((blob) => oldIds.has(blob.id)), maps: oldMapBlobs }, null, 2) + '\n');
}
const collections = { characters: book.characters, items: book.items, locations: book.locationMarkers, factions: book.factions, lore: book.lorePages };
for (const slot of manifest.slots) {
  if (slot.status !== 'generated_png' || !fs.existsSync(relative(slot.path))) throw new Error(`Missing final art: ${slot.path}`);
  const object = slot.kind === 'cover' ? book.world : collections[slot.kind]?.find((entry) => entry.id === slot.objectId);
  if (!object) throw new Error(`Missing object: ${slot.objectId}`);
  object[slot.field] = slot.newBlobId;
}
book.blobs = book.blobs.filter((blob) => !oldIds.has(blob.id) && !manifest.slots.some((slot) => slot.newBlobId === blob.id));
for (const slot of manifest.slots) book.blobs.push({ worldId: book.world.id, createdAt: stamp, updatedAt: stamp, id: slot.newBlobId, mimeType: 'image/jpeg', url: slot.path });
for (const map of manifest.maps) {
  if (!map.newUrl) continue;
  if (!fs.existsSync(relative(map.newUrl))) throw new Error(`Missing map: ${map.newUrl}`);
  const blob = book.blobs.find((entry) => entry.id === map.blobId);
  if (!blob) throw new Error(`Missing map blob: ${map.blobId}`);
  blob.url = map.newUrl;
  blob.mimeType = 'image/jpeg';
  blob.updatedAt = stamp;
  const layer = book.mapLayers.find((entry) => entry.id === map.mapId);
  layer.imageWidth = map.width;
  layer.imageHeight = map.height;
}
book.lorePages.find((page) => page.id === 'oz-lore-pictures').body = 'The 107 pictures in this world were generated for this edition from the 1900 book text, then reviewed as a complete set. Each cover, portrait, item, place, faction and lore entry has its own image. Dorothy wears a blue-and-white checked dress and silver shoes; the Wicked Witch of the West has one powerful eye and no stated green skin; Glinda has red hair, a white dress and a ruby throne. The earlier public-domain Denslow illustrations remain documented in the source archive, but are no longer used by this edition.';
book.lorePages.find((page) => page.id === 'oz-lore-maps').body = 'Baum published no measured map with the 1900 book, so these nine painted layers are editorial interpretations. They follow the first story’s broad geography: blue Munchkin East, yellow Winkie West, red Quadling South, one Emerald City gate, Kansas, and the places Dorothy visits on her eastern and southern journeys. The interactive markers sit on visible landmarks. Exact distances and interior layouts are not canonical.';
fs.writeFileSync(bookPath, JSON.stringify(book) + '\n');
console.log(`Imported ${manifest.slots.length} distinct illustrations and ${manifest.maps.filter((map) => map.newUrl).length} maps.`);
