// One row per scene cut: primary place, directly present cast, tension.
// Historical figures named in Small's spoken account are not in the Baker
// Street room and receive no frame-scene presence snapshots.
export const codes = {
  H:'Sherlock Holmes', W:'Dr. John Watson', M:'Mary Morstan', U:'Mrs. Hudson',
  A:'Thaddeus Sholto', B:'Bartholomew Sholto', G:'McMurdo', N:'Mrs. Bernstone',
  J:'Athelney Jones', S:'Jonathan Small', O:'The bare-footed accomplice', P:'Mordecai Smith',
  Q:'Mrs. Smith', D:'Mr. Sherman', K:'Toby', V:'Wiggins',
  F:'Mrs. Cecil Forrester', R:'The old sailor',
}
export const meta = [
  [
    ['Baker Street sitting room','H W',2],['Baker Street sitting room','H W',2],
    ['Baker Street sitting room','H W',2],['Baker Street sitting room','H W',3],
    ['Baker Street stair','H W U',2],
  ],
  [
    ['Baker Street sitting room','H W M',2],['Baker Street sitting room','H W M',3],
    ['Baker Street sitting room','H W M',3],['Baker Street sitting room','H W M',4],
    ['Baker Street sitting room','H W M',2],
  ],
  [
    ['Baker Street sitting room','H W',3],['Baker Street sitting room','H W M',3],
    ['Lyceum Theatre','H W M',3],['South London carriage road','H W M',3],
    ['Thaddeus’s house','H W M',4],
  ],
  [
    ['Thaddeus’s house','H W M A',3],['Thaddeus’s house','H W M A',4],
    ['Thaddeus’s house','H W M A',5],['Thaddeus’s house','H W M A',4],
    ['Thaddeus’s house','H W M A',3],['South London carriage road','H W M A',3],
    ['Lodge gate','H W M A',4],
  ],
  [
    ['Lodge gate','H W M A G',3],['Lodge grounds','H W M A',4],
    ['Housekeeper’s room','H W M A N',4],['Upper passage','H W A',5],
    ['Bartholomew’s chamber','H W A B',5],['Bartholomew’s chamber','H W A B',5],
    ['Bartholomew’s chamber','H W A B',5],
  ],
  [
    ['Bartholomew’s chamber','H W B',4],['Lodge roof','H W',4],
    ['Bartholomew’s chamber','H W B',4],['Bartholomew’s chamber','H W J B',4],
    ['Bartholomew’s chamber','H W J A B',4],['Upper passage','H W J',3],
  ],
  [
    ['Camberwell house','W M F',2],['Pinchin Lane','W D K',2],
    ['Lodge grounds','H W K',3],['Bartholomew’s chamber','H W B',3],
    ['Lodge roof','H W',4],['Lodge boundary wall','H W K',3],
    ['South London trail','H W K',3],['Timber yard','H W K',2],
  ],
  [
    ['Timber yard','H W K',2],['Smith’s Wharf','H W K',3],
    ['Smith’s Wharf','H W Q',3],['The Thames','H W',3],
    ['Baker Street sitting room','H W',2],['Baker Street sitting room','H W',2],
    ['Baker Street sitting room','H W U V',3],['Baker Street sitting room','H W',3],
  ],
  [
    ['Baker Street sitting room','H W',3],['Camberwell house','W M F',2],
    ['Baker Street sitting room','H W U',3],['Baker Street sitting room','H W',3],
    ['Baker Street sitting room','H W',3],['Baker Street sitting room','W',2],
    ['Baker Street sitting room','W J',3],['Baker Street sitting room','W J R',4],
    ['Baker Street sitting room','H W J',4],['Baker Street sitting room','H W J',4],
  ],
  [
    ['Baker Street sitting room','H W J',3],['Westminster Stairs','H W J',3],
    ['Police launch','H W J',4],['Police launch','H W J',4],
    ['Police launch','H W J S O P',5],['Police launch','H W J S O P',5],
  ],
  [
    ['Police launch','H W J S',4],['Camberwell house','W M',3],
    ['Camberwell house','W M',4],['Camberwell house','W M',3],
  ],
  [
    ...Array.from({length:15},()=>['Baker Street sitting room','H W J S',3]),
    ['Baker Street sitting room','H W',2],
  ],
]

// Source time is contradictory: the invitation is postmarked 7 July while the
// same outing is called a September evening. This editorial calendar follows
// the witnessed September setting; the discrepancy is explained in Lore.
const chapterClock = [[250.625,.007],[250.67,.009],[250.73,.015],[250.81,.018],
  [250.95,.01],[251.04,.007],[251.09,.023],[251.33,.018],null,
  [253.75,.026],[253.93,.025],[254.05,.009]]
const ninthClock = [251.7,251.75,251.85,252.35,253.20,253.38,253.63,253.65,253.67,253.69]
export function sceneTime(chapterNumber, index) {
  if (chapterNumber === 9) return ninthClock[index]
  const [base, step] = chapterClock[chapterNumber - 1]
  return Number((base + step * index).toFixed(3))
}
