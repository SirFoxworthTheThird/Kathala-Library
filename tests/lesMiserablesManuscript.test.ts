import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { validateManuscript } from '../scripts/les-miserables/validate-manuscript.mjs'
import { chapters, volumes, books, retained, footnoteNumbers } from '../scripts/les-miserables/source-text.mjs'

const filename = path.resolve(__dirname, '../scripts/les-miserables/manuscript-draft.pwk')
const read = () => JSON.parse(fs.readFileSync(filename, 'utf8'))

describe('Les Misérables complete manuscript staging', () => {
  test('retains all five volumes, 48 books, and 365 chapters in exact source order', () => {
    const result = validateManuscript(read())
    expect([volumes.length, books.length, chapters.length]).toEqual([5, 48, 365])
    expect(result.words).toBe(568115)
  })

  test('keeps the two untitled source chapters as independent containers', () => {
    expect(chapters.filter(chapter => /^CHAPTER [IVXLCDM]+$/.test(chapter.heading)).map(chapter => chapter.number)).toEqual([326, 341])
    expect(chapters[325].text).toMatch(/^CHAPTER IV\n/)
    expect(chapters[340].text).toContain('CHAPTER I\n')
  })

  test('preserves preface, closing letter, final French verse, and the entire endnote apparatus', () => {
    expect(retained).toMatch(/^PREFACE\n/)
    expect(retained).toContain('LETTER TO M. DAELLI')
    expect(retained).toContain('Il dort. Quoique le sort fût pour lui bien étrange,')
    expect(footnoteNumbers).toEqual(Array.from({ length: 70 }, (_, index) => index + 1))
    expect(retained).not.toContain('[Illustration:')
  })

  test('rejects a dropped chapter', () => {
    const world = read()
    world.chapters.splice(325, 1)
    expect(() => validateManuscript(world)).toThrow(/chapter containers/)
  })

  test('rejects omitted prose even if the exported word count is adjusted', () => {
    const world = read()
    world.sceneTexts[0].text = world.sceneTexts[0].text.slice(120)
    world.sceneTexts[0].wordCount -= 20
    expect(() => validateManuscript(world)).toThrow(/Exact chapter 1 source slice/)
  })

  test('rejects a duplicated passage', () => {
    const world = read()
    world.sceneTexts[20].text += world.sceneTexts[20].text.slice(0, 250)
    expect(() => validateManuscript(world)).toThrow(/Exact chapter .* source slice/)
  })

  test('rejects swapped scene bodies', () => {
    const world = read()
    const first = world.sceneTexts[0].text
    world.sceneTexts[0].text = world.sceneTexts[1].text
    world.sceneTexts[1].text = first
    expect(() => validateManuscript(world)).toThrow(/Exact chapter 1 source slice/)
  })
})
