import fs from 'node:fs'
import assert from 'node:assert/strict'
import { chapters, retained, retainedSha256 } from './source-text.mjs'
import { reviewedChapters } from './reviewed-scenes.mjs'
import { cutOffset, validateSceneReview } from './validate-scene-review.mjs'
import { readerReview, knownPersonLabels } from './reader-identities.mjs'
import { amendPresence } from './presence-amendments.mjs'
import { projectItemIdentities } from './item-identities.mjs'
import { projectActorPositions } from './actor-position-ledger.mjs'
import { projectGorbeauPresence } from './gorbeau-presence.mjs'
import { projectArrasPresence } from './arras-court-presence.mjs'

// An inventory for a source audit, not a name-matching cast generator. In
// particular, reported prose and dialogue are never promoted to physical cast.
export function enrichedReview(review = reviewedChapters) {
  return readerReview(new Map([...review].map(([chapter, rows]) => [chapter,
    rows.map(row => projectActorPositions(chapter, projectItemIdentities(projectGorbeauPresence(chapter, projectArrasPresence(chapter, amendPresence(chapter, row)))))),
  ])))
}

export function buildEnrichmentAudit(review = enrichedReview()) {
  const coverage = validateSceneReview(review)
  assert.equal(coverage.remainingChapters, 0, 'Finish boundary review before enrichment')
  const characters = new Map(), locations = new Map(), items = new Map()
  const scenes = [], reveals = [], stateChanges = []
  const add = (map, key, occurrence) => {
    assert.ok(key)
    if (!map.has(key)) map.set(key, { key, occurrences: [] })
    map.get(key).occurrences.push(occurrence)
  }
  for (const chapter of chapters) {
    const rows = review.get(chapter.number)
    for (const [index, row] of rows.entries()) {
      const scene = `${chapter.number}-${index + 1}`
      const start = cutOffset(chapter, row.at)
      const end = index + 1 < rows.length ? cutOffset(chapter, rows[index + 1].at) : chapter.end
      const base = { scene, chapter: chapter.number, at: row.at, title: row.title, kind: row.kind }
      const text = retained.slice(start, end)
      for (const [key, status] of row.present) {
        const location = row.actorLocations && Object.hasOwn(row.actorLocations,key) ? row.actorLocations[key] : row.location
        add(characters, key, { ...base, use: 'present', status, location })
        if (location && location !== row.location) add(locations, location, { ...base, actor:key })
      }
      for (const key of row.mentioned ?? []) add(characters, key, { ...base, use: 'mentioned' })
      if (row.location) add(locations, row.location, base)
      for (const key of row.items ?? []) add(items, key, base)
      for (const reveal of row.identityReveals ?? []) {
        reveals.push({ ...base, ...reveal, evidence: chapter.paragraphs[reveal.evidenceParagraph].text })
        for (const key of [reveal.identity, reveal.character]) {
          add(characters, key, { ...base, use: 'identity-evidence', audience: reveal.audience })
        }
      }
      for (const change of row.stateChanges ?? []) {
        stateChanges.push({ ...base, ...change, evidence: chapter.paragraphs[change.evidenceParagraph].text })
      }
      scenes.push({ ...base, location: row.location, cast: row.present.map(([key]) => key),
        actorLocations: row.actorLocations ?? {},
        ...(row.unidentifiedParticipants ? {unidentifiedParticipants:row.unidentifiedParticipants} : {}),
        mentioned: row.mentioned ?? [], items: row.items ?? [],
        start, end, opening: text.trim().slice(0, 300), closing: text.trim().slice(-300),
        // This is only a queue for human source review. A quotation can belong
        // to a report, a hypothetical speech or an embedded historical source.
        quotedReportedProse: row.kind === 'reported' && /[“”]/u.test(text),
        reason: row.reason,
      })
    }
  }
  const entities = map => [...map.values()].sort((a, b) => a.key.localeCompare(b.key, 'en'))
  const characterRows = entities(characters)
  return {
    status: 'Inventory only; entity, presence, chronology and visual release audits remain open',
    retainedSha256, ...coverage, releaseComplete: false,
    counts: { characterKeys: characters.size, locationKeys: locations.size, itemKeys: items.size,
      provisionalSnapshots: scenes.reduce((sum, row) => sum + row.cast.length, 0),
      mentionedOnlyKeys: characterRows.filter(row => !row.occurrences.some(use => use.use === 'present')).length,
      reportedWithQuotes: scenes.filter(row => row.quotedReportedProse).length,
      identityEvidence: reveals.length, directStateChanges: stateChanges.length },
    characters: characterRows, locations: entities(locations), items: entities(items),
    knownPersonLabels, reveals, stateChanges, scenes,
  }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  const audit = buildEnrichmentAudit()
  fs.writeFileSync(new URL('./ENRICHMENT_AUDIT.json', import.meta.url), `${JSON.stringify(audit, null, 2)}\n`)
  console.log(JSON.stringify({ status: audit.status, ...audit.counts }, null, 2))
}
