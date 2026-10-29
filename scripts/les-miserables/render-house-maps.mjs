import fs from 'node:fs'
import { createRequire } from 'node:module'

// Native vector maps, not AI illustrations. Topology is from I.I.VI and the
// upstairs prayer room from I.II.IV. Dimensions, orientation and the ordering
// of the upper rooms are editorial and are explicitly marked as schematic.
const out = new URL('./map-staging/', import.meta.url)
fs.mkdirSync(out, { recursive: true })
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
const text = (x, y, value, size = 24, fill = '#40382c') => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${fill}">${esc(value)}</text>`
const room = (x, y, width, height, label, sub = '') => `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#f4e9d6" stroke="#655744" stroke-width="6"/>${text(x + width / 2, y + height / 2 - 5, label, 26)}${sub ? text(x + width / 2, y + height / 2 + 30, sub, 19, '#746550') : ''}`
const passage = (x1, y1, x2, y2) => `<path d="M${x1},${y1} L${x2},${y2}" stroke="#fbf5e8" stroke-width="35"/> <path d="M${x1},${y1} L${x2},${y2}" stroke="#9a7651" stroke-width="2" stroke-dasharray="5 6"/>`
const frame = (title, subtitle, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1000" viewBox="0 0 1400 1000"><rect width="1400" height="1000" fill="#eee3ce"/><rect x="25" y="25" width="1350" height="950" rx="9" fill="#faf4e6" stroke="#9c8667" stroke-width="3"/><g font-family="Georgia, serif">${text(700, 78, title, 38)}${text(700, 114, subtitle, 20, '#756954')}${body}${text(700, 939, 'Editorial schematic • not measured • no cardinal orientation is asserted', 20, '#756954')}</g></svg>`

const beds = [[270, 185], [450, 185], [270, 340], [450, 340]].map(([x, y], i) =>
  `<rect x="${x}" y="${y}" width="145" height="112" rx="10" fill="${i === 3 ? '#ceb5bd' : '#b1bea0'}" stroke="#6d7c60" stroke-width="3"/>${text(x + 72, y + 65, i === 3 ? 'Flowers' : 'Vegetables', 19)}`).join('')
const ground = frame('The Bishop’s House — Ground Floor', 'The former hospital beside the cathedral square', `
  <rect x="210" y="155" width="440" height="345" fill="#e2e8d2" stroke="#7c866c" stroke-width="5"/>
  ${beds}<path d="M430,168 V487 M223,320 H637" stroke="#f9f0d9" stroke-width="22"/><circle cx="430" cy="320" r="24" fill="#91afb0" stroke="#627e7e" stroke-width="3"/>
  ${text(430, 525, 'Garden: four plots around a tank', 21)}
  ${room(800, 175, 310, 115, 'Cow-shed', 'Winter salon partition')}
  ${room(800, 355, 310, 115, 'Kitchen and cellar', 'Former hospital pharmacy')}
  ${room(240, 600, 285, 215, 'Dining room', 'Street entrance')}
  ${room(525, 600, 285, 215, 'Bishop’s bedroom', 'Bookcase and iron bed')}
  ${room(810, 600, 285, 215, 'Oratory', 'Guest alcove at the far end')}
  <path d="M1010,605 V705 H1090" stroke="#a38a68" stroke-width="3" fill="none"/>
  ${text(1050, 657, 'Guest bed', 16)}
  ${passage(525, 700, 525, 750)}${passage(810, 700, 810, 750)}
  ${passage(240, 700, 240, 750)}${passage(640, 600, 690, 600)}
  <path d="M665,586 V535" stroke="#8d9b79" stroke-width="4" stroke-dasharray="6 5"/>
  ${text(802, 560, 'Glazed garden door', 17)}
  <path d="M85,555 H185 V850 H85" fill="#d6cbb5" stroke="#b1a38c" stroke-width="2"/>
  <text x="141" y="704" text-anchor="middle" transform="rotate(-90 141 704)" font-size="23" fill="#655d50">Cathedral square</text>
  ${text(700, 872, 'Street → dining room → bedroom → oratory → guest alcove', 23)}
  ${text(700, 903, 'Garden and annex positions are schematic; the sequence of rooms is stated in the text.', 19, '#756954')}
`)
const upper = frame('The Bishop’s House — First Floor', 'The women’s chambers and the room where linen hangs', `
  ${room(140, 320, 365, 350, 'Baptistine’s chamber', 'The large bergère stays upstairs')}
  ${room(505, 320, 390, 350, 'Drawing room', 'Linen hung here; evening prayers')}
  ${room(895, 320, 365, 350, 'Magloire’s chamber', 'A private room above the bishop')}
  ${text(700, 240, 'Three upper rooms', 29)}
  ${text(700, 746, 'The women retire to their own chambers after praying in the drawing room.', 24)}
  ${text(700, 795, 'The source does not specify the room order or stair position.', 23, '#756954')}
  ${text(700, 842, 'Rooms are arranged side by side here for clarity; no connecting doors are inferred.', 20, '#756954')}
`)

const layouts = {
  'bishop-ground-floor': { width: 1400, height: 1000, levelGroup: 'bishop-house', levelIndex: 0,
    source: ['I.I.VI paragraphs 0–20'], image: 'bishop-ground-floor.webp',
    locations: {
      'bishop-house': [305, 640], 'bishop-house-entrance': [240, 724],
      'bishop-dining-room': [380, 780], 'bishop-bedroom': [665, 780],
      'bishop-house-library': [560, 770], 'bishop-oratory-door': [810, 725],
      'bishop-oratory-alcove': [1050, 680], 'bishop-garden': [500, 480],
    } },
  'bishop-first-floor': { width: 1400, height: 1000, levelGroup: 'bishop-house', levelIndex: 1,
    source: ['I.I.VI paragraphs 0, 8, 13–14', 'I.II.IV paragraphs 20–21'], image: 'bishop-first-floor.webp',
    locations: { 'bishop-upstairs-drawing-room': [700, 600] } },
}
for (const [key, svg] of [['bishop-ground-floor', ground], ['bishop-first-floor', upper]]) {
  fs.writeFileSync(new URL(`${key}.svg`, out), `${svg}\n`)
}
fs.writeFileSync(new URL('house-layout.json', out), `${JSON.stringify(layouts, null, 2)}\n`)

let sharp
try { sharp = (await import('sharp')).default } catch {
  if (!process.env.SHARP_MODULE_DIR) throw Error('Set SHARP_MODULE_DIR to the installed Node package directory containing sharp')
  sharp = createRequire(`${process.env.SHARP_MODULE_DIR.replaceAll('\\', '/')}/package.json`)('sharp')
}
for (const key of Object.keys(layouts)) {
  const svg = fs.readFileSync(new URL(`${key}.svg`, out))
  await sharp(svg).webp({ quality: 93, effort: 6 }).toFile(new URL(`${key}.webp`, out).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
}
console.log('Rendered two source-grounded house map layers; app gateway/floor QA is still pending.')
