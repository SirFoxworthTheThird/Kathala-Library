import { expect, test } from 'vitest'
import { enrichedReview } from '../scripts/les-miserables/build-enrichment-audit.mjs'
const row=(n:number,at:number|string)=>enrichedReview().get(n).find(r=>r.at===at)
const cast=(n:number,at:number|string)=>row(n,at).present.map(([key])=>key)

test('separates the usher’s return from the explicitly solitary council chamber',()=>{
 expect(row(62,2).location).toBe('arras-court-antechamber')
 expect(cast(62,2)).toContain('arras-usher')
 expect(row(62,6)).toBeDefined()
 expect(cast(62,6)).toEqual(['valjean'])
 expect(row(62,6).location).toBe('arras-council-chamber')
 expect(cast(61,11)).toContain('arras-landlady')
})

test('retains the seated court participants through the continuous hearing',()=>{
 for(const[n,at]of [[63,'start'],[63,22],[64,'start'],[64,7],[64,20],[64,28],[64,33],[65,'start'],[65,11],[65,30]] as const){
  const here=cast(n,at)
  for(const key of ['arras-president','arras-prosecutor','arras-defence-lawyer','bamatabois','champmathieu','valjean'])
   expect(here,`${n}:${at}: ${key}`).toContain(key)
  expect(new Set(here).size).toBe(here.length)
  expect(here).not.toContain('javert')
 }
 expect(cast(64,28)).toContain('brevet')
 for(const key of ['brevet','chenildieu','cochepaille'])expect(cast(64,33)).toContain(key)
 expect(cast(65,36)).not.toContain('valjean')
 // Earlier witnesses cannot be silently added before their actual return.
 for(const key of ['brevet','chenildieu','cochepaille'])expect(cast(64,7)).not.toContain(key)
})
