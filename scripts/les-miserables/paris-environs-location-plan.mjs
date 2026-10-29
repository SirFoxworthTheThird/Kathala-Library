export const environsPlaceRows=[
 ['paris-environs-region','The Paris environs','Villages, fields, gardens and wooded heights surround the capital, from Écouen in the north to Sceaux in the south and the Montfermeil plateau in the east.','france'],
 ['saint-cloud','Saint-Cloud','The town west of Paris stands beside the Seine near the royal park and its promenades.','paris-environs'],
 ['saint-cloud-park','The Saint-Cloud park','Flower beds, fountains, shaded walks and open ground fill the royal park. Its internal paths are represented schematically.','paris-environs'],
 ['saint-cloud-chestnut-walk','The chestnut walk','The park’s spreading chestnut boughs shade a walk among the holiday grounds. The exact path is unspecified.','paris-environs'],
 ['saint-cloud-kings-square','The King’s Square','The park’s King’s Square displays an exotic flowering shrub. The narrator does not retain its species name.','paris-environs'],
 ['issy-park-swing','The swing at Issy','A park at Issy has a swing among the outing’s pleasure grounds. The regional position identifies the town rather than a surveyed apparatus.','paris-environs'],
 ['sceaux-ball','The ball at Sceaux','The town south of Paris hosts a popular ball drawing visitors from the capital. The precise venue and its layout are not established.','paris-environs'],
 ['ecouen-school','The school at Écouen','The girls’ school at Écouen maintains ceremonial distinctions and processions. The regional position locates the town, without reconstructing school rooms.','paris-environs'],
 ['bicetre-courtyard','The Bicêtre courtyard','The prison complex south of Paris contains the courtyard whose north corner is described in the account of the convict gang. The regional marker represents the complex rather than an exact yard plan.','paris-environs'],
 ['chelles-abbey-inn-front','The inn at the old Chelles abbey','The carters’ inn occupies ancient buildings of the Royal Abbey, with space before it for a coach and resting horses. The precise frontage is not surveyed here.','paris-environs'],
 ['paris-outskirts','The outer Paris country','Market gardens, quarries, waste ground, old walls and the first scattered houses meet beyond the city’s barriers.','paris-environs'],
]
export const environsMapDefinitions=[
 {key:'paris-environs',name:'Paris and its environs',parent:'france',description:'An approximate regional illustration using official town-centre geography and pinned Natural Earth river courses. Settlements, roads, relief and source parcels are schematic, without modern town boundaries.'},
]
export const environsGatewayPlans=[
 {parent:'france',target:'paris-environs',location:'paris-environs-region',reason:'The capital and eastern village country sit within a common regional overview.'},
]
export const environsEvidence=[{chapter:20,paragraphs:[10]},{chapter:30,paragraphs:[1,4]},{chapter:31,paragraphs:[0,4,5]},{chapter:98,paragraphs:[22]},{chapter:122,paragraphs:[43]},{chapter:151,paragraphs:[1,3]},{chapter:201,paragraphs:[3]}]
