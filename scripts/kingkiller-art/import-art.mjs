import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'scripts/kingkiller-art/manifest.json'),'utf8'));
const save=(file,data)=>fs.writeFileSync(file,`${JSON.stringify(data,null,2)}\n`);
const imagePath=url=>path.join(root,...url.split('/'));

for(const book of manifest.books){
  const pwkFile=path.join(root,'library',`${book.book}.pwk`);
  const pwk=JSON.parse(fs.readFileSync(pwkFile,'utf8'));
  if(pwk.blobs.some(b=>b.id.startsWith(`${book.short}-unique-`)))throw Error(`${book.book}: artwork already imported; refusing to overwrite source archive`);
  const bundleFile=path.join(root,'library',`${book.book}.pwb`);
  const bundle=fs.existsSync(bundleFile)?JSON.parse(fs.readFileSync(bundleFile,'utf8')):null;
  const mapIds=new Set(book.mapIds);
  if(new Set(book.slots.map(s=>s.url)).size!==book.slots.length)throw Error(`${book.book}: repeated URL`);
  const now=Date.UTC(2026,9,2);
  const archive={book:book.book,note:'Superseded pre-correction blob metadata. Map blobs remain active; external and embedded non-map bundle blobs were removed.',pwkBlobs:pwk.blobs.filter(b=>!mapIds.has(b.id)),bundleBlobs:(bundle?.blobs||[]).filter(b=>!mapIds.has(b.id)).map(({dataBase64,...b})=>({...b,...(dataBase64?{dataSha256:crypto.createHash('sha256').update(dataBase64).digest('hex')}: {})}))};
  save(path.join(root,'scripts/kingkiller-art',`${book.short}-superseded-blobs.json`),archive);
  const generated=[];
  for(const slot of book.slots){
    if(!fs.existsSync(imagePath(slot.url)))throw Error(`Missing ${slot.url}`);
    const id=`${book.short}-unique-${slot.kind}-${String(slot.index+1).padStart(3,'0')}`;
    const entity=slot.kind==='cover'?pwk.world:slot.kind==='character'?pwk.characters[slot.index]:slot.kind==='item'?pwk.items[slot.index]:pwk.locationMarkers[slot.index];
    if(!entity||entity.id!==slot.entityId)throw Error(`${book.book} ${slot.kind} ${slot.index}: entity changed`);
    entity[slot.kind==='cover'?'coverImageId':slot.kind==='character'?'portraitImageId':'imageId']=id;
    generated.push({id,worldId:pwk.world.id,mimeType:'image/jpeg',url:slot.url,createdAt:now,updatedAt:now});
  }
  pwk.blobs=[...pwk.blobs.filter(b=>mapIds.has(b.id)),...generated];
  if(bundle)bundle.blobs=bundle.blobs.filter(b=>mapIds.has(b.id));
  const available=new Set([...pwk.blobs,...(bundle?.blobs||[])].map(b=>b.id));
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
  if(missing.length)throw Error(`${book.book}: unbound image IDs ${[...new Set(missing)].join(', ')}`);
  save(pwkFile,pwk);
  if(bundle)save(bundleFile,bundle);
  console.log(`${book.book}: ${generated.length} distinct illustrated slots; ${mapIds.size} maps preserved; ${archive.bundleBlobs.length} non-map bundle blobs removed`);
}
