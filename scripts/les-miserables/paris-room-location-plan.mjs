// Independent source rooms; the atlas entrances denote Paris as a whole.
// They are not claims that unrelated properties have one address or doorway.
export const parisRoomPlaceRows=[
 ['paris-private-rooms','Parisian rooms and gathering places','Rented chambers, a poor garret, a genteel salon and a smoky taproom form separate settings across Paris.','paris'],
 ['paris-public-rooms','Parisian reception rooms and library','Clerical households receive visitors, while the law-school library supplies students with books and newspapers. These properties have separate addresses.','paris'],
 ['fantine-paris-room','The rented room','The room to which Fantine returns after the outing. The passage specifies neither its furnishings nor its address; the simple furniture and room outline are editorial.','paris-room-details'],
 ['gribier-garret-87-vaugirard','The garret at 87 Rue Vaugirard','The topmost attic is sparsely furnished and cluttered: a packing-case, butter-pot, straw mattress, carpet fragment and displaced rags.','paris-room-details'],
 ['madame-t-salon','Madame de T.’s salon','The proud but impoverished household in Rue Férou receives a small Royalist circle around the hearth and tea table. Exact furnishing placement is editorial.','paris-room-details'],
 ['paris-taproom','The smoky taproom','A smoky drinking room entered from the street. The source leaves the property unnamed; tables, counter and room geometry are editorial.','paris-room-details'],
 ['fesch-antechamber','The cardinal’s anteroom','A waiting room at Cardinal Fesch’s Paris residence about the time of the coronation. Its precise address, furnishing and geometry remain unspecified in the passage.','paris-public-room-details'],
 ['paris-prelate-house','The prelate’s reception room','A wealthy ecclesiastical household with conspicuous clocks, carpets and liveries. The plan represents the described luxury without identifying an unstated address.','paris-public-room-details'],
 ['paris-law-school-library','The law-school library','The library provides files of the Moniteur and other historical reading. The shelves, table arrangement and room outline are editorial.','paris-public-room-details'],
]
export const parisRoomMapDefinitions=[
 {key:'paris-room-details',name:'Paris — separate rooms and gathering places',parent:'paris',description:'Four independent source settings, with unstated room dimensions and furniture editorial. No common building, relative addresses or apartment floors asserted.'},
 {key:'paris-public-room-details',name:'Paris — reception rooms and library',parent:'paris',description:'Independent cardinal anteroom, wealthy prelate room and law-school library. Unknown floor levels and addresses are not inferred from the panel arrangement.'},
]
export const parisRoomGatewayPlans=[
 {parent:'paris',target:'paris-room-details',location:'paris-private-rooms',reason:'Editorial city atlas of independent source settings, not a shared physical entrance.'},
 {parent:'paris',target:'paris-public-room-details',location:'paris-public-rooms',reason:'Editorial city atlas of separate reception and scholarly spaces; no single property claimed.'},
]
export const parisRoomEvidence=[{chapter:1,paragraphs:[4]},{chapter:11,paragraphs:[5]},{chapter:29,paragraphs:[17,20]},{chapter:36,paragraphs:[41]},{chapter:144,paragraphs:[126,129]},{chapter:168,paragraphs:[1,2]},{chapter:173,paragraphs:[1,2]}]
