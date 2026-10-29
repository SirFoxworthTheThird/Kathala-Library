// These city-scale locators identify source neighborhoods, never exact rooms,
// parcels or complete trajectories. Close points are distinct source spaces.
export const secondaryParisRows=[
 ['chatelet-police-post','The Châtelet police post','The post at a corner of Place du Châtelet has a glazed and grated door, a candlelit table, paper, ink, a pen and sealing wafers. Its city-scale parcel is approximate.',[928,419]],
 ['barriere-maine-road','The Barrière du Maine road','The southern barrier road by which the prisoner wagons leave Paris.',[553,848]],
 ['barriere-maine-route','Toward the Barrière du Maine','The approach toward the southern barrier and the Vaugirard district.',[572,824]],
 ['barriere-maine-timber-yard','The timber yard at the barrier','A timber-yard setting near the Barrière du Maine, represented by its district rather than a reconstructed parcel.',[545,825]],
 ['boulevard-du-maine','Boulevard du Maine','The southern boulevard on the approach to the old cemetery district.',[585,809]],
 ['boulevard-invalides-vicinity','Near the Invalides boulevard','The neighborhood of the boulevard beside the Invalides, rather than a measured house frontage.',[482,616]],
 ['champ-de-mars-moat','The Champ-de-Mars moat','The ditch at the edge of the exercise ground, represented at city scale.',[232,599]],
 ['champ-de-mars-slope','The Champ-de-Mars slope','The bank overlooking the moat near the Champ de Mars. The exact observation point is unspecified.',[251,575]],
 ['beaujon-russian-mountains','The Beaujon pleasure grounds','The western pleasure grounds with their early Russian-mountain amusement ride. The city point identifies the district, not the ride structure.',[255,225]],
 ['paris-barrier-monceaux','The Monceaux barrier','The northwestern barrier district beyond the densely built town.',[290,175]],
 ['jardin-plantes-quay-route','The Jardin des Plantes quays','The left-bank approach along the river toward the eastern bridge.',[1102,699]],
 ['paris-carrefour-rollin','The Carrefour Rollin district','The student streets by the old junction near the Panthéon and Rue Saint-Jacques.',[900,645]],
 ['paris-observatoire-hopital-streets','The southern Paris approaches','The outer southern streets between the Observatoire and the hospital boulevard. This marker denotes a broad approach, not a single crossing.',[845,843]],
 ['salpetriere-adjoining-plains','The open ground beyond the Salpêtrière','The sparse southern outskirts beyond the hospital, among open ground and outlying settlements.',[1115,882]],
 ['paris-rue-pontoise','Rue de Pontoise','The left-bank street near the river and the eastern student district.',[980,618]],
 ['rue-pontoise-police-office','The Rue de Pontoise police office','The commissary’s office in the Rue de Pontoise district. The city marker does not assert its exact building or room position.',[989,617]],
 ['rue-pontoise-police-route','Toward the police office','The neighborhood approach to the Rue de Pontoise office, without an invented complete itinerary.',[976,628]],
 ['saint-medard-well','The well by Saint-Médard','The well in the southern Saint-Médard neighborhood beside Rue Mouffetard. Its precise position within the square is editorial.',[899,785]],
 ['rue-mouffetard-pursuit-route','The Mouffetard pursuit district','The southern street district through which the reported pursuit passes; the stable marker does not claim every turn.',[928,777]],
 ['rue-beautreillis-costume-shop','The Rue Beautreillis costume shop','A shop providing changes of clothes in Rue Beautreillis. The source does not establish a surveyed parcel.',[1181,497]],
 ['saint-antoine-bakery','The Saint-Antoine bakery','The bakery on Rue Saint-Antoine, represented by its street district rather than an invented shop plan.',[1212,507]],
 ['mabeuf-rue-mesieres-home','The Rue Mésières home','The earlier dwelling in the Saint-Sulpice district, distinct from the later Austerlitz cottage.',[588,603]],
 ['magnon-rue-clocheperce-home','The Rue Clocheperce lodging','The shared lodging in Rue Clocheperce, with affected but poor furnishings. Its exact parcel and internal layout are unspecified.',[1119,476]],
 ['orme-saint-gervais-barber-shop','The shop by Orme-Saint-Gervais','A wig-maker’s shop in the old Saint-Gervais neighborhood. The city marker identifies the vicinity, not a measured frontage.',[1101,486]],
 ['plat-etain-coach-office','The Plat d’Étain coach office','The Lagny coach office in the La Planchette blind alley near the Porte Saint-Martin theatre.',[1040,204]],
]
export const secondaryParisLocations=secondaryParisRows.map(([key,name,description])=>[key,name,description+' City-scale placement is approximate.','paris'])
export const secondaryParisRegistration=Object.fromEntries(secondaryParisRows.map(([key,,,point])=>[key,point]))
export const secondaryParisLandmarks=Object.fromEntries(secondaryParisRows.map(([key,name])=>[key,`${name}: approximate source district on the city overview, not a surveyed property or full route.`]))
