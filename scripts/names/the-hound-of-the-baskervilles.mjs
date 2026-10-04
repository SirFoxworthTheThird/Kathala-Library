/*
  The Hound of the Baskervilles — who Stapleton is, from when Holmes says so.

  The book keeps three secrets about the naturalist of Merripit House, and
  reveals them in order: he is the man who dogged Sir Henry in London (Holmes,
  "Holmes Names the Enemy", ch. 12 — "It is he who dogged us in London?" "So I
  read the riddle"), the lady who passes as his sister is his wife (the same
  scene), and he is a Baskerville — Vandeleur in Yorkshire (a photograph,
  "Lestrade Arrives", ch. 13), and by birth Rodger Baskerville, son of the
  black-sheep brother (the retrospection, ch. 15).

  The world said all three from his first appearance: his description was
  "secretly Roger Baskerville and architect of the murders", he stood in the
  cast of the cab scene in chapter 4 under his own name, and his household
  faction mentioned "the hidden hound". So the bearded man in the cab is his own
  character, revealed to be Stapleton where Holmes reads the riddle; the
  surnames are aliases learned where the book gives them; and every record that
  said it earlier is rewritten as the reader first meets it (EX-405, EX-407).

  Run from the repository root: node scripts/names/the-hound-of-the-baskervilles.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('the-hound-of-the-baskervilles')
const CAB = w.scene('hound-event-15', 'The Bearded Watcher')
const NAMED = w.scene('hound-event-49', 'Holmes Names the Enemy')
const PORTRAIT = w.scene('hound-event-53', 'Holmes Studies Hugo’s Portrait')
const PHOTOGRAPH = w.scene('hound-event-55', 'Lestrade Arrives')
const RETROSPECT = w.scene('hound-event-64', 'The Hound Was Made Supernatural')
const STAPLETON = 'hound-char-stapleton'
const BERYL = 'hound-char-beryl'
const BEARDED = 'hound-char-bearded-man'
const stamp = w.record('characters', STAPLETON).createdAt

// The man in the cab, as Holmes and Watson saw him, revealed to be Stapleton.
w.add('characters', {
  worldId: 'hound-world', createdAt: stamp, updatedAt: stamp,
  id: BEARDED,
  name: 'The Bearded Man in the Cab',
  aliases: [],
  description: 'A man with a bushy black beard who watches Sir Henry from a hansom cab in Regent Street, and is driven off at speed the moment he is seen.',
  portraitImageId: null, color: null, tags: [], isAlive: true, birthDate: null,
  revealedAs: { characterId: STAPLETON, eventId: NAMED },
})
const cab = w.record('events', CAB)
w.set('events', CAB, 'involvedCharacterIds', cab.involvedCharacterIds,
  cab.involvedCharacterIds.map((id) => (id === STAPLETON ? BEARDED : id)))
w.set('characterSnapshots', 'hound-snapshot-15-stapleton', 'characterId', STAPLETON, BEARDED)
w.set('characterSnapshots', 'hound-snapshot-15-stapleton', 'statusNotes',
  'Escaping in a cab behind a false beard after confirming Sir Henry’s movements.',
  'Watching Sir Henry from a hansom cab, and driving off the moment he is seen.')
w.set('characterSnapshots', 'hound-snapshot-15-clayton', 'statusNotes',
  'Driving a disguised passenger without knowing his identity or purpose.',
  'Driving a bearded passenger who has paid him to follow Sir Henry.')

// Stapleton and Beryl, as Watson meets them on the moor, with the names the book gives later.
w.set('characters', STAPLETON, 'description',
  'A naturalist of the moor, secretly Roger Baskerville and architect of the murders.',
  'A slim, clean-shaven naturalist with a butterfly net, settled at Merripit House, who knows the moor and the Grimpen Mire better than anyone.')
w.set('characters', STAPLETON, 'aliases', [], ['Vandeleur', 'Rodger Baskerville'])
w.set('characters', STAPLETON, 'aliasesFrom', undefined,
  [{ alias: 'Vandeleur', eventId: PHOTOGRAPH }, { alias: 'Rodger Baskerville', eventId: RETROSPECT }])
w.set('characters', BERYL, 'description',
  'Stapleton’s wife, forced to pose as his sister and struggling to warn Sir Henry.',
  'Stapleton’s sister: tall, dark and strikingly beautiful, nothing like her brother, who urges a stranger on the moor to go straight back to London.')
w.set('characters', BERYL, 'aliases', [], ['Mrs Vandeleur', 'Beryl Garcia'])
w.set('characters', BERYL, 'aliasesFrom', undefined,
  [{ alias: 'Mrs Vandeleur', eventId: PHOTOGRAPH }, { alias: 'Beryl Garcia', eventId: RETROSPECT }])

// The household, its roles, and their scene notes.
w.set('factions', 'hound-faction-merripit', 'description',
  'Stapleton’s false domestic arrangement with Beryl and the hidden hound.',
  'Merripit House, the Stapletons’ grey farmhouse at the edge of the Grimpen Mire, and the two who live there.')
w.set('factionMemberships', 'hound-membership-10', 'role', 'Master of the conspiracy', 'Master of the house')
w.set('factionMemberships', 'hound-membership-11', 'role', 'Coerced wife', 'Mistress of the house')
w.set('characterSnapshots', 'hound-snapshot-30-stapleton', 'statusNotes',
  'Rejoining them while monitoring Beryl and maintaining the fiction that she is his sister.',
  'Rejoins them, and watches his sister closely as she takes back what she said.')
w.set('characterSnapshots', 'hound-snapshot-32-watson', 'statusNotes',
  'Warning Sir Henry that the supposed sibling relationship makes the courtship dangerous.',
  'Noticing, uneasily, how quickly Sir Henry is taken with Miss Stapleton.')
w.set('characterSnapshots', 'hound-snapshot-35-beryl', 'statusNotes',
  'Responding under the pressure of affection, deception, and fear of her husband.',
  'Torn between Sir Henry’s attention and her brother’s displeasure.')
w.set('characterSnapshots', 'hound-snapshot-36-beryl', 'statusNotes',
  'Caught between Sir Henry’s courtship and her husband’s possessive rage.',
  'Caught between Sir Henry’s courtship and her brother’s sudden fury.')

// Relationships begin where the reader learns them, and say what is true then.
w.set('relationships', 'hound-relationship-4', 'description',
  'Their attraction becomes dangerous because Stapleton presents Beryl as his sister.',
  'Sir Henry is drawn to Miss Stapleton from their first meeting, and her brother is strangely set against it.')
w.set('relationships', 'hound-relationship-5', 'description',
  'Stapleton presents Beryl as his sister, and she does not contradict him.',
  'Brother and sister at Merripit House; she keeps house for the naturalist.')
w.add('relationshipSnapshots', {
  worldId: 'hound-world', createdAt: stamp, updatedAt: stamp,
  id: 'hound-relationship-snapshot-5-named',
  relationshipId: 'hound-relationship-5', eventId: NAMED, sortKey: 12,
  label: 'Husband and wife', strength: 'strong', sentiment: 'negative',
  description: 'The lady who has passed as Miss Stapleton is in reality his wife.',
  isActive: true,
})
w.set('relationships', 'hound-relationship-6', 'startEventId', null, PORTRAIT)
w.set('relationships', 'hound-relationship-6', 'description',
  'Stapleton must kill Sir Henry to clear his path to the Baskerville estate.',
  'Hugo Baskerville’s portrait shows Stapleton’s face: a Baskerville, with designs upon the succession, and Sir Henry stands in the way.')
w.set('relationships', 'hound-relationship-8', 'startEventId', null, PHOTOGRAPH)
w.set('relationships', 'hound-relationship-14', 'startEventId', null, NAMED)

// A motif is on screen from its first scene, in chapter 4.
w.set('motifs', 'hound-motif-disguise', 'description',
  'False kinship, false names, a beard, and hidden observation destabilise identity.',
  'A beard glimpsed through a cab window, a name that may not be the speaker’s own: people seen without being known.')

w.save()
