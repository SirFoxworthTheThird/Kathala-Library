export const furtherSettingPlaceRows=[
 ['paris-carriages','The Paris carriages','Public coaches carry passengers through the city, while open wagons join the carnival procession. These are moving vehicles with separate compartments.','paris'],
 ['seine-right-bank-coach','The hired coach','A public carriage has a passenger compartment and an external coachman’s box. The compartment travels between the riverbank and city addresses; its furnishing is editorial.','paris-carriage-details'],
 ['seine-right-bank-reunion-coach','The later hired carriage','A separate carriage carries passengers urgently across Paris. Its exact design is unspecified and is not identified with the earlier coach.','paris-carriage-details'],
 ['carnival-cart','The carnival wagon','The open vehicle carries masqueraders along the boulevards, with its front exposed to the rain. The plain wagon’s proportions are editorial.','paris-carriage-details'],
 ['villers-abbey','The abbey of Villers','The narrator places the abbey eight leagues from Brussels, beside the Thil. This regional position is approximate and does not identify surveyed archaeological structures.','france'],
 ['villers-abbey-dungeons','The riverbank dungeons','The narrator describes four stone chambers beside the river, with vaulted roofs, iron-door remains, high grated openings and soaked ground. The drawing follows his account rather than a modern archaeological survey.','villers-source-details'],
 ['digne-civic-setting','The prison-to-scaffold setting','The town has a prison and a place of execution, but the account does not establish the intervening streets or a precise scaffold site.','digne'],
 ['digne-execution-route','The route from the prison','The unspecified town streets along which the prisoner is taken from his cell. The local street detail is schematic, not an asserted complete itinerary.','digne-civic-details'],
 ['digne-scaffold','The scaffold','An execution platform with steps and the guillotine apparatus. Its dimensions and position in the town are unspecified.','digne-civic-details'],
]
export const furtherSettingMapDefinitions=[
 {key:'paris-carriage-details',name:'Paris — mobile carriage compartments',parent:'paris',description:'Separate editorial compartment plans of two hired coaches and an open carnival wagon. These are mobile spaces, not fixed street addresses or one shared vehicle.'},
 {key:'villers-source-details',name:'Villers — the narrator’s dungeon account',parent:'france',description:'Local riverbank plan and separate section following the narrator’s architectural description. No modern archaeological verification or measured site geometry claimed.'},
 {key:'digne-civic-details',name:'Digne — route and scaffold details',parent:'digne',description:'Separate schematic street and platform details. No complete itinerary, relative bearings or exact town position asserted.'},
]
export const furtherSettingGatewayPlans=[
 {parent:'paris',target:'paris-carriage-details',location:'paris-carriages',reason:'Editorial city atlas for mobile settings; no fixed common physical doorway.'},
 {parent:'france',target:'villers-source-details',location:'villers-abbey',reason:'Regional context includes the Belgian settings; local detail follows the narrator, not a surveyed surviving site.'},
 {parent:'digne',target:'digne-civic-details',location:'digne-civic-setting',reason:'Source civic spaces have no stated exact town location; isolated details avoid an invented itinerary.'},
]
export const furtherSettingEvidence=[{chapter:4,paragraphs:[23,24,25]},{chapter:131,paragraphs:[6]},{chapter:337,paragraphs:[39,40,41]},{chapter:338,paragraphs:[0,1,27]},{chapter:350,paragraphs:[28,29,41,42]},{chapter:363,paragraphs:[207,208,209]}]
