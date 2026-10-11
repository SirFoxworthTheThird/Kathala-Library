import fs from 'node:fs'
import assert from 'node:assert/strict'
import review from './boundary-review.json' with { type: 'json' }
import { chapters } from './source-text.mjs'

const validDecisions = new Set(['accept', 'move', 'remove'])
const keys = new Set()
for (const row of review) {
  const key = `${row.chapter}:${row.startParagraph}`
  assert.ok(!keys.has(key), `Duplicate review row ${key}`)
  keys.add(key)
  assert.ok(chapters[row.chapter - 1], `Unknown chapter ${row.chapter}`)
  assert.ok(validDecisions.has(row.decision), `Pending boundary ${key}`)
  assert.ok(row.reason.trim(), `Missing narrative reason ${key}`)
  assert.ok(row.placeBefore.trim() && row.placeAfter.trim(), `Missing place audit ${key}`)
  assert.ok(row.castChange.trim(), `Missing cast audit ${key}`)
  assert.ok(row.knowledgeOrItemChange.trim(), `Missing knowledge/item audit ${key}`)
  if (row.decision === 'move') assert.ok(Number.isInteger(row.finalStartParagraph) && row.finalStartParagraph > 1, `Invalid moved boundary ${key}`)
  if (row.decision === 'accept') assert.equal(row.finalStartParagraph, row.startParagraph, `Accepted boundary changed ${key}`)
  if (row.decision === 'remove') assert.equal(row.finalStartParagraph, null, `Removed boundary retained ${key}`)
}
console.log(`PASS: ${review.length} scene-boundary decisions have narrative, place, cast, and knowledge/item review evidence.`)
