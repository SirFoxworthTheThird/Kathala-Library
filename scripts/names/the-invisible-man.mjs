/*
  The Invisible Man — the stranger, then the Invisible Man, then Griffin.

  That he is invisible is the book's title, and no secret. Who he is, is. Iping
  knows him as "the stranger" — bandaged, goggled, arrived out of the snow —
  until he tears the bandages off in the bar ("No Face at All", ch. 7), and from
  then on as "the Invisible Man". His name waits until he climbs into Kemp's
  study bleeding: "I am Griffin, of University College" ("Blood on the
  Landing", ch. 17). It matters there because it makes him a man Kemp knew.

  The world called him Griffin from the first page — in his name, in his
  description ("a gifted but embittered physicist"), in the world's own premise,
  and in some forty scene descriptions, notes, threads and places a reader sees
  before chapter 17. So his name changes where the book's does, and every text a
  reader sees before the name says what the village was calling him then.
  Records whose first appearance is at or after "Blood on the Landing" are left
  as they are.

  Run from the repository root: node scripts/names/the-invisible-man.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'
import { readerTexts, sortKeys } from '../lib/reader-gate.mjs'

const w = openWorld('the-invisible-man')
const ARRIVAL = w.scene('invisible-man-event-arrival', 'A Stranger in the Snow')
const UNVEILED = w.scene('invisible-man-event-unveiling', 'No Face at All')
const NAMED = w.scene('invisible-man-event-griffin-arrives', 'Blood on the Landing')
const GRIFFIN = 'invisible-man-character-griffin'
const key = sortKeys(w.world)

// His name, as the book gives it.
w.set('characters', GRIFFIN, 'nameChanges', undefined, [
  { eventId: ARRIVAL, name: 'The Stranger' },
  { eventId: UNVEILED, name: 'The Invisible Man' },
  { eventId: NAMED, name: 'Griffin' },
])
w.set('characters', GRIFFIN, 'aliasesFrom', undefined, [{ alias: 'The Invisible Man', eventId: UNVEILED }])
w.set('characters', GRIFFIN, 'description',
  'A gifted but embittered physicist whose successful invisibility experiment leaves him cold, hungry, isolated, and increasingly committed to coercion.',
  'A stranger who walks into Iping out of a February snowstorm, wrapped from head to foot, his face hidden behind bandages and blue goggles, and pays in advance for privacy.')

// Texts that need more than a name swapped.
w.set('world', null, 'description',
  'H. G. Wells’s grotesque scientific romance follows Griffin, a physicist who makes his body invisible and discovers that freedom from sight does not mean freedom from hunger, cold, injury, suspicion, or consequence. His search for privacy and reversal in Iping becomes coercion, flight, confession, and a public hunt across southern England.',
  'H. G. Wells’s grotesque scientific romance follows a man who has made his body invisible and discovers that freedom from sight does not mean freedom from hunger, cold, injury, suspicion, or consequence. His search for privacy in the village of Iping becomes coercion, flight, confession, and a public hunt across southern England.')
w.set('characters', 'invisible-man-character-kemp', 'description',
  'A physician and former university acquaintance of Griffin who listens scientifically, then chooses public safety over private loyalty.',
  'A Port Burdock physician with scientific ambitions, who listens to the impossible as a scientist would and then chooses public safety over private loyalty.')
w.set('locationMarkers', 'invisible-man-location-griffin-room', 'name', 'Griffin’s Bedroom and Laboratory', 'The Stranger’s Room and Laboratory')
w.set('plotThreads', 'invisible-man-thread-hunt', 'name', 'The Hunt for Griffin', 'The Hunt for the Invisible Man')
w.set('factions', 'invisible-man-faction-manhunt', 'description',
  'Police, officials, workers, and warned civilians coordinate around Griffin’s need for food, rest, and unobstructed roads.',
  'Police, officials, workers, and warned civilians coordinate around the Invisible Man’s need for food, rest, and unobstructed roads.')

// Everything else a reader meets before chapter 17: what Iping was calling him at the time.
const unveiled = key.get(UNVEILED)
const named = key.get(NAMED)
for (const t of readerTexts(w.world)) {
  if (t.from === undefined || t.from >= named) continue
  // The unveiling scene is still the stranger's: it is where he stops being one.
  const call = t.from <= unveiled ? 'the stranger' : 'the Invisible Man'
  w.replace(t.table, t.id, t.field, /\bGriffin\b/g, (_, at, text) =>
    (at === 0 || /[.!?]\s+$/.test(text.slice(0, at)) ? call[0].toUpperCase() + call.slice(1) : call))
}

// Places no scene is set in, which a reader is never shown — kept consistent for the writer.
for (const id of ['invisible-man-location-london-gate', 'invisible-man-location-bramblehurst',
  'invisible-man-location-burdock-gate', 'invisible-man-location-station-burdock']) {
  w.replace('locationMarkers', id, 'description', /\bGriffin\b/g,
    id.includes('bramblehurst') ? 'the stranger' : 'the Invisible Man')
}

w.save()
