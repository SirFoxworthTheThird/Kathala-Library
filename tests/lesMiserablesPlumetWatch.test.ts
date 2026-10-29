import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('separates the drawing-room song from the first-floor search',()=>{
 const rows=enrichedReview().get(244)
 expect(rows.find(row=>row.at===2).location).toBe('rue-plumet-pavilion')
 expect(rows.find(row=>row.at===7)).toMatchObject({location:'rue-plumet-cosette-room',present:[['cosette',expect.any(String)]]})
})

test('keeps the night watcher below the girl at her first-floor shutter',()=>{
 const rows=enrichedReview().get(244)
 for(const at of[29,31]){
  const row=rows.find(row=>row.at===at)
  expect(row.actorLocations).toMatchObject({cosette:'rue-plumet-cosette-room',valjean:'rue-plumet-garden-steps'})
 }
})

test('the next-morning breakfast is distinct from the window exchange',()=>{
 const row=enrichedReview().get(244).find(row=>row.at===37)
 expect(row).toMatchObject({location:'rue-plumet-pavilion',kind:'scene'})
 expect(row.present.map(([key])=>key)).toEqual(['cosette','valjean'])
})
