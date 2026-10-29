import{expect,test}from'vitest'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'

test('the purse is given to the attacker, then reaches Mabeuf through Gavroche’s theft',()=>{
 const rows=itemStateChanges.filter(row=>row.item==='mabeuf-lane-gift-purse'&&row.chapter===242)
 expect(rows.map(row=>[row.chapter,row.at,row.evidenceParagraph,row.kind,row.holder])).toEqual([
  [242,66,68,'held','montparnasse'],[242,73,76,'held','mabeuf'],
 ])
 expect(rows[0].note).toContain('gives')
 expect(rows[1].note).toContain('Gavroche')
 expect(rows[1].note).toContain('six napoleons')
 expect(rows[1].note).not.toContain('Valjean')
})
