import fs from 'node:fs'
import crypto from 'node:crypto'
import {chapters} from './source-text.mjs'
import {scenes} from './scene-model.mjs'
import {sceneCorrections} from './scene-corrections.mjs'
import {presence} from './presence-ledger.mjs'

const short=s=>s.replace(/\s+/g,' ').slice(0,240)
const knowledgeAt={
  '4-1':'Anne and Wentworth were engaged eight years earlier.',
  '12-5':'Louisa is seriously injured by her fall on the Cobb.',
  '18-2':'Mary’s letter discloses Louisa and Benwick’s engagement.',
  '21-5':'Mrs Smith explains Mr Elliot’s motive for returning to the family.',
  '23-3':'Wentworth’s letter declares his enduring love for Anne.'
}
const itemAt={
  '1-1':'Sir Walter reads and annotates the Baronetage.',
  '23-2':'Harville shows Anne Benwick’s miniature.',
  '23-3':'Wentworth leaves his written letter for Anne.'
}
const rows=[]
for(const chapter of chapters){
  const cuts=scenes.get(chapter.number)
  for(let i=0;i<cuts.length;i++){
    const key=`${chapter.number}-${i+1}`
    const row={...cuts[i],...sceneCorrections[key]}
    const review=presence[key]
    if(!review)throw Error(`Missing presence review ${key}`)
    const end=(cuts[i+1]?.start??chapter.paragraphs.length+1)-1
    const text=chapter.paragraphs.slice(row.start-1,end).join('\n\n')
    const prior=rows.at(-1)
    rows.push({
      chapter:chapter.number,scene:i+1,title:row.title,
      narrativeChange:row.description,
      location:row.place,previousLocation:prior?.location??null,
      cast:review.cast,
      castEntering:review.cast.filter(n=>!prior?.cast.includes(n)),
      castLeaving:prior?.cast.filter(n=>!review.cast.includes(n))??[],
      statusNotes:review.notes,
      modeledKnowledgeReveal:knowledgeAt[key]??null,
      materialItemHandoff:itemAt[key]??null,
      startParagraph:row.start,endParagraph:end,
      preceding:row.start>1?short(chapter.paragraphs[row.start-2]):null,
      opening:short(chapter.paragraphs[row.start-1]),
      closing:short(chapter.paragraphs[end-1]),
      following:end<chapter.paragraphs.length?short(chapter.paragraphs[end]):null,
      sha256:crypto.createHash('sha256').update(text).digest('hex')
    })
  }
}
fs.writeFileSync(new URL('./BOUNDARY_AUDIT.json',import.meta.url),JSON.stringify({
  method:'Cuts use retained paragraph boundaries. Adjacent excerpts, scene hashes, narrative changes, locations, cast transitions, individual status notes, modeled knowledge reveals, and material item hand-offs bind each row to the source. Null reveal or item means no hand-off is modeled at that scene.',rows
},null,2)+'\n')
console.log(`Wrote ${rows.length} scene boundaries`)
