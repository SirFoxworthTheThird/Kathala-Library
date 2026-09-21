# Application and release QA

The final PWK was downloaded through the visible PlotWeave Library dialog and inspected in an isolated checkout of latest `origin/development` (`6ffabd9ade962abb64f5a718e3b0a8a3cbf4c7d3`). The local development server supplied the final catalogue, PWK, and generated images through the same URLs used by the Library flow.

## Reading-mode checks

- The Library card showed Robert Louis Stevenson, the public-domain/source notice, all canonical counts, and the 73-generated-image statement before download.
- The opening cursor was chapter 1, scene 1, **The Last Morning in Essendean**.
- Only David Balfour and Mr Campbell were visible initially. Alan Breck Stewart, 18 later characters, 34 later places, ten later items, later factions, and later knowledge remained hidden.
- The opening map shelf contained only **Scotland, 1751**, with one revealed marker. Future submaps remained hidden.
- The opening manuscript displayed the dedication and Chapter I source prose.
- The guarded **Read ahead** flow was used to reach chapter 30; two **Next moment** actions then reached the final event, **Parting in Edinburgh**.
- At the final event the dashboard showed 90 scenes, 20 characters, five maps, 35 revealed markers, six relationships, and twelve items, with no unrevealed-entity warning.
- The manuscript reported 100% of the book and displayed Chapter XXX and its final scene.

## Views, maps, and images

Dashboard, Timeline, Read/Manuscript, Characters, Maps, Calendar, Items, Relations, Character Arc, Lore, Factions, Knowledge, and Settings were opened in reading mode. Reading mode was then turned off through Settings, after which Corkboard and Structure were opened.

All five map layers were selected and rendered in PlotWeave: **Scotland, 1751**, **House of Shaws**, **Brig Covenant**, **Appin and the Highland Flight**, and **Cluny’s Cage**. The map shelf exposed all 20 characters and twelve items at the final event. Each layer’s currently rendered image set was checked for completed loading and nonzero natural dimensions. Opening and final character/item views likewise had no broken images.

The walkthrough found and corrected one example-data defect: David’s Chamber and Newhalls initially had no introducing event, so they remained hidden at the final cursor. Their narratively appropriate events now introduce them, and the rerun reaches all 35 locations.

## Evidence

- `qa/app-results.json`: 88 successful assertions, page excerpts, five-layer image results, exact app commit, and console capture.
- `qa/library-dialog.png`, `qa/opening-*.png`, and `qa/final-*.png`: catalogue, spoiler-safe opening state, manuscript, and final views.
- `qa/map-*.png`: each of the five rendered map layers.
- `qa/corkboard.png`, `qa/structure.png`, and `qa/settings-reading.png`: reading-mode transition and authoring-only views.
- Browser console errors: 0. Page errors: 0. Broken rendered images: 0. Infinite loaders: 0.

## Completion statement

Example rules review: COMPLETE
Source edition: Robert Louis Stevenson, *Kidnapped*, Project Gutenberg eBook #421, original English UTF-8 text updated 23 September 2024, https://www.gutenberg.org/cache/epub/421/pg421.txt
Counts: 30 chapters, 90 events, 20 characters, 35 locations, 5 maps
Automated validation: dedicated book validator, catalogue check, full library tests, source reconstruction, and whitespace validation passed
Visual validation: all five map layers and Dashboard, Timeline, Manuscript, Characters, Maps, Calendar, Corkboard, Structure, Items, Relations, Character Arc, Lore, Factions, Knowledge, and Settings inspected in PlotWeave development
Image validation: 73 generated assets checked, broken links = 0, duplicates = 0, intentional shared images = 0
Exceptions: none
