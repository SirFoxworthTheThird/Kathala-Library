import fs from 'node:fs'
import {sourceSections,narrativeText,normalize,countWords,sourceEdition,sourceUrl,sourceFileSha256} from './source-text.mjs'
import {chapterPlans,withCuts} from './story-ledger.mjs'

const chapters = [], events = [], sceneTexts = []
let sortOrder = 0
for (let chapterIndex = 0; chapterIndex < sourceSections.length; chapterIndex++) {
  const section = sourceSections[chapterIndex]
  const plan = withCuts(section, chapterPlans[chapterIndex])
  const chapterId = `carmilla-chapter-${chapterIndex}`
  const paragraphs = section.text.split(/\n{2,}/)
  chapters.push({id:chapterId,number:chapterIndex,title:section.title,sourceHeading:section.sourceHeading,wordCount:countWords(section.text)})
  plan.forEach((entry, eventIndex) => {
    const eventId = `carmilla-event-${chapterIndex}-${eventIndex + 1}`
    const text = paragraphs.slice(entry.cut, plan[eventIndex + 1]?.cut ?? paragraphs.length).join('\n\n')
    events.push({id:eventId,chapterId,title:entry.title,description:entry.description,location:entry.location,cast:entry.cast,items:entry.items,tension:entry.tension,sortOrder:sortOrder++})
    sceneTexts.push({id:`carmilla-scene-${chapterIndex}-${eventIndex + 1}`,eventId,text,wordCount:countWords(text)})
  })
}

if (normalize(sceneTexts.map(scene => scene.text).join('\n\n')) !== normalize(narrativeText)) throw new Error('Retained prose does not reconstruct exactly')
const manuscript = {sourceEdition,sourceUrl,sourceFileSha256,retainedWords:countWords(narrativeText),chapters,events,sceneTexts}
fs.writeFileSync(new URL('./manuscript.json', import.meta.url), JSON.stringify(manuscript, null, 2) + '\n')
console.log(JSON.stringify({chapters:chapters.length,events:events.length,scenes:sceneTexts.length,words:countWords(narrativeText),reconstruction:'exact after whitespace normalization'},null,2))
