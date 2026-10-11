import fs from 'node:fs'
import { chapters, wordCount } from './source-text.mjs'

const compact = text => text.replace(/\s+/g, ' ').trim()
const targetWords = 850
const report = ['# Proposed scene boundaries', '', 'Mechanical candidates only. Each candidate must be accepted, moved, or removed during prose review.', '']
const proposals = {}
for (const chapter of chapters) {
  const total = wordCount(chapter.body)
  const sceneCount = Math.max(2, Math.round(total / targetWords))
  const targets = Array.from({ length: sceneCount - 1 }, (_, index) => total * (index + 1) / sceneCount)
  const starts = [1]
  let cumulative = 0
  let targetIndex = 0
  for (let index = 0; index < chapter.paragraphs.length - 1 && targetIndex < targets.length; index++) {
    cumulative += wordCount(chapter.paragraphs[index])
    if (cumulative >= targets[targetIndex]) {
      starts.push(index + 2)
      targetIndex++
    }
  }
  proposals[chapter.number] = starts
  report.push(`## Chapter ${chapter.number}: ${chapter.title}`, '', `Words: ${total}; candidate scenes: ${starts.length}`, '')
  for (const start of starts.slice(1)) {
    report.push(`### Candidate start paragraph ${start}`, '', `Before: ${compact(chapter.paragraphs[start - 2]).slice(-300)}`, '', `After: ${compact(chapter.paragraphs[start - 1]).slice(0, 300)}`, '')
  }
}
fs.writeFileSync(new URL('./BOUNDARY_CANDIDATES.md', import.meta.url), report.join('\n') + '\n')
fs.writeFileSync(new URL('./boundary-candidates.json', import.meta.url), JSON.stringify(proposals, null, 2) + '\n')
console.log(`Proposed ${Object.values(proposals).reduce((sum, starts) => sum + starts.length, 0)} scenes.`)
