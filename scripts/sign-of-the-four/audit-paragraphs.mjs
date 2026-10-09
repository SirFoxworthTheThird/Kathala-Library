import fs from 'node:fs'
import { sections, wordCount } from './source-text.mjs'

const lines = sections.flatMap(section => {
  const paragraphs = section.text.split(/\n{2,}/)
  return [`\n## ${section.heading} (${wordCount(section.text)} words; ${paragraphs.length} paragraphs)`,
    ...paragraphs.map((paragraph, index) => `${String(index).padStart(3)} ${paragraph.replace(/\s+/g, ' ').slice(0, 125).trimEnd()}`)]
})
fs.writeFileSync(new URL('./paragraph-audit.txt', import.meta.url), lines.join('\n') + '\n')
