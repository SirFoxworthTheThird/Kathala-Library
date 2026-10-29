export const lodgingRuralPlaceRows=[
 ['paris-lodgings','The Paris lodgings','Student chambers occupy rented rooms in the Latin Quarter and the Marais; quiet modest houses stand near the Luxembourg. These are separate properties.','paris'],
 ['courfeyrac-rue-verrerie-lodgings','The Rue de la Verrerie lodging','The student room contains a bed with room for a second mattress on the floor. Its floor within the house is unspecified.','paris-lodging-details'],
 ['courfeyrac-house-entrance','The Rue de la Verrerie entrance','The doorway and stair approach where the portress can hail a departing resident. The passage does not establish a separate porter’s room.','paris-lodging-details'],
 ['hotel-porte-saint-jacques','The Hôtel de la Porte-Saint-Jacques chamber','A rented student chamber beside another student’s room. Its furnishings and outline are editorial where unspecified.','paris-lodging-details'],
 ['rue-ouest-leblanc-house','The Rue de l’Ouest house','A new, modest three-storey house in a quiet part of Rue de l’Ouest. The apartment floor is not established.','paris-lodging-details'],
 ['rue-ouest-leblanc-house-gate','The Rue de l’Ouest carriage gate','The carriage entrance gives access from the street to the modest house. The porter answers questions at the entrance.','paris-lodging-details'],
 ['faverolles-setting','Faverolles — position unspecified','A rural French village with a church square, a bakery and poor households along country lanes. Its identification with a modern village is not established here; the regional position is schematic.','france'],
 ['faverolles','Faverolles','A thatched cottage stands across a lane from a farming household; the village’s bakery fronts the church square.','faverolles-village'],
 ['faverolles-bakery','The bakery on the church square','The bakery has a grated glass shop front facing the village square. The intact background does not paint the later damage.','faverolles-village'],
]
export const lodgingRuralMapDefinitions=[
 {key:'paris-lodging-details',name:'Paris — separate lodgings',parent:'paris',description:'Independent student-room, street-entrance, hotel-chamber and Rue de l’Ouest property details. Unknown floors and connections remain unspecified.'},
 {key:'faverolles-village',name:'Faverolles — source village setting',parent:'france',description:'Source cottage/lane and church-square bakery relationships, with intact grating. No modern village identification or surveyed street layout claimed.'},
]
export const lodgingRuralGatewayPlans=[
 {parent:'paris',target:'paris-lodging-details',location:'paris-lodgings',reason:'Documented editorial city atlas of separate source lodgings; no shared building entrance claimed.'},
 {parent:'france',target:'faverolles-village',location:'faverolles-setting',reason:'The source village needs a local plan, while modern geographical identification remains unestablished.'},
]
export const lodgingRuralEvidence=[{chapter:20,paragraphs:[1,5,7]},{chapter:177,paragraphs:[50]},{chapter:181,paragraphs:[3]},{chapter:196,paragraphs:[3,6]},{chapter:229,paragraphs:[0,5]},{chapter:276,paragraphs:[1,5]}]
