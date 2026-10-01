# The Time Machine visual QA

## Procedure

Generate each asset from the shared direction and separate asset directive in `PROMPTS.md`. Save each PNG master immediately. Run `make-contact-sheets.ps1`, inspect all six sheets, correct any failed plate, then run `convert-approved-art.ps1` to produce compact JPEGs. Decode every JPEG and run the title validator, catalogue check, tests, repository gate, and Git whitespace check.

## Review record

- Reviewed one cover, two character, one item, and two location sheets covering all 40 final assets.
- The Victorian dinner guests have distinct ages, faces, hair, dress, and expressions. Mrs Watchett reads as a housekeeper; the Traveller remains recognizable between cover and portrait. Weena and the collective Eloi are adult and human; Morlocks are pale underground human descendants rather than monsters.
- The model, full-sized machine, and detachable lever are visually distinct. Matches, camphor, iron bar, flowers, fruit, and camera have the right object roles. The flowers plate shows two flowers.
- The Richmond house, connected interiors, workshop, and garden form a coherent Victorian setting. The future Thames Valley repeats the White Sphinx and weathered ruins; the well, underworld, museum, Sphinx chamber, and dying shore have distinct identities.
- The first garden plate was a split composition. It was regenerated and the new single-scene plate was approved in the final contact sheet.
- No obvious readable text, logos, signatures, watermarks, modern electronics, or graphic violence appears at contact-sheet resolution.
- Forty JPEGs decoded successfully after conversion. All nine lore and three faction covers resolve. Two distinct historical map images remain linked across three layers, including the editorial future overlay. Twenty-six superseded external illustration source records are archived.

Run `node scripts/the-time-machine/validate.mjs`, `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check` before committing. The title validator checks all image references, lore covers, map references, catalogue bytes, JPEG boundaries, archive count, and duplicate hashes.
