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

Each canto is divided into three reading scenes at complete tercet boundaries. The adjacent tercets, location, physically present cast, action, and narrative frame were inspected for all 99 scenes. The machine-readable record is `SCENE_BOUNDARY_AUDIT.json`. Embedded histories remain speech within the continuous ascent; the edition does not turn them into simultaneous timelines.

## Reconstruction normalization

Final scene drafts prefix every verse line with exactly two spaces to invoke Kathala’s verse layout. The validator removes exactly that added prefix while preserving source indentation, converts CRLF and CR to LF, removes trailing horizontal whitespace and empty packaging lines, and joins retained lines with LF. Concatenating scene drafts in canto and scene order must then equal the retained source verse exactly. Separate assertions cover canto, stanza-group, scene, verse-line, and word counts and the pinned source-file hash.