import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const slug='the-odyssey';
const pwkPath=path.join(root,'library',`${slug}.pwk`);
const indexPath=path.join(root,'library/index.json');
const world=JSON.parse(fs.readFileSync(pwkPath,'utf8'));
const index=JSON.parse(fs.readFileSync(indexPath,'utf8'));
const mapIds=new Set(world.mapLayers.map(map=>map.imageId));
if(mapIds.size!==4)throw Error(`Expected four map layers, got ${mapIds.size}`);
const art=world.blobs.filter(blob=>blob.id.startsWith('odyssey-image-art-'));
if(art.length!==31)throw Error(`Expected 31 illustration records, got ${art.length}`);
const archived=art.map(blob=>({...blob}));
for(const blob of art){
  const key=blob.id.slice('odyssey-image-art-'.length);
  const filename=key==='homecoming'?'cover':key;
  const url=`library/${slug}/art/generated/${filename}.jpg`;
  if(!fs.existsSync(path.join(root,...url.split('/'))))throw Error(`Missing generated image ${url}`);
  blob.url=url;
  blob.mimeType='image/jpeg';
  blob.updatedAt=world.world.updatedAt;
}
const sourcePage=world.lorePages.find(page=>page.title==='Text, Translation, and Book Titles');
if(!sourcePage)throw Error('Source lore page missing');
sourcePage.body=sourcePage.body.replace('Linked artwork and maps are public-domain images from Wikimedia Commons.','The 31 narrative illustrations are original generated artwork. Four linked historical and editorial maps remain for geographic reference; superseded illustration source records are archived with the integration documentation.');
const archivePath=path.join(root,'scripts',slug,'superseded-illustration-sources.json');
fs.writeFileSync(archivePath,`${JSON.stringify({note:'The original cover and 30 external narrative illustration records superseded by original generated artwork. Four map layers retain their linked sources.',blobs:archived},null,2)}\n`);
const serialized=`${JSON.stringify(world,null,2)}\n`;
fs.writeFileSync(pwkPath,serialized);
const entry=index.entries.find(item=>item.id===slug);
if(!entry)throw Error('Catalogue entry missing');
entry.cover=`library/${slug}/art/generated/cover.jpg`;
entry.dataBytes=Buffer.byteLength(serialized);
fs.writeFileSync(indexPath,`${JSON.stringify(index,null,2)}\n`);
console.log(JSON.stringify({generated:art.length,archived:archived.length,maps:mapIds.size,dataBytes:entry.dataBytes},null,2));
