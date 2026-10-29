import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'

test('retains the captured musket in the explicit table-loading beat',()=>{
 const{world}=buildWorldReview({embedded:false})
 const snapshot=world.characterSnapshots.find(r=>r.eventId==='lesmis-world-review-event-293-4'&&r.characterId==='lesmis-world-review-character-gavroche')
 expect(snapshot).toBeTruthy()
 expect(snapshot.inventoryItemIds).toContain('lesmis-world-review-item-javert-captured-musket')
 expect(snapshot.currentLocationMarkerId).toBeNull()
})
