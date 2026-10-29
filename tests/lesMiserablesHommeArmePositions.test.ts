import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('keeps the withdrawn daughter and answering servant inside while Valjean moves out',()=>{
 const rows=enrichedReview().get(295)
 expect(rows.find(row=>row.at===14).actorLocations.cosette).toBe('homme-arme-cosette-room')
 expect(rows.find(row=>row.at===42).actorLocations.toussaint).toBe('homme-arme-dining-room')
})

test('does not make Valjean follow Gavroche down Rue du Chaume',()=>{
 const row=enrichedReview().get(296).find(row=>row.at===64)
 expect(row.location).toBe('rue-chaume')
 expect(row.actorLocations.valjean).toBe('homme-arme-doorstep')
})
