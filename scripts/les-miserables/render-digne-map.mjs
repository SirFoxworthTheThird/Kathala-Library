import fs from 'node:fs'
import { createRequire } from 'node:module'

// A source-based topological plan, not a reconstruction of modern Digne.
// The palace/hospital adjacency and the printing office at the square's corner
// are specified. The relative positions of the other stops are editorial.
const out = new URL('./map-staging/', import.meta.url)
const box = (x,y,w,h,fill='#dac7a8') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${fill}" stroke="#817056" stroke-width="3"/>`
const label = (x,y,t,size=23) => `<text x="${x}" y="${y}" text-anchor="middle" fill="#4c4438" font-size="${size}">${t}</text>`
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200">
<rect width="1600" height="1200" fill="#f4ecd9"/>
<g font-family="Georgia,serif">
${label(800,65,'Digne',42)}
${label(800,108,'Town and cathedral quarter',24)}
<path d="M105 1030 V270 Q105 170 220 170 H1390 Q1495 170 1495 280 V1010" fill="none" stroke="#a49a84" stroke-width="20"/>
<path d="M235 970 L340 810 L480 780 L655 850 L830 740 L960 630 L1230 630 L1320 800 L1240 1000 M960 630 L925 420 M960 630 L745 520 L420 490 L275 380" fill="none" stroke="#ded5bd" stroke-width="67" stroke-linejoin="round"/>
<path d="M235 970 L340 810 L480 780 L655 850 L830 740 L960 630 L1230 630 L1320 800 L1240 1000 M960 630 L925 420 M960 630 L745 520 L420 490 L275 380" fill="none" stroke="#b9aa8e" stroke-width="3" stroke-dasharray="8 9"/>
${box(760,330,360,160,'#e6dcc4')}${label(940,385,'Cathedral',30)}${label(940,425,'and its square',24)}
${box(1125,350,290,150)}${label(1270,390,'One-storey house',25)}${label(1270,427,'Small garden',22)}
${box(1125,190,290,145,'#d5c5a6')}${label(1270,235,'Episcopal palace',25)}${label(1270,272,'Large gallery and garden',20)}
${box(1020,530,230,145)}${label(1135,578,'Printing office',25)}${label(1135,613,'Stone bench at the door',18)}
${box(720,650,200,130)}${label(820,699,'Prefecture',25)}
${box(520,540,180,120)}${label(610,585,'Drawing room',22)}${label(610,615,'Town society',18)}
${box(325,280,270,150)}${label(460,330,'Cross of Colbas',26)}${label(460,367,'Inn and kitchen',21)}
${box(190,535,250,145)}${label(315,580,'Chaffaut',27)}${label(315,616,'Public house',23)}
${box(500,880,210,125)}${label(605,928,'Prison',28)}${label(605,963,'Door and cell',20)}
${box(780,870,235,135)}${label(898,919,'Artisan’s house',25)}${label(898,954,'Family supper',21)}
${box(1130,840,260,125,'#d7d5b2')}${label(1260,889,'Garden and kennel',23)}
${label(265,1018,'Town approaches',24)}${label(1300,1035,'Breach and outskirts',24)}
${label(800,1102,'Schematic streets and positions; no scale or cardinal orientation is asserted.',22)}
${label(800,1140,'The source fixes the palace beside the hospital, and the printing office at the square’s corner.',19)}
</g></svg>`

const layout = { key:'digne', width:1600, height:1200, image:'digne.webp',
  source:['I.I.II paragraphs 0–23','I.I.VI','I.II.I paragraphs 5–134'],
  locations: {
    digne:[960,630], 'digne-palace':[1270,270], 'digne-palace-gallery':[1220,260],
    'digne-hospital':[1370,430], 'digne-bishop-house-gateway':[1270,470],
    'digne-cathedral':[940,390], 'digne-cathedral-door':[925,470],
    'digne-printing-office-door':[1080,650], 'digne-prefecture-dining-room':[820,725],
    'cross-colbas':[460,380], 'cross-colbas-kitchen':[540,325],
    'chaffaut-public-house':[315,615], 'digne-prison-door':[605,985], 'digne-prison-cell':[650,930],
    'digne-artisan-house':[898,940], 'digne-kennel-garden':[1260,925],
    'digne-drawing-room':[610,615], 'digne-outskirts':[1300,1010],
    'digne-civic-setting':[750,900],
  },
}
let sharp
try { sharp=(await import('sharp')).default } catch {
  if(!process.env.SHARP_MODULE_DIR) throw Error('Set SHARP_MODULE_DIR to the installed sharp package directory')
  sharp=createRequire(`${process.env.SHARP_MODULE_DIR.replaceAll('\\','/')}/package.json`)('sharp')
}
fs.writeFileSync(new URL('digne.svg',out),`${svg}\n`)
await sharp(Buffer.from(svg)).webp({quality:93,effort:6}).toFile(new URL('digne.webp',out).pathname.replace(/^\/([A-Za-z]:)/,'$1'))
fs.writeFileSync(new URL('digne-layout.json',out),`${JSON.stringify(layout,null,2)}\n`)
console.log('Rendered the Digne topological map candidate; source, marker and app review remain required.')
