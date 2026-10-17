import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto'
import {chapters,sourceBytes,sourceSha256,sourceText,reconstructedMarkdown,normalize,countWords,narrativeText} from './source-text.mjs'
const d=JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk',import.meta.url),'utf8'))
assert.equal(sourceSha256,'22c091779484a001a52c8cea193028efa8f941abd61f708ca50b8236137366a8')
assert.equal(chapters.length,21);assert.equal(chapters.reduce((n,c)=>n+c.sections.length,0),44)
assert.equal(normalize(reconstructedMarkdown),normalize(sourceText))
assert.equal(d.chapters.length,21);assert.equal(d.events.length,44);assert.equal(d.sceneTexts.length,44)
assert.equal(normalize(d.sceneTexts.map(s=>s.text).join('\n\n')),normalize(narrativeText))
assert.equal(d.sceneTexts.reduce((n,s)=>n+s.wordCount,0),countWords(narrativeText))
assert.equal(crypto.createHash('sha256').update(sourceBytes).digest('hex'),sourceSha256)
console.log(`PASS: exact normalized reconstruction; 21 chapters, 44 retained sections, ${countWords(narrativeText).toLocaleString()} narrative words, source SHA-256 ${sourceSha256}.`)
