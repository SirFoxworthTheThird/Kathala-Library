# Purgatorio release status

Repeat validation completed locally on 19 October 2026. This record supersedes the earlier release claims; the defects and corrections are documented in `CORRECTIONS.md`.

## Final edition

- Source: Project Gutenberg eBook #1002, Longfellow’s *Purgatory*.
- Source SHA-256: `a84c5036f67ad127f1f39d144215bf116afb842c6b5a6d9a9dcd6f6d94cfdb60`.
- Complete retained manuscript: 33 cantos, 4,755 poem verse lines, eight translator-note lines, 1,607 poem stanza groups, 37,410 words.
- Structure: 129 explicit source-reviewed scenes on a continuous four-day ascent.
- Enrichment: 50 characters, 485 individually reviewed states, 32 locations, five items with 13 states, four maps, 93 distinct images, six knowledge facts and reveals, and four goals.
- Final PWK: 700,653 bytes; SHA-256 `b65f77d26d34e0b6651c7bd35ec3e2d8ccc0361174e96d82d40042b55cd6216a`.
- All exact generation prompts are preserved in `art-prompts.json` and bound to the final images in `ARTWORK_MANIFEST.json`.

## Validation

- Complete source reconstruction and dedicated book validator: pass.
- Catalogue count and exact-byte check: pass, 57 worlds.
- Vitest: 1,023/1,023 tests pass across 20 files, including ten mutation regressions for the corrected defects.
- Repository gate and `git diff --check`: pass.
- Generator reproduces the final PWK byte for byte.
- All final images are hashed, dimension-checked, and visually inspected.

## Latest Kathala development UI

The final downloadable PWK was validated against application commit `e920677e47ad79ea110c37855f0e0e05749e52e2`, verified to match remote `main`.

- Download, opening gate, and sequential reading reveal: pass.
- Narrative Cards, Narrative Read, and Chronological view: pass.
- Final verse and preserved line layout: 129 blocks, 4,763 retained lines.
- All supporting views in reading and complete-data modes: pass.
- Four maps, 32 location-detail images, three nested gateways, and two cross-layer playback transitions: pass.
- Six knowledge facts checked immediately before and after reveal: 12 assertions pass.
- Eight delayed names checked immediately before and after reveal: 16 assertions pass.
- Ten individual state panels and all four goal panels: pass.
- Broken images, console errors, and page errors: none.

The exact imported PWK hash and machine-readable results are in `qa/ui-results.json`; screenshots show Book layouts, maps, selected locations, and individual states. The harness fails if the PWK changes during its run.

No application source was changed. No push, PR, or merge was performed.
