# Combined Fellowship and Two Towers illustration replacement

Status at 2026-10-03: artwork complete on `feature/lotr-fellowship-two-towers-art` in `F:\Projects\WorldBreaker\Kathala-Library-oz-art`. Continue with the built-in image tool. Do not use the CLI fallback without the user's explicit approval.

The user explicitly approved recurring continuations through completion, including PR merge and remote branch cleanup after checks pass. The active heartbeat named "Finish Fellowship and Two Towers art" targets this chat for the next run after the image-tool reset. If the tool reaches its limit again, save and push a checkpoint and reschedule that same heartbeat after the new reset. Delete it only when both books are merged and remote main is verified.

## User direction

Work on both books together. Reuse art for the same subject across books, but never repeat an illustration inside either book. Base visuals on Tolkien's books and avoid resemblance to the films, their actors, costumes, creature designs, or compositions.

## Inventory and progress

- `manifest.json` lists 217 distinct original illustrations for 389 cover, character, item and location slots: 173 Fellowship and 216 Two Towers. Exactly 172 illustrations are shared across books. Book-specific extras are one Fellowship cover and 44 Two Towers subjects.
- All 217 final images are accepted, registered, and converted to JPEG. The PNG masters are ignored by Git. No assets remain pending.
- `make-contact-sheets.ps1` produced category sheets; all final character, item and location sheets were reviewed.
- The accepted Fellowship cover depicts Tom Bombadil guiding the four hobbits from the Old Forest, a book scene omitted by the films. The accepted Two Towers cover depicts Faramir speaking to Frodo and Sam in Henneth Annûn. Accepted shared art includes a distinctly non-film Aragorn, Arwen, a shadow-and-flame Balrog without film horns or wings, and Barliman Butterbur.
- An earlier Fellowship cover with a nine-person lineup, an earlier Aragorn that resembled the film actor, a multi-pose Boromir, a blond film-like Legolas, an eye-shaped Sauron, and initial Erestor, Glóin, and Saruman variants with film-like Council or character imagery were rejected and are not part of the registered assets.
- The original `.pwk` files contained 69 and 104 linked image blobs. The companion `.pwb` bundles contained 80 and 66 embedded blobs, including 14 map blobs in each. The import replaced all linked and embedded non-map art and preserved the functional map bundles. Two map layers in each book reuse a map image for navigation overlays; the no-repeat rule is enforced on cover, character, item and location illustrations.
- A trial set of schematic SVG maps was discarded after discovering the embedded maps. No map replacements are pending.
- `import-art.mjs` imported unique image refs per book, kept the map-only PWB, archived old blob metadata, updated the catalogue, and corrected Fellowship's `Endoras` typo to `Edoras`.
- `validate.mjs` checks final art URL/hash uniqueness, map resolution, source removal, and catalogue sizes after import. Final validation passes: 173 unique Fellowship illustrations, 216 unique Two Towers illustrations, and 14 retained map blobs per book.

## Remaining publication steps

Commit and push the validated integration, open and attach a PR, wait for remote checks, merge, delete the remote feature branch, and verify remote main.
