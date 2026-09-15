import fs from 'node:fs'; import crypto from 'node:crypto'; import path from 'node:path'; import { narrativeText,sourceSections } from './source-text.mjs'
const root=path.resolve(import.meta.dirname,'../..'), d=JSON.parse(fs.readFileSync(path.join(root,'library/the-turn-of-the-screw.pwk'),'utf8')), fail=m=>{throw Error(m)}
if(d.chapters.length!==25||d.events.length!==52||d.sceneTexts.length!==52)fail('Expected 25 sections and 52 complete scenes')
if(d.timelines.length!==1)fail('The reading order must use one timeline')
if(!d.events.every(e=>Number.isFinite(e.inWorldTime)&&e.tension>=1&&e.tension<=5&&e.travelDays>=0))fail('Invalid timing or tension')
const byEvent=new Map(d.events.map(e=>[e.id,e])),byLayer=new Map(d.mapLayers.map(m=>[m.id,m]))
for(const s of d.characterSnapshots){const e=byEvent.get(s.eventId);if(!e?.involvedCharacterIds.includes(s.characterId)||!s.statusNotes?.trim())fail(`Invalid snapshot ${s.id}`)}
for(const m of d.locationMarkers){const l=byLayer.get(m.mapLayerId);if(!l||m.x<0||m.x>l.imageWidth||m.y<0||m.y>l.imageHeight)fail(`Marker outside map: ${m.name}`);if(m.linkedMapLayerId&&!byLayer.has(m.linkedMapLayerId))fail(`Broken gateway ${m.name}`)}
for(const l of d.mapLayers.filter(m=>m.parentMapId)){if(d.locationMarkers.filter(m=>m.linkedMapLayerId===l.id).length!==1)fail(`Submap needs exactly one gateway: ${l.name}`);if(!d.locationMarkers.some(m=>m.mapLayerId===l.id))fail(`Empty submap: ${l.name}`)}
if(d.mapRoutes.some(r=>!Array.isArray(r.waypoints)))fail('Every route requires waypoints')
const hashes={};for(const b of d.blobs){const f=path.join(root,b.url);if(!fs.existsSync(f))fail(`Missing art ${b.url}`);const h=crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');if(/art\/(?:character|item)-/.test(b.url)&&hashes[h])fail(`Repeated entity art: ${b.url}`);hashes[h]=b.url}
const normalize=s=>s.replace(/\s+/g,' ').trim(), reconstructed=d.sceneTexts.map(s=>s.text).join('\n\n');if(normalize(reconstructed)!==normalize(narrativeText))fail('Manuscript does not reconstruct every source word in order');if(d.sceneTexts.reduce((n,s)=>n+s.wordCount,0)!==42239)fail('Unexpected word count')
if(!sourceSections.every((s,i)=>d.chapters[i].notes.includes(s.sourceHeading)))fail('Source headings not preserved')
console.log(JSON.stringify({chapters:25,events:52,words:42239,snapshots:d.characterSnapshots.length,maps:d.mapLayers.length,locations:d.locationMarkers.length,images:d.blobs.length},null,2))
