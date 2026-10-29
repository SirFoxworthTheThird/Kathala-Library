import fs from 'node:fs'
import {createRequire}from 'node:module'
import {createHash}from 'node:crypto'

const root=new URL('./',import.meta.url)
const bytes=fs.readFileSync(new URL('source/cartography/natural-earth-50m-land.geojson',root))
if(createHash('sha256').update(bytes).digest('hex')!=='e874b27a51d146452be360cafb3cc50c86001074a67d534113e6534682f9826b')throw Error('Changed physical coast source')
const land=JSON.parse(bytes),width=1500,height=1200,margin=60
const project=([lon,lat])=>[margin+(lon-5.7)/1.9*(width-2*margin),margin+(44.8-lat)/1.5*(height-2*margin)]
const cities=[['Digne',6.24,44.09],['Senez',6.41,43.91],['Ubaye — Jausiers',6.73,44.42],['Grasse',6.92,43.66]]
const polygons=land.features.flatMap(f=>f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates)
const paths=polygons.map(poly=>'<path d="'+poly.map(r=>r.map((p,i)=>{const[x,y]=project(p);return `${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`}).join(' ')+'Z').join(' ')+'"/>').join('')
const points=cities.map(([name,lon,lat])=>{const[x,y]=project([lon,lat]);return `<circle cx="${x}" cy="${y}" r="6" fill="#813b2c"/><text x="${x+12}" y="${y-10}" font-size="22">${name}</text>`}).join('')
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><clipPath id="crop"><rect x="60" y="60" width="1380" height="1080"/></clipPath></defs><rect width="1500" height="1200" fill="#faf3df"/><g clip-path="url(#crop)"><rect x="60" y="60" width="1380" height="1080" fill="#dce7e5"/><g fill="#eee3c8" stroke="#8d8776" stroke-width="2">${paths}</g><g font-family="Georgia" fill="#453b2d">${points}</g></g><text x="750" y="35" text-anchor="middle" font-family="Georgia" font-size="26">Southern country — coast and approximate town reference</text></svg>`
fs.writeFileSync(new URL('qa/cartography/southern-geometry.svg',root),svg)
const sharp=createRequire(`${process.env.SHARP_MODULE_DIR.replaceAll('\\\\','/')}/package.json`)('sharp')
await sharp(Buffer.from(svg)).png().toFile(new URL('qa/cartography/southern-geometry.png',root).pathname.replace(/^\/([A-Za-z]:)/,'$1'))
fs.writeFileSync(new URL('qa/cartography/southern-town-reference.json',root),JSON.stringify({bounds:[5.7,43.3,7.6,44.8],cities:cities.map(([name,lon,lat])=>({name,lon,lat,point:project([lon,lat])}))},null,2))
