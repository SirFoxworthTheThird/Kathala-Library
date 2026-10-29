export const meadowCemeteryPlaceRows=[
 ['larks-meadow-approach','The Glacière meadow district','The southern boulevard approaches the Glacière and the little river of the Gobelins, among market gardens and laundry grounds. The city point identifies the district, not a surveyed meadow boundary.','paris'],
 ['larks-meadow','The Lark’s meadow','A green laundry meadow lies beside the little river, near an old market-gardener’s house with a great dormered roof, dilapidated palisades and poplars.','larks-meadow'],
 ['larks-meadow-departure','The path from the meadow','The footpath leads away from the grassy riverbank. The first steps are represented locally; the subsequent walk through Paris is not a fixed point here.','larks-meadow'],
 ['pere-lachaise-cemetery','Père-Lachaise','The eastern cemetery contains elaborate monuments as well as neglected burial ground beside old walls. The exact location of the source’s nameless stone is not established.','paris'],
 ['pere-lachaise-valjean-grave','The nameless stone','A plain narrow stone lies off the paths, beside an old wall beneath a great yew, amid moss, convolvulus, dandelions and high wet grass.','pere-lachaise-corner'],
]
export const meadowCemeteryMapDefinitions=[
 {key:'larks-meadow',name:'The Lark’s meadow',parent:'paris',description:'Source meadow, laundry lines, local river reach and parapet; exact bearings, lengths and property boundaries editorial.'},
 {key:'pere-lachaise-corner',name:'Père-Lachaise — a neglected corner',parent:'paris',description:'Source wall, yew and plain stone, with no surveyed surviving grave identification. The stone has no painted name or legible verse.'},
]
export const meadowCemeteryGatewayPlans=[
 {parent:'paris',target:'larks-meadow',location:'larks-meadow-approach',reason:'Source meadow and local riverbank require a legible detail; city position approximate.'},
 {parent:'paris',target:'pere-lachaise-corner',location:'pere-lachaise-cemetery',reason:'Cemetery district gives access to the source corner without claiming an exact real grave.'},
]
export const meadowCemeteryEvidence=[{chapter:229,paragraphs:[24,25,26]},{chapter:232,paragraphs:[4,5,66,67]},{chapter:365,paragraphs:[0,1,2,3]}]
