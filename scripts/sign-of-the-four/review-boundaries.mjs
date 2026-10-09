import fs from 'node:fs'
import { sections } from './source-text.mjs'
import { cuts } from './scene-cuts.mjs'

const brief = paragraph => paragraph.replace(/\s+/g, ' ').slice(0, 180).trimEnd()
const rows = ['# Scene-boundary review', '', 'Each cut below is a retained source paragraph boundary. The adjacent source paragraphs are included for editorial inspection.', '']
for (const section of sections) {
  const paragraphs = section.text.split(/\n{2,}/)
  rows.push(`## ${section.heading}`, '')
  for (let index = 1; index < cuts[section.number - 1].length; index++) {
    const [start, title, reason] = cuts[section.number - 1][index]
    rows.push(`### ${start}: ${title}`, '', `Reason: ${reason}`, '', `Before: ${brief(paragraphs[start - 1])}`, '', `After: ${brief(paragraphs[start])}`, '')
  }
}
fs.writeFileSync(new URL('./BOUNDARY_REVIEW.md', import.meta.url), rows.join('\n').trimEnd() + '\n')
