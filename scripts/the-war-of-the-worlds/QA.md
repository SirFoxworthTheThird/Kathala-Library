# The War of the Worlds artwork review

This edition has one original generated image for its cover, each of 14 characters, each of 10 items, and each of 32 locations: 57 distinct images. The three linked period maps remain as geographic references.

## Visual direction

The set uses late Victorian dress, buildings and equipment, with painterly ink and gouache, engraved detail, sepia and slate blue, and restrained Martian red. The Martian designs follow Wells's descriptions rather than a film adaptation. No title text is baked into the cover.

## Review procedure

1. Inspect every PNG in the committed contact sheets under `qa/contact-sheets` for correct subject, period detail, consistent visual direction, unwanted lettering and obvious visual faults.
2. Regenerate and replace any failed image, then rebuild the affected contact sheet.
3. Convert the approved 57 masters to compact JPEGs with `convert-approved-art.ps1`.
4. Run `validate.mjs` to check every image reference, local file, unique file content, archive count and catalogue byte count.

The individual prompts are in `PROMPTS.md`; `prompts.json` is the machine-readable generation record. The original PNG masters are worktree review artifacts. JPEGs and contact sheets are the committed deliverables.

## Revision

The first Heat-Ray object image showed a visible orange beam. It was regenerated with the explicit direction: "The destructive beam itself is completely invisible; no red or orange light ray, laser, or glowing line. Show its path only through igniting trees and scorched earth." The approved image depicts a polished projector and the effect of the invisible beam.
