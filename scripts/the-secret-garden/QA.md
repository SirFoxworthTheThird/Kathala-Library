# The Secret Garden generated-art QA

Run `make-contact-sheets.ps1` while PNG masters are present, inspect every committed sheet at full size, then run `convert-approved-art.ps1 -Quality 84`. After integration run `node scripts/the-secret-garden/validate.mjs`, `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check`.

Review all 50 assets for character identity and age; Edwardian dress and hair; historically plausible colonial, railway, maritime, manor, horticultural, medical, and service details; absence of readable generated text and watermarks; correct objects; and continuity among the manor exterior, interiors, grounds, ivy wall, hidden door, dormant garden, and restored garden. The committed contact sheets are the review record; rejected assets must be regenerated and affected sheets rebuilt.
