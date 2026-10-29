import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('keeps the sweeping portress at Gorbeau rather than moving her to the girls’ encounter',()=>{
 const rows=enrichedReview().get(202),door=rows.find(row=>row.at===4),street=rows.find(row=>row.at===7)
 expect(door.location).toBe('gorbeau-house')
 expect(door.present.map(([key])=>key).sort()).toEqual(['madame-bourgon','marius'])
 expect(street.present.map(([key])=>key).sort()).toEqual(['boulevard-shorter-ragged-girl','boulevard-taller-ragged-girl','marius'])
})

test('includes the provincial guest Marius actually embraces at breakfast',()=>{
 const row=enrichedReview().get(193).find(row=>row.at===9)
 expect(row.present.map(([key])=>key)).toContain('voltaire-provincial-guest')
})

test('records the specific Sceaux outing with its four friends without the absent girl',()=>{
 const row=enrichedReview().get(201).find(row=>row.at===3)
 expect(row.kind).toBe('scene')
 expect(row.present.map(([key])=>key).sort()).toEqual(['bossuet','courfeyrac','grantaire','marius'])
 expect(row.actorLocations.marius).toBe('gorbeau-marius-room')
})
