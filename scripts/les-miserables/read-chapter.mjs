import { chapters } from './source-text.mjs'
const first = Number(process.argv[2] ?? 1), last = Number(process.argv[3] ?? first)
for (const chapter of chapters.filter(chapter => chapter.number >= first && chapter.number <= last)) {
  console.log(`\n${chapter.number}: ${chapter.title}\n${chapter.paragraphs.length} paragraphs\n`)
  chapter.paragraphs.forEach((paragraph, index) => console.log(`[${index}] ${paragraph.text}\n`))
}
