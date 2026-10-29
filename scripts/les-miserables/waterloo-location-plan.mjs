// Terrain follows Hugo's A-shaped road explanation, not modern monument relief.
export const waterlooPlaceRows=[
 ['hougomont','Hougomont','A walled farm and old manor enclosure stands beside the Nivelles road, with courtyard, garden, orchard and wood.','waterloo-country'],
 ['nivelles-la-hulpe-road','The Nivelles–La Hulpe approach','A paved country road undulates over the hills on the traveller’s approach to Hougomont. Its local point represents the approach rather than the entire itinerary.','waterloo-country'],
 ['mont-saint-jean-crossroads','The Mont-Saint-Jean crossroads','The village crossroads joins the approaches from Nivelles, Genappe, La Hulpe and Brussels.','waterloo-country'],
 ['mont-saint-jean-mill','The old mill','An old mill stands near the upper village and plateau, with a tree nearby.','waterloo-country'],
 ['mont-saint-jean-plateau','The Mont-Saint-Jean plateau','The high ground lies between the two main highways and the cross-road, backed by the village and the Soignes forest.','waterloo-country'],
 ['mont-saint-jean-plateau-foot','The foot of the plateau','The lower ground faces the rising bank beneath the plateau; its plotted point represents an area, not a measured incident site.','waterloo-country'],
 ['belle-alliance-mont-saint-jean-slope','The slope toward Mont-Saint-Jean','Undulating fields rise from La Belle-Alliance toward the plateau, with steeper ground near La Haie-Sainte.','waterloo-country'],
 ['ohain-hollow-road','The hollow road of Ohain','The narrow sunken road crosses the plateau crest between the Nivelles and Genappe highways, continuing toward Braine-l’Alleud and Ohain.','waterloo-country'],
 ['plancenoit-front','The Plancenoit approach','The ground before Plancenoit receives roads and woodland approaches from the east.','waterloo-country'],
 ['wavre-plancenoit-route','The approach from Wavre','The eastern approach leads toward Plancenoit through the country beyond the main field; the local marker does not assert the complete route.','waterloo-country'],
 ['rossomme-heights','The Rossomme heights','Low heights above the farm country provide a view toward the more distant plateau.','waterloo-country'],
 ['rossomme-outposts','The Rossomme country','Roads and fields around Rossomme provide the ground traversed in the nighttime reconnaissance. No transient outpost is painted on the map.','waterloo-country'],
 ['rossomme-command-table','The slope by the Plancenoit road','The slope at the road angle near Rossomme provides the site of the outdoor table described in the narrative. Furniture is transient and not painted.','waterloo-country'],
 ['rossomme-deployment-ground','The fields beyond Rossomme','Open fields extend beyond the farm and road, with room to deploy across the rolling ground.','waterloo-country'],
 ['napoleon-waterloo-command-post','The early headquarters ground','The morning reports reach the commander in the Rossomme sector. The text does not establish an exact address, so the marker is approximate.','waterloo-country'],
 ['napoleon-waterloo-observation-post','The observation knoll','A small turf elevation east of the Genappe–Brussels road beyond Rossomme offers a view across the plain. Later movement to the third station remains distinct in the prose.','waterloo-country'],
 ['waterloo-genappe-retreat','The road toward Genappe','The main highway leads south from the field toward Genappe, crossing the surrounding cultivated country.','waterloo-country'],
 ['genappe-meadow','A meadow near the Genappe approach','An open meadow lies beside the southern approach. Its precise incident site is not identified and the plotted position is schematic.','waterloo-country'],
 ['hougomont-courtyard','The Hougomont courtyard','The enclosed yard has farm buildings, a chapel and two wells, with north and south entrances.','hougomont-details'],
 ['hougomont-south-door','The southern door','The southern entrance occupies the notched corner of the irregular enclosure.','hougomont-details'],
 ['hougomont-farmhouse','The farmhouse','The inhabited farm dwelling opens onto the yard; its door has an old decorated iron handle.','hougomont-details'],
 ['hougomont-orchard','The orchard enclosure','A garden, an orchard of old apple trees and a wood share an enclosure. Steps and a balustraded terrace separate the garden from the higher orchard.','hougomont-details'],
 ['hougomont-well','The old courtyard well','One of the yard’s two wells stands within a three-sided masonry surround. Its contents are not shown on the static site plan.','hougomont-details'],
]
export const waterlooMapDefinitions=[
 {key:'waterloo-country',name:'The Waterloo country',parent:'france',description:'Hugo’s road pattern and qualitative pre-monument terrain. Sites and relief are approximate; no measured contours or battle formations are painted.'},
 {key:'hougomont-details',name:'Hougomont — source details',parent:'waterloo-country',description:'The enclosure, courtyard and garden-orchard-wood arrangement. Property geometry is reconstructed; it is not a cadastral survey.'},
]
export const waterlooGatewayPlans=[
 {parent:'france',target:'waterloo-country',location:'waterloo-battlefield',reason:'Local terrain and road network south of Brussels.'},
 {parent:'waterloo-country',target:'hougomont-details',location:'hougomont',reason:'The narrated visit requires courtyard and orchard detail.'},
]
export const waterlooSourceEvidence=[
 {chapter:71,paragraphs:[0,1,2,3,6]},
 {chapter:72,paragraphs:[2,3,5,6,7,15,20,21,22,23,24,27,29]},
 {chapter:74,paragraphs:[0,1,2,3,5,6]},
 {chapter:76,paragraphs:[2,6]},
 {chapter:77,paragraphs:[1,3,4,6,9,10,11,12]},
 {chapter:80,paragraphs:[20]},
 {chapter:81,paragraphs:[2,4,6,8]},
]
