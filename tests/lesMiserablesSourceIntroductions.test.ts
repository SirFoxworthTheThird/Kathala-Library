import{expect,test}from'vitest'
import{characterIntroductions}from'../scripts/les-miserables/character-ledger.mjs'
import{chapters}from'../scripts/les-miserables/source-text.mjs'
import{itemDefinitions}from'../scripts/les-miserables/item-ledger.mjs'

test('describes Mother Veuvain as Courfeyrac’s concierge rather than a nun',()=>{
 expect(chapters[275].text).toContain('I’m the concierge; my name is Mother')
 const description=characterIntroductions.get('mother-veuvain').description
 expect(description).toContain('Courfeyrac')
 expect(description).not.toMatch(/convent|Petit-Picpus/)
})

test('introduces Musichetta through Joly without disclosing Bossuet’s later connection',()=>{
 const description=characterIntroductions.get('musichetta').description
 expect(description).toContain('Joly')
 expect(description).not.toContain('Bossuet')
})

test('the inspector’s signal pistols do not disclose his name before he gives it',()=>{
 const chapter=chapters[213]
 expect(chapter.paragraphs[62].text).toContain('pistols')
 expect(chapter.paragraphs[68].text).toContain('Javert')
 const item=itemDefinitions.get('javert-signal-pistols')
 expect(item.name).toContain('signal pistols')
 expect(`${item.name} ${item.description}`).not.toContain('Javert')
})
