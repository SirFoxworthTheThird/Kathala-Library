import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..');
const world=JSON.parse(fs.readFileSync(path.join(root,'library/the-invisible-man.pwk'),'utf8'));
if(world.blobs.some(b=>b.id==='invisible-man-generated-cover'))throw Error('Cover already imported; preserve the original manifest');
const cover={kind:'cover',index:0,entityId:world.world.id,name:'The Invisible Man',description:'A bandaged and goggled stranger arrives at the Coach and Horses in a snowy Sussex village.',url:'library/the-invisible-man/art/generated/cover/001-the-invisible-man.jpg',prompt:'Original literary cover illustration for H. G. Wells’s The Invisible Man. A lone figure in Griffin’s dark Victorian overcoat, broad hat, white face bandages and dark round goggles approaches the warm doorway of the Coach and Horses inn in snowy 1890s Sussex. His face remains hidden; winter light and footprints imply the unsettling experiment. Match the existing book’s naturalistic ink and watercolor portraits on textured paper: muted charcoal, winter blue-grey, lamp amber and wool brown. Vertical cover composition, dramatic but restrained. No ordinary visible face, no title lettering, readable text, logo, signature, watermark, collage, panels, modern objects or film likenesses.'};
const manifest={version:2,note:'The 18 portraits, 10 items and 36 location images were already original artwork in the earlier artwork commit. Only the externally linked cover needs replacement; six functional maps remain.',mapIds:world.mapLayers.map(x=>x.imageId),jobs:[cover]};
fs.writeFileSync(path.join(root,'scripts/the-invisible-man-art/manifest.json'),`${JSON.stringify(manifest,null,2)}\n`);
console.log('One cover image to generate; 64 existing original illustrations and six maps retained');
