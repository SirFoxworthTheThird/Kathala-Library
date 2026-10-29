const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'reported', ...extra,
})

export const volumeFourBookFifthReview = [
  [243, [
    part('start', 'The Lancer at the Gate', 'As grief recedes, Cosette notices a handsome officer repeatedly passing the garden.', 'rue-plumet-garden-gate',
      'Paragraphs 0–7 identify the officer to the reader as Théodule, not to Cosette as Marius’s cousin. His comrades infer interest; no conversation between officer and girl occurs.', { mentioned: ['cosette', 'theodule'], identityReveals: [{ identity: 'plumet-handsome-lancer', character: 'theodule', evidenceParagraph: 5, audience: 'reader' }] }),
    part(8, 'The Image on the Surface', 'The narrator contrasts the lovers’ different ways of suffering without settling how deeply Cosette’s memory remains.', null,
      'Paragraphs 8–13 are comparison and uncertainty. Marius dying if he saw her is counterfactual, not a death; an officer’s passing attraction is not a concluded affair or proof that love has ended.', { mentioned: ['cosette', 'marius', 'theodule'], kind: 'exposition' }),
  ]],
  [244, [
    part('start', 'The Unexplained Journey', 'Valjean leaves for a short trip while Cosette remembers the one place where she once saw him alight.', null,
      'Paragraphs 0–1 distinguish habitual one- or two-day trips from this promised three-day absence. Impasse de la Planchette is a prior drop-off point, not proof of his current destination or the location of a money cache.', { mentioned: ['valjean', 'cosette'], timeHint: 'First fortnight of April' }),
    part(2, 'Sounds After the Song', 'Alone downstairs, Cosette stops singing and listens to possible footsteps outside.', 'rue-plumet-pavilion',
      'Paragraphs 2–6 remain in the drawing-room. Weber’s hunters are the song, not people outside. Toussaint is in bed and Valjean is away.', { kind: 'scene', present: [
        ['cosette', 'Stops singing and listens at the closed drawing-room shutter.'],
      ], mentioned: ['valjean', 'toussaint'] }),
    part(7, 'At the First-Floor Shutter', 'Cosette runs upstairs to inspect the moonlit garden and finds no one there.', 'rue-plumet-cosette-room',
      'Paragraphs 7–12 explicitly move her to her own first-floor chamber. Her explanation of hallucination is a thought, not a clinical diagnosis or proof that no visitor existed.', { kind: 'scene', present: [
        ['cosette', 'Looks through her bedroom shutter, opens the window and sees the quiet garden and deserted street.'],
      ] }),
    part(13, 'The Shadow with a Round Hat', 'The next evening an unexplained second shadow startles Cosette, who searches the garden in vain.', 'rue-plumet-garden',
      'Paragraphs 13–24 show the perceived shadow without identifying a person. Its disappearance when she turns is part of her observation; no ghost or named intruder is established.', { kind: 'scene', present: [
        ['cosette', 'Turns to find no one, searches to the gate and remains frightened.'],
      ] }),
    part(25, 'The Gate Examined', 'On his return Valjean hears Cosette’s account and examines the garden gate.', 'rue-plumet-house',
      'Paragraphs 25–28 stage his return, her report and his separate inspection. The actual night watch begins in the next paragraph.', { kind: 'scene', present: [
        ['valjean', 'Grows anxious at the account and examines the gate closely.'],
        ['cosette', 'Reports the unexplained incidents and sees her father examining the entrance.'],
      ] }),
    part(29, 'Three Nights of Watching', 'Cosette wakes to footsteps and recognizes her father patrolling below her window.', 'rue-plumet-garden-steps',
      'Paragraphs 29–30 identify the actual night walker as Valjean. The large club is his, not a proved intruder’s weapon. Cosette stays at her first-floor bedroom shutter, separate from him below.', { kind: 'scene', present: [
        ['valjean', 'Patrols the garden with a club through three nights.'],
        ['cosette', 'Watches from the hole in her shutter and recognizes her father in the moonlight.'],
      ] }),
    part(31, 'A Chimney-Pot Explanation', 'Valjean points out a similar shadow and both accept it as reassurance.', 'rue-plumet-house',
      'Paragraphs 31–36 put Cosette at the upstairs window and Valjean on the grass below. A similar chimney shadow does not prove the cause of the earlier moving shadow.', { kind: 'scene', present: [
        ['valjean', 'Calls up to Cosette and shows the chimney-pipe shadow on the lawn.'],
        ['cosette', 'Looks from her window, laughs and accepts the reassuring explanation.'],
      ], timeHint: 'Third watch night, possibly about one in the morning' }),
    part(37, 'Reassured at Breakfast', 'The next morning Cosette jokes with her father about the chimney-pot explanation.', 'rue-plumet-pavilion',
      'Paragraphs 37–40 move to breakfast and the account’s aftermath. The narrator notes unchecked direction, moon position and disappearance; neither acceptance nor laughter resolves those questions.', { kind: 'scene', present: [
        ['cosette', 'Jokes at breakfast about the shadow and dismisses her earlier fears.'],
        ['valjean', 'Shares the reassuring breakfast and becomes tranquil again.'],
      ], timeHint: 'Morning after the third watch night' }),
  ]],
  [245, [
    part('start', 'A Stone on the Bench', 'During Valjean’s absence Cosette finds a new stone on the seat and retreats to the house.', 'rue-plumet-garden-bench',
      'Paragraphs 0–6 give physical evidence without an observed depositor. A possible Fantine in the shadow is narrator speculation, not a ghost. The bench’s reach from outside is spatial evidence, not proof of the precise placement route.', { kind: 'scene', present: [
        ['cosette', 'Returns from a circuit of the garden and finds the unexpected stone.'],
      ], items: ['plumet-bench-stone'], timeHint: 'An April evening after sundown' }),
    part(7, 'Toussaint’s Reassurance Goes Astray', 'Cosette asks about locked shutters, and Toussaint’s imagined attack only increases her fear.', 'rue-plumet-pavilion',
      'Paragraphs 7–17 contain imagined murder, not actual attackers or deaths. The narrator stops transcribing the servant’s stutter without curing it. Cosette checks the house and sleeps badly; Valjean has not returned during the exchange.', { kind: 'scene', present: [
        ['cosette', 'Asks that everything be secured and retreats to her bolted bedroom.'],
        ['toussaint', 'Describes frightening hypothetical intruders and checks the house with her.'],
      ] }),
    part(18, 'The Notebook Beneath It', 'Morning confidence gives way to renewed surprise when Cosette lifts the stone and discovers unsigned pages.', 'rue-plumet-garden-bench',
      'Paragraphs 18–27 explicitly disprove her overnight supposition that the stone was a dream. The unsealed, unaddressed notebook gives no author’s name at discovery.', { kind: 'scene', present: [
        ['cosette', 'Lifts the stone, takes the envelope and begins reading its numbered leaves.'],
      ], items: ['plumet-bench-stone', 'marius-love-notebook'] }),
  ]],
  [246, [
    part('start', 'A Heart Beneath a Stone', 'The notebook meditates on absence, devotion and the place of love in life and death.', null,
      'All thirty-six paragraphs are the embedded manuscript Cosette reads. Its angels, stars, graves, extinguished sun and imagined messages in nature are text and metaphor, not current events. The quoted search dialogue is within the notebook rather than a new scene in the garden.', { kind: 'document', items: ['marius-love-notebook'] }),
  ]],
  [247, [
    part('start', 'The Writer She Recognizes', 'Cosette reads the notebook as the expression of the young man she remembers, and the passing officer loses his appeal.', 'rue-plumet-garden-bench',
      'Paragraphs 0–7 show repeated reading and two passes by Théodule, not conversation with him. Different inks suggest writing on different days; recognizing the author in her heart is her inference before the next chapter’s explicit confirmation.', { kind: 'scene', present: [
        ['cosette', 'Recognizes the absent lover in the pages and turns away from the smiling officer.'],
        ['theodule', 'Passes the gate and smiles, unaware of her changed response.'],
      ], items: ['marius-love-notebook'] }),
    part(8, 'The Paper Kept Close', 'Cosette memorizes and kisses the notebook, carrying it against her heart through the day.', 'rue-plumet-cosette-room',
      'Paragraphs 8–10 stage her reading and day of bewilderment. The conditional reaction of Valjean is not something he sees or knows.', { kind: 'scene', present: [
        ['cosette', 'Memorizes and kisses the notebook, then keeps touching the paper hidden beneath her dress.'],
      ], mentioned: ['marius'], items: ['marius-love-notebook'] }),
    part(11, 'The Chance Behind the Gift', 'The narrator sets Cosette’s belief in a celestial chance beside the prison message that helped bring Marius back.', null,
      'Paragraphs 11–12 distinguish her feeling of celestial intervention from the actual causal chain. Angels do not carry the notebook.', { kind: 'exposition', mentioned: ['cosette', 'marius'] }),
  ]],
  [248, [
    part('start', 'At the Bench After Dusk', 'With Valjean out and Toussaint in the kitchen, Cosette returns to the stone and finds the young man behind her.', 'rue-plumet-garden-bench',
      'Paragraphs 0–15 locate the servant in the rear kitchen and the father absent. Ghost and impending death are appearance and emotional description; neither lover is dead. His hat lies in the thicket.', { kind: 'scene', present: [
        ['cosette', 'Reaches the bench, turns and retreats until a tree supports her.'],
        ['marius', 'Stands bareheaded behind her after leaving his hat among the shrubs.'],
      ], mentioned: ['valjean', 'toussaint'], items: ['plumet-bench-stone'] }),
    part(16, 'The Visits Explained', 'Marius admits leaving the manuscript and describes his silent nighttime approaches.', 'rue-plumet-garden-bench',
      'Paragraphs 16–20 resolve the garden footsteps and the flight when she turned. His June 16 and July 2 recollections are stated dates, not silently substituted for earlier seasonal language. Cosette nearly collapses and is supported, not killed or definitively shown unconscious.', { kind: 'scene', present: [
        ['marius', 'Asks forgiveness and confirms placing the pages and secretly watching her windows.'],
        ['cosette', 'Hears his first direct speech and sinks until he supports her.'],
      ], items: ['marius-love-notebook'] }),
    part(21, 'The First Kiss', 'Cosette answers his love, and the pair sit together and kiss.', 'rue-plumet-garden-bench',
      'Paragraphs 21–32 stage a mutual confession and one kiss. The paper felt beneath her dress is the notebook; the text supplies no further sexual event.', { kind: 'scene', present: [
        ['cosette', 'Places his hand on her heart and quietly confirms the affection.'],
        ['marius', 'Feels the paper, asks whether she loves him and sits beside her.'],
      ], items: ['marius-love-notebook'] }),
    part(33, 'Names at Last', 'After exchanging their experiences of longing, the lovers finally ask each other’s names.', 'rue-plumet-garden-bench',
      'Paragraphs 33–37 make the names audible to each other for the first time. Telling everything concerns their feelings and longing, not proof of disclosed convict history, finances or full family biographies.', { kind: 'scene', present: [
        ['marius', 'Shares his longing and gives his name when she asks.'],
        ['cosette', 'Asks his name and tells him her own.'],
      ] }),
  ]],
]
