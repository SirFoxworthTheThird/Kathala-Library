import { supportingCharacterIntroductions } from './supporting-characters.mjs'
import { referenceCharacterIntroductions } from './reference-characters.mjs'

// Reader-facing introductions. These descriptions stop at the first appearance;
// endings, concealed identities and later family connections belong in reveals.
const definitions = `
myriel|Charles-François-Bienvenu Myriel|An elderly priest whose appointment brings him and his small household to the bishopric of Digne.
baptistine|Mademoiselle Baptistine|The bishop’s unmarried sister, gentle in manner and accustomed to sharing his modest household.
magloire|Madame Magloire|Baptistine’s housekeeper, responsible for making the episcopal household’s limited allowance meet its needs.
napoleon|Napoleon|The Emperor encountered by the elderly priest in a Paris anteroom around the coronation.
fesch|Cardinal Fesch|The cardinal through whom the priest’s Paris encounter reaches the imperial administration.
hospital-director|The hospital director|The administrator of Digne’s overcrowded hospital beside the episcopal palace.
geborand|Monsieur Géborand|A wealthy merchant whose small charitable donation attracts the bishop’s attention.
champtercier|Monsieur de Champtercier|A marquis who answers an appeal for charity by saying that he has poor people of his own.
comtesse-de-lo|The Countess de Lô|A prosperous relation of the bishop who dwells on the inheritances her sons may expect.
condemned-prisoner|The condemned prisoner|A man awaiting execution at Digne, terrified of the punishment before him.
visiting-cure|The visiting curate|An unnamed parish priest who questions the safety of the bishop’s unlocked door.
cravatte|Cravatte|The leader of a band whose robberies make the mountain roads dangerous.
mountain-guide-child|The young mountain guide|A child who offers to guide the bishop along a mountain route.
mountain-cure|The mountain curate|A priest serving an isolated community with very poor church furnishings.
chastelar-mayor|The mayor of Chastelar|A local official concerned about travel through the bandits’ territory.
senez-mayor|The mayor of Senez|The official who receives a bishop arriving on a donkey.
conventionary-g|The Conventionary G——|An aged former revolutionary living in seclusion outside Digne.
g-shepherd|The Conventionary’s shepherd|A young shepherd attending the secluded old man near Digne.
valjean|The traveller|A weary, strongly built man entering Digne on foot after a long day’s walking, carrying a bundle and an iron-shod staff.
jacquin-labarre|Jacquin Labarre|The landlord of the Cross of Colbas, proud of his inn’s reputation and alert to his guest’s standing.
labarre-scullion|Labarre’s scullion|The kitchen boy entrusted with an inquiry to the town-hall.
digne-townhall-gendarme|The town-hall gendarme|A gendarme watching the traveller leave Digne’s town-hall.
chaffaut-tavernkeeper|The Chaffaut tavernkeeper|The keeper of a modest public house with a hearth and a shared meal.
digne-fishmonger|The fishmonger|A man who encounters the traveller on the road and carries news between Digne’s inns.
digne-turnkey|The prison turnkey|The officer answering requests through the wicket of Digne’s prison.
digne-armed-householder|The armed householder|A working man disturbed at his family meal by a stranger’s request for shelter.
digne-householder-wife|The householder’s wife|A woman at the family table when a stranger appears at the window.
marquise-r|The Marquise de R——|An elderly woman in Digne who takes notice of a traveller without lodging.
little-gervais|Little Gervais|A young Savoyard on the road, playing with a coin as he goes.
valjean-sister|The traveller’s sister|The widowed elder sister whose children once depended on her brother’s work.
madeleine|Monsieur Madeleine|A stranger whose improved manufacturing methods bring prosperity to Montreuil-sur-Mer.
fantine|Fantine|A young working woman in Paris, fair-haired and reserved among her companions.
tholomyes|Félix Tholomyès|A well-to-do student from Toulouse whose easy wit dominates his circle.
blachevelle|Blachevelle|One of the four Paris students who make an excursion with their companions.
fameuil|Fameuil|A member of the student quartet, enjoying the pleasures of Paris with the others.
listolier|Listolier|The fourth student in the party of young men and women.
favourite|Favourite|A lively member of the women’s circle, attached to Blachevelle.
dahlia|Dahlia|One of Fantine’s companions on the Paris excursion.
zephine|Zéphine|A young woman in the party that goes out from Paris together.
thenardier|Thénardier|An innkeeper at Montfermeil, concerned with the price and advantage of his household’s dealings.
madame-thenardier|Madame Thénardier|The innkeeper’s wife, encountered outside the Montfermeil inn with her small daughters.
cosette|The little girl|Fantine’s little daughter, travelling with her mother when they stop at Montfermeil.
eponine|The elder daughter|One of the Thénardiers’ young daughters at Montfermeil.
azelma|The younger daughter|The younger of the innkeeper’s two daughters, at play beside her sister.
javert|Javert|A police inspector at Montreuil-sur-Mer, severe in bearing and exacting in his understanding of authority.
fauchelevent|Fauchelevent|An elderly carter whose reduced circumstances have made his work precarious.
victurnien|Madame Victurnien|A woman of Montreuil who concerns herself with the private circumstances of the factory workers.
madeleine-superintendent|The factory superintendent|The woman entrusted with overseeing the female workers at Madeleine’s factory.
marguerite|Marguerite|A neighboring woman who offers practical help to Fantine.
bamatabois|Bamatabois|A well-dressed idler in Montreuil who amuses himself at another person’s expense.
fantine-doctor|Fantine’s doctor|The physician responsible for Fantine’s treatment at the infirmary.
sister-simplice|Sister Simplice|A nursing sister noted for her scrupulous truthfulness.
sister-perpetue|Sister Perpétue|A nursing sister working at the infirmary in Montreuil.
champmathieu|Champmathieu|A poor man accused of theft and held for trial at Arras.
brevet|Brevet|A former convict called as a witness in the Arras proceedings.
chenildieu|Chenildieu|A convict brought before the Arras court as an identification witness.
cochepaille|Cochepaille|A convict whose testimony is sought in the trial at Arras.
waterloo-prowler|The battlefield prowler|A furtive man searching among the fallen near the hollow road of Ohain at night.
waterloo-wounded-officer|The wounded cuirassier|An officer trapped beneath the bodies in the hollow road after the battle.
pontmercy|Pontmercy|A wounded French officer whose encounter at Waterloo leaves him with a debt of gratitude.
boulatruelle|Boulatruelle|The road-mender at Montfermeil, uneasy about the woods and the stories told of hidden wealth.
montfermeil-yellow-stranger|The man in the yellow coat|A poorly dressed, strongly built stranger who moves quietly through the roads and woods near Montfermeil.
petit-picpus-bell-man|The man with the bell|A bent, limping man working among the melon beds with a bell fastened at his knee.
gorbeau-principal-lodger|The principal lodger|The elderly woman who manages rooms and watches the comings and goings at the Gorbeau house.
saint-medard-ex-beadle|The Saint-Médard beggar|An elderly former beadle who receives alms near Saint-Médard.
saint-medard-beggar-figure|The unfamiliar beggar|A figure in the accustomed beggar’s place whose appearance briefly troubles the charitable passer-by.
mother-innocente|Mother Innocente|The prioress of the convent at Petit-Picpus.
mother-crucifixion|Mother Crucifixion|A nun at Petit-Picpus known for the severity of her religious observance.
mother-sainte-mechtilde|Mother Sainte-Mechtilde|A nun whose life forms part of the convent’s remembered history.
mother-cineres|Mother Cineres|A member of the Petit-Picpus religious community.
mother-gerbaud|Mother Gerbaud|A poor woman arriving at the bishop’s door with a small child in her arms.
mother-veuvain|Mother Veuvain|The concierge at Courfeyrac’s lodgings, who announces that a visitor is waiting in her lodge.
gribier|Gribier|A gravedigger employed at the Vaugirard cemetery.
gillenormand|Monsieur Gillenormand|An elderly Parisian with strong royalist opinions, punctilious manners and a taste for the ways of his youth.
gillenormand-elder-daughter|Mademoiselle Gillenormand|The unmarried elder daughter living in her father’s household.
gillenormand-younger-daughter|Gillenormand’s younger daughter|The younger daughter whose marriage is part of the family’s troubled history.
gillenormand-grandson|Gillenormand’s grandson|The child brought up in the old royalist’s household.
marius|Marius|A poor young man occupying a room beside the Jondrette family at the Gorbeau house.
basque|Basque|An elderly servant in Gillenormand’s household.
nicolette-current|Nicolette|A maid serving in the Gillenormand house.
nicolette|Nicolette|The maid responsible for domestic work in the Gillenormand household.
mabeuf|Monsieur Mabeuf|A churchwarden with a quiet manner and an interest in plants and old books.
abbe-mabeuf|The Abbé Mabeuf|The churchwarden’s brother, a priest mentioned in the account of his life.
mother-plutarque|Mother Plutarque|The elderly woman who keeps house for Monsieur Mabeuf.
theodule|Théodule Gillenormand|A young cavalry officer and a relation of the Gillenormand family.
courfeyrac|Courfeyrac|A sociable young man whose warmth and ready generosity give him a central place among his friends.
bossuet|Bossuet|A law student known by several versions of his family name and remarkable for his persistent bad luck.
joly|Joly|A medical student with an anxious interest in his own health and a close friendship with Bossuet.
enjolras|Enjolras|A young republican of grave beauty, absorbed in the cause of political liberty.
combeferre|Combeferre|A thoughtful member of the republican circle, interested in education, science and the paths of progress.
jean-prouvaire|Jean Prouvaire|A shy young poet whose interests range through language, history and the natural world.
feuilly|Feuilly|A working fan-maker whose self-education has given him a deep concern for other peoples’ freedom.
bahorel|Bahorel|An exuberant young man, impatient with restraint and readily drawn into opposition.
grantaire|Grantaire|A skeptical, physically accomplished companion drawn to a circle whose convictions he does not share.
musichetta|Musichetta|The woman Joly praises to Bahorel while lamenting her coolness toward him.
madame-bourgon|Madame Bourgon|The new principal lodger managing the Gorbeau rooms.
jondrette|Jondrette|The father of a destitute family renting the last garret at the end of the Gorbeau corridor.
madame-jondrette|Madame Jondrette|The mother of the family living in the cramped Gorbeau garret.
jondrette-elder-daughter|The elder Jondrette girl|The older daughter in the impoverished family at the Gorbeau house.
jondrette-younger-daughter|The younger Jondrette girl|The younger daughter of the family occupying the end garret.
gavroche|Little Gavroche|A neglected Paris boy, resourceful and merry in the streets despite hunger and lack of a welcoming home.
thenardier-young-son|The innkeeper’s little son|The young boy in the Thénardier household at Montfermeil.
thenardier-younger-boy|The elder of the two little boys|One of two small brothers whose care has passed into Magnon’s household.
thenardier-youngest-boy|The younger of the two little boys|The smaller of the two brothers cared for in Magnon’s household.
magnon|Magnon|A woman receiving an allowance from Gillenormand for the care of two children.
mamselle-miss|Mamselle Miss|An associate whose involvement matters to the account of Magnon’s household.
monsieur-leblanc|Monsieur Leblanc|The white-haired man whom Marius observes walking with a girl in the Luxembourg gardens.
mademoiselle-lanoire|Mademoiselle Lanoire|The young girl walking with the white-haired man in the Luxembourg gardens.
marius-hoarse-voiced-girl|The hoarse-voiced girl|A ragged young woman whose voice and appearance attract Marius’s attention.
boulevard-taller-ragged-girl|The taller ragged girl|The taller of two poorly clothed girls passing along the boulevard.
boulevard-shorter-ragged-girl|The smaller ragged girl|The smaller companion of the tall girl on the boulevard.
pontoise-substitute-inspector|The substitute police inspector|The inspector receiving Marius in place of the official he asked to see.
panchaud|Panchaud|A man known in the criminal circles described by the narrator.
demi-liard|Demi-Liard|An associate in the band whose activities concern the Paris police.
babet|Babet|A thin, talkative member of the Paris criminal fraternity.
gueulemer|Gueulemer|A powerfully built member of the band known in the Paris underworld.
claquesous|Claquesous|A secretive member of the band, elusive in appearance and habits.
montparnasse|Montparnasse|A young man of the Paris underworld who cultivates elegance while avoiding work.
brujon|Brujon|A prisoner associated with the plans and communications of the criminal band.
jondrette-barrier-interlocutor|The man at the barrier|A man encountered during Jondrette’s preparations outside the Gorbeau rooms.
masked-cudgel-man|The man with the cudgel|A disguised entrant carrying a cudgel into the garret.
masked-axe-man|The man with the axe|A disguised man armed with an axe during the garret ambush.
masked-key-man|The masked man with keys|An entrant whose concealed face and keys distinguish him during the ambush.
attic-white-haired-man|The white-haired man in the garret|An older man with closed eyes and a blackened face, seated against the wall on the bed.
attic-bearded-man|The bearded man in the garret|A younger bare-armed man with a beard and a blackened face, seated on the bed among the silent strangers.
attic-long-haired-man|The long-haired man in the garret|A younger man whose long hair remains visible above his blackened face, seated beside the other strangers.
attic-doorpost-man|The man beside the door-post|A bare-armed stranger with a blackened face, standing at the door side of the garret.
toussaint|Toussaint|A domestic servant in the Rue Plumet household, with a marked stammer and a trusting manner.
mabeuf-garden-helper|The girl at the garden|A young woman who appears while Mabeuf is trying to water his garden.
mabeuf-lane-old-man|The old man in the lane|A plainly dressed older man walking slowly along a quiet lane.
invalides-white-haired-workman|The white-haired workman|A man in a workman’s cap whom Marius sees near the Invalides.
champ-de-mars-warning-figure|The warning voice|An indistinct figure whose warning reaches Valjean near the Champ-de-Mars.
plumet-barricade-message-figure|The figure at Rue Plumet|An obscure figure who gives Marius a message near the deserted garden.
courfeyrac-marius-seeking-visitor|The visitor asking for Marius|A young visitor who comes to Courfeyrac’s lodging looking for Marius.
unknown-gray-haired-recruit|The gray-haired recruit|A tall unfamiliar man with graying hair who joins the band near the Rue des Billettes.
le-cabuc|Le Cabuc|A man among the barricade crowd who demands entry to a neighboring house.
chanvrerie-tall-house-porter|The tall house’s porter|The man answering a demand for entry beside the barricade.
chanvrerie-young-artillery-sergeant|The young artillery sergeant|A young noncommissioned officer serving the cannon directed against the barricade.
chanvrerie-rooftop-fireman|The fireman on the roof|A fireman working from the roof within sight of the barricade.
chanvrerie-rooftop-officer|The officer on the roof|An officer who takes a rooftop observer’s place overlooking the defended street.
fannicot|Captain Fannicot|An officer advancing with his company near the barricade.
father-hucheloup|Father Hucheloup|The former keeper of the Corinthe wine-shop, remembered for his cooking and signs.
widow-hucheloup|Widow Hucheloup|The woman keeping Corinthe after her husband’s death.
matelote|Matelote|A serving woman at Corinthe, known by a culinary nickname.
gibelotte|Gibelotte|A serving woman at Corinthe whose nickname also comes from the kitchen.
navet|Navet|A street boy used as a messenger by the insurgents.
patagon|Mother Patagon|One of three portresses talking in a Rue de Thorigny doorway.
seine-ragged-fugitive|The ragged man on the shore|A man moving along the Seine with an official-looking pursuer behind him.
seine-official-pursuer|The official-looking pursuer|A tall man following a ragged fugitive along the deserted right bank.
seine-following-coachman|The waiting coachman|The driver summoned to follow the pursuit along the quays.
marius-white-haired-inquirer|The white-haired visitor|A gentleman repeatedly asking about Marius’s condition and leaving lint for his dressings.
montfermeil-treasure-digger|The man at the forest clearing|An unfamiliar figure whom Boulatruelle follows among the marked trees near Montfermeil.
gillenormand-house-porter|Gillenormand’s porter|The porter answering the carriage gate at Gillenormand’s house in the Marais.
homme-arme-porter|The Rue de l’Homme Armé porter|The man responsible for admitting lodgers and visitors to the house in Rue de l’Homme Armé.
homme-arme-portress|The Rue de l’Homme Armé portress|The woman tending the house and preparing scanty meals for its solitary lodger.
homme-arme-doctor|The neighborhood doctor|The local physician whom the portress calls to see her weakened lodger.
gillenormand-doctor|The Gillenormand household’s doctor|The physician called to treat the wounded young man brought home from the barricade.
corinthe-javert-guard|Javert’s armed guard|An unnamed insurgent with a drawn sword, left in the tap-room to watch the bound inspector during the attack.
carnival-spaniard|The masked Spaniard|An older-looking masker with a large nose and black moustache, riding in a carnival vehicle.
carnival-young-fishwife|The young fishwife masker|A shivering young woman in a low-necked fishwife costume and short mask on the carnival cart.
the-changer|The Changer|A Paris costumer renting clothes that allow his clients to impersonate respectable professions.
`.trim().split('\n').map(line => line.split('|'))

export const characterIntroductions = new Map([
  ...definitions.filter(([key]) => key !== 'nicolette-current')
    .map(([key, name, description]) => [key, { key, name, description }]),
  ...supportingCharacterIntroductions,
  ...referenceCharacterIntroductions,
])

export const characterNameChanges = {
  valjean: [{ chapter: 15, at: 49, name: 'Jean Valjean' }],
  cosette: [{ chapter: 37, at: 36, name: 'Cosette' }],
  eponine: [{ chapter: 38, at: 'start', name: 'Éponine' }],
  azelma: [{ chapter: 38, at: 'start', name: 'Azelma' }],
}

// Verified repeated household designation; unlike the earlier, deceased
// Nicolette mentioned in Gillenormand’s youth, these keys denote the current maid.
export const sameCharacterKeys = { 'nicolette-current': 'nicolette' }

export function canonicalCharacterKey(key) { return sameCharacterKeys[key] ?? key }
