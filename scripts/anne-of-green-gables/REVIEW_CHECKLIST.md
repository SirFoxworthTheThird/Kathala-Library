# Anne of Green Gables release checklist — 2026-10-11

This book-specific checklist tracks `docs/CHECKLIST.md`. An unchecked item keeps the edition out of release.

## Source and structure

- [x] Gutenberg #45 edition, source bytes, publication record, public-domain status, extraction boundaries, and excluded packaging are documented in `SOURCE.md`.
- [x] All 38 original chapters, 1,788 narrative paragraphs, and 101,964 narrative words reconstruct exactly under the documented newline normalization; retained SHA-256 is `21f8c6dc189876984a97ef2797584a6f6987ae997cd6b028740c5f13105ea0f4`.
- [x] Every scene cut has been reviewed at a paragraph boundary with its reason, location, present cast, knowledge, and item hand-offs audited on both sides.
- [x] Events have original titles and descriptions, justified chronology, tension 1–5, and nonnegative elapsed time.

## Characters and continuity

- [x] Every necessary character is modeled and later names, identities, relationships, knowledge, outcomes, and offstage changes are gated at their source reveal.
- [x] Every physically present event character has exactly one event-specific snapshot; mentioned or retrospective characters have none.
- [x] Character state, relationships, factions, goals, knowledge, items, and movement have been checked across all scenes.

## Maps and locations

- [x] The Prince Edward Island and populated Avonlea maps are genuine, legible maps with documented approximate or interpretive geography.
- [x] Every useful submap is populated and has exactly one correctly placed parent gateway.
- [x] Every marker, gateway, transition, and cross-layer playback movement has been checked visually in Kathala.

## Artwork

- [x] Distinct, mature, historically grounded world, character, item, and place illustrations are recorded with prompts and provenance.
- [x] Every final image has been opened and checked at useful size; hashes, references, dimensions, and broken links validate.
- [x] Maps are used only as maps and no unintended image bytes are duplicated.

## Worldbuilding and reading mode

- [x] Threads, motifs, lore, factions, knowledge, goals, items, routes, and relationships are complete where meaningful and never padded.
- [x] A blind reading-mode spoiler sweep has checked all standing descriptions and reveal transitions; the repository EX-405 sweep reports A0/B0/C0 for this book.
- [x] Dashboard, Book Cards/Page/Read, Characters, Maps, Calendar, Items, Relationships, Character Arc, Lore, Factions, Knowledge, Settings, Manuscript, and Structure have been visited in the latest development UI.

## Packaging and validation

- [x] The reproducible generator recreates the final `library/anne-of-green-gables.pwk` byte for byte in the single-copy layout.
- [x] The dedicated release validator, `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check` pass.
- [x] The downloadable PWK opens in reading mode; first and final reveals, the final sentence, maps, gateways, art, supporting pages, and browser console have been checked.
- [x] Concrete counts and all exceptions are recorded in `QA.md`.

No push, pull request, or merge is authorized by the current instruction.
