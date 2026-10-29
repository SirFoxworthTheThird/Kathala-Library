import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'

test('keeps the borrowed prison-payment coin distinct from the earlier gift and leaves it where Eponine drops it',()=>{
 const{world}=buildWorldReview({embedded:false})
 const id='lesmis-world-review-item-marius-prison-payment-coin'
 expect(world.items.some(r=>r.id===id)).toBe(true)
 const states=world.itemSnapshots.filter(r=>r.itemId===id)
 expect(states).toHaveLength(2)
 expect(states[0].notes).toMatch(/borrowed from Courfeyrac/)
 expect(states[1]).toMatchObject({eventId:'lesmis-world-review-event-232-6'})
 expect(states[1].notes).toMatch(/lets it fall/)
 expect(states[1].notes).toMatch(/not delivered/)
 const placements=world.itemPlacements.filter(r=>r.itemId===id)
 expect(placements).toHaveLength(1)
 expect(JSON.stringify(placements)).toContain('larks-meadow-departure')
 const eponine=world.characterSnapshots.find(r=>r.eventId==='lesmis-world-review-event-232-6'&&r.characterId==='lesmis-world-review-character-eponine')
 expect(eponine).toBeDefined()
 expect(eponine?.inventoryItemIds).not.toContain(id)
})
