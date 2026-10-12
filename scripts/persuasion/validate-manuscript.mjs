import fs from 'node:fs'
import assert from 'node:assert/strict'
import {chapters,reconstructedText,retainedText,sourceBytes,sourceSha256,retainedSha256,paragraphCount,wordCount} from './source-text.mjs'
const draft=JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk',import.meta.url),'utf8'))
assert.equal(sourceBytes.length,477866)
assert.equal(sourceSha256,'27911715ba647bebaf691bb9a7d472ec3b3264dae58f4fe2c7daf02489051105')
assert.equal(chapters.length,24);assert.equal(reconstructedText,retainedText)
const ordered=[...draft.events].sort((a,b)=>a.sortOrder-b.sortOrder)
const rebuilt=draft.chapters.map((chapter,i)=>`${chapters[i].heading}\n\n${ordered.filter(e=>e.chapterId===chapter.id).map(e=>draft.sceneTexts.find(s=>s.eventId===e.id).text).join('\n\n')}`).join('\n\n')
assert.equal(rebuilt,retainedText)
const narrativeWords=chapters.reduce((n,c)=>n+wordCount(c.body),0)
assert.equal(draft.sceneTexts.reduce((n,s)=>n+s.wordCount,0),narrativeWords)
console.log(`PASS: 24 chapters, ${paragraphCount} paragraphs, ${narrativeWords} narrative words; source ${sourceBytes.length} bytes ${sourceSha256}; retained ${retainedSha256}`)
