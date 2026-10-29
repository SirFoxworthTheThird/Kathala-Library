// Volume II's Waterloo book: the 1861 walk, 1815 action, legend, historical
// argument and the novel's nighttime encounter are deliberately distinguished.
const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const volumeTwoBookFirstReview = [
  [71, [
    scene('start', 'A May Walk from Nivelles', 'The narrator follows the road toward La Hulpe and turns down a path beside an inn.', 'nivelles-la-hulpe-road', [
      ['narrator-traveller', 'Walks past Lillois and Bois-Seigneur-Isaac, then leaves the road for a path beside an inn.'],
    ], 'Paragraphs 0–5 introduce a first-person traveller explicitly identified as the storyteller, not Valjean, arriving decades after the battle.', { timeHint: 'A May morning in 1861; “last year” is relative to the narration' }),
    scene(6, 'The Marks on the Door', 'A woman explains the projectile marks and names the place Hougomont, bringing the traveller to recognition of Waterloo.', 'hougomont-south-door', [
      ['narrator-traveller', 'Examines the hollow in the stone and asks the place’s name before spotting the distant lion.'],
      ['hougomont-peasant-woman', 'Emerges through the door, explains two projectile marks, and identifies Hougomont.'],
    ], 'Paragraphs 6–14 give the direct exchange in 1861. The woman’s explanation does not make the visitor a witness of the shooting.', { timeHint: '1861, continuing the walk' }),
  ]],
  [72, [
    scene('start', 'The Château and Its Ruin', 'The narrator introduces Hougomont’s earlier manor and its position in the battle.', 'hougomont', [],
      'Paragraphs 0–1 compare historical and current buildings; the medieval founder is not a visitor or combatant.', { kind: 'exposition' }),
    scene(2, 'Inside the Farm Courtyard', 'The traveller enters the surviving courtyard among tools, animals, doors, and the chapel.', 'hougomont-courtyard', [
      ['narrator-traveller', 'Pushes past an old calash into the courtyard and surveys the surviving buildings and farm equipment.'],
    ], 'Paragraphs 2–3 follow the 1861 visit. Napoleon’s desire to capture the court is retrospective, not his physical presence beside the narrator.'),
    scene(4, 'The Assaults on Hougomont', 'The narrator reconstructs the fighting around the two gates and the defenders’ resistance.', 'hougomont', [
      ['narrator-traveller', 'Surveys the surviving gates, ruined staircase and chapel in 1861 while recounting their earlier fighting and damage.'],
    ],
      'Paragraphs 4–14 interleave the current ruins with battle history, including named casualties and chapel damage. Only the 1861 observer is present; the narrated massacre and local miracle claim remain separate from his observations.', { mentioned: ['napoleon', 'jerome-bonaparte', 'reille', 'foy', 'guilleminot', 'bachelu', 'kellermann', 'bauduin', 'soye', 'legros'] }),
    scene(15, 'The Well and the Gardener', 'The disused well prompts an account of the gardener compelled to carry water and the bodies buried after the fighting.', 'hougomont-well', [
      ['narrator-traveller', 'Visits the disused well in 1861 and examines its surviving walls, beams and stone basin while relating the gardener’s history.'],
    ],
      'Paragraphs 15–21 range from the 1861 well to the battle and post-battle burial. Only the visitor is present. Voices from the well are explicitly legend; no resurrection, unnamed survivor death, or precise injury state is fabricated.', { mentioned: ['guillaume-van-kylsom', 'wilda'], timeHint: 'Family fled on 18 June 1815; burial and reported voices afterward; return to surviving well' }),
    scene(22, 'A Child’s Recollection', 'A granddaughter of the gardener tells the traveller how her family carried the children into the woods.', 'hougomont-farmhouse', [
      ['narrator-traveller', 'Hears the gray-haired woman’s memory of being carried away and imitating cannon-fire as a child.'],
      ['hougomont-gardener-granddaughter', 'Recalls fleeing in her mother’s arms at three while her older sister wept.'],
    ], 'Paragraph 22 gives direct testimony in the present visit. The woman’s mother, sister and grandfather belong to the recollection, not a family reunion in 1861.'),
    scene(23, 'Garden, Orchard, Wood', 'The narrator surveys the enclosure and recounts the fighting preserved in its walls and trees.', 'hougomont-orchard', [
      ['narrator-traveller', 'Surveys the garden and orchard in 1861, tracing the surviving balustrade, loopholes and damaged trees through the enclosure.'],
    ],
      'Paragraphs 23–30 traverse the current garden and orchard while recalling separate actions and deaths. The visitor remains in the 1861 landscape; the final three-franc offer is an illustrative guide’s sales pitch, not a proven paid tour.', { mentioned: ['blackmann', 'duplat', 'bauduin', 'foy', 'soye'] }),
  ]],
  [73, [
    scene('start', 'Returning to June 1815', 'Hugo considers the rain, delayed artillery, Napoleon’s plan, and the limits of his own account.', 'waterloo-battlefield', [],
      'All eleven paragraphs are historical argument, counterfactuals and a methodological disclaimer. A dry-ground French victory is hypothetical, not an alternate event to publish.', { kind: 'exposition', mentioned: ['napoleon', 'wellington', 'blucher'], timeHint: '18 June 1815; earlier than the Volume I narrative opening' }),
  ]],
  [74, [
    scene('start', 'An A on the Plain', 'The narrator maps the battle’s roads and positions as the limbs and crossbar of a capital A.', 'waterloo-battlefield', [],
      'Paragraphs 0–5 establish terrain and opposing positions, not an in-person gathering of the commanders. The later lion and changed landscape must not be placed on the 1815 battle map.', { kind: 'exposition', mentioned: ['napoleon', 'wellington', 'reille', 'jerome-bonaparte', 'derlon', 'picton', 'hill'] }),
    scene(6, 'The Figure at Rossomme', 'Napoleon’s familiar appearance on horseback gives way to reflection on the shadows cast by historical judgment.', 'rossomme-heights', [],
      'Paragraphs 6–8 are a portrait and interpretive comparison, not new encounters with Alexander, Caesar or Titus.', { kind: 'exposition', mentioned: ['napoleon'], timeHint: 'Portrait specifies daybreak on 18 June 1815' }),
  ]],
  [75, [
    scene('start', 'A Late Beginning in the Mud', 'The first attacks strike Hougomont, La Haie-Sainte, and Papelotte as the armies contend with soaked ground.', 'waterloo-battlefield', [],
      'Paragraphs 0–7 summarize simultaneous movements and the raw recruits’ conduct across the field. No single location snapshot makes every named commander co-present.', { kind: 'reported', mentioned: ['napoleon', 'wellington', 'ney', 'colville'], timeHint: 'First shot timed by Colville at 11:35; retain the source’s other approximate start times separately' }),
    scene(8, 'The Obscurity of a Battle', 'The narrator argues that a fixed diagram cannot capture the shifting confusion of combat.', null, [],
      'Paragraphs 8–11 state the limits of reconstruction, including an expressly obscure midday-to-four interval. This is not permission to invent exact timestamps or paths through it.', { kind: 'exposition' }),
  ]],
  [76, [
    scene('start', 'The Endangered Centre', 'The narrator recounts the Allied losses, reinforcements, and defensive terrain around Mont-Saint-Jean.', 'mont-saint-jean-plateau', [],
      'Paragraphs 0–5 combine earlier casualties, a nine-o’clock reconnaissance, current positions and hypothetical retreat. Named deaths remain reported rather than invented witnessed death scenes.', { kind: 'reported', mentioned: ['wellington', 'hill', 'prince-orange', 'picton', 'chasse', 'haxo'], timeHint: 'Toward four in the afternoon, with explicit retrospective material' }),
    scene(6, 'Orders Beneath the Elm', 'Wellington maintains his position amid the firing and answers his officers with orders to hold.', 'mont-saint-jean-mill', [
      ['wellington', 'Remains under fire and tells Clinton to hold the position to the last man.'],
      ['hill', 'Asks what orders should follow if the commander is killed.'],
      ['clinton', 'Receives Wellington’s instruction to keep the position.'],
    ], 'Paragraph 6 describes actual exchanges at the command post, embedded in a whole-day portrait; the later purchaser of the elm does not attend the battle.'),
    scene(7, 'A Retreat Seen from Afar', 'The British line withdraws below the crest, and Napoleon interprets the movement as a retreat.', 'mont-saint-jean-plateau', [],
      'The final paragraph juxtaposes the movement and Napoleon’s distant interpretation. Wellington and Napoleon are not in conversation at one command post.', { kind: 'reported', mentioned: ['napoleon', 'wellington'], timeHint: 'Toward four o’clock' }),
  ]],
  [77, [
    scene('start', 'The Emperor’s Confidence', 'The narrator contrasts Napoleon’s confident mood with the danger he does not yet perceive.', 'waterloo-battlefield', [],
      'Paragraph 0 is character interpretation and an unspecified local illness, not a diagnosis or a new physical encounter.', { kind: 'exposition', mentioned: ['napoleon'] }),
    scene(1, 'Rain and Camp-Fires', 'During the night reconnaissance Napoleon reads the fires and marching troops as signs favourable to him.', 'rossomme-outposts', [
      ['napoleon', 'Stops in the storm to contemplate the bivouacs and mistakes a marching column for an English withdrawal.'],
      ['bertrand', 'Accompanies the mounted night reconnaissance while the Emperor speaks confidently.'],
    ], 'Paragraphs 1–2 cover the 1:00 and 2:30 reconnaissance and a recalled March landing. The recollected peasant at Gulf Juan is not at Waterloo.', { timeHint: 'Night of 17–18 June, one o’clock and half-past two' }),
    scene(3, 'Reports Before Dawn', 'Reconnaissance reports, a peasant, and deserters contradict the supposed withdrawal.', 'napoleon-waterloo-command-post', [
      ['napoleon', 'Learns the enemy is stationary and welcomes the deserters’ news that it will stand for battle.'],
    ], 'Paragraph 3 contains separate reports at 3:30, 4:00 and 5:00, not one synchronized group interview. The brigade attribution is explicitly probable.', { timeHint: 'Half-past three through five in the morning' }),
    scene(4, 'The Table from Rossomme', 'Napoleon spreads the map on a borrowed kitchen table, breakfasts with generals, and dictates orders.', 'rossomme-command-table', [
      ['napoleon', 'Calls the battlefield a pretty checker-board, predicts ninety chances in a hundred, and dictates the order of battle.'],
      ['soult', 'Hears the map remark and jokes at breakfast that the ball will take place today.'],
      ['ney', 'Hears the confident odds and remarks that Wellington will not simply wait for the Emperor.'],
    ], 'Paragraphs 4–5 include the morning command and eight-o’clock breakfast; the Elba voyage and quoted memoirs are retrospective material, not further arrivals at the table.'),
    scene(6, 'Six Lines and Four-and-Twenty Guns', 'The army deploys, and Napoleon admires the array and points out the batteries to Haxo.', 'rossomme-deployment-ground', [
      ['napoleon', 'Exclaims at the deployment and taps Haxo’s shoulder while admiring the batteries.'],
      ['haxo', 'Receives the Emperor’s remark about the twenty-four guns.'],
    ], 'Paragraphs 6–8 place this exchange during deployment, with sappers and cavalry nearby rather than converting their unit commanders into a shared cast.', { timeHint: 'Nine to half-past ten in the morning' }),
    scene(9, 'Three Stations and Altered Ground', 'The narrator follows Napoleon’s observation posts and explains how the later monument changed the plateau and hollow road.', 'waterloo-battlefield', [],
      'Paragraphs 9–12 range from morning to seven that evening, the narrator’s later finds, and centuries-old roadside memorials. Retain separate historical map layers; no single snapshot collapses them.', { kind: 'reported', mentioned: ['napoleon', 'lacoste', 'wellington', 'narrator-traveller'], timeHint: '1861 observations are distinct from 1815 action and memorial dates 1637 and 1783' }),
  ]],
  [78, [
    scene('start', 'Confidence Amid Reverses', 'Hugo describes the setbacks that fail to shake Napoleon’s confidence.', 'waterloo-battlefield', [],
      'Paragraphs 0–4 are a multi-front retrospective catalogue and interpretation. Wounds and losses are not one directly witnessed scene.', { kind: 'reported', mentioned: ['napoleon', 'ney', 'bauduin', 'foy', 'soye', 'guilleminot'] }),
    scene(5, 'A Question and a Nod', 'Seeing the cleared crest, Napoleon inspects the ground and quietly questions his guide before ordering the cavalry attack.', 'napoleon-waterloo-observation-post', [
      ['napoleon', 'Surveys the apparent retreat, speaks quietly to Lacoste, sends a premature victory announcement, and orders Milhaud’s charge.'],
      ['lacoste', 'Answers the low-voiced question with a negative movement of his head.'],
    ], 'Paragraphs 5–14 contain the command-post action. The exact question is reconstructed as probable later; treachery is qualified, not proven knowledge or an unambiguous motive.', { mentioned: ['wellington', 'milhaud'] }),
  ]],
  [79, [
    scene('start', 'The Cavalry Advances', 'The cuirassiers deploy and charge under Ney while the squares wait unseen behind the crest.', 'belle-alliance-mont-saint-jean-slope', [
      ['ney', 'Draws his sword and takes the head of the squadrons ascending toward the plateau.'],
      ['waterloo-aide-bernard', 'Carries the Emperor’s attack order to the cavalry.'],
    ], 'Paragraphs 0–6 recount deployment and the current advance with separate unseen defenders; the Orphic centaurs are imagery, not beings in this edition.'),
    scene(7, 'The Hollow Road of Ohain', 'The leading horsemen discover the hidden road too late and are driven into it by the ranks behind.', 'ohain-hollow-road', [],
      'Paragraphs 7–12 narrate the disaster and explicitly qualify the local totals as exaggerated. Lacoste’s question is only probable; do not attach exact casualty totals or a proven deliberate betrayal to his nod.', { kind: 'reported', mentioned: ['ney', 'napoleon', 'lacoste'], timeHint: 'Charge after the apparent withdrawal; a remembered flag capture was an hour earlier' }),
    scene(13, 'A Change of Front in the Universe', 'Hugo interprets Napoleon’s fall as the end of a domination that had become too heavy for humanity.', null, [],
      'Paragraphs 13–20 are a providential argument, not an observable intervention by a new divine combatant.', { kind: 'exposition', mentioned: ['napoleon'] }),
  ]],
  [80, [
    scene('start', 'The Squares and the Cavalry', 'The surviving cavalry attacks the squares and is counterattacked as the plateau becomes a sustained struggle.', 'mont-saint-jean-plateau', [],
      'Paragraphs 0–19 combine repeated assaults, counterfactual infantry support, a bagpiper’s death and changing unit strengths over two hours. No single physical cast or invented sequence of exact death times is derived from this panorama.', { kind: 'reported', mentioned: ['ney', 'delort', 'wathier', 'wellington', 'somerset', 'dornberg', 'trip', 'lefebvre-desnouettes', 'napoleon'], timeHint: 'Source says two hours and a dozen assaults' }),
    scene(20, 'A Horseman Found Afterward', 'A later discovery of a dead cuirassier and horse marks how far one rider penetrated.', 'mont-saint-jean-crossroads', [],
      'Paragraph 20 is a next-day discovery supported by a named surviving witness, Dehaze. He is not confused with the unknown dead rider or assumed to have seen the charge.', { kind: 'reported', mentioned: ['dehaze'], timeHint: 'The day after the battle; Dehaze was eighteen then' }),
    scene(21, 'Blücher, or Night', 'Both armies lack reinforcements, and distant bayonets appear as Wellington’s situation worsens.', 'waterloo-battlefield', [],
      'Paragraphs 21–26 juxtapose distant requests and narrated losses before the change. Wellington’s and Napoleon’s replies are not a face-to-face exchange; a stated killed/wounded list is not direct source presence for all its names.', { kind: 'reported', mentioned: ['wellington', 'ney', 'napoleon', 'kempt', 'uxbridge'], timeHint: 'Wellington consults his watch at five' }),
  ]],
  [81, [
    scene('start', 'The Route Below Plancenoit', 'Hugo considers the guide’s route and the delays overcome by Bülow’s advancing corps.', 'wavre-plancenoit-route', [],
      'Paragraphs 0–5 combine the march with counterfactual outcomes. The shepherd guides Bülow; he is not Lacoste, who guides Napoleon.', { kind: 'reported', mentioned: ['bulow', 'blucher', 'bulow-shepherd-guide', 'napoleon'], timeHint: 'Daybreak departure, midday vanguard arrival at Chapelle-Saint-Lambert' }),
    scene(6, 'The Cloud on the Horizon', 'At midday Napoleon and Soult study distant forms that Soult takes for Grouchy’s troops.', 'napoleon-waterloo-observation-post', [
      ['napoleon', 'Notices the distant cloud through his glass and sends Domon’s light cavalry to investigate.'],
      ['soult', 'Estimates four or five thousand men and confidently identifies them as Grouchy’s.'],
    ], 'Paragraph 6 returns to midday before the preceding arrival. The mistaken identification does not make Grouchy physically appear on this battlefield.', { mentioned: ['grouchy'], timeHint: 'Midday retrospect' }),
    scene(7, 'Air for the English Army', 'Blücher orders Bülow to attack, and the Prussians deploy against Lobau and toward Plancenoit.', 'plancenoit-front', [],
      'Paragraphs 7–8 report orders and multiple deployments rather than a new meeting of all named divisional commanders.', { kind: 'reported', mentioned: ['blucher', 'bulow', 'lobau'], timeHint: 'Order at five, deployments a little later' }),
  ]],
  [82, [
    scene('start', 'The Guard Enters the Line', 'The Imperial Guard advances into the collapsing battle and meets the British Guards’ fire.', 'mont-saint-jean-plateau', [],
      'Paragraphs 0–3 combine army-wide developments with the Guard’s last advance. Rhetorical total sacrifice does not support a death state for every named general.', { kind: 'reported', mentioned: ['wellington', 'blucher', 'friant', 'michel', 'roguet', 'harlet', 'mallet', 'poret-de-morvan'], timeHint: 'Eight in the evening when the clouds part' }),
    scene(4, 'A Marshal Who Cannot Die Here', 'Ney seeks death under fire and calls to d’Erlon, but survives the battle.', 'mont-saint-jean-plateau', [
      ['ney', 'Loses his fifth horse, stands bleeding and muddy with a broken sword, and seeks blows that do not kill him.'],
      ['derlon', 'Hears Ney challenge him to get himself killed amid the collapse.'],
    ], 'The final paragraph explicitly denies Ney’s death here. The apostrophe about future French bullets is not a battle death or a scene of execution.'),
  ]],
  [83, [
    scene('start', 'The Army Breaks', 'Ney and Napoleon fail to stop the rout, and a brief stand at Genappe collapses into pursuit.', 'waterloo-genappe-retreat', [],
      'Paragraphs 0–2 range across many positions and describe capture, killing and pursuit. Preserve them as the narrator’s account without inventing witnessed death scenes from the named references.', { kind: 'reported', mentioned: ['ney', 'napoleon', 'lobau', 'blucher', 'duhesme', 'bertrand'] }),
    scene(3, 'The Hinge of a Century', 'Hugo interprets the rout as an intervention of destiny in the direction of history.', null, [],
      'Paragraph 3 is providential commentary, not a new actor present on the road.', { kind: 'exposition' }),
    scene(4, 'A Coat Caught Near Genappe', 'Bernard and Bertrand stop Napoleon from turning back alone toward the lost field.', 'genappe-meadow', [
      ['napoleon', 'Dismounts and starts back toward Waterloo, haggard and intent on returning.'],
      ['waterloo-aide-bernard', 'Catches the Emperor’s coat with Bertrand to detain him.'],
      ['bertrand', 'Helps stop the solitary return toward the battlefield.'],
    ], 'The final paragraph isolates this physical encounter from the army panorama.', { timeHint: 'Nightfall' }),
  ]],
  [84, [
    scene('start', 'The Last Square', 'The remaining square under Cambronne shrinks beneath fire and refuses a demand to surrender.', 'mont-saint-jean-plateau-foot', [
      ['cambronne', 'Commands the dwindling square and replies defiantly to the English summons.'],
    ], 'Paragraphs 0–2 narrow from several isolated squares to one. The English speaker is expressly disputed between Colville and Maitland; neither is asserted as definite. The reply remains the source’s dash.', { timeHint: 'Twilight, toward nine in the evening' }),
    scene(3, 'A Note on the Reply', 'An editorial note reports the uncensored word found in another edition.', null, [],
      'The last paragraph is labelled EDITOR’S COMMENTARY in the pinned source. Preserve it distinctly rather than silently replacing the text or assigning the editor to the battlefield.', { kind: 'apparatus' }),
  ]],
  [85, [
    scene('start', 'The Meaning of Cambronne’s Reply', 'Hugo celebrates the defiance as a moral victory while acknowledging that Cambronne survived his wounds.', null, [],
      'Paragraphs 0–10 are interpretive praise and poetic comparisons. Paragraph 3 explicitly says he survived after being shot; apparent claims of a last hour do not override that.', { kind: 'exposition', mentioned: ['cambronne', 'napoleon', 'wellington', 'blucher'] }),
    scene(11, 'The Final Volley', 'The English batteries answer the refusal, and the narrator describes the remnant of the Guard falling.', 'mont-saint-jean-plateau-foot', [],
      'The final paragraph returns to the battle before a comparison to the later post-wagon. Collective annihilation is rhetoric and cannot be converted into Cambronne’s personal death against the explicit survival above.', { kind: 'reported', mentioned: ['cambronne'] }),
  ]],
  [86, [
    scene('start', 'Commanders, Armies, and Chance', 'Hugo weighs the commanders against their soldiers and argues that chance governed the catastrophe.', null, [],
      'Paragraphs 0–17 are historical criticism, comparisons and casualty calculations. Counts are source assertions, not independently verified totals or a licence to generate individual victims.', { kind: 'exposition', mentioned: ['napoleon', 'wellington', 'blucher'] }),
    scene(18, 'A Battle in the Dreamer’s Night', 'The quiet field becomes an imagined replay of combat for a traveller who dreams over it.', 'waterloo-battlefield', [],
      'Paragraphs 18–19 explicitly make the marching skeletons and spectral battle an hallucination; no present-day battle, revived Napoleon, or narrator eyewitness claim is added.', { kind: 'exposition', mentioned: ['napoleon', 'wellington'] }),
  ]],
  [87, [
    scene('start', 'The Victory and the Revolution', 'Hugo argues that the counter-revolutionary victory could not halt the longer movement toward liberty.', null, [],
      'All four paragraphs are political interpretation across eras and nations. The mounted Robespierre is a figure for Napoleon, not a new rider at Waterloo.', { kind: 'exposition', mentioned: ['napoleon', 'wellington', 'blucher'] }),
  ]],
  [88, [
    scene('start', 'The Return of Divine Right', 'The narrator follows the Restoration and the uneasy coexistence of revived monarchy, liberty, and Napoleon’s memory.', null, [],
      'All eleven paragraphs range across Europe and years, with an embedded reported veteran’s exchange. No single shared palace location or physical gathering of the historical figures is inferred.', { kind: 'exposition', mentioned: ['napoleon'] }),
  ]],
  [89, [
    scene('start', 'After the Last Shot', 'The victors encamp and pursue while the narrator considers the looters who follow armies.', 'waterloo-battlefield', [],
      'Paragraphs 0–10 return from political history to the night of battle and generalize about stripping the dead. Earlier illustrative campaigns are not Waterloo encounters.', { kind: 'reported', mentioned: ['wellington', 'blucher'], timeHint: 'Night of 18–19 June 1815; the source’s lunar description is retained as narration' }),
    scene(11, 'A Prowler and a Distant Wagon', 'A man searches the dead near the hollow road while a woman waits in a concealed sutler’s wagon.', 'ohain-hollow-road', [
      ['thenardier', 'Moves furtively among the fallen, repeatedly checking whether he is observed.'],
    ], 'Paragraphs 11–20 present the unnamed prowler, distant wagon and renewed description of the road. The woman’s connection to him is explicitly conjectured; she is not identified as Madame Thénardier or given co-presence at the ditch.', { timeHint: 'Toward midnight' }),
    scene(21, 'A Hand That Closes', 'The prowler steals a ring, then discovers life when its owner catches his coat.', 'ohain-hollow-road', [
      ['thenardier', 'Takes the glittering ring and laughs at the hand that clutches his coat before questioning whether the body is alive.'],
      ['pontmercy', 'Has a hand projecting from the heap and briefly clutches the thief’s coat.'],
    ], 'Paragraphs 21–32 reveal signs of life without naming either man; the officer is not resurrected from a confirmed death.', { items: ['pontmercy-ring'] }),
    scene(33, 'A Rescue Mistaken for Charity', 'The prowler pulls the wounded officer free and steals more while the officer revives and thanks him.', 'ohain-hollow-road', [
      ['thenardier', 'Pulls the officer clear, strips the cross, watch and purse, then pretends the pockets were already empty.'],
      ['pontmercy', 'Revives with a sword-cut face, offers the possessions already stolen, and believes the man has saved his life.'],
    ], 'Paragraphs 33–59 establish actual rescue alongside robbery and mistaken gratitude. Reported sergeant rank is the prowler’s claim, not proof of the heroic service advertised by the inn sign.', { items: ['pontmercy-legion-cross', 'pontmercy-watch', 'pontmercy-purse'], stateChanges: [{ character: 'pontmercy', condition: 'opens his eyes and revives after being freed from beneath the bodies', evidenceParagraph: 38 }] }),
    scene(60, 'Two Names Remembered', 'The prowler names himself Thénardier, and the officer gives Pontmercy as the name to remember.', 'ohain-hollow-road', [
      ['thenardier', 'Supplies his name before leaving the officer to get out of danger himself.'],
      ['pontmercy', 'Promises not to forget Thénardier and gives his own name.'],
    ], 'The final two paragraphs name both men. Do not disclose Pontmercy’s later family role or attribute knowledge of the robbery to his grateful recollection.', { identityReveals: [
      { identity: 'waterloo-prowler', character: 'thenardier', evidenceParagraph: 60, audience: 'reader' },
      { identity: 'waterloo-wounded-officer', character: 'pontmercy', evidenceParagraph: 61, audience: 'reader' },
    ] }),
  ]],
]
