import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto'
import {chapters,sourceBytes,sourceSha256,sourceText,reconstructedMarkdown,normalize,countWords,narrativeText} from './source-text.mjs'
const d=JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk',import.meta.url),'utf8'))
assert.equal(sourceSha256,'cbfc15db2a76e3cb1d90edbb0035febd65c01de6cfee020193d5eb7445c4ca65')
assert.equal(chapters.length,8);assert.equal(chapters.reduce((n,c)=>n+c.sections.length,0),26)
assert.equal(normalize(reconstructedMarkdown),normalize(sourceText))
assert.equal(d.chapters.length,8);assert.equal(d.events.length,26);assert.equal(d.sceneTexts.length,26)
assert.equal(normalize(d.sceneTexts.map(s=>s.text).join('\n\n')),normalize(narrativeText))
assert.equal(d.sceneTexts.reduce((n,s)=>n+s.wordCount,0),countWords(narrativeText))
assert.equal(crypto.createHash('sha256').update(sourceBytes).digest('hex'),sourceSha256)
console.log(`PASS: exact normalized reconstruction; 8 chapters, 26 retained sections, ${countWords(narrativeText).toLocaleString()} narrative words, source SHA-256 ${sourceSha256}.`)
