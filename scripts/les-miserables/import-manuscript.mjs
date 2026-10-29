import fs from 'node:fs'
import { chapters, countWords, retainedSha256, sourceEdition, sourceUrl } from './source-text.mjs'

const worldId = 'les-miserables-world', timelineId = 'les-miserables-narrative'
const now = Date.UTC(2026, 9, 24), stamp = { worldId, createdAt: now, updatedAt: now }
const world = {
  version: 18, type: 'world', exportedAt: now,
  world: { ...stamp, id: worldId, name: 'Les Misérables',
    description: 'In nineteenth-century France, a bishop’s household, provincial workshops, country inns, and crowded Paris streets expose the distance between the law and human need.',
    coverImageId: null, theme: 'theme-historical', readingMode: true,
  },
  timelines: [{ ...stamp, id: timelineId, name: 'Narrative order', description: 'Hugo’s five volumes in source order, including historical digressions and retrospective accounts.', color: '#776049', dayOffset: 0 }],
  chapters: [], events: [], sceneTexts: [],
}
for (const chapter of chapters) {
  const chapterId = `lesmis-chapter-${chapter.number}`, eventId = `lesmis-event-${chapter.number}-draft`
  world.chapters.push({ ...stamp, id: chapterId, timelineId, number: chapter.number, title: chapter.title,
    synopsis: '', notes: `Source volume ${chapter.volume}, book ${chapter.book}. Chapter container awaiting paragraph-level scene review.`, wordGoal: countWords(chapter.text),
  })
  world.events.push({ ...stamp, id: eventId, chapterId, timelineId, title: chapter.heading.replace(/\n/g, ' '),
    description: '', locationMarkerId: null, involvedCharacterIds: [], mentionedCharacterIds: [], involvedItemIds: [],
    threadIds: [], motifIds: [], sortOrder: 0, travelDays: 0, inWorldTime: chapter.number - 1,
    tension: 1, tags: [], structureBeat: null, status: 'draft', povCharacterId: null, isFlashback: false,
  })
  world.sceneTexts.push({ ...stamp, id: `lesmis-text-${chapter.number}-draft`, eventId, text: chapter.text, wordCount: countWords(chapter.text) })
}
for (const key of ['mapLayers', 'locationMarkers', 'characters', 'characterSnapshots', 'items', 'itemPlacements', 'blobs', 'relationships', 'relationshipSnapshots', 'plotThreads', 'motifs', 'knowledgeFacts', 'knowledgeReveals', 'factions', 'factionMemberships', 'characterGoals', 'mapRoutes', 'loreCategories', 'lorePages', 'characterMovements', 'locationSnapshots', 'itemSnapshots', 'travelModes', 'timelineRelationships', 'crossTimelineArtifacts', 'mapRegions', 'mapRegionSnapshots', 'mapAnnotations', 'factionRelationships', 'continuitySuppressions', 'writingLogs', 'sceneRevisions']) world[key] = []
fs.writeFileSync(new URL('./manuscript-draft.pwk', import.meta.url), `${JSON.stringify(world, null, 2)}\n`)
console.log(JSON.stringify({ stage: 'complete manuscript import; scene/world review pending', chapters: chapters.length, words: countWords(world.sceneTexts.map(row => row.text).join('')), retainedSha256, sourceEdition, sourceUrl }, null, 2))
