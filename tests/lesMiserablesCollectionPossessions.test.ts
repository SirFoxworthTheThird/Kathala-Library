import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'
test('keeps the basket and pocketed flask through the brief collection episode and stops at Gavroche’s fall',()=>{
 const{world}=buildWorldReview({embedded:false}),prefix='lesmis-world-review'
 const state=(suffix:string)=>world.characterSnapshots.find(r=>r.eventId===prefix+'-event-'+suffix&&r.characterId===prefix+'-character-gavroche')
 for(const suffix of['313-2','313-3','313-4'])expect(state(suffix).inventoryItemIds).toContain(prefix+'-item-gavroche-cartridge-basket')
 for(const suffix of['313-2','313-3','313-4'])expect(state(suffix).inventoryItemIds).toContain(prefix+'-item-gavroche-found-powder-flask')
 expect(state('313-5').inventoryItemIds).not.toContain(prefix+'-item-gavroche-cartridge-basket')
 expect(state('315-1').inventoryItemIds).not.toContain(prefix+'-item-gavroche-cartridge-basket')
})
