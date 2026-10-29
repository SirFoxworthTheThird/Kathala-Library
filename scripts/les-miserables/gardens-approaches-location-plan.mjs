export const gardenApproachPlaceRows=[
 ['luxembourg-pepiniere-alley','The Pépinière walk','A long, secluded walk skirts the nursery parapet. Its Rue de l’Ouest end has a solitary bench. Exact length and placement within the garden are editorial.','luxembourg-details'],
 ['luxembourg-pepiniere-bench','The solitary bench','The bench stands near the Rue de l’Ouest end of the walk. No portable object or visitor is painted into the background.','luxembourg-details'],
 ['luxembourg-grand-basin','The grand basin','The large ornamental pool has a swans’ hutch beside its bank. Its position relative to the separate walk panel is not asserted.','luxembourg-details'],
 ['picpus-street-approaches','The Petit-Picpus street approaches','The sparse streets between the Faubourg Saint-Antoine and La Râpée form the source’s Y and transverse lane. This city locator is approximate.','paris'],
 ['chemin-vert-saint-antoine-entrance','Rue du Chemin-Vert-Saint-Antoine','The approach forks into Rue Petit-Picpus on the left and Rue Polonceau on the right.','picpus-approaches'],
 ['cul-de-sac-genrot','The Genrot blind alley','The short continuation beyond the Polonceau junction ends at a high white wall among sheds and barns.','picpus-approaches'],
 ['cul-de-sac-genrot-lantern','The blind-alley lantern','The oil street lantern has a pulley and a metal case protecting its lowering rope. The permanent apparatus is shown intact.','picpus-approaches'],
 ['droit-mur-wall-recess','The recessed wall niche','At the Polonceau corner, two projecting angles conceal a deep setback with rough iron-strapped planks and a smaller carriage gate. A linden rises behind it.','picpus-approaches'],
 ['paris-pursuit-route','The Petit-Picpus approach network','A retrospective overview of the streets by which the pursuit reaches the Y and Droit-Mur lane. This point summarizes that neighborhood, not every earlier step through Paris.','picpus-approaches'],
]
export const gardenApproachMapDefinitions=[
 {key:'luxembourg-details',name:'The Luxembourg — source details',parent:'paris',description:'Independent Pépinière walk and grand-basin panels. No unstated relative bearings, distance or connecting path asserted.'},
 {key:'picpus-approaches',name:'Petit-Picpus — street approaches',parent:'paris',description:'The narrated Y and crossbar, Genrot blind end, permanent lantern and recessed plank gateway. Street lengths and bearings editorial; no action painted.'},
]
export const gardenApproachGatewayPlans=[
 {parent:'paris',target:'luxembourg-details',location:'luxembourg-gardens',reason:'The secluded walk and basin are distinct source spaces within the gardens.'},
 {parent:'paris',target:'picpus-approaches',location:'picpus-street-approaches',reason:'The source Y junction and blind alley require an independent legible street plan.'},
]
export const gardenApproachEvidence=[{chapter:111,paragraphs:[0,1,8,9,11,12,16,18,19]},{chapter:112,paragraphs:[0,1,3,4]},{chapter:113,paragraphs:[7,8,9,13,14]},{chapter:188,paragraphs:[7,12]},{chapter:194,paragraphs:[4]},{chapter:314,paragraphs:[19,22,29]}]
