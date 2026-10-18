import assert from 'node:assert/strict'
import {characterStates} from './character-states.mjs'

export function validateCorrections(d){
 const event=title=>{const e=d.events.find(e=>e.title===title);assert.ok(e,`Missing ${title}`);return e}
 const cast=title=>event(title).involvedCharacterIds
 const id=key=>`cold-choir-char-${key}`
 for(const e of d.events){
  const states=characterStates[e.title];assert.ok(states,`Unreviewed states: ${e.title}`)
  assert.deepEqual(new Set(e.involvedCharacterIds),new Set(Object.keys(states).map(id)),`${e.title}: reviewed cast`)
  for(const s of d.characterSnapshots.filter(s=>s.eventId===e.id)){
   assert.ok(!s.statusNotes.includes(e.description),`${e.title}: prefixed event description`)
   assert.equal(s.statusNotes,states[s.characterId.replace('cold-choir-char-','')],`${e.title}: individual reviewed state`)
  }
 }
 assert.deepEqual(cast('Waking'),[id('osh')])
 assert.deepEqual(new Set(cast('At the Inner Hatch')),new Set([id('osh'),id('kit')]))
 assert.ok(cast('Row Thirty-One').includes(id('ama')),'Sleeping Ama is physically present')
 assert.ok(cast('Ama Opens Her Eyes').includes(id('ama')),'Ama is present at awakening')
 assert.ok(Math.abs(event('The First Hidden Line').inWorldTime-event('Tamsin Takes the Book').inWorldTime-40)<1e-9,'Forty-day Ledger custody')
 assert.ok(Math.abs(event('Tamsin Takes the Book').inWorldTime-event('The Store Burns').inWorldTime-18/24)<1e-9,'Eighteen-hour fire interval')
 assert.ok(Math.abs(event('Row Thirty-One').inWorldTime-event('Waking').inWorldTime-20/1440)<1e-9,'Twenty-minute search')
 assert.ok(Math.abs(event('Ama Opens Her Eyes').inWorldTime-event('Row Thirty-One').inWorldTime-4/24)<1e-9,'Four-hour warming')
 assert.equal(event('The Broadcast').inWorldTime-event('Investiture').inWorldTime,18)
 assert.equal(event('The Broadcast').inWorldTime-event('Hal').inWorldTime,11)
 const pilot=d.locationMarkers.find(l=>l.id==='cold-choir-loc-cold-cell')
 const map=d.mapLayers.find(m=>m.id===pilot.mapLayerId)
 assert.ok(pilot.y/map.imageHeight<0.2,'Pilot cell must be at aft rim')
 const letter=d.items.find(i=>i.id==='cold-choir-item-letter')
 assert.match(letter.name,/Ilse/);assert.match(letter.description,/signed.*Ilse Varga/)
 assert.ok(!/Bram[’']s letter/.test(letter.name),'Letter is authored by Ilse')
 const fane=d.characterSnapshots.find(s=>s.eventId===event('Fane in the Cold Rows').id&&s.characterId===id('fane'))
 assert.equal(fane.isAlive,false)
}
