import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('records named defenders taking actual positions rather than treating them as absent reports',()=>{
 const row=enrichedReview().get(288).find(row=>row.at===12)
 expect(row.present.map(([key])=>key)).toEqual(['enjolras','combeferre','courfeyrac','bossuet','joly','bahorel','gavroche','feuilly'])
 expect(row.kind).toBe('scene')
 expect(row.actorLocations.feuilly).toBe('corinthe')
 expect(row.present.find(([key])=>key==='feuilly')[1]).toMatch(/windows/)
 expect(new Set(row.present.map(([,state])=>state)).size).toBe(8)
})
