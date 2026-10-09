/*
  Carmilla — Millarca, Mircalla and Carmilla, one person from "Three Names".

  General Spielsdorf's story (chs. 12–15) is of a lovely girl met at the Grand
  Duke's masked ball, whose mother "called her by the odd name of Millarca", and
  who was left in his care until his ward Bertha sickened and died. Le Fanu lets
  the reader suspect; the General says it in the ruined chapel, after Carmilla
  has fled his sword: "that is Millarca. That is the same person who long ago
  was called Mircalla, Countess Karnstein" ("Three Names", ch. 15).

  The world put Carmilla herself in the cast of every scene of the General's
  story, so the flashback said who Millarca was from its first scene. Millarca
  is now her own character in those scenes, revealed to be Carmilla at "Three
  Names", where Carmilla also takes the name on the portrait. The chapter's
  synopsis, on screen from its first scene, stops before the chapel.

  Run from the repository root: node scripts/names/carmilla.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('carmilla')
const THREE_NAMES = w.scene('carmilla-event-14-5', 'Three Names')
const CARMILLA = 'carmilla-char-carmilla'
const MILLARCA = 'carmilla-char-millarca'
const stamp = w.record('characters', CARMILLA).createdAt
const flashback = [
  ['carmilla-event-11-1', 'The Grand Duke’s Masquerade'],
  ['carmilla-event-11-2', 'An Old Acquaintance Masked'],
  ['carmilla-event-11-3', 'A Summons in Black'],
  ['carmilla-event-12-1', 'The Countess’s Petition'],
  ['carmilla-event-12-2', 'Millarca Entrusted'],
  ['carmilla-event-12-3', 'Lost After the Ball'],
  ['carmilla-event-12-4', 'A Message and Return'],
  ['carmilla-event-13-1', 'Bertha’s Decline'],
  ['carmilla-event-14-2', 'The Watch in Darkness'],
]

w.add('characters', {
  worldId: w.record('characters', CARMILLA).worldId, createdAt: stamp, updatedAt: stamp,
  id: MILLARCA,
  name: 'Millarca',
  aliases: [],
  description: 'A lovely young lady at the Grand Duke’s masked ball, whose mother calls her by the odd name of Millarca, and who is left in General Spielsdorf’s care.',
  portraitImageId: null, color: null, tags: [], isAlive: true, birthDate: null,
  revealedAs: { characterId: CARMILLA, eventId: THREE_NAMES },
})
for (const [id, title] of flashback) {
  w.scene(id, title)
  const e = w.record('events', id)
  w.set('events', id, 'involvedCharacterIds', e.involvedCharacterIds, e.involvedCharacterIds.map((c) => (c === CARMILLA ? MILLARCA : c)))
  const snap = `carmilla-snapshot-${id}-2`
  w.set('characterSnapshots', snap, 'characterId', CARMILLA, MILLARCA)
  w.replace('characterSnapshots', snap, 'statusNotes', /^Carmilla is/, 'Millarca is')
}
w.set('relationships', 'carmilla-relationship-3', 'characterBId', CARMILLA, MILLARCA)

w.set('characters', CARMILLA, 'aliases', [], ['Mircalla, Countess Karnstein'])
w.set('characters', CARMILLA, 'aliasesFrom', undefined, [{ alias: 'Mircalla, Countess Karnstein', eventId: THREE_NAMES }])

w.set('chapters', 'carmilla-chapter-14', 'synopsis',
  'Spielsdorf tells how a doctor from Gratz diagnosed Bertha’s nightly visitor when ordinary medicine failed. Armed with the physician’s warning, the General hides beside Bertha’s room and sees a black shape attack her. The General’s story ends; Laura rests among the monuments while her father studies the physician’s letter. Carmilla enters the chapel smiling until Spielsdorf recognizes her and attacks with his sword. After Carmilla vanishes through an unseen passage, the General identifies Carmilla, Millarca, and Mircalla as one person.',
  'Spielsdorf tells how a doctor from Gratz diagnosed Bertha’s nightly visitor when ordinary medicine failed. Armed with the physician’s warning, the General hides beside Bertha’s room and sees a black shape attack her. The General’s story ends; Laura rests among the monuments while her father studies the physician’s letter, and then Carmilla comes into the chapel.')

w.save()
