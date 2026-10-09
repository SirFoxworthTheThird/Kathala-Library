// A compact, reviewed action note for each participant at each event. Codes
// match event-meta.mjs; absent and not-yet-revealed people have no entry.
const rows = `
Holmes at Rest|H:Injects cocaine and explains how unoccupied days weigh on him|W:Challenges the drug use out of medical concern for his friend
The Consulting Detective|H:Defends his method and distinguishes observation from inference|W:Tests Holmes's claims against the cases he recalls in their room
The Watch Test|H:Examines the inherited watch for signs of its former owner's life|W:Hands over his brother's watch to test Holmes with a private object
A Painful Deduction|H:Explains how the worn watch and pawn marks yielded a painful account|W:Reacts sharply before recognizing the inference about his brother
A Visitor Announced|H:Receives a card and turns his attention to the unknown caller|W:Waits for the new client after the painful watch discussion|U:Announces the young woman's arrival from the stair
Miss Morstan Arrives|H:Invites the client to state the problem and listens closely|W:Sees Mary Morstan for the first time and attends to her request|M:Asks the two men to hear her strange private case
A Missing Father|H:Questions the circumstances of Captain Morstan's disappearance|W:Listens to Mary's account of the missed London reunion|M:Recounts how her father vanished after returning from India
The Pearls|H:Looks for a pattern in the anonymous annual gifts|W:Notes the unsettling gap between disappearance and gifts|M:Shows or describes the pearls sent to her year by year
An Invitation|H:Reads the new message for clues about its sender and terms|W:Agrees to accompany Mary to the meeting|M:Produces the letter inviting her to the Lyceum with two companions
After the Visitor|H:Studies Mary's handwriting and suppresses sentiment in his analysis|W:Admits his interest in Mary after she leaves|M:Leaves with her pearl box after arranging the evening meeting
Holmes's First Lead|H:Brings back evidence linking Morstan with Major Sholto|W:Receives Holmes's first concrete lead before the evening appointment
The Indian Diagram|H:Studies the marked paper Mary brings from her father's effects|W:Examines the diagram beside Holmes and Mary|M:Entrusts her father's Indian diagram to the investigators
At the Lyceum|H:Keeps watch as the party identifies the anonymous messenger|W:Accompanies Mary through the crowded theatre approach|M:Waits for the invitation's promised contact at the Lyceum
Through London|H:Observes the cab's route and tests where they are being taken|W:Rides beside Mary while the destination remains hidden|M:Travels with her chosen companions in the closed carriage
An Unfamiliar Door|H:Studies the guarded entrance and its surroundings|W:Follows the unknown guide into the poorly lit neighbourhood|M:Prepares to meet the man who summoned her
Thaddeus Sholto|H:Questions their nervous host without accepting his account yet|W:Observes Thaddeus and Mary's response to him|M:Confronts the sender of the annual pearls|A:Receives the visitors and begins to explain his summons
The Major's Fear|H:Tests Thaddeus's recollection of his father's troubled retirement|W:Listens for the connection between India and the hidden fortune|M:Hears how Major Sholto lived under an unexplained fear|A:Describes his father's guarded final years
Morstan's Fate|H:Separates the reported death from the concealment that followed|W:Watches Mary's response to news of her father|M:Learns what happened during her father's visit to Major Sholto|A:Relates the fatal quarrel and his father's silence
The Face at the Window|H:Examines the reported watcher as a clue to the major's fear|W:Attends to the sudden interruption in Thaddeus's story|M:Hears how the dying confession was broken by terror|A:Recalls the face that appeared at his father's window
A Pearl Each Year|H:Connects the annual gifts with the brothers' search for the chest|W:Considers how the treasure might affect Mary|M:Learns why Thaddeus sent the pearls without naming himself|A:Explains his share of the search and the gifts
Toward Pondicherry Lodge|H:Agrees to inspect the place where the chest was found|W:Accompanies Mary and Thaddeus southward|M:Travels toward the house that may settle her claim|A:Guides the party toward his brother's estate
At the Lodge|H:Studies the walled estate on arrival|W:Sees the dark house and uneasy grounds|M:Reaches the Sholto family property|A:Seeks his brother at the house after their appointment
The Guarded Gate|H:Persuades the porter to let the party enter|W:Waits with Mary and Thaddeus outside the barrier|M:Endures the delay at the guarded entrance|A:Identifies himself to the lodge guard|G:Challenges the arrivals before admitting them
A Darkened House|H:Notices the abnormal silence around Bartholomew's home|W:Crosses the grounds alert to danger|M:Follows the party toward the unlit house|A:Becomes worried by his brother's failure to greet them
Mrs. Bernstone|H:Questions the housekeeper about Bartholomew's seclusion|W:Listens to her frightened account near the entrance|M:Waits below as the concern about Bartholomew sharpens|A:Asks after his brother's locked room|N:Reports that her master shut himself away and does not answer
The Upper Passage|H:Inspects the locked chamber from the upper passage|W:Climbs with Holmes and prepares to force entry|A:Faces the possibility that his brother is in danger
Bartholomew Found|H:Enters the chamber and reads the death scene|W:Sees the body and the written sign after the door opens|A:Finds his brother dead in the locked room|B:Lies dead when the locked chamber is opened
A Poisoned Thorn|H:Identifies the small fatal wound and warns Watson about the thorn|W:Examines the body carefully after Holmes's warning|A:Struggles to absorb the manner of his brother's death|B:Remains dead while the wound is examined
The Missing Treasure|H:Sees that the chest has vanished from the chamber|W:Assesses the theft alongside the murder|A:Discovers the missing fortune and fears he will be blamed|B:Remains dead beside the emptied hiding place
The Window Marks|H:Reads the wooden-leg track and rope marks at the window|W:Follows the physical argument Holmes builds from the room|B:Remains dead in the chamber while the escape route is examined
Above the Chamber|H:Climbs to the roof and distinguishes the small bare prints|W:Checks the trapdoor and roof route with Holmes
The Creasote Trace|H:Finds the strong scent that could guide a tracking dog|W:Agrees to obtain Toby so the escape route can be followed|B:Remains dead as the chamber investigation continues
Athelney Jones|H:Challenges the inspector's theory with traces from the room|W:Witnesses the clash of methods at the death scene|J:Arrives to investigate and advances his own reconstruction|B:Remains dead while the police inspect the chamber
An Arrest|H:Objects to the detention of a man he thinks innocent|W:Sees Thaddeus taken despite Holmes's evidence|J:Orders Thaddeus Sholto into custody|A:Submits to arrest after finding his brother dead|B:Remains dead at the center of the official inquiry
Separate Errands|H:Sends Watson to take Mary home and fetch Toby|W:Undertakes the Camberwell journey and the dog errand|J:Continues the official case after the arrest
Mary Home Safely|W:Escorts Mary to Camberwell before turning back to the case|M:Returns home shaken by the death and her father's story|F:Receives Mary and Watson at the Camberwell house
Toby at Pinchin Lane|W:Wakes the animal keeper and asks for the scent dog|D:Lets Watson take Toby for Holmes's investigation|K:Leaves the keeper to follow Watson into the night
Back at the Lodge|H:Prepares to test the creasote trail from the estate|W:Returns with Toby to resume the search|K:Waits to take the scent at Pondicherry Lodge
The Footprints Revisited|H:Compares the accomplice's small prints with the room evidence|W:Checks the bare marks before the outdoor search|B:Remains dead while the chamber evidence is revisited
Over the Wall|H:Reconstructs the intruders' path across roof and ground|W:Follows Holmes out from the house toward the boundary|K:Takes the scent beyond the wall
The Morning Trail|H:Follows the dog and reasons about the wooden-legged fugitive|W:Keeps pace through the waking suburbs|K:Tracks the creasote across the south London streets
The Trail Turns|H:Keeps Toby on the turning trace toward the river|W:Notes the changing streets along the pursuit|K:Leads them through the next stretch of the scent trail
The Wrong Barrel|H:Recognizes that a second creasote source has misled the dog|W:Helps turn back from the timber yard|K:Stops at the misleading creasote barrel
The Scent Recovered|H:Returns to the branching trail and selects the true line|W:Helps retrace their steps after the false lead|K:Finds the earlier scent again
At the River|H:Sees that the trail ends at a boatman's landing|W:Reaches the Thames after the long walk|K:Brings the pursuit to Smith's Wharf
Mrs. Smith's Account|H:Questions the boatman's wife about the hurried departure|W:Listens for the Aurora's appearance and destination|Q:Explains what she knows of her husband's launch
The Aurora|H:Builds a river search from the launch's description|W:Considers the difficulty of finding one boat on the Thames
A Search Ordered|H:Arranges wider help and returns to Baker Street|W:Accompanies Holmes after the wharf inquiry
Jones in Print|H:Reads the newspaper's competing police account critically|W:Sees how the public account differs from the clues they found
The Irregulars|H:Commissions Wiggins and the boys to search for the launch|W:Observes the unusual group of river scouts|U:Admits the street boys to the rooms|V:Accepts Holmes's search instructions for the Aurora
The Second Footprint|H:Explains how the small bare prints constrain the accomplice's identity|W:Tests Holmes's theory against the marks seen at the lodge
No Word from the River|H:Waits for reports while revisiting the launch problem|W:Wakes to find the river search still unresolved
A Call in Camberwell|W:Returns Toby and visits Mary after the night investigation|M:Receives Watson and hears his account of the search|F:Welcomes the visitor at the Camberwell house
Holmes Restless|H:Shows strain as the Aurora remains unfound|W:Finds his friend consumed by the stalled case|U:Sees the detective working through the prolonged wait
The Search Widens|H:Considers new ways a launch could disappear from sight|W:Listens as Holmes reworks his river strategy
A Sailor's Disguise|H:Puts on a seaman's clothes to investigate the yards himself|W:Sees Holmes leave Baker Street in costume
An Advertisement|H:Waits for news from his notice about Smith and the Aurora|W:Reads the advertisement and infers Holmes's next tactic
Jones Returns|W:Receives Jones at Baker Street while Holmes is away|J:Brings a telegram and admits he needs Holmes's help
The Old Sailor|W:Questions the stubborn elderly caller without knowing who he is|J:Tries to draw the promised information from the stranger|R:Insists that Holmes must hear his news directly
Holmes Revealed|H:Removes the sailor disguise and reports his discovery|W:Recognizes Holmes after the unmasking|J:Learns that the caller has found the launch
A Plan for the River|H:Asks Jones for an unmarked launch and police support|W:Prepares to join the river operation|J:Agrees to supply the boat and men
Before the Chase|H:Prepares his companions for an armed arrest|W:Carries his revolver and readies himself for danger|J:Sets the police operation in motion
Westminster Stairs|H:Boards the police boat for the evening watch|W:Embarks with Holmes and Jones|J:Commands the launch and its crew
The Hidden Launch|H:Explains the clue that led him to Jacobson's yard|W:Understands why the repair yard has been watched|J:Tests Holmes's information against the men on the river
Across the Thames|H:Watches the yard through passing river traffic|W:Tracks the target while the police launch waits|J:Keeps his men ready to pursue
The Aurora Runs|H:Orders the pursuit as the black launch emerges|W:Sees the fugitives race downstream ahead|J:Directs the police boat after the Aurora|S:Tries to outrun the pursuing officers from the Aurora|O:Travels with Small as the chase closes|P:Steers his fast launch at Small's command
Shots at Close Range|H:Confronts the fugitives as the boats draw together|W:Fires as the attack threatens the police launch|J:Completes the pursuit and takes Small into custody|S:Survives the collision and is captured|O:Attacks from the Aurora and falls after being shot|P:Tries to keep the Aurora moving through the violent encounter
Small in Custody|H:Questions Small immediately after the capture|W:Observes the prisoner and the recovered iron chest|J:Guards Small aboard the police launch|S:Argues over the treasure while handcuffed
The Iron Chest Arrives|W:Carries the heavy recovered chest into Mary's room|M:Receives Watson and the box that may contain her inheritance
The Chest Is Empty|W:Opens the chest and sees the fortune has vanished|M:Finds no jewels inside the chest brought to her
Watson Speaks|W:Confesses his love once the fortune no longer separates them|M:Accepts Watson after the empty chest removes his hesitation
Back at Baker Street|H:Receives Watson and asks Small for the full history|W:Returns with the empty chest and listens to Small's protest|J:Presses the prisoner about the missing jewels|S:Claims the treasure as the four men's property
Small's Early Life|H:Invites a complete explanation from his prisoner|W:Listens to Small's account of youth and lost leg|J:Keeps watch while the testimony begins|S:Recalls Worcestershire, military service and the crocodile attack
The Agra Fort|H:Listens for the origin of the hidden treasure|W:Hears Small place himself at the fort during the uprising|J:Waits through the historical account|S:Describes his dangerous posting at Agra
A Proposal at the Gate|H:Attends to how the four conspirators first joined|W:Hears Small describe the night guard's offer|J:Maintains custody as Small recounts the bargain|S:Explains how the Sikh guards recruited him
Achmet's Journey|H:Asks how the merchant and jewels entered the plan|W:Listens to the account of the disguised merchant's approach|J:Stays with the prisoner through the longer testimony|S:Relates what he was told about Achmet and the box
The Merchant Arrives|H:Listens to Small's account of the challenge at the gate|W:Hears the frightened merchant's plea as Small recounts it|J:Keeps the captive speaker in view|S:Describes admitting Achmet with the iron chest
The Killing|H:Tests Small's account of the murder and concealed jewels|W:Recoils at Small's description of the attack|J:Listens for evidence relevant to Small's trial|S:Admits his part in the killing and hiding the box
Imprisoned Partners|H:Traces how the agreement survived the convictions|W:Hears why the four lost access to their treasure|J:Keeps guard during the prison account|S:Describes the conspiracy's exposure and imprisonment
The Andamans|H:Listens for the route from prison to England|W:Hears how Small observed the officers' debts|J:Remains attentive to the escape narrative|S:Recalls the penal settlement and his chance to bargain
Sholto Hears of the Treasure|H:Notes when Major Sholto learned the secret|W:Hears how Small tested Sholto with the treasure claim|J:Watches Small as the account nears the Sholto family|S:Describes drawing the major into negotiations
A Bargain with Two Officers|H:Tracks the terms offered to Sholto and Morstan|W:Hears his future father-in-law named in the secret bargain|J:Listens for the officers' obligations|S:Demands freedom for all four partners in return for the map
The Agreement|H:Confirms why the four names appear on the diagram|W:Connects Mary's paper with Small's prison bargain|J:Keeps the prisoner in custody during the final terms|S:Describes the signed agreement and the map handed over
Tonga's Help|H:Listens for the accomplice's role in Small's escape|W:Hears Small identify Tonga as his boatman and ally|J:Notes how Small escaped the Andamans|S:Credits Tonga with the boat that made flight possible
Years of Pursuit|H:Connects Small's movements with Sholto's death and the hidden box|W:Hears how years of resentment led back to London|J:Waits for the explanation of the Norwood crime|S:Describes following Sholto and using Tonga at fairs
The Case Explained|H:Checks Small's final account against the physical evidence|W:Hears the last details of the Norwood and river case|J:Prepares to remove the prisoner|S:Answers questions about the chest and Tonga's weapon
After the Case|H:Returns to cocaine as another case ends|W:Tells Holmes of his marriage plans and reflects on their work
`

export const snapshotNotes = Object.fromEntries(rows.trim().split('\n').map(line => {
  const [title, ...rest] = line.split('|')
  const notes = Object.fromEntries(rest.map(value => [value.slice(0, value.indexOf(':')), value.slice(value.indexOf(':') + 1)]))
  return [title, notes]
}))
