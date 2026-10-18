# Paradise Lost — corrected local release evidence

The authoring defects identified in `REVALIDATION.md` have been corrected. The earlier completion claim is superseded by the evidence below.

## Source and model

- Source: Project Gutenberg #26, 491,461 bytes; SHA-256 `aeedc9f33e0c2a6422d2f557462fb87cd2430974c6aed30a26803be5394a741a`.
- Complete retained poem: 12 books, 10,566 verse lines, 80,146 words.
- Normalized source SHA-256: `bc3a0cc05fb477e3ce69f035023bda845a19b79c5bf9d084532e44aca946f67d`.
- Corrected model: 164 scenes, 6 temporal strands, 25 characters, 380 individual presence states, 14 relationship states, 25 locations, 4 maps, 7 items, 66 distinct art assets.
- PWK: 916,695 UTF-8 bytes; SHA-256 `1a13641a3bd3e7a1941a6b1c195a56fac98584bf6bfc99e611e27e7d4b72d29b`.

## Corrections

`reviewed-scenes.mjs` records explicit verse starts, individual states, present casts, represented settings, frames, and item holders. The importer and generator share these reviewed cuts; equal-length allocation is removed. Every boundary audit includes the adjacent verse on both sides. Adam’s memories form an earlier strand, prospective teaching is not marked retrospective, and the source’s numbered days and relative chronology are documented in `CHRONOLOGY.md`.

Adam and Eve’s relationship changes through disagreement, blame, reconciliation, repentance, and exile. The gate guardians’ names and the prohibition fact follow their source reveals. Azazel, Mulciber, Nisroch, and Uzziel have distinct portraits. The western meeting of the patrols has its own place and ordinary artwork. Misplaced pins were corrected by reference to the actual plates, and the three child realms are no longer misidentified as floors of one building.

The artwork manifest consumes 66 exact submitted prompts, with source output paths and verified hashes. The 61 earlier requests were recovered from the generation record; the five new requests were saved at submission. Reader-facing Lore contains the attribution directly.

## Checks

- Manuscript and book validators: pass, including exact retained verse reconstruction and artwork hashes.
- Reproduction: importer, generator, artwork manifest, audits, and catalogue rerun; PWK and catalogue remain byte-identical.
- Catalogue check: 55 worlds, pass.
- Tests: 971 passed in 18 files. Mutation cases restore the old boundary, generic state, cast, chronology, relationship, naming, elapsed-time, reveal, and Lore-pointer defects and are rejected.
- Release gate: 971 tests, zero failures or expected failures.
- `git diff --check`: pass.

## Application evidence

UI QA used development commit `e9d67f4b6cec19158bdd25657271e5e4d8427659` on 2026-10-18. It imported the downloadable Library entry, checked opening and sequential reading gates, both narrative Book layouts, chronological Cards, the final verse, ten supporting pages, and the full dataset after disabling reading mode. It verified the gatekeeper’s name and the prohibition immediately before and after their reveals.

All four maps and 25 location panels were opened; each location’s ordinary image loaded. All three gateways were activated with ordinary clicks, after using the application’s character-pin filter and closing any previous popup. Nine kinds of cross-map playback transition and five specific character state displays passed. The browser recorded zero console or page errors. `qa/ui-results.json` records the exact PWK hash, application commit, checks, and location coordinates; screenshots show the rendering.

## Reproduce

Run `node scripts/paradise-lost/import-manuscript.mjs`, `node scripts/paradise-lost/generate.mjs`, `node scripts/paradise-lost/build-art-manifest.mjs`, `node scripts/paradise-lost/build-audits.mjs`, and `npm run catalogue`. Then run both dedicated validators, `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check`.

For browser QA, start the current Kathala development checkout on port 5176, set `KATHALA_QA_APP_ROOT` to that checkout and `KATHALA_QA_URL` to its URL, then run `node scripts/paradise-lost/qa-ui.mjs`. Its browser context serves this worktree’s Library assets, so the run tests the local downloadable package rather than a previously published edition.
