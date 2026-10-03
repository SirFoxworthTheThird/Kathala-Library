import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const titles = ['the-fellowship-of-the-ring', 'the-two-towers'];
const books = Object.fromEntries(titles.map((title) => [title, JSON.parse(fs.readFileSync(path.join(root, 'library', `${title}.pwk`), 'utf8'))]));
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const slug = (value) => normalize(value).replace(/ /g, '-');
const assets = new Map();

for (const title of titles) {
  const book = books[title];
  const blobs = new Map(book.blobs.map((blob) => [blob.id, blob]));
  const usedNames = new Map();
  const groups = [
    ['cover', [book.world], 'coverImageId'],
    ['character', book.characters, 'portraitImageId'],
    ['item', book.items, 'imageId'],
    ['location', book.locationMarkers, 'imageId'],
  ];
  for (const [kind, entries, field] of groups) {
    for (const entry of entries) {
      if (!entry[field]) continue;
      const name = entry.name ?? book.world.name;
      const base = `${kind}:${normalize(name)}`;
      const occurrence = (usedNames.get(base) ?? 0) + 1;
      usedNames.set(base, occurrence);
      const key = `${base}:${occurrence}`;
      const oldBlobId = entry[field];
      const oldBlob = blobs.get(oldBlobId);
      const slot = { book: title, kind, objectId: entry.id, name, field, oldBlobId, oldUrl: oldBlob?.url ?? null, description: entry.description ?? '' };
      if (!assets.has(key)) assets.set(key, { key, kind, name, description: slot.description, slots: [] });
      assets.get(key).slots.push(slot);
    }
  }
}

const rows = [...assets.values()].map((asset, index) => ({
  number: index + 1,
  ...asset,
  path: `library/lotr-shared-art/generated/${asset.kind}s/${String(index + 1).padStart(3, '0')}-${slug(asset.name)}.jpg`,
  masterPath: `library/lotr-shared-art/generated/${asset.kind}s/${String(index + 1).padStart(3, '0')}-${slug(asset.name)}.png`,
  status: 'pending',
}));
const manifest = { policy: 'One unique image for every illustrated slot within each book; share corresponding images across the two books. Original artwork without copying third-party illustrations.', assets: rows, maps: titles.map((title) => ({ book: title, layers: books[title].mapLayers.map((layer) => ({ id: layer.id, name: layer.name, imageId: layer.imageId, imageWidth: layer.imageWidth, imageHeight: layer.imageHeight })) })) };
const target = path.join(import.meta.dirname, 'manifest.json');
fs.writeFileSync(target, JSON.stringify(manifest, null, 2) + '\n');
console.log(`${rows.length} distinct illustration assets for ${rows.reduce((count, row) => count + row.slots.length, 0)} slots across both books.`);
console.log(`Shared by both books: ${rows.filter((row) => row.slots.length === 2).length}.`);
