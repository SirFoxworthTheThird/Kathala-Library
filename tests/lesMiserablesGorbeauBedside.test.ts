import {expect,test} from 'vitest'
import {buildWorldReview} from '../scripts/les-miserables/build-world-review.mjs'
import {chapters} from '../scripts/les-miserables/source-text.mjs'

test('retains the particular bedside morning before the narrator interprets their affection',()=>{
 expect(chapters[105].paragraphs[0].text.replace(/\s+/g,' ')).toContain('at daybreak')
 const {world}=buildWorldReview({embedded:false}),prefix='lesmis-world-review'
 const rows=world.characterSnapshots.filter(row=>row.eventId===`${prefix}-event-106-1`)
 expect(rows.map(row=>row.characterId).sort()).toEqual(['cosette','valjean'].map(key=>`${prefix}-character-${key}`))
 for(const row of rows)expect(row.currentLocationMarkerId).toBe(`${prefix}-location-gorbeau-cosette-chamber`)
})

test('sends Cosette to her inner bedroom while Valjean listens in the outer room',()=>{
 const {world}=buildWorldReview({embedded:false}),prefix='lesmis-world-review'
 const rows=world.characterSnapshots.filter(row=>row.eventId===`${prefix}-event-108-4`)
 expect(rows.find(row=>row.characterId===`${prefix}-character-cosette`).currentLocationMarkerId).toBe(`${prefix}-location-gorbeau-cosette-chamber`)
 expect(rows.find(row=>row.characterId===`${prefix}-character-valjean`).currentLocationMarkerId).toBe(`${prefix}-location-gorbeau-valjean-rooms`)
})
