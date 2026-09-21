import fs from 'node:fs'
import { sourceSections, narrativeText, normalize, countWords } from './source-text.mjs'

// First-stage import: the complete book enters scene drafts before semantic modeling.
const worldId = 'a-princess-of-mars-world', timelineId = 'mars-timeline', now = Date.UTC(2026, 8, 21)
const stamp = { worldId, createdAt: now, updatedAt: now }
const pwk = {
  version: 18, type: 'world', exportedAt: now,
  world: { ...stamp, id: worldId, name: 'A Princess of Mars', description: 'A Virginia soldier wakes beneath the twin moons of a dying world, where desert nations, airborne cities, and unfamiliar customs reshape every assumption he carries from Earth.', theme: 'theme-scifi', readingMode: true, coverImageId: null, wordTarget: countWords(narrativeText) },
  timelines: [{ ...stamp, id: timelineId, name: 'John Carter’s Account', description: 'The foreword and twenty-eight chapters in their original reading order.', color: '#9a553e', dayOffset: 0 }],
  chapters: sourceSections.map(s => ({ ...stamp, id: `mars-chapter-${s.number}`, timelineId, number: s.number, title: s.title, synopsis: '', notes: `Original source heading: ${s.sourceHeading}`, wordGoal: countWords(s.text) })),
  events: sourceSections.map(s => ({ ...stamp, id: `mars-event-${s.number}-1`, chapterId: `mars-chapter-${s.number}`, timelineId, title: s.title, description: '', sortOrder: s.number - 1, locationMarkerId: null, involvedCharacterIds: [], mentionedCharacterIds: [], involvedItemIds: [], threadIds: [], motifIds: [], tension: 1, travelDays: 0, inWorldTime: s.number - 1, tags: [], status: 'draft', povCharacterId: null, isFlashback: false })),
  sceneTexts: sourceSections.map(s => ({ ...stamp, id: `mars-scene-${s.number}-1`, eventId: `mars-event-${s.number}-1`, text: s.text, wordCount: countWords(s.text) })),
}
for (const key of ['mapLayers','locationMarkers','characters','items','characterSnapshots','itemPlacements','blobs','relationships','relationshipSnapshots','plotThreads','motifs','loreCategories','lorePages','knowledgeFacts','knowledgeReveals','factions','factionMemberships','characterGoals','mapRoutes','characterMovements','locationSnapshots','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships','continuitySuppressions','writingLogs','sceneRevisions']) pwk[key] = []
if (normalize(pwk.sceneTexts.map(s => s.text).join('\n\n')) !== normalize(narrativeText)) throw Error('Manuscript reconstruction failed')
fs.writeFileSync(new URL('../../library/a-princess-of-mars.pwk', import.meta.url), JSON.stringify(pwk, null, 2) + '\n')
console.log(`Imported entire source: ${pwk.chapters.length} chapters, ${pwk.sceneTexts.length} scene drafts, ${countWords(narrativeText)} whitespace-delimited words; reconstruction PASS`)
