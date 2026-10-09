import fs from 'node:fs'
import { chapters, events, sceneTexts, worldId, timelineId, stamp } from './manuscript.mjs'
import { retainedText, wordCount } from './source-text.mjs'

const data = {
  version: 18, type: 'world', exportedAt: stamp.createdAt,
  world: { ...stamp, id: worldId, name: 'The Sign of the Four', description: 'A missing father, a string of pearls, and an invitation draw three Londoners into a difficult investigation.', coverImageId: null, theme: 'theme-mystery', readingMode: true, wordTarget: wordCount(retainedText) },
  timelines: [{ ...stamp, id: timelineId, name: 'The Sign of the Four', description: 'Watson’s account in source order.', color: '#514c42', dayOffset: 0 }],
  chapters, events, sceneTexts,
}
for (const key of ['mapLayers','locationMarkers','characters','characterSnapshots','items','itemPlacements','blobs','relationships','relationshipSnapshots','plotThreads','motifs','knowledgeFacts','knowledgeReveals','factions','factionMemberships','characterGoals','mapRoutes','loreCategories','lorePages','characterMovements','locationSnapshots','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships','continuitySuppressions','writingLogs','sceneRevisions']) data[key] = []
fs.writeFileSync(new URL('./manuscript-draft.pwk', import.meta.url), JSON.stringify(data, null, 2) + '\n')
console.log(`Manuscript draft: ${chapters.length} chapters, ${events.length} events/scenes, ${wordCount(retainedText)} words`)
