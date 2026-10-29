const exposition = (title, description, reason) => ({
  at: 'start', title, description, location: null, present: [], reason, kind: 'exposition',
})

export const volumeTwoBookSeventhReview = [
  [130, [exposition('The Convent and the Infinite',
    'The narrator frames the convent as a human attempt to contemplate the infinite while reserving the right to object to it.',
    'The four paragraphs introduce an authorial inquiry. Calling the Infinite the leading personage does not introduce a physically present actor or a new event for the refugees.')]],
  [131, [
    exposition('The Historical Indictment',
      'Hugo argues that institutions once useful can become harmful, describing coercion and confinement in the historical cloister.',
      'Paragraphs 0–5 are polemic and historical comparison, not a single Spanish convent visit. Spectres, embalming and the mystical lover are figurative, not witnessed transformations or encounters.'),
    { at: 6, title: 'The Dungeons at Villers',
      description: 'The narrator recalls seeing submerged cells and an iron necklet in the ruined abbey at Villers.',
      location: 'villers-abbey-dungeons', present: [
        ['narrator-traveller', 'Examines the surviving dungeon openings, water levels and iron necklet at the abbey ruins.'],
      ], reason: 'The final paragraph changes to an explicitly personal observation. No prisoner is present; the surviving structure supports the argument without creating a contemporaneous torture scene.',
      kind: 'scene', timeHint: 'Undated retrospective visit, distinct from the 1824 refuge story' },
  ]],
  [132, [exposition('Respect for a Past That Has Ended',
    'The narrator rejects the restoration of coercive institutions while asking that criticism remain serious and humane.',
    'All eleven paragraphs develop the argument through rhetorical dialogue and images. Fighting phantoms and whitening the heifer do not describe literal plot action; later revolutionary dates are not the fugitives’ present.')]],
  [133, [exposition('Voluntary Community and Its Rights',
    'The argument distinguishes freely chosen communal life from compulsion and turns from association to the question of prayer.',
    'The fifteen paragraphs describe an ideal or possible community, explicitly conditional on consent. Generic brothers and sisters are not a newly assembled cast at Petit-Picpus.')]],
  [134, [exposition('What It Means to Pray',
    'Hugo defines prayer as thought reaching toward the infinite and argues for conscience alongside the rights of man.',
    'The ten paragraphs are metaphysical questions and declarations. The ocean, compass and radiations are analogies, not locations, objects or supernatural acts in the story.')]],
  [135, [exposition('Philosophy Put to Work',
    'The narrator disputes the denial of the infinite and calls for a philosophy that improves human life through faith and love.',
    'The twenty-six paragraphs sustain one philosophical argument. The mole, willing plant, Socrates, Adam and Marcus Aurelius illustrate positions; none is physically present, and communion language creates no literal transformation.')]],
  [136, [exposition('Blame Without Malice',
    'Hugo insists that condemnation of monastic abuses must take sacrifice and the right to live apart seriously.',
    'The nine paragraphs qualify the preceding critique. The comparison of taking the veil to suicide is rhetorical and supplies no individual death or change of state.')]],
  [137, [exposition('The Labor of Contemplation',
    'The essay ends by honoring contemplative devotion while retaining its objections to confinement and religious institutions.',
    'The twenty-four paragraphs close the authorial digression. Thales, Leibnitz and Voltaire are examples, while the frontier between life and death is a metaphor rather than a mapped place or a present burial.')]],
]
