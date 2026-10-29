// The source fictionalizes street geography: this is not the modern cemetery site.
export const picpusPlaceRows=[
 ['petit-picpus-quarter','The Petit-Picpus quarter','A quiet eastern district beyond the Austerlitz crossing contains the walled enclosure described by the narrative. The city-scale point represents the fictionalized quarter.','paris'],
 ['petit-picpus-garden','The walled garden','An oblong irregular garden has tall trees at its corners, a central fir, radiating currant-bordered alleys, fruit trees, vegetables, melon frames, an old well and mossy benches.','petit-picpus-site'],
 ['petit-picpus-arched-window','The arched garden window','An arched window at the inner turn of the large building looks into a flagstone hall divided by arcades and pillars.','petit-picpus-site'],
 ['petit-picpus-melon-beds','The melon beds','Glass frames protect the melons in an open part of the cultivated garden. Straw mats can be spread over them against the cold.','petit-picpus-site'],
 ['petit-picpus-ruined-shed','The old shed','Dismantled rooms in the old ruin form an open, damp shelter near the garden wall and the Droit-Mur corner.','petit-picpus-site'],
 ['petit-picpus-convent','The principal convent buildings','The main buildings form two wings at right angles, with cells along Droit-Mur and service, refectory and church spaces toward Petit-Picpus.','petit-picpus-site'],
 ['petit-picpus-little-convent','The Little Convent','A separate house near the Aumarais corner has a small garden before it and stands at one end of the poplar alley.','petit-picpus-site'],
 ['petit-picpus-school','The boarding-school','The school occupies the area between the carriage entrance and the closed Aumarais lane, screened from the street.','petit-picpus-site'],
 ['petit-picpus-school-garden','The pupils’ garden','A garden associated with the school provides space for the children’s recreation. Its plotted division is editorial rather than surveyed.','petit-picpus-site'],
 ['petit-picpus-courtyard','The entrance courtyard','Vine-covered walls surround the court inside the carriage entrance; tall trees rise beyond its farther wall.','petit-picpus-site'],
 ['petit-picpus-entrance','The carriage entrance','Number 62 opens from Rue Petit-Picpus into the outer court, under the porter’s observation.','petit-picpus-site'],
 ['droit-mur-garden-wall','The garden wall','The enclosure’s wall rises higher above the lower garden than above the adjoining Polonceau street. No rope or special entrance is painted.','petit-picpus-site'],
 ['droit-mur-petit-picpus-sentinel-post','The Petit-Picpus junction','The street corner joins Rue Droit-Mur to Rue Petit-Picpus. Any police post here is temporary, rather than a permanent structure.','petit-picpus-site'],
 ['rue-droit-mur','Rue Droit-Mur','The street follows the long wing of the enclosure between Petit-Picpus and Polonceau.','petit-picpus-site'],
 ['rue-polonceau','Rue Polonceau','The street passes the lower end of the enclosure, with the garden lying below its level on the inner side.','petit-picpus-site'],
 ['rue-polonceau-droit-mur-junction','The Polonceau–Droit-Mur corner','The two streets meet beside the old corner of the enclosure. Exact dimensions are reconstructed.','petit-picpus-site'],
 ['petit-picpus-parlor','The visitor parlour','An empty tiled first-floor room has a large outside window and a small heavily screened grille opposite its door. The grille permits speech and limited sight, not passage.','petit-picpus-interiors'],
 ['petit-picpus-business-parlor','The prioress’s cell','The prioress receives the gardener for business in her modest cell. This is distinct from the screened visitor parlour and its portress. The floor is unspecified.','petit-picpus-interiors'],
 ['petit-picpus-chapel','The chapel','A large flagstone hall has arcades, pillars and arched windows; a high serge curtain screens the officiant and sanctuary from the nuns.','petit-picpus-interiors'],
 ['petit-picpus-classroom','The schoolroom','The pupils’ instruction takes place in a sober teaching room within the school establishment; its exact floor is not stated.','petit-picpus-interiors'],
 ['petit-picpus-refectory','The refectory','The whitewashed room contains two long parallel black tables and benches, a crucifix and reading pulpit. Its sole door opens onto the garden.','petit-picpus-interiors'],
 ['fauchelevent-hut','The gardener’s hut','The humble lodging has one bed, a table, a hearth and nails for hanging possessions. Its precise position within the grounds is unspecified.','petit-picpus-interiors'],
]
export const picpusMapDefinitions=[
 {key:'petit-picpus-site',name:'The walled enclosure',parent:'paris',description:'Hugo’s fictionalized trapezoidal enclosure and L-shaped buildings. Garden slope is qualitative; neutral background labels avoid disclosing institutional functions on first arrival.'},
 {key:'petit-picpus-interiors',name:'Petit-Picpus — interior details',parent:'petit-picpus-site',description:'Separate source-described spaces. Visitor parlour is first-floor; other unknown floors and adjacencies remain unspecified. The sanctuary screen and visitor grille are barriers.'},
]
export const picpusGatewayPlans=[
 {parent:'paris',target:'petit-picpus-site',location:'petit-picpus-quarter',reason:'The source’s fictionalized eastern street quarter and walled garden.'},
 {parent:'petit-picpus-site',target:'petit-picpus-interiors',location:'petit-picpus-convent',reason:'The institutional identity and interior arrangements are disclosed after the nighttime garden arrival.'},
]
export const picpusSourceEvidence=[
 {chapter:114,paragraphs:[0,1,2,3,4,6]}, {chapter:115,paragraphs:[11,15,16]},
 {chapter:117,paragraphs:[21,22,62]}, {chapter:119,paragraphs:[0,2,3,17]},
 {chapter:120,paragraphs:[10]}, {chapter:123,paragraphs:[3,7,12]},
 {chapter:126,paragraphs:[1]}, {chapter:138,paragraphs:[1,2,69]},
 {chapter:139,paragraphs:[1,14]}, {chapter:145,paragraphs:[0,4,43]},
]
