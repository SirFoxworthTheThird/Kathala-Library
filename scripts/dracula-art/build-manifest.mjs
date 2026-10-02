import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..');
const world=JSON.parse(fs.readFileSync(path.join(root,'library/dracula.pwk'),'utf8'));
if(world.blobs.some(b=>b.id.startsWith('dracula-generated-')))throw Error('Artwork already imported; preserve the original manifest');
const slug=s=>s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,55);
const subjects=[
  {kind:'cover',index:0,entity:world.world,name:'Dracula',description:'Gothic vampire novel, 1897; Castle Dracula and the journey from Transylvania to England.'},
  ...world.characters.map((entity,index)=>({kind:'character',index,entity,name:entity.name,description:entity.description||''})),
  ...world.items.map((entity,index)=>({kind:'item',index,entity,name:entity.name,description:entity.description||''})),
  ...world.locationMarkers.map((entity,index)=>({kind:'location',index,entity,name:entity.name,description:entity.description||''})),
];
const scene={cover:'A single striking Gothic cover illustration, Castle Dracula high in the Carpathians at dusk, one small traveler on the road, forbidding sky; no lettering.',character:'A character portrait with face, costume, and period setting appropriate to the description. For a named group, depict the group together.',item:'A focused still life of the specified object with period-correct materials and context.',location:'An establishing view of the specified place. Make the exact described room, site, or route recognizable rather than a generic castle or town.'};
const jobs=subjects.map(({kind,index,entity,name,description})=>({kind,index,entityId:entity.id,name,description,url:`library/dracula/art/generated/${kind}/${String(index+1).padStart(3,'0')}-${slug(name)}.jpg`,prompt:`Original illustration for Bram Stoker's Dracula. ${name}. ${description} ${scene[kind]} Late Victorian 1890s historical detail, Gothic atmosphere, hand-painted ink and watercolor on textured paper, charcoal black, aged ivory, oxblood red, fog grey, and muted sepia. One coherent composition, no typography, no collage, no panels, no film likenesses, no reproduction of published book art.`}));
const manifest={version:1,note:'One distinct original image for every cover, character, item and location slot; functional map layers retained.',mapIds:world.mapLayers.map(x=>x.imageId),jobs};
fs.writeFileSync(path.join(root,'scripts/dracula-art/manifest.json'),`${JSON.stringify(manifest,null,2)}\n`);
console.log(`${jobs.length} illustration jobs; ${manifest.mapIds.length} functional maps retained`);
