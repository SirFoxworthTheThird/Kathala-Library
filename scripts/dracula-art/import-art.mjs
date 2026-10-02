import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'scripts/dracula-art/manifest.json'),'utf8'));
const pwkFile=path.join(root,'library/dracula.pwk');
const pwk=JSON.parse(fs.readFileSync(pwkFile,'utf8'));
if(pwk.blobs.some(b=>b.id.startsWith('dracula-generated-')))throw Error('Artwork already imported; refusing to overwrite source archive');
const mapIds=new Set(manifest.mapIds);
const activeMaps=new Set(pwk.mapLayers.map(x=>x.imageId));
if(mapIds.size!==10||mapIds.size!==activeMaps.size||[...mapIds].some(id=>!activeMaps.has(id)))throw Error('Map references changed');
if(new Set(manifest.jobs.map(j=>j.url)).size!==manifest.jobs.length)throw Error('Repeated illustration URL in manifest');
const archive={book:'dracula',note:'Superseded non-map illustration blobs; ten functional map blobs remain active.',blobs:pwk.blobs.filter(b=>!mapIds.has(b.id))};
const generated=[];
const timestamp=Date.UTC(2026,9,2);
for(const job of manifest.jobs){
  const file=path.join(root,...job.url.split('/'));
  if(!fs.existsSync(file))throw Error(`Missing ${job.url}`);
  const entity=job.kind==='cover'?pwk.world:job.kind==='character'?pwk.characters[job.index]:job.kind==='item'?pwk.items[job.index]:pwk.locationMarkers[job.index];
  if(!entity||entity.id!==job.entityId)throw Error(`${job.kind} ${job.index}: entity changed`);
  const id=`dracula-generated-${job.kind}-${String(job.index+1).padStart(3,'0')}`;
  entity[job.kind==='cover'?'coverImageId':job.kind==='character'?'portraitImageId':'imageId']=id;
  generated.push({id,worldId:pwk.world.id,mimeType:'image/jpeg',url:job.url,createdAt:timestamp,updatedAt:timestamp});
}
pwk.blobs=[...pwk.blobs.filter(b=>mapIds.has(b.id)),...generated];
const available=new Set(pwk.blobs.map(b=>b.id));
const missing=[];
function scan(value){
  if(Array.isArray(value)){value.forEach(scan);return;}
  if(!value||typeof value!=='object')return;
  for(const [key,child] of Object.entries(value)){
    if(['imageId','coverImageId','portraitImageId'].includes(key)&&typeof child==='string'&&child&&!available.has(child))missing.push(child);
    scan(child);
  }
}
scan(pwk);
if(missing.length)throw Error(`Unbound image IDs: ${[...new Set(missing)].join(', ')}`);
fs.writeFileSync(path.join(root,'scripts/dracula-art/superseded-illustration-sources.json'),`${JSON.stringify(archive,null,2)}\n`);
fs.writeFileSync(pwkFile,`${JSON.stringify(pwk,null,2)}\n`);
console.log(`${generated.length} generated illustration blobs, ${mapIds.size} maps retained, ${archive.blobs.length} old art blobs archived`);
