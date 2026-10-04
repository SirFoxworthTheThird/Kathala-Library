/*
  Neuromancer — Armitage, and the man he was built over.

  Case meets Armitage as an employer with an unexplained job and money for a new
  nervous system ("Armitage's Offer", ch. 2). He learns who Armitage was — Colonel
  Willis Corto, the survivor of Operation Screaming Fist — when he and the
  Flatline go through the records ("Operation Screaming Fist", ch. 6; the
  world's own knowledge fact is learned there).

  The world gave it at chapter 2: "Colonel Willis Corto" was among his aliases,
  and his description was "a controlled military persona built over the
  traumatized survivor of Operation Screaming Fist". The alias is now learned
  where the fact is, and the description is the man Case meets.

  This world carries no text from the book (it is in copyright).

  Run from the repository root: node scripts/names/neuromancer.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('neuromancer')
const FILES = w.scene('neuromancer-event-corto-files', 'Operation Screaming Fist')
const ARMITAGE = 'neuromancer-char-armitage'

w.set('characters', ARMITAGE, 'aliasesFrom', undefined, [{ alias: 'Colonel Willis Corto', eventId: FILES }])
w.set('characters', ARMITAGE, 'description',
  'A controlled military persona built over the traumatized survivor of Operation Screaming Fist.',
  'A hard, expensive-looking man with a soldier’s bearing and a flat, unreadable gaze, who offers Case a new nervous system for a job he will not explain.')

w.save()
