// Explicit one-based verse starts, checked against the retained Gutenberg text.
// Each state is authored for one participant in this particular passage.
// The start of the next entry closes the previous one without altering a verse.
const s=(line,title,location,timeline,states,tension=3,items=[])=>({line,title,location,timeline,states,tension,items})
export const reviewedBooks=[
 [
 s(1,'The Argument and Invocation','cosmos','address',{poet:'Invokes the heavenly Muse and asks for illumination sufficient to justify divine providence.'},1),
 s(27,'Awakening on the Burning Lake','burning-lake','fall',{satan:'Lies chained in the fiery flood, recognizes Beelzebub, and insists that defeat has not conquered his will.',beelzebub:'Recognizes his ruined commander and fears that their remaining strength will only serve their punishment.'},5),
 s(192,'The Shore of Hell','hell-plain','fall',{satan:'Raises his immense body from the lake and reaches the burning marl, declaring his preference for rule in Hell.',beelzebub:'Follows Satan out of the flood and urges him to recall the stunned legions to action.'},4,['spear','shield']),
 s(283,'The Legions Roused','hell-plain','fall',{satan:'Supports his painful steps with his spear and calls the scattered spirits to rise from the lake.',beelzebub:'Stands beside the commander as the fallen ranks respond to his summons.'},4,['spear','shield']),
 s(376,'The Infernal Powers Assemble','hell-plain','fall',{satan:'Receives the foremost fallen powers as they rally from the fiery couch.',beelzebub:'Joins the infernal leadership as the named powers gather.',moloch:'Appears among the foremost powers rising from defeat, associated by the narrator with cruel sacrifice.',belial:'Joins the infernal company; the narrator identifies his polished depravity.'},3),
 s(522,'The Standard Raised','hell-plain','fall',{satan:'Orders the imperial standard raised and surveys the host with pride mixed with grief.',beelzebub:'Stands among the rallied powers as their ranks recover martial order.',moloch:'Takes his place among the assembled rebel leaders beneath the restored standard.',belial:'Joins the ranked host while its commander struggles to begin his address.'},4),
 s(622,'Satan Addresses the Legions','hell-plain','fall',{satan:'Blames concealed divine strength for defeat and proposes renewed war by force or guile.',beelzebub:'Hears the commander promise that the fallen host may yet find an opportunity for resistance.',moloch:'Answers the defiant address with the armed host, ready for renewed conflict.',belial:'Remains in the assembly as its weapons signal assent to resistance.'},4),
 s(670,'Mammon Mines the Hill','pandemonium','fall',{mammon:'Leads the mining crew into the smoking hill and opens its veins of gold.'},3),
 s(710,'Pandemonium Rises','pandemonium','fall',{},3),
 s(752,'The Great Consult Begins','pandemonium','fall',{satan:'Summons the infernal powers to a closed council inside the new palace.',beelzebub:'Contracts his form to take a place within the crowded council.',moloch:'Enters the great consult with the leading rebel powers.',belial:'Takes his seat in the inner deliberation.',mammon:'Joins the secret council in the palace built from infernal wealth.'},3),
 ],
 [
 s(1,'Satan Opens the Council','pandemonium','fall',{satan:'Sits exalted on the infernal throne and invites advice on open war or covert guile.',beelzebub:'Waits in the council for proposals concerning their response to Heaven.',moloch:'Prepares to answer the invitation to counsel with a demand for war.',belial:'Hears Satan invite rival proposals before delivering his own advice.',mammon:'Listens from the council to the question of renewed resistance.'}),
 s(43,'Moloch Urges Open War','pandemonium','fall',{moloch:'Advocates an immediate assault with Hell fire, valuing revenge even if victory is impossible.',satan:'Hears Moloch propose direct violence as the answer to their defeat.',beelzebub:'Considers Moloch’s demand for an unconcealed second assault.',belial:'Waits while Moloch presents the war policy he will oppose.',mammon:'Hears the first proposal before advancing an alternative use of infernal strength.'},5),
 s(106,'Belial Counsels Ease','pandemonium','fall',{belial:'Rejects renewed battle, fears greater punishment, and disguises passive endurance as prudent counsel.',satan:'Presides while Belial argues that resistance may worsen their suffering.',beelzebub:'Listens to Belial’s prediction of harsher divine retaliation.',moloch:'Remains in council while Belial answers his argument for open war.',mammon:'Waits for Belial’s case for endurance to end before proposing settlement.'}),
 s(226,'Mammon Chooses Hell','pandemonium','fall',{mammon:'Rejects both conquest and submission, proposing an independent realm built from Hell’s resources.',satan:'Hears Mammon advocate permanent infernal self-sufficiency.',beelzebub:'Prepares to challenge the apparent independence promised by Mammon.',moloch:'Hears a proposal to abandon further assault and develop the underworld.',belial:'Remains in the council as Mammon replaces passive ease with material industry.'}),
 s(284,'Beelzebub Proposes Man','pandemonium','fall',{beelzebub:'Reminds the host that Hell remains under divine rule and proposes corrupting the rumored new human world.',satan:'Allows his confederate to present the design directed against humankind.',moloch:'Joins the council’s assent to an attack on the new creation.',belial:'Hears the proposed indirect revenge and the call for a volunteer.',mammon:'Listens as Beelzebub redirects the assembly from building in Hell to invading another world.'},5),
 s(417,'Satan Takes the Venture','pandemonium','fall',{satan:'Breaks the fearful silence by claiming the dangerous expedition for himself.',beelzebub:'Rises with the other powers in reverence for Satan’s announced undertaking.',moloch:'Accepts Satan’s solitary venture after no volunteer answers.',belial:'Joins the assent to a venture he does not undertake.',mammon:'Acclaims the commander who assumes the passage through Chaos.'},4),
 s(506,'The Host Disperses','hell-plain','fall',{},3),
 s(629,'At the Gates of Hell','hell-gate','fall',{satan:'Reaches the ninefold barrier and challenges the armed shapeless guardian.',sin:'Keeps the barred threshold with her fatal key while the two hostile powers face one another.',death:'Threatens Satan with his dart and claims authority over the infernal entrance.'},5),
 s(727,'Sin Tells Her Origin','hell-gate','fall',{sin:'Intervenes between the opponents, names Satan her father, and recounts the origin of herself and Death.',satan:'Stops his challenge to hear the guardian identify their kinship.',death:'Desists from striking when Sin identifies the stranger as his father.'},5,['key']),
 s(815,'The Infernal Bargain','hell-gate','fall',{satan:'Promises freedom and abundant prey if the guardians permit his venture.',sin:'Chooses Satan’s promise over her appointed charge despite her suffering.',death:'Welcomes the prospect of feeding upon a new race.'},4,['key']),
 s(871,'The Gate Opens','hell-gate','fall',{sin:'Turns the fatal key and draws back the gates, which she cannot close again.',death:'Remains beside Sin as the opened barrier exposes the roaring abyss.',satan:'Surveys the dark gulf and ventures into its unstable depths.'},5,['key']),
 s(951,'The Throne of Chaos','chaos-throne','fall',{satan:'Approaches the elemental rulers and offers to restore their lost dominion in exchange for directions.',chaos:'Complains that Hell and creation encroach upon his realm and directs Satan toward the new world.',night:'Sits enthroned beside Chaos amid the discordant elemental court.'},4),
 s(1010,'Across the Wild Abyss','chaos','fall',{satan:'Leaves the court without delay and struggles toward the golden chain and created light.'},4),
 ],
 [
 s(1,'Invocation to Holy Light','cosmos','address',{poet:'Addresses holy light from blindness, asking for inward vision of things hidden from mortal sight.'},1),
 s(57,'Heaven Beholds Satan','heaven-throne','fall',{god:'Observes Satan’s approach and explains that foreknowledge does not compel the freedom of created beings.',son:'Answers the promise of grace by asking how the new human race can be saved.'}),
 s(228,'The Son Offers Himself','heaven-throne','fall',{son:'Freely offers his mortal life for humankind and anticipates overcoming death.',god:'Accepts the voluntary offering and declares the Son’s redemptive kingship.'},4),
 s(345,'Heaven Acclaims the Son','heaven-throne','fall',{god:'Receives the host’s worship as the source of creation and mercy.',son:'Receives the host’s praise for his freely offered intercession.'},2),
 s(417,'Satan Reaches the Universe','cosmos-gate','fall',{satan:'Wanders the bare outside of the created sphere, searching for an entrance toward his prey.'},3),
 s(499,'The Stair and the Golden Chain','cosmos-gate','fall',{satan:'Sees the stair toward Heaven and the opening through which created space becomes visible.'},3),
 s(556,'The Flight to the Sun','sun','fall',{satan:'Plunges into created space and chooses the brilliant solar orb as his next station.'},3),
 s(614,'At the Sun','sun','fall',{satan:'Adopts the appearance of a young cherub and asks to see the creature made in God’s image.',uriel:'Receives the apparent heavenly visitor without perceiving his hypocrisy.'},4),
 s(682,'Earth in Sight','sun','fall',{uriel:'Praises the visitor’s apparent zeal and points out Earth and Paradise.',satan:'Bows in feigned reverence and takes his flight toward Mount Niphates.'},4),
 ],
 [
 s(1,'Satan on Mount Niphates','niphates','fall',{satan:'Feels Hell within himself, weighs repentance, and deliberately accepts evil as his chosen good.'},5),
 s(114,'Uriel Detects the Change','sun','fall',{uriel:'Observes the stranger’s disordered passions from the Sun and recognizes that his seeming holiness was false.'},4),
 s(131,'The Wall of Paradise','eden-wall','fall',{satan:'Approaches the wooded enclosure, climbs its outer slope, and leaps over the natural wall.'},4),
 s(194,'Paradise Surveyed','tree-of-life','fall',{satan:'Perches like a cormorant on the Tree of Life and surveys Eden without valuing the tree’s proper use.'},3),
 s(279,'Adam and Eve','eden-garden','fall',{adam:'Walks with Eve in innocent dignity and rests beside her after their work.',eve:'Shares Adam’s companionship and food while the garden’s creatures play nearby.',satan:'Watches the human pair and feels admiration turn into envy and a resolve to destroy their happiness.'},3),
 s(396,'Satan Overhears the Prohibition','eden-garden','fall',{adam:'Reminds Eve of the single forbidden tree and their obligation to thank their maker.',eve:'Hears Adam contrast their easy prohibition with the garden’s abundance.',satan:'Lurks near the pair in changing animal forms and hears the restriction placed upon them.'},4),
 s(440,'Eve Remembers Her Awakening','eden-garden','fall',{eve:'Tells Adam how a voice drew her from her reflected image toward their first companionship.',adam:'Receives Eve’s account and embraces her beneath the sheltering trees.',satan:'Watches their affection and turns aside in jealous anguish.'},3),
 s(502,'Satan Designs the Temptation','eden-garden','fall',{satan:'Treats the prohibition as a vulnerable point and leaves to seek information from other spirits.'},5),
 s(539,'Uriel Warns Gabriel','eden-gate','fall',{uriel:'Reports the traveller’s changing passions and asks that the intruder be found.',gabriel:'Promises to seek the alien spirit before morning and takes responsibility for Eden’s watch.'},4),
 s(598,'Evening Conversation','eden-garden','fall',{adam:'Calls for rest after the day’s work and explains the unseen angels’ nightly praise.',eve:'Delights in Adam’s company and asks why the stars shine while human eyes are closed.'},2),
 s(689,'Evening Prayer','bower','fall',{adam:'Enters the bower with Eve, gives thanks for their shared labor, and sleeps beside her.',eve:'Joins the prayer and lies down in secure affection beneath the flowering roof.'},1),
 s(776,'The Garden Watch','eden-gate','fall',{gabriel:'Divides the patrol and sends Ithuriel and Zephon to search the sleeping pair’s lodging.',ithuriel:'Receives the order to search every part of the garden, especially the bower.',zephon:'Accepts Gabriel’s instruction to seize any infernal spirit found within the enclosure.'},4),
 s(797,'Satan at Eve’s Ear','bower','fall',{satan:'Crouches as a toad at Eve’s ear until Ithuriel’s spear restores his own shape.',eve:'Sleeps while the hidden intruder attempts to disturb her imagination.',adam:'Sleeps beside Eve while the angels discover the intruder at their bed.',ithuriel:'Touches the disguised spirit with his spear and exposes Satan.',zephon:'Rebukes Satan’s fallen appearance and orders him to account to Gabriel.'},5),
 s(861,'Gabriel Confronts Satan','eden-gate','fall',{gabriel:'Questions the prisoner’s escape and rejects his pretence of seeking relief from pain.',satan:'Claims a leader’s right to scout danger, then threatens Gabriel and his host.',ithuriel:'Brings the discovered intruder before the commander and reports his concealed activity.',zephon:'Completes the escort and reports the form in which Satan was found.'},5),
 ],
 [
 s(1,'Eve’s Troubled Dream','bower','fall',{eve:'Wakes distressed by a dream of tasting the fruit and ascending; she is relieved to find it unreal.',adam:'Hears Eve’s account, distinguishes involuntary fancy from consent, and comforts her.'},3),
 s(136,'Morning Worship','eden-garden','fall',{adam:'Joins Eve in a hymn calling on every part of creation to praise its maker.',eve:'Sings with Adam, then turns with him to the garden’s growing work.'},1),
 s(211,'Raphael Commissioned','heaven-throne','fall',{god:'Sends Raphael to converse with Adam and warn him about the enemy and his own freedom.',raphael:'Receives the command to make the danger intelligible without compelling obedience.'},3),
 s(246,'Raphael Descends','eden-garden','fall',{raphael:'Leaves Heaven, flies down to Paradise, and walks through its fragrant groves toward Adam.'},2),
 s(299,'Preparing Hospitality','bower','fall',{adam:'Recognizes the heavenly visitor and asks Eve to prepare abundant food.',eve:'Selects fruit, juices, and a fitting table for the approaching guest.'},2),
 s(350,'The Guest Received','eden-garden','fall',{adam:'Goes out to greet Raphael and invites him to rest beneath the bower.',raphael:'Accepts Adam’s unpretentious welcome and walks with him to the dwelling.'},2),
 s(371,'The Angelic Meal','bower','fall',{eve:'Receives the angel’s salutation and ministers at the table she prepared.',adam:'Offers the garden’s food and wonders whether an angel can accept it.',raphael:'Explains spiritual nourishment and eats the offered meal without pretence.'},2),
 s(451,'Matter and Spirit','bower','fall',{adam:'Asks how human nourishment and angelic substance differ.',raphael:'Explains a graduated creation in which nourishment may be refined into spiritual life.',eve:'Remains at the hospitable gathering as the meal gives way to instruction.'},2),
 s(506,'Free Obedience','bower','fall',{adam:'Asks how beings already blessed can cease to obey.',raphael:'Explains that love must be voluntary and consents to recount the rebellion.',eve:'Listens beside Adam to the account of freely chosen disobedience.'},3),
 s(577,'The Son Exalted','heaven-throne','rebellion',{god:'Declares the Son head of the angelic host and commands their freely rendered obedience.',son:'Stands at the Father’s right hand as the heavenly hierarchy receives its appointed head.',satan:'Hears the decree he will resent while the host celebrates.'},3),
 s(657,'Satan’s First Revolt','heaven-north','rebellion',{satan:'Nurses envy of the Son and awakens his nearest companion to gather the northern powers.',beelzebub:'Carries the secret summons among the powers subject to Satan’s command.'},4),
 s(711,'Heaven Sees the Mustering','heaven-throne','rebellion',{god:'Points out the approaching revolt and speaks ironically of the rebels’ claim to omnipotence.',son:'Welcomes the occasion to uphold the Father’s sovereignty.'},3),
 s(743,'The Northern Mustering','heaven-north','rebellion',{satan:'Receives the assembled northern host and argues that the new decree threatens their liberty.',beelzebub:'Joins the massed followers drawn to Satan’s rival throne.',abdiel:'Hears Satan’s attack on the Son’s authority among the silent assembly.'},5),
 s(803,'Abdiel Answers Satan','heaven-north','rebellion',{abdiel:'Defends the Son’s authority, rejects the host’s applause, and leaves alone through their hostile ranks.',satan:'Denies that the angels were created and dismisses Abdiel’s warning.'},5),
 ],
 [
 s(1,'Abdiel Returns','heaven-throne','rebellion',{abdiel:'Returns through the night and receives divine approval for fidelity amid hostile numbers.',god:'Commends Abdiel’s solitary witness and commissions Michael and Gabriel.',michael:'Receives command of the faithful army against the rebels.',gabriel:'Receives his share of command alongside Michael.'},3),
 s(61,'The Armies Meet','heaven-field','rebellion',{michael:'Advances at the head of the ordered loyal army.',gabriel:'Leads the second part of the faithful host into the field.',satan:'Approaches in defiant martial splendor, expecting to find Heaven unguarded.',abdiel:'Recognizes Satan and prepares to confront the leader he opposed in council.'},5),
 s(114,'Abdiel Strikes Satan','heaven-field','rebellion',{abdiel:'Answers Satan’s taunts and strikes his crest so fiercely that he reels backward.',satan:'Mocks Abdiel’s service, then staggers under his first blow.'},5),
 s(202,'First Day of War','heaven-field','rebellion',{michael:'Fights through the widespread angelic conflict until he meets Satan.',gabriel:'Commands a wing of the loyal host amid the general battle.',satan:'Ranges through the fighting until Michael challenges his destruction of heavenly peace.',abdiel:'Fights with the faithful army after opening the battle.'},5),
 s(246,'Michael Wounds Satan','heaven-field','rebellion',{michael:'Calls for Satan to withdraw and cuts through his sword and right side.',satan:'Refuses retreat, feels pain for the first time, and is carried away on his followers’ shields.'},5),
 s(354,'The Rebels Driven Back','heaven-field','rebellion',{gabriel:'Drives Moloch before him after cleaving his armor and body.',moloch:'Blasphemes while challenging Gabriel, then flees wounded and bellowing.',abdiel:'Overthrows Ariel, Arioc, and Ramiel in the fighting.'},5),
 s(406,'The Night Council','heaven-north','rebellion',{satan:'Consoles the beaten army and proposes a new weapon after the first day’s failure.'},4),
 s(496,'Infernal Artillery','heaven-north','rebellion',{},4,['cannon']),
 s(524,'The Engines Unveiled','heaven-field','rebellion',{satan:'Brings concealed engines into the field and orders them fired at the approaching host.',michael:'Advances with the loyal army as the batteries unexpectedly open upon it.'},5,['cannon']),
 s(609,'The Mountains of Heaven','heaven-field','rebellion',{satan:'Mocks the fallen enemy before uprooted hills bury his artillery and his soldiers.',michael:'Commands among the faithful powers as they recover and answer the engines with torn-up mountains.'},5,['cannon']),
 s(669,'The Son Takes the Field','heaven-throne','rebellion',{god:'Ends the trial of angelic strength by commissioning the Son to act alone on the third day.',son:'Accepts the charge, rises from the throne, and arms himself for the final advance.'},4),
 s(746,'The Son Restores the Field','heaven-field','rebellion',{son:'Advances in the divine chariot, restores the mountains, and orders the faithful army to stand still.',michael:'Receives the Son’s order to cease fighting and witness the appointed judgment.',gabriel:'Stands with the loyal ranks as the Son assumes the battle.'},4),
 s(824,'The Rebels Cast Out','heaven-gate','rebellion',{son:'Drives the rebel multitude through the opened wall and returns victorious to the Father.',satan:'Is swept with his defeated host over Heaven’s brink and down into the abyss.'},5),
 s(893,'Raphael Ends the Warning','bower','fall',{raphael:'Closes his analogy between heavenly and earthly things with a direct warning against the tempter.',adam:'Hears that the enemy now seeks his disobedience and is told to remember the rebels’ example.',eve:'Receives the closing warning while present beside Adam in the conversation.'},3),
 ],
 [
 s(1,'Invocation to Urania','cosmos','address',{poet:'Asks heavenly wisdom to bring his song safely back to Earth amid personal and political darkness.'},1),
 s(40,'Adam Asks of Creation','bower','fall',{adam:'Asks when and why the visible world began, seeking knowledge related to his own condition.',eve:'Listens with Adam to the request for an account of creation.',raphael:'Sets limits to the inquiry and agrees to tell what may be revealed.'},2),
 s(131,'God Declares Creation','heaven-throne','creation',{god:'Declares that the rebels’ loss will be answered by a new inhabited world.',son:'Receives the command to create the bounded universe.'},3),
 s(180,'The Son Enters Chaos','chaos','creation',{son:'Leaves Heaven with the attendant host and sets the universe’s bounds with golden compasses.'},3),
 s(243,'First Day','cosmos','creation',{son:'Calls light from darkness and distinguishes the first evening and morning.'},2),
 s(261,'Second Day','cosmos','creation',{son:'Divides the waters by the firmament and names the new expanse Heaven.'},2),
 s(276,'Third Day','earth','creation',{son:'Gathers the seas, exposes dry land, and clothes Earth with grass, trees, and flowers.'},2),
 s(339,'Fourth Day','cosmos','creation',{son:'Appoints the Sun, Moon, and stars to govern light, seasons, and the measures of time.'},2),
 s(387,'Fifth Day','earth','creation',{son:'Fills the waters with living creatures and the air with the various kinds of birds.'},2),
 s(449,'The Animals Created','earth','creation',{son:'Calls beasts, cattle, reptiles, and insects out of the living Earth.'},2),
 s(505,'Sixth Day and Man','eden-garden','creation',{god:'Declares the making of humankind in the divine image.',son:'Creates and blesses the human pair, giving dominion and the prohibition.',adam:'Receives life, the garden, and the command that reserves one tree.',eve:'Is created as Adam’s consort and shares the blessing of human increase.'},3),
 s(548,'The Sabbath Hymn','heaven-throne','creation',{son:'Returns from the completed work and sits beside the Father.',god:'Receives the heavenly praise for the finished creation on the seventh day.'},2),
 s(635,'Creation’s Account Ends','bower','fall',{raphael:'Concludes the account and invites any further inquiry within the bounds he has set.',adam:'Has heard the making of the world that preceded his own consciousness.',eve:'Remains with Adam at the close of the creation account.'},2),
 ],
 [
 s(1,'Adam Questions the Heavens','bower','fall',{adam:'Asks why the vast heavenly motions appear to serve the small Earth.',raphael:'Hears Adam’s cosmological question before explaining the limits of useful inquiry.',eve:'Hears the opening question, then deliberately retires to tend her flowers.'},2),
 s(64,'Raphael Counsels Humility','bower','fall',{raphael:'Offers alternative accounts of celestial motion and counsels Adam to attend to his own charge.',adam:'Listens without Eve as the angel distinguishes practical wisdom from speculation.'},2),
 s(179,'Adam Offers His History','bower','fall',{adam:'Accepts the limit of his inquiry and offers to recount his own first experience.',raphael:'Welcomes Adam’s story and explains that he was away on a mission when humanity was made.'},2),
 s(250,'Adam Recalls Awakening','eden-garden','memory',{adam:'Awakes on the grass, discovers his senses and speech, and searches for the cause of his life.'},2),
 s(292,'Adam Meets His Maker','eden-garden','memory',{adam:'Follows the dream guide into Eden and receives the command concerning the forbidden tree.',god:'Leads Adam into the garden and entrusts it to him under a single prohibition.'},3),
 s(333,'The Creatures Named','eden-garden','memory',{god:'Grants Adam dominion and brings the creatures before him in pairs.',adam:'Names the animals and recognizes that no creature shown is his equal companion.'},2),
 s(356,'Adam Asks for Companionship','eden-garden','memory',{adam:'Explains that equal fellowship is needed for human happiness.',god:'Tests Adam’s reasoning, approves his self-knowledge, and promises a fitting partner.'},2),
 s(452,'Eve Is Formed','bower','memory',{adam:'Falls into sleep yet inwardly sees the removal of his rib and the forming of a woman.',god:'Forms Eve from Adam’s side and leads her toward him.',eve:'Receives her form and is brought to Adam as his equal human companion.'},3),
 s(481,'The First Union','bower','memory',{adam:'Recognizes Eve with delight and takes her hand in their first marriage.',eve:'Withdraws with modesty, then accepts Adam’s company and the nuptial bower.'},2),
 s(521,'Adam Admits His Passion','bower','fall',{adam:'Ends his history and admits that Eve’s beauty can unsettle his judgment.',raphael:'Hears the confession with concern and prepares to distinguish love from subjection.'},3),
 s(560,'Raphael Warns of Passion','bower','fall',{raphael:'Rebukes excessive submission to beauty and locates true love in reason and mutual honor.',adam:'Distinguishes his delight in Eve’s conversation from mere bodily appetite.'},3),
 s(630,'The Angel Departs','eden-garden','fall',{raphael:'Gives a final warning to govern passion and departs at sunset.',adam:'Thanks the guest and promises to remember his instruction.'},2),
 ],
 [
 s(1,'The Tragic Theme','cosmos','address',{poet:'Announces the tragic turn and asks his heavenly patroness for a fitting argument beyond martial epic.'},2),
 s(48,'Satan Returns as Serpent','eden-wall','fall',{satan:'Returns after seven nights, enters by the river, and possesses the sleeping serpent as an instrument of guile.'},4),
 s(192,'The Debate Over Separate Work','bower','fall',{eve:'Proposes dividing the garden work and argues that untested virtue lacks dignity.',adam:'Urges companionship as protection, explaining the inward danger of a deceptive object.'},3),
 s(385,'Eve Walks Alone','eden-garden','fall',{eve:'Withdraws her hand and promises to return at noon as she chooses solitary work.',adam:'Watches Eve leave, repeatedly asking her to return soon.'},3),
 s(404,'The Tempter Finds Eve','eden-garden','fall',{satan:'Finds Eve alone among the flowers, briefly forgets his malice, then renews his destructive resolve.',eve:'Works at propping flowers without knowing the hidden enemy is near.'},4),
 s(494,'The Serpent Approaches','eden-garden','fall',{satan:'Raises the serpent’s coils and flatters Eve as worthy of universal admiration.',eve:'Notices the animal’s gestures and marvels at its apparently human voice.'},4),
 s(550,'The Claim of Speech','eden-garden','fall',{eve:'Asks how the serpent acquired speech and reason.',satan:'Claims that tasting a particular fruit elevated him above his former animal condition.'},5),
 s(613,'The Path to the Tree','tree-of-knowledge','fall',{satan:'Leads Eve to the forbidden tree with a deceptive promise of enlightened senses.',eve:'Follows, recognizes the tree, and repeats the prohibition against eating its fruit.'},5),
 s(667,'The Serpent’s Argument','tree-of-knowledge','fall',{satan:'Denies that the fruit brings death and presents the command as envy that withholds godlike knowledge.',eve:'Listens as the serpent treats his apparent survival and speech as evidence against the prohibition.'},5),
 s(733,'Eve Weighs the Fruit','tree-of-knowledge','fall',{eve:'Treats the fruit’s desirability and the serpent’s claim as reasons to distrust the stated penalty.',satan:'Waits beside the tree after completing his argument.'},5,['fruit']),
 s(780,'Eve Eats','tree-of-knowledge','fall',{eve:'Reaches for the fruit, eats without restraint, and praises the tree as a source of wisdom.',satan:'Withdraws into the thicket after the transgression.'},5,['fruit']),
 s(793,'Eve Considers Adam','tree-of-knowledge','fall',{eve:'Considers keeping her supposed advantage, fears replacement if she dies, and resolves that Adam must share the fruit.'},5,['fruit']),
 s(834,'Eve Returns to Adam','bower','fall',{eve:'Brings the fruit and explains her absence as an astonishing discovery of the serpent’s powers.',adam:'Waits with a garland, hears Eve’s confession, and drops the flowers in horror.'},5,['fruit']),
 s(894,'Adam Chooses Eve','bower','fall',{adam:'Recognizes the transgression but decides that separation from Eve is worse than sharing her fate.',eve:'Hears Adam’s resolve as proof of love and encourages him to eat.'},5,['fruit']),
 s(990,'Adam Eats','bower','fall',{adam:'Takes the fruit knowingly, choosing his bond with Eve over the prohibition.',eve:'Embraces Adam and rejoices as he joins her in eating.'},5,['fruit']),
 s(1009,'Desire and Shame','bower','fall',{adam:'Feels intoxicated exhilaration, seeks sexual pleasure, then wakes to a humiliating awareness of nakedness.',eve:'Shares the disordered pleasure and wakes beside Adam bereft of their former innocence.'},5),
 s(1091,'The First Covering','eden-garden','fall',{adam:'Seeks broad leaves to conceal nakedness and makes a covering with Eve.',eve:'Joins Adam in fastening leaves about their bodies, but finds no inward relief.'},4),
 s(1119,'Mutual Accusation','eden-garden','fall',{adam:'Blames Eve’s departure and denies that he should have restrained her freedom by force.',eve:'Blames Adam’s insufficient firmness as their shared grief becomes angry dispute.'},5),
 ],
 [
 s(1,'Heaven Learns the Transgression','heaven-throne','fall',{god:'Receives the returning guards and declares that the human choice remained free.',son:'Receives the Father’s commission to judge the transgressors.'},3),
 s(85,'Judgment Descends','eden-garden','fall',{son:'Descends alone in the cool of evening and calls the hidden pair to account.',adam:'Hides among the trees with Eve, fearful of the presence he formerly welcomed.',eve:'Conceals herself beside Adam after hearing the approaching judge.'},4),
 s(103,'Adam and Eve Answer','eden-garden','fall',{adam:'Confesses fear and nakedness, then blames the woman given to him.',eve:'Admits eating but attributes her choice to the serpent’s deception.',son:'Questions each human in turn and rejects Adam’s transfer of authority to Eve.'},5),
 s(163,'The Sentences','eden-garden','fall',{son:'Pronounces the serpent’s humiliation and the painful conditions of human life.',adam:'Hears that toil, the cursed ground, and return to dust are now his portion.',eve:'Hears the sentence of sorrow and the changed relation to her husband.'},5),
 s(209,'The Pair Clothed','eden-garden','fall',{son:'Defers immediate death and clothes the exposed pair before returning to intercede.',adam:'Receives a covering despite the judgment against him.',eve:'Receives the judge’s protection from the altered air.'},3),
 s(229,'Sin and Death Sense the Change','hell-gate','fall',{sin:'Senses Satan’s success and proposes leaving Hell for a more abundant domain.',death:'Smells approaching human mortality and agrees to follow the new attraction.'},4),
 s(282,'Sin and Death Build Their Way','chaos','fall',{sin:'Builds with Death a lasting bridge across the abyss to the created world.',death:'Helps bind the gulf with a broad causeway toward the prey he senses.'},4),
 s(325,'Satan Meets His Offspring','cosmos-gate','fall',{satan:'Returns from Earth and rejoices to find the new bridge made by his offspring.',sin:'Explains the sympathy that drew her to build the road and praises his conquest.',death:'Stands ready to use the opened route toward the mortal world.'},4),
 s(410,'Satan Returns in Triumph','pandemonium','fall',{satan:'Reenters the palace unseen, resumes his exalted shape, and boasts of corrupting the human pair.',beelzebub:'Keeps the council during Satan’s absence and hears the returning commander’s account.'},5),
 s(504,'The Serpentine Punishment','pandemonium','fall',{satan:'Expects applause but becomes a serpent and hears the answering hiss of his transformed host.',beelzebub:'Shares the host’s degradation into serpentine form instead of the promised triumph.'},5),
 s(585,'Sin and Death Enter Earth','earth','fall',{sin:'Directs Death to consume and corrupt the living world.',death:'Anticipates feeding successively upon plants, animals, and humans.'},4),
 s(610,'Providence Answers the Invaders','heaven-throne','fall',{god:'Explains that the apparent victors carry out a bounded punishment and will themselves be expelled.',son:'Receives the promise that his work will restore the world beyond its present corruption.'},3),
 s(649,'The Changed Creation','earth','fall',{},3),
 s(714,'Adam Despairs','eden-garden','fall',{adam:'Laments the misery his descendants must inherit and fears that death may prolong rather than end torment.'},5),
 s(863,'Eve Seeks Reconciliation','eden-garden','fall',{eve:'Approaches Adam, endures his rejection, and begs for peace as their only remaining mutual comfort.',adam:'Answers with bitter accusations before Eve’s tears begin to soften his anger.'},5),
 s(937,'Shared Burden','eden-garden','fall',{adam:'Raises Eve from his feet and proposes that they bear their common sentence together.',eve:'Recovers hope of companionship and proposes preventing further human misery by remaining childless or dying.'},4),
 s(1010,'Repentance','eden-garden','fall',{adam:'Rejects self-destruction and voluntary barrenness, recalls the promised seed, and urges humble prayer.',eve:'Accepts the turn from despair to confession and joins Adam at the place of judgment.'},3),
 ],
 [
 s(1,'Prayer Accepted','heaven-throne','fall',{son:'Presents the pair’s inward repentance and asks that their contrite prayer be accepted.',god:'Accepts intercession while declaring that they must leave the garden.'},3),
 s(84,'Michael Commissioned','heaven-throne','fall',{god:'Orders Michael to remove the pair gently and guard the Tree of Life.',michael:'Receives authority to disclose the future and conduct the human household out of Eden.'},3),
 s(134,'Morning Hope','bower','fall',{adam:'Interprets the peace following prayer as a sign that mercy may accompany judgment.',eve:'Accepts sorrow and reduced ambition, hoping to remain in the garden.'},2),
 s(181,'Michael Enters Paradise','eden-gate','fall',{adam:'Reads ominous changes in the animals and sees the approaching heavenly escort.',eve:'Hears Adam identify a visit more solemn than Raphael’s.',michael:'Lands in Paradise, leaves the escort on a hill, and approaches the pair alone.'},4),
 s(238,'The Sentence of Exile','bower','fall',{michael:'Announces that death is delayed but departure from Paradise is required.',adam:'Is struck silent and then grieves the loss of places where he knew the divine presence.',eve:'Laments leaving the flowers and bower she tended.'},4),
 s(334,'God Beyond the Garden','bower','fall',{michael:'Explains that God’s presence extends beyond Eden and prepares Adam for knowledge of his descendants.',adam:'Accepts the sentence and asks for strength to bear what he will see.',eve:'Remains in the bower as Michael puts her into sleep before the ascent.'},3),
 s(376,'The Hill of Vision','vision-hill','vision',{michael:'Leads Adam to the summit, clears his inward sight, and revives him for the visions.',adam:'Ascends, sees the far kingdoms, and falls overcome before receiving the angel’s sustaining touch.'},3),
 s(429,'Cain and Abel','vision-hill','vision',{adam:'Sees one of his descendants murder another and learns the first human shape of death.',michael:'Explains the opposed offerings and the violence of brother against brother.'},5),
 s(466,'The House of Disease','vision-hill','vision',{michael:'Shows bodily disease, explains its causes, and counsels temperance and patient acceptance of age.',adam:'Recoils from the hospital of suffering and asks whether death can be made less dreadful.'},5),
 s(556,'Arts and Unequal Marriages','vision-hill','vision',{adam:'Welcomes the sight of peaceful arts and marriage before learning what the unions conceal.',michael:'Explains the corruption that joins the sober line to alluring but irreligious partners.'},4),
 s(638,'Violence Before the Flood','vision-hill','vision',{adam:'Sees war, plunder, and rejected counsel instead of the harmony he expected.',michael:'Distinguishes true virtue from martial fame and explains the rescue of the solitary just man.'},5),
 s(719,'Noah and the Ark','vision-hill','vision',{adam:'Watches the ark receive its household and the world disappear beneath the waters.',michael:'Identifies the righteous survivor and explains how the flood answers universal corruption.'},5),
 s(840,'The Rainbow Covenant','vision-hill','vision',{adam:'Sees the waters recede, rejoices at renewed life, and asks about the colored bow.',michael:'Explains the covenant that limits another destruction by water and points toward final renewal.'},3),
 ],
 [
 s(1,'After the Flood','vision-hill','vision',{michael:'Changes from visible scenes to spoken history because Adam’s sight can no longer sustain the vision.',adam:'Attends to the account of the new human beginning after the flood.'},2),
 s(13,'Babel and Division','vision-hill','vision',{michael:'Relates the rise of coercive kingship and the confusion of the builders’ language.',adam:'Condemns dominion over other humans and hears how inward liberty is lost.'},4),
 s(105,'Abraham and the Promise','vision-hill','vision',{michael:'Traces the calling of the faithful patriarch and the promise that reaches every nation.',adam:'Follows the promised line from Abraham toward its migration into Egypt.'},3),
 s(163,'Exodus and Law','vision-hill','vision',{michael:'Recounts bondage, the signs against Egypt, escape through the sea, and the law that teaches obedience.',adam:'Hears the passage from liberation to law and asks why such elaborate rites are needed.'},4),
 s(270,'Law and Promise','vision-hill','vision',{michael:'Explains the law’s inability to remove sin and the greater covenant it prefigures.',adam:'Learns why sacrifice and mediation point beyond their outward forms.'},3),
 s(315,'Kings and Captivity','vision-hill','vision',{michael:'Traces the judges, the royal promise, national corruption, exile, and return.',adam:'Hears that the promised ruler comes after long political loss rather than uninterrupted power.'},4),
 s(359,'The Messiah Foretold','vision-hill','vision',{michael:'Announces the birth of the promised king and explains that the combat is not an ordinary duel.',adam:'Rejoices at the promised seed and asks how the serpent’s defeat will be accomplished.'},3),
 s(386,'Incarnation and Redemption','vision-hill','vision',{michael:'Describes obedience, sacrificial death, resurrection, witness, ascension, and final judgment.',adam:'Understands that redemption acts through suffering and faith rather than physical prowess.'},4),
 s(466,'Adam Asks About the Faithful','vision-hill','vision',{adam:'Marvels at good brought from evil and asks who will guide the faithful after the ascension.',michael:'Explains the inward comfort and power that will sustain witness under persecution.'},3),
 s(497,'The Church and the End','vision-hill','vision',{michael:'Traces the spread of the gospel, corrupt spiritual rule, and the promised final restoration.',adam:'Hears that institutions themselves may misuse the teaching entrusted to them.'},4),
 s(552,'Paradise Within','vision-hill','vision',{adam:'Resolves to unite knowledge with obedience and recognizes the worth of a paradise within.',michael:'Affirms that faith, patience, love, and deeds complete the wisdom Adam now needs.'},2),
 s(588,'The Hour of Departure','vision-hill','fall',{michael:'Calls an end to speculation and prepares Adam to comfort Eve with the hope he has learned.',adam:'Receives the final instruction to leave with hope and sustain his companion.'},3),
 s(606,'Eve’s Comfort','bower','fall',{adam:'Returns to find Eve awake and hears that she too has received comfort.',eve:'Reports the dream that reconciles her to departure and the promise of restoration through her seed.',michael:'Waits as the pair prepare to leave the garden.'},2),
 s(624,'The World Before Them','eden-gate','fall',{michael:'Takes both humans by the hand, leads them through the eastern gate, and disappears.',adam:'Looks back at the guarded garden, sheds tears, and walks with Eve into the world.',eve:'Leaves the vanished home hand in hand with Adam, sharing their uncertain mortal future.'},3,['sword']),
 ],
]

// Boundary-specific corrections made after reviewing both adjacent passages.
const byTitle=title=>reviewedBooks.flat().find(scene=>scene.title===title)
byTitle('The Shore of Hell').line=221
Object.assign(byTitle('The Rebels Driven Back').states,{
 uriel:'Fights on a wing of the loyal army and defeats one of the armored rebel Thrones.',
 raphael:'Fights beside Uriel against the proud Thrones, driving them away with severe wounds.',
})
const gateIndex=reviewedBooks[1].findIndex(scene=>scene.title==='The Gate Opens')
byTitle('The Gate Opens').states.satan='Surveys the newly exposed abyss from Hell’s brink and weighs the danger of the crossing.'
reviewedBooks[1].splice(gateIndex+1,0,s(927,'Satan Enters Chaos','chaos','fall',{
 satan:'Spreads his wings, drops into a vast emptiness, and struggles onward by flight, swimming, and crawling.',
},5))
const expulsion=reviewedBooks[5].findIndex(scene=>scene.title==='The Rebels Cast Out')
byTitle('The Rebels Cast Out').states.son='Drives the rebel multitude through the opened wall; the defeated host falls nine days before Hell receives it.'
reviewedBooks[5].splice(expulsion+1,0,s(878,'The Son Returns in Triumph','heaven-throne','rebellion',{
 son:'Turns his chariot from the expulsion and returns through the praising host to the Father’s right hand.',
 god:'Receives the victorious Son into the throne’s glory after the defeat of the rebels.',
},2))
delete byTitle('The Northern Mustering').states.abdiel
Object.assign(byTitle('The Standard Raised').states,{azazel:'Raises the imperial ensign, unfurls its shining standard, and gives the host its rallying signal.'})
Object.assign(byTitle('Pandemonium Rises').states,{mulciber:'Directs the architecture of the huge fabric rising from the mined ground.'})
Object.assign(byTitle('The Night Council').states,{nisroch:'Rises in torn armor to argue that pain makes their fight intolerably unequal.'})
Object.assign(byTitle('Infernal Artillery').states,{satan:'Oversees the manufacture of the engines he has proposed after the night council.',nisroch:'Receives Satan’s proposed answer to his plea for stronger weapons and defense.'})
Object.assign(byTitle('The Garden Watch').states,{uzziel:'Takes half the patrol to coast the southern perimeter and meet the other company in the west.'})
byTitle('Gabriel Confronts Satan').location='western-watch'
const confrontation=reviewedBooks[3].findIndex(scene=>scene.title==='Gabriel Confronts Satan')
reviewedBooks[3].splice(confrontation+1,0,s(977,'The Scales in Heaven','western-watch','fall',{
 satan:'Enlarges his form for battle but withdraws after seeing the heavenly scale rise against him.',
 gabriel:'Reads the suspended scales and tells Satan that his strength is bounded by divine permission.',
 ithuriel:'Stands with the gathered patrol as their ranks close around the intruder.',
 zephon:'Remains with the guard as the sign ends the threatened battle.',
 uzziel:'Has joined the western meeting of the patrols when the confrontation reaches its crisis.',
},5,['scales','spear','shield']))
byTitle('Gabriel Confronts Satan').states.uzziel='Meets the other patrol at the western point and stands under Gabriel’s command during the questioning.'
for(const title of ['Satan Returns in Triumph','The Serpentine Punishment'])Object.assign(byTitle(title).states,{
 moloch:title==='Satan Returns in Triumph'?'Hears the commander describe a victory won by deception rather than the open war he advocated.':'Is transformed with the assembled host and shares its humiliating hiss.',
 belial:title==='Satan Returns in Triumph'?'Listens in the infernal assembly to the report of the human transgression.':'Loses his angelic form with the company whose expected applause becomes hissing.',
 mammon:title==='Satan Returns in Triumph'?'Hears Satan claim dominion beyond the infernal realm he had proposed developing.':'Shares the host’s serpentine punishment and frustrated hunger for deceptive fruit.',
})
byTitle('Eve Eats').states.eve='Reaches for the fruit and eats without restraint, absorbed in its taste and her expectation of knowledge.'
byTitle('The Shore of Hell').items=[]
byTitle('The Legions Roused').holders={spear:'satan',shield:'satan'}
byTitle('Sin Tells Her Origin').holders={key:'sin'}
byTitle('The Infernal Bargain').holders={key:'sin'}
byTitle('The Gate Opens').holders={key:'sin'}
byTitle('Eve Eats').holders={fruit:'eve'}
byTitle('Eve Considers Adam').holders={fruit:'eve'}
byTitle('Eve Returns to Adam').holders={fruit:'eve'}
byTitle('Adam Chooses Eve').holders={fruit:'eve'}
byTitle('Adam Eats').holders={fruit:'adam'}
byTitle('The Scales in Heaven').holders={spear:'satan',shield:'satan'}
byTitle('Creation’s Account Ends').description='Raphael finishes the account of creation and invites questions within the limits of human understanding.'
byTitle('Pandemonium Rises').description='The infernal architect directs a vast palace as it rises from the ground, preparing the host’s seat of government.'
byTitle('The Host Disperses').description='The dismissed host divides among martial sport, music, speculation, and exploration of the infernal landscape.'
byTitle('The Changed Creation').description='Angelic commands alter the seasons and winds while hostility spreads through animal life.'

export function reviewedBoundaries(book){
 const plan=reviewedBooks[book.number-1],points=plan.map(scene=>scene.line-1)
 if(points[0]!==0||points.some((point,i)=>i&&point<=points[i-1])||points.at(-1)>=book.lines.length)throw Error(`Invalid reviewed boundaries in Book ${book.label}`)
 return [...points,book.lines.length]
}

// Days belong to independent clocks. Fractions locate a narrated part of a day;
// no equivalence between heavenly, human, prophetic, and poetic clocks is implied.
export function sceneClock(book,scene){
 const n=scene.line,t=scene.timeline
 if(t==='address')return 0
 if(t==='memory')return 5.25
 if(t==='vision')return 10.25
 if(t==='creation')return book===7?(n<243?0:n<261?0:n<276?1:n<339?2:n<387?3:n<449?4:n<548?5:6):0
 if(t==='rebellion')return book===5?(n<657?0.5:0.75):n<406?1.25:n<524?1.75:n<671?2.25:n<878?3.25:12.25
 if(book===1||book===2)return 0
 if(book===3)return 1.25
 if(book===4)return n<539?1.5:n<598?1.7:n<776?1.8:1.95
 if(book>=5&&book<=8)return book===8?2.7:2.5
 if(book===9)return n<192?8.95:n<404?9:n<1009?9.4:9.6
 if(book===10)return n<863?9.7:9.9
 if(book===11)return 10.05
 return 10.25
}
