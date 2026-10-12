# Persuasion release checklist

> Reopened and completed locally 12 October 2026: source review corrected
> formulaic snapshots, offstage cast, and scene cuts, titles, or locations that
> did not match retained paragraphs. The final PWK was revalidated in Kathala.

Started 12 October 2026 from `docs/CHECKLIST.md`. An unchecked applicable item blocks release.

## Source-first manuscript gate

- [x] Remote `main`, all Library paths, and recent history show no existing *Persuasion* edition.
- [x] Project Gutenberg eBook #105, publication details, contributors, rights status, editorial conventions, exact retrieval URL, source bytes and hashes are documented.
- [x] All 24 chapters and every retained narrative paragraph are imported in source order before enrichment.
- [x] Packaging exclusions and newline normalization are explicit; the retained text reconstructs exactly.
- [x] Every final scene boundary has adjacent-paragraph, place, cast, knowledge, item and narrative-change review evidence.

## Enrichment, art and release

- [x] Meaningful events, chronology, present-character snapshots and spoiler-safe reveals satisfy `docs/AUTHORING.md`; source presence and event/location review is recorded in the audit.
- [x] Relationships, factions, goals, knowledge, motifs, items and routes are complete where meaningful.
- [x] Useful real and interpretive maps, markers, gateways and playback transitions are validated.
- [x] Distinct mature Regency artwork is generated, inspected and recorded with exact prompts, corrections, hashes and provenance.
- [x] The reproducible generator, dedicated validator, audits and final catalogue entry are complete.
- [x] Library reading mode, every Book layout and supporting view, maps, gateways, final sentence, images and console are checked on the current PWK.
- [x] `npm run catalogue:check`, `npm test`, `npm run gate`, dedicated validators and `git diff --check` pass.
- [x] Current counts, exact bytes/hash, visual evidence and remaining source-review exception are recorded in `QA.md`.

No push, pull request or merge is authorized by the current instruction.
