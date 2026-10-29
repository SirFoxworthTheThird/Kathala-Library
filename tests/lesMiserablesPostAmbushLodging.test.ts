import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'

test('stages the offered mattress separately from the next morning’s non-overlapping visits',()=>{
 const rows=enrichedReview().get(229),night=rows[0],morning=rows.find(row=>row.at===1)
 expect(night.kind).toBe('scene')
 expect(night.present.map(([key])=>key).sort()).toEqual(['courfeyrac','marius'])
 expect(night.location).toBe('courfeyrac-rue-verrerie-lodgings')
 expect(morning.present).toEqual([])
 expect(morning.reason).toContain('after Marius has gone')
 expect(itemStateChanges.find(row=>row.key==='chairs-removed-from-gorbeau')).toMatchObject({chapter:229,at:1,evidenceParagraph:1,kind:'custody-report',custodian:'marius'})
})
