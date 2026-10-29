// Source review of chapters 28–36, including the withheld plan and final reveal.
const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const bookThirdReview = [
  [28, [
    scene('start', 'The Year 1817', 'A panorama of Restoration politics, fashions, arts, and daily life sets the year of the next story.', 'paris', [],
      'All six paragraphs form a historical montage. Named historical figures, theatrical roles, quoted reports, and political allusions are not one physical cast or a set of invented dated encounters.', { kind: 'exposition', timeHint: '1817; retrospective comparisons and historical claims are preserved as source text, not silently corrected' }),
  ]],
  [29, [
    scene('start', 'Four Students and Four Friends', 'The narrator introduces the couples, their unequal attachments, and Fantine’s origins.', 'paris-latin-quarter', [],
      'Paragraphs 0–16 are retrospective portraits and repeated habits; Favourite’s parental history and Fantine’s childhood are not a gathering of all eight in one place.', { kind: 'exposition', mentioned: ['tholomyes', 'listolier', 'fameuil', 'blachevelle', 'favourite', 'dahlia', 'zephine', 'fantine'] }),
    scene(17, 'A Plan Kept Between the Men', 'Tholomyès privately proposes a surprise, and the men continue their discussion in a tap-room.', 'paris-taproom', [
      ['tholomyes', 'Takes his companions aside, raises the promised surprise, and lowers his voice to propose its undisclosed form.'],
      ['blachevelle', 'Welcomes the whispered proposal as an idea worth carrying out.'],
      ['listolier', 'Joins the private discussion and grins at the proposal before entering the tap-room.'],
      ['fameuil', 'Shares the men’s amusement and follows the discussion out of the women’s hearing.'],
    ], 'Paragraphs 17–20 move from taking the men aside to the tap-room. The actual scheme is withheld from the reader; the women do not hear it.'),
    scene(21, 'An Invitation for Sunday', 'The men’s private discussion results in an invitation to a pleasure party the following Sunday.', 'paris', [],
      'The final paragraph reports the arrangement rather than giving a new conversation or revealing the planned abandonment.', { kind: 'reported', timeHint: 'The following Sunday; no exact date given' }),
  ]],
  [30, [
    scene('start', 'The Changed Outskirts', 'The narrator compares the excursions of earlier Paris with the enlarged city of 1862.', 'paris', [],
      'Paragraph 0 is an explicit comparison between narrative and writing time, not a jump in the characters’ ages or location.', { kind: 'exposition' }),
    scene(1, 'A Day Along the Seine', 'The four couples rise early and tour Saint-Cloud and the neighbouring resorts.', 'saint-cloud', [],
      'Paragraphs 1–3 compress multiple stops and a letter from the preceding day. Retain the itinerary as reported travel instead of inventing individual actions or shared presence at one fixed location.', { kind: 'reported', mentioned: ['tholomyes', 'listolier', 'fameuil', 'blachevelle', 'favourite', 'dahlia', 'zephine', 'fantine'], timeHint: 'A warm summer Sunday in 1817; rising at five; chapter 32 specifies August' }),
    scene(4, 'Under the Chestnut Trees', 'The party passes through Saint-Cloud while Fantine’s appearance and reserve draw the narrator’s attention.', 'saint-cloud-chestnut-walk', [
      ['favourite', 'Runs ahead under the branches, jumps ditches, and leads the outdoor merrymaking.'],
      ['dahlia', 'Clings to Zéphine as they walk and pose together.'],
      ['zephine', 'Keeps beside Dahlia, using their contrasting beauty to set each other off.'],
      ['listolier', 'Discusses the professors and explains the contrast between Delvincourt and Blondeau to Fantine.'],
      ['fameuil', 'Joins Listolier in the discussion of their professors during the walk.'],
      ['blachevelle', 'Carries Favourite’s imitation India shawl on his arm.'],
      ['tholomyes', 'Follows with a costly rattan and a cigar, presiding over the party’s amusement.'],
      ['fantine', 'Carries her straw hat in her hand, her cheerfulness giving way at times to sudden thoughtfulness.'],
      ['labouisse', 'Sees the four young women pass and jokes that there is one too many for the Graces.'],
    ], 'Paragraph 4 supplies the particular witnessed passage at about ten; paragraphs 5–13 continue the party portrait. Labouisse sees them pass, not joining the rest of the excursion.', { timeHint: 'About ten in the morning' }),
  ]],
  [31, [
    scene('start', 'A Reserve Among the Games', 'The couples enjoy the park, but Fantine holds apart from their indiscriminate flirtation.', 'saint-cloud-park', [
      ['fantine', 'Maintains a reserve around the exchanged kisses despite the general gaiety.'],
      ['favourite', 'Remarks on Fantine’s odd look during the games.'],
    ], 'Paragraphs 0–3 describe group play but give these two women the specific exchange. The allusions to painters and fairy subjects are commentary; other party members await the full group-cast pass.'),
    scene(4, 'The Flowering Shrub', 'After breakfast the four couples join the admiration for a newly arrived Indian shrub.', 'saint-cloud-kings-square', [],
      'Paragraph 4 is a brief collective visit with no individual dialogue or actions differentiated; preserve it as reported itinerary.', { kind: 'reported' }),
    scene(5, 'The Swing at Issy', 'The party hires asses and visits Issy, where Tholomyès sings while swinging the women and Fantine refuses a turn.', 'issy-park-swing', [
      ['tholomyes', 'Arranges the hire of asses, then sings the Spanish ballad while pushing the swing.'],
      ['fantine', 'Alone declines to use the swing.'],
      ['favourite', 'Resents the refusal as an attempt to put on airs.'],
    ], 'Paragraphs 5–9 contain travel and the specific swing incident. The Spanish song and its English translation remain intact. The absent contractor and named artists are not visitors.'),
    scene(10, 'Across the River and Down the Slopes', 'The excursion returns by boat and on foot, reaching the Beaujon rides before Favourite renews her demand.', 'beaujon-russian-mountains', [
      ['favourite', 'Dismisses fatigue as no Sunday occupation and keeps claiming the promised surprise.'],
      ['tholomyes', 'Answers the repeated demand with a request for patience.'],
    ], 'Paragraphs 10–14 connect the collective return route to the particular exchange at the rides. The other six share the excursion but have no differentiated actions here.', { timeHint: 'About three in the afternoon at the Russian mountains' }),
  ]],
  [32, [
    scene('start', 'Dinner at Bombarda’s', 'The eight find a crowded restaurant’s available room, and the day’s outing becomes a noisy dinner.', 'bombarda-upper-room', [],
      'Paragraphs 0–4 give a collective tableau without distinct actions per person; the cited Molière is not a diner. Preserve the room, the second table of hats and flowers, and the bed for map and continuity work.', { kind: 'reported', mentioned: ['tholomyes', 'listolier', 'fameuil', 'blachevelle', 'favourite', 'dahlia', 'zephine', 'fantine'], timeHint: 'Source says half-past four and August sunlight, while also calling the sun setting; do not impose an astronomical correction or exact sunset timestamp' }),
    scene(5, 'An Amiable Rabble', 'The view of a cheerful royalist Paris opens into a police report and the narrator’s warning about the people’s latent power.', 'champs-elysees', [],
      'Paragraphs 5–10 leave the dinner for a street panorama and historical-political commentary; Anglès and the King are not placed in the restaurant.', { kind: 'exposition' }),
    scene(11, 'Back to the Table', 'The narrator returns to the four couples as dinner nears its end.', 'bombarda-upper-room', [],
      'Paragraph 11 explicitly closes the digression without adding another dinner or new character action.', { kind: 'reported' }),
  ]],
  [33, [
    scene('start', 'An Adoration for the Table', 'Favourite extravagantly assures Blachevelle of her love while the others eat, drink, laugh, and sing.', 'bombarda-upper-room', [
      ['fameuil', 'Hums during the noisy after-dinner conversation.'],
      ['dahlia', 'Joins the humming before turning to question Favourite.'],
      ['tholomyes', 'Drinks while Favourite performs her declaration of love.'],
      ['zephine', 'Laughs amid the table’s music and chatter.'],
      ['fantine', 'Smiles while the others make music and exchange declarations.'],
      ['listolier', 'Blows the wooden trumpet bought at Saint-Cloud.'],
      ['favourite', 'Promises to scratch, pursue, and denounce Blachevelle if he stops loving her.'],
      ['blachevelle', 'Asks how she would react to losing his love and reclines in delighted self-conceit at the reply.'],
    ], 'Paragraphs 0–9 establish simultaneous table activities and the public declaration.'),
    scene(10, 'What Favourite Says Softly', 'Dahlia’s quiet question draws a contrary confession: Favourite detests Blachevelle and prefers a young neighbour.', 'bombarda-upper-room', [
      ['dahlia', 'Asks quietly whether Favourite truly idolizes Blachevelle.'],
      ['favourite', 'Privately calls her declarations lies, praises the actor next door, and complains of Blachevelle’s stinginess.'],
    ], 'Paragraphs 10–14 explicitly lower the voices amid the uproar; the other diners are nearby but are not given this private knowledge. The neighbour and his mother are mentioned only.', { mentioned: ['blachevelle', 'favourite-actor-neighbour'] }),
  ]],
  [34, [
    scene('start', 'An Appeal to Moderation', 'Tholomyès attempts to govern the dinner with puns and a long speech, meeting interruptions from his companions.', 'bombarda-upper-room', [
      ['tholomyes', 'Regains the noisy table’s attention with a pun and lectures on limits to wit, appetite, and desire.'],
      ['blachevelle', 'Tells the self-appointed governor to leave them in peace and offers his calmness for another pun.'],
      ['fameuil', 'Calls for the tyrant’s downfall and asserts Sunday’s right to merriment.'],
      ['listolier', 'Cries out against the lecture and counters the prescription against love by preferring a woman.'],
      ['favourite', 'Listens intently and interrupts to admire the name Félix and its Latin meaning.'],
    ], 'Paragraphs 0–22 form the speech and its direct interruptions. Other women remain diners, but no fabricated assent, new medical fact, or speech is assigned to them.'),
    scene(23, 'A Toast and a Mistaken Embrace', 'Tholomyès refills his glass, praises and mocks the women, then embraces Favourite after calling for Fantine.', 'bombarda-upper-room', [
      ['tholomyes', 'Renounces his own prudence, toasts mirth, and embraces Favourite when he has called for Fantine.'],
      ['blachevelle', 'Urges the speaker to take breath and leads a nonsensical song in reply.'],
      ['listolier', 'Supports Blachevelle’s song interrupting the long harangue.'],
      ['fameuil', 'Joins the group’s sung response before Tholomyès resumes drinking.'],
      ['fantine', 'Is singled out as a dreamer whom Tholomyès says does not hear him; he calls to embrace her but turns elsewhere.'],
      ['favourite', 'Receives Tholomyès’s elaborate praise and the embrace meant for Fantine.'],
    ], 'Paragraphs 23–31 shift to the standing toast, song, and misdirected embrace. His hostile generalities and fanciful medical claims are dialogue, not authoritative world facts.', { mentioned: ['dahlia', 'zephine'] }),
  ]],
  [35, [
    scene('start', 'Restaurant Philosophy', 'Comparisons of restaurants and philosophers give Tholomyès further openings for jokes and declamation.', 'bombarda-upper-room', [
      ['zephine', 'Declares Édon’s dinners better than Bombarda’s.'],
      ['blachevelle', 'Defends Bombarda’s luxury through its mirrors and silver knife handles.'],
      ['favourite', 'Turns the talk of mirrors into a pun on ices served on a plate.'],
      ['fameuil', 'Asks Tholomyès to settle a philosophical preference and then name his favourite author.'],
      ['listolier', 'Has been disputing philosophy with Fameuil, who brings their question to the table.'],
      ['tholomyes', 'Answers philosophy with Désaugiers and turns praise of the restaurant into an oration on Aspasia.'],
    ], 'Paragraphs 0–22 contain the restaurant talk. Bombarda is referred to as proprietor, not described as entering; ancient writers and courtesans remain allusions.'),
    scene(23, 'The Mare on the Quay', 'A worn-out cart horse collapses outside; Tholomyès makes a verse, Fantine pities it, and Dahlia mocks her.', 'bombarda-upper-room', [
      ['tholomyes', 'Ends his interrupted speech with a punning strophe on the fallen mare.'],
      ['fantine', 'Sighs in pity for the exhausted horse outside.'],
      ['dahlia', 'Mocks Fantine for being ready to cry over horses.'],
    ], 'Paragraphs 23–27 are witnessed from the restaurant; the carter and dying mare stay on the quay, not in the dining-room. Their separate entity/location records await enrichment.'),
    scene(28, 'The Men Take Their Leave', 'Favourite calls for the surprise, and the men kiss the women on the brow before filing out.', 'bombarda-upper-room', [
      ['favourite', 'Demands the surprise and applauds the theatrical departure.'],
      ['tholomyes', 'Announces the moment has arrived and directs the farewell kisses to the brow.'],
      ['blachevelle', 'Proposes starting with a kiss and leaves with the other men.'],
      ['listolier', 'Kisses his companion’s brow and files out with a finger to his lips.'],
      ['fameuil', 'Follows the solemn kissing and departure with the other three men.'],
      ['fantine', 'Asks the departing men not to be long because the women will wait.'],
      ['dahlia', 'Receives the parting kiss before Listolier leaves with the others.'],
      ['zephine', 'Remains with the women after Fameuil’s solemn kiss and departure.'],
    ], 'Paragraphs 28–36 describe the staged departure; the women and reader still have no letter disclosing what it means.'),
  ]],
  [36, [
    scene('start', 'Watching from the Windows', 'The women watch the men disappear, speculate about gifts, and become absorbed in passing coaches.', 'bombarda-upper-room', [
      ['fantine', 'Calls after the men and wonders why a passing diligence briefly stops.'],
      ['zephine', 'Asks what the men will bring them.'],
      ['dahlia', 'Expects the promised gift to be pretty.'],
      ['favourite', 'Hopes for gold and explains how a coach can pick up a traveller along the quay.'],
    ], 'Paragraphs 0–16 keep the women at the windows. The men are visible only leaving below; boarding the particular glimpsed coach is not asserted from this view.', { mentioned: ['tholomyes', 'listolier', 'fameuil', 'blachevelle'] }),
    scene(17, 'This Is the Surprise', 'A waiter delivers the delayed letter, and Favourite reads the men’s announcement that they have left.', 'bombarda-upper-room', [
      ['bombarda-waiter', 'Brings the letter after the men’s prescribed hour and explains the delay.'],
      ['favourite', 'Snatches the paper, notices the inscription, and reads the announcement of departure.'],
      ['fantine', 'Hears the letter after remarking on the men’s long absence.'],
      ['dahlia', 'Waits with the others as Favourite opens and reads the promised surprise.'],
      ['zephine', 'Learns with the women that the men have left rather than brought gifts.'],
    ], 'Paragraphs 17–30 contain the delivery and full quoted letter. Its signatories are absent authors, not returned diners, and its claim to virtue is not narrator endorsement.', { items: ['tholomyes-farewell-letter'], mentioned: ['tholomyes', 'listolier', 'fameuil', 'blachevelle'], timeHint: 'The waiter was ordered to delay delivery for an hour' }),
    scene(31, 'Laughter at the Table', 'The friends call the abandonment a droll farce, and Fantine joins their laughter.', 'bombarda-upper-room', [
      ['favourite', 'Calls the letter a pretty farce and shifts her praise from Blachevelle to Tholomyès.'],
      ['zephine', 'Calls it droll and joins the cheer for Tholomyès.'],
      ['dahlia', 'Recognizes Tholomyès’s invention and cheers him with the others.'],
      ['fantine', 'Laughs with the friends before her later private grief.'],
    ], 'Paragraphs 31–40 give the reaction; the waiter is not asserted to remain or hear the women’s exchange.'),
    scene(41, 'Alone in Her Room', 'An hour later Fantine weeps in private, and the narrator reveals that she has a child.', 'fantine-paris-room', [
      ['fantine', 'Weeps alone after treating her first love as a husband and being abandoned by him.'],
    ], 'The final paragraph changes time and place and discloses maternity. It does not give the child a name or place the child physically in the room; neither is supplied early.', { timeHint: 'An hour after the shared laughter', mentioned: ['tholomyes'] }),
  ]],
]
