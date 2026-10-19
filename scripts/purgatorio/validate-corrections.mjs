import assert from 'node:assert/strict'
import {reviewedScenes} from './reviewed-scenes.mjs'
import {cantos,stanzaGroupCount,poemVerseLineCount,translatorNoteLines} from './source-text.mjs'
import {sourceVerse} from './verse-format.mjs'
import {position} from './chronology.mjs'
import {mapCoordinates} from './map-coordinates.mjs'
const cid=k=>`purgatorio-char-${k}`
export function validateCorrections(world){
 assert.equal(world.events.length,129,'Reviewed scene count')
 assert.equal(stanzaGroupCount,1607);assert.equal(poemVerseLineCount,4755);assert.equal(translatorNoteLines.length,8)
 let previous=null
 for(const canto of cantos){const scenes=reviewedScenes[canto.number-1],events=world.events.filter(e=>e.chapterId===`purgatorio-canto-${canto.number}`).sort((a,b)=>a.sortOrder-b.sortOrder)
  assert.equal(events.length,scenes.length)
  scenes.forEach((scene,i)=>{const e=events[i],end=scenes[i+1]?scenes[i+1].start-1:canto.lines.length
   assert.equal(e.title,scene.title);assert.equal((scene.start-1)%3,0,'Tercet boundary')
   assert.equal(sourceVerse(world.sceneTexts.find(t=>t.eventId===e.id).text),canto.lines.slice(scene.start-1,end).join('\n'),'Source-reviewed cut')
   assert.deepEqual(e.involvedCharacterIds,Object.keys(scene.states).map(cid),'Source-reviewed physical cast')
   const states=world.characterSnapshots.filter(s=>s.eventId===e.id)
   assert.equal(states.length,Object.keys(scene.states).length,'One snapshot per participant')
   for(const [key,status] of Object.entries(scene.states)){const st=states.find(s=>s.characterId===cid(key));assert.ok(st);assert.equal(st.statusNotes,status,'Individual source-reviewed status');assert.equal(st.currentLocationMarkerId,e.locationMarkerId);assert.ok(!/physical presence belongs|experiences and records this part|remains beside Dante as guide/.test(st.statusNotes),'No placeholder states')}
   assert.equal(new Set(states.map(s=>s.statusNotes)).size,states.length,'Distinct individual states')
   assert.equal(e.inWorldTime,position(canto.number-1,scene.start,canto.lines.length),'Source-anchored calendar')
   assert.equal(e.travelDays,previous===null?0:e.inWorldTime-previous,'Elapsed time agrees with calendar')
   assert.ok(e.inWorldTime>=0&&e.inWorldTime<4&&e.travelDays>=0,'Four-day ascent')
   previous=e.inWorldTime
  })
 }
 assert.ok(!world.characterSnapshots.some(s=>s.characterId===cid('lucia')),'Lucia is reported, not present')
 const at=title=>{const e=world.events.find(e=>e.title===title);assert.ok(e,`Missing ${title}`);return e}
 for(const e of world.events.filter(e=>e.sortOrder>=at('Beatrice Arrives').sortOrder))assert.ok(!e.involvedCharacterIds.includes(cid('virgil')),'Virgil has already departed')
 assert.ok(!at('The Watch Beneath the Tree').involvedCharacterIds.includes(cid('griffin')),'Griffin and procession have ascended')
 for(const k of ['statius','matelda','manfred','casella'])assert.ok(world.characters.find(c=>c.id===cid(k)).nameChanges.length,'Delayed name reveal')
 assert.equal(world.knowledgeFacts.find(f=>f.id==='purgatorio-fact-matelda').readerLearnsAtEventId,at('Matelda Named').id)
 assert.equal(world.knowledgeFacts.find(f=>f.id==='purgatorio-fact-lucia').readerLearnsAtEventId,at('Before the Gate').id)
 assert.ok(at('The Blood in the Marsh').involvedCharacterIds.includes(cid('jacopo')),'Jacopo testimony retained')
 assert.ok(at('Provenzan’s Humiliation').involvedCharacterIds.includes(cid('provenzan')),'Provenzan directly seen')
 assert.ok(at('The Pageant of Corruption').involvedCharacterIds.includes(cid('assailants')),'Allegorical actors represented')
 assert.ok(at('Bonagiunta and the New Style').sortOrder<at('The Second Tree').sortOrder,'Canto XXIV source order')
 for(const [key,[x,y]] of Object.entries(mapCoordinates)){const l=world.locationMarkers.find(l=>l.id===`purgatorio-loc-${key}`);assert.equal(l.x,x,'Reviewed map x');assert.equal(l.y,y,'Bottom-origin map y')}
 assert.equal(world.locationMarkers.find(l=>l.id==='purgatorio-loc-gateStairs').linkedMapLayerId,'purgatorio-map-terraces','Gate approach opens terraces')
 for(const r of [...world.relationships,...world.relationshipSnapshots])assert.ok(['weak','moderate','strong','bond'].includes(r.strength),'Application relationship strength enum')
 for(const snap of [...world.characterSnapshots,...world.itemPlacements,...world.itemSnapshots,...world.relationshipSnapshots]){const e=world.events.find(e=>e.id===snap.eventId),chapter=world.chapters.find(c=>c.id===e.chapterId);assert.equal(snap.sortKey,chapter.number+e.sortOrder/1_000_000,'Application snapshot order scale')}
 assert.equal(world.itemSnapshots.filter(s=>s.itemId==='purgatorio-item-letters').length,8,'Marks change through the ascent')
 assert.ok(world.relationshipSnapshots.some(s=>s.eventId===at('Virgil Is Gone').id&&!s.isActive),'Guide relationship ends at departure')
 for(const g of world.characterGoals)assert.ok(['want','need','fear','flaw'].includes(g.type),'Application character goal type enum')
 for(const f of world.knowledgeFacts)assert.ok(world.knowledgeReveals.some(r=>r.factId===f.id&&r.characterId===cid('dante')&&r.eventId===f.readerLearnsAtEventId),'Dante learns each narrated fact')
 return true
}
