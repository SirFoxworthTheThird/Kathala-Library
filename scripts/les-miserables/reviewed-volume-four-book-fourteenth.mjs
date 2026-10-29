const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const volumeFourBookFourteenthReview = [
  [288, [
    scene('start', 'The Returning Scout', 'Gavroche sings a warning, bounds over the omnibus and takes Javert’s gun as the defenders prepare.', 'chanvrerie-barricade', [
      ['enjolras', 'Recognizes the warning song and offers the child his carbine.'],
      ['combeferre', 'Identifies the song as a warning of approaching forces.'],
      ['gavroche', 'Returns breathless and seizes Javert’s large gun instead of accepting the offered carbine.'],
    ], 'Paragraphs 0–11 explicitly confirm the gun acquisition that chapter 283 left as a request. The song is a performed warning, not Bugeaud or gendarmes conversing with the child.', { timeHint: 'June 5, 1832, after ten at night', items: ['javert-captured-musket'] }),
    { at: 12, title: 'Positions Taken', description: 'Two sentinels return while the Prêcheurs post stays out; defenders line the barrier and the tavern windows.', location: 'chanvrerie-barricade', kind: 'scene', present: [
      ['enjolras', 'Takes his place kneeling inside the large barricade, ready to meet the approaching troops.'],
      ['combeferre', 'Kneels with the forty-three defenders, watching above the barricade crest.'],
      ['courfeyrac', 'Holds a kneeling position inside the main barrier as the marching sound approaches.'],
      ['bossuet', 'Waits among the armed defenders with his head level with the barricade crest.'],
      ['joly', 'Joins the silent line of defenders aiming through the main barricade.'],
      ['bahorel', 'Kneels at the large barrier with the defenders prepared to fire.'],
      ['gavroche', 'Takes an armed position among the forty-three after obtaining the captured gun.'],
      ['feuilly', 'Commands six defenders stationed with levelled guns at Corinthe’s windows on two floors.'],
    ], reason: 'Paragraphs 12–16 distinguish forty-three at the large barrier from six under Feuilly at the windows. His exact floor is not specified, so his separate position uses general Corinthe building context. The Prêcheurs sentinel’s continued presence indicates no approach from that side, not safety everywhere. Bayonet gleams and marching sounds identify approaching troops, not supernatural statues.' },
    scene(17, 'The First Volley', 'A challenge and Enjolras’s answer are followed by a volley that cuts the flagstaff and wounds several men.', 'chanvrerie-barricade', [
      ['enjolras', 'Answers the challenge with the French Revolution before the opposing volley.'],
    ], 'Paragraphs 17–26 show actual incoming fire and unnamed injuries. No named defender is declared wounded or dead. The flag falls because the omnibus-pole tip is severed; the main structure is not said to collapse.'),
    scene(27, 'Save the Powder', 'Courfeyrac urges the defenders to withhold fire, and Enjolras retrieves the flag.', 'chanvrerie-barricade', [
      ['courfeyrac', 'Calls for waiting until the troops enter the street before replying.'],
      ['enjolras', 'Picks up the flag from his feet and calls for it to be raised again.'],
    ], 'Paragraphs 27–30 distinguish an order to conserve ammunition from outgoing fire. The troops outside are reloading.'),
    scene(31, 'No Volunteer Yet', 'Enjolras twice calls for someone to remount the flag while the defenders hesitate.', 'chanvrerie-barricade', [
      ['enjolras', 'Repeats the call for a volunteer and feels the danger himself.'],
    ], 'Paragraphs 31–34 end before anyone steps forward. The description of mounting as death conveys extreme risk, not an already completed fatality.'),
  ]],
  [289, [
    { at: 'start', title: 'Behind the Counter', description: 'The narrator recalls Mabeuf’s withdrawn wait and the repeated efforts to persuade him to leave.', location: 'corinthe-taproom', kind: 'reported', present: [],
      reason: 'Paragraph 0 recaps several earlier approaches to Mabeuf. His vacant gaze does not mean that he has died.', mentioned: ['mabeuf', 'courfeyrac'] },
    scene(1, 'The Old Man Rises', 'The volley rouses Mabeuf, who crosses the tap-room and appears on its threshold.', 'corinthe-taproom', [
      ['mabeuf', 'Starts up at the detonation, crosses the room and appears in the doorway as the call for a volunteer is repeated.'],
      ['javert', 'Remains bound to the post under the guard’s watch when Mabeuf rises.'],
      ['corinthe-javert-guard', 'Watches the captive inspector with a drawn sword while the old man crosses the room.'],
    ], 'Paragraphs 1–3 resume the attack’s immediate moment. Enjolras calls from outside; the crowd’s Convention-member claim remains mistaken.', { mentioned: ['enjolras'] }),
    scene(4, 'Mabeuf Raises the Flag', 'Mabeuf takes the flag, climbs the stone steps and refuses the command to retire before a second volley strikes him down.', 'chanvrerie-barricade', [
      ['mabeuf', 'Raises the flag, cries for the Republic and falls bleeding after the second discharge.'],
      ['enjolras', 'Yields the flag in amazement as the old man takes it.'],
    ], 'Paragraphs 4–17 show the climb, warning and fall. The possible legal summons is qualified as probably a police commissary, not a named verified speaker. Spectral and supernatural descriptions are comparisons; explicit confirmation of death follows in the speech.'),
    scene(18, 'The Private Correction', 'Courfeyrac quietly tells Enjolras that the fallen man is Mabeuf and was not a regicide.', 'chanvrerie-barricade', [
      ['courfeyrac', 'Privately supplies Mabeuf’s name and corrects the revolutionary biography.'],
      ['enjolras', 'Hears the correction after praising the supposed regicides.'],
    ], 'Paragraphs 18–21 explicitly restrict the correction to Enjolras rather than the whole crowd. His Brutus comparison does not restore the false biography.', { mentioned: ['mabeuf'] }),
    scene(22, 'The Bloodied Coat', 'Enjolras declares Mabeuf’s death exemplary, kisses his brow and holds up the bloodied coat as the new flag.', 'chanvrerie-barricade', [
      ['enjolras', 'Calls for sheltering the body, kisses the dead man and displays his pierced coat.'],
      ['mabeuf', 'Lies dead while Enjolras raises his head and removes the bloodied coat.'],
    ], 'Paragraphs 22–26 explicitly confirm Mabeuf is dead. The proposed sheltering is ordered but not shown completed in this passage. The coat is declared their flag; it is not yet described as mounted on a pole. Making the barricade impregnable is exhortation, not a physical guarantee.', { mentioned: ['mabeuf'], stateChanges: [{ character: 'mabeuf', isAlive: false, evidenceParagraph: 25 }], items: ['mabeuf-bloodied-coat'] }),
  ]],
  [290, [
    scene('start', 'Mabeuf Brought Inside', 'Six defenders cover Mabeuf and carry his body to the large taproom table while Enjolras renews his threat to Javert.', 'corinthe-taproom', [
      ['mabeuf', 'Is carried dead beneath the widow’s black shawl to the large table.'],
      ['javert', 'Remains bound and impassive as the body passes.'],
      ['enjolras', 'Tells the prisoner his turn will come soon.'],
    ], 'Paragraphs 0–3 complete the sheltering ordered earlier. The six bearers are unnamed. Javert is threatened again but not executed.'),
    scene(4, 'Gavroche Gives the Alarm', 'The child spots an approach, and the others rush out as guards enter over the omnibus and through the cut.', 'chanvrerie-barricade', [
      ['gavroche', 'Remains on guard, shouts a warning and retreats before the intruders without fleeing.'],
      ['courfeyrac', 'Runs from the tavern at the alarm.'],
      ['enjolras', 'Returns from the taproom to face the breach.'],
      ['jean-prouvaire', 'Rushes out with the defenders.'],
      ['combeferre', 'Hastens from the wine-shop as the guards enter.'],
      ['joly', 'Runs out with the others.'],
      ['bahorel', 'Rejoins the barrier at the alarm.'],
      ['bossuet', 'Rushes from the tavern into the threatened enclosure.'],
    ], 'Paragraphs 4–7 show an actual breach by both access paths. The river and levee describe the attack metaphorically, not flooding.'),
    scene(8, 'Bahorel Falls, the Gun Fails', 'Bahorel kills one guard and is killed by another; Gavroche aims at his attacker but the captured gun fails to discharge.', 'chanvrerie-barricade', [
      ['bahorel', 'Strikes down the first guard and is killed by the second guard’s bayonet.'],
      ['courfeyrac', 'Is overthrown by another guard while calling for the others to follow.'],
      ['gavroche', 'Tries to fire Javert’s immense gun at the guard advancing on him.'],
    ], 'Paragraph 8 explicitly kills Bahorel and the first guard. Javert’s gun is unloaded, not repaired or discharged. The raised bayonet has not yet touched Gavroche; Courfeyrac’s fall alone does not establish a wound.', { stateChanges: [{ character: 'bahorel', isAlive: false, evidenceParagraph: 8 }], items: ['javert-captured-musket'] }),
    scene(9, 'Marius’s Two Shots', 'Marius enters and shoots the guards threatening Gavroche and Courfeyrac.', 'chanvrerie-barricade', [
      ['marius', 'Fires two shots as he enters, striking the two threatening guards.'],
      ['gavroche', 'Is saved before the guard’s bayonet can touch him.'],
      ['courfeyrac', 'Is freed from the guard who had overthrown him.'],
    ], 'Paragraphs 9–10 identify Marius as the shooter; chapter 291 confirms the first and second shots’ order. The forehead and chest hits bring down the guards. Neither rescued friend is declared injured here.', { items: ['javert-signal-pistols'] }),
  ]],
  [291, [
    { at: 'start', title: 'The Hesitation Ends', description: 'The narrator explains how Marius’s view of the assault brought him into the fight with both pistols.', location: 'mondetour-open-approach', kind: 'reported', present: [],
      reason: 'Paragraphs 0–2 recap the entry and two rescue shots, not two additional shots. The assailants then occupy most of the crest without yet jumping down in force.', mentioned: ['marius', 'mabeuf', 'bahorel', 'courfeyrac', 'gavroche'] },
    scene(3, 'A Hand Across the Muzzle', 'Having discarded his discharged pistols, Marius turns toward the powder as the young workman blocks a gun aimed at him.', 'corinthe-taproom-door', [
      ['marius', 'Drops the spent pistols and turns toward the reserve powder in the taproom.'],
      ['courfeyrac-marius-seeking-visitor', 'Darts forward, places a hand over the gun muzzle and falls after the shot passes through it.'],
    ], 'Paragraphs 3–4 specify the young workman in velvet trousers without yet naming the visitor. The hand wound is certain; a further wound is only possible in the smoke. Marius is not hit and barely apprehends the intervention.', { items: ['javert-signal-pistols', 'chanvrerie-reserve-powder-barrel'], stateChanges: [{ character: 'courfeyrac-marius-seeking-visitor', injury: 'Gunshot through the hand while blocking a muzzle aimed at Marius; any further wound remains uncertain here.', evidenceParagraph: 4 }] }),
    scene(5, 'The Close Volley', 'Defenders rally at the windows and rear houses, and both sides fire after rejecting a surrender demand.', 'chanvrerie-barricade', [
      ['enjolras', 'Warns against confused fire, then orders a volley instead of surrender.'],
      ['courfeyrac', 'Stands exposed against the rear houses with the determined defenders.'],
      ['jean-prouvaire', 'Faces the assailants from the rear with the others.'],
      ['combeferre', 'Takes his place among the exposed defenders at the back.'],
    ], 'Paragraphs 5–12 show simultaneous fire and unnamed casualties on both sides. No specific new wound or death for a named friend is established. Many others take positions upstairs rather than all remaining on the ground.'),
    scene(13, 'The Powder and the Torch', 'Marius brings the powder barrel to the torch’s stone shelter and threatens to destroy the barricade.', 'chanvrerie-barricade-torch', [
      ['marius', 'Moves the reserve powder, breaks the barrel and lowers the torch toward it while threatening explosion.'],
    ], 'Paragraphs 13–20 explain an action performed under cover of the volley’s smoke. This is the reserve powder, not the lime barrels. He explicitly includes himself in the threatened destruction, but the torch does not ignite the powder here.', { items: ['chanvrerie-reserve-powder-barrel'] }),
    { at: 21, title: 'The Attackers Retreat', description: 'The assailants abandon dead and wounded and flee back into the dark street, leaving the barricade free.', location: 'chanvrerie-barricade', kind: 'reported', present: [],
      reason: 'Paragraphs 21–22 establish retreat from this attack, not the defeat of the entire army or an explosion. Abandoned casualties are not all declared dead; the defenders’ longer-term survival is not decided.' },
  ]],
  [292, [
    scene('start', 'The Rescuer Welcomed', 'The friends greet Marius, and Enjolras acknowledges him as their chief.', 'chanvrerie-barricade', [
      ['marius', 'Receives the friends’ thanks and asks for the chief while overwhelmed by events.'],
      ['courfeyrac', 'Embraces Marius and credits him with saving his life.'],
      ['combeferre', 'Welcomes the timely arrival.'],
      ['bossuet', 'Praises Marius’s timing.'],
      ['gavroche', 'Thanks Marius for saving him from the guard.'],
      ['enjolras', 'Answers Marius’s question by naming him chief.'],
    ], 'Paragraphs 0–10 acknowledge leadership without a formal transfer of every command. Marius does not recognize or even see the bound Javert; do not grant him that knowledge.', { mentioned: ['javert'] }),
    { at: 11, title: 'Mattresses for the Wounded', description: 'The defenders tend casualties, reinforce the works with tables and find the three women hiding in the cellar.', location: 'corinthe', kind: 'reported', present: [],
      reason: 'Paragraphs 11–13 establish treatment and discovery, not the women’s death or departure from the site. Tables for lint, cartridges and Mabeuf’s body remain; bedding becomes the wounded men’s mattresses. The attackers’ reason for waiting is conjectural.', mentioned: ['widow-hucheloup', 'matelote', 'gibelotte', 'mabeuf'] },
    scene(14, 'A Proposed Exchange', 'Finding Prouvaire missing, Combeferre proposes exchanging Javert for him.', 'corinthe-taproom', [
      ['combeferre', 'Proposes carrying a white handkerchief on his cane to negotiate the exchange.'],
      ['enjolras', 'Values Prouvaire’s life above his wish to execute the inspector and stops to listen.'],
      ['javert', 'Remains bound beside the proposed negotiation.'],
    ], 'Paragraphs 14–19 infer captivity from Prouvaire’s absence among dead and wounded. The flag of truce is proposed; Combeferre has not left or negotiated.', { mentioned: ['jean-prouvaire'] }),
    scene(20, 'The Voice and the Shot', 'The friends recognize Prouvaire’s final cry, hear a shot and conclude that he has been killed.', 'corinthe-taproom', [
      ['combeferre', 'Hears the recognized voice and declares that the captors have killed Prouvaire.'],
      ['enjolras', 'Tells Javert that his friends have just shot him, invoking the prisoner’s threatened fate.'],
      ['javert', 'Remains the living captive addressed after the shot outside.'],
    ], 'Paragraphs 20–28 convey Prouvaire’s death through recognized voice, flash, report and the friends’ conclusion, not a witnessed body or named shooter. Enjolras’s words do not execute Javert.', { mentioned: ['jean-prouvaire'] }),
  ]],
  [293, [
    scene('start', 'The Voice at His Feet', 'Inspecting the small barricade, Marius hears the Rue Plumet voice and discovers the wounded figure, who names herself Éponine.', 'mondetour-small-barricade', [
      ['marius', 'Inspects the quiet side and bends toward the crawling figure calling his name.'],
      ['eponine', 'Names herself from the pavement while dressed in the workman’s clothes.'],
    ], 'Paragraphs 0–18 explicitly resolve the voice and the workman identity. Her statement that she is dying is not yet the final death. The figure is not a newly arriving unrelated boy.', { identityReveals: [
      { identity: 'courfeyrac-marius-seeking-visitor', character: 'eponine', evidenceParagraph: 16, audience: 'reader' },
      { identity: 'plumet-barricade-message-figure', character: 'eponine', evidenceParagraph: 16, audience: 'reader' },
    ] }),
    scene(19, 'The Bullet’s Path', 'Marius tries to lift Éponine, who shows her pierced hand and explains that the bullet also passed through her body.', 'mondetour-small-barricade', [
      ['marius', 'Offers to carry her for treatment, then sits with her head on his knees.'],
      ['eponine', 'Confirms the hand at the muzzle was hers and explains the wound through to her back.'],
    ], 'Paragraphs 19–43 resolve the further wound left uncertain in chapter 291. Her relief on his knees is expressed comfort, not healing. He does not carry her to the mattresses.', { stateChanges: [{ character: 'eponine', injury: 'Bullet pierced her hand and body, exiting through her back; she remains bleeding and cannot be moved without pain.', evidenceParagraph: 40 }] }),
    scene(44, 'Why She Led Him Here', 'Éponine describes her jealousy, admits bringing Marius to the barricade and confesses her contradictory wish to die before him.', 'mondetour-small-barricade', [
      ['eponine', 'Admits the summons and speaks of wanting their deaths while bleeding from the chest.'],
      ['marius', 'Listens with profound compassion as her breathing worsens.'],
    ], 'Paragraphs 44–53 explicitly state her motives without proving that every exit is sealed or everyone will die. Her remembered coin question does not establish that Marius retrieved it. Blood and difficulty breathing are actual, not a metaphorical wound.'),
    scene(54, 'Her Brother’s Song', 'Gavroche sings while loading his gun, and Éponine tells Marius the singer is her brother and must not see her.', 'mondetour-small-barricade', [
      ['gavroche', 'Mounts a table to load his gun and sings, unaware of his sister’s condition nearby.'],
      ['eponine', 'Recognizes the song and asks that her brother not see her wounded.'],
      ['marius', 'Learns which child is her brother and remains when she begs him not to leave.'],
    ], 'Paragraphs 54–69 separately place Gavroche on a table loading his gun, within hearing rather than at her side. The table’s particular position in the enclosure or tavern is unstated, so no exact map point is asserted. He does not learn of her condition in this passage. The song’s fleeing gendarme is quoted verse, not a current retreat.', { items: ['javert-captured-musket'] }),
    scene(70, 'The Withheld Letter', 'Éponine admits keeping a letter intended for Marius and guides his hand to her pocket so he can take it.', 'mondetour-small-barricade', [
      ['eponine', 'Confesses deliberately withholding the letter she had been told to post.'],
      ['marius', 'Takes the paper from her blouse pocket.'],
    ], 'Paragraphs 70–74 establish transfer but not reading or the letter’s contents. A future meeting after death is her expression, not confirmed afterlife knowledge.', { items: ['eponine-withheld-letter-for-marius'] }),
    scene(75, 'A Little Bit in Love', 'Marius promises the requested farewell kiss, and Éponine makes her final declaration before dying.', 'mondetour-small-barricade', [
      ['marius', 'Promises the request and holds her head on his knees.'],
      ['eponine', 'Asks for a kiss on her brow after death, declares her love and expires.'],
    ], 'Paragraphs 75–83 distinguish the earlier mistaken impression of death from the explicit final expiration. The kiss is promised, not yet performed; her claim she will feel it is not proof of consciousness after death.', { stateChanges: [{ character: 'eponine', isAlive: false, evidenceParagraph: 83 }] }),
  ]],
  [294, [
    scene('start', 'The Promised Farewell', 'Marius kisses Éponine’s brow, lays her gently on the ground and takes the letter to a candle inside.', 'mondetour-small-barricade', [
      ['marius', 'Fulfils the promised kiss, sets down the body and goes to read the note.'],
      ['eponine', 'Lies dead as Marius kisses her brow and lays her down.'],
    ], 'Paragraphs 0–6 actually perform the farewell promised earlier. The movement into the taproom follows; the body is not carried there. The address is read before the seal is broken.', { items: ['eponine-withheld-letter-for-marius'] }),
    { at: 7, title: 'Cosette’s New Address', description: 'Cosette’s note announces the immediate move to Rue de l’Homme Armé and a planned English journey a week later.', location: 'corinthe-taproom', kind: 'document', present: [],
      reason: 'Paragraphs 7–8 preserve the dated June 4 note. Cosette’s handwriting was previously unknown to Marius. The English journey is a plan, not proof that she is already abroad.', items: ['eponine-withheld-letter-for-marius'] },
    { at: 9, title: 'The Intercepted Message Explained', description: 'The narrator recounts Éponine’s warning, Valjean’s move, Cosette’s commission and the withheld letter that led Marius to the barricade.', location: null, kind: 'reported', present: [],
      reason: 'Paragraph 9 explicitly identifies Éponine as the Champ-de-Mars warning figure. It connects earlier visits and the summons without repeating them as new events. Cosette believes she employs a young workman and does not recognize Éponine. Her five-franc payment is distinct from Marius’s earlier rejected coin.', mentioned: ['eponine', 'valjean', 'cosette', 'toussaint', 'courfeyrac', 'marius'], identityReveals: [{ identity: 'champ-de-mars-warning-figure', character: 'eponine', evidenceParagraph: 9, audience: 'reader' }] },
    scene(10, 'Two Duties', 'Marius briefly recognizes that Cosette loves him, then resolves on a farewell and on removing Gavroche from danger.', 'corinthe-taproom', [
      ['marius', 'Kisses Cosette’s letter and decides to send a reply and save her messenger from the coming attack.'],
    ], 'Paragraph 10 reports renewed despair despite the letter. His intended death is not a completed event. Gavroche’s rescue is his objective; sending him away does not guarantee his safety.', { mentioned: ['cosette', 'gavroche', 'eponine'], items: ['eponine-withheld-letter-for-marius'] }),
    scene(11, 'The Reply and the Pocketbook', 'Marius writes Cosette a farewell, addresses it and adds instructions in his pocketbook for returning his body to his grandfather.', 'corinthe-taproom', [
      ['marius', 'Writes the reply on a torn leaf and records his identity and grandfather’s address in the pocketbook.'],
    ], 'Paragraphs 11–17 contain two distinct written texts: the folded outgoing letter and the retained pocketbook instruction. I die is prospective language, not proof of death. The pocketbook once held the love notebook; it is not a second copy of that earlier manuscript.', { items: ['marius-farewell-letter-to-cosette', 'marius-body-return-pocketbook'] }),
    scene(18, 'Leave the Barricade Now', 'Marius orders Gavroche to carry the letter the following morning, overcoming the child’s wish to remain for the fight.', 'corinthe-taproom', [
      ['marius', 'Gives the address and urges immediate departure with delivery intended for morning.'],
      ['gavroche', 'Objects to missing the attack, then takes the letter.'],
    ], 'Paragraphs 18–32 give Marius’s predictions about dawn attack and noon capture as estimates, not guaranteed military timing. Gavroche accepts the paper without disclosing his own intended schedule.', { items: ['marius-farewell-letter-to-cosette'] }),
    scene(33, 'The Secret Return Plan', 'Gavroche runs through Mondétour, privately intending immediate delivery and a quick return.', 'mondetour-open-approach', [
      ['gavroche', 'Leaves with the letter while planning to return before the fighting resumes.'],
    ], 'Paragraphs 33–36 establish departure only. His calculation that the address is close and time sufficient is his plan; delivery and return have not happened. Marius does not know he intends to disregard the morning timing.', { timeHint: 'Barely midnight', items: ['marius-farewell-letter-to-cosette'] }),
  ]],
]
