import assert from 'node:assert/strict'
import { buildEnrichmentAudit, enrichedReview } from './build-enrichment-audit.mjs'
import { itemDefinitions, itemDiscoveries } from './item-ledger.mjs'
import { canonicalItemKey, itemIdentityEvidence } from './item-identities.mjs'
import { chapters } from './source-text.mjs'
import { cutOffset } from './validate-scene-review.mjs'
import { itemStateChanges } from './item-state-ledger.mjs'
import { characterIntroductions } from './character-ledger.mjs'

export function validateItemStates(review = enrichedReview(), changes = itemStateChanges) {
  const locations = new Set(buildEnrichmentAudit(review).locations.map(place => place.key))
  const keys = new Set(), inventories = new Map()
  for (const change of changes) {
    assert.ok(!keys.has(change.key), `Duplicate object change: ${change.key}`)
    keys.add(change.key)
    assert.ok(itemDefinitions.has(change.item), `Unknown changed object: ${change.item}`)
    assert.ok(['held','placed','custody-report','ownership-report'].includes(change.kind))
    assert.ok(change.note.trim())
    const chapter = chapters[change.chapter - 1], rows = review.get(change.chapter)
    const index = rows?.findIndex(row => row.at === change.at) ?? -1
    assert.ok(index >= 0, `Object change needs a reviewed cut: ${change.key}`)
    const row = rows[index], start = cutOffset(chapter, row.at)
    const end = index + 1 < rows.length ? cutOffset(chapter, rows[index + 1].at) : chapter.end
    const evidence = chapter.paragraphs[change.evidenceParagraph]
    assert.ok(evidence && evidence.start >= start && evidence.start < end, `Object evidence outside passage: ${change.key}`)
    assert.ok(row.items?.includes(change.item), `Changed object missing from scene references: ${change.key}`)
    if (change.location) assert.ok(locations.has(change.location), `Unknown changed-object location: ${change.key}`)
    if (change.containerItem) assert.ok(itemDefinitions.has(change.containerItem))
    for (const person of [change.holder,change.custodian,change.owner].filter(Boolean)) assert.ok(characterIntroductions.has(person))
    if (change.kind === 'held') {
      assert.ok(row.present.some(([key]) => key === change.holder), `Absent inventory holder: ${change.key}`)
      const key = `${change.chapter}/${change.at}/${change.item}`
      const holder = inventories.get(key)
      assert.ok(!holder || holder === change.holder || itemDefinitions.get(change.item).isCollective, `Object has two holders: ${change.item}`)
      inventories.set(key, change.holder)
    } else assert.ok(!change.holder, `Report or placement cannot create inventory: ${change.key}`)
  }
  return { sourceConfirmedChanges: changes.length, releaseComplete:false }
}

export function validateItems(review = enrichedReview(), definitions = itemDefinitions) {
  validateItemStates(review)
  const audit = buildEnrichmentAudit(review)
  for (const item of audit.items) {
    assert.equal(canonicalItemKey(item.key), item.key, `Unresolved item alias: ${item.key}`)
    const definition = definitions.get(item.key)
    assert.ok(definition, `Missing item definition: ${item.key}`)
    assert.ok(definition.name.trim() && definition.description.trim(), `Empty item definition: ${item.key}`)
    assert.ok(['artifact', 'book', 'document'].includes(definition.iconType))
    assert.equal(typeof definition.isCollective, 'boolean')
  }
  for (const key of definitions.keys()) {
    assert.ok(audit.items.some(item => item.key === key), `Unused item definition: ${key}`)
  }
  for (const evidence of itemIdentityEvidence) {
    assert.ok(chapters[evidence.chapter - 1].paragraphs[evidence.evidenceParagraph])
    assert.ok(definitions.has(evidence.canonical))
    for (const key of evidence.keys) assert.equal(canonicalItemKey(key), evidence.canonical)
  }
  for (const fact of itemDiscoveries) {
    assert.ok(definitions.has(fact.item), `Unknown discovery object: ${fact.item}`)
    const chapter = chapters[fact.chapter - 1], rows = review.get(fact.chapter)
    const index = rows?.findIndex(row => row.at === fact.at) ?? -1
    assert.ok(index >= 0, `Discovery needs a reviewed cut: ${fact.key}`)
    const start = cutOffset(chapter, fact.at)
    const end = index + 1 < rows.length ? cutOffset(chapter, rows[index + 1].at) : chapter.end
    const evidence = chapter.paragraphs[fact.evidenceParagraph]
    assert.ok(evidence && evidence.start >= start && evidence.start < end, `Discovery outside passage: ${fact.key}`)
  }
  return { objects: definitions.size, discoveries: itemDiscoveries.length, sourceConfirmedStateChanges: itemStateChanges.length,
    status: 'Definitions and source-explicit identity projection checked; full custody, condition and art gates remain open',
    releaseComplete: false }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  console.log(JSON.stringify(validateItems(), null, 2))
}
