# Map source and coordinate audit

Three real-world layers use OpenTopoMap raster tiles downloaded on 2026-10-12 by `render-topographic-maps.py`. OpenTopoMap combines OpenStreetMap data with SRTM relief. The visible attribution on every rendered geographic layer reads: “Map data © OpenStreetMap contributors; relief style © OpenTopoMap (CC BY-SA).” Downloaded source tiles are archived under `scripts/persuasion/map-source/` so regeneration does not depend on later tile changes.

- Southwest England: WGS84 bounds 3.55° W–0.85° W, 50.48° N–51.72° N, zoom 8. Kellynch district is an explicitly approximate editorial placement in Somerset; Lyme Regis, Bath, and Portsmouth use real coordinates.
- Lyme Regis: WGS84 bounds 2.955° W–2.915° W, 50.713° N–50.739° N, zoom 15. The Cobb uses a real coordinate; the inn and Harville lodgings are useful editorial placements within the real town because Austen does not name addresses.
- Bath: WGS84 bounds 2.385° W–2.335° W, 51.365° N–51.397° N, zoom 15. Named streets and areas use approximate real coordinates; the White Hart and concert setting are editorial placements because the relevant historic interiors no longer provide an exact reading-map point.
- Kellynch and Uppercross: fictional places rendered as an interpretive topographic plan. Roads, contours, and relative gateways are derived from the novel’s journeys and do not claim surveyed coordinates.

All PWK marker coordinates use a 1600 × 1000 grid measured from the **bottom** edge. `map-coordinates.json` is calculated from the same Web Mercator projection and crop bounds used to render the real-world maps. Each child map has exactly one gateway marker on its parent. Routes use marker IDs or bottom-origin waypoints and were reviewed in map playback.
