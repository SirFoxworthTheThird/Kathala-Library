import fs from 'node:fs'
import {validateManuscript} from './manuscript-validation.mjs'
import {readReleaseApproval} from './release-approval.mjs'
import {sections,retained,sourceSha256,sha256,countWords,paragraphs,sourceUrl} from './source-text.mjs'
const bytes=fs.readFileSync(new URL(process.argv.includes('--release')?'./authoring-review.pwk':'./manuscript-draft.pwk',import.meta.url))
const w=JSON.parse(bytes.toString('utf8'))
validateManuscript(w)
if(process.argv.includes('--release'))readReleaseApproval(bytes)
const audit={status:process.argv.includes('--release')?'EXACT SOURCE RECONSTRUCTION PASSED; separate release approvals recorded':'SOURCE IMPORT ONLY; scene review, world, art and application gates remain open',sourceUrl,sourceSha256,retainedSha256:sha256(retained),normalization:'Remove initial BOM, convert CRLF/CR to LF, remove padding outside retained wrapper contents; no internal text or whitespace changes.',sourceSections:sections.length,narrativeChapters:sections.filter(s=>s.kind==='narrative').length,words:countWords(retained),paragraphBlocks:paragraphs(retained).length,sections:sections.map(s=>({number:s.number,title:s.title,kind:s.kind,words:countWords(s.text),paragraphBlocks:paragraphs(s.text).length,sha256:sha256(s.text)}))}
fs.writeFileSync(new URL('./SOURCE_AUDIT.json',import.meta.url),JSON.stringify(audit,null,2)+'\n')
console.log(JSON.stringify({...audit,sections:undefined},null,2))
