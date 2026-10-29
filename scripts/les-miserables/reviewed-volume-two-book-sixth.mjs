const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const volumeTwoBookSixthReview = [
  [119, [
    scene('start', 'The Gate and the Grated Parlor', 'The narrator leads an imagined visitor through the guarded entrance and screened conversation rooms of the convent.', 'petit-picpus-parlor', [],
      'All nineteen paragraphs are a conditional architectural tour, not a new visit by Valjean, Cosette or the narrator-traveller. The portress and veiled speaker are generic roles, not newly identified characters.', { kind: 'exposition' }),
  ]],
  [120, [
    scene('start', 'The Obedience and Its Habit', 'Hugo distinguishes the community’s foundation, dress and rule from other orders that share Perpetual Adoration.', 'petit-picpus-convent', [],
      'Paragraphs 0–7 are institutional history and comparisons across centuries. Historical founders and saints are not physically present in the 1824 convent.', { kind: 'exposition', timeHint: '1824 frame, distinct from foundation dates and religious history' }),
    scene(8, 'Hours, Silence, and Reparation', 'The account describes austerities, authority, the gardener’s warning bell and the prayer called reparation.', 'petit-picpus-convent', [],
      'Paragraphs 8–16 explain repeated practices rather than a particular twelve-hour vigil. Prostration with a rope explains the frightening form without proving a corpse or identifying a named sister.', { kind: 'exposition', mentioned: ['fauchelevent'] }),
    scene(17, 'The Rule in Daily Speech', 'Religious names, common ownership, greetings, hourly prayers and burial arrangements shape convent life.', 'petit-picpus-convent', [],
      'Paragraphs 17–28 are institutional customs and illustrative quotations, not a chronological series of new burials or meetings. The empty vault is distinguished from the Vaugirard burial arrangement.', { kind: 'exposition' }),
    scene(29, 'A Psalm Begun with Notes', 'An absent-minded precentor sings notes instead of the opening word and performs penance after the chapter laughs.', 'petit-picpus-chapel', [
      ['petit-picpus-absent-minded-precentor', 'Begins with do si sol instead of Ecce and remains prostrate through the service in penance.'],
    ], 'Paragraph 29 moves from the general coulpe rule to one particular example. No later named choir mistress is presumed to be this unnamed precentor.'),
    scene(30, 'Visits and Later Attrition', 'The narrator closes the rule’s portrait with restrictions on visitors and a report of later mental collapse among three nuns.', 'petit-picpus-convent', [],
      'Paragraphs 30–33 return to custom and a forward report. The three unnamed women’s later condition is not assigned at once to every nun in the 1824 community.', { kind: 'exposition', timeHint: 'Forward reference to 1825–1830' }),
  ]],
  [121, [
    scene('start', 'Profession and the Boarding-School', 'The narrator describes entry into the order, the profession ceremony and the schoolgirls’ imitation of convent practice.', 'petit-picpus-convent', [],
      'Paragraphs 0–3 cover durations, repeated ceremony and educational custom. Our sister is dead belongs to ritual speech, not a biological death; the quoted later former pupil is not identified as Cosette.', { kind: 'exposition' }),
    scene(4, 'A Hand Refused Through the Bars', 'The account of visitation rules culminates in a pupil’s unsuccessful plea to kiss her little sister’s hand.', 'petit-picpus-parlor', [],
      'Paragraph 4 reports a remembered family visit within a broader description. The anonymous pupil, mother and three-year-old are not merged with named pupils or the novel’s family.', { kind: 'reported' }),
  ]],
  [122, [
    scene('start', 'Recreation in the Garden', 'The schoolgirls bring noise and delight into the garden during their recreation hour.', 'petit-picpus-school-garden', [],
      'Paragraphs 0–2 combine recurring recreation with an anonymous five-year-old’s remark; no specific date or attendance by Cosette is supplied.', { kind: 'reported' }),
    scene(3, 'What Happened After That?', 'A vocal mother hears the dispute between two girls over an impossible history question.', 'petit-picpus-school', [
      ['petit-picpus-history-mother', 'Questions the crying child and Alix until the supposedly factual question is revealed.'],
      ['petit-picpus-history-child', 'Cries that she knows French history despite failing to answer a question without its context.'],
      ['alix-schoolgirl', 'Explains that she opened at random and asked what happened after that.'],
    ], 'Paragraphs 3–14 give a self-contained dialogue. The six- and nine-year-olds are not given invented surnames or a presence in the escape.'),
    scene(15, 'Children’s Sayings and a Written Confession', 'Brief recollections preserve a parrot remark, a child’s written confession, invented stories and a foundling’s lament.', 'petit-picpus-school', [],
      'Paragraphs 15–29 collect separate anecdotes, a document and stories. A seven-year-old’s misunderstood confession is not proof of adultery; the cocks, wolf and Punchinello belong to children’s tales.', { kind: 'reported' }),
    scene(30, 'Corners with Insect Names', 'The portress’s nickname and the refectory’s four corners explain the pupils’ classification into little nations.', 'petit-picpus-refectory', [],
      'Paragraphs 30–32 introduce repeated habits and local vocabulary. Agathocles is a nickname for Sister Agatha, not a different person; the insects are seat labels, not transformations.', { kind: 'exposition', mentioned: ['sister-agatha'] }),
    scene(33, 'The Archbishop Learns the Names', 'During a pastoral visit the archbishop asks a pupil who the passing girls are and receives answers in the school’s insect vocabulary.', 'petit-picpus-classroom', [
      ['petit-picpus-visiting-archbishop', 'Asks the brunette pupil about the girls and then about herself.'],
      ['petit-picpus-brunette-pupil', 'Answers spider, cricket, caterpillar and wood-louse according to the refectory corners.'],
    ], 'Paragraphs 33–42 give one specific visit; the named archbishop in the next chapter may be related, but no unsupported formal identity is assigned here.'),
    scene(43, 'An Écouen Comparison', 'A comparison with Écouen explains another school’s procession vocabulary and a child’s joke about it.', 'ecouen-school', [],
      'Paragraphs 43–44 move to another institution, not another part of Petit-Picpus. The children’s procession labels do not establish sexual history.', { kind: 'reported' }),
  ]],
  [123, [
    scene('start', 'The White Paternoster and the Meals', 'The refectory’s prayer inscription, layout and severe meal discipline receive a detailed description.', 'petit-picpus-refectory', [],
      'Paragraphs 0–3 combine a quoted devotional text, current practice and later whitewashing. Its promised paradise and sacred family are prayer language, not new witnessed miracles or family relationships.', { kind: 'exposition', timeHint: 'Prayer covered in 1827, distinct from the earlier room description' }),
    scene(4, 'A Forbidden Rule and Hidden Fruit', 'The pupils secretly read the rule and preserve stolen fruit for private pleasures.', 'petit-picpus-school', [],
      'Paragraphs 4–7 combine one collective reading with repeated fruit-taking and a later former pupil’s letter. No named girl is assigned each clandestine action.', { kind: 'reported' }),
    scene(8, 'Three Days Instead of One', 'Mademoiselle Bouchard wins a wager by asking the archbishop for leave and receives three days.', 'petit-picpus-school', [
      ['bouchard-schoolgirl', 'Steps out from the pupils and asks for a day’s leave despite their fear.'],
      ['quelen', 'Smiles and grants three days, overruling any objection the prioress might make.'],
    ], 'Paragraph 8 names M. de Quélen explicitly and gives an actual request. The prioress’s inability to oppose does not establish her spoken refusal.'),
    scene(9, 'Madame Albertine', 'The narrator introduces a secluded woman whose history generates speculation in the school.', 'petit-picpus-little-convent', [],
      'Paragraphs 9–11 declare the account unconnected to the main plot. Her reported death in society and the sisters’ spectral description are not literal death or resurrection; the proposed marriage arrangement is hearsay.', { kind: 'exposition', mentioned: ['madame-albertine'] }),
    scene(12, 'Ah, Auguste!', 'At Rohan’s first sermon Albertine briefly rises and calls him by his first name.', 'petit-picpus-chapel', [
      ['madame-albertine', 'Recognizes the preacher, half rises and calls Auguste before returning to stillness.'],
      ['auguste-rohan', 'Looks up from the pulpit when her voice interrupts the chapel’s silence.'],
    ], 'Paragraphs 12–13 give the event and subsequent guesses. Familiar address supports acquaintance, not a proven romance or kinship. Becoming a corpse again is figurative.', { timeHint: 'His first Petit-Picpus sermon; the later death in 1830 is a forward reference' }),
    scene(14, 'Visitors and an Unseen Voice', 'The schoolgirls fear two duchesses and imagine the appearance of a priest they can hear but not see.', 'petit-picpus-convent', [],
      'Paragraphs 14–15 describe repeated visits and imaginative reports. Neither duchess is placed at Albertine’s outcry, nor are unseen clothing details direct observations by the pupils.', { kind: 'reported', mentioned: ['duchesse-choiseul', 'duchesse-serent', 'auguste-rohan'] }),
    scene(16, 'The Flute Beyond the Wall', 'An unseen musician inspires romantic guesses until two pupils glimpse an elderly blind man playing alone.', 'rue-droit-mur', [],
      'Paragraphs 16–17 span months and culminate in discovery. Zétulbé is a name in the tune and the young lover an imagined identity, not actual convent romances or a named new suitor.', { kind: 'reported' }),
  ]],
  [124, [
    scene('start', 'Three Distinct Houses', 'The Great Convent, school and Little Convent house separate populations with different rules.', 'petit-picpus-convent', [],
      'Paragraphs 0–3 describe residents and refugees from different communities. Their clothing and permissions are not all governed by the same rule; Albertine is a resident, not a professed nun.', { kind: 'exposition', mentioned: ['madame-albertine'] }),
    scene(4, 'Madame de Genlis’s Residence', 'The account recalls the writer’s temporary stay and the Latin charm left in her cell.', 'petit-picpus-little-convent', [],
      'Paragraphs 4–7 range from admission to departure and later observation of an inscription. Its supposed protective power is her belief, not a functioning magical defence.', { kind: 'reported', mentioned: ['madame-genlis'], timeHint: 'Admission about 1820 or 1821; stay six or eight months' }),
    scene(8, 'The Shared Church and Its Screens', 'A description explains how the church serves three communities and the public without opening the enclosure to outside faces.', 'petit-picpus-chapel', [],
      'The final paragraph is spatial and customary, not a newly dated service with every resident physically in the choir.', { kind: 'exposition' }),
  ]],
  [125, [
    scene('start', 'Names Within the Convent', 'The narrator records the prioress, mothers and lay-sisters, with their roles, names and distinctive traits.', 'petit-picpus-convent', [],
      'Paragraphs 0–6 are a roster, not a chapter meeting. Mother Innocente and Mademoiselle de Blemeur are one person; Sister Euphrasie is not Cosette merely because that is also the child’s formal name. Later appointments and illnesses are not backdated to all residents.', { kind: 'exposition', mentioned: ['mother-innocente', 'mother-cineres', 'mother-sainte-mechtilde', 'sister-euphrasie'], timeHint: 'Mother Innocente’s tenure 1819–1825; includes forward references such as 1847' }),
    scene(7, 'The Language of the Bells', 'Distinct bell patterns summon people and announce activities in a house governed by silence.', 'petit-picpus-convent', [],
      'Paragraphs 7–10 explain signals, access restrictions and the few men visible to pupils. A bell signal is not proof that its recipient is present in every scene, nor does the roster create a new encounter with the chaplain or drawing-master.', { kind: 'exposition', mentioned: ['fauchelevent', 'abbe-banes', 'ansiaux'] }),
  ]],
  [126, [
    scene('start', 'The Convent’s Trapezium', 'The narrator details the enclosure, building wings, church entrances and garden paths.', 'petit-picpus-convent', [],
      'All three paragraphs are topography and street history. Preserve the lower garden level, distinct public church entrance and old ruins; the former tennis-ground’s devil name is not evidence of supernatural inhabitants.', { kind: 'exposition' }),
  ]],
  [127, [
    scene('start', 'The Centenarian from Fontevrault', 'An elderly resident’s memories, speech and annual vows provide another portrait of the Little Convent.', 'petit-picpus-little-convent', [],
      'Paragraphs 0–2 introduce a separate anonymous woman and repeated ceremonies. Her old acquaintances are not current visitors; rules allowing her private property differ from those of the main community.', { kind: 'reported', mentioned: ['fontevrault-centenarian'] }),
    scene(3, 'Four Wines Remembered', 'The centenarian recounts the old ceremonial gifts of wine and their stages of intoxication.', 'petit-picpus-little-convent', [
      ['fontevrault-centenarian', 'Tells the story of monkey, lion, sheep and hog wine as a recollection of the old world.'],
    ], 'Paragraph 3 isolates a particular storytelling occasion. The described dignitaries and city fathers belong to the tale, not the room.'),
    scene(4, 'The Secret Platter', 'After her death, the woman’s hidden treasure proves to be an irreverent painted platter.', 'petit-picpus-little-convent', [],
      'Paragraphs 4–5 span secret habits, death, discovery and a later sale. The figures on the platter are decoration, not live cupids or events at the convent; its possible influence on Molière is explicitly conjectural.', { kind: 'reported', mentioned: ['fontevrault-centenarian'], timeHint: 'Death undated; platter seen for sale in September 1845' }),
  ]],
  [128, [
    scene('start', 'Another Order’s Adoration', 'Hugo distinguishes the Temple community’s foundation and practices from those of Petit-Picpus.', null, [],
      'All six paragraphs are comparison and institutional history. The Rue Cassette foundation, Temple garden and Petit-Picpus are not a single property, nor are the orders merged because both practise Adoration.', { kind: 'exposition', timeHint: 'Foundation events 1649–1654 and separate Petit-Picpus authorization in 1657' }),
  ]],
  [129, [
    scene('start', 'The Community’s Decline', 'The narrator looks ahead to the disappearance of the school and Little Convent and the shrinking religious community.', 'petit-picpus-convent', [],
      'Paragraphs 0–2 are later history, not the closure of the refuge on the fugitives’ arrival night. The two later deaths are not assigned to invented named residents.', { kind: 'reported', timeHint: '1840 disappearance of school and Little Convent; observations in 1845 and 1847' }),
    scene(3, 'A Question of Civilization and Liberty', 'Hugo explains his respectful inquiry and frames the convent as a problem of both civilization and freedom.', null, [],
      'Paragraphs 3–7 are authorial argument and transition, not a new physical confrontation or visit by the philosophical figures named.', { kind: 'exposition' }),
  ]],
]
