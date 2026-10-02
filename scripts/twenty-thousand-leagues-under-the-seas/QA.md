# Twenty Thousand Leagues Under the Seas artwork review

The planned set contains 103 separate original generated illustrations: one cover, 16 character portraits, 18 item plates, and 68 location scenes. Two route-chart location markers keep the historic map images already linked in the PWK. Four map layers remain for route and deck reference.

## Visual direction

The set uses a nineteenth-century engraved and painted style, deep marine teal, oxidized brass, ivory, and coral. The Nautilus follows Verne’s long, dark, riveted electric vessel with a tapered ram and observation windows. Character and geographic prompts are grounded in the novel. Peoples encountered during the voyage are depicted with dignity and without caricature.

## Review procedure

1. Inspect every final contact sheet under `qa/contact-sheets` for subject, period detail, geographic accuracy, consistent design, unwanted text and obvious visual faults.
2. Regenerate failures and rebuild affected sheets.
3. Convert the approved PNG masters to compact JPEGs with `convert-approved-art.ps1`.
4. Run `validate.mjs` to check references, files, hashes, retained maps, source archive and catalogue byte count.

Prompts are recorded in `PROMPTS.md` and `prompts.json`. Original PNG masters are worktree review artifacts; JPEGs and contact sheets are committed deliverables.

## Final review

All 103 final images were checked on contact sheets. Five were regenerated after review: the Papuan chief for grounded clothing and presentation, the electric rifle for a single coherent still life, New York harbor to remove the anachronistic Brooklyn Bridge, the coral cemetery to depict a burial instead of a wreck, and the Nautilus entrance to show the vessel exterior. The revised images and rebuilt contact sheets were reviewed before conversion.
