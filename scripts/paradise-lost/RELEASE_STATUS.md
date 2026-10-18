# Paradise Lost — local release evidence

Validated on 2026-10-18 against Kathala development commit `3921599b3e1d26dd7a081bcd550f9e3a7bcff14d`.

## Edition

- Project Gutenberg eBook #26 source: 491,461 bytes, SHA-256 `aeedc9f33e0c2a6422d2f557462fb87cd2430974c6aed30a26803be5394a741a`.
- Retained text: 12 books, 110 scenes, 10,566 verse lines, 80,146 words.
- Normalized retained-text SHA-256: `bc3a0cc05fb477e3ce69f035023bda845a19b79c5bf9d084532e44aca946f67d`.
- World model: 5 timelines, 21 characters, 268 presence snapshots, 24 locations, 4 maps, 7 items, and 61 artwork assets.
- Downloadable PWK: 794,792 UTF-8 bytes, SHA-256 `c81be0a6f9ef021fbc8a5eb02b8c690a9fdd35c4b54836bfb5ae6cd07776a908`.

## Automated checks

- Dedicated manuscript reconstruction validator: pass.
- Dedicated book and artwork validator: pass.
- Catalogue check: 55 worlds, pass.
- Repository tests: 970 passed in 18 files.
- Release gate: 970 tests, 0 failing, 0 expected failures.
- `git diff --check`: pass.
- Generator reproducibility: byte-identical PWK and catalogue byte count.

## Kathala UI

The downloadable Library entry was imported through the latest development UI. QA passed the opening and sequential reading gates; narrative Cards and Read views; chronological Cards; all ten supporting views; four illustrated maps with 24 location pins; three gateways; nine distinct cross-map playback transitions; five individual state displays; the final verse; all loaded images; and the browser console with zero errors. Exact machine results and review screenshots are in `qa/`.
