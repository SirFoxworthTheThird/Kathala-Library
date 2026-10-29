// Known town context is separate from unlocated, independently framed details.
export const southernPlaceRows=[
 ['digne-diocese','The southern pastoral country','Mountain districts, small towns and scattered parishes surround the episcopal town. The regional point represents a broad country, not a surveyed diocesan boundary.','france'],
 ['senez-gate','The gate at Senez','The bishop is received at the entrance to the old episcopal town. The marker represents the edge of the town symbol, not a documented gate plan.','southern-country'],
 ['ubaye-district','The Ubaye country','Ravines and mountain settlements lie in the Ubaye and Ubayette country around Jausiers and Barcelonnette. The point represents the district.','southern-country'],
 ['grasse','Grasse','The southern inland town stands among cultivated hills near the Mediterranean country, with businesses including orange-flower distilleries.','southern-country'],
 ['southern-localities','The southern localities','Mountain settlements, secluded valleys, open plains and rural workplaces appear in separate local details. Their unstated addresses and relative positions remain uncertain.','southern-country'],
 ['chastelar','Chastelar','The mountain village serves as a stopping place on the pastoral circuit. Its exact geography is not identified with the modern coastal Castellar.','southern-local-details'],
 ['chastelar-mountain-route','The mountain path','A difficult path leads away from the village toward a smaller mountain community. Its itinerary is schematic.','southern-local-details'],
 ['chastelar-priest-house','The priest’s house at Chastelar','The village priest’s modest dwelling provides a place to stop and rejoin travelling companions. Its layout and parcel are editorial.','southern-local-details'],
 ['mountain-presbytery','The mountain parish house','A poor mountain parish provides shelter and a small sacristy with worn vestments. Its exact site and interior arrangement are unspecified.','southern-local-details'],
 ['g-valley-path','The overgrown valley path','A grass-grown approach leads into a secluded turn of a wild valley, away from hamlets and roads.','southern-local-details'],
 ['g-hut-door','The secluded hut’s door','A small isolated dwelling stands beside a walnut tree and a field in the remote valley.','southern-local-details'],
 ['gervais-plain','The ruddy plain','An empty reddish plain has low bushes, scattered stones and paths; no village or church spire appears on its horizon. The exact site outside Digne is unknown.','southern-local-details'],
 ['gervais-plain-path','The path across the plain','A footpath passes a few paces from a bush in the deserted open ground.','southern-local-details'],
 ['gervais-three-paths','The three-path junction','Several paths meet in the open plain, beyond the earlier bush-side stopping place. Their angles are reconstructed.','southern-local-details'],
 ['grasse-distillery','The distillery frontage','An orange-flower distillery has an open working frontage where bales can be unloaded. Its precise address and building plan are not established.','southern-local-details'],
]
export const southernMapDefinitions=[
 {key:'southern-country',name:'The southern country',parent:'france',description:'Physical-coast context with approximate Digne, Senez, Ubaye and Grasse town symbols. Relief, roads and town footprints are qualitative editorial reconstruction, not a measured terrain survey or diocesan boundary.'},
 {key:'southern-local-details',name:'Southern local settings',parent:'southern-country',description:'Independent overhead source details: Chastelar, the mountain parish, secluded valley, ruddy plain and distillery. Panels do not imply physical adjacency or exact geographical addresses.'},
]
export const southernGatewayPlans=[
 {parent:'france',target:'southern-country',location:'digne-diocese',reason:'The southern regional context distinguishes identifiable towns from unlocated story settings.'},
 {parent:'southern-country',target:'southern-local-details',location:'southern-localities',reason:'A general locality overview leads to separate details whose exact addresses are unstated.'},
]
export const southernSourceEvidence=[
 {chapter:3,paragraphs:[0,1,2,3]}, {chapter:7,paragraphs:[1,2,11,24,25,32]},
 {chapter:10,paragraphs:[4,10,11,14]}, {chapter:23,paragraphs:[2,3]},
 {chapter:27,paragraphs:[0,2,50,66]},
]
