const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'reported', ...extra,
})

export const volumeThreeBookEighthReview = [
  [201, [
    part('start', 'The Seasons Without Her', 'Through autumn and into winter Marius searches unsuccessfully and loses interest in work and walking.', null,
      'Paragraphs 0–2 summarize time and a separate remark by Courfeyrac. Lost dog is a comparison, not a transformation; melancholy is described without adding a medical diagnosis.', { mentioned: ['marius', 'courfeyrac'] }),
    part(3, 'The Ball at Sceaux', 'A September outing with friends ends in a solitary, disappointed walk home.', 'sceaux-ball',
      'Paragraph 3 recalls a specific attended outing within the seasonal summary;4 returns to a later pattern of isolation. The girl Marius seeks does not attend, and his hope does not create a sighting. Marius’s later solitary journey is not assigned to the three friends left at the ball.', { kind:'scene', present:[
        ['marius', 'Attends the Sceaux ball hoping to find the girl, then leaves his friends in disappointment.'],
        ['courfeyrac', 'Accompanies Marius to the ball with the other two friends.'],
        ['bossuet', 'Joins the September outing at Sceaux.'],
        ['grantaire', 'Attends with the others and makes a cynical aside about the place.'],
      ], timeHint: 'September, recalled after the opening seasonal summary' }),
    part(5, 'White Hair Beneath a Workman’s Cap', 'A resemblance near the Invalides briefly gives Marius hope of finding the unknown pair.', 'boulevard-invalides-vicinity',
      'The final paragraph describes one encounter without confirming the man’s identity. Marius thinks he recognizes Leblanc, loses him before following and later doubts the resemblance. No reader identity reveal is assigned.', { kind: 'scene', present: [
        ['marius', 'Studies the passing man and thinks of following only after he has disappeared.'],
        ['invalides-white-haired-workman', 'Walks slowly in workman’s clothes and turns into a side street.'],
      ] }),
  ]],
  [202, [
    part('start', 'A Nearly Empty House', 'Marius remains at Gorbeau, isolated from the Jondrettes whose rent he once paid.', 'gorbeau-house',
      'Paragraphs 0–3 establish remaining lodgers and Candlemas. He has never spoken to the family; the weather verse is a quoted belief, not guaranteed forecasting.', { mentioned: ['marius', 'jondrette'], timeHint: 'February 2, during the winter following the seasonal summary' }),
    part(4, 'Trouble Comes Cheap', 'Marius leaves for dinner past the portress sweeping the house threshold.', 'gorbeau-house',
      'Paragraphs 4–6 stage the portress’s actual sweeping and monologue at the threshold. She is not merely mentioned and does not follow Marius into the separate encounter.', {kind:'scene',present:[
        ['marius', 'Passes the sweeping portress as he leaves the house for dinner.'],
        ['madame-bourgon', 'Sweeps at the threshold and complains that only trouble comes cheaply.'],
      ]}),
    part(7, 'Two Girls in Flight', 'On the boulevard Marius is jostled by two frightened girls who speak of narrowly escaping police.', 'gorbeau-adjoining-boulevard',
      'Paragraphs 7–12 stage the street encounter. Police are reported by the girls, not seen chasing them here. Their names and relation to the Jondrettes are not disclosed; the portress remains at the house.', { kind: 'scene', present: [
        ['marius', 'Hears the girls’ slang and watches them disappear among the trees.'],
        ['boulevard-taller-ragged-girl', 'Runs past and says the police nearly caught her.'],
        ['boulevard-shorter-ragged-girl', 'Answers that she saw the police and fled.'],
      ] }),
    part(13, 'The Gray Packet', 'Marius picks up papers, tries in vain to recall the girls and keeps the packet for the time being.', 'gorbeau-adjoining-boulevard',
      'Paragraphs 13–15 give his inference about ownership, not an observed drop. The next chapter explicitly says nothing yet proves the papers belonged to the girls.', { kind: 'scene', present: [
        ['marius', 'Finds the packet and calls after the vanished girls without reaching them.'],
      ], items: ['four-petitions-packet'] }),
    part(16, 'A Coffin in the Rue Mouffetard', 'A child’s coffin recalls the fleeing girls before Marius returns to thoughts of his own loss.', 'rue-mouffetard',
      'Paragraphs 16–19 stage a separate sight and his reflections. The coffin is not either living girl, and his angels and ghouls are descriptions, not supernatural identities.', { kind: 'scene', present: [
        ['marius', 'Sees a child’s coffin in the alley, thinks of the fleeing girls and returns to his own sorrow.'],
      ] }),
  ]],
  [203, [
    part('start', 'Four Unsealed Letters', 'At bedtime Marius opens the forgotten packet in hope of finding a return address.', 'gorbeau-marius-room',
      'Paragraphs 0–7 stage the reading frame. The envelope and letters are unsealed; the marquise is an addressee, not a visitor.', { kind: 'scene', present: [
        ['marius', 'Finds the packet in his coat, opens it and begins reading to discover whom it belongs to.'],
      ], items: ['four-petitions-packet'] }),
    part(8, 'The Spanish Captain’s Petition', 'A letter signed Don Alvarès appeals to royalist charity.', null,
      'Paragraphs 8–10 are the first embedded document. Loyalty, wounds, military rank and nationality are the signer’s claims, not established biography or present cast.', { kind: 'document' }),
    part(11, 'A Mother’s Appeal', 'The second petition, signed Mistress Balizard, claims illness, abandonment and six children.', null,
      'Paragraphs 11–14 include the transition and second document. Do not create six children, a husband or an illness as established facts from this appeal.', { kind: 'document' }),
    part(15, 'The Man of Letters', 'Genflot offers a drama’s dedication in return for aid and explains why a daughter is sent instead.', null,
      'Paragraphs 15–23 reproduce the third petition. Its drama, theatre submission and daughter’s proposed visit are claims within the document, not a performed play or a verified errand.', { kind: 'document' }),
    part(24, 'The Dramatic Artist’s Invitation', 'Fabantou invites an unnamed charitable churchgoer to witness the household’s need.', null,
      'Paragraphs 24–29 reproduce the fourth petition. The recipient is described by a church encounter, not identified by a real name; certificates are promised rather than inspected.', { kind: 'document' }),
    part(30, 'One Hand, Four Signatures', 'Marius notices the same handwriting, paper, tobacco smell and spelling faults but cannot solve the packet’s origin.', 'gorbeau-marius-room',
      'Paragraphs 30–35 give the evidence and his conjecture of a common writer. No true author is identified, and four assumed signers do not become four verified people.', { mentioned: ['marius'], items: ['four-petitions-packet'] }),
    part(36, 'A Knock the Next Morning', 'After setting aside the papers, Marius is interrupted at work by a visitor he initially mistakes for the portress.', 'gorbeau-marius-room',
      'Paragraphs 36–45 cross from bedtime to about seven next morning, with a brief aside on locks and an earlier boot theft. The hoarse voice belongs to a young girl, not an old man or Madame Bougon; her name is not yet disclosed.', { kind: 'scene', present: [
        ['marius', 'Invites the caller in and turns when the voice contradicts his assumption.'],
        ['marius-hoarse-voiced-girl', 'Knocks softly and apologizes in a rough voice before being seen.'],
      ], items: ['four-petitions-packet'] }),
  ]],
  [204, [
    part('start', 'The Neighbor’s Daughter', 'A shivering girl delivers Jondrette’s appeal, and Marius connects it with the four unsigned-address petitions.', 'gorbeau-marius-room',
      'Paragraphs 0–19 reveal the common signer and identify yesterday’s girls as the Jondrette daughters. Jondrette itself remains a possibly assumed name; the family’s earlier identity is not disclosed. Illness and two days without bread are assertions in the letter, not independently examined here.', { kind: 'scene', present: [
        ['marius', 'Reads the new appeal and recognizes its hand, paper and style.'],
        ['jondrette-elder-daughter', 'Enters barefoot and delivers her father’s request for relief.'],
      ], identityReveals: [
        { identity: 'marius-hoarse-voiced-girl', character: 'jondrette-elder-daughter', evidenceParagraph: 18, audience: 'reader' },
        { identity: 'boulevard-taller-ragged-girl', character: 'jondrette-elder-daughter', evidenceParagraph: 18, audience: 'reader' },
        { identity: 'four-petitions-signer', character: 'jondrette', evidenceParagraph: 17, audience: 'reader' },
      ], items: ['four-petitions-packet', 'jondrette-marius-appeal'] }),
    part(20, 'I Can Read and Write', 'The girl explores the garret, reads from a military history and demonstrates her writing.', 'gorbeau-marius-room',
      'Paragraphs 20–45 show literacy directly. Her father’s military service is her claim; the book’s Waterloo action and the song’s named children are embedded texts. The bobbies are here is a writing sample, not a report of police at the door.', { kind: 'scene', present: [
        ['jondrette-elder-daughter', 'Reads aloud and writes The bobbies are here on a sheet at Marius’s table.'],
        ['marius', 'Lets her inspect his room and watches her demonstrate literacy.'],
      ], items: ['bobbies-writing-sample'] }),
    part(46, 'The Packet Returned', 'She reveals that she has noticed Marius before, then recognizes and retrieves the lost letters.', 'gorbeau-marius-room',
      'Paragraphs 46–62 confirm the sisters’ loss through her testimony. Her report of a brother providing theatre tickets does not name him here. The story about delivering the letters was a lie told to avoid a beating, not four completed deliveries.', { kind: 'scene', present: [
        ['jondrette-elder-daughter', 'Mentions seeing Marius at Mabeuf’s and explains how the packet was lost and concealed from her father.'],
        ['marius', 'Withdraws gently from her familiarity and gives back the envelope.'],
      ], items: ['four-petitions-packet'] }),
    part(63, 'Five Francs and a Crust', 'Marius hears her account of hunger and homelessness, gives her five francs and watches her take a stale crust as she leaves.', 'gorbeau-marius-room',
      'Paragraphs 63–76 distinguish testimony about past suicidal thoughts from any actual attempt. Hunger’s strange perceptions are reported without a new diagnosis. Five francs are given from five francs sixteen sous; sixteen sous remain for dinner.', { kind: 'scene', present: [
        ['jondrette-elder-daughter', 'Describes past nights outdoors, accepts the coin and bites a moldy crust on departure.'],
        ['marius', 'Searches his pockets and gives all but his sixteen-sou dinner money.'],
      ], items: ['marius-five-franc-gift'] }),
  ]],
  [205, [
    part('start', 'What He Had Not Seen', 'The visit makes Marius reconsider his neglect of the suffering next door.', null,
      'Paragraphs 0–5 combine the narrator’s social argument with Marius’s self-reproach. Five years of poverty is the source’s stated duration here; do not force it into the earlier age-and-three-years chronology. Spectres and death agony do not establish actual deaths.', { mentioned: ['marius'], kind: 'exposition' }),
    part(6, 'The Triangle in the Partition', 'Marius discovers a gap near the ceiling and climbs onto the commode to look into the neighboring attic.', 'gorbeau-marius-room',
      'Paragraphs 6–8 describe a real opening between lathes in the thin wall. He remains in his own room; his view is not physical entry into the Jondrettes’ space.', { kind: 'scene', present: [
        ['marius', 'Examines the uncovered partition and puts his eye to the high triangular gap.'],
      ] }),
  ]],
  [206, [
    part('start', 'The Attic Beyond the Wall', 'The neighboring room’s dirt, scant furniture, fire and images become visible through the opening.', 'gorbeau-jondrette-attic',
      'Paragraphs 0–7 describe a view from outside the room and a framed engraving. Napoleon, the sleeping family and the crowned eagle belong to that image; monstrous creatures in corners are conjectural imagery. This room has a fireplace and forty-franc rent, unlike Marius’s cabinet.', { kind: 'exposition', items: ['jondrette-dream-engraving', 'jondrette-turned-wooden-panel'] }),
    part(8, 'The Man at the Table', 'Jondrette smokes and writes while voicing resentment of inequality even in burial.', 'gorbeau-jondrette-attic',
      'Paragraphs 8–18 are observed and heard through the wall. The letter’s contents are only probable; a book title is not the scene’s cast. Marius is an observer in the adjoining room, not physically beside the table.', { kind: 'scene', present: [
        ['jondrette', 'Writes with a pipe in his mouth and strikes the table during his complaint.'],
      ], mentioned: ['marius'] }),
    part(19, 'The Mother and the Younger Girl', 'Marius sees the wife near the hearth and recognizes the younger girl from the boulevard.', 'gorbeau-jondrette-attic',
      'Paragraphs 19–28 identify the girl as fourteen, despite an initially younger appearance. Her seeming lack of life or breath is description of listlessness, not death. The observer remains across the partition.', { kind: 'scene', present: [
        ['madame-jondrette', 'Crouches near the fireplace in patched clothing.'],
        ['jondrette-younger-daughter', 'Sits listlessly on the pallet near the window.'],
      ], mentioned: ['marius'], identityReveals: [
        { identity: 'boulevard-shorter-ragged-girl', character: 'jondrette-younger-daughter', evidenceParagraph: 24, audience: 'reader' },
      ] }),
    part(29, 'The Names of Affection', 'The wife answers Jondrette’s grumbling with a caressing form of address as he continues writing.', 'gorbeau-jondrette-attic',
      'Paragraphs 29–34 distinguish spoken endearments from the narrator’s interpretation of diminished affection. They establish neither renewed love nor a death among the silent occupants.', { kind: 'scene', present: [
        ['jondrette', 'Grumbles about everyone and returns to his writing.'],
        ['madame-jondrette', 'Sighs and urges her husband to calm himself.'],
        ['jondrette-younger-daughter', 'Remains silent as the pen scratches.'],
      ], mentioned: ['marius'] }),
  ]],
  [207, [
    part('start', 'Fiacre Number 440', 'The elder daughter returns with news that the charitable churchgoer is following in a hired carriage.', 'gorbeau-jondrette-attic',
      'Paragraphs 0–34 are the return and her report of church and carriage, not a second witnessed church scene. Rothschild is the father’s comparison, not the visitor’s identity. Her earlier concealment of shoes and mantle is probable rather than directly observed.', { kind: 'scene', present: [
        ['jondrette-elder-daughter', 'Reports the delivered letter, the promised visit and the number she watched.'],
        ['jondrette', 'Questions the address and carriage identification before accepting the news.'],
        ['madame-jondrette', 'Turns toward the arriving daughter.'],
        ['jondrette-younger-daughter', 'Remains on the bed while her sister reports success.'],
      ], mentioned: ['marius'] }),
    part(35, 'Making the Room Worse', 'Jondrette extinguishes the fire, breaks the chair and orders his younger daughter to smash a window.', 'gorbeau-jondrette-attic',
      'Paragraphs 35–58 show deliberate preparation, including the wife’s order to lie down. The girl actually breaks the glass at paragraph 52; a battlefield general is a comparison. The silent observer remains outside this physical cast.', { kind: 'scene', present: [
        ['jondrette', 'Pours water on the fire, kicks through the seat and forces his younger daughter to break a pane.'],
        ['jondrette-younger-daughter', 'Obeys in terror and strikes the glass with her fist.'],
        ['madame-jondrette', 'Questions the plan and obeys the command to get into bed.'],
        ['jondrette-elder-daughter', 'Reports the cold and snow while her father stages the room.'],
      ], mentioned: ['marius'] }),
    part(59, 'The Cost of the Broken Pane', 'The younger girl shows her bleeding hand, and her father wraps it before finishing the display.', 'gorbeau-jondrette-attic',
      'Paragraphs 59–73 establish a real injury and its immediate bandaging, not a fabricated wound or full healing. The father welcomes the result; the mother protests. Snow and cold now enter through the broken window.', { kind: 'scene', present: [
        ['jondrette-younger-daughter', 'Shows her bleeding fist and weeps near her mother’s bed.'],
        ['madame-jondrette', 'Protests that the forced window-breaking wounded the child.'],
        ['jondrette', 'Tears cloth to bind the wrist, then hides the extinguished brands under ashes.'],
      ], mentioned: ['marius'], stateChanges: [
        { character: 'jondrette-younger-daughter', injury: 'Bleeding hand and wrist after breaking the pane', evidenceParagraph: 61 },
      ] }),
  ]],
  [208, [
    part('start', 'Waiting in the Cold', 'The family waits in the staged room while Jondrette’s frustration turns into an attack on the expected donor.', 'gorbeau-jondrette-attic',
      'Paragraphs 0–13 show the mother comforting the injured girl and the elder removing mud. Threats to rich people are speech, not committed assaults.', { kind: 'scene', present: [
        ['jondrette-elder-daughter', 'Shows her cold hand and cleans mud from her mantle.'],
        ['madame-jondrette', 'Kisses the crying child and reminds her husband that he caused the wound.'],
        ['jondrette-younger-daughter', 'Continues sobbing while her mother comforts her.'],
        ['jondrette', 'Complains of waiting and demands that the younger girl keep crying.'],
      ], mentioned: ['marius'] }),
    part(14, 'The Luxembourg Pair at the Door', 'The expected benefactor arrives with the girl Marius has been seeking, and she sets a parcel on the table.', 'gorbeau-jondrette-attic',
      'Paragraphs 14–26 confirm recognition of the Luxembourg pair, not their earlier real names. Marius stays at the peephole in his own room. The elder daughter retreats behind the door and looks at the visitor’s clothes and face.', { kind: 'scene', present: [
        ['jondrette', 'Abruptly changes to deferential welcome when the visitors knock.'],
        ['monsieur-leblanc', 'Arrives at the attic with his young companion.'],
        ['mademoiselle-lanoire', 'Enters and places a bulky parcel on the table.'],
        ['jondrette-elder-daughter', 'Watches the girl from behind the door with a somber expression.'],
        ['madame-jondrette', 'Remains in the room prepared for the benefactor’s arrival.'],
        ['jondrette-younger-daughter', 'Remains with her injury in the staged household.'],
      ], mentioned: ['marius'], items: ['leblanc-relief-parcel'] }),
  ]],
  [209, [
    part('start', 'Remembering Fabantou', 'The benefactor offers clothes and blankets while Jondrette checks which assumed name he must use.', 'gorbeau-jondrette-attic',
      'Paragraphs 0–14 show the visitors adjusting to the darkness and the father quietly consulting his daughter. Talma’s pupil is a claim, not verified training. Marius watches from his adjoining room.', { kind: 'scene', present: [
        ['monsieur-leblanc', 'Explains the relief parcel and recalls the petitioner’s supplied name.'],
        ['mademoiselle-lanoire', 'Examines the interior beside her companion.'],
        ['jondrette', 'Asks which signature was used and presents himself as Fabantou.'],
        ['jondrette-elder-daughter', 'Reminds her father of the dramatic artist’s name.'],
      ], mentioned: ['marius'], items: ['leblanc-relief-parcel'] }),
    part(15, 'A False Account of a Real Wound', 'Jondrette pinches the injured hand to renew the crying and describes a fictitious workplace accident.', 'gorbeau-jondrette-attic',
      'Paragraphs 15–26 distinguish real pain from its fabricated explanation. Possible amputation is Jondrette’s threat, not a medical prognosis or performed operation; the frightened child believes it.', { kind: 'scene', present: [
        ['jondrette', 'Pinches the sore hand and claims a machine injury sustained while earning six sous.'],
        ['jondrette-younger-daughter', 'Cries from renewed pain and then fear of losing her arm.'],
        ['mademoiselle-lanoire', 'Approaches the wounded child with concern.'],
        ['monsieur-leblanc', 'Responds in alarm to the claim of a possible amputation.'],
      ], mentioned: ['marius'] }),
    part(27, 'The Sixty-Franc Appeal', 'While scrutinizing the visitor, Jondrette draws his wife’s attention to him and invents a larger rent emergency.', 'gorbeau-jondrette-attic',
      'Paragraphs 27–34 combine emerging recognition with claims the narrator explicitly refutes: four quarters are forty francs, not sixty, and the earlier payment rules out the claimed duration. The five francs given here are separate from Marius’s morning gift.', { kind: 'scene', present: [
        ['jondrette', 'Urges his wife to examine the man and demands sixty francs under a false deadline.'],
        ['madame-jondrette', 'Lies on the bed and receives her husband’s quiet instruction.'],
        ['monsieur-leblanc', 'Puts five francs on the table in response to the appeal.'],
        ['jondrette-elder-daughter', 'Hears her father’s private complaint about the small gift.'],
      ], mentioned: ['marius'], timeHint: 'Jondrette calls tomorrow February 4, making this February 3', items: ['leblanc-five-franc-piece'] }),
    part(35, 'A Return at Six and a Coat Left Behind', 'The benefactor promises sixty francs that evening and deliberately gives Jondrette his overcoat.', 'gorbeau-jondrette-attic',
      'Paragraphs 35–52 establish the six-o’clock promise, not delivery of sixty francs. The overcoat is intentionally left, not forgotten or stolen. Jondrette accompanies the visitors out while Marius remains concealed.', { kind: 'scene', present: [
        ['monsieur-leblanc', 'Promises to return at six and confirms the brown great-coat is a gift.'],
        ['jondrette', 'Accepts the promise, dons the coat and leads the visitors out.'],
        ['jondrette-elder-daughter', 'Draws attention to the coat before learning it was left intentionally.'],
        ['mademoiselle-lanoire', 'Takes her companion’s arm as they prepare to leave.'],
      ], mentioned: ['marius'], items: ['leblanc-brown-greatcoat'] }),
  ]],
  [210, [
    part('start', 'What the Watcher Missed', 'Marius’s attention to the girl overwhelms his perception of the rest of the visit.', 'gorbeau-marius-room',
      'Paragraphs 0–1 retell the visit from his attention’s narrow focus. He tries to hear her voice but Jondrette drowns it out; observed proximity does not imply he heard every promise.', { mentioned: ['marius', 'mademoiselle-lanoire'] }),
    part(2, 'Too Late for the Fiacre', 'Marius hesitates, rushes downstairs and sees the visitors’ carriage already beyond reach.', 'gorbeau-adjoining-boulevard',
      'Paragraphs 2–4 move from his room to the boulevard and street corner. His fear of recognition delays him; the imagined certainty of successful pursuit is not an accomplished outcome.', { kind: 'scene', present: [
        ['marius', 'Runs out after hesitating and finds the fiacre too far down Rue Mouffetard to catch on foot.'],
      ] }),
    part(5, 'Twenty-Four Sous Short', 'A cab driver demands forty sous in advance, and Marius has only sixteen.', 'gorbeau-adjoining-boulevard',
      'Paragraphs 5–17 explain the failed hire and the cost of his earlier generosity. The driver leaves without taking him; the narrator explicitly doubts that Marius heard the six-o’clock promise.', { kind: 'scene', present: [
        ['marius', 'Offers payment on return but cannot meet the forty-sou advance.'],
        ['boulevard-cab-driver', 'Demands advance payment and drives away when it is not supplied.'],
      ] }),
    part(18, 'A Conversation in the Snow', 'Returning, Marius notices Jondrette talking to a man who resembles the criminal Panchaud.', 'barriere-gobelins-wall',
      'Paragraphs 18–20 show the resemblance then give Panchaud’s retrospective criminal history, including 1843. The association is suspicious, not yet a named confession; the future prison escape is not the current action.', { kind: 'scene', present: [
        ['marius', 'Notices the two men despite his preoccupation and recalls a resemblance.'],
        ['jondrette', 'Talks outside while wearing the benefactor’s coat.'],
        ['jondrette-barrier-interlocutor', 'Stands in the snow conversing with Jondrette.'],
      ], mentioned: ['panchaud'], items: ['leblanc-brown-greatcoat'] }),
  ]],
  [211, [
    part('start', 'A Hand in the Door', 'The elder daughter stops Marius from shutting his door and asks whether she can help with his sorrow.', 'gorbeau-marius-doorway',
      'Paragraphs 0–18 keep her in the corridor and him in his room. His assumptions that she would refuse a refund and cannot know the address are his thoughts, not tested facts.', { kind: 'scene', present: [
        ['marius', 'Tries to close the door and responds harshly before hearing her offer.'],
        ['jondrette-elder-daughter', 'Holds the door open and offers her skill at letters, inquiries and following people.'],
      ] }),
    part(19, 'Find Their Address', 'Marius asks her to find the visitors and promises whatever she wants in return.', 'gorbeau-marius-doorway',
      'Paragraphs 19–46 show her pleasure changing at the request concerning the beautiful girl. She says she does not know the address and promises to obtain it; no completed search or payment has occurred.', { kind: 'scene', present: [
        ['marius', 'Asks for the address and offers an unspecified reward.'],
        ['jondrette-elder-daughter', 'Promises the address and closes the door behind her.'],
      ] }),
    part(47, 'I Recognized Him', 'Alone again, Marius hears Jondrette claim recognition and returns to the peephole.', 'gorbeau-marius-room',
      'Paragraphs 47–54 give a voice heard through the partition. The claim supplies hope, not the person’s name or a resolved identity for the reader.', { kind: 'scene', present: [
        ['marius', 'Hears the claim and climbs onto his commode to look again.'],
      ], mentioned: ['jondrette'] }),
  ]],
  [212, [
    part('start', 'The Daughters Sent Out', 'The household wears the donated clothes while Jondrette insists he knows the visitor and orders both girls away.', 'gorbeau-jondrette-attic',
      'Paragraphs 0–15 show actual use of the parcel and continued wound care. Eight years is Jondrette’s stated interval. He requires both girls back at five; they are absent from the following private exchange.', { kind: 'scene', present: [
        ['jondrette', 'Insists on recognition and orders the daughters to return at five.'],
        ['madame-jondrette', 'Questions his certainty and objects to sending the injured child out.'],
        ['jondrette-elder-daughter', 'Dresses her sister’s hand before obeying the departure order.'],
        ['jondrette-younger-daughter', 'Has her injured hand tended and is sent outside.'],
      ], mentioned: ['marius'], items: ['leblanc-relief-parcel'] }),
    part(16, 'The Name Marius Cannot Hear', 'Jondrette whispers the girl’s identity to his wife, provoking rage and disbelief.', 'gorbeau-jondrette-attic',
      'Paragraphs 16–31 preserve the withholding: Marius hears recognition and hostility but not the name. The wife’s threat to the absent girl is not an attack. No Cosette or Thénardier identity reveal is inserted.', { kind: 'scene', present: [
        ['jondrette', 'Whispers the crucial identification and insists that the beautiful visitor is the girl his wife remembers.'],
        ['madame-jondrette', 'Responds with anger and contrasts the visitor’s clothing with her daughters’ poverty.'],
      ], mentioned: ['marius', 'mademoiselle-lanoire'] }),
    part(32, 'The Ambush for Six O’Clock', 'Jondrette outlines a trap using the promised return and the household’s expected evening emptiness.', 'gorbeau-jondrette-attic',
      'Paragraphs 32–54 reveal a plan, not a completed crime. He admits no quarter is owed, overturning his earlier rent appeal. His belief that Marius went out is wrong; the observer hears the lowered voice across the thin wall.', { kind: 'scene', present: [
        ['jondrette', 'Admits the rent fraud and sets out the evening ambush with the children as lookouts.'],
        ['madame-jondrette', 'Warns him to speak quietly and asks what happens if the man resists.'],
      ], mentioned: ['marius', 'monsieur-leblanc'] }),
    part(55, 'Charcoal and an Unnamed Purchase', 'Before leaving to arrange help, Jondrette directs his wife to prepare charcoal and reserve money for another purchase.', 'gorbeau-jondrette-attic',
      'Paragraphs 55–90 include a brief return to the doorway before the final departure. The five-franc piece is the benefactor’s gift, not Marius’s separate coin. Fifty sous—three francs is the source’s imprecise estimate, not an exact conversion; the item remains unnamed.', { kind: 'scene', present: [
        ['jondrette', 'Returns to demand a charcoal brazier and forbids spending the balance on dinner.'],
        ['madame-jondrette', 'Receives the coin and estimates charcoal at thirty sous.'],
      ], mentioned: ['marius'], items: ['leblanc-five-franc-piece'], timeHint: 'One o’clock strikes at the final departure' }),
  ]],
  [213, [
    part('start', 'Five Hours to Prevent the Trap', 'Marius decides to seek help because he cannot warn the visitors at their unknown address.', 'gorbeau-marius-room',
      'Paragraphs 0–8 explicitly state that the identities remain unresolved. His glimpse of the wife preparing iron is through the wall; he dresses and leaves without entering her room. The girl’s danger is probable, the man’s direct return planned.', { kind: 'scene', present: [
        ['marius', 'Leaves the peephole, dresses quietly and sets out with five hours before the planned ambush.'],
      ], mentioned: ['madame-jondrette', 'monsieur-leblanc', 'mademoiselle-lanoire'] }),
    part(9, 'Voices Behind the Low Wall', 'On Rue du Petit-Banquier Marius overhears two strangers discussing Patron-Minette and a profitable affair.', 'rue-petit-banquier-low-wall',
      'Paragraphs 9–25 distinguish heard words from his inference that this concerns the ambush. The bearded and long-haired men are unnamed and not automatically assigned to the quartet; the melodrama is their prior evening’s entertainment.', { kind: 'scene', present: [
        ['marius', 'Looks over the low wall and overhears the two seated men.'],
        ['petit-banquier-bearded-man', 'Questions whether the affair is reliable and shivers under his fez.'],
        ['petit-banquier-long-haired-man', 'Claims Patron-Minette’s assistance will ensure success.'],
      ] }),
    part(26, 'Toward the Police Office', 'Marius asks for the commissary’s address, eats a roll and heads for Rue de Pontoise.', 'rue-pontoise-police-route',
      'Paragraphs 26–30 give directions to number 14 and the journey, not yet a police interview. His conclusion about providence is a counterfactual reflection, not proof every alternative would have ended in death.', { mentioned: ['marius'] }),
  ]],
  [214, [
    part('start', 'The Inspector in the Commissary’s Place', 'Marius reports the trap to the officer substituting for the absent commissary.', 'rue-pontoise-police-office',
      'Paragraphs 0–25 distinguish absent commissary, clerk and inspector. Brujon and Demi-Liard are the inspector’s deductions about the low-wall strangers, not Marius’s eyewitness identification or direct confessions.', { kind: 'scene', present: [
        ['marius', 'Reports the overheard plot, address, time and suspected accomplices.'],
        ['pontoise-duty-clerk', 'Directs the urgent caller to the substitute inspector.'],
        ['pontoise-substitute-inspector', 'Recognizes the address and infers Patron-Minette’s involvement.'],
      ], mentioned: ['brujon', 'demi-liard'] }),
    part(26, 'A Key and Two Loaded Pistols', 'The inspector arranges entry and instructs Marius to signal only when the crime begins.', 'rue-pontoise-police-office',
      'Paragraphs 26–66 establish a planned intervention, not an arrest already made. Two balls per pistol are explicitly stated. The signal is a shot, with no instruction to shoot a person; six corrects the inspector’s seven-o’clock question.', { kind: 'scene', present: [
        ['marius', 'Hands over his entrance key and conceals the loaded pistols in his trousers.'],
        ['pontoise-substitute-inspector', 'Keeps the key and instructs the witness to fire at the crisis rather than too soon.'],
      ], items: ['marius-gorbeau-entrance-key', 'javert-signal-pistols'], timeHint: 'Half-past two; six-o’clock ambush confirmed' }),
    part(67, 'Ask for Inspector Javert', 'As Marius leaves, the inspector gives his name for further contact.', 'rue-pontoise-police-office',
      'Paragraphs 67–68 disclose the name at the actual utterance. The earlier role remains unnamed until this point, and Marius is not thereby given knowledge of Javert’s history with the visitor.', { kind: 'scene', present: [
        ['marius', 'Receives the name to use if further police help is needed.'],
        ['javert', 'Names himself as Inspector Javert before the witness leaves.'],
      ], identityReveals: [{ identity: 'pontoise-substitute-inspector', character: 'javert', evidenceParagraph: 68, audience: 'reader' }] }),
  ]],
  [215, [
    part('start', 'A Follower Misunderstood', 'Courfeyrac and Bossuet notice Marius following a man and decide not to intervene.', 'rue-mouffetard',
      'Paragraphs 0–24 stage the friends’ conversation separately from the actual pursuit. The poet is Courfeyrac’s joke about clothing, not Jondrette’s verified profession. They turn back rather than join the chase.', { kind: 'scene', present: [
        ['courfeyrac', 'Mistakes the errand for another romantic pursuit, then jokes about the man’s clothes.'],
        ['bossuet', 'Notices Marius and suggests following before they turn away.'],
        ['marius', 'Walks behind the man without addressing his observing friends.'],
        ['jondrette', 'Walks ahead in the oversized gifted coat without noticing surveillance.'],
      ], timeHint: 'About three o’clock', items: ['leblanc-brown-greatcoat'] }),
    part(25, 'The Chisel and the Stable Yard', 'Marius watches Jondrette visit a hovel, obtain a large chisel and disappear over the low wall.', 'rue-mouffetard-pursuit-route',
      'Paragraphs 25–28 distinguish the unknown purpose of the Rue Gracieuse visit, the observed ironmonger purchase and the concealed waste land linked to a stable yard. No conversation inside either premises is heard.', { kind: 'scene', present: [
        ['marius', 'Keeps back at the corner and sees the man clear the wall.'],
        ['jondrette', 'Buys the handled cold chisel, hides it beneath his coat and checks for followers before jumping.'],
      ], items: ['jondrette-cold-chisel'] }),
    part(29, 'Home Before the Door Is Locked', 'Without his entrance key, Marius hurries back and glimpses possible watchers in an empty attic.', 'gorbeau-house-corridor',
      'Paragraphs 29–33 describe a glimpse of four heads without identifying the men. The key is with the inspector; the portress locks the house after Marius enters. He does not inspect the unused room.', { kind: 'scene', present: [
        ['marius', 'Slips to his room unseen before the portress leaves and locks the entrance.'],
      ], mentioned: ['madame-bourgon'], items: ['marius-gorbeau-entrance-key'] }),
  ]],
  [216, [
    part('start', 'The Red Light Through the Hole', 'As six approaches Marius waits in silence, removes his boots and hears Jondrette return.', 'gorbeau-marius-room',
      'Paragraphs 0–6 place the watcher in his own room at about half-past five. Silence next door does not establish death or absence; the returning voices confirm the family’s presence.', { kind: 'scene', present: [
        ['marius', 'Feels the pistols in his pockets and puts his boots under the bed before listening.'],
      ], mentioned: ['jondrette'], items: ['javert-signal-pistols'], timeHint: 'About half-past five' }),
    part(7, 'Instructions Before the Watch', 'Through the partition Marius hears the household discuss food, iron, hinges and whether he is away.', 'gorbeau-jondrette-attic',
      'Paragraphs 7–37 are audible preparations, not all visually verified: the heavy object is probably the chisel. The potato meal is reported; the promised duck dinner is future. The parents incorrectly assume the neighbor absent.', { kind: 'scene', present: [
        ['jondrette', 'Orders final preparations and sends a daughter to check the neighboring room.'],
        ['madame-jondrette', 'Reports the meal and greased hinges and assures him the neighbor is away.'],
        ['jondrette-elder-daughter', 'Is present for the instructions before being sent to inspect.'],
        ['jondrette-younger-daughter', 'Waits for the coming lookout assignment.'],
      ], mentioned: ['marius'] }),
    part(38, 'The Search That Is Not Made', 'Marius hides under his bed while the elder daughter enters but attends to the mirror instead of searching.', 'gorbeau-marius-room',
      'Paragraphs 38–60 show actual concealment and a false claim of checking under furniture. Her assertion about a key in the door conflicts with the handed-over entrance key unless another lock is intended; the source does not explain it. She does not discover or knowingly spare him here.', { kind: 'scene', present: [
        ['marius', 'Crawls under the bed and silently waits through the inspection.'],
        ['jondrette-elder-daughter', 'Preens and sings at the mirror while claiming to search the room.'],
      ], mentioned: ['jondrette'] }),
    part(61, 'Barefoot Lookouts', 'The daughters leave to watch opposite approaches, carrying a way back through the locked entrance.', 'gorbeau-house-corridor',
      'Paragraphs 61–67 give assignments and the sound of departure. Silk boots are a promise, not delivered clothing; the possible men in the empty attic remain uncertain, and the girls do not remain inside for the next encounter. Marius hears from his separate room.', { kind: 'scene', present: [
        ['jondrette', 'Orders his daughters to watch the two approaches and promises silk boots for the next day.'],
        ['jondrette-elder-daughter', 'Protests against watching in the snow barefoot before running downstairs.'],
        ['jondrette-younger-daughter', 'Runs downstairs with her sister after receiving the lookout instructions.'],
      ], mentioned: ['marius'] }),
  ]],
  [217, [
    part('start', 'The Chisel in the Brazier', 'Returning to the peephole, Marius sees the heated chisel, charcoal brazier and prepared ropes and iron.', 'gorbeau-jondrette-attic',
      'Paragraphs 0–1 directly return Marius to his peephole;2–8 describe his view into the other room. Chimney and broken pane ventilate the brazier; crimson light is not actual blood or hellfire. Four panes after the smashed pane is source wording, not silent repair of the window.', { kind: 'scene', present:[
        ['marius', 'Returns to the opening in his own wall and studies the glowing brazier and heated chisel next door.'],
      ], items: ['jondrette-cold-chisel', 'jondrette-charcoal-brazier'] }),
    part(9, 'The Other Five-Franc Piece', 'Jondrette gives his wife Marius’s coin to pay off the coming carriage.', 'gorbeau-jondrette-attic',
      'Paragraphs 9–25 explicitly identify the morning gift from the neighbor. It is not the benefactor’s coin already assigned to charcoal and purchases. The carriage dismissal remains an instruction at this point.', { kind: 'scene', present: [
        ['jondrette', 'Assigns the lantern and payment plan and hands over the neighbor’s five francs.'],
        ['madame-jondrette', 'Takes the money and goes to fetch chairs from Marius’s room.'],
      ], mentioned: ['marius'], items: ['marius-five-franc-gift', 'leblanc-brown-greatcoat'] }),
    part(26, 'Two Chairs Taken in Moonlight', 'The wife enters Marius’s room without a candle and fails to see him in the shadow beside the partition.', 'gorbeau-marius-room',
      'Paragraphs 26–36 distinguish this second intrusion from the daughter’s earlier visit. Marius cannot reach the bed and remains on the commode, unseen; the wife takes his only two chairs before departing downstairs.', { kind: 'scene', present: [
        ['marius', 'Freezes against the shadowed wall as the intruder looks around.'],
        ['madame-jondrette', 'Takes both chairs without spotting the watcher.'],
      ], mentioned: ['jondrette'], items: ['marius-two-chairs'] }),
    part(37, 'Ladder, Knife, and a Cocked Pistol', 'Alone in the attic, Jondrette conceals the brazier and checks his tools while Marius prepares the signal weapon.', 'gorbeau-jondrette-attic',
      'Paragraphs 37–47 identify a hooked rope ladder and burglary tools, correcting Marius’s edge-tool-maker interpretation. Jondrette mistakes the pistol click across the wall for cracking plaster. He does not enter the watcher’s room.', { kind: 'scene', present: [
        ['jondrette', 'Screens the brazier, checks the ladder and tests a kitchen knife before dismissing the click.'],
        ['marius', 'Draws and cocks a signal pistol on his own side of the partition, then keeps it in his hand.'],
      ], items: ['jondrette-rope-ladder', 'jondrette-burglary-tools', 'jondrette-kitchen-knife', 'javert-signal-pistols', 'marius-two-chairs'] }),
  ]],
  [218, [
    part('start', 'Four Louis on the Table', 'At six the benefactor returns alone, gives money and is seated while the wife dismisses his carriage.', 'gorbeau-jondrette-attic',
      'Paragraphs 0–19 show actual delivery of four louis, distinct from the earlier sixty-franc promise. The wife reports the dismissal accomplished. The girl has not accompanied this return, and the daughters remain outside on watch.', { kind: 'scene', present: [
        ['jondrette', 'Welcomes the visitor and quietly orders the carriage sent away.'],
        ['monsieur-leblanc', 'Sets four louis on the table and sits opposite the petitioner.'],
        ['madame-jondrette', 'Lights the arrival and returns from dismissing the carriage.'],
      ], mentioned: ['marius'], items: ['leblanc-four-louis-relief', 'marius-two-chairs'], timeHint: 'Six o’clock strikes' }),
    part(20, 'The Invisible Witness', 'The narrator holds the two seated men, the wife and the armed watcher in one view of the isolated house.', 'gorbeau-marius-room',
      'Paragraphs 20–23 return to Marius behind the partition. He trusts the police to be waiting but has no direct sight of their positions. His hope of discovering identities is not their disclosure.', { kind: 'scene', present: [
        ['marius', 'Watches with his cocked pistol and trusts that a signal will stop the trap.'],
      ], mentioned: ['jondrette', 'monsieur-leblanc', 'madame-jondrette'], items: ['javert-signal-pistols'] }),
  ]],
  [219, [
    part('start', 'A Name Slips Out', 'The wife calls her husband Jondrette, and he explains away the discrepancy with Fabantou.', 'gorbeau-jondrette-attic',
      'Paragraphs 0–10 contain false reports of a hospital visit and the wife’s dying condition. The daughters are actually lookouts; the alias explanation does not resolve the older identity.', { kind: 'scene', present: [
        ['monsieur-leblanc', 'Asks about the wounded girl and notices the conflicting surname.'],
        ['jondrette', 'Claims the girls went for treatment and offers an artistic alias explanation.'],
        ['madame-jondrette', 'Stands near the exit and inadvertently uses the household’s name.'],
      ], mentioned: ['marius'] }),
    part(11, 'Men Enter Without Announcements', 'Blackened strangers enter while Jondrette offers a supposedly valuable painting.', 'gorbeau-jondrette-attic',
      'Paragraphs 11–28 introduce two men without naming them. Jondrette’s claim that they belong in the house is a cover. Marius’s view of the turned panel remains obstructed.', { kind: 'scene', present: [
        ['jondrette', 'Deflects questions about the strangers and turns the panel toward the visitor.'],
        ['monsieur-leblanc', 'Notices the entrants and questions their presence.'],
        ['attic-first-blackened-entrant', 'Enters silently and sits on the pallet.'],
        ['attic-second-blackened-entrant', 'Slips inside and joins the first man.'],
      ], mentioned: ['marius'], items: ['jondrette-turned-wooden-panel'] }),
    part(29, 'A Thousand Crowns for a Signboard', 'With four silent men in the room, the visitor rejects the panel’s claimed value and prepares to defend himself.', 'gorbeau-jondrette-attic',
      'Paragraphs 29–39 expand the group to four without resolving their names. Suicidal threats and the box-making account are Jondrette’s speech, not attempts or observed work. The visitor places his back to the wall before the challenge.', { kind: 'scene', present: [
        ['jondrette', 'Demands a thousand crowns and suddenly asks whether the visitor knows him.'],
        ['monsieur-leblanc', 'Values the panel at about three francs and rises defensively.'],
        ['madame-jondrette', 'Occupies the door side with the silent men.'],
      ], mentioned: ['marius'] }),
  ]],
  [220, [
    part('start', 'Three Masked Reinforcements', 'Three armed men arrive and confirm the prepared carriage as the victim braces behind the table.', 'gorbeau-jondrette-attic',
      'Paragraphs 0–20 distinguish the three masked arrivals from the four blackened men already inside. Montparnasse is reported outside talking to the elder daughter, not among the entrants. The roster remains provisional until explicit naming.', { kind: 'scene', present: [
        ['jondrette', 'Checks the carriage and absent accomplice before resuming the confrontation.'],
        ['monsieur-leblanc', 'Makes a defensive barrier of the table and grips the chair.'],
        ['masked-cudgel-man', 'Answers questions about the prepared escape transport.'],
        ['masked-axe-man', 'Arrives carrying the slaughtering axe.'],
        ['masked-key-man', 'Arrives armed with the enormous key.'],
      ], mentioned: ['marius', 'montparnasse', 'jondrette-elder-daughter'] }),
    part(21, 'My Name Is Thénardier', 'The host discloses his true name, and Marius lowers the pistol rather than betray his father’s injunction.', 'gorbeau-jondrette-attic',
      'Paragraphs 21–31 reveal the identity at paragraph 26. Marius hears it from next door; his horror is not a physical collapse or a fired shot. The gratitude still rests on his mistaken heroic account of Waterloo.', { kind: 'scene', present: [
        ['thenardier', 'Identifies himself as the Montfermeil innkeeper while the visitor denies recognition.'],
        ['monsieur-leblanc', 'Denies recognizing the man even after his self-identification.'],
      ], mentioned: ['marius'], identityReveals: [{ identity: 'jondrette', character: 'thenardier', evidenceParagraph: 26, audience: 'reader' }] }),
    part(32, 'The Child Taken from Montfermeil', 'Thénardier accuses the visitor of taking Fantine’s child and recounts the old payment as a grievance.', 'gorbeau-jondrette-attic',
      'Paragraphs 32–46 link the visitor to the yellow-coated stranger and the Lark’s departure. These accusations do not establish kidnapping or ownership of a child. Christmas Eve 1823 and eight years are the speaker’s retained dating. Real current names remain withheld.', { kind: 'scene', present: [
        ['thenardier', 'Recounts the fifteen-hundred-franc departure and claims it caused his ruin.'],
        ['monsieur-leblanc', 'Denies the account and calls his accuser a villain.'],
      ], mentioned: ['marius', 'fantine', 'mademoiselle-lanoire'] }),
    part(47, 'The Waterloo Boast and the Painted Relic', 'The innkeeper invokes his supposed rescue, and Marius finally sees the tavern sign clearly.', 'gorbeau-jondrette-attic',
      'Paragraphs 47–56 identify the panel as the self-painted sign, not a David masterpiece. The boast confirms for Marius the man of the testament but does not tell him of the robbery. Resurrection of his father is emotional imagery. The wife is now explicitly called Thénardier.', { kind: 'scene', present: [
        ['thenardier', 'Boasts of Waterloo and claims the sign was painted by David.'],
        ['madame-thenardier', 'Springs up at the insult before her husband orders her back.'],
        ['monsieur-leblanc', 'Hears the renewed demand and claims.'],
      ], mentioned: ['marius', 'pontmercy'], items: ['thenardier-tavern-sign'], identityReveals: [{ identity: 'madame-jondrette', character: 'madame-thenardier', evidenceParagraph: 47, audience: 'reader' }] }),
    part(57, 'The Window Attempt', 'Distracting talk gives the visitor a moment to reach the window, but the attackers drag him back.', 'gorbeau-jondrette-attic',
      'Paragraphs 57–74 show a real escape attempt and Marius nearly firing. Panchaud is explicitly recognized at 71; the other men are not yet all identified.', { kind: 'scene', present: [
        ['thenardier', 'Turns toward the unmasked axe-bearer and momentarily leaves the victim unwatched.'],
        ['monsieur-leblanc', 'Overturns the furniture and reaches the window before being seized.'],
        ['madame-thenardier', 'Grips the escaping man by his hair.'],
        ['panchaud', 'Raises a lead-ended bludgeon above the captive.'],
        ['masked-axe-man', 'Removes his mask and jokes about splitting wood.'],
      ], mentioned: ['marius'], identityReveals: [{ identity: 'jondrette-barrier-interlocutor', character: 'panchaud', evidenceParagraph: 71, audience: 'reader' }] }),
    part(75, 'Do Not Hurt Him', 'Thénardier restrains the attack as the struggle ends in a search and binding of the victim.', 'gorbeau-jondrette-attic',
      'Paragraphs 75–106 stop Marius’s impending shot without firing. Boulatruelle is explicitly drunk rather than dead, and the cudgel-bearer is named Babet. The prisoner is bound upright at the bed head near the fireplace; no severe injury is invented from the struggle.', { kind: 'scene', present: [
        ['thenardier', 'Orders the victim spared, searched and tied to the bed.'],
        ['monsieur-leblanc', 'Fights off several attackers before submitting to restraint.'],
        ['madame-thenardier', 'Releases his hair at her husband’s order.'],
        ['panchaud', 'Reports the fallen man drunk and participates in the restraint.'],
        ['boulatruelle', 'Lies intoxicated and is pushed aside rather than found dead.'],
        ['babet', 'Explains why so many accomplices came.'],
      ], mentioned: ['marius'], items: ['leblanc-seized-handkerchief'], identityReveals: [{ identity: 'masked-cudgel-man', character: 'babet', evidenceParagraph: 99, audience: 'reader' }] }),
    part(107, 'The Price of Silence', 'Thénardier interprets the victim’s silence as fear of police and demands two hundred thousand francs.', 'gorbeau-jondrette-attic',
      'Paragraphs 107–129 distinguish an observed absence of cries from the captor’s conclusion about hidden interests. The brazier is exposed as a threat; no burn is inflicted yet.', { kind: 'scene', present: [
        ['thenardier', 'Offers an understanding while revealing the heated chisel and naming the ransom.'],
        ['monsieur-leblanc', 'Remains silent under the demand and threat.'],
      ], mentioned: ['marius'], items: ['jondrette-charcoal-brazier', 'jondrette-cold-chisel'] }),
    part(130, 'A Letter to the Lark', 'With his right arm untied, the captive writes a dictated summons and signs using the name Urbain Fabre.', 'gorbeau-jondrette-attic',
      'Paragraphs 130–178 show coercive writing and withheld names. U. F. fits the seized handkerchief, but does not establish a true legal identity. The address is supplied here and disproved later; do not treat it as an actual residence.', { kind: 'scene', present: [
        ['thenardier', 'Dictates the summons, changes its wording and verifies the offered initials.'],
        ['monsieur-leblanc', 'Writes after his right arm is freed and supplies Urbain Fabre and number 17.'],
        ['panchaud', 'Unties the right arm at the captor’s instruction.'],
      ], mentioned: ['marius'], items: ['coerced-fabre-summons', 'leblanc-seized-handkerchief'] }),
    part(179, 'The Carriage Leaves for the Girl', 'The wife and axe-bearer depart with the summons while the captive remains under guard.', 'gorbeau-jondrette-attic',
      'Paragraphs 179–204 describe departure and Marius’s uncertain interpretation. The note is not a payment of two hundred thousand francs; that is the value attached to the intended hostage. The girl has not been abducted.', { kind: 'scene', present: [
        ['madame-thenardier', 'Carries the folded letter out to the waiting carriage.'],
        ['masked-axe-man', 'Leaves his axe behind and accompanies her.'],
        ['thenardier', 'Expects their return within three quarters of an hour and warms his feet.'],
        ['monsieur-leblanc', 'Remains bound and silent while the pair depart.'],
        ['boulatruelle', 'Sleeps in the corner.'],
      ], mentioned: ['marius'], items: ['coerced-fabre-summons'] }),
    part(205, 'The Hostage Plan Explained', 'Thénardier describes the separate carriage that will take the girl away and the retaliation if he is arrested.', 'gorbeau-jondrette-attic',
      'Paragraphs 205–220 reveal intent, not a successful kidnapping. Marius now fears a signal could endanger the girl as well as violating the testament; faint noises from the prisoner remain unexplained for the moment.', { kind: 'scene', present: [
        ['thenardier', 'Explains detention of the girl until the ransom is paid.'],
        ['monsieur-leblanc', 'Keeps silent while apparently still restrained.'],
      ], mentioned: ['marius', 'mademoiselle-lanoire'] }),
    part(221, 'The Address Was False', 'The failed messengers return, and the prisoner reveals that he has used the delay to cut most of his bonds.', 'gorbeau-jondrette-attic',
      'Paragraphs 221–238 establish that nobody at the address knew Urbain Fabre. No girl was collected. One leg remains attached as he takes the heated chisel; freedom is partial.', { kind: 'scene', present: [
        ['madame-thenardier', 'Reports the false address and failed errand.'],
        ['masked-axe-man', 'Returns and picks up the axe again.'],
        ['thenardier', 'Asks what the false address was intended to gain.'],
        ['monsieur-leblanc', 'Announces that he gained time and rises with most bonds cut.'],
      ], mentioned: ['marius'], items: ['jondrette-cold-chisel'] }),
    part(239, 'The Coin and the Hidden Saw', 'The narrator uses later police findings to propose how the captive cut his cords.', null,
      'Paragraphs 239–241 distinguish the coin and blue-steel saw actually found later from the probable reconstruction of concealment and use. Marius does not witness this retrospective search or learn it in the moment.', { kind: 'exposition', items: ['escape-coin-saw'] }),
    part(242, 'A Burn Instead of an Answer', 'The captive demonstrates resistance to coercion by burning his arm with the chisel and throwing it out of the window.', 'gorbeau-jondrette-attic',
      'Paragraphs 242–257 establish a real burn and disarmament, not invulnerability or a threat only. The source’s hand and sleeve wording is retained without resolving a side beyond the described arm. No healing occurs.', { kind: 'scene', present: [
        ['monsieur-leblanc', 'Presses the glowing chisel to his bare arm, then throws it outside.'],
        ['thenardier', 'Orders the disarmed captive seized again.'],
        ['panchaud', 'Points out the leg still tied to the bed.'],
        ['masked-key-man', 'Stands ready before the prisoner while other men seize him.'],
      ], mentioned: ['marius'], items: ['jondrette-cold-chisel'], stateChanges: [{ character: 'monsieur-leblanc', injury: 'Severe burn from the glowing chisel on his arm', evidenceParagraph: 249 }] }),
    part(258, 'The Writing Sample Becomes a Warning', 'Facing the threatened murder, Marius throws the elder daughter’s written line through the wall.', 'gorbeau-marius-room',
      'Paragraphs 258–269 give the parents’ audible decision and the observer’s alternative to firing. The paper wraps plaster and comes through the partition; the daughter is not throwing it from outside.', { kind: 'scene', present: [
        ['marius', 'Wraps plaster in the writing sample and tosses it into the attic to divert the attackers.'],
      ], mentioned: ['thenardier', 'madame-thenardier'], items: ['bobbies-writing-sample'] }),
    part(270, 'Éponine’s Handwriting', 'Thénardier mistakes the warning for his daughter’s lookout signal and the gang deploys its ladder.', 'gorbeau-jondrette-attic',
      'Paragraphs 270–287 explicitly name the elder girl through the handwriting at 278. Ponine is the same name in familiar form. Bigrenaille’s claim to see it through the window is false; the captors infer an unwatched route from that mistake.', { kind: 'scene', present: [
        ['thenardier', 'Recognizes the script and orders flight rather than murder.'],
        ['madame-thenardier', 'Picks up the warning and asks whether to kill the man first.'],
        ['panchaud', 'Claims the warning passed through the window.'],
        ['masked-key-man', 'Signals the others to act as the rope ladder is hooked to the sill.'],
        ['monsieur-leblanc', 'Is released by the men holding him as the gang turns to escape.'],
      ], mentioned: ['eponine'], items: ['bobbies-writing-sample', 'jondrette-rope-ladder'], identityReveals: [{ identity: 'jondrette-elder-daughter', character: 'eponine', evidenceParagraph: 278, audience: 'reader' }] }),
    part(288, 'A Hat at the Door', 'The gang quarrels over who will descend first until Javert interrupts from the threshold.', 'gorbeau-jondrette-attic',
      'Paragraphs 288–301 end the attempted flight before anyone uses the ladder. Javert’s arrival is not caused by a pistol shot; Marius has fired none.', { kind: 'scene', present: [
        ['thenardier', 'Tries to get to the window before the others.'],
        ['panchaud', 'Stops him by the collar and demands priority.'],
        ['madame-thenardier', 'Is proposed as first down before the dispute stalls departure.'],
        ['monsieur-leblanc', 'Remains apart from the dispute as if thinking or praying.'],
        ['javert', 'Appears at the threshold holding out his hat.'],
      ], mentioned: ['marius'] }),
  ]],
  [221, [
    part('start', 'Why Javert Did Not Wait', 'The narrator explains the surveillance, Azelma’s detention and the decision to enter without the agreed signal.', 'gorbeau-police-ambush',
      'Paragraphs 0–2 rewind to nightfall. Éponine was absent from her post and not arrested; Azelma was caught. The narration’s initial claim of caging both is immediately qualified. The key enables entry, not a forced door.', { mentioned: ['javert', 'azelma', 'eponine'], items: ['marius-gorbeau-entrance-key'], identityReveals: [{ identity: 'jondrette-younger-daughter', character: 'azelma', evidenceParagraph: 0, audience: 'reader' }] }),
    part(3, 'A Pistol That Misses Fire', 'Thénardier’s attempted shot fails and the men surrender to Javert.', 'gorbeau-jondrette-attic',
      'Paragraphs 3–28 show an attempted discharge that does not fire, followed by police entry and binding. This pistol comes from Bigrenaille, not from Marius; no shooting injury is invented.', { kind: 'scene', present: [
        ['javert', 'Confronts the armed men and calls in his officers after surrender.'],
        ['thenardier', 'Aims the supplied pistol and pulls the trigger without a discharge.'],
        ['panchaud', 'Supplies the pistol then surrenders and asks for tobacco.'],
        ['madame-thenardier', 'Takes up the paving-stone while the men surrender.'],
      ], items: ['panchaud-misfiring-pistol'] }),
    part(29, 'The Paving-Stone', 'The wife shields her husband and throws the stone, but Javert ducks and arrests them both.', 'gorbeau-jondrette-attic',
      'Paragraphs 29–47 show actual resistance and a miss, not a head wound. Javert says the daughters are jailed, but the opening narration has established that Éponine escaped his net.', { kind: 'scene', present: [
        ['madame-thenardier', 'Hurls the stone, is handcuffed and cries for her daughters.'],
        ['thenardier', 'Crouches behind his wife and is seized with her.'],
        ['javert', 'Avoids the projectile and orders the couple handcuffed.'],
      ] }),
    part(48, 'Names Beneath the Masks', 'Javert names the captured men and notices the silent victim.', 'gorbeau-jondrette-attic',
      'Paragraphs 48–63 explicitly identify the three blackened men and three masked men. Boulatruelle is awakened, not resurrected. The victims’ real identities still are not supplied.', { kind: 'scene', present: [
        ['javert', 'Names the arrested gang and orders the bound gentleman released.'],
        ['boulatruelle', 'Wakes from his drunken sleep and asks whether it is over.'],
        ['panchaud', 'Stands pinioned and is greeted as Bigrenaille.'],
        ['brujon', 'Is identified among the blackened men.'],
        ['demi-liard', 'Is greeted as Deuxmilliards.'],
        ['gueulemer', 'Is identified as the axe-bearer.'],
        ['babet', 'Is greeted as the cudgel-bearer.'],
        ['claquesous', 'Is addressed as the ventriloquist.'],
        ['monsieur-leblanc', 'Keeps his head down and says nothing as police notice him.'],
      ], identityReveals: [
        { identity: 'masked-axe-man', character: 'gueulemer', evidenceParagraph: 57, audience: 'reader' },
        { identity: 'masked-key-man', character: 'claquesous', evidenceParagraph: 61, audience: 'reader' },
      ] }),
    part(64, 'The Victim Has Gone', 'While Javert starts his report, the freed man slips out through the unguarded window.', 'gorbeau-jondrette-attic',
      'Paragraphs 64–73 explain the disappearance and the shaking ladder. The door is guarded, the window is not. Javert’s suspicion that he was most valuable is not recognition of the convict identity.', { kind: 'scene', present: [
        ['javert', 'Looks up from the report to discover the victim missing.'],
        ['monsieur-leblanc', 'Uses the confusion and the window to escape after being untied.'],
      ], items: ['jondrette-rope-ladder'] }),
  ]],
  [222, [
    part('start', 'The Child and the Rag-Picker', 'On the following evening a ragged boy exchanges insults with an old woman near Gorbeau.', 'rue-petit-banquier-corner',
      'Paragraphs 0–15 introduce the familiar child through behavior before the family exchange. The enormous dog is his mistaken impression and joke, not an animal present; the king belongs to his song.', { kind: 'scene', present: [
        ['gorbeau-returning-boy', 'Jostles the old woman, mocks her and walks on singing.'],
        ['madame-bourgon', 'Straightens from the refuse heap and protests the child’s behavior.'],
      ], timeHint: 'Evening following the ambush, in February' }),
    part(16, 'Where Are My Parents?', 'At the locked door the boy learns where his parents and sisters have been imprisoned and resumes his song.', 'gorbeau-house-entrance',
      'Paragraphs 16–38 link the child to the arrested family and the earlier Volume II child through the heading. No personal name is uttered here, so the final named-identity resolution remains for the full entity audit. Sisters at the Madelonettes is the portress’s report, not proof Éponine was arrested during the raid.', { kind: 'scene', present: [
        ['gorbeau-returning-boy', 'Kicks the door, asks about his family and leaves singing after the answers.'],
        ['madame-bourgon', 'Recognizes the child and reports La Force, Saint-Lazare and the Madelonettes.'],
      ] }),
  ]],
]
