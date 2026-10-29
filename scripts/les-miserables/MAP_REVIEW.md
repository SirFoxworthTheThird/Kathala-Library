# Map review

These are local map assets, not a completed map hierarchy or a passed app gate.

## Bishop’s house

Source: Volume I, Book First, chapter VI, paragraphs 0–20; upstairs prayer room
also described in Volume I, Book Second, chapter IV, paragraphs 20–21.

Two 1400 × 1000 WebP layers and their editable SVG originals were opened and
visually inspected. Labels are legible, room boundaries clear and the ground-floor
doors follow the stated sequence: street, dining room, bedroom, oratory, alcove.
The glazed garden door is distinct from the doors between rooms. The garden has
three vegetable plots, one flower plot, crossed walks and a tank. Service annexes
are distinct from the three-room house.

The upper rooms are explicitly schematic; no stair position, room order or
connecting doors are asserted. No cardinal orientation or measured plan is
claimed. The cellar is part of the converted pharmacy annex, not an invented
fourth room in the bishop’s three-room suite.

Both layers are planned as a floor group under Digne with one shared house
entrance. The Digne layer and its gateway still need construction. Marker
positions, inverted image Y coordinates, floor switching, arrival zoom and
playback must all be checked in the application before these maps pass release.

## Corinthe and the local streets

Three additional 1400 × 1000 WebP candidates were opened individually. Source:
IV.XII.I paragraphs 5–12, IV.XII.III–V, and V.I.XXIV. The street map shows the
short approach from Saint-Denis, the tall houses at its closed end, Mondétour’s
two branches and Corinthe’s projecting corner. It does not paint the later
barriers or hidden escape into the initial street image. Gated place markers
will identify these features only when the narrative reaches them.

The ground floor distinguishes tap-room, kitchen, spiral stair and cellar trap;
the first floor shows the billiard room, street windows and the private ladder
access toward the household rooms. Dimensions, angles and furniture positions
are explicitly schematic. The upper spiral-stair opening is in a corner, as the source specifies; floor-plan footprints and their relative positions are schematic.
Cellar, private lodgings and attics do not receive empty independent layers.

These maps remain candidates for the final hierarchy. The Halles parent map is
not built, and the Corinthe floor-group gateway, markers, transitions and
playback have not yet passed in-app QA. The adjusted first-floor render was
revised to place the upper stair in a corner and opened again: labels and symbols are clear, without overlap.
All final marker placements still require the in-app visual pass.

## Digne town plan

The sixth map is a 1600 × 1200 topological plan, opened as a WebP. It distinguishes
the cathedral square, the adjoining palace and small hospital building, the
printing-office bench, Labarre’s inn and kitchen, Chaffaut, the prison, the
artisan’s house and the kennel garden. The source establishes the palace beside
the hospital (I.I.II) and the printing office at a corner of Cathedral Square
(I.II.I). Other positions and the street lines are explicitly schematic.

The hospital marker refers to the original small building visited before the
exchange, not to the palace after the patients move. The background says only
“one-storey house” so it does not announce the exchange before the narrative.
The house gateway is introduced at the move and opens the two existing floor
plans. Digne’s France parent, the final marker pass and all app transitions are
still pending. The cellar, execution route and outlying diocese need separate
source decisions; they are not silently assigned invented positions here.

## Gorbeau lodging details

The seventh map, 1600 × 1000, was opened after the final background edit.
Sources: II.IV.I–IV, III.VIII.V–VI and III.VIII.XV. The steep entrance stair
and long corridor lead to attic compartments; the source does not establish a
separate first-floor apartment and later attic floor. The two-room lodging
and the adjoining garrets therefore appear as explicitly separate details
whose relative positions inside the building are unknown. They are not an
assertion that four distinct apartments existed simultaneously.

The earlier detail includes the child's inner room, stove, mattress and the
unoccupied compartment across the corridor. The later detail preserves the
shared thin partition, Marius's commode, the large garret's dormer, table,
hearth and two pallets whose ends meet the fireplace. Labels and furniture
symbols are legible. Positions are schematic rather than measured.

The high opening is not painted into the background. Its marker is introduced
at chapter 205's discovery, so opening this map with the earlier lodging does
not reveal Marius's means of looking through the wall. Both corridor contexts
are separate plotted details; the static drawing does not connect the insets.
The street-level parent and its lodging gateway now have definitions and a rendered plan.
The complete in-app marker and playback review remains open.

## Boulevard surroundings

The eighth map, 1600 × 1100, is the local street parent of the Gorbeau lodging
detail. It was opened twice: the first render exposed a clipped wall label and
a side-street name crossing the city wall; both were corrected and the final
render inspected. Labels are now legible and separate. The image shows the
house between garden walls, the neighboring factory, the boulevard trees, the
opposite Rue de la Barrière-des-Gobelins and the city wall where it ends.
Street angles, distances and footprints are explicitly schematic. Sources are
II.IV.I paragraphs 2–9 and 19–23, III.VIII.X paragraph 18, III.VIII.XIII and
III.VIII.XXI paragraph 0.

The parent gateway into the lodging uses the house’s street door. The map image
does not paint police or future violence into the early visit. The Paris parent
and the final in-app gateway, marker and movement checks remain unfinished.
# Final artwork requirement

All eight SVG plans are temporary geometry references; two selected map layers now use illustrated replacements. The user
requires illustrated topographic maps for geographic layers before release;
interior layers remain floor plans, with appropriate architectural illustration.
Prior standalone inspection of these schematics does not approve final artwork.
Every replacement needs a new subject, topology, marker-registration, encoding
and in-app review. `MAP_ILLUSTRATION_ACCEPTANCE.json` currently records two staged reviews. Their
source, encoding and diagnostic placement checks do not close the in-app gate. The release report lists these maps as
awaiting illustrated replacement, independently of their numeric geometry checks.


## First illustrated replacements

The selected originals are `map-image-sources/paris-hospital-quarter.png` and
`map-image-sources/chanvrerie-streets.png`, generated with the built-in image tool.
The complete prompt and revision set is in `map-illustration-plan.mjs`. Versions
1 and 2 were not selected because of their oblique treatment and, for Chanvrerie,
an unsupported lower street connection. The flatter third versions retained the
local street networks. The fourth versions supplied two final source corrections:
the Petit-Banquier waste-ground enclosure and its low street-facing wall, and
removal of ambiguous circular street fittings from Chanvrerie.

Both selected originals were opened individually. The boulevard branch ends at
the city wall; the house, entrance, gardens, opposite elm and two wall contexts
remain distinct. Chanvrerie narrows toward the closed row of houses and has only
the two Mondétour exits in the local view. Corinthe occupies the projecting
corner below-left of the junction. Future barriers and the hidden grating are
not painted. These are illustrated reconstructions with short architectural
shadows, not measured cadastral surveys.

WebP quality 90 preserves the original dimensions: 1512 × 1040 and 1484 × 1060.
The encoded files are 467,114 and 578,582 bytes; together they are about 84.2%
smaller than their PNG originals. Regenerating both WebPs and MAP_ENCODING.json
was byte-stable. All eight boulevard positions and sixteen Chanvrerie positions
were checked on `qa/paris-hospital-quarter-registered.jpg` and
`qa/chanvrerie-streets-registered.jpg`, made from the actual encoded images.
The house entrance, street side of each wall, opposing trees, wine-shop threshold,
closed end and upper/lower passage positions were inspected individually.
Marker geometry and landmark notes are bound to the reviewed image hashes.

`loadMapLayouts()` now selects these illustrated images and their registered
coordinates. Rendering a temporary SVG again cannot silently restore it as the
selected image. Removing approval restores the explicit pending state; changing
image bytes or coordinates requires a fresh review. Disabling approval application
made three new regressions fail, and restoring it made all seven targeted map
tests pass. Six other selected maps remain temporary. The complete hierarchy,
final marker visibility and all in-app reviews remain open.

### Bishop ground-floor illustrated replacement
Builtin image generation from the native source-grounded plan; prompt retained in interiorIllustrationPlans. Selected PNG and compressed WebP inspected individually. The three-room sequence, exterior threshold, garden door, guest alcove and detached annexes remain legible. Eight positions registered afresh and checked on qa/bishop-ground-floor-registered.jpg. Furniture and textures are illustrative; annex positions and dimensions remain editorial reconstruction. Image/registration hashes bind staged acceptance. In-app visibility and transition review remain pending. Five temporary layers still need illustration replacement.


### Bishop first-floor illustrated replacement
Builtin image generation from native plan; prompt retained in upperInteriorIllustrationPlans. Original and compressed image inspected, one drawing-room point checked in qa/bishop-first-floor-registered.jpg. Three editorially arranged rooms, linen and bergere preserved. No stair or connecting doorway inferred. The image states the source limitation. Staged acceptance only; app review remains open. Four temporary layers remain.


### Corinthe two-floor illustrated replacements
Reread chapter 277 paragraphs 12 and 25-26: one narrow first-floor window, square corner opening for the wooden spiral stair, separate private doorway to the household ladder. Corrected the native reference window band and circular opening before generating the upper-floor artwork. Both selected originals and encodings inspected. Six positions individually checked on the two qa/corinthe-*-registered.jpg overlays. Bar, kitchen, separate cellar trap and street threshold remain distinct. No barricade, death or hidden escape painted into the early setting. Positions and dimensions remain editorial. Builtin prompts retained in corintheInteriorIllustrationPlans. Two temporary layers remain; all app QA is still open.


### Gorbeau illustrated lodging details
Two separate arrangements retained with a visible gap and explicit relative-position limitation, rather than four asserted neighboring apartments. Original and compressed artwork inspected; nine points checked on qa/gorbeau-lodgings-registered.jpg. Doors and corridors remain distinct, high partition aperture is not painted into the image. Its later marker remains scene gated. Furniture is illustrative, not an extra claim of source inventory. Builtin prompt retained in gorbeauInteriorIllustrationPlans. Digne is the sole remaining temporary layer among the eight current maps; in-app review is open for every map.


### Digne illustrated town replacement
First candidate rejected as too oblique; selected second candidate inspected in original and WebP forms. It is an overhead illustrated hill-town reconstruction with some raised roof/building edges, not a strict orthophoto or a measured historic terrain model. Hachures give qualitative relief, with no invented elevation numbers, scale or north arrow. Schematic landmark placements remain explicitly disclosed. Cathedral-square, palace/small-former-hospital adjacency and printing-office corner remain distinct. Eighteen points checked individually on qa/digne-registered.jpg, including separate threshold/roof markers. Modern cathedral facade accuracy is not claimed. Former hospital label does not disclose the later exchange. The outer diagram frame was not converted to an invented intact city wall. Builtin generation prompts and rejected-first-candidate rationale retained in digneIllustrationPlans. All eight existing map layers now have hash-bound staged illustrations; the missing parent maps, unmapped places and all in-app map reviews remain open.


### Paris parent overview
Original 1830 Girard scan and central/southern details inspected. Generated overview simplified at city scale; no surveyed scale or cardinal direction is imposed on its rotated historical orientation. Candidate one rejected for hospital-boulevard label placement; selected local edit inspected. Twelve positions checked on qa/paris-registered.jpg against compressed artwork. River point corrected from bank to water and overlay reinspected. New city districts resolve ten source keys, with generic Paris retained at regional scale. More local Paris layers remain necessary. Builtin prompts retained in parisParentIllustrationPlans. App review remains pending.

### Regional parent
Physical coastline geometry from pinned Natural Earth 1:50m public-domain land data, rendered as a reference only. No political borders asserted. Candidate one rejected for connected Seine/Loire/Rhone and perspective relief; selected revision omits inland drainage and reduces excessive peaks. Terrain remains qualitative engraved illustration, not measured elevation. Seven town centers checked on qa/france-registered.jpg. Full builtin prompts retained in franceParentIllustrationPlans. France-to-Paris and France-to-Digne gateways now have explicit parent locations; Halles remains missing. Source coverage and local layers remain incomplete. App review is open.

### Hierarchy validation
New validator reports roots, missing parents, missing gateway locations and maps without gateway plans. It rejects duplicate entrances/targets, wrong-parent entrances, parent cycles and inconsistent floor-group links. A shared building door covers both documented floors. Duplicate-gateway regression was proven red with those guards removed and green when restored. These checks validate staged plans only and do not substitute for runtime navigation evidence.


### Halles neighborhood and current hierarchy
Selected second illustration corrects the first candidate Tonnellerie/Bourdonnais label placements and Mondetour junction. Source reference and qualification in CARTOGRAPHY_SOURCES.md; prompts retained in hallesParentIllustrationPlans. Seven freshly registered positions checked individually on qa/paris-les-halles-registered.jpg. Poterie/Contrat-Social identifications and incident positions remain explicitly tentative. The current 11-layer tree now has one root, no missing parent, gateway location or gateway plan. This does not complete source coverage: 306 keys remain without map assignments and further local layers are required.

### Application fixture review
A separate maps-only fixture, qa/map-review.pwk, embeds all 11 map images and carries a distinct world ID and record namespace. It contains no manuscript, characters or scene visibility/playback, and must not be confused with the edition. qa-map-ui.mjs imports it through the current app importer in an isolated browser context. Initial screenshot exposed vertically mirrored locations: registration uses top-left raster coordinates, while Leaflet expects upward Y. map-records.mjs now converts Y at serialization only. New regression proved red before correction and green afterward; source registration remains unchanged. Gateway-export and review-ID isolation regressions also proved red with missing links/namespace support, then passed.

The final fixture run loads all 11 layers, checks all 92 rendered pin anchors against original raster positions to within 3 screen pixels, clicks all eight gateways, selects both upper floors through the actual floor controls, and records no console/page errors. Every layer screenshot was opened for visual review. A closer review moved the general Seine setting from the bank farther into open water (Paris raster point 1260,800), refreshed its registration hash and repeated application checks. Evidence is qa/map-ui/results.json plus per-layer screenshots. App base e920677e47ad79ea110c37855f0e0e05749e52e2 includes the separate local reported-state fix. This is preliminary full-data map review only: reading-mode disclosure, character placement, playback and final downloadable-book QA remain open. Keep final inAppReview fields pending.


### Montreuil group
Town illustration uses qualitative upper/lower-town relief and source constraints, not a surveyed 1823 plan. Official tourism text checked the general fortified-town/valley context; its modern PDF could not be downloaded or visually inspected (HTTP 444), so no modern plan geometry/pixels are used. The town illustration retains raised building edges and is not a strict orthophoto. Fictional sites are explicitly schematic. Source module records paragraph anchors for lower-town residence, square/station, separate workrooms, factory infirmary versus public hospital, cashier below bedroom and later rented attic. Twenty-eight new positions inspected against compressed images and in app, with alley point moved off a roof into the open way. Factory detail panels keep unknown adjacencies and floor numbers unspecified; rented rooms do not assert one address. Updated fixture review: 14 maps, 120 positions, 11 gateways, both floor groups, no console/page errors. Final reading/character/playback review remains pending.


## Arras and Montfermeil
Arras town and temporary court selected with unsupported compass/scale removed. Courtroom door behind president, double antechamber door and accused bench at president’s left preserve source relations; private conference room remains unlocated. Town streets schematic, not surveyed. Both compressed images inspected with all nine registration points; inn courtyard point corrected off roof. Full prompts/revisions in arras-illustration-prompts.mjs.
Montfermeil country retains plateau/spring slope and wooded approaches, with covered aqueduct beneath turf path rather than exposed ruin. Inn plate separates parents’ chamber; connection to children’s room is conjectural in source and not drawn. Only guest chamber has established first-floor label. Originals and encodings inspected with twenty local points and regional entrance; woods point moved off pond, return path moved onto path. Full prompts in montfermeil-illustration-prompts.mjs. Builtin generation throughout. Final reading-mode review remains pending.

## Waterloo and Hougomont
Source A-shaped roads, northern plateau, eastern Plancenoit approach and southern Rossomme/Genappe ground retained. Relief represents the pre-monument terrain qualitatively, not a modern measured surface. Command sites are source locations, not painted formations; exact unlocated report sites explicitly approximate. Hougomont first candidate rejected for excessive obliquity; source corrections opened well surround and restored visible courtyard/orchard doorway after a failed door-edit attempt. Main farmhouse and notched southern gate remain distinct. All 23 points inspected on encoded-image overlays. Full builtin prompts/revisions retained in waterloo-illustration-prompts.mjs. No battle action, corpses, skeletal well contents or later monument painted. Final book review pending.

## Rue Plumet and Homme Armé
Selected overhead revisions replace perspective property/detail panels. Plumet garden remains overgrown, with old bench, pavilion, paved rear court and low lodge; unknown winding secret corridor not painted as a made-up route. Isolated bedroom inset asserts no orientation inside pavilion. Revision omitted baked labels; app’s own location labels identify each registered space. Homme Armé central dining/antechamber separates two bedrooms, kitchen adjoins, east bedroom window faces back court; lower entry, first-floor landing and garret are separate overhead panels. Static furniture does not disclose final bed relocation. Originals/encodings and all 17 local plus five Paris points visually inspected. City locations deliberately schematic within source districts, no cadastral parcel claim. Full builtin prompts/revisions in paris-homes-illustration-prompts.mjs. Source audit found dining room/antechamber duplicate: canonical dining-room key now retained for final scenes and bequest ledger, regression proved red before source correction and green afterward.

## Gillenormand and Petit-Picpus
Gillenormand details retain first-floor bedroom/drawing-room adjacency and corrected visible door; ground-floor waiting room has red-square tiles. Unlocated dining, study, daughter’s room and recovery chamber are separate panels, with former attic separately labelled. Same-house and salon/drawing-room source aliases normalized; recovery room remains distinct.
Petit-Picpus L-shaped main building, four boundary streets, lowered garden and twelve radial paths follow chapter 126. Removed two unsupported Polonceau gates. Static side-building/annex labels are neutral on first arrival. Interior visitor parlour is first-floor with impermeable grille; prioress’s cell is separate and unlocated. Chapel curtain corrected to screen sanctuary; refectory has one garden door. Hut has one bed and no asserted grounds location. Source fictionalizes the geography; city gateway is district-scale, not the modern cemetery parcel. All originals, compressed images and 35 new location points inspected. Builtin prompts/revisions retained in gillenormand-illustration-prompts.mjs and picpus-illustration-prompts.mjs. Final book reading visibility remains pending.

## Underground sequence
Added narrated entry branch, Montmartre gallery, service crossing, collector junction, broad gallery, airhole/banquette and barred outlet/shore. Distances, bearings and unspecified side courses remain editorial; no complete surveyed hydraulic network claim. Side stubs fade rather than form invented loops. Hidden fontis not labelled or visibly exposed on static background. Service crossing physically represented without patrol/lantern. Tentative Rue d’Anjou identification retained. General city drainage gateway is not a second physical entry manhole. Encoded image and eleven underground points inspected; river-bank parent point moved off blue water after overlay review. Full builtin prompt/revision in sewer-illustration-prompts.mjs. Final complete-book reading/playback pending.

## Toulon and the Orion
Harbour first candidate rejected for oblique camera and end-to-end ship arrangement. Selected overhead revision places frigate parallel alongside Orion, with water marker in their actual narrow gap. Bagne is land-based, no obsolete row-galley prison fleet. Older two-basin context uses official heritage/museum text; no inspected historic survey image, exact property/berth claim or modern western expansion. Deck and elevated main yard are a shared selectable level group, both with bow right and starboard below; no numerical height. Ordinary wooden fittings are reconstructed rather than claimed measured ship plans. All seven new points inspected on encoded-image overlays. Full builtin prompts/revision in toulon-illustration-prompts.mjs. Final book visibility and playback remain pending.

## Southern country and separate local settings
Pinned Natural Earth physical-coast reference generated by render-southern-reference.mjs with approximate town context. First image rejected for tilted high mountains and perched Digne; selected revision uses overhead hachured qualitative relief and inland Grasse. Subsequent town-placement revision reduces symbol drift; final symbols remain approximate artistic regional positions, not measured town extents or exact geodesy. No invented inland river network or diocesan boundary. Unlocated Chastelar, mountain parish, Conventionary valley, Gervais plain and distillery are independent framed details, not one contiguous property or geocoded addresses. Removed perspective horizon from ruddy plain and changed exterior views to overhead footprints. All fifteen new places and encodings inspected; full builtin prompts/revisions in southern-illustration-prompts.mjs. No bodies, coin or future incident painted into static backgrounds. Final book review pending.

## Bastille model and La Force

The model enclosure and hollow belly use a shared right-facing orientation. The exterior marker indicates the foreleg approach; the aperture is occluded from above. The interior keeps rubble floor, timber ribs and spine, three-pole mesh sleeping alcove, and the foreleg breach, without painting temporary ladders or later action. La Force separates Charlemagne courtyard, lower New Building dormitory, and top-storey Fine-Air cage; no unknown intervening floors or circulation are invented. The Fine-Air skylight is shown as a separate roof detail. Source chapters 230, 250 and 251 govern these reconstructions. Original and encoded illustrations and all registrations were visually inspected. Complete-edition reveal and reading review remain open.

## Old Vaugirard cemetery and Café Musain

Originals and compressed versions visually inspected. Vaugirard follows chapter 142: faded formal-garden enclosure, contiguous carriage/pedestrian grates adjoining porter pavilion, and a separate quiet corner. Exact plot geometry is editorial; no open grave or burial action painted. Musain follows chapter 176: front café, extremely long connecting corridor, two-window back hall and private stair exit onto Rue des Grès. Street bearings and dimensions editorial; city points are approximate districts rather than surveyed parcels. Back-room registration moved off the table onto floor. Both require final reading-mode disclosure QA.

## Cottage, Vernon and café detail atlas

Source and compressed images and all marker registrations inspected. Mabeuf’s hutch corrected to empty, preserving source hedge, well, stone-post bench, apple tree and lane. Vernon uses separate river house, relay and churchyard panels; removed unsupported compass and flattened perspective. No unknown street connections asserted. Bombarda retains two windows, two tables and bed alcove; Voltaire and Richefeu remain separate editorial interior details. Paris public-street positions are approximate city locators with explicit limits; river bridge/quay registrations adjusted after enlarged inspection. Complete-book reading-mode disclosure remains open.

## Luxembourg and Petit-Picpus approaches

Both scenic first candidates rejected for excessive obliqueness. Selected revisions flatten roof/tree footprints and show a readable source topology. Luxembourg separates the Pépinière walk and grand basin, without an invented connecting path; bench and bank registrations inspected. Picpus retains Y, Droit-Mur crossbar, closed Genrot end, permanent oil lantern and recessed plank gateway; no patrol or escape apparatus painted. Exact bearings, lengths and parcels editorial. Source originals, compressed versions and diagnostic registrations visually inspected. Final scene visibility remains open.

## Atlantic context and Rue du Roi-de-Sicile ruin

Pinned Natural Earth physical-coast reference inspected before generation. Atlantic preserves recognizable continental coastline, no national borders or shipping route, qualitative relief only. America is an unspecified continental report rather than an invented destination address; Guernsey marker is island-scale, contextualizing appended 1862 letter. The France regional overview gains this parent, retaining one root. Ruin first candidate ground panel rejected for obliqueness; selected revision separates overhead enclosure from third-storey wall elevation, with five fence posts and two window openings. The source explicitly leaves escape route unexplained; none is drawn. Original/encoding/registration review completed, wall marker moved down onto coping. Final reading-mode and source coverage remain open.

## Repeated clearing identity

Source 98/33–34 and 342/17 identify the same heap of stones and zinc-bound chestnut. Source 346/0 identifies both forest visits and names Blaru-bottom. Late scene location keys now reuse montfermeil-marked-clearing rather than inventing a second unmapped place. A regression proved red then green. The early static map still omits the concealed object and private markings.

## Separate lodgings and rural Faverolles

Originals and compressed versions inspected, with fresh registrations. Lodging atlas keeps source student bed/floor mattress, hotel chamber and Rue de l’Ouest carriage gate separate, with no unknown floor or shared circulation asserted. Replaced unsupported portress-lodge key with house entrance, following the source descent and hail. Faverolles first candidate rejected for excessive obliqueness; selected revision uses higher overhead view and an intact bakery-front elevation. No confident modern village identification is claimed; country placement is explicitly schematic. Cottage faces farming household across lane; bakery fronts church square. No later damage/action painted. Atlas gateways are documented editorial area charts, not assertions that separate properties share one physical doorway. Final reading-mode/reveal review remains open.

## Paris environs

Added an approximate regional parent for Paris city and Montfermeil country, maintaining one gateway for each. Official API Geo town centres and pinned Natural Earth river centrelines form the reference; first candidate’s town drift prompted a revision. Selected artwork remains an illustrative approximation, not coordinate-preserving cartography; label explicitly says town positions approximate and terrain/roads/parcels schematic. Modern administrative outlines and building footprints are not imported. Original, compressed image and registrations inspected; Paris gateway moved onto land in the urban footprint. Saint-Cloud internal park compartments and specific institution/inn venues are schematic, not surveyed plots. Environs source points were reviewed at regional scale; final app and reading-mode review remain open.

## Meadow and final cemetery corner
Built-in generated originals individually inspected, then full-resolution q90 WebP diagnostic overlays inspected. Meadow source 229:24–26 and 232:4–5: laundry lines, dormered old gardener house, local watercourse/poplars and parapet. The two positions are on the parapet bank and outgoing path. Cemetery source 365:0–3: neglected grass, wall, yew/ivy and plain off-path stone, without painted name or legible verse. Exact geometry editorial, with no claimed surviving grave identification. City entrances identify Glacière/Croulebarbe district and Père-Lachaise, not surveyed internal parcels. Full prompts in meadow-cemetery-prompts.json; original selected PNGs in map-image-sources. All final reading-mode review remains pending.

## Paris independent room atlases
Two built-in generated originals individually inspected; full-resolution q90 WebP registration overlays opened. Four independent rooms: Fantine rented room, Gribier attic, Madame de T. salon, unnamed taproom. Three independent public/reception settings: Fesch anteroom, wealthy prelate household, law-school library. Source evidence in paris-room-location-plan.mjs, full prompts in paris-unlocated-room-prompts.json. Separate panels do not assert shared property, connecting doors or known floors. All unstated furnishings/dimensions explicitly editorial. Two city atlas entrances have no claimed shared physical address. Final reading-mode visibility remains pending.

## Carriages, civic details and Villers; final source-key coverage
Three built-in originals individually inspected, two targeted edits selected, all q90 WebP registration overlays opened. Public coach benches corrected to transverse facing seats, explicitly supported by 337:46; later hired coach remains separate. Carnival wagon unoccupied, no masks/crowd painted. Villers section interior corrected from a pool to soaked mud; narrator’s six-foot opening/four-foot exterior river relationship preserved. Plan illustrates his description, not authenticated archaeology. Digne street and scaffold independent, exact town sites unknown. Full original/edit prompts retained in vehicle-villers-digne-prompts.json.
Eleven remaining contexts registered at their appropriate broad scale in context-location-plan.mjs: five northern districts/road stops, Moulins college town locator, and five Paris street/institution/festival/theatre contexts. Source-event keys now all explicitly covered, but this is not final full-book physical-placement or reading-mode acceptance. Unknown inn/school/shop/prison addresses not fabricated. Fresh Paris/France/Digne compressed overlays inspected; crowded northern points require normal user zoom. Official API Geo name search retained as research candidates only: modern Hesdin-la-Forêt administrative centre is not asserted to be historic inn location; Moulins names are disambiguated to Bourbonnais, not the Breton or Aisne communes. No new political boundaries or exact route polylines drawn.
