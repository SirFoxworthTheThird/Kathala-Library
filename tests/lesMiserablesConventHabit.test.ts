import{expect,test}from'vitest'
import{characterArtPlan}from'../scripts/les-miserables/art-plan.mjs'

test('anchors Petit-Picpus professed and lay-sister portrait clothing to the black habit with white forehead band',()=>{
 for(const key of ['mother-innocente','mother-crucifixion','mother-sainte-mechtilde','mother-cineres','sister-agatha','sister-euphrasie']){
  const plan=characterArtPlan(key)
  expect(plan.habitSource).toEqual({chapter:120,paragraph:5})
  expect(plan.prompt).toContain('ONLY the forehead band is white')
  expect(plan.prompt).toContain('guimpe and square-front bib are black')
 }
 expect(characterArtPlan('sister-simplice').habitSource).toBeUndefined()
})
