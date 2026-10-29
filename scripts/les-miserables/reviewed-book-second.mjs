// Read against the complete pinned source, chapters 15–27. Paragraph numbers
// belong to read-chapter.mjs; retrospective and figurative passages stay explicit.
const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const bookSecondReview = [
  [15, [
    scene('start', 'A Traveller Enters D——', 'An exhausted stranger drinks at the town’s fountains and reports at the town-hall.', 'digne', [
      ['valjean', 'Enters on foot, drinks twice, and salutes the unresponsive gendarme after leaving the town-hall.'],
      ['digne-townhall-gendarme', 'Watches the stranger without returning his salute and then enters the town-hall.'],
    ], 'Paragraphs 0–4 follow the arrival and municipal stop; the traveller is not yet named to the reader.', { timeHint: 'Early October 1815, about an hour before sunset; no exact day stated' }),
    scene(5, 'The Reputation of the Cross of Colbas', 'The narrator explains the innkeeper’s borrowed prestige through his cousin’s association with Napoleon.', 'cross-colbas', [],
      'Paragraph 5 interrupts the arrival with historical background; Napoleon and the Grenoble cousin do not visit this inn here.', { kind: 'exposition', mentioned: ['jacquin-labarre', 'napoleon'] }),
    scene(6, 'A Place by the Kitchen Fire', 'The innkeeper first accepts the stranger’s money, then sends a child to make inquiries at the town-hall.', 'cross-colbas-kitchen', [
      ['valjean', 'Shows his purse and waits by the fire, unaware that the innkeeper is checking his identity.'],
      ['jacquin-labarre', 'Promises dinner but secretly sends a written inquiry and refuses food and lodging after the reply.'],
      ['labarre-scullion', 'Carries the landlord’s scrap of newspaper to the town-hall and brings it back.'],
    ], 'The kitchen encounter begins at paragraph 6; the name is withheld until the next cut at its actual disclosure.', { items: ['valjean-purse', 'labarre-inquiry'] }),
    scene(49, 'The Name on the Reply', 'Labarre names Jean Valjean and expels him; the departing guest does not see the crowd gathering behind him.', 'cross-colbas-kitchen', [
      ['valjean', 'Looks at the town-hall reply and leaves with his head lowered when Labarre orders him away.'],
      ['jacquin-labarre', 'Confronts his guest with the name Jean Valjean before pointing him out to the gathering outside.'],
    ], 'Paragraph 49 discloses the name explicitly. Paragraphs 53–54 report Labarre’s subsequent threshold gossip without giving Valjean knowledge of it.', { reportedAfter: 'Labarre addresses guests and passers-by from the inn threshold after Valjean departs.' }),
    scene(55, 'Another Hearth, Another Refusal', 'A humbler tavern offers supper until a fishmonger whispers what he has learned at Labarre’s.', 'chaffaut-public-house', [
      ['valjean', 'Finds brief comfort at the hearth, then carries away his belongings after a second expulsion.'],
      ['chaffaut-tavernkeeper', 'Welcomes the traveller before ordering him out after the fishmonger’s warning.'],
      ['digne-fishmonger', 'Signals the tavernkeeper and whispers about the man he has already refused to help on the road.'],
    ], 'Paragraphs 55–77 follow the next search and tavern encounter; the morning roadside refusal inside paragraph 68 is retrospective, not another simultaneous location.'),
    scene(78, 'Stones and a Closed Wicket', 'Children throw stones at Valjean, and the prison refuses his request for a bed.', 'digne-prison-door', [
      ['valjean', 'Drives the stone-throwing children off with his stick, then asks the turnkey for lodging in vain.'],
      ['digne-turnkey', 'Answers through the wicket that admission requires an arrest and closes it on the traveller.'],
    ], 'Paragraph 78 is the brief street transition to the separate prison exchange in paragraphs 79–84; no connection to the earlier condemned prisoner is inferred.'),
    scene(85, 'A Lighted Family Window', 'The sight of a family meal draws Valjean to a house whose owner finally threatens him with a gun.', 'digne-artisan-house', [
      ['valjean', 'Offers to pay for soup and a shed, then begs for water as the householder threatens to shoot.'],
      ['digne-armed-householder', 'Initially considers paid lodging but takes down his gun when he recognizes the unwelcome stranger.'],
      ['digne-householder-wife', 'Hears the tapping and later gathers both children behind her husband in fear.'],
    ], 'Paragraph 85 begins a different household. Two unnamed children are witnessed family members, not identified with earlier street children; their identities remain unassigned.'),
    scene(115, 'Even the Kennel', 'Valjean mistakes a dog’s kennel for shelter and must fight his way out of the garden.', 'digne-kennel-garden', [
      ['valjean', 'Crawls into straw seeking warmth, then retreats from the dog using his pack as a shield and his stick to hold it back.'],
    ], 'Paragraph 115 moves to a garden hut not identified as belonging to the preceding family; the dog is not silently converted into a human cast entry.'),
    scene(120, 'The Fields and the Breach', 'A desolate field drives Valjean back through a breach in the closed town walls.', 'digne-outskirts', [
      ['valjean', 'Abandons his search for shelter in the fields and re-enters D—— through a breach after the gates close.'],
    ], 'Paragraphs 120–126 cover the solitary outward walk and return; the tree and landscape are not additional actors.'),
    scene(127, 'A Door Still Untried', 'On a bench beside the cathedral square, Valjean receives four sous and directions to the bishop’s house.', 'digne-printing-office-door', [
      ['valjean', 'Claims to have no money, accepts four sous, and admits he has not knocked at the house across the street.'],
      ['marquise-r', 'Gives the exhausted man the four sous in her purse and urges him to try the bishop’s door.'],
    ], 'Paragraph 127 resumes the town walk around eight; paragraph 131 introduces the woman’s conversation at the printing office. Historical printing references are background.', { timeHint: 'About eight in the evening, explicitly approximate' }),
  ]],
  [16, [
    scene('start', 'An Unfinished Book of Duties', 'The bishop works late on a compilation of moral duties before Magloire comes for the silver.', 'bishop-bedroom', [
      ['myriel', 'Continues compiling his book at eight, then closes it to join supper.'],
      ['magloire', 'Collects the silverware from the cupboard beside the bishop’s bed to prepare the table.'],
    ], 'Paragraphs 0–1 locate the work and Magloire’s errand in the bedroom before the dining-room description.', { items: ['silver-tableware'], timeHint: 'The same evening, eight o’clock' }),
    scene(2, 'A Lock for the Door', 'Magloire urges stronger locks after hearing rumours of a dangerous traveller, while Baptistine defers to her brother.', 'bishop-dining-room', [
      ['myriel', 'Warms himself by the fire and calmly asks what danger has prompted Magloire’s alarm.'],
      ['magloire', 'Repeats the town’s warnings and proposes having Musebois restore the locks and bolts.'],
      ['baptistine', 'Draws her brother’s attention to Magloire, then refuses to endorse a complaint against his practice.'],
    ], 'Paragraphs 2–19 establish the dining-room conversation. Musebois is merely proposed as a locksmith; neither he nor the rumoured traveller attends.', { mentioned: ['valjean', 'paulin-musebois'] }),
    scene(20, 'The Knock', 'A loud knock interrupts the request for bolts, and the bishop calls for the visitor to enter.', 'bishop-dining-room', [
      ['myriel', 'Answers the knock with his customary invitation to come in.'],
      ['magloire', 'Has just urged bolting the door when a visitor knocks.'],
      ['baptistine', 'Remains with her brother as the knock interrupts Magloire’s appeal.'],
    ], 'Paragraphs 20–21 end on the knock; the caller has not yet entered and receives no indoor snapshot.'),
  ]],
  [17, [
    scene('start', 'The Yellow Passport', 'The traveller declares his name and sentence before the bishop orders a place and a bed for him.', 'bishop-dining-room', [
      ['valjean', 'Announces his nineteen-year imprisonment and reads the warning on his passport, expecting another rejection.'],
      ['myriel', 'Responds to the confession by ordering another place and clean sheets in the alcove.'],
      ['magloire', 'Trembles at the arrival but accepts instructions to prepare the stranger’s bed.'],
      ['baptistine', 'Recovers her calm by watching her brother’s response to the alarming visitor.'],
    ], 'Paragraphs 0–12 contain the entrance, self-identification, and orders; the journey he recounts does not put its other participants in this room.', { items: ['yellow-passport'] }),
    scene(13, 'Sir, Not Thou', 'While the bed is prepared, the bishop offers free hospitality and hears what nineteen years have earned.', 'bishop-dining-room', [
      ['valjean', 'Marvels at being addressed politely and explains the savings accumulated during imprisonment.'],
      ['myriel', 'Refuses payment, listens to the account of the distant prison bishop, and shuts the open door.'],
      ['baptistine', 'Watches the guest mildly as he puts away his passport and takes a seat.'],
    ], 'Magloire explicitly leaves in paragraph 13 and does not return until paragraph 30; the Marseilles bishop exists only in Valjean’s recollection.', { mentioned: ['magloire'] }),
    scene(30, 'My Brother', 'The bishop lights the silver candlesticks and welcomes Valjean as his brother rather than demanding a history.', 'bishop-dining-room', [
      ['valjean', 'Describes the chains and punishments, astonished that his host treats him as a brother.'],
      ['myriel', 'Touches his guest’s hand and offers refuge before speaking of goodwill after suffering.'],
      ['magloire', 'Returns with a place setting and brings the silver candlesticks when the bishop remarks on the light.'],
      ['baptistine', 'Stays beside the hearth while her brother receives the stranger without demanding his name.'],
    ], 'Paragraph 30 marks Magloire’s explicit return. Her short errand for candles occurs within the shared dining scene.', { items: ['silver-tableware', 'silver-candlesticks'] }),
    scene(45, 'Six Settings for Three', 'Supper begins, and the bishop asks for the full household silver to honour his guest.', 'bishop-dining-room', [
      ['valjean', 'Takes the bishop’s right-hand seat and eats hungrily after the blessing.'],
      ['myriel', 'Serves soup himself and signals that all six silver settings should be displayed.'],
      ['baptistine', 'Sits at her brother’s left with her customary composure.'],
      ['magloire', 'Adds Mauves wine to the meal and fetches the three further silver settings her employer requests.'],
    ], 'Paragraph 45 begins the meal service and paragraph 46 seats its three diners; Magloire serves rather than becoming a fourth diner.', { items: ['silver-tableware'] }),
  ]],
  [18, [
    scene('start', 'Baptistine’s Account of Supper', 'A letter records the table conversation and the bishop’s tactful discussion of work near Pontarlier.', 'bishop-dining-room', [
      ['baptistine', 'Recalls answering the question about their relatives and notices her brother’s care to avoid humiliating the guest.'],
      ['myriel', 'Describes cooperative cheese-making as a possible livelihood without giving Valjean a sermon.'],
      ['valjean', 'Remarks on the poorer meal and recovers animation as his host describes work in the country ahead.'],
    ], 'Paragraphs 0–19 present a letter-framed account of the same supper, not a second meal or a meeting with Boischevron. Magloire is not assigned an uninterrupted attendance.', { kind: 'document', mentioned: ['boischevron'], items: ['baptistine-supper-letter'] }),
    scene(20, 'Fifteen Sous at the Door', 'Mother Gerbaud brings her child, receives money, and leaves before the women retire upstairs.', 'bishop-dining-room', [
      ['myriel', 'Kisses Gerbaud’s child and borrows fifteen sous from his sister to give the mother.'],
      ['baptistine', 'Provides the fifteen sous and later sends Magloire back with a goatskin for the guest’s bed.'],
      ['valjean', 'Grows silent with fatigue and pays little attention to the visitor.'],
      ['mother-gerbaud', 'Comes with her little one and leaves after receiving the bishop’s aid.'],
      ['magloire', 'Clears supper promptly before going upstairs with Baptistine.'],
    ], 'Paragraph 20 is one indivisible paragraph containing Gerbaud’s arrival, departure and the later errands. These are sequential, not a gathering of every participant upstairs.', { kind: 'document', reportedAfter: 'After Gerbaud leaves, the women retire upstairs; Magloire makes a later errand to the guest bed with Baptistine’s goatskin.' }),
    scene(21, 'Prayers Upstairs', 'Baptistine and Magloire pray and retire without discussing the guest.', 'bishop-upstairs-drawing-room', [
      ['baptistine', 'Prays with Magloire after the bed-covering errand and retires without further conversation.'],
      ['magloire', 'Returns promptly, joins the prayers, and goes to her own chamber.'],
    ], 'The final letter paragraph explicitly locates the two women together upstairs; neither man accompanies them.', { kind: 'document' }),
  ]],
  [19, [
    scene('start', 'Across the Bishop’s Bedroom', 'Each man takes a candlestick, and the guest passes the cupboard where Magloire puts away the silver.', 'bishop-bedroom', [
      ['myriel', 'Leads his guest toward the alcove with one silver candlestick in hand.'],
      ['valjean', 'Follows through the bishop’s room while the household silver is put away.'],
      ['magloire', 'Returns the silverware to the cupboard near the bishop’s bed.'],
    ], 'Paragraphs 0–4 connect departure from supper with the bedroom crossing; Magloire is explicitly at the cupboard.', { items: ['silver-tableware', 'silver-candlesticks'] }),
    scene(5, 'A Bed Beside His Host', 'Installed in the alcove, Valjean challenges the bishop’s willingness to sleep near a possible assassin.', 'bishop-oratory-alcove', [
      ['valjean', 'Thanks his host, then abruptly asks how he can know that his guest is not an assassin.'],
      ['myriel', 'Entrusts that question to God and blesses the man before leaving him.'],
    ], 'Paragraph 5 enters the alcove. Paragraph 8 explicitly makes the women hypothetical witnesses to his threat; do not place them here.'),
    scene(15, 'Prayer and the Garden', 'The bishop prays by the curtained altar and goes out to contemplate the night.', 'bishop-garden', [
      ['myriel', 'Leaves his brief prayer at the curtained altar for solitary meditation in the garden.'],
    ], 'Paragraph 15 moves from altar to garden within one source paragraph; this is the bishop’s solitary passage, not continued company with his guest.'),
    scene(16, 'Sleep Without Undressing', 'The exhausted guest drops asleep fully clothed without using the fresh sheets.', 'bishop-oratory-alcove', [
      ['valjean', 'Blows out the candle through his nostrils and falls immediately asleep in his clothes.'],
    ], 'Paragraph 16 switches back from the bishop’s walk to the guest’s bed.'),
    scene(17, 'Midnight in the House', 'The bishop returns from the garden, and the household settles into sleep.', 'bishop-house', [
      ['myriel', 'Returns to his apartment at midnight and soon sleeps.'],
    ], 'Paragraphs 17–18 report the return and household sleep without staging the women or Valjean in the bishop’s room.', { timeHint: 'Midnight' }),
  ]],
  [20, [
    scene('start', 'A Waking Before the Retrospect', 'Valjean wakes during the night before the narrator turns to his earlier life.', 'bishop-oratory-alcove', [
      ['valjean', 'Wakes in the middle of the night after his first sleep in the guest bed.'],
    ], 'Paragraph 0 briefly resumes the present; it is not a different awakening from the expanded return in chapter 24.'),
    scene(1, 'The Family at Faverolles', 'The narrator traces Valjean’s childhood losses, labour, and support of his sister’s seven children.', 'faverolles', [],
      'Paragraphs 1–6 summarize years and repeated routines; the milk borrowing and payment are not assigned one fabricated gathering.', { kind: 'reported', mentioned: ['valjean', 'valjean-sister', 'marie-claude'] }),
    scene(7, 'The Broken Window', 'A baker catches Valjean after he breaks the shop window and steals a loaf.', 'faverolles-bakery', [
      ['valjean', 'Smashes the pane, takes bread, and is caught with a bleeding arm after throwing the loaf away.'],
      ['maubert-isabeau', 'Hears the blow, sees the theft, and chases down the fleeing man.'],
    ], 'Paragraph 7 gives a particular witnessed theft and chase rather than the preceding repeated family history.', { timeHint: 'The next paragraph identifies the year as 1795; a Sunday evening in the hard winter', stateChanges: [{ character: 'valjean', injury: 'arm bleeding from the broken bakery window', evidenceParagraph: 7 }] }),
    scene(8, 'Five Years Pronounced', 'The narration explains the prosecution and the sentence of five years in the galleys.', 'faverolles', [],
      'Paragraphs 8–9 report judicial proceedings without identifying a courtroom, judge, or contemporaneous family attendance.', { kind: 'reported', mentioned: ['valjean'] }),
    scene(10, 'The Fourth Line at Bicêtre', 'Valjean weeps as his iron collar is riveted and gestures toward the seven children he had supported.', 'bicetre-courtyard', [
      ['valjean', 'Sobs while the collar is riveted and lowers his hand seven times as if touching the children’s heads.'],
    ], 'Paragraph 10 gives the remembered courtyard incident with a precise date. The turnkey is its later witness, not a participant to whom Valjean speaks.', { timeHint: '22 April 1796' }),
    scene(11, 'Number 24,601', 'The account follows imprisonment, the loss of family news, four failed escapes, and eventual release.', 'toulon-galleys', [],
      'Paragraphs 11–17 range over nineteen years and include a reported Paris household and authorial argument. They do not place the sister or child at Toulon.', { kind: 'reported', mentioned: ['valjean', 'valjean-sister'], timeHint: '1796 to October 1815; the reported news near the fourth year is qualified by the narrator' }),
  ]],
  [21, [
    scene('start', 'A Tribunal Within', 'The narrator examines how Valjean judged his theft, his punishment, and the society that imposed it.', 'toulon-galleys', [],
      'Paragraphs 0–15 reconstruct a long mental development; no single debate or trial is staged.', { kind: 'exposition', mentioned: ['valjean'] }),
    scene(16, 'Learning Under Sentence', 'Prison schooling strengthens Valjean’s intelligence while bitterness also grows.', 'toulon-galleys', [],
      'Paragraphs 16–26 combine education, moral inquiry, hypothetical observers, and repeated escape impulses. The imagined physiologist is not an actual visitor.', { kind: 'exposition', mentioned: ['valjean'] }),
    scene(27, 'A Shoulder Beneath the Caryatid', 'An account of Valjean’s unusual strength includes his support of a failing stone figure at Toulon’s town-hall.', 'toulon-townhall', [
      ['valjean', 'Supports the loosening caryatid with his shoulder until the workmen can arrive.'],
    ], 'Paragraph 27 moves from general strength to one actual rescue of the balcony support; Puget is named as sculptor, not placed among the workers.'),
    scene(28, 'The Weight of Civilization', 'The narrator describes Valjean’s climbing skill, habitual silence, and sense of society bearing down on him.', 'toulon-galleys', [],
      'Paragraphs 28–38 return to repeated habits and argument; the Emperor, archbishop, and imagined social pyramid are not physical companions.', { kind: 'exposition', mentioned: ['valjean'] }),
  ]],
  [22, [
    scene('start', 'Billows and Shadows', 'A drowning man becomes the image of a soul abandoned by society and the penal law.', null, [],
      'The whole chapter is an extended explicit metaphor, not a literal voyage or death for Valjean. No ship, drowning character, map position, or death state is created.', { kind: 'exposition' }),
  ]],
  [23, [
    scene('start', 'The Price of Release', 'Valjean’s expected freedom is diminished by the yellow passport and disputed prison earnings.', 'toulon-galleys', [],
      'Paragraphs 0–1 are retrospective explanation of release and accounting, not a second present-day discharge scene.', { kind: 'reported', mentioned: ['valjean'] }),
    scene(2, 'Half Wages at Grasse', 'After a passport inspection, an employer pays Valjean less than the rate he has learned and threatens him when he objects.', 'grasse-distillery', [
      ['valjean', 'Unloads bales, shows his passport, and protests the fifteen sous offered for work said to earn thirty.'],
      ['grasse-distillery-owner', 'Accepts the labour, pays fifteen sous, and answers the request for more with a warning about prison.'],
      ['grasse-gendarme', 'Passes the distillery, inspects the labourer’s yellow passport, and leaves him to resume work.'],
      ['grasse-workman', 'Tells Valjean the thirty-sou daily rate before the employer’s later payment.'],
    ], 'Paragraph 2 contains successive stages of the same workday; the gendarme is not said to stay for the evening wage dispute.', { timeHint: 'The day after release; a retrospective scene', items: ['yellow-passport'] }),
    scene(3, 'Free of the Galleys, Still Sentenced', 'The narrator connects the disputed wages with the barriers Valjean has already met in D——.', 'grasse', [],
      'Paragraphs 3–6 draw the distinction between liberation and deliverance rather than replaying the refusals.', { kind: 'exposition', mentioned: ['valjean'] }),
  ]],
  [24, [
    scene('start', 'Silver in the Dark', 'Awake at two, Valjean cannot stop thinking of the silver and struggles with the temptation for an hour.', 'bishop-oratory-alcove', [
      ['valjean', 'Lies awake estimating the silver’s value, then sits up and silently removes his shoes.'],
    ], 'Paragraphs 0–10 expand the awakening announced in chapter 20; Brevet is a distracting memory, not a fellow guest.', { mentioned: ['brevet'], items: ['silver-tableware'], timeHint: 'Two o’clock, then three; the later stroke is expressly uncertain between a half and quarter hour' }),
    scene(11, 'A Window and an Iron Tool', 'Valjean studies the garden exit, packs his belongings, and approaches the bishop’s unclosed door.', 'bishop-oratory-alcove', [
      ['valjean', 'Tests the unbarred window, studies the low garden wall, and takes an iron miner’s candlestick toward the adjoining room.'],
    ], 'Paragraph 11 begins physical preparation after indecision; paragraph 15 leaves him at the ajar door, not already beside the bishop’s bed.', { items: ['miners-candlestick'] }),
  ]],
  [25, [
    scene('start', 'The Cry of a Hinge', 'Valjean opens the door and freezes when the rusty hinge sounds through the sleeping house.', 'bishop-oratory-door', [
      ['valjean', 'Waits in alarm after the hinge squeaks and discovers that nobody has awakened.'],
    ], 'Paragraphs 0–10 remain at the door; the women’s shrieks and arrival of the police are imagined fears, not events.'),
    scene(11, 'The Sleeping Face', 'Inside the room, Valjean pauses before the bishop’s moonlit bed, holding the iron tool.', 'bishop-bedroom', [
      ['valjean', 'Stops by the bed, takes off his cap, and hesitates before the unguarded sleeper.'],
      ['myriel', 'Sleeps peacefully, unaware of the visitor standing beside his bed.'],
    ], 'Paragraph 11 explicitly enters the bedroom; paragraphs 12–25 dwell on the actual sleeper and the intruder’s unresolved response.', { items: ['miners-candlestick'] }),
    scene(26, 'The Unlocked Cupboard', 'Valjean seizes the silver and escapes through the oratory window and garden wall.', 'bishop-bedroom', [
      ['valjean', 'Opens the cupboard with its key, takes the silver, discards the basket, and flees over the wall.'],
      ['myriel', 'Remains asleep as the silver is taken from the cupboard beside his bed.'],
    ], 'The final paragraph contains the entire uninterrupted theft and escape; the scene begins at the cupboard, and the bishop does not accompany the flight.', { items: ['silver-tableware'], reportedAfter: 'Valjean crosses the oratory, opens its window, packs the silver, discards the basket in the garden and escapes over the wall.' }),
  ]],
  [26, [
    scene('start', 'An Empty Basket', 'Magloire discovers the theft, but the bishop questions whether the silver ever belonged to them.', 'bishop-garden', [
      ['myriel', 'Returns the discarded basket and calls the silver the property of the poor rather than his own.'],
      ['magloire', 'Checks the empty alcove, points out the damaged wall, and worries about what her employer will eat with.'],
    ], 'Paragraphs 0–25 locate this exchange in the garden; Magloire’s quick checking errand does not make the missing guest present.', { timeHint: 'The next morning at sunrise' }),
    scene(26, 'Breakfast Without Silver', 'The bishop makes light of the missing utensils while Magloire grumbles at the risk he took.', 'bishop-dining-room', [
      ['myriel', 'Jokes that bread dipped in milk requires no fork or spoon.'],
      ['baptistine', 'Says nothing while her brother makes light of the theft.'],
      ['magloire', 'Grumbles over the hospitality and imagines the danger could have been worse than theft.'],
    ], 'Paragraph 26 explicitly moves to breakfast with the sister; the two women are not retroactively placed together in the garden.'),
    scene(28, 'The Candlesticks Too', 'Gendarmes bring back Valjean, but the bishop says the silver was a gift and adds the candlesticks.', 'bishop-dining-room', [
      ['valjean', 'Learns his host is the bishop, is released, and accepts the additional silver in bewilderment.'],
      ['myriel', 'Confirms the supposed gift, obtains the prisoner’s release, and hands over both candlesticks.'],
      ['digne-return-brigadier', 'Asks whether the silver was truly given and releases the man on the bishop’s assurance.'],
      ['baptistine', 'Watches the gift without a word or gesture that would undermine her brother.'],
      ['magloire', 'Looks on silently as the bishop gives away the candlesticks as well as the stolen tableware.'],
    ], 'Paragraphs 28–52 contain the interruption and police exchange. Three gendarmes and a brigadier are described; only the speaking commander receives an individual identity here.', { items: ['silver-tableware', 'silver-candlesticks'] }),
    scene(53, 'A Charge Spoken Softly', 'After the gendarmes leave, the bishop charges Valjean to use the gift to become an honest man.', 'bishop-dining-room', [
      ['valjean', 'Cannot recall making the promise the bishop invokes and remains speechless under his words.'],
      ['myriel', 'Speaks softly of withdrawing his brother from evil and giving his soul to God.'],
      ['baptistine', 'Remains in the room after watching the gift; the text gives her no reply to the final charge.'],
      ['magloire', 'Has witnessed the gift and makes no further protest before the chapter ends.'],
    ], 'Paragraph 52 explicitly removes the gendarmes. No departure is stated for the women; the low-voiced charge is not assigned to them as acquired knowledge.'),
  ]],
  [27, [
    scene('start', 'A Morning Without a Road', 'Valjean wanders out of D——, unsettled by the bishop’s generosity and memories of childhood.', 'digne-outskirts', [
      ['valjean', 'Walks without eating, retraces his own paths, and resists the unfamiliar emotions stirred by his host.'],
    ], 'Paragraphs 0–1 cover the solitary morning; the bishop is recollected, not walking beside him.'),
    scene(2, 'The Forty-Sou Piece', 'On a deserted plain, a child’s coin rolls beneath Valjean’s foot, and he drives the child away.', 'gervais-plain', [
      ['valjean', 'Pins the fallen coin beneath his shoe and frightens its owner into flight instead of returning it.'],
      ['little-gervais', 'Asks repeatedly for his forty sous, tries to shift the shoe, and runs away trembling.'],
    ], 'Paragraph 2 fixes the new stopping place; paragraphs 4–33 introduce and dismiss the child. The birds and distant Alps are landscape, not people.', { items: ['gervais-forty-sous'], timeHint: 'Near sunset, perhaps three leagues from D——; both distance and later fever are qualified' }),
    scene(34, 'Calling into the Empty Plain', 'After the child disappears, Valjean sees the coin and starts searching for him.', 'gervais-plain', [
      ['valjean', 'Recoils at the coin, picks it up, and calls Little Gervais’s name without receiving an answer.'],
    ], 'Paragraph 33 completes the child’s departure; the new segment starts at sunset in paragraph 34. No returning-child snapshot is created.', { items: ['gervais-forty-sous'] }),
    scene(50, 'A Priest on Horseback', 'Valjean questions a passing priest, gives money for the poor, and asks to be arrested.', 'gervais-plain-path', [
      ['valjean', 'Gives the priest twenty francs while asking after the boy, then declares himself a thief.'],
      ['gervais-road-priest', 'Has seen no child and rides away alarmed when the stranger asks him to arrange an arrest.'],
    ], 'Paragraphs 50–64 contain a new physical encounter. This unnamed mounted priest is not identified as Myriel or any earlier curé.'),
    scene(65, 'At the Three Paths', 'The search fails, and Valjean collapses into tears while confronting what he has done.', 'gervais-three-paths', [
      ['valjean', 'Calls for the child one last time, collapses on a stone, and weeps as he confronts the theft and the bishop’s mercy.'],
    ], 'Paragraphs 65–83 carry the failed search into self-examination. Paragraphs 68–81 revisit earlier actions and envision the bishop; they do not stage a second theft or physical visit.', { mentioned: ['myriel', 'little-gervais'] }),
    scene(84, 'A Kneeling Figure', 'A carrier’s qualified account places a man in prayer before the bishop’s door during the night.', 'bishop-house-entrance', [],
      'The narrator explicitly leaves the man’s subsequent movements unknown and offers only what seems authenticated. Preserve the uncertain identification rather than asserting a witnessed Valjean–Myriel reunion.', { kind: 'reported', timeHint: 'The same night, carrier arriving about three in the morning; identification not asserted', mentioned: ['valjean', 'myriel'] }),
  ]],
]
