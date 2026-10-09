/*
  The Count of Monte Cristo — the names Dantès wears, the titles his enemies buy, and Andrea Cavalcanti.

  Dumas stops calling his hero Dantès after chapter 28. He is the Englishman
  of Thomson and French, then "Sinbad the Sailor" to Franz on the island
  ("Franz Dines with Sinbad", ch. 31), then "the count" from Rome on
  ("Franz and Albert Reach Rome", ch. 33). The reader is never deceived — the
  abbé who visits Caderousse and the lord who buys a house in Marseille are
  plainly him (Lord Wilmore is "the name and title inscribed on his passport",
  ch. 25) — so those are names learned where they are worn, and the world
  already sets him in those scenes' casts.

  His enemies are renamed in one breath, by Caderousse to the abbé ("Caderousse
  Names the Guilty", ch. 27): Fernand is "the Comte de Morcerf", Mercédès
  "Madame de Morcerf", and Danglars "the Baron Danglars".

  Andrea Cavalcanti is the one real secret. He arrives in Paris as a hired son
  ("Andrea Meets His Purchased Father", ch. 56), and Bertuccio, seeing him at
  the Auteuil dinner, mutters "Benedetto? … fatality!" ("Auteuil Fills with
  Ghosts", ch. 62) — the infant he dug from Villefort's garden. The world had one
  record, named Benedetto, standing in Andrea's first scene, with Bertuccio's
  note there already reading "recognizes Benedetto beneath fashionable
  clothes". So Andrea is his own character, revealed to be Benedetto at Auteuil.

  Run from the repository root: node scripts/names/the-count-of-monte-cristo.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('the-count-of-monte-cristo')
const WILMORE = w.scene('count-of-monte-cristo-event-033', 'A New Fortune Moves in Secret')
const BUSONI = w.scene('count-of-monte-cristo-event-034', 'Busoni Tests Caderousse')
const GUILTY = w.scene('count-of-monte-cristo-event-035', 'Caderousse Names the Guilty')
const SINBAD = w.scene('count-of-monte-cristo-event-040', 'Franz Dines with Sinbad')
const ROME = w.scene('count-of-monte-cristo-event-042', 'Franz and Albert Reach Rome')
const PURCHASED = w.scene('count-of-monte-cristo-event-071', 'Andrea Meets His Purchased Father')
const AUTEUIL = w.scene('count-of-monte-cristo-event-078', 'Auteuil Fills with Ghosts')
const EDMOND = 'count-of-monte-cristo-char-edmond'
const BENEDETTO = 'count-of-monte-cristo-char-andrea'
const ANDREA = 'count-of-monte-cristo-char-andrea-cavalcanti'
const stamp = w.record('characters', BENEDETTO).createdAt

// Dantès, and the names he goes by.
w.set('characters', EDMOND, 'nameChanges', undefined,
  [{ eventId: SINBAD, name: 'Sinbad the Sailor' }, { eventId: ROME, name: 'The Count of Monte Cristo' }])
w.set('characters', EDMOND, 'aliases', [], ['Edmond Dantès', 'Lord Wilmore', 'Abbé Busoni'])
w.set('characters', EDMOND, 'aliasesFrom', undefined,
  [{ alias: 'Lord Wilmore', eventId: WILMORE }, { alias: 'Abbé Busoni', eventId: BUSONI }])

// The titles, as Caderousse tells them.
w.set('characters', 'count-of-monte-cristo-char-fernand', 'nameChanges', undefined, [{ eventId: GUILTY, name: 'The Count de Morcerf' }])
w.set('characters', 'count-of-monte-cristo-char-fernand', 'aliases', [], ['Fernand'])
w.set('characters', 'count-of-monte-cristo-char-mercedes', 'nameChanges', undefined, [{ eventId: GUILTY, name: 'Mercédès, Madame de Morcerf' }])
w.set('characters', 'count-of-monte-cristo-char-danglars', 'nameChanges', undefined, [{ eventId: GUILTY, name: 'Baron Danglars' }])
// Listed from the start, so it names the house and not the man until Caderousse does.
w.set('factions', 'count-of-monte-cristo-faction-morcerf-house', 'description',
  'The title and fortune built around Fernand’s military career, Mercédès’s memory, and Albert’s inherited honour.',
  'A count’s house in Paris, peer of France: his military title and fortune, his countess, and their son Albert’s inherited honour.')

// Andrea Cavalcanti, as Paris meets him, revealed to be Benedetto.
w.add('characters', {
  worldId: 'count-of-monte-cristo-world', createdAt: stamp, updatedAt: stamp,
  id: ANDREA,
  name: 'Andrea Cavalcanti',
  aliases: [],
  description: 'A handsome, newly dressed young man of about twenty-one, presented at the count’s house as the long-lost son of Major Cavalcanti, and very easy in the part.',
  portraitImageId: null, color: null, tags: [], isAlive: true, birthDate: null,
  revealedAs: { characterId: BENEDETTO, eventId: AUTEUIL },
})
const first = w.record('events', PURCHASED)
w.set('events', PURCHASED, 'involvedCharacterIds', first.involvedCharacterIds,
  first.involvedCharacterIds.map((id) => (id === BENEDETTO ? ANDREA : id)))
w.set('characterSnapshots', 'count-of-monte-cristo-snapshot-071-andrea', 'characterId', BENEDETTO, ANDREA)
w.set('characterSnapshots', 'count-of-monte-cristo-snapshot-071-edmond', 'statusNotes',
  'Brings two impostors together and confirms that Bertuccio’s recognition will hold.',
  'Brings the hired father and the hired son together, and watches them play their parts.')
w.set('characterSnapshots', 'count-of-monte-cristo-snapshot-071-bertuccio', 'statusNotes',
  'Recognizes Benedetto beneath fashionable clothes and understands his master planned the encounter.',
  'Shows the visitors in and attends to his master’s orders.')

// The thread opens in chapter 43, a chapter before Bertuccio tells his story, and the chapter and scene where Andrea arrives.
w.set('plotThreads', 'count-of-monte-cristo-thread-benedetto', 'name', 'Benedetto’s Identity', 'Bertuccio’s Secret')
w.set('plotThreads', 'count-of-monte-cristo-thread-benedetto', 'description',
  'The rescued infant becomes criminal, false aristocrat, and the public accuser of his father.',
  'Something happened at the count’s new country house that Bertuccio cannot bear to remember.')
for (const [table, id, field] of [['chapters', 'count-of-monte-cristo-chapter-056', 'synopsis'], ['events', PURCHASED, 'description']]) {
  w.set(table, id, field,
    'Benedetto arrives as Andrea Cavalcanti, recognizes Bertuccio, and performs a reunion with the supposed major.',
    'Andrea Cavalcanti arrives at the count’s and performs a reunion with the supposed major.')
}

// The poisoner. The world's own scenes keep her hidden until "The Poisoner Enters" (ch. 101), with
// d'Avrigny naming poison in the house at ch. 75 and Barrois dying at ch. 79; the household's
// faction, threads, place, motif and her own snapshots said it from the Dappled Grays on.
const APPEARS_TO_DIE = w.scene('count-of-monte-cristo-event-128', 'Valentine Appears to Die')
const WAIT_AND_HOPE = w.scene('count-of-monte-cristo-event-149', 'Wait and Hope')
w.set('factions', 'count-of-monte-cristo-faction-villefort-house', 'description',
  'A prosecutor’s family divided by politics, inheritance, hidden paternity, forbidden love, and poison.',
  'A crown prosecutor’s household: his second wife and their son, his paralysed father, and his daughter by his first marriage, with inheritances between them.')
w.set('plotThreads', 'count-of-monte-cristo-thread-poison', 'name', 'The Villefort Poisonings', 'Toxicology')
w.set('plotThreads', 'count-of-monte-cristo-thread-poison', 'description',
  'Inheritance and toxicology turn the prosecutor’s household into a sequence of concealed murders.',
  'Madame de Villefort takes a close interest in the count’s medicines, and in what a dose can do.')
w.set('plotThreads', 'count-of-monte-cristo-thread-redemption', 'description',
  'Édouard’s death forces the Count to abandon divine certainty and choose pardon, patience, and love.',
  'The count believes himself the agent of Providence, rewarding and punishing; the question is how far that right extends.')
w.set('plotThreads', 'count-of-monte-cristo-thread-valentine', 'description',
  'A hidden courtship survives arranged marriage, inheritance conflict, poison, apparent death, and waiting.',
  'A courtship kept secret across a garden gate, against the marriage Valentine’s family has arranged for her.')
const lovers = w.record('relationships', 'count-of-monte-cristo-relationship-valentine-maximilien')
w.set('relationships', lovers.id, 'description',
  'Their garden courtship survives family commands, poison, simulated death, and a final trial of patience.',
  'They meet in secret across the garden gate, against the marriage her family has arranged.')
// What it survives, said where it has survived it.
w.add('relationshipSnapshots', {
  worldId: lovers.worldId, createdAt: lovers.createdAt, updatedAt: lovers.createdAt,
  id: 'count-of-monte-cristo-relationship-snapshot-valentine-maximilien-wait', relationshipId: lovers.id,
  eventId: WAIT_AND_HOPE, sortKey: 117 + 1 / 1_000_000,
  label: lovers.label, strength: lovers.strength, sentiment: lovers.sentiment,
  description: 'Their garden courtship survives family commands, poison, simulated death, and a final trial of patience.', isActive: true,
})
w.set('characterGoals', 'count-of-monte-cristo-goal-12', 'text',
  'Remain loyal to Noirtier while escaping a forced marriage and surviving the household poisoner.',
  'Remain loyal to Noirtier while escaping the marriage her family has arranged.')
w.set('items', 'count-of-monte-cristo-item-brucine', 'description',
  'A carefully measured poison and antidotal regimen at the heart of the Villefort household danger.',
  'A carefully measured mixture of brucine: a medicine in small doses, a poison in large ones.')
w.set('locationMarkers', 'count-of-monte-cristo-loc-villefort-house', 'description',
  'The divided household of prosecutor, poisoner, grandfather, lovers, and endangered heirs.',
  'The divided household of the crown prosecutor, his wife and son, his silent father, and his daughter.')
w.set('motifs', 'count-of-monte-cristo-motif-poison', 'description',
  'The same knowledge can immunize, heal, simulate death, or murder according to measure and intent.',
  'The same knowledge can immunize, heal, or kill according to measure and intent.')
// The lore page sums up all three uses, the last of them in chapter 102.
w.set('lorePages', 'count-of-monte-cristo-lore-page-7', 'visibleFromEventId', 'count-of-monte-cristo-event-066', APPEARS_TO_DIE)
w.set('characters', 'count-of-monte-cristo-char-valentine', 'description',
  'Villefort’s gentle daughter, protected by Noirtier and loved by Maximilien amid a lethal inheritance struggle.',
  'Villefort’s gentle daughter, protected by Noirtier and loved by Maximilien, and heir to her mother’s family fortune.')
w.set('characters', 'count-of-monte-cristo-char-edouard', 'description',
  'The young son whom Héloïse seeks to enrich and whose fate exposes the cost of indiscriminate vengeance.',
  'The spoiled young son of Villefort’s second marriage, on whom his mother dotes.')
w.set('characters', 'count-of-monte-cristo-char-barrois', 'description',
  'Noirtier’s devoted servant and the accidental victim of poison intended for his master.',
  'Noirtier’s devoted old servant, who reads his master’s eyes almost as well as Valentine does.')
w.set('characters', 'count-of-monte-cristo-char-avrigny', 'description',
  'The Villefort family physician who recognizes a pattern of poisoning before the household will face it.',
  'The Villefort family physician, an old friend of the prosecutor’s and a careful observer.')
for (const [id, from, to] of [
  ['066-edmond', 'Displays exact toxicological knowledge and observes how eagerly Héloïse applies it to inheritance.',
    'Displays exact toxicological knowledge and notes how closely Héloïse listens.'],
  ['066-edouard', 'Remains the beneficiary around whom his mother’s calculations turn.',
    'Remains the indulged centre of his mother’s attention.'],
  ['067-edmond', 'Places a dangerous principle before Héloïse without issuing an explicit instruction.',
    'Answers every question Héloïse asks about doses and tolerance.'],
  ['067-heloise', 'Recognizes a method that could protect one intended heir while eliminating others.',
    'Listens to the count’s account of tolerance with more than polite attention.'],
  ['085-heloise', 'Receives guests with the confidence of a household whose inheritances she intends to control.',
    'Receives guests with the composure of the prosecutor’s wife.'],
  ['087-heloise', 'Watches the next obstacle to Édouard’s inheritance weaken.',
    'Attends the household in its trouble with perfect propriety.'],
  ['102-villefort', 'Lets circumstantial logic point toward his daughter because the alternative implicates his wife.',
    'Lets circumstantial logic point toward his own daughter.'],
  ['118-heloise', 'Moves toward the final heir standing between Édouard and the Saint-Méran fortune.',
    'Attends to Valentine in her illness.'],
  ['120-edmond', 'Pushes Villefort toward recognition without yet exposing Héloïse himself.',
    'Pushes Villefort toward seeing what is happening in his own house.'],
  ['120-villefort', 'Understands the likely poisoner but still tries to preserve the family name from public prosecution.',
    'Hears the warning and holds to private justice, wanting no public prosecution of his own house.'],
]) w.set('characterSnapshots', `count-of-monte-cristo-snapshot-${id}`, 'statusNotes', from, to)

w.save()
