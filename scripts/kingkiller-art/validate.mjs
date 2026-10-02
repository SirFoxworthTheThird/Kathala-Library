import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'scripts/kingkiller-art/manifest.json'),'utf8'));
const index=JSON.parse(fs.readFileSync(path.join(root,'library/index.json'),'utf8'));
const failures=[];
for(const book of manifest.books){
  const file=path.join(root,'library',`${book.book}.pwk`);
  const raw=fs.readFileSync(file);
  const pwk=JSON.parse(raw);
  const bundleFile=path.join(root,'library',`${book.book}.pwb`);
  const bundle=fs.existsSync(bundleFile)?JSON.parse(fs.readFileSync(bundleFile,'utf8')):null;
  const entry=index.entries.find(x=>x.id===book.book);
  const maps=new Set(book.mapIds);
  const blobs=new Map([...pwk.blobs,...(bundle?.blobs||[])].map(b=>[b.id,b]));
  const urls=new Set(),hashes=new Map(),ids=new Set();
  const target=kind=>kind==='cover'?pwk.world:kind==='character'?pwk.characters:kind==='item'?pwk.items:pwk.locationMarkers;
  for(const slot of book.slots){
    const entity=slot.kind==='cover'?target(slot.kind):target(slot.kind)[slot.index];
    const id=entity?.[slot.kind==='cover'?'coverImageId':slot.kind==='character'?'portraitImageId':'imageId'];
    const blob=blobs.get(id);
    if(!entity||entity.id!==slot.entityId||!blob){failures.push(`${book.short} ${slot.kind} ${slot.index}: missing entity/blob`);continue;}
    if(blob.url!==slot.url)failures.push(`${book.short} ${slot.kind} ${slot.index}: wrong URL`);
    if(urls.has(blob.url))failures.push(`${book.short}: repeated URL ${blob.url}`);
    if(ids.has(id))failures.push(`${book.short}: repeated image ID ${id}`);
    urls.add(blob.url);ids.add(id);
    if(!blob.url?.startsWith('library/')||!blob.url.endsWith('.jpg')||blob.mimeType!=='image/jpeg')failures.push(`${book.short}: invalid generated image blob ${id}`);
    const imageFile=path.join(root,...blob.url.split('/'));
    if(!fs.existsSync(imageFile)){failures.push(`${book.short}: missing ${blob.url}`);continue;}
    const bytes=fs.readFileSync(imageFile);
    if(bytes.subarray(0,2).toString('hex')!=='ffd8'||bytes.subarray(-2).toString('hex')!=='ffd9')failures.push(`${book.short}: corrupt JPEG ${blob.url}`);
    const hash=crypto.createHash('sha256').update(bytes).digest('hex');
    if(hashes.has(hash))failures.push(`${book.short}: repeated image content ${hashes.get(hash)} and ${slot.name}`);
    hashes.set(hash,slot.name);
  }
  if(urls.size!==book.slots.length)failures.push(`${book.short}: illustrated slot count mismatch`);
  if(pwk.blobs.length!==book.slots.length+maps.size)failures.push(`${book.short}: unexpected PWK blob count`);
  for(const map of pwk.mapLayers)if(!maps.has(map.imageId)||!blobs.has(map.imageId))failures.push(`${book.short}: map changed ${map.imageId}`);
  if(bundle&&bundle.blobs.some(b=>!maps.has(b.id)))failures.push(`${book.short}: non-map bundle image remains`);
  if(!entry||entry.dataBytes!==raw.length)failures.push(`${book.short}: catalogue dataBytes mismatch`);
  if(bundle&&entry?.imagesBytes!==fs.statSync(bundleFile).size)failures.push(`${book.short}: catalogue imagesBytes mismatch`);
  const archive=JSON.parse(fs.readFileSync(path.join(root,'scripts/kingkiller-art',`${book.short}-superseded-blobs.json`),'utf8'));
  if(!archive.pwkBlobs.length)failures.push(`${book.short}: missing superseded source archive`);
  console.log(`${book.book}: ${urls.size} distinct illustrated images, ${maps.size} preserved maps`);
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
