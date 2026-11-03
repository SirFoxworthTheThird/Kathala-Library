import assert from 'node:assert/strict'
import {sections,retained,countWords} from './source-text.mjs'
export function validateManuscript(w){
  assert.equal(w.chapters.length,sections.length)
  assert.equal(w.events.length,w.sceneTexts.length)
  for(const key of ['chapters','events','sceneTexts'])assert.equal(new Set(w[key].map(x=>x.id)).size,w[key].length,`Unique ${key} IDs`)
  assert.ok(w.events.every(e=>w.chapters.some(c=>c.id===e.chapterId)),'No orphan events')
  assert.ok(w.sceneTexts.every(t=>w.events.some(e=>e.id===t.eventId)),'No orphan texts')
  const all=[]
  for(const s of sections){
    const c=w.chapters[s.number-1];assert.equal(c.title,s.title)
    const events=w.events.filter(e=>e.chapterId===c.id).sort((a,b)=>a.sortOrder-b.sortOrder);assert.ok(events.length)
    const body=events.map(e=>{const t=w.sceneTexts.filter(t=>t.eventId===e.id);assert.equal(t.length,1);assert.equal(t[0].wordCount,countWords(t[0].text));return t[0].text}).join('')
    assert.equal(body,s.text,`Section ${s.number} exact reconstruction`);all.push(body)
  }
  assert.equal(all.join(''),retained,'Complete retained source reconstruction')
  assert.equal(countWords(all.join('')),countWords(retained))
}
