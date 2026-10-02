import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'scripts/dracula-art/manifest.json'),'utf8'));
const raw=fs.readFileSync(path.join(root,'library/dracula.pwk'));
const world=JSON.parse(raw);
const index=JSON.parse(fs.readFileSync(path.join(root,'library/index.json'),'utf8'));
const entry=index.entries.find(e=>e.id==='dracula');
const archive=JSON.parse(fs.readFileSync(path.join(root,'scripts/dracula-art/superseded-illustration-sources.json'),'utf8'));
const failures=[];
const mapIds=new Set(manifest.mapIds);
const blobs=new Map(world.blobs.map(b=>[b.id,b]));
const ids=new Set(),urls=new Set(),hashes=new Map();
if(manifest.jobs.length!==103)failures.push(`Expected 103 jobs, got ${manifest.jobs.length}`);
if(mapIds.size!==10)failures.push(`Expected 10 maps, got ${mapIds.size}`);
if(world.blobs.length!==manifest.jobs.length+mapIds.size)failures.push('Unexpected blob count');
for(const map of world.mapLayers)if(!mapIds.has(map.imageId)||!blobs.has(map.imageId))failures.push(`Map changed: ${map.imageId}`);
for(const job of manifest.jobs){
  const entity=job.kind==='cover'?world.world:job.kind==='character'?world.characters[job.index]:job.kind==='item'?world.items[job.index]:world.locationMarkers[job.index];
  const id=entity?.[job.kind==='cover'?'coverImageId':job.kind==='character'?'portraitImageId':'imageId'];
  const blob=blobs.get(id);
  if(!entity||entity.id!==job.entityId||!blob){failures.push(`${job.kind} ${job.index}: missing entity/blob`);continue;}
  if(id!==`dracula-generated-${job.kind}-${String(job.index+1).padStart(3,'0')}`)failures.push(`${job.name}: wrong image ID`);
  if(blob.url!==job.url||blob.mimeType!=='image/jpeg')failures.push(`${job.name}: wrong image blob`);
  if(ids.has(id))failures.push(`Repeated image ID: ${id}`);
  if(urls.has(blob.url))failures.push(`Repeated image URL: ${blob.url}`);
  ids.add(id);urls.add(blob.url);
  const file=path.join(root,...blob.url.split('/'));
  if(!fs.existsSync(file)){failures.push(`Missing ${blob.url}`);continue;}
  const bytes=fs.readFileSync(file);
  if(bytes.subarray(0,2).toString('hex')!=='ffd8'||bytes.subarray(-2).toString('hex')!=='ffd9')failures.push(`Invalid JPEG: ${blob.url}`);
  const hash=crypto.createHash('sha256').update(bytes).digest('hex');
  if(hashes.has(hash))failures.push(`Repeated image content: ${hashes.get(hash)} and ${job.name}`);
  hashes.set(hash,job.name);
}
if(world.blobs.some(b=>!mapIds.has(b.id)&&!b.url?.startsWith('library/dracula/art/generated/')))failures.push('Non-generated illustration blob remains');
function scan(value){
  if(Array.isArray(value)){value.forEach(scan);return;}
  if(!value||typeof value!=='object')return;
  for(const [key,child] of Object.entries(value)){
    if(['imageId','coverImageId','portraitImageId'].includes(key)&&typeof child==='string'&&child&&!blobs.has(child))failures.push(`Unbound image ID: ${child}`);
    scan(child);
  }
}
scan(world);
if(archive.blobs.length!==66)failures.push(`Expected 66 archived art blobs, got ${archive.blobs.length}`);
if(!entry||entry.dataBytes!==raw.length)failures.push('Catalogue byte count mismatch');
if(entry?.cover!==manifest.jobs[0].url)failures.push('Catalogue cover mismatch');
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(JSON.stringify({illustrations:ids.size,uniqueUrls:urls.size,uniqueHashes:hashes.size,maps:mapIds.size,archivedSources:archive.blobs.length},null,2));
