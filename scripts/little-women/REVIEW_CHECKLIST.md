# Book example release checklist

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
Source edition: [edition and URL/reference]
Counts: [chapters] chapters, [events] events, [characters] characters, [locations] locations, [maps] maps
Automated validation: [commands and passing results]
Visual validation: [all inspected map layers and application pages]
Image validation: [number checked, broken links = 0, duplicates/intentional shared images]
Exceptions: [none, or rule IDs with written justification]
```

Do not use `COMPLETE` if any applicable box remains unchecked.

## Completed correction review — 21 October 2026

All 47 chapters and all 641 scene boundaries were independently reviewed against the retained source. FULL_REVIEW.json records every passage hash, physical cast, individual state and place, mentions, and chapter-specific review notes. It supersedes the earlier 73-case PRESENCE_AUDIT.json, retained as historical evidence.

The complete 186,395-word manuscript reconstructs exactly. The final edition has 92 characters, 2,058 physical snapshots, 44 locations, six maps, eight items, eight relationships, and eleven knowledge facts. Source review corrected indirect presence, transitions, identities, deaths, cross-room placement, item transfers, affiliations, and premature name revelations. Mutation tests reject incorrect cast, place, and death state.

Final application evidence in qa/presence-ui/results.json is bound to the shipped world hash: all 641 imported scenes, ten pages in both modes, five gateways at both depths, four timed playback transitions, 44 rendered marker positions, seven reading arrivals, Beth's deceased state, and Aunt March immediately before/after her reported death. All twenty page screenshots and six aligned map screenshots were visually inspected. Calendar has no custom calendar by design; relative editorial chronology is retained.

Feature decisions: external omniscient narration uses no invented limited POV. Separate building inset drawings do not represent overlapping floor groups, so floor-group transitions are not applicable. Minor buildings use overview markers rather than empty submaps. The unnamed departure port and geographic overview are schematic. Parallel accounts and explicit intervals use relative days without inventing a Gregorian year. All 92 characters and all 44 locations have distinct illustrations; the six maps, eight items, cover, portraits, and place art have retained visual/hash approval.

The actual app continuity checker reports zero errors and zero warnings. Its 26 keyword notices are individually reviewed in PROSE_MATCH_REVIEW.json: ambiguous names, common words, and quoted lyrics refer to different people. No fake physical cast or issue suppressions were added.

Example rules review: COMPLETE
Source edition: Project Gutenberg #514, Louisa May Alcott, Little Women, complete English public-domain text; https://www.gutenberg.org/ebooks/514
Counts: 47 chapters, 641 events, 92 characters, 44 locations, 6 maps
Automated validation: all retained source, world, presence, art, catalogue, release, and repository gate checks pass; final command results in QA_REPORT.md.
Visual validation: all six map layers; manuscript, calendar, characters, arc, relationships, items, maps, lore, factions, knowledge in reading and writing modes.
Image validation: 151 checked, including 92/92 character portraits and 44/44 location illustrations; broken links = 0, duplicate used image hashes = 0.
Exceptions: floor groups and custom calendar not used; overview-only minor locations and omniscient POV explained above.

## WebP delivery pilot — 21 October 2026

All 151 public images were visually reviewed and compared with their lossless originals after encoding. Character and item artwork uses WebP quality 85, location artwork uses quality 88, and maps use quality 90. Faces, places, objects, textures, map labels, routes, and room boundaries remain clear with no visible blocking, ringing, or colour shift at review scale. Every image exceeds 35 dB PSNR; the exact per-image size, quality, PSNR, hash, and approval are retained in `art-review.json`. Lossless artwork and map bases remain under the authoring scripts for deterministic regeneration, outside the public Library payload.
