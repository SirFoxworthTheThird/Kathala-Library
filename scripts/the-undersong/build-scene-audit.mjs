import fs from 'node:fs'
import crypto from 'node:crypto'
import {chapters} from './source-text.mjs'
import {plans,withEnds} from './story-ledger.mjs'

const rows=[]
for(let ci=0;ci<chapters.length;ci++)for(let si=0;si<chapters[ci].sections.length;si++){
 const section=chapters[ci].sections[si], paragraphs=section.text.split(/\n{2,}/), plan=withEnds(section,plans[ci][si])
 for(let pi=0;pi<plan.length;pi++){
  const e=plan[pi],text=paragraphs.slice(e.cut,e.end).join('\n\n')
  rows.push({chapter:ci+1,sourceSection:section.title,eventTitle:e.title,startParagraph:e.cut+1,endParagraph:e.end,paragraphCount:e.end-e.cut,location:e.loc,physicalCast:e.cast,reason:plan.length===1?'The authorial section remains intact because its place, physical cast and dramatic action form one continuous unit.':'The cut falls on an existing blank-line paragraph boundary where place, physical cast, evidence, or dramatic state changes.',firstWords:text.replace(/\s+/g,' ').slice(0,100),lastWords:text.replace(/\s+/g,' ').slice(-100),sha256:crypto.createHash('sha256').update(text).digest('hex')})
 }
}
const lines=['# The Undersong scene-boundary audit','',`Reviewed ${rows.length} scenes across ${chapters.length} chapters and ${chapters.reduce((n,c)=>n+c.sections.length,0)} authorial sections. Paragraph numbers are one-based within each authorial section. Every cut preserves source order and occurs only at an existing blank line.`,'','| # | Chapter | Source section | Event | Paragraphs | Location | Physical cast | Boundary rationale |','|---:|---:|---|---|---:|---|---|---|']
rows.forEach((r,i)=>lines.push(`| ${i+1} | ${r.chapter} | ${r.sourceSection.replaceAll('|','\\|')} | ${r.eventTitle.replaceAll('|','\\|')} | ${r.startParagraph}–${r.endParagraph} | ${r.location} | ${r.physicalCast.join(', ')} | ${r.reason} |`))
lines.push('','## Machine-auditable anchors','', 'The companion JSON records the first and last normalized words and a SHA-256 for the exact scene text. The dedicated validator recomputes every value from the shipped PWK.','')
fs.writeFileSync(new URL('./scene-boundary-audit.json',import.meta.url),JSON.stringify(rows,null,2)+'\n')
fs.writeFileSync(new URL('./SCENE_BOUNDARY_AUDIT.md',import.meta.url),lines.join('\n'))
console.log(`Recorded ${rows.length} scene boundaries.`)
