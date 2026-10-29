import fs from 'node:fs'
import {illustratedMapRegistration}from './map-registration-plan.mjs'
import {montreuilMapDefinitions}from './montreuil-location-plan.mjs'
import {mapDefinitions}from './location-ledger.mjs'

// Parent maps begin with their selected raster rather than another temporary
// schematic. Their separate hash-bound acceptance remains mandatory.
const sources={
 'paris-carriage-details':['Pinned Hapgood chapters 337–339, 350 and 363','Separate mobile vehicles, no fixed addresses; compartment construction editorial'],
 'villers-source-details':['Pinned Hapgood chapter 131 paragraph 6','Narrator’s description, not authenticated archaeological survey; site geometry editorial'],
 'digne-civic-details':['Pinned Hapgood chapter 4 paragraphs 24–25','Independent street/platform details, no asserted actual town site or itinerary'],
 'paris-room-details':['Pinned Hapgood chapters 29:20, 36:41, 144:126–129 and 168:1–2','Independent source rooms; unspecified dimensions and furnishings editorial'],
 'paris-public-room-details':['Pinned Hapgood chapters 1:4, 11:5 and 173:1–2','Independent source spaces; unknown address, floor and dimensions not inferred'],
 'larks-meadow':['Pinned Hapgood chapters 229 paragraphs 24–26 and 232 paragraphs 4–5, 66–67','Local meadow/river/parapet; bearings and lengths editorial'],
 'pere-lachaise-corner':['Pinned Hapgood chapter 365 paragraphs 0–3','Source neglected corner; no identifiable real grave or painted name'],
 'paris-environs':['Pinned official API Geo town centres and Natural Earth 1:10m rivers; render-paris-region-reference.mjs','Town positions approximate in illustration; roads, relief, boundaries and source parcels schematic'],
 'paris-lodging-details':['Pinned Hapgood chapters 177, 181, 196, 229 and 276','Separate source rooms and entrance; unknown floors unspecified'],
 'faverolles-village':['Pinned Hapgood chapter 20 paragraphs 1, 5 and 7','Source rural relationships; modern village identification unestablished'],
 'atlantic-context':['Pinned Natural Earth 1:50m land geometry; render-atlantic-reference.mjs','Physical coast and qualitative relief, no national borders; America remains unspecified'],
 'roi-sicile-ruin':['Pinned Hapgood chapter 251 paragraphs 31–34','Separate ground plan and high-wall elevation; no conjectured escape route'],
 'luxembourg-details':['Pinned Hapgood chapters 188–195 and 314','Separate source walk and basin; relative placement editorial'],
 'picpus-approaches':['Pinned Hapgood chapters 111–113 and 118','Source Y, crossbar and blind alley; historical-fiction topology, not surveyed modern streets'],
 'mabeuf-cottage':['Pinned Hapgood chapters 185, 231 and 242','Source cottage, hedge, lane and garden features; exact layout editorial'],
 'vernon-details':['Pinned Hapgood chapters 169, 171, 174 and 175','Separate source sites; no invented connecting streets or bearings'],
 'paris-cafe-details':['Pinned Hapgood chapters 32, 193 and 228','Source room features with unspecified furniture and geometry editorial'],
 'vaugirard-cemetery':['Pinned Hapgood chapter 142 paragraphs 2–5 and 38','Source garden cemetery and paired gates; exact plot layout editorial'],
 'cafe-musain':['Pinned Hapgood chapter 176 paragraphs 6–8','Source room connections and private exit; relative bearings editorial'],
 'bastille-elephant-exterior':['Pinned Hapgood chapter 250 paragraphs 182–217','Source model enclosure and underbelly approach; dimensions reconstructed'],
 'bastille-elephant-interior':['Pinned Hapgood chapter 250 paragraphs 217–239','Hollow upper-body cutaway, wooden ribs and weighted three-pole mesh bed'],
 'la-force-details':['Pinned Hapgood chapters 230 and 251','Separate source court and known lower/top levels, without invented intervening plans'],
 'southern-country':['Pinned Natural Earth physical coast and approximate town reference; render-southern-reference.mjs','Qualitative relief and reconstructed town footprints/roads; no surveyed elevation or diocesan boundary'],
 'southern-local-details':['Pinned Hapgood chapters 3, 7, 10, 23 and 27; southern-location-plan.mjs','Separate source localities with unestablished exact addresses and editorial dimensions'],
 'toulon-harbour':['Pinned Hapgood chapters 20–21 and 92; official heritage inventory IA83001934 and maritime museum context','Two older basins; land-based bagne; schematic property parcels and ship berths'],
 'orion-deck':['Pinned Hapgood chapter 92','Editorial wooden ship deck reconstruction, not a measured surviving plan'],
 'orion-main-yard':['Pinned Hapgood chapter 92 paragraphs 22, 26, 28','Elevated rigging level; proportions editorial, no exact height asserted'],
 'paris-sewers':['Pinned Hapgood chapters 329–336; sewer-location-plan.mjs','Narrated underground sequence only; no surveyed bearings or complete side network'],
 'petit-picpus-site':['Pinned Hapgood chapter 126 paragraph 1 and chapters 114–119','Fictionalized source enclosure and neutral first-arrival labels; not modern cemetery geography'],
 'petit-picpus-interiors':['Pinned Hapgood chapters 115, 119–123, 138–139; picpus-location-plan.mjs','Separate source spaces; only visitor parlour floor established'],
 'gillenormand-details':['Pinned Hapgood chapters 161, 173–175, 262, 338–363; gillenormand-location-plan.mjs','Separate stated floors; only established bedroom/drawing-room doorway joined'],
  'plumet-house':['Pinned Hapgood chapters 233–237 and 258; paris-homes-location-plan.mjs','Overgrown enclosure and separate upper-room detail; no inferred corridor course'],
  'homme-arme-rooms':['Pinned Hapgood chapters 295, 308, 339 and 362','Dining/antechamber same room; distinct first-floor landing and second-floor apartment'],
  'waterloo-country':['Pinned Hapgood chapters 71–89; waterloo-location-plan.mjs','Pre-monument relief and A road pattern; approximate local positions'],
  'hougomont-details':['Pinned Hapgood chapter 72','Source enclosure and orchard; geometry reconstructed'],
  'montfermeil-country':['Pinned Hapgood chapters 93, 97–102','Village, spring slope and outward roads; local geometry schematic'],
  'thenardier-inn-details':['Pinned Hapgood chapter 100 paragraphs 196, 208, 213, 218–219','Only guest room floor established; conjectured parents-room connection omitted'],
  'arras-town':['Pinned Hapgood chapter 61 paragraphs 0–27','Schematic town sites; no surveyed street geometry'],
  'arras-court':['Pinned Hapgood chapters 61–63 and 68; arras-location-plan.mjs','Room connections from source; unlocated conference room shown separately'],
  ...Object.fromEntries(montreuilMapDefinitions.map(map=>[map.key,['Pinned Hapgood source chapters 40–70; montreuil-location-plan.mjs paragraph evidence','Editorial arrangement with source-specified relationships only; physical addresses and unspecified floors remain unknown']])),
  'paris-les-halles':['Girard, Paris plan revised 1830; inspected market-quarter crop','Hapgood IV.XII.I paragraphs 5–8 and IV.XIII.I paragraphs 8–14; Lazare 1844 Contrat-Social endpoints for historical context'],
  france:['Natural Earth 1:50m physical land geometry; approximate geographical town centers','Pinned source: Digne opening, Montreuil books, Waterloo account, Toulon harbor episode, Vernon/Paris chapters; no local movement inferred'],
  paris:['Girard, Paris plan revised 1830; BnF btv1b53025224x','Source chapters 28, 30, 147–158, 277, 285–286; geographical overview only'],
}
const layouts=Object.fromEntries(Object.entries(sources).map(([key,source])=>{
  const {width,height,locations}=illustratedMapRegistration[key]
  const {levelGroup,levelIndex}=mapDefinitions.find(map=>map.key===key)
  return [key,{width,height,image:`${key}-illustrated.webp`,source,locations,
    ...(levelGroup?{levelGroup,levelIndex}:{})}]
}))
fs.writeFileSync(new URL('./map-staging/parent-layouts.json',import.meta.url),JSON.stringify(layouts,null,2)+'\n')
console.log(`Built ${Object.keys(layouts).length} illustrated parent layout(s); separate visual acceptance and app review still required.`)
