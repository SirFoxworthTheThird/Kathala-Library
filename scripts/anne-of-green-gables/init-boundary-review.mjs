import fs from 'node:fs'
import starts from './boundary-candidates.json' with { type: 'json' }
import { chapters } from './source-text.mjs'

const compact = text => text.replace(/\s+/g, ' ').trim()
const review = chapters.flatMap(chapter => starts[chapter.number].slice(1).map(start => ({
  chapter: chapter.number,
  startParagraph: start,
  before: compact(chapter.paragraphs[start - 2]).slice(-180),
  after: compact(chapter.paragraphs[start - 1]).slice(0, 180),
  decision: 'pending',
  finalStartParagraph: null,
  reason: '',
  placeBefore: '',
  placeAfter: '',
  castChange: '',
  knowledgeOrItemChange: '',
})))
const target = new URL('./boundary-review.json', import.meta.url)
if (fs.existsSync(target)) throw Error('boundary-review.json already exists; refusing to overwrite review work')
fs.writeFileSync(target, JSON.stringify(review, null, 2) + '\n')
console.log(`Initialized ${review.length} boundary decisions.`)
