// Salon/drawing-room and the two house names are normalized in the source ledger.
// The recovery chamber is not silently assigned to the grandfather's bedroom.
export const gillenormandPlaceRows=[
 ['gillenormand-house','The Gillenormand house','An old house in Rue des Filles-du-Calvaire in the Marais has a large first-floor apartment between street and gardens. Its historical number is not a claim about the rebuilt modern property.','paris'],
 ['gillenormand-bedroom','The grandfather’s chamber','A first-floor bedroom has rich tapestries and a large Coromandel screen around the bed. It adjoins the drawing-room and has a corner window with steps down to the garden.','gillenormand-details'],
 ['gillenormand-bedroom-window','The chamber’s street window','A window of the first-floor chamber overlooks the street. It is distinct from the corner’s garden access.','gillenormand-details'],
 ['gillenormand-bedroom-anteroom','The first-floor antechamber','An old sofa stands in the first-floor outer room. Its exact arrangement beside the private chambers is not reconstructed.','gillenormand-details'],
 ['gillenormand-drawing-room','The drawing-room','The first-floor reception room adjoins the grandfather’s bedchamber and contains old upholstered furniture and a sofa.','gillenormand-details'],
 ['gillenormand-dining-room','The dining-room','Long street-facing windows light the room with its table and Venetian chandelier. The precise floor and connection to other rooms are unspecified.','gillenormand-details'],
 ['gillenormand-elder-daughter-room','The elder daughter’s room','The daughter has her own chamber within the house; its floor and adjoining rooms are not established.','gillenormand-details'],
 ['gillenormand-garden','The house garden','A garden below the first-floor apartment can be reached by a short external stair at the corner window. Its complete grounds are not surveyed.','gillenormand-details'],
 ['gillenormand-house-entrance','The house entrance','The street threshold gives access to the house and the staircase leading to the first-floor apartment.','gillenormand-details'],
 ['gillenormand-lower-waiting-room','The lower waiting-room','A small low vaulted ground-floor room has red-square tiles, a grated street window, a hearth and empty bottles. It is separate from the upstairs reception rooms.','gillenormand-details'],
 ['gillenormand-study','Marius’s study','The household’s study provides a private place for Marius’s legal work and interviews. It is not automatically identified with the grandfather’s adjoining library.','gillenormand-details'],
 ['marius-gillenormand-attic','The former attic chamber','The small upper room near the roof has a table beside an open window. No exact numbered floor is established.','gillenormand-details'],
 ['marius-recovery-room','The recovery chamber','A chamber in the house contains the bed used during recovery. Its exact position and identity with any earlier room are not established.','gillenormand-details'],
]
export const gillenormandMapDefinitions=[
 {key:'gillenormand-details',name:'The Gillenormand house — details',parent:'paris',description:'Separate source-described room and garden details. Only the first-floor bedroom/drawing-room connection is joined; unknown floors and adjacencies remain separate.'},
]
export const gillenormandGatewayPlans=[
 {parent:'paris',target:'gillenormand-details',location:'gillenormand-house',reason:'Source-described first-floor, ground-floor and separate unlocated household spaces.'},
]
export const gillenormandSourceEvidence=[
 {chapter:161,paragraphs:[0]}, {chapter:173,paragraphs:[16]},
 {chapter:174,paragraphs:[2]}, {chapter:175,paragraphs:[3,4,7,30]},
 {chapter:262,paragraphs:[5,121]}, {chapter:338,paragraphs:[25]},
 {chapter:340,paragraphs:[0,1,6,9]}, {chapter:344,paragraphs:[1,28]},
 {chapter:351,paragraphs:[21,23,31]}, {chapter:352,paragraphs:[2]},
 {chapter:356,paragraphs:[6,7,10]}, {chapter:363,paragraphs:[0,1]},
]
