/*
  EX-405 sweep, second pass.

  The first pass flagged 1,753 hits and was mostly wrong, for one reason: it
  treated a *place* named in prose as a reveal. The gate deliberately does not
  work that way — a marker is revealed when a scene is set there, and Gondor is
  named in chapter 1 of The Two Towers without a scene being set there until 15.
  Naming a place early is how books work. So places are dropped as spoilers.

  What is left is two signals, kept apart because they fail differently:

  A. A browsable record names a CHARACTER the gate does not reveal for at least
     a chapter. Character names are specific and a roster that names someone the
     reader has not met is the "cast list gives the book away" fault itself.

  B. A record visible early uses OUTCOME language — "later", "is revealed to be",
     "eventually becomes". This is what actually caught Monte Cristo, where the
     spoilers named nobody: "a young sailor who becomes the Count".

  Both are candidates, not verdicts. A human reads them.
*/
import fs from 'node:fs'
import path from 'node:path'

const LIB = process.argv[2] ?? 'library'
const ONLY = process.argv[3] ?? null
const LATER = Number.POSITIVE_INFINITY
/*
  A standing record is one a reader can open at any time from the moment its
  subject appears, and which never changes after that: a character's
  description, a relationship's label, a goal. Those carry the whole burden of
  EX-405, because whatever they say is on screen from the first appearance to
  the last page.

  A pinned record is authored *for* one scene — a snapshot's notes, a knowledge
  fact's reveal. "Reveals himself" in a note attached to the scene where he
  reveals himself is not a spoiler, it is the scene. So outcome language is not
  checked on those at all, and a forward reference has to clear three chapters
  before it is worth a human's time rather than one.
*/
const STANDING = new Set(['character', 'item', 'location', 'relationship', 'goal',
  'faction', 'plot thread', 'motif', 'lore page'])
const GAP_STANDING = 1.0
const GAP_PINNED = 3.0

const sortKeys = (events, chapterNumberById) => {
  const out = new Map()
  for (const ev of events) {
    const ch = chapterNumberById.get(ev.chapterId)
    if (ch === undefined) continue
    out.set(ev.id, ch + ev.sortOrder / 1_000_000)
  }
  return out
}

function firstAppearances(app, keyByEvent) {
  const out = new Map()
  for (const { entityId, eventId } of app) {
    const key = keyByEvent.get(eventId)
    if (key === undefined) continue
    const cur = out.get(entityId)
    if (cur === undefined || key < cur) out.set(entityId, key)
  }
  return out
}

function gateOf(d) {
  const chapterNumberById = new Map(d.chapters.map((c) => [c.id, c.number]))
  const keyByEvent = sortKeys(d.events, chapterNumberById)
  const app = []
  for (const ev of d.events) {
    for (const id of ev.involvedCharacterIds ?? []) app.push({ entityId: id, eventId: ev.id })
    if (ev.povCharacterId) app.push({ entityId: ev.povCharacterId, eventId: ev.id })
    for (const id of ev.involvedItemIds ?? []) app.push({ entityId: id, eventId: ev.id })
    if (ev.locationMarkerId) app.push({ entityId: ev.locationMarkerId, eventId: ev.id })
    for (const id of ev.threadIds ?? []) app.push({ entityId: id, eventId: ev.id })
    for (const id of ev.motifIds ?? []) app.push({ entityId: id, eventId: ev.id })
  }
  for (const s of d.characterSnapshots ?? []) {
    app.push({ entityId: s.characterId, eventId: s.eventId })
    if (s.currentLocationMarkerId) app.push({ entityId: s.currentLocationMarkerId, eventId: s.eventId })
    for (const id of s.inventoryItemIds ?? []) app.push({ entityId: id, eventId: s.eventId })
  }
  for (const p of d.itemPlacements ?? []) app.push({ entityId: p.itemId, eventId: p.eventId })
  for (const s of d.itemSnapshots ?? []) app.push({ entityId: s.itemId, eventId: s.eventId })
  for (const s of d.locationSnapshots ?? []) app.push({ entityId: s.locationMarkerId, eventId: s.eventId })
  for (const s of d.mapRegionSnapshots ?? []) app.push({ entityId: s.regionId, eventId: s.eventId })
  const firstSeen = firstAppearances(app, keyByEvent)
  return {
    seen: (id) => firstSeen.get(id) ?? LATER,
    reached: (eventId) => (eventId ? keyByEvent.get(eventId) ?? -Infinity : -Infinity),
    keyByEvent,
  }
}

const TRIVIAL = new Set(['the', 'a', 'an', 'of', 'and', 'mr', 'mrs', 'miss', 'sir',
  'lady', 'lord', 'madame', 'monsieur', 'doctor', 'dr', 'captain', 'king', 'queen',
  'man', 'men', 'woman', 'boy', 'girl', 'one', 'two', 'old', 'young', 'great',
  'little', 'first', 'last', 'father', 'mother', 'son', 'daughter'])

const meaningful = (n) => {
  const w = n.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean)
  return w.length > 0 && w.some((x) => x.length >= 4 && !TRIVIAL.has(x))
}
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function characterNames(d) {
  const names = []
  for (const c of d.characters ?? []) {
    const add = (t) => {
      if (typeof t !== 'string') return
      const n = t.trim()
      if (n.length >= 4 && meaningful(n)) names.push({ name: n, id: c.id, of: c.name })
    }
    add(c.name)
    for (const a of c.aliases ?? []) add(a)
  }
  return names.sort((a, b) => b.name.length - a.name.length)
}

function mentions(text, names, ownIds) {
  const hits = []
  const taken = []
  const free = (s, e) => !taken.some(([ts, te]) => s < te && ts < e)
  for (const n of names) {
    const re = new RegExp(`(^|[^\\p{L}\\p{N}])(${esc(n.name)})(?=$|[^\\p{L}\\p{N}])`, 'giu')
    let m
    while ((m = re.exec(text)) !== null) {
      const s = m.index + m[1].length
      const e = s + m[2].length
      if (free(s, e)) {
        taken.push([s, e])
        if (!ownIds.has(n.id)) hits.push({ ...n, at: s })
      }
      re.lastIndex = e
    }
  }
  return hits
}

/* Outcome language: a claim about what happens after the moment shown. */
const OUTCOME = [
  /\blater\b/i, /\beventually\b/i, /\bultimately\b/i, /\bin the end\b/i,
  /\bby the end\b/i, /\bturns? out\b/i, /\bis revealed\b/i, /\bwill be revealed\b/i,
  /\breveals? (?:himself|herself|itself|themselves)\b/i, /\bwho (?:will|would) become\b/i,
  /\bgoes on to\b/i, /\bwill (?:become|marry|kill|die|betray|inherit)\b/i,
  /\btrue identity\b/i, /\breal name\b/i, /\bin truth\b/i, /\bis (?:really|actually)\b/i,
  /\bunbeknownst\b/i, /\bfinal (?:confrontation|chapter|scene|act)\b/i,
  /\bat the climax\b/i, /\bbefore (?:his|her|their) death\b/i, /\bposthumous/i,
  /\bmurderer\b/i, /\bfakes? (?:his|her|their) (?:own )?death\b/i,
]

function carriers(d, g) {
  const out = []
  const charName = new Map((d.characters ?? []).map((c) => [c.id, c.name]))
  const push = (kind, label, at, text, own = []) => {
    if (typeof text === 'string' && text.trim()) {
      out.push({ kind, label, at, text, own: new Set(own) })
    }
  }
  for (const c of d.characters ?? []) push('character', c.name, g.seen(c.id), c.description, [c.id])
  for (const i of d.items ?? []) push('item', i.name, g.seen(i.id), i.description)
  for (const m of d.locationMarkers ?? []) push('location', m.name, g.seen(m.id), m.description)
  const relAt = new Map()
  for (const r of d.relationships ?? []) {
    const at = Math.max(g.seen(r.characterAId), g.seen(r.characterBId), g.reached(r.startEventId))
    relAt.set(r.id, at)
    const who = `${charName.get(r.characterAId) ?? '?'} / ${charName.get(r.characterBId) ?? '?'}`
    const own = [r.characterAId, r.characterBId]
    push('relationship', who, at, r.label, own)
    push('relationship', who, at, r.description, own)
  }
  for (const s of d.relationshipSnapshots ?? []) {
    const r = (d.relationships ?? []).find((x) => x.id === s.relationshipId)
    const at = Math.max(relAt.get(s.relationshipId) ?? LATER, g.reached(s.eventId))
    const who = r ? `${charName.get(r.characterAId) ?? '?'} / ${charName.get(r.characterBId) ?? '?'}` : s.relationshipId
    const own = r ? [r.characterAId, r.characterBId] : []
    push('relationship snapshot', who, at, s.label, own)
    push('relationship snapshot', who, at, s.description, own)
  }
  for (const s of d.characterSnapshots ?? []) {
    const at = g.reached(s.eventId)
    push('character snapshot', charName.get(s.characterId) ?? s.characterId, at, s.statusNotes, [s.characterId])
    push('character snapshot', charName.get(s.characterId) ?? s.characterId, at, s.inventoryNotes, [s.characterId])
  }
  for (const gl of d.characterGoals ?? []) {
    push('goal', charName.get(gl.characterId) ?? gl.characterId, g.seen(gl.characterId), gl.text, [gl.characterId])
  }
  for (const t of d.plotThreads ?? []) push('plot thread', t.name, g.seen(t.id), t.description)
  for (const m of d.motifs ?? []) push('motif', m.name, g.seen(m.id), m.description)
  for (const f of d.factions ?? []) {
    const firstMember = Math.min(
      ...(d.factionMemberships ?? []).filter((m) => m.factionId === f.id)
        .map((m) => Math.max(g.seen(m.characterId), g.reached(m.startEventId))),
      LATER,
    )
    push('faction', f.name, firstMember, f.description)
  }
  for (const p of d.lorePages ?? []) {
    const links = (p.linkedEntityIds ?? []).map((id) => g.seen(id))
    const at = Math.max(g.reached(p.visibleFromEventId), ...(links.length ? links : [-Infinity]))
    push('lore page', p.title, at, `${p.title}\n${p.body ?? ''}`, p.linkedEntityIds ?? [])
  }
  for (const k of d.knowledgeFacts ?? []) {
    push('knowledge fact', k.title, g.reached(k.readerLearnsAtEventId), `${k.title}\n${k.description ?? ''}`)
  }
  return out
}

function check(file) {
  const d = JSON.parse(fs.readFileSync(file, 'utf8'))
  const g = gateOf(d)
  const names = characterNames(d)
  const chapterNumbers = (d.chapters ?? []).map((c) => c.number)
  const span = Math.max(1, Math.max(...chapterNumbers) - Math.min(...chapterNumbers) + 1)
  const A = []
  const B = []
  const C = []
  for (const c of carriers(d, g)) {
    if (!Number.isFinite(c.at)) continue
    for (const hit of mentions(c.text, names, c.own)) {
      const when = g.seen(hit.id)
      /*
        A character with no appearance anywhere is never revealed — `isRevealed`
        fails closed — so naming one is not a spoiler about a later chapter, it
        is a reference to somebody the reading-mode roster will never contain.
        Different fault, different bucket.
      */
      if (when === LATER) { C.push({ ...c, hit, when }); continue }
      /*
        How far ahead the reference reaches, as a share of the book. One chapter
        is a long way in a 12-chapter book and nothing at all in a 153-chapter
        one, so an absolute threshold picks fights with long books and lets
        short ones through. Both have to clear: more than a chapter, and more
        than a tenth of the story.
      */
      const gap = when - c.at
      const floor = STANDING.has(c.kind) ? GAP_STANDING : GAP_PINNED
      if (gap > floor && gap / span >= 0.10) A.push({ ...c, hit, when, gap, share: gap / span })
    }
    if (!STANDING.has(c.kind)) continue
    for (const re of OUTCOME) {
      const m = re.exec(c.text)
      if (m) {
        const first = Math.min(...(d.chapters ?? []).map((ch) => ch.number))
        B.push({ ...c, phrase: m[0], at2: m.index, early: (c.at - first) / span })
        break
      }
    }
  }
  return { world: d.world?.name ?? path.basename(file), A, B, C }
}

const files = fs.readdirSync(LIB).filter((f) => f.endsWith('.pwk')).sort()
  .filter((f) => !ONLY || f.includes(ONLY))

const rows = []
for (const f of files) {
  const r = check(path.join(LIB, f))
  rows.push({ f, world: r.world, a: r.A.length, b: r.B.length, c: r.C.length })
  const D = Number(process.env.DETAIL || 0)
  if (D && (r.A.length || r.B.length || r.C.length)) {
    console.log(`\n=== ${f} — A:${r.A.length} B:${r.B.length} C:${r.C.length} ===`)
    r.A.sort((x, y) => y.share - x.share)
    for (const v of r.A.slice(0, D)) {
      console.log(`  A [${v.kind}] ${v.label} @${v.at.toFixed(2)} names "${v.hit.name}" (${v.hit.of}) @${v.when.toFixed(2)} — ${v.gap.toFixed(0)} ch, ${(v.share * 100).toFixed(0)}% of book`)
      const s = Math.max(0, v.hit.at - 70)
      console.log(`      …${v.text.slice(s, v.hit.at + v.hit.name.length + 70).replace(/\s+/g, ' ')}…`)
    }
    for (const v of r.C.slice(0, D)) {
      console.log(`  C [${v.kind}] ${v.label} @${v.at.toFixed(2)} names "${v.hit.name}" (${v.hit.of}) — never revealed`)
    }
    r.B.sort((x, y) => x.early - y.early)
    for (const v of r.B.slice(0, D)) {
      console.log(`  B [${v.kind}] ${v.label} @${v.at.toFixed(2)} (${(v.early * 100).toFixed(0)}% in) — "${v.phrase}"`)
      const s = Math.max(0, v.at2 - 80)
      console.log(`      …${v.text.slice(s, v.at2 + 90).replace(/\s+/g, ' ')}…`)
    }
  }
}
rows.sort((x, y) => (y.a + y.b) - (x.a + x.b))
console.log('\n   A    B    C  book')
for (const r of rows) console.log(String(r.a).padStart(4), String(r.b).padStart(4), String(r.c).padStart(4), ' ', r.f)
const sum = (k) => rows.reduce((s, r) => s + r[k], 0)
console.log('TOTAL A', sum('a'), ' B', sum('b'), ' C', sum('c'), 'across', files.length)
