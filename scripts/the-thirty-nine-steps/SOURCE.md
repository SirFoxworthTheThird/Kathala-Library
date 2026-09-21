# Source and extraction

- Author: John Buchan; original English, no translator.
- Work: *The Thirty-Nine Steps*, first published in 1915.
- Edition: Project Gutenberg eBook #558, UTF-8 text, updated 7 April 2021.
- Catalogue: https://www.gutenberg.org/ebooks/558
- Exact downloaded file: https://www.gutenberg.org/cache/epub/558/pg558.txt
- Credits: Jo Churcher; HTML version by Al Haines; corrections by Menno de Leeuw.
- Gutenberg identifies this edition as public domain in the United States. This is the 1915 novel, not a film adaptation or a later translation.
- Downloaded 15 September 2026. The archived source is normalized to UTF-8 LF without changing its words. Its SHA-256 is computed by `source-text.mjs` and recorded in the validation evidence.

Extraction starts at the dedication’s `TO / THOMAS ARTHUR NELSON / (LOTHIAN AND BORDER HORSE)` and ends immediately before the Gutenberg END delimiter, after the final narrative paragraph. The dedication, its September 1915 date, all ten original chapter headings, and every narrative paragraph are retained in order. The dedication precedes Chapter I within its first scene draft; it does not introduce an invented chapter or event.

Excluded packaging: Gutenberg header, production credits, initial `[Illustration]` placeholder, duplicated book title/author wrapper, contents list, END delimiter, and licence. There are no narrative omissions. Paragraph reflow may change whitespace only; spelling, punctuation, dialogue, and words remain intact. No source prose is copied into original structural summaries.

The first authoring action after source retrieval is `node scripts/the-thirty-nine-steps/import-manuscript.mjs`, which puts the entire extracted text into ten chapter scene drafts and verifies reconstruction. Semantic event division subsequently replaces those initial drafts at reviewed paragraph boundaries.
