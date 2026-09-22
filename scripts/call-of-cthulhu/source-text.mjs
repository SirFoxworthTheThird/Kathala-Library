import fs from 'node:fs'
import crypto from 'node:crypto'

export const sourceUrl = 'https://www.gutenberg.org/ebooks/68283'
export const sourceEdition = 'The Call of Cthulhu by H. P. Lovecraft, Project Gutenberg eBook #68283, based on Weird Tales (February 1928), updated 18 October 2024'
const file = new URL('./source/pg68283.txt', import.meta.url)
const bytes = fs.readFileSync(file)
export const sourceFileSha256 = crypto.createHash('sha256').update(bytes).digest('hex')
const raw = bytes.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
const startMarker = '*** START OF THE PROJECT GUTENBERG EBOOK THE CALL OF CTHULHU ***'
const endMarker = '*** END OF THE PROJECT GUTENBERG EBOOK THE CALL OF CTHULHU ***'
const start = raw.indexOf(startMarker), end = raw.indexOf(endMarker, start)
if (start < 0 || end < 0) throw Error('Verified Gutenberg boundaries are missing')
const retained = raw.slice(start + startMarker.length, end).replace(/^[ \t]+$/gm, '').trim()
const headings = [...retained.matchAll(/^\s+_(\d)\. ([^_]+)\._\s*$/gm)]
if (headings.length !== 3) throw Error(`Expected three source divisions, found ${headings.length}`)
export const narrativeText = retained
export const sourceSections = headings.map((match, i) => ({
  number: i + 1,
  title: `${match[1]}. ${match[2]}`,
  sourceHeading: `${match[1]}. ${match[2]}`,
  text: `${i ? '' : `${retained.slice(0, match.index).trim()}\n\n`}${retained.slice(match.index, headings[i + 1]?.index ?? retained.length).trim()}`,
}))
export const normalize = text => text.replace(/\s+/g, ' ').trim()
export const countWords = text => (text.match(/\S+/g) || []).length
if (normalize(sourceSections.map(s => s.text).join('\n\n')) !== normalize(narrativeText)) throw Error('Section extraction does not reconstruct retained text')
