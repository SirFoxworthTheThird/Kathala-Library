# Purgatorio map review

Reviewed in the current Kathala development UI against the final 1536 × 1024 artwork.

## Cartographic approach

The four layers form a nested topographic reading map rather than a literal geodetic survey. Dante places the island mountain in the southern hemisphere opposite Jerusalem, but the poem supplies an ordered moral geography rather than measurable coordinates. The art therefore preserves the explicit sequence and vertical logic: island overview, shore and Ante-Purgatory, seven encircling terraces, and the Earthly Paradise.

- **The Mountain of Purgatory:** island silhouette and concentric summit terraces, with one gateway into the close lower-mountain map.
- **The Shore and Ante-Purgatory:** beach, mountain foot, lower slopes, ledges, valley, and gate approach.
- **The Seven Terraces:** gate, seven cornices and their stairs, then the wall of fire.
- **The Earthly Paradise:** summit forest, Lethe, procession ground, chariot glade, tree, and Eunoe.

## Coordinate and UI checks

All marker coordinates use Kathala’s bottom-edge origin and were checked against the visible terrain. Routes ascend in the poem’s order. The three gateways open the intended child layer: Mountain to lower slopes, Gate Approach to terraces, and Wall of Fire to paradise. Playback crosses the lower-to-terraces and terraces-to-paradise transitions without negative elapsed time or layer failure.

The final UI screenshots in `qa/map-*.png` show every layer with markers. `qa/rendered-maps-contact.jpg` records the four-screen visual inspection. The maps are mature painted topographic illustrations without labels or watermarks; app overlays carry the editable names and markers.

## Repeat-validation corrections, 19 October 2026

The earlier marker inspection was insufficient. The island-shore pin was offshore and the diagonal terrace arrangement failed to follow the depicted rings. All 32 positions were rechecked against the full-resolution illustrations: the shore is on the reed-grown beach, the ledge on the shaded rock shelf, the royal valley within the flowers, each terrace on its respective ring, the tree at the depicted trunk, and both river locations on water. `map-coordinates.mjs` records the reviewed bottom-origin values and the regression validator rejects the previous offshore coordinate.

The terraces gateway moved from the princes’ valley to the gate approach. The Earthly Paradise remains nested beyond the wall of fire. Painted topography is interpretive rather than a surveyed map: in particular the paired forest streams and procession sites approximate the poem’s relative movement.
