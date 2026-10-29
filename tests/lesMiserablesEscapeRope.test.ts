import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'

test('distinguishes the remaining escape rope from its detached fragment until the pieces are rejoined',()=>{
 const{world}=buildWorldReview({embedded:false})
 const main='lesmis-world-review-item-brujon-escape-rope'
 const fragment='lesmis-world-review-item-brujon-rope-fragment'
 expect(world.items.some(r=>r.id===main)).toBe(true)
 expect(world.items.some(r=>r.id===fragment)).toBe(true)
 const mainStates=world.itemSnapshots.filter(r=>r.itemId===main)
 const fragments=world.itemSnapshots.filter(r=>r.itemId===fragment)
 expect(mainStates.some(r=>/broken/.test(r.notes)&&r.condition==='damaged')).toBe(true)
 expect(fragments.some(r=>/chimney/.test(r.notes))).toBe(true)
 expect(fragments.some(r=>/pocket/.test(r.notes))).toBe(true)
 expect(fragments.some(r=>/rejoined/.test(r.notes))).toBe(true)
 const end=world.itemPlacements.filter(r=>r.itemId===main)
 expect(end).toHaveLength(1)
 expect(end[0].notes).toMatch(/cross-bar/)
 expect(world.itemPlacements.filter(r=>r.itemId===fragment)).toHaveLength(0)
 const wine=world.items.find(r=>r.id==='lesmis-world-review-item-la-force-drugged-wine-bottle')
 expect(wine).toBeDefined()
 const wineStates=world.itemSnapshots.filter(r=>r.itemId===wine?.id)
 expect(wineStates).toHaveLength(1)
 expect(wineStates[0].notes).toMatch(/does not identify/)
})
