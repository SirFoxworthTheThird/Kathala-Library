# Visual QA

## Procedure

Review every committed contact sheet at original resolution for character identity and age, 1620s silhouettes and equipment, rank and class distinctions, object correctness, geographic continuity, siege engineering, and unwanted text, logos, signatures, or watermarks. Regenerate any failure before JPEG conversion and integration.

## Review record

- Reviewed all eight committed sheets: one cover, three character, one item, and three location sheets.
- Confirmed the four companions, four servants, court figures, soldiers, clergy-adjacent characters, domestic workers, and political agents remain visually distinct by age, build, dress, rank, and temperament.
- Confirmed early-seventeenth-century silhouettes, hair, rapiers, jewelry, transport, interiors, fortifications, and siege works; no modern or late-Regency/Victorian substitutions were accepted.
- Confirmed route and setting continuity across Gascony, Meung, Paris, the northern road, the Channel crossing, London/Portsmouth, and La Rochelle.
- Confirmed no visible readable text, logos, signatures, or watermarks.
- Rejected the first diamond-stud plate because it appeared to contain thirteen pieces. Regenerated and approved a replacement showing exactly twelve studs in two rows of six.
- Final approved inventory: 58 JPEG assets; all decode successfully; no duplicate generated-file hashes.

## Automated acceptance

Run `node scripts/three-musketeers/validate.mjs`, `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check`. The title validator checks local blob targets, entity coverage, lore covers, retained map references, external non-map removal, JPEG signatures, archive count, and duplicate hashes.
