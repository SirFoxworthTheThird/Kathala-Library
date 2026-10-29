const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const bookFourthReview = [
  [37, [
    scene('start', 'The Sergeant of Waterloo', 'The narrator locates the Thénardiers’ cook-shop and describes the sign and the old truck outside.', 'thenardier-inn-front', [],
      'Paragraphs 0–3 introduce the premises and an image on the sign. The painted rescue is not yet certified history or a present battlefield scene.', { kind: 'exposition', timeHint: 'A spring evening in 1818; exact date unspecified' }),
    scene(4, 'Two Children in a Chain Swing', 'Madame Thénardier rocks her daughters in the old truck’s chain as a travelling mother approaches.', 'thenardier-inn-front', [
      ['madame-thenardier', 'Rocks her daughters by a cord and sings, absorbed enough not to notice the approaching woman.'],
      ['eponine', 'Holds her younger sister in the chain’s loop, secured by a knotted handkerchief.'],
      ['azelma', 'Sits in her elder sister’s arms in the low loop of chain, delighted by its motion.'],
      ['fantine', 'Approaches carrying her sleeping child and a heavy carpet-bag, and praises the two girls.'],
      ['cosette', 'Sleeps in her mother’s arms as the journey pauses beside the inn.'],
    ], 'Paragraphs 4–18 establish the actual approach and recognition of Fantine. The daughters’ keys are internal; their names are not disclosed until chapter 38, and Cosette is still unnamed here.'),
    scene(19, 'Ten Months After the Farce', 'The narrator retraces Fantine’s isolation, unanswered letters, sale of possessions, and departure from Paris.', 'paris', [],
      'Paragraphs 19–22 are a retrospective explanation followed by a twenty-year flash-forward about Tholomyès. Do not advance the inn scene’s date or give Fantine knowledge of his later career.', { kind: 'reported', mentioned: ['fantine', 'tholomyes', 'favourite', 'dahlia', 'zephine'], timeHint: 'Source says ten months after the August 1817 outing while framing the inn encounter as spring 1818; retain both textual claims without inventing a precise calendar date' }),
    scene(23, 'A Seat at the Threshold', 'Fantine’s admiration leads to conversation, and she presents herself to the innkeeper as a widow seeking work.', 'thenardier-inn-front', [
      ['fantine', 'Accepts a seat and conceals the abandonment by saying her husband has died.'],
      ['madame-thenardier', 'Introduces herself, invites the traveller to sit, and continues humming between their remarks.'],
      ['cosette', 'Continues sleeping while her mother explains their journey.'],
      ['eponine', 'Remains in the chain swing with her younger sister while the mothers begin talking.'],
      ['azelma', 'Shares the swing until her mother later releases both girls.'],
    ], 'Paragraphs 23–35 replay the approach to explain its significance, then move into the conversation. The narration says middle of day here against the earlier evening frame; the overlap is retained, not counted as a second arrival.', { timeHint: 'Paragraph 23 says toward the middle of the day; conflicts with the evening frame are left unresolved' }),
    scene(36, 'Three Children at Play', 'The child wakes, joins the daughters in digging, and the mothers discuss her name and age.', 'thenardier-inn-front', [
      ['cosette', 'Wakes at her mother’s kiss, joins the other girls, and digs with a scrap of wood before they discover a worm.'],
      ['eponine', 'Descends from the swing and plays at digging with her sister and the newcomer.'],
      ['azelma', 'Joins the older girls in their delighted and frightened inspection of a worm.'],
      ['fantine', 'Calls her daughter Cosette and says she is going on three.'],
      ['madame-thenardier', 'Releases her daughters to play and likens the three children to sisters.'],
    ], 'Paragraphs 36–50 contain the awakening and first naming of Cosette. The narrator identifies Euphrasie in paragraph 44; no second child is created from the formal name.'),
    scene(51, 'Seven Francs, Paid in Advance', 'Fantine asks the innkeepers to keep her daughter, and the husband dictates the price from inside.', 'thenardier-inn-front', [
      ['fantine', 'Offers six francs a month, accepts seven plus advance expenses, and agrees to leave the child’s outfit.'],
      ['madame-thenardier', 'Hesitates, then totals her husband’s demands at fifty-seven francs.'],
      ['thenardier', 'Calls from inside for seven francs, six months in advance, fifteen francs extra, and the outfit before showing his face.'],
    ], 'Paragraphs 51–73 stage the bargain across the doorway. The husband is heard from within until paragraph 72, not assumed to have sat beside the mothers all along. The girls remain nearby at play; no knowledge of the contract is assigned to them.', { items: ['cosette-outfit'], timeHint: 'Same encounter; the six-month advance is not six elapsed months' }),
    scene(74, 'The Morning Separation', 'After a night at the inn, Fantine pays, leaves her daughter, and sets out weeping.', 'thenardier-inn-front', [
      ['fantine', 'Hands over the money and outfit and departs with a lighter bag, intending to return soon.'],
      ['thenardier-neighbour', 'Meets the departing mother and reports how bitterly she is crying in the street.'],
    ], 'Paragraphs 74–76 summarize the night and morning departure with the neighbour’s encounter; the source does not dramatize a farewell dialogue for Cosette.', { timeHint: 'The following morning', items: ['cosette-outfit'] }),
    scene(77, 'The Note Due Tomorrow', 'Once Fantine has gone, Thénardier explains how her payment saves him from a protested debt.', 'thenardier-inn', [
      ['thenardier', 'Says he lacked fifty francs on a note for one hundred and ten and calls the children a successful mouse-trap.'],
      ['madame-thenardier', 'Answers that she had not intended the children to serve as a trap.'],
    ], 'Paragraphs 77–79 remove Fantine before the private financial disclosure. Her payment of fifty-seven francs and his fifty-franc shortfall are distinct amounts, not an arithmetic error.'),
  ]],
  [38, [
    scene('start', 'A First Sketch of the Innkeepers', 'The narrator describes the couple’s character, qualifies the husband’s military claims, and explains the daughters’ names.', 'thenardier-inn', [],
      'All nine paragraphs are portrait and commentary, including forward references and remembered reading habits. The army rank and feat on the sign remain claims pending later evidence; no battlefield presence is inferred here.', { kind: 'exposition', mentioned: ['thenardier', 'madame-thenardier', 'eponine', 'azelma'] }),
  ]],
  [39, [
    scene('start', 'The Outfit at the Pawnbroker’s', 'The innkeepers spend Fantine’s advance, pawn the child’s clothes, and begin treating her as an unwanted dependent.', 'thenardier-inn', [],
      'Paragraphs 0–3 cover the first months, an off-site Paris pawn transaction, repeated correspondence and the first increase. No single simultaneous scene is invented for the separated mother and child.', { kind: 'reported', mentioned: ['thenardier', 'madame-thenardier', 'fantine', 'cosette'], items: ['cosette-outfit'], timeHint: 'The following month, the seventh month, and before the first year ends; monthly demand rises from seven to twelve francs' }),
    scene(4, 'Caresses and Blows', 'The mother’s favour toward her daughters becomes cruelty toward Cosette, and the daughters imitate it.', 'thenardier-inn', [],
      'Paragraphs 4–6 describe repeated abuse, not one witnessed blow or a quantified injury with an invented recovery date.', { kind: 'reported', mentioned: ['madame-thenardier', 'cosette', 'eponine', 'azelma'] }),
    scene(7, 'The Price Rises Again', 'While neighbours praise the supposed charity, Thénardier demands fifteen francs by threatening exposure and expulsion.', 'montfermeil', [],
      'Paragraphs 7–12 span years and report demands and village gossip. Fantine is in M. sur M., not hearing the neighbours or speaking in person with Thénardier.', { kind: 'reported', mentioned: ['thenardier', 'fantine', 'cosette'], timeHint: 'A year and then another pass; monthly demand reaches fifteen francs' }),
    scene(13, 'The Lark Before Daybreak', 'Before she is five Cosette becomes the inn’s servant; hunger, rags, and early labour earn her the name of the Lark.', 'thenardier-inn', [],
      'Paragraphs 13–20 describe accumulated deprivation and recurrent chores through the third year, not one dated morning. Fantine’s imagined return is explicitly counterfactual and Dumollard is an illustrative comparison.', { kind: 'reported', mentioned: ['cosette', 'fantine', 'thenardier', 'madame-thenardier'], timeHint: 'Servitude begins before five; the later portrait is not yet six, after three years at the inn' }),
  ]],
]
