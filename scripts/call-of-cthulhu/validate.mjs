import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {narrativeText,normalize,countWords} from './source-text.mjs'
const root=path.resolve(import.meta.dirname,'../..'),d=JSON.parse(fs.readFileSync(path.join(root,'library/call-of-cthulhu.pwk'),'utf8')),fail=m=>{throw Error(m)},uniq=a=>new Set(a).size===a.length
if(d.chapters.length!==3||d.events.length!==12||d.sceneTexts.length!==12)fail('Expected 3 chapters and 12 scenes')
if(normalize(d.sceneTexts.map(s=>s.text).join('\n\n'))!==normalize(narrativeText))fail('Prose reconstruction failed')
if(d.sceneTexts.reduce((n,s)=>n+s.wordCount,0)!==countWords(narrativeText))fail('Word count mismatch')
for(const c of d.chapters)if(d.events.filter(e=>e.chapterId===c.id).length<3)fail(`Too few events: ${c.title}`)
const snaps=Map.groupBy(d.characterSnapshots,s=>s.eventId);for(const e of d.events){const a=(snaps.get(e.id)||[]).map(x=>x.characterId).sort(),b=[...e.involvedCharacterIds].sort();if(JSON.stringify(a)!==JSON.stringify(b)||!uniq(a))fail(`Snapshot mismatch ${e.title}`);if(!uniq((snaps.get(e.id)||[]).map(x=>x.statusNotes)))fail(`Duplicate status ${e.title}`)}
const layers=new Map(d.mapLayers.map(x=>[x.id,x]));for(const m of d.locationMarkers){const l=layers.get(m.mapLayerId);if(!l||m.x<0||m.y<0||m.x>l.imageWidth||m.y>l.imageHeight)fail(`Bad marker ${m.name}`)}for(const l of d.mapLayers.filter(x=>x.parentMapId)){const g=d.locationMarkers.filter(x=>x.linkedMapLayerId===l.id);if(g.length!==1||g[0].mapLayerId!==l.parentMapId)fail(`Bad gateway ${l.name}`)}
const landmarkAnchors={
 'providence-gateway':[405,728],'new-orleans':[320,674],'swamp-gateway':[320,674],'st-louis':[340,717],oslo:[728,828],sydney:[1348,359],auckland:[1460,337],pacific:[315,282],'rlyeh-gateway':[202,232],
 'angell-house':[485,624],brown:[620,682],'wilcox-studio':[880,440],waterfront:[1350,374],
 'bayou-landing':[275,691],'squatter-village':[780,819],'cult-clearing':[1060,734],'police-camp':[1160,534],
 landing:[273,742],'cyclopean-city':[650,639],'great-door':[1004,575],channel:[1254,184]
}
for(const [key,[x,y]] of Object.entries(landmarkAnchors)){const m=d.locationMarkers.find(v=>v.id===`coc-loc-${key}`);if(!m||m.x!==x||m.y!==y)fail(`Marker is not on its illustrated landmark: ${key}`)}
const hashes=[];for(const b of d.blobs){const p=path.join(root,b.url.replaceAll('/',path.sep));if(!fs.existsSync(p))fail(`Missing ${b.url}`);hashes.push(crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'))}if(!uniq(hashes)||d.blobs.length!==46)fail('Artwork missing or duplicated')
console.log(JSON.stringify({chapters:d.chapters.length,events:d.events.length,words:countWords(narrativeText),characters:d.characters.length,snapshots:d.characterSnapshots.length,locations:d.locationMarkers.length,maps:d.mapLayers.length,routes:d.mapRoutes.length,items:d.items.length,images:d.blobs.length,brokenImages:0,duplicateArtwork:0},null,2))
