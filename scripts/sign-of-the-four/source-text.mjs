import fs from 'node:fs'
import crypto from 'node:crypto'

export const sourceUrl = 'https://www.gutenberg.org/cache/epub/2097/pg2097.txt'
export const sourceEdition = 'Arthur Conan Doyle, The Sign of the Four, Project Gutenberg eBook #2097, English UTF-8 plain text, released 1 March 2000, updated 6 April 2026'
const bytes = fs.readFileSync(new URL('./source/pg2097.txt', import.meta.url))
export const sourceSha256 = crypto.createHash('sha256').update(bytes).digest('hex')
const raw = bytes.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
const startMarker = '*** START OF THE PROJECT GUTENBERG EBOOK THE SIGN OF THE FOUR ***'
const endMarker = '*** END OF THE PROJECT GUTENBERG EBOOK THE SIGN OF THE FOUR ***'
const start = raw.indexOf(startMarker)
const end = raw.indexOf(endMarker, start + startMarker.length)
const firstChapter = raw.indexOf('\nChapter I\nThe Science of Deduction\n', start)
if (start < 0 || end < 0 || firstChapter < 0 || firstChapter > end) throw Error('Source boundaries missing')
export const retainedText = raw.slice(firstChapter + 1, end).trim()
const matches = [...retainedText.matchAll(/^Chapter ([IVX]+)\n([^\n]+)$/gm)]
if (matches.length !== 12) throw Error(`Expected 12 chapters, found ${matches.length}`)
export const sections = matches.map((match, index) => ({
  number: index + 1,
  heading: `Chapter ${match[1]} — ${match[2]}`,
  text: retainedText.slice(match.index, matches[index + 1]?.index ?? retainedText.length).trim(),
}))
export const normalize = text => text.replace(/\s+/g, ' ').trim()
export const wordCount = text => (text.match(/\S+/g) ?? []).length
if (normalize(sections.map(s => s.text).join('\n\n')) !== normalize(retainedText)) throw Error('Chapter reconstruction differs from source')
