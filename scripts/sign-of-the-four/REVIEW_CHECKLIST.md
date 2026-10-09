# Book example release checklist

## The Sign of the Four — review evidence, 9 October 2026

- Edition and boundaries: `SOURCE.md`; Gutenberg #2097, SHA-256 `4cdea89cf6cd2567a556d0e6901edb89949dd79e200dbaf4ced4cabf1d5d2c26`. The retained 12 chapters reconstruct in order to 43,002 words; `BOUNDARY_REVIEW.md` records all 87 paragraph cuts.
- Continuity: `validate.mjs --release` checks 87 distinct event/scene pairs, 281 unique present-character snapshots, calendar order, elapsed time, tension, dead-state monotonicity, references, routes, image hashes, and reveal gates. The 1888 calendar includes leap day; conflicting source time cues are explained in Lore.
- Maps: six layers comprise London, Baker Street, three aligned Pondicherry Lodge levels, and the Thames. The Lodge images share a 1536×1024 canvas, house footprint and south gate. The ground, upper passage, eastern chamber and roof hatch markers were compared in Kathala at the same zoom; the two revised upper/roof images and exact bottom-origin marker positions are recorded in `ARTWORK_MANIFEST.md`. Three parent gateways were opened in the UI; the other two Lodge levels are reached through the floor switcher. Playback traversed Thames → London → Baker Street without console errors.
- Reading mode: the old sailor merges into Holmes after unmasking; the Aurora accomplice is masked before Small names Tonga and shown as Tonga afterward. Jacobson’s Yard, the Aurora and Vauxhall landing acquire source-timed location states. Watson’s invented private room remains hidden in reading mode and was inspected with reading mode off.
- Current mainline rule review: the newly added `EX-405` name and identity guidance was checked against the one-record Tonga name change and the old-sailor reveal. Lore was edited to address the reader directly under `EX-010`, without references to generator-only records or files.
- UI: the downloadable PWK was opened from the Library card in the latest development app checkout. Dashboard, Book Narrative/Chronological/Cards/Read, Characters, Maps, Calendar, Items, Relations, Arc, Lore, Factions, Knowledge, and Settings were inspected. The current Book views provide the former Timeline, Manuscript, Structure, and Corkboard functions. `qa-ui.mjs` and screenshots under `qa/` record the result; no broken images or console/page errors remained.
- Images: 67 distinct generated assets were inspected; all paths exist, hashes are unique, map artwork is separate from ordinary location artwork, and `ARTWORK_MANIFEST.md` records the prompts or edit briefs and corrections. The 26 place markers were reviewed across all maps, including the one intentionally unrevealed invented room in editor mode.
- Packaging: one PWK in the current `library/` layout. EX-502 is N/A: no PWB is included or needed. `library/index.json` records the exact UTF-8 byte length. The book-specific generator is reproducible and no obsolete duplicate export directory was created.
- Validation: `node scripts/sign-of-the-four/validate.mjs --release`, `npm run catalogue:check`, `npm test` (828 passed after integration with current main), `npm run gate` (828 tests, 0 failures), and `git diff --check` passed. The app checkout passed `npx tsc -b --pretty false`; its gateway zoom fix was exercised by the browser QA.

> [!CAUTION]
> This checklist is a release gate. Complete it for every new or substantially revised example. An unchecked applicable item means the example is not finished and must not be merged.

Read and follow the [mandatory authoring rules](AUTHORING.md) before starting. Rule IDs below refer to that document. Start a book-specific copy of this checklist before enrichment. Mark an item “N/A” only with a written reason in the generator, pull request, or review notes.

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

Use this statement in the pull request or handoff and replace every bracketed value:

```text
Example rules review: COMPLETE
Source edition: Arthur Conan Doyle, The Sign of the Four (1890), Project Gutenberg #2097 English UTF-8 text; https://www.gutenberg.org/ebooks/2097
Counts: 12 chapters, 87 events and scenes, 43,002 words, 25 characters, 281 character snapshots, 26 locations, 6 map layers
Automated validation: book validator 0 errors; catalogue:check passed; npm test 828/828; gate 828 tests, 0 failures; git diff --check passed; application TypeScript build passed
Visual validation: Library download, all named application views, six map layers including three aligned Lodge levels, three parent gateways, playback across Thames/London/Baker, before/after name reveals, final manuscript scene, and all place markers
Image validation: 67 checked, broken links 0, duplicate hashes 0, intentional shared images 0
Exceptions: EX-502 N/A because this edition contains no PWB; current Book views subsume the former separate Timeline, Manuscript, Structure, and Corkboard screens
```

Do not use `COMPLETE` if any applicable box remains unchecked.
