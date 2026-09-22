import { describe, it, expect } from 'vitest'

/**
 * Nothing a reader can open still calls the app by its old name.
 *
 * The rename swept this repository and reported eight books changed. It missed
 * a ninth: *The Thirty-Nine Steps* carried *"Marker coordinates … were visually
 * checked in PlotWeave"* in a Lore page, and its generator carried the same
 * sentence, so regenerating the book would have written the old name back after
 * any hand-fix. It was found weeks later, by hand, while renaming repositories.
 *
 * Three sweeps of this rename each returned a fraction of the answer — a
 * case-sensitive grep that found five books of eight, a `\bplotweave\b` that
 * could not match `plotweave_*.deb`, a survey of `localStorage` call sites that
 * missed three keys built in helpers. A name is exactly the kind of string a
 * grep is trusted for and exactly the kind it gets wrong, so the check belongs
 * in the gate rather than in anyone's memory.
 *
 * Read through `import.meta.glob` rather than `node:fs`, which passes vitest
 * and then fails `tsc -b` for want of node types.
 */

const raw = (pattern: Record<string, unknown>) => pattern as Record<string, string>

/** Everything a reader receives: the worlds themselves and the shelf. */
const shipped = raw({
  ...import.meta.glob('../library/*.pwk', { eager: true, query: '?raw', import: 'default' }),
  ...import.meta.glob('../library/index.json', { eager: true, query: '?raw', import: 'default' }),
})

/**
 * Everything that describes this repository or writes a world — including the
 * generators, because a generator is the copy of record and a book fixed by
 * hand is fixed until someone runs it again.
 */
const live = raw({
  ...import.meta.glob('../{README.md,CLAUDE.md,index.html,package.json}', { eager: true, query: '?raw', import: 'default' }),
  ...import.meta.glob('../docs/*.md', { eager: true, query: '?raw', import: 'default' }),
  ...import.meta.glob('../contract/*.ts', { eager: true, query: '?raw', import: 'default' }),
  ...import.meta.glob('../scripts/**/*.mjs', { eager: true, query: '?raw', import: 'default' }),
})

/**
 * The QA notes record which build of the app a world was checked against —
 * *"passed against PlotWeave `main` at `57069c0`"* — and the captured screens
 * beside them record what it displayed. Rewriting either would make a record
 * report a run that never happened.
 */
const records = raw({
  ...import.meta.glob('../scripts/**/QA.md', { eager: true, query: '?raw', import: 'default' }),
  ...import.meta.glob('../scripts/**/qa/*.json', { eager: true, query: '?raw', import: 'default' }),
})

/*
  Nothing is exempt any more. The two hosts were, while they still served the
  app and this library under the old name; both have moved, so the rule is now
  the plain one it reads as.
*/
const hits = (files: Record<string, string>) =>
  Object.entries(files)
    .flatMap(([path, text]) => text.split('\n').map((line, i) => ({ path, i, line })))
    .filter(({ line }) => /plotweave/i.test(line))
    .map(({ path, i, line }) => `${path}:${i + 1}: ${line.trim().slice(0, 100)}`)

describe('the old application name', () => {
  it('is reading the files it claims to read', () => {
    // Without this every absence below passes on an empty glob.
    expect(Object.keys(shipped).length).toBeGreaterThan(40)
    expect(Object.keys(live).length).toBeGreaterThan(10)
    expect(live['../README.md']).toBeTruthy()
    expect(live['../index.html']).toBeTruthy()
    expect(shipped['../library/index.json']).toBeTruthy()
    expect(shipped['../library/the-thirty-nine-steps.pwk'], 'the book that carried the ninth occurrence')
      .toBeTruthy()
  })

  it('is in no shipped world and no shelf entry', () => {
    expect(hits(shipped)).toEqual([])
  })

  it('is in nothing that describes this repository, and no generator', () => {
    expect(hits(live)).toEqual([])
  })

  /*
    The presence half. Both absences above are satisfied by a repository that
    has forgotten the rename happened — one where the QA records were swept
    along with everything else, and one where the page stopped pointing a reader
    at the app at all. Neither is a state this repository should reach quietly.
  */
  it('is still in the QA records, and the page still points at the app', () => {
    const kept = Object.values(records).filter((text) => /plotweave/i.test(text))
    expect(kept.length, 'the QA records were rewritten, which the exemption exists to prevent')
      .toBeGreaterThan(2)
    expect(live['../index.html'], 'the page no longer links a reader to the app')
      .toContain('kathala.netlify.app')
  })
})
