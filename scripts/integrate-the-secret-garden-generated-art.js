import fs from'node:fs';import path from'node:path';import{fileURLToPath}from'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),slug='the-secret-garden',prefix='secret-garden-';
const pwkPath=path.join(root,'library',`${slug}.pwk`),indexPath=path.join(root,'library','index.json'),world=JSON.parse(fs.readFileSync(pwkPath)),now=world.world.updatedAt,generated=[];
const add=(id,url)=>{if(!fs.existsSync(path.join(root,...url.split('/'))))throw Error(`Missing asset: ${url}`);generated.push({worldId:world.world.id,createdAt:now,updatedAt:now,id,mimeType:'image/jpeg',url});return id};
const cover=add(`${prefix}image-generated-cover`,`library/${slug}/art/generated/cover.jpg`);world.world.coverImageId=cover;
for(const x of world.characters){const k=x.id.replace(`${prefix}character-`,'');x.portraitImageId=add(`${prefix}image-generated-character-${k}`,`library/${slug}/art/generated/characters/${k}.jpg`)}
for(const x of world.items){const k=x.id.replace(`${prefix}item-`,'');x.imageId=add(`${prefix}image-generated-item-${k}`,`library/${slug}/art/generated/items/${k}.jpg`)}
for(const x of world.locationMarkers){const k=x.id.replace(`${prefix}location-`,'');x.imageId=add(`${prefix}image-generated-location-${k}`,`library/${slug}/art/generated/locations/${k}.jpg`)}
const mapIds=new Set(world.mapLayers.map(x=>x.imageId)),superseded=world.blobs.filter(b=>/^https?:/.test(b.url)&&!mapIds.has(b.id));
fs.writeFileSync(path.join(root,'scripts',slug,'superseded-external-sources.json'),`${JSON.stringify({note:'External non-map illustration blobs superseded by original generated artwork. Retained here as editorial source history.',blobs:superseded},null,2)}\n`);
world.blobs=world.blobs.filter(b=>mapIds.has(b.id));world.blobs.push(...generated);
const lore={
 [`${prefix}lore-garden-history`]:`${prefix}image-generated-character-lilias`,
 [`${prefix}lore-moor-life`]:`${prefix}image-generated-location-moor`,
 [`${prefix}lore-magic`]:`${prefix}image-generated-location-secret-garden`,
 [`${prefix}lore-household`]:`${prefix}image-generated-location-servants-hall`,
 [`${prefix}lore-india`]:`${prefix}image-generated-location-india`,
 [`${prefix}lore-sources`]:cover,
};for(const p of world.lorePages)p.coverImageId=lore[p.id]??p.coverImageId;
const sources=world.lorePages.find(p=>p.id===`${prefix}lore-sources`);if(sources&&!sources.body.includes('original generated illustrations'))sources.body+=' The cover, character portraits, item plates, and location scenes are original generated illustrations created for the Kathala Library edition in a coherent Edwardian style. The four linked historical and editorial maps remain available as spatial aids. Superseded external non-map illustration records are retained with the edition’s integration documentation.';
const serialized=`${JSON.stringify(world,null,2)}\n`;fs.writeFileSync(pwkPath,serialized);
const index=JSON.parse(fs.readFileSync(indexPath)),entry=index.entries.find(e=>e.id===slug);if(!entry)throw Error('Library index entry not found');entry.cover=`library/${slug}/art/generated/cover.jpg`;if(!entry.notice.includes('original generated artwork'))entry.notice+=' Four linked historical and editorial maps are retained, and original generated artwork is documented in Lore.';entry.dataBytes=Buffer.byteLength(serialized);fs.writeFileSync(indexPath,`${JSON.stringify(index,null,2)}\n`);
console.log(JSON.stringify({archived:superseded.length,generated:generated.length,characters:world.characters.length,items:world.items.length,locations:world.locationMarkers.length,maps:mapIds.size},null,2));
