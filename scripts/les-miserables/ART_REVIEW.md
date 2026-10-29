# Les Misérables artwork review

All artwork remains in local staging until the complete edition passes its gates.

## Cover

- Original generated illustration: a working man carrying a small girl through
  an early nineteenth-century Paris lane, with candlelight at an open doorway.
  The composition represents the book’s concern with care and refuge rather
  than claiming to reproduce one literal street view.
- First candidate rejected: the distant cathedral included a spire inconsistent
  with the period represented. It is not a release asset.
- Corrected candidate: the cathedral and spire are removed; modest rooftops and
  chimney pots form the distant skyline. The two candlesticks read as silver
  under warm light. No lettering, modern objects or map imagery.
- Corrected full-resolution PNG visually inspected. The carried child’s posture,
  supporting arm, adult clothing and setting are coherent. Warm doorway and cool
  receding city give a clear portrait composition.
- Compressed WebP visually inspected at 1024 × 1536. The child’s face, hands,
  coat texture, stone paving, rooftops and candlelit doorway retain the required
  detail without obvious blocking or ringing. 438,828 bytes versus 3,204,381
  bytes for the PNG, an 86.3% reduction. Accepted as the staged cover.
- Generated with OpenAI’s built-in image tool; no historic engraving attribution
  is claimed. Source and encoded file hashes are recorded in ART_ENCODING.json.

## First six portraits

Original PNGs and the compressed WebP contact sheet were visually inspected:

- Valjean: the robust, weathered traveller of October 1815, with a long beard,
  short hair, visor cap, patched gray blouse, knapsack and knotty stick.
- Myriel: the elderly bishop of the opening frame, plainly dressed in a modest
  room with books; not an ornate mitred ceremonial portrait.
- Fantine: the golden-haired young working woman of the Paris excursion, before
  the loss of hair and teeth. The first candidate’s anachronistic cathedral was
  removed; only modest rooftops remain in the accepted candidate.
- Javert: a severe inspector with large cheek whiskers, flat nose, powerful jaw,
  battered hat, gray coat and concealed cane, rather than a modern police uniform.
- Baptistine: a pale, thin, elderly laywoman with a book, without a nun’s habit.
- Magloire: a stout, practical elderly housekeeper beside the pink sideboard,
  contrasted with Baptistine’s build and reserve.

All six have distinct faces, clothing and settings. Their compressed versions
retain readable facial features and fine linework on the contact sheet. They
are accepted staging assets, not evidence that the whole book’s art is complete.
No portrait is assigned to an unrelated character. Standing portraits represent
the introductory period; age changes in the novel still require source-aware
review when the complete cast is integrated.

## Thirteen further portraits

Each original was opened individually, after the twelve-candidate contact sheet
review. The accepted subjects are Cosette, Thénardier, Madame Thénardier, Marius,
Gillenormand, Courfeyrac, Enjolras, Combeferre, Bossuet, Joly, Jean Prouvaire,
Feuilly and Bahorel. Cosette is the sleeping toddler of the first Montfermeil
encounter. The innkeepers have contrasting builds. Gillenormand wears old-fashioned
civilian finery. Bossuet has a young face and bald crown; Joly touches his nose
with his cane. Prouvaire has his flute and flowers, Feuilly works on a fan, and
Bahorel wears a bright waistcoat beneath a frock coat. Enjolras is youthful and
fair, without a weapon or a later battle scene. The remaining students have
distinct faces and quiet civilian settings. No later injury or death is depicted.

The original Grantaire candidate was rejected as too conventionally handsome.
The second was also unaccepted for the same concern. Neither was copied into
accepted sources. Reviewing the first candidate exposed a prompt defect: the
opening 6,500 characters of the long group introduction omitted later members’
own portraits. The art planner now quotes their individual descriptive paragraphs
and records those paragraph ranges; a regression test covers Grantaire, Bossuet
and Joly. The compressed versions were also inspected on
`qa/portrait-encoding-13.jpg`: faces, clothing and fine linework remain legible.
This confirms their staged encoding, not complete-world or in-app image QA.

## Completing the first principal-character batch

Gavroche, Mabeuf and Fauchelevent originals were opened individually. Gavroche
is a ragged child rather than an adult fighter; Mabeuf is an elderly civilian
with books and plants; Fauchelevent is the old carter beneath the wagon at his
introduction. Toussaint is an elderly servant in plain clothing and a linen cap.
All four originals are accepted.

The first Éponine image was rejected because it included both sisters’ faces.
The first Azelma looked older than the source’s eighteen months. Targeted edits
produced separate, unambiguous, fully clothed toddler portraits; both corrected
originals were opened and accepted. Their precise introductory ages, two and a
half and eighteen months, are now explicit in the art planner.

The third Grantaire candidate was opened and accepted: the face is broader and
less symmetrical, with a broad nose, heavy brows, natural stubble and an ironic
expression, without grotesque or animal features. It retains the ordinary
civilian clothes and café setting. This is an interpretive fictional portrait,
not a claim that the text specifies each facial feature.

The accepted sources now comprise the cover and 26 introductory portraits.
The last seven encoded portraits were inspected on `qa/portrait-encoding-7.jpg`.
Faces, clothing, chains, plants and the wagon remain distinct and legible. All
27 current encodings have therefore had a visual pass; this is still staged
asset QA. The remaining proposed roster and all other illustration categories
remain open.

## The 1817 circle, the trial and the convent

Nine additional original portraits were opened individually. Tholomyès is
prematurely worn and balding, rather than a youthful romantic lead. Favourite
has an informal working woman's costume; Champmathieu is a weathered laborer
in a plain interior. Sister Simplice has a nursing apron and period cornette;
Mother Innocente is a short, stout older Benedictine. Little Gervais is a
travelling child with his instrument and coin. Napoleon is an adult emperor,
without a premature Waterloo scene.

The first Dahlia and Zéphine candidates were rejected because their dark-haired
faces, red scarves and seated poses repeated Favourite too closely. Revised
prompts distinguish interpretive, unspecified facial features and period
dresses without presenting those choices as Hugo's descriptions. Both new
originals were opened individually: Dahlia stands by a garden table in blue;
Zéphine stands at a gate in green. Their faces and silhouettes are distinct.

These nine accepted sources bring staging to 35 portraits and the cover.
Their nine WebP encodings were inspected on `qa/portrait-encoding-next9.jpg`; faces, hands, fabric and instrument details remain clear. Acceptance is pinned to the reviewed source and encoded hashes.

## The Gillenormand household and the band

Ten further originals were opened individually and accepted: Pontmercy, Magnon,
Montparnasse, Babet, Gueulemer, Claquesous, Brujon, Basque, the current Nicolette
and Mademoiselle Gillenormand. Pontmercy has the cuirass, epaulette, cross and
subdued facial mark already established at Waterloo, without gore. Basque is
heavy and middle-aged; the two female servants and the severe older daughter
have distinct faces and clothing appropriate to their positions.

The band’s portraits follow their separate descriptive paragraphs: Gueulemer’s
size, short coarse hair and working waistcoat; Babet’s thinness, newspaper and
plaster bust; Montparnasse’s youth, curled hat and worn fashionable coat;
Claquesous’s consistently hidden face. Brujon is a long-haired young man with
a plaintive expression, not the police inspector described at his first mention.
His descriptive excerpt was therefore selected separately, as were the band’s
individual introductions. Animal metaphors remain prose, not anatomy.

All ten WebP results were inspected on `qa/portrait-encoding-10.jpg`. Masks,
faces, hands, costume, ornament and the folded paper remain clear. There are
now 45 accepted introductory portraits plus the cover, with both original and
encoded bytes bound to their review decisions. Other required artwork and the
in-app pass are still incomplete.

## Cardinal and early Digne roles

Fesch, hospital director and Géborand originals opened individually; encoded versions inspected on qa/portrait-encoding-fesch-group.jpg. Fesch retains clerical red and restrained interior; director is a distinct balding administrator in the hospital setting; retired merchant has civilian coat, patterned waistcoat, watch chain and hat. Unspecified faces/furnishings remain artistic interpretation. No later outcomes or landmarks painted. Three byte-bound acceptance rows added; full-book art coverage remains incomplete.

## Marquis, countess and Digne prisoner

Originals individually inspected; compressed versions inspected on qa/portrait-encoding-countess-group.jpg. Champtercier is an elderly civilian aristocrat; condemned prisoner is alive in a cell, without execution or invented injury. Countess first candidate rejected for later Victorian costume; accepted revision uses high-waisted early nineteenth-century gown, muslin neck covering and simple cap. All unspecified faces remain artistic interpretation. Full revision prompt retained in character-art-revisions.mjs.

## Curate, mountain guide and Cravatte

Originals individually inspected; compressed versions inspected on qa/portrait-encoding-guide-group.jpg. Curate has sober clerical dress, guide has natural child proportions and modest travelling clothes. Cravatte’s first candidate rejected for unsupported firearm fittings; selected revision removes all weapons and preserves ordinary adult mountain traveller appearance. Revision prompt retained. No later outcomes depicted.

## Châtelet sergeant and mountain parish roles

Three originals individually inspected and compressed versions reviewed on qa/portrait-encoding-sergeant-group.jpg. Sergeant has sober blue period dress and bicorne rather than later kepi; official Police Nationale history confirms bicornes for the 1829 corps: https://www.police-nationale.interieur.gouv.fr/dossiers/police-nationale-protection-de-population-depuis-des-siecles/jalons-de-police-moderne-1829-1884 . Specific face and minor dress details artistic interpretation. Mountain curate has worn village vestments, distinct angular face; Chastelar mayor has ordinary civilian clothes and an anxious warning gesture. No later outcome or identifying landmark.

## Six further early Digne roles

Originals individually opened, compressed images inspected on qa/portrait-encoding-digne-six.jpg. Senez mayor distinguished from Chastelar through unspecified artistic facial features. Conventionary has source white hair and peasant armchair, alive; shepherd is a boy with the source milk jar, revised to distinguish his face from the mountain guide. Labarre is source innkeeper/chief cook, scullion a kitchen boy with folded paper. Town-hall gendarme’s political cockade removed; plain period bicorne retained. No later death, execution or injury pictured. Selected revisions preserved in character-art-revisions.mjs.

## Chaffaut publican and fishmonger

Two originals individually inspected; compressed versions inspected on qa/portrait-encoding-publican-pair.jpg. Narrow dark-bearded publican at the hearth differs from the broad clean-shaven cook Labarre; watchful red-moustached fish dealer is seated at a table with basket. These unspecified features are artistic interpretation, not source biography. Traveler’s described appearance is not transferred to either subject; no other character or later exclusion scene painted.

## Digne wicket and household portraits
Three originals individually inspected and compressed versions checked on qa/portrait-encoding-digne-household.jpg. Turnkey visible through the wooden wicket, no modern uniform. Householder preserves source age about forty, black whiskers and leather apron; the lamp replaces any need to depict an uncertain firearm. Wife shown alone, fully clothed, a young adult at the table rather than a nursing tableau. Unspecified faces artistic interpretation. Full built-in prompts retained in portrait-batch-seven-prompts.json; selected original PNGs copied into image-sources/characters.

## Marquise, sister and concealed manufacturer
Three originals individually opened, encodings checked on qa/portrait-encoding-marquise-group.jpg. Marquise elderly with simple early nineteenth-century clothing and purse. Sister an adult working widow in retrospective rural clothing, not an elderly woman; unspecified features artistic interpretation. Madeleine shown from behind at a black-bead workbench, face concealed and no identifying silver/prison/mayoral props. Full built-in prompts retained in portrait-batch-eight-prompts.json. These portraits do not close final in-app art review.

## Students and women around Fantine
Six originals individually opened, encoded versions inspected on qa/portrait-encoding-students-factory.jpg. Blachevelle, Fameuil and Listolier are young adult students in early Restoration dress, with distinct unspecified faces/hair interpreted artistically. Victurnien is source age56, not a literal gorgon. Superintendent is the elderly unmarried workroom supervisor of48:2, not a young clerk; first costume rejected for large later sleeves/natural waist, targeted revision restores narrow sleeves and high Empire waist. Marguerite is an old poor charitable neighbor, distinct from Fantine. Full built-in original/edit prompts retained in portrait-batch-nine-prompts.json; selected PNGs copied into source folders. No final in-app portrait review claimed.

## Bamatabois and infirmary staff
Three originals individually inspected; q88 encodings inspected on qa/portrait-encoding-infirmary.jpg. Bamatabois wears the source morillo, cloak, cravat and olive civilian clothing, before the assault. Doctor’s first candidate included a wooden instrument: early monaural stethoscopes are period-supported (Science Museum Group, Laennec object A106078, circa1820: https://collection.sciencemuseumgroup.org.uk/objects/co90986/laennecs-stethoscope), but the selected revision omits the specific instrument rather than claiming that exact design in Fantine’s examination. Perpetue retains source robust build and ruddy face; revised from gathered domestic cap toward the modest early white cornette, and unwanted church silhouette removed. The Daughters of Charity’s own historical notes describe the cornette becoming obligatory in1685, larger in the eighteenth century and stiffened in the nineteenth: https://filles-de-la-charite.org/en/download/sv-coste-02-table-index-and-notes/ . Exact faces and cloth arrangement remain artistic interpretation. Full builtin prompts and revisions preserved in portrait-batch-ten-{prompts,revisions}.json; selected originals copied into workspace. Final in-app portrait review remains open.

## Three Arras witnesses
Originals individually opened; q88 encodings inspected on qa/portrait-encoding-arras-witnesses.jpg. Brevet has the source age60 and black/gray central-prison waistcoat (64:21); Chenildieu is a frail wrinkled man about50 with red convict clothing and green cap (64:28); Cochepaille is interpreted as a broad weathered former mountain shepherd in red (64:33). No literal animal anatomy, grotesque caricature or identifying tattoo/burn pictured. Portrait plans explicitly use the later descriptive paragraphs rather than borrowing Valjean’s appearance from Brevet’s earlier mention in a remembered song. Exact unspecified faces are artistic interpretation. Full prompts saved in portrait-batch-eleven-prompts.json; selected original PNGs copied into the workspace. Final in-app portrait review pending.

## Montreuil tradespeople, officials and carriage-hirers
Ten originals individually inspected, q88 encodings checked on qa/portrait-encoding-montreuil-{1,2}.jpg. Public writer is elderly with quill; furniture dealer and landlord have distinct interpretations and settings. Barber has period comb/scissors, tooth-puller the source red coat and travelling stall, old listener an ordinary respectful depiction. Guard has a period military coat and candle; rejected unsupported sleeve chevrons removed in the selected revision. Postmistress examines Javert's letter, with no modern stamp or readable address. Scaufflaire stitches harness and his wife has a separate portrait. No haircut/extraction, other protagonist or later outcome depicted. Unspecified faces, minor clothing and settings artistic interpretation. Full prompts and selected mapping/revision retained in portrait-batch-twelve-{prompts,selected}.json.

## Arras court and Madeleine household
Ten originals individually inspected; compressed images checked on qa/portrait-encoding-arras-household-{1,2}.jpg. President, prosecutor, defence advocate and hallway lawyer have separate faces/poses with sober period court clothing, no British wigs or modern gavels. Usher at the double door, older lantern-bearing citizen, landlady, posting clerk, elderly portress with candle/key and cashier in his own room have separate assets. Minor dress/faces/backgrounds are artistic interpretation. The postal clerk's background carriage is illustrative, not a reconstruction of the two-seat mail wagon. Full prompts and selections retained in portrait-batch-thirteen-{prompts,selected}.json. Final in-app review still pending.

## First six object illustrations
All originals individually opened; q88 encodings inspected on qa/item-art-encoding-one.jpg. Pair of substantial silver candlesticks with wax candles; separate partial dining-service arrangement with soup ladle. The prose's knives/forks versus forks/spoons wording is preserved, not resolved into a claimed complete visible inventory. Yellow passport is a large recently carried sheet; first candidate rejected for excessive archival decay and invented stamp, selected revision has usable folds and no stamp/readable wording. Coin is one worn silver piece with indistinct die design, not a claimed exact surviving issue. Thorn cudgel has iron ferrules at both ends, shown intact at its modelled introduction. Old travelling outfit has blue linen smock, trousers and knapsack; collared button-down shirt candidate corrected to a gathered work blouse. Exact decoration/marks are artistic interpretation. Full prompts and revision/selection mapping saved in item-art-batch-one-{prompts,selected}.json. These are separate object art, not maps or portraits. Final all-object and in-app review remains open.

## Object batch two: Cosette's belongings and the watering-pot

Six individually generated object images were inspected at original size and again after WebP encoding on qa/item-art-encoding-two.jpg. Full original prompts, depiction constraints, selected file mapping and two revision prompts are retained in item-art-batch-two-selected.json. The first wardrobe and doll images were rejected for later Victorian dress detail; the selected revisions use restrained high Empire waists and straight gathered skirts. The source specifies the wardrobe's silk gowns but not their precise colors or bag ornament; those are editorial interpretations. The bucket's wood staves and iron hoops are period interpretation, not an asserted material quotation. Stockings are child-size wool work in progress; the lead sword is a tiny toy shown beside a thimble for scale. Catherine retains the specifically described pink crepe, gold wheat ears, hair, enamel eyes and white napkins. The watering-pot is specifically green-painted tin. No image encodes a later ownership or damage outcome.

All six compressed targets preserve composition and dimensions and show legible subjects without visible encoding damage. Exact source/target hashes have been added to ART_ACCEPTANCE.json. Ordinary item images now number12; total accepted art116. In-app review of this newest six remains pending and is separate from visual acceptance.

## First ordinary place illustrations

Six source-passage candidates are defined explicitly in location-art-plan.mjs: dining room, bedchamber, guest alcove, garden, Labarre's kitchen and printing-office bench. Every depicted passage was read before generation. Full prompts and selected/revised originals are retained in location-art-batch-one-selected.json. These are eye-level place illustrations, separate from all53 topographic maps.

Originals were inspected individually and compressed subjects/compositions inspected on qa/location-art-encoding-one.jpg. Three first versions were rejected: an invented monumental cathedral facade was reduced to an unidentifiable church side wall; a later-looking factory kitchen range was replaced with plain period masonry cooking openings; and the oratory's ornate liturgical display was replaced with a plain draped pink sideboard and simple cross. The remaining room and garden features follow chapter6; minor surface finishes, furniture ornament, ordinary vessels and background buildings remain explicit artistic interpretations, not surveyed reconstruction. The four-plot garden retains three vegetable plots and one flower plot around the tank and crossing paths.

Six ordinary location images accepted by exact original/encoded hashes. Total122 accepted art images: cover,103 portraits,12 objects,6 places. Remaining242 portraits,99 objects,410 places. In-app review of these six place pictures remains open.

## Journey and Waterloo-visit portraits

Ten further originals and both compressed contact sheets qa/portrait-encoding-road-visit-1.jpg and -2.jpg were inspected. Full source prompts and selected mappings/revisions are in portrait-batch-fourteen-selected.json. The Hesdin boy and Tinques stable-boy are distinct youthful subjects; the old cart owner is not the rosy Saint-Pol innkeeper or her young servant. The first stableman picture's brown horse was rejected because the source traveller's horse is white: the selected edit removes the horse and wheel entirely. The first postilion cap was revised to remove a later-looking visor; exact vehicle geometry is excluded from the selected portrait. Source facial descriptions are retained where explicit; unspecified age, face and work clothes are editorial interpretation.

The later traveller and Hougomont women belong to1861, not the1815 combat. The granddaughter is gray-haired and approximately49 on the supplied ages, rather than being drawn as the child of her recollection. The traveller is an interpretive narrator figure, not a claimed authenticated likeness of Victor Hugo. No future death, military action or readable inscription appears.

All ten exact original and encoded hashes accepted. Current132 images: cover,113 portraits,12 objects,6 ordinary places. Missing232 provisional portraits,99 objects,410 ordinary places. The prior browser fixture42149b... passes12checks with38 images including the six ordinary place pictures. Those screenshots prove display, not acceptance of the newest ten; their in-app checks are being refreshed separately.

## Opening reference portraits

Ten further originals and both encoded contact sheets qa/portrait-encoding-opening-reference-1.jpg and -2.jpg were inspected. Full source prompts, file mapping and revision prompts are in portrait-batch-fifteen-selected.json. Distinct roles include the imperial senator and prefect, Baptistine's correspondent, the impertinent dowager, the wealthy episcopal colleague, the former porter, the proposed locksmith, Mother Gerbaud, Marie-Claude and Maubert Isabeau. The porter wears civilian clothes because the source explicitly says he refuses his regimentals; the locksmith portrait does not invent his attendance or installation of bolts. Mother Gerbaud is old as the source calls her, with her child kept out of this individual portrait. The Faverolles neighbors use the earlier rural period rather than the later Paris fashions.

Three initial versions were rejected and revised: the prefect's and correspondent's background towers were removed, and the dowager's later-looking dress was replaced with a high Empire waist and narrow sleeves. All other unspecified faces and garments are artistic interpretations. Exact original and compressed hashes accepted. Current142 images: cover,123 portraits,12 objects,6 ordinary places. Missing222 provisional portraits,99 objects and410 ordinary places. App display review of the newest ten remains pending.

## Provincial and excursion portraits

Ten further source plans, original images and encoded contact sheets qa/portrait-encoding-provincial-1.jpg and -2.jpg were reviewed. Full source prompts, mapping and two revisions are retained in portrait-batch-sixteen-selected.json. The Grasse employer, gendarme and labourer are distinct subjects. The return brigadier is distinct from the local passport inspector; his first image's tricolor cockade was removed because the episode follows the1815 Restoration. The distillery owner's background towers were also removed. The priest's ordinary travelling clothes do not turn him into a bishop. Labouisse is an interpretive elderly poet, not a claimed authenticated likeness. Favourite's neighbour is depicted in civilian clerk's clothes, not an invented theatrical role. The waiter carries an unreadable folded paper; the neighbour is not the crying mother, and the old Montreuil woman remains a separate source subject. Exact faces and minor dress details are interpretation.

All ten compressed images accepted by exact hashes after original/encoded review. Current152 accepted images: cover,133 portraits,12 objects,6 ordinary places. Missing212 portraits,99 objects,410 ordinary places. Targeted app review of this batch remains pending; batch15 independently passed10 full-size image checks with0 runtime errors.

## Waterloo trophies and manuscript papers

Six original images and qa/item-art-encoding-three.jpg were inspected before hash acceptance: Pontmercy’s ring, Legion decoration, watch and purse, the abandoned route slip and Valjean’s property note. Full source ranges, prompts, selected files and revision prompts are in item-art-batch-three-selected.json. The watch’s modern winding crown was revised to a smooth pendant appropriate to a key-wound interpretation. Two route-slip revisions removed invented readable numbers and decorative surroundings; the final folded paper exposes only blank outer surfaces. The property note has indistinct handwriting rather than invented readable text. Exact metal finishes, closures and unspecified ornament are artistic interpretation.

The Legion badge uses a period-informed First Empire interpretation, supported by the Grande Chancellerie museum teaching PDF https://www.legiondhonneur.fr/sites/default/files/la_lcgion_dhonneur_sous_le_consulat_et_lempire.pdf ; it is not claimed as Pontmercy’s exact surviving badge or a specific documented manufacturer. All six exact original/encoded hashes accepted. Current158 images: cover,133 portraits,18 objects,6 ordinary places;212 portraits,93 objects and410 places remain missing.

The complete-world app review4092c94b passed13 checks including54 full-size illustrations, now including these six objects. Targeted portrait batches15 and16 each passed10 checks,0 runtime errors, and all20 accepted app screenshots have been visually inspected. Batch16’s retained failure.png is an older failed-run diagnostic, not accepted visual evidence. The successful run decodes both persisted source blobs and actual full-size image dialogs; no application fix or definitive cause for the transient earlier placeholder failure is claimed.

## Montfermeil supporting portraits

Four originals, qa/portrait-encoding-montfermeil.jpg and the actual-app contact qa/art-ui-seventeen/contact.jpg were visually inspected. Full prompts, selected filenames and the rejected toy-seller revision are in portrait-batch-seventeen-selected.json. Distinct subjects are the pedlar with the thirsty horse, the Lagny driver, the village woman who recognizes the Lark, and the toy seller. Their unspecified faces and practical clothing are artistic interpretation. The first toy-stall backdrop had a later-looking giant doll and miniature figures; the selected edit replaces these incidental objects with simple balls, tops and plain boxes. It is not a depiction of Catherine’s sale. All four source/encoded hashes accepted; targeted app review passes4 full-size images,0 runtime errors. Current162 art images: cover,137 portraits,18 objects,6 ordinary places. Missing208 portraits,93 objects and410 places.

## Montfermeil place illustrations

Six source-passage originals and qa/location-art-encoding-two.jpg were visually inspected before hash acceptance. Full prompts, selected originals and all four revision prompts are retained in location-art-batch-two-selected.json. The inn common room, upstairs guest room, under-stairs recess, children’s hearth room, toy stall and forest spring remain ordinary eye-level place pictures, separate from all53 navigational maps. The empty recess conveys neglect without a child or invented injury. The cold hearth keeps the two neat shoes and separate coarse wooden clog, without revealing the later gold gift.

Rejected first versions introduced a factory-looking hanging lamp, snow despite the explicit mild winter, a monumental church backdrop, modern-looking toy vehicles, and a lush summer spring with a moon despite the cloudy winter description. Selected edits replace the lamp with a small plain tin wick lamp, remove the snow/monumental facade and incidental figurative/vehicle toys, and show bare winter branches and clouds. Interior geometry, minor finishes, furniture decoration, toy shapes and exact spring contours remain artistic interpretations, not surveyed reconstructions. These pictures do not establish exact room dimensions or extra historical ownership.

Exact original and encoded hashes accepted. Six ordinary map-inspector image controls opened and decoded at full size with0 runtime errors at fixturea9fdcd0477b51a321a5abaeaf72e29b2e4a4a0802e900491350c36a84fa3d219. The resulting app screenshots were visually inspected on qa/place-ui-two/contact.jpg. Total168 accepted images: cover,137 portraits,18 objects,12 ordinary places. Missing208 provisional portraits,93 objects,404 ordinary places. This does not close complete-book art or playback review.
# Object batch four and portrait batch eighteen

## Portrait batch twenty-one and object batch six

Nine additional portraits passed individual original review, q88 encoding contacts and actual-app contacts: the father, mother and elder girl of the Jondrette household; Leblanc and Lanoire; the unnamed substitute inspector; Panchaud; Demi-Liard; and the garden helper. Unidentified figures use obscured or rear views, without a recognizable named-person face or future outcome. Both girls are fully clothed in modest opaque garments. The helper carries an ordinary watering-pot, with no literal supernatural features. Panchaud and Demi-Liard have distinct interpreted features; these are not historical likeness claims. The younger Jondrette girl’s requested render was rejected by the image tool; it has no accepted illustration. The full prompt set and successful selected filenames remain in portrait-batch-twenty-one-{prompts,selected}.json. Evidence qa/art-ui-twenty-one/results.json records9 full-size images and zero runtime errors; both app contacts were inspected.

Eight more object illustrations passed original, q88 and actual-app visual review: the gray packet, the neighbor’s appeal, the relief bundle, brown greatcoat, handled chisel, charcoal brazier, kitchen knife and four gold pieces. The petition’s glossy wax seal was rejected and replaced with a thin matte wafer. Its invented readable-looking script was then removed entirely; the visible blank portion does not counterfeit the unseen message. The coins’ invented portraits/lettering and photographic appearance were rejected; the selected edit uses worn indistinct relief and visible ink hatching. Exactly four coins remain visible. The chisel is intact at purchase, without later heat or injury; the other objects show no later harm or human victim. Unspecified paper dimensions, fabric colors, joinery and metal finishes remain interpretation. The complete prompts, rejected-to-selected mappings and all revision prompts are retained in item-art-batch-six-selected.json.

Both q88 contacts and both actual-app contacts were inspected. Evidence qa/item-ui-six/results.json records8 full-size object images and zero runtime errors. Total accepted ordinary artwork221: cover,171 portraits,37 objects,12 places. There are183 provisional portraits,76 objects and404 ordinary places still missing. Neither batch closes whole-book reading or playback approval.

## Object batch five and portrait batch twenty

Eight object illustrations have passed original, compressed and actual-app visual review: Javert’s service note, the two Baptistine letters, the writing sample, Brujon’s note, the reserve powder barrel, the coerced summons and Cosette’s blotting book. The service note’s initially sealed depiction was replaced with an open sheet appropriate to its first writing; three excessively photographic candidates were revised with visible ink linework. The summons’s legible invented initials were removed. All original/revision prompts and selected filenames remain in item-art-batch-five-selected.json. The two encoding contacts and two actual-app contacts were inspected; qa/item-ui-five/results.json records eight full-size decoded images and zero runtime errors.

Ten further portraits passed individual-original and compressed-contact review: Mother Cineres, Mother Veuvain, Gribier, Gillenormand’s younger daughter and unnamed grandson, Abbé Mabeuf, Mother Plutarque, Théodule, Musichetta and Madame Bourgon. The two actual-app contacts qa/portrait-app-twenty-{1,2}.jpg were opened and inspected. Evidence qa/art-ui-twenty/results.json records ten full-size images and zero runtime errors. These are reference portraits; the deceased daughter is depicted during life, and the unnamed boy has an indistinct face. Veuvain is Courfeyrac’s civilian concierge, not a nun. Théodule is in civilian travelling clothes; Musichetta’s introduction does not disclose the later Bossuet connection. Unspecified faces, colors and modest backgrounds remain artistic interpretation. Prompts and selected originals are preserved in portrait-batch-twenty-{prompts,selected}.json.

All eighteen additional source and q88 WebP hashes are accepted. Current accepted ordinary artwork totals204: cover,162 portraits,29 objects and12 places. Missing191 provisional portraits,84 object illustrations and404 ordinary places. The53 navigational map illustrations are separate. These targeted display checks do not close full-book reading, playback or release gates.

## Portrait batch nineteen

Ten further portraits: the two initially unidentified Waterloo figures, Boulatruelle, the yellow-coated stranger, the bell-wearing gardener, the earlier Gorbeau principal lodger, the real Saint-Médard ex-beadle and unfamiliar figure, Mother Crucifixion and Mother Sainte-Mechtilde. All originals individually opened and both five-image encoded contacts inspected. Concealed profiles remain unrecognizable, distinct from named-person close-ups. The wounded officer’s visible hand grips the edge of an anonymous coat as in the current passage, without a visible second face or later identity. The yellow coat and bucket are current source attributes. Physiognomy and unspecified background details are interpretation.

Two renders rejected and revised: the gardener’s first image showed daylight and uncovered beds, replaced by moonlight and straw-mat covering supported by117:6,9,21–24; the unfamiliar beggar’s first background contained unsupported pump and lamp apparatus, removed in the selected revision. The old principal lodger is not the later current portress. The ex-beadle’s age is75; Mechtilde is explicitly very young, with a singing role. The nuns have black guimpes and no Holy Sacrament chest badge, preserving120’s distinction between orders. The deceased Mother Crucifixion image is a reference depiction during life, not a new living scene or a corpse. Full prompts, originals, revisions and selected mappings retained. All ten q88 WebPs accepted by exact source/target hashes. Targeted app evidence is separate from full-book reading/playback approval.

The old sleeping coffin and municipal burial coffin are separate source objects. Initial coffin renders were rejected as excessively photographic; revised selected originals use visible ink hatching and watercolor. The old closed dark-wood coffin contrasts with the new pale-pine municipal coffin and loose lid; neither depicts a corpse, passenger or later escape. Gribier’s worn white card has indistinct writing, without an invented seal or modern typography. All three selected originals and q88 WebPs were inspected. All three actual app full-size image screenshots were individually opened after the ordinary object UI run:3 decodes, zero runtime errors. Bound evidence:qa/item-ui-four/results.json; this does not approve full-book playback.

Five new portraits depict the177 coachman and179’s two anonymous playwrights and two men discussing a duel. Each original and compressed WebP was individually opened. The adviser is thirty rather than elderly; his listener is eighteen. The collaborators have different faces and distinct proposing/writing gestures. Faces and non-specified clothing details are editorial interpretation. The scribe’s distant anonymous café silhouettes are incidental atmosphere rather than an asserted named attendance roster. No later injuries, battle outcomes or fictional characters from their proposed play are depicted. Selected mappings and exact prompts are retained in portrait-batch-eighteen-{prompts,selected}.json. App display review has its own targeted evidence and remains separate from final whole-book approval.


### Montreuil ordinary place illustrations, batch three

Eight source-context illustrations accepted: police room, square, officers' café frontage, unpaved alley, parsonage door, hire yard, mayor's bedroom and factory infirmary. All originals opened individually and both q88 encoding contact sheets inspected. The café and alley candidates contained stray cursive signatures: café revision removed its mark; the alley required two edits and only the final unmarked image was selected. The full revision chain is retained in location-art-batch-three-selected.json. These are interpretive early-nineteenth-century place views, not measured reconstructions or additional topographic maps. The bedroom has two candlesticks; the hire yard has one unhitched two-wheel cabriolet. No future character outcome is depicted. Exact accepted hashes are in ART_ACCEPTANCE.json.

All eight opened and decoded full-size through actual app map inspectors, zero runtime errors. Both app contact sheets were visually inspected. Evidence:qa/place-ui-three/results.json, bound to its fixture and application revisions. This approves this batch only, not full-book reading or playback. Accepted ordinary places now20; all accepted entity/cover art229, with53 map illustrations separately reviewed.

### Portrait batch twenty-two and object batch seven

Eight new concealed adult portraits: the barrier interlocutor, three paper-masked entrants and four soot-faced garret strangers. Each original opened individually; both encoding and both actual app contact sheets inspected. The masked men differ in build and carry cudgel, downward axe and enormous key respectively; the other four retain white hair/closed eyes, beard, long hair and standing door-post roles. Their soot is a temporary disguise, without a racial caricature or premature identity. No later outcome is pictured. App evidence:qa/art-ui-twenty-two/results.json,8 full-size images decoded,0 runtime errors. Prompt additions are preserved in the selected JSON alongside original plan prompts.

Eight object illustrations: bread-errand silver coin, complete black outfit, gold coin in the sabot, closed coffer, authorization, purchased petticoat, triggerless pistol and woollen shawl. All originals opened; both q88 encoding contacts and both actual app contacts inspected. The first coin faces suggested undocumented rulers; the silver was worn down and gold needed a second revision to show its edge and an oblique indistinct surface. No exact die, date or ruler is asserted. The outfit is unworn and entirely black; the pistol's trigger guard is empty; the coffer is closed before its contents are revealed. The authorization shows the unmarked reverse of a folded sheet, not a newly blank story document. Wool colors, furnishing details and exact construction are editorial. App evidence:qa/item-ui-seven/results.json,8 full-size images decoded,0 runtime errors. All selected originals, revision prompts and hash-bound WebPs retained.

Total accepted cover/entity art245:1 cover,179 portraits,45 objects,20 ordinary places. The53 topographic map images remain separate. Remaining175 provisional portraits,68 objects,396 ordinary places; this is not complete-book art approval.
### Portrait batch twenty-three

Nine originals opened individually; both q88 encoding contacts and both actual app contacts inspected. Exact prompt additions and selected mappings are retained. Concealed identities stay concealed; the unknown recruit joins the street procession before his later seating. The white-haired workman wears the long-visored cap. Le Cabuc, the candle-bearing porter and the blond artillery sergeant are alive before their later outcomes. Clothing construction and background details are interpretive. No signature or modern landmark observed. App evidence:qa/art-ui-twenty-three/results.json,9 full-size dialogs decoded,0 runtime errors, fixture fddbeea2c529bfc3852c2731aa2c7d5b210b5a732d1a0e146ccb863e3b0ce04e. This image-only scope predates the next four custody changes.

Accepted art254:1 cover,188 portraits,45 objects,20 ordinary places. Remaining166 provisional portraits,68 objects,396 ordinary places. All53 illustrated maps remain separate. Complete-book art and release remain open.

### Object batch eight and place batch four

Seven objects accepted after individual original/source review, both q88 encoding and both app contacts: marriage banknotes, Embrun vestment chest, withheld letter, cartridge basket, found powder flask, red-pencil receipt and seized handcart. The letter's unsupported wax seal was removed; the selected revision shows the unmarked reverse. The banknote engraving, chest ornament, flask material and cart construction are interpretations, not exact historical facsimiles. The basket contains period paper cartridges rather than modern brass ammunition. The receipt's reverse has faint red pencil impressions, with no counterfeit readable words. The image service rejected escape-coin-saw at output moderation; request5fecb561-8e80-428b-bc6e-738eb25b61cf, no retry or accepted substitute. App:qa/item-ui-eight/results.json,7full-size dialogs,0errors,fixturee270b0b94c90b84e7b3c943c0fa8967a8272a4426b332976839175bd47a10f62. This predates the later scene cuts.

Eight places accepted after individual original/source review and both q88/app contacts: Bas-Boulonnais, Hesdin inn, Saint-Pol inn, Tinques road, Carency detour, Moulins college, Chemin-Vert fruit seller and Madeleine factory. The factory original's lower-left signature was removed in the selected revision. These are interpretive environmental views, not surveyed reconstructions or new maps. Moulins belongs to Gillenormand's eighteenth-century recollection; road daylight/twilight/night follows the narrated stages. Generic village towers and furnishings do not claim documented facades. All human figures are absent. App:qa/place-ui-four/results.json,8full-size dialogs in actual map inspectors,0errors,fixturee351e53e50ee80f01f98360efbc6d97348ff342388499efecd6936d8def4adfd.

Accepted total269:1cover,188portraits,52objects,28ordinary places;53topographic maps separately. Remaining166provisional portraits,61objects,388ordinary places. No complete-book or release approval follows from these batches.


### Portrait batch twenty-four and object batch nine

Eight portraits accepted: Seine fugitive, official pursuer, following coachman, Gillenormand house porter, Homme-Armé porter/portress and the two distinct doctors. All originals and two doctor revisions individually reviewed; both encoding/app contacts inspected. Homme-Armé doctor's unsupported bag/background person removed. Gillenormand doctor's face revised to avoid an accidental near duplicate. Faces and unspecified clothing are interpretive. Concealed identities remain concealed. App:qa/art-ui-twenty-four/results.json,8dialogs,0errors,fixture008a4458.

Eight objects accepted: lantern rope, closed hundred-louis purse, sealed600franc remittance box, Hesdin wicker spring-cart, detached bedstead rod, captured musket, pair of small steel signal pistols and attic tools. All originals individually opened and both encoding/app contacts inspected. Cart has2wheels and a seat supported by leather straps. Remittance contents stay hidden. Pistols each have1barrel; no modern ammunition or readable markings. Tool assortment includes a folded ladder as source context; no operational diagram. Exact finishes/construction are period interpretations, not facsimiles. App:qa/item-ui-nine/results.json,8dialogs,0errors,fixture9f2db2c8. All source/encoded hashes, exact prompts and selected mappings retained.

Accepted285:1cover,196portraits,60objects,28places. Remaining158portraits,53objects,388places;53topographic maps separate. Object10 generation is not acceptance. Complete edition art/release remain open.

### Object batch ten

Eight accepted objects: framed Dream engraving, attic ladder, turned panel, Labarre inquiry, visitor's five francs, seized handkerchief, U.F. handkerchief and lane purse. All8originals and2revisions individually opened; both compressed contacts and both actual app contacts inspected. The inquiry pencil's modern eraser/ferrule was removed. Coin's invented ruler/wreath was worn down to indistinct relief. The print is an interpretive depiction of the described allegory, not an authenticated surviving engraving; its figures belong inside the print only and text stays unreadable. Wooden panel shows its reverse before the face is revealed. The fine U.F. handkerchief carries only its2source initials; the seized handkerchief is distinct and unmarked. The lane purse remains closed at first appearance; its construction is interpretation. App:qa/item-ui-ten/results.json,8full-size dialogs,0errors,fixturee83dfda1. All selected originals/revisions/prompts and exact encoding hashes retained.

Accepted293:1cover,196portraits,68objects,28ordinary places; remaining158portraits,45objects,388places. The53topographic maps are separate. Object11 generation is not acceptance.

### Object batches eleven and twelve

Batch11: admission note, current passport, visiting cards, return-address pocket-book, plaster address, farewell letter, Marius's coin and gold watch. All originals/revisions individually opened; both encoding/app contacts inspected. The passport's invented arms/seals were removed. Coin's ruler/wreath were removed. Address marks and document text stay indistinct; folded correspondence has no invented wax seal. The watch is gold in181:22; its new art-plan range includes that evidence. A closed case avoids an invented dial. App:qa/item-ui-eleven/results.json,8dialogs,0errors,fixture2e02ceeb. Accepted301at that point.

Batch12: Gorbeau key, unsigned notebook/envelope, two chairs, milk jar, miner's iron candlestick, closed cane, republic wall-map and bench stone. All originals individually opened and both encoding/app contacts inspected. Miner object has a rock spike and candle socket. The cane's blade stays concealed. Stone hides all paper at its first appearance. The wall-map is a physical object with Corsica's lower inset; its internal divisions are illustrative rather than a claimed exact historic facsimile, and it is not reused as a navigation layer. Chairs, pottery and key construction are interpretations. App:qa/item-ui-twelve/results.json,8dialogs,0errors,fixture12adf8fd. Accepted309at that point.

Batch13originals,3revisions and encoding contacts have been inspected; appQA is running and no complete-book approval is claimed. Accepted staging total317(1cover,196portraits,92objects,28places);158portraits,22objects,388places remain. The114thobject is the newly modeled borrowed rifle. Batch14is generating only.

### Object batch thirteen app closure

All8dialogs pass with0runtime errors on04bbaec9(qa/item-ui-thirteen/results.json); both app contacts inspected. Double-barrelled rifle has2visible muzzles, distinct from captured musket and signal pistols. The closed shagreen case does not reveal its paper. Biscuit's initially photographic render was replaced by clearly hatched ink/watercolor. Substitute coin needed2revisions to remove the invented ruler portrait; selected low view shows its rim and indistinct worn surface, not an asserted die. Tilbury has2wheels and no hood, distinct from the wicker spring-cart. Newspaper sheets differ in age/condition and have no readable counterfeit claims. All originals,3revisions, prompts and selected exact hash mappings retained.

### Object batches fourteen through sixteen

Batch14: eight originals and four revisions individually inspected, both encoding/app contacts reviewed. Corrected the bill to its reverse with indistinct showthrough, retained four indistinct signature marks on Tholomyes's letter, removed invented arms from the Charter and arrest order. App: qa/item-ui-fourteen/results.json, eight dialogs, zero errors, fixture a012979a.

Batch15: seven originals and one revision inspected, both encoding/app contacts reviewed. Replaced the unfinished explanation's shiny new nib with a worn bent quill. National Guard equipment is a period interpretation, not an exact regulation reconstruction. App: qa/item-ui-fifteen/results.json, seven dialogs, zero errors, fixture 63c8dff2. Iron cudgel tips were rejected by the image service (request 6c21b42d-f2bc-4219-a820-937b0dfd10cf); no substitute accepted.

Batch16: five originals individually inspected and encoding/app contacts reviewed. Empty coats show dry, nongraphic stains; precise tear patterns are interpretive. Marius's whole coat first appears only at363:189, not the earlier production of its fragment. App: qa/item-ui-sixteen/results.json, five dialogs, zero errors, fixture046a31a5. Source/encoded hashes and exact prompts/mappings retained. Total337 accepted at this point.

### Portrait batch twenty-five

Eight originals and three selected revisions individually inspected; two encoding contacts reviewed. Father Hucheloup's moustache and Mother Hucheloup's natural facial hair restored from the source; Fannicot's later-style peaked cap removed. Matelote's red hair and fuller build contrast with Gibelotte's tall, pale, tired appearance. Navet remains a fully clothed small child. Rooftop helmets and uniform details are illustrative period interpretations, not assertions of unit insignia. App QA pending. Total345 accepted staging images; complete-book art and release remain open.

Portrait25 app closure: qa/art-ui-twenty-five/results.json,8full-size dialogs,0runtime errors,fixture41c127b5. Both app contacts inspected.

### Portrait batches twenty-six and twenty-seven

Batch26: eight originals and three selected revisions opened individually; both compressed and both actual app contacts inspected. Removed later-style caps from the messenger and postman; removed extra children from the mother's individual portrait. Unidentified white-haired visitor has face in shadow and the forest figure faces away. Neither portrait supplies a later identity. The Changer is depicted as an ordinary human artisan without caricature. App qa/art-ui-twenty-six/results.json:8dialogs,0errors,fixture02c186ab. Total353 accepted at that point.

Batch27: eight originals and three selected revisions individually opened, both compressed contacts inspected. Removed premature cardinal regalia from the young Rohan, the tollkeeper's later-style cap and the extra child from the father's portrait. Bertrand's campaign dress and decorations are illustrative, not a claimed authenticated uniform reconstruction. Other unspecified faces and details are interpretations. App QA pending. Total361 accepted staging images;134portraits,2objects,388places remain missing.

Portrait27 app closure: qa/art-ui-twenty-seven/results.json,8full-size dialogs,0errors,fixturef5c47bb2. Both app contacts inspected.

### Portrait batch twenty-eight

Eight originals and four selected revisions individually opened; two compressed contacts inspected. Removed a spurious signature from the meadow passer-by, a distant spire from the schoolmaster, the clerk's modern pencil and misattributed writing action, and the dowager's later mourning bonnet. The mayor wears mourning, not this questioner. Revised dowager has early1820s high waist and narrow sleeves. Faces, exact textiles and the contextual wall-map are illustrative interpretations. App QA pending. Total369accepted; remaining126portraits,2objects,388places.

Portrait28 app closure: qa/art-ui-twenty-eight/results.json,8full-size dialogs,0errors,fixtured36414c5. Both app contacts inspected.

### Portrait batch twenty-nine

Eight originals and three selected revisions individually inspected; both encoding and app contacts reviewed. Removed extra adult/child from individual basin portraits, removed the boy's later-style cap while retaining his source-described National Guard costume and partly eaten brioche. The innkeeper's three-year-old son is shown partly shadowed before later identity confirmation. The two younger brothers have distinct ages/faces; exact appearances and clothing are interpretations. Alix is nine; Bouchard is a taller older pupil. App qa/art-ui-twenty-nine/results.json,8dialogs,0errors,fixture657a4243. Total377 accepted images:1cover,236portraits,112objects,28places; remaining118portraits,2objects,388places.53topographic maps separate. Portrait30 remains under review only.

### Portrait batch thirty

Eight originals and three selected revisions individually opened; both encoding contacts inspected. The parsonage onlooker now has an interpreted lean clean-shaven face distinct from the meadow passer-by. Barber's customer was removed to retain an individual portrait. The admission mother's black veil is lowered over her face as stated in the source. The other nuns have distinct faces; exact habits, civilian garments and veteran's uniform details remain period interpretations rather than authenticated reconstructions. App QA pending. Total385accepted:1cover,244portraits,112objects,28places;110portraits,2objects,388places remain.

Portrait30 app closure: qa/art-ui-thirty/results.json,8dialogs,0errors,fixture25a79897; both app contacts inspected.

### Portrait batch thirty-one

Eight originals and two revisions individually opened; both compressed contacts inspected. Added the source's silver chin to the disabled veteran while retaining his empty sleeve, wooden leg and red crossed-swords badge, without graphic injury. Replaced the servant's tall-chimney lamp with a small open brass oil hand-lamp. Albertine is a thirty-year-old civilian resident, not a nun; the two portresses have different interpreted builds and faces. Other unspecified clothing, exact metal prosthesis construction, insignia and interiors are interpretations. App run passes8dialogs,0errors onf90f51da; contacts pending inspection. Total393accepted.

### Portrait batch thirty-two

Eight originals individually opened and both compressed contacts inspected; no revisions selected. Inn carter's coin has no legible asserted die; working travelers have distinct faces and clothes. The centenarian is depicted naturally, not as a caricature. Sergeant is bareheaded to avoid later caps; exact uniform details are illustrative. Baker has three unequal white-bread pieces, not customers or modern equipment. The sleepy cart owner is shown in his source velvet waistcoat before the cart moves. Total401accepted staging images:1cover,260portraits,112objects,28places. Because two source participants were added at230, the provisional roster is356;96portraits,2objects,388places remain. App QA pending.

### Pupil uniform correction

Cross-source121:3 specifies blue dress, white cap and Holy Spirit pendant. Replaced accepted Alix and Bouchard portraits with new exact reviewed originals and encodings; selected mappings preserve prior versions and all edit prompts. Both revised originals and both compressed contacts inspected. Updated art-plan generator for all four pupil keys, with a failing-then-passing source-backed regression. Prior app29evidence remains historical; rerun of corrected images pending.


Portrait31 and32 app closure: both contacts for each reviewed;8dialogs each,0errors. Portrait32 fixture99a0d575. Corrected pupil29 rerun:8dialogs,0errors on99a0d575 and both contacts inspected; blue dress, white cap and dove pendant visible.

### Portrait batch thirty-three

Eight originals and one selected revision individually opened, both encoding and both app contacts inspected. The Gorbeau boy initial face was too visible; selected rear view with no recognizable features. Source pupil blue dress, white cap and dove pendant retained. Flower seller is a single child, fully clothed. Watch officials are distinct adults with chestnut at the inspection box; exact garments and architecture are interpretations. App8dialogs,0errors on74f15743. Total409accepted.

### Portrait batch thirty-four

Eight originals individually opened and both compressed contacts inspected. Masks conceal carnival identities; both unnamed Petit-Banquier men are shown from behind. Navy scene uses timber, canvas and rope, without later service caps or standardized striped jersey; exact uniform and gesture are illustrative interpretations. Clerical portraits are separate provisional source roles, not a claim that the unnamed visiting archbishop is a different historical person from Quelen. Total417accepted images:1cover,276portraits,112objects,28places;80portraits,2objects,388places remain. App run pending.


Portrait34 app closure:8full-size dialogs,0runtime errors on52bfeaa1; both app contacts inspected.

### Portrait batch thirty-five

Five originals individually opened and the compressed contact inspected: Mamselle Miss, Cambronne, the anonymous resolve speaker, Clinton and d'Erlon. The unnamed insurgent faces away. Historical figures are interpreted illustrations, not verified likenesses; exact insignia are not authenticated. Primary historical portrait catalogues consulted for context: https://musees-reims.fr/oeuvre/comte-drouet-d-erlon and https://id.rijksmuseum.nl/200198571; later portraits must not be treated as proof of1815regalia. Three unattempted anonymous girls from the candidate selection were deferred for identity review; no rejected image was regenerated under another name. Total422accepted;75portraits,2objects,388places remain. App run pending.


Portrait35 app closure:5dialogs,0errors on5b74c387; contact inspected.

### Location batch five

Eight original place images and one selected revision individually opened; both encoding contacts inspected. Source passages15:57-60tavern,79-84prison entrance,85artisan room,115-118kennel,120-126outskirts/town,5-6inn and6:0-1bishop house are retained. Rejected single-storey cottage composition for the bishop approach; selected two occupied floors plus attic matches6:0. Updated generator evidence and constraints. Exact facades, window arrangement, bell mounting and surfaces remain artistic interpretations. No map reuse, people or readable labels. Total430accepted staging images:1cover,281portraits,112objects,36places.75portraits,2objects,380places remain. App run pending.


Location5 app closure:8full-size dialogs from map inspectors,0errors on28866be3; both contacts inspected, including corrected house.

### Portrait batch thirty-six and object seventeen

Eight portraits and the address-paper original individually opened; all three compressed contacts inspected. Lacoste remains a civilian peasant, Soult is not dressed as a bishop, and Bernard is distinct from surrounding cuirassiers. Louison wears practical modest working clothes. Historical garments, facial likenesses and medals are interpretive, not authenticated portrait reconstructions; no future execution depicted. Address paper contains indistinct marks, no counterfeit readable address. Total439accepted images:1cover,289portraits,113objects,36places;67portraits,2objects,380places remain. App runs pending.


Portrait36 and object17 app closure:8portrait dialogs and1object dialog,0errors onb4eb27a8; all three contacts inspected.

### Location batch six and approach latch correction

All eight originals and five location6revisions individually opened; both encoded contacts inspected. Gallery first had eleven portraits, first edit five, final edit seven (four on far wall, three along side). Removed unsupported Gothic monumental facade from garden-house and doorway compositions. Replaced red upholstered prayer chair with plain straw prayer furniture; mantel is interpreted as source faux-marble painted wood. Upstairs has exposed worn painted/gilded beams and washing, not wished-for purchased velvet furniture. Hospital view crops the lower part/wing rather than resolving differing source floor descriptions by inventing a full facade. Unspecified architectural forms remain interpretation. Approach image5has a second selected correction removing the keyhole/knocker, retaining only a latch; original and fresh compressed contact inspected. New full-size app checks pending. Total447accepted images:1cover,289portraits,113objects,44ordinary places;67portraits,2objects,372places remain.53topographic maps separate.


Location6 app closure:8dialogs,0errors; both contacts inspected. Location5 latch-only revision rerun passes8dialogs on e50ba573; fresh contact inspection pending. Portrait37 candidates use National Army Museum primary collection context for the British Coldstream role of the novel's Blackmann: https://collection.nam.ac.uk/detail.php?acc=1988-07-52--1. The museum calls John Lucie Blackman a captain; the novel's spelling/rank is retained as its textual account. Generated portrait remains an interpretation, not a verified historical likeness.


### Portrait batch thirty-seven

All eight originals and two revisions individually opened, both compressed contacts inspected. Removed small signature-like marks from Ansiaux; his stoop is depicted naturally, without caricature. Replaced the baronne's later puffed sleeves, low waist and frilled bonnet with a plain high-waisted1817gown and small linen cap. Baloup appears in an interpretive workshop, not as an invented courtroom witness. British and French military roles remain distinct; Blackmann uses Coldstream context noted above while preserving the novel's textual naming. No authenticated facial likeness or exact insignia claim. Total455accepted:1cover,297portraits,113objects,44places;59portraits,2objects,372places remain. App check pending.

Location5 latch-revision app contacts now inspected;8dialogs/0errors one50ba573.


Portrait37 app closure:8dialogs/0errors ond6dc9f15; both contacts inspected.

### Portrait batch thirty-eight

Eight originals individually opened, both compressed contacts inspected, no revisions selected. Prussian, Dutch-Belgian, British, French and German allied roles remain distinct; no later spiked helmet. Dehaze is the source's eighteen-year-old of1815rather than an elderly1861witness. The shepherd guide is fully clothed and alone. Salute, precise clothes, medals and facial likenesses are illustrative interpretations rather than authenticated reconstructions. Total463accepted images:1cover,305portraits,113objects,44places;51portraits,2objects,372places remain. App run pending.

Portrait38 app closure:8full-size dialogs,0runtime errors on60373a91; both app contacts inspected.

### Portrait batch thirty-nine

Eight originals and both revisions individually inspected. Duchesses corrected from natural-waist fitted silhouettes to early1820s high-waisted gowns; Choiseul cap simplified. Other portraits retain separate French and German allied roles. The musician fiddle is an occupation cue, not a source-identified instrument. Exact faces, medals and precise uniform details are interpreted; no authenticated likeness claim. Both compressed contacts inspected.471accepted images:1cover,313portraits,113objects,44places;43portraits,2objects,372places remain. App run pending.

Portrait39 app closure:8dialogs/0errors on322639275-byte fixture; both contacts inspected.

### Portrait40 and object18

Eight portrait originals and four revision candidates individually inspected. Replaced Haxo/Kempt paired binoculars with single-tube telescopes; removed signature marks from Kempt and, on a second correction, Guillaume. Lafayette is elderly at1830, not a young American Revolutionary officer. Precise faces and uniform decoration interpreted. New borrowed prison-payment coin original and revision inspected; recognizable bust erased to worn indistinct relief rather than asserting an exact die. All three compressed contacts inspected.480accepted:1cover,321portraits,114objects,44places;35portraits,2objects,372places remain. App runs pending.

Portrait40/object18 app closure:8portrait dialogs and1object dialog,0errors on7866a40b; all3contacts inspected.

### Portrait41 and Petit-Picpus habit corrections

Eight new originals plus4new revisions individually opened. Corrected Genlis/Vaubois low waists and frilled caps; Agatha/Euphrasie guimpes and bibs blackened. Source120:5triggered reopening4earlier portraits: Innocente had white wimple, while Crucifixion/Mechtilde/Cineres had black forehead bands. All4originals and their corrections individually inspected. Superseded hash acceptances retained in selected41provenance, removed before replacement, then fresh source/encoding hashes reviewed after3compressed contacts inspected. Shared prompt now explicitly cites120:5for6members; regression red/green.488accepted:1cover,329portraits,114objects,44places;27portraits,2objects,372places remain. App12dialog check pending.

Portrait41 app closure:12dialogs/0errors onb38219cd; all3contacts inspected, including4earlier habit corrections.

### Portrait42

All8originals and2compressed contacts inspected; no revisions selected. Legros is a sub-lieutenant, not an elaborately decorated general; Louis Philippe a civilian1830portrait; Mestienne distinct from replacement gravedigger Gribier. Contextual life portraits do not assert living presence at reports/funerals. Exact facial likenesses and decoration remain interpreted.496accepted:1cover,337portraits,114objects,44places;19portraits,2objects,372places remain. App run pending.

Portrait42 app closure:8dialogs/0errors on48cd5698; both app contacts inspected.

### Portrait43

All8originals and2compressed contacts inspected, no revisions. Picton civilian coat and black top hat follow Deutsches Historisches Museum, https://www.dhm.de/journal/en/post/napoleons-wet-hat (context consulted; no museum image copied). Young adult Prince of Orange differs from older king; Somerset British coat differs from French officers. Faces and exact embellishments interpreted.504accepted:1cover,345portraits,114objects,44places;11portraits,2objects,372places remain. App check pending.

### Portrait44

Seven originals and Guardsman helmet-lettering revision individually opened, both compressed contacts inspected. Wilda follows corrected source role. Girl under the shawl fully clothed; infirmary child distinct from Cosette. No additional moderation rejections in this batch.511accepted:1cover,352portraits,114objects,44places;4portraits,2objects,372places remain. Four aliases/blocked portrait slots still open, not retried. App check pending.

Portrait43 app closure:8dialogs/0errors; both contacts inspected.

### Location7

8originals/3revisions individually opened and both compressed contacts inspected. Barber’s modern tap replaced by freestanding earthenware bowl/jug; unsupported countryside/road church skylines removed. Other5originals retained. Source passages anchor civic uses, corner, unmarked burial ground, nettles and mist; exact facades and road alignments are interpreted, not historical surveys.519accepted:1cover,352portraits,114objects,52places.4portraits/2objects/364places remain. Location7app check pending.

Portrait44 app closure:7dialogs/0errors ond06fe662; both app contacts inspected. Location7app closure:8full-size map-inspector dialogs/0errors ond06fe662; both contacts inspected.

## Location batch eight: encoding review
Eight originals and four revised originals inspected individually; both WebP contact sheets inspected. Removed unsupported skyline landmarks from Javert lodging, workroom and study; corrected cashier-room light to avoid the source-excluded window-frame shadow. Eight exact source/encoding hashes accepted. App inspector checks remain pending.

## Location8 app closure and portrait45 encoding
All8location inspector dialogs pass with0runtime errors on fixture1a4aad204b; both app contacts inspected. Portrait45four originals and two revisions inspected individually; removed accompanying figures from the two civilian portraits. One compressed contact inspected and four exact encodings accepted.531accepted staging images; portrait45 app review pending.

## Portrait45 app closure; location9 encoding
Portrait45four full-size app dialogs pass on fixture02e5364d with0runtime errors; app contact inspected. Location9eight originals and two selected revisions individually inspected, two compressed contacts reviewed and exact hashes accepted. Corrected an extra illuminated window and modern billiard shades; source62:6two candles and61:27single lamp retained.539accepted staging images; location9 app review pending.

## Location9 app closure; map UI inspection
All8location9 images opened full-size in actual map inspectors on fixtureca9f7ad2 with0runtime errors; both app contacts inspected. All53current map UI screenshots inspected across14contacts; historical gateway-failure, initial-before-coordinate-fix and initial images are retained diagnostics only, not current failures or replacement acceptance. Map report53maps/416positions/48gateways/4floor groups/0errors; fixture1fff0a40812c. This closes this map-fixture visual review only, not complete story playback.

## Object19 encoding review
Three generated originals individually inspected, no edits needed. WebP contact inspected and exact hashes accepted. Rope and short fragment are separate illustrations, wine bottle has no poison icon or invented drug identity.542accepted staging images; object19 app checks pending.

## Object19 app closure and location10 encoding
Object19three full-size app dialogs pass with0runtime errors on fixturebaaa35b4; app contact inspected. Nine chapter251state/inventory checks pass on same fixture; all8distinct panels across3contacts inspected. Location10eight originals and two revisions inspected individually, two encoding contacts inspected, exact hashes accepted. Removed incorrect horseman sign and unsupported timber projection on inn frontage.550accepted staging images; location10 app QA pending.

## Location10 app closure
Eight map-inspector images opened full-size on fixture127f9ea2 with0runtime errors; both app contacts inspected.550accepted cover/entity illustrations:1cover/356portraits/117objects/76places. All53map illustrations remain separate.

## Object20 encoding
One original individually inspected and compressed contact reviewed; exact hashes accepted. A plain closed old calf-bound printed volume, no invented readable title or later sale.551accepted staging images; object20app review pending.

## Object20 and farewell app closure
Object20full-size app dialog and four294position/letter-inventory checks pass on fixture9c7e417f with0runtime errors. Object contact and both state contacts inspected. Main Éponine is correctly deceased outside while Marius is inside the taproom. The alias subsection displays an older Alive snapshot without its scene provenance; this app presentation finding remains open and is not a request to invent post-death snapshots for absent aliases.

## Current portress/manuscript app evidence
Three364state checks pass on fixture4a86aa73; contact inspected: portress unknown after departure, doctor inside at entrance and final blessing. Complete rendered manuscript365/1535matches exact normalized prose/order with0errors; opening and final endnote screenshots inspected. Full continuous playback is running separately and has no approval yet.

## Location11 encoding review
Eight originals and two revised originals individually inspected, both compressed contacts reviewed; eight exact hashes accepted. Removed an unsupported bright moon from the dark clearing and snow from the mild-weather Livry road. Covered aqueduct stays underground, no cache shown, and no room connection asserted.559accepted staging images; location11app review pending.

## Deferred identity review: older daughter only
Source202:8–11and203:38–45introduce two anonymous presentations later recognized as the elder daughter at204:18; the existing identity plan resolves both to Éponine at220-15. They are distinct from the younger daughter/Azelma, to whom the earlier service rejection and smaller boulevard alias relate. Proceed only with these two previously unattempted older-daughter candidates, fully clothed waist-up/back views with concealed faces. Do not retry the rejected younger daughter, smaller alias or either rejected object. Candidate plans do not accept images.

## Location11 app closure; location12/portrait46 encoding
All8location11full-size map-inspector images pass on fixture4744177e with0runtime errors; both app contacts inspected. Location12eight originals and one revised boulevard individually inspected; both encoding contacts reviewed. Removed unsupported bridge. Portrait46two older-daughter anonymous presentations individually inspected with their encoding contact, no revisions needed. Ten exact hashes accepted:569staging images,1cover/358portraits/118objects/92places. Remaining2younger-daughter presentations and2rejected objects remain untouched. Location12/portrait46app checks pending.
