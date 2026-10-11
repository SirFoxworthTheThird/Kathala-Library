# English reading entry release review — 11 October 2026

The English entry retains the 367 reviewed stanza-boundary scenes, five narrative clocks, 78-character direct-presence ledger with 563 snapshots, 68 locations and eight topographic maps from the previous Os Lusíadas release. Its scene prose now reproduces Burton's public-domain 1880 English verse translation. The companion Portuguese entry retains the 1572 original. The earlier structural and artwork audits are in `scripts/os-lusiadas/REVIEW_CHECKLIST.md`, `BOUNDARY_REVIEW.md`, `CHRONOLOGY.md`, `MAP_REVIEW.md`, and `artwork-manifest.json`.

- [x] Source and structure (EX-001–EX-012): the two source volumes, rights, extraction, stanza numbering and one excluded unnumbered interpolation are documented in `SOURCE.md`. The source and book validators reconstruct all 1,102 numbered stanzas, 8,816 verse lines, and 65,812 words across 10 cantos and 367 scenes. Scene cuts remain the original reviewed stanza boundaries.
- [x] Characters and continuity (EX-101–EX-108): 78 characters, 563 event-specific direct-presence snapshots, relationships, identity and outcome gates, and multiple narrative frames are unchanged. The book validator checks exact snapshots and continuity references.
- [x] Maps and locations (EX-201–EX-208): eight topographic and interpretive maps, 68 markers, gateways, route and chronology retain the reviewed geometry. The first ocean map loaded in Kathala at its first reading reveal; the complete map, gateway and playback visual audit was performed on the same map graph in the earlier edition.
- [x] Images (EX-301–EX-308): all 166 existing assets are retained and referenced; the original manifest records image prompts, reviews, provenance and hashes. The first map and portrait loaded visibly in the English QA import.
- [x] Worldbuilding and reading mode (EX-401–EX-411): the English QA import opened in reading mode with 78 characters, 68 places and six items initially hidden; Gama and the ocean chart appeared at the first voyage scene. Book Read showed the English first and final verse; the translation Lore page displayed the Burton source and editorial exclusions. Browser console error log `[]`.
- [x] Packaging (EX-501–EX-508): the PWK remains in the Library's single-copy layout, uses no PWB, and has an exact catalogue byte count. Both language generators and all dedicated source/book validators pass; `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check` pass. The Portuguese entry remains source-exact after the English entry changes.

Kathala UI inspection used an isolated-ID QA copy of the generated English PWK because an older import occupies its production world ID. Its image URLs pointed to the same local assets through the static server on port 5174; the shipped relative URLs are validated on disk. The remotely hosted catalogue download awaits publication authorization and is not claimed as tested.

```text
Example rules review: COMPLETE for the local package and UI evidence above
Source edition: Camões, The Lusiads, translated by Richard Francis Burton, edited by Isabel Burton (London: Wyman and Sons, 1880); Project Gutenberg eBooks 77660 and 77661
Counts: 10 chapters, 367 events, 78 characters, 68 locations, 8 maps; 1,102 stanzas, 8,816 lines, 65,812 English words
Automated validation: English source and book validators, Portuguese manuscript and entry validators, catalogue check, full tests, release gate, and diff check pass
Visual validation: Book Read first and final English verses; source Lore; initial spoiler gates; first Gama/map reveal; ocean chart and portrait; browser error log []
Image validation: 166 existing assets referenced, first map and portrait rendered; original manifest covers all assets
Exception: hosted Library download awaits publication; isolated local QA copy used for app inspection
```
