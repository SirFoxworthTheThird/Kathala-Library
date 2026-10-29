const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'reported', ...extra,
})
const scene = (at, title, description, location, present, reason, extra = {}) =>
  part(at, title, description, location, reason, { kind: 'scene', present, ...extra })

export const volumeFourBookSixthReview = [
  [249, [
    part('start', 'The Two Boys Substituted', 'The family history explains how Magnon replaced her dead sons with the Thénardiers’ youngest children to preserve her allowance.', null,
      'Paragraphs 0–7 distinguish five Thénardier children from Magnon’s two biological sons, who died the same day. Gillenormand does not notice the substitution; support is not proof of paternity. Ten francs monthly is paid to the Thénardiers from the eighty-franc arrangement. Rousseau is a comparison, not a participant.', { mentioned: ['magnon', 'thenardier', 'madame-thenardier', 'gavroche', 'gillenormand', 'thenardier-younger-boy', 'thenardier-youngest-boy'] }),
    part(8, 'The Household in Rue Clocheperce', 'Magnon and Mamselle Miss share lodgings where the boys receive adequate care for several years.', 'magnon-rue-clocheperce-home',
      'Paragraphs 8–12 introduce the English thief as a distinct woman and summarize years. The adequate care has a financial motive; it does not make Magnon their biological mother or establish an irreversible legal adoption.', { mentioned: ['magnon', 'mamselle-miss', 'thenardier-younger-boy', 'thenardier-youngest-boy'] }),
    part(13, 'The Address Lost in the Wind', 'After a police raid the boys find their home closed, receive directions to Barge and lose the paper before they can use it.', 'rue-clocheperce',
      'Paragraphs 13–15 show Magnon and Miss arrested while the children play elsewhere. The boys are not arrested and do not witness the raid. Barge’s address is a possible refuge, not somewhere they reach; the wind removes their means of finding him.', { mentioned: ['magnon', 'mamselle-miss', 'thenardier-younger-boy', 'thenardier-youngest-boy'], items:['barge-address-paper'] }),
  ]],
  [250, [
    part('start', 'A Cold Spring Evening', 'In the stormy spring of 1832 Gavroche studies a barber’s shop for a possible theft.', 'orme-saint-gervais-barber-shop',
      'Paragraphs 0–1 frame the harsh spring weather and epidemic. The door of the tomb is a metaphor, not a newly opened physical place.', { kind: 'exposition', timeHint: 'Spring 1832' }),
    scene(2, 'The Soap in the Window', 'Gavroche studies the shop window while the barber watches him from inside.', 'orme-saint-gervais-barber-shop', [
      ['gavroche', 'Eyes the soap behind a revolving wax bride and mutters about Tuesday without taking anything.'],
      ['orme-saint-gervais-barber', 'Shaves a customer in the warm shop and glances toward the shivering boy outside.'],
    ], 'Paragraphs 2–6 stage the boy outside and the barber inside. The anonymous customer is background to the shopkeeper’s work, not a new narrative character. The wax bride is a display; no soap is stolen. Tuesday’s meaning remains uncertain.', { timeHint: 'Friday evening, spring 1832' }),
    scene(7, 'Come Along, Young Ones', 'The barber drives the two lost children out, and Gavroche offers to take them with him.', 'orme-saint-gervais-barber-shop', [
      ['gavroche', 'Runs after the crying boys and promises guidance.'],
      ['thenardier-younger-boy', 'Enters with his brother and later says they have nowhere to sleep.'],
      ['thenardier-youngest-boy', 'Cries as the barber rejects them and follows his brother.'],
      ['orme-saint-gervais-barber', 'Pushes the boys back into the cold and shuts the door.'],
    ], 'Paragraphs 7–16 introduce the lost boys into Gavroche’s story without mutual recognition of kinship. Ages seven and five are approximate appearances; the intended alms request is not clearly heard.'),
    scene(17, 'The Shawl Given Away', 'On the way toward the Bastille Gavroche mocks passers-by and gives his own covering to a cold beggar-girl.', 'rue-saint-antoine', [
      ['gavroche', 'Gives up his woollen shawl and resumes walking in the rain.'],
      ['thenardier-younger-boy', 'Keeps close behind the guide with his brother.'],
      ['thenardier-youngest-boy', 'Follows through the street and rain.'],
      ['saint-antoine-beggar-girl', 'Receives the shawl without speaking.'],
    ], 'Paragraphs 17–43 contain several street retorts and the actual gift. Calling the barber English is an insult, not established nationality. The beggar-girl is not identified as Éponine or Azelma.', { items: ['gavroche-woollen-shawl'] }),
    scene(44, 'A Sou of White Bread', 'Gavroche finds one sou and buys bread for all three, keeping the smallest share.', 'saint-antoine-bakery', [
      ['gavroche', 'Pays for white bread and gives the elder boy the largest piece.'],
      ['thenardier-younger-boy', 'Describes their lost household and eats the offered bread.'],
      ['thenardier-youngest-boy', 'Eats his share with the others.'],
      ['saint-antoine-baker', 'Changes to white bread at the guide’s insistence and cuts it in three.'],
    ], 'Paragraphs 44–90 show actual food and payment, unlike the earlier soap plan. The children’s mama is their remembered caregiver with Miss; Gavroche does not connect the clue to their biological family.'),
    scene(91, 'Montparnasse in Blue Spectacles', 'The group meets Montparnasse, who reports Babet’s escape and reveals a hidden blade in his cane.', 'rue-des-ballets-archway', [
      ['gavroche', 'Recognizes the disguise and accidentally draws the cane’s concealed dagger.'],
      ['montparnasse', 'Draws the child out of sight and relates Babet’s escape that morning.'],
      ['thenardier-younger-boy', 'Follows into shelter holding his brother’s hand.'],
      ['thenardier-youngest-boy', 'Stays with his brother during the adult conversation.'],
    ], 'Paragraphs 91–129 contain a reported Conciergerie escape, not an escape witnessed here. The cane’s gendarme is a joke about the weapon, not a hidden officer.', { mentioned: ['babet'], items: ['montparnasse-dagger-cane'] }),
    scene(130, 'The Elephant Address', 'Montparnasse mentions the missing purse, learns Gavroche’s lodging and changes his disguise before warning of nearby police.', 'rue-des-ballets-archway', [
      ['gavroche', 'Keeps silent about taking the purse and gives the elephant as his home.'],
      ['montparnasse', 'Changes his nose with cotton-wrapped quills and gives a coded caution.'],
      ['thenardier-younger-boy', 'Watches the altered face with dawning amusement.'],
      ['thenardier-youngest-boy', 'Looks back at the man he takes for Punchinello.'],
    ], 'Paragraphs 130–181 connect the earlier purse theft without revealing it to its victim. The dog, knife and wife phrase is a sound-based police warning, not proof of an actual spouse or dog. A sergeant is nearby, but no arrest occurs.'),
    part(182, 'The Model at the Bastille', 'The narrator describes Napoleon’s abandoned elephant model and its contrast with the July column.', 'bastille-elephant',
      'Paragraphs 182–189 pause for architecture and later hindsight. This is timber, masonry and plaster, not a living elephant; its later disappearance is not destruction on the current night. The historical child prosecuted is not automatically Gavroche.', { kind: 'exposition' }),
    scene(190, 'The Ladder Between the Forelegs', 'Gavroche helps both boys climb into the model through the narrow belly opening.', 'bastille-elephant-entrance', [
      ['gavroche', 'Climbs without the ladder, pulls the elder inside and then boosts the younger.'],
      ['thenardier-younger-boy', 'Climbs hesitantly and helps receive his little brother.'],
      ['thenardier-youngest-boy', 'Is pushed and pulled inside after being set on the ladder.'],
    ], 'Paragraphs 190–215 give the real access sequence. The borrowed timber-yard ladder is kicked down afterward; no porter actually lives at this shelter.'),
    part(216, 'What the Monument Shelters', 'The narrator considers the model’s unexpected value as a refuge for a homeless child.', 'bastille-elephant',
      'Paragraphs 216–217 are reflection and access description. Having no father or mother expresses abandonment here, not literal parental death; the monument’s pity is personification.', { kind: 'exposition' }),
    scene(218, 'A Light in the Wooden Skeleton', 'Inside, Gavroche blocks the entry, lights a resin wick and guides the frightened guests to his protected bed.', 'bastille-elephant-interior', [
      ['gavroche', 'Closes the aperture with a plank and shows the bed behind weighted wire netting.'],
      ['thenardier-younger-boy', 'Enters the sleeping enclosure and asks about its purpose.'],
      ['thenardier-youngest-boy', 'Clings to his brother and begins to feel warm under the blanket.'],
    ], 'Paragraphs 218–265 distinguish the wick called cellar rat from living rats. The net, mat and blanket are real; their zoo origins are Gavroche’s account, not a current theft at the Jardin des Plantes.'),
    scene(266, 'Thunder Over the Roof', 'The guide teaches his guests slang, promises adventures and comforts them during the storm before putting out the light.', 'bastille-elephant-interior', [
      ['gavroche', 'Promises future outings and settles the startled boys before extinguishing the wick.'],
      ['thenardier-younger-boy', 'Questions the guide and notices the fire risk.'],
      ['thenardier-youngest-boy', 'Starts up in fright at the thunder before being settled again.'],
    ], 'Paragraphs 266–288 contain future plans, not executed theatre visits or an execution attendance. Lightning is actual weather; divine candle language is the guide’s joke. No fire breaks out.'),
    scene(289, 'The Hand Against the Rats', 'Rats gather on the wire as Gavroche reassures the youngest, holding his hand until all three sleep.', 'bastille-elephant-interior', [
      ['gavroche', 'Explains the sounds, gives reassurance and takes the small boy’s hand.'],
      ['thenardier-youngest-boy', 'Fears the rats until the offered hand calms him.'],
      ['thenardier-younger-boy', 'Sleeps between the two as the protected bed holds.'],
    ], 'Paragraphs 289–324 confirm real rats outside the intact net, not attacks on the children. The eaten cat is a reported earlier event. Patrols pass without finding the shelter; no arrest happens.'),
    scene(325, 'Kirikikiou Before Dawn', 'Montparnasse returns to summon Gavroche, who leaves the boys behind the closed net and goes with him.', 'bastille-elephant-entrance', [
      ['montparnasse', 'Calls the agreed cry and asks the child to come help.'],
      ['gavroche', 'Closes the net carefully after leaving it and descends to join the caller.'],
    ], 'Paragraphs 325–339 distinguish the distant guard-house from the unobserved elephant side. The boys remain asleep inside; the requested task has not yet been explained.', { mentioned: ['thenardier-younger-boy', 'thenardier-youngest-boy'], timeHint: 'The hour before dawn' }),
  ]],
  [251, [
    part('start', 'The Escape Prepared', 'The narrator returns to La Force to explain the escape planned by four prisoners and assisted from outside.', 'la-force',
      'Paragraphs 0–3 establish the plan and Brujon’s preparations. Babet has already escaped that morning; his presence in the plan does not put him back inside the prison.', { items:['brujon-escape-rope'], mentioned: ['brujon', 'gueulemer', 'babet', 'thenardier', 'montparnasse'] }),
    part(4, 'The New Building and Fine Air', 'Scaffolding, stacked dormitories and a common chimney offer a dangerous route through the prison.', 'la-force-new-building',
      'Paragraphs 4–16 explain architecture and confinement. Thénardier occupies a separate upper cage. The means by which he obtains narcotic wine are explicitly unexplained; general corruption is not proof of a particular accomplice.', { kind: 'exposition', mentioned: ['thenardier', 'brujon', 'gueulemer'] }),
    scene(17, 'Through the Chimney', 'Brujon and Guelemer break through the chimney, cross to the outer wall and escape through the bath establishment.', 'la-force-new-building', [
      ['brujon', 'Pierces the chimney with a nail and climbs out with his companion.'],
      ['gueulemer', 'Escapes over the wall and through the bath courtyard with Brujon.'],
    ], 'Paragraphs 17–20 dramatize the two-man escape during the thunderstorm. Other inmates pretend to sleep. The two reach the street before meeting the outside accomplices; no companion is moved into the lower dormitory.', {items:['brujon-escape-rope']}),
    scene(21, 'The Accomplices Outside', 'After reaching the street, Brujon and Gueulemer join Babet and Montparnasse near the prison.', 'la-force', [
      ['brujon', 'Joins the waiting men after escaping and breaking the rope during its recovery.'],
      ['gueulemer', 'Reaches the outside group with scratched hands after the descent and passage through the bath courtyard.'],
      ['babet', 'Is outside near the prison when the two fugitives join him.'],
      ['montparnasse', 'Waits outside with Babet and is joined by the escaped pair.'],
    ], 'Paragraphs 21–22 place all four outside after the escape. The general city-scale La Force context does not assert a measured street position or put them back inside its walls.', {items:['brujon-escape-rope', 'brujon-rope-fragment']}),
    part(23, 'The Empty Cage', 'Thénardier sees the escaping men; later inspection reveals a drugged guard, openings and missing equipment.', 'la-force-fine-air',
      'Paragraphs 23–28 combine the prisoner’s observation with the later inspection. The conscript is drugged, not killed. Two o’clock relief and four o’clock discovery are stated, but the following account places Thénardier on the ruin shortly after one; retain this source discrepancy.', { items:['la-force-drugged-wine-bottle'], mentioned: ['thenardier'] }),
    part(29, 'A Route the Narrator Cannot Explain', 'Thénardier reaches the high wall above a ruined enclosure but lacks enough rope to descend.', 'rue-roi-sicile-ruin-wall',
      'Paragraphs 29–38 propose incompatible possible routes and explicitly leave the actual route unknown. Escape inspiration is figurative, not a supernatural ability. His hands, elbows and knees are injured; no precise route or reliable harmonized time should be invented.', { items:['brujon-rope-fragment'], mentioned: ['thenardier'] }),
    scene(39, 'Four Men Below the Wall', 'As the prison alarm rises, four escaped associates enter the ruined enclosure and debate whether to abandon Thénardier.', 'rue-roi-sicile-ruin-enclosure', [
      ['thenardier', 'Listens from the narrow wall while search lights and alarms approach.'],
      ['brujon', 'Argues that the missing prisoner has been caught and they should leave.'],
      ['babet', 'Speaks in a changed voice and urges departure.'],
      ['gueulemer', 'Waits below with the three other men.'],
      ['montparnasse', 'Insists on waiting for the missing associate.'],
    ], 'Paragraphs 39–58 establish the four men by speech and description. Montparnasse is only perhaps an almost son-in-law; no completed marriage is established.', {items:['brujon-escape-rope']}),
    scene(59, 'The Rope He Cannot Tie', 'Thénardier drops his rope fragment, but his numbed hands cannot fasten the joined line, so Montparnasse goes for a child.', 'rue-roi-sicile-ruin-enclosure', [
      ['thenardier', 'Shows himself above the men and admits that he cannot move his frozen hands.'],
      ['brujon', 'Recognizes the fallen fragment as part of his rope.'],
      ['babet', 'Calls attention to the dropped rope.'],
      ['gueulemer', 'Remains with the men beneath the inaccessible wall.'],
      ['montparnasse', 'Leaves toward the Bastille to fetch someone small enough to climb.'],
    ], 'Paragraphs 59–85 turn a possible rope descent into a need for a climber. The flue is cracked and narrow; Gavroche has not yet arrived.', {items:['brujon-escape-rope', 'brujon-rope-fragment']}),
    scene(86, 'A Child for the Flue', 'Montparnasse returns with Gavroche and explains the climb required to secure the rope.', 'rue-roi-sicile-ruin-enclosure', [
      ['montparnasse', 'Returns with the boy and describes the upper window fastening.'],
      ['gavroche', 'Examines the task, jokes with the men and removes his shoes.'],
      ['brujon', 'Waits below as the rescue is arranged.'],
      ['babet', 'Remains among the waiting associates.'],
      ['gueulemer', 'Stands ready beside the hut beneath the flue.'],
      ['thenardier', 'Remains stranded above the enclosure.'],
    ], 'Paragraphs 86–107 explain the task before the climb. The two sheltered boys remain at the elephant and do not join this rescue.'),
    scene(108, 'It Is My Father', 'Gavroche recognizes Thénardier, climbs with the rope in his teeth and secures it so his father can descend.', 'rue-roi-sicile-ruin-wall', [
      ['gavroche', 'Recognizes his father and knots the rope to the upper window crossbar.'],
      ['gueulemer', 'Lifts the child onto the hut roof and gives him the knotted rope.'],
      ['thenardier', 'Leans over the wall and descends to the street on the secured line.'],
    ], 'Paragraphs 108–112 explicitly give the child’s recognition. The father’s reciprocal recognition is not established here; the other associates remain below outside the climbing action.', { items:['brujon-escape-rope', 'brujon-rope-fragment'], mentioned: ['babet', 'brujon', 'montparnasse'] }),
    scene(113, 'The Rue Plumet Plan Again', 'Revived by escape, Thénardier asks about criminal prospects and the men revisit the rejected Rue Plumet scheme.', 'rue-roi-sicile-ruin-enclosure', [
      ['thenardier', 'Recovers his energy and wants to reconsider the Rue Plumet undertaking.'],
      ['brujon', 'Participates in the discussion of the earlier warning about the house.'],
      ['babet', 'Stays with the escaped group during its renewed planning.'],
      ['gueulemer', 'Remains with the associates after the successful descent.'],
      ['montparnasse', 'Joins the exchange about the abandoned burglary.'],
      ['gavroche', 'Waits nearby after completing the rescue.'],
    ], 'Paragraphs 113–122 return to the biscuit reply and Éponine’s report. Criminal slang about eating someone is not literal cannibalism. Sudden mental revival does not establish healed wounds.', { mentioned: ['eponine'], items: ['rue-plumet-biscuit-reply'] }),
    scene(123, 'The Son Goes Back to the Children', 'Ignored by his father, Gavroche puts on his shoes and leaves to wake his guests; Babet then identifies him to Thénardier.', 'rue-roi-sicile-ruin-enclosure', [
      ['gavroche', 'Waits in vain for paternal notice, then leaves to get the two boys out of bed.'],
      ['thenardier', 'Shows indifference even when Babet tells him the rescuer was his son.'],
      ['babet', 'Suggests to Thénardier that the departed rescuer was his son.'],
      ['brujon', 'Departs with the adult group after the rescue.'],
      ['gueulemer', 'Leaves the enclosure with the other adults.'],
      ['montparnasse', 'Goes away with the escaped associates.'],
    ], 'Paragraphs 123–133 preserve the asymmetry between the child’s recognition and the father’s neglect. The promised return to the sleeping boys is an intention here, not a completed waking scene.', { mentioned: ['thenardier-younger-boy', 'thenardier-youngest-boy'] }),
  ]],
]
