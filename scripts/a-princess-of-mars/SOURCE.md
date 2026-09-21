# Source edition and extraction boundary

The manuscript source is Edgar Rice Burroughs, *A Princess of Mars*, Project Gutenberg eBook #62, English UTF-8 plain text, released 1 April 1993 and most recently updated 12 January 2025:

https://www.gutenberg.org/cache/epub/62/pg62.txt

Project Gutenberg identifies the edition as public domain in the United States. The work is in its original English; no translator applies.

The retained text begins with the book title, byline, and dedication immediately after Gutenberg’s opening delimiter. It continues with the complete foreword and all twenty-eight chapters, ending at the final narrative sentence before Gutenberg’s closing delimiter. The Gutenberg header, licence, delimiter lines, illustration placeholders and captions, contents list, and illustrations list are packaging and are excluded. The title, byline, dedication, foreword, source chapter headings, and every narrative word are retained in order. Front matter is attached to the first chapter rather than represented as an invented chapter.

`source-text.mjs` records the downloaded file’s SHA-256 digest and reconstructs the retained text from the chapter sections. The final validator will also reconstruct it from every event scene in reading order.
