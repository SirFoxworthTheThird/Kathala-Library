import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const slug='the-woman-in-white';
const prefix='woman-in-white-';
const pwkPath=path.join(root,'library',`${slug}.pwk`);
const indexPath=path.join(root,'library','index.json');
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
for(const entity of world.characters)entity.portraitImageId=add('character',entity.id.replace(`${prefix}character-`,''),'characters/');
for(const entity of world.items)entity.imageId=add('item',entity.id.replace(`${prefix}item-`,''),'items/');
for(const entity of world.locationMarkers)entity.imageId=add('location',entity.id.replace(`${prefix}location-`,''),'locations/');

const mapIds=new Set(world.mapLayers.map(map=>map.imageId));
const superseded=world.blobs.filter(blob=>/^https?:/.test(blob.url)&&!mapIds.has(blob.id));
if(superseded.length!==60)throw Error(`Expected 60 superseded illustration sources, found ${superseded.length}`);
fs.writeFileSync(path.join(root,'scripts',slug,'superseded-external-sources.json'),`${JSON.stringify({note:'External non-map illustration source records superseded by original generated artwork. Five functional historical maps remain linked in the PWK.',blobs:superseded},null,2)}\n`);
world.blobs=world.blobs.filter(blob=>mapIds.has(blob.id));
world.blobs.push(...generated);

const image=(kind,key)=>`${prefix}image-generated-${kind}-${key}`;
const loreCovers=[
  image('item','marian-diary'),image('item','settlement'),image('location','asylum'),
  image('location','limmeridge-house'),image('location','blackwater-house'),cover,
];
if(world.lorePages.length!==loreCovers.length)throw Error('Lore inventory changed');
world.lorePages.forEach((page,i)=>{page.coverImageId=loreCovers[i]});
const factionCovers=new Map([
  [`${prefix}faction-investigators`,image('character','marian')],
  [`${prefix}faction-conspiracy`,image('character','fosco')],
  [`${prefix}faction-brotherhood`,image('item','brotherhood-mark')],
]);
for(const faction of world.factions){const id=factionCovers.get(faction.id);if(!id)throw Error(`Unmapped faction ${faction.id}`);faction.coverImageId=id}
const sourcePage=world.lorePages.find(page=>page.title==='Text, Maps, and Illustrations');
if(!sourcePage)throw Error('Source lore page missing');
sourcePage.body=sourcePage.body.replace('Linked illustrations come from the 1875 Polo edition and Thomas Eyre Macklin; map layers are historical editorial aids, not exact plans of fictional estates.','The former linked illustrations from the 1875 Polo edition and Thomas Eyre Macklin are archived in the integration source record; map layers are historical editorial aids, not exact plans of fictional estates.');
const note=' The cover, all character portraits, item plates, and location scenes in this edition are original generated illustrations in a coherent mid-Victorian visual style. The five linked historical maps remain available for geography. Sixty superseded external non-map illustration source records are archived with the integration documentation.';
if(!sourcePage.body.includes('original generated illustrations'))sourcePage.body+=note;

const serialized=`${JSON.stringify(world,null,2)}\n`;
fs.writeFileSync(pwkPath,serialized);
const entry=index.entries.find(item=>item.id===slug);
if(!entry)throw Error('Catalogue entry missing');
entry.cover=`library/${slug}/art/generated/cover.jpg`;
entry.dataBytes=Buffer.byteLength(serialized);
entry.notice=entry.notice.replace('Historical maps and public-domain book illustrations are linked in the file.','Five historical maps remain linked in the file; superseded public-domain illustration sources are archived.');
if(!entry.notice.includes('original generated illustrations'))entry.notice+=' The original generated illustrations and five retained historical maps are documented in Lore.';
fs.writeFileSync(indexPath,`${JSON.stringify(index,null,2)}\n`);
console.log(JSON.stringify({generated:generated.length,archived:superseded.length,maps:mapIds.size,dataBytes:entry.dataBytes},null,2));
