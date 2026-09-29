# The Moonstone generated-art QA

## Inventory and integration

- World cover: 1 generated JPEG.
- Characters: 27 of 27 have distinct generated portrait JPEGs.
- Items: 14 of 14 have distinct generated illustration JPEGs.
- Locations: 34 of 34 have generated illustration JPEGs.
- Lore: all 10 pages have purpose-appropriate covers.
- Maps: all 6 historical/editorial map blobs were retained; all returned HTTP 200 with `image/jpeg` content on 2026-09-29.
- Superseded external non-map illustration blobs: 0 retained.

## Visual review

The nine contact sheets in `scripts/the-moonstone/qa/` were regenerated from the final JPEGs and inspected at full resolution: one cover sheet, three character sheets, two item sheets, and three location sheets. All 76 final images were visible in the sheets.

Review checks:

- Character identity, relative age, and period clothing were checked across the complete cast.
- Penelope Betteredge and Rosanna Spearman were regenerated to make their ages, posture, features, and emotional bearing distinct.
- The four Indian guardians/custodians are individually recognizable, historically grounded, and treated as people fulfilling a religious obligation rather than as exotic villains.
- Indian locations and sacred material were checked for respectful presentation without caricature or adventure-poster spectacle.
- Objects were checked against their entity descriptions. The bank receipt was regenerated without readable dates or wording.
- The painted-door location was regenerated twice; the approved version shows a hair-thin black textile thread in cream paint, with no blood-like mark or insect shape.
- Locations were checked for identity, period architecture, and geographic consistency across Yorkshire, London, Seringapatam, and Kathiawar.
- No unwanted title text, legible invented labels, signatures, logos, or watermarks were found.
- The 76 JPEGs are readable, total 26,646,797 bytes, and contain no duplicate SHA-256 hashes.

## Automated validation

- `node scripts/the-moonstone/validate.mjs`: passed; 76 generated blobs, 6 maps, 0 missing local files, 0 unresolved image references, 0 external non-map blobs.
- `npm run catalogue:check`: passed for 46 worlds.
- `npm test`: 11 files passed, 789 tests passed.
- Repository gate: 789 tests, 0 failing, 0 expected failures; nothing broken or silently fixed. On Windows the gate's extensionless `npx` launcher required a temporary local direct Vitest invocation; that compatibility-only edit was reverted and is not part of the diff.
- `git diff --check`: passed.

## Release statement

Example rules review: COMPLETE
Source edition: Project Gutenberg eBook #155, the complete public-domain text of Wilkie Collins's *The Moonstone*.
Counts: 57 chapters, 76 events, 27 characters, 34 locations, 6 maps.
Automated validation: asset validator, catalogue check, full 789-test suite, repository gate, and diff check passed.
Visual validation: final cover, all portraits, all item plates, and all location scenes inspected through nine contact sheets; all six retained map URLs resolved as JPEG images.
Image validation: 76 generated images checked; broken local files = 0; duplicate hashes = 0; retained maps = 6.
Exceptions: none for the generated-art replacement scope.
