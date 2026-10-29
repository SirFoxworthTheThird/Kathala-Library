import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'

test('preserves the lost refuge address without inventing a meeting with Barge or a present paper holder',()=>{
 const{world}=buildWorldReview({embedded:false})
 const itemId='lesmis-world-review-item-barge-address-paper'
 expect(world.items.find(r=>r.id===itemId)).toMatchObject({iconType:'document'})
 const changes=world.itemSnapshots.filter(r=>r.itemId===itemId)
 expect(changes).toHaveLength(1)
 expect(changes[0]).toMatchObject({eventId:'lesmis-world-review-event-249-3'})
 expect(changes[0].notes).toMatch(/wind/)
 expect(changes[0].notes).toMatch(/not reach Barge/)
 expect(world.characterSnapshots.filter(r=>r.eventId==='lesmis-world-review-event-249-3')).toEqual([])
 expect(world.itemPlacements.filter(r=>r.itemId===itemId)).toEqual([])
})
