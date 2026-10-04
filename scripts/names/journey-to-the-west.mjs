/*
  Journey to the West — four pilgrims and the names the road gives them.

  The book is built on names given: the stone monkey becomes the Handsome Monkey
  King by going through the waterfall (ch. 1), is named Sun Wukong by the
  Patriarch Subhuti (ch. 1), is made Great Sage Equal to Heaven (ch. 4), and
  becomes Pilgrim Sun when the monk lets him out from under the mountain
  (ch. 14). The monk is River Float on the plank (ch. 9), Xuanzang when he goes
  to find his mother at eighteen (ch. 9), and Tripitaka, the Tang Monk, when
  the emperor sends him west (ch. 12). The boar was Marshal of the Heavenly
  Reeds and is named Zhu Wuneng by Guanyin (ch. 8), and Bajie by his master
  (ch. 19); the river general becomes Sha Wujing (ch. 8) and Sha Monk (ch. 22).

  The world listed every one of those names from each pilgrim's first scene.
  They now arrive at the scenes that give them, so a reader at the waterfall
  meets a monkey king, not the Great Sage. This world carries no prose from the
  book; the scenes are its own, following the hundred-chapter text.

  Run from the repository root: node scripts/names/journey-to-the-west.mjs
*/
import { openWorld } from '../lib/world-edit.mjs'

const w = openWorld('journey-to-the-west')
const s = (id, title) => w.scene(id, title)
const BORN = s('jw-event-stone-monkey-born', 'The Stone Egg Splits')
const CROWNED = s('jw-event-waterfall-and-crown', 'Through the Waterfall')
const NAMED = s('jw-event-subhuti-names-him', 'Subhuti Gives Him a Name')
const GREAT_SAGE = s('jw-event-great-sage-titled', 'An Office With No Duties')
const PILGRIM = s('jw-event-seal-peeled', 'The Six Gold Words')
const RIVER_FLOAT = s('jw-event-river-float', 'The Child on the Plank')
const XUANZANG = s('jw-event-mother-found', 'Eighteen Years and a Blood Letter')
const SENT_WEST = s('jw-event-pinch-of-dust', 'A Pinch of Dust in the Wine')
const WUNENG = s('jw-event-zhu-converted', 'Marshal of the Heavenly Reeds')
const BAJIE = s('jw-event-rake-and-oath', 'The Rake and the Oath')
s('jw-event-sha-converted', 'The Curtain-Raising General')
const SHA_MONK = s('jw-event-gourd-and-skulls', 'The Gourd and the Nine Skulls')

w.set('characters', 'jw-character-wukong', 'nameChanges', undefined, [
  { eventId: BORN, name: 'The Stone Monkey' },
  { eventId: CROWNED, name: 'The Handsome Monkey King' },
  { eventId: NAMED, name: 'Sun Wukong' },
])
w.set('characters', 'jw-character-wukong', 'aliasesFrom', undefined, [
  { alias: 'The Handsome Monkey King', eventId: CROWNED },
  { alias: 'Great Sage Equal to Heaven', eventId: GREAT_SAGE },
  { alias: 'Pilgrim Sun', eventId: PILGRIM },
])

w.set('characters', 'jw-character-tripitaka', 'nameChanges', undefined, [
  { eventId: RIVER_FLOAT, name: 'River Float' },
  { eventId: XUANZANG, name: 'Chen Xuanzang' },
  { eventId: SENT_WEST, name: 'Tripitaka' },
])
w.set('characters', 'jw-character-tripitaka', 'aliasesFrom', undefined, [
  { alias: 'River Float', eventId: RIVER_FLOAT },
  { alias: 'Chen Xuanzang', eventId: XUANZANG },
  { alias: 'The Tang Monk', eventId: SENT_WEST },
])

w.set('characters', 'jw-character-zhu-bajie', 'nameChanges', undefined, [
  { eventId: WUNENG, name: 'Zhu Wuneng' },
  { eventId: BAJIE, name: 'Zhu Bajie' },
])

w.set('characters', 'jw-character-sha-wujing', 'aliasesFrom', undefined, [{ alias: 'Sha Monk', eventId: SHA_MONK }])

// Two colophon pages are open from the first scene, and named the pilgrims before the book does.
w.replace('lorePages', 'jw-lore-text-source', 'body',
  /Names are given in the forms an English-language reader is most likely to meet: Tripitaka rather than Xuanzang for the pilgrim, Sun Wukong rather than the Monkey King where both are used\./,
  'Names are given in the forms an English-language reader is most likely to meet, and change where the book changes them.')
w.replace('lorePages', 'jw-lore-pictures', 'body', /showing Sun Wukong with the cudgel/, 'showing the monkey with his cudgel')

w.save()
