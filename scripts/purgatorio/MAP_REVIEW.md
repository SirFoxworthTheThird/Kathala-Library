# Purgatorio map review

Reviewed in the current Kathala development UI against the final 1536 × 1024 artwork.

## Cartographic approach

The four layers form a nested topographic reading map rather than a literal geodetic survey. Dante places the island mountain in the southern hemisphere opposite Jerusalem, but the poem supplies an ordered moral geography rather than measurable coordinates. The art therefore preserves the explicit sequence and vertical logic: island overview, shore and Ante-Purgatory, seven encircling terraces, and the Earthly Paradise.

- **The Mountain of Purgatory:** island silhouette and concentric summit terraces, with one gateway into the close lower-mountain map.
- **The Shore and Ante-Purgatory:** beach, mountain foot, lower slopes, ledges, valley, and gate approach.
- **The Seven Terraces:** gate, seven cornices and their stairs, then the wall of fire.
- **The Earthly Paradise:** summit forest, Lethe, procession ground, chariot glade, tree, and Eunoe.

## Coordinate and UI checks

All marker coordinates use Kathala’s bottom-edge origin and were checked against the visible terrain. Routes ascend in the poem’s order. The three gateways open the intended child layer: Mountain to lower slopes, Princes’ Valley to terraces, and Wall of Fire to paradise. Playback crosses the lower-to-terraces and terraces-to-paradise transitions without negative elapsed time or layer failure.

The final UI screenshots in `qa/map-*.png` show every layer with markers. `qa/rendered-maps-contact.jpg` records the four-screen visual inspection. The maps are mature painted topographic illustrations without labels or watermarks; app overlays carry the editable names and markers.