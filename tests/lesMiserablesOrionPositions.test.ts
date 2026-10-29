import {expect,test} from 'vitest'
import {buildWorldReview} from '../scripts/les-miserables/build-world-review.mjs'
import {chapters} from '../scripts/les-miserables/source-text.mjs'

test('keeps the watch officer below the rescue while the convict and topman occupy the elevated rigging',()=>{
 expect(chapters[91].paragraphs[25].text.replace(/\s+/g,' ')).toContain('asked the officer’s permission')
 const{world}=buildWorldReview({embedded:false}),prefix='lesmis-world-review'
 const event=world.events.find(row=>row.id===`${prefix}-event-92-6`)
 const snapshots=world.characterSnapshots.filter(row=>row.eventId===event.id)
 const officer=snapshots.find(row=>row.characterId===`${prefix}-character-orion-watch-officer`)
 expect(officer.currentLocationMarkerId).toBe(`${prefix}-location-orion-deck`)
 expect(officer.currentMapLayerId).toBe(`${prefix}-map-orion-deck`)
 for(const actor of ['valjean','orion-topman']){
  const snapshot=snapshots.find(row=>row.characterId===`${prefix}-character-${actor}`)
  expect(snapshot.currentLocationMarkerId).toBe(`${prefix}-location-orion-main-yard`)
  expect(snapshot.currentMapLayerId).toBe(`${prefix}-map-orion-main-yard`)
 }
})
