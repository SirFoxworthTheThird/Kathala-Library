import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('separates the witnessed prison search from the earlier reported errands',()=>{
 const rows=enrichedReview().get(230),night=rows.find(r=>r.at===16)
 expect(rows.find(r=>r.at===14).kind).toBe('reported')
 expect(night?.kind).toBe('scene')
 expect(night?.present.map(([key])=>key)).toEqual(['brujon','la-force-night-watchman','la-force-watch-superintendent'])
 expect(night?.actorLocations?.brujon).toBe('la-force')
 expect(night?.actorLocations?.['la-force-watch-superintendent']).toBe('la-force')
 expect(night?.location).toBe('la-force-new-building')
})
