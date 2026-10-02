import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '../..');
const manifest = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'manifest.json'), 'utf8'));
const index = JSON.parse(fs.readFileSync(path.join(root, 'library/index.json'), 'utf8'));
const assert = (okay, message) => { if (!okay) throw new Error(message); };
assert(manifest.assets.length === 217, 'Expected 217 distinct illustration assets');
assert(manifest.assets.filter((asset) => asset.slots.length === 2).length === 172, 'Expected 172 cross-book shared images');
const pending = manifest.assets.filter((asset) => asset.status !== 'generated_png');
for (const bookId of ['the-fellowship-of-the-ring', 'the-two-towers']) {
  const urls = manifest.assets.filter((asset) => asset.slots.some((slot) => slot.book === bookId)).map((asset) => asset.path);
  assert(new Set(urls).size === urls.length, `${bookId}: repeated image within book`);
}
for (const asset of manifest.assets.filter((asset) => asset.status === 'generated_png')) {
  assert(fs.existsSync(path.join(root, asset.masterPath)), `Missing PNG master ${asset.masterPath}`);
  assert(fs.existsSync(path.join(root, asset.path)), `Missing JPEG ${asset.path}`);
}
if (pending.length) {
  console.log(`Checkpoint valid: ${217-pending.length}/217 accepted illustrations; ${pending.length} still pending. No PWK import has been attempted.`);
  process.exit(0);
}
for (const [id, short, expected] of [['the-fellowship-of-the-ring','fotr',173],['the-two-towers','tt',216]]) {
  const pwkPath = path.join(root, 'library', `${id}.pwk`);
  const pwbPath = path.join(root, 'library', `${id}.pwb`);
  const pwk = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));
  const pwb = JSON.parse(fs.readFileSync(pwbPath, 'utf8'));
  const blobMap = new Map([...pwk.blobs, ...pwb.blobs].map((blob) => [blob.id, blob]));
  const hashes = new Set();
  const urls = new Set();
  let count = 0;
  for (const asset of manifest.assets) {
    const slot = asset.slots.find((entry) => entry.book === id);
    if (!slot) continue;
    const object = slot.kind === 'cover' ? pwk.world : slot.kind === 'character' ? pwk.characters.find((entry) => entry.id === slot.objectId) : slot.kind === 'item' ? pwk.items.find((entry) => entry.id === slot.objectId) : pwk.locationMarkers.find((entry) => entry.id === slot.objectId);
    const blob = blobMap.get(object?.[slot.field]);
    assert(blob?.id === `${short}-generated-${String(asset.number).padStart(3,'0')}` && blob.url === asset.path, `${id}: bad art reference ${slot.name}`);
    assert(!urls.has(blob.url), `${id}: repeated URL ${blob.url}`);
    urls.add(blob.url);
    const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, blob.url))).digest('hex');
    assert(!hashes.has(hash), `${id}: repeated image bytes ${blob.url}`);
    hashes.add(hash);
    count++;
  }
  assert(count === expected && pwk.blobs.length === expected, `${id}: wrong illustration count`);
  assert(pwk.blobs.every((blob) => !/^https?:/.test(blob.url)), `${id}: external linked image remains`);
  const mapIds = new Set(pwk.mapLayers.map((layer) => layer.imageId));
  assert(pwb.blobs.length === 14 && pwb.blobs.every((blob) => mapIds.has(blob.id)), `${id}: incorrect map bundle`);
  assert(pwk.mapLayers.every((layer) => blobMap.has(layer.imageId)), `${id}: missing map image`);
  const entry = index.entries.find((item) => item.id === id);
  assert(entry?.cover === manifest.assets.find((asset) => asset.kind === 'cover' && asset.slots.some((slot) => slot.book === id)).path, `${id}: bad catalogue cover`);
  assert(entry.dataBytes === fs.statSync(pwkPath).size && entry.imagesBytes === fs.statSync(pwbPath).size, `${id}: catalogue size mismatch`);
  console.log(`${id}: ${count} unique illustrations and 14 retained map blobs validated.`);
}
