import {expect,test} from 'vitest'
import {enrichedReview} from '../scripts/les-miserables/build-enrichment-audit.mjs'
import {chapters} from '../scripts/les-miserables/source-text.mjs'

test('keeps the cab driver in the Musain encounter without making him a hotel resident',()=>{
 expect(chapters[176].paragraphs[1].text.replace(/\s+/g,' ')).toContain('beside the coachman')
 expect(chapters[176].paragraphs[49].text).toContain('Coachman')
 const rows=enrichedReview().get(177)
 for(const at of ['start',17,40]){
  expect(rows.find(row=>row.at===at).present.map(([key])=>key)).toContain('marius-musain-coachman')
 }
 expect(rows.find(row=>row.at===50).present).toEqual([])
})

test('distinguishes the actual anonymous writers and duel advisers from their invented characters',()=>{
 const row=enrichedReview().get(179).find(row=>row.at===6)
 for(const key of ['musain-vaudeville-dictator','musain-vaudeville-scribe','musain-duel-adviser','musain-young-duellist']){
  expect(row.present.map(([actor])=>actor)).toContain(key)
 }
 expect(row.present.map(([actor])=>actor)).not.toContain('dorimon')
})

test('retains Courfeyrac’s actual introduction of Marius without guessing the attending roster',()=>{
 expect(chapters[177].paragraphs[7].text.replace(/\s+/g,' ')).toContain('introduced Marius at the Café Musain')
 const row=enrichedReview().get(178).find(row=>row.at===7)
 expect(row.kind).toBe('scene')
 expect(row.present.map(([key])=>key).sort()).toEqual(['courfeyrac','marius'])
})
