import fs from 'node:fs'
import { createHash } from 'node:crypto'
import { gunzipSync } from 'node:zlib'

export const sourceUrl = 'https://www.gutenberg.org/cache/epub/135/pg135.txt'
export const sourceCatalogue = 'https://www.gutenberg.org/ebooks/135'
export const sourceEdition = 'Victor Hugo, Les Misérables; Isabel F. Hapgood translation, Thomas Y. Crowell & Co., 1887; Project Gutenberg #135'
export const sourceSha256 = '6cf3b9d6fc5e6f733737425267d3af296d7f99f9b9fd1d255a3ab7689a6346ab'
const bytes = gunzipSync(fs.readFileSync(new URL('./source/pg135.txt.gz', import.meta.url)))
if (createHash('sha256').update(bytes).digest('hex') !== sourceSha256) throw new Error('Pinned source bytes changed')
export const rawSourceBytes = bytes.length
export const raw = bytes.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
const start = raw.indexOf('\nPREFACE\n')
const end = raw.indexOf('\n*** END OF THE PROJECT GUTENBERG EBOOK LES MISÉRABLES ***')
if (start < 0 || end <= start) throw new Error('Unindented preface/end markers not found')
export const extracted = raw.slice(start + 1, end).trimEnd()
// Preserve every non-illustration character, including preface, division
// headings, verse, letters, and the complete numbered endnote apparatus.
export const exclusions = [...extracted.matchAll(/^\[Illustration:[\s\S]*?\](?:[^\S\n]*\n)?/gm)].map(match => ({
  start: match.index, end: match.index + match[0].length, text: match[0], reason: 'illustration placeholder, not narrative',
}))
export const retained = extracted.replace(/^\[Illustration:[\s\S]*?\](?:[^\S\n]*\n)?/gm, '')
export const countWords = text => (text.match(/[\p{L}\p{N}]+(?:[’'][\p{L}\p{N}]+)*/gu) ?? []).length
export const sha256 = text => createHash('sha256').update(text).digest('hex')
export const retainedSha256 = sha256(retained)
export const apparatus = {
  letterStart: retained.indexOf('\nLETTER TO M. DAELLI\n') + 1,
  footnotesStart: retained.indexOf('\nFOOTNOTES:\n') + 1,
}
export const footnoteNumbers = [...retained.slice(apparatus.footnotesStart).matchAll(/^(\d+) \(return\)/gm)].map(match => Number(match[1]))
export const extraction = {
  normalization: 'Original UTF-8 bytes archived; CRLF/CR to LF; trim whitespace after the final retained endnote; no line reflow, spelling changes, or internal whitespace collapse.',
  normalizedSourceStart: start + 1, normalizedSourceEnd: end,
  excludedPrefix: 'Gutenberg header, source title/publisher display, six preliminary illustration placeholders, and duplicate table of contents.',
  excludedSuffix: 'Gutenberg end marker, redistribution notes, and complete licence.',
  retainedAppendices: 'Letter to M. Daelli and all 70 numbered endnotes, in the final chapter container after its narrative.',
  illustrationOffsetSpace: 'Offsets in the extracted LF text before illustration-placeholder removal.',
}

const volumeHeaders = [...retained.matchAll(/^VOLUME ([IVX]+)(?:—[^\n]+)?$/gm)]
const bookHeaders = [...retained.matchAll(/^BOOK ([A-Z-]+)—[^\n]+(?:\n[^\n]+)*?(?=\n\n)/gm)]
const chapterHeaders = [...retained.matchAll(/^CHAPTER ([IVXLCDM]+)(?:—[^\n]+(?:\n[^\n]+)*?)?(?=\n\n)/gm)]
export const volumes = volumeHeaders.map((match, index) => ({
  number: index + 1, roman: match[1], start: match.index,
  heading: retained.slice(match.index, retained.indexOf('\n\n', match.index)).trim(),
}))
export const books = bookHeaders.map((match, index) => ({
  number: index + 1, ordinal: match[1], heading: match[0], start: match.index,
  volume: volumes.findLast(volume => volume.start < match.index)?.number,
}))
export const chapters = chapterHeaders.map((match, index) => {
  const book = books.findLast(entry => entry.start < match.index)
  const volume = volumes.find(entry => entry.number === book?.volume)
  if (!book || !volume) throw new Error(`Chapter lacks a division: ${match[0]}`)
  // The first chapter after a volume/book begins at that division heading.
  // The first chapter of the novel also owns the authorial preface. Slices
  // partition the retained text exactly; no text is reconstructed from labels.
  let segmentStart = index === 0 ? 0 : match.index
  if (index > 0 && (!chapterHeaders[index - 1] || chapterHeaders[index - 1].index < book.start)) segmentStart = book.start
  if (index > 0 && chapterHeaders[index - 1].index < volume.start) segmentStart = volume.start
  const heading = match[0]
  return {
    number: index + 1, volume: volume.number, book: book.number,
    chapterRoman: match[1], heading, headingStart: match.index,
    title: `Volume ${volume.roman} · Book ${book.ordinal} · ${heading.replace(/\n/g, ' ')}`,
    start: segmentStart,
  }
})
for (const [index, chapter] of chapters.entries()) {
  chapter.end = chapters[index + 1]?.start ?? retained.length
  chapter.text = retained.slice(chapter.start, chapter.end)
  const bodyStart = chapter.headingStart + chapter.heading.length
  const body = retained.slice(bodyStart, chapter.end)
  chapter.paragraphs = [...body.matchAll(/\S[\s\S]*?(?=\n[ \t]*\n|$)/g)].map(match => ({
    start: bodyStart + match.index, end: bodyStart + match.index + match[0].length, text: match[0],
  }))
}
if (!chapters.length || chapters.map(chapter => chapter.text).join('') !== retained) throw new Error('Source partition is not exact')
