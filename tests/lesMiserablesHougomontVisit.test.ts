import {expect,test} from 'vitest'
import {enrichedReview} from '../scripts/les-miserables/build-enrichment-audit.mjs'

test('keeps the present-day observer in the observed ruins without importing the historical combatants into his cast',()=>{
 const scenes=enrichedReview().get(72)
 for(const at of [4,15,23]){
  const scene=scenes.find(s=>s.at===at)
  expect(scene.present.map(([key])=>key)).toEqual(['narrator-traveller'])
  expect(scene.present[0][1]).toMatch(/1861|visits|surveys/)
 }
 expect(scenes.find(s=>s.at===4).present.some(([key])=>key==='napoleon')).toBe(false)
 expect(scenes.find(s=>s.at===15).present.some(([key])=>key==='guillaume-van-kylsom')).toBe(false)
 expect(scenes.find(s=>s.at===22).present.map(([key])=>key)).toEqual(['narrator-traveller','hougomont-gardener-granddaughter'])
})
