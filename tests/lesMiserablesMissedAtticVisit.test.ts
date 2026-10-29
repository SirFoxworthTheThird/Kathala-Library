import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('separates Marius leaving the attic from his grandfather’s arrival after he has gone',()=>{
 const rows=enrichedReview().get(175),departure=rows.find(row=>row.at===2),arrival=rows.find(row=>row.at===3)
 expect(departure.present.map(row=>row[0])).toEqual(['marius'])
 expect(departure.actorLocations.marius).toBeNull()
 expect(arrival.present.map(row=>row[0])).toEqual(['gillenormand'])
 expect(arrival.reason).toContain('Marius was no longer there')
})
