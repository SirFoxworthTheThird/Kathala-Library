import fs from 'node:fs'
import { sourceSections, narrativeText, normalize, countWords } from './source-text.mjs'

const worldId = 'kidnapped-world', timelineId = 'kidnapped-timeline', now = Date.UTC(2026, 8, 21)
const stamp = { worldId, createdAt: now, updatedAt: now }
const pwk = {
  version: 18, type: 'world', exportedAt: now,
  world: { ...stamp, id: worldId, name: 'Kidnapped', description: 'In Scotland after the Jacobite rising, a newly orphaned Lowland youth sets out to claim his place in a divided family and enters a country of dangerous seas, Highland loyalties, and contested law.', theme: 'theme-historical', readingMode: true, coverImageId: null, wordTarget: countWords(narrativeText) },
  timelines: [{ ...stamp, id: timelineId, name: 'David Balfour’s Memoir', description: 'The dedication and thirty chapters in their original reading order.', color: '#5d704f', dayOffset: 0 }],
  chapters: sourceSections.map(s => ({ ...stamp, id: `kid-chapter-${s.number}`, timelineId, number: s.number, title: s.title, synopsis: '', notes: `Original source heading: ${s.sourceHeading}`, wordGoal: countWords(s.text) })),
  events: sourceSections.map(s => ({ ...stamp, id: `kid-event-${s.number}-1`, chapterId: `kid-chapter-${s.number}`, timelineId, title: s.title, description: '', sortOrder: s.number - 1, locationMarkerId: null, involvedCharacterIds: [], mentionedCharacterIds: [], involvedItemIds: [], threadIds: [], motifIds: [], tension: 1, travelDays: 0, inWorldTime: s.number - 1, tags: [], status: 'draft', povCharacterId: null, isFlashback: false })),
  sceneTexts: sourceSections.map(s => ({ ...stamp, id: `kid-scene-${s.number}-1`, eventId: `kid-event-${s.number}-1`, text: s.text, wordCount: countWords(s.text) })),
}
for (const key of ['mapLayers','locationMarkers','characters','items','characterSnapshots','itemPlacements','blobs','relationships','relationshipSnapshots','plotThreads','motifs','loreCategories','lorePages','knowledgeFacts','knowledgeReveals','factions','factionMemberships','characterGoals','mapRoutes','characterMovements','locationSnapshots','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships','continuitySuppressions','writingLogs','sceneRevisions']) pwk[key] = []
if (normalize(pwk.sceneTexts.map(s => s.text).join('\n\n')) !== normalize(narrativeText)) throw Error('Manuscript reconstruction failed')
fs.writeFileSync(new URL('../../library/kidnapped.pwk', import.meta.url), JSON.stringify(pwk, null, 2) + '\n')
console.log(`Imported entire retained source: ${pwk.chapters.length} chapters, ${pwk.sceneTexts.length} scene drafts, ${countWords(narrativeText)} whitespace-delimited words; reconstruction PASS`)

