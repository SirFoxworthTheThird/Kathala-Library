import{expect,test}from'vitest'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'
import{chapters}from'../scripts/les-miserables/source-text.mjs'

test('records the found purse surrendered to police without giving Mabeuf spendable funds',()=>{
 const row=itemStateChanges.find(row=>row.key==='lane-purse-surrendered')
 expect(row).toMatchObject({item:'mabeuf-lane-gift-purse',chapter:265,at:'start',evidenceParagraph:0,kind:'custody-report',custodian:null})
 expect(row.note).toContain('police commissioner')
 expect(chapters[264].paragraphs[0].text).toContain('no one claimed it')
})
