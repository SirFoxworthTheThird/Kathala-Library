import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'
test('restores the spoken hotel reckoning after the separately summarized sales',()=>{
 const r=enrichedReview().get(181).find(r=>r.at===43)
 expect(r.kind).toBe('scene')
 expect(r.present.map(p=>p[0])).toEqual(['marius','courfeyrac','hotel-porte-saint-jacques-proprietor'])
 expect(r.present[2][1]).toContain('seventy francs')
})
test('separates selling the gold watch from refusing the later family remittance',()=>{
 expect(itemStateChanges.find(r=>r.key==='marius-watch-sold')).toMatchObject({chapter:181,at:43,evidenceParagraph:43,kind:'custody-report',custodian:null})
 expect(itemStateChanges.find(r=>r.key==='family-remittance-returned')).toMatchObject({chapter:181,at:50,evidenceParagraph:52,kind:'custody-report',custodian:'gillenormand-elder-daughter'})
})
