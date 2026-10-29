import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('ends the unheard call with Gillenormand back inside his bedroom',()=>{
 const row=enrichedReview().get(262).find(row=>row.at===121)
 expect(row.actorLocations?.gillenormand).toBe('gillenormand-bedroom')
 expect(row.present.find(([key])=>key==='gillenormand')[1]).toMatch(/chair/)
 expect(row.present.some(([key])=>key==='marius')).toBe(false)
 expect(row.mentioned).toContain('marius')
})
