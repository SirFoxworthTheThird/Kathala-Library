import fs from 'node:fs'
import assert from 'node:assert/strict'
import { chapters, volumes, retained, sha256, countWords } from './source-text.mjs'
import { reviewedChapters } from './reviewed-scenes.mjs'
import { validateSceneReview } from './validate-scene-review.mjs'

validateSceneReview()

const filename = new URL('./manuscript-draft.pwk', import.meta.url)
const world = JSON.parse(fs.readFileSync(filename, 'utf8'))
const stamp = { worldId: world.world.id, createdAt: world.exportedAt, updatedAt: world.exportedAt }
world.events = []
world.sceneTexts = []
const audit = []
for (const chapter of chapters) {
  const reviewed = reviewedChapters.get(chapter.number)
  const rows = reviewed ?? [{ at: 'start', title: chapter.heading.replace(/\n/g, ' '), kind: 'unreviewed', present: [] }]
  const starts = rows.map(row => {
    if (row.at === 'start') return chapter.start
    if (row.at === 'volume') return volumes.find(volume => volume.number === chapter.volume).start
    assert.ok(Number.isInteger(row.at) && chapter.paragraphs[row.at], `Invalid paragraph: ${chapter.number}/${row.at}`)
    return chapter.paragraphs[row.at].start
  })
  assert.equal(starts[0], chapter.start)
  assert.ok(starts.every((start, index) => index === 0 || start > starts[index - 1]), `Unordered cuts in chapter ${chapter.number}`)
  const texts = []
  rows.forEach((row, index) => {
    const start = starts[index], end = starts[index + 1] ?? chapter.end
    const text = retained.slice(start, end)
    assert.ok(text.trim())
    const eventId = `lesmis-event-${chapter.number}-${index + 1}`
    // Deliberately keep review annotations outside the PWK until the complete
    // cast/location model has passed its own gate. No fabricated records.
    world.events.push({ ...stamp, id: eventId, chapterId: `lesmis-chapter-${chapter.number}`,
      timelineId: 'les-miserables-narrative', title: row.title, description: row.description ?? '',
      locationMarkerId: null, involvedCharacterIds: [], mentionedCharacterIds: [], involvedItemIds: [], threadIds: [], motifIds: [],
      sortOrder: index, travelDays: 0, inWorldTime: chapter.number - 1,
      tension: 1, tags: [], structureBeat: null, status: 'draft', povCharacterId: null, isFlashback: false,
    })
    world.sceneTexts.push({ ...stamp, id: `lesmis-text-${chapter.number}-${index + 1}`, eventId, text, wordCount: countWords(text) })
    texts.push(text)
    if (reviewed) audit.push({ chapter: chapter.number, eventId, ...row, start, end,
      opening: text.trim().slice(0, 160), closing: text.trim().slice(-160), textSha256: sha256(text),
      previousParagraph: chapter.paragraphs.findLast(paragraph => paragraph.end <= start)?.text ?? null,
      nextParagraph: chapter.paragraphs.find(paragraph => paragraph.start >= start)?.text ?? null,
    })
  })
  assert.equal(texts.join(''), chapter.text)
}
assert.equal(world.sceneTexts.map(row => row.text).join(''), retained)
fs.writeFileSync(filename, `${JSON.stringify(world, null, 2)}\n`)
const report = {
  status: reviewedChapters.size === chapters.length
    ? 'complete manuscript boundary review; cast and release gates pending; not a publishable edition'
    : 'partial scene review; not a publishable edition',
  boundaryReviewComplete: reviewedChapters.size === chapters.length, releaseComplete: false,
  reviewedChapters: [...reviewedChapters.keys()],
  reviewedScenes: audit.length, totalChapters: chapters.length, remainingChapters: chapters.length - reviewedChapters.size,
  events: world.events.length, scenes: audit,
}
fs.writeFileSync(new URL('./BOUNDARY_REVIEW.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify({ ...report, scenes: undefined }, null, 2))
