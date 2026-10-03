# Combined Fellowship and Two Towers illustration replacement

Status at 2026-10-03: in progress on `feature/lotr-fellowship-two-towers-art` in `F:\Projects\WorldBreaker\Kathala-Library-oz-art`. Continue with the built-in image tool. Do not use the CLI fallback without the user's explicit approval.

The user explicitly approved recurring continuations through completion, including PR merge and remote branch cleanup after checks pass. The active heartbeat named "Finish Fellowship and Two Towers art" targets this chat for the next run after the image-tool reset. If the tool reaches its limit again, save and push a checkpoint and reschedule that same heartbeat after the new reset. Delete it only when both books are merged and remote main is verified.

## User direction

Work on both books together. Reuse art for the same subject across books, but never repeat an illustration inside either book. Base visuals on Tolkien's books and avoid resemblance to the films, their actors, costumes, creature designs, or compositions.

## Inventory and progress

- `manifest.json` lists 217 distinct original illustrations for 389 cover, character, item and location slots: 173 Fellowship and 216 Two Towers. Exactly 172 illustrations are shared across books. Book-specific extras are one Fellowship cover and 44 Two Towers subjects.
- 145 final images are accepted, registered, and converted to JPEG: assets 001-144 and 174. The PNG masters are ignored by Git. 72 assets remain pending.
- `make-contact-sheets.ps1` produces category sheets for visual review; the first cover and character sheets were generated and inspected.
- The accepted Fellowship cover depicts Tom Bombadil guiding the four hobbits from the Old Forest, a book scene omitted by the films. The accepted Two Towers cover depicts Faramir speaking to Frodo and Sam in Henneth Annûn. Accepted shared art includes a distinctly non-film Aragorn, Arwen, a shadow-and-flame Balrog without film horns or wings, and Barliman Butterbur.
- An earlier Fellowship cover with a nine-person lineup, an earlier Aragorn that resembled the film actor, a multi-pose Boromir, a blond film-like Legolas, an eye-shaped Sauron, and initial Erestor, Glóin, and Saruman variants with film-like Council or character imagery were rejected and are not part of the registered assets.
- The `.pwk` files contain 69 and 104 linked image blobs. The companion `.pwb` bundles contain 80 and 66 embedded blobs, including 14 map blobs in each. Many apparent missing references resolve through `.pwb`. The artwork task will replace all linked and embedded non-map art; preserve the functional map bundles. Two map layers in each book reuse a map image for navigation overlays; the no-repeat rule is enforced on cover, character, item and location illustrations.
- A trial set of schematic SVG maps was discarded after discovering the embedded maps. No map replacements are pending.
- `import-art.mjs` is prepared but intentionally refuses to run until all 217 approved JPEGs exist. It will import unique image refs per book, keep the map-only PWB, archive old blob metadata, update the catalogue, and correct Fellowship's `Endoras` typo to `Edoras`.
- `validate.mjs` checks the checkpoint now and will check final art URL/hash uniqueness, map resolution, source removal, and catalogue sizes after import. Current checkpoint validation passes at 145/217.

## Next actions

1. Generate assets with `status: pending` in `manifest.json` through one built-in imagegen call per asset. Use the book-first prompt rules in `PROMPTS.md`. Visually inspect, reject film-like results, and register selected PNGs with `node scripts/lotr-two-books-art/register-generated.mjs NUMBER SOURCE_PNG`.
2. Convert accepted PNGs with `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/lotr-two-books-art/convert-approved-art.ps1`; it writes the final JPEGs. Build and visually review contact sheets, regenerate any film-like or wrong-subject images.
3. Once 217 are accepted, run `node scripts/lotr-two-books-art/import-art.mjs`, `npm run catalogue`, `node scripts/lotr-two-books-art/validate.mjs`, `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check`.
4. Commit, push, open and attach a PR, wait for remote checks, merge, delete the remote feature branch, and verify remote main.
