import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..');
const slug='the-name-of-the-wind';
const bytes=fs.readFileSync(path.join(root,'library',`${slug}.pwk`));
const world=JSON.parse(bytes);
const imageBytes=fs.readFileSync(path.join(root,'library',`${slug}.pwb`));
const bundle=JSON.parse(imageBytes);
const index=JSON.parse(fs.readFileSync(path.join(root,'library/index.json'),'utf8'));
const entry=index.entries.find(item=>item.id===slug);
const blobs=new Map([...bundle.blobs,...world.blobs].map(blob=>[blob.id,blob]));
const failures=[];
const mapIds=new Set(world.mapLayers.map(map=>map.imageId));
const art=world.blobs.filter(blob=>blob.id.startsWith('notw-location-image-'));
if(mapIds.size!==5)failures.push(`expected five map layers, got ${mapIds.size}`);
if(art.length!==23)failures.push(`expected 23 art blobs, got ${art.length}`);
if(world.world.coverImageId!=='notw-location-image-worldRoad')failures.push('world cover ID changed');
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
const external=art.filter(blob=>/^https?:/.test(blob.url));
if(external.length)failures.push(`${external.length} externally linked illustration records remain`);
if(!entry)failures.push('catalogue entry missing');
else {
  if(entry.dataBytes!==bytes.length)failures.push('catalogue PWK byte count mismatch');
  if(entry.imagesBytes!==imageBytes.length)failures.push('catalogue PWB byte count mismatch');
  if(entry.cover!==`library/${slug}/art/generated/worldRoad.jpg`)failures.push(`wrong cover ${entry.cover}`);
}
const archive=JSON.parse(fs.readFileSync(path.join(root,'scripts',slug,'superseded-illustration-sources.json'),'utf8'));
if(archive.blobs.length!==23)failures.push(`expected 23 archived sources, got ${archive.blobs.length}`);
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(JSON.stringify({generated:art.length,maps:mapIds.size,preservedBundleBlobs:bundle.blobs.length,archivedSources:archive.blobs.length,duplicates:0},null,2));
