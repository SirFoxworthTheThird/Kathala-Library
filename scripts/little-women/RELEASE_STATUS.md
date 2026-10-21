# Little Women release ready for remote main — 21 October 2026

All 47 chapters were independently source-reviewed, including every adjacent paragraph boundary. FULL_REVIEW.json pins all 641 scenes to source hashes and records cast-specific physical states, places, indirect mentions, and detailed chapter findings. The earlier 73-case audit and qa/ui screenshots are historical and are superseded by this complete review.

Source: Project Gutenberg #514, complete English Little Women by Louisa May Alcott. Retained source SHA-256: 36831477b339dbcd7e7206119d77e9e58b9727ef3c299d1a1dc4446e1db97850. Complete manuscript: two parts, 47 chapters, 3,815 paragraphs, 186,395 words. Final world: 641 scenes, 92 characters, 2,058 physical snapshots, 44 locations, six maps, eight items, eight relationships, eleven knowledge facts, and 31 distinct reviewed image assets.

PWK SHA-256: c998939e36952bf5101dc6d72abb168751c4734c81c3278e5104b7f72814eb90. UTF-8 bytes: 3,416,334.

Corrections cover absent versus physically present characters, narrator-only passages, individual cross-room positions, Beth's death and later memories, Aunt March's reported death without a phantom snapshot, Sallie Gardiner/Moffat identity, omitted Rob Bhaer and minor witnesses, actual Christmas guidebooks, the saved lock of Jo's hair, piano movements, item ownership and destruction, affiliations, relationship starts, and spoiler-safe names. Major source intervals and parallel accounts are encoded as relative editorial days. Omniscient narration has no invented limited POV. Maps use converted Leaflet coordinates and reviewed labels; the unnamed Atlantic departure port remains schematic.

## Application validation

Kathala checkout: Kathala-anne-qa at 0c756cd5e0904519d56e402f42fd37dcea93de87, VITE_E2E=1 on localhost:5173. qa-presence-ui.mjs imports the real Library download through isolated Playwright and serves authoritative library files directly. It asserts the export did not change during the run. qa/presence-ui/results.json records the matching input hash and completion at 2026-10-21T15:17:41.416Z.

Passed: all 641 imported scene records; seven reading-mode arrivals; ten required pages in each mode (20 views); five gateways including both hierarchy depths; four actual timed playback transitions with previous-moment return; all six layers and 44 rendered marker anchors; early character/item spoiler checks; Beth visibly deceased; Aunt March Alive before and Deceased after her report; zero failed assets and zero relevant browser errors. All twenty page screenshots and six aligned map screenshots were visually inspected; retained contact sheets provide an overview. The calendar correctly shows the unconfigured-calendar view because the edition uses relative editorial dates.

qa-continuity.mjs runs the application's real continuity engine. qa/continuity.json has zero errors, zero warnings, and 26 prose keyword notices. PROSE_MATCH_REVIEW.json classifies each: Teddy/Laurie versus Teddy Bhaer, quoted Kate Kearney, different groups of girls/students, and common infant-name words. These are false positive name matches, not unresolved authoring defects; no suppressions or invented cast were introduced.

## Reproduce

Run node scripts/little-women/generate.mjs and npm run catalogue; both export and catalogue are byte-stable. Run validate-manuscript.mjs --release, validate-reviewed-scenes.mjs, validate-presence.mjs, validate-world.mjs, and validate-art.mjs in scripts/little-women, then npm run catalogue:check and npm run gate. The final repository gate passes 1,057 tests with zero failures. Regression tests also prove corrupted physical cast, places, and death states are rejected.

For browser checks start the app with VITE_E2E=1, then run node scripts/little-women/qa-presence-ui.mjs and node scripts/little-women/qa-continuity.mjs. KATHALA_APP_DIR and KATHALA_QA_URL select an alternate app checkout/server.

Example rules review: COMPLETE. Every applicable book checklist gate has retained evidence. No branch deletion is part of this release.

## WebP delivery pilot — 21 October 2026

Little Women's 31 public images now use WebP at their original dimensions: quality 85 for artwork and quality 90 for maps. Referenced-image bytes fell from 83,739,887 to 8,853,774 (89.4% smaller); the complete public image folder fell from 106,259,073 to 8,853,774 bytes (91.7% smaller) after moving six unreferenced lossless map bases to the authoring sources. Exact hashes, byte counts, PSNR values, and side-by-side visual approvals are recorded in `art-review.json`.

The real Kathala run loaded all 31 WebPs and their exact 8,853,774 unique bytes while passing all 641 scene imports, 20 page views, five gateways, four playback transitions, six layers, and 44 marker checks. Zero assets failed and zero relevant browser errors were recorded. Final PWK SHA-256: `c998939e36952bf5101dc6d72abb168751c4734c81c3278e5104b7f72814eb90`.
