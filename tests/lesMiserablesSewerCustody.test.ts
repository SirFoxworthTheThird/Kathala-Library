import{expect,test}from'vitest'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'

test('returns the captured musket only when Gavroche returns from the letter errand',()=>{
 expect(itemStateChanges.find(r=>r.key==='captured-musket-returned')).toMatchObject({chapter:306,at:14,evidenceParagraph:15,item:'javert-captured-musket',kind:'held',holder:'gavroche'})
})

test('keeps the rescue pocket-book and offered rope in the hands actually shown',()=>{
 expect(itemStateChanges.find(r=>r.key==='return-pocketbook-replaced')).toMatchObject({chapter:332,at:9,evidenceParagraph:12,holder:'marius'})
 expect(itemStateChanges.find(r=>r.key==='sewer-rope-accepted')).toMatchObject({chapter:336,at:11,evidenceParagraph:32,holder:'valjean'})
 expect(itemStateChanges.find(r=>r.key==='return-pocketbook-kept-by-javert')).toMatchObject({chapter:337,at:39,evidenceParagraph:45,holder:'javert'})
})
