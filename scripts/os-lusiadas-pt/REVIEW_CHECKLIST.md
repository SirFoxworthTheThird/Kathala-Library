# Portuguese entry release review — 11 October 2026

This entry inherits the source-first authoring, scene boundaries, cast and snapshot ledger, chronology, factions, knowledge, map geometry, gateways, and 158 non-map artworks from the complete `os-lusiadas` entry. See its `REVIEW_CHECKLIST.md` for the earlier EX-001–EX-507 structural evidence. The Portuguese validator checks the original 1572 verse separately and proves structural equality after restoring documented locale fields, IDs, and the English entry's verse passages.

- [x] Source and structure (EX-001–EX-012): exact 1572 Portuguese verse passages retained; 10 cantos, 1,102 stanzas, 8,816 lines, 55,283 words, 367 reviewed scenes. Source and cut audits inherited and revalidated.
- [x] Characters and continuity (EX-101–EX-108): 78 records and 563 present-character snapshots, with the same gates and separate narrative clocks; deep structural equality checked.
- [x] Maps and locations (EX-201–EX-208): 68 markers, eight populated layers and original gateway geometry retained; new Portuguese topographic PNGs rendered and all eight viewed in Kathala. Geographic and allegorical status is stated in Portuguese Lore. Original entry's gateway and playback review applies to the unchanged map graph; the Portuguese QA import checked the first reveal and layer switching.
- [x] Images (EX-301–EX-308): eight new map PNGs visually reviewed; 158 source-entry illustrations intentionally shared. All 166 package blob paths resolve. Original artwork manifest records prompts, provenance, image review and hashes; the localization record explains shared art and new map renders.
- [x] Worldbuilding and reading mode (EX-401–EX-411): all IDs, references, reveals, states and supporting records match the reviewed source entry. The exact Portuguese PWK opened in Kathala reading mode with early spoilers hidden. Book and supporting pages rendered in the isolated QA import; browser error log `[]`.
- [x] Packaging (EX-501–EX-508): one new PWK in `library/`, no `.pwb`, 50-entry catalogue with exact UTF-8 byte count, offline generator, dedicated validator, source validator, `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check` passed. New map assets occupy only `library/os-lusiadas-pt/maps/`; other art remains in its original single-copy location.

UI limitation: the unpublished Library-worktree map URLs were not served by the development app. A temporary QA copy used an asset server for visual inspection. This is recorded rather than presented as validation of published catalogue hosting. Remote publication and its hosted download check await separate user authorization.

```text
Example rules review: COMPLETE for the local Portuguese package and UI checks described above
Source edition: Camões, Os Lusíadas (Lisbon: António Gonçalves, 1572), Project Gutenberg eBook 27236, original Portuguese
Counts: 10 chapters, 367 events, 78 characters, 68 locations, 8 maps; 1,102 stanzas, 8,816 lines, 55,283 words
Automated validation: source and Portuguese validators pass; catalogue 50 entries; 860/860 tests; gate 860/860; diff check clean
Visual validation: eight Portuguese map layers, initial reading reveal, Book and supporting views in Kathala development UI
Image validation: 166 resolvable references, including eight newly rendered Portuguese maps and 158 intentionally shared illustrations
Exception: unpublished Library URLs required a local static asset server for map QA; hosted catalogue download untested until publication
```
