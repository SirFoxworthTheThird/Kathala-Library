// Authoring helper for the independent source review, never called by generation.
import fs from 'node:fs'
import crypto from 'node:crypto'
import {reviewedScenes} from './reviewed-scenes.mjs'
import {chapters,sourceSha256} from './source-text.mjs'
const hash=text=>crypto.createHash('sha256').update(text).digest('hex')
const journalURL=new URL('./FULL_REVIEW.json',import.meta.url)
const journal=fs.existsSync(journalURL)?JSON.parse(fs.readFileSync(journalURL,'utf8')):{sourceSha256,chapters:[]}
export function reviewChapter(number,{changes={},add=[],notes}){
 const rows=reviewedScenes[number-1]
 for(const [title,patch] of Object.entries(changes)){
  const row=rows.find(r=>r.title===title);if(!row)throw Error(`Unknown scene ${title}`)
  if(patch.remove)for(const key of patch.remove){if(!(key in row.states))throw Error(`Missing ${title}.${key}`);delete row.states[key]}
  if(patch.states)row.states=patch.states
  if(patch.update)Object.assign(row.states,patch.update)
  for(const [key,value] of Object.entries(patch))if(!['remove','states','update'].includes(key))row[key]=value
 }
 for(const row of add){if(rows.some(r=>r.title===row.title))throw Error(`Duplicate ${row.title}`);rows.push({mentioned:[],summary:null,...row})}
 rows.sort((a,b)=>a.start-b.start)
 const chapter=chapters[number-1]
 const record={number,title:chapter.title,sourceSha256:hash(chapter.text),notes,scenes:rows.map((row,i)=>{
  const end=(rows[i+1]?.start??chapter.paragraphs.length+1)-1,text=chapter.paragraphs.slice(row.start-1,end).join('\n\n')
  return {title:row.title,start:row.start,end,sourceSha256:hash(text),firstParagraph:hash(chapter.paragraphs[row.start-1]),lastParagraph:hash(chapter.paragraphs[end-1]),location:row.location,places:row.places??{},states:{...row.states},mentioned:[...row.mentioned],reason:row.reason}
 })}
 const existing=journal.chapters.findIndex(r=>r.number===number);if(existing<0)journal.chapters.push(record);else journal.chapters[existing]=record
 journal.chapters.sort((a,b)=>a.number-b.number)
}
export function saveReview(){
 fs.writeFileSync(new URL('./reviewed-scenes.mjs',import.meta.url),`// Independently reviewed paragraph boundaries and direct-presence states.\nexport const reviewedScenes=${JSON.stringify(reviewedScenes,null,2)}\nexport function boundsFor(chapter){return [...reviewedScenes[chapter.number-1].map(row=>row.start-1),chapter.paragraphs.length]}\n`)
 fs.writeFileSync(journalURL,JSON.stringify(journal,null,2)+'\n')
 console.log(`Independent chapter review: ${journal.chapters.length}/47; ${reviewedScenes.flat().length} scenes`)
}
