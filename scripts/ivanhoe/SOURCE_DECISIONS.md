# Source decisions

Walter Scott, *Ivanhoe: A Romance*, original English; no translator.
Project Gutenberg ebook 82, updated 4 June 2021, credits John P. Roberts, Jr.
and David Widger. Source: https://www.gutenberg.org/cache/epub/82/pg82.txt
Metadata/rights: https://www.gutenberg.org/ebooks/82 (public domain in USA).
Scott lived 1771–1832. The original novel appeared in December 1819 with an
1820 title page; see University of Edinburgh's Walter Scott archive:
https://www.walterscott.lib.ed.ac.uk/works/novels/ivanhoe.html

This Gutenberg edition includes later introductory material. It is not being
represented as a transcription of the first edition. Do not silently replace
its wording with a different edition, modern spelling or summaries.

## Retention

Retain EVERYTHING between Gutenberg's START and END markers except leading
and trailing blank padding. This includes the title/contents, illustration
placeholders, opening epigraph, introduction, dedicatory epistle, 44 chapters,
their epigraphs and verse, ten chapter-note sections, and numbered footnotes.
Exclude only the Gutenberg wrapper before START (metadata/licence notice),
the START/END marker lines, padding and the post-END Gutenberg licence.
Retain the original downloaded bytes in `source/pg82.txt.gz`; gzip is storage
compression only, not textual normalization. Keep attribution in final Lore
and catalogue notice. Do not use Gutenberg branding as endorsement.

The reconstruction changes only BOM/CRLF conventions and wrapper padding.
All internal blank lines, indentation, punctuation, accents, apparent typos,
underscores and source note numbers are preserved. Scene cuts must partition
the retained text by offsets; concatenation must reproduce it exactly.

## Parsing findings

The contents list indents its chapter entries; actual narrative headings do
not. Actual chapter headings omit terminal periods except XXXII. Endnote
headings also vary in terminal punctuation. Validate Roman numerals I–XLIV
in sequence and exact source section counts, rather than assuming punctuation.

## Reading-order decision requiring application review

The original introduction itself mentions later identities and outcomes.
Preserve this source text in source order, as requested. Its presence is not
permission to reveal those facts early through character descriptions,
relationships, portraits, aliases, inherited states or other metadata. Treat
prefaces/epistles and endnotes as commentary, not physical scenes with cast.
Do not create presence snapshots for people merely discussed in commentary.

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
## Torquilstone, XXI–XXXI (2026-11-01)

The principal entrance/drawbridge and postern outwork/crossing are distinct.
XXVII.55 supplies the single plank, XXIX.55 its destruction, and XXXI.14–20
the replacement raft’s construction, readiness and eventual launch. A ready
raft has not yet bridged the moat: the crossing remains `destroyed` until the
next source beat actually places the raft across it. Status notes distinguish
the source events using the application’s supported condition vocabulary.

XXIX.10–17 explicitly leaves Ivanhoe unable to reach the raised lattice while
Rebecca ascends two or three steps; his listening/questions do not move him
from the couch. XXIV.42–60 establishes distance between Rebecca and Brian,
with her at the brink and then an embrasure; his exact side of the opening is
not established at those beats. The later re-entry at XXIV.61 is not permission
to pin him beside her earlier. His location remains unknown during that exchange.

XXXI.20–37 separates De Bracy above the gate from the attacking pair below;
Brian joins him at the projecting stonework and Gurth springs onto the raft.
The proposed descent/sally is not actual movement until the following vaulted
passage encounter. A separate upper-defence detail clarifies the elevation
without inventing a floor number, stair or shortcut. The dungeon is below moat
level; the isolated turret/bartisan has no drawn link to another battlement.

The broad main-room plate is a set of separate room details, not one invented
castle footprint. Static images omit later occupancy, secret/escape findings
and the Harthill name before their source disclosures. The ground plate shows
outlines and crossing alignments; scene-specific location conditions carry
destruction, replacement and ruin. No intact roof or passability is inferred
from a persistent outline. Full presentation/zoom and continuous playback
remain release gates, distinct from the recorded selected-moment evidence.

## Country lodging, X and XXVIII (2026-10-30)

X.29 explicitly places the lodging at an unnamed host’s country house near
Ashby. It is neither Isaac’s permanent home nor a surveyed address in the town.
The upper room and the descent to the hall establish a floor group. The side
room, paved court and wicket are distinct lower-level endpoints. XXVIII’s
patient room is not explicitly the earlier upper room: its detail is separate,
with unknown floor and no invented connecting corridor.

X.65 establishes Rebecca’s unobserved departure only when Isaac discovers it.
Her destination is unknown until X.66. That report becomes reader knowledge,
not a direct physical snapshot. X.70 is split at the unique narrator witness
`Reuben, a`: the purse transfer precedes the escort, Rebecca is not carried
into the courtyard by an over-broad scene cast, and Gurth ends outside the wicket.
Every source character is retained by contiguous absolute-offset cuts.

Map descriptions exported to readers now use a separate first-encounter copy
registry. Detailed construction constraints remain authoring evidence; they
must not disclose later plot events through a map’s description. The lower
plan’s early-visible caption describes architecture rather than Gurth’s later
actions. A building’s shared entrance must be visible when a known upper floor
is first reached, without revealing every sibling floor.

## Inventory distinctions, 2026-11-01

VI86 is an actual paper delivery to the Palmer, and a promised choice of horse
and harness; no physical equipment handoff is narrated there. X48 and58 explicitly
report the steed restored to Isaac’s stable. The armour’s price is settled and
an acquittance issued at X60; no return of that armour is stated. Keep anonymous
appearances separate until reader identity disclosure.

XLIV70 offers an unopened casket. Worked silver, necklace and ear-jewels are
first disclosed at71. Rowena tenders the gift back at72; Rebecca urges her to
keep it at73. Do not invent a separately spoken acceptance or completed return.

Reports may establish that an absent former holder no longer has a particular
object. Knowledge tags `offstage-inventory-removed:<characterId>:<itemId>` clear
only that holding after their source witness; they do not move the person,
replace their direct status, establish a new bearer or add physical presence.
Later direct inventories supersede the report; rewind restores prior knowledge.
Compiled records and scoped app QA are not an all-book inventory release gate.

## First proper names, 2026-11-01

Higg gives his name at XXXVII.29, after producing the box at26. Early metadata
uses “The witness on crutches” and “The patient’s medicine box”; his withdrawal
into the crowd occurs at33, after the name/rebuke, rather than at confiscation.
Elgitha is addressed by name at III.27 after earlier unnamed handmaid dialogue.
Maurice first uses his full name at XV.20, where the pretended-rescue phase is
also disclosed; earlier metadata calls him De Bracy. Herman of Goodalricke is
introduced at XXXVII.18. The four preceptors in the earlier tableau do not yet
identify that fourth man to the reader. Earlier known names such as Ralph de
Vipont are allowed because the pavilions name them before their physical action.


## Reader-facing notes and source notice

The entire pinned Gutenberg header and post-end-marker distribution notice and
licence are reproduced in Lore, normalizing only line endings/BOM and outer
padding. This does not alter manuscript text or the retained reconstruction.
Reader notes use original writing and Roman chapter citations; engineering
anchors live in qa/thematic-source-evidence.json. Explicit identities, destroyed
paper, concealed gloves, contradicted death reports and casket contents retain
separate disclosure boundaries. Source events remain distinguishable from
reports and hypothetical outcomes.


## Provisional clock and illustrated map replacements

1194as the romance's setting was checked against the University of Edinburgh
Walter Scott Archive (https://www.walterscott.lib.ed.ac.uk/works/novels/ivanhoe.html).
1June and clock times are editorial choices consistent with the novel's summer
references, not claimed historical dates or Richard's real itinerary. Relative
source transitions and remaining temporal limits are in CHRONOLOGY_REVIEW.md;
calendar/pacing gate remains open. XXXV.16is separated as an about-hour ride,
without Nathan physically accompanying Isaac or a prematurely precise endpoint.

The user explicitly reiterated that schematic maps must be replaced with
illustrations. Preserve every schematic as a source/geometry reference. Use
source-grounded topographic site illustrations and legible illustrated floor
plans, not perspective decorative scenes. Native app labels remain gated;
painted map names and future-event labels are omitted. Select each illustrated
original only after source review, document its reconstructed geometry, and
recalibrate native-image coordinates. Do not count all30schematics as completed
illustrated maps. First hall and sleeping-cell replacements have scoped app
navigation evidence; all final approval flags remain false.

### Torquilstone illustrated continuation

Eighteen of30map replacements selected;12remain schematic. New source fix clears Urfried afterXXIV18and Brian afterXXIV61rather than retaining them in the turret; specific departure snapshots preserve unknown endpoints,54book tests and actual UI/rewind passed (qa/turret-departure-review.json). Snapshot count1380. Deep dungeon/turret/parapet illustrated originals, lossless copies and scoped app maps opened. Larger fortress/12separate-room atlas selected and recalibrated; refreshed Torquilstone app run pending at this entry. Architecture is a baseline, not live damage: moat passage condition comes from reached source location state; no permanently painted secondary bridge. Final release/artwork/presence/chronology/full-playback gates remain open.

### Thirty illustrated map replacements selected

All30schematic map bases have selected distinct illustrated replacements, preserved originals and lossless WebP copies; original structural/geographic references remain archived. Every selected original and compressed asset opened. Native coordinates recalibrated. Final three regional/context illustrations correct seven standing stones, bank-side fallen fragment, simple York confluence and rounded Pennine uplands. These paintings are approximate source/geographic reconstructions, not quantitative terrain or medieval surveys. Current actual-app run for updated regional/later maps is pending; all final art/coordinate/gateway/floor/playback approval flags remain false. Reader floor-control fix263ba049passed3101tests/261files,lint,build; scoped floor screenshots show navigation without editing controls. No Ivanhoe artifact inlibrary and no remote action.

### 2026-11-02: illustrated map presentation and 32 further character assets

All 30 selected illustrated maps were captured in the actual Maps UI and opened
individually (qa/all-illustrated-map-manual-review.json). The 536-scene forward
traversal completed on fixture c361e2f7d9e9ca54355ca57e2e2d1dd7824c02063da7e251adeae6fb5f5be58d;
subsequent artwork and the Winkelbrand correction change the fixture hash, so
this remains dated traversal evidence rather than current final playback.
Thirty-two additional character/anonymous-encounter assets have individually
reviewed originals, quality-preserving compressed images, first-appearance
avatars and full app lightboxes (qa/portrait-batches-01-08-manual-review.json).
The unseen voice deliberately has an empty bedside encounter illustration,
not an invented likeness. Blue Knight v1 is retained as rejected: v2 replaces
late articulated plates with mail and a leather glove while preserving secrecy.

XXXIV.13 is Fitzurse reporting an earlier order to Winkelbrand. Removed the
lieutenant from the physical cast and retained mentionedCharacterIds; no direct
state or known physical location is invented. New source regression and actual
Maps UI before/report/after checks passed (qa/reported-lieutenant-review.json).
Current direct-state count is 1,379. Library 1,239 tests / 23 files passed;
selected art integrity, 30-map integrity, exact source reconstruction and the
58-world published catalogue check passed. Final map coordinates/gateways,
all inherited state and custody, chronology/pacing, complete entity artwork,
final actual-reader QA and authoritative packaging remain OPEN. Nothing was
added to library/ and no remote mutation was performed.

### 2026-11-02: cord possession before the exchange

XXVI.3 explicitly describes Wamba wearing the knotted cord around his middle at the portal. Earlier inventory modelling introduced it only when exchanged to Cedric at XXVI.47. Added the earlier direct possession without moving the transfer before the completed exchange. Exact-source regression and browser before/after/rewind evidence pass; full lifecycle approval remains open.


### 2026-11-03: cast scope, departures and unknown possessions

The78 character records distinguish meaningful named or recurring actors,
concealed embodied identities, foreground individual functionaries, animals
whose actions matter and the four fuel attendants as an explicitly bounded
collective. Generic spectators, ceremonial staff, unnamed soldiers and household
backgrounds remain in the complete source prose without invented personal
identities. A person mentioned in a letter, recollection, rumour or proposal does
not receive a physical appearance merely to make a roster or portrait visible.

The named-speaking concordance has42 explicit decisions after the Wamba/Ambrose
passing-prisoner correction. The departure concordance has128 paragraph decisions.
Both retain their limited scopes: they supplement the complete chapter readings
and source-led scene records rather than claiming that regexes discovered all
presence. Endpoint corrections preserve unknown destinations instead of placing
travellers at intended future arrivals. Reports clear stale locations through
knowledge effects without absent-person snapshots. The completed transport of
Isaac and Rebecca to Nathan's house at XLIV.33 is a different case: the narrator
actually establishes that destination.

INVENTORY_REVIEW.md records the55-object selection and limits of its custody
chains. Gurth's freedom changes the collar's meaning; its requested physical
removal is not performed on the page. The later frock worn by the friar is not
asserted to be the identical borrowed garment without a narrated return.
Unreported repayments, disposals and horse identities are left unasserted.

Actual item-history review found that five offstage relinquishments were visible
in character inventory projections but omitted from the item's own history.
The companion app is being corrected to show explicit report rows, with source
wording, no invented carrier/destination, identity-safe matching and rewind gating.
Final inventory application approval remains open until the corrected captures
are reviewed. No release artifact or remote action is implied by these checks.


Final validation conventions: a source-unlocated snapshot retains null place/map;
a source-unlocated location retains null map and neutral0/0 storage sentinels,
which the app does not plot. The generic quality check validates these states
and rejects dangling IDs or an unlocated gateway rather than demanding invented
coordinates. The final delivery uses repository-hosted image URLs, matching Library conventions.
All334 compressed asset bytes are unchanged from their manual review; only the
blob storage changes. The earlier284MB embedded fixture hit the Vite raw-module
string limit. URL packaging resolves that limit, so the original test file-loading
mechanism and catalogue-cover assertions remain unchanged.
