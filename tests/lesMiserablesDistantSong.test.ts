import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'
import{validateUnlocatedPositions}from'../scripts/les-miserables/unlocated-positions.mjs'

test('records Gavroche loading and singing without moving him beside his wounded sister',()=>{
 const review=enrichedReview(),row=review.get(293).find(row=>row.at===54)
 expect(row.present.find(([key])=>key==='gavroche')?.[1]).toMatch(/table.*load.*sings/)
 expect(row.actorLocations.gavroche).toBeNull()
 expect(row.location).toBe('mondetour-small-barricade')
 expect(validateUnlocatedPositions(review).approved).toBe(28)
})
