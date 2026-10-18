# Map and artwork corrections

All four retained plates were reopened at original resolution. Coordinates below use the bottom edge as zero, matching Kathala’s image convention. The maps interpret Milton’s cosmography and Eden; no real-world coordinates exist for the celestial realms or the internal garden topography.

| Plate | Marker | x | y | Depicted feature |
| --- | --- | ---: | ---: | --- |
| Cosmos | Created Universe | 770 | 470 | Pendant central sphere |
| Cosmos | Convex | 990 | 440 | Right outer edge of the sphere |
| Cosmos | Chaos | 350 | 390 | Gulf outside creation |
| Cosmos | Court of Chaos | 270 | 500 | Elemental terrain; position is interpretive |
| Cosmos | Sun | 680 | 580 | Gold solar orb |
| Cosmos | Earth | 770 | 515 | Central globe and Eden gateway |
| Cosmos | Hell | 770 | 80 | Lower infernal basin and gateway |
| Cosmos | Heaven | 770 | 900 | Upper empyrean terraces and gateway |
| Hell | Burning Lake | 400 | 280 | Lower-left fiery lake |
| Hell | Plain | 750 | 575 | Broad central solid ground |
| Hell | Pandemonium | 1190 | 600 | Gold city on right ledge |
| Hell | Gate | 1410 | 850 | Upper-right barrier |
| Heaven | Throne | 770 | 770 | Upper central radiant terraces |
| Heaven | North | 275 | 800 | Northern fortified region |
| Heaven | Field | 760 | 420 | Broad central field |
| Heaven | Gate | 780 | 230 | Central lower opening onto abyss |
| Eden | Niphates | 150 | 840 | Western mountain outside enclosure |
| Eden | Wall | 330 | 600 | Wooded western escarpment |
| Eden | Garden | 750 | 500 | Interior river terrain |
| Eden | Tree of Life | 790 | 665 | Left luminous central tree |
| Eden | Tree of Knowledge | 890 | 660 | Right fruit tree |
| Eden | Bower | 805 | 375 | Flowered shelter in lower interior |
| Eden | Eastern Gate | 1410 | 680 | Actual gate at right edge |
| Eden | Vision Hill | 860 | 880 | High interior hill over waterfall |
| Eden | Western Watch | 370 | 450 | Western wooded perimeter; exact meeting point is editorial |

The western watch is a new place because Book IV puts the patrols’ confrontation at their western meeting, away from Gabriel’s eastern station. Its ordinary illustration shows moonlit paths and remains separate from the Eden map. Heaven, Hell, and Eden are sibling child maps, not levels in one floor group; that incorrect grouping was removed.

Four added actors have distinct portraits: Azazel with the standard; Mulciber with architectural tools; Nisroch in riven armor; Uzziel as a loyal patrol deputy. All five new outputs were visually inspected before being copied to the Library. Their exact submitted requests are in `ADDITIONAL_ART_PROMPTS.json`. All 61 existing requests were recovered from the generation record into `EXACT_ART_PROMPTS.json`; the manifest consumes those strings and no longer invents substitute prompts.

UI evidence in `qa/` records actual overlays, map playback, image loading, and gateway navigation. The normal character-pin filter makes overlapping gateways accessible, and the normal popup close button clears the previous popup. No forced pointer click bypasses another element.
