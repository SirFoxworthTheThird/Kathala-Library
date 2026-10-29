import { canonicalCharacterKey } from './character-ledger.mjs'

// Source-reviewed changes of identity key for the reader-facing projection.
// The original boundary ledger uses editorial actor keys in these passages.
// Do not expose those keys as already-known identities before the named cut.
export const identityMasks = [
  { chapter: 89, before: 60, actor: 'thenardier', identity: 'waterloo-prowler',
    reason: 'The prowler first says Thénardier at paragraph 60.' },
  { chapter: 89, before: 60, actor: 'pontmercy', identity: 'waterloo-wounded-officer',
    reason: 'The officer first says Pontmercy at paragraph 61, within the cut at 60.' },
  ...[97, 98, 99, 100, 101, 102].map(chapter => ({
    chapter, before: Infinity, actor: 'valjean', identity: 'montfermeil-yellow-stranger',
    reason: 'The narrator postpones confirmation of the yellow-coated stranger until chapter 103 paragraph 0.',
  })),
  { chapter: 117, before: 17, actor: 'fauchelevent', identity: 'petit-picpus-bell-man',
    reason: 'Valjean recognizes the gardener only when moonlight reveals his profile at paragraph 17.' },
]

// These source annotations concern a known person receiving a label, a cover
// story, or a name already printed in the chapter heading. They are not
// separately embodied strangers and must not create duplicate roster records.
export const knownPersonLabels = [
  { identity: 'four-petitions-signer', character: 'jondrette', chapter: 204, at: 'start',
    name: 'The writer of the petitions', reason: 'An attribution of handwriting and fictitious signatures, not a separately embodied stranger. The source identifies the writer as Jondrette; the item discovery records that attribution.' },
  { identity: 'convict-9430', character: 'valjean', chapter: 90, at: 9,
    name: '9,430', reason: 'The chapter starts by naming Jean Valjean and explains his changed prison number.' },
  { identity: 'ultime-fauchelevent-cover', character: 'valjean', chapter: 145, at: 8,
    name: 'Ultime Fauchelevent', reason: 'The reader follows Valjean through the convent admission and knows this is his cover name.' },
  { identity: 'boulevard-temple-neglected-boy', character: 'gavroche', chapter: 159, at: 'start',
    name: 'Little Gavroche', reason: 'The source chapter heading already gives his name before the opening description.' },
  { identity: 'brigand-of-the-loire', character: 'pontmercy', chapter: 169, at: 2,
    name: 'Brigand of the Loire', reason: 'The title is a hostile family description explained within the colonel’s biography.' },
  { identity: 'laigle-de-meaux', character: 'bossuet', chapter: 176, at: 28,
    name: 'Laigle', reason: 'Chapter 176 already explains Lesgle, Légle, Laigle and Bossuet as usages for the same man.' },
  { identity: 'plumet-handsome-lancer', character: 'theodule', chapter: 243, at: 'start',
    name: 'Théodule', reason: 'The narrator names the officer inside his first descriptive segment; Cosette does not learn his family connection.' },
]

// Additional explicit confirmations found in the second pass. Each point is
// inside its existing source segment; recognition by a character is not assumed
// to be reciprocal, and none of these changes adds offstage physical presence.
export const identityConfirmations = [
  { chapter: 249, at: 'start', identity: 'thenardier-young-son', character: 'gavroche', evidenceParagraph: 6, audience: 'reader' },
  { chapter: 265, at: 'start', identity: 'mabeuf-lane-old-man', character: 'valjean', evidenceParagraph: 0, audience: 'reader' },
  { chapter: 337, at: 11, identity: 'seine-official-pursuer', character: 'javert', evidenceParagraph: 11, audience: 'reader' },
  { chapter: 337, at: 11, identity: 'seine-ragged-fugitive', character: 'thenardier', evidenceParagraph: 11, audience: 'reader' },
  { chapter: 345, at: 8, identity: 'marius-white-haired-inquirer', character: 'valjean', evidenceParagraph: 8, audience: 'reader' },
  { chapter: 363, at: 125, identity: 'carnival-spaniard', character: 'thenardier', evidenceParagraph: 125, audience: 'reader' },
]

export function readerKey(chapter, at, key) {
  key = canonicalCharacterKey(key)
  const paragraph = at === 'start' || at === 'volume' ? -1 : at
  return identityMasks.find(rule => rule.chapter === chapter && paragraph < rule.before && key === rule.actor)?.identity ?? key
}

export function projectReaderIdentities(chapter, row) {
  const key = value => readerKey(chapter, row.at, value)
  const result = { ...row, present: row.present.map(([actor, status]) => [key(actor), status]) }
  if (row.mentioned) result.mentioned = [...new Set(row.mentioned.map(key))]
  if (row.stateChanges) result.stateChanges = row.stateChanges.map(change => ({ ...change, character: key(change.character) }))
  if (row.actorLocations) result.actorLocations = Object.fromEntries(Object.entries(row.actorLocations).map(([actor, location]) => [key(actor), location]))
  if (row.identityReveals) result.identityReveals = row.identityReveals.filter(reveal =>
    !knownPersonLabels.some(label => label.identity === reveal.identity))
  const confirmations = identityConfirmations.filter(reveal => reveal.chapter === chapter && reveal.at === row.at)
    .map(({ chapter: ignoredChapter, at: ignoredAt, ...reveal }) => reveal)
  if (confirmations.length) result.identityReveals = [...(result.identityReveals ?? []), ...confirmations]
  return result
}

export function readerReview(review) {
  return new Map([...review].map(([chapter, rows]) => [chapter, rows.map(row => projectReaderIdentities(chapter, row))]))
}
