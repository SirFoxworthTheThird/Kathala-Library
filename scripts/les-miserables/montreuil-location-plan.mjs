// Source-grounded arrangements. Except for the stated square/station relation,
// lower-town factory, and cashier directly below the bedroom, positions are
// editorial. Separate detail panels must not become an invented whole floor.
export const montreuilPlaceRows=[
  ['madeleine-factory','Madeleine’s factory','The lower-town manufacturing establishment has separate large workrooms for men and women, a household, a courtyard and an infirmary.','montreuil-town'],
  ['montreuil-townhall','The town-hall','The municipal building contains the mayor’s public offices and stands among the town’s civic buildings.','montreuil-town'],
  ['montreuil-square','The town square','An open public space bordered by businesses, with the police station at one end.','montreuil-town'],
  ['montreuil-police-station','The police station','A low room heated by a stove has a glazed, grated street door and a guard detachment; it stands at the end of the square.','montreuil-town'],
  ['montreuil-officers-cafe-front','Outside the officers’ café','The street frontage of the café frequented by the garrison officers, close to the public square.','montreuil-town'],
  ['montreuil-unpaved-alley','The unpaved alley','A narrow unpaved way through the town, with space for carts between the houses. Its particular street is not identified.','montreuil-town'],
  ['montreuil-barber-shop','The barber’s shop','A modest town shop with its own street entrance. The narrative does not establish its exact address.','montreuil-town'],
  ['montreuil-parsonage-door','The parsonage door','The priest’s house stands on a little-frequented street along the shortest way to the horse-hire establishment; its door has an iron knocker.','montreuil-town'],
  ['scaufflaire-hire-yard','Scaufflaire’s establishment','At the edge of town, the horse-hire keeper supplies horses, harness and cabriolets for road journeys.','montreuil-town'],
  ['montreuil-post-office','The post-office','The town’s postal establishment handles letters and the passage of the mail. Its location is shown schematically.','montreuil-town'],
  ['montreuil-city-prison','The town prison','The local place of confinement belongs to the town’s official institutions; its precise site is not given.','montreuil-town'],
  ['montreuil-cemetery','The cemetery','A burial ground serving the town, with a common grave. Its plotted position is an editorial reconstruction.','montreuil-town'],
  ['montreuil-countryside','The fields outside town','Cultivated ground and country paths extend beyond the built-up upper and lower town.','montreuil-town'],
  ['montreuil-hesdin-road','The road toward Hesdin','The outward road leads from the town toward Hesdin and the successive road stages farther inland.','montreuil-town'],
  ['montreuil-paris-road','The outward road toward Paris','A road through the surrounding country leads away from the town toward Paris; no exact itinerary is asserted on the local map.','montreuil-town'],
  ['javert-montreuil-lodging','Javert’s lodging','The inspector’s town lodging is distinct from the police station. The narrative does not identify its street.','montreuil-town'],
  ['montreuil-lodging-quarter','The rented dwellings','Small rented rooms and roof lodgings stand among the town’s poorer houses. The separate room details do not establish one address.','montreuil-town'],
  ['madeleine-women-workroom','The women’s workroom','The large workshop is kept separate from the men’s room in the same manufacturing establishment.','madeleine-premises'],
  ['madeleine-factory-lodge','The portress’s lodge','The portress’s room serves the factory household beside the courtyard and entrance. Keys and the evening candlestick are kept here.','madeleine-premises'],
  ['madeleine-study','Madeleine’s study','A private working room in which the mayor attends to public and business papers. Its floor and position relative to the bedroom are not specified.','madeleine-premises'],
  ['madeleine-bedroom','Madeleine’s chamber','The simply furnished private chamber has a fireplace, a writing table, a cupboard and a window visible from the street.','madeleine-premises'],
  ['madeleine-bedroom-door','The chamber threshold','The private chamber’s door opens at the top of the stair used to reach it.','madeleine-premises'],
  ['madeleine-cashier-room','The cashier’s room','The cashier sleeps in a room directly below Madeleine’s chamber, where footsteps overhead can be heard.','madeleine-premises'],
  ['montreuil-factory-infirmary','The factory infirmary','The workers’ infirmary is within the factory household and served by two sisters of charity. It is distinct from the town hospital.','madeleine-premises'],
  ['montreuil-infirmary-antechamber','The infirmary antechamber','The room outside the sickroom is reached by stairs and provides a space for private exchanges before entering the ward.','madeleine-premises'],
  ['montreuil-infirmary-laboratory','The infirmary laboratory','A small preparation room holds drugs, phials and drawers used by the nurses and doctor. Its exact position relative to the ward is not stated.','madeleine-premises'],
  ['fantine-montreuil-room','The rented second-floor room','A small hired room furnished on credit provides a place for work and sleep. Its relationship to the later roof lodging is not established.','fantine-rented-rooms'],
  ['fantine-montreuil-attic','The roof lodging','A cramped attic has sloping ends that force its occupant to stoop and a door secured only by a latch.','fantine-rented-rooms'],
]

export const montreuilMapDefinitions=[
  {key:'montreuil-town',name:'Montreuil-sur-Mer',parent:'france',description:'The upper town, lower-town manufacturing quarter and surrounding roads. Relief is qualitative; fictional sites and street positions are schematic.'},
  {key:'madeleine-premises',name:'Madeleine’s premises',parent:'montreuil-town',description:'Separate source-described details of the workshops, household and infirmary. The cashier is below the chamber; other panel relationships and floor numbers are not known.'},
  {key:'fantine-rented-rooms',name:'The rented rooms',parent:'montreuil-town',description:'The earlier second-floor room and the later attic are shown separately. No shared address, room adjacency or complete lodging-house plan is inferred.'},
]
export const montreuilGatewayPlans=[
  {parent:'france',target:'montreuil-town',location:'montreuil-sur-mer',reason:'The lower-town factory, public square and outward roads require a town-scale layer.'},
  {parent:'montreuil-town',target:'madeleine-premises',location:'madeleine-factory',reason:'Separate working, private and nursing spaces clarify where people are without inventing a single floor plan.'},
  {parent:'montreuil-town',target:'fantine-rented-rooms',location:'montreuil-lodging-quarter',reason:'The two successive rented rooms differ in floor, shape and conditions, but their exact addresses are unknown.'},
]

export const montreuilSourceEvidence=[
  {chapter:41,paragraphs:[1,4],facts:['Two separate large workrooms','Madeleine lives in the lower town','Public hospital beds are not the factory infirmary']},
  {chapter:42,paragraphs:[10],facts:['Simply furnished chamber with fireplace; no skull-filled cell']},
  {chapter:45,paragraphs:[0],facts:['Unpaved alley; no street name']},
  {chapter:46,paragraphs:[0,3],facts:['Infirmary in factory building','Women’s workroom']},
  {chapter:47,paragraphs:[0],facts:['Small rented room furnished on credit']},
  {chapter:49,paragraphs:[58],facts:['Earlier second-floor cell and later attic','Sloping roof and latch; exact relation between addresses unknown']},
  {chapter:51,paragraphs:[6,8],facts:['Officers’ café frontage near public encounter']},
  {chapter:52,paragraphs:[0,1],facts:['Station at end of square','Low room, stove, glazed and grated street door']},
  {chapter:53,paragraphs:[0],facts:['Infirmary in Madeleine’s house']},
  {chapter:54,paragraphs:[0],facts:['Study used for mayoral business; no floor given']},
  {chapter:56,paragraphs:[0,1,69,71],facts:['Horse hire at edge of town','Parsonage on shortest route','Portress’s lodge','Cashier directly below chamber']},
  {chapter:66,paragraphs:[0],facts:['Laboratory prepares medicines; exact ward adjacency unknown']},
  {chapter:68,paragraphs:[1,9,12],facts:['Post-office before infirmary visit','Antechamber reached by stairs','Courtyard below']},
  {chapter:70,paragraphs:[7,8,21,22,23,66],facts:['Gate, courtyard and lodge','Unexplained entry is not a painted secret route','Chamber at top of stair; window visible from street','Outward Paris road']},
]
