import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('keeps Marius’s directly narrated responses on his own side of the ambush partition',()=>{
 const rows=enrichedReview().get(220)
 for(const at of['start',21,47,57,75,107,179,205,221,242]){
  const row=rows.find(row=>row.at===at)
  expect(row.present.filter(([key])=>key==='marius'),String(at)).toHaveLength(1)
  expect(row.actorLocations.marius).toBe('gorbeau-partition-aperture')
  expect(row.mentioned??[]).not.toContain('marius')
 }
 expect(rows.find(row=>row.at===239).present).toEqual([])
 expect(rows.find(row=>row.at===21).present.find(([key])=>key==='marius')[1]).toContain('Lowers')
 expect(rows.find(row=>row.at===57).present.find(([key])=>key==='marius')[1]).toContain('trigger')
})
