import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = 'around-the-world-in-eighty-days';
const prefix = `${slug}-`;
const pwkPath = path.join(root, 'library', `${slug}.pwk`);
const indexPath = path.join(root, 'library', 'index.json');
const world = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));

const characterFiles = {
  fogg: 'phileas-fogg', passepartout: 'jean-passepartout', aouda: 'aouda', fix: 'detective-fix',
  cromarty: 'sir-francis-cromarty', guide: 'parsee-guide', kiouni: 'kiouni', priest: 'chief-priest',
  obadiah: 'judge-obadiah', oysterpuff: 'oysterpuff', consul: 'suez-consul', bunsby: 'john-bunsby',
  batulcar: 'william-batulcar', mandiboy: 'general-grant-captain', proctor: 'colonel-stamp-proctor',
  conductor: 'railroad-conductor', mudge: 'mudge', speedy: 'captain-andrew-speedy',
  wilson: 'reverend-samuel-wilson', stuart: 'andrew-stuart', sullivan: 'john-sullivan',
  fallentin: 'samuel-fallentin', flanagan: 'thomas-flanagan', ralph: 'gauthier-ralph',
};

const itemFiles = {
  'carpet-bag': 'carpet-bag', bradshaw: 'bradshaws-guide', passport: 'foggs-passport',
  warrant: 'arrest-warrant', watch: 'passepartouts-watch', shoes: 'temple-shoes',
  banknotes: 'banknotes', revolver: 'foggs-revolver', elephant: 'kiounis-tack',
  palanquin: 'aoudas-palanquin', 'opium-pipe': 'opium-pipe', 'circus-costume': 'long-nose-costume',
  'railway-tickets': 'round-the-world-tickets', 'sledge-sail': 'sled-sail', henrietta: 'henrietta',
};

const locationFiles = {
  'london-entrance': 'london', paris: 'paris', turin: 'turin', brindisi: 'brindisi', suez: 'suez', aden: 'aden',
  'bombay-entrance': 'bombay-entrance', 'calcutta-world': 'calcutta-world', singapore: 'singapore',
  'hong-kong': 'hong-kong', 'tankadere-sea': 'tankadere-sea', 'yokohama-entrance': 'yokohama-entrance',
  'general-grant': 'general-grant', 'san-francisco-entrance': 'san-francisco-entrance',
  'new-york-world': 'new-york-world', henrietta: 'henrietta-atlantic', queenstown: 'queenstown',
  liverpool: 'liverpool', 'savile-row': 'savile-row', 'reform-club': 'reform-club',
  'charing-cross': 'charing-cross', 'london-terminus': 'london-terminus', 'wilson-house': 'wilson-house',
  bombay: 'bombay', 'malabar-hill': 'malabar-hill', kholby: 'kholby', 'jungle-camp': 'jungle-camp',
  'pillaji-temple': 'pillaji-temple', 'suttee-clearing': 'suttee-clearing', allahabad: 'allahabad',
  benares: 'benares', calcutta: 'calcutta', 'yokohama-harbor': 'yokohama-harbor',
  'yokohama-streets': 'yokohama-streets', 'long-noses': 'long-noses',
  'general-grant-berth': 'general-grant-berth', 'san-francisco': 'san-francisco', oakland: 'oakland',
  'medicine-bow': 'medicine-bow', 'fort-kearny': 'fort-kearny', omaha: 'omaha', chicago: 'chicago',
  'new-york': 'new-york',
};

const now = Date.now();
const blobs = [];
const addBlob = (id, relativePath) => {
  const diskPath = path.join(root, ...relativePath.split('/'));
  if (!fs.existsSync(diskPath)) throw new Error(`Missing generated asset: ${relativePath}`);
  blobs.push({ worldId: world.world.id, createdAt: now, updatedAt: now, id, mimeType: 'image/jpeg', url: relativePath });
  return id;
};

const coverId = `${prefix}image-generated-cover`;
addBlob(coverId, `library/${slug}/art/generated/cover.jpg`);
world.world.coverImageId = coverId;

for (const character of world.characters) {
  const key = character.id.replace(`${prefix}char-`, '');
  const file = characterFiles[key];
  if (!file) throw new Error(`Missing character mapping: ${character.id}`);
  character.portraitImageId = addBlob(`${prefix}image-generated-character-${key}`, `library/${slug}/art/generated/characters/${file}.jpg`);
}

for (const item of world.items) {
  const key = item.id.replace(`${prefix}item-`, '');
  const file = itemFiles[key];
  if (!file) throw new Error(`Missing item mapping: ${item.id}`);
  item.imageId = addBlob(`${prefix}image-generated-item-${key}`, `library/${slug}/art/generated/items/${file}.jpg`);
}

for (const location of world.locationMarkers) {
  const key = location.id.replace(`${prefix}loc-`, '');
  const file = locationFiles[key];
  if (!file) throw new Error(`Missing location mapping: ${location.id}`);
  location.imageId = addBlob(`${prefix}image-generated-location-${key}`, `library/${slug}/art/generated/locations/${file}.jpg`);
}

const keepIds = new Set(world.blobs.filter((blob) => blob.id.startsWith(`${prefix}image-map-`)).map((blob) => blob.id));
world.blobs = world.blobs.filter((blob) => keepIds.has(blob.id));
world.blobs.push(...blobs);

const loreCovers = {
  [`${prefix}lore-page-1`]: coverId,
  [`${prefix}lore-page-2`]: `${prefix}image-generated-character-passepartout`,
  [`${prefix}lore-page-3`]: `${prefix}image-map-world`,
  [`${prefix}lore-page-4`]: `${prefix}image-generated-location-oakland`,
  [`${prefix}lore-page-5`]: `${prefix}image-generated-location-omaha`,
  [`${prefix}lore-page-6`]: `${prefix}image-generated-location-reform-club`,
  [`${prefix}lore-page-7`]: `${prefix}image-generated-item-passport`,
  [`${prefix}lore-page-8`]: `${prefix}image-generated-location-pillaji-temple`,
  [`${prefix}lore-page-9`]: `${prefix}image-generated-location-medicine-bow`,
  [`${prefix}lore-page-10`]: `${prefix}image-generated-character-aouda`,
  [`${prefix}lore-page-complete-text`]: coverId,
};
for (const page of world.lorePages) page.coverImageId = loreCovers[page.id] ?? page.coverImageId;
const sourcePage = world.lorePages.find((page) => page.id === `${prefix}lore-page-1`);
if (sourcePage) sourcePage.body = 'The chronology and chapter structure follow the complete public-domain George Makepeace Towle translation available through Project Gutenberg. The cover, character portraits, item plates, and location scenes are original generated illustrations created for the Kathala Library edition. The five linked maps remain carefully selected historical maps: a dedicated route map, Victorian London, the 1870 Indian railway network, 1870 Yokohama, and the 1871 American railway network.';
const completePage = world.lorePages.find((page) => page.id === `${prefix}lore-page-complete-text`);
if (completePage) completePage.body = 'The manuscript follows the complete public-domain English text of Jules Verne’s novel in Project Gutenberg eBook 103. Every narrative paragraph from Chapters I–XXXVII is assigned once in source order; Gutenberg contents, front matter, and end matter are excluded. The cover, portraits, item plates, and location scenes are original generated illustrations; the historical maps and all summaries, event divisions, chronology, and state notes are editorial selections.';

const serialized = `${JSON.stringify(world, null, 2)}\n`;
fs.writeFileSync(pwkPath, serialized, 'utf8');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const entry = index.entries.find((candidate) => candidate.id === slug);
if (!entry) throw new Error('Library index entry not found');
entry.cover = `library/${slug}/art/generated/cover.jpg`;
entry.dataBytes = Buffer.byteLength(serialized);
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');

console.log(JSON.stringify({ cover: world.world.coverImageId, characters: world.characters.length, items: world.items.length, locations: world.locationMarkers.length, maps: keepIds.size, generatedBlobs: blobs.length, totalBlobs: world.blobs.length, dataBytes: entry.dataBytes }, null, 2));
