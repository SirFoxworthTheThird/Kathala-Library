const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const volumeTwoBookSecondReview = [
  [90, [
    scene('start', 'Recaptured', 'The narrator announces Valjean’s recapture and introduces two contemporary newspaper accounts.', null, [],
      'Paragraphs 0–3 explicitly shift to documents rather than staging an arrest whose details are not directly narrated here.', { kind: 'reported', mentioned: ['valjean'], timeHint: 'Documents dated 25 July 1823, months after the Montreuil events' }),
    scene(4, 'The Drapeau Blanc Account', 'A newspaper recounts Madeleine’s prosperity, imprisonment, and a bank withdrawal whose whereabouts remain unknown.', null, [],
      'Paragraph 4 is the first quoted article. Its report of unknown hidden funds does not disclose a cache’s actual location or put Laffitte at Toulon.', { kind: 'document', mentioned: ['valjean'] }),
    scene(5, 'The Journal de Paris Account', 'A second article reports recapture, trial, a death sentence, and commutation to penal servitude for life.', null, [],
      'Paragraphs 5–8 frame and quote the second article, including its false characterization of Fantine as a concubine and claims of robber-band complicity. These remain attributed allegations, not established relationships or acts. A commuted death sentence is not an execution.', { kind: 'document', mentioned: ['valjean', 'fantine'], timeHint: 'Article says recaptured in Paris three or four days after escape, at a vehicle for Montfermeil' }),
    scene(9, 'A New Number at Toulon', 'Other newspapers politicize the commutation, and the narrator records Valjean’s new prison number.', 'toulon-galleys', [],
      'Paragraphs 9–10 distinguish press interpretation from the narrator’s explicit number 9,430. It is an alias of the existing man, not a second prisoner.', { kind: 'reported', mentioned: ['valjean'], identityReveals: [{ identity: 'convict-9430', character: 'valjean', evidenceParagraph: 10, audience: 'reader' }] }),
    scene(11, 'Prosperity Unravels', 'Without Madeleine the workshops fragment and fail, and the district’s worsening finances are later noticed by the state.', 'montreuil-sur-mer', [],
      'Paragraphs 11–12 move forward across years. The predicted decline from his private debate now becomes narrated aftermath, but it is not dated to the moment of arrest or a direct scene attended by Valjean.', { kind: 'reported', mentioned: ['valjean'], timeHint: 'Villèle calls attention to doubled collection costs in February 1827, less than four years after the judgment' }),
  ]],
  [91, [
    scene('start', 'The Devil’s Treasure', 'The narrator recounts Montfermeil’s superstition about hidden treasure, digging, and dangerous discoveries.', 'montfermeil-forest', [],
      'Paragraphs 0–6 explicitly describe folklore and purported rules. No literal devil, supernatural coffer, or automatic death after an encounter is added to the world model.', { kind: 'exposition' }),
    scene(7, 'Boulatruelle’s Searches', 'The road-mender’s secretive digging prompts village rumours until he returns to ordinary work.', 'montfermeil-forest', [],
      'Paragraphs 7–13 distinguish observed searches from rumours of criminal association and the devil. His prior imprisonment is what inhabitants think they know, not a newly verified prison record.', { kind: 'reported', mentioned: ['boulatruelle'] }),
    scene(14, 'The Wine Test', 'Thénardier and the schoolmaster try to loosen Boulatruelle’s tongue with drink.', 'montfermeil', [
      ['thenardier', 'Suggests wine instead of an official inquiry or torture and tries to extract the road-mender’s secret.'],
      ['montfermeil-schoolmaster', 'Raises the old law’s coercive methods and joins the effort to question the man.'],
      ['boulatruelle', 'Drinks heavily but reveals little, keeping the identity of the person in the woods to himself.'],
    ], 'Paragraphs 14–17 are a specific questioning episode. The tavern is not explicitly named as the location, and the proposed water torture is never performed.', { timeHint: 'An evening after the digging has ceased' }),
    scene(18, 'The Stranger and the Box', 'The men piece together a story of tools, a stranger with a coffer, and a fruitless search for buried money.', 'montfermeil-forest', [],
      'Paragraphs 18–20 are explicitly what the interrogators imagine they have understood. The stranger is unnamed, buried contents are inferred, and no money is found; do not certify Valjean’s presence or cache location from this report.', { kind: 'reported', mentioned: ['boulatruelle', 'thenardier', 'montfermeil-schoolmaster'] }),
  ]],
  [92, [
    scene('start', 'The Orion Enters Toulon', 'A storm-damaged warship reaches Toulon for repairs and exchanges salutes with the port.', 'toulon-harbour', [],
      'Paragraphs 0–1 report the arrival and turn to the expense of salutes; the vessel’s later service at Brest is a forward reference, not its current location.', { kind: 'reported', timeHint: 'Toward the end of October 1823' }),
    scene(2, 'The Spanish War', 'Hugo interprets the 1823 campaign as a contradiction between France’s revolutionary inheritance and its military actions.', null, [],
      'Paragraphs 2–8 are historical and political commentary, including a forward connection to 1830. Named rulers and generals do not physically gather aboard the Orion.', { kind: 'exposition' }),
    scene(9, 'A Ship of the Line', 'The narrator returns to the ship and considers the power and vulnerability of naval machinery.', 'toulon-harbour', [],
      'Paragraphs 9–18 move between the particular vessel, generic construction, later steamships and imagined shipwreck. None is a literal sinking of the Orion or a journey by Valjean.', { kind: 'exposition' }),
    scene(19, 'Repairs Beside the Arsenal', 'The account explains the vessel’s storm damage and the repair work underway at anchor.', 'orion-deck', [],
      'Paragraphs 19–20 are the maintenance background before the accident. The ship’s leak does not make the later missing convict a confirmed drowned man.', { kind: 'reported' }),
    scene(21, 'The Topman Hanging Above the Water', 'A sailor loses his balance and catches the footrope while the crew hesitates to attempt a rescue.', 'orion-main-yard', [
      ['orion-topman', 'Falls around the yard and hangs from the swinging footrope, losing strength with each attempt to climb.'],
    ], 'Paragraphs 21–23 give the actual accident; the anonymous shore crowd is distant rather than aboard the yard.'),
    scene(24, 'The Convict in the Rigging', 'An older convict breaks his chain with permission, climbs out, and secures the exhausted sailor.', 'orion-main-yard', [
      ['valjean', 'Obtains permission to attempt rescue, breaks the ankle-chain, climbs the rigging, and brings the sailor back to the main-top.'],
      ['orion-topman', 'Is secured by the descending rescuer and carried back to the hands of his shipmates.'],
      ['orion-watch-officer', 'Gives the affirmative sign allowing the convict to risk his life for the sailor.'],
    ], 'Paragraphs 24–29 reveal the climb, then explain the earlier deck permission before completing the rescue. The officer remains below, not alongside the dangling men; the crowd’s appeal for pardon is not a granted pardon. The name is withheld in editorial titles until the newspaper identifies the rescuer.'),
    scene(30, 'A Fall Without a Body', 'The rescuer falls between the Orion and Algésiras and cannot be found despite searches lasting until evening.', 'toulon-orion-algesiras-water', [
      ['valjean', 'Falls from the lower rigging into the water and disappears from the watchers’ sight.'],
    ], 'Paragraphs 30–31 establish the observed fall and unsuccessful search. Cause, intent, escape route and death are not directly established; no isAlive:false state is attached.'),
    scene(32, 'The Newspaper’s Conclusion', 'A Toulon newspaper calls the missing convict drowned and identifies him as number 9,430, Jean Valjean.', null, [],
      'Paragraphs 32–33 are an attributed report. It explicitly admits that no body has been found and speculates about the Arsenal piles; retain the report without certifying death or a body location.', { kind: 'document', mentioned: ['valjean'], timeHint: 'Printed 17 November 1823; fall described as yesterday, hence 16 November' }),
  ]],
]
