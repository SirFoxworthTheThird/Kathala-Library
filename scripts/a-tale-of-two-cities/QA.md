# A Tale of Two Cities visual QA

## Procedure

Run `make-contact-sheets.ps1` over the saved PNG masters. Inspect all nine committed sheets at full resolution for distinct characters and ages; plausible late-eighteenth-century clothing, architecture, transport, courts, prisons, domestic work, and revolutionary symbols; correct object identity; geographic continuity between England and France; and unwanted text, logos, signatures, or watermarks. Run `convert-approved-art.ps1` after review and confirm every JPEG decodes. Run `node scripts/a-tale-of-two-cities/validate.mjs`, `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check` before committing.

## Review record

- Reviewed one cover, three character, two item, and three location contact sheets covering all 69 illustrations.
- The cover identifies Lucie, Carton, and Darnay distinctly. Character sheets distinguish the Manette family, the Defarges, English legal and banking figures, aristocrats, working families, and revolutionary figures by dress, age, setting, and bearing.
- Object plates make the 15 items identifiable without relying on readable inscriptions. The guillotine and wine-cask plates depict their significance without graphic violence.
- Location sheets distinguish the muted Georgian London and road scenes from the stone and smoke of Paris and Saint Antoine. The Bastille, La Force, Conciergerie, Old Bailey, Tellson's offices, Manette homes, Evrémonde estate, and final tumbril route have individual compositions.
- No obvious unwanted readable text, logos, signatures, watermarks, modern objects, or graphic gore appears at contact-sheet resolution.
- The three useful linked historical maps remain in the PWK. The 73 superseded external non-map illustration records are archived in `superseded-external-sources.json`.
- All 69 approved JPEGs decoded successfully with System.Drawing after conversion. The validator checks blob targets, entity and lore coverage, map references, exact catalogue bytes, JPEG boundaries, archive count, and duplicate hashes.

The contact sheets are review aids; individual full-resolution artwork is retained as compact JPEG files in the library asset directory.
