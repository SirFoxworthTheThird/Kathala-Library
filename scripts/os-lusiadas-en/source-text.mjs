import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const volumes = [77660, 77661].map(number => zlib.gunzipSync(fs.readFileSync(path.join(here, `source/pg${number}.txt.gz`))).toString('utf8').replaceAll('\r\n', '\n'))
const romans = ['I','II','III','IV','V','VI','VII','VIII','IX','X']
const expectedCounts = [106,113,143,104,100,99,87,99,95,156]

export const cantos = romans.map((roman, index) => {
  const source = volumes[index < 6 ? 0 : 1]
  const heading = `CANTO ${roman}.`
  const headings = [...source.matchAll(new RegExp(`^${heading.replace('.', '\\.')}\\s*$`, 'gm'))]
  if (headings.length !== 2) throw Error(`${heading}: expected synopsis and poem headings, found ${headings.length}`)
  const start = headings[1].index + headings[1][0].length
  const end = source.indexOf(`CANTO ${roman}. ENDNOTES.`, start)
  if (end < 0) throw Error(`${heading}: missing endnotes boundary`)
  const blocks = source.slice(start, end).trim().split(/\n\s*\n/)
  const stanzas = []
  for (const block of blocks) {
    const lines = block.split('\n').map(line => line.trim())
    if (lines.length === 1 && /^\*(\s+\*)+$/.test(lines[0])) continue
    if (index === 9 && lines.length === 8 && lines[0].startsWith('Then waxt the woeful wail a sorer strain,')) continue
    if (lines.length !== 8) throw Error(`${heading}: ${lines.length}-line stanza block near ${lines[0]}`)
    const first = lines[0].match(/^(.*?)\s+(\d+)(?:\[\d+\])?$/)
    if (!first) throw Error(`${heading}: missing stanza number near ${lines[0]}`)
    const number = Number(first[2])
    if (number !== stanzas.length + 1) throw Error(`${heading}: expected stanza ${stanzas.length + 1}, found ${number}`)
    lines[0] = first[1]
    const text = lines.map(line => line.replace(/\[\d+\]/g, '')).join('\n')
    stanzas.push({ number, text })
  }
  if (stanzas.length !== expectedCounts[index]) throw Error(`${heading}: ${stanzas.length} stanzas, expected ${expectedCounts[index]}`)
  return { number: index + 1, title: `Canto ${roman}`, stanzas }
})

export const retainedText = cantos.map(canto => canto.stanzas.map(stanza => stanza.text).join('\n\n')).join('\n\n')
export const stanzaCount = cantos.reduce((n, canto) => n + canto.stanzas.length, 0)
export const verseLineCount = cantos.reduce((n, canto) => n + canto.stanzas.length * 8, 0)
export const wordCount = text => text.trim().split(/\s+/).length
