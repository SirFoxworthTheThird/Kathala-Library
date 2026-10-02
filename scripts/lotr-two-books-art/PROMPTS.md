# Book-first prompt set

Mode: built-in imagegen only. Each of the 217 distinct illustrations needs its own call. The corresponding names, book slots, and short descriptions are in `manifest.json`. `imagegen` outputs a PNG master; use `register-generated.mjs` to copy an accepted image into the workspace and mark it generated, then `convert-approved-art.ps1` for JPEG.

Common style for the remaining character, item, and place plates: an original two-dimensional hand-coloured wood engraving on textured paper, with carved black lines, restrained mineral pigments, simplified expressive forms, and visibly drawn rather than photographic faces. Ground subjects in their book descriptions. Never copy a film actor, film costume, set design, monster design, or a published illustrator's composition. No titles, lettering, logos, borders, or watermark. For characters, prefer a meaningful book setting or gesture over a cinematic close-up; for items, a focused still life; for locations, an establishing view based on the named place.

Special book anchors already established:

- Fellowship cover (001): Tom Bombadil in bright blue coat and yellow boots leads Frodo, Sam, Merry, and Pippin from the Old Forest toward the Barrow-downs. This replaces a rejected movie-like Fellowship lineup.
- Aragorn (002): Strider as a mature, lean, clean-shaven Ranger with a lined pale face, shaggy dark hair visibly streaked silver and keen grey eyes, in a patched dark cloak with plain staff. The first photoreal portrait resembled a film actor and was rejected. The accepted image uses graphic wood-engraving forms.
- Arwen (003): dark-haired Elf woman at Rivendell in a simple pale gown, no actor likeness or film tiara.
- Durin's Bane (004): man-shaped black shadow with fire, whip and blade at the Bridge of Khazad-dûm; no movie horns or bat wings.
- Barliman Butterbur (005): stout, kindly and forgetful innkeeper at the Prancing Pony in plain apron and waistcoat.
- Two Towers cover (174): Faramir courteously speaks with Frodo and Sam at Henneth Annûn behind the waterfall; he refuses the Ring. Dark-haired Faramir in practical ranger clothes, no film actor design.

For future calls, construct an individual prompt from `name`, `kind`, and `description`; add scene detail only when it comes from the books or can be safely left generic. Inspect each result for recognisable film similarity before registration. Save the accepted final prompt if material details differ from this prompt set. The accepted PNGs are ignored by Git; JPEGs are the project deliverables.
