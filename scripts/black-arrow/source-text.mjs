import fs from 'node:fs'
import crypto from 'node:crypto'

export const sourceUrl = 'https://www.gutenberg.org/cache/epub/848/pg848.txt'
export const sourceEdition = 'Robert Louis Stevenson, The Black Arrow: A Tale of the Two Roses, Project Gutenberg eBook #848, English UTF-8 text, released 1 March 1997, updated 24 August 2021; David Price credit'
const bytes = fs.readFileSync(new URL('./source/pg848.txt', import.meta.url))
export const sourceSha256 = crypto.createHash('sha256').update(bytes).digest('hex')
const raw = bytes.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
const startMarker = '*** START OF THE PROJECT GUTENBERG EBOOK THE BLACK ARROW: A TALE OF THE TWO ROSES ***'
const endMarker = '*** END OF THE PROJECT GUTENBERG EBOOK THE BLACK ARROW: A TALE OF THE TWO ROSES ***'
const start = raw.indexOf(startMarker)
const end = raw.indexOf(endMarker, start + startMarker.length)
const dedication = raw.indexOf('\nCritic on the Hearth:', start)
if (start < 0 || end < 0 || dedication < 0 || dedication > end) throw Error('Gutenberg extraction boundaries missing')
export const retainedText = raw.slice(dedication + 1, end).trim()
const heading = /^(PROLOGUE--[^\n]+|BOOK [IVXLCDM]+--[^\n]+|CHAPTER [IVXLCDM]+--[^\n]+)$/gm
const matches = [...retainedText.matchAll(heading)]
if (matches.length !== 38) throw Error(`Expected 38 structural headings, found ${matches.length}`)
const sectionStarts = matches.filter(match => !match[0].startsWith('BOOK '))
const boundaries = sectionStarts.map((match, index) => index === 0 ? 0 : (matches.find(x => x.index > sectionStarts[index - 1].index && x.index < match.index && x[0].startsWith('BOOK '))?.index ?? match.index))
export const sections = sectionStarts.map((match, index) => {
  const beginning = boundaries[index]
  const ending = boundaries[index + 1] ?? retainedText.length
  const precedingBook = matches.filter(x => x.index <= match.index && x[0].startsWith('BOOK ')).at(-1)
  return { number: index + 1, book: precedingBook?.[0] ?? 'Prologue', heading: match[0], text: retainedText.slice(beginning, ending).trim() }
})
if (sections.length !== 33) throw Error(`Expected prologue and 32 chapters, found ${sections.length}`)
export const normalize = text => text.replace(/\s+/g, ' ').trim()
export const wordCount = text => (text.match(/\S+/g) ?? []).length
if (normalize(sections.map(s => s.text).join('\n\n')) !== normalize(retainedText)) throw Error('Section reconstruction differs from source')
