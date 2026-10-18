import fs from 'node:fs'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import {books,verseText,verseLineCount,countWords,normalize,sourceSha256} from './source-text.mjs'
import {bookPlans} from './scene-plan.mjs'

const data=JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk',import.meta.url),'utf8'))
assert.equal(sourceSha256,'aeedc9f33e0c2a6422d2f557462fb87cd2430974c6aed30a26803be5394a741a')
assert.equal(data.chapters.length,12)
assert.equal(data.events.length,bookPlans.reduce((sum,plan)=>sum+plan.length,0))
assert.equal(data.events.length,data.sceneTexts.length)
const reconstructed=[]
for(const chapter of data.chapters){
  const scenes=data.events.filter(event=>event.chapterId===chapter.id).map(event=>{
    const matches=data.sceneTexts.filter(scene=>scene.eventId===event.id)
    assert.equal(matches.length,1,`${event.title}: exactly one scene text`)
    assert.equal(matches[0].wordCount,countWords(matches[0].text),`${event.title}: word count`)
    return matches[0].text
  })
  const book=books[chapter.number-1]
  assert.equal(normalize(scenes.join('\n')),normalize(book.text),`${chapter.title}: exact verse reconstruction`)
  reconstructed.push(...scenes)
}
const joined=reconstructed.join('\n\n')
assert.equal(normalize(joined),normalize(verseText),'Complete exact normalized reconstruction')
assert.equal(joined.split('\n').filter(Boolean).length,verseLineCount)
const digest=crypto.createHash('sha256').update(normalize(joined),'utf8').digest('hex')
console.log(`PASS: 12 books, ${data.events.length} scenes, ${verseLineCount} verse lines, ${countWords(verseText)} words; retained normalized SHA-256 ${digest}.`)

