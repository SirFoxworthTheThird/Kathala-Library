import fs from 'node:fs'
import{createHash}from 'node:crypto'
import{createRequire}from 'node:module'
const root=new URL('./',import.meta.url)
const read=(name,expected)=>{const bytes=fs.readFileSync(new URL(name,root));if(createHash('sha256').update(bytes).digest('hex')!==expected)throw Error(`Changed pinned source: ${name}`);return JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/,''))}
const towns=read('source/cartography/paris-region-towns.json','548613a8aa5d10c649a7feb6710343a8461c850c57ee6e1e170086204e3f3b85')
const rivers=read('source/cartography/natural-earth-10m-rivers.geojson','bb854a900ecbd3b408df46d5e16e3e0f974ba55993f9d8b5c26e855273c0905a')
const width=1400,height=1300,project=([lon,lat])=>[100+(lon-2.1)/.6*1200,100+(49.08-lat)/.36*1100]
const water=rivers.features.filter(f=>['Seine','Marne'].includes(f.properties.name)).flatMap(f=>f.geometry.coordinates).map(line=>'<path d="'+line.map((p,i)=>{const[x,y]=project(p);return`${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`}).join(' ')+'"/>').join('')
const labels=towns.map(t=>{const[x,y]=project(t.centre.coordinates);return`<circle cx="${x}" cy="${y}" r="6"/><text x="${x+11}" y="${y-11}">${t.nom}</text>`}).join('')
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><clipPath id="bounds"><rect x="100" y="100" width="1200" height="1100"/></clipPath></defs><rect width="1400" height="1300" fill="#faf3df"/><g clip-path="url(#bounds)"><rect x="100" y="100" width="1200" height="1100" fill="#eee3c8"/><g fill="none" stroke="#6c9fa8" stroke-width="4">${water}</g><g fill="#813b2c" font-family="Georgia" font-size="23">${labels}</g></g><text x="700" y="49" text-anchor="middle" font-family="Georgia" font-size="32">Paris and its environs — geometry reference</text><text x="700" y="1246" text-anchor="middle" font-family="Georgia" font-size="19">Town centres: official API Geo; river centrelines: Natural Earth 1:10m</text><text x="700" y="1277" text-anchor="middle" font-family="Georgia" font-size="18">No historical town boundaries, exact river banks or source building plots asserted</text></svg>`
fs.writeFileSync(new URL('qa/cartography/paris-region-geometry.svg',root),svg+'\n')
const sharp=createRequire(`${process.env.SHARP_MODULE_DIR.replaceAll('\\','/')}/package.json`)('sharp')
await sharp(Buffer.from(svg)).png().toFile(new URL('qa/cartography/paris-region-geometry.png',root).pathname.replace(/^\/([A-Za-z]:)/,'$1'))
fs.writeFileSync(new URL('qa/cartography/paris-region-reference.json',root),JSON.stringify({bounds:[2.1,48.72,2.7,49.08],towns:towns.map(t=>({...t,referencePoint:project(t.centre.coordinates)}))},null,2)+'\n')
