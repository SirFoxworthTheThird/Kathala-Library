import {chapters} from './source-text.mjs'
import {reviewedScenes} from './reviewed-scenes.mjs'
const number=Number(process.argv[2]),chapter=chapters[number-1]
if(!chapter)throw Error('Pass a chapter number (1–47)')
console.log(`CHAPTER ${number}: ${chapter.title}`)
const rows=reviewedScenes[number-1]
for(let i=Number(process.argv[3]??1)-1;i<Math.min(Number(process.argv[4]??chapter.paragraphs.length),chapter.paragraphs.length);i++){
 const plan=rows.find(r=>r.start===i+1)
 if(plan)console.log(`\nSCENE ${plan.title} @${plan.location}\nSTATES ${JSON.stringify(plan.states)}\nCUT ${plan.reason}`)
 console.log(`[${i+1}] ${chapter.paragraphs[i].replace(/\n/g,' ')}`)
}
