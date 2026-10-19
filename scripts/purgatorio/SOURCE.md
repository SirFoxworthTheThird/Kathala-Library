# Purgatorio source record

## Edition

- Dante Alighieri, *Divine Comedy, Longfellow's Translation, Purgatory*.
- Translated by Henry Wadsworth Longfellow (1807–1882).
- Project Gutenberg eBook #1002, released 1 August 1997.
- Source file metadata reports most recent update 26 September 2026.
- Plain UTF-8 source: https://www.gutenberg.org/cache/epub/1002/pg1002.txt
- Project page: https://www.gutenberg.org/ebooks/1002
- Project Gutenberg marks the edition public domain in the United States.

## Source integrity and extraction

- Downloaded source size: 249,087 bytes.
- Downloaded source SHA-256: `a84c5036f67ad127f1f39d144215bf116afb842c6b5a6d9a9dcd6f6d94cfdb60`.
- The retained poem begins after `Purgatorio: Canto I` with `To run o’er better waters hoists its sail` and ends with `Pure and disposed to mount unto the stars.` in Canto XXXIII.
- All 33 canto headings become chapter titles. Every nonblank verse line inside those canto boundaries is retained in source order.
- Excluded packaging: the Project Gutenberg header and licence, title and translator page, contents list, canto headings, blank separator lines, terminal marker, and footer licence.
- Longfellow’s spelling, punctuation, capitalization, apostrophes, indentation, names, and wording are preserved. No modernization or silent correction is applied.

## Scene boundary review

The 129 scenes use explicit retained-source line starts chosen at changes of action, speaker, location, or knowledge. Every start is at a complete tercet boundary. Adjacent tercets, individual cast states, and a reason for each cut are recorded in `SCENE_BOUNDARY_AUDIT.json` and `reviewed-scenes.mjs`. The earlier calculated thirds were rejected in repeat validation because they misassigned actions and participants. Embedded histories remain speech within the continuous ascent; dream figures are explicitly identified as dream appearances.

The retained body contains 4,755 poem verse lines and an eight-line English translation note after Arnaut’s Provençal speech in Canto XXVI (retained lines 149–156). The note remains at its exact source position. These are 4,763 retained nonblank lines and 37,410 words altogether. The poem has 1,607 stanza groups (tercets and the single closing line of each canto); the translator’s prose note is not counted as a tercet. The earlier figure of 1,609 incorrectly applied groups of three to the note.

## Reconstruction normalization

Final scene drafts prefix every verse line with exactly two spaces to invoke Kathala’s verse layout. The validator removes exactly that added prefix while preserving source indentation, converts CRLF and CR to LF, removes trailing horizontal whitespace and empty packaging lines, and joins retained lines with LF. Concatenating scene drafts in canto and scene order must then equal the retained source verse exactly. Separate assertions cover canto, stanza-group, scene, verse-line, and word counts and the pinned source-file hash.