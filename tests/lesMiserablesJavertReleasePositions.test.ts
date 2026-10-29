import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'

test('ends the sham execution with Valjean back at the barricade and Javert alive at an unobserved onward position',()=>{
 const{world}=buildWorldReview({embedded:false})
 const state=(actor:string)=>world.characterSnapshots.find(r=>r.eventId==='lesmis-world-review-event-317-5'&&r.characterId===`lesmis-world-review-character-${actor}`)
 expect(state('valjean')?.currentLocationMarkerId).toBe('lesmis-world-review-location-chanvrerie-barricade')
 expect(state('javert')?.currentLocationMarkerId).toBeNull()
 expect(state('javert')?.currentMapLayerId).toBeNull()
 expect(state('javert')?.isAlive).toBe(true)
})
