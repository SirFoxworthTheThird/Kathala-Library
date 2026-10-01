# Treasure Island visual QA

## Procedure

Generate each image separately using `PROMPTS.md` and save its PNG master immediately. Run `make-contact-sheets.ps1` and inspect every sheet for character identity and age, mid-eighteenth-century maritime details, ship and island continuity, object correctness, map utility, and unwanted text or watermarks. Regenerate failed plates before conversion. Run `convert-approved-art.ps1`, decode all JPEGs, then run the title validator, catalogue check, test suite, repository gate, and Git whitespace check.

## Review record

- Reviewed nine contact sheets: one cover, three character, two item, and three location sheets covering all 72 images.
- Jim remains adolescent; Silver is one-legged and uses a crutch; his green parrot is distinct from the dead Captain Flint. Hawkins family members, officers, loyal crew, and individual mutineers have different ages, faces, dress, and bearing.
- The Hispaniola reads as a modest two-masted schooner across Bristol, passage, island anchorage, deck, and grounded scenes. Its cabin, round-house, hold, galley, forecastle, and apple barrel read as distinct ship spaces.
- The pre-1801 Union flag has no red diagonal saltire. The Jolly Roger, treasure chart with three red crosses, coracle, larger handmade boat, arms, provisions, and buried treasure have clear object identities.
- Bristol and the English coast differ from the island's wooded hills, eastern anchorage and marsh, North Inlet, stockade, cave, and treasure ground. Four existing editorial maps remain linked for geographic and ship layout context.
- The first black-spot plate had a mark too small to read at thumbnail size. The first Livesey house plate looked like an island residence. Both were regenerated; the final contact sheets show a large black mark and an inland English Georgian house.
- No obvious readable text, logos, signatures, watermarks, modern objects, cartoon pirate costumes, or graphic violence appears at contact-sheet resolution.
- All 72 approved JPEGs decoded successfully. The 20 superseded external non-map illustration source records are archived in `superseded-external-sources.json`.

Run `node scripts/treasure-island/validate.mjs`, `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check`. The validator checks all image references, lore and faction covers, retained maps, exact catalogue bytes, JPEG boundaries, archive count, and duplicate hashes.
