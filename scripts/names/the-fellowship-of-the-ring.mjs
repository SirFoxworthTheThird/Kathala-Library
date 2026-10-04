/*
  The Fellowship of the Ring — Strider, then Aragorn, and Elessar in Lórien.

  At Bree the hobbits meet a Ranger the locals call Strider ("The Common Room",
  ch. 9). Gandalf's letter, delivered late, names him: "All that is gold does not
  glitter… Aragorn" ("Gandalf's Delayed Letter", ch. 10 — the world's own
  knowledge fact puts "Strider is Aragorn, Isildur's heir" there). Galadriel gives
  him the green stone and the name foretold for him, Elessar ("The Gifts of
  Galadriel", ch. 20).

  The world said all of it at Bree: his description was "secretly the heir of
  Isildur", Elessar was listed among his aliases, he was the Rangers'
  "Chieftain", and the Rangers' faction was "led by Aragorn". This is the case
  the name-changes feature was first designed against; the world now uses it.

  This world carries no text from the book (it is in copyright); the scenes
  are the world's own, and the reveal points are the ones its knowledge facts
  already record.

  Run from the repository root: node scripts/names/the-fellowship-of-the-ring.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('the-fellowship-of-the-ring')
const COMMON_ROOM = w.scene('5146c2f3-18d4-482a-a92c-61d0f5e18231', 'The Common Room')
const LETTER = w.scene('f9a72d3e-6184-47b2-9df8-013ac108ea49', 'Gandalf\'s Delayed Letter')
const GIFTS = w.scene('c9e2b1d4-8f5a-4376-90a1-5d6b8c7e2f3a', 'The Gifts of Galadriel')
const ARAGORN = 'char_aragorn_strider'

w.set('characters', ARAGORN, 'nameChanges', undefined,
  [{ eventId: COMMON_ROOM, name: 'Strider' }, { eventId: LETTER, name: 'Aragorn' }])
w.set('characters', ARAGORN, 'aliasesFrom', undefined, [{ alias: 'Elessar', eventId: GIFTS }])
w.set('characters', ARAGORN, 'description',
  'A Ranger of the North, secretly the heir of Isildur.',
  'A strange-looking, weather-beaten Man in a dark-green cloak, sitting in the shadows of the Prancing Pony with his boots up, watching the hobbits: one of the Rangers who wander the wild, whom Bree calls Strider.')

w.set('factions', 'lotr-faction-rangers', 'description',
  'Dúnedain guardians of Eriador led by Aragorn.',
  'Dúnedain guardians of Eriador, whom the Bree-folk know only as wandering Rangers.')
w.set('factionMemberships', 'lotr-fm-rangers-char_aragorn_strider', 'startEventId', null, LETTER)
w.set('lorePages', 'lotr-lore-bree', 'body',
  'Crossroads settlement where hobbits and Men live together and Frodo first meets Aragorn.',
  'Crossroads settlement where hobbits and Men live together and Frodo first meets Strider.')

// Chapter 10's synopsis is on screen from its first scene, one before the letter.
w.set('chapters', 'chap_10_strider', 'synopsis',
  'Strider speaks to the Hobbits in their parlor, offering his protection and guidance. Barliman Butterbur remembers to deliver a letter from Gandalf, which confirms Strider\'s true identity as Aragorn. Merry rushes in with news that Black Riders are in Bree. The group decides to accept Strider\'s help and prepares to depart secretly.',
  'Strider speaks to the Hobbits in their parlor, offering his protection and guidance. Barliman Butterbur remembers to deliver a long-delayed letter from Gandalf, which vouches for Strider. Merry rushes in with news that Black Riders are in Bree. The group decides to accept Strider\'s help and prepares to depart secretly.')

w.save()
