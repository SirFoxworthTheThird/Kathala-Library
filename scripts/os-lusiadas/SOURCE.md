# Os Lusíadas: source and retained poem

The manuscript source is [Project Gutenberg eBook 27236](https://www.gutenberg.org/ebooks/27236), the [UTF-8 plain-text file](https://www.gutenberg.org/cache/epub/27236/pg27236.txt) stored byte-for-byte in `source/pg27236.txt.gz`. The gzip archive has a fixed timestamp and decompresses to the exact downloaded file. Project Gutenberg credits Rui Baptista's transcription from scans held by the Portuguese Biblioteca Nacional Digital. The transcribed title page identifies the printing as *OS LVSIADAS de Luis de Camoẽs*, Lisbon, at the house of António Gonçalves, 1572. Gutenberg released this eBook on 11 November 2008 and last updated it on 4 January 2021. The decompressed file has SHA-256 `06f7b799bdda0d03cab44b017e8c780f809231852427745003127b49353fe9fd` and is 360,071 bytes.

This is the original Portuguese poem, **not** an English translation or a modern-spelling adaptation. It retains the transcription's archaic spelling, long s (`ſ`), abbreviations, diacritics, punctuation, capitalization, and ampersands. It also retains racial, religious, and imperial language as source text; interpretive descriptions must not silently adopt those claims as fact. Gutenberg states that eBook 27236 is public domain in the United States. Camões died in 1580 and the 1572 original is also beyond the ordinary authorial copyright term in Portugal. The Gutenberg wrapper and licence are excluded from the poem; the source file remains here to document the transcription and extraction.

## Extraction boundaries

`source-text.mjs` begins at the first standalone `Canto primeiro.` following the 1572 title page and royal privilege, and ends immediately before Gutenberg's `*** END OF THE PROJECT GUTENBERG EBOOK OS LUSÍADAS ***`. It retains all ten canto bodies in source order. Each original canto heading is retained as chapter metadata, including the tenth canto's `& vltimo.` line. The `Fim.`, `FIM.`, or `F I M.` after a canto is an end marker, not a verse line, and is excluded. The title page, royal privilege, transcription credit, Gutenberg metadata, eBook licence, and trailing blank pages are packaging outside the retained poem. No stanza is excluded.

The source uses physical line wraps around the decorative opening of each canto. Only those ten opening stanzas are reflowed to eight verse lines. Each join is specified by physical-line indices and a separator in `source-text.mjs`; a source-line hyphen at a wrap is removed. All other stanza lines are retained verbatim after trimming line-edge whitespace. CRLF is normalized to LF. Stanzas are separated by one blank line, and canto texts by one blank line. No spelling or punctuation is modernized. `validate-manuscript.mjs` checks the complete reconstruction against this retained representation, canto by canto and in total. The retained UTF-8 SHA-256 is `357817a2e5cd1992e57f1f12035231fa99b746d5620c0d8c2df1ff200682a5e6`.

| Canto | Stanzas | Verse lines | Whitespace-delimited words |
|---:|---:|---:|---:|
| I | 106 | 848 | 5,247 |
| II | 113 | 904 | 5,666 |
| III | 143 | 1,144 | 7,130 |
| IV | 104 | 832 | 5,165 |
| V | 100 | 800 | 5,057 |
| VI | 99 | 792 | 4,985 |
| VII | 87 | 696 | 4,394 |
| VIII | 99 | 792 | 4,978 |
| IX | 95 | 760 | 4,720 |
| X | 156 | 1,248 | 7,941 |
| **Total** | **1,102** | **8,816** | **55,283** |

The first retained verse is `As armas, & os barões aſsinalados,` after reflow; the last is `Sem aa dita de Achiles ter enueja.` The `manuscript-draft.pwk` preserves the source-import milestone at 367 reviewed stanza-boundary scenes. The generated `library/os-lusiadas.pwk` reconstructs that text and adds scene state and complete local artwork. The supporting views and live application inspection are recorded in `REVIEW_CHECKLIST.md` and `MAP_REVIEW.md`.
