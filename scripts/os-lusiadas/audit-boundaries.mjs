import fs from 'node:fs'
import { cantos } from './source-text.mjs'
import { cuts } from './scene-cuts.mjs'

const lines = [
  '# Scene boundary review — Os Lusíadas',
  '',
  'Each scene covers complete, consecutive stanzas. The entries below identify the two stanzas adjoining every cut and the editorial reason. Verse excerpts are from the retained 1572 transcription. An entry does not establish character presence or calendar placement; those are separate gates.',
  '',
]
for (const canto of cantos) {
  const entries = cuts[canto.number - 1]
  if (!entries || entries[0][0] !== 1) throw Error(`Unreviewed canto ${canto.number}`)
  lines.push(`## Canto ${canto.number}`, '')
  lines.push('| Scene | Stanzas | Frame | Adjacent source at entry | Boundary decision |', '|---|---:|---|---|---|')
  for (let index = 0; index < entries.length; index++) {
    const [start, title, , frame, reason] = entries[index]
    const end = (entries[index + 1]?.[0] ?? canto.stanzas.length + 1) - 1
    if (!frame || !reason || end < start) throw Error(`Incomplete cut at ${canto.number}:${start}`)
    const before = start === 1 ? 'Canto opening' : `${start - 1}: ${canto.stanzas[start - 2].lines.at(-1)}`
    const after = `${start}: ${canto.stanzas[start - 1].lines[0]}`
    const clean = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ')
    lines.push(`| ${clean(title)} | ${start}–${end} | ${clean(frame)} | ${clean(before)} / ${clean(after)} | ${clean(reason)} |`)
  }
  lines.push('')
}
fs.writeFileSync(new URL('./BOUNDARY_REVIEW.md', import.meta.url), lines.join('\n') + '\n')
console.log(`Audited ${cuts.flat().length} scene starts and ${cuts.flat().length - cantos.length} internal boundaries`)
