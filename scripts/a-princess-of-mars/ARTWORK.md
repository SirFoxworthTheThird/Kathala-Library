# Artwork manifest

All 66 final PNG assets are stored below `library/a-princess-of-mars/` and were generated with OpenAI's built-in image generator on 21 September 2026. The set comprises one world image, nineteen character portraits, ten item studies, thirty location illustrations, and six maps. Each entity has its own file and byte hash; no artwork is reused, and no map is used as entity artwork.

## Prompt direction and provenance

Every image was requested as a separate generation. Character, item, location, and world prompts used this shared direction:

> Mature literary illustration for Edgar Rice Burroughs's *A Princess of Mars*, in the visual language of a finely printed 1910s planetary-romance edition: realist drawing, restrained ink and oil colour, dramatic but dignified composition, period-appropriate material culture, coherent anatomy and architecture, no lettering, map, interface, photograph, cartoon treatment, modern object, signature, or watermark.

Each prompt then named exactly one subject and supplied its story-supported appearance, setting, action, or function. Character prompts distinguished Carter's earthly military bearing, the red Martian court figures, the four-armed green Martians, the keepers, Powell, Burroughs, and Woola. Item prompts isolated one object against a simple literary-study setting. Location prompts depicted the named landscape, chamber, city, arena, palace, garden, or cave without substituting a character portrait or map. The world prompt presented Barsoom as a broad atmospheric vista rather than cartography.

The six map prompts used this shared direction:

> Genuine overhead cartographic artwork for a mature 1910s scientific-romance atlas, engraved linework and restrained watercolour on aged cream paper, geographically coherent terrain or a usable architectural floor plan, no people, prose labels, interface, decorative scene painting, signature, or watermark.

Subject-specific map directions were:

- `barsoom.png`: an oval planetary map with dead sea bottoms, canals, mountain chains, polar caps, Helium, Zodanga, Thark/Korad, Warhoon territory, and the atmosphere factory arranged as approximate editorial geography.
- `arizona.png`: Arizona cave country with trails and a Hudson River/cottage inset, presenting the two Earth settings on one usable map.
- `thark.png`: an invented overhead plan joining ruined Korad, Thark's occupied quarters, incubator, palace precinct, gates, and surrounding desert.
- `zodanga.png`: an invented overhead city plan with palace, roof approaches, barracks, avenues, and the apartments used in the rescue.
- `helium.png`: an invented overhead plan of Greater and Lesser Helium, palace precinct, sunken garden, towers, avenues, and landing approaches.
- `atmosphere.png`: an invented cutaway floor plan of the atmosphere factory, with entrance, control room, pump chamber, machinery, and connecting passages.

## Review and corrections

Five contact sheets in `scripts/a-princess-of-mars/qa/` were used to inspect every final asset at useful size: `characters.png`, `items.png`, `locations-1.png`, `locations-2.png`, and `maps-world.png`. Individual green Martian originals were also opened to confirm four-arm anatomy. Woola's many-legged form, the separate item silhouettes, map legibility, location relevance, mature style, and consistency of the full set were checked. The validator confirms 66 existing images and 66 distinct SHA-256 hashes.

One combined attempt involving Sola and Dejah Thoris was blocked by the generation service and produced no stored asset. Both subjects were regenerated separately with explicit dignified, fully clothed period-fantasy portrait instructions; those accepted images are the final files. A temporary set of schema-test placeholders was overwritten before review and is absent from the final tree. No broken, duplicated, irrelevant, misleading, or stylistically inconsistent output was retained.
