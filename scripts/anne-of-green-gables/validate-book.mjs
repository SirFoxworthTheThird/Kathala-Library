import {webpDimensions} from '../lib/webp.mjs'
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import assert from 'node:assert/strict'
import { chapters as sourceChapters, retainedText, reconstructedText, wordCount, sourceSha256 } from './source-text.mjs'
import { validateModel } from './validate-model.mjs'
import { execFileSync } from 'node:child_process'
const file=new URL('../../library/anne-of-green-gables.pwk',import.meta.url), data=JSON.parse(fs.readFileSync(file,'utf8'))
assert.equal(sourceSha256,'89a5e9fb2e0bb44562a969785385366f94e1da736aebee7d9cdf459eb0b5f9f6')
assert.equal(data.world.readingMode,true);assert.equal(data.chapters.length,38);assert.equal(data.events.length,203);assert.equal(data.sceneTexts.length,203)
validateModel(data)
const ordered=[...data.events].sort((a,b)=>a.sortOrder-b.sortOrder), scenes=ordered.map(e=>{const s=data.sceneTexts.filter(x=>x.eventId===e.id);assert.equal(s.length,1);assert.equal(s[0].wordCount,wordCount(s[0].text));return s[0]})
const rebuilt=data.chapters.map((chapter,i)=>{const body=ordered.filter(e=>e.chapterId===chapter.id).map(e=>scenes[ordered.indexOf(e)].text).join('\n\n');assert.equal(body,sourceChapters[i].body,`Chapter ${i+1}`);return `${sourceChapters[i].heading}\n\n${body}`}).join('\n\n')
assert.equal(reconstructedText,retainedText);assert.equal(rebuilt,retainedText);assert.equal(scenes.reduce((n,s)=>n+s.wordCount,0),101964)
assert.ok(retainedText.replace(/\s+/g,' ').endsWith('“‘God’s in his heaven, all’s right with the world,’” whispered Anne softly.'))
const unique=a=>new Set(a).size===a.length, ids={};for(const k of ['chapters','events','characters','items','locationMarkers','mapLayers','plotThreads','motifs','lorePages','blobs'])ids[k]=new Set(data[k].map(x=>x.id))
const all=[];for(const v of Object.values(data))if(Array.isArray(v))for(const r of v)if(r?.id)all.push(r.id);assert.ok(unique(all),'Duplicate ids')
for(let i=0;i<ordered.length;i++){const e=ordered[i];assert.ok(ids.chapters.has(e.chapterId)&&ids.locationMarkers.has(e.locationMarkerId)&&e.title&&e.description);assert.equal(e.status,'final');assert.ok(!/changes what Anne|responds to/.test(e.description));assert.ok(Number.isFinite(e.inWorldTime)&&e.travelDays>=0&&e.tension>=1&&e.tension<=5);if(i)assert.ok(e.inWorldTime>=ordered[i-1].inWorldTime);const snaps=data.characterSnapshots.filter(s=>s.eventId===e.id);assert.ok(unique(e.involvedCharacterIds));assert.deepEqual(snaps.map(s=>s.characterId).sort(),[...e.involvedCharacterIds].sort(),`Cast ${e.title}`);assert.ok(unique(snaps.map(s=>s.statusNotes)),`Status ${e.title}`);for(const s of snaps){assert.ok(ids.characters.has(s.characterId));assert.ok(!/responds to/.test(s.statusNotes));assert.equal(s.currentLocationMarkerId,e.locationMarkerId);const loc=data.locationMarkers.find(x=>x.id===e.locationMarkerId);assert.equal(s.currentMapLayerId,loc.mapLayerId)}}
assert.equal(data.mapLayers.filter(m=>!m.parentMapId).length,1);for(const map of data.mapLayers){assert.ok(ids.blobs.has(map.imageId));if(map.parentMapId){const gates=data.locationMarkers.filter(l=>l.linkedMapLayerId===map.id);assert.equal(gates.length,1,`Gateway ${map.name}`);assert.equal(gates[0].mapLayerId,map.parentMapId)}}
for(const loc of data.locationMarkers){const map=data.mapLayers.find(m=>m.id===loc.mapLayerId);assert.ok(map&&loc.x>=0&&loc.y>=0&&loc.x<=map.imageWidth&&loc.y<=map.imageHeight)}
for(const blob of data.blobs){const p=path.resolve(import.meta.dirname,'../..',blob.url);assert.ok(fs.existsSync(p),blob.url);assert.ok(fs.statSync(p).size>0)}
assert.ok(data.characters.every(c=>c.portraitImageId&&ids.blobs.has(c.portraitImageId)),'Every character needs art')
assert.ok(data.locationMarkers.every(l=>l.imageId&&ids.blobs.has(l.imageId)),'Every location needs art')
assert.ok(data.items.every(i=>i.imageId&&ids.blobs.has(i.imageId)),'Every item needs art')
assert.ok(data.factions.every(f=>f.coverImageId&&ids.blobs.has(f.coverImageId)),'Every faction needs art')
assert.ok(data.world.coverImageId&&ids.blobs.has(data.world.coverImageId),'World needs cover art')
const manifest=JSON.parse(fs.readFileSync(new URL('../../library/anne-of-green-gables/ARTWORK_MANIFEST.json',import.meta.url),'utf8'))
assert.equal(manifest.assets.length,82);assert.ok(unique(manifest.assets.map(a=>a.sha256)),'Artwork hashes must be distinct')
for(const a of manifest.assets){const p=path.resolve(import.meta.dirname,'../..',a.path);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'),a.sha256,`Artwork hash ${a.path}`)}
const recollection=data.events.find(e=>e.title==='Anne’s Years Before the Asylum');assert.deepEqual(recollection.mentionedCharacterIds.sort(),['Mrs. Hammond','Mrs. Thomas'].map(charId=>`anne-char-${charId.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`).sort());assert.ok(!recollection.involvedCharacterIds.some(id=>recollection.mentionedCharacterIds.includes(id)))
const fall=data.events.find(e=>e.title==='Rachel Checks Matthew’s Heart'), matthew=data.characters.find(c=>c.name==='Matthew Cuthbert');assert.equal(matthew.isAlive,false);assert.equal(data.characterSnapshots.find(s=>s.eventId===fall.id&&s.characterId===matthew.id).isAlive,false)
assert.equal(data.relationshipSnapshots.length,14);assert.ok(data.items.every(i=>data.itemPlacements.some(p=>p.itemId===i.id)))
const catalogue=JSON.parse(fs.readFileSync(new URL('../../library/index.json',import.meta.url),'utf8')).entries.find(e=>e.id==='anne-of-green-gables');assert.ok(catalogue);assert.equal(catalogue.dataBytes,fs.statSync(file).size);assert.deepEqual(catalogue.counts,{characters:33,chapters:38,events:203,locations:31});assert.equal(catalogue.cover,'library/anne-of-green-gables/art/generated/cover.webp')
const prompts=JSON.parse(fs.readFileSync(new URL('./art-prompts.json',import.meta.url),'utf8'))
const review=JSON.parse(fs.readFileSync(new URL('./art-review.json',import.meta.url),'utf8'))
for(const asset of manifest.assets){const bytes=fs.readFileSync(path.resolve(import.meta.dirname,'../..',asset.path));assert.equal(webpDimensions(bytes)[0],asset.width);assert.equal(webpDimensions(bytes)[1],asset.height);assert.equal(review[asset.path]?.sha256,asset.sha256,`Visual acceptance must match current bytes: ${asset.path}`);if(asset.category!=='maps')assert.equal(asset.prompt,prompts.find(p=>p.path===asset.path)?.prompt,`Exact recorded prompt: ${asset.path}`)}
execFileSync('python',[path.resolve(import.meta.dirname,'validate-projection.py')],{stdio:'inherit'})
console.log(`PASS: ${data.chapters.length} chapters, ${data.events.length} events/scenes, ${data.characterSnapshots.length} snapshots, ${data.characters.length} characters, ${data.locationMarkers.length} locations, ${data.mapLayers.length} maps, ${manifest.assets.length} distinct artwork assets, 101,964 words.`)
