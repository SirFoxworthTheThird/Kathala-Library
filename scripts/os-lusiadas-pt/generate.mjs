import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cantos as portugueseCantos, wordCount as portugueseWordCount } from '../os-lusiadas/source-text.mjs'
import { cuts } from '../os-lusiadas/scene-cuts.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const repo = path.resolve(here, '../..')
const originalPath = path.join(repo, 'library/os-lusiadas.pwk')
const outputPath = path.join(repo, 'library/os-lusiadas-pt.pwk')
const original = JSON.parse(fs.readFileSync(originalPath, 'utf8'))
const translations = JSON.parse(fs.readFileSync(path.join(here, 'translations.json'), 'utf8'))
const overrides = JSON.parse(fs.readFileSync(path.join(here, 'overrides.json'), 'utf8'))
const reviewedPhrases = JSON.parse(fs.readFileSync(path.join(here, 'reviewed-phrases.json'), 'utf8'))
const result = structuredClone(original)

for (const [key, entry] of Object.entries(translations)) {
  const [collection, id, field] = key.split('/')
  const record = collection === 'world' ? result.world : result[collection]?.find(row => row.id === id)
  if (!record) throw Error(`Missing source record ${key}`)
  if (record[field] !== entry.source) throw Error(`Source drift at ${key}`)
  let translated = overrides[key] ?? reviewedPhrases[entry.source] ?? entry.pt
  // Keep recurring historical names consistent across independent passages.
  translated = translated.replace(/\bJohn\b/g, 'João').replace(/\bCalicute\b/g, 'Calecute')
    .replace(/\bCalicut\b/g, 'Calecute').replace(/\bCalecuta\b/g, 'Calecute')
    .replace(/\bMombasa\b/g, 'Mombaça').replace(/\bFerdinand\b/g, 'Fernando')
    .replace(/\bempresa\b/g, 'companhia').replace(/\bfactores\b/g, 'feitores')
    .replace(/\bfatores\b/g, 'feitores').replace(/\bfator\b/g, 'feitor')
    .replace(/\bbanners\b/g, 'estandartes').replace(/\bconta dinástica\b/g, 'relato dinástico')
    .replace(/\bconta de Gama\b/g, 'relato de Gama').replace(/\bpiloto indiano\b/g, 'piloto para a Índia')
    .replace(/\bendereço\b/g, 'discurso').replace(/\breclamação\b/g, 'queixa')
    .replace(/\blápide de pedra\b/g, 'padrão de pedra')
    .replace(/\bTethys\b/g, 'Tétis').replace(/\bquadra\b/g, 'corte')
    .replace(/\bvêem\b/g, 'veem')
  if (!translated || /<<<SEG_\d+>>>/.test(translated)) throw Error(`Invalid translation at ${key}`)
  record[field] = translated
}
for (const key of Object.keys(overrides)) if (!(key in translations)) throw Error(`Orphan override ${key}`)
for (const phrase of Object.keys(reviewedPhrases)) if (!Object.values(translations).some(row => row.source === phrase)) throw Error(`Unused reviewed phrase: ${phrase}`)

const oldIds = new Set()
function gather(value) {
  if (Array.isArray(value)) return value.forEach(gather)
  if (!value || typeof value !== 'object') return
  if (typeof value.id === 'string') oldIds.add(value.id)
  for (const child of Object.values(value)) gather(child)
}
gather(original)
const newId = value => value.replace(/^os-lusiadas-/, 'os-lusiadas-pt-')
function localizeIds(value) {
  if (Array.isArray(value)) return value.map(localizeIds)
  if (typeof value === 'string') return oldIds.has(value) ? newId(value) : value
  if (!value || typeof value !== 'object') return value
  for (const [key, child] of Object.entries(value)) {
    if (typeof child === 'string') {
      if (oldIds.has(child)) value[key] = newId(child)
      else if (key === 'tags' && child.startsWith('offstage-death:')) value[key] = child.replace('os-lusiadas-', 'os-lusiadas-pt-')
    } else value[key] = localizeIds(child)
  }
  return value
}
localizeIds(result)
// Nested string tags are not IDs, but the offstage-death gate embeds one.
for (const fact of result.knowledgeFacts) fact.tags = fact.tags.map(tag => tag.replace('offstage-death:os-lusiadas-', 'offstage-death:os-lusiadas-pt-'))

result.world.name = 'Os Lusíadas — edição em português'
for (const character of result.characters) {
  for (const change of character.nameChanges ?? []) {
    if (change.name === 'Amphitrite') change.name = 'Anfitrite'
  }
}
result.world.calendar.months.forEach((month, index) => {
  month.name = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'][index]
})
for (const blob of result.blobs) {
  if (blob.url.startsWith('library/os-lusiadas/maps/')) blob.url = blob.url.replace('library/os-lusiadas/maps/', 'library/os-lusiadas-pt/maps/')
}
let portugueseScene = 0
for (let cantoIndex = 0; cantoIndex < portugueseCantos.length; cantoIndex++) {
  const canto = portugueseCantos[cantoIndex]
  const chapter = result.chapters[cantoIndex]
  chapter.title = canto.sourceHeading.replace('\n', ' ')
  chapter.notes = 'Título original do canto; grafia de 1572 conservada.'
  chapter.wordGoal = portugueseWordCount(canto.stanzas.map(stanza => stanza.text).join('\n\n'))
  for (let index = 0; index < cuts[cantoIndex].length; index++) {
    const start = cuts[cantoIndex][index][0]
    const end = (cuts[cantoIndex][index + 1]?.[0] ?? canto.stanzas.length + 1) - 1
    const scene = result.sceneTexts[portugueseScene++]
    scene.text = canto.stanzas.slice(start - 1, end).map(stanza => stanza.text).join('\n\n')
    scene.wordCount = portugueseWordCount(scene.text)
  }
}
if (portugueseScene !== result.sceneTexts.length) throw Error('Portuguese scene alignment drift')
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2) + '\n')
console.log(`Generated ${path.relative(repo, outputPath)}: ${result.chapters.length} cantos, ${result.events.length} scenes, ${result.sceneTexts.length} verse passages`)
