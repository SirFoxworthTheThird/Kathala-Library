# Inferno source record

## Edition

- Dante Alighieri, *Divine Comedy, Longfellow's Translation, Hell*.
- Translated by Henry Wadsworth Longfellow (1807–1882).
- Project Gutenberg eBook #1001, released 1 August 1997.
- Source file metadata reports most recent update 29 October 2024.
- Plain UTF-8 source: https://www.gutenberg.org/cache/epub/1001/pg1001.txt
- Project page: https://www.gutenberg.org/ebooks/1001
- Project Gutenberg marks the edition public domain in the United States.

## Source integrity and extraction

- Downloaded source size: 249,139 bytes.
- Downloaded source SHA-256: `10fad2f10aaffec3bfe3fd63266544f7fd5bba576cd5c63afe68e8212849754d`.
- The retained poem begins immediately after the source heading `Inferno: Canto I` and ends with `Thence we came forth to rebehold the stars.` in Canto XXXIV.
- All 34 canto headings become chapter titles. Every nonblank verse line inside those canto boundaries is retained in source order.
- Excluded packaging: the Project Gutenberg header and licence, title page, contents list, blank separator lines, the terminal Project Gutenberg marker, and the licence block following it.
- Longfellow’s spelling, punctuation, capitalization, contractions, indentation, names, and editorial wording are preserved. No modernization or silent correction is applied.

## Reconstruction normalization

Final scene drafts prefix every verse line with exactly two spaces to invoke Kathala’s verse layout. The validator removes exactly that added prefix (preserving any original source indentation), then converts CRLF/CR to LF, removes trailing horizontal whitespace, removes empty lines, and joins the remaining lines with LF. Under that normalization, concatenating the scene drafts in canto and scene order must equal the retained source verse exactly. It separately checks canto, scene, verse-line, and word counts, plus the pinned source-file hash.
