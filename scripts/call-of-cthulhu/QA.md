# The Call of Cthulhu QA

Example rules review: COMPLETE

Source edition: H. P. Lovecraft, *The Call of Cthulhu*, Project Gutenberg eBook #68283, based on *Weird Tales* (February 1928), updated 18 October 2024, https://www.gutenberg.org/ebooks/68283

Counts: 3 authorial sections, 12 events, 11 characters, 21 locations, 4 maps, 9 items, 46 original generated images, 11,968 retained words.

Automated validation: `node scripts/call-of-cthulhu/validate.mjs` passed; `npm test -- --run libraryCatalogue exampleQuality exampleCompat` passed 725/725; full `npm test` passed 761/761; `npm run catalogue:check` passed for all 45 worlds.

Visual validation: Kathala development commit `9295d4a` loaded the catalogue download through the Library UI. Reading mode was checked at the opening and advanced through all twelve moments. Dashboard, Timeline, Calendar, Characters, Maps, Items, Relations, Arc, Lore, Factions, Knowledge, and Settings were visited; Manuscript, Corkboard, and Structure were checked after reading mode was disabled. All four layers—A World of Separate Clues, Providence and College Hill, The Louisiana Swamp, and R’lyeh—were individually opened and captured with character pins hidden for an unobstructed marker review. The walkthrough made 73 assertions with zero browser console or page errors.

Location validation: all 21 markers were re-anchored against the labelled dots, buildings, and route circles in the four generated maps. PlotWeave's `CRS.Simple` map coordinates originate at the bottom-left, so artwork positions measured from the top were converted with `y = imageHeight - artworkY`. The world gateways now coincide with Providence, New Orleans/Bayou Country, and R’lyeh's plotted position; the Providence, swamp, and R’lyeh inset markers follow their illustrated landmarks and routes. The validator now asserts every canonical anchor, and the four refreshed map captures confirm placement in the application.

Image validation: all 46 generated PNGs were visually inspected on generation and exercised in the app; broken links = 0; duplicate image bytes = 0; no shared entity art. The app rendered 18 image elements on the world layer, 14 on Providence, 15 on the swamp, and 14 on R’lyeh without a broken image.

Exceptions: map regions, floor groups, annotations, cross-timeline artifacts, travel modes, and writing logs are not used because they do not clarify this short framed narrative. These decisions are recorded here rather than in reader-facing Lore.
