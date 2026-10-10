import fs from 'node:fs'
import { cantos, retainedText, wordCount } from './source-text.mjs'
import { cuts } from './scene-cuts.mjs'

// First gate only: complete poem in stanza-boundary scene drafts before event modeling.
// The cuts are editorial candidates until the separate presence and hand-off review passes.
const worldId = 'os-lusiadas-world'
const timelineId = 'os-lusiadas-poem-order'
const stamp = { worldId, createdAt: Date.UTC(2026, 9, 9), updatedAt: Date.UTC(2026, 9, 9) }
const chapters = cantos.map(canto => ({
  ...stamp, id: `os-lusiadas-canto-${canto.number}`, timelineId,
  number: canto.number, title: canto.sourceHeading.replace(/\n/g, ' '),
  synopsis: '', notes: 'Original canto heading; 1572 spelling retained.',
  wordGoal: wordCount(canto.text),
}))
const events = [], sceneTexts = []
for (const canto of cantos) {
  const entries = cuts[canto.number - 1] ?? [[1, `Canto ${canto.number} — complete text`, 'Manuscript import pending reviewed event cuts.', 'unreviewed', 'Provisional whole-canto import.']]
  if (entries[0][0] !== 1 || entries.some(([start], index) => start < 1 || start > canto.stanzas.length || (index && start <= entries[index - 1][0]))) throw Error(`Invalid cuts for canto ${canto.number}`)
  for (let index = 0; index < entries.length; index++) {
    const [start, title, description] = entries[index]
    const end = (entries[index + 1]?.[0] ?? canto.stanzas.length + 1) - 1
    const eventId = `os-lusiadas-import-${canto.number}-${index + 1}`
    const text = canto.stanzas.slice(start - 1, end).map(stanza => stanza.text).join('\n\n')
    events.push({
      ...stamp, id: eventId, chapterId: `os-lusiadas-canto-${canto.number}`, timelineId,
      title, description, locationMarkerId: null, involvedCharacterIds: [], mentionedCharacterIds: [], involvedItemIds: [],
      threadIds: [], motifIds: [], sortOrder: events.length, travelDays: 0, inWorldTime: 0,
      tension: 1, tags: [], structureBeat: null, status: 'draft', povCharacterId: null, isFlashback: false,
    })
    sceneTexts.push({ ...stamp, id: `os-lusiadas-import-text-${canto.number}-${index + 1}`, eventId, text, wordCount: wordCount(text) })
  }
}
if (sceneTexts.map(s => s.text).join('\n\n') !== retainedText) throw Error('Imported manuscript does not reconstruct the retained poem')
const data = {
  version: 18, type: 'world', exportedAt: stamp.createdAt,
  world: { ...stamp, id: worldId, name: 'Os Lusíadas',
    description: 'Camões sings the voyage to India alongside Portuguese history and classical myth.',
    coverImageId: null, theme: 'theme-historical', readingMode: true, wordTarget: wordCount(retainedText) },
  timelines: [{ ...stamp, id: timelineId, name: 'Canto order', description: 'The poem as printed, before narrative-frame and historical event modeling.', color: '#31586b', dayOffset: 0 }],
  chapters, events, sceneTexts,
}
for (const key of ['mapLayers','locationMarkers','characters','characterSnapshots','items','itemPlacements','blobs','relationships','relationshipSnapshots','plotThreads','motifs','knowledgeFacts','knowledgeReveals','factions','factionMemberships','characterGoals','mapRoutes','loreCategories','lorePages','characterMovements','locationSnapshots','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships','continuitySuppressions','writingLogs','sceneRevisions']) data[key] = []
fs.writeFileSync(new URL('./manuscript-draft.pwk', import.meta.url), JSON.stringify(data, null, 2) + '\n')
console.log(`Imported ${cantos.length} cantos in ${events.length} scenes, ${cantos.reduce((n,c)=>n+c.stanzas.length,0)} stanzas, ${cantos.reduce((n,c)=>n+c.stanzas.length*8,0)} verse lines, ${wordCount(retainedText)} whitespace-delimited words`)
