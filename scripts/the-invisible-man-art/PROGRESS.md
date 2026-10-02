# The Invisible Man cover completion

The 18 character portraits, 10 item images and 36 location images are original artwork already committed in `fa95587` ("Add artwork: the remaining eleven books"). Their PWK references are distinct within the book. Keep them.

The cover alone still links to the historical Pearson cover externally. Generate one original cover that matches the existing ink and watercolor artwork. Retain the six functional maps, including four local SVG plans and two historical map links. Keep the lore-page cover reference valid.

## Remaining work

1. Open and attach a PR, wait for checks, merge, delete the remote branch and verify remote main.

## Local artwork verification

- Generated the cover with built-in imagegen, saved the PNG master locally, visually reviewed it against Griffin, Kemp, Mrs Hall and Marvel portraits, and converted it to JPEG.
- Replaced only the external cover URL. The existing portrait, item, location and map blob records remain active; the source lore page still resolves through the cover blob ID.
- `node scripts/the-invisible-man-art/validate.mjs`: 65 distinct URLs and content hashes, six retained maps, one archived cover source.
- All 65 JPEGs decode. `npm run catalogue:check`, `npm test` (789 passed), `npm run gate`, and `git diff --check` pass.

Do not use the CLI image fallback without explicit user approval.
