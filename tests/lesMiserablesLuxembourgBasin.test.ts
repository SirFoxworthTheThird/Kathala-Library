import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'
import{chapters}from'../scripts/les-miserables/source-text.mjs'

test('separates the father and child at the basin from the pair on the secluded bench',()=>{
 expect(chapters[190].paragraphs[3].text.replace(/\s+/g,' ')).toContain('urchin of five')
 const rows=enrichedReview().get(191),basin=rows.find(row=>row.at===3),walk=rows.find(row=>row.at===4)
 expect(basin.location).toBe('luxembourg-grand-basin')
 expect(basin.present.map(([key])=>key).sort()).toEqual(['luxembourg-basin-father','luxembourg-basin-son','marius'])
 expect(walk.present.map(([key])=>key).sort()).toEqual(['mademoiselle-lanoire','marius','monsieur-leblanc'])
})
