export const institutionPlaceRows=[
 ['bastille-elephant','The Bastille elephant','The decaying timber, masonry and plaster model stands in the southwestern corner of the Bastille square, near the canal basin, inside a rotten palisade.','paris'],
 ['bastille-elephant-enclosure','The model’s enclosure','Uneven ground and weeds lie within the worn wooden fence around the abandoned model. Its outline is reconstructed.','bastille-elephant-exterior'],
 ['bastille-elephant-entrance','The foreleg approach','The underbelly breach is reached beside a foreleg after passing a gap in the palisade. The temporary ladder is not part of the permanent background.','bastille-elephant-exterior'],
 ['bastille-elephant-interior','The hollow belly','Wooden ribs and a long beam frame a rubble floor. A straw mat and grey blanket lie behind brass mesh supported on three poles and weighted with stones.','bastille-elephant-interior'],
 ['la-force','La Force','The old prison complex in the Marais contains several courtyards and the decrepit structure called the New Building. The city-scale parcel is approximate.','paris'],
 ['la-force-charlemagne-yard','The Charlemagne courtyard','An enclosed prison court provides the setting for contact between inmates. Its exact outline and links to neighboring yards are not reconstructed.','la-force-details'],
 ['la-force-new-building','The lower New Building dormitory','The lower shared dormitory has wooden protective sheathing and a large flattened chimney-flue pillar. The building has four stacked dormitories beneath the top storey.','la-force-details'],
 ['la-force-fine-air','The Fine-Air','The top-storey hall contains the watched prisoner’s barred cage, a roof skylight and an opposite dormer. Its exact dimensions are editorial.','la-force-details'],
]
export const institutionMapDefinitions=[
 {key:'bastille-elephant-exterior',name:'The Bastille elephant — enclosure',parent:'paris',levelGroup:'bastille-elephant',levelIndex:0,levelLabel:'Enclosure',description:'The weathered model and rotten palisade. The breach is under the belly; exterior and interior share head-right orientation. No temporary ladder or action is painted.'},
 {key:'bastille-elephant-interior',name:'The Bastille elephant — interior',parent:'paris',levelGroup:'bastille-elephant',levelIndex:1,levelLabel:'Belly interior',description:'Upper hollow-body cutaway with one underbelly entry and a weighted brass-mesh sleeping alcove. Arrangement and dimensions are reconstructed.'},
 {key:'la-force-details',name:'La Force — source details',parent:'paris',description:'Separate courtyard, lower-dormitory and top-storey details. No unknown connections, intermediate floor plans or temporary escape infrastructure are invented.'},
]
export const institutionGatewayPlans=[
 {parent:'paris',target:'bastille-elephant-exterior',location:'bastille-elephant',sharedFloorGroup:'bastille-elephant',reason:'Enclosure and elevated belly interior share the same monument entrance and selectable levels.'},
 {parent:'paris',target:'la-force-details',location:'la-force',reason:'The court, lower dormitory and top-storey cage need distinct source-focused detail panels.'},
]
export const institutionSourceEvidence=[
 {chapter:250,paragraphs:[182,183,184,187,192,193,200,217,222,223,235,236,237,238,239]},
 {chapter:230,paragraphs:[7]}, {chapter:251,paragraphs:[4,5,6,7,17,24,26,28]},
]
