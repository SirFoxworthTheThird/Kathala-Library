import fs from 'node:fs'
import { chapters, wordCount } from './source-text.mjs'

const compact = text => text.replace(/\s+/g, ' ').trim()
const lines = ['# Anne of Green Gables scene-boundary working audit', '', 'Paragraph numbers are one-based within each retained chapter body. Excerpts are working evidence from the public-domain source; the final audit records each retained cut and its narrative reason.', '']
for (const chapter of chapters) {
  lines.push(`## Chapter ${chapter.number}: ${chapter.title}`, '', `Paragraphs: ${chapter.paragraphs.length}; words: ${wordCount(chapter.body)}`, '')
  for (const [index, paragraph] of chapter.paragraphs.entries()) {
    const excerpt = compact(paragraph)
    lines.push(`- **${index + 1}** (${wordCount(paragraph)} words) ${excerpt.slice(0, 210)}${excerpt.length > 210 ? '…' : ''}`)
  }
  lines.push('')
}
fs.writeFileSync(new URL('./BOUNDARY_WORKING.md', import.meta.url), lines.join('\n') + '\n')
console.log(`Wrote ${chapters.length} chapters and ${chapters.reduce((n, chapter) => n + chapter.paragraphs.length, 0)} indexed paragraphs.`)
