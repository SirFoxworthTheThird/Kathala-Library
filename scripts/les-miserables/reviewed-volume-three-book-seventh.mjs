const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'exposition', ...extra,
})

export const volumeThreeBookSeventhReview = [
  [197, [
    part('start', 'The Work Beneath Society', 'Hugo imagines intellectual, religious and revolutionary labor as excavations beneath the social order.', null,
      'Paragraphs 0–6 sustain a social metaphor across different centuries. Rousseau and Diogenes sharing tools, Calvin attacking Socinius and thinkers occupying galleries do not create literal meetings or a traversable mine.'),
    part(7, 'The Last Mine', 'The image descends beyond disinterested reform toward an abyss without light.', null,
      'Paragraphs 7–11 distinguish the last level of the argument. Starry and shadowy eyes are moral images, not supernatural traits or medical evidence; the abyss is not a new physical map location.'),
  ]],
  [198, [
    part('start', 'Ignorance and the Cavern of Crime', 'The narrator contrasts predatory self-interest with the political idealism previously described.', null,
      'Paragraphs 0–5 explicitly relate the metaphor back to Book Fourth. Dragons, Satan, spectres and the cavern describe social conditions and crime, not transformations or an underground gathering.'),
    part(6, 'Light Against Darkness', 'The digression argues that education and social improvement must remove the conditions that sustain crime.', null,
      'Paragraphs 6–8 conclude the social argument. The claim is the narrator’s thesis, not a demonstrated cure of particular offenders or a prophecy assigned to the student group.'),
  ]],
  [199, [
    part('start', 'The Four Men', 'The narrator introduces the quartet associated with Parisian crime between 1830 and 1835 and describes Gueulemer.', 'paris',
      'Paragraphs 0–1 are a roster and portrait, not a shared crime scene. Gueulemer’s creole origin is a belief and his connection to Brune is probable, not confirmed. Marble muscles and Hercules describe a human body figuratively.', { mentioned: ['claquesous', 'gueulemer', 'babet', 'montparnasse'], timeHint: 'Retrospective span 1830–1835' }),
    part(2, 'Babet’s Former Trades', 'Babet’s fairground performances, tooth pulling and lost family precede his move into Parisian crime.', null,
      'Paragraphs 2–3 combine biography, a poster and a remembered newspaper reaction. Declaring himself a chemist and advertising academy membership are claims; lost contact does not prove wife and children dead. The calf-faced birth is a newspaper report, not an observed child.', { kind: 'reported', mentioned: ['babet'] }),
    part(4, 'The Masked Voice', 'Claquesous hides his face, whereabouts and true name while using ventriloquism with his accomplices.', null,
      'Paragraph 4 leaves the real identity and refuge unknown. Emerging from earth and vanishing into air are comparisons, not teleportation. Claquesous is explicitly a sobriquet without a new resolved identity.', { mentioned: ['claquesous'] }),
    part(5, 'Montparnasse’s Elegance', 'A young robber’s fixation on dress accompanies an already violent history.', null,
      'Paragraphs 5–6 characterize a youth under twenty and recall murders by eighteen. Unnamed victims are not assigned new individual death records here; Cain and Abel are analogies, not his identities or kin.', { mentioned: ['montparnasse'] }),
  ]],
  [200, [
    part('start', 'The Association Called Patron-Minette', 'The four men combine disguises, hired accomplices and nightly planning into a criminal enterprise.', 'salpetriere-adjoining-plains',
      'Paragraphs 0–4 describe repeated practice and explain the collective name, with a separate prison anecdote about Lacenaire. Four heads, Proteus and phantoms are metaphors; the four remain distinct men rather than a shapeshifting individual.', { mentioned: ['babet', 'gueulemer', 'claquesous', 'montparnasse'] }),
    part(5, 'Names in the Network', 'A list records associates and aliases within the wider criminal network.', null,
      'Paragraphs 5–25 are a roster, not one assembled cast. Panchaud/Printanier/Bigrenaille, Fauntleroy/Bouquetière and the other explicit aliases must not become separate people. Brujon denotes a dynasty without resolving every generation; Boulatruelle is the road-mender already introduced.', { mentioned: ['boulatruelle'] }),
    part(26, 'The People Behind the Spectres', 'The narrator describes daytime refuges and recurring predation, then calls again for light below society.', 'paris',
      'Paragraphs 26–30 mix repeated habits and social argument. Quarries, kilns and sewers are alternative refuges, not a proven connected route. The type’s survival does not resurrect dead individuals, and mist, bats and night are images rather than species changes.'),
  ]],
]
