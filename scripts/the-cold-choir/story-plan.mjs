// Source-reviewed authorial-section ledger. Internal paragraph cuts are added only
// where the later boundary audit records a place, cast, knowledge, or custody change.
export const eras={mercy:{timeline:'mercy',map:'mercy'},compact:{timeline:'compact',map:'compact'},quiet:{timeline:'quiet',map:'reach'}}

// Paragraph-level scene cuts. `end` is an inclusive, one-based paragraph number
// in the normalized authorial section. A missing end consumes the remainder.
// The audit records why each authorial section needs more than one event.
export const splits={
 2:[
  {end:19,title:"Captain's Bell",loc:'medbay',cast:['ilse','oyelaran','kesh'],description:'At the dying captain’s bedside, Oyelaran makes Ilse promise to remember whom the ship belongs to while Kesh witnesses the warning.',tension:3},
  {title:'After the Bell',loc:'medbay',cast:['ilse','tamsin','kesh','lund'],description:'Outside medbay, Ilse comforts Tamsin, accepts Kesh’s request to speak for the cold rows, and hears the bell transfer command to him.',tension:3}],
 5:[
  {end:16,title:"Pelican's Debt",loc:'wreck',cast:['osh','kit'],description:'Osh and Kit strip copper from a pressurized wreck while Osh restrains Kit’s curiosity about the sealed forward bay.',tension:3},
  {title:'The Debt Remaining',loc:'pelican-galley',cast:['osh','kit'],description:'Back aboard the Pelican, the salvagers reckon their meagre return against the inherited debt before Fane summons Osh.',tension:2}],
 7:[
  {end:29,title:"Lund's Arithmetic",loc:'forward-hold',cast:['ilse','kesh','bram','tamsin','hollin','lund'],description:'The ship council confronts Lund’s landfall mass and air budgets, and Ilse rejects any calculation that spends the four thousand sleepers.',tension:4},
  {title:'The Mass Audit',loc:'forward-hold',cast:['ilse','bram','hollin'],description:'After the council disperses, Ilse overhears Hollin ordering Bram to account for everything aft of frame six hundred.',tension:3}],
 10:[
  {end:19,title:'The Delegation',loc:'warden-residence',cast:['neve','jory','rhee','warden'],description:'Neve records the Union talks as the Warden refuses clean ice and both she and Captain Rhee notice his hand close around the Key.',tension:4},
  {title:'Why Give Up Water?',loc:'warden-residence',cast:['neve','jory'],description:'In the corridor after negotiations, Jory asks Neve why the Compact would sacrifice water to preserve a law about ice.',tension:3}],
 13:[
  {end:16,title:'Hollin at the Hatch',loc:'deck-nine',cast:['ilse','hollin'],description:'Hollin admits Ilse to the secured cold rows under guard, revealing that command has taken control of the Deck Nine hatch.',tension:3},
  {title:'The Clamp Audit',loc:'deck-nine',cast:['ilse','hollin'],description:'Below the cold rows, Ilse finds engineers testing whether the sleeper drum can be cut loose and refuses to surrender the Key.',tension:4}],
 15:[
  {end:13,title:'Investiture',loc:'hall',cast:['neve','warden'],description:'Neve watches the Warden keep the old vigil and recognizes the Key as a working tool marked by earlier hands.',tension:3},
  {end:14,title:'Rhee at the Vigil',loc:'hall',cast:['neve','warden','rhee'],description:'Captain Rhee quietly enters the Hall, studies the Key for a quarter of an hour, and leaves without speaking.',tension:3},
  {end:15,title:'The Vigil Ends',loc:'hall',cast:['neve','warden'],description:'At lamp rise, the Warden takes back the Key and the watching families file out of the Hall.',tension:3},
  {title:'The Warden’s Question',loc:'hall',cast:['neve','warden'],description:'After the families leave, the Warden presses Neve to finish the Roll for Landfall Day while she studies the tool on his chain.',tension:3}],
 21:[
  {end:19,title:'Shaft Twelve',loc:'shaft-twelve',cast:['rhee','ansel'],description:'Rhee leads the Obedient’s marines to the miners’ barricade, where an unauthorized shot kills a foreman and a child.',tension:5},
  {end:20,title:'The Count Becomes Twenty-One',loc:'shaft-twelve',cast:['rhee'],description:'Rhee dismisses her marines and helps the miners carry the dead child back toward Gallows Town.',tension:5},
  {title:'All Necessary Force',loc:'obedient',cast:['rhee'],description:'Alone aboard the Obedient, Rhee writes an exact report and recognizes that the sealed order protected the Interdict at any human cost.',tension:4}],
 29:[
  {end:9,title:'Gallows Town',loc:'gallows',cast:['osh','kit','saba','corso'],description:'The Pelican lands at abandoned Gallows Town, and Osh gives Kit two hours to visit the place her family left behind.',tension:3},
  {end:21,title:'The Union Hall',loc:'gallows',cast:['kit','saba'],description:'Kit leads Saba through the dead town to the Union memorial and explains why elapsed centuries cannot end the count.',tension:4},
  {title:'Keep the Count',loc:'gallows',cast:['kit','saba'],description:'On the walk back, Kit translates the repeated Kin inscription that reduces the town’s surviving instruction to four words.',tension:3}],
 35:[
  {end:14,title:'Thieves',loc:'interdict-field',cast:['osh','kit','saba','corso','fane'],description:'The drill finds a locked hull beneath the ice, and Fane arrives with armed guards and the Key needed to open it.',tension:4},
  {end:19,title:'The Decision to Steal',loc:'crawler',cast:['osh','kit','saba'],description:'In the dark crawler cab, the crew concludes that Fane means to kill them and agrees to take the Key before dawn.',tension:5},
  {title:'The Key Taken',loc:'interdict-field',cast:['osh','kit','saba','fane'],description:'Kit kills the lights while Osh and Saba steal the Key; rifle fire wounds Saba before the crew reaches the crawler.',tension:5}],
 38:[
  {end:6,title:'Deck Nine Falls',loc:'deck-nine',cast:['ilse','hollin'],description:'Hollin turns from the hatch and lets Ilse pass, choosing Bram’s memory over the order to stop her.',tension:5},
  {end:18,title:'The Fourth Release',loc:'deck-nine',cast:['ilse'],description:'Alone in the Drop Bay, Ilse forces the final release bolt, leaves the Key for whoever comes, and straps into the pilot cell.',tension:5},
  {title:'Ninefold Descent',loc:'cold-cell',cast:['ilse'],description:'Ilse pilots the detached sleeper drum onto Ninefold, hears the compressors survive the impact, and begins her final letter.',tension:5}],
 33:[
  {end:32,title:'Arrest',loc:'ring-b',cast:['neve','jory','calloway'],description:'In Mother Calloway’s front room, Neve entrusts Jory with the notebook before the Watch enters and takes him under an emergency order.',tension:4},
  {title:'After They Take Him',loc:'ring-b',cast:['neve','calloway'],description:'After Jory and the Watch leave, Neve and Mother Calloway sit with the warning that someone close to the archive betrayed the discovery.',tension:4}],
 39:[
  {end:1,title:'The Key Returned',loc:'bridge',cast:['hollin'],description:'At the first watch of Landfall Day, Hollin lays the Key on the captain’s chair and leaves the bridge without speaking.',tension:4},
  {end:13,title:'The Warden',loc:'bridge',cast:['tamsin','kesh'],description:'Alone on the bridge, Kesh makes Tamsin Warden and coerces her silence about the sleepers beneath Ninefold.',tension:5},
  {title:'The First Hidden Line',loc:'tamsin-cabin',cast:['tamsin'],description:'In her dark cabin, Tamsin opens Bram’s Ledger, prepares iron gall ink, and begins the record that authority forbids her to speak.',tension:4}],
 41:[
  {end:11,title:'The Broadcast',loc:'hall',cast:['neve','warden','calloway'],description:'During the Tricentennial ceremony, Neve replaces the official Roll feed with Tamsin’s hidden testimony while Mother Calloway watches from among the Kin.',tension:5},
  {end:20,title:'The Hatch Opens',era:'quiet',loc:'recovery-hatch',cast:['osh','kit'],description:'Seven centuries later beneath Ninefold, Osh turns the Key and opens the recovery hatch onto forty living rows.',tension:5},
  {title:'The Hall Answers',loc:'hall',cast:['neve','warden','calloway'],description:'Back in the Hall, the Watch seizes Neve as Mother Calloway and the Kin sing, then Calloway takes the rescued Roll pages into safekeeping.',tension:5}],
 42:[
  {title:"Rhee's Choice",loc:'obedient',cast:['rhee','ansel'],description:'Rhee and Ansel sound the ice, confirm four thousand living sleepers, disobey the destruction order, and file a false firing report.',tension:5}],
 43:[
  {end:4,title:'Shaft',loc:'shaft',cast:['osh','kit','fane'],description:'At the shaft head and ladder, Osh, Kit, and Fane descend through the buried entrance toward the cold rows.',tension:5},
  {end:36,title:'Fane in the Cold Rows',loc:'sleeper-hold',cast:['osh','kit','fane'],description:'Inside the sleeper hold, Kit stops Fane from cutting a cold unit; his guard abandons him after his death exposes the true cargo.',tension:5},
  {end:43,title:'The First Berth',loc:'sleeper-hold',cast:['osh','kit'],description:'Osh confirms Johanna Aalto’s berth survived untouched and Kit asks where the missing pilot cell lies.',tension:4},
  {title:'Toward the Pilot Cell',loc:'sleeper-hold',cast:['osh','kit'],description:'Osh and Kit cross all forty rows and descend the frozen maintenance well toward the pilot’s sealed compartment.',tension:4}],
 44:[
  {end:17,title:'Waking',loc:'cold-cell',cast:['osh','kit'],description:'Osh opens the pilot cell, finds Ilse Varga and reads the letter that transfers custody of the sleeping colony.',tension:5},
  {end:25,title:'Row Thirty-One',loc:'row-thirty-one',cast:['osh','kit'],description:'Back among the buried berths, Kit finds Ama Okafor’s plate and asks Osh to wake the child named in Bram’s ledger.',tension:5},
  {title:'Berth Twelve',loc:'row-thirty-one',cast:['osh','kit','ama'],description:'Ama wakes after seven centuries, hears that her father left a letter, and faces the remaining green lights with Osh and Kit.',tension:5}]
}

export const plans=[
 ['mercy','deck-nine',['ilse','tamsin'],'Ilse teaches Tamsin to hear failing machinery among the four thousand cold berths while the ship brakes toward landfall.',2],
 ['mercy','medbay',['ilse','oyelaran','kesh','tamsin'],'The dying captain entrusts Ilse with a warning about ownership, and Kesh inherits a command already constrained by arithmetic.',3],
 ['compact','hall',['neve','hal'],'Neve and Hal open the ancient Muster Roll and find generations of quartermasters checking the sleeping passengers by hand.',2],
 ['compact','spine',['neve','jory'],'A strike fills the station screens while Jory tells Neve the Roll stopped counting too early.',2],
 ['quiet','pelican',['osh','kit'],'Osh and Kit salvage a pressurized wreck and take on a debt that leads back toward the Hulk.',3],
 ['quiet','counting-house',['osh','fane'],'Marrow Fane records Osh’s obligations and offers work whose real price he keeps for later.',3],
 ['mercy','forward-hold',['ilse','kesh','bram','tamsin','hollin'],'The ship council confronts a landfall air budget that cannot wake every sleeper, and Bram refuses the numbers as a moral answer.',4],
 ['mercy','store',['ilse','bram'],'Bram’s private ledger shows a father measuring the remaining air against the daughter asleep in his keeping.',3],
 ['compact','conservation',['neve'],'Neve discovers a change in the Roll’s material and conceals her first doubts instead of reporting them.',2],
 ['compact','warden-residence',['neve','jory','rhee','warden'],'Formal negotiations record the Union’s demands while the Warden’s control of the room and the Key remains absolute.',3],
 ['quiet','pelican-galley',['osh','kit'],'Kit reads the inherited Names as prayer, keeping a count older than the faith that carries it.',2],
 ['quiet','hulk-spine',['osh','saba'],'Osh recruits Saba from the darkened Hulk and learns how thoroughly the old station has contracted around survival.',2],
 ['mercy','deck-nine',['ilse','hollin'],'Hollin joins Ilse at the hatch as failures multiply across the cold rows and duty becomes triage.',3],
 ['mercy','observation',['ilse','tamsin'],'Tamsin reports what navigation has found and accepts the precise risk of the approach Ilse asks her to make.',3],
 ['compact','hall',['neve','warden'],'Neve prepares the Roll for ceremony while the Warden’s investiture makes custody appear indistinguishable from possession.',3],
 ['compact','ring-b',['neve','calloway'],'Mother Calloway gives Neve the old Kin song and its insistence that the count must continue.',2],
 ['quiet','wreck',['osh','kit','saba','corso'],'The salvage crew enters dangerous wreckage to recover equipment for Fane’s expedition.',4],
 ['quiet','wreck',['osh','kit','saba'],'A surviving recorder changes what the crew believes about the history they have been hired to disturb.',4],
 ['mercy','store',['ilse','bram','tamsin'],'Ilse and Tamsin read the strongbox charter Bram has preserved and confront the ownership motive hidden inside the landfall arithmetic.',3],
 ['mercy','observation',['ilse','kesh'],'Kesh meets Ilse beneath the growing planet and reveals how command intends to spend the sleepers’ lives.',4],
 ['compact','shaft-twelve',['neve','jory'],'At the scene of the miners’ deaths, the official account and the surviving traces refuse to agree.',4],
 ['compact','archive-stair',['neve'],'Hidden orders expose the origin of an old prohibition and the purpose of the institution Neve serves.',4],
 ['quiet','counting-house',['osh','fane'],'Fane converts obligation into surety and binds the expedition to his terms.',3],
 ['quiet','chapel',['osh','lio'],'Brother Lio places the Key inside a broken religious history without claiming that history can absolve its keepers.',2],
 ['mercy','store',['ilse','bram','hollin'],'Fire and vacuum consume the quartermaster’s store, and Bram dies after preserving the record of his daughter.',5],
 ['mercy','ducts',['ilse','tamsin'],'Tamsin takes Bram’s book through the service ducts while Ilse remains behind to keep the rows alive.',4],
 ['compact','conservation',['neve'],'Neve reads the first line that the public ritual omits and commits herself to carrying it forward.',4],
 ['compact','hal-rooms',['neve','hal'],'Hal admits enough to help Neve act, then asks her to preserve his ignorance of the remaining plan.',4],
 ['quiet','gallows',['osh','kit','saba','corso'],'At the mining town, the crew finds the strike’s aftermath and the repeated command to keep the count.',4],
 ['quiet','interdict-field',['osh','kit','saba','corso'],'The expedition crosses the ice to the prohibited field while Fane’s observer watches them begin drilling.',4],
 ['mercy','archive-locker',['ilse'],'Old drawings reveal that the ship’s founding plan anticipated the same impossible choice now presented as necessity.',4],
 ['mercy','ducts',['ilse','tamsin'],'Tamsin calculates the narrow path that can preserve the sleepers if the crew accepts the cost of a single attempt.',4],
 ['compact','ring-b',['neve','jory','calloway'],'The Watch arrests Jory in Mother Calloway’s front room while the chain of omissions around the Roll closes around Neve.',4],
 ['compact','conservation',['neve','hal'],'Hal confesses his part in preserving the silence and leaves Neve with the Roll, the card, and her decision.',5],
 ['quiet','interdict-field',['osh','kit','saba','fane','corso'],'The crew seizes the Key as Fane’s claim collapses into violence at the buried entrance.',5],
 ['quiet','crawler',['osh','kit','saba'],'While Saba sleeps wounded, Kit reads the Names and the surviving crew prepares to descend at first light.',3],
 ['mercy','bridge',['tamsin','kesh','lund'],'During the final burn, Tamsin holds to the secret descent plan while Kesh and Lund watch the sleeper drum break free toward Ninefold.',5],
 ['mercy','deck-nine',['ilse','hollin'],'Ilse seals forty rows, loses the deck to pressure and fire, and continues the warden’s record while the ship falls.',5],
 ['mercy','bridge',['hollin','tamsin','kesh'],'Hollin returns the Key, Kesh forces the Wardenry on Tamsin, and she begins the hidden account in her cabin.',4],
 ['compact','hall',['neve'],'On the eve of the tricentennial, Neve prepares the Roll and herself for a public breach of custody.',4],
 ['compact','hall',['neve','warden','calloway'],'Neve broadcasts the omitted record while the narrative opens the same hatch seven centuries later and returns to the Kin song in the Hall.',5],
 ['compact','obedient',['rhee','ansel'],'Captain Rhee and Lieutenant Ansel reject the sealed order to destroy the evidence and leave the sleepers for whoever comes.',5],
 ['quiet','shaft',['osh','kit','saba'],'The surviving crew descends the engineered shaft beneath the ice with the Key and the Names.',5],
 ['quiet','cold-cell',['osh','kit','ama'],'Osh and Kit wake Ama Okafor, confirm the remaining lights, and begin reading the letter left across seven centuries.',5]
]

export const characters={
 ilse:['Ilse Varga','Deck Nine warden who reads machinery by touch and carries the Key before landfall.'],
 tamsin:['Tamsin Oyelaran','Young navigator and the captain’s daughter, trained to calculate the approach no previous generation attempted.'],
 oyelaran:['Ines Oyelaran','Dying captain of the Mercy who insists the ship belongs to the people aboard her.'],
 kesh:['Aurel Kesh','First officer who inherits command during the final deceleration.'],
 bram:['Bram Okafor','Quartermaster, keeper of a private ledger, and father of a sleeping daughter.'],
 hollin:['Dace Hollin','Watch corporal whose duty follows the Key through the crisis.'],
 neve:['Neve Castellan','Compact archivist whose close reading of the Roll uncovers the omissions protected by public ritual.'],
 hal:['Hal Oduya','Neve’s senior in the Hall, burdened by what earlier archivists chose to preserve in silence.'],
 jory:['Jory Mbeki','Ninefold Ice Union delegate and Kin singer.'],
 rhee:['Rhee Salvador','Captain of the cutter Obedient, assigned to security and capable of refusing its final order.'],
 warden:['The Warden-General','Custodian of the Compact’s charter, ceremonies, Watch, and public version of the Roll.'],
 calloway:['Mother Calloway','Elder of the Kin Quarter who remembers the song of the unfinished count.'],
 osh:['Osh Teague','Salvage captain of Pelican’s Debt, experienced in debts, wrecks, and hard choices.'],
 kit:['Kit','Osh’s young crewmate, reader of the Names, and the person who keeps asking who has not been counted.'],
 saba:['Saba Nkemelu','Skilled companion recruited from the shrinking Hulk for the Ninefold expedition.'],
 fane:['Marrow Fane','Counting House creditor who turns salvage, information, and people into entries in his ledgers.'],
 corso:['Corso','Fane’s taciturn drill-master on the Interdict Field expedition.'],
 lio:['Brother Lio','Priest on the Hulk who keeps damaged traditions and the history attached to the Key.'],
 lund:['Doctor Sefa Lund','The Mercy’s physician and keeper of the consumables model that defines the landfall crisis.'],
 ansel:['Lieutenant Ansel','A young officer aboard the Obedient whose certainty in Navy discipline changes after Shaft Twelve.'],
 ama:['Ama Okafor','The child in Row Thirty-One, berth twelve, awakened after seven centuries.']
}

export const locations={
 'deck-nine':['mercy','Deck Nine','Forty radial rows hold four thousand cryogenic berths above coolant trays and the outer hull.'],
 medbay:['mercy','Mercy medbay','The ship’s medical compartment becomes Captain Oyelaran’s last command room.'],
 'forward-hold':['mercy','Forward hold','An emptied cargo volume where the council meets under deceleration weight.'],
 store:['mercy','Quartermaster’s store','Bram’s inventory, strongbox, illegal still, and private accounting occupy this vulnerable compartment.'],
 observation:['mercy','Observation blister','A glass blister faces Hesper and gives private decisions the scale of the approaching world.'],
 ducts:['mercy','Forward service ducts','Narrow maintenance passages bypass watched corridors and carry people and records through the ship.'],
 bridge:['mercy','Mercy bridge','Navigation and command converge here during burn and landfall.'],
 'tamsin-cabin':['mercy','Tamsin’s cabin','A dark private cabin where Tamsin keeps Bram’s Ledger and writes the first hidden line in iron gall.'],
 'archive-locker':['mercy','Archive locker','Old ship drawings preserve plans that official memory no longer explains.'],
 hall:['compact','Hall of Muster','The Roll stands in a nave-like public archive used for marriage, schooling, investiture, and Landfall ritual.'],
 spine:['compact','The Spine','The old axial shaft has become the Compact’s bright main street and news corridor.'],
 conservation:['compact','Conservation room','Cold lamps and controlled tables let archivists examine the Roll away from ceremony.'],
 'warden-residence':['compact','Warden residence','The Mercy’s old bridge has become the formal room where the Compact conducts negotiations.'],
 'ring-b':['compact','Ring B and the Kin Quarter','The poorer rotating ring houses the Kin community and its oldest surviving songs.'],
 'shaft-twelve':['compact','Shaft Twelve','A Ninefold ice working whose collapse kills nineteen miners and begins the strike.'],
 'archive-stair':['compact','Lower archive stair','A cold restricted stair leads to orders and reports omitted from public memory.'],
 'hal-rooms':['compact','Hal Oduya’s rooms','Two quiet rooms on Ring A give Hal a place to confess outside the Hall.'],
 'watch-house':['compact','Watch-house','The Compact confines prisoners and protects its official order from the station outside.'],
 obedient:['compact','Cutter Obedient','Captain Rhee’s naval cutter holds position above the Interdict Field.'],
 pelican:['reach','Pelican’s Debt','Osh’s small salvage ship works wrecks and carries the crew between the Hulk and Ninefold.'],
 'counting-house':['reach','Counting House','Fane’s office in the old bridge displays relics surrendered by debtors.'],
 'pelican-galley':['reach','Pelican’s galley','A cramped red-lit compartment where the crew eats, argues, tends wounds, and reads the Names.'],
 'hulk-spine':['reach','Mercy Hulk','The ancient ship’s surviving heated corridor serves a diminished dock community.'],
 wreck:['reach','Salvage wreck','A damaged vessel in the Scree retains pressure, machinery, and a flight recorder.'],
 chapel:['reach','Chapel of the Father','A converted medbay side-room shelters candles, a cracked statue, and Brother Lio.'],
 gallows:['reach','Gallows Town','A Ninefold mining settlement stands beside Calloway’s Rift and the memory of the old ban.'],
 'interdict-field':['reach','Interdict Field','An empty reach of ice east of Gallows Town conceals a sealed shaft.'],
 crawler:['reach','Ice crawler','The expedition’s heated vehicle becomes shelter after violence at the field.'],
 shaft:['reach','Buried shaft','An engineered descent beneath Ninefold’s ice leads toward the preserved sleeper drum.'],
 'recovery-hatch':['hold','Recovery hatch','The keyed hatch and ladder open from the bore into the blue-lit sleeper drum.'],
 'sleeper-hold':['hold','The cold rows','Forty radial aisles hold four thousand intact berths around the buried drum’s central gangway.'],
 'row-thirty-one':['hold','Row Thirty-One','Ama Okafor’s berth lies among one hundred green-lit cold units in the thirty-first radial row.'],
 'cold-cell':['hold','Pilot cell','A maintenance well at the rim descends to Ilse Varga’s isolated waking station.']
}
