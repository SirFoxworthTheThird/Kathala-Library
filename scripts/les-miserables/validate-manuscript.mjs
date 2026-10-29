import fs from 'node:fs'
import assert from 'node:assert/strict'
import { chapters, books, volumes, retained, retainedSha256, countWords, sha256, rawSourceBytes, sourceSha256, sourceEdition, sourceUrl, sourceCatalogue, exclusions, footnoteNumbers, extraction, apparatus } from './source-text.mjs'

export function validateManuscript(world) {
  assert.equal(volumes.length, 5, 'Five source volumes')
  assert.equal(books.length, 48, 'Forty-eight source books')
  assert.equal(chapters.length, 365, '365 source chapters')
  assert.deepEqual(volumes.map(volume => chapters.filter(chapter => chapter.volume === volume.number).length), [70, 76, 76, 76, 67])
  assert.deepEqual(footnoteNumbers, Array.from({ length: 70 }, (_, index) => index + 1), 'All 70 source endnotes in order')
  assert.equal(countWords(retained), 568115, 'Pinned retained word count, including headings and apparatus')
  assert.equal(retainedSha256, '2e3a956e10c16500578ffa8eac4cd9956a765316a5ad349af15213ae544f7f79')
  assert.equal(world.chapters.length, chapters.length, 'All chapter containers present')
  assert.ok(world.events.length >= chapters.length, 'Every chapter has at least one draft container')
  assert.equal(world.sceneTexts.length, world.events.length, 'No duplicate or missing draft rows')
  const chapterIds = new Set(world.chapters.map(chapter => chapter.id))
  const eventIds = new Set(world.events.map(event => event.id))
  assert.equal(chapterIds.size, world.chapters.length, 'Unique chapter IDs')
  assert.equal(eventIds.size, world.events.length, 'Unique event IDs')
  assert.equal(new Set(world.sceneTexts.map(draft => draft.id)).size, world.sceneTexts.length, 'Unique draft IDs')
  for (const event of world.events) assert.ok(chapterIds.has(event.chapterId), 'Orphan event')
  for (const draft of world.sceneTexts) assert.ok(eventIds.has(draft.eventId), 'Orphan scene draft')
  const texts = []
  for (const chapter of chapters) {
    const model = world.chapters.find(row => row.number === chapter.number)
    assert.ok(model, `Chapter ${chapter.number} present`)
    assert.equal(model.title, chapter.title, `Source heading ${chapter.number}`)
    const events = world.events.filter(row => row.chapterId === model.id).sort((a, b) => a.sortOrder - b.sortOrder)
    assert.ok(events.length > 0)
    const pieces = events.map(event => {
      const drafts = world.sceneTexts.filter(row => row.eventId === event.id)
      assert.equal(drafts.length, 1)
      return drafts[0]
    })
    const text = pieces.map(draft => draft.text).join('')
    assert.equal(text, chapter.text, `Exact chapter ${chapter.number} source slice`)
    for (const draft of pieces) assert.equal(draft.wordCount, countWords(draft.text))
    texts.push(text)
  }
  assert.equal(texts.join(''), retained, 'Exact reconstruction, including all whitespace after CRLF normalization')
  assert.equal(sha256(texts.join('')), retainedSha256)
  assert.match(texts[0], /^PREFACE\n/)
  assert.match(texts.at(-1), /70 \(return\)/)
  assert.ok(!retained.includes('*** START OF THE PROJECT GUTENBERG'))
  assert.ok(!retained.includes('*** END OF THE PROJECT GUTENBERG'))
  assert.ok(!retained.includes('[Illustration:'))
  return { stage: 'manuscript reconstruction passed; world enrichment and release validation are separate gates', sourceEdition, sourceUrl, sourceCatalogue,
    rawSourceBytes, sourceSha256, retainedSha256, volumes: volumes.length, books: books.length, chapters: chapters.length,
    words: countWords(retained), draftContainers: world.events.length,
    paragraphs: chapters.reduce((sum, chapter) => sum + chapter.paragraphs.length, 0),
    excludedIllustrationPlaceholders: exclusions.length, extraction, apparatus,
    exclusions, standaloneHeadings: chapters.filter(chapter => /^CHAPTER [IVXLCDM]+$/.test(chapter.heading)).map(chapter => chapter.number),
    volumeChapterCounts: volumes.map(volume => chapters.filter(chapter => chapter.volume === volume.number).length),
    chapterCounts: chapters.map(chapter => ({ number: chapter.number, volume: chapter.volume, book: chapter.book, heading: chapter.heading, start: chapter.start, end: chapter.end, words: countWords(chapter.text), paragraphs: chapter.paragraphs.length })),
  }
}
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  const world = JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk', import.meta.url), 'utf8'))
  const audit = validateManuscript(world)
  fs.writeFileSync(new URL('./SOURCE_AUDIT.json', import.meta.url), `${JSON.stringify(audit, null, 2)}\n`)
  console.log(JSON.stringify({ ...audit, chapterCounts: undefined, exclusions: undefined }, null, 2))
}
