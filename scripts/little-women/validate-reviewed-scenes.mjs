import assert from 'node:assert/strict'
import {chapters,countWords,normalize} from './source-text.mjs'
import {reviewedScenes,boundsFor} from './reviewed-scenes.mjs'
let total=0
for(let i=0;i<reviewedScenes.length;i++){
 const chapter=chapters[i],plans=reviewedScenes[i],bounds=boundsFor(chapter)
 assert.equal(plans[0].start,1,`chapter ${chapter.number} must start at paragraph 1`)
 assert.equal(new Set(plans.map(x=>x.start)).size,plans.length,`chapter ${chapter.number} duplicate starts`)
 assert.ok(plans.every((x,j)=>x.start>=1&&x.start<=(plans[j+1]?.start??chapter.paragraphs.length+1)),`chapter ${chapter.number} starts not ordered`)
 const pieces=plans.map((_,j)=>chapter.text.slice(chapter.paragraphStarts[bounds[j]],chapter.paragraphStarts[bounds[j+1]]??chapter.text.length))
 assert.equal(normalize(pieces.join('')),normalize(chapter.text),`chapter ${chapter.number} reconstruction`)
 for(const plan of plans){assert.ok(plan.title&&plan.reason&&(plan.location||(!Object.keys(plan.states).length&&plan.summary)));assert.ok(plan.tension>=1&&plan.tension<=5);assert.ok(Object.keys(plan.states).length||plan.summary);assert.equal(new Set(Object.values(plan.states)).size,Object.values(plan.states).length,`${plan.title} duplicate states`)}
 assert.equal(pieces.reduce((n,x)=>n+countWords(x),0),countWords(chapter.text),`chapter ${chapter.number} word count`)
 total+=plans.length
}
console.log(`Reviewed-scene ledger PASS: ${reviewedScenes.length}/47 chapters, ${total} scenes; exact chapter reconstruction preserved.`)
