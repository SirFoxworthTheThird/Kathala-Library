import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('ends the warning episode with Valjean home while the unnamed figure escapes into the moat',()=>{
 const row=enrichedReview().get(263).find(row=>row.at===22)
 expect(row.actorLocations.valjean).toBe('rue-plumet-pavilion')
 expect(row.location).toBe('champ-de-mars-moat')
 expect(row.present.find(([key])=>key==='valjean')[1]).toMatch(/Returns home/)
 expect(row.present.find(([key])=>key==='champ-de-mars-warning-figure')[1]).toMatch(/parapet/)
})
