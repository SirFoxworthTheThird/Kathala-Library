# The Cold Choir — release checklist

Status: complete locally. Remote publication remains separately gated.

## Source and boundaries

- [x] Creator-supplied source archived byte for byte with hash and rights record.
- [x] All 21 chapters and 44 authorial sections imported before enrichment.
- [x] Exact normalized reconstruction passes at 48,573 narrative words.
- [x] Every internal cut is audited at a paragraph boundary in
  `SCENE_BOUNDARY_AUDIT.json`: 44 sections and 70 scenes.
- [x] The embedded Quiet action in The Broadcast remains on the Quiet timeline
  and returns to the Compact frame without flattening the two dates.

## World model

- [x] Three historical strands remain separate timelines and use documented
  source-relative day positions with nonnegative elapsed time.
- [x] All confirmed presence defects from the repeat review are fixed and have
  regression coverage.
- [x] Every physically present character has exactly one reviewed, original
  event-specific snapshot; referenced and recounted people have none: 163
  snapshots across 70 scenes.
- [x] Relationships, factions, goals, knowledge, motifs, scene-specific item
  custody, and routes are populated and spoiler gated.
- [x] Ama is physically present only in Berth Twelve and is revealed by name at
  Row Thirty-One.

## Maps and artwork

- [x] Four mature plates cover the Mercy, Compact, Reach, and the circular
  sleeper drum beneath Ninefold.
- [x] The buried shaft is the single gateway from the Reach to the nested
  sleeper-hold map; 33 bottom-origin marker positions are in bounds.
- [x] Distinct mature artwork is present for the world, 21 characters, 9 items,
  33 places, 6 factions, and 4 maps.
- [x] `ARTWORK_MANIFEST.json` records hashes, dimensions, inspection decisions,
  exact prompts and output IDs for the five corrective assets, and explicitly
  labels older normalized briefs or output IDs that were not retained.

## Validation and application review

- [x] Dedicated manuscript and book validators pass and reject a deliberate
  scene-text mutation.
- [x] PWK regeneration is byte reproducible.
- [x] `npm run catalogue:check` passes for 54 worlds.
- [x] `npm test` passes: 17 files and 947 tests.
- [x] `npm run gate` passes: 947 tests, 0 failing, 0 expected failures.
- [x] `git diff --check` passes.
- [x] Kathala development commit `e920677e47ad79ea110c37855f0e0e05749e52e2`
  passes download, reading reveals, three timeline Book views in Cards and Read,
  ten supporting views, four maps, one gateway, eight playback transitions,
  all loaded images, the final line, and a clean console.
- [x] Final package evidence: 21 chapters, 44 sections, 70 scenes, 48,573 words,
  21 characters, 163 snapshots, 33 locations, 4 maps, 9 items, 74 artwork
  assets; 522,778 bytes; SHA-256
  `fe50eb724f2182c8a9f6aa08ea0bd20dbeeaaf39e6c538bbf94884563b236275`.
