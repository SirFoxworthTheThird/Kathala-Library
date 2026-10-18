# Paradise Lost release checklist

**Correction review complete.** The original revalidation findings are retained in `REVALIDATION.md`; current source, model, artwork, map, test, and UI evidence is in `RELEASE_STATUS.md`.

This book-specific checklist applies `docs/AUTHORING.md` and `docs/CHECKLIST.md`.

## Source and structure

- [x] Current remote `main`, library paths, and recent history contain no Paradise Lost world.
- [x] The complete twelve-book source edition and headings were verified.
- [x] Exact source bytes, publication details, conventions, rights, and extraction boundaries are recorded.
- [x] Every retained verse line reconstructs exactly from reviewed scene cuts.
- [x] Scene boundaries and narrative frames are audited.
- [x] Timeline count, chronology, tension, and elapsed time are justified.

## Continuity and worldbuilding

- [x] Present cast is source-reviewed for every event.
- [x] Every present character has one event-specific snapshot and absent mentions have none.
- [x] Names, identities, interventions, outcomes, knowledge, relationships, factions, goals, items, motifs, and routes are gated at their source reveal.
- [x] Standing descriptions and supporting records pass a manual spoiler sweep.

## Maps and artwork

- [x] Cosmological overview and useful populated submaps are complete.
- [x] Every map is a mature topographic/cosmographic illustration with bottom-origin markers visually checked.
- [x] Gateways, transitions, and playback are exercised.
- [x] Distinct world, character, item, place, and map artwork is generated and visually inspected.
- [x] Exact prompts, corrections, hashes, dimensions, and provenance are recorded.

## Packaging and release

- [x] Reproducible generator and dedicated validator pass.
- [x] Source, scene-boundary, presence, chronology, artwork, and UI audits are complete.
- [x] Single-copy `library/` package and exact catalogue UTF-8 byte size are current.
- [x] `npm run catalogue:check`, `npm test`, `npm run gate`, and `git diff --check` pass.
- [x] Downloadable PWK passes Kathala reading-mode and all-view UI QA with no relevant console errors.
- [x] Completed work is committed locally.

