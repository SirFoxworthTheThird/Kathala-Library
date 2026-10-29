const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'reported', ...extra,
})
const scene = (at, title, description, location, present, reason, extra = {}) =>
  part(at, title, description, location, reason, { kind: 'scene', present, ...extra })

export const volumeThreeBookSixthReview = [
  [188, [
    part('start', 'A Misread Admiration', 'Marius mistakes the interest of passing women for mockery, while Courfeyrac teases his reserve.', null,
      'Paragraphs 0–6 combine portrait, habitual misunderstanding and recurring remarks. The nickname Abbé does not ordain Marius; the housekeeper is distinct from the unknown girl.', { mentioned: ['marius', 'courfeyrac', 'madame-bourgon'] }),
    part(7, 'The Pair on the Bench', 'For more than a year Marius notices an older man and a young girl without exchanging greetings.', 'luxembourg-pepiniere-alley',
      'Paragraphs 7–11 are recurring observations, not a dated first meeting. Retired officer, widower, and father-daughter are impressions, not established profession, marital status or biology. The real names are withheld.', { mentioned: ['marius', 'monsieur-leblanc', 'mademoiselle-lanoire'] }),
    part(12, 'Leblanc and Lanoire', 'Courfeyrac’s names for the strangers become convenient labels among the students and for the narrator.', 'luxembourg-pepiniere-alley',
      'Paragraphs 12–14 explicitly introduce sobriquets from white hair and dark clothing. These are not legal names or revelations of the pair’s earlier identities.', { mentioned: ['marius', 'courfeyrac', 'monsieur-leblanc', 'mademoiselle-lanoire'] }),
  ]],
  [189, [
    scene('start', 'The Return After Six Months', 'On a summer morning Marius returns to the alley and at first thinks the older man has brought a different girl.', 'luxembourg-pepiniere-alley', [
      ['marius', 'Returns after a long absence and recognizes the same girl on a second pass.'],
      ['monsieur-leblanc', 'Sits on the familiar bench and talks with his young companion.'],
      ['mademoiselle-lanoire', 'Smiles with lowered eyes while listening beside the older man.'],
    ], 'Paragraphs 0–5 stage renewed observation and correct the imagined sister. The change is ordinary maturation, not replacement, magic or proof of a second daughter.', { timeHint: 'Serene summer morning after nearly six months away' }),
    part(6, 'A Changed Appearance', 'The narrator compares the girl’s new appearance with her earlier school clothes.', 'luxembourg-pepiniere-alley',
      'Paragraphs 6–8 describe appearance. The quarterly-income analogy explains blossoming beauty, not an actual payment to the girl.', { mentioned: ['monsieur-leblanc', 'mademoiselle-lanoire'], kind: 'exposition' }),
    scene(9, 'An Indifferent Glance', 'The girl looks up as Marius passes, and he continues his walk without particular interest.', 'luxembourg-pepiniere-alley', [
      ['marius', 'Passes the bench repeatedly without turning to look at the girl again.'],
      ['mademoiselle-lanoire', 'Raises her eyes toward the passing young man with an indifferent, childlike glance.'],
      ['monsieur-leblanc', 'Remains beside his companion on the familiar bench during the young man’s passes.'],
    ], 'Paragraphs 9–10 resume the same outing before the following-days summary. Their later attraction must not be projected into this indifferent glance.'),
    part(11, 'The Familiar Walk', 'On subsequent days Marius continues to pass the pair without paying the girl particular attention.', 'luxembourg-pepiniere-alley',
      'Paragraph 11 explicitly summarizes following days rather than another single encounter.', { mentioned: ['marius', 'monsieur-leblanc', 'mademoiselle-lanoire'] }),
  ]],
  [190, [
    scene('start', 'Their Eyes Meet', 'A glance exchanged beside the bench unsettles Marius.', 'luxembourg-pepiniere-alley', [
      ['marius', 'Meets the girl’s raised eyes and continues walking after she lowers them.'],
      ['mademoiselle-lanoire', 'Raises her eyes toward Marius and then drops them.'],
    ], 'Paragraphs 0–3 give the immediate exchange. Its meaning is uncertain even to Marius; no spoken declaration occurs, and the accompanying man is not explicitly restaged here.'),
    part(4, 'The Awakening and the Worn Coat', 'The narrator reflects on first attraction before Marius notices the shabbiness of his everyday clothes that evening.', 'gorbeau-marius-room',
      'Paragraphs 4–7 move from general meditation to the later return home. Magic and the poisoned flower are metaphors for love, not a spell, poisoning or diagnosed illness.', { mentioned: ['marius'], kind: 'exposition' }),
  ]],
  [191, [
    part('start', 'The New Clothes Go Out', 'Marius dresses in his best clothes and avoids Courfeyrac on the way to the garden.', null,
      'Paragraphs 0–2 include Courfeyrac’s later report to friends. The supposed examination is his guess, not Marius’s actual destination.', { mentioned: ['marius', 'courfeyrac'] }),
    scene(3, 'Advice Beside the Basin', 'Marius delays beside the basin and hears a father instruct his small son about political extremes.', 'luxembourg-grand-basin', [
      ['marius', 'Circles the basin and listens to a father’s advice while delaying his approach to the walk.'],
      ['luxembourg-basin-father', 'Holds his son’s hand and tells him to keep equally distant from despotism and anarchy.'],
      ['luxembourg-basin-son', 'Stands holding his father’s hand as the man addresses him.'],
    ], 'Paragraph 3 explicitly places the forty-year-old father and five-year-old at the basin. They are distinct from the older man and girl on the secluded bench; neither pair is moved into the other’s location.'),
    scene(4, 'The Long Approach', 'Marius approaches and passes the familiar bench in mounting agitation.', 'luxembourg-pepiniere-alley', [
      ['marius', 'Circles the basin, hesitates in the alley and finally passes the pair without daring to look.'],
      ['monsieur-leblanc', 'Sits on the bench while the young man repeatedly approaches.'],
      ['mademoiselle-lanoire', 'Talks tranquilly as Marius walks past.'],
    ], 'Paragraphs 4–7 move into the secluded walk and approach its bench. The father and son remain at the separate basin. Blue light, cannon and Hannibal are his perception or analogy, not battle action.'),
    scene(8, 'A Seat Halfway Down', 'Marius sits at a distance and wonders whether the older man has noticed his repeated passes.', 'luxembourg-pepiniere-alley', [
      ['marius', 'Waits, draws figures in the sand and goes home without approaching again.'],
      ['monsieur-leblanc', 'Remains at the far bench while Marius speculates about his attention.'],
      ['mademoiselle-lanoire', 'Remains with the older man beyond the hesitant watcher.'],
    ], 'Paragraphs 8–12 describe the continuation of this visit. Marius’s suspicion that he is observed is not yet confirmed knowledge of the man’s thoughts.'),
    scene(13, 'Bread Instead of Dinner', 'At home he discovers that he has missed dinner and carefully tends the clothes he wore.', 'gorbeau-marius-room', [
      ['marius', 'Eats a bit of bread after remembering dinner too late, then brushes and folds his coat before bed.'],
    ], 'Paragraphs 13–14 stage his solitary evening. He eats bread; forgetting dinner does not establish total fasting.'),
  ]],
  [192, [
    part('start', 'Three Days in the Best Coat', 'The portress marvels at Marius’s clothes and loses him when she tries to follow.', 'gorbeau-house',
      'Paragraphs 0–3 span two successive days and a failed pursuit. Bougon is Courfeyrac’s nickname; Burgon here and Bourgon earlier are source variants for the current portress, not three women. The thunder and animal pursuit are figurative.', { mentioned: ['marius', 'madame-bourgon'] }),
    part(4, 'A Fortnight on the Same Bench', 'Marius returns daily to watch from a distance while pretending to read.', 'luxembourg-pepiniere-alley',
      'Paragraphs 4–7 summarize repeated visits. The girl’s beauty is described; no new conversation, disease or supernatural light is established.', { mentioned: ['marius', 'monsieur-leblanc', 'mademoiselle-lanoire'], timeHint: 'A fortnight of repeated visits' }),
  ]],
  [193, [
    scene('start', 'The Pair Walk Past', 'The older man and the girl walk toward Marius, and her glance throws him into delight and confusion.', 'luxembourg-pepiniere-alley', [
      ['marius', 'Fumbles with his book and reads reproach and invitation into her steady glance.'],
      ['mademoiselle-lanoire', 'Walks on the older man’s arm and looks at Marius as she passes.'],
      ['monsieur-leblanc', 'Walks slowly with his companion through the alley.'],
    ], 'Paragraphs 0–4 distinguish her observed glance from the speech Marius imagines it conveying. His certainty about the boots and the nurses’ assumptions are not verified romantic intentions.'),
    part(5, 'Dinner and the Theatre', 'Marius treats Courfeyrac to dinner and a performance, alternating exuberance with intensified reserve.', null,
      'Paragraphs 5–8 move from the Odéon to Rousseau’s and the Porte-Sainte-Martin, not one location. Six francs and the six-sou tip are distinct amounts. Frédérick and the inn belong to the theatrical performance.', { mentioned: ['marius', 'courfeyrac'] }),
    scene(9, 'Breakfast at Voltaire', 'At breakfast Marius’s sudden enthusiasm for a decoration draws a serious response from Prouvaire.', 'cafe-voltaire', [
      ['marius', 'Laughs freely and abruptly praises the desirability of having the cross.'],
      ['courfeyrac', 'Whispers that the behavior is strange.'],
      ['jean-prouvaire', 'Answers that the change is serious.'],
      ['voltaire-provincial-guest', 'Is introduced to Marius and receives an unexpectedly affectionate embrace.'],
    ], 'Paragraphs 9–11 take place the following morning among students. Wanting the cross does not award Marius a decoration.'),
    part(12, 'The Captive of a Glance', 'The narrator names the passion and compares its power to an inescapable machine.', null,
      'Paragraphs 12–16 are authorial reflection. The title’s imprisonment and the gears’ bodily danger are figurative, not an arrest or physical mutilation.', { mentioned: ['marius'], kind: 'exposition' }),
  ]],
  [194, [
    part('start', 'A Month of Signals', 'Marius seeks the girl’s glances while the older man changes benches and sometimes comes alone.', 'luxembourg-pepiniere-alley',
      'Paragraphs 0–3 summarize a month’s pattern. The narrator supposes the man has noticed something, without disclosing full knowledge. Leonidas and Spartacus are statues, and Eve is an analogy, not present cast.', { mentioned: ['marius', 'monsieur-leblanc', 'mademoiselle-lanoire'] }),
    scene(4, 'The Initials U. F.', 'Marius finds a handkerchief and imagines that its initials reveal the girl’s name.', 'luxembourg-pepiniere-bench', [
      ['marius', 'Seizes the handkerchief and invents Ursule as the explanation of its initial.'],
    ], 'Paragraphs 4–5 give the find after the pair leave. The guessed name is not an identity reveal; he still knows neither name nor address.', { items: ['leblanc-uf-handkerchief'] }),
    part(6, 'Whose Handkerchief It Was', 'The narrator corrects the ownership while Marius continues displaying devotion to an object the girl does not recognize.', 'luxembourg-pepiniere-alley',
      'Paragraphs 6–8 explicitly say the man dropped his own handkerchief. The girl’s incomprehension is not modest concealment of a gift; no intended exchange or declaration is established.', { mentioned: ['marius', 'monsieur-leblanc', 'mademoiselle-lanoire'], items: ['leblanc-uf-handkerchief'] }),
  ]],
  [195, [
    scene('start', 'The Gust of Wind', 'A breeze lifts the girl’s dress and she pushes it down, while Marius responds with unreasonable anger.', 'luxembourg-pepiniere-alley', [
      ['marius', 'Sees the accidental exposure and gives the girl an angry glance on her return.'],
      ['mademoiselle-lanoire', 'Quickly presses down her wind-lifted dress and looks puzzled at his anger.'],
      ['monsieur-leblanc', 'Walks with the girl on his arm as the gust interrupts their passage.'],
    ], 'Paragraphs 0–4 state that the girl did nothing to cause the incident. The first quarrel consists of looks, not spoken reproaches or consent to Marius’s possessive claim.', { timeHint: 'A brisk May breeze; retained separately from the earlier summer-morning description' }),
    scene(5, 'A Wink Misread', 'A passing veteran becomes the next object of Marius’s jealousy.', 'luxembourg-pepiniere-alley', [
      ['marius', 'Imagines the veteran may have seen the gust and feels a violent jealousy.'],
      ['luxembourg-disabled-veteran', 'Passes the watcher with an expression Marius interprets as a shared amusement.'],
    ], 'Paragraph 5 offers Marius’s conjecture, not proof the veteran watched the girl. A desire to kill is not an attack; the veteran’s existing impairments are not new injuries.'),
    part(6, 'Three Days of Sulking', 'His anger fades while his attachment continues to intensify.', null,
      'Paragraphs 6–7 describe a later interval. Calling the anger just and legitimate is ironic in light of the explicit correction; madness is emotional language rather than a new clinical diagnosis.', { mentioned: ['marius'] }),
  ]],
  [196, [
    part('start', 'Following Them Home', 'Marius follows the pair to the Rue de l’Ouest and begins seeking more information.', 'rue-ouest-leblanc-house',
      'Paragraphs 0–5 connect the imagined name with repeated following. Ursule remains a false inference, while the modest three-story house is an observed destination.', { mentioned: ['marius', 'monsieur-leblanc', 'mademoiselle-lanoire'] }),
    scene(6, 'Questions at the Carriage Gate', 'A porter identifies the third-floor tenant’s circumstances but challenges Marius when asked for his name.', 'rue-ouest-leblanc-house-gate', [
      ['marius', 'Learns the floor and asks increasingly personal questions without obtaining a name.'],
      ['rue-ouest-porter', 'Describes the tenant as charitable and living on property, then asks whether the visitor is a spy.'],
    ], 'Paragraphs 6–18 give the porter’s testimony. A question about spying does not make Marius a police agent, and his triumphant internal summary still contains the mistaken Ursule.', { mentioned: ['monsieur-leblanc'] }),
    scene(19, 'The Look at the Threshold', 'On the next return the older man sends the girl inside and stares at the follower.', 'rue-ouest-leblanc-house-gate', [
      ['monsieur-leblanc', 'Lets the girl enter first and turns an intent stare on Marius.'],
      ['mademoiselle-lanoire', 'Passes through the entrance ahead of her companion.'],
      ['marius', 'Follows again after their unusually short garden visit.'],
    ], 'Paragraph 19 shows observation, without granting Marius the older man’s reasons or earlier identity.'),
    part(20, 'Lights Behind the Windows', 'Their absence from the garden sends Marius to wait nightly beneath the third-floor windows.', 'rue-ouest-leblanc-house',
      'Paragraphs 20–31 span the week and two dark-window nights. Shadows do not identify particular occupants; no light is not proof of death or arrest. The eighth-day darkness precedes the porter’s explanation.', { mentioned: ['marius'] }),
    scene(32, 'No Forwarding Address', 'The porter tells Marius that the tenant moved away yesterday and left no address.', 'rue-ouest-leblanc-house-gate', [
      ['marius', 'Asks where the tenant has gone and receives no destination.'],
      ['rue-ouest-porter', 'Reports the move and recognizes the persistent questioner.'],
    ], 'Paragraphs 32–43 end with a move reported by the porter, not its witnessed execution. The pair’s new location and real names remain undisclosed.', { mentioned: ['monsieur-leblanc', 'mademoiselle-lanoire'] }),
  ]],
]
