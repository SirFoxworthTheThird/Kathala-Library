# Anne of Green Gables: release evidence

## Manuscript and model

The retained Project Gutenberg #45 text reconstructs exactly from the published scenes under the normalization in `SOURCE.md`: 38 chapters, 1,788 paragraphs, 121 scenes, and 101,964 whitespace-delimited words. The source file is 606,693 bytes with SHA-256 `89a5e9fb2e0bb44562a969785385366f94e1da736aebee7d9cdf459eb0b5f9f6`; the retained text SHA-256 is `21f8c6dc189876984a97ef2797584a6f6987ae997cd6b028740c5f13105ea0f4`. All 83 internal cuts have an accepted paragraph boundary and recorded narrative, place, cast, and knowledge or item rationale.

The finished world contains 121 final events, 378 character snapshots, 26 characters, 27 locations, four maps, ten items, eight relationships and ten relationship snapshots, three factions, five goals, six knowledge facts, three routes, four threads, four motifs, and four lore pages. Every involved character has exactly one snapshot in the event. Mrs. Thomas and Mrs. Hammond are mentioned only in Anne's recollection and have none. Jerry Buote is present and snapshotted at the Chapter XIV dinner. Matthew's death state begins at `Matthew Falls`. Calendar positions are monotonic editorial day counts based on the novel's intervals, and every elapsed duration is nonnegative. The final PWK is 1,131,050 UTF-8 bytes with SHA-256 `6c86b200ee7bf3bb304e5c501353477341a9ff16ddc4f2fa6d5cca9859cd4b3f`; a second generator run produced the same byte count and hash.

## Maps and artwork

The Prince Edward Island overview uses the archived Natural Earth `CA-PE` boundary. Charlottetown is placed approximately; fictional Avonlea geography and the Green Gables grounds are explicitly interpretive. All coordinates use Kathala's bottom-origin convention. The four maps have one root and exactly one parent gateway for each child. The visible walkthrough opened Prince Edward Island, Avonlea, Green Gables through its gateway, and Charlottetown; markers, routes, layer transitions, and character overlays rendered correctly.

The artwork manifest records 71 distinct assets: one cover, 26 portraits, ten item studies, 27 location studies, three faction illustrations, and four maps. All four contact sheets and the four full-size maps were inspected. The initial generic Green Gables and Charlottetown grids were rejected and replaced; the island route was corrected not to cross water. The validator checks dimensions, references, hashes, and zero duplicate image hashes.

## Kathala development UI

The final downloadable PWK was exercised against the running latest Kathala development UI at `http://127.0.0.1:5173/` through the Library download flow. At the opening cursor the dashboard showed one scene, two met characters, two reached maps, and spoiler-gated later records. At the final cursor it showed all 121 scenes and 24 physically introduced characters while the two retrospective-only foster mothers remained hidden. The final Lore reveal and the closing sentence were visible.

Dashboard, Book, Characters, Maps, Calendar, Items, Relations, Arc, Lore, Factions, Knowledge, Settings, Manuscript, and Structure rendered without an application error. Cards, Page, and Read layouts rendered. All displayed images loaded. The browser run recorded zero console errors and zero page errors. `qa-ui.mjs` reproduces this check and writes `qa/library.png` and `qa/final-reader.png`.

## Automated gates

- `validate-manuscript.mjs`: exact reconstruction passes.
- `audit-boundaries.mjs`: 83 reviewed internal boundaries pass.
- `validate-event-state.mjs`: all 121 event place and cast rows pass.
- `validate-book.mjs`: references, status values, chronology, snapshots, maps, art, catalogue bytes, and final sentence pass.
- `qa-ui.mjs`: Library download, opening and final reveals, ten supporting views, three Book layouts, four map layers, images, closing sentence, and console pass.
- `npm run catalogue:check`: all 51 catalogue worlds match their files.
- `npm test`: 13 files and 876 tests pass.
- `npm run gate`: 876 tests, zero failures, and no baseline changes.
- `git diff --check`: clean.

Remote publication is outside this local release. No push, pull request, or merge was performed.
