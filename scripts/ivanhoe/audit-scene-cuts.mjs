import fs from 'node:fs'
import {readReleaseApproval} from './release-approval.mjs'
import assert from 'node:assert/strict'
import {sections,paragraphs,sha256} from './source-text.mjs'
import {reviewedChapters} from './scene-review.mjs'
import {sceneRange} from './scene-ranges.mjs'
const narrative=sections.filter(s=>s.kind==='narrative')
const rows=[]
for(const c of reviewedChapters){
  const source=narrative[c.chapter-1],ps=paragraphs(source.text)
  let end=0
  for(const s of c.scenes){
    const {startOffset,endOffset}=sceneRange(source,s)
    assert.equal(startOffset,end,`Chapter ${c.chapter}: contiguous source characters`)
    rows.push({chapter:c.chapter,...s,startOffset,endOffset,textSha256:sha256(source.text.slice(startOffset,endOffset)),openingParagraph:ps[s.from].text,closingParagraph:ps[s.toOffset?s.to:s.to-1].text})
    end=endOffset
  }
  assert.equal(end,source.text.length,`Chapter ${c.chapter}: all source characters covered`)
}
if(process.argv.includes('--release'))readReleaseApproval(fs.readFileSync(new URL('./authoring-review.pwk',import.meta.url)))
fs.writeFileSync(new URL('./BOUNDARY_AUDIT.json',import.meta.url),JSON.stringify({status:process.argv.includes('--release')?'SOURCE CUT RECONSTRUCTION PASSED; RECORDED RELEASE APPROVAL VERIFIED':'SOURCE CUT RECONSTRUCTION ONLY; MANUAL SOURCE AND APPLICATION APPROVAL ARE SEPARATE',chaptersRead:reviewedChapters.map(c=>c.chapter),unreviewedChapters:narrative.map((_,i)=>i+1).filter(n=>!reviewedChapters.some(c=>c.chapter===n)),rows},null,2)+'\n')
if(process.argv.includes('--release'))assert.equal(reviewedChapters.length,44,'All chapters must be reviewed before release')
console.log(`${rows.length} proposed scene cuts across ${reviewedChapters.length}/44 chapters; this is partial evidence.`)
