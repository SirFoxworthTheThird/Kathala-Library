export const parisHomesPlaceRows=[
 ['rue-plumet-house','The Rue Plumet house','A secluded stone pavilion and walled garden stand near the Boulevard des Invalides. The city-scale site is schematic rather than a verified cadastral parcel.','paris'],
 ['rue-plumet-gate','The Rue Plumet frontage','The house’s tall garden gate faces the quiet street. This city-scale point represents the visible frontage before the private arrangements are described.','paris'],
 ['rue-plumet-boulevard-invalides-corner','The Invalides boulevard corner','The Rue Plumet approach turns from the Boulevard des Invalides into the quieter side street. Its exact city-scale plotted corner is approximate.','paris'],
 ['rue-babylone-secret-door','The Rue de Babylone door','An inconspicuous door at the solitary end of the street connects to a long winding open-air corridor. Its exact route and address are not reconstructed.','paris'],
 ['rue-plumet-street','Rue Plumet','A quiet street passes the high wall and iron frontage of the secluded garden property.','plumet-house'],
 ['rue-plumet-street-corner','The nearby street corner','The quiet street continues beyond the garden frontage. The local view does not reconstruct the whole route to the boulevard.','plumet-house'],
 ['rue-plumet-garden','The overgrown garden','Unruly trees, weeds, tangled branches and grass fill the walled enclosure, with decayed trellises, weathered statues and a stone bench.','plumet-house'],
 ['rue-plumet-garden-bench','The stone bench','A stone seat stands in a corner of the neglected garden, screened by vegetation.','plumet-house'],
 ['rue-plumet-garden-gate','The garden gate','The tall iron gate opens from the street into the enclosure. Its physical bars and lock are part of the frontage, not an open public entrance.','plumet-house'],
 ['rue-plumet-garden-steps','The pavilion steps','The old front steps descend from the stone pavilion into the garden.','plumet-house'],
 ['rue-plumet-pavilion','The pavilion','The small old stone house has a ground floor and an upper floor beneath its Mansard roof, with old-fashioned furnishings inside.','plumet-house'],
 ['rue-plumet-rear-lodge','The rear lodge','A low two-room building stands beyond the narrow paved back courtyard. Its rear door gives access to the concealed open-air corridor, whose winding course is not surveyed.','plumet-house'],
 ['rue-plumet-cosette-room','The upper chamber','The large upper sleeping chamber has old damask hangings, mirrors, a Persian rug and a collection of lighter furnishings. Its orientation within the pavilion is unspecified.','plumet-house'],
 ['homme-arme-house','The Rue de l’Homme Armé house','An old house in the Marais contains lodgings overlooking a back court. Its exact parcel is represented schematically on the city overview.','paris'],
 ['homme-arme-apartment','The second-floor apartment','Two bedrooms are separated by a dining room that also serves as an antechamber; a kitchen adjoins that central room.','homme-arme-rooms'],
 ['homme-arme-dining-room','The dining room','The central room has an old round table, a long sideboard with a slanting mirror, a worn armchair and plain chairs.','homme-arme-rooms'],
 ['homme-arme-cosette-room','The back-court bedroom','A narrow neat room has a long east-facing sash-window overlooking the enclosed rear court and neighboring gardens.','homme-arme-rooms'],
 ['homme-arme-cosette-room-window','The east-facing window','The bedroom window faces the back court; the surrounding walls prevent a view of the street.','homme-arme-rooms'],
 ['homme-arme-valjean-room','The other bedroom','The second sleeping room lies on the other side of the central dining room from the back-court bedroom.','homme-arme-rooms'],
 ['homme-arme-doorstep','The house threshold','The doorway opens from the short street into the old house.','homme-arme-rooms'],
 ['homme-arme-street-entrance','The street entrance','A modest entry and vestibule lead into the house; the complete route through the building is not established.','homme-arme-rooms'],
 ['homme-arme-stair-landing','The first-floor landing','An open sash-window on the first-floor landing overlooks the street and receives light from the street-lantern opposite.','homme-arme-rooms'],
]
export const parisHomesMapDefinitions=[
 {key:'plumet-house',name:'The Rue Plumet house',parent:'paris',description:'The overgrown garden, pavilion, back court and lodge, with an isolated upper-room detail. Geometry and room orientation are editorial; the hidden corridor’s winding course is not painted.'},
 {key:'homme-arme-rooms',name:'Rue de l’Homme Armé — lodgings',parent:'paris',description:'The second-floor apartment and separate entrance/landing/garret details. The dining room and antechamber are one space; no later furniture relocation is painted into the background.'},
]
export const parisHomesGatewayPlans=[
 {parent:'paris',target:'plumet-house',location:'rue-plumet-house',reason:'Garden property and source-described household detail.'},
 {parent:'paris',target:'homme-arme-rooms',location:'homme-arme-house',reason:'The back-court lodgings have established room and floor relations.'},
]
export const parisHomesSourceEvidence=[
 {chapter:230,paragraphs:[25]},
 {chapter:233,paragraphs:[0,1,2,3,6]},
 {chapter:234,paragraphs:[1]},
 {chapter:235,paragraphs:[1,2,3]},
 {chapter:258,paragraphs:[24]},
 {chapter:295,paragraphs:[9,12]},
 {chapter:308,paragraphs:[1,13,17]},
 {chapter:339,paragraphs:[14,15,16]},
 {chapter:362,paragraphs:[1]},
]
