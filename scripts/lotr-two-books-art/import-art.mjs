import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '../..');
const manifest = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'manifest.json'), 'utf8'));
const indexPath = path.join(root, 'library/index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const stamp = Date.UTC(2026, 9, 2);
const save = (target, value) => fs.writeFileSync(target, JSON.stringify(value) + '\n');
const books = [{ id: 'the-fellowship-of-the-ring', short: 'fotr' }, { id: 'the-two-towers', short: 'tt' }];

if (manifest.assets.length !== 217 || manifest.assets.some((asset) => asset.status !== 'generated_png' || !fs.existsSync(path.join(root, asset.path)))) {
  throw new Error('All 217 generated and approved JPEGs are required before import.');
}

for (const { id, short } of books) {
  const pwkPath = path.join(root, 'library', `${id}.pwk`);
  const pwbPath = path.join(root, 'library', `${id}.pwb`);
  const pwk = JSON.parse(fs.readFileSync(pwkPath, 'utf8'));
  const pwb = JSON.parse(fs.readFileSync(pwbPath, 'utf8'));
  if (pwk.blobs.some((blob) => blob.id.startsWith(`${short}-generated-`))) throw new Error(`${id}: art already imported`);
  const mapIds = new Set(pwk.mapLayers.map((layer) => layer.imageId));
  const archive = {
    book: id,
    note: 'Superseded linked and embedded illustration metadata. Embedded bytes remain recoverable from Git history; map blobs remain active in the PWB.',
    linkedBlobs: pwk.blobs,
    embeddedArt: pwb.blobs.filter((blob) => !mapIds.has(blob.id)).map(({ dataBase64, ...blob }) => ({ ...blob, dataSha256: dataBase64 ? crypto.createHash('sha256').update(Buffer.from(dataBase64, 'base64')).digest('hex') : null })),
  };
  fs.writeFileSync(path.join(import.meta.dirname, `${short}-original-sources.json`), JSON.stringify(archive, null, 2) + '\n');
  const generated = [];
  const urls = new Set();
  for (const asset of manifest.assets) {
    const slot = asset.slots.find((entry) => entry.book === id);
    if (!slot) continue;
    if (urls.has(asset.path)) throw new Error(`${id}: repeated image URL ${asset.path}`);
    urls.add(asset.path);
    const object = slot.kind === 'cover' ? pwk.world : slot.kind === 'character' ? pwk.characters.find((entry) => entry.id === slot.objectId) : slot.kind === 'item' ? pwk.items.find((entry) => entry.id === slot.objectId) : pwk.locationMarkers.find((entry) => entry.id === slot.objectId);
    if (!object || object[slot.field] !== slot.oldBlobId) throw new Error(`${id}: source slot changed for ${slot.name}`);
    const blobId = `${short}-generated-${String(asset.number).padStart(3, '0')}`;
    object[slot.field] = blobId;
    generated.push({ id: blobId, worldId: pwk.world.id, mimeType: 'image/jpeg', url: asset.path, createdAt: stamp, updatedAt: stamp });
  }
  pwk.blobs = generated;
  pwb.blobs = pwb.blobs.filter((blob) => mapIds.has(blob.id));
  if (id === 'the-fellowship-of-the-ring') {
    const edoras = pwk.mapLayers.find((layer) => layer.name === 'Endoras');
    if (edoras) edoras.name = 'Edoras';
  }
  const available = new Set([...pwk.blobs, ...pwb.blobs].map((blob) => blob.id));
  const dangling = [];
  function scan(value) {
    if (Array.isArray(value)) { value.forEach(scan); return; }
    if (!value || typeof value !== 'object') return;
    for (const [key, child] of Object.entries(value)) {
      if (['imageId', 'coverImageId', 'portraitImageId'].includes(key) && typeof child === 'string' && child && !available.has(child)) dangling.push(child);
      scan(child);
    }
  }
  scan(pwk);
  if (dangling.length) throw new Error(`${id}: dangling image refs ${[...new Set(dangling)].join(', ')}`);
  save(pwkPath, pwk);
  save(pwbPath, pwb);
  const entry = index.entries.find((item) => item.id === id);
  if (!entry) throw new Error(`${id}: missing catalogue entry`);
  entry.cover = manifest.assets.find((asset) => asset.kind === 'cover' && asset.slots.some((slot) => slot.book === id)).path;
  entry.notice = 'Unofficial, fan-made reference. Structural notes only; no text from the book is included. Original book-based illustrations are shared where appropriate across the two volumes, with no repeated illustration within either book. Existing map layers remain available. Not affiliated with or endorsed by the author or publisher.';
  console.log(`${id}: ${generated.length} unique illustration refs; ${pwb.blobs.length} map blobs retained.`);
}
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n');
