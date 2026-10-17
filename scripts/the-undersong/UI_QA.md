# The Undersong — Kathala UI validation

Validated 17 October 2026 in a clean detached worktree of the latest Kathala `origin/main` at `e920677e`, served by Vite at `http://127.0.0.1:5173/`. The Library worktree was served locally with CORS at `http://127.0.0.1:4174/`, so the UI downloaded the exact catalogue entry and PWK under review.

## Download and reading mode

- The Library card displayed *The Undersong*, Solomon Darko, 10 characters, 8 chapters, 42 scenes, 20 locations, the authorized copyright notice, the cover, and the exact 237 KB UI display derived from 242,949 UTF-8 bytes.
- A fresh download opened `the-undersong-world` with reading mode on at `The Ebb Beyond the Marker`.
- The opening dashboard showed 1 revealed character, 2 revealed map layers/places, and 1 revealed item; 9 characters, 18 places, and 6 items remained hidden.
- Advancing to `Breathing Stone` revealed the third map layer and the appropriate Tom/Pell state without exposing later identities.
- `Show everything` exposed the complete world only after Kathala’s spoiler warning.

## Book

- Read layout rendered all eight authorial chapter headings, all scene prose, italics, separators, and the final sentence ending `the place where Agnes had been.`
- Cards layout rendered all 42 scene cards.
- Narrative and Chronological controls both rendered; chronological cards remained ordered from the 14 September opening through the final case-history event.
- The scene side panel showed the correct present character, place, and item for the opening event.

## Maps and playback

- At the second event, the coast and Hollin Staithe layers were available and Saltwick Drift remained hidden.
- At `Breathing Stone`, all three nested map layers were available; layer switching among North Riding Coast, Hollin Staithe, and Saltwick Drift completed without a Leaflet transition failure.
- The illustrated topographic village and mine maps rendered at full resolution with readable labels, routes, north arrows, gateway hierarchy, and markers aligned to the displayed terrain.
- Map playback entered its active state, rendered event-specific Tom and Pell snapshots at Fourth Heading, and stopped cleanly.

## Supporting views and artwork

- Characters: 10 portraits loaded at 1024×1536; the final names `Elias Coyle` and `The Listener` appeared only in full-world mode.
- Items: 7 distinct 1536×1024 illustrations loaded.
- Factions: 3 faction illustrations loaded with their member counts.
- Relations, Arc, Lore, Knowledge, and Calendar all rendered their complete modeled records.
- Calendar anchors displayed at 14 September; 2 October; 1, 5, 8, and 9 November; and the concluding event on 24 November 1911.
- The cover, map layers, character art, item art, faction art, and location art returned nonzero natural image dimensions in the browser.

## Console

- Browser console errors: 0.
- Two identical React Flow memoization warnings appeared when opening Relations. They are an existing application warning about `nodeTypes`/`edgeTypes` identity and did not affect this edition or its graph.

