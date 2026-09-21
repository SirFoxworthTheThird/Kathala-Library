import fs from 'node:fs'
import { sourceSections, narrativeText, normalize, countWords } from './source-text.mjs'

// First-stage import only. The complete source enters scene drafts before semantic modeling.
// This uncommitted scaffold is subsequently replaced by generate.mjs; it is never a release.
const worldId = 'thirty-nine-steps-world', timelineId = 'steps-timeline', now = Date.UTC(2026, 8, 15)
const stamp = { worldId, createdAt: now, updatedAt: now }
const pwk = {
  version: 18, type: 'world', exportedAt: now,
  world: { ...stamp, id: worldId, name: 'The Thirty-Nine Steps', description: 'Richard Hannay flees London into the Scottish hills with a murdered man’s notebook, trying to uncover a conspiracy before its appointed day.', theme: 'theme-thriller', readingMode: true, coverImageId: null, wordTarget: countWords(narrativeText) },
  timelines: [{ ...stamp, id: timelineId, name: 'Richard Hannay’s Account', description: 'The ten chapters in their original reading order.', color: '#776447', dayOffset: 0 }],
  chapters: sourceSections.map(s => ({ ...stamp, id: `steps-chapter-${s.number}`, timelineId, number: s.number, title: s.title, synopsis: '', notes: `Original heading: ${s.sourceHeading}`, wordGoal: countWords(s.text) })),
  events: sourceSections.map(s => ({ ...stamp, id: `steps-event-${s.number}-1`, chapterId: `steps-chapter-${s.number}`, timelineId, title: s.title, description: '', sortOrder: s.number - 1, locationMarkerId: null, involvedCharacterIds: [], involvedItemIds: [], threadIds: [], motifIds: [], tension: 1, travelDays: 0, inWorldTime: null, tags: [], status: 'draft' })),
  sceneTexts: sourceSections.map(s => ({ ...stamp, id: `steps-scene-${s.number}-1`, eventId: `steps-event-${s.number}-1`, text: s.text, wordCount: countWords(s.text) })),
}
for (const key of ['mapLayers','locationMarkers','characters','items','characterSnapshots','itemPlacements','blobs','relationships','relationshipSnapshots','plotThreads','motifs','loreCategories','lorePages','knowledgeFacts','knowledgeReveals','factions','factionMemberships','characterGoals','mapRoutes','characterMovements','locationSnapshots','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships','continuitySuppressions','writingLogs','sceneRevisions']) pwk[key] = []
if (normalize(pwk.sceneTexts.map(s => s.text).join('\n\n')) !== normalize(narrativeText)) throw Error('Manuscript reconstruction failed')
fs.writeFileSync(new URL('../../library/the-thirty-nine-steps.pwk', import.meta.url), JSON.stringify(pwk, null, 2) + '\n')
console.log(`Imported entire source: ${pwk.chapters.length} chapters, ${pwk.sceneTexts.length} scene drafts, ${countWords(narrativeText)} whitespace-delimited words; reconstruction PASS`)
