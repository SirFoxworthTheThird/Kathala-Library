import fs from 'node:fs'
import crypto from 'node:crypto'
import zlib from 'node:zlib'

export const sourceUrl = 'https://www.gutenberg.org/cache/epub/27236/pg27236.txt'
export const sourceEdition = 'Luís de Camões, Os Lusíadas (Lisboa: António Gonçalves, 1572), transcribed by Rui Baptista from Biblioteca Nacional Digital scans; Project Gutenberg eBook 27236, released 11 November 2008, updated 4 January 2021.'
const sourceBytes = zlib.gunzipSync(fs.readFileSync(new URL('./source/pg27236.txt.gz', import.meta.url)))
export const sourceSha256 = crypto.createHash('sha256').update(sourceBytes).digest('hex')
const raw = sourceBytes.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
const startMarker = 'Canto primeiro.'
const endMarker = '*** END OF THE PROJECT GUTENBERG EBOOK OS LUSÍADAS ***'
const start = raw.indexOf('\n' + startMarker + '\n')
const end = raw.indexOf(endMarker, start)
if (start < 0 || end < 0) throw Error('Source extraction boundaries missing')
export const extracted = raw.slice(start + 1, end)

const headings = [
  /^Canto primeiro\.$/m,
  /^❧ Canto Segundo\.$/m,
  /^❧ Canto Terceiro\.$/m,
  /^❧ Canto Quarto\.$/m,
  /^❧ Canto Quinto\.$/m,
  /^❧ Canto Seiſto\.$/m,
  /^❧ Canto Septimo\.$/m,
  /^❧ Canto Octauo\.$/m,
  /^❧ Canto Nono\.$/m,
  /^❧ Canto Decimo\n& vltimo\.$/m,
]
const expectedStanzas = [106, 113, 143, 104, 100, 99, 87, 99, 95, 156]
const positions = headings.map(re => {
  const match = re.exec(extracted)
  if (!match) throw Error(`Missing source heading: ${re}`)
  return { index: match.index, length: match[0].length, heading: match[0] }
})
if (positions.some((p, i) => i && p.index <= positions[i - 1].index)) throw Error('Canto headings out of order')

// The first stanza of each canto is set around the 1572 decorated initial. These
// explicit pairs restore its eight verse lines; no other stanza is reflowed.
const openingPairs = [
  [[0, 1, ''], [2, 3, ''], [4, 5, '']],
  [[0, 1, ' '], [2, 3, '']],
  [[0, 1, ' '], [2, 3, ' ']],
  [[0, 1, ''], [2, 3, ' ']],
  [[0, 1, ' '], [2, 3, '']],
  [[0, 1, ' '], [2, 3, '']],
  [[0, 1, ' '], [3, 4, ' ']],
  [[0, 1, ' '], [2, 3, '']],
  [[0, 1, ''], [2, 3, '']],
  [[0, 1, '']],
]
function reflowOpening(lines, pairs) {
  const result = []
  for (let i = 0; i < lines.length; i++) {
    const pair = pairs.find(([left]) => left === i)
    if (pair) {
      const [left, right, separator] = pair
      const stem = lines[left].endsWith('-') ? lines[left].slice(0, -1) : lines[left]
      result.push(stem + separator + lines[right])
      i = right
    } else result.push(lines[i])
  }
  return result
}
export const cantos = positions.map((position, index) => {
  const body = extracted.slice(position.index + position.length, positions[index + 1]?.index ?? extracted.length)
    .replace(/\s*F\s*I\s*M\s*\.\s*$/i, '').trim()
  const blocks = body.split(/\n\s*\n/).filter(Boolean)
  if (blocks.length !== expectedStanzas[index]) throw Error(`Canto ${index + 1}: ${blocks.length} stanzas, expected ${expectedStanzas[index]}`)
  const stanzas = blocks.map((block, stanzaIndex) => {
    const physicalLines = block.split('\n').map(line => line.trim())
    const lines = stanzaIndex === 0 ? reflowOpening(physicalLines, openingPairs[index]) : physicalLines
    if (lines.length !== 8 || lines.some(line => !line)) throw Error(`Canto ${index + 1}, stanza ${stanzaIndex + 1}: expected eight nonempty verse lines, got ${lines.length}`)
    return { number: stanzaIndex + 1, physicalLines, lines, text: lines.join('\n') }
  })
  return { number: index + 1, sourceHeading: position.heading, stanzas, text: stanzas.map(s => s.text).join('\n\n') }
})
export const retainedText = cantos.map(c => c.text).join('\n\n')
export const wordCount = text => (text.match(/\S+/gu) ?? []).length
export const stanzaCount = cantos.reduce((n, c) => n + c.stanzas.length, 0)
export const verseLineCount = stanzaCount * 8
if (stanzaCount !== 1102 || verseLineCount !== 8816) throw Error('Poem coverage differs from 1,102 ottavas and 8,816 verse lines')
