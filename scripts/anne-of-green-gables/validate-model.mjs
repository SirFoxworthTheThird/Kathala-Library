import assert from 'node:assert/strict'
import fs from 'node:fs'
import { sceneModel } from './scene-model.mjs'
import { chapters } from './source-text.mjs'
import { dayFor } from './calendar-model.mjs'
const slug=s=>s.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const geometry=JSON.parse(fs.readFileSync(new URL('./map-geometry.json',import.meta.url),'utf8'))
export function validateModel(d){
 const ordered=[...d.events].sort((a,b)=>a.sortOrder-b.sortOrder),get=title=>ordered.find(e=>e.title===title)
 assert.equal(ordered.length,[...sceneModel.values()].flat().length,'Reviewed scene count')
 for(const [ch,rows] of sceneModel){
  const events=ordered.filter(e=>e.chapterId===`anne-of-green-gables-chapter-${ch}`)
  assert.equal(events.length,rows.length,`Reviewed cuts in chapter ${ch}`)
  for(let i=0;i<rows.length;i++){
   const row=rows[i],event=events[i],expected=chapters[ch-1].paragraphs.slice(row.start-1,(rows[i+1]?.start??chapters[ch-1].paragraphs.length+1)-1).join('\n\n')
   assert.equal(d.sceneTexts.find(s=>s.eventId===event.id)?.text,expected,`Paragraph coverage ${ch}.${i+1}`)
   assert.equal(event.description,ch<3?row.description.replace(/Anne/g,'the girl'):row.description,`Individual action ${ch}.${i+1}`)
   assert.equal(event.inWorldTime,dayFor(ch,i,row.title),`Source-anchored calendar ${ch}.${i+1}`)
   assert.deepEqual([...event.involvedCharacterIds].sort(),Object.keys(row.notes).map(n=>'anne-char-'+slug(n)).sort(),`Actual scene cast ${ch}.${i+1}`)
   for(const [name,note] of Object.entries(row.notes))assert.equal(d.characterSnapshots.find(s=>s.eventId===event.id&&s.characterId==='anne-char-'+slug(name))?.statusNotes,note,`Individual state ${ch}.${i+1}: ${name}`)
  }
 }
 assert.ok(ordered.at(-1).inWorldTime-ordered[0].inWorldTime>=1825,'Five-year chronology must not be compressed')
 assert.ok(!ordered.some(e=>/This scene isolates|next concrete consequence/.test(e.description)),'No generic event summaries')
 assert.ok(!d.characterSnapshots.some(s=>/immediate role|participates directly in the action|quiet attention or action|scene’s immediate choice/.test(s.statusNotes)),'No standing-role snapshot templates')
 const ch36=ordered.filter(e=>e.chapterId.endsWith('-36'));assert.deepEqual(ch36.map(e=>e.locationMarkerId),['anne-loc-queen-s-academy','anne-loc-queen-s-academy','anne-loc-east-gable','anne-loc-green-gables-kitchen','anne-loc-green-gables-yard'])
 assert.ok(!ordered.filter(e=>['anne-loc-queen-s-academy','anne-loc-anne-s-charlottetown-lodging'].includes(e.locationMarkerId)).some(e=>e.involvedCharacterIds.includes('anne-char-diana-barry')),'Diana never attends Queen’s')
 const letter=get('A Letter from Entrance Week');assert.deepEqual(letter.involvedCharacterIds,['anne-char-anne-shirley'],'The exam letter has only its writer present')
 assert.ok(!ordered.some(e=>e.title==='The City Visit Is Recounted'),'No invented home-and-back journey inside the Exhibition account')
 assert.ok(!get('The Exhibition').involvedCharacterIds.includes('anne-char-marilla-cuthbert'),'The quoted account does not put Marilla at the Exhibition')
 const medal=d.itemPlacements.find(p=>p.itemId==='anne-item-medal'),ceremony=get('Avery Scholarship and Gold Medal');assert.equal(medal.eventId,ceremony.id);assert.equal(medal.locationMarkerId,ceremony.locationMarkerId)
 const holders=d.characterSnapshots.filter(s=>s.eventId===ceremony.id&&s.inventoryItemIds.includes('anne-item-medal'));assert.deepEqual(holders.map(s=>s.characterId),['anne-char-gilbert-blythe'],'The medal belongs to Gilbert')
 const fall=get('Matthew Falls'),death=get('Rachel Checks Matthew’s Heart');const matthew='anne-char-matthew-cuthbert'
 assert.equal(d.characterSnapshots.find(s=>s.eventId===fall.id&&s.characterId===matthew).isAlive,true,'Death remains unconfirmed at the collapse')
 assert.equal(d.characterSnapshots.find(s=>s.eventId===death.id&&s.characterId===matthew).isAlive,false,'Death is revealed at Rachel’s examination')
 assert.ok(d.characterSnapshots.filter(s=>s.characterId===matthew&&getById(s.eventId).sortOrder>=death.sortOrder).every(s=>s.isAlive===false),'No resurrection after the report')
 function getById(id){return ordered.find(e=>e.id===id)}
 for(const l of d.locationMarkers.filter(l=>l.mapLayerId==='anne-map-island')){assert.deepEqual({x:l.x,y:l.y},geometry.locations[l.name],`Projected island marker ${l.name}`)}
 for(const [key,points] of Object.entries(geometry.routes))assert.deepEqual(d.mapRoutes.find(r=>r.id==='anne-route-'+key)?.waypoints,points,`Land-safe route ${key}`)
 for(const ch of d.chapters){const first=ordered.find(e=>e.chapterId===ch.id);assert.equal(ch.synopsis,first.description,`Synopsis reveals only chapter opening ${ch.number}`)}
 assert.ok(d.lorePages.find(p=>p.id==='anne-lore-source').body.includes('OpenAI ImageGen'),'Reader-facing art provenance')
}
