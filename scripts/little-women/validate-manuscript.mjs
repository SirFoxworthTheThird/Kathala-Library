import fs from 'node:fs'
import {reviewedScenes} from './reviewed-scenes.mjs'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import {chapters,countWords,normalize,narrative,sourceSha256} from './source-text.mjs'
const w=JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk',import.meta.url),'utf8'))
assert.equal(w.chapters.length,47)
const texts=[]
for(const c of chapters){const chapter=w.chapters.find(x=>x.number===c.number);assert.equal(chapter.title,c.title);const events=w.events.filter(e=>e.chapterId===chapter.id).sort((a,b)=>a.sortOrder-b.sortOrder);assert.ok(events.length);const body=events.map(e=>{const matches=w.sceneTexts.filter(s=>s.eventId===e.id);assert.equal(matches.length,1);assert.equal(matches[0].wordCount,countWords(matches[0].text));return matches[0].text}).join('\n\n');assert.equal(normalize(body),normalize(c.text),`Chapter ${c.number} reconstruction`);texts.push(body)}
assert.equal(w.sceneTexts.length,w.events.length)
assert.equal(normalize(texts.join('\n\n')),normalize(narrative))
const release=process.argv.includes('--release')
if(release){const finalWorld=JSON.parse(fs.readFileSync(new URL('../../library/little-women.pwk',import.meta.url),'utf8'));assert.equal(finalWorld.chapters.length,47);assert.equal(finalWorld.events.length,reviewedScenes.flat().length);assert.equal(finalWorld.sceneTexts.length,reviewedScenes.flat().length);assert.equal(finalWorld.world.readingMode,true);const checklist=fs.readFileSync(new URL('./REVIEW_CHECKLIST.md',import.meta.url),'utf8');assert.ok(!checklist.includes('- [ ]'),'release checklist still has unchecked items')}
const audit={status:release?'release manuscript reconstruction passed':'manuscript reconstruction passed; scene review validated separately',sourceSha256,normalizedNarrativeSha256:crypto.createHash('sha256').update(normalize(narrative)).digest('hex'),parts:2,chapters:47,stagingContainers:w.events.length,words:countWords(narrative),paragraphs:chapters.reduce((n,c)=>n+c.paragraphs.length,0),chapterCounts:chapters.map(c=>({number:c.number,part:c.part,title:c.title,paragraphs:c.paragraphs.length,words:countWords(c.text)}))}
fs.writeFileSync(new URL('./SOURCE_AUDIT.json',import.meta.url),JSON.stringify(audit,null,2)+'\n')
console.log(JSON.stringify({...audit,chapterCounts:undefined},null,2))
