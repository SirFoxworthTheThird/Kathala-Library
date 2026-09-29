# Pride and Prejudice generated-art QA

The committed contact sheets in `qa/contact-sheets` were reviewed at original resolution before JPEG conversion.

- Inventory: 1 cover, 34 characters, 17 items, 24 locations, 12 lore pages, and 6 retained maps.
- Review targets: identity and age consistency; Regency hair and clothing silhouettes; class and occupation; object correctness; accidental text, logos, and watermarks; location identity; geographic continuity across Hertfordshire, London, Kent, Derbyshire, and Brighton.
- Working masters: PNG.
- Delivery format: compact JPEG at quality 84 after approval.

## Review result

- Approved: one cover, 34 character portraits, 17 item plates, and 24 location scenes.
- Character review: the Bennet sisters are distinct in age and temperament; Darcy, Bingley, Wickham, Collins, the Gardiners, servants, clergy, and militia retain separate class and occupational cues.
- Period review: hairstyles, empire-waist silhouettes, menswear, uniforms, transport, interiors, and architecture were checked against an 1811–1812 setting.
- Content review: no logos or watermarks; letter marks and shop signs are decorative and not readable; objects match their assigned entities.
- Continuity review: Longbourn, Netherfield, Meryton, Rosings, Hunsford, Pemberley, Lambton, London, and Brighton remain visually and geographically distinct.
- Map review: five retained endpoints resolved unchanged; the broken generic Sussex endpoint was updated to the current East Sussex map (appropriate to Brighton), and all six then returned HTTP 200.

## Rejected and regenerated

- `characters/mrs-bennet`: replaced an anachronistic later sleeve silhouette with a fitted-sleeve Regency day dress.
- `characters/mrs-philips`: replaced the same later sleeve problem and clarified her provincial social position.
- `items/pemberley-portrait`: replaced a facial-hair mismatch with a clean-shaven portrait based directly on the approved Darcy portrait.
- `locations/brighton-camp`: removed an anachronistic pleasure pier and later resort skyline.

## Reproduction

1. Generate or replace PNG working masters under `library/pride-and-prejudice/art/generated` using the asset-specific direction in `PROMPTS.md`.
2. Run `make-contact-sheets.ps1` and inspect every committed sheet.
3. Run `convert-approved-art.ps1 -Quality 84`.
4. Run `../integrate-pride-and-prejudice-generated-art.js` from the repository root.
5. Run `node scripts/pride-and-prejudice/validate.mjs`, catalogue checks, tests, the repository gate, and `git diff --check`.
