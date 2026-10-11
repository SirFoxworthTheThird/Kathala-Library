import fs from 'node:fs'
import crypto from 'node:crypto'
import { chapters as sourceChapters, retainedText, wordCount } from './source-text.mjs'
import candidateStarts from './boundary-candidates.json' with { type: 'json' }
import { eventTitles } from './event-titles.mjs'
import { chapterSynopses } from './chapter-model.mjs'

// Source-import gate only. Whole-chapter scenes preserve every paragraph before
// reviewed paragraph-boundary cuts and all worldbuilding are added.
const worldId = 'anne-of-green-gables-world'
const timelineId = 'anne-of-green-gables-story'
const stamp = { worldId, createdAt: Date.UTC(2026, 9, 11), updatedAt: Date.UTC(2026, 9, 11) }
const chapters = sourceChapters.map(source => ({
  ...stamp,
  id: `anne-of-green-gables-chapter-${source.number}`,
  timelineId,
  number: source.number,
  title: source.title,
  synopsis: chapterSynopses[source.number - 1],
  notes: 'Original Project Gutenberg chapter heading retained.',
  wordGoal: wordCount(source.body),
}))
const events = []
const sceneTexts = []
for (const source of sourceChapters) {
  const starts = candidateStarts[source.number]
  const titles = eventTitles.get(source.number)
  if (!starts || starts[0] !== 1 || starts.some((start, index) => start < 1 || start > source.paragraphs.length || index && start <= starts[index - 1])) throw Error(`Invalid provisional cuts in chapter ${source.number}`)
  if (!titles || titles.length !== starts.length) throw Error(`Missing authored event titles in chapter ${source.number}`)
  for (let index = 0; index < starts.length; index++) {
    const eventId = `anne-of-green-gables-import-${source.number}-${index + 1}`
    const text = source.paragraphs.slice(starts[index] - 1, (starts[index + 1] ?? source.paragraphs.length + 1) - 1).join('\n\n')
    events.push({
      ...stamp, id: eventId, chapterId: `anne-of-green-gables-chapter-${source.number}`, timelineId,
      title: titles[index],
      description: 'Paragraph-boundary manuscript segment awaiting narrative review.',
      locationMarkerId: null, involvedCharacterIds: [], mentionedCharacterIds: [], involvedItemIds: [],
      threadIds: [], motifIds: [], sortOrder: events.length, travelDays: 0, inWorldTime: 0,
      tension: 1, tags: [], structureBeat: null, status: 'draft', povCharacterId: null, isFlashback: false,
    })
    sceneTexts.push({ ...stamp, id: `anne-of-green-gables-import-text-${source.number}-${index + 1}`, eventId, text, wordCount: wordCount(text) })
  }
}
const data = {
  version: 18,
  type: 'world',
  exportedAt: stamp.createdAt,
  world: {
    ...stamp,
    id: worldId,
    name: 'Anne of Green Gables',
    description: 'An imaginative orphan finds a home, friendship, and a widening future in Avonlea.',
    coverImageId: null,
    theme: 'theme-historical',
    readingMode: true,
    wordTarget: sceneTexts.reduce((sum, scene) => sum + scene.wordCount, 0),
  },
  timelines: [{
    ...stamp,
    id: timelineId,
    name: 'Anne’s Avonlea years',
    description: 'The novel’s main chronology from Anne’s arrival through her first decisions after Queen’s.',
    color: '#56734f',
    dayOffset: 0,
  }],
  chapters,
  events,
  sceneTexts,
}
for (const key of ['mapLayers','locationMarkers','characters','characterSnapshots','items','itemPlacements','blobs','relationships','relationshipSnapshots','plotThreads','motifs','knowledgeFacts','knowledgeReveals','factions','factionMemberships','characterGoals','mapRoutes','loreCategories','lorePages','characterMovements','locationSnapshots','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships','continuitySuppressions','writingLogs','sceneRevisions']) data[key] = []
fs.writeFileSync(new URL('./manuscript-draft.pwk', import.meta.url), JSON.stringify(data, null, 2) + '\n')
const bodyText = sourceChapters.map(chapter => chapter.body).join('\n\n')
console.log(`Imported ${chapters.length} chapters, ${sceneTexts.length} provisional scenes, ${wordCount(bodyText)} narrative words; retained SHA-256 ${crypto.createHash('sha256').update(retainedText).digest('hex')}`)
