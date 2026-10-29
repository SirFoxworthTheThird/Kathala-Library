import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'

test('models the borrowed double-barrelled rifle separately from Valjean’s equipment',()=>{
 const{world}=buildWorldReview({embedded:false})
 const id='lesmis-world-review-item-enjolras-borrowed-rifle'
 expect(world.items.find(r=>r.id===id)?.description).toMatch(/double-barrelled/)
 const held=world.characterSnapshots.filter(r=>r.inventoryItemIds.includes(id))
 expect(held.map(r=>[r.eventId,r.characterId])).toEqual([
  ['lesmis-world-review-event-307-2','lesmis-world-review-character-valjean'],
 ])
})

test('records the return at its report without inventing a distinct return scene',()=>{
 expect(itemStateChanges.find(r=>r.key==='enjolras-rifle-lent')).toMatchObject({chapter:307,at:7,evidenceParagraph:8,kind:'held',holder:'valjean'})
 expect(itemStateChanges.find(r=>r.key==='enjolras-rifle-returned')).toMatchObject({chapter:309,at:7,evidenceParagraph:7,kind:'custody-report',custodian:'enjolras'})
})
