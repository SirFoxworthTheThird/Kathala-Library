const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const volumeTwoBookFourthReview = [
  [104, [
    scene('start', 'Number 50-52', 'The narrator describes the isolated Gorbeau house, its contradictory numbers, staircase and rooms.', 'gorbeau-house', [],
      'Paragraphs 0–12 are a hypothetical rambler’s tour and architectural description, not a second actual arrival by Valjean or the 1861 Waterloo traveller.', { kind: 'exposition' }),
    scene(13, 'How the House Got Its Name', 'An anecdote about two lawyers and royal name changes supplies the house’s traditional name.', null, [],
      'Paragraphs 13–18 recount an earlier century and a local tradition of ownership. The names Corbeau/Gorbeau refer to the same lawyer; the king’s court is not the present lodging.', { kind: 'reported', timeHint: 'About 1770; traditional link to the house, not verified title history' }),
    scene(19, 'An Outskirts Quarter Changing', 'The surrounding walls, factories and grim associations give way to the narrator’s later account of urban growth.', 'paris-boulevard-hopital', [],
      'Paragraphs 19–27 alternate 1823 setting, later crimes, habitual night impressions and railway-era changes. The 1845 paving and railway are not present when the fugitives lodge here.', { kind: 'exposition', timeHint: '1823 surroundings distinguished from later references, including July 1845' }),
  ]],
  [105, [
    scene('start', 'Two Keys and a Waiting Fire', 'Valjean brings the sleeping child into the prepared rooms and keeps watch beside her bed.', 'gorbeau-valjean-rooms', [
      ['valjean', 'Uses separate keys for house and room, lays Cosette in the folding bed, and kneels by her after kissing her hand.'],
      ['cosette', 'Sleeps through arrival without knowing where she has been brought.'],
    ], 'Paragraphs 0–7 give the actual arrival; the remembered hand-kiss to Fantine is nine months earlier, not a second body in the room.', { mentioned: ['fantine'], timeHint: 'Night of the return from Montfermeil; comparison to nine months earlier' }),
    scene(8, 'No Broom Required', 'A passing cart wakes Cosette into an old reflex of service, but she finds herself free to play.', 'gorbeau-valjean-rooms', [
      ['cosette', 'Starts awake calling for her broom, then recognizes the safe room and picks up Catherine.'],
      ['valjean', 'Smiles at her awakening and answers the request to sweep by telling her to play.'],
    ], 'Paragraphs 8–19 move to daylight and the ensuing day. The hostess is remembered in questions, not physically there.', { items: ['catherine-doll'], timeHint: 'Broad daylight after the arrival night' }),
  ]],
  [106, [
    scene('start', 'A New Affection', 'At daybreak Valjean watches the sleeping child; the narrator considers the parent-and-child bond taking root between them.', 'gorbeau-cosette-chamber', [
      ['valjean', 'Keeps still beside Cosette’s bed at daybreak, waiting for her to wake and feeling his affection awaken.'],
      ['cosette', 'Sleeps while the man who has brought her to safety waits beside her bed.'],
    ], 'Paragraph 0 establishes a particular bedside morning before paragraphs1–14 interpret their attachment over the early days. Celestial fatherhood, widowhood and the wedding of existences are metaphors, not a marriage, biological paternity or proof of a dead spouse.', { mentioned: ['myriel'], timeHint: 'The following morning at daybreak' }),
    scene(15, 'The Refuge Prepared', 'The narrator explains the rooms, the separate ground floor, and the account Valjean gave when renting the lodging.', 'gorbeau-house', [],
      'Paragraphs 15–18 retrospectively explain the advance rental and preparations. The ruined Spanish-bond investor and little daughter are his cover story; six months’ rent is not six months elapsed.', { kind: 'reported', mentioned: ['valjean', 'cosette', 'gorbeau-principal-lodger'], timeHint: 'Rental on Christmas Eve, before the arrival; ground floor has no internal stairs or trap to the first story' }),
    scene(19, 'Weeks of Lessons and Play', 'Cosette learns to read and pray while affection changes life for them both.', 'gorbeau-valjean-rooms', [],
      'Paragraphs 19–28 describe weeks and repeated lessons. Cosette calls him father and knows no other name; reader identification does not give her knowledge of Jean Valjean or his former imprisonment.', { kind: 'reported', mentioned: ['valjean', 'cosette', 'fantine', 'myriel', 'javert'], timeHint: 'Week follows week; no invented date of literacy or complete healing of chilblains' }),
  ]],
  [107, [
    scene('start', 'The Beggar Who Gives Alms', 'The pair live quietly as Valjean’s evening walks and secret generosity begin attracting notice.', 'paris-boulevard-hopital', [],
      'Paragraphs 0–4 describe repeated practices; Cosette accompanies some walks and stays with the old woman on others. Do not assign her every outing or almsgiving.', { kind: 'reported', mentioned: ['valjean', 'cosette', 'gorbeau-principal-lodger'] }),
    scene(5, 'A Note in the Coat Lining', 'The principal lodger follows Valjean and secretly watches him take a banknote from his coat.', 'gorbeau-unoccupied-room', [
      ['valjean', 'Cuts open the coat lining and removes a thousand-franc note, unaware of the observer at the crack.'],
      ['gorbeau-principal-lodger', 'Follows silently and sees the banknote without being seen.'],
    ], 'Paragraph 5 first recalls her fruitless questions to Cosette and then stages the unseen observation. The child is not in the room with the coat.'),
    scene(6, 'An Explanation Repeated as Gossip', 'Valjean asks the woman to change the note, and her doubts spread through the neighbourhood.', 'gorbeau-house', [
      ['valjean', 'Gives the note to be changed and describes it as quarterly income received yesterday.'],
      ['gorbeau-principal-lodger', 'Privately doubts the explanation and passes on her suspicions when changing the money.'],
    ], 'Paragraph 6 contains direct instructions followed by reported off-site gossip. Her doubt is not proof of a particular bank withdrawal or theft.'),
    scene(7, 'The Coat Examined Again', 'While Valjean saws wood in the corridor and Cosette watches, the woman feels the hanging coat and inspects its pockets.', 'gorbeau-valjean-rooms', [
      ['gorbeau-principal-lodger', 'Feels possible paper thicknesses and finds a pocketbook, sewing tools, a knife and wigs.'],
    ], 'Paragraphs 7–9 explicitly say she is alone in the room; Valjean and Cosette are in the corridor. More banknotes are her inference from thickness, while the listed pocket objects are observed.', { mentioned: ['valjean', 'cosette'], timeHint: 'A few days later; narrative reaches the last days of winter' }),
  ]],
  [108, [
    scene('start', 'The Beggar by Saint-Médard', 'The narrator introduces an old ex-beadle whom Valjean regularly helps, and the rumours about him.', 'saint-medard-well', [],
      'Paragraph 0 gives the repeated charity and neighbours’ police rumour; it does not certify a spy’s identity.', { kind: 'reported', mentioned: ['valjean', 'saint-medard-ex-beadle'] }),
    scene(1, 'A Face Beneath the Lantern', 'An alarming glance makes Valjean think he has seen Javert in the beggar’s place.', 'saint-medard-well', [
      ['valjean', 'Gives the customary alms, recoils at a familiar-looking face, and returns troubled without asking a question.'],
      ['saint-medard-beggar-figure', 'Raises and quickly lowers his head before the giver can obtain another look.'],
    ], 'Paragraphs 1–3 give a fleeting perception and later regret, not confirmed identification or a conversation with Javert. Cosette is explicitly absent.', { mentioned: ['javert'], timeHint: 'An evening, then reflection that night' }),
    scene(4, 'The Familiar Beadle Next Evening', 'The man at the well answers Valjean’s greeting, and the clear recognition reassures him.', 'saint-medard-well', [
      ['valjean', 'Returns resolutely, receives an ordinary thanks, and laughs away his earlier suspicion.'],
      ['saint-medard-ex-beadle', 'Raises his head and thanks the donor in his familiar whining voice.'],
    ], 'Paragraphs 4–5 explicitly identify this second sighting as the old beadle. It does not retroactively settle the first sighting.', { timeHint: 'The following day at nightfall' }),
    scene(6, 'A Light Through the Keyhole', 'An unexplained arrival interrupts a reading lesson, and Valjean puts out the light and listens.', 'gorbeau-valjean-rooms', [
      ['valjean', 'Stops the spelling, extinguishes the candle, sends Cosette quietly to bed, and stays awake after the listening light recedes.'],
      ['cosette', 'Stops her lesson and follows the whispered instruction to get into bed quietly.'],
    ], 'Paragraphs 6–12 give what is heard and seen from inside. The unknown listener stays in the corridor, and guesses about the old woman are not a confirmed visit.', { timeHint: 'A few days later, possibly eight in the evening' }),
    scene(13, 'The Back at the Staircase', 'At daybreak Valjean sees the new arrival’s back and recognizes Javert’s threatening shape.', 'gorbeau-valjean-rooms', [
      ['valjean', 'Watches through the keyhole and recognizes the tall man’s neck and shoulders without opening his window for another look.'],
    ], 'Paragraphs 13–15 are observation from the room into a dark corridor. The face is not visible; no direct encounter or certainty that the newcomer saw Valjean is invented.', { mentioned: ['javert'], timeHint: 'Daybreak' }),
    scene(16, 'Dumont, or Daumont', 'The woman describes the new lodger, and Valjean conceals his alarm behind ordinary questions.', 'gorbeau-valjean-rooms', [
      ['valjean', 'Asks the new arrival’s name and occupation while trying to sound natural.'],
      ['gorbeau-principal-lodger', 'Gives an uncertain name resembling Dumont or Daumont and calls him a gentleman of property.'],
    ], 'Paragraphs 16–27 give uncertain hearsay, not two distinct tenants or a verified legal identity. An insinuation is Valjean’s interpretation; the narrator explicitly allows that she may intend none.', { timeHint: 'Seven in the morning' }),
    scene(28, 'A Coin on the Floor', 'Valjean packs money, checks the empty boulevard after dark, and leaves with Cosette.', 'gorbeau-valjean-rooms', [
      ['valjean', 'Rolls up a hundred francs despite a noisy dropped coin, surveys the street, and takes the child out.'],
      ['cosette', 'Leaves hand in hand when he calls her.'],
    ], 'Paragraphs 28–32 contain preparation, a brief street inspection and departure. The fallen hundred-sou piece is not stated lost; the title’s tumult is not an actual crowd assembling inside.', { timeHint: 'Preparation after the woman leaves; departure when darkness comes' }),
  ]],
]
