const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'reported', ...extra,
})
const scene = (at, title, description, location, present, reason, extra = {}) =>
  part(at, title, description, location, reason, { kind: 'scene', present, ...extra })

export const volumeFourBookSecondReview = [
  [229, [
    scene('start', 'A Mattress in the Rue de la Verrerie', 'After the arrests Marius asks to sleep at Courfeyrac’s new lodgings and is given a mattress on the floor.', 'courfeyrac-rue-verrerie-lodgings', [
      ['marius', 'Goes to Courfeyrac after the arrests and asks to sleep there.'],
      ['courfeyrac', 'Takes one of his two mattresses from the bed and spreads it on the floor for his friend.'],
    ], 'Paragraph 0 rewinds to nine on the ambush night and directly stages the request and offered mattress. Javert’s earlier departure with prisoners is reported context, not presence in these lodgings. Rue de la Verrerie replaces Courfeyrac’s earlier address.', {mentioned:['javert'],timeHint:'Ambush night at nine'}),
    part(1, 'The Morning Removal', 'Marius pays his rent and removes his belongings before Javert returns to question him.', 'gorbeau-house',
      'Paragraphs 1–4 compress the removal, later police inquiry and the portress’s neighborhood comments. Javert arrives after Marius has gone; the indivisible source paragraph must not become a fictitious meeting. Suspicions of complicity and fright are mistaken explanations rather than guilt.', {mentioned:['marius','javert','madame-bourgon'],items:['marius-two-chairs'],timeHint:'Next morning at seven, then later inquiry'}),
    part(5, 'Five Francs Every Monday', 'Living with Courfeyrac, Marius borrows a weekly payment for the imprisoned Thénardier.', 'courfeyrac-rue-verrerie-lodgings',
      'Paragraphs 5–8 explicitly make this the first borrowing, qualifying his earlier no-debt rule. Courfeyrac does not know the recipient and Thénardier does not know the donor. Work has stopped, so the earlier stable income is not a continuing guarantee.', { mentioned: ['marius', 'courfeyrac', 'thenardier'] }),
    part(9, 'Reverie Without Work', 'The narrator reflects on the cost of excessive dreaming as Marius withdraws into longing.', null,
      'Paragraphs 9–23 combine argument, thoughts and a private notebook. Writing to her is not delivered correspondence; imagined transmission of thoughts is explicitly illusion. His reason is expressly not deranged; no suicide or death occurs.', { kind: 'exposition', mentioned: ['marius'] }),
    part(24, 'The Name of the Meadow', 'A passer-by names a secluded field, and Marius returns because it recalls the girl’s nickname.', 'larks-meadow',
      'Paragraphs 24–33 give landscape, one encounter and repeated later visits. The name does not reveal her residence. Ulbach’s killing is a reported past event Marius ceases to hear, not an attack in the meadow now.', { kind: 'scene', present: [
        ['marius', 'Asks the place’s name and hears Lark as a personal sign.'],
        ['larks-meadow-passerby', 'Names the meadow and mentions the earlier killing.'],
      ] }),
  ]],
  [230, [
    part('start', 'The Captures That Failed', 'The account explains Montparnasse’s freedom, Éponine’s later arrest and Claquesous’s disappearance in transport.', null,
      'Paragraphs 0–6 distinguish escape from the initial net and a later seizure. Éponine joins Azelma afterward. Claquesous is missing on arrival at prison, but police connivance is conjectural; vapor and fairies are not literal explanations.', { mentioned: ['javert', 'montparnasse', 'eponine', 'azelma', 'claquesous', 'marius'] }),
    part(7, 'The Younger Brujon', 'The investigation leaves Brujon in a shared courtyard under observation, hoping he will reveal information.', 'la-force-charlemagne-yard',
      'Paragraphs 7–13 distinguish the father who carved BRUJON 1811 from the son in 1832. Not being in solitary is not release from prison. His apparent stupidity and reported fever are not proved incapacity.', { mentioned: ['brujon'] }),
    part(14, 'The Paid Commissions', 'Three errands lead investigators to suspected associates.', 'la-force',
      'Paragraphs 14–15 describe the late-February investigation. Fifty sous is broken into ten, fifteen and twenty-five. Police infer a criminal scheme from the messages; their contents are not recovered here.', { mentioned: ['brujon'], timeHint: 'Late February 1832' }),
    scene(16, 'Writing by the Hall Lamp', 'A watchman catches Brujon writing at night; the search leads to solitary confinement but recovers no paper.', 'la-force-new-building', [
      ['brujon', 'Writes on his bed by the hall lamp and is put in solitary after the watchman enters; his paper is not seized.'],
      ['la-force-night-watchman', 'Looks through the dormitory peephole, sees the writing and enters to intervene.'],
      ['la-force-watch-superintendent', 'Inspects the dormitory rounds as the watchman discovers the writing.'],
    ], 'Paragraph16 stages the nighttime discovery about a week after the commission inquiry. The superintendent is outside the dormitory at the round-check box; the watchman enters. Brujon ends in an unspecified solitary cell, so only the general prison context is assigned to his final position.', {actorLocations:{brujon:'la-force','la-force-watch-superintendent':'la-force'},timeHint:'About a week after the late-February commission inquiry, at night'}),
    part(17, 'A Postilion for Babet', 'A bread pellet carries Brujon’s note about a garden gate in Rue Plumet to Babet.', 'la-force',
      'Paragraphs 17–22 explain a real covert message, not a journey to Ireland or a living messenger called Postilion. The note names a proposed affair and location without proving a burglary has occurred.', { kind: 'document', mentioned: ['brujon', 'babet'], items: ['brujon-rue-plumet-note'] }),
    part(23, 'Magnon’s Bridge', 'The note passes through Babet’s imprisoned acquaintance and Magnon to Éponine as both sisters are released.', null,
      'Paragraphs 23–24 establish successive handoffs across different institutions. Magnon is suspected but not arrested. The girls’ release for lack of evidence does not release their father, Babet or Brujon.', { mentioned: ['babet', 'magnon', 'eponine', 'azelma'], items: ['brujon-rue-plumet-note'] }),
    part(25, 'The Biscuit Answer', 'After inspecting the garden, Éponine sends back the symbolic refusal of the proposed affair.', 'rue-plumet-gate',
      'Paragraph 25 compresses observation and the coded reply relayed through women in several places and over days. Her reason is not yet stated.', { mentioned: ['eponine', 'magnon', 'babet'], items: ['rue-plumet-biscuit-reply'] }),
    scene(26, 'The Answer in the Prison', 'Meeting in La Force, Brujon asks about the Rue Plumet scheme and Babet reports its failure.', 'la-force', [
      ['brujon', 'Asks about the Rue Plumet affair while on the way to examination.'],
      ['babet', 'Answers with the coded word Biscuit while returning from examination.'],
    ], 'Paragraphs 26–28 stage a later prison encounter, separate from the women’s message relay. The failed scheme is not a completed burglary.'),
    part(29, 'Another Thread', 'The narrator points ahead to consequences beyond Brujon’s plan.', null,
      'Paragraphs 29–30 are authorial commentary rather than additional prison dialogue.', { kind: 'exposition' }),
  ]],
  [231, [
    part('start', 'Mabeuf’s Decline', 'Failed indigo trials, unpaid wages and the bookseller’s death narrow Mabeuf’s life and weaken his friendship with Marius.', 'mabeuf-austerlitz-cottage',
      'Paragraphs 0–3 describe a period, not one visit. Royol is the source’s variant of the earlier Royal bookseller. Indigo failed in this garden; a new Jardin des Plantes trial remains hopeful, and pawned plates are not redeemed. Mabeuf is nearly eighty here.', { mentioned: ['marius', 'mabeuf', 'mother-plutarque', 'royal-bookseller'] }),
    scene(4, 'The Chain He Cannot Lift', 'Exhausted after work, Mabeuf reads in the dry garden and fails to draw water.', 'mabeuf-austerlitz-garden', [
      ['mabeuf', 'Leaves his books and repeatedly tries without strength to unhook the well chain.'],
    ], 'Paragraphs 4–13 place the ill housekeeper in bed, not at the well. Books about demons and goblins influence his expectation but establish no supernatural beings in the garden.', { mentioned: ['mother-plutarque'] }),
    scene(14, 'A Girl Waters the Garden', 'A ragged girl appears through the hedge and draws enough water for all the plants.', 'mabeuf-austerlitz-garden', [
      ['mabeuf', 'Watches the watering with delight and calls his helper an angel.'],
      ['mabeuf-garden-helper', 'Draws repeated buckets and waters the garden before asking a favor.'],
    ], 'Paragraphs 14–24 leave the helper unnamed. Angel, devil and bat are utterance or comparison, not species or identity revelation. No magical revival replaces the physical watering.'),
    scene(25, 'Where Marius Can Be Found', 'The helper asks for Marius, and Mabeuf directs her to his habitual walk near the Glacière.', 'mabeuf-austerlitz-garden', [
      ['mabeuf', 'Recalls the baron’s walks but cannot give a current residence.'],
      ['mabeuf-garden-helper', 'Asks where Marius lives and leaves after receiving the meadow direction.'],
    ], 'Paragraphs 25–37 provide a habitual meeting place, not his house address. Her departure is not supernatural disappearance.'),
    part(38, 'A Goblin in the Drowsy Mind', 'At bedtime Mabeuf compares the visitor with the stories he was reading.', 'mabeuf-austerlitz-cottage',
      'Paragraphs 38–39 explicitly approach sleep and dream. His question about a goblin does not overturn the observed human labor.', { mentioned: ['mabeuf'] }),
  ]],
  [232, [
    part('start', 'The Unfinished Translation', 'On a Monday Marius postpones his work and takes the prison payment with him to the meadow.', 'larks-meadow',
      'Paragraphs 0–4 mix a recurring work failure with this morning’s walk. Gans and Savigny are authors of the translated controversy, not people in the meadow. The seventh tree is a habitual haunt, not a legal domicile.', { mentioned: ['marius', 'courfeyrac', 'thenardier'], items:['marius-prison-payment-coin'], timeHint: 'Monday, some days after the garden visit' }),
    scene(5, 'On the River Parapet', 'Marius sits above the Gobelins and broods while work and birdsong reach him.', 'larks-meadow', [
      ['marius', 'Sits on the parapet, reproaches himself for his idleness and hears the laundresses and birds.'],
    ], 'Paragraphs 5–7 specify this morning’s solitary position before Éponine arrives. The heard workers occupy the riverbanks rather than the parapet.'),
    scene(8, 'Éponine Finds Him', 'Éponine finally meets Marius and explains that Mabeuf’s directions helped her search.', 'larks-meadow', [
      ['eponine', 'Describes her confinement and search and asks where he lives now.'],
      ['marius', 'Recognizes her by name but initially gives little response.'],
    ], 'Paragraphs 8–22 confirm the garden visitor through her reference to Mabeuf. A fortnight in prison, six weeks searching and rags two months older are source intervals, not silently harmonized dates. Ophelia is explicitly a comparison denied.', { identityReveals: [{ identity: 'mabeuf-garden-helper', character: 'eponine', evidenceParagraph: 15, audience: 'reader' }] }),
    scene(23, 'I Have the Address', 'She offers to take Marius to the girl’s house, transforming his response.', 'larks-meadow', [
      ['eponine', 'Overcomes hesitation and says she knows the house though not the street and number well.'],
      ['marius', 'Leaps from the parapet and urgently asks to be led there.'],
    ], 'Paragraphs 23–44 confirm knowledge of a house, not a named address spoken to Marius here. His joy prevents him from attending to her pain.'),
    scene(45, 'The Promise of Secrecy', 'Marius demands that Éponine conceal the destination from her father and everyone else.', 'larks-meadow', [
      ['marius', 'Presses for an oath and insists they leave immediately.'],
      ['eponine', 'Delights in hearing her name, then promises not to tell anyone.'],
    ], 'Paragraphs 45–65 give a promise, not proof of all future conduct. Thénardier remains in close confinement, not physically present.'),
    scene(66, 'The Coin She Refuses', 'Éponine asks Marius to follow at a distance and lets the offered five francs fall.', 'larks-meadow-departure', [
      ['eponine', 'Asks not to be seen beside him and refuses the offered money.'],
      ['marius', 'Offers the only coin he has, borrowed for Thénardier’s payment.'],
    ], 'Paragraphs 66–73 establish refusal, not payment to her or delivery to the prison. The destination has not yet been reached in this chapter.', {items:['marius-prison-payment-coin']}),
  ]],
]
