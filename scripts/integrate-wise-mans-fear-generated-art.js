import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const slug='the-wise-man-s-fear';
const pwkPath=path.join(root,'library',`${slug}.pwk`);
const indexPath=path.join(root,'library/index.json');
const world=JSON.parse(fs.readFileSync(pwkPath,'utf8'));
const index=JSON.parse(fs.readFileSync(indexPath,'utf8'));
const mapIds=new Set(world.mapLayers.map(map=>map.imageId));
if(mapIds.size!==11)throw Error(`Expected eleven map layers, got ${mapIds.size}`);
const art=world.blobs.filter(blob=>blob.id.startsWith('wmf-illustration-'));
if(art.length!==37)throw Error(`Expected 37 illustration records, got ${art.length}`);
const archived=art.map(blob=>({...blob}));
for(const blob of art){
  const key=blob.id.slice('wmf-illustration-'.length);
  const url=`library/${slug}/art/generated/${key}.jpg`;
  if(!fs.existsSync(path.join(root,...url.split('/'))))throw Error(`Missing generated image ${url}`);
  blob.url=url;
  blob.mimeType='image/jpeg';
  blob.updatedAt=world.world.updatedAt;
}
const notePage=world.lorePages.find(page=>page.title==='About the Local Maps');
if(!notePage)throw Error('Maps lore page missing');
const note=' The 37 non-map illustrations in this reference are original generated artwork. Their superseded external image links are archived with the integration documentation. The eleven linked map layers remain available for geographic reference.';
if(!notePage.body.includes('37 non-map illustrations'))notePage.body+=note;
fs.writeFileSync(path.join(root,'scripts',slug,'superseded-illustration-sources.json'),`${JSON.stringify({note:'External non-map image source records superseded by original generated artwork. Eleven map layers remain linked.',blobs:archived},null,2)}\n`);
const serialized=`${JSON.stringify(world,null,2)}\n`;
fs.writeFileSync(pwkPath,serialized);
const entry=index.entries.find(item=>item.id===slug);
if(!entry)throw Error('Catalogue entry missing');
entry.cover=`library/${slug}/art/generated/wmf01.jpg`;
entry.dataBytes=Buffer.byteLength(serialized);
fs.writeFileSync(indexPath,`${JSON.stringify(index,null,2)}\n`);
console.log(JSON.stringify({generated:art.length,archived:archived.length,maps:mapIds.size,dataBytes:entry.dataBytes},null,2));
