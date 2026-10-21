import fs from 'node:fs'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'
import {fileURLToPath} from 'node:url'
import {chapters,sourceSha256} from './source-text.mjs'
import {reviewedScenes} from './reviewed-scenes.mjs'
import {locationFor,characterNames} from './world-ledger.mjs'
export const presenceAudit=JSON.parse(fs.readFileSync(new URL('./FULL_REVIEW.json',import.meta.url),'utf8'))
const id=(kind,key)=>'little-women-'+kind+'-'+key.toLowerCase()
const hash=text=>crypto.createHash('sha256').update(text).digest('hex')
export function validatePresence(world){
 assert.equal(presenceAudit.sourceSha256,sourceSha256,'review source')
 assert.equal(presenceAudit.chapters.length,47,'every chapter must have an independent source review')
 const allTitles=new Set();let count=0
 for(const review of presenceAudit.chapters){
  const chapter=chapters[review.number-1],plans=reviewedScenes[review.number-1]
  assert.equal(hash(chapter.text),review.sourceSha256,'chapter source passage drift')
  assert.ok(review.notes.length>30,'missing chapter review decision')
  assert.equal(plans.length,review.scenes.length,'unreviewed scene')
  let next=1
  for(let i=0;i<review.scenes.length;i++){
   const r=review.scenes[i],plan=plans[i];count++
   assert.ok(!allTitles.has(r.title),'duplicate scene title '+r.title);allTitles.add(r.title)
   assert.equal(r.start,next,r.title+': omitted or repeated paragraph');next=r.end+1
   assert.ok(r.end>=r.start,r.title+': empty passage')
   assert.equal(r.end,(plans[i+1]?.start??chapter.paragraphs.length+1)-1,r.title+': source end drift')
   assert.equal(hash(chapter.paragraphs.slice(r.start-1,r.end).join('\n\n')),r.sourceSha256,r.title+': source passage drift')
   assert.equal(hash(chapter.paragraphs[r.start-1]),r.firstParagraph)
   assert.equal(hash(chapter.paragraphs[r.end-1]),r.lastParagraph)
   assert.equal(plan.start,r.start,r.title+': source start drift')
   assert.equal(plan.title,r.title)
   assert.deepEqual(plan.states,r.states,r.title+': authored physical states differ from source review')
   assert.deepEqual(plan.mentioned,r.mentioned,r.title+': authored mentions')
   assert.deepEqual(plan.places??{},r.places,r.title+': individual places')
   assert.equal(plan.location,r.location,r.title+': authored place')
   const e=world.events.find(e=>e.title===r.title);assert.ok(e,'missing event '+r.title)
   const cast=Object.keys(r.states)
   assert.ok(cast.every(k=>characterNames[k]),r.title+': unknown character')
   assert.ok(Object.keys(r.places).every(k=>cast.includes(k)),r.title+': location override for absent character')
   assert.deepEqual([...e.involvedCharacterIds].sort(),cast.map(k=>id('char',k)).sort(),r.title+': physical cast')
   assert.deepEqual([...e.mentionedCharacterIds].sort(),r.mentioned.map(k=>id('char',k)).sort(),r.title+': mentions')
   const place=locationFor(r.location)
   assert.equal(e.locationMarkerId,place===null?null:id('loc',place),r.title+': scene location')
   const snaps=world.characterSnapshots.filter(s=>s.eventId===e.id)
   assert.deepEqual(snaps.map(s=>s.characterId).sort(),cast.map(k=>id('char',k)).sort(),r.title+': physical snapshots')
   for(const key of cast){
    const s=snaps.find(s=>s.characterId===id('char',key)),marker=id('loc',locationFor(r.places[key]??r.location))
    assert.equal(s.currentLocationMarkerId,marker,r.title+': snapshot location '+key)
    assert.equal(s.currentMapLayerId,world.locationMarkers.find(m=>m.id===marker)?.mapLayerId,r.title+': snapshot map '+key)
    assert.equal(s.statusNotes,r.states[key],r.title+': snapshot state '+key)
   }
  }
  assert.equal(next,chapter.paragraphs.length+1,'unreviewed chapter ending')
 }
 assert.equal(world.events.length,count,'unreviewed exported scenes')
 const death=world.events.find(e=>e.title==='Beth Dies at Dawn')
 const after=world.characterSnapshots.filter(s=>s.characterId===id('char','beth')&&world.events.find(e=>e.id===s.eventId).sortOrder>=death.sortOrder).sort((a,b)=>world.events.find(e=>e.id===a.eventId).sortOrder-world.events.find(e=>e.id===b.eventId).sortOrder)
 assert.deepEqual(after.map(s=>world.events.find(e=>e.id===s.eventId).title),['Beth Dies at Dawn','Made Ready for Sleep','The Empty Room'],'Beth must not appear in later memories')
 assert.ok(after.every(s=>s.isAlive===false),'Beth must remain deceased')
 return count
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
 const world=JSON.parse(fs.readFileSync(new URL('../../library/little-women.pwk',import.meta.url),'utf8'))
 console.log('Full source-presence PASS: '+validatePresence(world)+' scenes, 47 chapters, every paragraph boundary and individual physical placement.')
}
