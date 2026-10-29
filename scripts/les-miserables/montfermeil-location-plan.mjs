export const montfermeilPlaceRows=[
 ['montfermeil-region','The Montfermeil country','The wooded plateau country east of Paris lies between the approaches to Livry, Chelles and Gagny. The regional point represents a district rather than one street address.','paris-environs'],
 ['montfermeil','Montfermeil','The village stands on the high table-land, with old houses, a church and lanes leading toward the surrounding woods.','montfermeil-country'],
 ['thenardier-inn','The Thénardier inn','A modest village hostelry in Boulanger Lane, near the church end of Montfermeil.','montfermeil-country'],
 ['thenardier-inn-front','Outside the inn','The lane immediately before the hostelry provides an approach from the church quarter.','montfermeil-country'],
 ['montfermeil-church-square','The church square','The open space beside the village church receives temporary merchant stalls during the Christmas fair.','montfermeil-country'],
 ['montfermeil-toy-stall','The toy merchant’s stall','A temporary merchant’s display stands near the church and the approach to Boulanger Lane. Its stock changes and is not painted into the map.','montfermeil-country'],
 ['montfermeil-forest','The Montfermeil woods','Woodland and clearings spread across the plateau around the village.','montfermeil-country'],
 ['montfermeil-chelles-path','The path toward Chelles','The church-side village lanes give way to fields and woodland on the slope toward Chelles.','montfermeil-country'],
 ['montfermeil-forest-spring','The forest spring','A small spring halfway down the slope supplies the church end of the village, about a quarter-hour’s walk away.','montfermeil-country'],
 ['montfermeil-spring-return-path','The spring path','A wooded footpath connects the spring with the village. Its bend represents the narrated return journey without claiming an exact surveyed point.','montfermeil-country'],
 ['montfermeil-marked-clearing','A forest clearing','An ordinary clearing in the woodland near the Chelles approach; no concealed object or private marking appears in the static terrain.','montfermeil-country'],
 ['montfermeil-gagny-road','The Gagny approach','The village’s other end leads toward Gagny and the ponds in the woods.','montfermeil-country'],
 ['montfermeil-livry-road','The Livry road','The road turns away from the village across the plateau, allowing a long view ahead.','montfermeil-country'],
 ['montfermeil-livry-bondy-forest','The Livry and Bondy woods','Woodland and brush extend along the outward approach toward Livry and Bondy.','montfermeil-country'],
 ['montfermeil-aqueduct-turf-path','The turf path over the old aqueduct','A grassy alley nearly circles the hill above the covered arch of the old Chelles Abbey aqueduct, beyond ponds and a clearing.','montfermeil-country'],
 ['thenardier-inn-public-room','The inn’s public room','A common room with tables, pewter vessels, a broad fireplace and an oil lamp serves the inn’s guests.','thenardier-inn-details'],
 ['thenardier-inn-guest-room','The first-floor guest room','A chamber furnished with mahogany and a low bed curtained in red calico opens toward the corridor and stair.','thenardier-inn-details'],
 ['thenardier-inn-stairs','The inn stairs','The staircase is reached along the guest-room corridor. The plan does not assign every sleeping space to a known floor.','thenardier-inn-details'],
 ['thenardier-understairs-recess','The understairs recess','A triangular space beneath the steps contains a ragged straw pallet among dust and discarded scraps. Its floor is unspecified.','thenardier-inn-details'],
 ['thenardier-children-hearth-room','The hearth room','An open door near the pallet leads into a large room with a cold fireplace. Beyond a glass door stand two white beds and a partly hidden wicker cradle.','thenardier-inn-details'],
 ['thenardier-couple-bedroom','The parents’ chamber','The innkeepers have a private sleeping room. Its connection to the children’s chamber is only the traveller’s conjecture, so no passage is drawn.','thenardier-inn-details'],
]
export const montfermeilMapDefinitions=[
 {key:'montfermeil-country',name:'Montfermeil and the woods',parent:'paris-environs',description:'Village, wooded plateau, spring and outward approaches. Local positions and relief are schematic; no surveyed scale or bearings are asserted.'},
 {key:'thenardier-inn-details',name:'The Thénardier inn',parent:'montfermeil-country',description:'Separate source-described details. Only the guest chamber has an established first-floor designation; the parents’ room is unlocated and unconnected.'},
]
export const montfermeilGatewayPlans=[
 {parent:'paris-environs',target:'montfermeil-country',location:'montfermeil-region',reason:'Country district east of Paris, outside the city street overview.'},
 {parent:'montfermeil-country',target:'thenardier-inn-details',location:'thenardier-inn',reason:'Separate source-described inn interiors, without an invented complete floor plan.'},
]
export const montfermeilSourceEvidence=[
 {chapter:93,paragraphs:[0,1,2,4,5]},
 {chapter:97,paragraphs:[0,1,3,9,20,26]},
 {chapter:98,paragraphs:[30,31,32,33]},
 {chapter:100,paragraphs:[196,208,213,218,219]},
 {chapter:101,paragraphs:[85,86,93]},
 {chapter:102,paragraphs:[8,16,17,60]},
]
