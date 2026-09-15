import fs from 'node:fs'

export const sourceUrl = 'https://www.gutenberg.org/ebooks/209'
export const sourceEdition = 'The Turn of the Screw by Henry James, Project Gutenberg eBook #209 (UTF-8 text, updated 25 July 2026)'

const raw = fs.readFileSync(new URL('./source/pg209.txt', import.meta.url), 'utf8').replace(/\r\n/g, '\n')
const gutenbergStart = raw.indexOf('*** START OF THE PROJECT GUTENBERG EBOOK')
const title = raw.indexOf('\nTHE TURN OF THE SCREW\n', gutenbergStart)
const end = raw.indexOf('\n*** END OF THE PROJECT GUTENBERG EBOOK', title)
if (gutenbergStart < 0 || title < 0 || end < 0) throw new Error('Project Gutenberg narrative boundaries were not found')

// Keep the book title and every word of the fireside frame and manuscript.
export const narrativeText = raw.slice(title + 1, end).trim()
const chapterMatches = [...narrativeText.matchAll(/^(?:I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX|XXI|XXII|XXIII|XXIV)$/gm)]
if (chapterMatches.length !== 24) throw new Error(`Expected 24 numbered chapters, found ${chapterMatches.length}`)

const openingEnd = chapterMatches[0].index
export const sourceSections = [{
  number: 1,
  title: 'The Fireside Manuscript',
  sourceHeading: 'THE TURN OF THE SCREW',
  text: narrativeText.slice(0, openingEnd).trim(),
}]

chapterMatches.forEach((match, index) => {
  const sectionEnd = index + 1 < chapterMatches.length ? chapterMatches[index + 1].index : narrativeText.length
  sourceSections.push({
    number: index + 2,
    title: `Chapter ${match[0]}`,
    sourceHeading: match[0],
    text: narrativeText.slice(match.index, sectionEnd).trim(),
  })
})

export function splitSection(text, parts) {
  const paragraphs = text.split(/\n{2,}/)
  const total = paragraphs.reduce((sum, paragraph) => sum + paragraph.length, 0)
  const result = []
  let current = []
  let used = 0
  for (const paragraph of paragraphs) {
    current.push(paragraph)
    used += paragraph.length
    const remainingParts = parts - result.length - 1
    const target = total * (result.length + 1) / parts
    if (remainingParts > 0 && used >= target) {
      result.push(current.join('\n\n'))
      current = []
    }
  }
  result.push(current.join('\n\n'))
  if (result.length !== parts) throw new Error(`Could not split section into ${parts} scenes`)
  return result
}
