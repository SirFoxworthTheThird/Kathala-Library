import fs from 'node:fs'
import crypto from 'node:crypto'

export const sourceUrl = 'https://www.gutenberg.org/cache/epub/558/pg558.txt'
export const sourceEdition = 'The Thirty-Nine Steps by John Buchan, Project Gutenberg eBook #558, UTF-8 text updated 7 April 2021'
const file = new URL('./source/pg558.txt', import.meta.url)
const raw = fs.readFileSync(file, 'utf8').replace(/\r\n?/g, '\n')
export const sourceSha256 = crypto.createHash('sha256').update(raw).digest('hex')
const start = raw.indexOf('\nTO\nTHOMAS ARTHUR NELSON\n')
const end = raw.indexOf('\n*** END OF THE PROJECT GUTENBERG EBOOK', start)
if (start < 0 || end < 0) throw Error('Verified extraction boundaries are missing')
export const narrativeText = raw.slice(start + 1, end).trim()
const matches = [...narrativeText.matchAll(/^Chapter ([IVX]+)\.\n([^\n]+)$/gm)]
if (matches.length !== 10) throw Error(`Expected ten chapters, found ${matches.length}`)
export const sourceSections = matches.map((match, i) => ({
  number: i + 1,
  title: `Chapter ${match[1]} — ${match[2]}`,
  sourceHeading: match[0],
  // The dedication remains attached to the opening chapter; it is not an invented chapter or event.
  text: narrativeText.slice(i ? match.index : 0, matches[i + 1]?.index ?? narrativeText.length).trim(),
}))
export const normalize = text => text.replace(/\s+/g, ' ').trim()
export const countWords = text => (text.match(/\S+/g) || []).length
if (normalize(sourceSections.map(s => s.text).join('\n\n')) !== normalize(narrativeText)) throw Error('Chapter extraction does not reconstruct the source')
