# Map source and geographic conventions

The Prince Edward Island outline is extracted from DataHub’s `geo-ne-admin1` GeoJSON resource, downloaded from `https://datahub.io/core/geo-ne-admin1/_r/-/data/admin1.geojson`. The resource is derived from Natural Earth Admin 1 and is offered under the Open Data Commons Public Domain Dedication and License 1.0; Natural Earth’s original map data is public domain. The retained `map-source/pei-natural-earth.geojson` contains only the `CA-PE` feature and has SHA-256 `5008699fc6eacf834e6f0a3d3a88162092b8e2bdea4f4823bb919bda02a7d228`.

Charlottetown is placed at its approximate real position. Avonlea, Bright River, and White Sands are fictional communities; their island markers express the novel’s relative travel relationships and are labelled interpretive. The Avonlea and Green Gables layers are topographic reading maps reconstructed from directions, distances, adjacency, and routes in the novel. They do not claim survey accuracy. Every map uses bottom-origin marker coordinates as required by Kathala.

## Corrected projection and roads

`map-geometry.py` fits the boundary into a 1600 × 1000 sheet using a latitude-corrected equirectangular projection. Longitude distances are multiplied by the cosine of the central latitude. Coastline, six island markers and three road paths share that projection. `map-geometry.json` records the resulting bottom-origin coordinates; both the renderer and world generator read it.

Approximate fictional sites are near Cavendish (Avonlea), west of it (Bright River), and east of it (White Sands). Charlottetown uses approximately 63.1311° W, 46.2382° N. Coarse coastal geometry requires snapping near-shore points safely inland. Routes use a land-mask path search, simplify only with land-safe segments, and are independently sampled by `validate-projection.py`. This validates land placement, not historical road surveys or exact mileages. The old offshore coordinates are negative controls and must fail.

## Local sheets

- **Avonlea:** inferred farms, woods and contours; roads cross the pond at the bridge. Carmody, school, church, manse, houses and graveyard are populated. Contours have no surveyed elevations.
- **Green Gables:** inferred estate plan with a clearly marked upper-room inset. Kitchen and parlour are downstairs; the east gable and Marilla's room are upstairs. The yard is outside the house footprint.
- **Charlottetown:** interpretive nineteenth-century harbour-city blocks and wharves. Queen's, Beechwood, student lodging and Exhibition are representative placements; no exact addresses are claimed. The White Sands concert hotel is on the island sheet, not in Charlottetown.

Context references: [PEI Archives streetscapes](https://www.archives.pe.ca/atom/index.php/streetscapes) and [PEI Museum Meacham's Atlas](https://www.peimuseum.ca/collections/meachams-atlas). These support the historical city form; no atlas image was reproduced. Maps are deterministic cartography, separately attributed from the OpenAI ImageGen entity illustrations.
