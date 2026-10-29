const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const volumeTwoBookFifthReview = [
  [109, [
    scene('start', 'The Paris Remembered', 'Hugo explains that the streets in this story belong to the Paris he remembers, despite later rebuilding.', null, [],
      'Paragraphs 0–2 are an authorial qualification, not a second traveller entering the escape or a claim that the remembered streets still exist.', { kind: 'exposition' }),
    scene(3, 'Circuits in the Left-Bank Streets', 'Valjean leads Cosette through twisting streets, repeatedly checking whether anyone follows.', 'paris-mouffetard-quarter', [
      ['valjean', 'Doubles back through the lanes and decides against returning to Gorbeau, without knowing a secure destination.'],
      ['cosette', 'Follows without questions, trusting his presence despite the unexplained route.'],
    ], 'Paragraphs 3–8 distinguish his hopes of losing pursuit from actual proof; divine guidance and the hunted stag are comparisons, not companions.'),
    scene(9, 'Men Beneath the Lantern', 'Near the police office Valjean sees three followers and accelerates through another circuit.', 'paris-rue-pontoise', [
      ['valjean', 'Sees three men pass beneath the lantern, one turning toward the police office, and hurries away with Cosette.'],
      ['cosette', 'Responds to his urgent call and continues through the detour.'],
    ], 'Paragraphs 9–13 give observed pursuit without confirmed faces. The closed Passage des Patriarches is not traversed as an open shortcut.', { timeHint: 'Eleven strikes from Saint-Étienne-du-Mont' }),
    scene(14, 'Recognition in the Moonlight', 'From a doorway Valjean watches four men consult and recognizes Javert when he turns.', 'paris-carrefour-rollin', [
      ['valjean', 'Waits in shadow and recognizes the leader’s face when moonlight reveals it.'],
      ['cosette', 'Remains hidden with her protector as the men consult in the open space.'],
      ['javert', 'Points toward the fugitives’ route while another agent argues for a different direction.'],
    ], 'Paragraphs 14–16 put observer and observed in separate parts of the same square. Recognition belongs to Valjean; Cosette is not told the policeman’s name.'),
  ]],
  [110, [
    scene('start', 'Toward the River', 'Valjean carries the tired child through the lower streets and reaches the bridge.', 'jardin-plantes-quay-route', [
      ['valjean', 'Uses the pursuers’ hesitation to hurry toward the quay and briefly believes the empty streets mean safety.'],
      ['cosette', 'Grows tired and is carried in his arms.'],
    ], 'Paragraphs 0–6 are the actual transit; the pottery verse remains an inscription, not spoken dialogue or a new cast.'),
    scene(7, 'Two Sous for the Bridge', 'The toll-keeper charges for both travellers, and a cart provides cover across the Seine.', 'pont-austerlitz', [
      ['valjean', 'Pays the extra sou, crosses in the cart’s shadow, and sets Cosette down when she asks to walk.'],
      ['cosette', 'Asks to walk when her feet become numb and takes his hand midway across.'],
      ['austerlitz-tollkeeper', 'Requires two sous because the carried child is able to walk.'],
    ], 'Paragraphs 7–11 establish an actual toll exchange and a passing cart, not a hired ride across the bridge.'),
    scene(12, 'Four Shadows Behind', 'Across the bridge, the pair enter a dark street as the pursuers reach the crossing.', 'chemin-vert-saint-antoine-entrance', [
      ['valjean', 'Looks back from the timber-yards, sees four figures entering the bridge, and chooses the narrow street.'],
      ['cosette', 'Walks beside him across the exposed space and into the darker street.'],
    ], 'Paragraphs 12–21 separate the fugitives on the right bank from men still on the bridge. His hope that they have not seen him is not narrator-certified invisibility.', { mentioned: ['javert'] }),
  ]],
  [111, [
    scene('start', 'The Right Branch of the Y', 'Valjean carries Cosette along the branch toward open country and finds another decision at the transverse street.', 'rue-polonceau-droit-mur-junction', [
      ['valjean', 'Chooses the less inhabited branch, carries the child, and discovers a man blocking the apparently open exit.'],
      ['cosette', 'Rests her head on his shoulder and remains silent through the uncertain route.'],
    ], 'Paragraphs 0–15 describe the observed fork and obstruction; the sentinel’s personal identity is not supplied here.'),
    scene(16, 'The Quarter and Its Plan', 'The narrator locates the old Petit-Picpus streets and contrasts them with later construction.', 'petit-picpus-quarter', [],
      'Paragraphs 16–20 explain geography through an old plan and changes over decades. Railway stations, Mazas and later arenas do not belong on the fugitives’ contemporary route.', { kind: 'exposition' }),
    scene(21, 'A Net Closing', 'Valjean believes the blocked exit, blind alley and approaching pursuers leave no route out.', 'rue-polonceau-droit-mur-junction', [
      ['valjean', 'Rejects the guarded exit and sees the dead end as a trap while fearing Javert behind him.'],
      ['cosette', 'Is still carried as the escape route appears to close.'],
    ], 'Paragraphs 21–23 state his surmises about the patrol’s positioning, not knowledge of its precise commands or an encounter with the sentinel.', { mentioned: ['javert'] }),
  ]],
  [112, [
    scene('start', 'The Recess in the Wall', 'The narrator describes the concealed corner, apparent doors and building beside the lane.', 'droit-mur-wall-recess', [],
      'Paragraphs 0–4 establish the geometry required for the escape. Hypothetical observers in the streets are not additional present people.', { kind: 'exposition' }),
    scene(5, 'No Way Through the Doors', 'Valjean tests the pipe and doors while Cosette waits, then discovers that the larger apparent door masks masonry.', 'droit-mur-wall-recess', [
      ['valjean', 'Rejects the broken pipe, barred windows and exposed climb, then finds solid stone behind the rotten wooden façade.'],
      ['cosette', 'Sits against a stone post under his injunction to remain silent while he tests the escape possibilities.'],
    ], 'Paragraphs 5–13 contain rejected methods, not completed climbs or a usable secret door. The garden beyond is still inferred from tree and ivy.'),
  ]],
  [113, [
    scene('start', 'The Patrol Draws Near', 'Valjean sees Javert leading soldiers who search the lane’s recesses.', 'rue-polonceau', [],
      'Paragraphs 0–3 report the approaching group from the hidden fugitive’s view. Seven or eight soldiers and two agents are observed; do not turn the approximate count into named individuals.', { kind: 'reported', mentioned: ['valjean', 'javert'], timeHint: 'Estimated quarter-hour before they reach his position, not an exact measured duration' }),
    scene(4, 'A Rope from the Lantern', 'Valjean finds the means of raising Cosette by taking the rope from the unlit street lantern.', 'cul-de-sac-genrot-lantern', [
      ['valjean', 'Measures the wall, rejects carrying a burden during the ascent, and breaks the lantern-box latch to obtain its rope.'],
    ], 'Paragraphs 4–16 combine practical calculation, explanatory history and the quick errand. The gas-lamp alternative is hypothetical; the climb is not achieved by the abandoned drain-pipe.', { items: ['genrot-lantern-rope'] }),
    scene(17, 'A Name Used to Enforce Silence', 'Valjean frightens Cosette with a false warning that the approaching pursuer is the hostess.', 'droit-mur-wall-recess', [
      ['cosette', 'Tugs his coat and asks who is approaching, then falls silent at the familiar threat.'],
      ['valjean', 'Claims Madame Thénardier is coming to take her back so that she will not cry out.'],
    ], 'Paragraphs 17–21 explicitly make the hostess a false explanation, not actual physical pursuit by her.', { mentioned: ['madame-thenardier'] }),
    scene(22, 'Over the Wall', 'Valjean climbs alone, raises Cosette on the rope, and carries her down the roof as the patrol searches below.', 'droit-mur-garden-wall', [
      ['valjean', 'Ties the cravat beneath her arms, climbs unburdened, hauls her up, and descends by roof and linden with her on his back.'],
      ['cosette', 'Obeys at the wall, is lifted silently, and reaches the garden with slightly abraded hands.'],
    ], 'Paragraphs 22–34 give the actual crossing. Javert’s orders are audible from the street; neither he nor the soldiers cross this wall or share the roof.', { mentioned: ['javert'], items: ['genrot-lantern-rope'], stateChanges: [{ character: 'cosette', injury: 'hands slightly abraded during the wall escape', evidenceParagraph: 34 }] }),
  ]],
  [114, [
    scene('start', 'The Garden Beyond', 'The narrator surveys the isolated garden, ruined shed and barred interior façades.', 'petit-picpus-garden', [],
      'Paragraphs 0–5 establish what is visible, not proof that the apparently deserted property has no inhabitants.', { kind: 'exposition' }),
    scene(6, 'Hidden Under the Shed', 'The pair hide while the search continues outside the walls.', 'petit-picpus-ruined-shed', [
      ['valjean', 'Puts his shoes back on, shelters with Cosette, and lightly covers her mouth while listening.'],
      ['cosette', 'Presses close and trembles, still believing the hostess is pursuing them.'],
    ], 'Paragraphs 6–10 keep the patrol and Javert outside; hearing a voice does not bring its speaker inside the garden.', { mentioned: ['javert'], timeHint: 'About a quarter-hour before the search sounds recede' }),
    scene(11, 'A Hymn in the Darkness', 'Women’s singing from the building brings the fugitives to their knees before silence returns.', 'petit-picpus-ruined-shed', [
      ['valjean', 'Kneels and loses awareness of the threatening night while the hymn lasts.'],
      ['cosette', 'Kneels beside him without knowing where they are or who is singing.'],
    ], 'Paragraphs 11–17 give an audible human hymn described through angelic imagery. No angels or identified singers are placed beside the two listeners.'),
  ]],
  [115, [
    scene('start', 'Cold Beneath the Coat', 'Cosette admits she is cold and still fears the hostess, so Valjean reassures and wraps her before seeking shelter.', 'petit-picpus-ruined-shed', [
      ['cosette', 'Remains awake and shivering, asks whether the hostess has gone, and accepts the coat.'],
      ['valjean', 'Realizes she has not slept, reassures her about his invented threat, and covers her with his own coat.'],
    ], 'Paragraphs 0–14 distinguish apparent sleep from actual wakefulness and retain his responsibility for the false warning.', { timeHint: 'Wind suggests between one and two in the morning, an inference rather than a clock reading' }),
    scene(15, 'The Motionless Form', 'Seeking a closed-room refuge, Valjean looks through a lit window and sees a prostrate figure that he cannot explain.', 'petit-picpus-arched-window', [
      ['valjean', 'Tries the closed building, watches the still form through glass, and flees without learning whether it lives or dies.'],
    ], 'Paragraphs 15–19 record an uncertain perception. Do not identify a dead body, murder, noose victim or a named nun from its appearance; Cosette remains under the shed.'),
    scene(20, 'Back to the Sleeping Child', 'Valjean returns shaken and feverish to find Cosette asleep.', 'petit-picpus-ruined-shed', [
      ['valjean', 'Returns breathless, touches the stones to steady himself, and approaches the child.'],
      ['cosette', 'Has fallen asleep during his absence.'],
    ], 'Paragraphs 20–23 return to the shed. The imagined figure following him is fear, not an actual pursuer.', { stateChanges: [{ character: 'valjean', condition: 'fever after cold and anxiety', evidenceParagraph: 22 }] }),
  ]],
  [116, [
    scene('start', 'A Bell Among the Melon Beds', 'As Valjean watches the sleeping child, a limping figure moves through the garden with a bell.', 'petit-picpus-ruined-shed', [
      ['valjean', 'Hears the bell, watches the moving figure, and hides Cosette behind disused furniture.'],
      ['cosette', 'Sleeps without stirring as he carries her farther into the shed.'],
    ], 'Paragraphs 0–9 introduce the gardener from a distance, not in the shed with the pair. Valjean’s fear of betrayal is conjecture, not the gardener’s intent.'),
    scene(10, 'Still Breathing', 'Cosette’s cold hands and unresponsiveness terrify Valjean, who listens and finds that she still breathes.', 'petit-picpus-ruined-shed', [
      ['cosette', 'Remains pale and unresponsive but continues breathing.'],
      ['valjean', 'Fails to wake her, fears she is dead, then rushes out to seek warmth and a bed.'],
    ], 'Paragraphs 10–22 explicitly deny confirmed death by retaining breathing. Do not create a resurrection, a definitive diagnosis, or a completed recovery yet.'),
  ]],
  [117, [
    scene('start', 'Father Madeleine in the Garden', 'Valjean offers money for shelter and is unexpectedly recognized by the man with the bell.', 'petit-picpus-melon-beds', [
      ['valjean', 'Offers a hundred francs for shelter and is startled when the stranger calls him Father Madeleine.'],
      ['fauchelevent', 'Recognizes his rescuer and expresses astonishment at his unexpected arrival and missing outer clothes.'],
    ], 'Paragraphs 0–16 let the gardener recognize first; Valjean still cannot see the face and asks who he is. Editorial descriptions do not name the man before the next cut.'),
    scene(17, 'Fauchelevent Recognized', 'Moonlight reveals the old carter, who explains the melon mats, warning bell and convent.', 'petit-picpus-melon-beds', [
      ['valjean', 'Recognizes Fauchelevent, questions him cautiously, and learns that the shelter is the convent where he obtained the old man’s post.'],
      ['fauchelevent', 'Explains the protective mats and bell that warns women to avoid meeting the male gardener.'],
    ], 'Paragraphs 17–41 identify the man and place. He knows Madeleine, not the fugitive’s convict name; neither the bell nor a limp is supernatural.', { identityReveals: [{ identity: 'petit-picpus-bell-man', character: 'fauchelevent', evidenceParagraph: 17, audience: 'reader' }], timeHint: 'Source recalls the appointment two years earlier; do not silently reconcile the earlier chronology' }),
    scene(42, 'A Life for a Life', 'Valjean asks for refuge and secrecy, and Fauchelevent offers the hut in return for his rescue.', 'petit-picpus-melon-beds', [
      ['valjean', 'Invokes the old rescue and asks that Fauchelevent neither disclose what he knows nor investigate further.'],
      ['fauchelevent', 'Offers his three-room hut and pledges service before learning there is also a child to fetch.'],
    ], 'Paragraphs 42–61 make the pledge before the gardener is told about Cosette. No full confession or knowledge of Javert is imparted.'),
    scene(62, 'The Gardener’s Fire', 'Cosette warms and sleeps in the bed while the men share food and the gardener reproaches his rescuer’s forgetfulness.', 'fauchelevent-hut', [
      ['cosette', 'Regains colour by the fire and sleeps in the gardener’s bed.'],
      ['valjean', 'Recovers coat, cravat and hat and warms himself at the table with the old man.'],
      ['fauchelevent', 'Takes off the bell and kneecap, provides food and wine, and gently chides the man who forgot him.'],
    ], 'The final paragraph explicitly moves to warmth less than half an hour later. Improvement is narrated, but no permanent cure or disappearance of the hand abrasions is asserted.', { timeHint: 'Less than half an hour after the agreement' }),
  ]],
  [118, [
    scene('start', 'How the Pursuit Began', 'The narrator retraces Javert’s transfer to Paris and his acceptance of the reported drowning.', null, [],
      'Paragraphs 0–2 rewind months and explain the inspector’s beliefs. They do not repeat the recapture or validate the mistaken death notice.', { kind: 'reported', mentioned: ['javert', 'valjean'], timeHint: 'Transfer after the earlier escape; death report read in December 1823' }),
    scene(3, 'The Report from Montfermeil', 'A report calling Cosette’s departure an abduction prompts Javert to visit the inn.', 'montfermeil', [],
      'Paragraphs 3–7 distinguish official hearsay, recalled events and Thénardier’s changed story. Grandfatherhood is a cover account, and the abduction report is not a new physical taking of the child.', { kind: 'reported', mentioned: ['javert', 'thenardier', 'madame-thenardier', 'cosette', 'valjean'] }),
    scene(8, 'Guillaume Lambert', 'Thénardier supplies a false passport story, and Javert returns reassured to Paris.', 'thenardier-inn', [
      ['thenardier', 'Invents a wealthy farmer, a seen passport and the name Guillaume Lambert to end inquiries.'],
      ['javert', 'Accepts the reassuring account and again discounts the possibility that the supposed dead man took the child.'],
    ], 'Paragraphs 8–10 are the direct questioning and its outcome. No actual Lambert, passport inspection or grandfather relationship is generated.'),
    scene(11, 'The Borrowed Beggar’s Clothes', 'The narrator confirms how Javert used the ex-beadle’s place and clothes to inspect the charitable stranger.', 'saint-medard-well', [],
      'Paragraphs 11–13 resolve the earlier fleeting sighting for the reader. They are a retrospective account of that encounter, not a second disguised visit after the escape.', { kind: 'reported', mentioned: ['javert', 'valjean', 'saint-medard-ex-beadle'], identityReveals: [{ identity: 'saint-medard-beggar-figure', character: 'javert', evidenceParagraph: 12, audience: 'reader' }], timeHint: 'March 1824; the coat’s supposed millions remain rumour' }),
    scene(14, 'The Lodger and the Warning', 'The narrator reveals Javert’s rented room and the housekeeper’s warning after the falling coin.', 'gorbeau-house', [],
      'Paragraphs 14–16 explain the known nighttime listening and departure rather than replay them as new incidents. The housekeeper’s observations inflate into rumours about millions; no verified sum follows.', { kind: 'reported', mentioned: ['javert', 'valjean', 'gorbeau-principal-lodger'] }),
    scene(17, 'Why the Arrest Waited', 'Javert’s doubts, fear of error and hopes of finding accomplices explain his prolonged following.', 'paris-mouffetard-quarter', [],
      'Paragraphs 17–23 recount the same flight from the pursuer’s mind. The imagined band and newspaper scandal are hypothetical, not real accomplices or a published arrest report.', { kind: 'exposition', mentioned: ['javert', 'valjean', 'cosette'] }),
    scene(24, 'Recognition and a Trap', 'Javert recognizes the fugitive, seeks help, questions the toll-keeper and blocks the apparent exit.', 'paris-pursuit-route', [],
      'Paragraphs 24–31 revisit the already narrated pursuit across several streets and the bridge. His confident expectation of capture is not a completed arrest.', { kind: 'reported', mentioned: ['javert', 'valjean', 'cosette', 'austerlitz-tollkeeper'] }),
    scene(32, 'The Empty Blind Alley', 'Javert reaches the center of his trap and finds the fugitives gone.', 'cul-de-sac-genrot', [
      ['javert', 'Finds the center of the trap empty and is exasperated by the escape.'],
    ], 'Paragraphs 32–33 show his discovery alone; the fugitives remain beyond the wall rather than appearing beside him.'),
    scene(34, 'The Sentinel’s Answer', 'Javert questions the guard at the street exit and learns that he has seen no one pass.', 'droit-mur-petit-picpus-sentinel-post', [
      ['javert', 'Questions the agent posted at the Droit-Mur and Petit-Picpus exit.'],
      ['petit-picpus-exit-sentinel', 'Has remained at his post and reports that the man has not passed him.'],
    ], 'Paragraph 34 moves to the posted agent. The negative answer explains the baffled search; it does not put the fugitives on that street.'),
    scene(35, 'The Hunter’s Mistakes', 'The narrator compares the failed pursuit with the errors of hunters and commanders.', null, [],
      'Paragraphs 35–39 are commentary and metaphor. The sorcerer is a frustrated hunter’s saying, and none of the historical generals joins the street search.', { kind: 'exposition', mentioned: ['javert'] }),
    scene(40, 'The Rope’s Misleading Trace', 'The damaged lantern sends the search toward the wrong gardens; at dawn Javert leaves watchers and returns to the prefecture.', 'cul-de-sac-genrot', [],
      'Paragraphs 40–41 give the actual aftermath. He searches neighbouring ground, not the convent refuge, and fails to discover how the fugitives crossed the wall.', { kind: 'reported', mentioned: ['javert'], timeHint: 'Search all night; two watchers left at daybreak' }),
  ]],
]
