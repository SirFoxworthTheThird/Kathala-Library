# Persuasion release evidence

> Final local review, 12 October 2026. The historical evidence below describes
> a superseded PWK and is not release evidence for this revision. The corrected
> edition uses an explicit source-presence ledger, individual snapshot notes,
> and the boundary review in `BOUNDARY_AUDIT.json` and `SCENE_AUDIT.md`.

Final local evidence: the source reconstructs to 24 chapters, 1,010 paragraphs,
and 83,232 words. The edition has 130 scenes and 524 individual snapshots
across 29 locations; its PWK is 1,053,938 bytes, SHA-256
`bd9dc47b58b9f669558c2d6b996f1f63fba0dd580783c71933098c7a6be74f5e`.
The dedicated validators, catalogue check, 903 tests, gate, and diff check pass.
The fresh UI smoke run on this hash passed Library download, reading reveal,
layouts, supporting views, maps, gateways, one timed transition, final text,
image loading, and zero captured console errors. The app dev server emitted
React Flow node/edge type warnings. The UI smoke run samples reader flows; the
complete scene-boundary, source-presence, and location evidence is in the
source audit and dedicated validator.

The revised cuts address location or company changes in Chapters V–IX,
XI–XIII, XVIII–XX, and XXIII. The boundary audit now records each scene’s
narrative change, adjacent paragraphs, location and cast transitions, modeled
knowledge reveals, and material item hand-offs. Source review further corrected
the Crofts’ Chapter VI cottage visit, the naval conversation in Chapter VIII,
the visitors entering the Chapter IX cottage, the cast in Chapters XV, XVI,
and XVIII, and the Harville miniature cut in Chapter XXIII. The item layer contains three objects shown
in the source: the Baronetage, Wentworth’s letter, and Benwick’s miniature;
four previously placed objects without passage support were removed.

The opening world and character descriptions no longer disclose the Chapter IV
engagement, Louisa’s later match, or Mr Elliot’s hidden motive. His motive goal
begins where Mrs Smith explains it in Chapter XXI.

Current item evidence: Sir Walter handles the Baronetage in Chapter I,
Harville shows Anne Benwick’s miniature in Chapter XXIII (paragraphs 13–15),
and Wentworth leaves his letter in Chapter XXIII (paragraphs 39–44). The
working art manifest contains 62 distinct asset hashes.

## Historical evidence for the superseded PWK

Validated 12 October 2026 before the source-presence revalidation.

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
| PWK UTF-8 bytes | 1,000,023 |
| PWK SHA-256 | `447e63f8e49b9374db5000da930acc5df8543cfbdbefbac3624314fce2d74546` |

All four maps use distinct, purpose-made illustrated topographic bases at the same visual standard as the edition art. OpenTopoMap and OpenStreetMap references anchor the real geography; labels, routes, markers, borders, and compass roses are deterministic overlays on the bottom-origin grid. Kellynch and Uppercross remain explicitly interpretive because they are fictional. Full artwork and map sheets are in `qa/`; exact generation requests are in `art-prompts.json` and `map-art-prompts.json`; `ARTWORK_MANIFEST.json` binds all final files to SHA-256 hashes.

The development UI pass used Kathala commit `be946e60e1f451c7b0100d961ca29fcf38ae8d65` and the real Library Download action. It verified opening reading mode, the Chapter IV past-engagement reveal, all 115 scenes, Page/Read/Cards, Dashboard, Manuscript, Structure, ten supporting views, all four map layers, all three gateways, timed cross-layer playback, loaded artwork, the final sentence, and zero console or page errors. Evidence is in `qa/ui-results.json` and screenshots. No application code was modified.

Gates: the dedicated validator passes; `catalogue:check` reports 52 matching worlds; 14 test files and 899 tests pass; `gate` reports 899 tests with zero failures and unchanged baseline; `git diff --check` passes. Two generator runs are byte-identical. EX-405 is A3/B0/C0 after corrections; the A candidates are source-valid names in Chapter I’s family history and Chapter IV’s disclosed engagement, pinned to those scenes rather than exposed in early standing descriptions.

Reproduce with `render-assets.py`, `build-boundary-audit.mjs`, `generate.mjs`, `add-catalogue-entry.mjs`, `npm run catalogue`, both validators, `qa-ui.mjs`, `catalogue:check`, `npm test`, `npm run gate`, and `git diff --check`.

No push, pull request, or merge has been performed.
