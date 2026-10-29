// Broad contextual locators stay at their declared regional/city scale.
// They do not establish an inn parcel, college room, prison or full itinerary.
export const contextLocationRows=[
 ['bas-boulonnais','The Bas Boulonnais','The northern coastal country around Montreuil and Boulogne, with small communes and manufacturing settlements. The marker denotes a district rather than one town.','france',[601,194]],
 ['hesdin-inn-front','The inn at Hesdin','An inn frontage where a posting horse can rest and be fed. The regional marker identifies Hesdin, not an established inn address.','france',[637,233]],
 ['saint-pol-inn','The Saint-Pol inn','An inn at Saint-Pol has a stable and manger for travellers’ horses. Its exact property is unspecified; the marker gives the regional town position.','france',[660,235]],
 ['tinques-road','The road at Tinques','The village approach leads toward a road under repair, with a crossroad toward Carency. The regional point identifies the Tinques vicinity, not every bend.','france',[674,240]],
 ['carency-arras-detour','The Carency detour','The account directs travellers toward Carency, across the river, through Camblin and toward Mont-Saint-Éloy and Arras. This regional locator summarizes that detour, without asserting a complete surveyed route.','france',[685,226]],
 ['moulins-college','The College of Moulins','The school at Moulins recalled from an earlier boyhood. The regional position identifies Moulins in the Bourbonnais; no college footprint or room plan is established.','france',[739,621]],
 ['chemin-vert-fruit-seller','The Chemin-Vert fruiterer','A fruit-seller’s premises in Rue du Chemin-Vert. The street-district locator is approximate and does not reconstruct a shop address or room layout.','paris',[1330,385]],
 ['paris-boulevards','The Paris boulevards','The right-bank boulevard procession runs between the Madeleine and the Bastille, with a stoppage near Pont-aux-Choux. This point denotes that eastern segment, not the complete procession.','paris',[1135,310]],
 ['paris-prisons','The Paris prison system','The city’s prisons hold people awaiting trial. The report does not identify the particular prison in question; the marker denotes Parisian institutional context, not a physical cell or building.','paris',[1050,350]],
 ['paris-public-festival','The public festivities','The celebration extends across several Paris venues: the Champ de Mars, Seine, Champs-Élysées and Étoile. This city-context point denotes the western festival district, not a single venue shared by all the spectacles.','paris',[340,450]],
 ['paris-theatres','The Paris theatres','The theatre galleries provide cheap places for young spectators. The narrator describes a recurring urban practice rather than one identified performance or theatre; the point denotes the Boulevard du Temple entertainment district.','paris',[1178,290]],
]
export const contextLocationDefinitions=contextLocationRows.map(([key,name,description,map])=>[key,name,description+' Placement is approximate at the displayed scale.',map])
export const contextRegistration=map=>Object.fromEntries(contextLocationRows.filter(row=>row[3]===map).map(([key,,,,point])=>[key,point]))
export const contextLandmarks=map=>Object.fromEntries(contextLocationRows.filter(row=>row[3]===map).map(([key,name])=>[key,`${name}: broad contextual locator, without a surveyed property or complete route.`]))
export const contextLocationEvidence=[{chapter:59,paragraphs:[17,111,138,139,154,166,176]},{chapter:62,paragraphs:[0]},{chapter:145,paragraphs:[2]},{chapter:149,paragraphs:[0]},{chapter:163,paragraphs:[0]},{chapter:240,paragraphs:[36]},{chapter:349,paragraphs:[8]},{chapter:350,paragraphs:[24,28,29]}]
