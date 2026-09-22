import fs from 'node:fs'
import crypto from 'node:crypto'

export const sourceUrl = 'https://www.gutenberg.org/ebooks/10007'
export const sourceEdition = 'Project Gutenberg eBook #10007, updated 28 October 2024'
export const sourcePath = new URL('./source/pg10007.txt', import.meta.url)
export const sourceFile = fs.readFileSync(sourcePath, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
export const sourceFileSha256 = crypto.createHash('sha256').update(fs.readFileSync(sourcePath)).digest('hex')

const startMarker = '*** START OF THE PROJECT GUTENBERG EBOOK CARMILLA ***'
const endMarker = '*** END OF THE PROJECT GUTENBERG EBOOK CARMILLA ***'
const body = sourceFile.slice(sourceFile.indexOf(startMarker) + startMarker.length, sourceFile.indexOf(endMarker)).trim()
const narrativeStart = body.indexOf('PROLOGUE\n\n')
if (narrativeStart < 0) throw new Error('Could not find narrative start')
const narrativeEnd = body.indexOf('\n\nOther books by J. Sheridan LeFanu')
if (narrativeEnd < 0) throw new Error('Could not find narrative end')
const narrative = body.slice(narrativeStart, narrativeEnd).trim()
const boundary = /^(PROLOGUE|(?:I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI)\.)\n(?:([^\n]+)\n)?/gm
const hits = [...narrative.matchAll(boundary)]
if (hits.length !== 17) throw new Error(`Expected 17 source divisions, found ${hits.length}`)

export const sourceSections = hits.map((hit, index) => {
  const next = hits[index + 1]
  const sourceHeading = hit[1] === 'PROLOGUE' ? 'PROLOGUE' : `${hit[1]} ${hit[2]}`
  return {
    number: index,
    sourceHeading,
    title: hit[1] === 'PROLOGUE' ? 'Prologue' : hit[2].trim(),
    text: narrative.slice(hit.index, next?.index ?? narrative.length).trim(),
  }
})

export const narrativeText = sourceSections.map(section => section.text).join('\n\n')
export const normalize = text => text.replace(/\s+/g, ' ').trim()
export const countWords = text => (text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) ?? []).length
