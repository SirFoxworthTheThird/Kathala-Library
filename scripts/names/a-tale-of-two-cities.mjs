/*
  A Tale of Two Cities — the family with no name, the spy with two, and the road-mender's new trade.

  Dickens never names Darnay's family until the letter that draws him back to
  France is addressed "To Monsieur heretofore the Marquis St. Evrémonde" —
  "his own right name" ("Gabelle's Appeal Reaches London", ch. 30). Until then
  his uncle is "Monsieur the Marquis", and on the wedding morning Darnay tells
  Manette his name out of the reader's hearing. The name matters because of the
  paper in the Bastille, which names it in Book Three.

  John Barsad is Miss Pross's lost brother Solomon, recognised in a wine-shop
  ("Miss Pross Recognizes Solomon", ch. 38). The road-mender comes back as the
  wood-sawyer beneath La Force — "he had once been a mender of roads" ("Lucie
  Stands Beneath the Prison Window", ch. 35).

  The world named the family from the Marquis's first scene, in some twenty
  records — among them Manette's Bastille letter as "the Evrémonde crime and
  Manette's curse upon their descendants" from the night it is found, and
  Madame Defarge's goal to "destroy the Evrémonde line" — and listed Barsad's
  and the road-mender's other names from their first appearances. Each is
  rewritten as the reader first meets it, and the names arrive where the book
  gives them.

  Run from the repository root: node scripts/names/a-tale-of-two-cities.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('a-tale-of-two-cities')
const FIRST = w.scene('tale-of-two-cities-event-001', 'Two Nations Approach Crisis')
const NAMED = w.scene('tale-of-two-cities-event-036', 'Gabelle’s Appeal Reaches London')
const WOOD_SAWYER = w.scene('tale-of-two-cities-event-043', 'Lucie Stands Beneath the Prison Window')
const SOLOMON = w.scene('tale-of-two-cities-event-047', 'Miss Pross Recognizes Solomon')

// The names, as the book gives them.
w.set('characters', 'tale-of-two-cities-char-marquis', 'nameChanges', undefined,
  [{ eventId: FIRST, name: 'Monsieur the Marquis' }, { eventId: NAMED, name: 'Marquis St. Evrémonde' }])
w.set('characters', 'tale-of-two-cities-char-darnay', 'aliasesFrom', undefined, [{ alias: 'Charles Evrémonde', eventId: NAMED }])
w.set('characters', 'tale-of-two-cities-char-darnay', 'description',
  'A French aristocrat who renounces his family name and estate but cannot escape the obligations and crimes attached to them.',
  'A young Frenchman tried at the Old Bailey as a spy, who makes his living in England teaching French and keeps his family to himself.')
w.set('characters', 'tale-of-two-cities-char-barsad', 'aliasesFrom', undefined, [{ alias: 'Solomon Pross', eventId: SOLOMON }])
w.set('characters', 'tale-of-two-cities-char-barsad', 'description',
  'A professional spy whose concealed identity and access to the prisons make him vulnerable to Carton’s leverage.',
  'A well-dressed witness against Darnay at the Old Bailey, who turns up wherever there is information to sell.')
w.set('characters', 'tale-of-two-cities-char-road-mender', 'nameChanges', undefined,
  [{ eventId: FIRST, name: 'The Road-Mender' }, { eventId: WOOD_SAWYER, name: 'The Wood-Sawyer' }])
w.set('characters', 'tale-of-two-cities-char-road-mender', 'aliasesFrom', undefined, [{ alias: 'The Wood-Sawyer', eventId: WOOD_SAWYER }])
w.set('characters', 'tale-of-two-cities-char-road-mender', 'description',
  'A village witness transformed into a revolutionary enthusiast and observer beneath La Force.',
  'A mender of roads in a blue cap, from the village below the Marquis’s château, who saw a man clinging beneath the Marquis’s carriage.')

// The family, the estate and the inheritance, without the name the book is keeping.
w.set('factions', 'tale-of-two-cities-faction-evremonde', 'name', 'The Evrémonde Estate', 'The Marquis’s Estate')
w.set('locationMarkers', 'tale-of-two-cities-loc-evremonde-village', 'name', 'Evrémonde Village and Fountain', 'The Marquis’s Village and Fountain')
w.set('locationMarkers', 'tale-of-two-cities-loc-evremonde-chateau', 'name', 'Evrémonde Château', 'The Marquis’s Château')
w.set('items', 'tale-of-two-cities-item-chateau-key', 'name', 'Evrémonde Château Key', 'The Château Key')
w.set('items', 'tale-of-two-cities-item-darnay-letter', 'description',
  'The private declaration by which Charles tells his uncle he rejects the Evrémonde inheritance.',
  'The private declaration by which Charles tells his uncle he rejects the family inheritance.')
w.set('plotThreads', 'tale-of-two-cities-thread-evremonde', 'name', 'The Evrémonde Inheritance', 'The Inheritance Darnay Refuses')
w.set('plotThreads', 'tale-of-two-cities-thread-evremonde', 'description',
  'Darnay rejects privilege but remains answerable to crimes committed through his family name.',
  'Darnay rejects his uncle’s estate, and the privilege and fear it rests on.')
w.set('events', 'tale-of-two-cities-event-018', 'title', 'Darnay Renounces the Evrémonde Inheritance', 'Darnay Renounces His Inheritance')
w.set('knowledgeFacts', 'tale-of-two-cities-fact-darnay-name', 'title', 'Charles Darnay is an Evrémonde', 'Charles Darnay is the Marquis’s nephew')
w.set('characterGoals', 'tale-of-two-cities-goal-4', 'text',
  'Live honestly beyond the Evrémonde estate while answering obligations created by its harm.',
  'Live honestly in England by his own work, apart from his uncle’s estate and the harm it does.')
w.set('characters', 'tale-of-two-cities-char-gabelle', 'description',
  'The Evrémonde estate agent whose endangered appeal draws Darnay back into revolutionary France.',
  'The Marquis’s estate agent, whose endangered appeal draws Darnay back into revolutionary France.')
for (const [table, id, field] of [['events', 'tale-of-two-cities-event-035', 'description'], ['chapters', 'tale-of-two-cities-chapter-029', 'synopsis']]) {
  w.set(table, id, field,
    'Four riders ignite the Evrémonde château while the village refuses to save the building or its symbols.',
    'Four riders ignite the Marquis’s château while the village refuses to save the building or its symbols.')
}

// What the wedding morning, the Bastille paper and Madame Defarge's knitting show before Book Three.
w.set('relationships', 'tale-of-two-cities-relationship-darnay-manette', 'description',
  'Manette loves Darnay, and cannot always hear the name Evrémonde without the past coming back.',
  'Manette gives Darnay his daughter, though Darnay’s true name, told him in private, shakes him to the root.')
for (const [table, id, field] of [['events', 'tale-of-two-cities-event-028', 'description'], ['chapters', 'tale-of-two-cities-chapter-023', 'synopsis']]) {
  w.set(table, id, field,
    'On the wedding morning Darnay privately tells Manette that he is an Evrémonde.',
    'On the wedding morning Darnay privately tells Manette his true name, and Manette comes out deadly pale.')
}
w.set('items', 'tale-of-two-cities-item-manette-letter', 'description',
  'The hidden account of the Evrémonde crime and Manette’s curse upon their descendants.',
  'A paper hidden in the chimney of One Hundred and Five, North Tower, found when the Bastille falls.')
w.set('characterGoals', 'tale-of-two-cities-goal-7', 'text',
  'Record and destroy the Evrémonde line and everyone she regards as its continuation.',
  'Knit into her register every name the Revolution will one day call to account.')

// Her enmity is plain from the day she knits his name; its reason is chapter 42's.
const FAMILY = w.scene('tale-of-two-cities-event-052', 'Manette Cannot Find His Saving Self')
const DEFARGE_DARNAY = 'tale-of-two-cities-relationship-madame-defarge-darnay'
const rel = w.record('relationships', DEFARGE_DARNAY)
w.set('relationships', DEFARGE_DARNAY, 'label', 'avenger and inherited enemy', 'knitter and marked man')
w.set('relationships', DEFARGE_DARNAY, 'description',
  'She makes Darnay answer not only for his name but for crimes against her own family.',
  'She knits his name into her register the day she hears of his marriage, and does not forget it.')
w.add('relationshipSnapshots', {
  worldId: rel.worldId, createdAt: rel.createdAt, updatedAt: rel.createdAt,
  id: `${DEFARGE_DARNAY}-snapshot-family`, relationshipId: DEFARGE_DARNAY, eventId: FAMILY, sortKey: 42 + 51 / 1_000_000,
  label: 'avenger and inherited enemy', strength: rel.strength, sentiment: rel.sentiment,
  description: 'She makes Darnay answer not only for his name but for crimes against her own family.',
  isActive: true,
})

w.save()
