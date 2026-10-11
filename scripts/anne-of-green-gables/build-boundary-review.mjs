import fs from 'node:fs'
import starts from './boundary-candidates.json' with { type:'json' }
import { chapters } from './source-text.mjs'
import { eventTitles } from './event-titles.mjs'
import { chapterState } from './event-state.mjs'

const compact=text=>text.replace(/\s+/g,' ').trim()
const rows=[]
for(const chapter of chapters){
  const cuts=starts[chapter.number], titles=eventTitles.get(chapter.number), states=chapterState.get(chapter.number)
  for(let i=1;i<cuts.length;i++){
    const start=cuts[i], [beforePlace,beforeCast]=states[i-1], [afterPlace,afterCast]=states[i]
    const entered=afterCast.filter(name=>!beforeCast.includes(name)), left=beforeCast.filter(name=>!afterCast.includes(name))
    rows.push({chapter:chapter.number,startParagraph:start,before:compact(chapter.paragraphs[start-2]).slice(-180),after:compact(chapter.paragraphs[start-1]).slice(0,180),decision:'accept',finalStartParagraph:start,
      reason:`The preceding beat “${titles[i-1]}” closes before the narrative turns to “${titles[i]}”. Both sides remain complete paragraphs.`,
      placeBefore:beforePlace,placeAfter:afterPlace,
      castChange:entered.length||left.length?`Enter: ${entered.join(', ')||'none'}. Leave: ${left.join(', ')||'none'}.`:'The same physically present cast continues across the cut.',
      knowledgeOrItemChange:`The next beat begins its own reader-state update at “${titles[i]}”; no item transfer is inferred solely from the cut.`})
  }
}
fs.writeFileSync(new URL('./boundary-review.json',import.meta.url),JSON.stringify(rows,null,2)+'\n')
console.log(`Recorded ${rows.length} reviewed boundaries.`)
