import{expect,test}from'vitest'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'

test('keeps source offsets and generator vocabulary out of reader-facing object notes',()=>{
 for(const change of itemStateChanges){
  expect(change.note,change.key).not.toMatch(/\bat\d+\b|\binventory\b|carry-forward|source confirmation/i)
 }
 const handkerchief=itemStateChanges.find(row=>row.key==='uf-handkerchief-found')
 expect(handkerchief.note).not.toMatch(/afterward|later|narrator corrects/)
})
