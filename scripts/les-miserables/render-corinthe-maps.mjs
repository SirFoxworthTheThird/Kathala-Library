import fs from 'node:fs'
import { createRequire } from 'node:module'

// Source: IV.XII.I, IV.XII.III–V and V.I.XXIV. These are topological
// schematics. Street angles, room dimensions and furniture positions are not
// surveys. No barricade, corpse or hidden escape is painted into an early map.
const out = new URL('./map-staging/', import.meta.url)
fs.mkdirSync(out, { recursive: true })
const text = (x, y, s, size = 23, color = '#453d32') => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${color}">${s}</text>`
const rect = (x,y,w,h,fill='#e3d8c4',stroke='#85745c') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="4"/>`
const frame = (title, subtitle, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1000" viewBox="0 0 1400 1000"><rect width="1400" height="1000" fill="#f5eddd"/><rect x="24" y="24" width="1352" height="952" rx="8" fill="none" stroke="#ab9676" stroke-width="3"/><g font-family="Georgia,serif">${text(700,76,title,36)}${text(700,113,subtitle,20,'#786950')}${body}${text(700,927,'Editorial schematic • not measured • no cardinal orientation asserted',20,'#786950')}${text(700,956,'Room arrangement and local street angles are schematic; use the named connections.',17,'#786950')}</g></svg>`

const streets = frame('The Chanvrerie Streets', 'From Rue Saint-Denis to the narrow branches beside Corinthe', `
  ${rect(280,175,625,235)}${rect(280,690,330,150)}
  ${rect(1110,175,170,665)}
  <path d="M160,170 H280 V440 L960,520 V165 H1040 V520 H1110 V610 H1040 V850 H960 V610 L280,680 V845 H160 Z" fill="#e6dfcf" stroke="#b1a991" stroke-width="3"/>
  ${rect(650,650,300,190,'#d4b68a','#70573f')}
  ${text(800,725,'Corinthe',31)}${text(800,760,'Wine-shop',21)}
  ${text(540,535,'Rue de la Chanvrerie',26)}
  <text x="195" y="515" text-anchor="middle" transform="rotate(-90 195 515)" font-size="23" fill="#514b41">Rue Saint-Denis</text>
  <text x="1010" y="335" text-anchor="middle" transform="rotate(-90 1010 335)" font-size="23" fill="#514b41">Rue Mondétour</text>
  ${text(1000,151,'Toward Rue des Prêcheurs',18)}
  ${text(1000,878,'Toward Rue du Cygne / Petite-Truanderie',19)}
  <text x="1195" y="505" text-anchor="middle" transform="rotate(-90 1195 505)" font-size="21" fill="#655846">Tall houses at the closed end</text>
  ${text(580,295,'Close-set houses',27)}${text(580,330,'Narrow, irregular approaches',20)}
  ${text(455,770,'Houses',24)}
`)

const ground = frame('Corinthe — Ground Floor', 'Tap-room, kitchen and the two ways between levels', `
  ${rect(170,230,700,570,'#efe1c9','#655641')}
  ${rect(870,230,360,570,'#e3d8bf','#655641')}
  ${text(520,285,'Tap-room',31)}${text(1050,285,'Kitchen',31)}
  ${rect(240,360,240,60,'#b7956c','#795c3c')}${text(360,399,'Counter',22)}
  <circle cx="570" cy="380" r="14" fill="#806447"/>${text(650,385,'Support post',19)}
  ${rect(280,520,220,100,'#d9bd91','#957851')}${text(390,581,'Tables',23)}
  <circle cx="730" cy="600" r="62" fill="#dbc6a4" stroke="#866c4b" stroke-width="4"/>
  <path d="M730,540 C800,540 800,660 730,660 C675,660 675,570 730,570 C765,570 765,630 730,630" fill="none" stroke="#866c4b" stroke-width="4"/>
  ${text(720,700,'Wooden spiral stair',21)}${text(720,728,'To the billiard room',18)}
  ${rect(240,675,145,70,'#c6baa6','#796a55')}${text(312,716,'Cellar trap',18)}
  ${rect(945,400,205,130,'#b4a58f','#82725a')}${text(1048,475,'Hearth',22)}
  <path d="M865,535 H875 M470,795 H570" stroke="#f5eddd" stroke-width="18"/>
  ${text(520,840,'Street entrance',23)}
  ${text(700,886,'The source gives the rooms and stairs, not their exact positions.',20,'#786950')}
`)

const first = frame('Corinthe — First Floor', 'The large billiard room above the tap-room', `
  ${rect(190,230,1020,560,'#efe1c9','#655641')}
  ${text(700,285,'Billiard room',32)}
  ${rect(505,340,390,180,'#839786','#586d5d')}
  ${rect(525,360,350,140,'#a6b69d','#758873')}${text(700,440,'Billiard table',25)}
  <path d="M660,790 H740" stroke="#7c9d9a" stroke-width="15"/>
  ${text(700,831,'Single narrow street-facing window',23)}
  ${rect(270,655,190,65,'#d7ba91','#96764e')}${text(365,698,'Window tables',18)}
  ${rect(1040,630,120,120,'#dbc6a4','#866c4b')}
  <path d="M1100,635 C1160,635 1160,745 1100,745 C1050,745 1050,660 1100,660" fill="none" stroke="#866c4b" stroke-width="4"/>
  ${text(1065,577,'Corner stair opening',20)}${text(1065,607,'To the tap-room',18)}
  <path d="M190,380 V470" stroke="#f5eddd" stroke-width="16"/>
  ${text(335,360,'Private door',21)}${text(335,390,'Ladder to the household rooms',17)}
  ${text(700,885,'Furniture positions are schematic; the source specifies one narrow window and a square stair opening.',19,'#786950')}
`)

const layouts = {
  'chanvrerie-streets': {width:1400,height:1000,image:'chanvrerie-streets.webp',source:['IV.XII.I paragraphs 5–12','IV.XII.III paragraphs 0–4','IV.XII.V paragraphs 0–4','V.I.XXIV paragraphs 5–16'],locations:{
    'rue-chanvrerie':[480,600], 'chanvrerie-barricade':[650,560],
    'chanvrerie-barricade-opening':[650,465], 'chanvrerie-barricade-cut':[650,485],
    'chanvrerie-barricade-exterior':[550,560], 'chanvrerie-barricade-torch':[690,620],
    'rue-chanvrerie-artillery-position':[350,560],
    'mondetour-small-barricade':[1020,790], 'mondetour-open-approach':[1000,285],
    'mondetour-lane-outside':[1020,845], 'chanvrerie-tall-house':[1115,600],
    'corinthe':[800,650], 'corinthe-door':[800,650], 'corinthe-exterior':[800,625],
    'corinthe-sheltered-angle':[980,690], 'chanvrerie-sewer-grating':[1020,765],
  }},
  'corinthe-ground-floor': {width:1400,height:1000,image:'corinthe-ground-floor.webp',levelGroup:'corinthe',levelIndex:0,source:['IV.XII.I paragraph 12'],locations:{
    'corinthe-taproom':[540,500], 'corinthe-taproom-door':[520,795],
    'corinthe-kitchen':[1050,650],
    'corinthe-cellar-trap':[312,710],
  }},
  'corinthe-first-floor': {width:1400,height:1000,image:'corinthe-first-floor.webp',levelGroup:'corinthe',levelIndex:1,source:['IV.XII.I paragraph 12','IV.XII.II','IV.XII.III'],locations:{
    'corinthe-first-floor':[950,500], 'corinthe-first-floor-window':[700,785],
  }},
}
let sharp
try {sharp=(await import('sharp')).default} catch {
  if(!process.env.SHARP_MODULE_DIR) throw Error('Set SHARP_MODULE_DIR to the installed sharp package directory')
  sharp=createRequire(`${process.env.SHARP_MODULE_DIR.replaceAll('\\','/')}/package.json`)('sharp')
}
for(const [key,svg] of [['chanvrerie-streets',streets],['corinthe-ground-floor',ground],['corinthe-first-floor',first]]) {
  fs.writeFileSync(new URL(`${key}.svg`,out),`${svg}\n`)
  await sharp(Buffer.from(svg)).webp({quality:93,effort:6}).toFile(new URL(`${key}.webp`,out).pathname.replace(/^\/([A-Za-z]:)/,'$1'))
}
fs.writeFileSync(new URL('corinthe-layout.json',out),`${JSON.stringify(layouts,null,2)}\n`)
console.log('Rendered three Corinthe map candidates; marker and app QA remain required.')
