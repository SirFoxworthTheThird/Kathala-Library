import fs from 'node:fs'
import {createRequire} from 'node:module'

const out=new URL('./map-staging/',import.meta.url)
const box=(x,y,w,h,fill='#ebdec6')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#796b55" stroke-width="3"/>`
const text=(x,y,t,size=22)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="#4e463b">${t}</text>`
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
<rect width="1600" height="1000" fill="#f5eddb"/>
<g font-family="Georgia,serif">
${text(800,60,'Gorbeau House — Lodgings',39)}
${text(800,105,'Rooms reached by the steep stair from the boulevard',23)}
${text(365,160,'The two-room lodging',27)}${text(1100,160,'The adjoining garrets',27)}
${box(100,190,365,340)}${box(465,190,165,340,'#e2d8c2')}
${text(280,240,'Main chamber',26)}${text(548,230,'Small',22)}${text(548,260,'chamber',22)}
${box(135,280,175,65,'#c7b392')}${text(222,321,'Mattress',20)}
${box(335,300,80,65,'#d1b590')}${text(375,342,'Table',18)}
${box(350,425,60,65,'#b0a18b')}${text(280,463,'Stove',20)}
${box(490,310,110,60,'#c7b392')}${text(546,410,'Folding bed',18)}
<path d="M465 410 V465 M235 530 H315" stroke="#f5eddb" stroke-width="14"/>
${box(100,530,530,90,'#ded5bd')}${text(365,583,'Corridor',25)}
${box(100,620,310,165,'#e9e2d2')}${text(255,685,'Unoccupied room',24)}
<path d="M235 620 H315" stroke="#f5eddb" stroke-width="15"/>
${box(450,660,180,125,'#d3c6ad')}
<path d="M465 677 H615 M465 695 H615 M465 713 H615 M465 731 H615 M465 749 H615 M465 767 H615" stroke="#958165" stroke-width="3"/>
${text(545,825,'Steep stair',22)}
${box(735,190,230,470)}${box(965,190,500,470)}
${text(850,240,'Small garret',23)}${text(1195,240,'Large garret',27)}
${box(840,325,85,95,'#c7ae89')}${text(830,460,'Commode',20)}
${box(1280,350,120,120,'#aa9780')}${text(1340,419,'Hearth',19)}
${box(1290,250,90,100,'#c5b191')}${text(1210,325,'Pallet',19)}
${box(1290,470,90,130,'#c5b191')}${text(1210,555,'Pallet',19)}
${box(1090,405,120,75,'#ccb18c')}${text(1150,451,'Table',19)}
<path d="M1220 190 H1370" stroke="#7e9d9a" stroke-width="13"/>
${text(1360,172,'Dormer',18)}
${box(735,660,730,100,'#ded5bd')}${text(1100,721,'Corridor outside both doors',24)}
<path d="M820 660 H890 M1050 660 H1125" stroke="#f5eddb" stroke-width="16"/>
${text(800,890,'Separate source-described arrangements; their positions relative to one another are not given.',22)}
${text(800,932,'Diagrammatic details of the lodging and the garrets, rather than a measured plan of the whole building.',19)}
</g></svg>`

const layout={key:'gorbeau-lodgings',width:1600,height:1000,image:'gorbeau-lodgings.webp',
  source:['II.IV.I paragraphs 5–7','II.IV.II paragraphs 1–2','II.IV.IV paragraphs 5–8','III.VIII.V paragraphs 6–8','III.VIII.VI paragraphs 2–7','III.VIII.XV paragraph 32'],
  locations:{
    'gorbeau-valjean-rooms':[300,400], 'gorbeau-early-corridor':[365,575],
    'gorbeau-cosette-chamber':[550,450],
    'gorbeau-unoccupied-room':[255,700],
    'gorbeau-marius-room':[850,510], 'gorbeau-marius-doorway':[850,660],
    'gorbeau-jondrette-attic':[1120,550], 'gorbeau-house-corridor':[1125,710],
    'gorbeau-partition-aperture':[955,300],
  },
}
let sharp
try{sharp=(await import('sharp')).default}catch{
  if(!process.env.SHARP_MODULE_DIR)throw Error('Set SHARP_MODULE_DIR to the installed sharp package directory')
  sharp=createRequire(`${process.env.SHARP_MODULE_DIR.replaceAll('\\','/')}/package.json`)('sharp')
}
fs.writeFileSync(new URL('gorbeau-lodgings.svg',out),svg+'\n')
await sharp(Buffer.from(svg)).webp({quality:93,effort:6}).toFile(new URL('gorbeau-lodgings.webp',out).pathname.replace(/^\/([A-Za-z]:)/,'$1'))
fs.writeFileSync(new URL('gorbeau-layout.json',out),JSON.stringify(layout,null,2)+'\n')
console.log('Rendered Gorbeau lodging details; parent map and app review remain open.')
