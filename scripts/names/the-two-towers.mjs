/*
  The Two Towers — Gandalf the White, from "The White Rider".

  In Fangorn the Three Hunters meet an old man in a wide hat whom they take for
  Saruman, until he throws back his grey rags and stands in white ("The White
  Wizard Appears", Book III ch. 5 — the world's knowledge fact "Gandalf has
  returned" is learned there). This world carries no text from the book (it is in
  copyright); the scenes and the reveal point are the world's own.

  The world met him at that scene already, but under the name of the wizard who
  fell in Moria, with "Gandalf the White" as an alias. His name now changes
  there, and "Gandalf the Grey" is what he was. The scene before it,
  "Tracks into Fangorn", carried the reveal scene's description word for word,
  and the chapter's synopsis and a thread named "Gandalf the White" opened on
  it; they now stop at the old man among the trees.

  Run from the repository root: node scripts/names/the-two-towers.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('the-two-towers')
const TRACKS = w.scene('tt-ev-5-tracks-into-fangorn', 'Tracks into Fangorn')
const RETURNED = w.scene('tt-ev-5-the-white-wizard-appears', 'The White Wizard Appears')
const GANDALF = 'Z3WTGGdrOBdao2wIcdWy8'

w.set('characters', GANDALF, 'nameChanges', undefined, [{ eventId: RETURNED, name: 'Gandalf the White' }])
w.set('characters', GANDALF, 'aliases', ['Gandalf the White', 'The White Rider'], ['Gandalf the Grey', 'The White Rider'])

w.set('events', TRACKS, 'description',
  'Tracks into Fangorn. The Three Hunters discover Gandalf returned in white.',
  'Tracks into Fangorn. The Three Hunters follow the hobbits’ trail under the eaves of Fangorn, where an old man in a wide hat is glimpsed among the trees.')
w.set('chapters', 'tt-ch-5', 'synopsis',
  'The Three Hunters discover Gandalf returned in white.',
  'In Fangorn the Three Hunters meet an old man they take for Saruman.')
w.set('plotThreads', 'tt-thread-white', 'name', 'Gandalf the White', 'The White Rider')

w.save()
