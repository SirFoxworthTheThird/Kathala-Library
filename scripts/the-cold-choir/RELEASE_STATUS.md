# The Cold Choir — local release evidence

The complete authorized reading-mode edition is ready for review on branch `feature/the-cold-choir-reading-edition`. Remote publication remains intentionally untouched.

## Package

- Source: creator-supplied original English manuscript by Solomon Darko, copyright 2026, authorized for this edition.
- Source archive: 259,445 bytes; SHA-256 `22c091779484a001a52c8cea193028efa8f941abd61f708ca50b8236137366a8`.
- Retained text: 21 chapters, 44 authorial sections, 62 reviewed scenes, 48,573 words.
- World model: 3 separated timelines, 21 characters, 143 character snapshots, 29 locations, 3 maps, 9 items.
- Artwork: 69 single-copy PNG assets: 1 world, 21 character, 9 item, 29 location, 6 faction, and 3 map images.
- PWK: 504,030 bytes; SHA-256 `921f8ece45a80d277a2088720489a7ee62e98637f2c2709f2bb9b10a01dbce12`.

## Validation

- Exact normalized reconstruction matches the archived manuscript, including the final line.
- The book validator passes and rejects a deliberate prose mutation.
- Two consecutive generator runs produced the same PWK SHA-256.
- Catalogue: 54 worlds, exact byte count.
- Tests: 17 files and 946 tests passed.
- Gate: 946 tests, 0 failing, 0 expected failures.
- `git diff --check`: passed.

## Application review

Automated browser QA used the latest local development app commit `37aa07e881d853e650e9c1d63da6a70d0c7485ec` and the final PWK hash above. It passed download/import, opening and sequential reading reveals, all three timeline manuscripts in Draft and Reading views, ten supporting views, 29 location markers, all three map images, four representative cross-era playback transitions, all visible artwork, the final line, and a clean console. Nested gateways are not applicable because the maps are separate era-scale views rather than parent and child geography.

See `qa/ui-results.json` and the retained screenshots for machine-readable and visual evidence.
