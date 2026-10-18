# Paradise Lost revalidation — 2026-10-18

Reviewed commit: `856239ce9af5391c1367bb90a8b5052a878cead4`.

Initial review result: **FAIL — authoring corrections required**. The previous completion statement was superseded by this review. **All findings below have since been corrected and revalidated**; current counts, reproducibility, test results, and fresh UI evidence are in `RELEASE_STATUS.md`. The findings are retained here as the record of what the correction addressed.

## Passing automated checks

The manuscript and book validators pass: 12 books, 110 scenes, 10,566 verse lines, 80,146 words, and exact normalized source reconstruction. All 61 artwork hashes match the manifest. The PWK is 794,792 bytes with SHA-256 `c81be0a6f9ef021fbc8a5eb02b8c690a9fdd35c4b54836bfb5ae6cd07776a908`. Catalogue check passes for 55 worlds. All 970 tests in 18 files pass; the gate reports zero failures. `git diff --check` passes on the reviewed commit.

These checks establish text coverage and structural consistency. They do not establish the correctness of the scene model.

## Blocking findings

1. **Scene cuts do not follow the represented action (EX-003, EX-012, EX-102, EX-105).** `boundaries()` in `generate.mjs` divides each book into approximately equal line counts and selects nearby punctuation. Book I's “The Argument and Invocation” includes lines 1–105, ending in Satan's speech, but assigns only the Poet and the cosmic location. “Mammon Mines the Hill” contains lines 497–608, ending with Satan surveying his defeated followers; the actual “Mammon led them on” occurs later in the source. Thus the retained text is complete, but titles, casts, locations, reveals, and item placements cannot be trusted at these cuts. Rebuild cuts from explicitly reviewed source anchors throughout all twelve books.

2. **All 268 character states are templates (EX-103).** `snapshotState()` repeats a fixed stance for each character and appends the scene title and location. This does not state the individual's specific condition or action at that moment. The dedicated validator and regression tests accept these templates; they need meaningful negative cases after the source-based states are corrected.

3. **Frame chronology is incorrectly classified (EX-004, EX-006, EX-106).** `timelineFor()` assigns every event in Book VI to the rebellion, including “Raphael Ends the Warning,” which is placed at the bower with Adam and Eve. Its verse range also mixes the Son's battle speech with Raphael's return to the conversation. Adam's creation recollections in Book VIII remain in the primary Fall timeline without being marked retrospective. Numeric times are book indices plus scene fractions, not justified elapsed days; `travelDays` turns these arbitrary positions into durations. Michael's prospective vision is marked `isFlashback: true`.

4. **Meaningful relationship state changes are missing (EX-107).** `relationshipSnapshots` is empty, including through Adam and Eve's fall, accusation, estrangement, and reconciliation. Their standing relationship remains positive with the original strength. Review and model changes at the corrected scene boundaries.

5. **Artwork prompt provenance is overstated (EX-307).** `build-art-manifest.mjs` synthesizes generic prompts from subject dictionaries. These differ from actual tool requests visible in the generation record, including the final fruit request and the final location batch. The manifest must distinguish exact submitted prompts from reconstructed descriptions, recover actual requests where available, and avoid claiming exact provenance for reconstructed text.

6. **Lore points readers to an unavailable build artifact (EX-010).** “Illustration provenance” says exact prompts and review notes are in the committed artwork manifest. A reader downloading the world does not receive that file. State useful attribution directly in Lore and retain detailed build provenance in repository audits.

## UI evidence and remaining review

The prior `qa/ui-results.json` records a pass on application commit `3921599b3e1d26dd7a081bcd550f9e3a7bcff14d`. That is prior evidence, not a fresh UI pass in this revalidation. Its checks establish navigation and rendering, not source correctness. Source review has already blocked release; a fresh full UI pass must follow the model corrections. Recheck every marker against the map artwork and use actual gateway interactions without forced clicks that bypass overlapping pins.

No edition content was changed or committed during this validation. The release checklist and status were corrected to reflect the findings.
