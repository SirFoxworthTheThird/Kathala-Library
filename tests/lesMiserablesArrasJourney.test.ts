import { expect, test } from 'vitest'
import { enrichedReview } from '../scripts/les-miserables/build-enrichment-audit.mjs'
import { chapters } from '../scripts/les-miserables/source-text.mjs'

test('introduces the Tinques guide when he joins instead of dropping him until the breakdown', () => {
  const rows = enrichedReview().get(59)
  const warning = rows.find(row => row.at === 154)
  expect(warning.present.map(([key]) => key)).toEqual(['valjean','tinques-roadmender'])
  expect(chapters[58].paragraphs[173].text).toContain('seated on the shaft')
  const resumption = rows.find(row => row.at === 173)
  expect(resumption, 'new horse and guide require their own source cut').toBeDefined()
  expect(resumption.present.map(([key]) => key)).toEqual(['valjean','tinques-postilion'])
  expect(resumption.present.map(([key]) => key)).not.toContain('hesdin-cart-boy')
  expect(resumption.items).toContain('hesdin-spring-cart')
})
