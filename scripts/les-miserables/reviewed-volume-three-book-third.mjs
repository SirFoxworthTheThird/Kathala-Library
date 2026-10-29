const segment = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'reported', ...extra,
})
const scene = (at, title, description, location, present, reason, extra = {}) =>
  segment(at, title, description, location, reason, { kind: 'scene', present, ...extra })

export const volumeThreeBookThirdReview = [
  [168, [
    segment('start', 'Madame de T.’s Royalist Salon', 'Gillenormand’s earlier social life centers on a proud, impoverished hostess and an uncompromising royalist circle.', 'madame-t-salon',
      'Paragraphs 0–10 describe repeated attendance around 1817, political songs and judgments. The deceased ambassador and people named in verses are not attendees; song threats are not performed executions.', { mentioned: ['gillenormand', 'baronne-de-t'], timeHint: 'About 1817 and the early Restoration' }),
    segment(11, 'Two Oracles and Their Reputation', 'The narrator contrasts the salon’s regard for Lamothe-Valois with Gillenormand’s wit and authority.', 'madame-t-salon',
      'Paragraphs 11–17 combine portraits, historical analogies and separate remembered remarks, including one at a Te Deum. No single evening unites all the named figures.', { mentioned: ['gillenormand', 'lamothe-valois'], kind: 'exposition' }),
    segment(18, 'The Poor Child', 'A seven-year-old accompanies Gillenormand and his daughter and hears pity directed at his father’s reputation.', 'madame-t-salon',
      'Paragraphs 18–19 describe recurrent attendance and the son-in-law connection. Brigand of the Loire is the circle’s hostile label, not evidence of robbery.', { mentioned: ['gillenormand', 'gillenormand-elder-daughter', 'gillenormand-grandson'] }),
  ]],
  [169, [
    segment('start', 'The Gardener at Vernon', 'The supposed brigand lives quietly among flowers beside the Seine with a servant and few visitors.', 'pontmercy-vernon-house',
      'Paragraphs 0–1 describe daily life about 1817, not a dated visitor’s observation. The curé Abbé Mabeuf must remain distinct from his churchwarden brother.', { mentioned: ['pontmercy', 'abbe-mabeuf'], timeHint: 'About 1817' }),
    segment(2, 'Georges Pontmercy’s Campaigns', 'A military biography traces the veteran’s service through Waterloo and identifies him as the man at Vernon.', null,
      'Paragraphs 2–3 cover many battles, wounds and recoveries rather than a single combat. The account confirms survival after the Ohain ravine already narrated in Volume II.', { mentioned: ['pontmercy'], identityReveals: [{ identity: 'brigand-of-the-loire', character: 'pontmercy', evidenceParagraph: 2, audience: 'reader' }] }),
    segment(4, 'A Title the Restoration Refuses', 'Pontmercy insists on his rank and decoration despite official warnings and diminished pay.', 'vernon',
      'Paragraphs 4–6 combine repeated defiance, a classical comparison and one retort to the prosecutor. Napoleon’s parallel correspondence is elsewhere, not a meeting in Vernon.', { mentioned: ['pontmercy'] }),
    segment(7, 'The Price of His Son’s Inheritance', 'After his wife’s death, Pontmercy accepts separation from his child to protect the promised inheritance.', 'pontmercy-vernon-house',
      'Paragraphs 7–10 explain the family arrangement and identify the son as Marius. The reader learns the sacrifice while Marius remains ashamed and uninformed; the aunt’s maternal wealth differs from Gillenormand’s small remaining estate.', { mentioned: ['pontmercy', 'gillenormand', 'gillenormand-elder-daughter', 'gillenormand-younger-daughter', 'marius'], identityReveals: [{ identity: 'gillenormand-grandson', character: 'marius', evidenceParagraph: 10, audience: 'reader' }] }),
    segment(11, 'A Father Behind the Pillar', 'Pontmercy secretly watches his son at mass, and the churchwarden’s recognition leads to friendship at Vernon.', 'saint-sulpice',
      'Paragraphs 11–13 recount recurring concealed visits followed by a separate Vernon encounter and later confidence. The warden and his priest brother are two people; Marius does not discover the watching father here.', { mentioned: ['pontmercy', 'marius', 'gillenormand-elder-daughter', 'mabeuf', 'abbe-mabeuf'] }),
    segment(14, 'Letters That Never Reach the Son', 'Marius writes formal letters dictated by his aunt, while Gillenormand pockets the father’s tender replies.', null,
      'The final paragraph describes a twice-yearly practice, not one shared writing scene. The unread replies explain why absence of received affection is not absence of paternal love.', { mentioned: ['marius', 'pontmercy', 'gillenormand', 'gillenormand-elder-daughter'] }),
  ]],
  [170, [
    segment('start', 'The Child Among the Old Regime', 'Marius’s imagination is shaped by the salon’s visitors, tragic stories and severe manners.', 'madame-t-salon',
      'Paragraphs 0–9 assemble a recurring social world with embedded anecdotes elsewhere. The child’s phantoms, mummified masters and stuffed servants are imagery, not deaths or supernatural cast.', { mentioned: ['marius', 'gillenormand', 'baronne-de-t'], kind: 'exposition' }),
    segment(10, 'What It Meant to Be Ultra', 'The narrator distinguishes ultra-royalism from the later doctrinarians and qualifies his portrait of the vanished society.', null,
      'Paragraphs 10–20 are an authorial historical essay spanning 1814–1820 and later hindsight. Its quoted defense of royalism is not a newly dated speech by an identified visitor.', { kind: 'exposition' }),
    segment(21, 'A Royalist Law Student', 'Marius passes from his aunt’s care through classical study into law school, retaining the household’s political beliefs.', null,
      'Paragraphs 21–23 summarize years of education and disposition. Neither an instantaneous conversion nor a present classroom scene occurs.', { mentioned: ['marius', 'gillenormand', 'gillenormand-elder-daughter'] }),
  ]],
  [171, [
    segment('start', 'The Household Moves to the Marais', 'Gillenormand leaves society as Marius finishes his classical studies.', 'gillenormand-house',
      'Paragraph 0 supplies the relocation and identifies Nicolette as Magnon’s successor, not the same servant under a new personal identity.', { mentioned: ['gillenormand', 'marius', 'basque', 'nicolette-current'] }),
    scene(1, 'Your Father Demands You', 'Gillenormand tells seventeen-year-old Marius to travel to his ill father the next morning.', 'gillenormand-house', [
      ['gillenormand', 'Announces the urgent summons but directs Marius to the next day’s coach.'],
      ['marius', 'Receives the prospect of seeing his father as an unwelcome duty.'],
    ], 'Paragraphs 1–11 date the summons to 1827. The available overnight coach is a narrator’s missed possibility; neither man inquires about it, so deliberate selection of a fatal delay is not proved.', { timeHint: '1827; Marius has just attained seventeen' }),
    scene(12, 'The Door at Twilight', 'A weeping woman admits Marius to the Vernon house too late to speak with his father.', 'pontmercy-vernon-house', [
      ['marius', 'Asks to see Pontmercy and learns from the woman’s answers that he no longer waits.'],
      ['pontmercy-servant', 'Opens the door with a lamp and directs the arriving son to the room.'],
    ], 'Paragraphs 12–23 stage the arrival and move inward. The colonel’s death has occurred before the son enters.'),
    scene(24, 'A Stranger Beside His Father', 'Marius sees his father’s body among people whose grief he cannot yet share.', 'pontmercy-vernon-house', [
      ['marius', 'Contemplates the body and feels ashamed of his limited grief.'],
      ['pontmercy', 'Lies dead on the floor after the final delirious collapse.'],
      ['pontmercy-doctor', 'Weeps after arriving too late to save the colonel.'],
      ['abbe-mabeuf', 'Prays and sobs beside the dead veteran.'],
      ['pontmercy-servant', 'Laments in the corner among those who knew the dead man.'],
    ], 'Paragraphs 24–33 embed the immediately prior illness and collapse in the death-room encounter. Brain fever is the source’s term; no modern diagnosis is added. Marius does not witness the final breath, and the retained tear is not life.', { stateChanges: [{ character: 'pontmercy', isAlive: false, evidenceParagraph: 26 }] }),
    scene(34, 'The Colonel’s Last Instructions', 'The servant gives Marius his father’s written claim to the barony and request to aid Thénardier.', 'pontmercy-vernon-house', [
      ['pontmercy-servant', 'Finds the colonel’s written instructions and hands the paper to his son.'],
      ['marius', 'Takes and preserves the paper out of respect for death, before understanding his father’s love.'],
    ], 'Paragraphs35 and37 stage a physical hand-off around the quoted document. Thénardier’s saving act is the colonel’s account without knowledge of the robbery; sergeant is his description, not independently confirmed service. The father is dead and not a participant in this exchange.', { mentioned: ['pontmercy', 'thenardier'], items: ['pontmercy-last-instructions'] }),
    segment(38, 'Buried and Forgotten', 'The uniform and sword are sold, the garden is plundered and Marius returns to his studies after the burial.', 'vernon',
      'Paragraphs 38–40 summarize the aftermath over days. Crape on the hat is external mourning, not proof of the later emotional transformation already occurring.', { mentioned: ['marius', 'gillenormand', 'pontmercy'] }),
  ]],
  [172, [
    scene('start', 'The Warden’s Place', 'At Saint-Sulpice Marius yields a chair to its customary occupant.', 'saint-sulpice', [
      ['marius', 'Moves aside when the old man claims the named chair behind the pillar.'],
      ['mabeuf', 'Claims the seat marked with his name as warden.'],
    ], 'Paragraphs 0–2 begin before the mass; the chair names the warden, distinct from the Abbé at Vernon.'),
    scene(3, 'He Was My Father', 'After mass the warden explains the father’s hidden visits and learns that he is speaking to the son.', 'saint-sulpice', [
      ['mabeuf', 'Explains the sacrifice he observed and recognizes Marius as the watched child.'],
      ['marius', 'Corrects the remembered name and discovers that his father loved him and secretly came to see him.'],
    ], 'Paragraphs 3–12 transfer knowledge previously given only to the reader. The misremembered Pontmarie and Montpercy are corrected to Pontmercy, not new men. Marius escorts the warden home afterward.'),
    scene(13, 'A Hunting Party as Cover', 'Marius obtains leave for a journey that his grandfather assumes concerns a woman.', 'gillenormand-house', [
      ['marius', 'Asks for three days away under the pretext of hunting with friends.'],
      ['gillenormand', 'Grants four days and privately guesses at a love affair.'],
      ['gillenormand-elder-daughter', 'Hears her father’s aside about the supposed romance.'],
    ], 'Paragraphs 13–16 occur the following day. Neither hunting nor romance is confirmed as the purpose.'),
  ]],
  [173, [
    segment('start', 'Reading His Father into History', 'After the unexplained journey Marius studies military records and seeks testimony about the colonel.', 'paris-law-school-library',
      'Paragraphs 0–5 summarize research and separate meetings, not one library discussion. His grandfather misreads the absorption as romantic passion; the journey’s destination remains withheld.', { mentioned: ['marius', 'mabeuf', 'gillenormand', 'pontmercy'] }),
    segment(6, 'A Mind on the March', 'New historical knowledge and remorse reshape Marius’s view of his father, France and Napoleon.', null,
      'Paragraphs 6–15 explicitly trace successive impressions and warn that his first judgments are incomplete. The inner changes are not a literal encounter with the dead or a universal endorsement of every conclusion.', { mentioned: ['marius', 'pontmercy'], kind: 'exposition' }),
    scene(16, 'Long Live the Emperor', 'Alone over the army bulletins, Marius rises at his window and cries out his new allegiance.', 'marius-gillenormand-attic', [
      ['marius', 'Reads the bulletins at night and impulsively acclaims the Emperor through the open window.'],
    ], 'Paragraphs 16–17 dramatize a particular night. Imagined drums and his father’s apparent whisper are reverie, not a battle outside or an actual ghost.'),
    segment(18, 'The Enthusiasm Goes Too Far', 'The narrator qualifies Marius’s conversion and describes the cards he orders with his inherited title.', null,
      'Paragraphs 18–25 distinguish an intoxicated new belief from the narrator’s judgment. A hundred cards are commissioned and pocketed; no political meeting or public distribution is invented.', { mentioned: ['marius'], items: ['marius-baron-cards'] }),
    segment(26, 'The Search at Montfermeil', 'His growing distance from his grandfather accompanies a failed attempt to find Thénardier.', 'montfermeil',
      'Paragraphs 26–33 mix habitual concealment, one four-day search and family speculation about the neck ribbon. The inn is closed and Thénardier’s whereabouts remain unknown to Marius; the ribbon’s contents are not yet disclosed.', { mentioned: ['marius', 'gillenormand', 'gillenormand-elder-daughter', 'thenardier'] }),
  ]],
  [174, [
    segment('start', 'The Favored Lancer', 'Théodule’s family relationship and rare visits explain why Marius does not recognize him.', null,
      'Paragraphs 0–1 introduce the officer before the scene. The cousins know names, not familiar faces; the earlier statement that Marius had never seen him is qualified by Théodule’s later claim to have seen Marius.', { mentioned: ['theodule', 'marius', 'gillenormand-elder-daughter'], kind: 'exposition' }),
    scene(2, 'Ten Louis and a Commission', 'Aunt Gillenormand receives Théodule and persuades him to investigate Marius’s journey.', 'gillenormand-elder-daughter-room', [
      ['gillenormand-elder-daughter', 'Gives ten louis and asks the officer to follow Marius in search of a supposed woman.'],
      ['theodule', 'Explains his transfer and diligence route and accepts the spying commission.'],
    ], 'Paragraphs 2–68 combine the aunt’s earlier suspicions with the present visit. The romance is a shared assumption. Same-evening intentions precede a later statement of next-evening departure; preserve the source’s timing rather than resolve it by invention.'),
    scene(69, 'The Watcher Sleeps', 'Théodule sleeps through the coach journey and wakes at Vernon to find Marius still aboard.', 'vernon-coach-relay', [
      ['marius', 'Travels without suspecting surveillance and gets down at Vernon.'],
      ['theodule', 'Sleeps through his watch and recalls the commission at the relay.'],
    ], 'Paragraphs 69–76 move the same diligence to dawn. Guessed possible stopping places are not the actual itinerary.'),
    scene(77, 'Flowers for a Supposed Rendezvous', 'Marius buys a bouquet while Théodule follows him toward and around the church.', 'vernon-church-approach', [
      ['marius', 'Buys the finest flowers and walks around the church without entering.'],
      ['theodule', 'Follows from curiosity and continues interpreting the errand as a romance.'],
      ['vernon-flower-girl', 'Offers flowers to travellers and sells a bouquet to Marius.'],
    ], 'Paragraphs 77–88 give the purchase and pursuit. The flower seller remains at the relay rather than being presumed to follow the men around the church.'),
    scene(89, 'The Bouquet on the Grave', 'Théodule finds Marius sobbing before the cross naming Colonel Baron Pontmercy.', 'pontmercy-vernon-grave', [
      ['marius', 'Kneels and weeps after strewing the bouquet on his father’s grave.'],
      ['theodule', 'Discovers the grave that disproves the supposed romantic rendezvous.'],
    ], 'Paragraphs 89–90 disclose the destination to the watcher and reader. The lass is a grave is a correction of inference, not a dead romantic partner.'),
  ]],
  [175, [
    segment('start', 'The Journeys Explained', 'The narrator confirms the earlier grave visits and describes Théodule’s silent retreat.', 'pontmercy-vernon-grave',
      'Paragraphs 0–1 resolve the journeys’ purpose retrospectively. Théodule decides not to report; the discovery is not what informs Gillenormand of the change.', { mentioned: ['marius', 'theodule'] }),
    scene(2, 'The Coat Left Behind', 'Returning home, Marius leaves his coat and neck ribbon before going to bathe.', 'marius-gillenormand-attic', [
      ['marius', 'Leaves the travelling coat and ribbon in his room and goes out again.'],
    ], 'Paragraph2 follows Marius into and out of his room. His grandfather has not arrived. No particular swimming-school address or observed position after departure is supplied.'),
    scene(3, 'Too Late for an Embrace', 'Gillenormand climbs to his grandson’s attic but finds only the discarded travelling clothes.', 'marius-gillenormand-attic', [
      ['gillenormand', 'Climbs to the room after hearing his return and finds only the belongings.'],
    ], 'Paragraphs3–6 explicitly say Marius was no longer there when the grandfather enters. The intended embrace never takes place; Marius is absent from this visit.'),
    scene(7, 'A Paper Instead of a Portrait', 'Gillenormand and his daughter open the case, read the colonel’s words and discover Marius’s cards.', 'gillenormand-drawing-room', [
      ['gillenormand', 'Mistakes the case for a portrait or love letter before recognizing the colonel’s writing.'],
      ['gillenormand-elder-daughter', 'Reads the paper and finds the packet of cards naming Marius as baron.'],
      ['nicolette-current', 'Answers the bell and is ordered to take away the discarded belongings.'],
    ], 'Paragraphs 7–29 expose the case’s actual contents and the family’s discovery. Only the barony passage is quoted here; the same document already received from the servant is not a new testament.', { items: ['pontmercy-last-instructions', 'marius-baron-cards', 'pontmercy-paper-shagreen-case'] }),
    scene(30, 'The Son of My Father', 'An argument over the title becomes a clash of allegiances, and Gillenormand orders Marius out.', 'gillenormand-drawing-room', [
      ['marius', 'Defends his father, insults the Bourbons and leaves at the command to go.'],
      ['gillenormand', 'Denounces the imperial soldiers and expels the grandson after his retort.'],
      ['gillenormand-elder-daughter', 'Watches the confrontation and hears that the two men cannot share a roof.'],
    ], 'Paragraphs 30–47 stage the rupture. Louis XVIII is explicitly already dead; the insult does not make him a living participant. The bust of Berry is an object, not its subject present.'),
    scene(48, 'Money Without His Name', 'The next day Gillenormand orders his daughter to send regular support without mentioning Marius.', 'gillenormand-house', [
      ['gillenormand', 'Orders sixty pistoles every six months while forbidding mention of the grandson.'],
      ['gillenormand-elder-daughter', 'Receives the remittance instruction and her father’s continuing formal address.'],
    ], 'Paragraphs 48–50 give an instruction followed by a three-month habit. They do not establish receipt or acceptance of the money by Marius.'),
    segment(51, 'The Lost Relic and the Unknown Destination', 'The lost case intensifies Marius’s anger as he leaves with thirty francs and a few belongings.', 'paris-latin-quarter',
      'Paragraphs 51–53 distinguish the narrator’s probable accidental loss by Nicolette from Marius’s belief that Gillenormand burned the paper. Neither case nor paper is recovered here; the memorized words survive. He sets out without a settled destination.', { mentioned: ['marius', 'nicolette-current', 'gillenormand'], items: ['pontmercy-last-instructions', 'pontmercy-paper-shagreen-case'] }),
  ]],
]
