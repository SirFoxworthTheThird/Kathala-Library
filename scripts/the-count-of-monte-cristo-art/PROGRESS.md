# The Count of Monte Cristo artwork replacement

The original edition linked 138 external Gutenberg illustrations and six historical map layers. It reused some illustration blobs across characters, objects, places, lore, and factions. The six maps are functional historical references and remain active.

Generated 126 new illustrations with the built-in imagegen tool: one cover, 41 character portraits, 17 item still lifes, 50 location views, ten lore covers, and seven faction covers. Each visible slot now has a distinct blob ID, URL, and JPEG content hash. The 138 superseded illustration source URLs are archived in `superseded-illustration-sources.json`.

The source PNG masters remain locally in the worktree and are ignored by Git. The approved JPEGs and contact sheets are committed artifacts. See `manifest.json` for every slot and its original source URL, and `PROMPTS.md` for the prompt set.

## Local verification

- Reviewed cover, character, item, location, lore, and faction contact sheets.
- All 126 JPEGs decode with System.Drawing.
- `node scripts/the-count-of-monte-cristo-art/validate.mjs`: 126 unique URLs and content hashes, six retained maps, 138 archived sources.
- `npm run catalogue:check`, `npm test` (789 passed), `npm run gate`, and `git diff --check` passed.

## Remaining work

Open and attach a pull request, wait for remote checks, merge, delete the remote feature branch, and verify remote main.

Use the built-in imagegen path for any revisions. Do not use the CLI fallback without explicit user approval.
