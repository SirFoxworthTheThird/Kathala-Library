/*
  The Scarlet Pimpernel — Sir Percy is the Pimpernel, from the night Marguerite sees it.

  The book's whole design is that the reader, like Marguerite, takes Sir Percy
  for the fool he plays — the drawl, the cravats, the inane laugh — until she
  finds the ring with the little red flower in his study ("Marguerite Realizes
  Percy Is the Pimpernel", ch. 19, where the world's knowledge fact is learned).

  The world kept the relationships and the League membership back until then,
  but said it everywhere else: the chapter-1 cart and barricade were "Percy's
  disguise" and "Percy's first shown rescue", his notes spoke of "the foppish
  performance that protects his secret identity" and "the very search meant to
  expose him", and his marriage carried "secrecy". Each is rewritten as the room
  sees him, and "The Scarlet Pimpernel" is an alias learned at chapter 19.

  Run from the repository root: node scripts/names/the-scarlet-pimpernel.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('the-scarlet-pimpernel')
const REALISED = w.scene('scarlet-pimpernel-event-021', 'Marguerite Realizes Percy Is the Pimpernel')
const PERCY = 'scarlet-pimpernel-character-percy'

w.set('characters', PERCY, 'aliases', [], ['The Scarlet Pimpernel'])
w.set('characters', PERCY, 'aliasesFrom', undefined, [{ alias: 'The Scarlet Pimpernel', eventId: REALISED }])
w.set('characters', PERCY, 'description',
  'A wealthy English baronet whose extravagant clothes, slow drawl, and apparently empty wit make him a fashionable curiosity; his marriage to Marguerite is visibly strained.',
  'A wealthy English baronet whose extravagant clothes, slow drawl and inane laugh make him a fashionable curiosity; his marriage to Marguerite is visibly strained.')

// Chapter 1's rescue belongs to the Pimpernel, whoever he is.
w.set('items', 'scarlet-pimpernel-item-market-cart', 'description',
  'The cart in which the de Tournays pass the Paris barrier beneath Percy’s disguise and a false threat of illness.',
  'The cart in which the de Tournays pass the Paris barrier beneath the Pimpernel’s disguise and a false threat of illness.')
w.set('locationMarkers', 'scarlet-pimpernel-location-west-barricade', 'description',
  'A guarded Paris gate where carts are searched before the evening closure and Percy’s first shown rescue succeeds by disguise.',
  'A guarded Paris gate where carts are searched before the evening closure and the Pimpernel’s first shown rescue succeeds by disguise.')
w.set('locationMarkers', 'scarlet-pimpernel-location-london-gate', 'description',
  'The English capital where Percy’s fashionable public life conceals the League’s command centre.',
  'The English capital, where the League’s members move in the best society.')

// Sir Percy as the room sees him.
w.set('characterSnapshots', 'scarlet-pimpernel-snapshot-007-percy', 'statusNotes',
  'Deepens the foppish performance that protects his secret identity.',
  'Talks of cravats and waistcoats, and laughs his inane laugh.')
w.set('characterSnapshots', 'scarlet-pimpernel-snapshot-012-percy', 'statusNotes',
  'Sustains his social mask in the centre of the very search meant to expose him.',
  'Moves through the ball as idly as ever, at his wife’s side and at the Prince’s elbow.')
w.set('characterSnapshots', 'scarlet-pimpernel-snapshot-016-percy', 'statusNotes',
  'Uses apparent sleep and social insignificance to pass through the surveillance unseen.',
  'Lies asleep on a sofa in the supper room as one o’clock strikes.')
w.set('characterSnapshots', 'scarlet-pimpernel-snapshot-018-percy', 'statusNotes',
  'Recognizes her sincerity but still protects the League by withholding his identity.',
  'Hears her out in the dawn at Richmond, and answers with a cold bow, though he is moved.')
w.set('characterSnapshots', 'scarlet-pimpernel-snapshot-019-percy', 'statusNotes',
  'Commits to the Calais operation despite knowing Chauvelin may be following.',
  'Leaves Richmond suddenly, before Marguerite can speak to him again.')
for (const [table, id, field, before] of [
  ['chapters', 'scarlet-pimpernel-chapter-14', 'synopsis', 'Marguerite warns Sir Andrew that Chauvelin knows about the meeting, but the message cannot reach the leader in time. '],
  ['events', 'scarlet-pimpernel-event-016', 'description', ''],
]) {
  w.set(table, id, field,
    `${before}At one o’clock Chauvelin watches for the Pimpernel, while Percy appears to sleep through the danger in the supper room.`,
    `${before}At one o’clock Chauvelin watches for the Pimpernel, while Percy sleeps through it in the supper room.`)
}
w.set('relationships', 'scarlet-pimpernel-relationship-percy-marguerite', 'description',
  'Their marriage carries love, secrecy, wounded pride, and the possibility of renewed trust.',
  'Married little more than a year and grown cold: she thinks him a fool, and he seems not to care.')
w.set('relationships', 'scarlet-pimpernel-relationship-percy-prince', 'description',
  'The Prince accepts Percy within the highest social circle, reinforcing the credibility of Percy’s public persona.',
  'The Prince of Wales counts the most fashionable dandy in London among his friends.')

// The scene and chapter summaries around the ball, Richmond and the farewell.
const summaries = [
  ['scarlet-pimpernel-event-007', null,
    'Percy’s clothes, drawl, and apparently empty wit convince the company that he is incapable of serious political action.',
    'Percy’s clothes, drawl and empty wit make him the delight, and the despair, of the company.'],
  ['scarlet-pimpernel-event-018', 'scarlet-pimpernel-chapter-16',
    'Marguerite appeals to Percy for help with Armand and exposes the pain beneath their polished marriage; Percy listens without revealing his secret.',
    'Marguerite appeals to Percy for help with Armand and exposes the pain beneath their polished marriage; Percy hears her out, coldly.'],
  ['scarlet-pimpernel-event-019', 'scarlet-pimpernel-chapter-17',
    'Percy departs on the compromised rescue mission after a restrained farewell that Marguerite does not yet understand.',
    'Percy leaves Richmond suddenly after a restrained farewell that Marguerite does not yet understand.'],
]
for (const [event, chapter, was, now] of summaries) {
  w.set('events', event, 'description', was, now)
  if (chapter) w.set('chapters', chapter, 'synopsis', was, now)
}

w.save()
