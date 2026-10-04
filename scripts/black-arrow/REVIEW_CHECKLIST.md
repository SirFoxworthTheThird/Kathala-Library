# The Black Arrow release checklist — 2026-10-04

This records the applicable items in `docs/CHECKLIST.md` against the current single-copy Library layout. An unchecked item keeps the edition out of release.

## Source and structure

- [x] Gutenberg #848 edition, publication record, public-domain status, and extraction boundaries are documented in `SOURCE.md`.
- [x] All 33 retained sections and their headings reconstruct exactly from 154 scenes, 79,527 words.
- [x] Events have reviewed paragraph boundaries, titles, descriptions, places, tension, chronological positions, and nonnegative elapsed time.
- [x] Reviewed the 154 scene cuts, titles, descriptions, and casts against the retained source sections, with a named-presence scan and closer checks on long scenes and ambiguous identities. The review added Tom and Lady Brackley where they physically appear, kept offstage mentions out of the cast, and removed a premature Matcham clue.

## Characters and continuity

- [x] The validator enforces one unique snapshot for every declared event cast member, with none outside the declared cast.
- [x] Each of the 418 snapshots has an authored event-specific note and the event's location and map.
- [x] Known death transitions, item ownership spans, references, and relationship/faction/goal ordering pass the dedicated validator.
- [x] Reviewed all 418 authored snapshot notes, death transitions, injury wording, item spans, faction memberships, goals, relationship changes, knowledge facts, and reveal events against their scenes. Tom’s reported offstage death is carried as gated knowledge and a derived reading state, with no absent-character snapshot.

## Maps and locations

- [x] Nine separate illustrated cartographic maps, approximate geography, and invented floorplans are documented in `MAP_ARTWORK.md`.
- [x] Each of eight populated submaps has exactly one parent gateway; marker bounds and routes validate.
- [x] All nine map layers, 45 marker panels, and eight parent gateways were exercised in Kathala with no broken marker art or console errors.
- [x] Playback crossed the main map to Holywood Abbey and Shoreby to the Good Hope without console errors.
- [x] Additional playback crossed into the Moat House, Sir Daniel’s Shoreby house, and Shoreby Abbey, with scene titles and map layers aligned and no console errors.
- [x] Reviewed all 45 place descriptions and marker positions in the five browser marker sheets (`qa/marker-gallery/01.png`–`05.png`). Removed premature outcome details from the Holywood, Good Hope, and Shoreby house/abbey descriptions; approximate geography and invented interiors remain labelled as such.

## Artwork

- [x] All 93 assets were generated separately, with prompts and provenance in the artwork manifests; nine are maps used only as maps.
- [x] All nine maps were inspected individually; character and location contact sheets and item still lifes were reviewed.
- [x] The final reading cursor loads 32 portraits and six item images; all 45 location art panels and nine map layers load in Kathala.
- [x] Inspect all 93 final assets at useful size in the browser QA gallery (`qa/art-gallery/01.png`–`11.png`) and verify their entity images load in Kathala. No wrong subject, lettering, modern object, or accidental reuse was found.

## Worldbuilding and reading mode

- [x] The edition includes five plot threads, four motifs, seven lore pages, four factions, 24 memberships, ten knowledge facts, 23 knowledge reveals, eight goals, six items, 17 item placements, and four routes.
- [x] Reading-mode UI visits Dashboard, Timeline, Characters, Maps, Calendar, Items, Relationships, Character Arc, Lore, Factions, Knowledge, and Settings; editor mode visits Manuscript, Corkboard, and Structure.
- [x] Initial reading state hides later characters and items; final cursor reveals all 32 characters. The validator checks reference and reveal-event order.
- [x] Reviewed all 25 relationship definitions and changes, ten knowledge facts, and seven lore pages against their source scenes. Moved later calendar facts behind the Shoreby and conclusion events, removed a premature wedding detail from the Alicia–Hamley relationship, and recorded Tom’s reported death without an absent-character snapshot.

## Packaging and validation

- [x] The generator reproduces the PWK byte for byte, and `library/index.json` has its exact UTF-8 size.
- [x] `node scripts/black-arrow/validate.mjs --release`, `npm run catalogue:check`, `npm test` (805/805), `npm run gate`, and `git diff --check` pass in the Library.
- [x] The downloadable PWK opens in the current development app with 154/154 scenes and 79,527 words; browser console is clear in the final page and marker passes.
- [x] The focused app map fixes pass `npm run build` and the gateway/playback browser test.
- [x] All applicable editorial and visual items above are complete; the required completion statement and the single-copy layout exception are recorded in `RELEASE_STATUS.md`.

**N/A:** The older checklist's `example/` and `public/library/` synchronized-copy requirement does not apply to the current single-copy `library/` repository layout. No `.pwb` is included. No commit, push, PR, or merge is authorized.

The separate application suite previously had 2,800 passing tests and three unrelated failures in shipped books/assets. This is recorded as an external limitation, not a passing gate for the application.
