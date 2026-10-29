import{expect,test}from'vitest'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'
import{itemDefinitions}from'../scripts/les-miserables/item-ledger.mjs'

test('tracks the found packet through reading, setting aside and actual return',()=>{
 const rows=itemStateChanges.filter(row=>row.item==='four-petitions-packet')
 expect(rows.map(row=>[row.chapter,row.at,row.kind,row.holder??row.location])).toEqual([
  [202,13,'held','marius'],[203,'start','held','marius'],[203,36,'placed','gorbeau-marius-room'],[204,46,'held','jondrette-elder-daughter'],
 ])
})

test('does not embroider the unembroidered handkerchief or make Ursule its owner',()=>{
 expect(itemDefinitions.get('leblanc-uf-handkerchief').description).not.toContain('embroidered initials')
 expect(itemStateChanges.find(row=>row.key==='uf-handkerchief-found')).toMatchObject({chapter:194,at:4,holder:'marius'})
 expect(itemStateChanges.find(row=>row.key==='marius-five-franc-gift-given')).toMatchObject({chapter:204,at:63,evidenceParagraph:68,holder:'jondrette-elder-daughter'})
 expect(itemStateChanges.find(row=>row.key==='bobbies-sample-written')).toMatchObject({chapter:204,at:20,evidenceParagraph:38,kind:'placed',location:'gorbeau-marius-room'})
})
