import{expect,test}from'vitest'
import{characterIntroductions}from'../scripts/les-miserables/character-ledger.mjs'
import{characterArtPlan}from'../scripts/les-miserables/art-plan.mjs'

test('introduces the elderly comte in the salon rather than substituting a woman from convent history',()=>{
 const person=characterIntroductions.get('lamothe-valois')
 expect(person?.name).toBe('The Comte de Lamothe-Valois')
 expect(person?.description).toMatch(/salon/)
 expect(person?.description).not.toMatch(/convent|woman/)
 const plan=characterArtPlan('lamothe-valois')
 expect(plan.sourceChapter).toBe(168)
 expect(plan.prompt).toContain('seventy-five')
 expect(plan.prompt).not.toContain('SUBJECT ONLY: Madame')
})

test('identifies Wilda as the Hanoverian lieutenant at the farmhouse door',()=>{
 const person=characterIntroductions.get('wilda')
 expect(person?.description).toMatch(/Hanoverian lieutenant/)
 expect(person?.description).toMatch(/farmhouse door/)
 expect(person?.description).not.toMatch(/well|witness/)
})
