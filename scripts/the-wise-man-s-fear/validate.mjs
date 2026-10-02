import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..');
const slug='the-wise-man-s-fear';
const bytes=fs.readFileSync(path.join(root,'library',`${slug}.pwk`));
const world=JSON.parse(bytes);
const index=JSON.parse(fs.readFileSync(path.join(root,'library/index.json'),'utf8'));
const entry=index.entries.find(item=>item.id===slug);
const blobs=new Map(world.blobs.map(blob=>[blob.id,blob]));
const failures=[];
const mapIds=new Set(world.mapLayers.map(map=>map.imageId));
const art=world.blobs.filter(blob=>blob.id.startsWith('wmf-illustration-'));
if(mapIds.size!==11)failures.push(`expected eleven map layers, got ${mapIds.size}`);
if(art.length!==37)failures.push(`expected 37 art blobs, got ${art.length}`);
if(world.blobs.length!==48)failures.push(`expected 48 total blobs, got ${world.blobs.length}`);
if(world.world.coverImageId!=='wmf-illustration-wmf01')failures.push('world cover ID changed');
function scan(value,label='world'){
  if(Array.isArray(value)){value.forEach((item,i)=>scan(item,`${label}[${i}]`));return;}
  if(!value||typeof value!=='object')return;
  for(const [key,child] of Object.entries(value)){
    if(['imageId','coverImageId','portraitImageId'].includes(key)&&typeof child==='string'&&child&&!blobs.has(child))failures.push(`${label}.${key}: missing blob ${child}`);
    scan(child,`${label}.${key}`);
  }
}
scan(world);
const hashes=new Map();
for(const blob of art){
  if(!blob.url.startsWith(`library/${slug}/art/generated/`)||!blob.url.endsWith('.jpg')){failures.push(`${blob.id}: wrong URL ${blob.url}`);continue;}
  const file=path.join(root,...blob.url.split('/'));
  if(!fs.existsSync(file)){failures.push(`${blob.id}: missing ${blob.url}`);continue;}
  const data=fs.readFileSync(file);
  if(data.subarray(0,2).toString('hex')!=='ffd8'||data.subarray(-2).toString('hex')!=='ffd9')failures.push(`${blob.id}: invalid JPEG`);
  const hash=crypto.createHash('sha256').update(data).digest('hex');
  if(hashes.has(hash))failures.push(`duplicate art: ${hashes.get(hash)} and ${blob.id}`);
  hashes.set(hash,blob.id);
}
if(art.some(blob=>/^https?:/.test(blob.url)))failures.push('external illustration link remains');
for(const id of mapIds)if(!blobs.has(id))failures.push(`missing map blob ${id}`);
if(!entry)failures.push('catalogue entry missing');
else {
  if(entry.dataBytes!==bytes.length)failures.push(`catalogue byte count mismatch: ${entry.dataBytes} vs ${bytes.length}`);
  if(entry.cover!==`library/${slug}/art/generated/wmf01.jpg`)failures.push(`wrong cover ${entry.cover}`);
}
const archive=JSON.parse(fs.readFileSync(path.join(root,'scripts',slug,'superseded-illustration-sources.json'),'utf8'));
if(archive.blobs.length!==37)failures.push(`expected 37 archived sources, got ${archive.blobs.length}`);
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(JSON.stringify({generated:art.length,maps:mapIds.size,archivedSources:archive.blobs.length,dataBytes:bytes.length,duplicates:0},null,2));
