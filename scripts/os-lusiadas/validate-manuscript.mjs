import fs from 'node:fs'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import { cantos, retainedText, sourceSha256, stanzaCount, verseLineCount, wordCount } from './source-text.mjs'
import { cuts } from './scene-cuts.mjs'

const data = JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk', import.meta.url), 'utf8'))
assert.equal(sourceSha256, '06f7b799bdda0d03cab44b017e8c780f809231852427745003127b49353fe9fd')
assert.equal(data.chapters.length, 10)
assert.equal(data.events.length, data.sceneTexts.length)
assert.equal(stanzaCount, 1102)
assert.equal(verseLineCount, 8816)
const texts = cantos.map((canto, index) => {
  const events = data.events.filter(event => event.chapterId === data.chapters[index].id)
  const entries = cuts[index] ?? [[1]]
  assert.equal(events.length, entries.length, `Canto ${index + 1} scene count`)
  const scenes = events.map((event, sceneIndex) => {
    const matches = data.sceneTexts.filter(scene => scene.eventId === event.id)
    assert.equal(matches.length, 1, `Canto ${index + 1}, scene ${sceneIndex + 1} text count`)
    const scene = matches[0]
    const start = entries[sceneIndex][0]
    const end = (entries[sceneIndex + 1]?.[0] ?? canto.stanzas.length + 1) - 1
    const expected = canto.stanzas.slice(start - 1, end).map(stanza => stanza.text).join('\n\n')
    assert.equal(scene.text, expected, `Canto ${index + 1}, scene ${sceneIndex + 1} text`)
    assert.equal(scene.wordCount, wordCount(scene.text))
    assert.equal(scene.text.split(/\n\n/).length, end - start + 1)
    return scene.text
  })
  const text = scenes.join('\n\n')
  assert.equal(text, canto.text, `Canto ${index + 1} reconstruction`)
  return text
})
const reconstructed = texts.join('\n\n')
assert.equal(reconstructed, retainedText, 'Exact reconstructed poem after the documented source reflow')
assert.equal(reconstructed.split(/\n|\n\n/).filter(Boolean).length, verseLineCount)
assert.equal(wordCount(reconstructed), 55283)
const digest = crypto.createHash('sha256').update(reconstructed, 'utf8').digest('hex')
console.log(`PASS: 10 cantos, ${data.events.length} import scenes, 1,102 stanzas, 8,816 verse lines, 55,283 whitespace-delimited words; retained UTF-8 SHA-256 ${digest}`)
