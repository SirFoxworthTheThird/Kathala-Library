import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('keeps the singer outside the Musain back room',()=>{
 const row=enrichedReview().get(180).find(row=>row.at===21)
 expect(row.present.map(([key])=>key)).toContain('combeferre')
 expect(row.actorLocations.combeferre).toBe('cafe-musain')
 expect(row.present.find(([key])=>key==='combeferre')[1]).toMatch(/stairs/)
})

test('keeps Toussaint upstairs and Éponine at the defended gate',()=>{
 const rows=enrichedReview().get(259)
 const linen=rows.find(row=>row.at===32)
 expect(linen.present.map(([key])=>key)).toContain('toussaint')
 expect(linen.actorLocations.toussaint).toBe('rue-plumet-pavilion')
 expect(rows.find(row=>row.at===109).actorLocations.eponine).toBe('rue-plumet-garden-gate')
})
