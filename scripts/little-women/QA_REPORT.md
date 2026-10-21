# Little Women final release evidence — 21 October 2026

All 47 chapters were independently source-reviewed, including every adjacent paragraph boundary. FULL_REVIEW.json pins all 641 scenes to source hashes and records cast-specific physical states, places, indirect mentions, and detailed chapter findings. The earlier 73-case audit and qa/ui screenshots are historical and are superseded by this complete review.

Source: Project Gutenberg #514, complete English Little Women by Louisa May Alcott. Retained source SHA-256: 36831477b339dbcd7e7206119d77e9e58b9727ef3c299d1a1dc4446e1db97850. Complete manuscript: two parts, 47 chapters, 3,815 paragraphs, 186,395 words. Final world: 641 scenes, 92 characters, 2,058 physical snapshots, 44 locations, six maps, eight items, eight relationships, eleven knowledge facts, and 151 distinct reviewed image assets. Illustration coverage is 92/92 characters and 44/44 locations.

PWK SHA-256: 7e9adb0fe7c1ea16b64cb95aab3131158f747ae9d079222fbfbea9061d9fc564. UTF-8 bytes: 3,459,612.

Corrections cover absent versus physically present characters, narrator-only passages, individual cross-room positions, Beth's death and later memories, Aunt March's reported death without a phantom snapshot, Sallie Gardiner/Moffat identity, omitted Rob Bhaer and minor witnesses, actual Christmas guidebooks, the saved lock of Jo's hair, piano movements, item ownership and destruction, affiliations, relationship starts, and spoiler-safe names. Major source intervals and parallel accounts are encoded as relative editorial days. Omniscient narration has no invented limited POV. Maps use converted Leaflet coordinates and reviewed labels; the unnamed Atlantic departure port remains schematic.

## Application validation

Kathala checkout: Kathala-anne-qa at 0c756cd5e0904519d56e402f42fd37dcea93de87, VITE_E2E=1 on localhost:5173. qa-presence-ui.mjs imports the real Library download through isolated Playwright and serves authoritative library files directly. It asserts the export did not change during the run. qa/presence-ui/results.json records the matching input hash and completion at 2026-10-21T20:30:03.639Z.

Passed: all 641 imported scene records; seven reading-mode arrivals; ten required pages in each mode (20 views); five gateways including both hierarchy depths; four actual timed playback transitions with previous-moment return; all six layers and 44 rendered marker anchors; early character/item spoiler checks; Beth visibly deceased; Aunt March Alive before and Deceased after her report; zero failed assets and zero relevant browser errors. All twenty page screenshots and six aligned map screenshots were visually inspected; retained contact sheets provide an overview. The calendar correctly shows the unconfigured-calendar view because the edition uses relative editorial dates.

qa-continuity.mjs runs the application's real continuity engine. qa/continuity.json has zero errors, zero warnings, and 26 prose keyword notices. PROSE_MATCH_REVIEW.json classifies each: Teddy/Laurie versus Teddy Bhaer, quoted Kate Kearney, different groups of girls/students, and common infant-name words. These are false positive name matches, not unresolved authoring defects; no suppressions or invented cast were introduced.

## Reproduce

Run node scripts/little-women/generate.mjs and npm run catalogue; both export and catalogue are byte-stable. Run validate-manuscript.mjs --release, validate-reviewed-scenes.mjs, validate-presence.mjs, validate-world.mjs, and validate-art.mjs in scripts/little-women, then npm run catalogue:check and npm run gate. The final repository gate passes 1,057 tests with zero failures. Regression tests also prove corrupted physical cast, places, and death states are rejected.

For browser checks start the app with VITE_E2E=1, then run node scripts/little-women/qa-presence-ui.mjs and node scripts/little-women/qa-continuity.mjs. KATHALA_APP_DIR and KATHALA_QA_URL select an alternate app checkout/server.

Example rules review: COMPLETE. Every applicable book checklist gate has retained evidence. No branch deletion is part of this release.

## Complete illustrated WebP delivery — 21 October 2026

The edition contains 151 public WebPs at their original dimensions: 92 distinct character portraits, 44 distinct location illustrations, eight item images, six maps, and one cover. Character and item artwork uses quality 85, location artwork uses quality 88, and maps use quality 90. The 421,269,455-byte lossless source set encodes to 43,360,994 bytes, an 89.7% reduction. Lossless sources remain under `scripts/little-women/` and reproduce the shipped files byte for byte.

Every compressed image was reviewed against its original. Per-image PSNR remains at or above 35 dB; all faces, locations, objects, map labels, routes, and architectural boundaries remained visually clean. Exact hashes are unique, and an additional perceptual duplicate scan found no near-identical reused illustration.

The final real-application run is bound to PWK SHA-256 `7e9adb0fe7c1ea16b64cb95aab3131158f747ae9d079222fbfbea9061d9fc564`. It loaded all 151 unique WebPs (43,360,994 unique bytes) across 2,227 browser requests while exercising all 641 imported scenes, 20 page views, five gateways, four playback transitions, six map layers, and 44 marker positions. There were zero failed assets and zero relevant browser errors. Updated character, page, and aligned-map screenshots were visually inspected after the run.
