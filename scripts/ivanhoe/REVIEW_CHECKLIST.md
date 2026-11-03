# Ivanhoe local release checklist

> [!CAUTION]
> This checklist is a release gate. Complete it for every new or substantially revised example. An unchecked applicable item means the example is not finished and must not be merged.

Read and follow the [mandatory authoring rules](../../docs/AUTHORING.md) before starting. Rule IDs below refer to that document. Start a book-specific copy of this checklist before enrichment. Mark an item “N/A” only with a written reason in the generator, pull request, or review notes.

## Source and structure

- [x] The complete source edition and all chapter titles were verified. (`EX-001`–`EX-002`)
- [x] Every chapter has all necessary events, without compression or filler. (`EX-003`)
- [x] Timeline count and chronology are justified. (`EX-004`)
- [x] Tension, elapsed time, and calendar values are valid and editorial assumptions are documented. (`EX-005`–`EX-006`)
- [x] Copyrighted prose is not reproduced. Any public-domain prose in scene drafts has a verified edition, translator where applicable, public-domain status, and source documented in Lore and the catalogue notice; its passage order and coverage were validated. Structural summaries and metadata remain original writing. (`EX-007`)
- [x] The edition, publication and rights evidence, retained source boundaries, and every excluded packaging block are recorded. The complete retained narrative was copied before enrichment and reconstructs exactly under a documented normalization, with word count checked. (`EX-011`)
- [x] Every scene cut was reviewed at its adjacent paragraphs for event change, location, cast, knowledge, and item hand-offs. (`EX-012`)

## Characters and continuity

- [x] The meaningful cast and relationships are complete. (`EX-101`, `EX-107`)
- [x] Every event has exactly one snapshot per present character and none for absent characters. (`EX-102`)
- [x] Every snapshot has a unique, event-specific state and correct location/map. (`EX-103`–`EX-105`)
- [x] Deaths, injuries, knowledge, goals, inventory, relationships, and affiliations respect chronology. (`EX-106`)
- [x] Offstage state changes appear when reported, without an absent-character snapshot; reading mode was checked immediately before and after the report. (`EX-108`)

## Maps and locations

- [x] Every map is a legible map rather than an unrelated illustration. (`EX-201`)
- [x] All necessary submaps exist, contain locations, and have exactly one valid parent gateway. (`EX-202`–`EX-204`)
- [x] Every location description is specific, place-focused, and spoiler-safe. (`EX-205`)
- [x] Every marker on every map and submap was visually checked at a useful zoom in Kathala. (`EX-206`)
- [x] Every gateway depth and map/floor transition was exercised. (`EX-207`)
- [x] Playback was tested across layers, including first arrival and later movement. (`EX-208`)

## Images

- [x] Every final image was opened and its depicted subject was verified. (`EX-301`)
- [x] World, character, item, location, and map images match their entities and purposes. (`EX-302`, `EX-308`)
- [x] No map is reused as ordinary entity artwork. (`EX-303`)
- [x] Named characters and distinct items have distinct suitable illustrations. (`EX-304`)
- [x] Artwork matches the genre, avoids unwanted photographs/cartoon styles, and has no broken URLs. (`EX-305`–`EX-306`)
- [x] Sources, licences/public-domain status, and generated assets are recorded in Lore. (`EX-307`)
- [x] Every id points at a record the world contains — POV, cast, inventories, item references, scene locations, snapshot owners. (`EX-409`)
- [x] No non-collective item sits in two inventories at one scene; a kind of thing is marked `isCollective`. (`EX-410`)
- [x] Every enumerated field carries a value the application defines — scene status above all. (`EX-411`)

## Worldbuilding and reading mode

- [x] The world description is about the book, and its theme suits the genre. (`EX-401`, `EX-406`)
- [x] Threads, motifs, lore, factions, knowledge, goals, items, routes, and other supporting data are complete where meaningful—not padded. (`EX-402`–`EX-403`)
- [x] All references resolve and reading-mode visibility does not leak later spoilers. (`EX-404`–`EX-405`)

## Packaging and validation

- [x] The single downloadable `.pwk` is in `library/`; retired duplicate export trees were not recreated. (`EX-501`)
- [x] `.pwb` usage is necessary and correct, or no `.pwb` is included. (`EX-502`)
- [x] `library/index.json` has exact metadata, counts, filenames, world ID, and UTF-8 byte size. (`EX-503`)
- [x] The committed generator reproduces the shipped file, artwork references, and metadata byte for byte. (`EX-504`)
- [x] `npm test -- --run libraryCatalogue exampleQuality exampleCompat` passes. (`EX-505`)
- [x] The Library download was opened in reading mode and every application page was visited. (`EX-506`)
- [x] No broken images, infinite loaders, unresolved references, or relevant console errors remain. (`EX-507`)
- [x] The handoff or pull request records counts and validation evidence. (`EX-508`)
- [x] The book-specific checklist records completed and remaining work and any known test failures accurately; a completion claim is made only when every applicable gate has evidence.

## Required completion statement

Example rules review: COMPLETE for local handoff.
Source edition: Walter Scott English original, Project Gutenberg 82,
https://www.gutenberg.org/cache/epub/82/pg82.txt.
Counts:58 sections (44 narrative chapters),537 events,78 character records,
171 locations,30 illustrated map layers.
Automated validation: seven release validators,951 catalogue/quality tests,
1278 full Library tests, catalogue check, release gate and diff checks pass.
Visual validation:30 map layers,166 mapped coordinates,26 gateways, all floors,
92 item states,334 illustrations, fifteen page contexts and537 playback events.
Image validation:334 URL assets checked; zero broken files. One intentional
shared portrait identifies the same yeoman/Locksley person.
Exceptions: no separate PWB; optional seven-beat structure unassigned; five
source-unlocated places remain unpinned. Remote publication not performed.

## Ivanhoe completion evidence

Every applicable local gate is complete. LOCAL_RELEASE.json records exact hashes,
counts, commands and scoped proof. All remote actions remain unauthorized.

Source/structure/cast: SOURCE_REVIEW.md, SOURCE_DECISIONS.md,
ANCILLARY_REVIEW.md, SOURCE_AUDIT.json, BOUNDARY_AUDIT.json,
CHRONOLOGY_REVIEW.md, INVENTORY_REVIEW.md and RELEASE_APPROVAL.json.
The complete195,107-word source was imported and reconstructed before enrichment.

Maps/art: all 304 ordinary images and 30 illustrated plans reviewed original,
compressed and in the app;166 coordinates,26 gateways and all three floor pairs
reviewed. qa/coordinate-manual-evidence-audit.json,
qa/gateway-manual-review.json, qa/custody-manual-evidence-audit.json and the
per-batch manual records preserve actual evidence scopes. All 334 URL files are
byte-identical to reviewed compressed assets. No blocked artwork remains.

Application/disclosure: all 537 continuous playback positions pass on final
bytes; all 15 page contexts reviewed, including the reader Structure guard and
full-data pages. Final catalogue download byte hash and stable zero-knowledge
opening are verified. See qa/packaged-download-manual.json and final browser runs.

Packaging: one authoritative library/ivanhoe.pwk,3,302,723 bytes. Two complete
generations reproduce it and the catalogue exactly. All seven dedicated release
validators pass;951 catalogue/quality tests,1278 full tests, catalogue check,
release gate and diff checks pass. Companion app3105 tests, lint/build and four
meaningful browser regressions pass.

N/A: no separate PWB is needed because images use repository-hosted URLs.
Optional modern seven-beat Structure remains unassigned rather than imposing
an unsupported literary interpretation. Five source-unlocated sites remain
unmapped by design; no whereabouts are invented. The yeoman/Locksley shared
portrait is one identity, not a duplicate illustration for distinct people.

Example rules review: COMPLETE for local handoff.
Source edition: https://www.gutenberg.org/cache/epub/82/pg82.txt
Counts:58 sections (44 narrative chapters),537 events,78 character records,
171 locations,30 illustrated map layers. Remote publication: not performed.
