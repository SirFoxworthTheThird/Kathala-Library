const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'reported', ...extra,
})
const scene = (at, title, description, location, present, reason, extra = {}) =>
  part(at, title, description, location, reason, { kind: 'scene', present, ...extra })

export const volumeFourBookFifteenthReview = [
  [295, [
    part('start', 'The Flight Recalled', 'The narrator returns to the household’s move on June fourth and the conflicting fears beneath its silence.', 'homme-arme-apartment',
      'Paragraphs 0–8 retrospectively establish the move, not a second departure. The fiacre leaves by Rue de Babylone. Valjean takes the inseparable valise, Cosette her portfolio and blotter, and Toussaint limited packages; no full trunks are carried.', { mentioned: ['valjean', 'cosette', 'toussaint'], timeHint: 'June 4, 1832, dusk through night', items: ['valjean-clothes-valise', 'cosette-blotting-book'] }),
    part(9, 'An Apartment That Seems Safe', 'The back-court rooms and quiet street restore Valjean’s confidence after the move.', 'homme-arme-apartment',
      'Paragraphs 9–13 specify second-floor bedrooms separated by a dining-room, adjoining kitchen and Toussaint’s garret. Valjean’s National Guard uniform is visible in a package. Cosette takes broth in her room; the household has not left France.', { mentioned: ['valjean', 'cosette', 'toussaint'], timeHint: 'June 5 morning' }),
    scene(14, 'Dinner and an Unheard Warning', 'Toussaint sets out chicken, Cosette withdraws and Valjean eats without attending to news of fighting.', 'homme-arme-dining-room', [
      ['toussaint', 'Sets the meal and repeatedly reports fighting in Paris.'],
      ['cosette', 'Glances at the meal before withdrawing under the pretext of a headache.'],
      ['valjean', 'Eats a chicken wing and paces in renewed security without taking in the warning.'],
    ], 'Paragraphs 14–17 date the meal about five. The headache is called a pretext; no definite illness follows. England remains an imagined future departure, and Valjean has not yet grasped the love affair.'),
    scene(18, 'Writing Restored in the Mirror', 'Valjean reads the impression of Cosette’s note in the mirror and finally accepts what the blotter reveals.', 'homme-arme-dining-room', [
      ['valjean', 'Examines the reversed blotting impression and its readable reflection, then sinks into the armchair.'],
    ], 'Paragraphs 18–29 explain ordinary reversed writing, not a supernatural vision. The original note remains elsewhere; this is its impression. The text has no recipient’s name. Valjean’s initial denial is overturned by rechecking the reflection.', { items: ['cosette-blotting-book'] }),
    part(30, 'The Luxembourg Youth Without a Name', 'The narrator describes Valjean’s threatened paternal world and his identification of the beloved as the young man from the Luxembourg.', 'homme-arme-dining-room',
      'Paragraphs 30–41 explicitly place this discovery before Marius receives the original. Valjean identifies the man without knowing his name. Loss of Cosette is his fear, not her death or a marriage. The account of mixed tenderness ends in fatherhood, not a relationship between spouses.', { kind: 'exposition', mentioned: ['valjean', 'cosette', 'marius'] }),
    scene(42, 'Which Quarter?', 'Valjean asks Toussaint where the fighting is and then sits outside his door to listen.', 'homme-arme-doorstep', [
      ['valjean', 'Asks about the fighting and goes bareheaded to sit on the stone post.'],
      ['toussaint', 'Names the direction of Saint-Merry in answer to his question.'],
    ], 'Paragraphs 42–50 show her answer inside before his move outdoors five minutes later. She gives a general direction, not the specific Chanvrerie address. Night has come; he has not yet set out for the barricade.'),
  ]],
  [296, [
    part('start', 'Eleven on the Doorstep', 'Valjean remains in despair as the lantern is lit and distant discharges briefly rouse him.', 'homme-arme-doorstep',
      'Paragraphs 0–2 give eleven by Saint-Paul. The link between the heard volleys and Marius’s action is qualified as probably. Comparisons with ice and lifelessness do not establish death. Preserve this stated hour beside the earlier barely-midnight departure rather than invent a synchronized timetable.', { mentioned: ['valjean'], timeHint: 'Saint-Paul strikes eleven; surrounding timing unresolved' }),
    scene(3, 'Gavroche Breaks the Lantern', 'Gavroche arrives, admits hunger and throws a stone at the street lantern as Valjean reaches for money.', 'homme-arme-doorstep', [
      ['gavroche', 'Tests closed fronts, answers Valjean and extinguishes the lantern by breaking its glass.'],
      ['valjean', 'Addresses the child and takes a five-franc coin from his pocket.'],
    ], 'Paragraphs 3–19 show actual lantern damage. The proposed demolition of Archives pillars is bravado, not construction or damage performed here. The neighbors’ Ninety-three cry is political comparison.'),
    scene(20, 'A Gift Accepted', 'Gavroche initially offers back the coin, then pockets it when Valjean says to keep it for his mother.', 'homme-arme-doorstep', [
      ['valjean', 'Places the hundred-sou piece in the boy’s hand and denies trying to stop his lantern-breaking.'],
      ['gavroche', 'Returns the offer at first, then accepts and pockets the same five-franc piece.'],
    ], 'Paragraphs 20–35 describe one coin in different denominations, not two gifts. The narration about knowing such coins by hearsay sits awkwardly with earlier five-franc encounters; retain the text without inventing a first-ever possession rule. Acceptance does not prove later delivery to his mother.', { items: ['valjean-gavroche-five-franc-gift'] }),
    scene(36, 'The Letter Handed to Valjean', 'Valjean learns the address Gavroche seeks, guesses the addressee and persuades him to hand over the paper.', 'homme-arme-doorstep', [
      ['gavroche', 'Names Cosette and the barricade origin before yielding the folded letter.'],
      ['valjean', 'Claims he is the person to receive the letter intended for Cosette and takes it.'],
    ], 'Paragraphs 36–63 establish transfer to Valjean, not to Cosette. He has not read it in this passage. Gavroche’s Provisional Government description is theatrical, not proof of an established government or the letter’s official status.', { items: ['marius-farewell-letter-to-cosette'] }),
    scene(64, 'Chanvrerie, Not Saint-Merry', 'Gavroche corrects Valjean’s guess about the source, announces his return and runs away, breaking another lantern en route.', 'rue-chaume', [
      ['gavroche', 'Supplies the specific barricade street and leaves toward it, smashing a lantern in Rue du Chaume.'],
      ['valjean', 'Asks whether an answer should go to Saint-Merry and receives the correction.'],
    ], 'Paragraphs 64–67 begin at the doorstep before Gavroche moves to Rue du Chaume; Valjean is not said to follow him. The boy’s birdlike disappearance is figurative. Departure does not yet complete his return to the barricade.'),
  ]],
  [297, [
    scene('start', 'The Reply Read in Secret', 'Valjean returns upstairs and reads Marius’s letter by a candle while the household appears asleep.', 'homme-arme-apartment', [
      ['valjean', 'Lights a candle with trembling hands and unfolds the intercepted reply.'],
    ], 'Paragraphs 0–4 establish reading by Valjean, not delivery to Cosette. Cosette and Toussaint are asleep to all appearances, not confirmed witnesses. Marius’s I die is prospective language; Valjean’s fixation on it does not establish death.', { mentioned: ['cosette', 'toussaint', 'marius'], items: ['marius-farewell-letter-to-cosette'] }),
    scene(5, 'Relief That Becomes Gloom', 'Valjean imagines recovering his life with Cosette through Marius’s expected death, then becomes gloomy.', 'homme-arme-apartment', [
      ['valjean', 'Calculates that Marius may still be alive and considers keeping the note from Cosette.'],
    ], 'Paragraphs 5–6 are inner thoughts, not a verified forecast or completed concealment forever. The absence of further heard firing does not guarantee safety or the timing of the next attack.', { mentioned: ['cosette', 'marius'] }),
    scene(7, 'Equipped for the Markets', 'Valjean wakes the porter and later leaves in a complete National Guard uniform with loaded gun and cartridges.', 'homme-arme-house', [
      ['valjean', 'Wakes the porter and departs armed toward the markets about an hour later.'],
      ['homme-arme-porter', 'Finds nearby supplies to complete Valjean’s equipment.'],
    ], 'Paragraphs 7–9 establish departure and equipment, not arrival at the barricade or a stated explanation of motive. The uniform is a disguise or credential of appearance here, not a newly documented enlistment.', { items: ['valjean-national-guard-equipment'] }),
  ]],
  [298, [
    scene('start', 'Singing Through the Empty Street', 'Gavroche continues from the broken lantern in Rue du Chaume, singing as he hurries through the quiet quarter.', 'rue-vieilles-haudriettes', [
      ['gavroche', 'Sings and gestures while moving quickly through the deserted street.'],
    ], 'Paragraphs 0–10 preserve all the quoted song. Atala, Pierrot, Mila and the other named figures are lyrics, not Gavroche’s confirmed companions or lovers.'),
    scene(11, 'A Cart for the Republic', 'Gavroche pulls a sleeping man from a hand-cart, leaves a signed receipt and wheels it toward the Halles.', 'rue-vieilles-haudriettes', [
      ['gavroche', 'Moves the sleeper onto the pavement, writes a receipt and takes the cart.'],
      ['gavroche-auvergnat-cart-owner', 'Remains snoring after being pulled from the cart.'],
    ], 'Paragraphs 11–27 show seizure without consent, not a loan agreed by the owner. The French Republic receipt is Gavroche’s improvisation rather than an official requisition. The sleeper is alive, not injured or dead as far as stated.', { items: ['gavroche-seized-handcart', 'gavroche-handcart-receipt'] }),
    { at: 28, title: 'The Guard Post Wakes', description: 'The noise alerts the Royal Printing Establishment post, and a sergeant goes to investigate.', location: 'royal-printing-guard-post', kind: 'reported', present: [],
      reason: 'Paragraphs 28–32 show the sergeant mistaking the noise for a whole band. The hydra is a sarcastic description of the perceived threat, not a creature. The post consists of suburban National Guards, not the insurgents.', mentioned: ['royal-printing-national-guard-sergeant'] },
    scene(33, 'The Cart as a Projectile', 'Challenged by the sergeant, Gavroche trades insults and sends the cart into him as the alarm is raised.', 'royal-printing-guard-post', [
      ['gavroche', 'Invents a wife in labor as an excuse and launches the cart to escape.'],
      ['royal-printing-national-guard-sergeant', 'Lowers his bayonet, calls to arms and falls into the gutter when struck by the cart.'],
    ], 'Paragraphs 33–54 do not establish Gavroche has a wife. The sergeant’s gun fires into the air; subsequent random firing breaks glass. No person is said to be killed. Gavroche loses the cart in escaping.', { items: ['gavroche-seized-handcart'] }),
    scene(55, 'A Longer Way Back', 'Gavroche rests briefly at Enfants-Rouges, mocks the distant firing and resumes his run and song.', 'enfants-rouges-street-post', [
      ['gavroche', 'Catches his breath, worries about the detour and runs on toward the barricade.'],
    ], 'Paragraphs 55–67 preserve the resumed lyrics. His fear of arriving late is not proof of arrival or a missed attack. The song’s destruction of the Louvre is lyric rhetoric, not damage he performs.'),
    { at: 68, title: 'The Wrong Prisoner', description: 'The cart is impounded and its sleeping owner arrested, while the narrator recalls the episode’s later reputation.', location: 'royal-printing-guard-post', kind: 'reported', present: [],
      reason: 'Paragraphs 68–70 distinguish the owner’s arrest and later harassment before military councils from Gavroche’s escape. No conviction or sentence is specified. The traditional title exaggerates the episode; the final marker closes Volume IV and remains in the manuscript.', mentioned: ['gavroche-auvergnat-cart-owner', 'gavroche'], items: ['gavroche-seized-handcart'] },
  ]],
]
