import fs from 'node:fs'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import { chapters, retainedText, reconstructedText, sourceByteCount, sourceSha256, wordCount, paragraphCount } from './source-text.mjs'
import candidateStarts from './boundary-candidates.json' with { type: 'json' }

const data = JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk', import.meta.url), 'utf8'))
assert.equal(sourceSha256, '89a5e9fb2e0bb44562a969785385366f94e1da736aebee7d9cdf459eb0b5f9f6')
assert.equal(sourceByteCount, 606693)
assert.equal(chapters.length, 38)
assert.equal(data.chapters.length, chapters.length)
assert.equal(data.events.length, data.sceneTexts.length)
const reconstructedChapters = data.chapters.map((chapter, index) => {
  assert.equal(chapter.number, index + 1)
  assert.equal(chapter.title, chapters[index].title)
  const events = data.events.filter(event => event.chapterId === chapter.id).sort((a, b) => a.sortOrder - b.sortOrder)
  assert.equal(events.length, candidateStarts[index + 1].length, `Chapter ${index + 1} provisional cut count`)
  assert.ok(events.length > 0, `Chapter ${index + 1} has no scene`)
  const body = events.map(event => {
    const scenes = data.sceneTexts.filter(scene => scene.eventId === event.id)
    assert.equal(scenes.length, 1, `Event ${event.id} scene count`)
    assert.equal(scenes[0].wordCount, wordCount(scenes[0].text), `Scene ${scenes[0].id} word count`)
    return scenes[0].text
  }).join('\n\n')
  assert.equal(body, chapters[index].body, `Chapter ${index + 1} exact body reconstruction`)
  return `${chapters[index].heading}\n\n${body}`
}).join('\n\n')
assert.equal(reconstructedText, retainedText)
assert.equal(reconstructedChapters, retainedText, 'Exact retained manuscript reconstruction')
const retainedDigest = crypto.createHash('sha256').update(retainedText).digest('hex')
const narrativeWords = chapters.reduce((sum, chapter) => sum + wordCount(chapter.body), 0)
assert.equal(data.sceneTexts.reduce((sum, scene) => sum + scene.wordCount, 0), narrativeWords)
console.log(`PASS: 38 chapters, ${data.events.length} scenes, ${paragraphCount} paragraphs, ${narrativeWords} narrative words; retained UTF-8 SHA-256 ${retainedDigest}`)
