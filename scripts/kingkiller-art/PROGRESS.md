# Kingkiller artwork correction

The user requires no repeated image within either *The Name of the Wind* or *The Wise Man's Fear*. A generated image may be reused across the two books for the same subject. The earlier 23 and 37 image sets are retained where they match one slot each. Functional map layers remain linked.

## Audit

- *The Name of the Wind*: 114 illustrated cover, character, item and location slots; 23 existing generated images stay with one slot each; 22 slots reuse original images from the companion book; 69 new distinct images are required.
- *The Wise Man's Fear*: 178 illustrated slots; 37 existing generated images stay with one slot each; 81 slots reuse original images from the companion book, including new images being made for shared subjects; 60 new distinct images are required.
- Total new images generated: **129**. They are listed in `manifest.json` with prompts and output paths.
- The 14 referenced embedded portraits and other non-map blobs in *The Name of the Wind* `.pwb` have been removed from active use. The five map blobs remain. Superseded blob metadata is archived here.

## Remaining work

1. Push, open and attach a PR; wait for remote checks, merge, remove the remote feature branch and verify remote main.

## Local verification

- Reviewed all 25 contact sheets. Regenerated the draccus field guide, Denner Resin, Trebon Town Hall, Master Elxa Dal, Teren, Carceret and Magwyn after visual review.
- Converted all 129 approved PNG masters to JPEG and integrated 114 and 178 illustrated slots respectively.
- `node scripts/kingkiller-art/validate.mjs`: passes; no repeated URL or content hash within either book; 5 and 11 maps preserved.
- `npm run catalogue:check`, `npm test` (789 tests), `npm run gate`, and `git diff --check`: pass.

Use built-in image generation. Do not use the CLI fallback without explicit user approval.
