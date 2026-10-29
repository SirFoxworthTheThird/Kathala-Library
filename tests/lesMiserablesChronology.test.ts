import{expect,test}from 'vitest'
import{buildChronologyPlan,relativeDay,chronologyNote}from '../scripts/les-miserables/chronology-plan.mjs'
import{enrichedReview}from '../scripts/les-miserables/build-enrichment-audit.mjs'
import{chapters}from '../scripts/les-miserables/source-text.mjs'

const review=enrichedReview()
const key=(chapter:number,at:number|string)=>`${chapter}-${review.get(chapter).findIndex((r:any)=>r.at===at)+1}`

test('keeps the waking frame, dated collar incident and delayed note separate from their retrospects',()=>{
 const plan=buildChronologyPlan()
 expect(plan.size).toBe(1535)
 expect(plan.get(key(20,'start')).isFlashback).toBe(false)
 expect(plan.get(key(20,7)).inWorldTime).toBeLessThan(plan.get(key(20,'start')).inWorldTime)
 expect(plan.get(key(20,10)).inWorldTime).toBe(relativeDay('1796-04-22'))
 expect(chapters[19].paragraphs[10].text).toContain('22d of April, 1796')
 expect(plan.get(key(341,62)).inWorldTime).toBe(relativeDay('1832-06-07T01:00:00Z'))
 expect(plan.get(key(343,4)).inWorldTime).toBe(relativeDay('1832-09-07'))
 expect(plan.get(key(365,5)).inWorldTime).toBe(relativeDay('1862-10-18'))
 expect(chronologyNote).toContain('not an absolute calendar')
 expect(chronologyNote).toContain('June 24')
 expect(chronologyNote).toContain('September 7 called four months')
})

test('continues the flight after eleven and the inn scene across midnight without a manufactured backward jump',()=>{
 const plan=buildChronologyPlan()
 const eleven=plan.get(key(109,9)).inWorldTime
 expect(eleven).toBe(relativeDay('1824-03-01T23:00:00Z'))
 expect(plan.get(key(110,'start')).inWorldTime).toBeGreaterThanOrEqual(eleven)
 const afterOne=plan.get(key(115,'start')).inWorldTime
 expect(afterOne).toBeGreaterThan(eleven)
 expect(plan.get(key(116,'start')).inWorldTime).toBeGreaterThanOrEqual(afterOne)
 expect(plan.get(key(100,'start')).inWorldTime).toBeLessThan(relativeDay('1823-12-25'))
 expect(plan.get(key(100,186)).inWorldTime).toBe(relativeDay('1823-12-25T02:00:00Z'))
 expect([...plan.values()].every((p:any)=>Number.isFinite(p.inWorldTime)&&p.travelDays>=0&&p.basis.trim())).toBe(true)
})

test('rejects normalized invalid dates and an uncovered chapter instead of inventing a frame',()=>{
 expect(()=>relativeDay('1832-02-30')).toThrow('Invalid reference coordinate')
 const extra=new Map(review)
 extra.set(366,[{at:'start'}])
 expect(()=>buildChronologyPlan(extra)).toThrow('Missing chronological frame: 366')
 const changed=new Map(review)
 changed.set(341,changed.get(341).filter((r:any)=>r.at!==62))
 expect(()=>buildChronologyPlan(changed)).toThrow('Stale chronological cut: 341/62')
})
