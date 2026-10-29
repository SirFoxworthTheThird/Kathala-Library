import { expect,test } from 'vitest'
import { enrichedReview } from '../scripts/les-miserables/build-enrichment-audit.mjs'
const rows=enrichedReview()
const row=(chapter:number,at:number)=>rows.get(chapter).find(r=>r.at===at)

test('keeps the actual yard singer distinct from the absent child and leaves her departure unlocated',()=>{
 const scene=row(67,22),cast=scene.present.map(([key])=>key)
 expect(cast).toContain('infirmary-yard-girl')
 expect(cast).not.toContain('cosette')
 expect(cast).not.toContain('fantine-doctor')
 expect(scene.mentioned).not.toContain('infirmary-yard-girl')
 expect(Object.hasOwn(scene.actorLocations,'infirmary-yard-girl')).toBe(true)
 expect(scene.actorLocations['infirmary-yard-girl']).toBeNull()
})

test('retains the two nurses at the body and the protesting portress outside the hiding room',()=>{
 const evening=row(70,7)
 for(const key of ['sister-perpetue','sister-simplice']){
  expect(evening.present.map(([actor])=>actor)).toContain(key)
  expect(evening.actorLocations[key]).toBe('montreuil-factory-infirmary')
 }
 expect(evening.location).toBe('madeleine-factory-lodge')
 const search=row(70,39)
 expect(search.present.map(([key])=>key)).toContain('madeleine-portress')
 expect(search.actorLocations['madeleine-portress']).toBe('madeleine-bedroom-door')
 expect(search.location).toBe('madeleine-bedroom')
 expect(search.present.map(([key])=>key)).not.toContain('fantine')
})
