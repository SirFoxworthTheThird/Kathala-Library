import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'
import{characterIntroductions}from'../scripts/les-miserables/character-ledger.mjs'
import{chapters}from'../scripts/les-miserables/source-text.mjs'

test('includes the grave-digger’s visibly distressed wife without moving Valjean upstairs',()=>{
 const row=enrichedReview().get(144).find(row=>row.at===126)
 expect(row.present.map(([key])=>key)).toEqual(['fauchelevent','gribier','gribier-wife'])
 const state=row.present.find(([key])=>key==='gribier-wife')[1]
 expect(state).toContain('children')
 expect(state).toContain('crying')
 expect(state).not.toMatch(/beaten|struck|wounded/)
 expect(characterIntroductions.get('gribier-wife').description).toContain('garret')
 expect(chapters[143].paragraphs[129].text).toContain('probably been beaten')
 expect(row.reason).toContain('undifferentiated')
})
