# Kidnapped source record

- Work: *Kidnapped: Being Memoirs of the Adventures of David Balfour in the Year 1751*
- Author: Robert Louis Stevenson
- Language: English; no translator
- Edition: Project Gutenberg eBook #421, UTF-8 plain text, last updated 23 September 2024
- Source: https://www.gutenberg.org/cache/epub/421/pg421.txt
- Project Gutenberg record: https://www.gutenberg.org/ebooks/421
- Public-domain statement: the Gutenberg record marks this edition public domain in the USA. Users elsewhere must check local law.
- Downloaded file: `source/pg421.txt`
- Downloaded-byte SHA-256: `d57ef5be2a98ff2bbe3819abc84deeeea7f5f039a4b90fd358b2babb0f75588a`

## Extraction boundaries

The retained manuscript begins at the authorial `DEDICATION` following Gutenberg’s START marker and ends immediately before Gutenberg’s END marker. It includes the dedication and all thirty chapters, with every retained narrative word preserved in order. Gutenberg’s licence/header, generated title-and-contents packaging, and END footer are excluded. The dedication is attached to Chapter I rather than represented as an invented chapter.

`source-text.mjs` verifies the boundary markers, thirty source headings, SHA-256, and normalized reconstruction. `import-manuscript.mjs` performs the required first-stage import into real chapters, events, and scene drafts before semantic records or artwork are added.
