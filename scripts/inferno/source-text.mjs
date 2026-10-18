import fs from 'node:fs'
import crypto from 'node:crypto'

export const sourceUrl = 'https://www.gutenberg.org/cache/epub/1001/pg1001.txt'
export const sourceEdition = "Dante Alighieri, Divine Comedy, Longfellow's Translation, Hell, translated by Henry Wadsworth Longfellow, Project Gutenberg eBook #1001; released 1 August 1997; source file most recently updated 29 October 2024."
const sourceBytes = fs.readFileSync(new URL('./source/pg1001.txt', import.meta.url))
export const sourceSha256 = crypto.createHash('sha256').update(sourceBytes).digest('hex')
const raw = sourceBytes.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
const startMarker = 'Inferno: Canto I'
const endMarker = '*** END OF THE PROJECT GUTENBERG EBOOK DIVINE COMEDY, LONGFELLOW\'S TRANSLATION, HELL ***'
const start = raw.indexOf(`\n${startMarker}\n`)
const end = raw.indexOf(`\n${endMarker}`, start)
if (start < 0 || end < 0) throw Error('Source extraction boundaries missing')
export const extracted = raw.slice(start + 1, end).trimEnd()

const roman = [
  'I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII',
  'XVIII','XIX','XX','XXI','XXII','XXIII','XXIV','XXV','XXVI','XXVII','XXVIII','XXIX','XXX','XXXI','XXXII','XXXIII','XXXIV',
]
const positions = roman.map(label => {
  const marker = `Inferno: Canto ${label}`
  const index = extracted.indexOf(marker)
  if (index < 0) throw Error(`Missing ${marker}`)
  return { label, marker, index }
})
if (positions.some((position, index) => index && position.index <= positions[index - 1].index)) throw Error('Canto headings out of order')

export const cantos = positions.map((position, index) => {
  const body = extracted.slice(position.index + position.marker.length, positions[index + 1]?.index ?? extracted.length).trim()
  const lines = body.split('\n').filter(line => line.trim().length > 0).map(line => line.trimEnd())
  if (!lines.length) throw Error(`Canto ${position.label} has no verse lines`)
  return { number: index + 1, label: position.label, sourceHeading: position.marker, lines, text: lines.join('\n') }
})

export const retainedText = cantos.map(canto => `${canto.sourceHeading}\n\n${canto.text}`).join('\n\n')
export const verseText = cantos.map(canto => canto.text).join('\n\n')
export const verseLineCount = cantos.reduce((sum, canto) => sum + canto.lines.length, 0)
export const stanzaGroupCount = cantos.reduce((sum, canto) => sum + Math.ceil(canto.lines.length / 3), 0)
export const countWords = text => (text.match(/[\p{L}\p{N}]+(?:[’'][\p{L}\p{N}]+)*/gu) ?? []).length
export const normalize = text => text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n').map(line => line.trimEnd()).filter(line => line.trim().length > 0).join('\n').trim()

if (cantos.length !== 34) throw Error(`Expected 34 cantos, found ${cantos.length}`)
if (sourceSha256 !== '10fad2f10aaffec3bfe3fd63266544f7fd5bba576cd5c63afe68e8212849754d') throw Error('Upstream source bytes changed')
