const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'reported', ...extra,
})

export const volumeFourBookNinthReview = [
  [263, [
    part('start', 'Alone on the Slope', 'Valjean sits in workman’s clothing on a secluded slope of the Champ-de-Mars.', 'champ-de-mars-slope',
      'Paragraph 0 establishes the solitary afternoon position. That same day inherits the surrounding chronological difficulty; no harmonized date is asserted.', { kind: 'scene', timeHint: 'About four in the afternoon; relative date unresolved', present: [
        ['valjean', 'Sits alone with his face shaded by a long-visored cap.'],
      ] }),
    part(1, 'Why Leave France?', 'Repeated sightings of Thénardier and anxiety about police searches lead Valjean to plan a journey to England.', 'paris',
      'Paragraphs 1–8 report his reasons and prior warning to Cosette. Thénardier has not recognized him in disguise. The passport remains difficult to procure, not secured; political examples explain fear rather than prove an active search for Valjean.', { mentioned: ['valjean', 'thenardier', 'cosette'] }),
    part(9, 'The Fresh Inscription', 'That morning Valjean discovered an address cut into the garden wall and inferred an intrusion.', 'rue-plumet-garden',
      'Paragraphs 9–17 revisit the inscription made in chapter 261. Valjean guesses a nail, whereas the earlier scene specifies a penknife. He does not identify Marius as its author or tell Cosette what he has found.', { mentioned: ['valjean', 'cosette'], items: ['marius-courfeyrac-address-inscription'], timeHint: 'That morning, before Cosette’s shutters opened' }),
    part(18, 'Move Away from Your House', 'A shadow falls behind Valjean and a folded pencilled warning drops onto his knees.', 'champ-de-mars-slope',
      'Paragraphs 18–21 give the actual receipt and wording. The sender has not been identified; a shadow and apparent hand motion do not justify assigning a known character.', { kind: 'scene', items: ['valjean-anonymous-move-warning'], present: [
        ['valjean', 'Unfolds the paper and reads the instruction to leave his house.'],
      ] }),
    part(22, 'A Figure at the Moat', 'Valjean sees a small figure escaping over the parapet and returns home in thought.', 'champ-de-mars-moat',
      'Paragraphs 22–23 describe clothing and apparent size without a name or confirmed sex. Preserve the anonymous figure rather than identify Éponine prematurely. Valjean returns home; the English journey has not happened.', { kind: 'scene', present: [
        ['valjean', 'Returns home in thought after springing up and seeing the figure escape over the parapet.'],
        ['champ-de-mars-warning-figure', 'Jumps over the parapet in a gray blouse and dust-colored trousers.'],
      ] }),
  ]],
  [264, [
    part('start', 'No Suspicion of Cosette', 'Marius leaves his grandfather in despair without treating Théodule’s supposed courtship as a reason to distrust Cosette.', null,
      'Paragraphs 0–1 explain his response, not a confrontation with Théodule. Othello and Candide are comparisons. The visit’s earlier date conflict remains unresolved.', { kind: 'exposition', mentioned: ['marius', 'gillenormand', 'cosette', 'theodule'] }),
    part(2, 'An Invitation to the Funeral', 'After a night of wandering and broken sleep, Marius wakes to find four friends ready to leave for Lamarque’s funeral.', 'courfeyrac-rue-verrerie-lodgings',
      'Paragraphs 2–5 show the invitation without an intelligible response from Marius. Lamarque is the deceased subject of the funeral, not present in the room. Marius’s two-o’clock return precedes sleep after sunrise.', { kind: 'scene', mentioned: ['lamarque'], present: [
        ['marius', 'Wakes on his mattress, unable to take in the invitation.'],
        ['courfeyrac', 'Asks whether Marius is coming to General Lamarque’s funeral.'],
        ['enjolras', 'Stands ready to go out with the others.'],
        ['feuilly', 'Waits in the room wearing his hat for departure.'],
        ['combeferre', 'Is ready to leave with the group of friends.'],
      ] }),
    part(6, 'The Loaded Pistols', 'Marius takes Javert’s still-loaded pistols and wanders through the day, waiting for his meeting with Cosette.', 'paris',
      'Paragraphs 6–7 establish possession of the original signal pistols without a shot fired. The penny roll is purchased but forgotten, not eaten. The Seine bath is tentatively reported; strange noises prompt a question about fighting rather than firsthand knowledge of a battle.', { mentioned: ['marius', 'javert'], items: ['javert-signal-pistols'] }),
    part(8, 'The Empty Garden', 'At nine Marius enters the garden, finds no Cosette and calls at the closed shutters without reply.', 'rue-plumet-garden-steps',
      'Paragraphs 8–10 explicitly place this return forty-eight hours after the last meeting. The closed, empty house gives no destination for Cosette. Marius thinks of dying but does not die; the imagined father at the window does not actually appear.', { kind: 'scene', timeHint: 'Nine at night, forty-eight hours after the last meeting', mentioned: ['cosette', 'valjean'], present: [
        ['marius', 'Searches the garden, knocks on the shutters and sinks onto the steps after receiving no answer.'],
      ] }),
    part(11, 'The Voice Beyond the Trees', 'A voice tells Marius that his friends await him at the Rue de la Chanvrerie barricade, and he glimpses a fleeing figure at the gate.', 'rue-plumet-garden-gate',
      'Paragraphs 11–18 say the voice resembles Éponine’s, not that Marius confirms her identity. The apparent young man remains unnamed here. The message reports the friends’ location; Marius has not yet arrived at the barricade.', { kind: 'scene', mentioned: ['eponine'], present: [
        ['marius', 'Answers the call and looks through the gate opening toward the departing speaker.'],
        ['plumet-barricade-message-figure', 'Calls from the street and runs into the darkness after directing him to the barricade.'],
      ] }),
  ]],
  [265, [
    part('start', 'The Purse Surrendered', 'Mabeuf has handed the found purse to the police rather than spending it.', null,
      'Paragraphs 0–1 explicitly call it Jean Valjean’s purse, resolving the earlier donor attribution for the reader. Mabeuf does not know Gavroche delivered it. No claimant retrieves it, and none of this money relieves his poverty.', { mentioned: ['mabeuf', 'valjean', 'gavroche'], items: ['mabeuf-lane-gift-purse'] }),
    part(2, 'The Work Lost', 'Failed experiments, debt and forced sales consume Mabeuf’s work and household possessions, leaving his cherished books.', 'mabeuf-austerlitz-cottage',
      'Paragraph 2 summarizes progressive losses. The Flora plates have been sold and made into stewpans; the remaining text is sold as waste paper. The bibliographical names are book references, not visitors.', { items:['mabeuf-diogenes-volume'], mentioned: ['mabeuf', 'mother-plutarque'] }),
    part(3, 'Books for Bread', 'When credit fails, Mabeuf begins selling his library for food, once sacrificing dinner to buy another cherished volume.', 'mabeuf-austerlitz-cottage',
      'Paragraphs 3–12 span repeated days and transactions. The first sale brings thirty sous; the later thirty-five-sou sale and forty-sou purchase leave a five-sou debt. Books compared to children do not establish actual children or deaths.', { mentioned: ['mabeuf', 'mother-plutarque'] }),
    part(13, 'An Invitation Without Relief', 'A promise to help leads to a ministerial dinner where Mabeuf is ignored and returns home in the rain.', null,
      'Paragraph 13 reports the horticultural president’s intervention, invitation and evening visit. No subsidy or employment is granted. An Elzevir is sold to pay the outward carriage; he walks home at midnight.', { mentioned: ['mabeuf', 'mother-plutarque'] }),
    part(14, 'The Last Diogenes', 'Mother Plutarque’s worsening illness forces Mabeuf to sell his final book and place the proceeds beside her bed.', 'mabeuf-austerlitz-cottage',
      'Paragraph 14 explicitly dates the sale June 4, 1832. Royal’s successor is the buyer, not necessarily Royal himself. The hundred francs go onto the nightstand; purchase or administration of the prescribed potion is not shown. Mother Plutarque is ill, not dead.', { items:['mabeuf-diogenes-volume'], mentioned: ['mabeuf', 'mother-plutarque'], timeHint: 'June 4, 1832' }),
    part(15, 'In the Direction of the Arsenal', 'After a morning sitting in the ruined garden, Mabeuf asks a passing gardener about the noises and leaves without a book.', 'mabeuf-austerlitz-garden',
      'Paragraphs 15–27 put this on the following day, June 5. The gardener reports fighting near the Arsenal; Mabeuf has not yet reached it or joined a barricade. The passing gardener is not Fauchelevent.', { kind: 'scene', timeHint: 'June 5, 1832, morning through afternoon', present: [
        ['mabeuf', 'Asks where the fighting is, searches mechanically for a book and goes out bewildered.'],
        ['mabeuf-passing-gardener', 'Answers that riots and fighting are occurring near the Arsenal.'],
      ] }),
  ]],
]
