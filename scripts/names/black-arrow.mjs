/*
  The Black Arrow — Jack Matcham is Joanna Sedley.

  Dick meets a slight young traveller fleeing Sir Daniel, who gives his name as
  Jack Matcham ("Matcham Asks the Way", ch. 2). Sir Daniel's search for his
  runaway ward — "John! Joanna! … Boy, then, dotard!" — is the book's hint; the
  answer comes at the Moat House, when Sir Daniel's household is shouting for
  Joanna and Matcham owns the name ("Joanna Names Herself", ch. 11, where the
  world's own knowledge fact puts it).

  The world kept them as two characters, as the book presents them, with
  nothing joining them. Now Matcham is revealed to be Joanna there. The world
  already introduces Joanna, Lord Foxham and Richard of Gloucester only at the
  scenes that name them, and keeps Sir Daniel out of the leper's scenes until
  he throws back his hood, so nothing else needed rewriting; Matcham's
  description loses the word "ward", which was Sir Daniel's search, not Dick's
  meeting.

  Run from the repository root: node scripts/names/black-arrow.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('black-arrow')
w.scene('black-arrow-event-2-3', 'Matcham Asks the Way')
const NAMED = w.scene('black-arrow-event-11-5', 'Joanna Names Herself')

w.set('characters', 'black-arrow-char-jack-matcham', 'revealedAs', undefined,
  { characterId: 'black-arrow-char-joanna-sedley', eventId: NAMED })
w.set('characters', 'black-arrow-char-jack-matcham', 'description',
  'A slight young ward travelling in fear of Sir Daniel and asking Dick for help through the fen.',
  'A slight young traveller in fear of Sir Daniel, who asks Dick for help through the fen.')

w.save()
