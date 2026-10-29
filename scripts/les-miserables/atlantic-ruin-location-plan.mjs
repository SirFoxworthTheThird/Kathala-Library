export const contextRuinPlaceRows=[
 ['france-context','France and neighboring regions','The European country extends from northern coastal towns and the Paris basin to the Mediterranean ports and Alpine districts.','atlantic-context'],
 ['america','America — destination unspecified','The later report names America and a draft on New York, without identifying a settlement or business address. This continental marker asserts no destination city or country.','atlantic-context'],
 ['hauteville-house','Hauteville House — Guernsey context','The dated letter appended to the source is written at Hauteville House on 18 October 1862. The island-scale point locates Guernsey, not a reconstructed room or surveyed house footprint.','atlantic-context'],
 ['rue-roi-sicile-ruin','The Rue du Roi-de-Sicile ruin','The demolished house leaves a high back wall between neighboring buildings, behind a worn plank fence. The city-scale point is approximate.','paris'],
 ['rue-roi-sicile-ruin-enclosure','The ruined-house enclosure','A rotten plank fence supported by five stone posts partly fills the former frontage; a small shanty leans against the surviving rear wall.','roi-sicile-ruin'],
 ['rue-roi-sicile-ruin-wall','The surviving high wall','The third-storey masonry remnant has two square window openings, the one nearest the right gable propped with a weathered beam. The separate prison wall is glimpsed beyond. The wall marker is on the elevation panel.','roi-sicile-ruin'],
]
export const contextRuinMapDefinitions=[
 {key:'atlantic-context',name:'Atlantic geographical context',description:'Pinned physical coastline context for European settings and the unspecified American report. No political borders, shipping route or destination city asserted; relief qualitative.'},
 {key:'roi-sicile-ruin',name:'Rue du Roi-de-Sicile — ruin details',parent:'paris',description:'Separate overhead ground enclosure and surviving-wall elevation. No route from the prison is reconstructed: the narrator explicitly leaves it unexplained.'},
]
export const contextRuinGatewayPlans=[
 {parent:'atlantic-context',target:'france',location:'france-context',reason:'The main European settings need a regional overview beneath continental context.'},
 {parent:'paris',target:'roi-sicile-ruin',location:'rue-roi-sicile-ruin',reason:'Ground enclosure and high-wall position must remain physically distinct.'},
]
export const contextRuinEvidence=[{chapter:251,paragraphs:[31,32,33,34]},{chapter:363,paragraphs:[204,205,206]},{chapter:365,paragraphs:[7]}]
