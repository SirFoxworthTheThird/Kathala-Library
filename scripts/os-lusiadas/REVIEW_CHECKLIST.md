# Book example release checklist

## Os Lusíadas progress — 10–11 October 2026

Source-import gate complete in `manuscript-draft.pwk`: ten cantos, 1,102 stanzas, 8,816 verse lines, and 55,283 whitespace-delimited words. The cut ledger contains 367 stanza-boundary scenes with adjacent-verse audits and ten canto direct-presence ledgers. The final `library/os-lusiadas.pwk` generator passes exact manuscript reconstruction, scene-state, snapshot, map, and chronology checks: 563 distinct direct-presence statuses, five event clocks plus canto reading order, 68 locations on eight maps. A continuity pass moved Dinis’s, Fernando’s, and John I’s narrated deaths to report-gated facts without giving them a report-scene snapshot; Afonso I and Inês have dead states in their death scenes. All 166 distinct local artwork assets have been generated, opened, reviewed, and recorded with prompts and hashes: one world cover, eight maps, six items, 78 characters, five factions, and 68 places. The complete-art validator reports zero missing references and zero repeated file hashes. Final `npm run catalogue:check`, `npm test -- --maxWorkers=1` (844 tests), `npm run gate` (844 tests), and `git diff --check` passed on the 367-scene revision. The topographic revision regenerates a 1,379,347-byte PWK, SHA-256 `f24545ad646a538cf9c66d50937c7d6c0132e24401be3dc4bea2d3b144e2fca4`. Live Kathala inspection also succeeded. See `SOURCE.md`, `validate-book.mjs`, `BOUNDARY_REVIEW.md`, `CHRONOLOGY.md`, and `MAP_REVIEW.md` for evidence.

> [!CAUTION]
> This checklist is a release gate. Complete it for every new or substantially revised example. An unchecked applicable item means the example is not finished and must not be merged.

The 10 October live-UI attempt succeeded after the browser integration reconnected. The generated `library/os-lusiadas.pwk` was imported into the latest local Kathala development UI at `http://127.0.0.1:5173/` with reading mode on. Book Cards and Read, dashboard, characters, maps, calendar, items, relations, arc, lore, factions, knowledge, and settings rendered. At the beginning, all 78 character cards were gated; advancing into the first voyage scene revealed Gama, and advancing into the Olympian action revealed the gods. Immediately before stanza V.51 the headland figure remained unnamed; at V.51 Adamastor was shown. Knowledge revealed the Samorim title at VII.22. The Canto X final scene displayed `Sem aa dita de Achiles ter enueja.` and the next-moment control disabled. The final dashboard shows 77 character cards because the Island queen identity merges into Thetis at the poem's reveal; all 78 source records have direct-presence events. All eight map layers rendered, all four parent gateways opened, playback crossed layers, and the browser's error log was empty. Visible portraits and supporting-page images reported no broken loads. See `MAP_REVIEW.md` for map-specific observations.

Read and follow the [mandatory authoring rules](AUTHORING.md) before starting. Rule IDs below refer to that document. Start a book-specific copy of this checklist before enrichment. Mark an item “N/A” only with a written reason in the generator, pull request, or review notes.

## Source and structure

- [x] The complete source edition and all chapter titles were verified. (`EX-001`–`EX-002`)
- [x] Every chapter has all necessary events, without compression or filler. (`EX-003`) The 367 reviewed cuts preserve every stanza and change scenes at frame, speaker, location, or action transitions.
- [x] Timeline count and chronology are justified. (`EX-004`)
- [x] Tension, elapsed time, and calendar values are valid and editorial assumptions are documented. (`EX-005`–`EX-006`)
- [x] Copyrighted prose is not reproduced. Any public-domain prose in scene drafts has a verified edition, translator where applicable, public-domain status, and source documented in Lore and the catalogue notice; its passage order and coverage were validated. Structural summaries and metadata remain original writing. (`EX-007`)
- [x] The edition, publication and rights evidence, retained source boundaries, and every excluded packaging block are recorded. The complete retained narrative was copied before enrichment and reconstructs exactly under a documented normalization, with word count checked. (`EX-011`)
- [x] Adjacent stanza boundaries, event changes, locations, direct cast, and modeled item hand-offs have been audited across all cantos. (`EX-012`) See `BOUNDARY_REVIEW.md`, the ten scene-state ledgers, and the item placement sequence in `generate.mjs`.

## Characters and continuity

- [x] The meaningful cast and relationships are complete. (`EX-101`, `EX-107`) The direct-presence ledger supports 78 character records; relationship links cover the poem's enacted kin, court, voyage, and island ties.
- [x] Every event has exactly one snapshot per present character and none for absent characters. (`EX-102`)
- [x] Every snapshot has a unique, event-specific state and correct location/map. (`EX-103`–`EX-105`)
- [x] Deaths, injuries, knowledge, goals, inventory, relationships, and affiliations respect chronology. (`EX-106`) Snapshot, chronology, source-scene, and item-placement validators check the recorded states.
- [x] Offstage state changes appear when reported, without an absent-character snapshot; reading mode was checked immediately before and after each report. (`EX-108`) The Dinis, Fernando, and John I report scenes carry death facts and mentions, without physical-presence snapshots; the live character cards changed from living to deceased at III.98, IV.1, and IV.50 respectively. The direct Inês and Afonso death scenes carry dead snapshots.

## Maps and locations

- [x] Every map is a legible map rather than an unrelated illustration. (`EX-201`)
- [x] All necessary submaps exist, contain locations, and have exactly one valid parent gateway. (`EX-202`–`EX-204`)
- [x] Every location description is specific, place-focused, and spoiler-safe. (`EX-205`) The 68 descriptions were reviewed in `map-model.mjs`; names supplied by gated markers are absent from premature PNG labels.
- [x] Every marker on every map and submap was visually checked at a useful zoom in Kathala. (`EX-206`) Eight layers and their plotted site groups were inspected; numeric pixel bounds are validator checked.
- [x] Every gateway depth and map/floor transition was exercised. (`EX-207`) Lisbon, Mozambique coast, Calicut coast, and nested Calicut entered their linked maps through the location-panel action.
- [x] Playback was tested across layers, including first arrival and later movement. (`EX-208`) The map's play control advanced the layer with the moment and paused cleanly, including a return to Portugal and movement to Calicut.

## Images

- [x] Every final image was opened and its depicted subject was verified. (`EX-301`)
- [x] World, character, item, location, and map images match their entities and purposes. (`EX-302`, `EX-308`)
- [x] No map is reused as ordinary entity artwork. (`EX-303`)
- [x] Named characters and distinct items have distinct suitable illustrations. (`EX-304`)
- [x] Artwork matches the genre, avoids unwanted photographs/cartoon styles, and has no broken URLs. (`EX-305`–`EX-306`) The 166-file visual and hash audit passes; live portraits, cover, map art, and supporting-page images had zero broken image elements or console errors.
- [x] Sources, licences/public-domain status, and generated assets are recorded in Lore. (`EX-307`)
- [x] Every id points at a record the world contains — POV, cast, inventories, item references, scene locations, snapshot owners. (`EX-409`)
- [x] No non-collective item sits in two inventories at one scene; a kind of thing is marked `isCollective`. (`EX-410`) All scene inventories are empty; item placements carry handoffs.
- [x] Every enumerated field carries a value the application defines — scene status above all. (`EX-411`)

## Worldbuilding and reading mode

- [x] The world description is about the book, and its theme suits the genre. (`EX-401`, `EX-406`)
- [x] Threads, motifs, lore, factions, knowledge, goals, items, and other supporting data are complete where meaningful—not padded. (`EX-402`–`EX-403`) The UI rendered six items, five factions, six lore pages, and 17 knowledge facts at the final cursor. The maritime route is traced on the geographic ocean chart; straight marker-to-marker application routes were removed after they visibly crossed African land.
- [x] All references resolve and reading-mode visibility does not leak later spoilers. (`EX-404`–`EX-405`) The validator resolves references; the live early and named-identity reveal checks passed.

## Packaging and validation

- [x] The single downloadable `.pwk` is in `library/`; retired duplicate export trees were not recreated. (`EX-501`)
- [x] `.pwb` usage is necessary and correct, or no `.pwb` is included. (`EX-502`) No `.pwb` is included.
- [x] `library/index.json` has exact metadata, counts, filenames, world ID, and UTF-8 byte size. (`EX-503`)
- [x] The generator reproduces the shipped file, artwork references, and metadata byte for byte. (`EX-504`) The revised PWK is exactly 1,379,347 UTF-8 bytes, SHA-256 `f24545ad646a538cf9c66d50937c7d6c0132e24401be3dc4bea2d3b144e2fca4`; its catalogue count and all 166 artwork hashes pass their validators.
- [x] `npm test -- --run libraryCatalogue exampleQuality exampleCompat` passes. (`EX-505`) The complete `npm test -- --maxWorkers=1` suite passed all 844 tests, including the applicable catalogue and example-quality tests; no `exampleCompat` file exists in this checkout.
- [x] The Library PWK was opened in reading mode and every application page was visited. (`EX-506`) Imported the exact single-copy `library/os-lusiadas.pwk` that the catalogue offers; Book Cards/Read and all world navigation pages loaded.
- [x] No broken images, infinite loaders, unresolved references, or relevant console errors remain. (`EX-507`) Browser image elements inspected across character, map, and supporting pages; browser error log returned `[]` after playback and gateway navigation.
- [x] The handoff or pull request records counts and validation evidence. (`EX-508`) The completed statement below is the handoff record; remote actions remain separately gated by the user.
- [x] The book-specific checklist records completed and remaining work and any known test failures accurately; a completion claim is made only when every applicable gate has evidence. No known test failures remain.

## Required completion statement

Handoff statement (a pull request awaits separate user authorization):

```text
Example rules review: COMPLETE
Source edition: Luís de Camões, Os Lusíadas (Lisbon: António Gonçalves, 1572), Project Gutenberg eBook 27236, original Portuguese; full source and rights record in SOURCE.md
Counts: 10 chapters, 367 events, 78 character records (77 cards after the Island queen/Thetis identity reveal), 68 locations, 8 maps; 1,102 stanzas, 8,816 verse lines, 55,283 words
Automated validation: dedicated manuscript, boundary, scene-state, snapshot, chronology, map, artwork, and book validators pass; npm run catalogue:check passes for 49 worlds; npm test passes 844/844; npm run gate passes 844/844; git diff --check passes
Visual validation: eight map layers and four gateways in Kathala; Dashboard, Book Cards/Read/detail, Characters, Maps, Calendar, Items, Relations, Arc, Lore, Factions, Knowledge, Settings, final verse, report-scene reveals, and multi-layer playback checked
Image validation: 166 distinct assets checked, broken browser images = 0, duplicate file hashes = 0
Exceptions: none
```

Do not use `COMPLETE` if any applicable box remains unchecked.
