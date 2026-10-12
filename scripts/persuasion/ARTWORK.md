# Artwork provenance and review

The cover and three 4 × 4 source atlases were generated with the built-in OpenAI ImageGen tool on 2026-10-12. `render-assets.py` reproducibly copies the cover, crops used atlas cells into single-copy final JPEGs, renders the fictional local map, rebuilds three real geographic maps from archived tiles, and hashes every final asset into `library/persuasion/ARTWORK_MANIFEST.json`.

## Prompt record

- Cover: Anne on the Lyme Cobb with Wentworth behind her; accurate 1814 Regency dress and naval uniform; mature oil painting with aquatint texture; cool coastal light; no text, modern objects, watermark, or caricature.
- Character atlas: sixteen specified characters in a strict 4 × 4 grid; distinct natural faces, historically accurate 1814 clothing, soft window light, museum-quality Regency portrait miniatures.
- Character/place atlas: Harville, Mrs Harville, Benwick, Mrs Smith, Hayter, the two Musgrove children, the Baronetage, Kellynch, Uppercross, Lyme, Camden Place, and the White Hart in a strict 4 × 4 grid.
- Place/object atlas: Kellynch interiors and garden, Lyme inn, Bath locations, six plot objects, the naval circle, and the Uppercross family in a strict 4 × 4 grid.
- Maps: the real southwest England, Lyme, and Bath layers use archived OpenTopoMap and OpenStreetMap tiles, with visible attribution and projected WGS84 pins. The fictional Kellynch and Uppercross layer is a deterministic 1600 × 1000 topographic plan. All PWK coordinates are measured from the bottom edge.

## Visual review

All four generated source images were inspected at full composition before integration. The cover has clear adult protagonists, plausible period dress, and a readable Cobb setting. Each atlas has a complete regular grid with distinct subjects, clean gutters, no labels or watermarks, and no panel-spanning figures. Crops were checked for intact heads, period objects, buildings, and readable composition. The four maps were checked at 1600 × 1000 for labels, gateways, contrast, bottom-origin marker agreement, and usable route playback. The manifest binds this acceptance record to the exact final bytes.
