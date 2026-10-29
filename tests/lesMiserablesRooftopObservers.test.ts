import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'
import{validateUnlocatedPositions}from'../scripts/les-miserables/unlocated-positions.mjs'

test('includes the directly visible fireman before the first shot',()=>{
 const row=enrichedReview().get(309).find(r=>r.at===5)
 expect(row.present.find(([key])=>key==='chanvrerie-rooftop-fireman')?.[1]).toMatch(/chimney/)
 expect(row.mentioned??[]).not.toContain('chanvrerie-rooftop-fireman')
 expect(row.actorLocations?.['chanvrerie-rooftop-fireman']).toBeNull()
})

test('does not place the departing rooftop observers inside the street barricade',()=>{
 const review=enrichedReview(),row=review.get(309).find(r=>r.at===7)
 for(const key of['chanvrerie-rooftop-fireman','chanvrerie-rooftop-officer'])expect(row.actorLocations?.[key]).toBeNull()
 expect(validateUnlocatedPositions(review).approved).toBe(28)
})
