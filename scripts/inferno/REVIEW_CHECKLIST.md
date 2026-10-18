# Inferno release checklist

This book-specific checklist applies `docs/AUTHORING.md` and `docs/CHECKLIST.md` to the complete Longfellow translation of *Inferno* from Project Gutenberg eBook #1001.

## Source and structure

- [x] Exact edition, translator, source URL, publication metadata, rights statement, source hash, retained boundaries, and excluded packaging recorded.
- [x] All 34 cantos imported before enrichment and exact retained-verse reconstruction validated.
- [x] Every source scene boundary reviewed at adjacent verse lines for action, location, cast, knowledge, item, and frame changes.
- [x] Final scene, verse-line, stanza-group, and word counts recorded and mutation-tested.
- [x] Journey chronology and all recounted earthly or classical histories modeled without flattening them into the descent.

## Characters and continuity

- [x] Meaningful present cast, relationships, factions, knowledge, goals, and items complete.
- [x] Exactly one event-specific snapshot per physically present character; mentioned and recounted people excluded from the outer-frame cast.
- [x] Names, identities, outcomes, and divine or infernal interventions gated at the poem’s reveal points.

## Maps and artwork

- [x] Mature topographic overview and useful populated submaps completed and visually inspected.
- [x] Marker positions measured from the bottom edge; gateways, transitions, and playback exercised.
- [x] Distinct mature artwork for the world, meaningful characters, items, places, and every map inspected and recorded with exact prompts and provenance.

## Packaging and validation

- [x] Reproducible final generator, dedicated validator, source and boundary audits, artwork manifest, and exact catalogue bytes complete.
- [x] Application pass complete, including the verse-formatting correction: 197 verse blocks and all 4,720 lines render with preserved breaks. Download, reading and complete-data views, maps, gateways, playback, artwork, final verse, and console checks pass.
- [x] Book validator, `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check` pass.
- [x] Release evidence and exceptions recorded; no completion claim made before every applicable gate passes.
