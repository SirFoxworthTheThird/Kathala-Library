import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('models both speakers and their concealed listener on opposite sides of the hedge',()=>{
 const rows=enrichedReview().get(242)
 const opening=rows.find(row=>row.at==='start')
 expect(opening.present.map(([key])=>key)).toEqual(['gavroche','mabeuf','mother-plutarque'])
 expect(opening.actorLocations).toMatchObject({mabeuf:'mabeuf-austerlitz-garden','mother-plutarque':'mabeuf-austerlitz-garden'})
 const talk=rows.find(row=>row.at===12)
 expect(talk.present.map(([key])=>key)).toContain('gavroche')
 expect(talk.actorLocations.gavroche).toBe('mabeuf-garden-hedge')
 for(const at of[31,45,66])expect(rows.find(row=>row.at===at).actorLocations.gavroche).toBe('mabeuf-garden-hedge')
})

test('the purse crosses the hedge while its former holder stays in the lane',()=>{
 const row=enrichedReview().get(242).find(row=>row.at===73)
 expect(row.actorLocations).toMatchObject({mabeuf:'mabeuf-austerlitz-garden',montparnasse:'mabeuf-garden-lane',gavroche:null,'mother-plutarque':null})
})
