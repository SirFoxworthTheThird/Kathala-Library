# Inferno release status

Completed locally on 2026-10-18 from `feature/inferno-reading-edition`.

## Edition

- Source: Project Gutenberg eBook #1001, *Divine Comedy, Longfellow’s Translation, Hell*.
- Source SHA-256: `10fad2f10aaffec3bfe3fd63266544f7fd5bba576cd5c63afe68e8212849754d`.
- Retained: 34 cantos, 1,596 stanza groups, 4,720 verse lines, and 37,417 words.
- Structure: 197 source-reviewed scenes across seven separate timeline strands.
- Enrichment: 66 characters, 495 event-specific snapshots, 52 locations, eight items, six maps, and 133 images.
- Final PWK: 767,877 bytes; SHA-256 `74094779c9fb667d59f8e31337ce98537ea04c1e61ef68afde3ec72fef3a4f87`.

## Validation evidence

- Dedicated book validator: pass.
- Catalogue byte and count check: pass, 56 worlds.
- Vitest: 991/991 pass across 19 files.
- Repository gate: pass.
- `git diff --check`: pass.
- Artwork: 133/133 final images hashed, dimension-checked, and visually reviewed using labelled contact sheets. The first Ruggieri portrait was rejected and replaced.
- Maps: six final topographic illustrations visually reviewed; bottom-origin markers and routes corrected against the final art.

## Kathala UI

Validated against application commit `e920677e47ad79ea110c37855f0e0e05749e52e2` using the downloadable catalogue entry.

- Download and initial reading gate: pass.
- Sequential reading reveal and Geryon name/knowledge gates: pass.
- Narrative Cards, Narrative Read, and Chronological Cards: pass.
- Final verse in Read view: pass.
- Ten supporting views in reading and complete-data modes: pass.
- Six maps, 52 location detail images, four overview gateways, and eleven unique playback transitions: pass.
- Five sampled event-specific state panels: pass.
- Broken images: none.
- Browser console and page errors: none.

The machine-readable UI record is `qa/ui-results.json`; screenshots in `qa/` show the catalogue, Book layouts, each map, selected location art, and sampled character states.
