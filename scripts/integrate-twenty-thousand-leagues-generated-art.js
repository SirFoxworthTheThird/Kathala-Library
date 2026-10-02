import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const slug='twenty-thousand-leagues-under-the-seas';
const prefix=`${slug}-`;
const pwkPath=path.join(root,'library',`${slug}.pwk`);
const indexPath=path.join(root,'library/index.json');
const world=JSON.parse(fs.readFileSync(pwkPath,'utf8'));
const index=JSON.parse(fs.readFileSync(indexPath,'utf8'));
const now=world.world.updatedAt;
const generated=[];
function add(kind,key,folder=''){
  const id=`${prefix}image-generated-${kind}${key?`-${key}`:''}`;
  const url=`library/${slug}/art/generated/${folder}${key||'cover'}.jpg`;
  if(!fs.existsSync(path.join(root,...url.split('/'))))throw Error(`Missing asset: ${url}`);
  generated.push({id,worldId:world.world.id,mimeType:'image/jpeg',url,createdAt:now,updatedAt:now});
  return id;
}
const cover=add('cover','');
world.world.coverImageId=cover;
for(const entity of world.characters)entity.portraitImageId=add('character',entity.id.replace(`${prefix}char-`,''),'characters/');
for(const entity of world.items)entity.imageId=add('item',entity.id.replace(`${prefix}item-`,''),'items/');
const mapIds=new Set(world.mapLayers.map(map=>map.imageId));
for(const entity of world.locationMarkers){
  if(mapIds.has(entity.imageId))continue;
  entity.imageId=add('location',entity.id.replace(`${prefix}loc-`,''),'locations/');
}
const superseded=world.blobs.filter(blob=>/^https?:/.test(blob.url)&&!mapIds.has(blob.id));
if(superseded.length!==120)throw Error(`Expected 120 superseded illustration sources, got ${superseded.length}`);
fs.writeFileSync(path.join(root,'scripts',slug,'superseded-external-sources.json'),`${JSON.stringify({note:'External non-map illustration source records superseded by original generated artwork. Four functional maps remain linked in the PWK.',blobs:superseded},null,2)}\n`);
world.blobs=world.blobs.filter(blob=>mapIds.has(blob.id));
world.blobs.push(...generated);
const image=(kind,key)=>`${prefix}image-generated-${kind}-${key}`;
const loreCovers=[
  cover,image('item','nautilus-plans'),image('location','engine-room'),`${prefix}image-map-route-one`,
  image('character','conseil'),image('character','nemo'),image('location','coral-cemetery'),
  image('character','aronnax'),image('character','papuan-chief'),image('location','vigo'),
  image('location','south-pole'),image('item','organ'),
];
if(world.lorePages.length!==loreCovers.length)throw Error('Lore inventory changed');
world.lorePages.forEach((page,i)=>{page.coverImageId=loreCovers[i]});
const factionCovers=new Map([
  [`${prefix}faction-nautilus`,image('location','nautilus-entrance')],
  [`${prefix}faction-captives`,image('character','aronnax')],
  [`${prefix}faction-lincoln`,image('character','farragut')],
  [`${prefix}faction-surface-powers`,image('location','north-atlantic')],
]);
for(const faction of world.factions){const id=factionCovers.get(faction.id);if(!id)throw Error(`Unmapped faction ${faction.id}`);faction.coverImageId=id}
const sourcePage=world.lorePages.find(page=>page.title==='Text, Maps, and Illustrations');
if(!sourcePage)throw Error('Source lore page missing');
const note=' This edition adds 103 original generated illustrations: the cover, every character, every item, and each location except two route-chart markers that retain their historical map images. Four linked editorial maps remain available for route and deck reference. One hundred twenty superseded external non-map illustration source records are archived with the integration documentation.';
if(!sourcePage.body.includes('original generated illustrations'))sourcePage.body+=note;
const serialized=`${JSON.stringify(world,null,2)}\n`;
fs.writeFileSync(pwkPath,serialized);
const entry=index.entries.find(item=>item.id===slug);
if(!entry)throw Error('Catalogue entry missing');
entry.cover=`library/${slug}/art/generated/cover.jpg`;
entry.dataBytes=Buffer.byteLength(serialized);
entry.notice=entry.notice.replace('Linked maps and public-domain illustrations are recorded in Lore.','The original generated illustrations, four retained maps, and archived public-domain illustration sources are recorded in Lore.');
fs.writeFileSync(indexPath,`${JSON.stringify(index,null,2)}\n`);
console.log(JSON.stringify({generated:generated.length,archived:superseded.length,maps:mapIds.size,dataBytes:entry.dataBytes},null,2));
