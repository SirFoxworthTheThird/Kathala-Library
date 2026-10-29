import{expect,test}from'vitest'
import{characterArtPlan}from'../scripts/les-miserables/art-plan.mjs'
import{chapters}from'../scripts/les-miserables/source-text.mjs'

test('carries the source uniform into individual convent-pupil art plans',()=>{
 expect(chapters[120].paragraphs[3].text).toMatch(/dressed in blue, with a\s+white cap/)
 for(const key of['alix-schoolgirl','bouchard-schoolgirl','petit-picpus-history-child','petit-picpus-brunette-pupil']){
  const plan=characterArtPlan(key)
  expect(plan.prompt,key).toContain('blue dress')
  expect(plan.prompt,key).toContain('white linen cap')
  expect(plan.prompt,key).toContain('Holy Spirit')
 }
})
