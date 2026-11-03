# Source-led navigational design

Current status (2026-11-01): all30schematic source-reference plans exist, but
all30 require illustrated replacements, as the user explicitly reiterated.
Two illustrated interior replacements are selected (Rotherwood hall and cells);
28remain schematic. Illustrated-map coordinate/gateway/floor/playback review is
in progress; no final map is approved. Every geometry beyond the prose remains
an interpretive reconstruction. Earlier entries below are historical. Do not claim surveyed plans.

## Proposed hierarchy

- England’s Yorkshire/Midlands reading region: Don country, Sheffield, Ashby,
  York and the story’s fictional forest centres. Rivers, relief, settlement
  approaches and readable roads must replace any abstract relationship diagram.
- Rotherwood grounds: water-filled ditch, double palisade, western drawbridge,
  separate narrow postern crossing and irregular connected courts.
  - Hall plan: T-shaped tables, raised dais, hearth at either end, four corner
    doorways, lower benches, principal chairs and smoke-dark timber structure.
  - Guest wing: distinct Palmer, Isaac and Gurth cells off the passage; preserve
    the order established by the source, with no invented secret route.
  - Rowena’s raised rooms: seven-step ascent, antechamber and chamber. These
    steps justify a level change; other room elevations are not assumed.
- Ashby and its field: town access, host house, tournament field and castle.
  - Lists: rounded oblong a quarter-mile long, half as wide, north/south gates,
    five southern pavilions, east prince’s gallery, west Queen’s gallery, archery
    avenue south. Do not silently identify the initial Saxon gallery with the
    later Queen’s seat without checking the route.
  - Host house: upper room, side room, court and entrance route. Sickroom
    furnished with cushions and textile screen; unnamed host’s house is temporary
    accommodation, not Isaac’s permanent York residence.
  - Castle halls: distinguish public feast and inner consultation. Use an
    interpretive early castle plan, not the surviving Hastings ruins.
- Copmanhurst clearing: ruined chapel about sixteen by twelve feet, fountain
  to the right of the approach, hut against rock and paths into the forest.
  - Hut: hearth, seats, sleeping accommodation and horse corner. Hidden food
    and weapon cupboards must not disclose their contents before opening.
- Torquilstone and siege ground: square keep, lower wings, moated walls,
  barbican, main drawbridge, separate outwork/postern and forest rendezvous.
  - Interior circulation: old Saxon hall looks into the court; new hall is a
    separate place. Armoury and balcony, Rowena’s room, Urfried’s room,
    Front-de-Boeuf’s chamber and the sickroom remain distinct.
  - Deep dungeon below moat: actual downward gateway, not a court-level room.
  - Rebecca’s isolated turret and bartisan: no invented walk to other
    battlements, inner bolt, hidden stair or escape connection.
  - Ivanhoe’s window viewpoint: raised place within his corner sickroom.
    Watching the outwork does not move Rebecca or Ivanhoe onto its battle map.
  - Assault crossing: original link destroyed, raft built, main postern forced.
    Distinguish all of these from Brian’s escape across the main drawbridge.
    Final fire changes the fortress to ruins. Check actual map state before
    and after each crossing; a static picture cannot prove passability.
- Forest paths and rendezvous: first rescue oak, siege headquarters, later
  Harthill trysting tree and refreshment oak are different source places.
  Harthill is half a mile from the ruined castle, not the earlier oak reused.
  Wamba’s escape thicket, ambush brook and later attack on Richard are also
  separate places.
- Templestowe and nearby road: gate/drawbridge, garden, great hall, separate
  prison and Brian’s room, with unknown exact rooms left uncertain.
  - Trial hall: highest Grand Master’s seat, lower preceptors, scribes at his
    feet, knights/esquires below and public floor. No invented central arena.
  - Lists: levelled gentle eminence, east tribunal, west stake and black chair,
    enclosing palisade and public galleries. Procession opens the drawbridge,
    climbs, enters and makes a circuit before dismounting.
- Nathan’s unnamed town/house: four miles from Templestowe. A regional placement
  may express that relation editorially, but must not label the town York.
- Saint Botolph’s Priory: refuge, stairs, gate and refectory with a route into
  the forest. Exact village and surveyed plan are not supplied.
- Coningsburgh: rising Don-side approach and palisaded court at story time.
  - Third-storey circular chamber reached from the southern low portal and
    wall stair. Lower two levels are dark vaults; do not put a normal street
    door through them merely for convenience.
  - Buttress chapel and neighbouring oratory reached by the stated short steps.
  - Higher women’s room reached by another winding stair; guest room connected
    in the source sequence without unsupported precise compass bearing.
  - Keep has six great buttresses. The later ruin’s outer fortifications and
    the antiquarian note’s differing measurements are not interchangeable with
    the fictional plan. Retain both texts and document interpretive dimensions.
- York: castle/court and Minster wedding setting. The last private conversation
  between Rowena and Rebecca has no established building or town; no marker
  should be invented to make its location field non-null.

## Review obligations

Generate clean, readable topographic plates and interior plans, then place every
marker on its depicted feature with correct image-Y/Leaflet-Y conversion. Link
each child map through exactly one parent gateway; do not hide disconnected rooms
by adding unsupported doors. Check all floors and all entrances in the actual
app, in reading order and full-data mode, including continuous playback across
submaps. Keep original and compressed map inspections distinct from marker and
gateway QA. No required-map coverage is claimed by this design document.

## 2026-10-30 regional map continuation

- Added deterministic 1600×1400 regional relief plate from retained NOAA ETOPO1 and public-domain Natural Earth river data; exact inputs, hashes, licences and reconstruction limits are in map-source/README.md. The dashed Don is explicitly schematic.
- Fictional sites use a clearly labelled non-geographic margin index. Added nine root gateway candidates; these do not imply source-established travel distances. Scale remains unset.
- Opened original PNG, lossless WebP and actual-app normal-entry screenshot. Compression retained every RGB pixel (923443 → 551452 bytes). PNG, SVG and regenerated review fixture were byte-identical on a second run.
- Actual production app fixture QA passed normal root entry and the three Rotherwood plan checks, with no page errors. This fixes the previous empty root image on normal entry. Other gateway visibility is still incomplete because their child places remain unplaced.
- Current review fixture: 4/25 drawn maps, 19/142 placed locations, 11 gateway candidates; 123 locations unplaced. No full floor/navigation/playback approval. No final PWK.
- Next: complete Rowena’s raised rooms and seven-step transition, then remaining source-grounded layers and placements; finish artwork, custody/relationships/memberships/goals, cast/endpoints and release QA. Do not treat root-entry evidence as a release gate pass.

## 2026-10-30 Ashby geometry and reading-order correction

- Added two source-led plates: local town/woodland meadow and 2:1 rounded tournament enclosure. Read VII.7–14, IX.16–52, XII.35/41–43 and XIII.44 adjacent prose directly again. Both original and lossless compressed maps were opened. Exact compass of the meadow from town, Saxon gallery and borrowed pavilion remain explicitly unestablished; no travel scale assigned. Alicia’s gallery is near the eastern Prince’s gallery at IX.24, with its exact side reconstructed.
- Added source-reviewed ground-level frontages beneath the Saxon and neighbouring galleries. Corrected mounted John, De Bracy, Isaac and Rebecca from false upstairs positions, and kept John out of the melee and western award. Split the east-to-west award procession at XII.43. A targeted regression was deliberately made red by restoring John’s false gallery placement, then passed after restoring the fix.
- Added character-offset scene ranges. XII.35 now has five exact, contiguous source beats: Front-de-Bœuf’s fall; broken sword and axe transfer/Athelstane’s fall; northern withdrawal; Brian’s fall; surrender demand and warder. Full retained source still reconstructs byte-for-byte after documented normalization. Existing paragraph-start event IDs remain stable; internal starts use pN-cOFFSET.
- Corrected Wyvil’s erroneous first name to William from VII.13/IX.4. Delayed marshals until VII.13 and Rebecca’s first direct naming until VII.16. Split Alicia’s actual first direct placement at IX.24 from her earlier proposal. Recalled joust reactions IX.27–31 now have mentions and a recollection flag, with no presence or inventory snapshots.
- Added three weapon candidates and exact selected object-appearance bindings. The axe’s original, compressed WebP, actual 48px item image and decoded enlarged lightbox were inspected. Its head shape is an explicitly illustrative choice; no decorations or outcome. First item appearance is gated to its selected source beat. Custody is NOT compiled and this is not inventory release approval.
- Production browser fixture QA exercised root → Ashby → lists gateways, Next/Previous, lower ring, separate mounted/seated positions, eastern and western award, five intervention beats, borrowed pavilion, archery and axe visibility. Existing report/correction and Rotherwood checks were rerun. An initial combined-run assertion wrongly expected an unplaced scene to reset the previously selected map; QA now records the retained selection and uses the visible root tree button. No application change was warranted. The old diagnostic is archived as combined-map-selection-assumption.json. A lightbox screenshot taken before decode was replaced by a decoded-image capture.
- Current model: 508 narrative cuts / 522 total scenes, 1313 direct snapshots, 7/25 drawn maps, 45/150 placed locations, 105 unplaced locations, 16 gateway candidates, 54 initial items, 12 illustrations. Complete cast/endpoints, remaining 18 maps, floors, artwork, custody, memberships, relationships, goals, chronology and full playback remain OPEN. No final PWK.
- Deterministic regeneration matched manuscript, review fixture and both Ashby SVG bytes; qa/ashby-determinism.json. Full gate 1202 tests, 0 failures; catalogue remains 58 published worlds.

## 2026-10-30 woodland hermitage continuation

- Read XVI.8–33,46–58 and XX.61–75 directly for geometry and movement. Added source-led clearing and one-room hut plans; opened both final originals and lossless WebPs. Cleared a label overlap, omitted hidden stores/food/arms/harp, and removed the prematurely visible Copmanhurst proper name. Initial room fixtures alone are drawn. No invented stable or guest bedroom. Shape, proportions except the chapel footprint, compass and exact furniture positions are explicitly reconstructed.
- Separated the hermit answering inside a closed door from the traveller outside. A dedicated building gateway is revealed only after the room is described, rather than exposing the interior at the first knock. Source-specific regression failed with the old false outside placement and passed when restored.
- Actual production app fixture checks passed root → clearing → interior gateways, closed-door visibility, first entry, rewind that hides the not-yet-seen interior, and return to the fountain. Original/compressed/app images were opened; no page, console or network errors.
- Corrected XX.61–75: the two silent companions leave with the party; Wamba and Gurth are now outside instead of falsely left in the hut. The final exchange is an order to proceed, not a narrated journey. Removed the unsupported departure-path marker and kept the order at the last established fountain/clearing. Corrected the hidden-key source from XX.68 to XX.61.
- The two guard dogs at XVI.25 are an explicit remaining actor-coverage decision, separate from Fangs and Balder. Full retinue, silent cast, later room changes and inventories are not approved.
- Current partial fixture: 508 narrative scenes / 522 total, 1317 direct snapshots, 9/25 maps drawn, 51/151 locations placed, 100 unplaced, 17 candidate gateways, 54 item candidates and 12 selected illustrations. No final PWK.
- Source reconstruction still exact: 195107 words, 3138 paragraph blocks, 58 sections. Manuscript, fixture, both hermitage SVGs and both PNGs were byte-identical on repeat generation (qa/copmanhurst-determinism.json). Full library gate: 1204 tests, zero failures; source-focused tests: 20 passing; catalogue: 58 published worlds unchanged.
- Remaining local gates include the other 16 maps and 100 placements; complete floors, retinue/casts, all required illustrations, custody/memberships/relationships/goals, chronology, continuous playback and final authoritative packaging.


## Illustrated replacements: first two selected

- User reiterated2026-11-01: replace the maps with illustrations. Schematic
  plans are retained as source/geometry references, not counted as completed
  illustrated maps. Maps must remain navigable topographic illustrations and
  appropriate interior plans, rather than decorative perspective room scenes.
- Hall/cells generated individually from opened source-reference PNGs, with
  source-specific corrections. All originals, prompts and rejected variants
  retained. No painted names/labels: native app markers reveal in reading order.
- Hall v2 preserves T tables, dais/step, canopy, principal chairs/footstools,
  lower benches, two hearths and four folding corner doors. Cells v2 preserves
  three neighbours, two oak partitions, passage, three simple door leaves,
  centre window/stool and source bedding. Proportions and positions interpretive.
- Selected raster dimensions1564x1006, distinct from1400x900schematic references.
  Five place points manually recalibrated into the illustrated images' own
  native pixels; no blind retention of old coordinates. No map scale asserted.
- Lossless WebP/method6/Pillow12.3 preserves every decoded RGB pixel and size:
  hall2407205→1681170bytes; cells2616561→1808382bytes. Opened originals and WebPs.
- map-manifest.json archives prior schematic reviews and metadata under
  schematicReference. Active originals point to pinned illustrated v2files.
  Source SVG/PNG regeneration does not overwrite those selected originals.
- Actual gateway/cell/crossing/floor checks are being repeated with new art.
  Final flags remain false. Terrain-map illustration replacements remain open.

### Illustrated-map continuation, 2026-11-01

Four of30map replacements selected: Rotherwood grounds, hall, sleeping cells and raised apartment. Schematics retained as references. Originals, lossless WebP and actual app presentation opened. Native coordinates recalibrated; scoped parent gateways, postern crossing, ascent and rewind passed. Evidence: qa/map-navigation-review.json and map screenshots. Twenty-six map replacements and all final coordinate/floor/playback approval remain open; no release artifact exists.

Six of30map replacements are now selected. Hermitage clearing and hut were source-reviewed, losslessly compressed, recalibrated and opened in the actual app; closed-door concealment, entry, gateways, rewind and later return passed (qa/copmanhurst-navigation-review.json). Twenty-four still await illustrated replacement. Full library run:1237tests/23files passed; source reconstruction195107words/3138blocks/58sections passed. These checks do not approve the incomplete edition.

### Map replacement status:13/30selected

Ashby context/lists and all three lodging maps now have source-reviewed illustrated replacements, lossless compressed copies and opened actual-app evidence. Ashby root/child gateways, five-pavilion plan, separate detail insets, shared lodging entrance, floor changes, unknown-floor patient-room index and rewind passed. Two additional selected replacements cover the wooded approach and three unconnected castle-room details; their app run is pending at this entry. Seventeen maps still require illustrated replacements. New validate-map-artwork.py checks hashes, archived references, exact decoded RGB, native dimensions and embedded bytes; it does not replace visual/app review. Full release gates remain open.

### Map replacement27/30

All local site/interior maps now have selected illustrated replacements. Coningsburgh four maps and Saint Botolph original/compressed assets opened, native coordinates recalibrated, app run pending. Three remaining regional/context replacements:England,York,Donwoods. Templestowe source descent/floors/lists passed; screenshot exposed reader add/rename/delete floor controls. Companion app fix hides mutations in reading mode; two regressions,3101tests/261files,lint andproductionbuild passed. Fresh actual-reader floor/UI run pending. No final approval or release claim.

### Thirty illustrated map replacements selected

All30schematic map bases have selected distinct illustrated replacements, preserved originals and lossless WebP copies; original structural/geographic references remain archived. Every selected original and compressed asset opened. Native coordinates recalibrated. Final three regional/context illustrations correct seven standing stones, bank-side fallen fragment, simple York confluence and rounded Pennine uplands. These paintings are approximate source/geographic reconstructions, not quantitative terrain or medieval surveys. Current actual-app run for updated regional/later maps is pending; all final art/coordinate/gateway/floor/playback approval flags remain false. Reader floor-control fix263ba049passed3101tests/261files,lint,build; scoped floor screenshots show navigation without editing controls. No Ivanhoe artifact inlibrary and no remote action.
