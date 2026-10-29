// Internal character keys do not authorize an early reader-facing identity.
// The yellow-coated stranger is explicitly identified again in chapter 103.
const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const volumeTwoBookThirdReview = [
  [93, [
    scene('start', 'Water Beyond the Village', 'Montfermeil’s scarce water makes a night errand to the forest spring a constant fear for Cosette.', 'montfermeil', [],
      'Paragraphs 0–3 explain geography, water supply and habitual duties. The narrator’s present-day villas are not placed in the 1823 village.', { kind: 'exposition', mentioned: ['cosette', 'thenardier', 'madame-thenardier'] }),
    scene(4, 'Christmas Booths', 'Travelling merchants and performers fill Montfermeil’s streets for Christmas.', 'montfermeil-church-square', [],
      'Paragraph 4 is a festival panorama, with later museum dates and the showmen’s religious sales claim. No visitor is invented for every stall.', { kind: 'reported', timeHint: 'Christmas 1823; mild winter without snow or frost so far' }),
    scene(5, 'The Inn on Christmas Eve', 'Drinkers talk politics and work while the innkeepers serve and Cosette knits near the fire.', 'thenardier-inn-public-room', [
      ['thenardier', 'Drinks with customers and talks politics while the room fills with trade conversation.'],
      ['madame-thenardier', 'Attends the supper roasting at the fire.'],
      ['cosette', 'Knits stockings for the daughters from her usual seat on the kitchen table’s cross-bar.'],
    ], 'Paragraphs 5–13 locate the public room and kitchen work. Éponine and Azelma are heard in the adjoining room, not yet playing beside Cosette; anonymous tradesmen await group-cast coverage.', { mentioned: ['eponine', 'azelma'], items: ['cosette-stockings'], timeHint: 'Christmas Eve, explicit in paragraph 5' }),
    scene(14, 'A Cry Elsewhere in the House', 'The neglected little boy’s cries interrupt the inn’s noise without drawing care from his mother.', 'thenardier-inn', [],
      'The last paragraph reports a recurring exchange and an unseen child somewhere in the building. Do not identify him by a later name or put him in the public room.', { kind: 'reported', mentioned: ['thenardier-young-son', 'thenardier', 'madame-thenardier'] }),
  ]],
  [94, [
    scene('start', 'The Innkeepers Seen in Full', 'The narrator completes the couple’s portraits and exposes the exaggeration in the husband’s Waterloo story.', 'thenardier-inn', [],
      'Paragraphs 0–16 combine habitual conduct, retrospective claims, debt and speculation about origins. The narrator qualifies nationality and background; no new battle or certain priestly career is asserted.', { kind: 'exposition', mentioned: ['thenardier', 'madame-thenardier', 'cosette'], timeHint: '1823; petty debts around fifteen hundred francs' }),
    scene(17, 'The Price of Everything', 'Thénardier instructs his wife to charge travellers for every possible comfort and inconvenience.', 'thenardier-inn', [
      ['thenardier', 'Delivers his low-voiced catalogue of things an innkeeper should make the traveller pay for.'],
      ['madame-thenardier', 'Receives the professional lesson about extracting money from guests.'],
    ], 'Paragraph 17 is a particular earlier instruction, introduced as one day. It is not a new Christmas Eve negotiation with the stranger.', { timeHint: 'An undated prior occasion' }),
    scene(18, 'Between Two Pressures', 'The narrator contrasts the couple’s methods of oppression and Cosette’s exhausting labour.', 'thenardier-inn', [],
      'Paragraphs 18–23 describe recurring abuse and work rather than one staged beating with an invented injury time.', { kind: 'exposition', mentioned: ['thenardier', 'madame-thenardier', 'cosette'] }),
  ]],
  [95, [
    scene('start', 'The Last Half-Glass', 'Cosette watches the nearly empty cistern in terror as the hostess finds just enough water for the cooking.', 'thenardier-inn-public-room', [
      ['cosette', 'Works with a blackened eye and fears the dwindling water will force her into the forest at night.'],
      ['madame-thenardier', 'Draws the cistern’s last thin stream and decides the half-filled glass will suffice.'],
    ], 'Paragraphs 0–7 make the empty supply and immediate reprieve explicit. The black eye is attributed to an earlier blow, not a beating newly performed in this scene.', { stateChanges: [{ character: 'cosette', injury: 'black eye from Madame Thénardier’s earlier blow', evidenceParagraph: 1 }] }),
    scene(8, 'The Horse Still Thirsty', 'A pedlar demands water for his horse, and Cosette falsely insists that she has already watered it.', 'thenardier-inn-public-room', [
      ['horse-pedlar', 'Rejects the child’s account because he recognizes the horse’s thirsty behaviour.'],
      ['cosette', 'Claims twice that the horse drank a full bucket, then hides again under the table.'],
      ['madame-thenardier', 'Initially says the animal has drunk but accepts that it must be watered.'],
    ], 'Paragraphs 8–20 explicitly identify Cosette’s claim as a lie. No completed watering is generated from it.'),
    scene(21, 'A Bucket and Fifteen Sous', 'The hostess sends Cosette to the spring and gives her money to bring back bread.', 'thenardier-inn-public-room', [
      ['cosette', 'Takes the large bucket and puts the fifteen-sou piece in her apron, hesitating at the open door before leaving.'],
      ['madame-thenardier', 'Orders the frightened child into the dark and adds a loaf of bread to the errand.'],
    ], 'Paragraphs 21–39 end with Cosette outside and the door closed. The horse remains a reason for the errand, not a companion in the forest.', { items: ['cosette-water-bucket', 'cosette-bread-fifteen-sous'] }),
  ]],
  [96, [
    scene('start', 'The Doll in the Toy Stall', 'A splendid doll opposite the tavern embodies the fair’s unattainable riches for the village children.', 'montfermeil-toy-stall', [],
      'Paragraphs 0–1 supply the stall and earlier admiration, including the sisters’ hours of looking. The schoolmaster comments from inside the inn, not from a new conversation beside the display.', { kind: 'reported', mentioned: ['cosette', 'eponine', 'azelma', 'montfermeil-schoolmaster'], items: ['catherine-doll'] }),
    scene(2, 'A Pause Before the Lady', 'Cosette forgets the errand while looking at the doll until a threat from the inn sends her running.', 'montfermeil-toy-stall', [
      ['cosette', 'Stares at the splendid doll and forgets the water before fleeing at the hostess’s shout.'],
      ['toy-merchant', 'Paces in front of his glittering stall while the child gazes.'],
      ['madame-thenardier', 'Sees the child lingering outside and shouts a threat from the inn.'],
    ], 'Paragraphs 2–6 are one cross-street episode; the merchant’s imagined divinity is Cosette’s impression, not his identity. Catherine is an internal item key before the later naming.', { items: ['catherine-doll', 'cosette-water-bucket'] }),
  ]],
  [97, [
    scene('start', 'Beyond the Last House', 'Cosette leaves the lights, briefly turns back, and finally runs toward the spring to escape the worse fear of returning without water.', 'montfermeil-chelles-path', [
      ['cosette', 'Makes noise with the bucket for company, nearly retreats, then runs into the woods fearing the hostess more than the dark.'],
      ['montfermeil-night-woman', 'Recognizes the small passer-by as the Lark after wondering why a child is out so late.'],
    ], 'Paragraphs 0–8 cover the village and outward journey. The woman’s werewolf question, Cosette’s imagined spectres and the distant hostess are not literal companions.', { timeHint: 'Seven or eight minutes from the forest edge to the spring' }),
    scene(9, 'The Coin in the Spring', 'Clinging to the oak, Cosette fills the bucket while the unnoticed bread money falls from her apron.', 'montfermeil-forest-spring', [
      ['cosette', 'Fills the pail almost to the brim and collapses with fatigue, unaware that the fifteen-sou piece has fallen into the water.'],
    ], 'Paragraphs 9–19 separate the physical loss from what the child knows. The setting Jupiter, serpents in the water and clawing plants are perceptions and imagery, not new creatures.', { items: ['cosette-water-bucket', 'cosette-bread-fifteen-sous'] }),
    scene(20, 'The Weight Through the Forest', 'Cosette forces herself to carry the full bucket, repeatedly stopping until she cries out near a familiar chestnut.', 'montfermeil-spring-return-path', [
      ['cosette', 'Counts to steady herself, struggles with the heavy water, and fears punishment for the slow return.'],
    ], 'Paragraphs 20–25 explicitly leave her alone; the dead mother’s imagined awareness is authorial lament, not Fantine’s physical presence or resurrection.', { mentioned: ['fantine', 'madame-thenardier'], items: ['cosette-water-bucket'] }),
    scene(26, 'A Hand on the Handle', 'An unheard approach ends Cosette’s burden when a man silently takes the bucket.', 'montfermeil-spring-return-path', [
      ['cosette', 'Feels the load suddenly lifted and looks up without fear at the figure beside her.'],
      ['valjean', 'Comes up from behind and silently takes the heavy bucket’s handle.'],
    ], 'Paragraphs 26–28 are the first presentation of the meeting. The stranger is not named in the editorial text; his approach will be explained retrospectively.', { items: ['cosette-water-bucket'] }),
  ]],
  [98, [
    scene('start', 'A Yellow Coat on the Boulevard', 'Earlier in Paris, a poorly dressed man looks among modest houses for lodging.', 'paris-boulevard-hopital', [
      ['valjean', 'Walks the quiet boulevard with a small bundle and a wax-headed stick, seeming to seek an inexpensive room.'],
    ], 'Paragraphs 0–3 rewind the same day; the narrator promises later confirmation of a rented chamber. Keep the apparent age distinct from an actual birth date.', { timeHint: 'Afternoon of the same Christmas Day, 1823; this wording conflicts with the Christmas Eve frame and is preserved without adding a day' }),
    scene(4, 'The King’s Daily Passage', 'The narrator describes the regular royal carriage that serves the quarter as a clock.', 'paris-boulevard-hopital', [],
      'Paragraphs 4–7 are the recurring procession and portrait, including an earlier inhabitant’s remark; not a sequence of daily sightings assigned to this one stranger.', { kind: 'exposition' }),
    scene(8, 'An Order to Follow', 'The stranger hides from the approaching royal party and attracts a police tail that he later loses.', 'paris-boulevard-hopital', [
      ['valjean', 'Draws behind a wall at the carriage’s approach and loses the pursuing agent in side streets.'],
      ['duc-havre', 'Notices the hidden figure from the carriage and calls him evil-looking to the king.'],
      ['louis-xviii', 'Passes in the guarded carriage opposite the captain on duty.'],
      ['royal-route-police-agent', 'Receives orders to follow the man but loses him before the evening report.'],
    ], 'Paragraphs 8–9 give a particular observation and pursuit. The prefect receives a report later; he is not riding beside the king here.', { timeHint: 'Carriage at two; pursuit lost toward twilight' }),
    scene(10, 'A Fare Paid to Lagny', 'The stranger pauses at a theatre poster and takes the last outside seat on the Lagny coach.', 'plat-etain-coach-office', [
      ['valjean', 'Pays through to Lagny, takes the seat beside the driver, and gives little conversation on the road.'],
      ['lagny-coachman', 'Demands the fare before departure after inspecting the shabby clothes and small bundle.'],
    ], 'Paragraphs 10–21 move from the theatre to departure and travel past Gournay and Neuilly. The play’s two convicts are not companions on the coach.', { timeHint: 'Poster at quarter-past four; coach at half-past four' }),
    scene(22, 'Leaving the Coach at Chelles', 'The stranger gets off early and avoids the inn, leaving the driver to speculate about his disappearance.', 'chelles-abbey-inn-front', [
      ['valjean', 'Takes his bundle and stick and leaves the coach without entering the inn.'],
      ['lagny-coachman', 'Comments to the remaining passengers on the man who paid farther than he travelled.'],
    ], 'Paragraphs 22–29 keep the driver’s inference distinct from the traveller’s actual route; vanishing underground is a joke, not an escape mechanism.', { timeHint: 'Toward six in the evening' }),
    scene(30, 'The Stones and the Marked Trees', 'Taking the road toward Montfermeil, the man hides from passers-by and checks a clearing between marked trees and a heap of stones.', 'montfermeil-marked-clearing', [
      ['valjean', 'Checks the ash’s bark, the zinc band on the chestnut, and the ground by the stone heap before moving on.'],
    ], 'Paragraphs 30–36 describe actual inspection but do not show digging, retrieving money or opening a box. Do not merge these trees with the oak supporting Cosette at the spring.'),
    scene(37, 'The Meeting Revisited', 'The narrative joins the stranger’s route to the child he has just helped with her bucket.', 'montfermeil-spring-return-path', [],
      'Paragraphs 37–38 explicitly identify this as the same bucket encounter already narrated in chapter 97. Keep it as retrospective linkage, not a duplicate physical meeting.', { kind: 'reported', mentioned: ['cosette', 'valjean'], items: ['cosette-water-bucket'] }),
  ]],
  [99, [
    scene('start', 'A Name in the Dark', 'The stranger carries the water and learns the child’s name and where she lives.', 'montfermeil-spring-return-path', [
      ['cosette', 'Gives her age and name and says she does not know whether she has a mother.'],
      ['valjean', 'Stops at the answer Cosette, questions her about the hostess, and decides to lodge at the inn.'],
    ], 'Paragraphs 0–39 show recognition by the adult without a disclosure of his own name to the child. Her uncertainty about her mother is not informed knowledge of Fantine’s death.', { items: ['cosette-water-bucket'] }),
    scene(40, 'Work and the Other Girls’ Dolls', 'Cosette explains the difference between her own duties and the daughters’ play.', 'montfermeil-spring-return-path', [
      ['cosette', 'Describes all-day work, the sisters’ dolls, and her own tiny lead sword.'],
      ['valjean', 'Asks what the other children do and how the little worker finds any amusement.'],
    ], 'Paragraphs 40–67 discuss absent girls, not a scene where they join the walk. Ponine and Zelma are the existing sisters’ shortened names.', { mentioned: ['eponine', 'azelma'], items: ['cosette-lead-sword'] }),
    scene(68, 'The Bucket Returned at the Door', 'They pass the forgotten bakeshop and the Christmas stalls; near the inn Cosette asks to carry the load herself.', 'thenardier-inn-front', [
      ['cosette', 'Forgets the bread but asks to take the bucket back lest the hostess punish her for accepting help.'],
      ['valjean', 'Returns the bucket when she explains the danger and accompanies her to the tavern door.'],
    ], 'Paragraphs 68–80 end outside the inn. Nothing here corrects the child’s ignorance that the bread money has already been lost.', { items: ['cosette-water-bucket'] }),
  ]],
  [100, [
    scene('start', 'A Poor Guest at Forty Sous', 'The innkeepers judge the stranger’s clothes, charge him double the ordinary lodging rate, and let him enter.', 'thenardier-inn-public-room', [
      ['valjean', 'Accepts forty sous even for a stable place and watches the child rather than ordering supper.'],
      ['madame-thenardier', 'Changes her welcome at the sight of the worn clothes and charges more because the guest looks poor.'],
      ['thenardier', 'Signals his low estimate of the newcomer and supports the inflated poor-man’s rate.'],
      ['cosette', 'Serves wine and a glass, then returns wet and afraid to her knitting.'],
      ['horse-pedlar', 'Takes the fetched bucket and waters his horse himself.'],
    ], 'Paragraphs 0–24 cover admission and the child’s portrait; recurrent bruises and chilblains are not a new assault. The pedlar’s actual watering is distinguished from the earlier false claim.', { items: ['cosette-water-bucket', 'cosette-stockings'] }),
    scene(25, 'A Different Silver Coin', 'The demand for bread exposes the missing money, but the guest prevents a whipping with a larger coin.', 'thenardier-inn-public-room', [
      ['cosette', 'Invents a closed bakery, discovers the empty pocket, and cowers as the whip is raised.'],
      ['madame-thenardier', 'Accepts a twenty-sou piece as the missing fifteen and puts away the threat for now.'],
      ['valjean', 'Secretly supplies his own coin while pretending to find what fell from the apron.'],
    ], 'Paragraphs 25–54 explicitly say this is not the lost coin. No recovered-from-spring event or unseen completed whipping is created.', { items: ['cosette-bread-fifteen-sous', 'stranger-substitute-twenty-sous'] }),
    scene(55, 'Five Francs for the Knitting', 'The sisters’ play distracts Cosette; the stranger buys her unfinished work so she may play too.', 'thenardier-inn-public-room', [
      ['cosette', 'Watches the sisters, then asks permission to play after the stranger buys her work.'],
      ['eponine', 'Enters warmly dressed and plays with the old doll beside her sister.'],
      ['azelma', 'Shares the doll by the fire without acknowledging Cosette.'],
      ['madame-thenardier', 'Threatens the distracted knitter and demands immediate payment when the guest intervenes.'],
      ['thenardier', 'Accepts the five francs and pockets the coin.'],
      ['valjean', 'Pays far above the quoted value to release Cosette from the work.'],
      ['five-franc-carter', 'Laughs at the price, then examines the real coin in amazement.'],
    ], 'Paragraphs 55–95 introduce the sisters physically. The hostess’s barefoot-daughters claim is contradicted by their warm clothes; the carter is not given an invented name.', { items: ['cosette-stockings', 'thenardier-sisters-doll'] }),
    scene(96, 'A Sword Made into a Baby', 'The sisters dress the kitten while Cosette improvises a doll from rags and her little sword.', 'thenardier-inn-public-room', [
      ['cosette', 'Wraps her lead sword in rags and softly rocks and sings to it.'],
      ['eponine', 'Swaddles the resisting kitten and invents a lady’s visit to explain its ears and tail.'],
      ['azelma', 'Listens admiringly to her elder sister’s play scenario.'],
      ['thenardier', 'Encourages the drinkers’ noisy song while the children play.'],
    ], 'Paragraphs 96–104 include commentary on dolls and motherhood. The improvised sword, the sisters’ battered doll and the shop’s large doll remain different items.', { items: ['cosette-lead-sword', 'thenardier-sisters-doll'] }),
    scene(105, 'Words About Her Mother', 'The hostess claims charitable care and speculates that Cosette’s mother is dead; the listening child begins a sorrowful song.', 'thenardier-inn-public-room', [
      ['madame-thenardier', 'Assumes a flattering manner, calls Cosette a charity case, and says her mother must be dead.'],
      ['valjean', 'Asks whether the child is hers and eventually requests only bread and cheese.'],
      ['cosette', 'Catches fragments of the conversation and rocks the makeshift baby while singing that her mother is dead.'],
    ], 'Paragraphs 105–119 distinguish the hostess’s speculation from a verified death notification. Cosette hears enough to form a belief, not the circumstances of Fantine’s death.'),
    scene(120, 'The Borrowed Doll Discovered', 'Cosette secretly takes the abandoned doll, but Azelma sees it and Éponine reports her.', 'thenardier-inn-public-room', [
      ['cosette', 'Holds the sisters’ doll in rare happiness, then lays it down and bursts into sobs at the shout.'],
      ['azelma', 'Sees the doll’s projecting foot and alerts her sister.'],
      ['eponine', 'Runs to her mother without releasing the kitten and points toward Cosette.'],
      ['madame-thenardier', 'Indignantly accuses the child of touching the daughters’ doll.'],
      ['valjean', 'Alone notices the secret taking and later rises to question the anger over it.'],
    ], 'Paragraphs 120–146 give a quarter-hour of play and the discovery. Do not transfer Azelma’s first sighting or Éponine’s complaint to the other sister.', { items: ['thenardier-sisters-doll'] }),
    scene(147, 'A Kick During His Absence', 'When the guest goes outside, the hostess takes the opportunity to kick Cosette.', 'thenardier-inn-public-room', [
      ['cosette', 'Cries out when she is kicked beneath the table.'],
      ['madame-thenardier', 'Kicks the child as soon as the stranger has left.'],
    ], 'Paragraphs 147–148 explicitly remove the guest before the assault. He is not a witness or co-present rescuer for this blow.'),
    scene(149, 'Catherine', 'The stranger returns with the splendid doll, and Cosette slowly dares to accept and name it.', 'thenardier-inn-public-room', [
      ['valjean', 'Offers the great doll and silently places its hand in the frightened child’s hand.'],
      ['cosette', 'Retreats at first, asks permission, then seizes the doll and names it Catherine.'],
      ['thenardier', 'Estimates its high value and quietly tells his wife to abase herself before the paying guest.'],
      ['madame-thenardier', 'Suppresses her rage and gives permission in a strained sweet voice.'],
      ['eponine', 'Stops with the room’s surprise and later looks at Cosette with envy.'],
      ['azelma', 'Watches the new possession that reverses the sisters’ advantage over Cosette.'],
    ], 'Paragraphs 149–179 present the gift. The purchase is off-page; thirty francs is an estimate, later higher values are angry talk, not verified prices.', { items: ['catherine-doll'] }),
    scene(180, 'The Children Sent to Bed', 'The hostess sends the children away and privately complains to her husband about the guest’s interference.', 'thenardier-inn-public-room', [
      ['madame-thenardier', 'Obtains permission to send Cosette to bed, then quietly pours out her anger to her husband.'],
      ['thenardier', 'Insists that a paying traveller may amuse himself by letting the child play.'],
      ['valjean', 'Returns to silence at the table while the other drinkers watch from a distance.'],
      ['cosette', 'Leaves for bed carrying Catherine after the daughters have been sent away.'],
    ], 'Paragraphs 180–185 contain the departures followed by private complaints. No child is assumed to hear the whispered conversation after going upstairs.'),
    scene(186, 'The Guest Who Does Not Move', 'After the room empties, the hostess goes to bed while her husband waits for the silent guest.', 'thenardier-inn-public-room', [
      ['valjean', 'Remains awake and motionless at the table long after Cosette leaves.'],
      ['madame-thenardier', 'Gives up the vigil at two and leaves her husband to wait.'],
      ['thenardier', 'Reads the newspaper repeatedly and tries noises before politely suggesting repose.'],
    ], 'Paragraphs 186–193 distinguish the emptying room and the wife’s departure from the later invitation upstairs.', { timeHint: 'After midnight mass, wife leaves at two, another good hour passes' }),
    scene(194, 'The Supposed Bridal Chamber', 'Thénardier takes his guest to an expensive room and invents a sentimental history for its furnishings.', 'thenardier-inn-guest-room', [
      ['valjean', 'Asks for the stable but is led to the furnished room and questions the displayed bonnet.'],
      ['thenardier', 'Lights fresh candles and falsely describes a second-hand bonnet and room as his own wedding relics.'],
    ], 'Paragraphs 194–207 state the deception explicitly; this room and bonnet do not become authentic marriage-history evidence.'),
    scene(208, 'A Threat in the Couple’s Room', 'The hostess announces her intention to put Cosette out, and her husband gives a cold reply.', 'thenardier-couple-bedroom', [
      ['madame-thenardier', 'Waits awake and says she will turn Cosette out tomorrow.'],
      ['thenardier', 'Answers dismissively before the couple extinguish their light.'],
    ], 'Paragraphs 208–212 are private; the guest and children do not hear this plan.'),
    scene(213, 'The Pallet Under the Stairs', 'The guest follows a sleeping child’s breathing and finds Cosette still dressed, holding Catherine on her poor bed.', 'thenardier-understairs-recess', [
      ['valjean', 'Leaves his room quietly with one candle and watches the sleeping child in the stair recess.'],
      ['cosette', 'Sleeps fully dressed on the torn pallet and clutches the doll between deep sighs.'],
    ], 'Paragraphs 213–217 follow actual nighttime movement. Cosette does not wake to learn he has looked in.', { items: ['catherine-doll'] }),
    scene(218, 'A Gold Piece in the Wooden Shoe', 'The guest finds the children’s Christmas shoes and adds a gold coin to Cosette’s empty sabot.', 'thenardier-children-hearth-room', [
      ['valjean', 'Finds ten sous in each sister’s shoe, puts a louis in Cosette’s empty one, and returns to his room.'],
    ], 'Paragraphs 218–226 place the sisters’ beds and boy’s cradle beyond a glass door while the guest examines the hearth. They are asleep elsewhere, not witnessing the gift. Connection to the parents’ room is his conjecture.', { mentioned: ['eponine', 'azelma', 'thenardier-young-son'], items: ['cosette-gold-twenty-franc-piece'] }),
  ]],
  [101, [
    scene('start', 'A Bill for Twenty-Three Francs', 'Before dawn the innkeeper composes an inflated bill while his wife admires it and Cosette sweeps the stairs.', 'thenardier-inn-public-room', [
      ['thenardier', 'Makes out the twenty-three-franc bill, acknowledges his debts, and tells his wife to present it.'],
      ['madame-thenardier', 'Worries that the guest will not pay, then repeats her plan to expel Cosette.'],
    ], 'Paragraphs 0–20 keep Cosette on the audible stairs, not at the billing table. The itemized bill is retained as manuscript, including its misspelling.', { mentioned: ['cosette'], items: ['thenardier-twenty-three-franc-bill'], timeHint: 'The following morning, at least two hours before daybreak' }),
    scene(21, 'An Offer to Take the Child', 'The guest asks whether he may relieve the hostess of Cosette, and she eagerly agrees while the husband listens unseen.', 'thenardier-inn-public-room', [
      ['valjean', 'Looks at the bill, offers to take Cosette immediately, and lays down twenty-five francs.'],
      ['madame-thenardier', 'Pleads the expense of keeping the child and eagerly accepts the proposed removal.'],
      ['thenardier', 'Reappears in the half-open doorway where only his wife sees him and listens before intervening.'],
    ], 'Paragraphs 21–63 explicitly make the husband a hidden listener; absence from the guest’s awareness does not remove physical presence.', { items: ['thenardier-twenty-three-franc-bill'] }),
    scene(64, 'The Bill Reduced', 'Thénardier interrupts with a lower bill and sends his wife away so he can discuss the child privately.', 'thenardier-inn-public-room', [
      ['thenardier', 'Replaces the inflated bill with twenty-six sous and directs his wife to leave.'],
      ['valjean', 'Hears the new lodging charge before the innkeeper takes over the negotiation.'],
      ['madame-thenardier', 'Leaves at her husband’s command before the private negotiation begins.'],
    ], 'Paragraphs 64–68 end with the hostess leaving; the next paragraph explicitly begins the men’s solitude.'),
    scene(69, 'The Foster-Father’s Price', 'Alone with the guest, Thénardier turns a claim of affection into a demand for fifteen hundred francs.', 'thenardier-inn-public-room', [
      ['thenardier', 'Feigns devotion, seeks the guest’s identity, then demands fifteen hundred francs.'],
      ['valjean', 'Refuses to disclose name or address and places three banknotes on the table under his thumb.'],
    ], 'Paragraphs 69–84 are explicitly private. Neither wife nor child hears the bargaining; the alleged medical costs repeat the extortion, not real treatment of Cosette.'),
    scene(85, 'The Coin Found at Waking', 'The narrative returns to Cosette’s discovery of the gold in her shoe and her distracted morning work.', 'thenardier-inn-stairs', [
      ['cosette', 'Hides the new Restoration twenty-franc coin and pauses over it while sweeping.'],
    ], 'Paragraphs 85–87 rewind the morning before the summons. This is the gift from the previous night, not another coin or a purchase she made.', { items: ['cosette-gold-twenty-franc-piece'] }),
    scene(88, 'An Outfit in Black', 'The hostess fetches Cosette, and the guest gives her the clothes he has brought.', 'thenardier-inn-public-room', [
      ['cosette', 'Comes without receiving a blow or insult and takes the complete outfit to dress.'],
      ['madame-thenardier', 'Unusually speaks almost gently while fetching the child.'],
      ['valjean', 'Unties the prepared bundle and gives the child warm clothes and shoes.'],
    ], 'Paragraphs 88–92 give the summoning and clothing, not a farewell by the other children. The bundle was prepared in advance.', { items: ['cosette-black-outfit'] }),
    scene(93, 'Leaving Without Farewells', 'At daybreak the stranger leads Cosette, dressed in mourning and carrying Catherine, toward Livry.', 'montfermeil-livry-road', [
      ['cosette', 'Walks away with the doll and her gold coin without knowing the man’s name or where they are going.'],
      ['valjean', 'Leads the newly clothed child out of the village toward Paris.'],
    ], 'Paragraphs 93–97 explicitly give no farewell and no informed destination for Cosette; the residents’ failure to recognize her is not an actual identity change.', { items: ['catherine-doll', 'cosette-black-outfit', 'cosette-gold-twenty-franc-piece'], timeHint: 'Daylight appearing' }),
  ]],
  [102, [
    scene('start', 'Is That All?', 'The hostess’s dissatisfaction sends her husband after the departing pair with the banknotes still in his pocket.', 'thenardier-inn-public-room', [
      ['thenardier', 'Shows the fifteen hundred francs, accepts the rebuke, and leaves to demand more.'],
      ['madame-thenardier', 'For the first time criticizes the result of her husband’s dealing.'],
    ], 'Paragraphs 0–4 locate the trigger after the pair have left, not where they can hear it.', { timeHint: 'A full quarter of an hour after departure' }),
    scene(5, 'Following the Wrong Turn', 'Thénardier questions neighbours and follows the trail toward the forest, regretting the gun he left behind.', 'montfermeil-gagny-road', [
      ['thenardier', 'Corrects his first wrong turn, follows fresh directions, and presses on without returning for his gun.'],
    ], 'Paragraphs 5–16 combine the pursuit, a character digression and sighting the hat and doll above brushwood. The gun is only wished for; he is not armed with it.'),
    scene(17, 'The Letter He Asked For', 'At the resting place Thénardier tries to reclaim Cosette, but the stranger produces Fantine’s signed authority.', 'montfermeil-aqueduct-turf-path', [
      ['thenardier', 'Offers to return the notes and demands the mother’s written consent, then recognizes the very signature he receives.'],
      ['valjean', 'Produces the release instruction instead of more banknotes and tells the innkeeper to keep it as his receipt.'],
      ['cosette', 'Shudders and presses close to the stranger when her former keeper demands her back.'],
    ], 'Paragraphs 17–42 give the confrontation and actual document. The threat of a forged signature is muttered despite the narrator’s explicit recognition of authenticity.', { items: ['fantine-child-release-letter', 'catherine-doll'], timeHint: 'The document is dated 25 March 1823; this is its later presentation, not its creation' }),
    scene(43, 'The Account and the Cudgel', 'The stranger answers the claim for arrears with exact payments and walks away rather than meet the new demand.', 'montfermeil-aqueduct-turf-path', [
      ['valjean', 'Recites the remittances and balance, takes Cosette’s hand and his stick, and refuses to prolong the bargaining.'],
      ['thenardier', 'Demands a thousand crowns but recoils before the man’s strength and the deserted place.'],
      ['cosette', 'Leaves the resting place with the protector who refuses to give her back.'],
    ], 'Paragraphs 43–57 distinguish the agreed fifteen hundred francs from the unfulfilled additional demand. The stick is held; no beating or gunfight occurs.'),
    scene(58, 'The Pursuit Abandoned', 'Thénardier follows at a distance until repeated discovery and a dark look persuade him to turn back.', 'montfermeil-livry-bondy-forest', [
      ['thenardier', 'Keeps the letter and money, follows through thinned woods, then abandons pursuit when seen again.'],
      ['valjean', 'Notices the follower, changes into brushwood with Cosette, and looks back until the pursuit stops.'],
      ['cosette', 'Goes into the undergrowth with the man leading her away.'],
    ], 'Paragraphs 58–61 confirm no refund of the fifteen hundred and no knowledge of a later Paris address for the innkeeper.', { items: ['fantine-child-release-letter'] }),
  ]],
  [103, [
    scene('start', 'Jean Valjean Was Not Dead', 'The narrator confirms survival and retraces the escape and preparations before the Montfermeil visit.', null, [],
      'Paragraphs 0–3 disclose the deliberate plunge, underwater escape, concealed boat and later journey. These explain the earlier apparent drowning; do not add a second plunge, literal resurrection or duplicate arrival at the inn.', { kind: 'reported', mentioned: ['valjean'], identityReveals: [{ identity: 'montfermeil-yellow-stranger', character: 'valjean', evidenceParagraph: 0, audience: 'reader' }], timeHint: 'Escape retrospect to November; arrival preparations precede the Christmas visit' }),
    scene(4, 'Back into Paris', 'Valjean brings Cosette through the Barrier Monceaux and takes a cab toward the Observatoire.', 'paris-barrier-monceaux', [
      ['valjean', 'Returns with the child, hires a cab to the Observatoire, and leads her on toward the Boulevard de l’Hôpital.'],
      ['cosette', 'Enters Paris beside her rescuer after the day’s changes of vehicle and walking.'],
    ], 'Paragraph 4 resumes the present evening. The unnamed cab driver is a transport participant awaiting incidental cast coverage.', { timeHint: 'Nightfall on the day of departure from Montfermeil' }),
    scene(5, 'Asleep with Catherine', 'Worn out by the day, Cosette falls asleep on Valjean’s back without releasing her doll.', 'paris-observatoire-hopital-streets', [
      ['cosette', 'Drags increasingly on his hand, then rests her head on his shoulder and sleeps holding Catherine.'],
      ['valjean', 'Recognizes her fatigue and carries her through the dark streets.'],
    ], 'The last paragraph recalls earlier food and travel before completing the present carry. No second set of carriage journeys is generated.', { items: ['catherine-doll'] }),
  ]],
]
