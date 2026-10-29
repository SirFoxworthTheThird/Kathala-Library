const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const bookSixthReview = [
  [53, [
    scene('start', 'A Night in the Infirmary', 'The sisters put Fantine to bed as fever brings delirium before sleep.', 'montreuil-factory-infirmary', [
      ['fantine', 'Spends part of the night feverish and delirious before falling asleep.'],
    ], 'Paragraph 0 states removal on Madeleine’s orders and care by sisters, without identifying a particular sister yet. It does not establish a personal journey by Madeleine at her side.', { timeHint: 'The night after the station-house intervention', stateChanges: [{ character: 'fantine', condition: 'burning fever with nocturnal delirium', evidenceParagraph: 0 }] }),
    scene(1, 'The Prayer by the Bed', 'Fantine wakes to find Madeleine beside her, and he speaks after learning the details of her history.', 'montreuil-factory-infirmary', [
      ['fantine', 'Wakes toward midday, sees her visitor praying at the crucifix, and says she feels better after sleep.'],
      ['madeleine', 'Has waited an hour beside the bed after a night and morning of inquiries, then feels her pulse and addresses her suffering.'],
    ], 'Paragraphs 1–12 give the direct bedside meeting. His inward addition about the martyr below is not spoken knowledge for Fantine, and her claim of improvement does not certify recovery.', { timeHint: 'The next day toward midday' }),
    scene(13, 'The Letter to Paris', 'Javert posts a letter whose observers assume he is resigning.', 'montreuil-post-office', [
      ['javert', 'Personally posts the letter addressed to Chabouillet after writing it during the night.'],
      ['montreuil-postmistress', 'Sees the address and handwriting and supposes the letter concerns a resignation.'],
    ], 'Paragraph 13 cuts away from the bedside to the preceding night and morning. The content is withheld; the postmistress’s inference is not its actual purpose.', { timeHint: 'Written that same night, posted the next morning; parallel to Fantine’s first infirmary night' }),
    scene(14, 'The Lark as a Milch Cow', 'Madeleine’s remittance prompts the innkeepers to invent a larger bill instead of sending Cosette.', 'thenardier-inn', [],
      'Paragraphs 14–18 interleave correspondence across two towns and a husband’s comments to his wife. Preserve the two separate three-hundred-franc remittances; medical costs were incurred for Éponine and Azelma and falsely assigned to Cosette.', { kind: 'reported', mentioned: ['madeleine', 'thenardier', 'madame-thenardier', 'cosette', 'eponine', 'azelma'], timeHint: 'Outstanding debt reported as 120 francs; first remittance 300, claimed bill above 500, second remittance another 300' }),
    scene(19, 'Waiting for Cosette', 'The sisters grow tender toward Fantine, but she weakens while repeated promises of her child’s arrival sustain her.', 'montreuil-factory-infirmary', [],
      'Paragraphs 19–26 describe days and twice-daily visits, not one uninterrupted bedside assembly. Cosette remains absent.', { kind: 'reported', mentioned: ['fantine', 'madeleine', 'cosette'] }),
    scene(27, 'The Doctor’s Urgency', 'A chest examination prompts the doctor to urge haste, and Madeleine softens the warning when Fantine asks about it.', 'montreuil-factory-infirmary', [
      ['fantine', 'Asks what the doctor said and takes the softened answer as a promise of health when Cosette arrives.'],
      ['madeleine', 'Shudders at the doctor’s urgency, then forces a smile and tells Fantine the child’s arrival will restore her.'],
      ['fantine-doctor', 'Sounds the patient’s chest, shakes his head, and urges that the desired child be brought quickly.'],
    ], 'Paragraphs 27–38 distinguish the doctor’s ominous warning from the comforting version passed on. The source’s period explanation of snow and suppressed perspiration is retained as narration, not modern medical advice.', { timeHint: 'Condition worsens from week to week; no exact examination date' }),
    scene(39, 'Authority to Fetch the Child', 'The innkeepers continue delaying, and Madeleine writes Fantine’s signed instruction to deliver Cosette to the bearer.', 'montreuil-factory-infirmary', [
      ['madeleine', 'Promises to send for Cosette or go himself and writes the authorization at Fantine’s dictation.'],
      ['fantine', 'Dictates and signs the instruction for Thénardier to release her child to its bearer.'],
    ], 'Paragraphs 39–43 move from reported excuses to an actual dictated letter. Cosette’s alleged inability to travel is another delaying claim, not proof of illness.', { items: ['fantine-child-release-letter'], mentioned: ['thenardier', 'cosette'] }),
  ]],
  [54, [
    scene('start', 'The Inspector Requests Punishment', 'Javert comes to the mayor’s study and asks to be dismissed for a grave offence against him.', 'madeleine-study', [
      ['madeleine', 'Annotates police matters while considering the journey to fetch Cosette, then turns in surprise at the inspector’s request.'],
      ['javert', 'Waits humbly with hat in hand, identifies himself as the offending subordinate, and asks to be turned out rather than allowed to resign.'],
    ], 'Paragraphs 0–28 establish a new morning’s private meeting, not a resumption of the public station confrontation. No witness of the later disclosure is invented.'),
    scene(29, 'The Denunciation', 'Javert admits reporting the mayor as a former convict and explains why he now believes he was wrong.', 'madeleine-study', [
      ['javert', 'Confesses denouncing Madeleine as Jean Valjean in anger and says the authorities have found the real man elsewhere.'],
      ['madeleine', 'Turns livid at the allegation and drops his paper when he hears that another man has been found.'],
    ], 'Paragraphs 29–49 reveal the purpose of the Paris letter and Javert’s changed belief. The resemblance is an accusation; the reader-facing description does not certify Madeleine’s identity.', { timeHint: 'Javert says the station-house incident and denunciation were six weeks earlier; his claim of eight years since disappearance is retained, not converted into a precise anniversary' }),
    scene(50, 'The Case at Arras', 'Javert recounts Champmathieu’s arrest, the identifications, and the threatened sentence.', 'madeleine-study', [
      ['javert', 'Treats the apple branch, proposed name derivation, and four identifications as proof that Champmathieu is Jean Valjean.'],
      ['madeleine', 'Questions the certainty of identification and asks what the accused man says.'],
    ], 'Paragraphs 50–64 are Javert’s spoken reconstruction, not direct scenes at Ailly, Faverolles, Toulon or Arras. Champmathieu, Brevet, Chenildieu and Cochepaille are discussed, not physically in the study; the identity theory is not merged into the cast model.', { mentioned: ['champmathieu', 'brevet', 'chenildieu', 'cochepaille', 'valjean'] }),
    scene(65, 'Tomorrow’s Hearing', 'Madeleine assigns ordinary police work and cautiously elicits the trial’s imminent timing.', 'madeleine-study', [
      ['madeleine', 'Returns ostentatiously to municipal business and asks when the inspector must leave and when judgment is expected.'],
      ['javert', 'Says he will leave by diligence tonight, testify tomorrow, and return before the expected evening verdict.'],
    ], 'Paragraphs 65–74 shift to work assignments and exact relative scheduling. Buseaupied, Chesnelong, Charcellay and the other residents are subjects of future errands, not present complainants.', { timeHint: 'Diligence tonight; trial tomorrow, verdict by tomorrow evening at latest; no absolute date supplied' }),
    scene(75, 'Severity Toward Himself', 'Javert refuses leniency and the offered hand, insisting that he must bear the standard he applies to others.', 'madeleine-study', [
      ['javert', 'Rejects forgiveness and a handshake, calls himself a police spy, and leaves saying he will serve until superseded.'],
      ['madeleine', 'Praises the inspector’s honour, wishes him to retain the post, offers his hand, and listens to the departing footsteps.'],
    ], 'Paragraphs 75–98 return to the dismissal request and close the encounter. His desired discharge is not an actual removal from office; the final assertion explicitly continues his service.'),
  ]],
]
