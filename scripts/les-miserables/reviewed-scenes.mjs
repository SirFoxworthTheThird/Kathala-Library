import { bookSecondReview } from './reviewed-book-second.mjs'
import { bookThirdReview } from './reviewed-book-third.mjs'
import { bookFourthReview } from './reviewed-book-fourth.mjs'
import { bookFifthReview } from './reviewed-book-fifth.mjs'
import { bookSixthReview } from './reviewed-book-sixth.mjs'
import { bookSeventhReview } from './reviewed-book-seventh.mjs'
import { bookEighthReview } from './reviewed-book-eighth.mjs'
import { volumeTwoBookFirstReview } from './reviewed-volume-two-book-first.mjs'
import { volumeTwoBookSecondReview } from './reviewed-volume-two-book-second.mjs'
import { volumeTwoBookThirdReview } from './reviewed-volume-two-book-third.mjs'
import { volumeTwoBookFourthReview } from './reviewed-volume-two-book-fourth.mjs'
import { volumeTwoBookFifthReview } from './reviewed-volume-two-book-fifth.mjs'
import { volumeTwoBookSixthReview } from './reviewed-volume-two-book-sixth.mjs'
import { volumeTwoBookSeventhReview } from './reviewed-volume-two-book-seventh.mjs'
import { volumeTwoBookEighthReview } from './reviewed-volume-two-book-eighth.mjs'
import { volumeThreeBookFirstReview } from './reviewed-volume-three-book-first.mjs'
import { volumeThreeBookSecondReview } from './reviewed-volume-three-book-second.mjs'
import { volumeThreeBookThirdReview } from './reviewed-volume-three-book-third.mjs'
import { volumeThreeBookFourthReview } from './reviewed-volume-three-book-fourth.mjs'
import { volumeThreeBookFifthReview } from './reviewed-volume-three-book-fifth.mjs'
import { volumeThreeBookSixthReview } from './reviewed-volume-three-book-sixth.mjs'
import { volumeThreeBookSeventhReview } from './reviewed-volume-three-book-seventh.mjs'
import { volumeThreeBookEighthReview } from './reviewed-volume-three-book-eighth.mjs'
import { volumeFourBookFirstReview } from './reviewed-volume-four-book-first.mjs'
import { volumeFourBookSecondReview } from './reviewed-volume-four-book-second.mjs'
import { volumeFourBookThirdReview } from './reviewed-volume-four-book-third.mjs'
import { volumeFourBookFourthReview } from './reviewed-volume-four-book-fourth.mjs'
import { volumeFourBookFifthReview } from './reviewed-volume-four-book-fifth.mjs'
import { volumeFourBookSixthReview } from './reviewed-volume-four-book-sixth.mjs'
import { volumeFourBookSeventhReview } from './reviewed-volume-four-book-seventh.mjs'
import { volumeFourBookEighthReview } from './reviewed-volume-four-book-eighth.mjs'
import { volumeFourBookNinthReview } from './reviewed-volume-four-book-ninth.mjs'
import { volumeFourBookTenthReview } from './reviewed-volume-four-book-tenth.mjs'
import { volumeFourBookEleventhReview } from './reviewed-volume-four-book-eleventh.mjs'
import { volumeFourBookTwelfthReview } from './reviewed-volume-four-book-twelfth.mjs'
import { volumeFourBookThirteenthReview } from './reviewed-volume-four-book-thirteenth.mjs'
import { volumeFourBookFourteenthReview } from './reviewed-volume-four-book-fourteenth.mjs'
import { volumeFourBookFifteenthReview } from './reviewed-volume-four-book-fifteenth.mjs'
import { volumeFiveBookFirstReview } from './reviewed-volume-five-book-first.mjs'
import { volumeFiveBookSecondReview } from './reviewed-volume-five-book-second.mjs'
import { volumeFiveBookThirdReview } from './reviewed-volume-five-book-third.mjs'
import { volumeFiveBookFourthReview } from './reviewed-volume-five-book-fourth.mjs'
import { volumeFiveBookFifthReview } from './reviewed-volume-five-book-fifth.mjs'
import { volumeFiveBookSixthReview } from './reviewed-volume-five-book-sixth.mjs'
import { volumeFiveBookSeventhReview } from './reviewed-volume-five-book-seventh.mjs'
import { volumeFiveBookEighthReview } from './reviewed-volume-five-book-eighth.mjs'
import { volumeFiveBookNinthReview } from './reviewed-volume-five-book-ninth.mjs'

// Cuts are reviewed against read-chapter.mjs paragraph numbers, not inferred
// from name mentions. Exposition has no invented physical cast or snapshots.
const scene = (at, title, description, location, present, reason, extra = {}) => ({
  at, title, description, location, present, reason, ...extra,
})

export const reviewedChapters = new Map([
  [1, [
    scene('start', 'Preface', 'Hugo states the social conditions to which the novel responds.', null, [],
      'Authorial address before the first volume; no fictional participants.', { kind: 'apparatus' }),
    scene('volume', 'The Bishop of D——', 'The narrator introduces Myriel through conflicting reports of his earlier life and return to France as a priest.', 'digne', [],
      'Volume heading and retrospective biography precede the first dramatized encounter.', { kind: 'exposition', mentioned: ['myriel'] }),
    scene(4, 'In the Cardinal’s Anteroom', 'A parish errand brings Myriel before Napoleon, and the priest answers the Emperor’s abrupt question.', 'fesch-antechamber', [
      ['myriel', 'Answers the Emperor’s challenge by distinguishing goodness from greatness.'],
      ['napoleon', 'Questions the elderly priest whose curious gaze has caught his attention.'],
    ], 'Paragraph 4 moves from biography to a specific Paris encounter around the coronation.', { kind: 'scene', timeHint: 'Paris, around the 1804 coronation; narrated retrospectively' }),
    scene(7, 'An Appointment Reported', 'Napoleon asks Fesch about the priest, and Myriel learns of his unexpected appointment.', 'paris', [],
      'The exchange ends; the paragraph reports later inquiries and appointment rather than showing everyone together.', { kind: 'reported', mentioned: ['myriel', 'napoleon', 'fesch'] }),
    scene(8, 'The Town’s Rumours', 'The narrator distinguishes uncertain stories about the newcomer from the reputation established during his years at D——.', 'digne', [],
      'The narrative returns from the imperial anecdote to the reliability and disappearance of local gossip.', { kind: 'exposition', mentioned: ['myriel'] }),
    scene(11, 'The Episcopal Household', 'Myriel arrives with his sister and their housekeeper and is installed in the episcopal palace.', 'digne-palace', [
      ['myriel', 'Takes up the bishopric and receives the official calls required by his office.'],
      ['baptistine', 'Accompanies her brother to his new household at D——.'],
      ['magloire', 'Becomes both Baptistine’s maid and the new bishop’s housekeeper.'],
    ], 'Paragraph 11 introduces the arriving household; the following portraits and installation belong to that introduction.', { kind: 'scene', timeHint: 'Installation in 1806, recalled from the 1815 opening' }),
  ]],
  [2, [
    scene('start', 'Palace and Hospital', 'The episcopal residence and its crowded neighbouring hospital are set beside one another.', 'digne', [],
      'Architectural comparison establishes the two places before the visit begins.', { kind: 'exposition' }),
    scene(3, 'A Visit to the Wards', 'After inspecting the hospital, Myriel asks its director to come to his house.', 'digne-hospital', [
      ['myriel', 'Inspects the crowded hospital and requests a meeting with its director.'],
    ], 'Paragraph 3 gives a definite hospital visit before the conversation at the palace.', { kind: 'scene' }),
    scene(4, 'A Dining Room for Beds', 'In the palace gallery, the director describes the lack of space and Myriel offers an exchange of buildings.', 'digne-palace-gallery', [
      ['myriel', 'Measures his dining room for beds and offers the palace to the hospital.'],
      ['hospital-director', 'Explains the cramped wards and is astonished by the proposed exchange.'],
    ], 'Paragraph 4 opens direct dialogue; paragraph 16 explicitly locates it in the palace gallery.', { kind: 'scene' }),
    scene(23, 'The Household Budget', 'The exchange is carried out, and Myriel allocates nearly all his salary to charitable uses.', 'bishop-house', [
      ['myriel', 'Moves into the old hospital and sets aside most of his salary for others.'],
      ['baptistine', 'Accepts the reduced household income and administers it with care.'],
      ['magloire', 'Grumbles about the small allowance while making it feed the household and guests.'],
    ], 'Paragraph 23 moves the household into the former hospital; the budget and the women’s responses describe that new arrangement.', { kind: 'scene' }),
    scene(30, 'An Unclaimed Allowance', 'Magloire reminds Myriel of the travel allowance he has not requested.', 'bishop-house', [
      ['myriel', 'Accepts Magloire’s reminder and applies for the diocesan travel allowance.'],
      ['magloire', 'Points out the neglected allowance in hope of easing the household’s finances.'],
    ], 'Paragraph 30 introduces a new conversation about three months after the arrival.', { kind: 'scene' }),
    scene(35, 'The Carriage Grant', 'The council votes the allowance, provoking an angry senator’s accusation of clerical extravagance.', 'digne', [],
      'Council decision and quoted correspondence are reported, not a meeting of Myriel, his household, and the senator.', { kind: 'reported', mentioned: ['myriel'] }),
    scene(38, 'Magloire Counts the Gain', 'Magloire tells Baptistine that the new grant will at last provide money for their own household.', 'bishop-house', [
      ['magloire', 'Counts the three thousand francs as a long-awaited improvement for the household.'],
      ['baptistine', 'Hears Magloire’s expectation that the allowance will now support them.'],
    ], 'Paragraph 38 explicitly gives a conversation between the two women, before the bishop’s memorandum.', { kind: 'scene' }),
    scene(39, 'A Second Memorandum', 'Myriel hands his sister a fresh allocation giving the carriage allowance to charitable purposes.', 'bishop-house', [
      ['myriel', 'Assigns the entire travel grant to patients, maternity charities, foundlings, and orphans.'],
      ['baptistine', 'Receives the memorandum allocating the money Magloire expected them to keep.'],
    ], 'Paragraph 39 is a later hand-off to Baptistine; the source does not put Magloire in that exchange.', { kind: 'scene' }),
    scene(43, 'The Name Bienvenu', 'The account of Myriel’s charitable administration explains why the poor call him Bienvenu.', 'digne', [],
      'The chapter returns to recurring practices and the narrator’s naming convention, rather than a particular meeting.', { kind: 'exposition', mentioned: ['myriel'] }),
  ]],
  [3, [
    scene('start', 'The Mountain Diocese', 'The size and terrain of the diocese explain the bishop’s journeys on foot, by cart, and by donkey.', 'digne-diocese', [],
      'A general travel description names no single visit or fixed group; the women accompany only some journeys.', { kind: 'exposition', mentioned: ['myriel', 'baptistine', 'magloire'] }),
    scene(2, 'A Donkey at Senez', 'The mayor receives a bishop riding a donkey and hears his answer to the town’s surprise.', 'senez-gate', [
      ['myriel', 'Explains that necessity rather than religious vanity has brought him on a donkey.'],
      ['senez-mayor', 'Receives the modestly mounted bishop with visible scandal and hears his reply.'],
    ], 'Paragraph 2 shows a particular arrival and exchange at the Senez gate.', { kind: 'scene' }),
    scene(3, 'Examples from Other Valleys', 'Myriel’s pastoral teaching draws practical examples of mutual aid, justice, and education from neighbouring communities.', 'digne-diocese', [],
      'Paragraphs 3–5 summarize sermons across multiple villages. People inside the quoted examples are not participants at a single scene.', { kind: 'exposition', mentioned: ['myriel'] }),
  ]],
  [4, [
    scene('start', 'A Book Beyond His Reach', 'Myriel answers Magloire’s fond use of his title by asking for a chair to reach a high shelf.', 'bishop-house-library', [
      ['myriel', 'Asks for a chair and jokes that his episcopal greatness cannot reach the shelf.'],
      ['magloire', 'Is asked to help the bishop reach a book above his height.'],
    ], 'Paragraph 0 contains a definite domestic exchange after the introductory remarks on his manner.', { kind: 'scene' }),
    scene(1, 'The Countess’s Expectations', 'A wealthy cousin lists her sons’ prospective inheritances and receives an answer about hoping in the living.', 'digne', [
      ['myriel', 'Challenges his cousin’s preoccupation with the fortunes her sons will inherit.'],
      ['comtesse-de-lo', 'Repeats her sons’ expectations and notices the bishop’s unusual silence.'],
    ], 'Paragraph 1 changes visitor and occasion; the source does not identify the room.', { kind: 'scene' }),
    scene(2, 'Titles on a Death Notice', 'An elaborate announcement of a gentleman’s death prompts Myriel to question the vanity surrounding a tomb.', 'digne', [
      ['myriel', 'Reads the crowded titles on a death notice and protests the vanity laid upon the dead.'],
    ], 'Paragraph 2 marks another separate occasion, without an identified interlocutor.', { kind: 'scene' }),
    scene(3, 'A Sou at the Cathedral', 'A merchant’s grudging alms after a sermon provoke Myriel’s quiet comment to his sister.', 'digne-cathedral-door', [
      ['myriel', 'Points out to his sister how cheaply Géborand hopes to purchase salvation.'],
      ['baptistine', 'Hears her brother’s remark as they observe the merchant giving alms.'],
      ['geborand', 'Gives one sou for six beggar-women after hearing a sermon about charity.'],
    ], 'The paragraph recounts the sermon as background, then locates the observed donation at the cathedral door. Its unnamed earlier preacher is not in this encounter.', { kind: 'scene' }),
    scene(4, 'The Marquis’s Own Poor', 'Myriel asks Champtercier for a contribution and turns the refusal into a request to take responsibility for his poor.', 'digne-drawing-room', [
      ['myriel', 'Answers the refusal by offering to take over care of the marquis’s poor.'],
      ['champtercier', 'Refuses a contribution on the ground that he has poor people of his own.'],
    ], 'Paragraph 4 begins a distinct drawing-room appeal with a named interlocutor.', { kind: 'scene' }),
    scene(5, 'The Price of Air', 'In a cathedral sermon, Myriel connects inadequate housing and disease with the tax on openings.', 'digne-cathedral', [
      ['myriel', 'Calls on his congregation to pity families confined to dark and unhealthy dwellings.'],
    ], 'Paragraph 5 explicitly introduces a sermon; paragraph 7 returns to a general account of his manner.', { kind: 'scene' }),
    scene(7, 'Circumstances Before Judgment', 'The narrator gathers Myriel’s teaching on poverty, ignorance, fault, and the responsibility of the powerful.', 'digne-diocese', [],
      'Paragraphs 7–16 synthesize habits and principles across occasions; they do not establish a simultaneous physical cast.', { kind: 'exposition', mentioned: ['myriel'] }),
    scene(17, 'The Advocate’s Cleverness', 'Listeners praise a prosecutor’s deception until Myriel asks where the prosecutor himself will be tried.', 'digne-drawing-room', [
      ['myriel', 'Questions the morality of the prosecutor’s fabricated proof of infidelity.'],
    ], 'Paragraph 17 introduces the drawing-room discussion. The accused couple and prosecutor are people inside the reported case, not guests in the room.', { kind: 'scene' }),
    scene(22, 'A Chaplain Refuses', 'A priest’s refusal to attend a condemned man is reported to Myriel, who declares the task his own.', 'digne', [],
      'The paragraph reports messages and a refusal before the prison visit; it does not put both priests and prisoner together.', { kind: 'reported', mentioned: ['myriel', 'condemned-prisoner'] }),
    scene(23, 'A Day in the Cell', 'Myriel stays with the condemned prisoner, taking his hand and offering consolation.', 'digne-prison-cell', [
      ['myriel', 'Remains in the cell without food or rest to comfort the terrified man.'],
      ['condemned-prisoner', 'Faces execution in despair and receives the bishop’s sustained comfort.'],
    ], 'Paragraph 23 places both men in the prison cell for the day.', { kind: 'scene' }),
    scene(24, 'Beside the Tumbril', 'When the prisoner is fetched the next day, Myriel accompanies him in episcopal dress.', 'digne-execution-route', [
      ['myriel', 'Follows the bound prisoner publicly while wearing his cross and purple camail.'],
      ['condemned-prisoner', 'Is taken from the cell with the bishop still beside him.'],
    ], 'Paragraph 24 moves to the following day and the public procession.', { kind: 'scene' }),
    scene(25, 'On the Scaffold', 'Myriel embraces the condemned man at the guillotine and returns home profoundly affected.', 'digne-scaffold', [
      ['myriel', 'Embraces and blesses the condemned man immediately before the execution.'],
      ['condemned-prisoner', 'Faces the falling blade with hope restored by the bishop’s presence.'],
    ], 'Paragraph 25 stages the execution; the homecoming at its close is reported within the same source paragraph, not a separate scene placing Baptistine at the scaffold.', { kind: 'scene', reportedAfter: ['bishop-house'], mentioned: ['baptistine'] }),
    scene(26, 'The Instrument of Justice', 'The narrator contrasts public reactions with the violent impression made by the guillotine.', 'digne', [],
      'Paragraphs 26–30 shift from the incident to moral reflection on capital punishment.', { kind: 'exposition', mentioned: ['myriel'] }),
    scene(31, 'A Question Overheard', 'Baptistine hears her brother ask what right human beings have to take a life.', 'bishop-house', [
      ['myriel', 'Remains shaken by the execution and questions human authority over death.'],
      ['baptistine', 'Overhears and preserves her brother’s troubled evening monologue.'],
    ], 'Paragraph 31 gives a particular overheard utterance; paragraph 32 reports its continuing effect.', { kind: 'scene' }),
    scene(33, 'Consolation and Hope', 'Myriel’s care for the sick, dying, and bereaved is described as a duty of listening as well as speech.', 'digne-diocese', [],
      'The closing paragraphs describe recurring pastoral care without a particular bedside or named family.', { kind: 'exposition', mentioned: ['myriel'] }),
  ]],
  [5, [
    scene('start', 'A Day of Work and Alms', 'A description of Myriel’s ordinary day follows worship, diocesan business, visits, frugal meals, and private reading.', 'bishop-house', [],
      'The chapter is an account of repeated daily routines and manuscripts, not a single day with one simultaneous cast. No fabricated daily-state snapshots are added.', { kind: 'exposition', mentioned: ['myriel', 'baptistine', 'magloire'] }),
  ]],
  [6, [
    scene('start', 'Rooms and Silver', 'The narrator describes the former hospital, its sparse furnishings, the bishop’s silver, and the household’s arrangements.', 'bishop-house', [],
      'Paragraphs 0–17 give spatial and material exposition, with recollections rather than a single gathering. Portrait subjects are not present characters.', { kind: 'exposition', mentioned: ['myriel', 'baptistine', 'magloire'], items: ['silver-tableware', 'silver-candlesticks'] }),
    scene(18, 'Flowers in the Fourth Plot', 'Magloire questions the use of a garden plot for flowers, and Myriel defends beauty as useful.', 'bishop-garden', [
      ['myriel', 'Defends his flower beds against the suggestion that he should grow more food.'],
      ['magloire', 'Suggests replacing the bishop’s flowers with lettuces.'],
    ], 'Paragraph 18 contains a specific exchange about the four garden plots.', { kind: 'scene' }),
    scene(19, 'The Evening Watering', 'The narrator describes Myriel’s pleasure in tending flowers without scientific pretensions.', 'bishop-garden', [],
      'Paragraph 19 returns to recurring practice rather than extending the preceding conversation.', { kind: 'exposition', mentioned: ['myriel'], items: ['green-watering-pot'] }),
    scene(20, 'The Unbolted Door', 'Myriel’s decision to leave his house open troubles the two women and accompanies notes about the duties of hospitality.', 'bishop-house-entrance', [
      ['myriel', 'Leaves the public entrance unbolted and permits the women to secure their own rooms.'],
      ['baptistine', 'Accepts her brother’s confidence in the open house, at least in her conduct.'],
      ['magloire', 'Still feels occasional fear of the entrance left open day and night.'],
    ], 'Paragraph 20 records the household’s response and Myriel’s words to both women; the following marginal notes explain that decision.', { kind: 'scene' }),
    scene(23, 'A Visitor Questions the Latch', 'An unnamed visiting curate questions the open door and hears Myriel answer with a Psalm.', 'bishop-house', [
      ['myriel', 'Answers the visitor’s warning by placing the house under divine rather than mechanical protection.'],
      ['visiting-cure', 'Questions whether leaving the door unlocked invites misfortune.'],
    ], 'Paragraph 23 introduces a definite visitor. The narrator cannot determine which of two parishes he serves; neither identity is asserted.', { kind: 'scene', mentioned: ['magloire'] }),
  ]],
  [7, [
    scene('start', 'A Band in the Mountains', 'The narrator traces the spread of Cravatte’s robberies through the Alpine district.', 'ubaye-district', [],
      'The opening reports earlier movements and thefts across several places. It does not stage a meeting with the bandit.', { kind: 'exposition', mentioned: ['myriel', 'cravatte'] }),
    scene(2, 'The Mayor’s Warning', 'The mayor warns Myriel away from the mountain roads, but the bishop refuses an armed escort.', 'chastelar', [
      ['myriel', 'Insists on visiting the isolated community and refuses the protection of gendarmes.'],
      ['chastelar-mayor', 'Warns that Cravatte controls the roads and urges the bishop not to go.'],
    ], 'Paragraph 2 moves from the reported robberies to a specific warning and sustained exchange.', { kind: 'scene', mentioned: ['cravatte'] }),
    scene(24, 'Only a Child to Guide Him', 'Myriel sets out with a child as guide and without a police escort.', 'chastelar-mountain-route', [
      ['myriel', 'Leaves without gendarmes, taking only the child who offers to guide him.'],
      ['mountain-guide-child', 'Offers to lead the bishop along the mountain route.'],
    ], 'Paragraph 24 changes the participating pair and begins the journey.', { kind: 'scene' }),
    scene(25, 'A Poor Sacristy', 'After a fortnight with the shepherds, Myriel proposes a formal Te Deum despite the lack of vestments.', 'mountain-presbytery', [
      ['myriel', 'Proposes the service and asks the curate to announce it despite the missing ornaments.'],
      ['mountain-cure', 'Can offer only worn village vestments for the proposed ceremony.'],
    ], 'Paragraph 25 skips to the mountain stay and the discussion of the service. Baptistine and Magloire explicitly did not make the journey; the child is not placed in this discussion.', { kind: 'scene', timeHint: 'A fortnight after reaching the shepherds’ community' }),
    scene(28, 'A Chest from Cravatte', 'A delivered chest supplies the stolen ornaments of Embrun, provoking a disagreement over their providential origin.', 'mountain-presbytery', [
      ['myriel', 'Receives the stolen cathedral vestments and attributes their arrival to God.'],
      ['mountain-cure', 'Questions whether the rich gift has come from God or the Devil.'],
    ], 'Paragraph 28 introduces the chest and the exchange it provokes. The two unnamed couriers leave immediately; Cravatte is the sender, not a visitor.', { kind: 'scene', mentioned: ['cravatte'], items: ['embrun-vestment-chest'] }),
    scene(32, 'A Return to Chastelar', 'Myriel rejoins his sister and Magloire with the treasure received during the visit.', 'chastelar-priest-house', [
      ['myriel', 'Returns safely and tells his sister that he has brought back a cathedral’s treasure.'],
      ['baptistine', 'Meets her brother again after waiting for the mountain visit to end.'],
      ['magloire', 'Is waiting at Chastelar when the bishop comes back unharmed.'],
    ], 'Paragraph 32 explicitly changes location and reunites the three members of the household.', { kind: 'scene', items: ['embrun-vestment-chest'] }),
    scene(33, 'The Dangers Within', 'That evening Myriel tells his sister to fear prejudice and vice rather than other people.', 'chastelar-priest-house', [
      ['myriel', 'Urges prayer for a potential wrongdoer rather than precautions against him.'],
      ['baptistine', 'Receives her brother’s explanation of the trust that has frightened her.'],
    ], 'Paragraph 33 marks a later evening conversation, with paragraph 34 explicitly addressed to the sister; Magloire is not assumed to remain present.', { kind: 'scene' }),
    scene(35, 'The Uncertain Destination', 'The narrator declines to establish what became of the recovered treasure and quotes an ambiguous note.', 'digne', [],
      'The closing report explicitly withholds the final disposal of the treasure. No donation, ownership transfer, or cast encounter is invented.', { kind: 'reported', mentioned: ['myriel'], items: ['embrun-vestment-chest'] }),
  ]],
  [8, [
    scene('start', 'The Senator’s Philosophy', 'The narrator introduces the senator’s success, self-interest, and manner toward Myriel.', 'digne', [],
      'Paragraph 0 is a standing portrait, not the subsequent dinner.', { kind: 'exposition', mentioned: ['imperial-senator', 'myriel'] }),
    scene(1, 'Dessert at the Prefect’s', 'The senator explains his comfortable materialism over dessert, and Myriel exposes the privileges it excuses.', 'digne-prefecture-dining-room', [
      ['myriel', 'Answers the senator by showing how his private philosophy licenses privilege without responsibility.'],
      ['imperial-senator', 'Argues that the powerful should enjoy life while leaving religious consolation to the poor.'],
      ['digne-prefect', 'Hosts the dinner at which his two guests debate belief and self-interest.'],
    ], 'Paragraph 1 establishes the dinner with the prefect. The long speeches continue one encounter, without moving their quoted philosophers into the room.', { kind: 'scene' }),
  ]],
  [9, [
    scene('start', 'Baptistine’s December Letter', 'Baptistine writes to her childhood friend about Magloire’s discoveries, their modest household, and the trust her brother demands.', 'bishop-house', [
      ['baptistine', 'Writes to Boischevron about the house and her efforts not to resist her brother’s dangerous journeys.'],
    ], 'The chapter presents a dated letter. Its recipient, portraits, ancestors, children, and people recalled in earlier incidents are not simultaneous participants in its composition.', { kind: 'document', mentioned: ['myriel', 'magloire', 'boischevron'], items: ['baptistine-letter'], timeHint: '16 December, year printed as 18—; do not supply an unsupported year' }),
    scene(15, 'The Women’s Quiet Consent', 'The narrator comments on the two women’s understanding of the bishop’s character and their refusal to interfere with his decisions.', 'bishop-house', [],
      'Paragraph 15 ends the quoted letter and returns to generalized commentary.', { kind: 'exposition', mentioned: ['myriel', 'baptistine', 'magloire'] }),
  ]],
  [10, [
    scene('start', 'The Man in the Valley', 'Local hostility surrounds an elderly former conventionary whom Myriel feels obliged, but reluctant, to visit.', 'digne', [],
      'Paragraphs 0–10 combine the man’s isolation, the bishop’s hesitation, and the report of his approaching death. The shepherd’s search for a doctor is reported, not a meeting of all three.', { kind: 'exposition', mentioned: ['myriel', 'conventionary-g', 'g-shepherd'] }),
    scene(11, 'The Walk at Evening', 'Myriel takes his staff and cloak and sets out toward the isolated dwelling.', 'g-valley-path', [
      ['myriel', 'Overcomes his hesitation and walks toward the dying man’s home before sunset.'],
    ], 'Paragraph 11 begins the journey; the following paragraph places the bishop near the hut.', { kind: 'scene' }),
    scene(14, 'Milk at the Door', 'Myriel finds the old man in a chair outside his hut, attended by a boy offering milk.', 'g-hut-door', [
      ['myriel', 'Introduces himself but does not take the hand offered by the conventionary.'],
      ['conventionary-g', 'Receives his first visitor in years and calmly describes the paralysis approaching his heart.'],
      ['g-shepherd', 'Offers milk and remains with the dying man until told to go to bed.'],
    ], 'Paragraphs 14–15 disclose the two people at the hut. Paragraph 36 explicitly ends the boy’s participation outside.', { kind: 'scene', items: ['milk-jar'] }),
    scene(37, 'Justice and Innocence', 'Alone with G——, Myriel challenges the Revolution and is drawn into an argument about the equal claims of suffering children.', 'g-hut-door', [
      ['myriel', 'Begins in severity but concedes the equal dignity of children born to kings and to the poor.'],
      ['conventionary-g', 'Distinguishes opposing tyranny from killing a king and insists on mourning all innocent children.'],
    ], 'The boy is inside the hut after paragraph 36. The debate through paragraph 74 changes the bishop’s stated judgment without another physical participant.', { kind: 'scene' }),
    scene(75, 'The Bishop Is Questioned', 'G—— turns the inquiry toward the visitor’s own moral authority, then apologizes for using personal advantages in debate.', 'g-hut-door', [
      ['myriel', 'Bows his head under the challenge and does not claim credit for the charity unknown to his host.'],
      ['conventionary-g', 'Challenges the imagined wealth of the bishop, then apologizes for attacking his guest personally.'],
    ], 'Paragraph 75 explicitly reverses the direction of interrogation; paragraph 85 resumes the historical argument.', { kind: 'scene' }),
    scene(85, 'The Measure of Violence', 'The two men compare revolutionary violence with the violence of monarchy and religious persecution.', 'g-hut-door', [
      ['myriel', 'Is shaken by the comparison with Bossuet and finds no answer to the retort.'],
      ['conventionary-g', 'Defends the reasons for the Revolution while his failing breath interrupts his speech.'],
    ], 'Paragraph 85 returns from the personal challenge to the prior question of historical violence.', { kind: 'scene' }),
    scene(94, 'A Profession of Faith', 'Myriel’s final objection about atheism meets G——’s affirmation of God and the infinite.', 'g-hut-door', [
      ['myriel', 'Hears the man he judged impious affirm the existence of God.'],
      ['conventionary-g', 'Affirms his faith with an effort that brings him closer to death.'],
    ], 'Paragraph 94 introduces the bishop’s last remaining objection; the effort in paragraph 101 ends this part of the debate.', { kind: 'scene' }),
    scene(102, 'The Last Request', 'G—— recalls his service and persecution, and Myriel kneels to ask the dying man’s blessing.', 'g-hut-door', [
      ['myriel', 'Takes the failing man’s hand, asks for his blessing, and kneels before him.'],
      ['conventionary-g', 'Recounts his duties and dies after the bishop asks his blessing.'],
    ], 'Paragraph 102 shifts from argument to the final personal exchange; paragraph 108 explicitly reports death in the bishop’s presence.', { kind: 'scene', stateChanges: [{ character: 'conventionary-g', isAlive: false, evidenceParagraph: 108 }] }),
    scene(109, 'A Night of Prayer', 'Myriel returns home to pray through the night and answers the next morning’s questions with a gesture heavenward.', 'bishop-house', [
      ['myriel', 'Spends the night in prayer and declines to explain the visit to curious townspeople.'],
    ], 'Paragraph 109 explicitly moves back to the house after G——’s death. Neither G—— nor the shepherd is given a return-home snapshot.', { kind: 'scene' }),
    scene(110, 'The Visit Retold', 'The narrator describes the visit’s effect on Myriel and the hostile comments it prompts in town.', 'digne', [],
      'Paragraphs 110–113 are commentary and reports of general gossip, not a further bedside scene.', { kind: 'reported', mentioned: ['myriel', 'conventionary-g'] }),
    scene(114, 'A Red Cap', 'A dowager’s insinuation about revolutionary sympathies receives a reply about the colour of clerical hats.', 'digne', [
      ['myriel', 'Answers the red-cap taunt by recalling the colour revered in a cardinal’s hat.'],
      ['impertinent-dowager', 'Mocks the bishop’s visit by suggesting he should receive a revolutionary cap.'],
    ], 'The final paragraph begins a definite new encounter with a different speaker, at an unspecified place in D——.', { kind: 'scene' }),
  ]],
  [11, [
    scene('start', 'A Return to Earlier Years', 'The narrator qualifies the meaning of Myriel’s meeting with G—— before returning to his political history.', 'digne', [],
      'Paragraphs 0–2 are an explicit retrospective transition, not another gathering with the dead conventionary.', { kind: 'exposition', mentioned: ['myriel', 'conventionary-g'] }),
    scene(3, 'The Paris Synod', 'Myriel attends briefly at the bishops’ synod and returns to his diocese feeling out of place among the dignitaries.', 'notre-dame-paris', [
      ['myriel', 'Attends only one sitting and a few conferences before returning to his mountain diocese.'],
      ['fesch', 'Presides over the synod in which Myriel participates briefly.'],
    ], 'Paragraph 3 reports actual attendance at the synod, with Fesch explicitly its president; paragraph 4 continues Myriel’s explanation of his departure.', { kind: 'scene', timeHint: 'The synod opened on 15 June 1811; Myriel’s single attended sitting is not individually dated' }),
    scene(5, 'At a Colleague’s House', 'Myriel remarks on the cries of the poor he hears in a fellow bishop’s luxurious furnishings.', 'paris-prelate-house', [
      ['myriel', 'Tells his host that such costly furnishings would continually remind him of hungry and cold people.'],
      ['opulent-colleague', 'Hosts Myriel in the richly furnished house that draws his criticism.'],
    ], 'Paragraph 5 gives a separate evening at a colleague’s house. The account does not identify that host as Fesch.', { kind: 'scene' }),
    scene(6, 'Poverty and Political Bitterness', 'The narrator considers episcopal poverty, then records the limits of Myriel’s generosity toward the declining Emperor.', 'digne', [],
      'Paragraphs 6–11 move from moral commentary to political history and correspondence. Napoleon, the two brothers, and Myriel are not assumed to meet.', { kind: 'exposition', mentioned: ['myriel', 'napoleon'] }),
    scene(12, 'A Place for the Old Soldier', 'Myriel gives cathedral work to a dismissed Bonapartist porter after a gentle reprimand.', 'digne', [
      ['myriel', 'Reproves the dismissed porter and appoints him beadle despite their political disagreement.'],
      ['former-townhall-porter', 'Receives cathedral employment after his outspoken loyalty to Napoleon costs his family its livelihood.'],
    ], 'Paragraph 12 culminates in the bishop sending for the dismissed man; his wife and children are the affected family, not stated participants at that meeting.', { kind: 'scene' }),
    scene(13, 'The Town’s Reverence', 'The account closes on the affection accumulated during Myriel’s nine years at D——.', 'digne', [],
      'Paragraph 13 returns to the town’s collective judgment rather than a new physical encounter.', { kind: 'exposition', mentioned: ['myriel'] }),
  ]],
  [12, [
    scene('start', 'A Bishop Without a Court', 'The narrator contrasts ecclesiastical advancement with the absence of career-seekers around Myriel.', 'digne', [],
      'All four paragraphs form an essay on patronage and success. Illustrative historical names, ambitious priests in general, and Myriel’s habitual staff are not staged as a visiting cast.', { kind: 'exposition', mentioned: ['myriel'] }),
  ]],
  [13, [
    scene('start', 'Faith Without Hypocrisy', 'The narrator declines to define Myriel’s private orthodoxy but insists on the sincerity of his belief.', 'digne', [],
      'Paragraphs 0–1 distinguish the known character from unknowable inner doctrine.', { kind: 'exposition', mentioned: ['myriel'] }),
    scene(2, 'A Spider in the Garden', 'Unaware that his sister is behind him, Myriel pities a frightening spider.', 'bishop-garden', [
      ['myriel', 'Stops over a large spider and pities it instead of recoiling from its appearance.'],
      ['baptistine', 'Walks unseen behind her brother and hears his words of pity for the spider.'],
    ], 'Paragraph 2 moves from general benevolence to one morning’s garden incident; paragraph 3 supplies the utterance heard by Baptistine.', { kind: 'scene' }),
    scene(4, 'An Ant Underfoot', 'A further small incident records the cost of Myriel’s care for living creatures.', 'digne', [
      ['myriel', 'Sprains his ankle while trying not to tread on an ant.'],
    ], 'Paragraph 4 gives a separate occasion without locating it more narrowly; Baptistine is not placed at this second incident.', { kind: 'scene', stateChanges: [{ character: 'myriel', injury: 'sprained ankle', evidenceParagraph: 4 }] }),
    scene(5, 'The Countenance of Seventy-Five Years', 'The narrator contrasts reports of Myriel’s earlier temperament with the gentleness of his appearance in 1815.', 'digne', [],
      'Paragraphs 5–7 return to a retrospective portrait. The old Napoleon encounter is recalled, not repeated.', { kind: 'exposition', mentioned: ['myriel', 'napoleon'], timeHint: 'The age and year 1815 are explicit; do not infer a recovery date for the earlier sprain' }),
    scene(8, 'The Garden Beneath the Stars', 'The account follows Myriel’s custom of solitary contemplation after the women retire.', 'bishop-garden', [],
      'Paragraphs 8–11 describe repeated nightly meditation. The women hear him only sometimes from indoors; no simultaneous garden gathering is invented.', { kind: 'exposition', mentioned: ['myriel', 'baptistine', 'magloire'] }),
  ]],
  [14, [
    scene('start', 'The Gospel’s Path', 'The narrator explains Myriel’s preference for compassionate action over speculative systems.', 'digne', [],
      'Paragraphs 0–7 are interpretive commentary, not a new incident in the bishop’s life.', { kind: 'exposition', mentioned: ['myriel'] }),
    scene(8, 'The Senator’s Objection', 'The senator calls mutual love nonsense and Myriel answers that the soul may shelter within it.', 'digne', [
      ['myriel', 'Defends sheltering the soul in mutual love even when the senator dismisses it as nonsense.'],
      ['imperial-senator', 'Opposes the bishop’s ethic with the claim that the world is a struggle of all against all.'],
    ], 'Paragraph 8 introduces a particular exchange with the previously identified senator. Its surrounding meditation is retained without adding the named thinkers as participants.', { kind: 'scene' }),
    scene(9, 'Respect for the Unknown', 'The narrator closes the portrait by distinguishing reverence from inquiry into every mystery.', 'digne', [],
      'The final paragraph is the narrator’s concluding judgment, after the reported exchange.', { kind: 'exposition', mentioned: ['myriel'] }),
  ]],
  ...bookSecondReview,
  ...bookThirdReview,
  ...bookFourthReview,
  ...bookFifthReview,
  ...bookSixthReview,
  ...bookSeventhReview,
  ...bookEighthReview,
  ...volumeTwoBookFirstReview,
  ...volumeTwoBookSecondReview,
  ...volumeTwoBookThirdReview,
  ...volumeTwoBookFourthReview,
  ...volumeTwoBookFifthReview,
  ...volumeTwoBookSixthReview,
  ...volumeTwoBookSeventhReview,
  ...volumeTwoBookEighthReview,
  ...volumeThreeBookFirstReview,
  ...volumeThreeBookSecondReview,
  ...volumeThreeBookThirdReview,
  ...volumeThreeBookFourthReview,
  ...volumeThreeBookFifthReview,
  ...volumeThreeBookSixthReview,
  ...volumeThreeBookSeventhReview,
  ...volumeThreeBookEighthReview,
  ...volumeFourBookFirstReview,
  ...volumeFourBookSecondReview,
  ...volumeFourBookThirdReview,
  ...volumeFourBookFourthReview,
  ...volumeFourBookFifthReview,
  ...volumeFourBookSixthReview,
  ...volumeFourBookSeventhReview,
  ...volumeFourBookEighthReview,
  ...volumeFourBookNinthReview,
  ...volumeFourBookTenthReview,
  ...volumeFourBookEleventhReview,
  ...volumeFourBookTwelfthReview,
  ...volumeFourBookThirteenthReview,
  ...volumeFourBookFourteenthReview,
  ...volumeFourBookFifteenthReview,
  ...volumeFiveBookFirstReview,
  ...volumeFiveBookSecondReview,
  ...volumeFiveBookThirdReview,
  ...volumeFiveBookFourthReview,
  ...volumeFiveBookFifthReview,
  ...volumeFiveBookSixthReview,
  ...volumeFiveBookSeventhReview,
  ...volumeFiveBookEighthReview,
  ...volumeFiveBookNinthReview,
])
