import fs from 'node:fs'
import crypto from 'node:crypto'
import { chapters } from './source-text.mjs'
import { sceneModel } from './scene-model.mjs'
const compact=s=>s.replace(/\s+/g,' ').trim(),hash=s=>crypto.createHash('sha256').update(s).digest('hex')
const starts={},review=[],lines=['# Source and scene audit','', 'Every paragraph range is inclusive and follows the retained Gutenberg chapter body. Presence notes concern the narrative action, including reported accounts at the time they are given.','']
for(const chapter of chapters){
 const rows=sceneModel.get(chapter.number);starts[chapter.number]=rows.map(r=>r.start)
 lines.push(`## Chapter ${chapter.number}: ${chapter.title}`,'')
 for(let i=0;i<rows.length;i++){
  const r=rows[i],end=(rows[i+1]?.start??chapter.paragraphs.length+1)-1
  lines.push(`- Paragraphs ${r.start}–${end}: **${r.title}** — ${r.place}. ${r.description}`)
  lines.push(`  Present: ${Object.keys(r.notes).join('; ')}.`)
  if(i){const before=rows[i-1],oldCast=Object.keys(before.notes),newCast=Object.keys(r.notes)
   review.push({chapter:chapter.number,startParagraph:r.start,before:compact(chapter.paragraphs[r.start-2]),after:compact(chapter.paragraphs[r.start-1]),beforeSha256:hash(chapter.paragraphs[r.start-2]),afterSha256:hash(chapter.paragraphs[r.start-1]),decision:'accept',finalStartParagraph:r.start,
    reason:`${before.description} The next passage begins: ${r.description}`,
    placeBefore:before.place,placeAfter:r.place,
    castChange:`Leave: ${oldCast.filter(n=>!newCast.includes(n)).join(', ')||'none'}. Enter: ${newCast.filter(n=>!oldCast.includes(n)).join(', ')||'none'}.`,
    knowledgeOrItemChange:`Before: ${Object.entries(before.notes).map(([n,v])=>`${n}: ${v}`).join(' ')} After: ${Object.entries(r.notes).map(([n,v])=>`${n}: ${v}`).join(' ')}`})
  }
 }
 lines.push('')
}
for(const [file,data] of [['boundary-candidates.json',starts],['boundary-review.json',review]])fs.writeFileSync(new URL('./'+file,import.meta.url),JSON.stringify(data,null,2)+'\n')
fs.writeFileSync(new URL('./SCENE_AUDIT.md',import.meta.url),lines.join('\n').trimEnd()+'\n')
console.log(`${Object.values(starts).flat().length} source ranges; ${review.length} paragraph-boundary reviews.`)
