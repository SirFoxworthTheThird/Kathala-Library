const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const bookSeventhReview = [
  [55, [
    scene('start', 'Two Sisters of Charity', 'The narrator introduces the infirmary’s nurses and Sister Simplice’s unbroken devotion to truth.', 'montreuil-factory-infirmary', [],
      'Paragraphs 0–7 interrupt the approaching afternoon visit with portraits. The Sicilian patron saint and the quoted Vincent de Paul are not nurses in the room.', { kind: 'exposition', mentioned: ['sister-simplice', 'sister-perpetue', 'madeleine', 'fantine'], timeHint: 'The afternoon following Javert’s visit; later recalled as yesterday, so do not force an extra calendar day into the sequence' }),
    scene(8, 'A Special Recommendation', 'Madeleine privately commends Fantine to Sister Simplice’s care.', 'montreuil-infirmary-antechamber', [
      ['madeleine', 'Takes the nurse aside and stresses Fantine’s care with unusual gravity.'],
      ['sister-simplice', 'Hears the recommendation in a tone she will remember afterward.'],
    ], 'Paragraph 8 is the private exchange before paragraph 9 approaches the patient; no knowledge of the Champmathieu case is imparted here.'),
    scene(9, 'An Hour Beside Fantine', 'Madeleine prolongs his customary visit and hears the doctor’s warning that Fantine is failing.', 'montreuil-factory-infirmary', [
      ['fantine', 'Asks about Cosette through her fever and enjoys an hour with her visitor instead of half an hour.'],
      ['madeleine', 'Promises that Cosette will come soon and repeatedly asks that the patient want for nothing.'],
      ['fantine-doctor', 'Bends to Madeleine’s ear and warns that the patient is losing ground rapidly.'],
    ], 'Paragraphs 9–15 give the visit; the whispered warning is not assumed to be heard by Fantine.', { mentioned: ['cosette'] }),
    scene(16, 'Figures on a Map', 'Back at the town-hall, Madeleine studies a road map and writes down figures.', 'madeleine-study', [
      ['madeleine', 'Examines the road map of France and pencils a few figures on a slip.'],
      ['montreuil-clerk', 'Observes the mayor examining the map without being told his destination.'],
    ], 'The final paragraph changes setting to the study and introduces a specific observer.', { items: ['madeleine-route-slip'] }),
  ]],
  [56, [
    scene('start', 'The Knocker Set Down', 'On his way to hire a vehicle, Madeleine nearly knocks at the parsonage and then walks on.', 'montreuil-parsonage-door', [
      ['madeleine', 'Retraces his steps, lifts the knocker, then lowers it silently and resumes his walk.'],
      ['montreuil-parsonage-passerby', 'Sees the hesitation at the door without hearing a conversation with the priest.'],
    ], 'Paragraphs 0–1 give the actual aborted call; the respectable curé is not consulted or placed at the door.'),
    scene(2, 'A Horse for Twenty Leagues', 'Scaufflaire agrees to supply a white horse and an uncovered tilbury for an urgent journey.', 'scaufflaire-hire-yard', [
      ['madeleine', 'Pays sixty francs for two days, accepts the light uncovered vehicle, and evades the question of destination.'],
      ['scaufflaire', 'Specifies a rest and supervised feeding, warns against riding the horse, and promises the vehicle for the morning.'],
    ], 'Paragraphs 2–52 contain one negotiation and the mayor’s first departure. The route figures are shown but not yet decoded for the reader.', { items: ['madeleine-route-slip', 'scaufflaire-tilbury'], timeHint: 'Delivery requested at half-past four the next morning; thirty francs per day' }),
    scene(53, 'A Guarantee Left Behind', 'Madeleine returns to leave a five-hundred-franc guarantee for horse and vehicle.', 'scaufflaire-hire-yard', [
      ['madeleine', 'Comes back after a few minutes, asks the value, and leaves a banknote as security until his return.'],
      ['scaufflaire', 'Estimates five hundred francs and regrets not asking twice as much after the mayor leaves.'],
    ], 'Paragraphs 53–63 are an explicitly second visit, not a second rental or outright purchase.'),
    scene(64, 'The Route Deciphered', 'Scaufflaire and his wife use the forgotten slip to infer that the mayor is going to Arras.', 'scaufflaire-hire-yard', [
      ['scaufflaire', 'Recognizes the relay distances and identifies Arras as the destination.'],
      ['madame-scaufflaire', 'Initially guesses Paris and hears her husband’s contrary calculation.'],
    ], 'Paragraphs 64–68 occur after Madeleine’s final departure. His wife is not placed in the earlier negotiations.', { items: ['madeleine-route-slip'] }),
    scene(69, 'An Early Darkness Upstairs', 'Madeleine shuts himself in, and the portress remarks on the early disappearance of his light.', 'madeleine-factory-lodge', [
      ['madeleine-portress', 'Notices the light go out at half-past eight and wonders aloud whether the mayor is ill.'],
      ['madeleine-cashier', 'Hears the remark but goes to bed without taking it seriously.'],
    ], 'Paragraphs 69–70 report the return upstairs before the lodge conversation; Madeleine is not physically with the two observers or aware of their exchange.', { mentioned: ['madeleine'], timeHint: 'Half-past eight in the evening' }),
    scene(71, 'Footsteps Above the Cashier', 'During the night the cashier hears pacing overhead and sees the changing reflection from Madeleine’s open window.', 'madeleine-cashier-room', [
      ['madeleine-cashier', 'Wakes around midnight, hears furniture and footsteps above, then wakes later to find the pacing continuing.'],
    ], 'Paragraphs 71–73 keep the witness downstairs. He hears and infers; he does not see the private debate, burning clothing or candlesticks.', { mentioned: ['madeleine'], timeHint: 'Around midnight, then an hour or two later' }),
  ]],
  [57, [
    scene('start', 'Madeleine and Jean Valjean', 'The narrator confirms the mayor’s identity and explains the two aims governing his changed life.', null, [],
      'Paragraphs 0–12 explicitly disclose the identity, retrospectively explain the past years and revisit the day already narrated. They do not create duplicate bedside or hiring scenes.', { kind: 'exposition', mentioned: ['madeleine', 'valjean', 'myriel', 'fantine', 'champmathieu'], identityReveals: [{ identity: 'madeleine', character: 'valjean', evidenceParagraph: 0, audience: 'reader' }] }),
    scene(13, 'A Bolted Door and an Open Window', 'Alone in the dark, Valjean tries to understand the danger and the unexpected security offered by another man’s arrest.', 'madeleine-bedroom', [
      ['valjean', 'Bolts the door, extinguishes the candle, opens the window, and struggles to collect his scattered thoughts.'],
    ], 'Paragraphs 13–32 begin the room’s actual night after the retrospect. The galleys and substitute are contemplated, not present locations or visitors.'),
    scene(33, 'The First Excuse', 'Valjean relights the candle and persuades himself that leaving matters alone must be providence’s design.', 'madeleine-bedroom', [
      ['valjean', 'Reasons that the mistaken identification has secured his future but finds no joy in his decision to do nothing.'],
    ], 'Paragraphs 33–40 give a temporary resolution and its erosion. Paragraph 40 explicitly explains that much of the quoted dialogue is inward and silent.'),
    scene(41, 'The Duty to Speak', 'Rejecting that excuse, Valjean resolves to save Champmathieu and begins putting his affairs in order.', 'madeleine-bedroom', [
      ['valjean', 'Decides to expose himself, burns debts owed by struggling tradesmen, writes to Laffitte, and gathers money and his current passport.'],
    ], 'Paragraphs 41–61 distinguish duty from concealment. The dead bishop is a moral presence within thought, not a visitor or resurrection; the passport is the current election document, not automatically the old yellow paper.', { mentioned: ['champmathieu', 'myriel'], items: ['valjean-laffitte-letter', 'madeleine-current-passport'] }),
    scene(62, 'Fantine in the Balance', 'After midnight, the thought of Fantine and the district’s dependence gives Valjean another argument for remaining silent.', 'madeleine-bedroom', [
      ['valjean', 'Lights a fire against the cold and imagines that abandoning his public work would sacrifice many lives to save one.'],
    ], 'Paragraphs 62–80 shift to a new rationalization, not a settled external outcome. Predicted deaths and economic collapse are possibilities in his argument.', { mentioned: ['fantine', 'cosette', 'champmathieu'], timeHint: 'Midnight sounds from church and town-hall' }),
    scene(81, 'The Hidden Clothes Burn', 'Valjean opens the concealed cupboard and throws his old outfit into the fire.', 'madeleine-bedroom', [
      ['valjean', 'Destroys the hidden blouse, trousers, knapsack and thorn cudgel, then screens the empty cupboard with furniture.'],
    ], 'Paragraphs 81–87 contain actual destruction. The glinting coin is identified only as probably the Savoyard’s here; its later confirmation is separate.', { items: ['valjean-old-outfit', 'valjean-thorn-cudgel', 'gervais-forty-sous'] }),
    scene(88, 'The Candlesticks Spared', 'He takes the silver candlesticks toward the hearth, but an inward accusation stops him from destroying them.', 'madeleine-bedroom', [
      ['valjean', 'Stirs the coals with a candlestick, recoils at the voice of conscience, and returns both candlesticks to the chimney-piece.'],
    ], 'Paragraphs 88–105 approach but do not complete the melting. Paragraph 94’s imminent phrasing is checked by paragraph 105; the objects survive. No unseen human speaker is invented.', { items: ['silver-candlesticks'] }),
    scene(106, 'No Final Resolution', 'Valjean resumes pacing, terrified of both choices and unable to settle the struggle.', 'madeleine-bedroom', [
      ['valjean', 'Paces until exhaustion while the feared loss of either happiness or virtue defeats each apparent decision.'],
    ], 'Paragraphs 106–116 end in indecision. The cashier below and the final comparison with Christ are not additional people in the bedroom.', { mentioned: ['madeleine-cashier'] }),
  ]],
  [58, [
    scene('start', 'Sleep at Three', 'After hours of pacing, Valjean falls asleep in his chair.', 'madeleine-bedroom', [
      ['valjean', 'Drops into the chair and falls asleep after nearly five hours on his feet.'],
    ], 'Paragraphs 0–4 introduce sleep and the later written account before the embedded dream.', { timeHint: 'Just after three in the morning' }),
    scene(5, 'The Dream of the Silent Men', 'A written dream recounts a barren plain, a disappearing brother, and a town of silent watchers.', null, [],
      'Paragraphs 5–21 are explicitly a dream transcript. Do not manufacture literal travel to Romainville, a new physical brother, a crowd of living witnesses, or Valjean’s death from the dream’s statement.', { kind: 'document', mentioned: ['valjean'], items: ['valjean-dream-account'] }),
    scene(22, 'Lanterns Below the Window', 'Valjean wakes cold and recognizes the carriage lamps he first mistakes for earthly stars.', 'madeleine-bedroom', [
      ['valjean', 'Wakes beside the dying candle and spent fire, then recognizes the white horse and tilbury below.'],
    ], 'Paragraphs 22–28 end the dream before perception returns to the actual room. The apparent stars are lanterns, not an astronomical event.', { items: ['scaufflaire-tilbury'] }),
    scene(29, 'The Portress Waits', 'The portress announces the vehicle, and Valjean at last says he will come down.', 'madeleine-bedroom-door', [
      ['valjean', 'At first denies ordering the carriage, then asks the waiting woman to say he is coming.'],
      ['madeleine-portress', 'Calls through the door that Scaufflaire’s vehicle and coachman are waiting.'],
    ], 'Paragraphs 29–53 give a conversation through the shut door; paragraph 50 explicitly says she cannot see his face.', { timeHint: 'She says it is just five; distinguish actual arrival from the requested half-past-four delivery' }),
  ]],
  [59, [
    scene('start', 'A Collision Before Dawn', 'The Arras mail-wagon strikes the tilbury, but Valjean drives on without stopping.', 'montreuil-hesdin-road', [
      ['valjean', 'Continues at speed after the wheel is struck, still without a settled decision about the trial.'],
      ['arras-postman', 'Shouts for the driver to stop after the collision and remarks on his haste.'],
    ], 'Paragraphs 0–16 move from a description of the postal service to the actual collision and solitary drive. The posted timetable and the earlier five-o’clock announcement are left as source claims, not forced into exact minute alignment.'),
    scene(17, 'The Damaged Wheel at Hesdin', 'The stableman discovers a split wheel, and Bourgaillard says it cannot be repaired before tomorrow.', 'hesdin-inn-front', [
      ['valjean', 'Tries repairs, replacement wheels, another carriage, post-horses and a saddle before inwardly welcoming the apparent impossibility.'],
      ['hesdin-stableman', 'Feeds the horse, inspects the wheel, and calls the nearby wheelwright.'],
      ['bourgaillard', 'Explains the damaged spokes and hub and rejects each proposed means of continuing immediately.'],
    ], 'Paragraphs 17–110 sustain one street negotiation and inner reaction. The inability to ride the little horse carries forward Scaufflaire’s earlier warning.', { timeHint: 'Broad daylight after five leagues in two hours', items: ['scaufflaire-tilbury'] }),
    scene(111, 'The Boy Finds a Cart', 'An overlooked child returns with a woman who can supply a rough spring-cart, and the journey resumes.', 'hesdin-inn-front', [
      ['valjean', 'Pays for the old cart, leaves the tilbury for repair, and resumes travel despite resenting the rescue of his plans.'],
      ['hesdin-cart-boy', 'Fetches the woman with a cart and follows the departing traveller to ask for a reward.'],
      ['hesdin-cart-woman', 'Offers the usable vehicle from her shed despite the two tradesmen’s objections.'],
      ['bourgaillard', 'Warns against the dilapidated replacement but keeps the damaged tilbury for repair.'],
      ['hesdin-stableman', 'Joins the wheelwright’s objections to the substitute cart.'],
    ], 'Paragraphs 111–136 contain the boy’s departure and return, purchase, and denied gratuity on leaving town. The woman’s ownership supplies a means onward; it is not a second white horse.', { items: ['hesdin-spring-cart'], reportedAfter: 'Valjean refuses the boy a reward as the cart leaves Hesdin.' }),
    scene(137, 'Bread at Saint-Pol', 'The heavier cart slows the journey, and a meal at Saint-Pol proves impossible to eat.', 'saint-pol-inn', [
      ['valjean', 'Guards the horse’s oats, accepts breakfast, then finds the bread bitter and leaves it almost untouched.'],
      ['saint-pol-landlady', 'Invites the traveller to breakfast and leads him from the stable to the public room.'],
      ['saint-pol-servant', 'Hastily sets a place for the man who says he must go on.'],
      ['german-carter', 'Eats at another table but does not understand the stranger’s question about the bread.'],
    ], 'Paragraphs 137–153 cover the slow road, one stop, and renewed travel. The taste is his distress, not proof of poisoned or spoiled food.', { timeHint: 'Nearly four hours from Hesdin to Saint-Pol; source calls the distance five leagues here against six in the route-slip calculation' }),
    scene(154, 'A Road Barred Beyond Tinques', 'A road-mender warns of repairs and suggests an extra horse and guide for the detour.', 'tinques-road', [
      ['valjean', 'Insists on reaching Arras that evening and asks the road-mender how to navigate the repairs and crossroads.'],
      ['tinques-roadmender', 'Explains the longer route through Carency and Camblin and advises how to attempt it in darkness.'],
    ], 'Paragraphs 154–172 give the roadside encounter and advice. The next cut resumes after the return to the inn with a new guide and extra horse.', { timeHint: 'Twilight; February is explicit in paragraph 137' }),
    scene(173, 'An Extra Horse and a Guide', 'Returning from the inn, Valjean resumes his journey with a fresh horse to help and a stable-boy to guide the detour.', 'tinques-road', [
      ['valjean', 'Passes the road-mender’s position again at speed after obtaining help, conscious of the half-hour lost.'],
      ['tinques-postilion', 'Rides on the cart’s shaft to guide the traveller through the crossroads with an extra horse.'],
    ], 'Paragraphs 173–175 introduce the guide and second horse before the broken fitting. The earlier road-mender is not carried along as a passenger, and this stable-boy is distinct from the child at Hesdin.', { timeHint: 'Half an hour after returning for help; full night falls', items: ['hesdin-spring-cart'] }),
    scene(176, 'A Branch for the Broken Whiffle-Tree', 'Valjean repairs the cart’s broken fitting with a branch and continues toward Arras while fearing the trial is already over.', 'carency-arras-detour', [
      ['valjean', 'Cuts a replacement whiffle-tree instead of turning back and realizes he never asked the hour of trial.'],
      ['tinques-postilion', 'Suggests returning when the fitting breaks, then drives on and predicts arrival at eight.'],
    ], 'Paragraphs 176–191 end the journey section with a repair and renewed urgency. His calculations about a finished trial remain fears, not an actual verdict.', { timeHint: 'Twenty-minute repair; seven o’clock heard, arrival at eight predicted', items: ['hesdin-spring-cart'] }),
  ]],
  [60, [
    scene('start', 'The Visit That Does Not Come', 'Fantine’s illness worsens as she waits through the afternoon for Madeleine’s usual visit.', 'montreuil-factory-infirmary', [
      ['fantine', 'Endures fever and repeated disappointment, then sings an old lullaby as the hours pass.'],
      ['sister-simplice', 'Watches the anxious patient and is moved to tears by the remembered cradle song.'],
      ['fantine-doctor', 'Examines her in delirium in the morning and returns at midday asking for news of the mayor.'],
    ], 'Paragraphs 0–25 cut back to the same day in Montreuil, not forward after the night journey. The doctor makes separate visits; he is not assigned continuous afternoon attendance.', { timeHint: 'Morning and midday, customary visit at three, waiting through six; source recalls five years of separation' }),
    scene(26, 'The Truth and a Hopeful Guess', 'A servant brings news of the mayor’s departure; Simplice refuses a suggested lie, and Fantine assumes he has gone for Cosette.', 'montreuil-factory-infirmary', [
      ['sister-simplice', 'Rejects the proposed council-meeting excuse and says only that the mayor has gone away.'],
      ['fantine', 'Overhears the whispers and turns joyful when she concludes that he is fetching her child.'],
      ['infirmary-serving-maid', 'Returns with conflicting road reports and whispers a false excuse that the sister will not repeat.'],
    ], 'Paragraphs 26–54 separate the known departure, rival guesses about the road, and Fantine’s inference. Cosette does not arrive and no nurse has confirmed the destination.', { mentioned: ['valjean', 'cosette', 'madeleine-portress'] }),
    scene(55, 'A Better Pulse', 'The doctor finds a temporary improvement and permits the hopeful misunderstanding to remain.', 'montreuil-factory-infirmary', [
      ['fantine', 'Asks for a little bed beside her own and claims to be cured because Cosette will arrive tomorrow.'],
      ['sister-simplice', 'Privately explains their uncertainty and why they have not corrected the patient’s belief.'],
      ['fantine-doctor', 'Finds less chest pressure and a stronger pulse, prescribes quiet, and allows only a conditional hope of recovery.'],
    ], 'Paragraphs 55–68 document an actual improvement but explicitly retain advanced organic illness; the claim of cure is Fantine’s, not the medical finding.', { timeHint: 'Between seven and eight that evening' }),
  ]],
  [61, [
    scene('start', 'A Horse That Must Rest', 'At the Arras inn Valjean declines food and lodging and learns that the white horse needs two days’ rest.', 'arras-hotel-poste', [
      ['valjean', 'Returns the extra horse, stables the white horse himself, and refuses bed and supper.'],
      ['arras-landlady', 'Reports the stableman’s warning that the exhausted horse cannot leave again tomorrow.'],
    ], 'Paragraphs 0–10 establish arrival and the practical obstacle to returning with his own horse.', { timeHint: 'Nearly eight in the evening after a stated fourteen-hour journey; preserve this duration without reconciling it to the earlier five-o’clock departure' }),
    scene(11, 'A Place on the Night Mail', 'Valjean books the vacant seat on the mail-wagon back to Montreuil.', 'arras-posting-office', [
      ['valjean', 'Shows his passport and pays for the available seat for the return that night.'],
      ['arras-posting-clerk', 'Requires the passenger to be ready at precisely one in the morning.'],
    ], 'Paragraph 11 moves to the office; this reservation does not mean that he has abandoned the trial.', { timeHint: 'Departure at one in the morning', items: ['madeleine-current-passport'] }),
    scene(12, 'The Lights at the Prefecture', 'A citizen with a lantern leads Valjean toward the temporary court and points out its lit windows.', 'arras-prefecture-square', [
      ['valjean', 'Wanders through unfamiliar streets, asks the way, and claims he wants only to speak to a lawyer.'],
      ['arras-lantern-citizen', 'Explains the court’s temporary location in the former episcopal palace and notices the late sitting.'],
    ], 'Paragraphs 12–24 cover the actual approach; the old court-house is being repaired, so maps must place this trial in the prefecture.'),
    scene(25, 'The Wrong Finished Case', 'A lawyer’s news of a life sentence briefly misleads Valjean before he learns that Champmathieu’s hearing continues.', 'arras-court-antechamber', [
      ['valjean', 'Mistakes the completed infanticide trial for the case he came to see, then learns another hearing is still under way.'],
      ['arras-hall-lawyer', 'Clarifies the Limosin verdict and dismissively describes the other accused man.'],
    ], 'Paragraphs 25–52 combine the direct conversation and later overheard groups. The woman’s verdict is a separate case; the groups’ confidence in identity is not the narrator’s factual finding.'),
    scene(53, 'A Name That Opens a Door', 'Refused admission to the full hall, Valjean writes his mayoral name and has it sent to the president.', 'arras-court-antechamber', [
      ['valjean', 'Retreats to the landing, writes the name Madeleine with his office, and returns to demand the note be delivered.'],
      ['arras-usher', 'Refuses the stranger entry but accepts the written name and carries it to the president.'],
    ], 'Paragraphs 53–66 distinguish denied public access from the official privilege he then invokes.', { items: ['madeleine-admission-note'] }),
  ]],
  [62, [
    scene('start', 'A Respected Name', 'The narrator explains how the mayor’s reputation reaches the neighbouring departments.', 'bas-boulonnais', [],
      'Paragraph 0 is reputational and economic background, not visits to all the named factories.', { kind: 'exposition', mentioned: ['valjean'] }),
    scene(1, 'Admit Him', 'The president receives the mayor’s note and grants entry.', 'arras-assize-hall', [
      ['arras-president', 'Recognizes the name and writes a respectful authorization to admit the mayor.'],
      ['arras-usher', 'Delivers the request behind the president’s chair and returns with permission.'],
    ], 'Paragraph 1 briefly enters the courtroom; Valjean remains outside until the usher comes back.', { items: ['madeleine-admission-note'] }),
    scene(2, 'The Usher Returns', 'Given permission to enter, Valjean crushes the respectful note and follows the usher.', 'arras-court-antechamber', [
      ['valjean', 'Reads and crushes the president’s deferential note, then follows the usher away from the public entrance.'],
      ['arras-usher', 'Returns with the authorization, bows to the mayor and leads him toward the council-chamber.'],
    ], 'Paragraphs 2–5 begin in the public hall. The following transit is recalled in paragraph6; the usher does not remain with Valjean during the solitary deliberation.'),
    scene(6, 'Alone Before the Door', 'Left in the council-chamber, Valjean stares at a framed letter before fixing on the courtroom door.', 'arras-council-chamber', [
      ['valjean', 'Stands alone after the usher leaves, reads Pache’s framed letter without attending to it and begins to fear the brass handle.'],
    ], 'Paragraphs 6–10 explicitly leave him alone. The departed usher’s directions are remembered words, and Pache is the historical letter writer, not a visitor.', { mentioned: ['fantine', 'cosette'] }),
    scene(11, 'A Flight Reversed', 'Valjean retreats down the silent corridor but turns back after a quarter of an hour.', 'arras-court-corridor', [
      ['valjean', 'Flees the threshold, halts against a cold wall, and returns in anguish without being physically compelled.'],
    ], 'Paragraphs 11–15 are an actual retreat; the impression of someone leading him back is figurative, not an escort.', { timeHint: 'A quarter of an hour in the corridor' }),
    scene(16, 'The Brass Handle', 'Back in the chamber, Valjean advances to the door and opens it.', 'arras-council-chamber', [
      ['valjean', 'Fixes on the polished knob and at last grasps it to enter the court.'],
    ], 'Paragraphs 16–20 complete the entry rather than introducing a second arrival at the building.'),
  ]],
  [63, [
    scene('start', 'The Man on the Bench', 'Valjean sees Champmathieu between gendarmes and hides his own face among the privileged spectators.', 'arras-assize-hall', [
      ['valjean', 'Recoils at the prisoner’s resemblance to his former self and sits behind boxes to watch without being seen.'],
      ['champmathieu', 'Sits between two gendarmes, coarse, uneasy and frightened under the room’s attention.'],
      ['arras-president', 'Recognizes the admitted mayor and bows toward him.'],
      ['arras-prosecutor', 'Salutes the mayor he has encountered professionally in Montreuil.'],
      ['bamatabois', 'Sits among the jurors hearing the case against Champmathieu.'],
    ], 'Paragraphs 0–19 establish the hall and listeners. Valjean cannot see Javert, but absence is confirmed only in the next chapter; do not fill the hidden witness bench by assumption.'),
    scene(20, 'An Identity Conceded by Counsel', 'The narrative reconstructs the accusation and the defence’s damaging concession about the prisoner’s identity.', 'arras-assize-hall', [],
      'Paragraphs 20–21 recap the plea finished at Valjean’s entrance. He must not be assigned knowledge from personally hearing that earlier speech; the court’s conceded identity is false.', { kind: 'reported', mentioned: ['champmathieu', 'arras-defence-lawyer', 'valjean'] }),
    scene(22, 'The Prosecutor’s Portrait', 'The prosecutor turns the defence’s concessions against the accused and asks for a severe sentence.', 'arras-assize-hall', [
      ['arras-prosecutor', 'Treats the supposed identity as conceded and interprets the prisoner’s confused denial as calculated craft.'],
      ['champmathieu', 'Listens amazed, shakes his head, and mutters that Baloup should have been asked.'],
      ['arras-defence-lawyer', 'Replies with diminishing confidence after complimenting the prosecution’s speech.'],
      ['valjean', 'Remains concealed among the privileged spectators while the demand for penal servitude is made.'],
    ], 'Paragraphs 22–25 give the current speech and reply; quoted crimes and supposed intent are prosecution claims, not new confirmed actions of Champmathieu.', { mentioned: ['javert', 'brevet', 'chenildieu', 'cochepaille', 'baloup'] }),
  ]],
  [64, [
    scene('start', 'Champmathieu’s Own Account', 'Invited to defend himself, the prisoner recounts work, hardship, and the daughter he has lost.', 'arras-assize-hall', [
      ['champmathieu', 'Gives a disordered account of wheelwright work and his daughter, then joins the audience’s laughter without understanding it.'],
      ['arras-president', 'Repeats the invitation to add a defence when the prisoner first fails to understand.'],
      ['valjean', 'Hears the prisoner’s effort to account for himself from the place behind the judges.'],
    ], 'Paragraphs 0–6 contain testimony, not enacted Paris workshops, a new daughter in the court, or independent verification of every detail.'),
    scene(7, 'Two Questions, Still Denied', 'The court demands clear answers on the apples and identity, but Champmathieu insists he found the branch and is not Valjean.', 'arras-assize-hall', [
      ['arras-president', 'Explains that Baloup cannot be located and presses for separate answers on theft and identity.'],
      ['arras-prosecutor', 'Treats the confusion as clever evasion and asks for the four identifying witnesses again.'],
      ['champmathieu', 'Denies stealing, says the branch lay on the ground, and protests being given names he does not know.'],
      ['valjean', 'Listens as the denial fails to overcome the alleged resemblance.'],
    ], 'Paragraphs 7–19 include the explicit statement that Javert has left court and town after testifying. The quoted deposition creates no present Javert snapshot.', { mentioned: ['javert', 'baloup'] }),
    scene(20, 'Brevet Persists', 'Brought back under guard, Brevet repeats his identification despite the president’s warning of its consequences.', 'arras-assize-hall', [
      ['brevet', 'Declares that the prisoner is the former Toulon convict and insists on his original recognition.'],
      ['arras-president', 'Appeals to the degraded witness’s conscience because he cannot take an oath.'],
      ['champmathieu', 'Stands as required while the first identifying witness repeats his claim.'],
      ['valjean', 'Hears his former prison companion identify another man in his place.'],
    ], 'Paragraphs 20–27 introduce Brevet from the witness room rather than assuming that all three witnesses have stood in the hall throughout.'),
    scene(28, 'Chenildieu Persists', 'Chenildieu is brought in and asserts that he shared a chain with the accused.', 'arras-assize-hall', [
      ['chenildieu', 'Laughs at the request to reconsider and claims five years on the same chain as the prisoner.'],
      ['arras-president', 'Invites the second witness to reflect before confirming identity.'],
      ['champmathieu', 'Remains standing under the second assertion that he is Jean Valjean.'],
      ['valjean', 'Watches the second former companion repeat the mistaken recognition.'],
    ], 'Paragraphs 28–32 introduce a second witness. Brevet has been told to sit, not to leave; the continuing court-party projection retains him while Chenildieu testifies.'),
    scene(33, 'Cochepaille and the Last Murmur', 'A third identification provokes further uproar, and the mayor rises before the president can sum up.', 'arras-assize-hall', [
      ['cochepaille', 'Names the prisoner Jean Valjean and recalls the nickname Jean-the-Screw.'],
      ['champmathieu', 'Replies with the baffling exclamation that the testimony is famous.'],
      ['arras-president', 'Orders silence and prepares to summarize before a spectator interrupts.'],
      ['valjean', 'Rises, calls the three witnesses by name, and steps through the half-door into the hall.'],
      ['arras-prosecutor', 'Recognizes the mayor among those turning toward the interruption.'],
      ['bamatabois', 'Recognizes Madeleine when the privileged spectator steps forward.'],
    ], 'Paragraphs 33–47 give the final witness and interruption. The identifying cries stop at Madeleine; the public confession follows in the next chapter.'),
  ]],
  [65, [
    scene('start', 'The Name Spoken Publicly', 'Madeleine declares himself Jean Valjean, but the court first treats his intervention as a medical crisis.', 'arras-assize-hall', [
      ['valjean', 'Asks that Champmathieu be released and himself arrested, declaring his identity before the room.'],
      ['brevet', 'Signals that he does not recognize the pale man confronting the witnesses.'],
      ['chenildieu', 'Initially denies knowing the speaker who approaches the three convicts.'],
      ['cochepaille', 'Gives an intimidated salute but no recognition of the mayor.'],
      ['arras-president', 'Consults his colleagues and asks whether a physician is present.'],
      ['arras-prosecutor', 'Appeals for medical help to take the honoured mayor home.'],
      ['champmathieu', 'Remains the accused whom the speaker asks the jury to free.'],
    ], 'Paragraphs 0–10 separate public self-identification from its acceptance. The sudden whitening is explicitly source narration, not a manually inferred age change.', { identityReveals: [{ identity: 'madeleine', character: 'valjean', evidenceParagraph: 5, audience: 'courtroom' }] }),
    scene(11, 'Proofs the Witnesses Know', 'Valjean counters disbelief with prison memories and bodily marks that the witnesses can verify.', 'arras-assize-hall', [
      ['valjean', 'Admits both thefts and names Brevet’s suspenders, Chenildieu’s burned shoulder and Cochepaille’s dated tattoo.'],
      ['brevet', 'Starts in surprise at the precise memory of his checked knitted suspenders.'],
      ['chenildieu', 'Confirms the account of the burn made while trying to erase the prison letters.'],
      ['cochepaille', 'Rolls up his sleeve to display the date near his left elbow.'],
      ['arras-president', 'Witnesses the details that overturn the apparently settled identification.'],
      ['arras-prosecutor', 'Hears the confession and the verifiable prison details after initially discounting them.'],
      ['champmathieu', 'Hears another man establish the identity that had been forced upon him.'],
    ], 'Paragraphs 11–29 give the evidence and general recognition. The gendarme lighting the tattoo awaits incidental cast coverage; Javert is explicitly wished for, not present.', { mentioned: ['javert'], items: ['gervais-forty-sous'] }),
    scene(30, 'No Hand Raised to Stop Him', 'Valjean leaves the stunned court, making himself available for arrest without being detained there.', 'arras-assize-hall', [
      ['valjean', 'States where the prosecutor may find him, walks to the door, and departs unhindered.'],
      ['arras-prosecutor', 'Receives the speaker’s assurance of availability while the room lets him leave.'],
    ], 'Paragraphs 30–35 report withdrawal, not a judicial acquittal, pardon or immediate arrest of Valjean.'),
    scene(36, 'Champmathieu Released', 'Within an hour the jury frees Champmathieu, who leaves still unable to understand what happened.', 'arras-assize-hall', [
      ['champmathieu', 'Is cleared of every accusation and leaves bewildered, believing the others are fools.'],
    ], 'The final paragraph follows Valjean’s departure; he does not witness the actual verdict in this account.', { timeHint: 'Less than an hour after Valjean leaves' }),
  ]],
]
