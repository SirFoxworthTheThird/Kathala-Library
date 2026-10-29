import{expect,test}from'vitest'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'
import{chapters}from'../scripts/les-miserables/source-text.mjs'

test('reports the prison note’s actual relay without inventing a meeting among its carriers',()=>{
 const note=itemStateChanges.filter(row=>row.item==='brujon-rue-plumet-note')
 expect(note.map(row=>[row.chapter,row.at,row.kind,row.custodian])).toEqual([
  [230,17,'custody-report','babet'],
  [230,23,'custody-report','eponine'],
 ])
 expect(note[0].evidenceParagraph).toBe(19)
 expect(note[1].evidenceParagraph).toBe(24)
 expect(note[1].note).toContain('Magnon')
 for(const row of note)expect(row).not.toHaveProperty('holder')
 expect(chapters[229].paragraphs[24].text).toContain('handed her')
})

test('the biscuit is passed back to the imprisoned woman rather than physically given to Babet',()=>{
 const reply=itemStateChanges.find(row=>row.key==='biscuit-returned-through-magnon')
 expect(reply).toMatchObject({item:'rue-plumet-biscuit-reply',chapter:230,at:25,evidenceParagraph:25,kind:'custody-report',custodian:null})
 expect(reply.note).toContain('Salpêtrière')
 expect(reply).not.toHaveProperty('holder')
})
