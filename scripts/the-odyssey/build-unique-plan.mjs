import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const book = JSON.parse(fs.readFileSync(path.join(root, 'library/the-odyssey.pwk'), 'utf8'));
const output = path.join(import.meta.dirname, 'unique-art-plan.json');
if (fs.existsSync(output)) throw new Error('The unique-art plan already exists; preserve its progress.');

// One old image remains in use for each of the original 31 paintings. The
// Penelope interview painting moves from the brooch item to her portrait.
const anchors = {
  homecoming: 'odyssey-world', telemachus: 'odyssey-char-telemachus',
  athena: 'odyssey-char-athena', storm: 'odyssey-item-veil',
  zeus: 'odyssey-char-zeus', hermes: 'odyssey-char-hermes',
  calypso: 'odyssey-char-calypso', nausicaa: 'odyssey-char-nausicaa',
  phaeacia: 'odyssey-loc-phaeacian-palace', demodocus: 'odyssey-char-demodocus',
  nestor: 'odyssey-char-nestor', sparta: 'odyssey-loc-sparta',
  cyclops: 'odyssey-char-polyphemus', aeolus: 'odyssey-char-aeolus',
  laestrygonians: 'odyssey-loc-telepylus', circe: 'odyssey-char-circe',
  circeCrew: 'odyssey-faction-crew', underworld: 'odyssey-char-tiresias',
  anticleia: 'odyssey-char-anticleia', eumaeus: 'odyssey-char-eumaeus',
  eurycleia: 'odyssey-char-eurycleia', suitors: 'odyssey-faction-suitors',
  laertes: 'odyssey-char-laertes', lotus: 'odyssey-loc-lotus-land',
  sirens: 'odyssey-loc-sirens', cattle: 'odyssey-item-cattle',
  bow: 'odyssey-item-bow', alcinous: 'odyssey-char-alcinous',
  scylla: 'odyssey-loc-scylla', loom: 'odyssey-item-shroud',
  beggarPenelope: 'odyssey-char-penelope',
};
const existing = new Map(book.blobs.map((blob) => [blob.id, blob]));
const style = 'Full-bleed historical illustration for Homer’s Odyssey. Bronze Age Aegean clothing, ships and architecture; painterly tempera and fine ink on parchment; Aegean blue, terracotta, ivory and muted gold. One coherent, original scene; no text, panels, collage, Roman, medieval, modern or movie details. Do not reuse the composition of another illustration in this book.';
const descriptions = {
  character: (name, detail) => `A focused, visually distinct character portrait of ${name}. ${detail} Show this character as the unmistakable subject, with only a fitting background and no other named character competing for focus.`,
  item: (name, detail) => `A detailed still-life illustration centered on ${name}. ${detail} Make the object immediately recognizable, with a context-appropriate Bronze Age surface and no full human figures.`,
  location: (name, detail) => `A wide establishing view of ${name}. ${detail} Render the place itself as the focus, with legible geography and architecture rather than a character portrait.`,
  lore: (name, detail) => `An original symbolic narrative illustration of the theme “${name}.” ${detail} Use a single coherent visual metaphor from the Odyssey, without diagram labels or a collage.`,
  faction: (name, detail) => `A group portrait of ${name}. ${detail} Show several distinct members together in one coherent Bronze Age setting, without copying any single-character portrait.`,
};
const slots = [];
const add = (type, object, field, detail) => {
  if (!object[field]) return;
  const name = object.name || object.title;
  const key = Object.entries(anchors).find(([, id]) => id === object.id)?.[0];
  const targetBlobId = key ? `odyssey-image-art-${key}` : `odyssey-image-unique-${object.id.replace(/^odyssey-/, '')}`;
  const file = key ? existing.get(targetBlobId)?.url : `library/the-odyssey/art/unique/${type}/${object.id.replace(/^odyssey-/, '')}.jpg`;
  if (!file) throw new Error(`Missing anchor art for ${object.id}`);
  slots.push({ type, objectId: object.id, name, field, originalBlobId: object[field], targetBlobId,
    path: file, status: key ? 'retained' : 'pending', masterPath: null,
    prompt: key ? null : `${descriptions[type](name, detail || '')} ${style}` });
};
add('cover', book.world, 'coverImageId', book.world.description);
for (const [type, collection, field, description] of [
  ['character', 'characters', 'portraitImageId', 'description'],
  ['item', 'items', 'imageId', 'description'],
  ['location', 'locationMarkers', 'imageId', 'description'],
  ['lore', 'lorePages', 'coverImageId', 'body'],
  ['faction', 'factions', 'coverImageId', 'description'],
]) for (const object of book[collection]) add(type, object, field, object[description]);
if (slots.length !== 109 || slots.filter((slot) => slot.status === 'retained').length !== 31) throw new Error('Unexpected Odyssey slot count');
const targets = new Set(slots.map((slot) => slot.targetBlobId));
if (targets.size !== slots.length) throw new Error('Repeated target artwork');
fs.writeFileSync(output, JSON.stringify({ version: 1, book: 'The Odyssey', style, slots }, null, 2) + '\n');
console.log(`Planned ${slots.length} distinct images: 31 retained, 78 to generate.`);
