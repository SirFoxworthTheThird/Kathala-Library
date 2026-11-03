import assert from 'node:assert/strict'
import {sections,paragraphs} from './source-text.mjs'

// Paragraph-relative character offsets split rapid action without rewriting a
// single source character. Normal paragraph starts retain their existing IDs.
export const cutKey=cut=>`p${cut.from}${cut.fromOffset?`-c${cut.fromOffset}`:''}`
export function sceneRange(section,cut){
  const ps=paragraphs(section.text)
  assert.ok(Number.isInteger(cut.from)&&cut.from>=0&&cut.from<ps.length)
  assert.ok(Number.isInteger(cut.to)&&cut.to>=cut.from&&cut.to<=ps.length)
  const a=cut.fromOffset??0,b=cut.toOffset??0
  assert.ok(Number.isInteger(a)&&a>=0&&a<=ps[cut.from].text.length)
  assert.ok(Number.isInteger(b)&&b>=0&&(cut.to<ps.length?b<=ps[cut.to].text.length:b===0))
  const startOffset=ps[cut.from].offset+a,endOffset=(ps[cut.to]?.offset??section.text.length)+b
  assert.ok(endOffset>startOffset,'Non-empty source cut')
  return {startOffset,endOffset}
}
export function splitParagraph(chapter,paragraph,starts){
  const section=sections.filter(s=>s.kind==='narrative')[chapter-1]
  const text=paragraphs(section.text)[paragraph].text
  const offsets=[0,...starts.map(start=>{
    const regex=new RegExp(start.split(/\s+/).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('\\s+'),'g')
    const matches=[...text.matchAll(regex)]
    assert.equal(matches.length,1,`Unique split witness ${chapter}.${paragraph}: ${start}`)
    return matches[0].index
  })]
  for(let i=1;i<offsets.length;i++)assert.ok(offsets[i]>offsets[i-1],'Source-ordered internal splits')
  return offsets.map((offset,i)=>({from:paragraph,fromOffset:offset,to:i===offsets.length-1?paragraph+1:paragraph,toOffset:offsets[i+1]??0}))
}
