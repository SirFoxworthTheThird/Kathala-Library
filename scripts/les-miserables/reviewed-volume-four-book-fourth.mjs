const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'reported', ...extra,
})

export const volumeFourBookFourthReview = [
  [241, [
    part('start', 'The Burn and the Care', 'The morning after the ambush, Valjean’s inflamed arm keeps him home while Cosette tends him.', 'rue-plumet-rear-lodge',
      'Paragraphs 0–7 return from retrospective October to the February visit’s aftermath. The injury is explicitly on the left arm and fever confines him a month. His explanation does not tell Cosette what happened; no doctor is summoned, and renewed happiness does not yet heal the wound.', { mentioned: ['valjean', 'cosette'], items: ['valjean-clothes-valise'] }),
    part(8, 'Spring in the Garden', 'As Valjean convalesces, Cosette resumes her garden walks and the pair recover some happiness.', 'rue-plumet-garden',
      'Paragraphs 8–17 span March into April and repeated short walks. His gratitude to the imprisoned family reflects the healing relationship, not approval of the assault or proof that all danger is gone.', { mentioned: ['valjean', 'cosette'], timeHint: 'March and April after the ambush' }),
    part(18, 'Walking After the Wound Heals', 'Once recovered, Valjean resumes solitary twilight walks.', null,
      'Paragraphs 18–19 explicitly establish healing after convalescence, not immediately after the chisel burn. The next adventure is introduced, not yet witnessed.', { mentioned: ['valjean'] }),
  ]],
  [242, [
    part('start', 'An Apple Intended for Supper', 'Hungry Gavroche approaches Mabeuf’s garden but stops to listen to its distressed household.', 'mabeuf-garden-hedge',
      'Paragraphs 0–11 give an intended fruit theft which has not occurred. Gavroche learns the names by listening; the apples’ comparison with Adam does not make the garden Eden.', { kind: 'scene', present: [
        ['gavroche', 'Stops at the hedge after spotting the old man and housekeeper near his intended entry.'],
        ['mabeuf', 'Remains on the stone bench while his housekeeper calls his name and begins to speak.'],
        ['mother-plutarque', 'Stands before the seated old man and insists on gaining his attention.'],
      ] }),
    part(12, 'No Credit and No Money', 'Mother Plutarque lists rent and food debts while Mabeuf answers with resigned evasions.', 'mabeuf-austerlitz-garden',
      'Paragraphs 12–30 are overheard by Gavroche outside the hedge. Three quarters owed is current; four is the prospective debt in three months. The threat of eviction is not an actual removal, and apples are proposed food, not shown eaten.', { kind: 'scene', present: [
        ['mother-plutarque', 'Reports the landlord’s threat and the tradespeople’s refusal of further credit.'],
        ['mabeuf', 'Admits having no money and suggests the remaining apples.'],
        ['gavroche', 'Listens from outside the hedge and grows thoughtful as he hears how little food remains.'],
      ] }),
    part(31, 'The Watcher Under the Hedge', 'Gavroche abandons the entry and watches two men approach, recognizing Montparnasse behind an old man.', 'mabeuf-garden-lane',
      'Paragraphs 31–44 describe the observer’s position and recognition. He does not know the old pedestrian; identifying him as Valjean is invited later but no explicit name is uttered in this scene.', { kind: 'scene', present: [
        ['gavroche', 'Curls beneath the hedge and notices Montparnasse stalking the older man.'],
        ['montparnasse', 'Regulates his pace behind the elderly pedestrian.'],
        ['mabeuf-lane-old-man', 'Walks slowly along the lane in plain clothing.'],
      ] }),
    part(45, 'The Assailant Underneath', 'Montparnasse attacks but is thrown down and held by his intended victim.', 'mabeuf-garden-lane',
      'Paragraphs 45–65 reverse the expected outcome. Gavroche briefly wonders about death, but Montparnasse rises and answers. Eighteen is the observer’s earlier description; the youth himself says nineteen. No fatal injury is invented.', { kind: 'scene', present: [
        ['montparnasse', 'Seizes the man’s collar, is overpowered and admits his wish to be a thief.'],
        ['mabeuf-lane-old-man', 'Restrains the attacker and asks whether he can be helped.'],
        ['gavroche', 'Watches nearby and applauds without attracting the struggling men’s notice.'],
      ] }),
    part(66, 'The Hard Labor of Idleness', 'The older man warns Montparnasse about the life ahead of him and then gives him his purse.', 'mabeuf-garden-lane',
      'Paragraphs 66–72 include the speech’s introduction and Gavroche’s explicit listening. They preserve the warning as speech, not a montage of future imprisonment and escape already accomplished. The purse is freely given after release, not successfully taken in the attack. The narrator asks the reader to infer the speaker without explicitly naming him.', { kind: 'scene', present: [
        ['mabeuf-lane-old-man', 'Warns against the criminal life and releases the youth with a gift of his purse.'],
        ['montparnasse', 'Pockets the gift and watches the donor leave in astonishment.'],
        ['gavroche', 'Hears the speech from his concealed place.'],
      ], items: ['mabeuf-lane-gift-purse'] }),
    part(73, 'The Purse Changes Hands Again', 'Gavroche steals the purse from Montparnasse and throws it over the hedge to Mabeuf.', 'mabeuf-garden-hedge',
      'Paragraphs 73–80 show a human transfer, not money falling from heaven. Six napoleons and some small change are found inside; Mabeuf and his housekeeper do not see the earlier chain of ownership. Gavroche has not eaten the apples.', { kind: 'scene', present: [
        ['gavroche', 'Takes the purse unnoticed and throws it to the old man before fleeing.'],
        ['montparnasse', 'Remains unaware that the new possession has been taken.'],
        ['mabeuf', 'Picks up the purse that falls on his foot and consults his housekeeper.'],
        ['mother-plutarque', 'Explains the unexpected purse as a gift from heaven.'],
      ], items: ['mabeuf-lane-gift-purse'] }),
  ]],
]
