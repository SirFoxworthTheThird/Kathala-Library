const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'reported', ...extra,
})

export const volumeFourBookEleventhReview = [
  [271, [
    part('start', 'The Recoil of the Procession', 'The crowd breaks apart as violence begins near the Arsenal.', null,
      'Paragraph 0 returns to the outbreak, not the later nine-o’clock prison survey. River, torrents and sewer are comparisons for the crowd’s movement.'),
    part(1, 'A Pistol Without a Trigger', 'Gavroche takes an old pistol from a shop, runs singing among fleeing bourgeois and discovers its missing trigger.', 'rue-menilmontant',
      'Paragraphs 1–7 explicitly identify the child as Gavroche. His claim to borrow does not show the shopkeeper’s consent. The pistol cannot be treated as a working firearm and is distinct from Javert’s signal pistols held by Marius.', { kind: 'scene', items: ['gavroche-triggerless-pistol'], present: [
        ['gavroche', 'Carries off the holster-pistol and notices on the boulevard that it has no trigger.'],
      ] }),
    part(8, 'The Sources of His Songs', 'The narrator considers Gavroche’s musical inventions and a reported brief apprenticeship to a printer.', null,
      'Paragraph 8 leaves authorship of the couplet uncertain. The apprenticeship is qualified by it appears; the commission for Baour-Lormian is retrospective, not a current meeting.', { kind: 'exposition', mentioned: ['gavroche'] }),
    part(9, 'The Boys Who Did Not Return', 'After rescuing his father, Gavroche had returned to feed the boys and promised another night’s shelter, but they never came back.', 'bastille-elephant',
      'Paragraph 9 confirms the previously intended return and breakfast. Gavroche still does not know they are his brothers. Police refuge, abduction and wandering are alternatives, not established fates. Ten or twelve weeks is the source’s approximate interval; no reunion or death is established.', { mentioned: ['gavroche', 'thenardier-younger-boy', 'thenardier-youngest-boy', 'thenardier'] }),
    part(10, 'No Sou for the Last Cake', 'Unable to buy an apple-turnover, Gavroche continues through the streets, tears down posters and rails at well-fed men.', 'rue-pont-aux-choux',
      'Paragraphs 10–15 continue through Rue Saint-Louis and Rue du Parc-Royal. No cake is bought or eaten. Poster-tearing is actual action; the bystanders’ ownership and drunkenness are appearance and insult, not verified facts.', { kind: 'scene', items: ['gavroche-triggerless-pistol'], present: [
        ['gavroche', 'Finds no money in his pocket, leaves the pastry shop behind and tears down theatre posters.'],
      ] }),
  ]],
  [272, [
    part('start', 'Songs and a Fallen Horse', 'Gavroche interrupts his revolutionary performance to help a fallen lancer and raise the horse.', null,
      'Paragraphs 0–2 show assistance to a National Guardsman despite hostile rhetoric. Rheumatism and the named concubine occur in his performance, not established medical or relationship facts. He retrieves the same triggerless pistol without firing it.', { kind: 'scene', items: ['gavroche-triggerless-pistol'], present: [
        ['gavroche', 'Puts down the pistol to lift the rider and help raise the fallen horse.'],
        ['gavroche-fallen-national-guard-lancer', 'Is helped up after his horse falls.'],
      ] }),
    part(3, 'Four Women in the Doorway', 'Three portresses and a rag-picker discuss animals, prices and the poor contents of refuse heaps.', 'rue-thorigny-doorway',
      'Paragraphs 3–22 introduce the four women and their conversation. Macbeth’s witches are a comparison, not supernatural identities. La Vargoulême is the rag-picker; Patagon is one of three distinct portresses. Royal memories do not place those rulers here.', { mentioned: ['patagon', 'la-vargouleme'] }),
    part(23, 'What Do You Mean by Politics?', 'Gavroche interrupts the women, who abuse him and his pistol, and Patagon launches into a fearful denunciation.', 'rue-thorigny-doorway',
      'Paragraphs 23–35 show the exchange without firing or arrest. Patagon’s report of a Pontoise revolution and arsenal of pistols is hearsay. Her wish to see him guillotined is a threat, not an execution.', { kind: 'scene', present: [
        ['gavroche', 'Mocks the women’s conversation and answers their insults with gestures and a retort.'],
        ['patagon', 'Condemns the armed child and repeats alarming reports.'],
        ['la-vargouleme', 'Calls him a malicious bare-pawed wretch.'],
        ['thorigny-second-portress', 'Joins the women’s collective outcry at the child.'],
        ['thorigny-third-portress', 'Adds to the collective abuse directed at Gavroche.'],
      ] }),
    part(36, 'Patagon Follows', 'Walking on, Gavroche argues aloud for the rag-picker’s interests while Patagon shouts a final insult after him.', 'rue-pavee',
      'Paragraphs 36–40 show Patagon following at a distance. His words to the absent rag-picker are a soliloquy, not a renewed conversation; the insult about his birth is not genealogical evidence.', { kind: 'scene', mentioned: ['la-vargouleme'], present: [
        ['gavroche', 'Reflects that revolution should improve the rag-picker’s food and dismisses the shouted insult.'],
        ['patagon', 'Follows and shakes her fist from a distance.'],
      ] }),
    part(41, 'The Gun That Will Not Go Off', 'Near the Hôtel Lamoignon Gavroche calls for battle and reproaches his useless pistol.', 'hotel-lamoignon-street',
      'Paragraphs 41–44 explicitly make a joke of the missing trigger. No shot is discharged and the weapon is not repaired.', { kind: 'scene', items: ['gavroche-triggerless-pistol'], present: [
        ['gavroche', 'Looks reproachfully at the pistol after calling for a march to battle.'],
      ] }),
    part(45, 'A Thin Poodle', 'A gaunt dog draws Gavroche’s sympathy before he turns toward the Orme-Saint-Gervais.', 'hotel-lamoignon-street',
      'Paragraphs 45–47 show a real poodle. Visible hoops are a joke about its ribs, not a swallowed cask. The heading toward Orme-Saint-Gervais is a direction of travel, not arrival at a barricade.', { kind: 'scene', present: [
        ['gavroche', 'Addresses the thin poodle with compassion and resumes his route.'],
      ] }),
  ]],
  [273, [
    part('start', 'The Razor and the Veteran', 'The barber who rejected the boys shaves an old soldier while they discuss Napoleon’s riding and a remembered horse.', 'orme-saint-gervais-barber-shop',
      'Paragraphs 0–7 explicitly identify the same barber as in chapter 250. The veteran’s remembered decoration does not put Napoleon or his horse in this shop. Prudhomme is a hypothetical commentator, not present.', { kind: 'scene', present: [
        ['orme-saint-gervais-barber', 'Questions the customer about the Emperor’s riding and horses while shaving him.'],
        ['orme-saint-gervais-veteran', 'Recalls the mare ridden when the Emperor gave him his cross.'],
      ] }),
    part(8, 'The Glory of Dying in Battle', 'The veteran lists past wounds, and the barber declares he would prefer a cannon-ball to a lingering illness.', 'orme-saint-gervais-barber-shop',
      'Paragraphs 8–14 report historical wounds, not injuries inflicted in the shop. The barber’s preferred death is hypothetical. Neither speaker dies here, and the veteran is not identified with a previously named soldier.', { kind: 'scene', present: [
        ['orme-saint-gervais-veteran', 'Lists wounds from successive campaigns and dryly answers the barber’s enthusiasm.'],
        ['orme-saint-gervais-barber', 'Praises battlefield death and imagines being struck by a cannon-ball.'],
      ] }),
    part(15, 'A Pebble Through the Window', 'The window crashes; the soldier finds a pebble, and the barber sees Gavroche running away.', 'orme-saint-gervais-barber-shop',
      'Paragraphs 15–23 confirm the projectile is a stone thrown by Gavroche in memory of the boys’ rejection, not artillery fire. He flees toward Marché Saint-Jean. The barber’s claim of unprovoked mischief conflicts with the stated motive; no bodily injury is reported.', { kind: 'scene', present: [
        ['orme-saint-gervais-barber', 'Mistakes the crash for a cannon-ball, then sees the fleeing child and complains.'],
        ['orme-saint-gervais-veteran', 'Picks up the pebble rolling on the floor.'],
        ['gavroche', 'Throws the stone through the panes and runs toward the market.'],
      ] }),
  ]],
  [274, [
    part('start', 'The Armed Band', 'Gavroche joins the group led by the friends, who carry an assortment of guns, pistols and blades.', 'marche-saint-jean',
      'Paragraphs 0–3 establish the junction and arrival at Quai Morland. The already disarmed post is background, not an action attributed to Gavroche. Combeferre’s National Guard gun does not prove his membership in that force.', { kind: 'scene', present: [
        ['gavroche', 'Joins the band and asks where they are going.'],
        ['enjolras', 'Marches with a double-barrelled hunting-gun.'],
        ['courfeyrac', 'Carries a drawn sword-cane and tells the child to come along.'],
        ['combeferre', 'Carries a legion-numbered gun and two visible pistols.'],
        ['feuilly', 'Leads with a naked sword and cries for Poland.'],
        ['bahorel', 'Has joined the group armed with a rifle.'],
        ['jean-prouvaire', 'Marches with an old cavalry musket.'],
      ] }),
    part(4, 'Wrath Spent on a Poster', 'Bahorel answers a frightened passer-by and tears down an archbishop’s notice, earning Gavroche’s admiration and Enjolras’s rebuke.', 'quai-morland',
      'Paragraphs 4–12 distinguish the actual torn notice from the absent archbishop. The red waistcoat provokes a political label; it does not establish a separate faction. Enjolras’s firing analogy is advice, not a gun discharged.', { kind: 'scene', present: [
        ['bahorel', 'Mocks fear of red and tears down the Lenten notice.'],
        ['enjolras', 'Rebukes the waste of anger on an irrelevant target.'],
        ['gavroche', 'Begins studying Bahorel with admiration.'],
      ] }),
    part(13, 'A Lesson Called Latin', 'Gavroche asks about Hercle, and Bahorel answers him before calling to a young man at a window for cartridges.', null,
      'Paragraphs 13–19 present Bahorel’s loose gloss, not an authoritative translation. The window observer is only probably a Friend of the A B C and remains unnamed. A request for cartridges does not establish delivery; Gavroche’s understanding Latin is ironic exaggeration.', { kind: 'scene', present: [
        ['gavroche', 'Asks what Hercle means and admires the answer.'],
        ['bahorel', 'Gives a slang gloss and calls for cartridges from a window observer.'],
        ['bahorel-window-observer', 'Watches the passing group from a window.'],
      ] }),
    part(20, 'The Unarmed Old Man', 'Among the mixed followers Gavroche notices an elderly man, whom the narrator identifies as Mabeuf.', null,
      'Paragraphs 20–26 explicitly identify Mabeuf to the reader, while Courfeyrac gives the child only a dismissive description. The old man is unarmed; speed and a thoughtful air do not establish intoxication or military experience.', { kind: 'scene', present: [
        ['mabeuf', 'Hurries unarmed to avoid falling behind the band.'],
        ['gavroche', 'Asks Courfeyrac about the unfamiliar old follower.'],
        ['courfeyrac', 'Answers the child with an offhand description of the old man.'],
      ] }),
  ]],
  [275, [
    part('start', 'How Mabeuf Joined Them', 'The narrator returns to the friends’ retreat from the cavalry charge and Courfeyrac’s encounter with Mabeuf.', 'rue-lesdiguieres',
      'Paragraphs 0–11 explicitly recount an earlier encounter, not a second recruitment after chapter 274. Courfeyrac knows Mabeuf from visits with Marius. The zig-zag walk is compared to intoxication without confirming drinking. Cannon fire is a warning in the dialogue, not a discharge recorded here.', { kind: 'scene', present: [
        ['courfeyrac', 'Recognizes Mabeuf and urges him home because of the fighting.'],
        ['mabeuf', 'Answers the warnings calmly and asks the group’s destination.'],
        ['enjolras', 'Has fled the charge with the friends calling for barricades.'],
        ['combeferre', 'Has taken the Rue Bassompierre with the others before the encounter.'],
      ] }),
    part(12, 'A Biography Made by the Crowd', 'Mabeuf follows without speaking, refuses offered support and is mistaken by the students for an old regicide.', null,
      'Paragraphs 12–13 distinguish observed conduct from rumor. Former Convention membership and regicide are the crowd’s inventions, not Mabeuf’s established history. Offered arms here mean bodily support, which he refuses, not weapons accepted.', { mentioned: ['mabeuf'] }),
    part(14, 'The Song Toward Saint-Merry', 'Gavroche sings at the front as the band proceeds toward Saint-Merry.', 'rue-verrerie',
      'Paragraphs 14–24 preserve the complete song as a performance. Charlot, Charlotte, sparrows and the tiger are song figures, not physical participants. Saint-Merry is the direction of travel, not a demonstrated arrival at Chanvrerie.', { kind: 'scene', present: [
        ['gavroche', 'Marches at the front singing the long refrain.'],
      ] }),
  ]],
  [276, [
    part('start', 'The Unknown Gray-Haired Recruit', 'A tall, graying man joins the band without being recognized by its leaders.', 'rue-billettes',
      'Paragraph 0 states that Courfeyrac, Enjolras and Combeferre do not know the recruit. Gavroche pays him no attention. No name or police allegiance is established here.', { kind: 'scene', items: ['gavroche-triggerless-pistol'], present: [
        ['unknown-gray-haired-recruit', 'Joins the band with a bold bearing noticed by the leaders.'],
        ['courfeyrac', 'Notices the unfamiliar man joining.'],
        ['enjolras', 'Observes the new recruit without recognizing him.'],
        ['combeferre', 'Takes notice of the stranger’s appearance.'],
        ['gavroche', 'Sings and pounds shutters with the butt of the triggerless pistol.'],
      ] }),
    part(1, 'The Coffer Under the Linen', 'Courfeyrac stops at home to fetch an old hat, his purse and a concealed coffer.', 'courfeyrac-rue-verrerie-lodgings',
      'Paragraphs 1–4 actually retrieve these objects. The coffer’s contents are not specified; its valise-like size does not identify it with any earlier suitcase.', { kind: 'scene', items: ['courfeyrac-barricade-coffer'], present: [
        ['courfeyrac', 'Runs upstairs and takes the square coffer from beneath soiled linen.'],
      ] }),
    part(5, 'Someone Asking for Marius', 'Mother Veuvain stops Courfeyrac, and a youthful visitor asks about Marius and offers to follow him.', 'courfeyrac-house-entrance',
      'Paragraphs 5–33 leave the visitor unnamed despite the description of apparent gender and clothing. The portress reports more than an hour of waiting. An offer to carry the coffer is not proof that this visitor receives it.', { kind: 'scene', mentioned: ['marius'], present: [
        ['courfeyrac', 'Says Marius is absent and announces that he is going to the barricades.'],
        ['mother-veuvain', 'Tells the lodger that a visitor has been waiting in her lodge.'],
        ['courfeyrac-marius-seeking-visitor', 'Asks whether Marius will return and requests to accompany Courfeyrac.'],
      ] }),
    part(34, 'Beyond the Intended Turning', 'Courfeyrac rejoins the band, passes the coffer to a friend and later notices the visitor following as the crowd overshoots Saint-Merry.', 'rue-saint-denis',
      'Paragraphs 34–35 confirm the visitor follows after about a quarter-hour. The coffer’s bearer is an unspecified friend, not demonstrably the visitor. The group reaches Rue Saint-Denis rather than its intended Saint-Merry destination.', { mentioned: ['courfeyrac', 'courfeyrac-marius-seeking-visitor'], items: ['courfeyrac-barricade-coffer'] }),
  ]],
]
