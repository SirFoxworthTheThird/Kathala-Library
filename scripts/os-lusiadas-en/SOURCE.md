# English reading text: source and normalization

The English entry uses **Luís de Camões, *Os Lusiadas (The Lusiads)*, translated by Richard Francis Burton, edited by Isabel Burton (London: Wyman and Sons, 1880)**. Project Gutenberg's two-volume transcription is [eBook 77660](https://www.gutenberg.org/ebooks/77660) (cantos I–VI) and [eBook 77661](https://www.gutenberg.org/ebooks/77661) (cantos VII–X), credited to Hendrik Kaiber and the Online Distributed Proofreading Team from Internet Archive images. Gutenberg states both eBooks are public domain in the United States. Burton died in 1890 and Isabel Burton in 1896; the 1880 translation and edition are beyond the ordinary copyright term in Portugal. The exact UTF-8 plain-text downloads are archived as deterministic gzip files in `source/`.

| Source | Raw UTF-8 bytes | SHA-256 |
|---|---:|---|
| `pg77660.txt` | 327,626 | `7554f5cebb4f1d4ab224728374fe3f2104145e3110d3c339e3e8d189ab77359a` |
| `pg77661.txt` | 268,867 | `3b7e54d94128ab1dc35b3a8b6ccb077bd6414591b44a8204a1b2509544f32f18` |

`source-text.mjs` begins at the **second** standalone `CANTO I.` through `CANTO VI.` heading in volume 1 and the second `CANTO VII.` through `CANTO X.` in volume 2. The first occurrence is a synopsis before the poem. Each canto ends immediately before its `CANTO [number]. ENDNOTES.` heading. This excludes front matter, canto synopses, endnotes, the separately printed rejected stanzas, back matter, and Gutenberg packaging. All 1,102 **numbered** poem stanzas are retained in source order. Two ornamental `* * * * *` dividers are excluded. The unnumbered eight-line passage beginning “Then waxt the woeful wail a sorer strain,” between X.40 and X.41 is excluded because it has no corresponding numbered stanza in the 1572 poem; the scene ledger and both language entries align to that original stanza sequence. It remains in the archived source for audit.

CRLF is normalized to LF, stanza line indentation and the right-aligned stanza numbers are removed, and numeric footnote call markers such as `[58]` are removed because the endnotes are outside the retained poem. Textual spelling, punctuation, capitalization, and the eight verse lines of each retained stanza are otherwise preserved. Stanzas are separated by one blank line. `validate-source.mjs` pins both raw files and the normalized retained text by SHA-256, checks stanza numbering and canto counts, and `scripts/os-lusiadas/validate-book.mjs` reconstructs all 367 reading scenes against the retained translation. Normalized text: 393,017 UTF-8 bytes, SHA-256 `55a4b46f721432b8abfe6947b80fc7bd49c397ac8ac8f0b522c19645a4f01135`.

| Canto | Stanzas | Verse lines | Whitespace-delimited words |
|---:|---:|---:|---:|
| I | 106 | 848 | 6,304 |
| II | 113 | 904 | 6,788 |
| III | 143 | 1,144 | 8,444 |
| IV | 104 | 832 | 6,200 |
| V | 100 | 800 | 6,101 |
| VI | 99 | 792 | 6,002 |
| VII | 87 | 696 | 5,192 |
| VIII | 99 | 792 | 5,922 |
| IX | 95 | 760 | 5,695 |
| X | 156 | 1,248 | 9,164 |
| **Total** | **1,102** | **8,816** | **65,812** |

The original Portuguese text and its separate 1572 source audit remain in `scripts/os-lusiadas/SOURCE.md`; the companion Portuguese PWK regenerates its verse passages from that source. All existing scene cuts, events, chronological frames, reveals, maps, and images are retained across both language entries.
