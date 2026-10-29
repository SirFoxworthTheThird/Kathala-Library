// Source-reviewed cuts for Volume I, Book Fifth (source chapters 40–52).
// Madeleine is a reader-facing identity here; no editorial revelation of his
// earlier name is attached before the narrator earns it in Book Seventh.
const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const bookFifthReview = [
  [40, [
    scene('start', 'A Changed Native Town', 'Fantine returns to a town transformed by a stranger’s improvements in the manufacture of black glass ornaments.', 'montreuil-sur-mer', [],
      'Paragraphs 0–12 combine Fantine’s 1818 return with the manufacturer’s earlier arrival and several years of economic change; this is not a joint scene between them.', { kind: 'reported', mentioned: ['fantine', 'madeleine'], timeHint: 'Fantine returns in 1818; the stranger arrived toward the close of 1815' }),
    scene(13, 'The Fire at the Town-Hall', 'The newcomer’s first night in town is recalled through his rescue of two children from a fire.', 'montreuil-townhall', [
      ['madeleine', 'Rushes into the burning town-hall and saves the gendarmerie captain’s two children before anyone asks for his passport.'],
    ], 'Paragraph 13 recounts one particular rescue and first names Father Madeleine. The children are explicit rescue participants but have no individual keys yet; the captain’s own presence is not established.', { timeHint: 'A December evening on the day of arrival, retrospectively placed in late 1815' }),
  ]],
  [41, [
    scene('start', 'Employment and Gifts', 'Madeleine’s factory and gifts enrich the district while the townspeople debate his motives.', 'montreuil-sur-mer', [],
      'Paragraphs 0–5 summarize manufacturing, segregated workshops, charitable institutions, worship and political rivalry across years. The deputy’s rivalry is not a witnessed conversation with Madeleine.', { kind: 'reported', mentioned: ['madeleine'], timeHint: 'Includes the sum held with Laffitte in 1820; not a single day' }),
    scene(6, 'Two Honours Refused', 'In 1819 Madeleine refuses both appointment as mayor and the Legion of Honor, provoking fresh gossip.', 'montreuil-sur-mer', [],
      'Paragraphs 6–11 report separate appointments and repeated social invitations. Neither the King nor the exhibition jury is placed in town with Madeleine.', { kind: 'reported', mentioned: ['madeleine'], timeHint: '1819' }),
    scene(12, 'The Good a Mayor Can Do', 'Renewed public pressure and an old woman’s challenge persuade Madeleine to accept the mayoralty.', 'montreuil-sur-mer', [
      ['madeleine', 'Accepts the renewed appointment after declining it again and hearing the appeal to the good he could do.'],
      ['montreuil-old-woman', 'Calls from her threshold that a good mayor is useful and asks whether he fears doing good.'],
    ], 'Paragraphs 12–13 culminate in a direct street apostrophe. Its speaker is not identified with any earlier anonymous woman.', { timeHint: '1820; distinguishes the accepted appointment from the two refusals in 1819' }),
  ]],
  [42, [
    scene('start', 'Books and Country Walks', 'The narrator describes Madeleine’s solitary habits, practical knowledge, strength, and discreet generosity.', 'montreuil-sur-mer', [],
      'Paragraphs 0–4 describe habitual walks, reading and repeated assistance, not one contrived encounter with every beneficiary.', { kind: 'exposition', mentioned: ['madeleine'] }),
    scene(5, 'The Uprooted Nettles', 'Madeleine tells country people how neglected nettles could be useful and draws a parallel with human lives.', 'montreuil-countryside', [
      ['madeleine', 'Examines uprooted nettles and argues that neglect, rather than intrinsic badness, makes plants and people harmful.'],
    ], 'Paragraph 5 marks a particular encounter. Its unnamed country listeners await group coverage; the advice remains his speech, not external factual guidance.'),
    scene(6, 'A Discreet Benefactor', 'Childhood toys, funerals, and secret gifts complete the portrait of Madeleine’s quiet charity.', 'montreuil-sur-mer', [],
      'Paragraphs 6–9 range over recurrent actions and public judgments. No specific bereaved family or child is invented.', { kind: 'reported', mentioned: ['madeleine'] }),
    scene(10, 'The Supposed Grotto', 'A curious visitor asks to see the mayor’s mysterious room and finds plain furniture and two old candlesticks.', 'madeleine-bedroom', [
      ['madeleine', 'Immediately admits the curious visitors instead of concealing his simply furnished room.'],
      ['montreuil-curious-young-woman', 'Asks to see the rumoured grotto and finds a plain bedroom with antique silver candlesticks.'],
    ], 'Paragraph 10 moves from rumour to an actual visit. Skulls and hourglasses belong to gossip, not the room inventory. The accompanying visitors are not individually named.', { items: ['silver-candlesticks'] }),
    scene(11, 'Millions in the Gossip', 'Rumours of a secret room persist alongside inflated estimates of the mayor’s accessible fortune.', 'montreuil-sur-mer', [],
      'Paragraphs 11–12 contrast hearsay with the narrator’s lower sum; a hypothetical withdrawal from Laffitte is not a witnessed bank visit.', { kind: 'exposition', mentioned: ['madeleine'], timeHint: 'Reported reserve is six hundred and thirty or forty thousand francs, not the rumoured millions' }),
  ]],
  [43, [
    scene('start', 'News from D——', 'The death of Bishop Myriel prompts a reflection on the sister who cared for him in blindness.', 'digne', [],
      'Paragraphs 0–3 report death and interpret companionship without staging a deathbed or assigning an exact date of blindness. The passage does not establish who witnessed his death.', { kind: 'reported', mentioned: ['myriel', 'baptistine'], timeHint: 'Newspaper announcement at the beginning of 1820; source gives age eighty-two' }),
    scene(4, 'Mourning and a Question of Kinship', 'Madeleine wears mourning, then denies a dowager’s suggestion that he is the bishop’s cousin.', 'montreuil-sur-mer', [
      ['madeleine', 'Wears black and crape, denies being the bishop’s cousin, and explains the mourning by saying he served in his family in youth.'],
      ['montreuil-mourning-dowager', 'Asks whether the mourning mayor is related to the late bishop.'],
    ], 'Paragraphs 4–8 move from the town’s response to one evening’s direct question. His account of former service is a statement, not independent proof of a youthful job.', { timeHint: 'After the local reprint; same retrospective year 1820' }),
    scene(9, 'Questions for the Savoyards', 'The mayor repeatedly asks passing Savoyard boys their names and gives them money.', 'montreuil-sur-mer', [],
      'Paragraph 9 reports a repeated custom, not a successful encounter with Little Gervais; no boy is identified as the child on the plain.', { kind: 'reported', mentioned: ['madeleine'] }),
  ]],
  [44, [
    scene('start', 'An Exception to the Town’s Respect', 'As Madeleine gains near-universal trust, one suspicious police inspector continues watching him.', 'montreuil-sur-mer', [],
      'Paragraphs 0–6 introduce Javert through repeated surveillance and his appointment history; no new specific street encounter or prior certainty is fabricated.', { kind: 'exposition', mentioned: ['madeleine', 'javert'], timeHint: 'Toward 1821 within a retrospect spanning six or seven years; Javert arrived after the manufacturer’s fortune was made' }),
    scene(7, 'The Watchdog’s Creed', 'An analogy between men and animals leads into Javert’s origins, appearance, and absolute faith in authority.', 'montreuil-sur-mer', [],
      'Paragraphs 7–22 are philosophical comparison and portrait. The dog, wolf and tiger are figures, not transformations; hypothetical arrests of his parents are not events.', { kind: 'exposition', mentioned: ['javert'] }),
    scene(23, 'A Thread That Breaks', 'Madeleine endures the scrutiny while Javert pursues and then loses a tentative trail into his past.', 'montreuil-sur-mer', [],
      'Paragraphs 23–27 describe continuing conduct, speculative investigation, and a transition to the next incident. Javert’s self-addressed certainty is not narratorial identification.', { kind: 'reported', mentioned: ['madeleine', 'javert'] }),
  ]],
  [45, [
    scene('start', 'A Carter Under the Wheels', 'Madeleine comes upon Fauchelevent trapped beneath a loaded cart sinking into the wet road.', 'montreuil-unpaved-alley', [
      ['madeleine', 'Asks how soon a jack-screw can come and sees that the sinking cart will crush the man first.'],
      ['fauchelevent', 'Lies pinned by the loaded vehicle and begs the bystanders to save him.'],
      ['javert', 'Has already sent for a jack-screw before Madeleine notices him in the crowd.'],
    ], 'Paragraphs 0–16 establish the accident with a retrospective account of the carter’s jealousy. Javert is explicitly present from the accident, not introduced only when Madeleine notices him.', { timeHint: 'A morning before Madeleine’s appointment as mayor, as chapter 46 clarifies; prior night’s rain' }),
    scene(17, 'The Strength of One Convict', 'Madeleine offers increasing rewards, and Javert says only a Toulon convict could lift such a weight.', 'montreuil-unpaved-alley', [
      ['madeleine', 'Offers five, ten, then twenty louis for a volunteer and turns pale under Javert’s pointed recollection.'],
      ['javert', 'Fixes his eyes on Madeleine and says he knew only one man strong enough, a convict at Toulon.'],
      ['fauchelevent', 'Cries that his ribs are breaking as the wheels sink further.'],
    ], 'Paragraphs 17–41 make the ethical and personal risk explicit without giving the crowd a named suspect or treating Javert’s inference as proved identification.'),
    scene(42, 'Beneath the Cart', 'Madeleine crawls under the vehicle, lifts it with his back, and draws the crowd into the rescue.', 'montreuil-unpaved-alley', [
      ['madeleine', 'Persists after two failed attempts, raises the cart, and emerges muddy and sweating while facing Javert.'],
      ['fauchelevent', 'Urges his rescuer to retreat, then is freed and kisses Madeleine’s knees in gratitude.'],
      ['javert', 'Continues staring at Madeleine after the display of extraordinary strength.'],
    ], 'Paragraphs 42–48 cover the actual rescue; the anonymous helping arms remain a group to resolve in enrichment. No jack-screw arrival is invented.'),
  ]],
  [46, [
    scene('start', 'A Banknote and a Garden Post', 'Fauchelevent recovers with a stiff knee, receives payment for his ruined equipment, and obtains work at a Paris convent.', 'montreuil-factory-infirmary', [],
      'Paragraph 0 compresses transport, treatment, a next-morning discovery, recovery, and relocation. Retain it as reported sequence rather than a bedside meeting with Madeleine or a fully recovered knee.', { kind: 'reported', mentioned: ['madeleine', 'fauchelevent'], timeHint: 'Banknote discovered the following morning; later recovery and move to the Rue Saint-Antoine are undated' }),
    scene(1, 'The Scarf of Office', 'After Madeleine becomes mayor, Javert’s suspicion is constrained by respect for his official authority.', 'montreuil-sur-mer', [],
      'Paragraph 1 explicitly places appointment after the cart incident; later reticence is a repeated pattern, not a dismissal from office.', { kind: 'reported', mentioned: ['madeleine', 'javert'] }),
    scene(2, 'A Thermometer of Prosperity', 'The narrator uses the lower cost of tax collection as evidence of the district’s improved condition.', 'montreuil-sur-mer', [],
      'Paragraph 2 is economic commentary spanning seven years, with Villèle mentioned as an observer rather than visiting the factory.', { kind: 'exposition', mentioned: ['madeleine'] }),
    scene(3, 'The Women’s Workroom', 'The account returns to Fantine’s arrival and admission to factory work sufficient to support her.', 'madeleine-women-workroom', [
      ['fantine', 'Obtains work in the unfamiliar trade and earns enough to live, despite limited skill at it.'],
    ], 'Paragraph 3 returns to her 1818 arrival after the forward-ranging economic portrait; Madeleine’s open-door policy does not establish a personal hiring interview.', { timeHint: 'Return to Fantine’s arrival in 1818, not a date after the seven-year economic summary' }),
  ]],
  [47, [
    scene('start', 'Work, a Room, and Letters', 'Fantine’s renewed hopes and regular letters draw attention from the women around her.', 'montreuil-sur-mer', [],
      'Paragraphs 0–2 summarize her rented room, credit, remittances, and workroom gossip; Cosette remains at Montfermeil.', { kind: 'reported', mentioned: ['fantine', 'cosette'] }),
    scene(3, 'The Appetite for Other People’s Secrets', 'The narrator describes the labour and expense people devote to intrusive curiosity.', null, [],
      'Paragraphs 3–4 generalize through hypothetical questions and examples; these are not additional crimes or visits in Fantine’s life.', { kind: 'exposition' }),
    scene(5, 'A Secret Carried Back from Montfermeil', 'Workroom surveillance and the letter-writer’s indiscretion lead Victurnien to verify the existence of Fantine’s child.', 'montreuil-sur-mer', [],
      'Paragraphs 5–10 cover repeated observation, the wine-shop disclosure, a journey, and Victurnien’s biography. The chapter title says thirty francs while her reported speech says thirty-five; neither is silently reconciled.', { kind: 'reported', mentioned: ['fantine', 'victurnien', 'montreuil-public-writer', 'thenardier', 'madame-thenardier', 'cosette'] }),
    scene(11, 'Fifty Francs and a Dismissal', 'The superintendent dismisses Fantine in the mayor’s name and gives her fifty francs, leaving her ashamed and indebted.', 'madeleine-women-workroom', [
      ['fantine', 'Pleads to stay because of her debts, then leaves believing that Madeleine has rightly judged and dismissed her.'],
      ['madeleine-superintendent', 'Hands over fifty francs, orders Fantine out of the factory, and asks her to leave the district in the mayor’s name.'],
    ], 'Paragraphs 11–14 give the direct dismissal and its immediate aftermath. Madeleine is absent and, as the next chapter states, unaware; Cosette’s payment demand is correspondence, not her presence.', { mentioned: ['madeleine'], timeHint: 'After more than a year at the factory; later placed toward the end of winter; contemporaneous with demand for fifteen francs' }),
  ]],
  [48, [
    scene('start', 'Authority Delegated', 'The narrator explains that the superintendent used discretionary authority and the charity fund without Madeleine’s knowledge.', 'madeleine-factory', [],
      'Paragraphs 0–3 correct Fantine’s belief rather than replay the dismissal. No permission from Madeleine for this particular decision is invented.', { kind: 'exposition', mentioned: ['madeleine', 'madeleine-superintendent', 'fantine'] }),
    scene(4, 'Creditors and Shirts', 'Threatened by creditors and refused service work, Fantine returns furniture and takes poorly paid sewing.', 'montreuil-sur-mer', [],
      'Paragraphs 4–5 compress the unsuccessful search, separate creditor encounters, and new work. The landlord and furniture-dealer are distinct claimants; twelve sous wages and ten sous support costs are daily amounts.', { kind: 'reported', mentioned: ['fantine', 'fantine-furniture-dealer', 'fantine-landlord'] }),
    scene(6, 'Marguerite’s Lessons', 'A poor neighbour teaches Fantine how to live with almost nothing as the child remains beyond her reach.', 'fantine-montreuil-room', [],
      'Paragraphs 6–11 combine repeated lessons, a reported resolve to work longer, the thought of bringing Cosette, and the neighbour’s identification. Neither an actual reunion nor one day containing all the privations is staged.', { kind: 'reported', mentioned: ['fantine', 'marguerite', 'cosette'] }),
    scene(12, 'Learning to Endure the Street', 'Fantine grows outwardly defiant under public contempt while Victurnien congratulates herself and the cough worsens.', 'montreuil-sur-mer', [],
      'Paragraphs 12–19 describe months of changing behaviour and recurrent symptoms. Victurnien sees her from a window, not a face-to-face rebuke; Marguerite is a separate confidante.', { kind: 'reported', mentioned: ['fantine', 'victurnien', 'marguerite'], timeHint: 'Two or three months to overcome the initial shame; no exact symptom-onset date supplied' }),
  ]],
  [49, [
    scene('start', 'Another Winter', 'Winter narrows Fantine’s work and brings creditors and costly letters from the innkeepers.', 'fantine-montreuil-room', [],
      'Paragraph 0 marks the seasonal transition from a dismissal at winter’s end through summer to the next winter.', { kind: 'reported', mentioned: ['fantine'], timeHint: 'Winter after the intervening summer; do not derive an exact date from surrounding inconsistent spans' }),
    scene(1, 'Ten Francs for Her Hair', 'A demand for a skirt sends Fantine to sell her hair for ten francs.', 'montreuil-barber-shop', [
      ['fantine', 'Lets down her long hair and tells the barber to cut it off for the ten francs her child’s clothing is said to require.'],
      ['montreuil-barber', 'Admires the hair and offers ten francs to buy it.'],
    ], 'Paragraphs 1–5 give the letter’s effect and one evening’s sale. Cosette’s alleged nakedness is the innkeepers’ demand, not a witnessed scene.', { timeHint: 'That evening after receiving the letter' }),
    scene(6, 'A Petticoat for the Wrong Child', 'The skirt Fantine sends is given to Éponine, while she believes she has clothed Cosette.', 'thenardier-inn', [],
      'Paragraphs 6–7 juxtapose Montfermeil conduct with the absent mother’s mistaken belief. Fantine does not witness the diversion.', { kind: 'reported', mentioned: ['fantine', 'cosette', 'eponine', 'thenardier', 'madame-thenardier'], items: ['fantine-knitted-petticoat'] }),
    scene(8, 'Bitterness and a Second Abandonment', 'Fantine’s anger settles on Madeleine, and an abusive passing lover deepens her isolation.', 'montreuil-sur-mer', [],
      'Paragraphs 8–13 span repeated taunting displays, a short abusive liaison, and worsening symptoms. The unnamed musician is distinct from Tholomyès; Cosette’s radiance is inward, not a visit.', { kind: 'reported', mentioned: ['fantine', 'madeleine', 'fantine-musician-lover', 'cosette'] }),
    scene(14, 'A Demand for Forty Francs', 'A letter claiming that Cosette needs medicine sends Fantine out in desperate, brittle laughter.', 'fantine-montreuil-room', [
      ['fantine', 'Laughs at the impossible sum, rereads the letter on the stairs, and goes out still repeating its demand.'],
      ['marguerite', 'Hears Fantine’s scornful disbelief at a demand for forty francs before the later account of the dentist.'],
    ], 'Paragraphs 14–18 cover receipt and departure with a short anonymous street question. Identification of the old neighbour with Marguerite follows in paragraph 26. The fever claim is not converted into an actual illness.', { items: ['thenardier-false-fever-letter'] }),
    scene(19, 'The Dentist’s Offer', 'A travelling tooth-puller offers two gold napoleons for Fantine’s front teeth, and she recoils.', 'montreuil-square', [
      ['fantine', 'Asks what her palettes are and flees horrified when she understands the offer.'],
      ['travelling-dentist', 'Offers one napoleon per upper front tooth and names the Tillac d’Argent as his evening address.'],
      ['toothless-woman', 'Calls Fantine fortunate to be offered two napoleons for her teeth.'],
    ], 'Paragraphs 19–25 give the public offer, not the extraction, which the narrative withholds until the next morning.'),
    scene(26, 'Forty Francs and a Fever', 'At home Fantine condemns the dentist, then questions Marguerite about the illness named in the letter.', 'fantine-montreuil-room', [
      ['fantine', 'Rejects the idea of losing teeth, returns repeatedly to the letter, and asks whether a child may die of the named fever.'],
      ['marguerite', 'Calculates the offer at forty francs and answers that the illness can require medicines and cause death.'],
    ], 'Paragraphs 26–43 contain the conversation and short stairway rereadings. Marguerite’s general answers do not diagnose the absent Cosette.', { items: ['thenardier-false-fever-letter'] }),
    scene(44, 'The Bloody Smile', 'After a night-time errand, Fantine shows Marguerite the forty francs and the gap where her teeth have been removed.', 'fantine-montreuil-room', [
      ['fantine', 'Sits sleepless and chilled beside two napoleons, then reveals a bleeding gap when she smiles.'],
      ['marguerite', 'Arrives before daylight, fears the wasted candle, and discovers the cost of the money on the table.'],
    ], 'Paragraph 44 is the short departure toward the inns; paragraphs 45–55 reveal the result at home next morning. Do not fabricate a witnessed extraction scene or a dentist’s bedside presence.', { timeHint: 'Following morning before daylight', stateChanges: [{ character: 'fantine', injury: 'two upper front teeth extracted; bloody saliva at the lips', evidenceParagraph: 55 }] }),
    scene(56, 'The False Fever', 'Fantine sends the money, and the narrator reveals that Cosette’s supposed illness was a ruse.', 'montfermeil', [],
      'Paragraphs 56–57 explicitly distinguish the remittance from the lie that prompted it. Cosette receives no fever or convalescence state.', { kind: 'reported', mentioned: ['fantine', 'cosette', 'thenardier', 'madame-thenardier'] }),
    scene(58, 'What Is Left to Sell', 'In an attic, reduced wages and another demand force Fantine toward prostitution.', 'fantine-montreuil-attic', [],
      'Paragraphs 58–61 combine an earlier room move, disposal of the mirror, repeated harassment, seventeen-hour workdays and the final decision. The counterfeit convalescence in the demand is not narrator-certified health history.', { kind: 'reported', mentioned: ['fantine', 'fantine-furniture-dealer', 'thenardier', 'cosette', 'madeleine'], timeHint: 'The move to the attic occurred earlier; daily sewing earnings fall from twelve to nine sous' }),
  ]],
  [50, [
    scene('start', 'The Price of Misery', 'The narrator argues that poverty has sold Fantine into a form of slavery while warning that her ordeal is not over.', null, [],
      'All eleven paragraphs are authorial argument and interpretation. Figurative death, marble, mire and exhaustion are not physical transformations or a death state.', { kind: 'exposition', mentioned: ['fantine'] }),
  ]],
  [51, [
    scene('start', 'The Provincial Idler', 'A portrait of provincial dandies explains the sort of man who will torment Fantine.', 'montreuil-sur-mer', [],
      'Paragraphs 0–5 are social taxonomy and fashion commentary. The hypothetical provincial Tholomyès is not a return visit.', { kind: 'exposition', mentioned: ['tholomyes'] }),
    scene(6, 'Snow Down Her Back', 'Bamatabois’s insults turn into a physical assault, and Fantine attacks him in the snowy street.', 'montreuil-officers-cafe-front', [
      ['bamatabois', 'Mocks Fantine’s appearance, then creeps behind her and thrusts a handful of snow between her bare shoulders.'],
      ['fantine', 'Endures the insults silently until the snow makes her whirl round and claw her tormentor’s face.'],
    ], 'Paragraphs 6–8 establish the provocation and ensuing fight, witnessed by an anonymous crowd. Javert’s later arrival does not establish that he saw the provocation.', { timeHint: 'Snowy evening toward the first of January 1823; narrator also says eight or ten months after the preceding account, not an exact day' }),
    scene(9, 'One Arrest, One Escape', 'Javert seizes Fantine as Bamatabois takes the opportunity to leave.', 'montreuil-officers-cafe-front', [
      ['javert', 'Emerges from the crowd, grips Fantine’s bodice, and orders her to follow him.'],
      ['fantine', 'Recognizes the inspector and becomes pale and silent with terror.'],
      ['bamatabois', 'Escapes while the inspector’s attention is on Fantine.'],
    ], 'Paragraphs 9–11 fix the arrest and the man’s departure; he must not be carried into the subsequent station scene.'),
  ]],
  [52, [
    scene('start', 'Through the Square', 'Javert drags Fantine toward the station while spectators follow and jeer.', 'montreuil-square', [
      ['javert', 'Breaks the circle and leads the silent prisoner across the square.'],
      ['fantine', 'Follows mechanically without speaking as the crowd turns her misery into amusement.'],
    ], 'Paragraph 0 is the public transit; the next paragraph closes the station door against the spectators.'),
    scene(1, 'Six Months', 'Inside the station Javert writes the order and rejects Fantine’s pleas about the child who depends on her.', 'montreuil-police-station', [
      ['javert', 'Writes and signs an order for imprisonment, insists on six months, and rejects the explanation of provocation.'],
      ['fantine', 'Begs on her knees, recounts the snow, and fears that imprisonment will leave Cosette without support.'],
      ['montreuil-guard-sergeant', 'Brings the candle and receives the order to take three men and convey the prisoner to jail.'],
    ], 'Paragraphs 1–14 set the closed-room proceedings. Paragraph 15 later reveals an unnoticed listener; his exact entrance within the plea is not located by a paragraph boundary, so do not assert that he witnessed the sentence’s drafting.', { mentioned: ['cosette', 'bamatabois'] }),
    scene(15, 'The Mayor at the Door', 'Madeleine interrupts the soldiers, and Fantine spits at the man she blames for her misery.', 'montreuil-police-station', [
      ['madeleine', 'Steps forward after hearing the supplications, wipes the spittle from his face, and orders Fantine released.'],
      ['fantine', 'Recognizes the mayor, thrusts aside the soldiers, and spits in his face.'],
      ['javert', 'Salutes his superior and is stunned by both the insult and the calm release order.'],
    ], 'Paragraphs 15–25 disclose the unnoticed arrival a few moments earlier and the intervention. This should eventually carry an entrance interval, not a false exact arrival timestamp.'),
    scene(26, 'A Release Misunderstood', 'Fantine credits Javert with the order and pours out her account while Madeleine listens.', 'montreuil-police-station', [
      ['fantine', 'Mistakes the source of her reprieve, describes the dismissal and falling wages, and starts to leave believing Javert has freed her.'],
      ['madeleine', 'Listens closely, finds his purse empty, and asks the amount of her debt.'],
      ['javert', 'Stands motionless until the sound of the latch rouses him.'],
    ], 'Paragraphs 26–39 distinguish her belief from both men’s actual conduct. The empty purse is not proof that Madeleine has lost his fortune.'),
    scene(40, 'Two Claims to Authority', 'Javert blocks the departure, but Madeleine asserts municipal authority and orders him out.', 'montreuil-police-station', [
      ['javert', 'Orders the sergeant to stop Fantine and defends detention before finally bowing and leaving on command.'],
      ['madeleine', 'Explains that witnesses blamed the townsman, forgives the insult to himself, and invokes his legal authority to release the prisoner.'],
      ['fantine', 'Lets go of the latch, falls silent, and watches her fate contested between the two officials.'],
      ['montreuil-guard-sergeant', 'Is addressed when Javert challenges the attempted departure and hears the mayor claim the release order.'],
    ], 'Paragraphs 40–72 settle the dispute and explicitly remove Javert. Madeleine learned the provocation by inquiries in the square, not by claiming he personally saw the snow assault.'),
    scene(73, 'A Promise to Mother and Child', 'With Javert gone, Madeleine offers to settle Fantine’s debts and bring her child, and she faints.', 'montreuil-police-station', [
      ['fantine', 'Begins to trust the man she hated, kneels to kiss his hand, and faints under the promise of seeing her child.'],
      ['madeleine', 'Says he knew nothing of the dismissal and undertakes the care of Fantine and Cosette.'],
    ], 'Paragraphs 73–78 place his assurance after the inspector’s departure. The detachment has not been dismissed, but Javert is absent and gets no knowledge of the private assurance.', { mentioned: ['cosette'], stateChanges: [{ character: 'fantine', condition: 'faints after the assurance of help', evidenceParagraph: 78 }] }),
  ]],
]
