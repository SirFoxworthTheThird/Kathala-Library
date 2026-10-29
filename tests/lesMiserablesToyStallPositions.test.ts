import {expect,test} from 'vitest'
import {buildWorldReview} from '../scripts/les-miserables/build-world-review.mjs'
import {chapters} from '../scripts/les-miserables/source-text.mjs'

test('keeps the hostess at the inn when she calls across the street to the toy stall',()=>{
 expect(chapters[95].paragraphs[5].text.replace(/\s+/g,' ')).toContain('cast a glance into the street')
 const {world}=buildWorldReview({embedded:false}),prefix='lesmis-world-review'
 const snapshots=world.characterSnapshots.filter(row=>row.eventId===`${prefix}-event-96-2`)
 const hostess=snapshots.find(row=>row.characterId===`${prefix}-character-madame-thenardier`)
 expect(hostess.currentLocationMarkerId).toBe(`${prefix}-location-thenardier-inn-public-room`)
 for(const actor of ['cosette','toy-merchant']){
  expect(snapshots.find(row=>row.characterId===`${prefix}-character-${actor}`).currentLocationMarkerId).toBe(`${prefix}-location-montfermeil-toy-stall`)
 }
})
