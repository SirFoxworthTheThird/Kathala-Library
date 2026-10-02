import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..');
const specs=[['the-name-of-the-wind','notw'],['the-wise-man-s-fear','wmf']];
const preferred={
  notw:{worldRoad:['cover','cover'],eolian:['location','The Eolian'],dan10:['location','Archives'],dan16:['location','Denner Bluffs'],dan01:['location','Waystone Inn'],dan06:['location','Dockside Tavern'],dan02:['location','Edema Ruh Road Camp'],dan14:['location','Fishery'],dan19:['location','Forest Road'],dan08:['location','Greystone Hill'],elodinCourt:['location','House of the Wind'],university:['location','University and Imre'],dan07:['location','Troupe Massacre Site'],dan09:['location',"Masters' Hall"],dan17:['location','Mauthen Farm'],dan11:['location','Haven'],tarbean:['location','Tarbean'],dan15:['location','Tarbean Rooftops'],dan05:['location','Waterside'],underthing:['location','The Underthing'],draccus:['character','Black Draccus'],dan18:['location','Trebon'],dan20:['location','Underthing Entrance']},
  wmf:{waystone:['location','Waystone Inn'],university:['location','University and Imre'],auri:['character','Auri'],trebon:['location','Trebon'],troupe:['location','Edema Ruh Road Camp'],wind:['location','House of the Wind'],tarbean:['location','Tarbean'],cthaeh:['character','The Cthaeh'],skarpi:['character','Skarpi'],simmon:['character','Simmon'],bast:['character','Bast'],wilem:['character','Wilem'],lateVisit:['location','Mercenary Camp in the Eld'],fela:['character','Fela'],devi:['character','Devi'],road:['location','Great Stone Road'],underthing:['location','The Underthing'],laurian:['character','Laurian'],eolian:['location','The Eolian'],draccus:['character','Black Draccus'],cinder:['character','Cinder'],calling:['location','Fishery'],ambrose:['character','Ambrose Jakis'],mola:['character','Mola'],stanchion:['character','Stanchion'],denna:['character','Denna'],wmf01:['cover','cover'],arliden:['character','Arliden'],deoch:['character','Deoch'],archives:['location','Archives'],tehlu:['character','Tehlu'],abenthy:['character','Abenthy'],haliax:['character','Haliax'],kvothe:['character','Kvothe'],meluan:['character','Meluan Lackless'],wmf02:['location','Ademre and Haert'],auriScene:['item',"Auri's Dress"]}
};
const norm=s=>s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const slug=s=>norm(s).replace(/\s+/g,'-').slice(0,48)||'image';
const books=specs.map(([book,short])=>{
  const pwk=JSON.parse(fs.readFileSync(path.join(root,'library',`${book}.pwk`),'utf8'));
  if(pwk.blobs.some(blob=>blob.id.startsWith(`${short}-unique-`)))throw Error(`${book}: manifest was built from the original PWK and cannot be rebuilt after import`);
  const ownBlobs=new Map(pwk.blobs.map(blob=>[blob.id,blob]));
  const bundlePath=path.join(root,'library',`${book}.pwb`);
  const bundle=fs.existsSync(bundlePath)?JSON.parse(fs.readFileSync(bundlePath,'utf8')):null;
  const blobs=new Map([...(bundle?.blobs||[]),...pwk.blobs].map(blob=>[blob.id,blob]));
  const slots=[];
  const add=(kind,index,entity,imageId)=>slots.push({book,short,kind,index,entityId:entity.id||'world',name:kind==='cover'?'cover':entity.name,description:entity.description||'',oldImageId:imageId,action:'generate',url:null});
  add('cover',0,pwk.world,pwk.world.coverImageId);
  pwk.characters.forEach((entity,i)=>add('character',i,entity,entity.portraitImageId));
  pwk.items.forEach((entity,i)=>add('item',i,entity,entity.imageId));
  pwk.locationMarkers.forEach((entity,i)=>add('location',i,entity,entity.imageId));
  return {book,short,pwk,ownBlobs,bundle,blobs,slots};
});
for(const b of books){
  const groups=new Map();
  for(const slot of b.slots){if(!groups.has(slot.oldImageId))groups.set(slot.oldImageId,[]);groups.get(slot.oldImageId).push(slot);}
  const mapIds=new Set(b.pwk.mapLayers.map(x=>x.imageId));
  for(const [imageId,slots] of groups){
    if(mapIds.has(imageId))continue;
    const blob=b.blobs.get(imageId);
    if(!blob?.url?.includes('/art/generated/')||!fs.existsSync(path.join(root,...blob.url.split('/'))))continue;
    const key=path.basename(blob.url,path.extname(blob.url));
    const pref=preferred[b.short][key];
    let keeper=slots.find(s=>pref&&s.kind===pref[0]&&norm(s.name)===norm(pref[1]));
    if(!keeper)keeper=slots.find(s=>s.kind==='cover')||slots.find(s=>s.kind==='location')||slots[0];
    keeper.action='keep';keeper.url=blob.url;
  }
}
const sourceFor=(slot)=>books.find(b=>b.book===slot.book);
const used=new Map(books.map(b=>[b.book,new Set(b.slots.filter(s=>s.url).map(s=>s.url))]));
const slotKey=s=>`${s.kind}:${norm(s.name)}`;
for(const b of books){
  const other=books.find(x=>x!==b);
  for(const slot of b.slots.filter(s=>s.action==='generate')){
    const candidate=other.slots.find(s=>s.action==='keep'&&slotKey(s)===slotKey(slot)&&!used.get(b.book).has(s.url));
    if(candidate){slot.action='reuse';slot.url=candidate.url;used.get(b.book).add(slot.url);}
  }
}
for(const b of books){
  for(const slot of b.slots.filter(s=>s.action==='generate')){
    const other=books.find(x=>x!==b);
    const candidate=other.slots.find(s=>s.action==='generate'&&slotKey(s)===slotKey(slot));
    const filename=`${String(slot.index+1).padStart(3,'0')}-${slug(slot.name)}.jpg`;
    slot.url=`library/${b.book}/art/generated/unique/${slot.kind}/${filename}`;
    slot.action='make';used.get(b.book).add(slot.url);
    if(candidate&&!used.get(other.book).has(slot.url)){
      candidate.action='reuse';candidate.url=slot.url;used.get(other.book).add(slot.url);
    }
  }
}
for(const b of books){
  if(b.slots.some(s=>!s.url))throw Error(`${b.book}: unassigned slot`);
  if(new Set(b.slots.map(s=>s.url)).size!==b.slots.length)throw Error(`${b.book}: duplicate URL assignment`);
}
const all=books.flatMap(b=>b.slots);
const jobs=all.filter(s=>s.action==='make').map(s=>({book:s.book,kind:s.kind,index:s.index,name:s.name,description:s.description,url:s.url,prompt:`Original ${s.kind==='character'?'character portrait':s.kind==='item'?'focused object illustration':'establishing location illustration'} for ${s.book==='the-name-of-the-wind'?'The Name of the Wind':"The Wise Man's Fear"}. ${s.name}. ${s.description} Distinct original visual interpretation, not a reproduction of published book art. Hand-painted ink and watercolor on textured paper, deep indigo, warm amber, muted burgundy and moss green, preindustrial fantasy materials. One coherent scene, no typography, no collage, no panels.`}));
const manifest={version:1,note:'Every cover, character, item and location slot receives a distinct image URL within its book. Exact corresponding subjects may reuse generated art across books. Map layers remain functional.',books:books.map(b=>({book:b.book,short:b.short,mapIds:b.pwk.mapLayers.map(x=>x.imageId),slots:b.slots})),jobs};
fs.writeFileSync(path.join(root,'scripts/kingkiller-art/manifest.json'),`${JSON.stringify(manifest,null,2)}\n`);
console.log(JSON.stringify({books:books.map(b=>({book:b.book,slots:b.slots.length,...Object.fromEntries(['keep','reuse','make'].map(action=>[action,b.slots.filter(s=>s.action===action).length]))})),newImages:jobs.length},null,2));
