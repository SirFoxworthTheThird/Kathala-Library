/*
  The Wonderful Wizard of Oz — a name the book does not give, and a secret it keeps until the screen falls.

  "Oscar Diggs" was listed among the Wizard's aliases. It is not in this book:
  the whole text never names him, and the man behind the screen says only that
  he "was born in Omaha" ("A Balloonist from Omaha", ch. 15). The name comes
  from Baum's later Oz books. It is removed (EX-001).

  And the world told a reader of chapter 11, when Dorothy first stands before
  the great Head, that he was a humbug: the relationship between them was
  "petitioner and humbug", and his fear was "being found out as a very ordinary
  man". The screen goes over in chapter 15 ("The Screen Goes Over"). The
  relationship is a petitioner and a wizard until then, and his fear is the one
  the city can see.

  Run from the repository root: node scripts/names/the-wonderful-wizard-of-oz.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('the-wonderful-wizard-of-oz')
w.scene('oz-event-dorothy-and-the-head', w.record('events', 'oz-event-dorothy-and-the-head').title)
const SCREEN = w.scene('oz-event-behind-the-screen', 'The Screen Goes Over')
const DOROTHY_OZ = 'oz-relationship-dorothy-oz'

w.set('characters', 'oz-character-oz', 'aliases', ['Oscar Diggs', 'The Wizard'], ['The Wizard'])

const rel = w.record('relationships', DOROTHY_OZ)
w.set('relationships', DOROTHY_OZ, 'label', 'petitioner and humbug', 'petitioner and wizard')
w.set('relationships', DOROTHY_OZ, 'description',
  'He sets her an impossible price, cannot pay his own side of it, and is forgiven on the grounds that he did try.',
  'He sets her an impossible price: kill the Wicked Witch of the West, and he will send her home.')
w.add('relationshipSnapshots', {
  worldId: rel.worldId, createdAt: rel.createdAt, updatedAt: rel.createdAt,
  id: `${DOROTHY_OZ}-snapshot-humbug`, relationshipId: DOROTHY_OZ, eventId: SCREEN,
  sortKey: 15 + w.record('events', SCREEN).sortOrder / 1_000_000,
  label: 'petitioner and humbug', strength: rel.strength, sentiment: rel.sentiment,
  description: 'He sets her an impossible price, cannot pay his own side of it, and is forgiven on the grounds that he did try.',
  isActive: true,
})
w.set('characterGoals', 'oz-goal-oz-secret', 'text',
  'Being found out as a very ordinary man in a city that believes he is a great wizard.',
  'Being seen face to face by anyone, even his own people.')

w.save()
