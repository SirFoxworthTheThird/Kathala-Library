import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'

test('does not retain the dismissed portress beside Valjean after she disappears from the doorway',()=>{
 const{world}=buildWorldReview({embedded:false})
 const row=world.characterSnapshots.find(r=>r.eventId==='lesmis-world-review-event-364-5'&&r.characterId==='lesmis-world-review-character-homme-arme-portress')
 expect(row).toBeDefined()
 expect(row?.currentLocationMarkerId).toBeNull()
 expect(row?.currentMapLayerId).toBeNull()
 expect(row?.isAlive).toBe(true)
})
