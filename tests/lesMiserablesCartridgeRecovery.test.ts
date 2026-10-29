import{expect,test}from'vitest'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'
test('follows the ammunition basket from collection and spill to Combeferre’s recovery',()=>{
 const rows=itemStateChanges.filter(r=>r.item==='gavroche-cartridge-basket')
 expect(rows.map(r=>[r.chapter,r.at,r.kind,r.holder??r.location])).toEqual([
  [313,'start','held','gavroche'],[313,19,'held','gavroche'],[313,38,'placed','rue-chanvrerie'],
  [315,'start','held','combeferre'],[315,6,'held','combeferre'],
 ])
 expect(rows.find(r=>r.chapter===313&&r.at===19).note).toContain('every fallen cartridge')
})
test('separates finding the powder-flask from its later joint use without guessing whose hand holds it',()=>{
 expect(itemStateChanges.find(r=>r.key==='powder-flask-found')).toMatchObject({chapter:313,at:12,evidenceParagraph:18,holder:'gavroche'})
 expect(itemStateChanges.find(r=>r.key==='powder-flask-shared-use')).toMatchObject({chapter:315,at:15,evidenceParagraph:15,kind:'custody-report',custodian:null})
})
