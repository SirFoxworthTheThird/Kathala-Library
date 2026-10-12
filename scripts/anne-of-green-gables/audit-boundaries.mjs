import fs from 'node:fs'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import { sceneModel } from './scene-model.mjs'
import review from './boundary-review.json' with { type: 'json' }
import { chapters, normalize } from './source-text.mjs'

const validDecisions = new Set(['accept', 'move', 'remove'])
const keys = new Set()
for (const row of review) {
  const key = `${row.chapter}:${row.startParagraph}`
  assert.ok(!keys.has(key), `Duplicate review row ${key}`)
  keys.add(key)
  assert.ok(chapters[row.chapter - 1], `Unknown chapter ${row.chapter}`)
  const paragraphs=chapters[row.chapter-1].paragraphs
  assert.equal(row.before,normalize(paragraphs[row.startParagraph-2]),`Before paragraph ${key}`)
  assert.equal(row.after,normalize(paragraphs[row.startParagraph-1]),`After paragraph ${key}`)
  for(const [side,index] of [['before',row.startParagraph-2],['after',row.startParagraph-1]])assert.equal(row[side+'Sha256'],crypto.createHash('sha256').update(paragraphs[index]).digest('hex'),`Source evidence hash ${key}`)
  assert.ok(validDecisions.has(row.decision), `Pending boundary ${key}`)
  assert.ok(row.reason.trim(), `Missing narrative reason ${key}`)
  assert.ok(row.placeBefore.trim() && row.placeAfter.trim(), `Missing place audit ${key}`)
  assert.ok(row.castChange.trim(), `Missing cast audit ${key}`)
  assert.ok(row.knowledgeOrItemChange.trim(), `Missing knowledge/item audit ${key}`)
  if (row.decision === 'move') assert.ok(Number.isInteger(row.finalStartParagraph) && row.finalStartParagraph > 1, `Invalid moved boundary ${key}`)
  if (row.decision === 'accept') assert.equal(row.finalStartParagraph, row.startParagraph, `Accepted boundary changed ${key}`)
  if (row.decision === 'remove') assert.equal(row.finalStartParagraph, null, `Removed boundary retained ${key}`)
}
const expected=[...sceneModel].flatMap(([chapter,rows])=>rows.slice(1).map(r=>`${chapter}:${r.start}`)).sort()
assert.deepEqual([...keys].sort(),expected,'Every retained boundary requires source evidence')
console.log(`PASS: ${review.length} scene-boundary decisions have narrative, place, cast, and knowledge/item review evidence.`)
