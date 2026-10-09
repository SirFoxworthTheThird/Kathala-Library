/*
  The Phantom of the Opera — the Ghost, the Angel and Erik, in the order the book joins them.

  To a reader they begin as two things. The Opera Ghost is the house's legend:
  letters in red ink signed O.G., Box Five, a death's head. The Angel of Music
  is the voice that teaches Christine through her dressing-room wall. The voice
  gets a name first — "Here I am, Erik," Christine says to it in "The Ring Is
  Gone" (ch. 10), and Raoul throws it back at her in ch. 11: "The name of your
  Angel of Music, mademoiselle, is Erik!" That the voice and the Ghost are one
  man comes in Christine's account on the roof: "Now that we know that Erik is
  not a ghost" ("The House on the Lake", ch. 13). Raoul says it to the
  commissary in ch. 19.

  The world had one record, named Erik, carrying all three names from its first
  appearance — at the masked ball as the Red Death — and its description gave
  away the trap-doors and the ventriloquism. So the Ghost is its own character,
  revealed to be Erik at "The House on the Lake"; Erik is the voice, as Christine
  names it; and the records that joined them earlier are rewritten as the reader
  first meets them. Two knowledge facts were set to be learned in chapter 3 —
  the house beyond the lake, and the gunpowder under it, which is the climax —
  and move to the scenes that tell them.

  Run from the repository root: node scripts/names/the-phantom-of-the-opera.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('the-phantom-of-the-opera')
const RED_DEATH = w.scene('phantom-event-10-2', 'The Red Death Descends')
w.scene('phantom-event-11-2', 'The Man Behind the Angel')
const LAKE = w.scene('phantom-event-13-2', 'The House on the Lake')
const UNMASKED = w.scene('phantom-event-13-3', 'The Mask Torn Away')
const BARRELS = w.scene('phantom-event-25-3', 'The Wire to the House')
const ERIK = 'phantom-char-erik'
const GHOST = 'phantom-char-opera-ghost'
const stamp = w.record('characters', ERIK).createdAt

// The Ghost, as the Opera tells of him, revealed to be Erik.
w.add('characters', {
  worldId: 'phantom-opera-world', createdAt: stamp, updatedAt: stamp,
  id: GHOST,
  name: 'The Opera Ghost',
  aliases: ['O.G.'],
  description: 'The ghost the whole Opera talks of: he writes to the managers in red ink and signs himself O.G., keeps Box Five for his own, and is said to have a death’s head for a face.',
  portraitImageId: null, color: null, tags: [], isAlive: true, birthDate: null,
  revealedAs: { characterId: ERIK, eventId: LAKE },
})
const ball = w.record('events', RED_DEATH)
w.set('events', RED_DEATH, 'involvedCharacterIds', ball.involvedCharacterIds,
  ball.involvedCharacterIds.map((id) => (id === ERIK ? GHOST : id)))
w.set('characterSnapshots', 'phantom-snapshot-10-2-erik', 'characterId', ERIK, GHOST)
w.set('characterSnapshots', 'phantom-snapshot-10-2-erik', 'statusNotes',
  'Enters the masquerade as the Red Death to display his power over Christine and the Opera.',
  'Crosses the grand staircase as the Red Death, telling the guests that death walks among them.')
w.set('relationships', 'phantom-relationship-mme-giry-erik', 'characterBId', ERIK, GHOST)

// Erik, as the voice Christine names.
w.set('characters', ERIK, 'aliases', ['The Opera Ghost', 'O.G.', 'The Angel of Music'], ['The Angel of Music'])
w.set('characters', ERIK, 'description',
  'A brilliant architect, composer, ventriloquist, illusionist, and trap-door expert who hides beneath the Opera.',
  'The unseen voice that has taught Christine to sing through her dressing-room wall: the Angel of Music, she believes, that her dying father promised to send her.')
w.set('relationships', 'phantom-relationship-erik-christine', 'label', 'Teacher, captor, and beloved', 'Teacher and pupil')
w.set('relationships', 'phantom-relationship-erik-christine', 'description',
  'Erik teaches Christine through the walls, then tries to compel the love he cannot command.',
  'The voice teaches Christine through her dressing-room wall, and she sings as she has never sung before.')
// "Captor and horrified captive" was dated to the book's first scene; it begins when the mask comes off.
w.set('relationshipSnapshots', 'phantom-relationship-snapshot-2', 'eventId', 'phantom-event-01-1', UNMASKED)
w.set('relationshipSnapshots', 'phantom-relationship-snapshot-2', 'sortKey',
  w.record('relationshipSnapshots', 'phantom-relationship-snapshot-2').sortKey, 13 + 37 / 1_000_000)

// Chapter synopses are on screen from each chapter's first scene.
w.set('chapters', w.record('events', RED_DEATH).chapterId, 'synopsis',
  'At the masked ball, Erik appears as the Red Death and Christine’s engagement ring disappears.',
  'At the masked ball a figure comes as the Red Death, and afterwards Christine’s engagement ring is gone.')
w.set('chapters', w.record('events', LAKE).chapterId, 'synopsis',
  'On the roof, Christine recounts Erik’s underground house and his unmasked face.',
  'On the roof, beneath Apollo’s lyre, Christine tells Raoul where the voice took her.')

// Chapter 11, as its text has it: the voice's name is Raoul's to say, and the cellars are chapter 13's.
w.set('events', 'phantom-event-11-2', 'description',
  'Christine admits that the Angel of Music is a man named Erik who carried her below the Opera.',
  'Raoul warns Christine and Mamma Valerius of a danger worse than any ghost, and Christine refuses to promise him anything.')
w.set('characterSnapshots', 'phantom-snapshot-11-2-christine', 'statusNotes',
  'Names Erik at last and distinguishes the genius she heard from the jailer she came to fear.',
  'Refuses Raoul’s protection, and will not promise to stay.')

// The papers that tell the story are found in the prologue, before anyone is named.
w.set('items', 'phantom-item-persian-papers', 'description',
  'Documents and testimony that preserve the hidden history of Erik and the Opera.',
  'Documents and testimony that preserve the hidden history of the Opera ghost.')

// Knowledge, learned where the book tells it.
w.set('knowledgeFacts', 'phantom-fact-lake-house', 'readerLearnsAtEventId', 'phantom-event-03-1', LAKE)
w.set('knowledgeFacts', 'phantom-fact-powder', 'readerLearnsAtEventId', 'phantom-event-03-1', BARRELS)

w.save()
