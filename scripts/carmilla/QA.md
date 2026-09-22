# Carmilla application QA

Example rules review: COMPLETE

Source edition: J. Sheridan Le Fanu, *Carmilla*, Project Gutenberg eBook #10007, updated 28 October 2024, https://www.gutenberg.org/ebooks/10007

Counts: 17 authorial divisions, 67 events, 16 characters, 22 locations, 4 maps, 12 items, 49 original generated images, 27,989 retained words.

Automated validation: `node scripts/carmilla/validate.mjs` passed; full `npm test` passed 777/777; `npm run catalogue:check` passed for all 46 worlds; `git diff --check` passed.

Visual validation: PlotWeave development commit `9295d4a` loaded Carmilla through the Library UI. Reading mode was checked at the opening and advanced through all 67 moments. Dashboard, Timeline, Calendar, Characters, Maps, Items, Relations, Arc, Lore, Factions, Knowledge, and Settings were visited; Manuscript, Corkboard, and Structure were checked after reading mode was disabled. All four layers—Southern Styria, The Schloss Grounds, Inside the Schloss, and Karnstein Ruins—were individually opened and captured with character pins hidden, including both levels of the schloss hierarchy. The walkthrough made 65 assertions with zero browser console or page errors. Screenshots and machine-readable results are in `qa/`.

Location validation: all 22 markers were checked against the painted estates, roads, rooms, and ruins. PlotWeave's `CRS.Simple` map coordinates originate at the bottom-left, so artwork positions measured from the top were converted with `y = imageHeight - artworkY`. The validator now asserts every canonical anchor, while the four unobstructed map captures confirm the marker and route placement in the application.

Image validation: all 49 generated PNGs were inspected on generation and exercised in the app; broken links = 0; duplicate image bytes = 0; no shared entity art. The app rendered 25 image elements on Southern Styria, 20 on the grounds, 19 inside the schloss, and 19 on Karnstein Ruins without a broken image.

Exceptions: map regions, floor groups, annotations, cross-timeline artifacts, travel modes, and writing logs are not used because they do not clarify this framed novella. These decisions are recorded here rather than in reader-facing Lore.
