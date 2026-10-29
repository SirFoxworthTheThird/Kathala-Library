import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'

test('retains Mabeuf’s particular Diogenes volume through the reported sale without inventing a medicine purchase',()=>{
 const{world}=buildWorldReview({embedded:false})
 const item=world.items.find(r=>r.id==='lesmis-world-review-item-mabeuf-diogenes-volume')
 expect(item).toBeDefined()
 expect(item?.description).toMatch(/Lyons in 1644/)
 expect(item?.description).not.toMatch(/sold|hundred|Plutarque/)
 const rows=world.itemSnapshots.filter(r=>r.itemId===item?.id)
 expect(rows).toHaveLength(2)
 expect(rows[1].eventId).toBe('lesmis-world-review-event-265-5')
 expect(rows[1].notes).toMatch(/one hundred francs/)
 expect(rows[1].notes).toMatch(/does not show/)
 expect(world.itemPlacements.filter(r=>r.itemId===item?.id)).toHaveLength(0)
})
