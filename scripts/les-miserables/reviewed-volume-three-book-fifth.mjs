const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'reported', ...extra,
})
const scene = (at, title, description, location, present, reason, extra = {}) =>
  part(at, title, description, location, reason, { kind: 'scene', present, ...extra })

export const volumeThreeBookFifthReview = [
  [182, [
    part('start', 'The Hard Years', 'Marius endures hunger, insecure lodging and the humiliations of poverty.', null,
      'Paragraphs 0–2 introduce a period through generalization and moral argument. Eating clothes, the rabid cow and the crucible are idioms or metaphors, not literal meals or transformations.', { mentioned: ['marius'], kind: 'exposition' }),
    part(3, 'Three Days from One Cutlet', 'Food bought furtively, repeated refusals of money and a turned green coat mark the daily struggle.', null,
      'Paragraphs 3–5 collect habitual purchases and separate acts of help. Six or seven sous buys one cutlet stretched across three days. Courfeyrac gives a coat; night conceals its green color without changing the fabric.', { mentioned: ['marius', 'courfeyrac', 'gillenormand-elder-daughter'] }),
    part(6, 'Admitted to the Bar', 'Using Courfeyrac’s address, Marius qualifies as a lawyer and informs his grandfather.', null,
      'Paragraphs 6–7 move from the professional arrangement to the letter and Gillenormand’s later soliloquy. The nominal address is not proof Marius sleeps in Courfeyrac’s room; the letter’s destruction is distinct from the lost colonel’s document.', { mentioned: ['marius', 'courfeyrac', 'gillenormand', 'gillenormand-elder-daughter'] }),
  ]],
  [183, [
    part('start', 'Seven Hundred Francs a Year', 'Learned languages and publishing tasks finally provide Marius with a small dependable income.', null,
      'Paragraphs 0–1 confirm English and German learned over time and work obtained through Courfeyrac. This is the fulfillment of an earlier plan, not fluency on the day it was proposed.', { mentioned: ['marius', 'courfeyrac'] }),
    part(2, 'The Cabinet and Rousseau’s Table', 'Marius’s room, food, clothes and service expenses form a carefully limited budget.', 'gorbeau-marius-room',
      'Paragraphs 2–5 describe routines at the hovel and a separate restaurant, not one meal in his room. Thirty francs annual rent differs from the three-franc monthly service payment; the room has no fireplace. The principal tenant is the current woman, not Valjean’s deceased housekeeper.', { mentioned: ['marius', 'madame-bourgon', 'courfeyrac'] }),
    part(6, 'Years Without Borrowing', 'The narrator describes the discipline and pride sustained through years of deprivation.', null,
      'Paragraphs 6–7 span the hard years rather than one fasting day. The soul bearing its cage is figurative; absence of borrowing is Marius’s rule, not proof that he never lends money.', { mentioned: ['marius'], kind: 'exposition' }),
    part(8, 'The Debt to Thénardier', 'Marius spends his savings on a persistent, unsuccessful search for the man his father credited with saving him.', 'montfermeil-region',
      'The final paragraph summarizes three years and multiple towns. Marius’s imagined heroic rescue is his belief; the reader’s knowledge of the robbery is not transferred to him. Supposed departure abroad is hearsay and his wish to rescue the man from death does not establish a death.', { mentioned: ['marius', 'pontmercy', 'thenardier'], timeHint: 'Search pursued for three years' }),
  ]],
  [184, [
    part('start', 'Three Years Apart', 'At twenty Marius remains estranged, while his grandfather secretly longs for his return.', null,
      'Paragraphs 0–3 distinguish their inner accounts. Marius is mistaken about the absence of love; neither thinks of a rapprochement. The aunt’s cat or paroquet is only probable in the source, not a newly confirmed pet.', { mentioned: ['marius', 'gillenormand', 'gillenormand-elder-daughter'], timeHint: 'Marius aged twenty, three years after leaving' }),
    part(4, 'Contemplation and Its Limit', 'The narrator praises poverty’s possible lessons but finds Marius too content to retreat into thought.', null,
      'Paragraphs 4–6 develop an explicitly qualified argument rather than a new scene or a universal state assigned to every poor person.', { mentioned: ['marius'], kind: 'exposition' }),
    part(7, 'Work Without a Salary', 'Marius avoids legal practice and refuses a publisher’s better-paid live-in position.', null,
      'Paragraphs 7–8 distinguish qualification from practice and a refused offer from a changed income. Magimel is the narrator’s tentative recollection of the publisher’s name; fifteen hundred francs is offered, not earned.', { mentioned: ['marius'] }),
    part(9, 'Two Friends', 'Courfeyrac and the churchwarden remain close to Marius, who has never firmly joined the political circle.', null,
      'Paragraphs 9–13 distinguish continuing friendship from formal affiliation and Mabeuf’s accidental influence from political instruction. Operating for cataract is Marius’s metaphor, not surgery.', { mentioned: ['marius', 'courfeyrac', 'mabeuf', 'enjolras'] }),
  ]],
  [185, [
    part('start', 'Books, Plants, and Mother Plutarque', 'Mabeuf’s gentle pursuits and his housekeeper’s habits define a household remote from political conflict.', 'mabeuf-rue-mesieres-home',
      'Paragraphs 0–1 are portraits and routines. The curé brother is distinct, Royal is the bookseller, Mother Plutarque the housekeeper’s nickname, and Sultan her cat. The joke about forgotten marriage does not establish a spouse.', { mentioned: ['mabeuf', 'mother-plutarque', 'royal-bookseller', 'abbe-mabeuf'], kind: 'exposition' }),
    part(2, 'The Colonel Remembered Through Flowers', 'Marius visits for the gentler memories of his father that Mabeuf can offer.', null,
      'Paragraph 2 describes recurring visits rather than an encounter with the deceased colonel. The narrator’s earlier claim that Royal was Mabeuf’s only living acquaintance is not imposed literally against this explicit friendship.', { mentioned: ['marius', 'mabeuf', 'pontmercy'] }),
    part(3, 'Losses and Two Removals', 'His brother’s death, a notary’s failure and collapsing book sales drive Mabeuf to cheaper lodgings.', 'mabeuf-austerlitz-cottage',
      'Paragraphs 3–7 separate the Rue Mésières departure, one quarter on Rue Montparnasse and the cottage near the Salpêtrière. The brother dies about 1830 in report, not in a witnessed death scene. Shooting-gallery noise belongs to the intermediate address; the indigo remains a hope.', { mentioned: ['mabeuf', 'abbe-mabeuf', 'mother-plutarque'], timeHint: 'Brother dies about 1830; publishing crisis follows July Revolution' }),
    scene(8, 'The Beauty and the Dragoon', 'Mother Plutarque’s reading prompts Mabeuf to imagine a different story about Buddha and a dragon.', 'mabeuf-austerlitz-cottage', [
      ['mother-plutarque', 'Reads a romance aloud and pauses to wipe her glasses.'],
      ['mabeuf', 'Mishears the phrase and recounts a legend before falling into reverie.'],
    ], 'Paragraphs 8–14 give one domestic anecdote. The officer and beauty belong to the romance, while Buddha and the dragon belong to Mabeuf’s legend, not the cottage cast.'),
  ]],
  [186, [
    part('start', 'Walks and Occasional Visits', 'Solitary walks lead Marius to Gorbeau, while rare visits keep his friends and his father’s comrades within reach.', null,
      'Paragraphs 0–4 combine recurring walks, the earlier discovery of his room and separate evening visits. Suspicious appearance is a passer-by’s impression; frozen days explain clean boots, not a new criminal identity.', { mentioned: ['marius', 'mabeuf', 'courfeyrac'] }),
    part(5, 'From Opinions to Sympathies', 'After 1830 Marius’s political anger softens into a broader sympathy and private reflection.', null,
      'Paragraphs 5–7 describe gradual inner change. The metaphors of seeing conscience and Truth in her well do not establish supernatural sight or a physical location.', { mentioned: ['marius'], kind: 'exposition' }),
    scene(8, 'Twenty-Five Francs for the Neighbors', 'On learning of the Jondrettes’ rent arrears, Marius asks the old woman to settle the debt and give them five francs anonymously.', 'gorbeau-marius-room', [
      ['marius', 'Takes twenty-five francs from his thirty-franc savings for the neighbors’ rent and relief.'],
      ['madame-bourgon', 'Reports the eviction and twenty-franc arrears and receives the anonymous payment instruction.'],
    ], 'Paragraphs 8–14 date this exchange to mid-1831. The neighbors are absent; Marius hardly knows them and has not recognized Thénardier. Payment is entrusted here, not witnessed in the landlord’s hands.', { mentioned: ['jondrette'], timeHint: 'Middle of 1831' }),
  ]],
  [187, [
    part('start', 'An Intended Substitute', 'Aunt Gillenormand decides to offer the visiting Théodule as a replacement for the missing grandson.', 'gillenormand-house',
      'Paragraphs 0–2 describe her plan. Grandnephew in the narrator’s shorthand does not erase the earlier more precise great-grandnephew relation or turn Théodule into a grandson.', { mentioned: ['gillenormand-elder-daughter', 'theodule', 'marius'] }),
    scene(3, 'The Newspaper and the Visit', 'The aunt announces Théodule, then introduces him as Gillenormand broods over a report of a student assembly.', 'gillenormand-house', [
      ['gillenormand', 'Reads the announced gathering and assumes Marius will attend.'],
      ['gillenormand-elder-daughter', 'Introduces her favorite and privately instructs him to agree with everything.'],
      ['theodule', 'Arrives in civilian clothes and greets the older man.'],
    ], 'Paragraphs 3–19 establish the visit and the aunt’s withdrawal. The newspaper announces tomorrow’s deliberation; neither its occurrence nor Marius’s attendance is observed here.'),
    scene(20, 'Agreement Is Not Enough', 'Gillenormand rails against the age and the absent Marius until Théodule’s repeated assent earns an insult.', 'gillenormand-house', [
      ['gillenormand', 'Paces through a political tirade and finally calls his compliant visitor a fool.'],
      ['theodule', 'Agrees repeatedly and proposes limiting reading to official publications.'],
    ], 'Paragraphs 20–35 contain speech addressed partly to an imagined Marius. He remains absent, and attacks on statues or the collapse of the world are rhetoric, not physical action. The aunt has left.', { mentioned: ['marius'] }),
  ]],
]
