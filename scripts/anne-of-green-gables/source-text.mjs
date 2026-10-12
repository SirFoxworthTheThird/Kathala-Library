import fs from 'node:fs'
import crypto from 'node:crypto'

export const sourceUrl = 'https://www.gutenberg.org/cache/epub/45/pg45.txt'
export const sourceEdition = 'L. M. Montgomery, Anne of Green Gables, Project Gutenberg eBook #45, English UTF-8 text, released 27 June 2008, updated 29 April 2025; David Widger and Charles Keller credits'
const bytes = fs.readFileSync(new URL('./source/pg45.txt', import.meta.url))
export const sourceByteCount = bytes.length
export const sourceSha256 = crypto.createHash('sha256').update(bytes).digest('hex')
const raw = bytes.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
const startMarker = '*** START OF THE PROJECT GUTENBERG EBOOK ANNE OF GREEN GABLES ***'
const endMarker = '*** END OF THE PROJECT GUTENBERG EBOOK ANNE OF GREEN GABLES ***'
const start = raw.indexOf(startMarker)
const end = raw.indexOf(endMarker, start + startMarker.length)
const firstChapter = raw.indexOf('CHAPTER I. Mrs. Rachel Lynde Is Surprised', start)
if (start < 0 || end < 0 || firstChapter < 0 || firstChapter > end) throw Error('Gutenberg extraction boundaries missing')

// The retained representation keeps all source chapter headings and narrative,
// normalizes platform newlines to LF, and trims packaging-edge blank lines.
export const retainedText = raw.slice(firstChapter, end).trim().replace(/\n{3,}/g, '\n\n')
const headingPattern = /^CHAPTER ([IVXLCDM]+)\. ([^\n]+)$/gm
const matches = [...retainedText.matchAll(headingPattern)]
if (matches.length !== 38) throw Error(`Expected 38 chapter headings, found ${matches.length}`)
export const chapters = matches.map((match, index) => {
  const next = matches[index + 1]?.index ?? retainedText.length
  const fullText = retainedText.slice(match.index, next).trim()
  const body = fullText.slice(match[0].length).trim()
  const paragraphs = body.split(/\n{2,}/)
  if (!body || !paragraphs.length) throw Error(`Empty chapter ${index + 1}`)
  return {
    number: index + 1,
    numeral: match[1],
    title: match[2],
    heading: match[0],
    body,
    fullText,
    paragraphs,
  }
})

export const normalize = text => text.replace(/\s+/g, ' ').trim()
export const wordCount = text => (text.match(/\S+/g) ?? []).length
export const paragraphCount = chapters.reduce((sum, chapter) => sum + chapter.paragraphs.length, 0)
export const reconstructedText = chapters.map(chapter => `${chapter.heading}\n\n${chapter.body}`).join('\n\n')
if (reconstructedText !== retainedText) throw Error('Chapter reconstruction differs from retained source')
