import{expect,test}from'vitest'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'
test('distinguishes the marriage transfer from the display of the notes and their later non-use',()=>{
 expect(itemStateChanges.find(r=>r.key==='marriage-banknotes-remitted')).toMatchObject({chapter:350,at:17,evidenceParagraph:17,kind:'custody-report',custodian:'marius'})
})
test('moves the keepsakes out of the valise and the crucifix off the wall at their actual handling',()=>{
 expect(itemStateChanges.find(r=>r.key==='childhood-clothes-on-bedroom-bed')).toMatchObject({chapter:352,at:10,evidenceParagraph:11,kind:'placed',location:'homme-arme-valjean-room'})
 expect(itemStateChanges.find(r=>r.key==='childhood-clothes-on-final-bed')).toMatchObject({chapter:362,at:'start',evidenceParagraph:3,kind:'placed',location:'homme-arme-dining-room'})
 expect(itemStateChanges.find(r=>r.key==='crucifix-laid-on-table')).toMatchObject({chapter:364,at:92,evidenceParagraph:92,kind:'placed',location:'homme-arme-dining-room'})
})
