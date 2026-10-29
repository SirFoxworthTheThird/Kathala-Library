import fs from 'node:fs'
import { expect, test } from 'vitest'
import { validateStagedArt } from '../scripts/les-miserables/validate-staged-art.mjs'

const root = new URL('../scripts/les-miserables/', import.meta.url)
const load = (name: string) => JSON.parse(fs.readFileSync(new URL(name, root), 'utf8'))

test('keeps incomplete artwork separate from accepted and hash-verified staged illustrations', () => {
  const report = validateStagedArt()
  expect(report.encoded).toBeGreaterThan(0)
  expect(report.visuallyAccepted).toBe(report.encoded)
  expect(report.unreviewedEncodings).toEqual([])
  expect(report.missingPortraits.length).toBeGreaterThan(0)
  expect(report.releaseComplete).toBe(false)
})

test('does not carry visual acceptance across changed image bytes or a stale encoding', () => {
  const encoding = load('ART_ENCODING.json'), acceptance = load('ART_ACCEPTANCE.json')
  acceptance.images[0].reviewedTargetSha256 = '0'.repeat(64)
  expect(() => validateStagedArt(encoding, acceptance)).toThrow('fresh visual review')
  encoding.images[0].sourceSha256 = '0'.repeat(64)
  expect(() => validateStagedArt(encoding, load('ART_ACCEPTANCE.json'))).toThrow('Changed source')
})

test('reports an encoded portrait as missing until its exact bytes have visual acceptance', () => {
  const acceptance = load('ART_ACCEPTANCE.json')
  acceptance.images = acceptance.images.filter((row: {target: string}) => row.target !== 'art-staging/characters/cosette.webp')
  const report = validateStagedArt(load('ART_ENCODING.json'), acceptance)
  expect(report.unreviewedEncodings).toContain('art-staging/characters/cosette.webp')
  expect(report.missingPortraits).toContain('cosette')
})
