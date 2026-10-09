/*
  The Woman in White — the woman on the road, named; and Laura, married.

  Walter meets her at midnight on the London road, dressed all in white, and
  does not learn her name; it reaches him at Limmeridge in Mrs Fairlie's old
  letter about "this poor little Anne Catherick" ("Walter VIII: Laura and the
  Likeness", ch. 8). Laura Fairlie becomes Lady Glyde on the twenty-second of
  December ("Marian II: December 22", ch. 21), and Marian's Blackwater diary
  calls her so from then on.

  The world named Anne from the road and listed Lady Glyde among Laura's
  aliases from her first scene. Anne's description was the whole mystery
  ("her knowledge of Sir Percival's secret connects every part"), and Laura's
  gave away the engagement Walter only learns later. The names now arrive
  where the book gives them, and both are described as Walter first sees them.

  Run from the repository root: node scripts/names/the-woman-in-white.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'
import { readerTexts, sortKeys } from '../lib/reader-gate.mjs'

const w = openWorld('the-woman-in-white')
const FIRST = w.scene('woman-in-white-event-walter-1', 'First Epoch — Walter I: A Case Outside the Law')
const NAMED = w.scene('woman-in-white-event-walter-8', 'Walter VIII: Laura and the Likeness')
const WEDDING = w.scene('woman-in-white-event-marian-2', 'Marian II: December 22')

w.set('characters', 'woman-in-white-character-anne', 'nameChanges', undefined,
  [{ eventId: FIRST, name: 'The Woman in White' }, { eventId: NAMED, name: 'Anne Catherick' }])
w.set('characters', 'woman-in-white-character-anne', 'description',
  'A vulnerable woman whose white clothes, resemblance to Laura, and knowledge of Sir Percival’s secret connect every part of the mystery.',
  'A woman dressed all in white, alone on the London road at midnight, who asks Walter the way, speaks of Limmeridge, and fears a baronet she will not name.')
w.set('characters', 'woman-in-white-character-laura', 'nameChanges', undefined, [{ eventId: WEDDING, name: 'Lady Glyde' }])
w.set('characters', 'woman-in-white-character-laura', 'aliases', ['Lady Glyde'], ['Lady Glyde', 'Laura Fairlie'])
w.set('characters', 'woman-in-white-character-laura', 'aliasesFrom', undefined, [{ alias: 'Lady Glyde', eventId: WEDDING }])
w.set('characters', 'woman-in-white-character-laura', 'description',
  'The gentle heiress of Limmeridge, bound by a promise to marry Sir Percival despite loving Walter and relying deeply on Marian.',
  'The gentle, fair-haired heiress of Limmeridge, Marian’s half-sister and Walter’s pupil, whose face reminds him of someone he cannot place.')

// The premise, and the thread that named the baronet in chapter 4.
w.set('world', null, 'description',
  'Wilkie Collins’s mystery follows drawing master Walter Hartright, sisters Laura Fairlie and Marian Halcombe, and the haunting figure of Anne Catherick through a struggle over identity, marriage, confinement, inheritance, and the authority of written evidence.',
  'Wilkie Collins’s mystery follows drawing master Walter Hartright, sisters Laura Fairlie and Marian Halcombe, and the haunting figure of a woman in white through a struggle over identity, marriage, confinement, inheritance, and the authority of written evidence.')
w.set('plotThreads', 'woman-in-white-thread-secret', 'name', 'Sir Percival’s Secret', 'The Baronet’s Secret')

// Everything else a reader meets before her name: the woman in white.
const named = sortKeys(w.world).get(NAMED)
for (const t of readerTexts(w.world)) {
  if (t.from === undefined || t.from >= named) continue
  w.replace(t.table, t.id, t.field, /\bAnne Catherick\b|\bAnne\b(?!’s face)/g, (_, at, text) =>
    (at === 0 || /[.!?]\s+$/.test(text.slice(0, at)) ? 'The woman in white' : 'the woman in white'))
}

w.set('items', 'woman-in-white-item-white-dress', 'name', 'The woman in white’s White Dress', 'The White Dress')

w.save()
