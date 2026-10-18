import fs from 'node:fs'
import crypto from 'node:crypto'

export const sourceUrl = 'https://www.gutenberg.org/cache/epub/26/pg26.txt'
export const sourceEdition = 'John Milton, Paradise Lost, Project Gutenberg eBook #26, twelve-book text credited to Dr. Joseph Raben; released 1 February 1992; source file updated 21 August 2026.'
const sourceBytes = fs.readFileSync(new URL('./source/pg26.txt', import.meta.url))
export const sourceSha256 = crypto.createHash('sha256').update(sourceBytes).digest('hex')
const raw = sourceBytes.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
const startMarker = 'Book I'
const endMarker = 'Transcriber’s Notes'
const start = raw.indexOf(`\n${startMarker}\n`)
const end = raw.indexOf(`\n${endMarker}\n`, start)
if (start < 0 || end < 0) throw Error('Source extraction boundaries missing')
export const extracted = raw.slice(start + 1, end).trimEnd()

const roman = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']
const positions = roman.map(label => {
  const marker = `Book ${label}`
  const index = extracted.indexOf(marker)
  if (index < 0) throw Error(`Missing ${marker}`)
  return { label, marker, index }
})
if (positions.some((position, index) => index && position.index <= positions[index - 1].index)) throw Error('Book headings out of order')

export const books = positions.map((position, index) => {
  const body = extracted.slice(position.index + position.marker.length, positions[index + 1]?.index ?? extracted.length).trim()
  const lines = body.split('\n').filter(line => line.trim().length > 0).map(line => line.trimEnd())
  if (!lines.length) throw Error(`Book ${position.label} has no verse lines`)
  return { number: index + 1, label: position.label, sourceHeading: position.marker, lines, text: lines.join('\n') }
})

export const retainedText = books.map(book => `${book.sourceHeading}\n\n${book.text}`).join('\n\n')
export const verseText = books.map(book => book.text).join('\n\n')
export const verseLineCount = books.reduce((sum, book) => sum + book.lines.length, 0)
export const countWords = text => (text.match(/[\p{L}\p{N}]+(?:[’'][\p{L}\p{N}]+)*/gu) ?? []).length
export const normalize = text => text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n').map(line => line.trimEnd()).filter(line => line.trim().length > 0).join('\n').trim()

if (books.length !== 12) throw Error(`Expected 12 books, found ${books.length}`)
if (sourceSha256 !== 'aeedc9f33e0c2a6422d2f557462fb87cd2430974c6aed30a26803be5394a741a') throw Error('Upstream source bytes changed')

