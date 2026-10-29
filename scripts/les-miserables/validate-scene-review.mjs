import assert from 'node:assert/strict'
import { chapters, volumes } from './source-text.mjs'
import { reviewedChapters } from './reviewed-scenes.mjs'

export function cutOffset(chapter, at) {
  if (at === 'start') return chapter.start
  if (at === 'volume') return volumes.find(volume => volume.number === chapter.volume).start
  assert.ok(Number.isInteger(at) && chapter.paragraphs[at], `Invalid paragraph cut ${chapter.number}/${at}`)
  return chapter.paragraphs[at].start
}

export function validateSceneReview(review = reviewedChapters) {
  let count = 0
  for (const [number, rows] of review) {
    const chapter = chapters[number - 1]
    assert.ok(chapter && rows.length, `Invalid reviewed chapter ${number}`)
    let previous = chapter.start - 1
    for (const [index, row] of rows.entries()) {
      const at = cutOffset(chapter, row.at)
      const end = index + 1 < rows.length ? cutOffset(chapter, rows[index + 1].at) : chapter.end
      assert.ok(at >= chapter.start && at < chapter.end && at > previous, `Unordered cut ${number}/${row.at}`)
      if (previous < chapter.start) assert.equal(at, chapter.start)
      previous = at
      assert.ok(row.title?.trim() && row.description?.trim() && row.reason?.trim(), `Missing editorial review ${number}/${row.at}`)
      assert.ok(['scene', 'exposition', 'reported', 'apparatus', 'document'].includes(row.kind))
      if (['exposition', 'reported', 'apparatus'].includes(row.kind)) {
        assert.equal(row.present.length, 0, `Invented physical cast in ${row.kind}: ${number}/${row.at}`)
      }
      const cast = new Set(), notes = new Set()
      for (const [character, note] of row.present) {
        assert.ok(character && note?.trim(), `Empty state ${number}/${row.at}`)
        assert.ok(!cast.has(character), `Duplicate character ${number}/${row.at}`)
        assert.ok(!notes.has(note.toLowerCase()), `Duplicate state ${number}/${row.at}`)
        assert.doesNotMatch(note, /takes a distinct part|immediate action|is physically present|at this moment:|state carried through/i)
        assert.notEqual(note, row.description, `Scene summary substituted for individual state ${number}/${row.at}`)
        cast.add(character)
        notes.add(note.toLowerCase())
      }
      for (const change of row.stateChanges ?? []) {
        assert.ok(cast.has(change.character), 'Direct state change requires source-present character')
        const evidence = chapter.paragraphs[change.evidenceParagraph]
        assert.ok(evidence, 'State change needs source evidence')
        assert.ok(evidence.start >= at && evidence.start < end, 'State change evidence must belong to its segment')
      }
      for (const reveal of row.identityReveals ?? []) {
        assert.ok(reveal.identity && reveal.character && reveal.identity !== reveal.character, 'Identity reveal needs distinct identity and character keys')
        assert.ok(['reader', 'courtroom'].includes(reveal.audience), 'Identity reveal needs a reviewed audience')
        const evidence = chapter.paragraphs[reveal.evidenceParagraph]
        assert.ok(evidence && evidence.start >= at && evidence.start < end, 'Identity reveal evidence must belong to its segment')
      }
      count++
    }
  }
  return { reviewedChapters: review.size, reviewedScenes: count, remainingChapters: chapters.length - review.size }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  console.log(JSON.stringify({ ...validateSceneReview(), boundaryReviewComplete: reviewedChapters.size === chapters.length, releaseComplete: false }, null, 2))
}
