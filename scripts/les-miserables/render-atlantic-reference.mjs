import fs from 'node:fs'
import {createHash}from 'node:crypto'
import {createRequire}from 'node:module'
const root=new URL('./',import.meta.url)
const bytes=fs.readFileSync(new URL('source/cartography/natural-earth-50m-land.geojson',root))
if(createHash('sha256').update(bytes).digest('hex')!=='e874b27a51d146452be360cafb3cc50c86001074a67d534113e6534682f9826b')throw Error('Changed pinned physical-coast source')
const land=JSON.parse(bytes),width=1800,height=1400,margin=70
const project=([lon,lat])=>[margin+(lon+130)/165*(width-2*margin),margin+(72-lat)/132*(height-2*margin)]
const polygons=land.features.flatMap(f=>f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates)
const paths=polygons.map(poly=>'<path d="'+poly.map(ring=>ring.map((p,i)=>{const[x,y]=project(p);return`${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`}).join(' ')+'Z').join(' ')+'"/>').join('')
const points=[['france-context','France',2.35,48.86],['guernsey-context','Guernsey',-2.54,49.45]]
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><clipPath id="bounds"><rect x="70" y="70" width="1660" height="1260"/></clipPath></defs><rect width="1800" height="1400" fill="#faf3df"/><g clip-path="url(#bounds)"><rect x="70" y="70" width="1660" height="1260" fill="#dce7e5"/><g fill="#eee3c8" stroke="#8d8776" stroke-width="1">${paths}</g></g><text x="900" y="42" font-family="Georgia" font-size="30" text-anchor="middle">Atlantic geographical context</text><text x="900" y="1370" font-family="Georgia" font-size="20" text-anchor="middle">Pinned physical coast only; no political borders or unlocated destination asserted</text></svg>`
fs.writeFileSync(new URL('qa/cartography/atlantic-geometry.svg',root),svg+'\n')
const sharp=createRequire(`${process.env.SHARP_MODULE_DIR.replaceAll('\\','/')}/package.json`)('sharp')
await sharp(Buffer.from(svg)).png().toFile(new URL('qa/cartography/atlantic-geometry.png',root).pathname.replace(/^\/([A-Za-z]:)/,'$1'))
fs.writeFileSync(new URL('qa/cartography/atlantic-reference.json',root),JSON.stringify({bounds:[-130,-60,35,72],points:points.map(([key,name,longitude,latitude])=>({key,name,longitude,latitude,referencePoint:project([longitude,latitude])}))},null,2)+'\n')
