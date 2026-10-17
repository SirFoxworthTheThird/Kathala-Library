# Source and rights record

## Work

- Title: *The Undersong*
- Author credit: Solomon Darko (pen name)
- Language: English
- Supplied file: `C:\Users\PCcom\Downloads\Undersong\the-undersong.md`
- Archived source: `scripts/the-undersong/source/the-undersong.md`
- Source bytes: 80,083 on disk; decoded UTF-8 text length 80,055 characters
- SHA-256: `cbfc15db2a76e3cb1d90edbb0035febd65c01de6cfee020193d5eb7445c4ca65`

## Authority and rights

The manuscript was supplied directly in this authoring conversation by its creator, who requested that it become the next Kathala book under the pen name Solomon Darko. It is an original copyrighted work, reproduced in this Library edition with the author's direct permission. The catalogue and reader-facing colophon credit only Solomon Darko and do not expose another identity. No public-domain claim is made.

Notice used by the edition: `Copyright © 2026 Solomon Darko. Included in Kathala with the author's permission. All rights reserved.`

## Retained boundaries

The retained source begins with `# Ch. 1 — The Breaking-In` and ends with `more as the place where Agnes had been.` Every one of the eight chapter headings, twenty-six section headings, and all narrative paragraphs between them are retained in source order. Nothing in the supplied file is excluded as packaging; Markdown heading markers are represented structurally as Kathala chapter and scene titles rather than copied into scene prose.

## Reconstruction normalization

`source-text.mjs` decodes UTF-8, converts CRLF to LF, removes trailing horizontal whitespace, collapses runs of three or more newlines to one blank line, and ends the comparison with one LF. The validator reconstructs the Markdown document from chapter titles, section titles, and scene prose under that normalization. It separately checks the archived source byte hash and the complete ordered narrative word count.

The normalized manuscript contains 8 chapters, 26 authorial sections, and 15,530 narrative words. Scene refinement may split a section only at an existing paragraph boundary; joining refined scenes with one blank line must reproduce the same normalized narrative.
