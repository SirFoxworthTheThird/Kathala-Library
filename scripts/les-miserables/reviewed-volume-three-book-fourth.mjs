const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'exposition', ...extra,
})
const scene = (at, title, description, location, present, reason, extra = {}) =>
  part(at, title, description, location, reason, { kind: 'scene', present, ...extra })

export const volumeThreeBookFourthReview = [
  [176, [
    part('start', 'The Friends of the A B C', 'The narrator introduces the small political society and its two meeting places.', 'cafe-musain-back-room',
      'Paragraphs 0–11 describe political currents, the society’s purpose and repeated meetings. The roster is not attendance at one evening; Corinthe and Musain are separate venues. The long corridor, two windows and private stair are map evidence.'),
    part(12, 'Enjolras and Combeferre', 'The group’s chief and guide embody different approaches to revolution and progress.', null,
      'Paragraphs 12–14 are comparative portraits. Historical and mythical parallels do not create meetings, and Combeferre’s scientific interests are not inventions he has already accomplished.', { mentioned: ['enjolras', 'combeferre'] }),
    part(15, 'The Poet and the Workingman', 'Jean Prouvaire’s poetry and Feuilly’s self-education widen the society’s concerns.', null,
      'Paragraphs 15–16 characterize two distinct men. Jean and Jehan name the same poet; Feuilly’s adoption of peoples is figurative, not legal parenthood.', { mentioned: ['jean-prouvaire', 'feuilly'] }),
    part(17, 'The Centre and the Link', 'Courfeyrac brings warmth to the circle while Bahorel connects it to other groups.', null,
      'Paragraphs 17–27 describe backgrounds and habits. Courfeyrac’s resemblance to Tholomyès is explicitly qualified by a moral difference, not an identity or shared history.', { mentioned: ['courfeyrac', 'bahorel'] }),
    part(28, 'Bossuet and Joly', 'The unlucky law student’s family name and friendship with the anxious medical student are explained.', null,
      'Paragraphs 28–40 embed the father’s 1814 petition in the son’s portrait. Lesgle, Légle, Laigle and Bossuet designate the son in different usages, not four members; father and son remain distinct. Hypothetical accidents and Joly’s medical anxieties are not observed injuries or diagnoses.', { mentioned: ['bossuet', 'joly'] }),
    part(41, 'A Sceptic Among Believers', 'Grantaire’s disbelief contrasts with the others’ convictions and his attachment to Enjolras.', null,
      'Paragraphs 41–49 describe recurring relations rather than one drunken meeting. R is Grantaire’s rebus signature, not a separate member; Enjolras does not reciprocate the admiration described here.', { mentioned: ['grantaire', 'enjolras'] }),
  ]],
  [177, [
    scene('start', 'A Name on a Travelling Bag', 'Laigle stops the cab carrying Marius away from his grandfather’s house.', 'cafe-musain-entrance', [
      ['bossuet', 'Recognizes the name on the bag and calls out to a man he has never met.'],
      ['marius', 'Halts the cab and cautiously listens to the stranger.'],
      ['marius-musain-coachman', 'Drives the slowly moving cab that stops when Laigle calls to its passenger.'],
    ], 'Paragraphs 0–16 anchor the encounter to Marius’s expulsion. Recognition of a written name does not imply prior personal acquaintance.'),
    scene(17, 'Present for Pontmercy', 'Laigle recounts answering the roll for the absent Marius and being struck off himself.', 'cafe-musain-entrance', [
      ['bossuet', 'Explains his substitution at roll-call and jokes that exclusion saves him from becoming a lawyer.'],
      ['marius', 'Listens to the account and repeatedly apologizes for the consequence.'],
      ['marius-musain-coachman', 'Waits with the hired cab while its passenger talks to Laigle.'],
    ], 'Paragraphs 17–39 contain a narrated law-school incident two days earlier inside the street conversation. Blondeau is absent; the mock funeral oration explicitly assumes his death and does not establish it.'),
    scene(40, 'An Offered Room', 'Courfeyrac joins them and offers the homeless Marius lodging beside his own room.', 'cafe-musain-entrance', [
      ['courfeyrac', 'Offers accommodation and enters the cab to direct it to his hotel.'],
      ['marius', 'Admits that he does not know where to go and accepts the invitation.'],
      ['bossuet', 'Explains his nickname while conceding that he has no home to offer.'],
      ['marius-musain-coachman', 'Receives Courfeyrac’s instruction to drive to the hotel de la Porte-Saint-Jacques.'],
    ], 'Paragraphs 40–49 identify Bossuet for Marius and begin the departure. The cab’s extravagant rent is a joke about hourly cost.', {
      identityReveals: [{ identity: 'laigle-de-meaux', character: 'bossuet', evidenceParagraph: 47, audience: 'reader' }],
    }),
    part(50, 'Installed Beside Courfeyrac', 'That evening Marius takes a room at the hotel de la Porte-Saint-Jacques.', 'hotel-porte-saint-jacques',
      'The final paragraph reports installation after the ride. It does not place Bossuet in the hotel as a resident.', { kind: 'reported', mentioned: ['marius', 'courfeyrac'] }),
  ]],
  [178, [
    part('start', 'A Friendship Without Questions', 'Within days Marius finds a new ease in Courfeyrac’s company.', 'hotel-porte-saint-jacques',
      'Paragraph 0 summarizes the growing friendship, not a single conversation or instant knowledge of the full family history.', { kind: 'reported', mentioned: ['marius', 'courfeyrac'] }),
    scene(1, 'A Democrat-Bonapartist', 'Courfeyrac asks about political opinions and receives Marius’s self-description.', 'hotel-porte-saint-jacques', [
      ['courfeyrac', 'Questions his new friend and responds with an irreverent comparison.'],
      ['marius', 'Declares himself a democrat-Bonapartist.'],
    ], 'Paragraphs 1–6 give a particular morning’s exchange; the hotel is their established lodging, with no precise room specified.'),
    scene(7, 'Entry to the Revolution', 'Courfeyrac introduces Marius to the circle, whose conversations unsettle his newly settled views.', 'cafe-musain-back-room', [
      ['courfeyrac', 'Leads Marius into the hall and introduces him to the comrades as a pupil.'],
      ['marius', 'Hears the introduction without understanding the designation and encounters unfamiliar arguments.'],
    ], 'Paragraph 7 directly stages the next day’s introduction; paragraphs 8–10 reflect on subsequent impressions. No full attendance roster is supplied, so the other comrades are not assigned guessed identities.'),
    scene(11, 'A Defense of Tragedy', 'Bahorel condemns bourgeois tragedy and Combeferre replies with a defense framed as a poultry comparison.', null, [
      ['bahorel', 'Calls for the rejection of the classic tragedy on the poster.'],
      ['combeferre', 'Argues that classic tragedy may coexist with antique tragedy.'],
      ['marius', 'Hears the unexpected exchange and its irreverent argument.'],
    ], 'Paragraphs 11–12 give an illustrative exchange without locating it precisely. Æschylus and the duck are comparisons, not participants.'),
    scene(13, 'Rousseau’s Street', 'On a walk Courfeyrac mocks Rousseau’s household and Enjolras defends his public legacy.', 'rue-jean-jacques-rousseau', [
      ['marius', 'Walks between the two men and hears their disagreement.'],
      ['courfeyrac', 'Takes Marius’s arm and recounts the philosopher’s treatment of his children.'],
      ['enjolras', 'Rebukes the mockery while distinguishing the people from the abandoned children.'],
    ], 'Paragraphs 13–17 specify a different outing. Rousseau and Thérèse lived there sixty years earlier and are not present.'),
    part(18, 'The Name They Use', 'The circle’s way of naming Napoleon leaves Marius uncertain.', null,
      'Paragraphs 18–19 describe a repeated verbal habit, not a new roll-call or universal agreement about every imperial action.', { mentioned: ['marius', 'jean-prouvaire', 'enjolras'] }),
  ]],
  [179, [
    scene('start', 'Grantaire’s Corner', 'During a noisy winter evening Grantaire’s drunken monologue spills across the back room and addresses the passing dishwasher.', 'cafe-musain-back-room', [
      ['marius', 'Listens silently as the evening’s overlapping conversations begin.'],
      ['enjolras', 'Keeps silent amid the general talk.'],
      ['grantaire', 'Delivers an intoxicated attack on vanity, nations and belief.'],
      ['louison', 'Passes through the room and is addressed by Grantaire.'],
    ], 'Paragraphs 0–5 establish nearly all members, not necessarily every rostered member. The monologue’s historical claims, hostile generalizations and imagined Cleopatra remain speech rather than literal café events.'),
    scene(6, 'Law, a Play, and a Duel', 'Bossuet tries to quiet Grantaire while legal talk, playwriting and a proposed duel compete for attention.', 'cafe-musain-back-room', [
      ['bossuet', 'Attempts to silence Grantaire while pursuing a point of law.'],
      ['grantaire', 'Rejects the interruption and continues with complaints and a song fragment.'],
      ['marius', 'Hears the simultaneous discussions around the room.'],
      ['musain-vaudeville-dictator', 'Proposes character names while planning a vaudeville with his collaborator.'],
      ['musain-vaudeville-scribe', 'Offers to write the dictated names and discusses the proposed roles.'],
      ['musain-duel-adviser', 'Warns his younger companion about a skilled left-handed swordsman.'],
      ['musain-young-duellist', 'Receives the older man’s advice about the opponent he may face.'],
    ], 'Paragraphs 6–22 show overlapping tables. The two writers and the two men discussing a duel are distinct anonymous participants. Dorimon, Célestine and the colonel are proposed fictional roles; the opponent is absent and no duel is fought. No named society member is guessed to be one of these four men.'),
    scene(23, 'Dominoes and Musichetta', 'Joly and Bahorel discuss their love affairs over dominoes, with an interruption from Grantaire.', 'cafe-musain-back-room', [
      ['joly', 'Complains of Musichetta’s coolness and praises her while hearing advice about clothes.'],
      ['bahorel', 'Describes his own arrangement and advises Joly to buy better trousers.'],
      ['grantaire', 'Calls out a question about the price.'],
      ['marius', 'Is present for the evening’s discussion of love and appearance.'],
    ], 'Paragraphs 23–38 name Musichetta but do not put her or Bahorel’s mistress in the room. Buying trousers is advice, not a completed purchase.', { mentioned: ['musichetta'] }),
    scene(39, 'Prouvaire’s Pagan Myths', 'Jean Prouvaire defends the imaginative survival of the ancient gods in nature.', 'cafe-musain-back-room', [
      ['jean-prouvaire', 'Laughs and argues enthusiastically for the continued imaginative life of pagan myths.'],
      ['marius', 'Hears the poet’s defense in another corner of the discussion.'],
    ], 'Paragraphs 39–41 report a literary argument, not the physical presence or confirmed survival of Jupiter, Pan, Cybele or Io.'),
    scene(42, 'The Charter in the Fire', 'Courfeyrac rejects the granted charter and burns its printed copy while Combeferre watches.', 'cafe-musain-back-room', [
      ['courfeyrac', 'Argues against royal grants and crumples the Touquet Charter into the fire.'],
      ['combeferre', 'Defends the charter weakly and comments on the burning copy.'],
      ['marius', 'Witnesses the argument and destruction of the printed charter.'],
    ], 'Paragraphs 42–46 return to politics in the same room. A physical printed copy burns, not the national constitution magically abolished or the entire café destroyed.', { items: ['touquet-charter-copy'], timeHint: 'Winter evening' }),
  ]],
  [180, [
    scene('start', 'The Name Waterloo', 'A reference to Waterloo turns the evening’s banter into a confrontation over Napoleon.', 'cafe-musain-back-room', [
      ['bossuet', 'Mentions the battle’s date while addressing Combeferre.'],
      ['courfeyrac', 'Makes a numerical joke linking Napoleon’s beginning and end.'],
      ['enjolras', 'Calls the connection crime and expiation and contests the need for Corsica.'],
      ['marius', 'Rises from his water glass and points to Corsica on the wall map.'],
      ['combeferre', 'Is addressed as the conversation turns from banter to imperial politics.'],
      ['bahorel', 'Stops his gesture and listens when the room grows serious.'],
      ['grantaire', 'Is among the speakers whose banter precedes the turn to Waterloo.'],
      ['jean-prouvaire', 'Joins the preceding verbal exchange before the room falls silent.'],
    ], 'Paragraphs 0–15 explicitly continue the previous evening. The named battle does not move the current cast back to 1815.', { items: ['musain-republic-map'] }),
    scene(16, 'What Could Be Greater?', 'Marius praises imperial glory until Combeferre answers that freedom is greater.', 'cafe-musain-back-room', [
      ['marius', 'Delivers an impassioned defense of Napoleon and falters at the answer about freedom.'],
      ['combeferre', 'Answers the praise of conquest with To be free.'],
      ['enjolras', 'Listens to the defense and remains when the rest depart.'],
    ], 'Paragraphs 16–20 preserve the long speech as one argument. Silence is perceived as acquiescence but does not prove assent; the historical figures and archangel imagery belong to Marius’s rhetoric.'),
    scene(21, 'My Mother Is the Republic', 'Combeferre’s song rises from the stairs, and Enjolras explains its meaning to Marius.', 'cafe-musain-back-room', [
      ['combeferre', 'Sings while descending the stairs outside the back room.'],
      ['marius', 'Listens to the song and repeats its reference to a mother without understanding.'],
      ['enjolras', 'Touches his shoulder and identifies his mother figuratively as the Republic.'],
    ], 'Paragraphs 21–25 leave Marius and Enjolras inside the room while Combeferre sings on the stairs outside. His separate position uses the general café context; the song’s Caesar and mother do not establish present cast or biological kinship.'),
  ]],
  [181, [
    part('start', 'Between Two Convictions', 'The shaken Marius doubts his new certainties and stops attending the Café Musain.', null,
      'Paragraphs 0–2 describe the aftermath and inner conflict over time, not an immediate settled conversion to the circle’s opinions.', { kind: 'reported', mentioned: ['marius'] }),
    scene(3, 'The Hotel Must Be Paid', 'Pressed for rent, Marius tells Courfeyrac of his isolation and refuses a loan.', 'hotel-porte-saint-jacques', [
      ['marius', 'Admits to having fifteen francs and a gold watch but refuses borrowed money.'],
      ['hotel-porte-saint-jacques-proprietor', 'Demands payment and leaves after Courfeyrac arrives.'],
      ['courfeyrac', 'Offers a loan and suggests selling clothes and the watch.'],
    ], 'Paragraphs 3–32 stage the financial discussion. Marius’s claim to have no relatives means estrangement, not the literal death of his living family.'),
    scene(33, 'Languages Yet to Learn', 'Courfeyrac suggests translation work, and Marius decides to learn English and German.', 'hotel-porte-saint-jacques', [
      ['courfeyrac', 'Describes a publisher’s possible translation work and asks how Marius will live meanwhile.'],
      ['marius', 'Admits knowing neither language and proposes living on the sale proceeds while learning.'],
    ], 'Paragraphs 33–42 record a future intention, not instant fluency or a completed employment contract.'),
    part(43, 'Eighty Francs, Then Ten', 'Selling clothes and the watch raises sixty-five francs, but the hotel bill consumes seventy of the eighty available.', 'hotel-porte-saint-jacques',
      'Paragraphs 43–49 combine the clothes-dealer’s visit, a separate watchmaker trip and the return to pay rent. Twenty plus forty-five plus fifteen equals eighty before the seventy-franc bill; no enduring balance beyond this point is assumed.', { kind: 'reported', mentioned: ['marius', 'courfeyrac'], items: ['marius-gold-watch'] }),
    part(50, 'The Remittance Returned', 'Marius returns his aunt’s six hundred francs despite having only three francs left, then leaves the hotel to avoid debt.', 'hotel-porte-saint-jacques',
      'Paragraphs 50–54 finally confirm the remittance’s arrival and refusal, separate from the earlier order to send it. His aunt conceals the refusal from Gillenormand; three francs is the later balance, not ten after rent.', { kind: 'reported', mentioned: ['marius', 'gillenormand-elder-daughter', 'gillenormand'], items: ['gillenormand-six-hundred-franc-remittance'] }),
  ]],
]
