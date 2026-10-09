/*
  Dracula — the names the archive gives, as it gives them.

  Mina signs herself "Mina Harker" from Buda-Pesth, married to Jonathan at his
  hospital bedside ("Jonathan in Hospital", ch. 9). Arthur Holmwood is "Lord
  Godalming" once his father dies ("After the Death", ch. 13). The children of
  Hampstead are found wandering with a "bloofer lady" ("The Hampstead Mystery",
  ch. 13), and Van Helsing tells Seward who she is — "They were made by Miss
  Lucy!" ("Van Helsing Reads the Journal", ch. 14). The Count buys 347
  Piccadilly as "Count de Ville" ("Twenty-One Boxes Accounted For", ch. 20).

  The world listed Mina Harker, Lord Godalming and the Bloofer Lady among their
  aliases from each character's first appearance — the last of them telling a
  reader of Lucy's first letter what she would become — and described Lucy as
  "preyed upon by Dracula" from the same letter. The names now arrive where the
  book gives them, and Lucy is described as she writes herself in chapter 5.

  Run from the repository root: node scripts/names/dracula.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('dracula')
const MARRIED = w.scene('dracula-event-26', 'Jonathan in Hospital')
const TITLED = w.scene('dracula-event-38', 'After the Death')
const BLOOFER = w.scene('dracula-event-43', 'Van Helsing Reads the Journal')
const DE_VILLE = w.scene('dracula-event-61', 'Twenty-One Boxes Accounted For')

w.set('characters', 'dracula-char-mina', 'nameChanges', undefined, [{ eventId: MARRIED, name: 'Mina Harker' }])
w.set('characters', 'dracula-char-mina', 'aliasesFrom', undefined, [{ alias: 'Mina Harker', eventId: MARRIED }])
w.set('characters', 'dracula-char-arthur', 'nameChanges', undefined, [{ eventId: TITLED, name: 'Lord Godalming' }])
w.set('characters', 'dracula-char-arthur', 'aliases', ['Lord Godalming'], ['Lord Godalming', 'Arthur Holmwood'])
w.set('characters', 'dracula-char-arthur', 'aliasesFrom', undefined, [{ alias: 'Lord Godalming', eventId: TITLED }])
w.set('characters', 'dracula-char-lucy', 'aliasesFrom', undefined, [{ alias: 'The Bloofer Lady', eventId: BLOOFER }])
w.set('characters', 'dracula-char-lucy', 'description',
  'Mina’s closest friend, desired by three suitors and preyed upon by Dracula.',
  'Mina’s closest friend: lovely, merry, and proposed to by three suitors in a single day.')
w.set('characters', 'dracula-char-dracula', 'aliases', ['The Count'], ['The Count', 'Count de Ville'])
w.set('characters', 'dracula-char-dracula', 'aliasesFrom', undefined, [{ alias: 'Count de Ville', eventId: DE_VILLE }])

// What happens to Lucy, as the archive learns it.
const EMPTY = w.scene('dracula-event-45', 'The Empty Coffin')
w.set('knowledgeFacts', 'dracula-fact-lucy-undead', 'readerLearnsAtEventId', 'dracula-event-38', EMPTY)
w.set('characterSnapshots', 'dracula-snapshot-40-van-helsing', 'statusNotes',
  'Recognizes the attacks as evidence of Lucy’s undead activity.',
  'Reads the Hampstead story closely, and keeps what he makes of it to himself.')
const prey = w.record('relationships', 'dracula-relationship-9')
w.set('relationships', 'dracula-relationship-9', 'description',
  'Dracula repeatedly feeds on Lucy and turns her into an undead predator.',
  'Something dark bends over Lucy on the churchyard seat, and from then on her strength fails.')
w.add('relationshipSnapshots', {
  worldId: prey.worldId, createdAt: prey.createdAt, updatedAt: prey.createdAt,
  id: 'dracula-relationship-9-snapshot-undead', relationshipId: 'dracula-relationship-9', eventId: EMPTY, sortKey: 15 + 1 / 1_000_000,
  label: 'Predator and Victim', strength: prey.strength, sentiment: prey.sentiment,
  description: 'Dracula repeatedly feeds on Lucy and turns her into an undead predator.', isActive: true,
})

// "Lord Godalming" is his father until chapter 13.
w.set('characters', 'dracula-char-arthur', 'description',
  'Lucy’s fiancé and heir to Lord Godalming, steady where his friends are clever.',
  'Lucy’s fiancé, only son of an ailing lord, steady where his friends are clever.')

w.save()
