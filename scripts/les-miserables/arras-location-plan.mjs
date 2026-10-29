// The provisional court occupies the former episcopal palace, not the courthouse.
export const arrasPlaceRows=[
 ['arras-hotel-poste','Hôtel de la Poste','An inn entered through a porte-cochère, with stabling and a ground-floor billiard room.','arras-town'],
 ['arras-posting-office','The posting station','The posting establishment is at the Hôtel de la Poste itself, serving the mail and hired horses.','arras-town'],
 ['arras-prefecture-square','The prefecture square','The open square faces the former bishop’s palace, whose illuminated windows overlook it.','arras-town'],
 ['arras-prefecture','The prefecture','The former episcopal palace houses the court temporarily while the courthouse undergoes repairs. A grand staircase leads inside.','arras-town'],
 ['arras-assize-hall','The temporary courtroom','The old hall has spotted woodwork, smoky lamps and serge-covered tables. The accused’s bench stands beside a small door on the president’s left.','arras-court'],
 ['arras-council-chamber','The council chamber','A severe panelled room contains a green-covered table and two wax candles. Its door opens behind the president’s chair in the courtroom.','arras-court'],
 ['arras-court-antechamber','The public antechamber','A spacious old palace hall lit by a single lamp is separated from the courtroom by a double-leaved door.','arras-court'],
 ['arras-court-corridor','The inner corridor','A long narrow passage turns through angles, steps and gratings on the approach to the council chamber.','arras-court'],
 ['arras-private-conference-room','The private conference room','A private room provides a place for the magistrates’ conference. Its position within the palace is not established.','arras-court'],
]
export const arrasMapDefinitions=[
 {key:'arras-town',name:'Arras',parent:'france',description:'The inn and posting station, Crinchon and prefecture square. Street geometry and property positions are schematic, with no measured scale or compass orientation.'},
 {key:'arras-court',name:'Arras — the temporary court',parent:'arras-town',description:'Source-described room connections in the former episcopal palace. Dimensions are editorial; the private conference room remains a separate detail of unspecified location.'},
]
export const arrasGatewayPlans=[
 {parent:'france',target:'arras-town',location:'arras',reason:'Town-scale arrival and court approach.'},
 {parent:'arras-town',target:'arras-court',location:'arras-prefecture',reason:'The temporary court is within the prefecture, formerly the episcopal palace.'},
]
export const arrasSourceEvidence=[
 {chapter:61,paragraphs:[0,9,11,13,15,17,20,24,25,27]},
 {chapter:62,paragraphs:[1,6,11]},
 {chapter:63,paragraphs:[2,3]},
 {chapter:68,paragraphs:[4]},
]
