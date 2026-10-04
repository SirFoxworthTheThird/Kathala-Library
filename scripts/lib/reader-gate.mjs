/*
  When a reader first sees each record — the app's reading gate, restated for scripts.

  The order is the gate's: `chapter.number + event.sortOrder / 1_000_000`
  (`src/lib/sortKey.ts` in the app). A character, item, place, thread or motif
  is first seen at its first appearance in a scene's cast, inventory, placement
  or snapshot (`useReading.ts`); a relationship once both its people are met and
  its own start is reached; a goal, lore page or knowledge fact at the scene it
  names; a scene, its notes and its snapshots at that scene; a chapter's title
  and synopsis at its first scene.

  `visibleFrom(world)` returns, for every text-bearing record, the sort key a
  reader first sees it at — `-Infinity` for one shown from the start (the world
  itself, factions, lore categories), and `undefined` for an entity that never
  appears, which the gate never shows.
*/

export function sortKeys(world) {
  const chapter = new Map(world.chapters.map((c) => [c.id, c.number]))
  const keys = new Map()
  for (const e of world.events) {
    const n = chapter.get(e.chapterId)
    if (n !== undefined) keys.set(e.id, n + e.sortOrder / 1_000_000)
  }
  return keys
}

export function firstSeen(world) {
  const key = sortKeys(world)
  const first = new Map()
  const seen = (id, eventId) => {
    const k = key.get(eventId)
    if (id && k !== undefined && !(first.get(id) <= k)) first.set(id, k)
  }
  for (const e of world.events) {
    for (const f of ['involvedCharacterIds', 'involvedItemIds', 'threadIds', 'motifIds']) for (const id of e[f] ?? []) seen(id, e.id)
    seen(e.povCharacterId, e.id)
    seen(e.locationMarkerId, e.id)
  }
  for (const s of world.characterSnapshots ?? []) {
    seen(s.characterId, s.eventId)
    seen(s.currentLocationMarkerId, s.eventId)
    for (const id of s.inventoryItemIds ?? []) seen(id, s.eventId)
  }
  for (const p of world.itemPlacements ?? []) seen(p.itemId, p.eventId)
  for (const s of world.itemSnapshots ?? []) seen(s.itemId, s.eventId)
  for (const s of world.locationSnapshots ?? []) seen(s.locationMarkerId, s.eventId)
  return first
}

/** Every text field a reader can see, with the table, id, field and the key it is first shown at. */
export function readerTexts(world) {
  const key = sortKeys(world)
  const first = firstSeen(world)
  const chapterStart = new Map()
  for (const e of world.events) {
    const k = key.get(e.id)
    if (k !== undefined && !(chapterStart.get(e.chapterId) <= k)) chapterStart.set(e.chapterId, k)
  }
  const at = (eventId) => (eventId ? key.get(eventId) : -Infinity)
  const out = []
  const add = (table, rows, fields, when) => {
    for (const r of rows ?? []) for (const field of fields) {
      if (typeof r[field] === 'string' && r[field]) out.push({ table, id: r.id, field, from: when(r) })
    }
  }
  add('characters', world.characters, ['description'], (r) => first.get(r.id))
  add('items', world.items, ['name', 'description'], (r) => first.get(r.id))
  add('locationMarkers', world.locationMarkers, ['name', 'description'], (r) => first.get(r.id))
  add('plotThreads', world.plotThreads, ['name', 'description'], (r) => first.get(r.id))
  add('motifs', world.motifs, ['name', 'description'], (r) => first.get(r.id))
  add('factions', world.factions, ['name', 'description'], () => -Infinity)
  add('factionMemberships', world.factionMemberships, ['role'], (r) => Math.max(first.get(r.characterId) ?? Infinity, at(r.startEventId)))
  add('relationships', world.relationships, ['label', 'description'],
    (r) => Math.max(first.get(r.characterAId) ?? Infinity, first.get(r.characterBId) ?? Infinity, at(r.startEventId)))
  add('relationshipSnapshots', world.relationshipSnapshots, ['label', 'description'], (r) => key.get(r.eventId))
  add('chapters', world.chapters, ['title', 'synopsis'], (r) => chapterStart.get(r.id))
  add('events', world.events, ['title', 'description'], (r) => key.get(r.id))
  add('lorePages', world.lorePages, ['title', 'body'], (r) => at(r.visibleFromEventId))
  add('knowledgeFacts', world.knowledgeFacts, ['title', 'description'], (r) => at(r.readerLearnsAtEventId))
  add('characterGoals', world.characterGoals, ['text'], (r) => at(r.startEventId))
  add('characterSnapshots', world.characterSnapshots, ['statusNotes', 'inventoryNotes'], (r) => key.get(r.eventId))
  add('itemSnapshots', world.itemSnapshots, ['notes', 'condition'], (r) => key.get(r.eventId))
  add('locationSnapshots', world.locationSnapshots, ['notes', 'status'], (r) => key.get(r.eventId))
  return out
}
