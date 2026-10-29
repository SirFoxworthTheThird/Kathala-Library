import fs from 'node:fs'
import {createRequire}from 'node:module'
const out=new URL('./map-staging/',import.meta.url)
const box=(x,y,w,h,fill='#d7c3a1')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${fill}" stroke="#857257" stroke-width="3"/>`
const text=(x,y,t,size=23)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="#51483c">${t}</text>`
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100">
<rect width="1600" height="1100" fill="#f3ecd9"/>
<g font-family="Georgia,serif">
${text(800,65,'Boulevard de l’Hôpital',41)}
${text(800,108,'The surroundings of the Gorbeau house',25)}
<path d="M90 540 H1510" stroke="#d8d0b8" stroke-width="110"/>
<path d="M285 540 V190 M750 540 V875" stroke="#ded6c0" stroke-width="75"/>
${text(1120,550,'Boulevard de l’Hôpital',28)}
<text x="250" y="360" text-anchor="middle" transform="rotate(-90 250 360)" font-size="24" fill="#5d5344">Rue du Petit-Banquier</text>
<text x="750" y="700" text-anchor="middle" transform="rotate(-90 750 700)" font-size="18" fill="#5d5344">Rue de la Barrière-des-Gobelins</text>
<path d="M180 860 H1470" stroke="#9b927d" stroke-width="20"/>
${text(1145,908,'City wall',27)}${text(370,908,'Toward the barrier',22)}
${box(545,210,220,230)}${text(655,292,'Gorbeau',30)}${text(655,334,'50–52',26)}
${text(655,381,'Narrow street end',19)}
<path d="M590 440 H645" stroke="#f3ecd9" stroke-width="15"/>
${box(365,210,155,235,'#ced1ac')}${box(790,210,155,235,'#ced1ac')}
${text(440,306,'Garden',22)}${text(865,306,'Garden',22)}
${box(1000,215,330,220,'#cbbfa8')}${text(1165,295,'Factory',29)}
${text(1165,338,'A neighboring landmark',19)}
${box(110,205,105,190,'#d4c6ae')}
<path d="M175 270 V445" stroke="#9b8c70" stroke-width="7"/>
${text(160,465,'Low wall',18)}
<path d="M875 610 V805" stroke="#9b8c70" stroke-width="8"/>
${text(960,738,'Deserted wall',20)}
<g fill="#afb594" stroke="#7e896a" stroke-width="2">
<circle cx="560" cy="612" r="24"/><circle cx="630" cy="612" r="29"/><circle cx="700" cy="612" r="22"/>
</g>
<path d="M630 595 V642 M630 600 L617 580 M630 605 L648 584" stroke="#796c52" stroke-width="6"/>
${text(485,685,'Boulevard trees',22)}${text(478,715,'Elm opposite the house',19)}
${box(1060,650,325,140,'#d9d7bb')}${text(1222,710,'Waste ground',27)}
${text(800,1000,'Topological plan: street angles, distances and building footprints are schematic.',22)}
${text(800,1042,'The side street faces the house, and ends at the wall; the boulevard trees stand between them.',19)}
</g></svg>`
const layout={key:'paris-hospital-quarter',width:1600,height:1100,image:'gorbeau-surroundings.webp',
  source:['II.IV.I paragraphs 2–9 and 19–23','III.VIII.X paragraph 18','III.VIII.XIII','III.VIII.XXI paragraph 0'],
  locations:{
    'gorbeau-house':[655,310], 'gorbeau-house-entrance':[618,438],
    'gorbeau-adjoining-boulevard':[655,515], 'gorbeau-police-ambush':[630,650],
    'barriere-gobelins-wall':[880,700],
    'rue-petit-banquier-corner':[285,515], 'rue-petit-banquier-low-wall':[175,350],
    'paris-boulevard-hopital':[1130,515],
  },
}
let sharp
try{sharp=(await import('sharp')).default}catch{
  if(!process.env.SHARP_MODULE_DIR)throw Error('Set SHARP_MODULE_DIR to the installed sharp package directory')
  sharp=createRequire(`${process.env.SHARP_MODULE_DIR.replaceAll('\\','/')}/package.json`)('sharp')
}
fs.writeFileSync(new URL('gorbeau-surroundings.svg',out),svg+'\n')
await sharp(Buffer.from(svg)).webp({quality:93,effort:6}).toFile(new URL('gorbeau-surroundings.webp',out).pathname.replace(/^\/([A-Za-z]:)/,'$1'))
fs.writeFileSync(new URL('gorbeau-surroundings-layout.json',out),JSON.stringify(layout,null,2)+'\n')
console.log('Rendered the boulevard surroundings; app gateway and marker review remain open.')
