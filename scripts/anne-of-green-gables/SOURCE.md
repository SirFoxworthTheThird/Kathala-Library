# Anne of Green Gables: source and retained novel

The manuscript source is [Project Gutenberg eBook 45](https://www.gutenberg.org/ebooks/45), using its [English UTF-8 plain-text file](https://www.gutenberg.org/cache/epub/45/pg45.txt), stored byte-for-byte as `source/pg45.txt`. Project Gutenberg identifies the work as *Anne of Green Gables* by L. M. Montgomery, credits David Widger and Charles Keller, records a release date of 27 June 2008 and a most recent update of 29 April 2025. The downloaded file is 606,693 bytes with SHA-256 `89a5e9fb2e0bb44562a969785385366f94e1da736aebee7d9cdf459eb0b5f9f6`.

The source is an English transcription of Montgomery’s 1908 novel. Its spelling, punctuation, capitalization, paragraphing, curly apostrophes, and chapter headings are retained. Project Gutenberg marks eBook 45 public domain in the United States. The 1908 publication is public domain in the United States, and Montgomery died in 1942, placing the work beyond the ordinary life-plus-70-year term in Portugal and the European Union.

## Extraction boundaries and exclusions

`source-text.mjs` starts with the standalone heading `CHAPTER I. Mrs. Rachel Lynde Is Surprised` after the Gutenberg start marker and ends immediately before `*** END OF THE PROJECT GUTENBERG EBOOK ANNE OF GREEN GABLES ***`. It retains all 38 chapter headings and every narrative paragraph through Chapter XXXVIII in source order.

Excluded packaging consists of the Gutenberg header and rights notice, title and author display, table of contents, blank display spacing before Chapter I, the end marker, the Project Gutenberg licence, donation material, and general information after the end marker. No dedication, epigraph, chapter, narrative paragraph, or closing sentence is excluded.

The normalization applied before extraction converts CRLF or CR newlines to LF, removes a possible UTF-8 byte-order mark, trims outer packaging-edge whitespace, and reduces runs of three or more LF characters to the source’s semantic paragraph separator of two LF characters. It does not alter text within a line. Chapter metadata stores the exact source title after its numeral. Scene drafts store the chapter bodies; reconstruction inserts each exact source heading, two LF characters, and the chapter body, then separates chapters with two LF characters. `validate-manuscript.mjs` compares that reconstruction exactly with the retained representation and independently checks source bytes, SHA-256, chapters, paragraphs, scenes, and whitespace-delimited word counts.

The first retained narrative begins `MRS. Rachel Lynde lived just where the Avonlea main road dipped down` and the final retained sentence is `“‘God’s in his heaven, all’s right with the world,’” whispered Anne softly.`.
