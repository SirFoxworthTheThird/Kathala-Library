# The Woman in White artwork review

This edition has 52 separate original generated illustrations: one cover, 18 character portraits, 10 item plates, and 23 location scenes. Five historical maps remain linked for geographic reference.

## Visual direction

The set uses mid-Victorian dress and architecture, muted ivory, ink black, mist blue and bottle green, with painterly oil and engraved detail. The mystery is psychological and documentary: Anne is a living woman, and Laura and Anne must read as distinct people despite their resemblance. Letters and records are depicted without fabricated legible wording.

## Review procedure

1. Inspect all committed contact sheets under `qa/contact-sheets` for the correct subject, period details, visual consistency, accidental lettering, and obvious image faults.
2. Regenerate failed images and rebuild the affected contact sheets.
3. Convert the approved 52 PNG masters to compact JPEGs with `convert-approved-art.ps1`.
4. Run `validate.mjs` to check every image reference, file, content hash, retained map, source archive, and catalogue byte count.

The prompts and generation script are included here. Original PNG masters are worktree review artifacts; JPEGs and contact sheets are committed deliverables.

## Final review

All 52 images were checked in the final contact sheets. The first two Paris scenes showed London landmarks, so both were regenerated with the Seine, Notre-Dame, and the Île de la Cité as explicit geographic anchors. The replacement images were inspected individually and the contact sheets rebuilt. The cover and main characters retain the intended restrained Victorian palette; Anne is depicted as a living woman in white, and documents have no intentional readable wording.
