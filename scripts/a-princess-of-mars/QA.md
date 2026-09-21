# Application and release QA

The final PWK was downloaded through the PlotWeave Library UI and inspected in an isolated checkout of the latest `origin/development` (`6ffabd9ade962abb64f5a718e3b0a8a3cbf4c7d3`). The local library server supplied the final catalogue and stored images, matching the normal Library download path.

## Reading-mode checks

- The opening cursor is chapter 1, scene 1, **The Sealed Manuscript**.
- Only Edgar Rice Burroughs and John Carter are visible initially. Dejah Thoris, Tars Tarkas, later places, all ten future items, the Thark faction, and Ninth Ray knowledge remain hidden.
- The opening map shelf contains only **Arizona and the Hudson**, with the correct opening marker. Barsoom and its submaps remain hidden.
- Moving to chapter 28 through the guarded **Read ahead** flow reveals all 19 characters, 6 maps, and 10 items.
- The manuscript opens as a reader-facing book, includes the title, dedication, foreword, all 28 chapters and 108 scenes, and reaches the final Arizona text. The reconstructed PWK count is 67,158 words.

## Views and maps

Dashboard, Timeline, Read/Manuscript, Characters, Maps, Calendar, Items, Relationships, Character Arc, Lore, Factions, Knowledge, and Settings were opened in reading mode. Reading mode was then turned off through Settings so Corkboard and Structure could also be inspected.

All six layers were opened and visually reviewed in PlotWeave: **Arizona and the Hudson**, **Barsoom**, **Thark and Korad**, **Zodanga**, **Helium**, and **Atmosphere Factory**. Each image loaded. Markers were checked against the underlying artwork using PlotWeave's bottom-origin coordinates. The four Barsoom submaps are populated and each is reached by one correctly placed parent gateway. Root-to-submap playback was exercised from Barsoom to Thark and Korad; the destination map and John Carter's incubator placement rendered after the transition.

Playback initially exposed an application defect in which a missed CSS `transitionend` could leave an automatically selected destination map transparent. The isolated application worktree contains a bounded timeout fallback in `src/features/maps/MapExplorerView.tsx`; the playback regression was rerun successfully with the Thark image loaded at 1536×1024 and opacity 1.

## Evidence

- `qa/app-results.json`: route text checks, reveal assertions, six-layer selection, image loading, and console capture.
- `qa/playback-results.json`: sampled cursor/layer changes and destination image state.
- `qa/app-*.png`: opening/final dashboards, opening characters and Arizona map, manuscript, all map layers, Corkboard, and cross-layer playback.
- No page errors, broken images, infinite loaders, or unresolved references were found. The development console emitted one non-blocking React Flow memoization warning while mounting the relationship graph; its node and edge type objects are already module-level constants and it did not affect this example.

## Completion statement

Example rules review: COMPLETE
Source edition: Edgar Rice Burroughs, *A Princess of Mars*, Project Gutenberg eBook #62, original English UTF-8 text updated 12 January 2025, https://www.gutenberg.org/cache/epub/62/pg62.txt
Counts: 28 chapters, 108 events, 19 characters, 30 locations, 6 maps
Automated validation: book validator, catalogue check, full library tests, and whitespace validation passed
Visual validation: all six map layers and Dashboard, Timeline, Manuscript, Characters, Maps, Calendar, Corkboard, Structure, Items, Relationships, Character Arc, Lore, Factions, Knowledge, and Settings inspected in PlotWeave development
Image validation: 66 checked, broken links = 0, duplicates = 0, intentional shared images = 0
Exceptions: none
