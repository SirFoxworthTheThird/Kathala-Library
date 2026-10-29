import{expect,test}from 'vitest'
import{buildPacingPlan}from '../scripts/les-miserables/pacing-plan.mjs'
import{enrichedReview}from '../scripts/les-miserables/build-enrichment-audit.mjs'

test('distinguishes physical crisis, emotional revelation, quiet preparation and historical apparatus',()=>{
 const plan=buildPacingPlan()
 expect(plan.size).toBe(1535)
 expect([...plan.values()].every((r:any)=>Number.isInteger(r.tension)&&r.tension>=1&&r.tension<=5&&r.basis.trim())).toBe(true)
 expect(plan.get('313-5').tension).toBe(5)
 expect(plan.get('334-2').tension).toBe(5)
 expect(plan.get('363-13').tension).toBe(5)
 expect(plan.get('345-2').tension).toBe(2)
 expect(plan.get('365-2').tension).toBe(1)
 expect(plan.get('365-3').tension).toBe(1)
 expect(plan.get('324-1').tension).toBe(1)
})

test('requires fresh review when a pivotal boundary moves even if its scene count is unchanged',()=>{
 const review=enrichedReview()
 const rows=review.get(313)
 rows[3]={...rows[3],at:35}
 expect(()=>buildPacingPlan(review)).toThrow('Pivotal pacing cut moved: 313')
 const added=enrichedReview()
 added.get(313).push({...added.get(313).at(-1),at:39})
 expect(()=>buildPacingPlan(added)).toThrow('Pivotal pacing cuts changed: 313')
})
