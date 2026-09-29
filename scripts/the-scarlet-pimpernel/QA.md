# The Scarlet Pimpernel generated-art QA

## Reproduction

Run `make-contact-sheets.ps1` while the PNG masters are present, inspect every committed sheet at full size, then run `convert-approved-art.ps1 -Quality 84`. Run `node scripts/the-scarlet-pimpernel/validate.mjs`, `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check` after integration.

## Review criteria

- All 36 assets are visible across six committed contact sheets.
- Percy, Marguerite, Chauvelin, Bingley-free cast members, the de Tournay family, League members, inn staff, soldiers, and officials remain individually recognizable and age-appropriate.
- Dress, hair, architecture, interiors, vehicles, boats, street furniture, weapons, and furnishings fit England and France in 1792 rather than later Regency or Victorian conventions.
- Images contain no readable generated text, logos, signatures, or watermarks.
- Object plates depict the correct material object.
- London, Richmond, Dover, Calais, Paris, and the Channel coast are geographically distinct; the final coastal route remains continuous from Calais through Gris-Nez to the cliff landing.
- The four historical/editorial maps are retained as functional spatial aids.

The committed contact sheets are the review record. Any rejected master must be regenerated with a new asset-specific prompt and the affected sheets rebuilt before conversion.
