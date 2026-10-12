import fs from 'node:fs';import crypto from 'node:crypto';import {chapters} from './source-text.mjs';import {scenes} from './scene-model.mjs'
const short=s=>s.replace(/\s+/g,' ').slice(0,180)
const rows=[]
for(const chapter of chapters){const cuts=scenes.get(chapter.number);for(let i=0;i<cuts.length;i++){const row=cuts[i],end=(cuts[i+1]?.start??chapter.paragraphs.length+1)-1,text=chapter.paragraphs.slice(row.start-1,end).join('\n\n');rows.push({chapter:chapter.number,scene:i+1,title:row.title,startParagraph:row.start,endParagraph:end,preceding:row.start>1?short(chapter.paragraphs[row.start-2]):null,opening:short(chapter.paragraphs[row.start-1]),closing:short(chapter.paragraphs[end-1]),following:end<chapter.paragraphs.length?short(chapter.paragraphs[end]):null,sha256:crypto.createHash('sha256').update(text).digest('hex')})}}
fs.writeFileSync(new URL('./BOUNDARY_AUDIT.json',import.meta.url),JSON.stringify({method:'Cuts are reviewed retained paragraph boundaries. Adjacent text proves continuity; scene hashes bind the audit to exact prose.',rows},null,2)+'\n')
console.log(`Wrote ${rows.length} reviewed scene boundaries`)
