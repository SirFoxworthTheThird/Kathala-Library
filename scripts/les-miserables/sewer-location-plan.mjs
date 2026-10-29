// Only the narrated underground sequence is reconstructed. No city-wide survey.
export const sewerPlaceRows=[
 ['paris-sewer-network','The right-bank drainage network','Underground galleries drain the right bank through branches and the broad collecting sewer. The city point is a general entrance to the underground plan, not a claimed surface manhole.','paris'],
 ['seine-right-bank-beyond-invalides','The right bank beyond the Invalides bridge','The relatively solitary bank faces the Gros-Caillou quarter between the Invalides and Jéna approaches. The city-scale position is approximate.','paris'],
 ['chanvrerie-subterranean-corridor','The narrow entry branch','A blind branch with a closed rear wall receives light through the opening above; ahead it joins the wider subterranean gallery.','paris-sewers'],
 ['montmartre-sewer','The Montmartre gallery','The gallery rises to a watershed crest and then descends toward the broad collector. The map compresses its length without asserting surveyed bearings.','paris-sewers'],
 ['montmartre-service-crossroads','The service crossing','A small widened underground crossing provides room to gather and collects rainwater during storms. Its branch courses are unspecified.','paris-sewers'],
 ['grand-sewer-junction','The collector junction','The Montmartre, Provence and Abattoir galleries meet the much broader Grand Sewer at a subterranean junction.','paris-sewers'],
 ['grand-sewer','The Grand Sewer','The broad collecting gallery has a paved walking margin and a central flow, with smaller side branches joining it.','paris-sewers'],
 ['grand-sewer-airhole-rest','The airhole and banquette','An airhole, probably that in Rue d’Anjou, admits daylight near a dry walking ledge beyond the probable Madeleine branch. The street identification remains tentative.','paris-sewers'],
 ['grand-sewer-fontis','The submerged damaged reach','Water covers the unstable bed where paving has given way into mud. Its depth and hidden structure are not painted as advance warning on the background.','paris-sewers'],
 ['grand-sewer-fontis-far-side','The firm far side','Beyond the submerged mud, a bent but solid remnant of paving provides an inclined footing back onto firm ground.','paris-sewers'],
 ['grand-sewer-outlet-approach','The final elbow','A turn reveals the narrowing outlet at the end of the gallery. The map does not reconstruct unreported distances.','paris-sewers'],
 ['jena-sewer-outlet','The barred outlet','The narrowing pointed arch is shut by a heavy hinged iron grille and a thick lock. No second exit bypasses the barrier.','paris-sewers'],
 ['jena-sewer-outlet-shore','The narrow Seine shore','A narrow strip of bank lies outside the outlet, with the river immediately beyond and the Jéna and Invalides bridges visible in opposite directions.','paris-sewers'],
]
export const sewerMapDefinitions=[
 {key:'paris-sewers',name:'The Paris sewers — source sequence',parent:'paris',description:'The narrated branch, galleries, collecting sewer and outlet. Distances, bearings and unspecified side passages are editorial; this is not a complete surveyed network. Hidden submerged danger is not marked on the static artwork.'},
]
export const sewerGatewayPlans=[
 {parent:'paris',target:'paris-sewers',location:'paris-sewer-network',reason:'The underground sequence covers several districts; the general city-scale entrance is not a second physical escape manhole.'},
]
export const sewerSourceEvidence=[
 {chapter:329,paragraphs:[6,8,10,11,12,21,22,23]},
 {chapter:330,paragraphs:[7]}, {chapter:332,paragraphs:[3,4,5,8,9,13]},
 {chapter:334,paragraphs:[0,3,7]}, {chapter:335,paragraphs:[2,3,7,8]},
 {chapter:336,paragraphs:[63,66]},
]
