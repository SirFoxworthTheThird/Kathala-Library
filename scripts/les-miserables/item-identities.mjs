// The source explicitly identifies the stored clothes as the outfit bought at
// Montfermeil (II.VIII.IX paragraph 2; V.VI.III paragraph 11). These are not
// three separate sets merely because their narrative functions change.
export const sameItemKeys = {
  'cosette-black-outfit': 'cosette-childhood-mourning-clothes',
  'cosette-mourning-clothes': 'cosette-childhood-mourning-clothes',
  'thenardier-tavern-sign': 'jondrette-turned-wooden-panel',
}

export const itemIdentityEvidence = [
  { chapter: 146, evidenceParagraph: 2, keys: ['cosette-black-outfit', 'cosette-mourning-clothes'],
    canonical: 'cosette-childhood-mourning-clothes' },
  { chapter: 352, evidenceParagraph: 11, keys: ['cosette-childhood-mourning-clothes'],
    canonical: 'cosette-childhood-mourning-clothes' },
  { chapter: 219, evidenceParagraph: 24, keys: ['jondrette-turned-wooden-panel', 'thenardier-tavern-sign'],
    canonical: 'jondrette-turned-wooden-panel' },
]

export const canonicalItemKey = key => sameItemKeys[key] ?? key
export function projectItemIdentities(row) {
  return row.items ? { ...row, items: [...new Set(row.items.map(canonicalItemKey))] } : row
}
