/*
  Kidnapped — Alan Breck, called Mr Thomson.

  Telling his story to the lawyer, David names Alan, and Mr Rankeillor, who is
  "somewhat dull of hearing", proposes "We will call your friend, if you
  please, Mr. Thomson" — and through the rest of the story Alan is Mr Thomson
  ("A Plan for Proof", ch. 27). The name is the joke and the safety both: Alan
  is a wanted man. It is now an alias learned there, so a reader who meets
  "Mr Thomson" afterwards finds Alan under it.

  Run from the repository root: node scripts/names/kidnapped.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('kidnapped')
const CALLED = w.scene('kid-event-27-3', 'A Plan for Proof')

w.set('characters', 'kid-char-alan', 'aliases', [], ['Mr Thomson'])
w.set('characters', 'kid-char-alan', 'aliasesFrom', undefined, [{ alias: 'Mr Thomson', eventId: CALLED }])

w.save()
