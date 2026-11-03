import assert from 'node:assert/strict'
import {sections,paragraphs} from './source-text.mjs'
import {reviewedChapters} from './scene-review.mjs'

const romanNumbers=Array.from({length:44},(_,i)=>{
  let n=i+1,s=''
  for(const [value,letters] of [[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']])while(n>=value){s+=letters;n-=value}
  return s
})
export function sourcePoint(reference){
  const match=reference.match(/^([IVXL]+)\.(\d+)(?:$|[–;])/)
  assert.ok(match,`An exact narrative paragraph is required: ${reference}`)
  const chapter=romanNumbers.indexOf(match[1])+1,paragraph=Number(match[2])
  assert.ok(chapter>0,`Canonical chapter numeral: ${reference}`)
  const section=sections.filter(s=>s.kind==='narrative')[chapter-1]
  assert.ok(paragraph<paragraphs(section.text).length,`Source paragraph exists: ${reference}`)
  return {chapter,paragraph,section:section.number,eventId:`ivanhoe-source-${section.number}-p${paragraph}`}
}
export function exactSourceEvent(reference,review=reviewedChapters){
  const point=sourcePoint(reference)
  assert.ok(review.find(c=>c.chapter===point.chapter)?.scenes.some(s=>s.from===point.paragraph&&!(s.fromOffset??0)),`Disclosure requires an exact scene start: ${reference}`)
  return point.eventId
}
