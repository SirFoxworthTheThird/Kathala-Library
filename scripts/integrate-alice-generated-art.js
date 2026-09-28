import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pwkPath = path.join(root, 'library', 'alice-in-wonderland.pwk');
const indexPath = path.join(root, 'library', 'index.json');
const world = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));

const characterFiles = {
  alice: 'alice.png',
  'white-rabbit': 'white-rabbit.png',
  mouse: 'mouse.png',
  dodo: 'dodo.png',
  bill: 'bill-the-lizard.png',
  puppy: 'puppy.png',
  caterpillar: 'caterpillar.png',
  pigeon: 'pigeon.png',
  'fish-footman': 'fish-footman.png',
  'frog-footman': 'frog-footman.png',
  duchess: 'duchess.png',
  cook: 'cook.png',
  baby: 'baby.png',
  'cheshire-cat': 'cheshire-cat.png',
  hatter: 'hatter.png',
  'march-hare': 'march-hare.png',
  dormouse: 'dormouse.png',
  queen: 'queen-of-hearts.png',
  king: 'king-of-hearts.png',
  gryphon: 'gryphon.png',
  'mock-turtle': 'mock-turtle.png',
  knave: 'knave-of-hearts.png',
  'card-gardeners': 'card-gardeners.png',
  jurors: 'jurors.png',
};

const itemFiles = {
  watch: 'pocket-watch.png',
  'golden-key': 'golden-key.png',
  'drink-me': 'drink-me.png',
  'eat-me': 'eat-me.png',
  'fan-gloves': 'fan-and-gloves.png',
  mushroom: 'mushroom-pieces.png',
  hookah: 'hookah.png',
  pepper: 'pepper-pot.png',
  'tea-set': 'tea-service.png',
  flamingo: 'flamingo-mallet.png',
  tarts: 'queens-tarts.png',
  letter: 'unsigned-letter.png',
};

const locationFiles = {
  riverbank: 'riverbank.png',
  'hall-gate': 'rabbit-hole-entrance.png',
  'pool-shore': 'pool-shore.png',
  'rabbit-house-gate': 'white-rabbits-house.png',
  'puppy-wood': 'puppys-clearing.png',
  mushroom: 'caterpillars-mushroom.png',
  'pigeon-tree': 'pigeons-nest-tree.png',
  'duchess-gate': 'duchess-cottage.png',
  'cheshire-tree': 'cheshire-cats-tree.png',
  'tea-table': 'mad-tea-table.png',
  'queen-gate': 'queens-garden-gate.png',
  seashore: 'mock-turtles-shore.png',
  shaft: 'falling-shaft.png',
  'long-hall': 'hall-of-locked-doors.png',
  'glass-table': 'three-legged-glass-table.png',
  'tiny-door': 'tiny-garden-door.png',
  'tear-pool': 'pool-of-tears.png',
  'rabbit-front': 'white-rabbit-front-door.png',
  'upstairs-room': 'upstairs-bedroom.png',
  chimney: 'chimney.png',
  'rabbit-yard': 'house-yard.png',
  'footmen-walk': 'footmens-walk.png',
  'duchess-kitchen': 'peppered-kitchen.png',
  'kitchen-hearth': 'kitchen-hearth.png',
  'pig-path': 'woodland-pig-path.png',
  'rose-bush': 'white-rose-bed.png',
  'procession-lawn': 'procession-lawn.png',
  croquet: 'croquet-ground.png',
  'cat-tree-royal': 'royal-cheshire-tree.png',
  'duchess-walk': 'duchess-walk.png',
  'shore-path': 'path-to-shore.png',
  'court-gate': 'court-house.png',
  'royal-dais': 'royal-dais.png',
  'witness-box': 'witness-box.png',
  'jury-box': 'jury-box.png',
  'tarts-table': 'table-of-tarts.png',
  'court-floor': 'court-floor.png',
};

const now = Date.now();
const makeBlob = (id, url) => ({
  worldId: world.world.id,
  createdAt: now,
  updatedAt: now,
  id,
  mimeType: 'image/jpeg',
  url,
});

const generatedBlobs = [];
const coverId = 'alice-wonderland-image-generated-cover';
generatedBlobs.push(makeBlob(coverId, 'library/alice-in-wonderland/art/generated/cover.jpg'));
world.world.coverImageId = coverId;

for (const character of world.characters) {
  const key = character.id.replace('alice-wonderland-character-', '');
  const file = characterFiles[key];
  if (!file) throw new Error(`Missing character mapping: ${character.id}`);
  const id = `alice-wonderland-image-portrait-${key}`;
  character.portraitImageId = id;
  generatedBlobs.push(makeBlob(id, `library/alice-in-wonderland/art/generated/characters/${file.replace(/\.png$/, '.jpg')}`));
}

for (const item of world.items) {
  const key = item.id.replace('alice-wonderland-item-', '');
  const file = itemFiles[key];
  if (!file) throw new Error(`Missing item mapping: ${item.id}`);
  const id = `alice-wonderland-image-item-${key}`;
  item.imageId = id;
  generatedBlobs.push(makeBlob(id, `library/alice-in-wonderland/art/generated/items/${file.replace(/\.png$/, '.jpg')}`));
}

for (const location of world.locationMarkers) {
  const key = location.id.replace('alice-wonderland-location-', '');
  const file = locationFiles[key];
  if (!file) throw new Error(`Missing location mapping: ${location.id}`);
  const id = `alice-wonderland-image-location-${key}`;
  location.imageId = id;
  generatedBlobs.push(makeBlob(id, `library/alice-in-wonderland/art/generated/locations/${file.replace(/\.png$/, '.jpg')}`));
}

world.blobs = world.blobs.filter((blob) =>
  !blob.id.startsWith('alice-wonderland-image-tenniel-') &&
  !blob.id.startsWith('alice-wonderland-image-portrait-') &&
  !blob.id.startsWith('alice-wonderland-image-item-') &&
  !blob.id.startsWith('alice-wonderland-image-location-') &&
  blob.id !== coverId
);
world.blobs.push(...generatedBlobs);

const sourcePage = world.lorePages.find((page) => page.id === 'alice-wonderland-lore-sources');
if (sourcePage) {
  sourcePage.body = 'The manuscript follows the complete public-domain text of Lewis Carroll’s novel in Project Gutenberg eBook 11. Every narrative passage from Chapters I–XII is assigned once in source order; Gutenberg contents, decorative separators, terminal label, and packaging are excluded. The cover, character portraits, location scenes, fantasy maps, and item plates are original Kathala Library assets. Event divisions and dream chronology are editorial.';
  sourcePage.coverImageId = coverId;
}

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized, 'utf8');

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const entry = index.entries.find((candidate) => candidate.id === 'alice-in-wonderland');
if (!entry) throw new Error('Alice index entry not found');
entry.cover = 'library/alice-in-wonderland/art/generated/cover.jpg';
entry.dataBytes = Buffer.byteLength(serialized);
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({
  cover: world.world.coverImageId,
  characters: world.characters.length,
  items: world.items.length,
  locations: world.locationMarkers.length,
  generatedBlobs: generatedBlobs.length,
  totalBlobs: world.blobs.length,
  dataBytes: entry.dataBytes,
}, null, 2));
