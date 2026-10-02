import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'scripts/the-invisible-man-art/manifest.json'),'utf8'));
const raw=fs.readFileSync(path.join(root,'library/the-invisible-man.pwk'));
const world=JSON.parse(raw);
const index=JSON.parse(fs.readFileSync(path.join(root,'library/index.json'),'utf8'));
const entry=index.entries.find(x=>x.id==='the-invisible-man');
const archive=JSON.parse(fs.readFileSync(path.join(root,'scripts/the-invisible-man-art/superseded-cover-source.json'),'utf8'));
const failures=[];
const blobs=new Map(world.blobs.map(x=>[x.id,x]));
const mapIds=new Set(manifest.mapIds);
const slots=[['cover','The Invisible Man',world.world.coverImageId],...world.characters.map(x=>['character',x.name,x.portraitImageId]),...world.items.map(x=>['item',x.name,x.imageId]),...world.locationMarkers.map(x=>['location',x.name,x.imageId])];
const ids=new Set(),urls=new Set(),hashes=new Map();
if(slots.length!==65||world.blobs.length!==71)failures.push('World image inventory changed');
for(const [kind,name,id] of slots){
  const blob=blobs.get(id);
  if(!blob){failures.push(`${kind} ${name}: missing blob`);continue;}
  if(ids.has(id))failures.push(`Repeated image ID: ${id}`);
  if(urls.has(blob.url))failures.push(`Repeated image URL: ${blob.url}`);
  ids.add(id);urls.add(blob.url);
  if(!blob.url?.startsWith('library/')||!blob.url.endsWith('.jpg')||blob.mimeType!=='image/jpeg'){failures.push(`${name}: nonlocal or invalid illustration blob`);continue;}
  const file=path.join(root,...blob.url.split('/'));
  if(!fs.existsSync(file)){failures.push(`${name}: missing ${blob.url}`);continue;}
  const bytes=fs.readFileSync(file);
  if(bytes.subarray(0,2).toString('hex')!=='ffd8'||bytes.subarray(-2).toString('hex')!=='ffd9')failures.push(`${name}: invalid JPEG`);
  const hash=crypto.createHash('sha256').update(bytes).digest('hex');
  if(hashes.has(hash))failures.push(`Repeated image content: ${hashes.get(hash)} and ${name}`);
  hashes.set(hash,name);
}
if(world.mapLayers.length!==6||mapIds.size!==6)failures.push('Map count changed');
for(const map of world.mapLayers){
  const blob=blobs.get(map.imageId);
  if(!mapIds.has(map.imageId)||!blob)failures.push(`Map missing: ${map.name}`);
  else if(blob.url?.startsWith('library/')&&!fs.existsSync(path.join(root,...blob.url.split('/'))))failures.push(`Map file missing: ${map.name}`);
}
for(const page of world.lorePages)if(page.coverImageId&&!blobs.has(page.coverImageId))failures.push(`Lore cover missing: ${page.title}`);
if(world.lorePages.find(x=>x.id==='invisible-man-lore-sources')?.coverImageId!==world.world.coverImageId)failures.push('Source lore cover does not match world cover');
if(manifest.jobs.length!==1||blobs.get(world.world.coverImageId)?.url!==manifest.jobs[0].url)failures.push('Generated cover mismatch');
if(archive.blobs.length!==1||!/^https?:/.test(archive.blobs[0].url))failures.push('Superseded cover archive mismatch');
if(!entry||entry.cover!==manifest.jobs[0].url||entry.dataBytes!==raw.length)failures.push('Catalogue cover or byte count mismatch');
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(JSON.stringify({illustrations:slots.length,uniqueUrls:urls.size,uniqueHashes:hashes.size,retainedPortraits:18,retainedItems:10,retainedLocations:36,maps:mapIds.size},null,2));
