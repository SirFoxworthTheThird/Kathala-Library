# Persuasion release evidence

Validated 12 October 2026.

| Measure | Result |
| --- | --- |
| Chapters / paragraphs / scenes | 24 / 1,010 / 115 |
| Narrative words | 83,232 |
| Character snapshots | 424 |
| Characters / locations / maps | 23 / 28 / 4 |
| Items / relationships / relationship snapshots | 6 / 6 / 7 |
| Factions / goals / facts / routes | 2 / 4 / 5 / 4 |
| Threads / motifs / Lore pages | 4 / 4 / 4 |
| Artwork | 64 distinct hashes: cover, 23 portraits, 28 places, 6 items, 2 factions, and 4 maps |
| PWK UTF-8 bytes | 1,000,028 |
| PWK SHA-256 | `5463b62b3e453fd6b31f9b448afbf3a85b6f11a761a4053c4ff457b7cc5ea08b` |

The southwest England, Lyme, and Bath maps use archived OpenTopoMap and OpenStreetMap tiles with visible attribution. Their pins use the same projection and bottom-origin grid. Kellynch and Uppercross are fictional and use an explicitly interpretive topographic plan. Full artwork and map sheets are in `qa/`; exact generation requests are in `art-prompts.json`; `ARTWORK_MANIFEST.json` binds all final files to SHA-256 hashes.

The development UI pass used Kathala commit `be946e60e1f451c7b0100d961ca29fcf38ae8d65` and the real Library Download action. It verified opening reading mode, the Chapter IV past-engagement reveal, all 115 scenes, Page/Read/Cards, Dashboard, Manuscript, Structure, ten supporting views, all four map layers, all three gateways, timed cross-layer playback, loaded artwork, the final sentence, and zero console or page errors. Evidence is in `qa/ui-results.json` and screenshots. No application code was modified.

Gates: the dedicated validator passes; `catalogue:check` reports 52 matching worlds; 14 test files and 899 tests pass; `gate` reports 899 tests with zero failures and unchanged baseline; `git diff --check` passes. Two generator runs are byte-identical. EX-405 is A3/B0/C0 after corrections; the A candidates are source-valid names in Chapter I’s family history and Chapter IV’s disclosed engagement, pinned to those scenes rather than exposed in early standing descriptions.

Reproduce with `render-assets.py`, `build-boundary-audit.mjs`, `generate.mjs`, `add-catalogue-entry.mjs`, `npm run catalogue`, both validators, `qa-ui.mjs`, `catalogue:check`, `npm test`, `npm run gate`, and `git diff --check`.

No push, pull request, or merge has been performed.
