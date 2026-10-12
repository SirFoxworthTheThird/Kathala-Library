# Anne of Green Gables: corrected release evidence

Validated on 12 October 2026. The seven failed findings in `REVALIDATION.md` are resolved. This record replaces the original completion claims.

## Text and model

| Measure | Final result |
| --- | --- |
| Original chapters / retained paragraphs | 38 / 1,788 |
| Scenes / character snapshots | 203 / 527 |
| Characters / locations / maps | 33 / 31 / 4 |
| Narrative words | 101,964 |
| Items / relationships / relationship snapshots | 10 / 8 / 14 |
| Factions / goals / knowledge facts / routes | 3 / 5 / 7 / 5 |
| Threads / motifs / Lore pages | 4 / 4 / 4 |
| Artwork | 82 distinct assets: cover, 33 portraits, 31 places, 10 items, 3 factions, 4 maps |
| Internal scene boundaries | 165, with adjacent paragraphs and original-paragraph hashes |
| PWK UTF-8 bytes | 1,282,788 |
| PWK SHA-256 | `d486a50337adda6f37c74979129d25f6c9d6ca31bc61f0987da41a2e9abcce87` |

The archived source remains 606,693 bytes, SHA-256 `89a5e9fb2e0bb44562a969785385366f94e1da736aebee7d9cdf459eb0b5f9f6`. The reconstructed retained text remains SHA-256 `21f8c6dc189876984a97ef2797584a6f6987ae997cd6b028740c5f13105ea0f4`. Every paragraph and chapter reconstructs exactly under `SOURCE.md` normalization. The correction adds no source text and removes none.

`scene-model.mjs` is the manually authored source review: individual action, physical cast, place, tension and per-person notes for each paragraph range. `validate-model.mjs` compares the export against that review; it does not claim to infer physical presence from prose automatically. `SCENE_AUDIT.md` and `boundary-review.json` expose the review for inspection. The audit independently verifies adjacent source text, original-paragraph hashes and complete retained-cut coverage.

Chapter 36 separates posted results, commencement, the return home, the health discussion and Matthew's outdoor reassurance. Gilbert holds the medal at Queen's. Diana is home, never in the Academy. The scholarship artwork is a pinned results sheet, replacing an unsupported sealed letter. Anne's examination letter has only its writer present. The Exhibition includes the narrator's quotation of Anne's later report without inventing a trip home and back to town. Mrs. Thomas, Mrs. Hammond and Tillie Boulter are reported characters with no presence snapshots.

The collapse note gives no death outcome. Martin’s summons is at Orchard Slope, where Rachel is visiting; Mr. and Mrs. Barry join the examination and mourning scenes. A separate parlour scene records Anne bringing flowers to Matthew’s coffin. Death remains unconfirmed at Matthew's initial collapse and is revealed when Rachel checks his heart. Relationships have specific changes; the household artwork is gated until Anne learns she may stay. Gilbert's school offer is learned when Rachel reports it. `CHRONOLOGY.md` documents five editorial years, day 152 to 2010.95, with no invented historical start year.

## Geography and art

Coastline, six island markers and three island roads use one latitude-corrected projection. Independent land-mask checks pass for all pins and route segments, and reject the original offshore pins. The local maps are explicitly interpretive: no surveyed elevations, exact addresses or historical road alignments are claimed. There are 15 Avonlea markers, six house/grounds markers and four city markers. The farmyard is outside the house; upstairs rooms have a labelled inset.

All final illustrations and full-size maps were inspected. Contact sheets, before/after comparisons, and rendered Kathala map screenshots are in `qa/`. `art-review.json` binds acceptance to the inspected image SHA-256; changing image bytes invalidates acceptance. `art-prompts.json` records 78 exact entity-art generation prompts. `map-art-prompts.json` records the four exact ImageGen topographic-base requests, output identities, corrections, and inspections; untouched bases are archived under `map-art-source/`. `render-maps.py` deterministically adds verified geography, routes, labels, frame, compass, and notes. Reader-facing Lore and the catalogue identify generated art and map sources. There are no duplicate asset hashes.

## Development UI

Application: remote `development` commit `0c756cd5e0904519d56e402f42fd37dcea93de87`, fetched for this map review; a separate QA checkout runs at port 5175. No application code was modified. The automated browser uses an isolated Chrome profile and serves this branch's Library files through a request interceptor, then uses the application's actual Library Download flow. It does not alter the user's existing imported world.

`qa-ui.mjs` verifies:

- Opening reading mode: one reached scene, two met characters. Final reading cursor is reached by the UI's chapter-38 moment button and Read ahead confirmation: all 203 scenes, 30 met characters, three reported-only characters hidden.
- Read and Cards buttons are selected and their real prose/headings render. Page is selected after turning reading mode off; the editable document contains source prose and the final scene. This checks rendered layouts, not merely layout URLs.
- Characters, Maps, Calendar, Items, Relations, Arc, Lore, Factions, Knowledge and Settings; also Dashboard, Manuscript and Structure.
- All four populated map layers, all three parent gateways, and nine distinct directed layer-transition cases through actual timed Play/Pause controls. Playback fixtures set only each starting position and speed; the timer advances the event and map, which are both asserted.
- Reading-mode transitions for the girl's name, Matthew's Alive/Deceased state immediately before and after Rachel's examination, and Gilbert's offstage school offer immediately before and after Rachel's report.
- Displayed images load, the original final sentence renders, and browser console/page errors are zero.

`qa/ui-results.json` records the tested transitions and exact app revision. Screenshots include all maps, all Book layouts, final reading text and Matthew's before/after states.

## Release gates

- Exact manuscript, complete boundary audit, state validator and dedicated book validator pass.
- `npm run catalogue:check`: all 52 worlds match, including exact Anne UTF-8 size.
- `npm test`: 15 files, 903 tests pass.
- `npm run gate`: 903 tests, zero failures; baseline unchanged.
- `git diff --check`: clean.
- Two generator runs produce identical PWK bytes and SHA-256.
- EX-405 candidate sweep: A2/B0/C0. Both A candidates are Mrs. Spencer's name in early snapshot notes. The original text names her in Chapters 1 and 2 before her physical entrance in Chapter 6; those references are source-supported mentions, with no early presence snapshot. This manual disposition replaces the earlier incorrect A0 claim.

## Reproduce

From repository root:

```powershell
python scripts/anne-of-green-gables/map-geometry.py
python scripts/anne-of-green-gables/render-maps.py
node scripts/anne-of-green-gables/recover-art-prompts.mjs
python scripts/anne-of-green-gables/build-artwork-manifest.py
node scripts/anne-of-green-gables/build-boundary-review.mjs
node scripts/anne-of-green-gables/import-manuscript.mjs
node scripts/anne-of-green-gables/generate.mjs
node scripts/anne-of-green-gables/add-catalogue-entry.mjs
npm run catalogue
node scripts/anne-of-green-gables/validate-manuscript.mjs
node scripts/anne-of-green-gables/audit-boundaries.mjs
node scripts/anne-of-green-gables/validate-event-state.mjs
node scripts/anne-of-green-gables/validate-book.mjs
node scripts/anne-of-green-gables/qa-ui.mjs
npm run catalogue:check
npm test
npm run gate
git diff --check
```

The UI runner requires a Kathala checkout with Playwright installed and a running development server. Its app path and URL can be set with `KATHALA_QA_APP_ROOT` and `KATHALA_QA_URL`; defaults are the sibling `Kathala-anne-qa` checkout and `http://127.0.0.1:5175`. No art-generation network call is needed to reproduce the export; selected images and exact prompts are committed.

No push, pull request or merge has been performed for this correction.
