import { expect, test } from 'vitest'
import { enrichedReview } from '../scripts/les-miserables/build-enrichment-audit.mjs'
import { chapters } from '../scripts/les-miserables/source-text.mjs'

test('keeps the guard sergeant through the uninterrupted station proceedings', () => {
  const rows = enrichedReview().get(52)
  expect(chapters[51].paragraphs[41].text).toContain('Sergeant!')
  expect(chapters[51].paragraphs[71].text).toContain('left')
  const states = [1, 15, 26, 40, 73].map(at => {
    const row = rows.find(scene => scene.at === at)
    expect(row.location).toBe('montreuil-police-station')
    const state = row.present.find(([key]) => key === 'montreuil-guard-sergeant')
    expect(state, `guard sergeant at paragraph ${at}`).toBeDefined()
    return state?.[1]
  })
  expect(new Set(states).size).toBe(5)
  const final = rows.find(scene => scene.at === 73).present.map(([key]) => key)
  expect(final).not.toContain('javert')
  expect(final).not.toContain('cosette')
  expect(final).not.toContain('bamatabois')
})
