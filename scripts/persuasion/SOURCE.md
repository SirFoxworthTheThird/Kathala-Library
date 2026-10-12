# Persuasion source record

The manuscript source is Project Gutenberg eBook #105, *Persuasion* by Jane Austen: <https://www.gutenberg.org/ebooks/105>. This repository archives the UTF-8 plain-text edition from the Project Gutenberg mirror at <https://www.mirrorservice.org/sites/ftp.ibiblio.org/pub/docs/books/gutenberg/1/0/105/105-0.txt> because the primary text endpoint returned HTTP 503 during retrieval.

Project Gutenberg records Sharon Partridge and Martin Ward as contributors, with revision by Richard Tonsing. Its catalogue gives an original release date of 1 February 1994 and identifies the text as public domain in the United States. The source displays the 1818 publication date. Jane Austen died in 1817, so the original English text is also beyond the ordinary life-plus-70-year term in Portugal and the European Union.

The archived source is exactly 477,866 bytes with SHA-256 `27911715ba647bebaf691bb9a7d472ec3b3264dae58f4fe2c7daf02489051105`. `.gitattributes` preserves its original CRLF bytes.

## Editorial conventions and boundaries

The edition uses curly punctuation, em dashes, British spelling, Roman-numeral headings `CHAPTER I.` through `CHAPTER XXIV.`, and source line wrapping. Those conventions are retained. Extraction normalizes CRLF/CR newlines to LF, removes a possible UTF-8 BOM, starts at the second occurrence of `CHAPTER I.` (the first belongs to the contents list), and stops immediately before the standalone `Finis` line.

Excluded packaging: the Gutenberg start marker, title/author/date display, contents list, blank display spacing, `Finis`, end marker, and any licence material outside the retained boundaries. No chapter or narrative paragraph is excluded. Reconstruction inserts each exact source heading and its exact normalized body in source order. `validate-manuscript.mjs` checks source bytes and hash, all 24 chapters, paragraph and word counts, complete ordered reconstruction, and every scene word count.
