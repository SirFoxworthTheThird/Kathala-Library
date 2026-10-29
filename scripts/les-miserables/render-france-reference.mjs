import fs from 'node:fs'
import {createRequire}from 'node:module'
import {createHash}from 'node:crypto'

// Physical coastline only: present-day political borders must not masquerade
// as one fixed boundary throughout a novel spanning the Empire and Restoration.
const root=new URL('./',import.meta.url)
const landBytes=fs.readFileSync(new URL('source/cartography/natural-earth-50m-land.geojson',root))
if(createHash('sha256').update(landBytes).digest('hex')!=='e874b27a51d146452be360cafb3cc50c86001074a67d534113e6534682f9826b')throw Error('Pinned physical-coast source changed')
const land=JSON.parse(landBytes)
const width=1400,height=1400,margin=70
const project=([lon,lat])=>[margin+(lon+6)/16*(width-2*margin),margin+(52-lat)/11*(height-2*margin)]
const cities=[
  ['paris','Paris',2.35,48.86],['france-digne-gateway','Digne',6.24,44.09],
  ['vernon','Vernon',1.49,49.09],['montreuil-sur-mer','Montreuil-sur-Mer',1.76,50.46],
  ['arras','Arras',2.78,50.29],['toulon','Toulon',5.93,43.12],
  ['waterloo-battlefield','Waterloo',4.4,50.68],
]
const polygons=land.features.flatMap(f=>f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates)
const paths=polygons.map(poly=>'<path d="'+poly.map(ring=>ring.map((p,i)=>{const [x,y]=project(p);return `${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`}).join(' ')+'Z').join(' ')+'"/>').join('')
const points=cities.map(([key,name,lon,lat])=>{const [x,y]=project([lon,lat]);return `<circle cx="${x}" cy="${y}" r="6" fill="#813b2c"/><text x="${x+12}" y="${y-10}" font-size="22">${name}</text>`}).join('')
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><clipPath id="crop"><rect x="${margin}" y="${margin}" width="1260" height="1260"/></clipPath></defs><rect width="1400" height="1400" fill="#faf3df"/><g clip-path="url(#crop)"><rect x="70" y="70" width="1260" height="1260" fill="#dce7e5"/><g fill="#eee3c8" stroke="#8d8776" stroke-width="2">${paths}</g><g font-family="Georgia" fill="#453b2d">${points}</g></g><text x="700" y="43" text-anchor="middle" font-family="Georgia" font-size="32">France and neighboring regions</text><text x="700" y="1370" text-anchor="middle" font-family="Georgia" font-size="19">Physical coast reference; approximate town centers; no historical boundaries asserted</text></svg>`
fs.writeFileSync(new URL('qa/cartography/france-geometry.svg',root),svg+'\n')
const sharp=createRequire(`${process.env.SHARP_MODULE_DIR.replaceAll('\\','/')}/package.json`)('sharp')
await sharp(Buffer.from(svg)).png().toFile(new URL('qa/cartography/france-geometry.png',root).pathname.replace(/^\/([A-Za-z]:)/,'$1'))
fs.writeFileSync(new URL('qa/cartography/france-town-reference.json',root),JSON.stringify({bounds:[-6,41,10,52],cities:cities.map(([key,name,longitude,latitude])=>({key,name,longitude,latitude,referencePoint:project([longitude,latitude])}))},null,2)+'\n')
