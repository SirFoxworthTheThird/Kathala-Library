import { describe, it, expect } from 'vitest'

/**
 * Every id a shipped world uses points at a record the world contains.
 *
 * *The Name of the Wind* shipped with **every one of its 128 scenes** naming a
 * point-of-view character that did not exist: the book was regenerated with new
 * character ids (`notw-char-*`) and the POV field kept the old ones
 * (`30000000-0000-…`). In the app the POV simply showed as nothing, on every
 * scene, for months. No test looked, because a dangling id is not malformed
 * JSON and not a spoiler — it is only wrong.
 *
 * It was found by running the application's continuity checker across the whole
 * shelf. That is a useful way to find things and a poor way to be sure of them,
 * so the rule lives here now.
 */

const worldFiles = import.meta.glob('../library/*.pwk', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>

interface World {
  characters?: Array<{ id: string }>
  items?: Array<{ id: string; isCollective?: boolean }>
  locationMarkers?: Array<{ id: string }>
  events?: Array<{
    id: string
    title?: string
    povCharacterId?: string | null
    involvedCharacterIds?: string[]
    involvedItemIds?: string[]
    locationMarkerId?: string | null
  }>
  characterSnapshots?: Array<{ eventId: string; characterId: string; inventoryItemIds?: string[] }>
}

const books = Object.entries(worldFiles).map(([path, text]) =>
  [path.slice(path.lastIndexOf('/') + 1).replace('.pwk', ''), JSON.parse(text) as World] as const)

describe('the ids a shipped world uses', () => {
  it('is reading the whole shelf', () => {
    // Without this every rule below passes on an empty glob.
    expect(books.length).toBeGreaterThan(40)
    expect(books.every(([, w]) => (w.events?.length ?? 0) > 0)).toBe(true)
  })

  it('always name a record the world contains', () => {
    const dangling: string[] = []
    for (const [book, w] of books) {
      const characters = new Set((w.characters ?? []).map((c) => c.id))
      const items = new Set((w.items ?? []).map((i) => i.id))
      const markers = new Set((w.locationMarkers ?? []).map((m) => m.id))
      const events = new Set((w.events ?? []).map((e) => e.id))

      const check = (ok: boolean, where: string, id: string) => {
        if (!ok) dangling.push(`${book}: ${where} -> ${id}`)
      }
      for (const e of w.events ?? []) {
        if (e.povCharacterId) check(characters.has(e.povCharacterId), `${e.title ?? e.id} povCharacterId`, e.povCharacterId)
        for (const id of e.involvedCharacterIds ?? []) check(characters.has(id), `${e.title ?? e.id} cast`, id)
        for (const id of e.involvedItemIds ?? []) check(items.has(id), `${e.title ?? e.id} items`, id)
        if (e.locationMarkerId) check(markers.has(e.locationMarkerId), `${e.title ?? e.id} location`, e.locationMarkerId)
      }
      for (const s of w.characterSnapshots ?? []) {
        check(events.has(s.eventId), 'snapshot eventId', s.eventId)
        check(characters.has(s.characterId), 'snapshot characterId', s.characterId)
        for (const id of s.inventoryItemIds ?? []) check(items.has(id), 'snapshot inventory', id)
      }
    }
    expect(dangling.slice(0, 20)).toEqual([])
  })
})

/**
 * One object is in one pair of hands at a time.
 *
 * `inventoryItemIds` says what a character is *carrying* in a scene, so the same
 * non-collective item in two inventories at one scene is a contradiction — and
 * the app reports it as an error. Four books do it, in two different ways.
 *
 * **Most of it was not an error at all.** *The Two Towers* accounted for 156 of
 * 201: Elven Cloaks (81), Lembas (58) and Barrow-blades (15), which are kinds of
 * thing rather than objects. They are now marked `isCollective`, the flag that
 * exists to say so, and the count fell to 2.
 *
 * What remains is a scene recording everyone who touches an object as carrying
 * it — Jane's book during the struggle over it, Odysseus's bow at the contest.
 * Each needs a decision about who actually holds it, which is why the ceiling
 * below is a ceiling and not zero: **it may only go down.**
 */
const SHARED_INVENTORY_CEILING = 42

describe('an object in two pairs of hands', () => {
  const shared = books.flatMap(([book, w]) => {
    const collective = new Set((w.items ?? []).filter((i) => i.isCollective).map((i) => i.id))
    const holders = new Map<string, Map<string, number>>()
    for (const s of w.characterSnapshots ?? []) {
      for (const id of s.inventoryItemIds ?? []) {
        if (collective.has(id)) continue
        if (!holders.has(s.eventId)) holders.set(s.eventId, new Map())
        const perItem = holders.get(s.eventId)!
        perItem.set(id, (perItem.get(id) ?? 0) + 1)
      }
    }
    const names = new Map((w.items ?? []).map((i) => [i.id, i as { id: string; name?: string }]))
    return [...holders].flatMap(([eventId, perItem]) =>
      [...perItem].filter(([, n]) => n > 1)
        .map(([id, n]) => `${book}: ${names.get(id)?.name ?? id} held by ${n} at ${eventId}`))
  })

  it('is not getting more common', () => {
    expect(shared.length).toBeLessThanOrEqual(SHARED_INVENTORY_CEILING)
  })

  /*
    The presence half, and the reason the ceiling is not simply deleted along
    with the rule: while any remain, a ceiling that has drifted far above them
    stops being a ratchet. If this fails, lower the number to what the first
    assertion now reports.
  */
  it('has a ceiling that still means something', () => {
    expect(shared.length).toBeGreaterThan(SHARED_INVENTORY_CEILING - 10)
  })
})
