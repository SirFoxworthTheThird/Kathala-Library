# The Undersong release checklist

This checklist tracks `docs/CHECKLIST.md`. Corrected after independent validation of d747fe9: see `REVALIDATION.md` and the superseding `UI_QA.md`.

## Source and structure

- [x] The creator-supplied UTF-8 manuscript, authorial title, eight chapters, twenty-six section headings, source hash, rights status, extraction boundaries, and normalization are documented in `SOURCE.md`.
- [x] The complete manuscript was imported before enrichment and reconstructs exactly under the documented normalization at 15,530 narrative words.
- [x] Every refined scene cut has a paragraph-boundary audit covering the event change, place, physical cast, knowledge, and item hand-offs.
- [x] Events, chronology, tension, elapsed time, and calendar positions are reviewed.

## Characters and continuity

- [x] Meaningful cast, relationships, state, goals, knowledge, items, and factions are complete.
- [x] Every event has exactly one event-specific snapshot per physically present character and none for mentioned or retrospective characters.
- [x] Names, identities, disappearances, deaths, and outcomes are gated at their textual reveal.

## Maps and locations

- [x] The regional coast, Hollin Staithe, and Saltwick drift use distinct mature illustrated topographic maps.
- [x] All submaps, gateways, locations, routes, bottom-origin marker coordinates, and playback transitions are visually checked.

## Artwork

- [x] Distinct cover, character, item, place, faction, and map artwork is generated, inspected, and recorded with exact prompts and provenance.
- [x] Final assets use the Library single-copy layout with valid references, dimensions, hashes, and no unintended duplicate bytes.

## Worldbuilding and reading mode

- [x] Threads, motifs, Lore, factions, goals, knowledge, items, routes, and relationships are complete where meaningful.
- [x] A blind spoiler sweep verifies standing descriptions and every gated identity or outcome.

## Packaging and validation

- [x] The reproducible generator and dedicated book validator recreate and verify the shipped PWK.
- [x] Catalogue check, repository tests, gate, and `git diff --check` pass.
- [x] The downloadable PWK is checked in the latest Kathala development UI across reading reveals, all Book layouts and supporting views, maps, gateways, playback, images, final prose, and console.

No push, pull request, or merge is authorized by the current instruction.
