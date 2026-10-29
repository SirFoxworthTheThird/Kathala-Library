import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'

test('leaves Eponine outside while Marius reaches the taproom candle after their farewell',()=>{
 const{world}=buildWorldReview({embedded:false})
 const rows=world.characterSnapshots.filter(r=>r.eventId==='lesmis-world-review-event-294-1')
 expect(rows.find(r=>r.characterId==='lesmis-world-review-character-marius')?.currentLocationMarkerId).toBe('lesmis-world-review-location-corinthe-taproom')
 expect(rows.find(r=>r.characterId==='lesmis-world-review-character-eponine')).toMatchObject({currentLocationMarkerId:'lesmis-world-review-location-mondetour-small-barricade',isAlive:false})
})
