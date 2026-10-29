import{expect,test}from'vitest'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'

test('tracks the captured gun and discarded pistols without inventing a successful shot from the unloaded musket',()=>{
 expect(itemStateChanges.find(r=>r.key==='captured-musket-taken')).toMatchObject({chapter:288,at:'start',kind:'held',holder:'gavroche',evidenceParagraph:11})
 expect(itemStateChanges.find(r=>r.key==='captured-musket-unloaded')).toMatchObject({chapter:290,at:8,kind:'held',holder:'gavroche',note:expect.stringContaining('unloaded')})
 expect(itemStateChanges.find(r=>r.key==='signal-pistols-discarded')).toMatchObject({chapter:291,at:3,kind:'placed',note:expect.stringContaining('discharged')})
})

test('keeps the two lovers letters distinct and delivers the reply to Valjean rather than Cosette',()=>{
 expect(itemStateChanges.find(r=>r.key==='withheld-letter-received')).toMatchObject({item:'eponine-withheld-letter-for-marius',chapter:293,at:70,holder:'marius'})
 const reply=itemStateChanges.filter(r=>r.item==='marius-farewell-letter-to-cosette')
 expect(reply.map(r=>[r.chapter,r.at,r.holder])).toEqual([[294,11,'marius'],[294,18,'gavroche'],[296,36,'valjean']])
 expect(itemStateChanges.find(r=>r.key==='gavroche-five-franc-gift-accepted')).toMatchObject({chapter:296,at:20,holder:'gavroche',evidenceParagraph:35})
})
