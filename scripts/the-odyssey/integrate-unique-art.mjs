import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const bookPath = path.join(root, 'library/the-odyssey.pwk');
const plan = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'unique-art-plan.json'), 'utf8'));
const book = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
const collections = {
  cover: [book.world],
  character: book.characters,
  item: book.items,
  location: book.locationMarkers,
  lore: book.lorePages,
  faction: book.factions,
};
const existing = new Map(book.blobs.map((blob) => [blob.id, blob]));
if (plan.slots.length !== 109 || plan.slots.some((slot) => slot.status === 'pending')) {
  throw new Error('The 109-slot illustration plan is incomplete.');
}
for (const slot of plan.slots) {
  const object = collections[slot.type].find((candidate) => candidate.id === slot.objectId);
  if (!object) throw new Error(`Missing object ${slot.objectId}`);
  if (!fs.existsSync(path.join(root, slot.path))) throw new Error(`Missing art ${slot.path}`);
  object[slot.field] = slot.targetBlobId;
  if (slot.status === 'generated') {
    if (existing.has(slot.targetBlobId)) {
      if (existing.get(slot.targetBlobId).url !== slot.path) throw new Error(`Conflicting blob id ${slot.targetBlobId}`);
      continue;
    }
    const blob = {
      id: slot.targetBlobId,
      worldId: book.world.id,
      mimeType: 'image/jpeg',
      url: slot.path,
      createdAt: book.exportedAt,
      updatedAt: book.exportedAt,
    };
    book.blobs.push(blob);
    existing.set(blob.id, blob);
  }
}
fs.writeFileSync(bookPath, JSON.stringify(book, null, 2) + '\n');
console.log(`Integrated ${plan.slots.length} distinct illustrations into ${bookPath}`);
