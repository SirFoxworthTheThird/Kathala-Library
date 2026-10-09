/*
  Hyde is Jekyll — from the scene the book says so, and not before.

  Kathala can now say that one character is revealed to be another
  (`revealedAs`, on the one revealed): before the scene a reader sees two
  people; from it, each page names the other. This book is why that exists, and
  until now it could not use it, because it said so already — on page one:
  Hyde's description was "Jekyll's liberated secondary identity", the relationship
  between them was "Two identities in one body" from the moment both had been
  met, and the world description ended on the answer. EX-401 and EX-405, both.

  So this does two things. It gives Hyde the link, at "Hyde Becomes Jekyll" —
  the scene the book's own knowledge facts already put the reveal at. And it
  rewrites each record that told the reader earlier, as the reader first meets
  it (EX-405), and true at its own reveal point and no further (EX-407).

  Run from the repository root: node scripts/jekyll-hyde/reveal.mjs
  Each change names the value it replaces, so a record that has moved since is
  an error rather than a silent overwrite, and a second run changes nothing.
*/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const pwkPath = path.join(root, 'library', 'strange-case-of-dr-jekyll-and-mr-hyde.pwk')
const world = JSON.parse(fs.readFileSync(pwkPath, 'utf8'))

const REVEAL = 'jekyll-hyde-event-37' // Chapter 9, "Hyde Becomes Jekyll"
const JEKYLL = 'jekyll-hyde-char-jekyll'
const HYDE = 'jekyll-hyde-char-hyde'

let changed = 0
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)
function set(table, id, field, from, to) {
  const record = table === 'world' ? world.world : world[table].find((r) => r.id === id)
  if (!record) throw new Error(`${table} ${id}: not found`)
  const now = record[field]
  if (same(now, to)) return
  if (!same(now, from)) throw new Error(`${table} ${id}.${field}: expected ${JSON.stringify(from)}, found ${JSON.stringify(now)}`)
  if (to === undefined) delete record[field]
  else record[field] = to
  changed++
}

if (!world.events.some((e) => e.id === REVEAL && e.title === 'Hyde Becomes Jekyll')) {
  throw new Error(`${REVEAL} is no longer "Hyde Becomes Jekyll"`)
}

// The link.
set('characters', HYDE, 'revealedAs', undefined, { characterId: JEKYLL, eventId: REVEAL })

// The world description is the premise, on the dashboard from chapter one (EX-401).
set('world', null, 'description',
  'A London lawyer investigates the disturbing connection between his respected friend Dr Henry Jekyll and the violent Edward Hyde. Wills, locked doors, handwriting, chemical experiments, and delayed confessions reveal that the hunted criminal and the endangered doctor are two identities struggling within one body.',
  'A London lawyer, troubled by a will in which his respected friend Dr Henry Jekyll leaves everything to the violent Edward Hyde, sets out to learn what hold Hyde has over him — through fog, locked doors, letters and sealed testimony.')

// Characters, as the reader first meets them.
set('characters', JEKYLL, 'description',
  'A respected physician who seeks to divide his moral nature by chemical means.',
  'A wealthy, well-liked physician of about fifty, known for his kindness and his dinners, whose will leaves everything to Edward Hyde.')
set('characters', HYDE, 'description',
  'Jekyll’s liberated secondary identity: smaller, younger, violent, and free of social conscience.',
  'A small, plainly dressed young man who walks over a child without breaking step, and whom everyone who meets him loathes on sight without being able to say why.')
set('characters', 'jekyll-hyde-char-lanyon', 'description',
  'A conventional physician and old friend of Jekyll whose certainty collapses after witnessing the transformation.',
  'A hearty, red-faced physician and one of Jekyll’s two oldest friends, who has broken with him over what he calls unscientific balderdash.')

// The relationship between them begins where the reader learns it.
set('relationships', 'jekyll-hyde-relationship-2', 'startEventId', null, REVEAL)
set('relationships', 'jekyll-hyde-relationship-2', 'description',
  'Hyde is created from Jekyll’s divided desires and progressively overpowers him.',
  'Lanyon watches Hyde drink the draught and stand up as Henry Jekyll.')

// Items, as each is first seen.
set('items', 'jekyll-hyde-item-powders', 'description',
  'Measured packets required to prepare the transforming draught.',
  'Paper packets of a white crystalline salt, measured out and kept in the drawer from Jekyll’s cabinet.')
set('items', 'jekyll-hyde-item-salt', 'name', 'The Transforming Salt', 'The Missing Salt')
set('items', 'jekyll-hyde-item-salt', 'description',
  'A chemical salt whose original impurity proves essential to the reaction.',
  'The drug the occupant of the cabinet sends out for again and again, sending back every sample as not the one he wants.')
set('items', 'jekyll-hyde-item-draught', 'name', 'The Transforming Draught', 'The Draught')
set('items', 'jekyll-hyde-item-draught', 'description',
  'The unstable mixture that changes Jekyll into Hyde and, for a time, back again.',
  'The mixture Lanyon’s midnight visitor makes from the powders and the tincture, which brightens, darkens and settles to a watery green.')
set('items', 'jekyll-hyde-item-lanyon-narrative', 'description',
  'Lanyon’s written testimony describing Hyde’s transformation into Jekyll.',
  'Lanyon’s own written account, left sealed for Utterson to read when the time came.')
set('items', 'jekyll-hyde-item-jekyll-statement', 'description',
  'Jekyll’s confession of the experiment, the double life, and the final chemical failure.',
  'A thick packet in Jekyll’s hand, left on the cabinet table and addressed to Utterson.')

// A place.
set('locationMarkers', 'jekyll-hyde-loc-back-door', 'description',
  'The neglected door through which Hyde enters Jekyll’s old dissecting rooms.',
  'A blistered, neglected door in a windowless block on a by-street, with neither bell nor knocker, which the man in Enfield’s story opens with his own key.')

// Motifs: on screen from the first scene that carries them.
set('motifs', 'jekyll-hyde-motif-handwriting', 'description',
  'A supposedly personal mark becomes evidence of shared identity.',
  'A signature vouches for a person: a cheque, a will or a letter is trusted because of whose hand it is in.')
set('motifs', 'jekyll-hyde-motif-double', 'name', 'Doubling and the Mirror Self', 'Hidden Faces')
set('motifs', 'jekyll-hyde-motif-double', 'description',
  'Physical transformation makes Jekyll’s moral division visible.',
  'A respectable surface with something kept behind it: the fine square and the blind back door, a good name and an old sin, a man nobody can describe.')

// A lore category's name is listed from the start, with nothing open under it yet.
set('loreCategories', 'jekyll-hyde-lore-category-duality', 'name', 'Duality and Identity', 'Jekyll and Hyde')

// Factions are shown from the start.
set('factions', 'jekyll-hyde-faction-hyde-world', 'description',
  'The rooms, financial identity, and permissions created to shelter Hyde.',
  'The Soho rooms, the bank account and the keys by which Hyde comes and goes.')
set('factionMemberships', 'jekyll-hyde-membership-12', 'role', 'Secret identity and lodger', 'Lodger')

// Chapter 9's synopsis is there from its first scene, three before the reveal.
set('chapters', 'jekyll-hyde-chapter-lanyon-narrative', 'synopsis',
  'Lanyon explains how Hyde collected the drawer and transformed into Jekyll before him.',
  'Lanyon’s sealed account of Jekyll’s urgent letter, the drawer fetched from the cabinet, and the visitor who comes for it at midnight.')

/*
  Lore and knowledge, true at their own reveal point (EX-407), written to the
  reader (EX-010). The first page keeps its title: it is the one that answers
  why a reader sees two character pages for one man, and
  tests/libraryLoreVoice.test.ts holds on to it by that name.
*/
set('lorePages', 'jekyll-hyde-lore-1', 'visibleFromEventId', 'jekyll-hyde-event-34', REVEAL)
set('lorePages', 'jekyll-hyde-lore-1', 'body',
  'This world models Jekyll and Hyde as separate character records so snapshots, knowledge, and relationships can show which identity is manifest at an event. The relationship between them records their shared body.',
  'In Lanyon’s consulting room the midnight visitor drinks the draught and stands up as Henry Jekyll. Stevenson has kept the two apart for eight chapters — two men, two addresses, two hands, and a will that joins them only by money — and they keep a page each here for the same reason: each is the man as the people around him saw him, Hyde in Soho and Jekyll in his square. From this scene on, each page names the other. Jekyll’s own statement, which follows, tells how.')
set('lorePages', 'jekyll-hyde-lore-8', 'body',
  'Guest recognizes that Hyde’s hand and Jekyll’s hand share their structure. The clue approaches the truth while still allowing Utterson to imagine forgery.',
  'Guest sets Jekyll’s note beside the letter signed by Hyde and finds the two hands alike in everything but slope. Utterson draws the only conclusion open to him: Henry Jekyll has forged a letter for a murderer.')
set('knowledgeFacts', 'jekyll-hyde-fact-letter', 'description',
  'The handwriting comparison reveals Jekyll’s role in constructing Hyde’s documents.',
  'Guest’s comparison shows the letter signed by Hyde is in Jekyll’s own hand, sloped the other way.')
set('knowledgeFacts', 'jekyll-hyde-fact-same', 'description',
  'Jekyll created Hyde by chemically separating his divided nature.',
  'Hyde and Jekyll are not two men in league: they are one man.')

// Scene notes, true at their own scene.
set('characterSnapshots', 'jekyll-hyde-snapshot-19-jekyll', 'statusNotes',
  'Uses the forged document to separate his public identity from Hyde’s crime.',
  'Produces a letter signed by Hyde, swears he has done with him, and leaves Utterson to judge whether the police should see it.')
set('characterSnapshots', 'jekyll-hyde-snapshot-27-jekyll', 'statusNotes',
  'Feels an involuntary transformation beginning and cuts off the witnesses.',
  'Breaks off mid-sentence with a look of abject terror, and the window is shut on his friends.')
set('characterSnapshots', 'jekyll-hyde-snapshot-30-hyde', 'statusNotes',
  'Trapped, failing to reverse the transformation, and searching frantically for the original salt.',
  'Shut in the cabinet, pacing night and day, sending out for a drug that no chemist’s sample matches.')
set('characterSnapshots', 'jekyll-hyde-snapshot-36-hyde', 'statusNotes',
  'Trembling with urgency and relief as he prepares the restoring draught.',
  'Trembling with impatience, then relief, as he measures the powders into the tincture.')

fs.writeFileSync(pwkPath, `${JSON.stringify(world, null, 2)}\n`)
console.log(`${changed} change${changed === 1 ? '' : 's'}`)
