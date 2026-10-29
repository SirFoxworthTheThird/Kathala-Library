import assert from 'node:assert/strict'
import { enrichedReview } from './build-enrichment-audit.mjs'

// The application accepts one-level revealedAs links. An intermediate
// identification (ragged girl -> Jondrette daughter -> Éponine) therefore needs
// an immediate fact at the first disclosure, then direct roster links to the
// final known identity only when the complete chain has been disclosed.
export function buildIdentityPlan(review = enrichedReview()) {
  const facts = [], edges = new Map(), positions = new Map()
  let order = 0
  for (const [chapter, rows] of review) for (const [index, row] of rows.entries()) {
    const event = `${chapter}-${index + 1}`
    positions.set(event, order++)
    for (const reveal of row.identityReveals ?? []) {
      if (reveal.audience !== 'reader') continue
      const fact = { event, chapter, at: row.at, ...reveal }
      facts.push(fact)
      const prior = edges.get(reveal.identity)
      assert.ok(!prior || prior.character === reveal.character, `Conflicting identity: ${reveal.identity}`)
      if (!prior) edges.set(reveal.identity, fact)
    }
  }
  const links = [...edges.keys()].map(identity => {
    let edge = edges.get(identity), character = edge.character, event = edge.event
    const seen = new Set([identity])
    while (edges.has(character)) {
      assert.ok(!seen.has(character), `Identity cycle: ${identity}`)
      seen.add(character)
      edge = edges.get(character)
      if (positions.get(edge.event) > positions.get(event)) event = edge.event
      character = edge.character
    }
    assert.notEqual(identity, character)
    return { identity, character, event }
  })
  for (const link of links) {
    assert.ok(!links.some(other => other.identity === link.character), 'One-level application reveal target required')
  }
  return { facts, links }
}
