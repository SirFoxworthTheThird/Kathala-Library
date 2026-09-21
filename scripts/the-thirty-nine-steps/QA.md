# Validation record

- Source reconstruction: exact after whitespace normalization; 40,896 whitespace-delimited words.
- Structure: 10 source chapters, 72 events, 72 one-to-one scene drafts.
- Artwork review: 77 files opened through five contact sheets; broken = 0; byte duplicates = 0; intentional reuse = 0.
- Maps reviewed: Britain, London, Galloway, Black Stone Farm, the Ruff at Bradgate.
- Application pass: passed against PlotWeave `main` at `57069c0` in an isolated worktree. Downloaded through the Library UI, confirmed reading mode on arrival, advanced all 72 scenes with the visible time cursor, and inspected Dashboard, Timeline, Manuscript, Characters, Maps, Calendar, Corkboard, Structure, Items, Relationships, Character Arc, Lore, Factions, Knowledge, and Settings.
- Reveal gating: at the opening only Richard Hannay is present in the character roster; Scudder, the Black Stone, future maps, items, factions, and knowledge remain hidden. At the final scene all 20 on-stage characters are visible; Constantine Karolides remains index-hidden because he is mentioned rather than physically present, matching PlotWeave's reading-gate rule.
- Map playback: verified transitions from Britain to London, back to Britain, into the Black Stone Farm, into the Ruff at Bradgate, and back to Britain. All five maps rendered their artwork and at least one marker. Marker placement was reviewed visually in the application; the machine-readable run record is `qa/app-results.json`.
- Artwork in app: Library cover loaded; 77/77 linked image records returned successfully; all five map images rendered. Browser console errors = 0; warnings = 0.
- Manuscript in app: 10 chapters, 72 scenes, 40,896 words; opening dedication and final sentence verified.
- Application defect found and fixed on the uncommitted PlotWeave branch `fix/map-cursor-transitions`: Previous/Next and timed playback now send map focus updates, and a newly revealed location is focused after the reading gate catches up. PlotWeave unit tests: 2,231 passed. Production build: passed.
- Automated library checks: book validator passed; catalogue check passed; 700/700 tests passed; `git diff --check` passed.
