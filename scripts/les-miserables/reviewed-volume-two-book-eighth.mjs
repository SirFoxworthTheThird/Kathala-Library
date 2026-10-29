const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, kind: 'scene', ...extra,
})

export const volumeTwoBookEighthReview = [
  [138, [
    scene('start', 'What Valjean Had Seen', 'The narrator identifies the sounds and figures of the night arrival and recalls the fugitives’ first rest.', 'petit-picpus-convent', [],
      'Paragraphs 0–2 explicitly recap the arrival, hymn, reparation, bell and supper. They are not a second escape or a supernatural visitation.', { kind: 'reported', mentioned: ['valjean', 'cosette', 'fauchelevent'] }),
    scene(3, 'It Is My Turn Now', 'During the sleepless night Valjean resolves to remain, while Fauchelevent decides to repay the man who saved him.', 'fauchelevent-hut', [
      ['valjean', 'Says he must remain and considers the refuge’s protection and danger.'],
      ['fauchelevent', 'Resolves to save Madeleine despite not knowing why he is hiding.'],
      ['cosette', 'Occupies the hut’s only bed while the two men lie on straw.'],
    ], 'Paragraphs 3–9 follow the two men’s different thoughts overnight. Bankruptcy and political trouble are the gardener’s conjectures, not established explanations or knowledge of the convict identity.'),
    scene(10, 'The Former Notary', 'A biographical aside explains the resourcefulness behind Fauchelevent’s rustic appearance.', null, [],
      'Paragraph 10 pauses for retrospective characterization, not a new encounter with former clients or villagers.', { kind: 'exposition', mentioned: ['fauchelevent'] }),
    scene(11, 'To Stay, First Get Out', 'At daybreak the gardener explains why the hidden guests must leave before they can be admitted openly.', 'fauchelevent-hut', [
      ['fauchelevent', 'Warns that pupils could discover the hiding place and interprets the death knell.'],
      ['valjean', 'Sees a possible education for Cosette but recoils from returning to the watched streets.'],
      ['cosette', 'Sleeps while the men discuss discovery and admission.'],
    ], 'Paragraphs 11–48 give one conversation interrupted by bells. The dying nun’s death is heard and reported, not witnessed in this hut; imagined police at the corner are not present.', { mentioned: ['mother-crucifixion', 'javert'] }),
    scene(49, 'A Basket for the Child', 'Fauchelevent proposes carrying Cosette out to a fruit-seller and explains the burial arrangements.', 'fauchelevent-hut', [
      ['fauchelevent', 'Plans a covered basket journey for Cosette and describes his coffin duties and acquaintance with Mestienne.'],
      ['valjean', 'Accepts the grandfather cover and asks for an equally concealed way out for himself.'],
      ['cosette', 'Remains asleep as sunlight reaches her face.'],
    ], 'Paragraphs 49–64 are a plan and explanations, not the completed basket journey or a burial. The reported doctor departure conflicts with the later prioress’s four-o’clock schedule; preserve both rather than silently fixing the source.', { mentioned: ['mother-crucifixion', 'mestienne'] }),
    scene(65, 'The Gardener Is Summoned', 'A bell calls Fauchelevent away from the hut to the prioress’s business parlor.', 'petit-picpus-garden', [
      ['fauchelevent', 'Fastens his bell and hurries across the garden toward the summons.'],
      ['valjean', 'Watches the gardener leave after being told to remain concealed.'],
    ], 'Paragraphs 65–68 move the gardener out of the hut; Valjean watches from it and does not accompany him.'),
    scene(69, 'The Reserved Parlor', 'Fauchelevent reaches the room adjoining the chapter hall, where the prioress waits.', 'petit-picpus-business-parlor', [
      ['fauchelevent', 'Knocks at the business parlor after crossing the garden.'],
      ['mother-innocente', 'Waits on the room’s only chair and admits the gardener.'],
    ], 'Paragraphs 69–70 establish the new room and interlocutors. The hidden guests remain behind.'),
  ]],
  [139, [
    scene('start', 'A Request Before the Orders', 'The gardener asks to speak before the prioress explains why she summoned him.', 'petit-picpus-business-parlor', [
      ['fauchelevent', 'Bows and nervously asks leave to make a request.'],
      ['mother-innocente', 'Stops her beads to hear the unexpected communication.'],
    ], 'Paragraphs 0–12 continue the parlor exchange. Fauvent abbreviates Fauchelevent; Blemeur and Innocente identify the same prioress.'),
    scene(13, 'The Curious Mute', 'The narrator explains how the trusted gardener learned the convent’s signals and routines.', 'petit-picpus-convent', [],
      'Paragraph 13 is a retrospective account of repeated observation, not a present conversation with the porter and grave-digger.', { kind: 'exposition', mentioned: ['fauchelevent'] }),
    scene(14, 'A Brother and an Iron Bar', 'Fauchelevent proposes an assistant and a child pupil; the prioress answers by asking for a lever.', 'petit-picpus-business-parlor', [
      ['fauchelevent', 'Invents an available brother and threatens to retire unless he receives help.'],
      ['mother-innocente', 'Asks for a stout iron bar and withdraws into the chapter hall.'],
    ], 'Paragraphs 14–20 present a cover story and an unanswered request. The vocal mothers are only probably assembled in the adjoining room, and the supposed brother is not present.', { mentioned: ['valjean', 'cosette'] }),
  ]],
  [140, [
    scene('start', 'A Stone Beside the Altar', 'The returning prioress instructs the gardener to open the chapel vault in secrecy.', 'petit-picpus-business-parlor', [
      ['mother-innocente', 'Describes the pivoted slab, ring and assistance that will be provided.'],
      ['fauchelevent', 'Promises to open the vault but asks what must go into it.'],
    ], 'Paragraphs 0–40 are instructions in the parlor, not the later lifting of the slab. Mother Ascension and the precentors are promised helpers, not current listeners.'),
    scene(41, 'The Wishes of Mother Crucifixion', 'The prioress describes the nun’s death and demands that her own coffin be lowered beneath the altar.', 'petit-picpus-business-parlor', [
      ['mother-innocente', 'Reports the death and insists on the burial wish despite civil prohibitions.'],
      ['fauchelevent', 'Pretends not to have heard the knell and raises objections about official discovery.'],
    ], 'Paragraphs 41–138 contain testimony and religious precedents within a continuing dialogue. Predicted miracles and a hypothetical cure of his leg are beliefs, not performed healings; the dead nun is in the dead-room.', { mentioned: ['mother-crucifixion'], items: ['mother-crucifixion-own-coffin'] }),
    scene(139, 'Saints Against Regulations', 'The prioress pours out her defense of religious authority and obtains the gardener’s obedience.', 'petit-picpus-business-parlor', [
      ['mother-innocente', 'Invokes historical saints and denounces the state’s interference with burial.'],
      ['fauchelevent', 'Endures the harangue and agrees that she may depend on him.'],
    ], 'Paragraphs 139–149 keep the long speech intact. Its historical figures and the narrator’s rhetorician analogy do not populate the parlor.'),
    scene(150, 'Eleven O’Clock Without the Bell', 'They settle the secret burial’s hour and tools while the gardener renews his plea for an assistant.', 'petit-picpus-business-parlor', [
      ['mother-innocente', 'Orders an eleven-o’clock arrival without the bell and says the doctor will come at four.'],
      ['fauchelevent', 'Promises the lever and repeats the instructions while pressing his need for help.'],
    ], 'Paragraphs 150–175 refine a future plan. The posted sister’s refusal to listen is promised, not demonstrated; the later doctor schedule is retained alongside the earlier conflicting interpretation.'),
    scene(176, 'The Coffin That Must Leave', 'The empty municipal coffin creates a second problem, which Fauchelevent offers to solve with earth.', 'petit-picpus-business-parlor', [
      ['fauchelevent', 'Undertakes to weight the empty coffin and receives permission to bring his supposed brother.'],
      ['mother-innocente', 'Accepts the proposed substitute and authorizes the brother and child to come after the burial.'],
    ], 'Paragraphs 176–193 conclude the interview. Earth is the first proposed substitute; Valjean’s later alternative has not yet been suggested.', { items: ['municipal-burial-coffin'] }),
  ]],
  [141, [
    scene('start', 'Instructions for Cosette', 'Back in the hut, Valjean prepares Cosette for the basket journey and learns that admission has been granted.', 'fauchelevent-hut', [
      ['valjean', 'Uses the threat of Madame Thénardier to enforce silence and again refuses to leave over the wall.'],
      ['cosette', 'Nods to the instructions beside the fire.'],
      ['fauchelevent', 'Returns with permission for entry but no concealed exit for the adult.'],
    ], 'Paragraphs 0–11 are the return and opening discussion. The threat does not place Madame Thénardier nearby; no departure by Cosette is narrated yet.', { mentioned: ['madame-thenardier'] }),
    scene(12, 'A Living Substitute', 'Hearing about the empty coffin, Valjean proposes occupying it himself.', 'fauchelevent-hut', [
      ['fauchelevent', 'Explains the secret burial and recoils when his guest offers to replace the earth.'],
      ['valjean', 'Volunteers to leave in the municipal coffin beneath the white pall.'],
    ], 'Paragraphs 12–43 are the solution’s proposal, not its execution. Cosette’s continued attendance after the opening exchange is not assumed in this provisional cast pass.'),
    scene(44, 'The Locked Nook and the Coffin', 'Valjean questions the gardener about the dead-room’s doors and arranges to hide in the tool closet.', 'fauchelevent-hut', [
      ['valjean', 'Establishes the keys, route and timing needed to enter the coffin unseen.'],
      ['fauchelevent', 'Describes the two doors and offers the adjoining locked tool nook as a hiding place.'],
    ], 'Paragraphs 44–75 describe future movement through distinct spaces. Neither the church nor the dead-room becomes the present scene location.'),
    scene(76, 'A Prisoner’s Expedient', 'The narrator relates Valjean’s escape skills to a reported imperial use of the same device.', null, [],
      'Paragraphs 76–78 interrupt the conversation with general explanation and a qualified historical anecdote. Charles V and the Plombes do not enter the current escape.', { kind: 'exposition', mentioned: ['valjean'] }),
    scene(79, 'Air Holes and a Drunken Friend', 'They agree on breathing holes and a plan to remove Mestienne from the grave.', 'fauchelevent-hut', [
      ['valjean', 'Specifies holes near his mouth and accepts the hearse as his only concealed exit.'],
      ['fauchelevent', 'Promises to divert Mestienne with drink and return with tools to release him.'],
    ], 'Paragraphs 79–95 complete the plan. Its confidence is not proof that Mestienne is alive or will attend; that mistaken assumption causes the later crisis.', { mentioned: ['mestienne'] }),
  ]],
  [142, [
    scene('start', 'The Hearse on the Boulevard', 'A white-palled coffin travels toward Vaugirard with the priest, choir boy, bearers and limping gardener.', 'boulevard-du-maine', [
      ['fauchelevent', 'Follows the hearse carrying the tools needed to free its hidden passenger.'],
      ['valjean', 'Travels concealed in the coffin being taken for a nun’s burial.'],
      ['vaugirard-funeral-priest', 'Rides behind the hearse in the mourning coach.'],
      ['vaugirard-choir-boy', 'Accompanies the priest in the mourning coach.'],
    ], 'Paragraphs 0–1 establish the outward procession. The coffin’s occupant is confirmed explicitly in chapter 143, not a new dead nun.'),
    scene(2, 'The Gates and the Card', 'The narrator explains the cemetery’s night access, fine and later suppression.', 'vaugirard-cemetery', [],
      'Paragraphs 2–4 describe standing regulations and history. Closure after 1830 is a forward reference; the card’s fifteen-franc penalty is needed for the immediate plot.', { kind: 'exposition' }),
    scene(5, 'Everything Had Worked So Far', 'As the procession enters the avenue, the narrator confirms the secret burial and the fugitives’ separate exits.', 'vaugirard-cemetery-approach', [],
      'Paragraphs 5–9 recap completed operations and the gardener’s confidence. Mother Crucifixion is buried under the convent altar, not inside the municipal coffin; Cosette’s basket exit is not occurring on this avenue.', { kind: 'reported', mentioned: ['mother-crucifixion', 'cosette', 'valjean', 'fauchelevent', 'mestienne'] }),
    scene(10, 'Mestienne’s Replacement', 'At the cemetery gate a new grave-digger announces Mestienne’s death and refuses a drink.', 'vaugirard-cemetery-gate', [
      ['fauchelevent', 'Discovers that the friend on whom the rescue depended is dead.'],
      ['gribier', 'Names himself as the replacement and says he never drinks.'],
      ['valjean', 'Remains hidden in the stopped hearse without hearing the change of plan.'],
    ], 'Paragraphs 10–37 reveal the replacement through dialogue. Mestienne’s death is reported, not witnessed or dated here; Gribier is named at paragraph 31.', { mentioned: ['mestienne'] }),
    scene(38, 'Business First', 'The procession advances while Fauchelevent’s invitations fail to divert Gribier from his work.', 'vaugirard-cemetery', [
      ['fauchelevent', 'Keeps offering wine while watching the hearse approach the open grave.'],
      ['gribier', 'Explains his dependants and writing work and insists on finishing the burial first.'],
      ['valjean', 'Is carried toward the grave while still relying on the original rescue plan.'],
    ], 'Paragraphs 38–79 move through the cemetery to the grave. Gribier’s children are described, not present; priest and choir boy alight at the end, with comprehensive incidental cast still pending.'),
  ]],
  [143, [
    scene('start', 'The Journey Within the Box', 'From inside the coffin Valjean reconstructs the route and feels himself lowered into the grave.', 'vaugirard-open-grave', [
      ['valjean', 'Tracks the journey through sound and motion and recovers from the coffin’s tilted descent.'],
    ], 'Paragraphs 0–10 retell the same journey from the concealed passenger’s perspective. His inference about the bridge and the probable handling of the coffin are not independently witnessed route facts.', { items: ['municipal-burial-coffin'] }),
    scene(11, 'Prayers Through the Lid', 'Valjean hears the burial service and waits for the rescue he believes will follow.', 'vaugirard-open-grave', [
      ['valjean', 'Hears the Latin service and assumes Fauchelevent will take Mestienne away.'],
      ['vaugirard-funeral-priest', 'Recites the prayers over the coffin.'],
      ['vaugirard-choir-boy', 'Responds to the priest during the burial service.'],
    ], 'Paragraphs 11–26 supply audible voices and the prisoner’s mistaken expectation. His thought that he is alone is not proof that the gardener and grave-digger have gone.'),
    scene(27, 'Earth on the Air Holes', 'Falling earth blocks a breathing hole and Valjean loses consciousness.', 'vaugirard-open-grave', [
      ['valjean', 'Loses consciousness after four shovelfuls fall and an air hole becomes blocked.'],
    ], 'Paragraphs 27–33 describe a faint, not death. The next chapter explains the actions above the same coffin rather than beginning a second burial.', {
      stateChanges: [{ character: 'valjean', condition: 'unconscious', evidenceParagraph: 33 }],
    }),
  ]],
  [144, [
    scene('start', 'The Offer to Pay', 'Above the coffin Fauchelevent offers to buy the wine, but Gribier continues shovelling.', 'vaugirard-open-grave', [
      ['fauchelevent', 'Blocks the grave-digger’s path and desperately offers to pay for a drink.'],
      ['gribier', 'Rejects interruption and throws the first three shovelfuls into the grave.'],
      ['valjean', 'Remains concealed beneath the falling earth.'],
    ], 'Paragraphs 0–34 rewind to explain chapter 143’s shovelfuls. Gribier’s child and coverlet language refers to the supposed corpse, not a buried child.'),
    scene(35, 'A Stolen Card and a Fine', 'Fauchelevent steals Gribier’s card and uses the threatened fine to send him home.', 'vaugirard-open-grave', [
      ['fauchelevent', 'Takes the card unnoticed and persuades Gribier to race home before the gates close.'],
      ['gribier', 'Believes he forgot his card and leaves the unfinished grave in the gardener’s care.'],
      ['valjean', 'Lies unconscious inside the coffin after the fourth shovelful.'],
    ], 'Paragraphs 35–72 reveal the actual diversion. The gardener steals rather than finds the card; later claims to Gribier must not overwrite this.', { items: ['gribier-cemetery-card'] }),
    scene(73, 'A Face Mistaken for Death', 'Fauchelevent opens the coffin, finds Valjean unresponsive and believes he has killed his benefactor.', 'vaugirard-open-grave', [
      ['fauchelevent', 'Pries off the lid and mourns when the pale man does not answer.'],
      ['valjean', 'Lies motionless with closed eyes while fresh air reaches him.'],
    ], 'Paragraphs 73–90 give Fauchelevent’s mistaken diagnosis and fear for Cosette. His assertion of death does not establish isAlive:false.', { mentioned: ['cosette', 'mestienne'] }),
    scene(91, 'Fresh Air and Brandy', 'Valjean opens his eyes, revives fully and climbs out to help close and bury the empty coffin.', 'vaugirard-open-grave', [
      ['valjean', 'Revives after fainting, drinks brandy and helps bury the now empty coffin.'],
      ['fauchelevent', 'Recovers from terror, offers the flask and finishes the concealment with him.'],
    ], 'Paragraphs 91–118 explicitly explain the faint and recovery. Resurrection and rigidity of death are figurative; stiffness persists but neither a death nor a miraculous cure occurs.', {
      stateChanges: [{ character: 'valjean', condition: 'conscious', evidenceParagraph: 100 }],
    }),
    scene(119, 'Two Men Through the Gate', 'The stolen card opens the cemetery gate and the men pass the barrier carrying burial tools.', 'vaugirard-cemetery-gate', [
      ['fauchelevent', 'Drops the stolen card into the porter’s box to obtain release.'],
      ['valjean', 'Walks out carrying the mattock and waits outside Gribier’s address.'],
    ], 'Paragraphs 119–125 move from gate to barrier and Rue Vaugirard. Tools as passports is an analogy, not newly issued identity papers.', { items: ['gribier-cemetery-card'] }),
    scene(126, 'The Price Paid in the Garret', 'Fauchelevent returns the tools to a relieved Gribier, overlooking the distressed family and wrecked room.', 'gribier-garret-87-vaugirard', [
      ['fauchelevent', 'Returns the tools and falsely says he found the card and buried the corpse.'],
      ['gribier', 'Accepts the explanation with gratitude after a desperate search.'],
      ['gribier-wife', 'Sits with the children on the torn carpet after crying during the desperate search.'],
    ], 'Paragraphs 126–139 show the garret’s material cost. The wife is a distinct visible participant. The children remain an undifferentiated group in the source and her state rather than receiving fabricated individual names or actions. The narrator says the children were probably beaten, not that the visitor witnessed blows. Valjean waits outside.'),
  ]],
  [145, [
    scene('start', 'At Number Sixty-Two', 'The two men and Cosette reach the convent entrance after retrieving the child.', 'petit-picpus-entrance', [
      ['fauchelevent', 'Knocks at the entrance and uses the convent’s passwords.'],
      ['valjean', 'Returns with the child after leaving the cemetery.'],
      ['cosette', 'Arrives reunited with the man whose return ended her fearful wait.'],
    ], 'Paragraphs 0–1 establish the arrival; the intervening account then looks back to the fruit-seller.'),
    scene(2, 'Twenty-Four Hours of Silence', 'The narrator recalls Cosette’s frightened stay with the fruit-seller and her joy at Valjean’s return.', 'chemin-vert-fruit-seller', [],
      'Paragraphs 2–3 report the prior interval and reunion, not a second departure from the convent. The child neither ate nor slept and answered no questions; her silence is fear, not informed knowledge of the convict history.', { kind: 'reported', mentioned: ['cosette', 'valjean', 'fauchelevent'] }),
    scene(4, 'The Servant’s Door', 'The porter admits the three through the courtyard’s small door toward the reserved parlor.', 'petit-picpus-courtyard', [
      ['fauchelevent', 'Leads his guests through the authorized entrance.'],
      ['valjean', 'Crosses into the garden openly under the agreed cover.'],
      ['cosette', 'Enters with the two men through the small service door.'],
      ['petit-picpus-porter', 'Opens the instructed route from courtyard to garden.'],
    ], 'Paragraphs 4–7 distinguish the courtyard, servant’s door and garden from the prior wall crossing.'),
    scene(8, 'He Answers Well', 'Fauchelevent supplies every answer as the prioress examines the silent newcomer and Cosette.', 'petit-picpus-business-parlor', [
      ['fauchelevent', 'Answers in his guest’s place using his dead brother’s name and a grandfather cover.'],
      ['valjean', 'Remains entirely silent while the false identity is accepted.'],
      ['cosette', 'Is examined by the prioress without disclosing her history.'],
      ['mother-innocente', 'Questions the newcomer, consults her companion and orders a second bell.'],
      ['petit-picpus-admission-vocal-mother', 'Praises the answers supplied by Fauchelevent and confers with the prioress.'],
    ], 'Paragraphs 8–42 stage the interview. The real Ultime is already dead and absent; the cover does not establish biological brotherhood or grandfatherhood.', {
      identityReveals: [{ identity: 'ultime-fauchelevent-cover', character: 'valjean', evidenceParagraph: 16, audience: 'reader' }],
    }),
    scene(43, 'Two Bells in the Garden', 'Valjean takes up his official assistant’s post and Cosette receives a charity place in the school.', 'petit-picpus-garden', [],
      'Paragraphs 43–50 summarize installation and its motives. The convent knows the accepted cover, not the convict identity; the two coffins remain in their different burial places.', { kind: 'reported', mentioned: ['valjean', 'fauchelevent', 'cosette', 'mother-innocente', 'mother-crucifixion'], items: ['mother-crucifixion-own-coffin', 'municipal-burial-coffin'] }),
    scene(51, 'A Reputation He Never Hears', 'The burial story circulates through church authorities as far as Rome without reaching the gardener.', null, [],
      'The final paragraph follows later reports and a papal note across several places. No shared gathering of the archbishop, Latil, Pope and gardener is created.', { kind: 'reported', mentioned: ['fauchelevent', 'mother-innocente'] }),
  ]],
  [146, [
    scene('start', 'The Clothes in the Valise', 'Cosette adapts to school while Valjean preserves the mourning clothes she wore away from the inn.', 'petit-picpus-convent', [],
      'Paragraphs 0–7 combine recurring life, two brief recollected remarks, the locked clothes and continuing surveillance outside. Javert watches the district for a month, not the hut; Cosette’s belief in fatherhood does not create biological kinship.', { kind: 'reported', mentioned: ['cosette', 'valjean', 'fauchelevent', 'javert'], items: ['cosette-mourning-clothes', 'valjean-clothes-valise', 'catherine-doll'] }),
    scene(8, 'An Hour Together Each Day', 'Garden work and permitted visits bring the pair a quieter, happier life.', 'fauchelevent-hut', [],
      'Paragraphs 8–15 describe repeated work and visits, not one continuous scene. The earlier gardener’s banknote is a retained object, not a living Chouan; the promised facsimile is an excluded source illustration placeholder.', { kind: 'reported', mentioned: ['valjean', 'cosette', 'fauchelevent'] }),
    scene(16, 'Two Kinds of Captivity', 'Valjean’s meditation on the galleys and the cloister turns his growing pride toward humility.', 'petit-picpus-garden', [],
      'Paragraphs 16–48 explicitly render his impressions and repeated meditations. Remembered convicts, the Bishop, angels, tigers and lambs are not present cast or literal transformations; the voice is his conscience.', { kind: 'reported', mentioned: ['valjean', 'myriel'] }),
    scene(49, 'Years Within the Walls', 'Valjean prays near the chapel and the convent’s daily life deepens his gratitude as Cosette grows.', 'petit-picpus-garden', [],
      'Paragraphs 49–54 close with habitual prayer and a span of years, not a single evening. The sister in reparation remains unnamed; the volume-end marker stays attached to the exact manuscript.', { kind: 'reported', mentioned: ['valjean', 'cosette'] }),
  ]],
]
