import fs from 'node:fs'
import crypto from 'node:crypto'

export const sourceUrl = 'https://www.gutenberg.org/cache/epub/421/pg421.txt'
export const sourceEdition = 'Kidnapped by Robert Louis Stevenson, Project Gutenberg eBook #421, UTF-8 text updated 23 September 2024'
const file = new URL('./source/pg421.txt', import.meta.url)
const rawBytes = fs.readFileSync(file)
export const sourceFileSha256 = crypto.createHash('sha256').update(rawBytes).digest('hex')
const raw = rawBytes.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
const startMarker = '*** START OF THE PROJECT GUTENBERG EBOOK KIDNAPPED ***'
const endMarker = '*** END OF THE PROJECT GUTENBERG EBOOK KIDNAPPED ***'
const start = raw.indexOf(startMarker)
const firstChapter = raw.indexOf('\nCHAPTER I\n', start)
const end = raw.indexOf(endMarker, firstChapter)
if (start < 0 || firstChapter < 0 || end < 0) throw Error('Verified Gutenberg extraction boundaries are missing')

// Retain the authorial dedication and the complete thirty-chapter narrative.
// Exclude Gutenberg packaging and its generated contents table. The dedication
// begins at the first occurrence after the START marker and is attached to Chapter I.
const dedicationStart = raw.indexOf('\nDEDICATION\n', start)
if (dedicationStart < 0 || dedicationStart > firstChapter) throw Error('Dedication boundary missing')
export const narrativeText = raw.slice(dedicationStart + 1, end).trim()
const matches = [...narrativeText.matchAll(/^CHAPTER ([IVXLCDM]+)\n\n([^\n]+)$/gm)]
if (matches.length !== 30) throw Error(`Expected 30 chapters, found ${matches.length}`)
const titleCase = value => value.toLowerCase().replace(/(^|[\s:—“])(\p{L})/gu, (_, p, c) => p + c.toUpperCase())
export const sourceSections = matches.map((match, i) => ({
  number: i + 1,
  title: `Chapter ${match[1]} — ${titleCase(match[2].replaceAll('_', ''))}`,
  sourceHeading: match[0].replaceAll('_', ''),
  text: `${i ? '' : `${narrativeText.slice(0, match.index).trim()}\n\n`}${narrativeText.slice(match.index, matches[i + 1]?.index ?? narrativeText.length).trim()}`,
}))
export const normalize = text => text.replace(/\s+/g, ' ').trim()
export const countWords = text => (text.match(/\S+/g) || []).length
if (normalize(sourceSections.map(s => s.text).join('\n\n')) !== normalize(narrativeText)) throw Error('Chapter extraction does not reconstruct retained text')

