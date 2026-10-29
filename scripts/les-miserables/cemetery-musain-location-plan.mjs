export const civicPlaceRows=[
 ['vaugirard-cemetery','The old Vaugirard cemetery','The disused enclosure is planted like an old French garden, with straight alleys, box, thuya, holly, cypresses and long grass. This is the old cemetery, not the later Montparnasse cemetery.','paris'],
 ['vaugirard-cemetery-approach','The cemetery avenue','The approach outside the paired carriage and pedestrian gates. Its bearing and proportions are editorial.','vaugirard-cemetery'],
 ['vaugirard-cemetery-gate','The paired cemetery gates','Contiguous grated carriage and pedestrian gates adjoin the porter’s pavilion, whose window receives grave-diggers’ cards.','vaugirard-cemetery'],
 ['vaugirard-open-grave','The secluded burial corner','A corner of the old enclosure is reserved for the religious community. The particular grave is disclosed by its scene; the background does not paint a burial.','vaugirard-cemetery'],
 ['cafe-musain','The Café Musain','The little café on Rue Saint-Michel, near the Pantheon, has a remote back room reached through a long corridor. City placement is approximate.','paris'],
 ['cafe-musain-entrance','The café entrance','The public entrance from Rue Saint-Michel leads into the front café.','cafe-musain'],
 ['cafe-musain-back-room','The remote back room','The meeting hall has two windows, a Republican map, and an exit by a private stair onto Rue des Grès. Its geometry is reconstructed.','cafe-musain'],
]
export const civicMapDefinitions=[
 {key:'vaugirard-cemetery',name:'The old Vaugirard cemetery',parent:'paris',description:'Source-based garden enclosure and contiguous gated entrance. Plot positions and dimensions are editorial; no burial action is painted.'},
 {key:'cafe-musain',name:'The Café Musain',parent:'paris',description:'The extremely long corridor joins front café and remote two-window hall, whose private stair exits onto Rue des Grès. Geometry and relative street bearings are editorial.'},
]
export const civicGatewayPlans=[
 {parent:'paris',target:'vaugirard-cemetery',location:'vaugirard-cemetery',reason:'The paired gates and secluded burial corner need a legible local enclosure.'},
 {parent:'paris',target:'cafe-musain',location:'cafe-musain',reason:'The public entrance and remote meeting hall are distinct source spaces.'},
]
export const civicSourceEvidence=[{chapter:142,paragraphs:[2,3,4,5,38]},{chapter:176,paragraphs:[6,7,8]}]
