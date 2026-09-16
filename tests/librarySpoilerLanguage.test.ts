import { describe, it, expect } from 'vitest'

/**
 * Two mechanical rules against reading-mode spoilers (EX-405).
 *
 * A sweep of all 41 worlds found that the systemic violation was not in
 * character descriptions but in **plot threads**. A thread is revealed at the
 * first event carrying it, and from then on its name and description are
 * readable for the rest of the book — but they described the whole arc. So a
 * thread appearing once in chapter 2 and running to chapter 15 published
 * chapter 15 to a chapter-2 reader. *Jekyll and Hyde* opened on a thread called
 * "Jekyll's Double Life"; *Moby-Dick*'s first chapter mentioned the coffin that
 * saves Ishmael.
 *
 * `useReading.ts` already knew: *"their names are among the sharpest a world
 * holds — 'The Philosopher's Stone Mystery' gives away the book on its own."*
 * The gate hides a thread until it appears and does not constrain what it says
 * once shown. 94 records were rewritten. These rules stop them coming back.
 *
 * **What these rules cannot do.** Neither would have caught "Jekyll's Double
 * Life" or "The Identity Exchange", which name a concealed fact in plain words
 * and use no tell-tale construction at all. A reader found those and a reader
 * will have to find the next ones. These are a floor, not the rule.
 *
 * Read through `import.meta.glob` rather than `node:fs`, which passes vitest
 * and then fails `tsc -b` for want of node types. This project has been caught
 * by that twice.
 */

const worldFiles = import.meta.glob('../library/*.pwk', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>

interface Named { id: string; name: string; description?: string }
interface Character extends Named { aliases?: string[] }
interface Event {
  id: string; chapterId: string; sortOrder: number
  involvedCharacterIds?: string[]; involvedItemIds?: string[]
  povCharacterId?: string | null; locationMarkerId?: string | null
  threadIds?: string[]; motifIds?: string[]
}
interface World {
  chapters?: { id: string; number: number }[]
  events?: Event[]
  characters?: Character[]
  items?: Named[]
  plotThreads?: Named[]
  motifs?: Named[]
  characterSnapshots?: { characterId: string; eventId: string }[]
  itemPlacements?: { itemId: string; eventId: string }[]
  knowledgeFacts?: { title: string; description?: string; readerLearnsAtEventId?: string | null }[]
}

const parsed = Object.entries(worldFiles).map(([path, text]) =>
  [path.slice(path.lastIndexOf('/') + 1), JSON.parse(text) as World] as const)

const threadsAndMotifs = (w: World): Named[] => [...(w.plotThreads ?? []), ...(w.motifs ?? [])]

/** The gate's order: `chapter.number + sortOrder / 1e6`, as `useReading.ts` computes it. */
function sortKeys(w: World): Map<string, number> {
  const chapter = new Map((w.chapters ?? []).map((c) => [c.id, c.number]))
  const out = new Map<string, number>()
  for (const e of w.events ?? []) {
    const n = chapter.get(e.chapterId)
    if (n !== undefined) out.set(e.id, n + e.sortOrder / 1_000_000)
  }
  return out
}

/** First appearance per entity — the same sources the app's gate uses. */
function firstSeen(w: World): Map<string, number> {
  const key = sortKeys(w)
  const out = new Map<string, number>()
  const bump = (id: string, eventId: string) => {
    const k = key.get(eventId)
    if (k === undefined) return
    const cur = out.get(id)
    if (cur === undefined || k < cur) out.set(id, k)
  }
  for (const e of w.events ?? []) {
    for (const id of e.involvedCharacterIds ?? []) bump(id, e.id)
    if (e.povCharacterId) bump(e.povCharacterId, e.id)
    for (const id of e.involvedItemIds ?? []) bump(id, e.id)
    if (e.locationMarkerId) bump(e.locationMarkerId, e.id)
    for (const id of e.threadIds ?? []) bump(id, e.id)
    for (const id of e.motifIds ?? []) bump(id, e.id)
  }
  for (const s of w.characterSnapshots ?? []) bump(s.characterId, s.eventId)
  for (const p of w.itemPlacements ?? []) bump(p.itemId, p.eventId)
  return out
}

describe('reading-mode spoilers in the shipped worlds', () => {
  it('has worlds to check, with threads and facts inside them', () => {
    // Without this every rule below passes on an empty glob, which is how a
    // fixture test quietly stops testing.
    expect(parsed.length).toBeGreaterThan(20)
    expect(parsed.reduce((n, [, w]) => n + threadsAndMotifs(w).length, 0)).toBeGreaterThan(400)
    expect(parsed.reduce((n, [, w]) => n + (w.knowledgeFacts?.length ?? 0), 0)).toBeGreaterThan(300)
  })

  /*
    Rule one: a thread describes a pattern, not its resolution.

    "later", "eventually", "turns out" in a standing description are a promise
    about a chapter the reader has not reached. The list is temporal
    constructions only. "murderer" was in it for one run and came straight back
    out: it matched *Selden on the Moor* — "the Notting Hill murderer" — which
    is what the book calls him in the scene where the thread first appears. A
    noun for a person is not a claim about the future.
  */
  const FORWARD_LOOKING = [
    /\blater\b/i, /\beventually\b/i, /\bultimately\b/i, /\bin the end\b/i,
    /\bby the end\b/i, /\bturns? out\b/i, /\bis revealed\b/i,
    /\breveals? (?:himself|herself|itself|themselves)\b/i,
    /\bwho (?:will|would) become\b/i, /\bgoes on to\b/i,
    /\bwill (?:become|marry|kill|die|betray|inherit)\b/i,
    /\btrue identity\b/i, /\breal name\b/i, /\bin truth\b/i,
    /\bis (?:really|actually)\b/i, /\bunbeknownst\b/i,
    /\bfinal (?:confrontation|chapter|scene|act)\b/i, /\bat the climax\b/i,
  ]

  it('never lets a thread or motif promise a later chapter', () => {
    const found: string[] = []
    let checked = 0
    for (const [file, w] of parsed) {
      for (const t of threadsAndMotifs(w)) {
        checked++
        const text = `${t.name} ${t.description ?? ''}`
        const hit = FORWARD_LOOKING.find((re) => re.test(text))
        if (hit) found.push(`${file} — "${t.name}": ${hit} in ${JSON.stringify(t.description)}`)
      }
    }
    expect(checked).toBeGreaterThan(400)
    expect(found, `these tell a reader what happens after the scene that reveals them:\n${found.slice(0, 8).join('\n')}`)
      .toEqual([])
  })

  /*
    Rule two, and the one with teeth: the world says when each secret is learned.

    A `knowledgeFact` carries `readerLearnsAtEventId` — the author's own record
    of the moment a thing stops being a secret. So CI does not have to judge
    what a spoiler is; it only has to notice a world contradicting itself. The
    Fellowship of the Ring declared that the reader learns "Strider is Aragorn,
    Isildur's heir" in chapter 10 and carried a thread called *The Heir of
    Isildur* — "Aragorn's concealed identity" — from chapter 9.

    Naming the same people is not enough on its own: *Ishmael and Queequeg* and
    a fact about Ishmael and Queequeg share a cast without sharing a claim. So a
    record has to match a fact on **two entities and one content word** before it
    counts. That costs recall — a few real ones slip through — and a gate that
    cries wolf gets baselined into silence, which costs everything.
  */
  const STOP = new Set([
    'about', 'after', 'again', 'against', 'among', 'another', 'anything', 'around',
    'because', 'before', 'being', 'between', 'both', 'cannot', 'could', 'different',
    'during', 'enough', 'every', 'everything', 'first', 'from', 'herself', 'himself',
    'into', 'itself', 'never', 'nothing', 'other', 'over', 'rather', 'really',
    'since', 'something', 'still', 'than', 'that', 'their', 'them', 'then', 'there',
    'these', 'they', 'this', 'those', 'through', 'themselves', 'toward', 'towards',
    'under', 'until', 'what', 'when', 'where', 'whether', 'which', 'while', 'whose',
    'with', 'without', 'would',
  ])
  const contentWords = (t: string) =>
    new Set(t.toLowerCase().split(/[^\p{L}]+/u).filter((w) => w.length >= 5 && !STOP.has(w)))
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  it('never states a secret the same world says is learned later', () => {
    const found: string[] = []
    let compared = 0

    for (const [file, w] of parsed) {
      if (!(w.knowledgeFacts ?? []).length) continue
      const key = sortKeys(w)
      const seen = firstSeen(w)

      /*
        Three things below are for speed, and they are here because this test
        passed locally at 4.3s and *timed out* on CI against vitest's 5s
        default. A timeout is reported as a failing test, so it read as "the
        library has a spoiler in it" when the library was fine. Measured on
        this machine: 4296ms → 803ms.

        The regexes are compiled once per world rather than once per `split`
        call, which was a hundred-odd `new RegExp` across a thousand-odd calls.
        (Worth ~0.5s of the total — most of the win is the substring check in
        `split` below.)
      */
      const names: { id: string; lower: string; bounded: RegExp; plain: RegExp }[] = []
      const addName = (n: string | undefined, id: string) => {
        const name = n?.trim()
        if (!name || name.length < 4) return
        names.push({
          id,
          lower: name.toLowerCase(),
          bounded: new RegExp(`(^|[^\\p{L}\\p{N}])(${escape(name)})(?=$|[^\\p{L}\\p{N}])`, 'iu'),
          plain: new RegExp(escape(name), 'giu'),
        })
      }
      for (const c of w.characters ?? []) {
        addName(c.name, c.id)
        for (const alias of c.aliases ?? []) addName(alias, c.id)
      }
      for (const i of w.items ?? []) addName(i.name, i.id)

      // Entity names are matched and then struck out, so the words left over are
      // the claim rather than the cast.
      const split = (text: string) => {
        const ids = new Set<string>()
        let rest = text
        let lower = text.toLowerCase()
        for (const { id, lower: needle, bounded, plain } of names) {
          // A plain substring check first, and the reason this test runs in
          // under a second. Almost every name is absent from almost every
          // description, and `includes` rejects those without touching the
          // unicode-aware regex behind it.
          if (!lower.includes(needle) || !bounded.test(rest)) continue
          ids.add(id)
          plain.lastIndex = 0
          rest = rest.replace(plain, ' ')
          lower = rest.toLowerCase()
        }
        return { ids, words: contentWords(rest) }
      }

      /*
        Split every record once, not once per fact.

        The obvious nesting — walk the facts, and inside that walk the standing
        records — re-runs `split` over the same description for every fact in
        the world. Worth ~0.1s on its own; kept because the cost grows with the
        product of the two and the next long book would pay it again.
      */
      const standing: { kind: string; label: string; at: number; parts: ReturnType<typeof split> }[] = []
      const addStanding = (kind: string, label: string, id: string, text: string | undefined) => {
        const at = seen.get(id)
        if (at === undefined || !text) return
        standing.push({ kind, label, at, parts: split(text) })
      }
      for (const t of threadsAndMotifs(w)) addStanding('thread', t.name, t.id, `${t.name} ${t.description ?? ''}`)
      for (const c of w.characters ?? []) addStanding('character', c.name, c.id, c.description)
      for (const i of w.items ?? []) addStanding('item', i.name, i.id, i.description)

      for (const fact of w.knowledgeFacts ?? []) {
        const learnedAt = fact.readerLearnsAtEventId ? key.get(fact.readerLearnsAtEventId) : undefined
        if (learnedAt === undefined) continue
        const secret = split(`${fact.title} ${fact.description ?? ''}`)
        if (secret.ids.size < 2) continue
        for (const r of standing) {
          // A full chapter of slack: a record and the scene that reveals its
          // secret sitting in the same chapter is ordering, not a spoiler.
          if (learnedAt - r.at < 1) continue
          compared++
          const got = r.parts
          const sharedNames = [...secret.ids].filter((id) => got.ids.has(id))
          if (sharedNames.length < 2) continue
          const sharedWords = [...secret.words].filter((word) => got.words.has(word))
          if (sharedWords.length < 1) continue
          found.push(
            `${file} — [${r.kind}] "${r.label}" readable at ${r.at.toFixed(0)}, but "${fact.title}" is learned at ${learnedAt.toFixed(0)}`
            + ` (shared: ${sharedWords.join(', ')})`,
          )
        }
      }
    }

    expect(compared).toBeGreaterThan(1000)
    expect(found, `these say what their own world says the reader does not know yet:\n${found.slice(0, 8).join('\n')}`)
      .toEqual([])
  })
})
