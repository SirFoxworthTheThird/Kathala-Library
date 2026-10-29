import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'
import{itemArtPlan}from'../scripts/les-miserables/item-art-plan.mjs'

test('introduces the whole retained coat when Marius actually produces it',()=>{
 const rows=enrichedReview().get(363)
 expect(rows.find(r=>r.at===166).items).not.toContain('marius-bloodied-coat')
 expect(rows.find(r=>r.at===189).items).toContain('marius-bloodied-coat')
 expect(itemArtPlan('marius-bloodied-coat').prompt).toContain('old black coat all covered with blood')
})
