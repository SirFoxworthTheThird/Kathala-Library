export const toulonPlaceRows=[
 ['toulon-harbour','The Toulon harbour','Quays, moles, enclosed basins and the Arsenal surround the naval anchorage. The marker is on the quay; the exact mooring plan is reconstructed.','toulon-harbour'],
 ['toulon-galleys','The Toulon bagne','The land-based penal establishment occupies buildings around the naval arsenal. The historical term “galleys” does not make this a floating row-galley prison in the story’s period.','toulon-harbour'],
 ['toulon-townhall','The town-hall','The municipal building belongs to the old port-side town. Its plotted parcel is schematic.','toulon-harbour'],
 ['orion-at-anchor','The Orion at anchor','The wooden ship of the line lies near the Arsenal quay with the frigate Algésiras alongside. Their precise berths are editorial.','toulon-harbour'],
 ['toulon-orion-algesiras-water','The water between the ships','A narrow gap of water separates the parallel hulls of the Orion and the frigate anchored alongside.','toulon-harbour'],
 ['orion-deck','The Orion’s deck','The working wooden deck has mast bases, hatches, rigging and ordinary naval fittings. The reconstructed fittings are not a surviving measured plan of this ship.','orion-deck'],
 ['orion-main-yard','The main yard','The elevated spar and footrope extend toward starboard above the ship’s side, with access to the main-top at the mast.','orion-main-yard'],
]
export const toulonMapDefinitions=[
 {key:'toulon-harbour',name:'Toulon — harbour and arsenal',parent:'france',description:'Two older basins, arsenal and land-based bagne, with town and anchorage. Harbour context is historical; properties, berths and local geometry are schematic.'},
 {key:'orion-deck',name:'Orion — deck',parent:'toulon-harbour',levelGroup:'orion',levelIndex:0,levelLabel:'Deck',description:'A source-based wooden warship deck reconstruction. Fittings and proportions are editorial; no transient rescue or damage is painted.'},
 {key:'orion-main-yard',name:'Orion — main yard',parent:'toulon-harbour',levelGroup:'orion',levelIndex:1,levelLabel:'Main yard',description:'An elevated rigging-level plan above the deck. Starboard is below on the image with bow to the right; no exact height is asserted.'},
]
export const toulonGatewayPlans=[
 {parent:'france',target:'toulon-harbour',location:'toulon',reason:'The penal establishment, quay, port and neighbouring hulls need local positions.'},
 {parent:'toulon-harbour',target:'orion-deck',location:'orion-at-anchor',sharedFloorGroup:'orion',reason:'Deck and elevated main yard share one vessel entrance and selectable levels.'},
]
export const toulonSourceEvidence=[
 {chapter:20,paragraphs:[11]}, {chapter:21,paragraphs:[27]},
 {chapter:92,paragraphs:[0,18,19,21,22,26,28,30,31,33]},
]
