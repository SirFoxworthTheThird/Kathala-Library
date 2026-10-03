# The Wonderful Wizard of Oz artwork

Status: original artwork complete; map placement revised on `feature/wizard-of-oz-maps`.

- Generated 107 unique illustrations through the built-in imagegen tool: 1 cover, 21 characters, 12 items, 55 locations, 8 factions and 10 lore pages. No CLI image fallback was used.
- Reviewed contact sheets by category; regenerated the Silver Shoes item when its first version showed dark shoes in the background.
- Converted selected masters to JPEG quality 90. PNG masters remain local and ignored by Git; final JPEGs are committed.
- Replaced six prior maps containing film imagery or later-book details with original SVG maps rendered to PNG. Retained the Kansas map. Added two detailed route maps for the Eastern Road and the road south to Glinda, and redrew the overview route to match them.
- Imported all art into the PWK, preserved the old source records and descriptions in this folder, removed superseded files, updated Lore, SOURCES and the catalogue.
- Validated 107 distinct image hashes, nine live maps, all 55 location coordinates and links, local references and catalogue size. `npm run gate` passed all 789 tests. Map SVGs, PNGs, and marker overlays were reviewed visually.

Book anchors: Dorothy's silver shoes and blue-and-white check dress, the West Witch's one eye with no green skin, Glinda's red hair/white dress/ruby throne, one Emerald City gate, the Munchkin East in blue, Winkie West in yellow and Quadling South in red. Maps are interpretive because the 1900 book includes no canonical map.
