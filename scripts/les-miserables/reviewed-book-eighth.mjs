const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const bookEighthReview = [
  [66, [
    scene('start', 'White Hair at Daybreak', 'Valjean returns to the infirmary, where Simplice explains Fantine’s hope and notices his altered hair.', 'montreuil-infirmary-laboratory', [
      ['valjean', 'Asks after Fantine, agrees she should not have been undeceived, and looks indifferently at his white hair in the doctor’s glass.'],
      ['sister-simplice', 'Stops preparing chinchona, reports the patient’s mistaken expectation, and offers the small mirror.'],
    ], 'Paragraphs 0–26 take place in the laboratory while Fantine sleeps elsewhere. The offered plan to conceal his return is declined rather than enacted.', { timeHint: 'Dawn after the return from Arras' }),
    scene(27, 'A Question on Waking', 'Alone beside the sleeping patient, Valjean waits until Fantine wakes and asks about Cosette.', 'montreuil-factory-infirmary', [
      ['valjean', 'Draws the curtains, watches the laboured breathing, and stands silently by the bed.'],
      ['fantine', 'Sleeps with painful breathing, then opens her eyes and asks for her daughter.'],
    ], 'Paragraph 30 explicitly excludes the sister from this entry. The comparison with the first vigil is retrospective, not another scene or cure.', { mentioned: ['cosette'], timeHint: 'Source says two months since the first bedside visit, against the six-week phrasing elsewhere; no forced exact date' }),
  ]],
  [67, [
    scene('start', 'The Child Said to Be Here', 'Fantine asks for Cosette, and the arriving doctor tells her the child is present but must wait until she is calm.', 'montreuil-factory-infirmary', [
      ['fantine', 'Believes Cosette has arrived, demands to see her, then apologizes and tries to earn permission by remaining calm.'],
      ['valjean', 'Cannot answer the first demand and later promises that Cosette is well and will be seen soon.'],
      ['fantine-doctor', 'Falsely says the child is here and makes the promised meeting depend on the patient’s composure.'],
    ], 'Paragraphs 0–21 contain the belief and spoken reassurance, not an arrival or reunion. The sister’s later stated presence is not assigned an exact entrance before it is given.', { mentioned: ['cosette'] }),
    scene(22, 'A Voice in the Yard', 'After the doctor leaves, Fantine hears another girl singing and takes the voice for Cosette’s.', 'montreuil-factory-infirmary', [
      ['fantine', 'Recognizes the wrong child’s singing as her daughter’s and imagines their future garden and first communion.'],
      ['valjean', 'Holds the patient’s hand, listens anxiously, and hesitates to tell her what he came to say.'],
      ['sister-simplice', 'Remains beside the two after the doctor’s departure while Fantine builds hopes around the singing.'],
      ['infirmary-yard-girl', 'Runs and sings in the yard, then goes away until her voice fades; her destination is not reported.'],
    ], 'Paragraphs 22–32 explicitly remove the doctor. The narrator directly shows the actual girl outside, identified only as perhaps the portress’s or a workwoman’s child, never Cosette. She goes away at28; her current position afterward is unknown, not inside the sickroom.', { mentioned: ['cosette'] }),
    scene(33, 'Someone Behind Him', 'Fantine’s sudden terror makes Valjean turn toward Javert at the other end of the room.', 'montreuil-factory-infirmary', [
      ['fantine', 'Stops speaking, rises in terror, and signs for her visitor to look behind him.'],
      ['valjean', 'Raises his head at the silence, questions the patient, and turns to see the inspector.'],
      ['javert', 'Has appeared at the doorway without Valjean noticing him.'],
      ['sister-simplice', 'Is still the nurse in the room as the patient’s fear interrupts the conversation.'],
    ], 'Paragraphs 33–37 reveal the intruder; the next chapter retrospectively explains how he reached the threshold.'),
  ]],
  [68, [
    scene('start', 'The Night Mail Home', 'The narration retraces Valjean’s departure from Arras and early return to Montreuil.', 'montreuil-sur-mer', [],
      'Paragraphs 0–1 explain the journey already completed before chapter 66; no second return or infirmary visit is generated.', { kind: 'reported', mentioned: ['valjean'], timeHint: 'Leaves court after half-past midnight, catches the one-o’clock mail, reaches Montreuil a little before six and posts the Laffitte letter', items: ['valjean-laffitte-letter'] }),
    scene(2, 'An Acquittal Despite the Prosecutor', 'The prosecutor demands conviction, but the defense and president accept the new evidence and the jury clears Champmathieu.', 'arras-assize-hall', [
      ['arras-prosecutor', 'Persists in demanding conviction despite the mayor’s confession and the court’s changed view.'],
      ['arras-defence-lawyer', 'Refutes the renewed accusation and argues that the jury now has an innocent man before it.'],
      ['arras-president', 'Joins the defense in his summing up before the jury clears the accused.'],
      ['champmathieu', 'Is cleared of the charge and set at liberty after the court accepts the altered evidence.'],
    ], 'Paragraphs 2–3 return to the hearing after Valjean has left. The acquittal is actual; the prosecutor’s contrary claim is not a second established identity.', { mentioned: ['valjean'] }),
    scene(4, 'A Private Conference', 'The district-attorney and president confer about arresting the mayor.', 'arras-private-conference-room', [
      ['arras-prosecutor', 'Shuts himself up with the president and presses for the mayor’s seizure.'],
      ['arras-president', 'Offers little resistance after his first shock and agrees that the law must take its course.'],
    ], 'Paragraph 4 changes from the public hearing to a closed conference. Valjean and the acquitted man are absent; no specific room plan or overhearing witness is invented.', { mentioned: ['valjean'] }),
    scene(5, 'The Order Dispatched', 'The prosecutor sends a special messenger with an arrest order for Javert to execute.', null, [],
      'Paragraphs 5–6 report the dispatch between towns and recall Javert’s earlier return. The messenger’s receipt at the lodging is the next direct encounter, not a simultaneous presence of Javert at Arras.', { kind: 'reported', mentioned: ['arras-prosecutor', 'javert', 'valjean'], items: ['valjean-arrest-order'] }),
    scene(7, 'The Messenger’s News', 'A police messenger brings Javert the warrant and tells him what happened at Arras.', 'javert-montreuil-lodging', [
      ['javert', 'Receives the warrant while getting out of bed and learns the mayor was identified as Jean Valjean.'],
      ['arras-police-messenger', 'Delivers the prosecutor’s order and a concise account of the courtroom event.'],
    ], 'Paragraphs 7–8 establish how Javert learns what he did not witness. His private location is only a lodging inferred from getting out of bed; no exact street is assigned.', { items: ['valjean-arrest-order'] }),
    scene(9, 'The Threshold Reached', 'Javert obtains a guard, leaves it outside, and enters the infirmary doorway almost unnoticed.', 'montreuil-infirmary-antechamber', [
      ['javert', 'Leaves the corporal and four soldiers in the courtyard and takes directions from the unsuspecting portress.'],
      ['madeleine-portress', 'Points out Fantine’s room without suspecting that the inquiry is for an arrest.'],
    ], 'Paragraphs 9–12 combine character interpretation with his route upstairs. The soldiers stay in the courtyard rather than populating Fantine’s room.'),
    scene(13, 'The Triumph at the Door', 'Javert stands in the half-open doorway until Fantine notices him, and his satisfaction becomes visible.', 'montreuil-factory-infirmary', [
      ['javert', 'Waits almost a minute unseen, then meets Valjean’s glance in triumph at recovering his quarry.'],
      ['fantine', 'Sees the silent inspector first and makes Valjean turn toward him.'],
      ['valjean', 'Meets the inspector’s eyes after the patient alerts him.'],
      ['sister-simplice', 'Remains at the bedside as the inspector’s presence is noticed.'],
    ], 'Paragraphs 13–21 retell the same discovery from Javert’s side. His radiant Saint Michael is the narrator’s analogy, not a new actor or magical transformation.'),
  ]],
  [69, [
    scene('start', 'The Arrest at the Bedside', 'Fantine fears for herself as Javert takes Valjean by the collar and refuses a quiet request.', 'montreuil-factory-infirmary', [
      ['fantine', 'Begs Madeleine to save her and misreads the inspector’s contemptuous address as directed at herself.'],
      ['valjean', 'Assures her the inspector has not come for her, accepts the grip on his collar, and asks to speak privately.'],
      ['javert', 'Rejects the mayoral title, grips the prisoner, and insists that any request be spoken aloud.'],
      ['sister-simplice', 'Is the only other person in the room as the inspector asserts his power.'],
    ], 'Paragraphs 0–32 explicitly restrict the room to the patient, nurse, Valjean and Javert; no guards or doctor enter. The narrator adopts Jean Valjean as the name henceforth in paragraph 2.'),
    scene(33, 'The Hope Taken Away', 'Javert’s loud refusal reveals that Cosette has not arrived, and his exposure of Valjean is followed by Fantine’s death.', 'montreuil-factory-infirmary', [
      ['valjean', 'Asks for three days to fetch Cosette and offers to be accompanied by the inspector.'],
      ['javert', 'Refuses the request as an escape pretext and loudly identifies his prisoner as a convict.'],
      ['fantine', 'Learns that her child is absent, begs for her, and collapses after the inspector’s revelation.'],
      ['sister-simplice', 'Witnesses the patient’s final terror and collapse.'],
    ], 'Paragraphs 33–44 contain the shattering disclosures and explicit death. No reunion, last words to Cosette or later recovery is invented.', { mentioned: ['cosette'], stateChanges: [{ character: 'fantine', isAlive: false, evidenceParagraph: 44 }] }),
    scene(45, 'A Bar of Iron and a Farewell', 'Valjean frees his collar, holds Javert at bay, and tends the dead woman before surrendering.', 'montreuil-factory-infirmary', [
      ['valjean', 'Accuses Javert, wrenches a rod from the old bedstead, tends Fantine’s body, and returns himself to the inspector’s disposal.'],
      ['javert', 'Retreats to the door with his cane and watches instead of summoning the guard.'],
      ['sister-simplice', 'Witnesses the whispered farewell and later reports a seeming smile on the dead woman’s face.'],
    ], 'Paragraphs 45–59 occur after confirmed death; Fantine is a body, not an alive character snapshot. No one hears the words, and the smile is not resurrection. Javert remains physically near the door even though the sister alone witnesses the intimate incident.', { mentioned: ['fantine'], items: ['infirmary-bedstead-rod'] }),
  ]],
  [70, [
    scene('start', 'The City Prison', 'Javert takes Valjean to the town prison.', 'montreuil-city-prison', [
      ['javert', 'Delivers his prisoner to the city jail after the infirmary arrest.'],
      ['valjean', 'Enters the city prison in the inspector’s custody.'],
    ], 'Paragraph 0 is a distinct completed transfer, not immediate transport to Toulon.'),
    scene(1, 'A Reputation Abandoned', 'Most of the town repudiates its former mayor before learning the details of his confession.', 'montreuil-sur-mer', [],
      'Paragraphs 1–6 report collective gossip and damaged names. These distorted forms are not authentic new identities, and the townspeople do not yet know the full Arras account.', { kind: 'reported', mentioned: ['valjean', 'madeleine-portress'] }),
    scene(7, 'The Key on Its Nail', 'The faithful portress mechanically prepares the mayor’s key and candle while the factory stands closed.', 'madeleine-factory-lodge', [
      ['madeleine-portress', 'Sets out the accustomed key and candlestick without thinking, then realizes the absurdity of expecting her imprisoned employer.'],
      ['sister-simplice', 'Keeps watch beside Fantine’s body in the infirmary while the portress sits in her separate lodge.'],
      ['sister-perpetue', 'Watches beside the dead patient with Sister Simplice in the otherwise deserted house.'],
    ], 'Paragraphs 7–9 directly place both sisters at Fantine’s body, separate from the portress in the lodge; actor positions retain the two rooms. The factory’s closure is witnessed for this day, not asserted permanent economic collapse.', { mentioned: ['fantine'], timeHint: 'Evening of the arrest, then two hours after her habitual preparation' }),
    scene(10, 'A Hand at the Lodge Window', 'Valjean returns, takes his key and candle, and sends the startled portress for Simplice.', 'madeleine-factory-lodge', [
      ['valjean', 'Takes the key, lights the taper, explains his prison escape, and asks the portress to find the nurse.'],
      ['madeleine-portress', 'Recognizes the hand and sleeve, then obeys the escaped prisoner as her mayor.'],
    ], 'Paragraphs 10–21 give the witnessed return and spoken account of escape. The means of entering the courtyard is explicitly unexplained; the pass-key is not certified as the solution.'),
    scene(22, 'Evidence Left on the Table', 'Valjean closes the shutters, labels the surviving iron tips and coin, and wraps the candlesticks.', 'madeleine-bedroom', [
      ['valjean', 'Identifies the relics from the fire, leaves them prominently displayed, and bundles the silver candlesticks in torn linen while eating bread.'],
    ], 'Paragraphs 22–26 distinguish preserved metal and coin from burned clothing. The bread’s prison origin is qualified. Later examination is narrated afterward, not conducted while he packs.', { items: ['gervais-forty-sous', 'valjean-cudgel-iron-tips', 'silver-candlesticks'] }),
    scene(27, 'Instructions for the Curé', 'Simplice receives a note directing that expenses be paid and the rest of Valjean’s property go to the poor.', 'madeleine-bedroom', [
      ['valjean', 'Entrusts the disposition note to the sister and declines another visit to Fantine because it could bring the pursuit to her room.'],
      ['sister-simplice', 'Reads the note through her grief and offers a final sight of the dead woman.'],
    ], 'Paragraphs 27–38 introduce the sister’s actual entry. The note says died yesterday although the surrounding narrative frames arrest and escape the same day; preserve the wording without inventing an extra day.', { mentioned: ['fantine'], items: ['valjean-property-note'] }),
    scene(39, 'Two Answers for Javert', 'Warned by footsteps, Valjean hides behind the open door while Simplice denies both company and having seen him.', 'madeleine-bedroom', [
      ['valjean', 'Extinguishes his candle and hides in the angle screened by the opening door while the search enters.'],
      ['sister-simplice', 'Kneels by the table and twice lies without hesitation to protect the concealed man.'],
      ['javert', 'Questions the nurse and withdraws on the strength of her reputation for never lying.'],
      ['madeleine-portress', 'Protests outside the room that nobody has entered and fears fainting while the inspector questions the nurse.'],
    ], 'Paragraphs 39–65 preserve physical concealment distinct from Javert’s belief that the sister is alone. The portress protests in the corridor, not at the bedside or table. The narrator’s later apostrophe to Simplice is not her death at this moment.'),
    scene(66, 'A Bundle on the Paris Road', 'An hour later Valjean leaves Montreuil on foot, carrying a bundle and wearing a blouse.', 'montreuil-paris-road', [
      ['valjean', 'Departs toward Paris through trees and mist with a bundle and an unexplained change into a blouse.'],
    ], 'Paragraph 66 records what carters could attest; the dead workman’s blouse is only a proposed explanation, not established ownership transfer.', { timeHint: 'An hour after the search', items: ['silver-candlesticks'] }),
    scene(67, 'The Public Grave', 'The curé economizes on Fantine’s funeral, and she is buried in the common grave.', 'montreuil-cemetery', [],
      'Paragraphs 67–71 close the volume with burial and commentary. Valjean is absent; the source does not name a funeral gathering or prove that Cosette learned of her mother’s death here.', { kind: 'reported', mentioned: ['fantine', 'montreuil-cure', 'valjean'] }),
  ]],
]
