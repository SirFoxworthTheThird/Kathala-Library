# Prompt set and generation method

Mode: built-in Codex imagegen, one distinct generated bitmap per manifest slot. No CLI fallback. The 107 slot-specific names and descriptions are recorded in `manifest.json`; each was combined with the common direction below and with relevant first-book scene detail.

Common direction: an original turn-of-the-century children’s book illustration in lively ink line and softly washed watercolor on warm paper; expressive natural faces, clear readable silhouette, richly observed plants and architecture, no text or captions, no modern film costume or likeness, no green-skinned witch, no ruby slippers. Keep Dorothy’s blue-and-white checked dress, silver shoes and Toto; the Scarecrow stuffed with straw, the Tin Woodman of joined tin with an oil can, and the Lion natural. Distinguish each scene’s composition and subject so the image is unique within the book.

Specific character anchors: the West Witch is an elderly woman with one powerful eye, ordinary human skin and the Yellow Castle; Glinda has long red curls, a white dress, blue eyes and a ruby throne; the North Witch has a starry white gown and white hat. The Silver Shoes item is a close still life of silver shoes with no dark or ruby shoes elsewhere in frame.

Map direction: derive a cartographic interpretation from Baum’s first book, with a desert enclosing Oz, blue Munchkin East, yellow Winkie West, red Quadling South, a neutral northern region, a single Emerald City gate, and no film character vignettes or sequel names. Preserve useful reader navigation without implying canonical distance or floor plans. Map SVGs are built by `build-maps.mjs` and rasterized by `render-maps.ps1`.

Visual review: contact sheets in `qa/contact-sheets`; all categories reviewed. Replaced the first Silver Shoes result after spotting dark shoes in its background. Final art paths and status are in the manifest. Original Denslow and map sources are recorded in `ORIGINAL-SOURCES.md` and `original-sources.json`.
