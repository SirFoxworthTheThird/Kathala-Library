export const furtherPlaceRows=[
 ['mabeuf-austerlitz-cottage','The thatched cottage','The modest three-room cottage in the village of Austerlitz stands near the Salpêtrière. Its exact parcel is unspecified.','paris'],
 ['mabeuf-austerlitz-garden','The shaded garden','The hedge-enclosed garden contains a well, an apple tree, shade-loving plants and a dilapidated fruit cupboard over an empty rabbit hutch. An overturned stone post serves as a bench.','mabeuf-cottage'],
 ['mabeuf-garden-hedge','The garden hedge','The planted boundary separates the garden from a solitary unpaved lane. Gaps at its foot permit a low view through the branches.','mabeuf-cottage'],
 ['mabeuf-garden-lane','The solitary lane','Brushwood borders the unpaved lane beside the hedge; houses have not yet filled this outlying ground.','mabeuf-cottage'],
 ['pontmercy-vernon-house','The riverside house','A humble house has a narrow walled flower garden reaching the Seine near the stone bridge. Neighboring enclosures form a chain along the left bank.','vernon-details'],
 ['vernon-coach-relay','The Vernon relay','A stopping place for the diligence and its horses. The source establishes its role, not its surveyed parcel or yard layout.','vernon-details'],
 ['vernon-church-approach','The church approach','A path skirts the church rather than entering it, continuing around an angle of the apse toward the grassy churchyard.','vernon-details'],
 ['pontmercy-vernon-grave','The churchyard grave','A grassy grave beyond the apse bears a black wooden cross. The name and its significance are disclosed by the scene rather than printed on the background.','vernon-details'],
 ['paris-cafe-spaces','Paris café interiors','Public cafés and smoking rooms occupy separate addresses among the western promenades and southern student districts. They share a social purpose rather than a building.','paris'],
 ['bombarda-upper-room','Bombarda’s upper room','The large plain room has a bed alcove, two tables and two windows looking beyond elms toward the quay and river.','paris-cafe-details'],
 ['cafe-voltaire','The Café Voltaire','A student café where breakfast and table conversation form the immediate setting. The furniture and room outline are editorial where unspecified.','paris-cafe-details'],
 ['richefeu-smoking-room','Richefeu’s smoking room','The smoking room near Vaugirard has a table for dominoes. Its precise furniture arrangement and dimensions are not established.','paris-cafe-details'],
]
export const furtherMapDefinitions=[
 {key:'mabeuf-cottage',name:'The Austerlitz cottage — garden',parent:'paris',description:'Source hedge, well, thatched cottage and unpaved lane. Exact parcel and garden geometry reconstructed; no action painted.'},
 {key:'vernon-details',name:'Vernon — separate source settings',parent:'france',description:'Independent riverside house, relay and churchyard details; no invented connecting streets or surveyed compass bearings.'},
 {key:'paris-cafe-details',name:'Paris — separate café interiors',parent:'paris',description:'Independent Bombarda, Voltaire and Richefeu details; no common building, corridor or street bearing asserted.'},
]
export const furtherGatewayPlans=[
 {parent:'paris',target:'mabeuf-cottage',location:'mabeuf-austerlitz-cottage',reason:'The source garden, hedge and solitary lane form one property setting.'},
 {parent:'france',target:'vernon-details',location:'vernon',reason:'Separate source settings within the Vernon chapter group.'},
 {parent:'paris',target:'paris-cafe-details',location:'paris-cafe-spaces',reason:'A diagrammatic overview of independent source interiors, not a physical shared entrance.'},
]
export const furtherSourceEvidence=[{chapter:32,paragraphs:[0,1]},{chapter:169,paragraphs:[0,1]},{chapter:171,paragraphs:[12,13]},{chapter:174,paragraphs:[69,77,83,85,89]},{chapter:185,paragraphs:[3,4,5]},{chapter:193,paragraphs:[9]},{chapter:228,paragraphs:[44,46]},{chapter:231,paragraphs:[2,4,5,6,7]},{chapter:242,paragraphs:[0,1,31]}]
