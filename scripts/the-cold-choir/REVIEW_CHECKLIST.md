# The Cold Choir — release checklist

Status: COMPLETE LOCALLY. The finished edition is committed only after every gate below is green. No push, PR, or merge is authorized.

## Source and boundaries

- [x] Creator-supplied source archived byte for byte with hash and rights record.
- [x] All 21 chapters and 44 authorial sections imported before enrichment.
- [x] Exact normalized manuscript reconstruction passes at 48,573 narrative words.
- [x] Every internal scene cut audited at a paragraph boundary with opening, closing, location, cast, knowledge, and custody checks (`SCENE_BOUNDARY_AUDIT.json`: 44 sections, 62 scenes).

## World model

- [x] Three eras remain separate timelines; inherited Key, ledger, Roll, Names, recorder, drawings, card, and letter express cross-era connections without flattening chronology.
- [x] Events, ordinal calendar positions, nonnegative elapsed time, tension, descriptions, cast, and mentions are reviewed against the prose. Timeline offsets anchor 1 BL, 310 AL, and 742 AL; unstated elapsed days remain zero.
- [x] Every physically present character has exactly one source-specific snapshot; mentioned and recounted people have none (143 snapshots across 62 scenes).
- [x] Relationships, factions, goals, knowledge, motifs, scene-specific item custody, and routes are complete and spoiler gated. Ama is present and revealed only in the final scene.

## Maps and artwork

- [x] Three initial mature navigational plates generated for the Mercy, Compact, and Reach.
- [x] Three independent era maps are appropriate; nested submaps and gateways are not applicable. All 29 bottom-origin markers, map switching, and four cross-era playback transitions are reviewed in Kathala.
- [x] Distinct mature artwork is generated and inspected for the world, 21 characters, 9 items, 29 places, 6 factions, and 3 maps.
- [x] Production prompts, corrections, generated-output provenance where recorded, final hashes, dimensions, and visual decisions are recorded in `ARTWORK_MANIFEST.json` (69 assets).

## Validation and application review

- [x] Dedicated book validator passes and rejects a deliberate scene-text mutation.
- [x] PWK regeneration is byte reproducible across two consecutive builds.
- [x] `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check` pass (54 worlds; 17 files; 946 tests; 0 gate failures).
- [x] Latest PlotWeave/Kathala development UI at app commit `37aa07e881d853e650e9c1d63da6a70d0c7485ec` checks download, sequential reading reveal, all three timeline manuscripts in Draft and Reading views, ten supporting views, maps, playback, artwork, final prose, and browser console.
- [x] Final evidence: 21 chapters, 44 authorial sections, 62 scenes, 48,573 words, 21 characters, 143 snapshots, 29 locations, 3 maps, 9 items, 69 artwork assets; 504,030 bytes; SHA-256 `921f8ece45a80d277a2088720489a7ee62e98637f2c2709f2bb9b10a01dbce12`. UI evidence is in `qa/ui-results.json` and screenshots.
