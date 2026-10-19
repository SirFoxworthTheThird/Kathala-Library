# Purgatorio release status

Completed locally on 2026-10-19 from `feature/purgatorio-reading-edition`. No remote action has been taken.

## Edition

- Source: Project Gutenberg eBook #1002, *Divine Comedy, Longfellow’s Translation, Purgatory*.
- Source SHA-256: `a84c5036f67ad127f1f39d144215bf116afb842c6b5a6d9a9dcd6f6d94cfdb60`.
- Retained: 33 cantos, 1,609 stanza groups, 4,763 verse lines, and 37,410 words.
- Structure: 99 source-reviewed scenes on one continuous ascent timeline.
- Enrichment: 48 characters, 362 event-specific snapshots, 32 locations, five items, four maps, and 90 images.
- Final PWK: 620,244 bytes; SHA-256 `2619f27c55ed007b98bb208408a3ff0c8c7ecbd04af0ec583389a14e71bdc615`.
- Generator reproducibility: a clean rerun reproduced the same PWK SHA-256 byte for byte.

## Validation evidence

- Staging manuscript validator: pass; normalized retained verse SHA-256 `11a9dd6a9b4ee8d1cabf158ed905e7fd100547c2048e256bb206626be85330d8`.
- Dedicated book validator: pass.
- Catalogue byte and count check: pass, 57 worlds.
- Vitest: 1,012/1,012 pass across 20 files.
- Repository gate: pass.
- `git diff --check`: pass.
- Artwork: 90/90 final PNGs hashed, dimension-checked, and visually reviewed in labelled contact sheets.
- Maps: four final topographic illustrations visually reviewed in source and rendered UI form; bottom-origin markers and routes align with the final art.

## Kathala UI

Validated against application commit `37aa07e881d853e650e9c1d63da6a70d0c7485ec` using the downloadable local catalogue entry.

- Download and opening reading gate: pass, with Dante and Virgil revealed.
- Sequential reading reveal: pass.
- Narrative Cards, Narrative Read, and Chronological Cards: pass.
- Final verse and verse layout: pass; 99 verse blocks, 4,763 lines, preserved line breaks.
- Ten supporting views in reading mode and nine data views with reading mode disabled: pass.
- Four maps, 32 location detail images, three nested gateways, and two cross-layer playback transitions: pass.
- Five sampled event-specific character state panels: pass.
- Broken images: none.
- Browser console and page errors: none.

The machine-readable UI record is `qa/ui-results.json`. Screenshots in `qa/` show the catalogue, Book layouts, every map, and sampled character states. `qa/rendered-maps-contact.jpg` records the final map inspection.