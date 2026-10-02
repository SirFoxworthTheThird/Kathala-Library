# Dracula artwork replacement

Generate one original image for every illustrated cover, character, item and location slot in `library/dracula.pwk`, with no image repeated within the book. Preserve the ten functional map layers.

## Audit

- 103 illustration slots: 1 cover, 25 characters, 17 items, 60 locations.
- 10 functional maps remain linked to the original source blobs.
- Existing non-map art included external references and repeated location images. All 66 old non-map blob records have been archived and replaced by generated local images.
- `manifest.json` lists every final prompt and JPEG path. PNG masters stay local and untracked.

## Next steps

1. Open and attach a PR, wait for checks, merge, delete the remote branch and verify main.

## Local artwork verification

- Generated and visually reviewed all 103 images in nine contact sheets.
- Corrected the stake and hammer, Carfax earth box store, and the empty Demeter wheel scene.
- Converted all approved PNG masters to JPEG and imported 103 unique illustration blobs; ten functional maps remain linked.
- Removed the unreferenced former character and item PNG assets from the repository.
- `node scripts/dracula-art/validate.mjs`: 103 unique URLs and hashes, ten maps, 66 archived former art blobs.
- `npm run catalogue:check`, `npm test` (789 passed), `npm run gate`, and `git diff --check`: pass.

Do not use the CLI image fallback without explicit user approval.
