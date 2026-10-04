/*
  Jane Eyre — the woman upstairs, the gypsy, and Jane's cousins, each from the scene that tells them.

  Three things the book withholds and then gives, and the scenes it gives them in:

  - **Bertha.** Mason, bleeding in the third-storey room, can only say "she"
    ("Mason Is Attacked Upstairs", ch. 20); Jane wakes to a stranger tearing her
    veil (ch. 25); Briggs reads the register and Rochester takes them upstairs —
    "Bertha Mason by name" ("Bertha Is Revealed", ch. 26). Until then everyone,
    Jane included, lays it to Grace Poole.
  - **The gypsy.** "One of the old Mother Bunches is in the servants' hall"
    (ch. 18), and she is Rochester, unmasked at the end of "The Gypsy Reads
    Jane" (ch. 19).
  - **The cousins.** "I was christened St. John Eyre Rivers" ("Jane Discovers
    Her Cousins", ch. 33).

  The world told all of it early. Bertha's page — name, "Rochester's wife,
  confined", role "confined wife" — opened at chapter 20; Rochester's own
  description, from the night in Hay Lane, said "whose concealed marriage";
  Grace Poole was "a plausible name for unexplained sounds"; Rochester stood in
  the cast of the gypsy's arrival with a note saying "uses disguise"; and the
  Rivers were "cousins" from the night they took Jane in. Each is rewritten as
  the reader first meets it, Bertha's name changes where the book names her, the
  gypsy is her own character, revealed to be Rochester, and St John's middle name
  arrives with his cousinship.

  Run from the repository root: node scripts/names/jane-eyre.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('jane-eyre')
const FIRST = w.scene('jane-eyre-event-001', 'Jane Reads Behind the Curtain')
w.scene('jane-eyre-event-036', 'The Guests Perform Charades')
const GYPSY_COMES = w.scene('jane-eyre-event-037', 'A Gypsy Is Announced')
const GYPSY_READS = w.scene('jane-eyre-event-038', 'The Gypsy Reads Jane')
w.scene('jane-eyre-event-040', 'Mason Is Attacked Upstairs')
const WEDDING = w.scene('jane-eyre-event-052', 'The Wedding Is Interrupted')
const BERTHA_NAMED = w.scene('jane-eyre-event-053', 'Bertha Is Revealed')
const COUSINS = w.scene('jane-eyre-event-068', 'Jane Discovers Her Cousins')
const ROCHESTER = 'jane-eyre-char-rochester'
const BERTHA = 'jane-eyre-char-bertha'
const GYPSY = 'jane-eyre-char-gypsy'
const stamp = w.record('characters', ROCHESTER).createdAt

// Bertha: unseen, then named.
w.set('characters', BERTHA, 'nameChanges', undefined,
  [{ eventId: FIRST, name: 'The Woman Upstairs' }, { eventId: BERTHA_NAMED, name: 'Bertha Mason' }])
w.set('characters', BERTHA, 'description',
  'Rochester’s wife, confined at Thornfield after years of severe illness and presented through a narrative controlled by those who imprison her.',
  'The unseen attacker in Thornfield’s third-storey room, whom Mason, bleeding, can only call “she”.')
w.set('characterSnapshots', 'jane-eyre-snapshot-040-bertha', 'statusNotes',
  'Breaks through confinement long enough to wound the brother who entered her room.',
  'Falls on the man who has gone into the third-storey room, with a knife and with her teeth.')
w.set('factionMemberships', 'jane-eyre-membership-13', 'role', 'confined wife', 'third-storey occupant')
w.set('characterGoals', 'jane-eyre-goal-10', 'startEventId', 'jane-eyre-event-030', BERTHA_NAMED)
w.set('relationships', 'jane-eyre-relationship-8', 'startEventId', undefined, WEDDING)
w.set('relationships', 'jane-eyre-relationship-15', 'startEventId', undefined, BERTHA_NAMED)

// What Thornfield shows of its third storey before the wedding.
w.set('characters', 'jane-eyre-char-grace', 'description',
  'A well-paid servant whose guarded work on Thornfield’s third floor provides a plausible name for unexplained sounds.',
  'A square-built, plain-faced servant who sews in a room on Thornfield’s third storey, and on whom Mrs Fairfax lays the strange laugh Jane hears there.')
w.set('characterSnapshots', 'jane-eyre-snapshot-031-grace', 'statusNotes',
  'Is named as the culprit while the actual source remains confined above.',
  'Is named as the culprit, and goes on sewing as if nothing had happened.')
w.set('plotThreads', 'jane-eyre-thread-secret', 'description',
  'Unexplained sounds, fire, wounds, and legal testimony disclose the life confined above the household.',
  'A laugh in the third-storey passage, low and joyless, which Mrs Fairfax puts down to Grace Poole.')
w.set('lorePages', 'jane-eyre-lore-page-4', 'body',
  'Public rooms support teaching, hospitality, and courtship; the upper passage supports concealment, paid surveillance, and confinement. The house’s vertical division is moral as well as architectural.',
  'Public rooms serve teaching, hospitality and courtship; the third storey keeps the house’s past — old furniture, narrow passages of black doors, a stillness Jane likens to a corridor in Bluebeard’s castle. The house’s vertical division is moral as well as architectural.')
w.set('locationMarkers', 'jane-eyre-loc-attic', 'description',
  'A locked upper chamber maintained by Grace Poole and hidden from ordinary household life.',
  'A room on the third storey behind a tapestried wall, with an inner door, where Mason is found bleeding in the night.')
w.set('characters', ROCHESTER, 'description',
  'The master of Thornfield, intellectually restless and emotionally forceful, whose concealed marriage makes honesty the condition of any future with Jane.',
  'The master of Thornfield: dark, abrupt and changeable, often away, and given to talking to his governess as to an equal.')

// The gypsy, revealed to be Rochester; and the courtship the county believes in.
w.add('characters', {
  worldId: 'jane-eyre-world', createdAt: stamp, updatedAt: stamp,
  id: GYPSY,
  name: 'The Gypsy',
  aliases: ['Mother Bunches'],
  description: 'An old gypsy woman from the camp on Hay Common, who settles in the library and will not leave until the young ladies have heard their fortunes.',
  portraitImageId: null, color: null, tags: [], isAlive: true, birthDate: null,
  revealedAs: { characterId: ROCHESTER, eventId: GYPSY_READS },
})
const comes = w.record('events', GYPSY_COMES)
w.set('events', GYPSY_COMES, 'involvedCharacterIds', comes.involvedCharacterIds,
  comes.involvedCharacterIds.map((id) => (id === ROCHESTER ? GYPSY : id)))
w.set('characterSnapshots', 'jane-eyre-snapshot-037-rochester', 'characterId', ROCHESTER, GYPSY)
w.set('characterSnapshots', 'jane-eyre-snapshot-037-rochester', 'statusNotes',
  'Uses disguise to question guests without the constraints of his own identity.',
  'Sits by the library fire with a book, and sees the ladies one at a time.')
w.set('events', GYPSY_COMES, 'description',
  'A supposed fortune-teller refuses to leave until the unmarried women hear their futures.',
  'An old gypsy woman refuses to leave until the unmarried women hear their futures.')
w.set('chapters', comes.chapterId, 'synopsis',
  'Rochester and Blanche enact courtship, marriage, and captivity before the assembled company. A supposed fortune-teller refuses to leave until the unmarried women hear their futures.',
  'Rochester and Blanche enact courtship, marriage, and captivity before the assembled company. An old gypsy woman refuses to leave until the unmarried women hear their futures.')
w.set('characterSnapshots', 'jane-eyre-snapshot-036-rochester', 'statusNotes',
  'Uses theatrical roles to cultivate the appearance of an approaching match.',
  'Plays bridegroom to Blanche Ingram in the charades, before the whole company.')
w.set('characters', 'jane-eyre-char-blanche', 'description',
  'An accomplished and status-conscious guest whose apparent courtship with Rochester makes Jane confront class and economic inequality.',
  'A tall, handsome, accomplished guest at Thornfield, whom the whole county expects Rochester to marry.')

// St John Eyre Rivers, and the cousins, from the scene he says so.
w.set('characters', 'jane-eyre-char-st-john', 'nameChanges', undefined,
  [{ eventId: FIRST, name: 'St John Rivers' }, { eventId: COUSINS, name: 'St John Eyre Rivers' }])
const cousins = [
  ['jane-eyre-relationship-11', 'cousins and conflicting partners', 'rescuer, employer and suitor', 'mixed'],
  ['jane-eyre-relationship-12', 'cousins and chosen sisters', 'rescuers and chosen sisters', 'positive'],
  ['jane-eyre-relationship-13', 'cousins and chosen sisters', 'rescuers and chosen sisters', 'positive'],
]
for (const [id, was, now, sentiment] of cousins) {
  w.set('relationships', id, 'label', was, now)
  w.add('relationshipSnapshots', {
    worldId: 'jane-eyre-world', createdAt: stamp, updatedAt: stamp,
    id: `${id}-snapshot-cousins`, relationshipId: id, eventId: COUSINS, sortKey: 33 + 67 / 1_000_000,
    label: was, strength: 5, sentiment, description: '', isActive: true,
  })
}
w.set('knowledgeFacts', 'jane-eyre-fact-rivers-cousins', 'readerLearnsAtEventId', 'jane-eyre-event-067', COUSINS)

// Rochester's side of it: his want, and his proposal, as the reader sees them before the wedding.
w.set('characterGoals', 'jane-eyre-goal-5', 'startEventId', 'jane-eyre-event-023', WEDDING)
w.set('characterSnapshots', 'jane-eyre-snapshot-047-rochester', 'statusNotes',
  'Claims a future with Jane while still concealing the existing marriage that makes the promise impossible.',
  'Asks Jane to marry him, and will hear of no one’s blessing but hers.')
const courtship = [
  ['chapters', 'jane-eyre-chapter-17',
    'Rochester returns with fashionable guests who fill Thornfield with display and hierarchy. Music and conversation make the apparent courtship public while Jane measures affection against performance.',
    'Rochester returns with fashionable guests who fill Thornfield with display and hierarchy. Music and conversation make the courtship public while Jane measures affection against performance.'],
  ['events', 'jane-eyre-event-035',
    'Music and conversation make the apparent courtship public while Jane measures affection against performance.',
    'Music and conversation make the courtship public while Jane measures affection against performance.'],
  ['chapters', 'jane-eyre-chapter-22',
    'Rochester waits on the road and turns Jane’s homecoming into an intimate welcome. Jane resumes teaching and evening conversation under the apparent deadline of Rochester’s marriage.',
    'Rochester waits on the road and turns Jane’s homecoming into an intimate welcome. Jane resumes teaching and evening conversation with Rochester’s marriage to Blanche expected any day.'],
  ['events', 'jane-eyre-event-045',
    'Jane resumes teaching and evening conversation under the apparent deadline of Rochester’s marriage.',
    'Jane resumes teaching and evening conversation with Rochester’s marriage to Blanche expected any day.'],
]
for (const [table, id, was, now] of courtship) w.set(table, id, table === 'chapters' ? 'synopsis' : 'description', was, now)

// Chapter 33's synopsis is on screen from its first scene, one before the cousins.
w.set('chapters', 'jane-eyre-chapter-33', 'synopsis',
  'A torn scrap of paper connects Jane Elliott with the heiress sought by Briggs. John Eyre’s fortune belongs to Jane, and the Rivers siblings are revealed as her relatives.',
  'A torn scrap of paper connects Jane Elliott with the heiress sought by Briggs. John Eyre’s fortune belongs to Jane, and St John has more to tell her.')

w.save()
