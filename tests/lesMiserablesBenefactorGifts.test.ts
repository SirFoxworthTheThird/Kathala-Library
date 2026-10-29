import{expect,test}from'vitest'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'

test('keeps the visitor’s parcel and first coin on the table and his coat with its actual recipient',()=>{
 const row=(key:string)=>itemStateChanges.find(change=>change.key===key)
 expect(row('relief-parcel-set-down')).toMatchObject({item:'leblanc-relief-parcel',chapter:208,at:14,evidenceParagraph:25,kind:'placed',location:'gorbeau-jondrette-attic'})
 expect(row('leblanc-five-francs-set-down')).toMatchObject({item:'leblanc-five-franc-piece',chapter:209,at:27,evidenceParagraph:32,kind:'placed',location:'gorbeau-jondrette-attic'})
 expect(row('brown-greatcoat-accepted')).toMatchObject({item:'leblanc-brown-greatcoat',chapter:209,at:35,evidenceParagraph:52,kind:'held',holder:'jondrette'})
 expect(row('brown-greatcoat-worn-outside')).toMatchObject({chapter:210,at:18,evidenceParagraph:18,holder:'jondrette'})
})
