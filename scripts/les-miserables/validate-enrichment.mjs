import assert from 'node:assert/strict'
import { buildEnrichmentAudit, enrichedReview } from './build-enrichment-audit.mjs'
import { readerKey, knownPersonLabels } from './reader-identities.mjs'
import { characterIntroductions, characterNameChanges } from './character-ledger.mjs'
import { chapters } from './source-text.mjs'
import { reportedDeaths, unequalKnowledge } from './continuity-ledger.mjs'
import { cutOffset } from './validate-scene-review.mjs'
import { relationshipDefinitions, relationshipChanges } from './relationships.mjs'
import { reportedDispositions } from './reported-dispositions.mjs'
import { validateItems } from './validate-items.mjs'
import { actorPositionEvidence } from './actor-position-ledger.mjs'
import {validateUnlocatedPositions} from './unlocated-positions.mjs'

export function validateReportedDispositions(audit = buildEnrichmentAudit(), decisions = reportedDispositions) {
  for (const [id, decision] of decisions) {
    const scene = audit.scenes.find(row => row.scene === id)
    assert.ok(scene?.quotedReportedProse, `Stale reported-scene decision: ${id}`)
    assert.deepEqual([scene.chapter, scene.at, scene.title],
      [decision.chapter, decision.at, decision.title], `Reported decision moved to a different passage: ${id}`)
    assert.deepEqual([scene.start, scene.end], [decision.start, decision.end],
      `Reported decision has changed source boundaries: ${id}`)
    assert.equal(decision.disposition, 'keep-reported')
    assert.ok(decision.reason.trim(), `Missing source reason: ${id}`)
  }
  return decisions.size
}

export function validateReaderProjection(review = enrichedReview()) {
  for (const [chapter, rows] of review) for (const row of rows) {
    for (const [actor, location] of Object.entries(row.actorLocations ?? {})) {
      assert.ok(row.present.some(([key]) => key === actor), `Position requires a present actor: ${actor}`)
      assert.ok(actorPositionEvidence.some(source => source.chapter === chapter && source.at === row.at &&
        source.actor === actor && source.location === location), `Unreviewed actor position: ${actor}`)
    }
    const keys = [...row.present.map(([key]) => key), ...(row.mentioned ?? [])]
    for (const key of keys) {
      assert.equal(readerKey(chapter, row.at, key), key, `Concealed actor exposed in ${chapter}/${row.at}: ${key}`)
      assert.ok(characterIntroductions.has(key), `Missing reader introduction: ${key}`)
    }
    for (const reveal of row.identityReveals ?? []) {
      assert.ok(!knownPersonLabels.some(label => label.identity === reveal.identity), `Known label made into another character: ${reveal.identity}`)
    }
  }
  for (const [key, changes] of Object.entries(characterNameChanges)) {
    assert.ok(characterIntroductions.has(key))
    for (const change of changes) {
      assert.ok(review.get(change.chapter)?.some(row => row.at === change.at), `Name change needs a reviewed cut: ${key}`)
      assert.ok(chapters[change.chapter - 1].text.includes(change.name), `Name is absent from its source chapter: ${key}`)
    }
  }
  const audit = buildEnrichmentAudit(review)
  for (const source of actorPositionEvidence) {
    const scene = audit.scenes.find(row => row.chapter === source.chapter && row.at === source.at)
    assert.ok(scene?.cast.includes(source.actor), `Position requires a present actor: ${source.actor}`)
    assert.equal(scene.actorLocations[source.actor], source.location)
    const evidence = chapters[source.chapter - 1].paragraphs[source.evidenceParagraph]
    assert.ok(evidence.start >= scene.start && evidence.start < scene.end)
    assert.ok(source.reason.trim())
  }
  validateReportedDispositions(audit)
  validateItems(review)
  validateUnlocatedPositions(review)
  assert.equal(new Set([...characterIntroductions.values()].map(row => row.key)).size, characterIntroductions.size)
  for (const record of characterIntroductions.values()) {
    assert.ok(record.name.trim() && record.description.trim(), `Empty introduction: ${record.key}`)
    assert.ok(audit.characters.some(row => row.key === record.key), `Unused proposed character: ${record.key}`)
  }
  const requirePoint = (chapter, at) => {
    const rows = review.get(chapter)
    const index = rows?.findIndex(row => row.at === at) ?? -1
    assert.ok(index >= 0, `Missing continuity cut ${chapter}/${at}`)
    return { row: rows[index], start: cutOffset(chapters[chapter - 1], at),
      end: index + 1 < rows.length ? cutOffset(chapters[chapter - 1], rows[index + 1].at) : chapters[chapter - 1].end }
  }
  for (const fact of [...reportedDeaths, ...unequalKnowledge]) {
    const point = requirePoint(fact.chapter, fact.at)
    const evidence = chapters[fact.chapter - 1].paragraphs[fact.evidenceParagraph]
    assert.ok(evidence && evidence.start >= point.start && evidence.start < point.end, `Fact evidence outside segment: ${fact.key}`)
    if (reportedDeaths.includes(fact)) {
      assert.ok(characterIntroductions.has(fact.character))
      assert.ok(!point.row.present.some(([key]) => key === fact.character), `Absent death reported as physical cast: ${fact.key}`)
    }
    for (const learning of fact.learnings) {
      requirePoint(learning.chapter, learning.at)
      assert.ok(characterIntroductions.has(learning.character))
      assert.ok(learning.chapter >= fact.chapter, `Knowledge before fact: ${fact.key}`)
      assert.ok(learning.note.trim())
    }
  }
  for (const relation of relationshipDefinitions) {
    requirePoint(relation.chapter, relation.at)
    assert.ok(characterIntroductions.has(relation.a) && characterIntroductions.has(relation.b))
    assert.notEqual(relation.a, relation.b)
    assert.ok(relation.strength >= 0 && relation.strength <= 10)
  }
  for (const change of relationshipChanges) {
    const relation = relationshipDefinitions.find(row => row.key === change.key)
    assert.ok(relation, `Unknown relationship change: ${change.key}`)
    requirePoint(change.chapter, change.at)
    assert.ok(change.chapter >= relation.chapter)
    assert.ok(change.strength >= 0 && change.strength <= 10)
  }
  return { status: 'Reader identity projection validated; full presence, chronology, maps, art and app gates pending',
    characters: characterIntroductions.size, provisionalSnapshots: audit.counts.provisionalSnapshots, releaseComplete: false }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  console.log(JSON.stringify(validateReaderProjection(), null, 2))
}
