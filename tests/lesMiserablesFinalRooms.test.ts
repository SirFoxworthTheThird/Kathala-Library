import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'
const row=(n:number,at:number)=>enrichedReview().get(n).find(r=>r.at===at)
test('separates the upstairs consultation from the later downstairs report',()=>{
 expect(row(361,25)).toMatchObject({location:'homme-arme-dining-room',present:expect.arrayContaining([['valjean',expect.any(String)]])})
 expect(row(361,26)).toMatchObject({location:'homme-arme-house'})
 expect(row(361,26).present.map(r=>r[0])).not.toContain('valjean')
})
test('leaves the reunion party in the garden until the carriage arrives',()=>{
 expect(row(363,207).location).toBe('gillenormand-garden')
 expect(row(363,214).location).toBe('seine-right-bank-reunion-coach')
})
test('admits the doctor at his actual entrance and retains him through the blessing',()=>{
 expect(row(364,55).present.map(r=>r[0])).not.toContain('homme-arme-doctor')
 expect(row(364,76).present.map(r=>r[0])).toContain('homme-arme-doctor')
 expect(row(364,112).present.map(r=>r[0])).toContain('homme-arme-doctor')
})
