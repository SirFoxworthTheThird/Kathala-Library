import fs from 'node:fs'
import crypto from 'node:crypto'

export const sourceUrl = 'https://www.gutenberg.org/cache/epub/62/pg62.txt'
export const sourceEdition = 'A Princess of Mars by Edgar Rice Burroughs, Project Gutenberg eBook #62, UTF-8 text updated 12 January 2025'
const file = new URL('./source/pg62.txt', import.meta.url)
const raw = fs.readFileSync(file, 'utf8').replace(/\r\n?/g, '\n')
export const sourceSha256 = crypto.createHash('sha256').update(raw).digest('hex')
const start = raw.indexOf('\nA Princess of Mars\n\nby Edgar Rice Burroughs\n')
const foreword = raw.indexOf('\nFOREWORD\n', start)
const end = raw.indexOf('\n*** END OF THE PROJECT GUTENBERG EBOOK', foreword)
if (start < 0 || foreword < 0 || end < 0) throw Error('Verified extraction boundaries are missing')

// Retain the title, byline, dedication, foreword, all chapter headings, and narrative.
// Remove only the publisher's contents/illustrations packaging between dedication and foreword.
const front = raw.slice(start + 1, raw.indexOf('\nCONTENTS\n', start)).trim()
const body = raw.slice(foreword + 1, end).replace(/\n*\[Illustration:[^\]]*\]\n*/g, '\n\n').trim()
export const narrativeText = `${front}\n\n${body}`
const matches = [...body.matchAll(/^CHAPTER ([IVXLCDM]+)\n([^\n]+)$/gm)]
if (matches.length !== 28) throw Error(`Expected 28 chapters, found ${matches.length}`)
export const sourceSections = matches.map((match, i) => ({
  number: i + 1,
  title: `Chapter ${match[1]} — ${match[2].replace(/\b\w+/g, w => w[0] + w.slice(1).toLowerCase())}`,
  sourceHeading: match[0],
  // Title, dedication, and foreword remain attached to Chapter I rather than becoming invented chapters.
  text: `${i ? '' : `${front}\n\n${body.slice(0, match.index).trim()}\n\n`}${body.slice(match.index, matches[i + 1]?.index ?? body.length).trim()}`,
}))
export const normalize = text => text.replace(/\s+/g, ' ').trim()
export const countWords = text => (text.match(/\S+/g) || []).length
if (normalize(sourceSections.map(s => s.text).join('\n\n')) !== normalize(narrativeText)) throw Error('Chapter extraction does not reconstruct the source')
