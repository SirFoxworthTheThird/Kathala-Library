import { describe, it, expect } from 'vitest'

/**
 * "Revealed to be" — one character who turns out to be another (EX-405, EX-409).
 *
 * Kathala lets a world say that a character is revealed to be someone else, on
 * the one revealed: `revealedAs: { characterId, eventId }`. Before that scene a
 * reader sees two people; from it, each page names the other. The app refuses
 * to build anything but one step — nobody revealed to be themself, and nobody
 * revealed to be someone who is themself revealed as someone — and a world file
 * does not go through the app's editor, so the same rule is held here.
 *
 * And the link is only as good as the records around it. *Jekyll and Hyde* had
 * the relationship between the two labelled "Two identities in one body" with
 * no start, so it was on screen from the moment both men had been met — eight
 * chapters before the link it duplicates. A pair's relationship begins at the
 * reveal or later.
 *
 * Read through `import.meta.glob`, as the other rules here are, so `tsc -b`
 * needs no node types.
 */

const worldFiles = import.meta.glob('../library/*.pwk', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>

interface World {
  chapters?: { id: string; number: number }[]
  events?: { id: string; chapterId: string; sortOrder: number }[]
  characters?: { id: string; name: string; revealedAs?: { characterId: string; eventId: string } }[]
  relationships?: { id: string; characterAId: string; characterBId: string; label: string; startEventId?: string | null }[]
}

const books = Object.entries(worldFiles).map(([path, text]) =>
  [path.slice(path.lastIndexOf('/') + 1).replace('.pwk', ''), JSON.parse(text) as World] as const)

/** The gate's order: `chapter.number + sortOrder / 1e6`, as `useReading.ts` computes it. */
function sortKeys(w: World) {
  const chapter = new Map((w.chapters ?? []).map((c) => [c.id, c.number]))
  const out = new Map<string, number>()
  for (const e of w.events ?? []) {
    const n = chapter.get(e.chapterId)
    if (n !== undefined) out.set(e.id, n + e.sortOrder / 1_000_000)
  }
  return out
}

const reveals = books.flatMap(([book, w]) =>
  (w.characters ?? []).filter((c) => c.revealedAs).map((c) => ({ book, w, c, to: c.revealedAs! })))

describe('a character revealed to be another', () => {
  it('is used, so the rules below are about something', () => {
    // Without this every rule below passes on a shelf with no reveals at all.
    expect(reveals.map((r) => `${r.book}: ${r.c.name}`)).toContain('strange-case-of-dr-jekyll-and-mr-hyde: Edward Hyde')
  })

  it('names a character and a scene the world contains', () => {
    const dangling: string[] = []
    for (const { book, w, c, to } of reveals) {
      if (!(w.characters ?? []).some((x) => x.id === to.characterId)) dangling.push(`${book}: ${c.name} -> character ${to.characterId}`)
      if (!sortKeys(w).has(to.eventId)) dangling.push(`${book}: ${c.name} -> scene ${to.eventId}`)
    }
    expect(dangling).toEqual([])
  })

  it('is one step: never themself, never someone who is revealed as someone', () => {
    const chains: string[] = []
    for (const { book, w, c, to } of reveals) {
      if (to.characterId === c.id) chains.push(`${book}: ${c.name} is revealed to be themself`)
      const head = (w.characters ?? []).find((x) => x.id === to.characterId)
      if (head?.revealedAs) chains.push(`${book}: ${c.name} -> ${head.name}, who is revealed to be someone too`)
    }
    expect(chains).toEqual([])
  })

  it('has no relationship with the one they turn out to be that begins before the reveal', () => {
    const early: string[] = []
    let pairs = 0
    for (const { book, w, c, to } of reveals) {
      const key = sortKeys(w)
      const at = key.get(to.eventId)!
      for (const r of w.relationships ?? []) {
        const between = new Set([r.characterAId, r.characterBId])
        if (!between.has(c.id) || !between.has(to.characterId)) continue
        pairs++
        const start = r.startEventId ? key.get(r.startEventId) : undefined
        if (start === undefined || start < at) early.push(`${book}: "${r.label}" starts ${r.startEventId ?? 'at the beginning'}`)
      }
    }
    // The pair in Jekyll and Hyde has one, so this is not passing on none.
    expect(pairs).toBeGreaterThan(0)
    expect(early).toEqual([])
  })
})
