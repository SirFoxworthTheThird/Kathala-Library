/*
  The Count of Monte Cristo — the names Dantès wears, the titles his enemies buy, and Andrea Cavalcanti.

  Dumas stops calling his hero Dantès after chapter 28. He is the Englishman
  of Thomson and French, then "Sinbad the Sailor" to Franz on the island
  ("Franz Dines with Sinbad", ch. 31), then "the count" from Rome on
  ("Franz and Albert Reach Rome", ch. 33). The reader is never deceived — the
  abbé who visits Caderousse and the lord who buys a house in Marseille are
  plainly him (Lord Wilmore is "the name and title inscribed on his passport",
  ch. 25) — so those are names learned where they are worn, and the world
  already sets him in those scenes' casts.

  His enemies are renamed in one breath, by Caderousse to the abbé ("Caderousse
  Names the Guilty", ch. 27): Fernand is "the Comte de Morcerf", Mercédès
  "Madame de Morcerf", and Danglars "the Baron Danglars".

  Andrea Cavalcanti is the one real secret. He arrives in Paris as a hired son
  ("Andrea Meets His Purchased Father", ch. 56), and Bertuccio, seeing him at
  the Auteuil dinner, mutters "Benedetto? … fatality!" ("Auteuil Fills with
  Ghosts", ch. 62) — the infant he dug from Villefort's garden. The world had one
  record, named Benedetto, standing in Andrea's first scene, with Bertuccio's
  note there already reading "recognizes Benedetto beneath fashionable
  clothes". So Andrea is his own character, revealed to be Benedetto at Auteuil.

  Run from the repository root: node scripts/names/the-count-of-monte-cristo.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('the-count-of-monte-cristo')
const WILMORE = w.scene('count-of-monte-cristo-event-033', 'A New Fortune Moves in Secret')
const BUSONI = w.scene('count-of-monte-cristo-event-034', 'Busoni Tests Caderousse')
const GUILTY = w.scene('count-of-monte-cristo-event-035', 'Caderousse Names the Guilty')
const SINBAD = w.scene('count-of-monte-cristo-event-040', 'Franz Dines with Sinbad')
const ROME = w.scene('count-of-monte-cristo-event-042', 'Franz and Albert Reach Rome')
const PURCHASED = w.scene('count-of-monte-cristo-event-071', 'Andrea Meets His Purchased Father')
const AUTEUIL = w.scene('count-of-monte-cristo-event-078', 'Auteuil Fills with Ghosts')
const EDMOND = 'count-of-monte-cristo-char-edmond'
const BENEDETTO = 'count-of-monte-cristo-char-andrea'
const ANDREA = 'count-of-monte-cristo-char-andrea-cavalcanti'
const stamp = w.record('characters', BENEDETTO).createdAt

// Dantès, and the names he goes by.
w.set('characters', EDMOND, 'nameChanges', undefined,
  [{ eventId: SINBAD, name: 'Sinbad the Sailor' }, { eventId: ROME, name: 'The Count of Monte Cristo' }])
w.set('characters', EDMOND, 'aliases', [], ['Edmond Dantès', 'Lord Wilmore', 'Abbé Busoni'])
w.set('characters', EDMOND, 'aliasesFrom', undefined,
  [{ alias: 'Lord Wilmore', eventId: WILMORE }, { alias: 'Abbé Busoni', eventId: BUSONI }])

// The titles, as Caderousse tells them.
w.set('characters', 'count-of-monte-cristo-char-fernand', 'nameChanges', undefined, [{ eventId: GUILTY, name: 'The Count de Morcerf' }])
w.set('characters', 'count-of-monte-cristo-char-fernand', 'aliases', [], ['Fernand'])
w.set('characters', 'count-of-monte-cristo-char-mercedes', 'nameChanges', undefined, [{ eventId: GUILTY, name: 'Mercédès, Madame de Morcerf' }])
w.set('characters', 'count-of-monte-cristo-char-danglars', 'nameChanges', undefined, [{ eventId: GUILTY, name: 'Baron Danglars' }])
w.set('factions', 'count-of-monte-cristo-faction-morcerf-house', 'description',
  'The title and fortune built around Fernand’s military career, Mercédès’s memory, and Albert’s inherited honour.',
  'The house of the Count de Morcerf, peer of France: his military title and fortune, his countess, and their son Albert’s inherited honour.')

// Andrea Cavalcanti, as Paris meets him, revealed to be Benedetto.
w.add('characters', {
  worldId: 'count-of-monte-cristo-world', createdAt: stamp, updatedAt: stamp,
  id: ANDREA,
  name: 'Andrea Cavalcanti',
  aliases: [],
  description: 'A handsome, newly dressed young man of about twenty-one, presented at the count’s house as the long-lost son of Major Cavalcanti, and very easy in the part.',
  portraitImageId: null, color: null, tags: [], isAlive: true, birthDate: null,
  revealedAs: { characterId: BENEDETTO, eventId: AUTEUIL },
})
const first = w.record('events', PURCHASED)
w.set('events', PURCHASED, 'involvedCharacterIds', first.involvedCharacterIds,
  first.involvedCharacterIds.map((id) => (id === BENEDETTO ? ANDREA : id)))
w.set('characterSnapshots', 'count-of-monte-cristo-snapshot-071-andrea', 'characterId', BENEDETTO, ANDREA)
w.set('characterSnapshots', 'count-of-monte-cristo-snapshot-071-edmond', 'statusNotes',
  'Brings two impostors together and confirms that Bertuccio’s recognition will hold.',
  'Brings the hired father and the hired son together, and watches them play their parts.')
w.set('characterSnapshots', 'count-of-monte-cristo-snapshot-071-bertuccio', 'statusNotes',
  'Recognizes Benedetto beneath fashionable clothes and understands his master planned the encounter.',
  'Shows the visitors in and attends to his master’s orders.')

// The thread opens on Bertuccio's story in chapter 43, and the chapter and scene where Andrea arrives.
w.set('plotThreads', 'count-of-monte-cristo-thread-benedetto', 'description',
  'The rescued infant becomes criminal, false aristocrat, and the public accuser of his father.',
  'The infant Bertuccio dug from a garden at Auteuil, alive, and what became of him.')
for (const [table, id, field] of [['chapters', 'count-of-monte-cristo-chapter-056', 'synopsis'], ['events', PURCHASED, 'description']]) {
  w.set(table, id, field,
    'Benedetto arrives as Andrea Cavalcanti, recognizes Bertuccio, and performs a reunion with the supposed major.',
    'Andrea Cavalcanti arrives at the count’s and performs a reunion with the supposed major.')
}

w.save()
