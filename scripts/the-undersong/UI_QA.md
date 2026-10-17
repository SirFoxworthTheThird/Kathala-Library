# The Undersong — corrected-edition UI validation

This record supersedes the original acceptance notes. Tested 17 October 2026 against Kathala `origin/main` commit `e920677e` in `PlotWeave-undersong-qa`, using the in-app browser. The Library was served from port 4174 and the application from port 5175.

## Exact downloads and scope

A fresh profile at `127.0.0.1:5175` downloaded the revised 11-character edition. A second fresh profile at `localhost:5175` downloaded the final 229,753-byte PWK after the duplicate held-item/location placements were removed. The final card displayed 11 characters, 8 chapters, 42 scenes, 20 locations, Solomon Darko, and the authorized copyright notice. Both used the ordinary Library download.

The final profile verified the item correction and complete supporting views. Geometry, gateway and all-location image checks were performed on the first profile; the final file uses those identical marker coordinates, routes, map hierarchy and image URLs. The last village-label adjustment was reloaded and visually inspected in the final profile.

## Reading gates

- At the opening, the roster contained only Ezra; ten unintroduced characters remained hidden.
- At the first memorial meeting the roster used Abel Wren, not Elias Coyle.
- At `Tracks Across the Bared Sea`, the roster still used Abel Wren. Advancing one moment to `The Palm on Elias’s Name` changed the roster to Elias Coyle.
- Tom remained Tom Hesketh before the Listener chapter; The Listener appeared after its named scene.
- The Show Everything warning and full-world view were exercised. Settings then turned reading mode off; the full writer navigation and Page layout became available.

## Corrected scenes and objects

- `What the Children Say in Sleep`: the map sidebar showed Ezra and Agnes at Hollin Staithe school.
- `The Parcel for Ezra`: the final Items list displayed `carried by Ezra Coyle · Hollin Staithe school` for the Dream Ledger.
- Bower's portrait loaded, and Arc displayed his individual note about breaking the pick, clawing at the hill and being dragged back.
- Schoolroom location, Bower/Ezra/Tom presence, Tom's absence from the churchyard, distinct individual notes, and explicit inventories are additionally enforced by `undersongCorrections.test.ts` and the dedicated validator.

## Every map and gateway

All three layers were opened and visually inspected: North Riding Coast, Hollin Staithe, Saltwick Drift. The coast chart places Loftus inland northwest of Whitby harbour and the North Sea east of the land. The village and mine are explicitly local interpretive plans, with no unsupported north-up claim. The adit marker now sits at the depicted entrance; Fourth Heading is on the end gallery; the Hollow sits in the depicted chamber. Route bends follow the visible gallery system, with its breached connection to the Hollow documented as interpretive.

Both gateways were opened through actual marker interactions: marker popup → location panel → Open Sub-map. This reached Hollin Staithe from the coast and Saltwick Drift from the village. Layer switching back to the coast also worked.

Every location was opened from the sidebar at its map level, centering it for inspection. Image elements in all 20 location panels had natural dimensions 1536×1024:

- Coast: Hollin Staithe, Loftus, Whitby.
- Village: surgery, Cliff Row, Hesketh house, school, Agnes's house, church, churchyard, memorial, staithe, Long Scar, bared seabed, village square, Whitby road, drift mouth.
- Mine: adit, Fourth Heading, Hollow.

Playback was activated at `Breathing Stone` in the mine and observed advancing to `The Dream Ledger Begins` in the village, with the layer changed, school artwork loaded, and Agnes's individual action displayed. Stop completed normally. No Leaflet exception or stuck loader remained.

## Book and supporting views

Cards, Read, and Page layouts rendered; both Narrative and Chronological ordering were exercised. The final Read layout contained chapter eight and the complete final sentence ending `the place where Agnes had been.` Cards showed 42 written scenes and 15,530 words.

Characters (11), Items (7), Relations (8 relationships with two changed-state snapshots), Arc (98 presence snapshots), Lore, Factions (3), Knowledge (10 facts), and Calendar were visited with reading mode off. All visible book images had nonzero natural dimensions. The calendar retained the 14 September opening and dated October/November anchors.

## Runtime health

No browser console errors were recorded. Opening Relations produced the existing React Flow memoization warning about nodeTypes/edgeTypes identity; it did not prevent graph rendering. All 45 final artwork assets were also opened through the refreshed contact sheet; the three replacement entity illustrations and map bases/final map sheets were inspected at full resolution. Exact generation prompts were recovered from session tool calls and are stored with the artwork manifest.
