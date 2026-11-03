import fs from 'node:fs'
import {sections,paragraphs,sourceSha256} from './source-text.mjs'
import assert from 'node:assert/strict'
import {temporalClassifications} from './temporal-classifications.mjs'

// A source concordance, not an automatic chronology. Dialogue, wishes,
// recollections, deadlines and narrated transitions need separate review.
const pattern=/\b(?:morning|evening|midnight|noon|afternoon|forenoon|dawn|sunrise|sunset|nightfall|yesterday|morrow|next day|following day|second day|third day|(?:one|two|three|four|five|six|seven|eight|nine|ten|twenty-four|\d+) (?:days?|hours?)|sun was setting|earliest sunbeams)\b/i
const rows=[]
for(const [index,section] of sections.filter(s=>s.kind==='narrative').entries()){
  for(const [paragraph,p] of paragraphs(section.text).entries()){
    const normalized=p.text.replace(/\s+/g,' ')
    if(pattern.test(normalized))rows.push({chapter:index+1,section:section.number,paragraph,text:p.text})
  }
}
const classifications=new Map()
for(const [references,kind,review] of temporalClassifications){
  assert.ok(kind&&review)
  for(const reference of references.split(' ')){
    assert.ok(!classifications.has(reference),`Duplicate temporal review ${reference}`)
    classifications.set(reference,{kind,review})
  }
}
for(const row of rows){
  const reference=`${row.chapter}.${row.paragraph}`
  assert.ok(classifications.has(reference),`Unreviewed temporal witness ${reference}`)
  Object.assign(row,classifications.get(reference))
}
assert.equal(classifications.size,rows.length,'Temporal review must match all extracted witnesses without stale references')
fs.writeFileSync(new URL('./qa/time-source-concordance.json',import.meta.url),JSON.stringify({status:'129 SOURCE WITNESSES MANUALLY CLASSIFIED; FINAL CLOCK, PACING AND APPLICATION APPROVAL OPEN',sourceSha256,scope:'Each extracted paragraph reviewed in full. Pattern concordance does not claim exhaustive temporal coverage or automatically turn dialogue into elapsed time.',rows},null,2)+'\n')
const selected=Number(process.argv.find(arg=>arg.startsWith('--through='))?.slice(10)??0)
if(selected)for(const row of rows.filter(row=>row.chapter<=selected))console.log(`${row.chapter}.${row.paragraph} ${row.text.replace(/\s+/g,' ')}`)
else console.log(`Extracted and matched ${rows.length} manually classified temporal witnesses; clock/pacing/application review remains open.`)
