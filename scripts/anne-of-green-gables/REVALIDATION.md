# Independent revalidation — 12 October 2026

Original audit decision: **FAIL — the previous completion statement was withdrawn.**

**Correction review: PASS.** The findings below preserve the original audit. The corrected edition and current evidence are documented in `QA.md`.

The exact manuscript reconstruction passes: 38 chapters, 121 scenes, 1,788 paragraphs and 101,964 words. Source integrity, catalogue bytes and reference checks pass. These structural checks do not establish narrative fidelity or map quality.

Fresh checks on 12 October: dedicated validators pass; catalogue check matches 51 entries; all 876 tests pass; repository gate has zero failures; diff check passes; generator reproduces 1,131,050 bytes with SHA-256 `6c86b200ee7bf3bb304e5c501353477341a9ff16ddc4f2fa6d5cca9859cd4b3f`. The existing UI smoke script passes against application commit `048bf009f2915624ba98f644b82d9c19fa8be115` with no captured console or page errors. Its coverage limitations are described below; this does not establish that the application checkout is the latest remote development commit.

## Confirmed gaps

1. **Island geography (EX-203, EX-206):** the committed Prince Edward Island image places Avonlea, Bright River and White Sands outside the land polygon. Roads connect these offshore points across water. The renderer projects the coastline geographically but draws pins at unrelated fixed coordinates. The manifest and QA claim that roads no longer cross water is false for the committed image. Reproject the markers and routes together with the coastline, update the ledger, and inspect every overlay in Kathala.
2. **Snapshot prose (EX-103, EX-106):** all 378 notes are generated from a small set of standing character-role phrases. Matthew's opening snapshot says he gives Anne practical support before he meets her. Unique strings created by inserting an event title do not make the underlying state event-specific. Replace the role templates with source-grounded individual states.
3. **Event prose and reveal timing (EX-003, EX-405, EX-407):** all 121 descriptions repeat a whole-chapter synopsis plus `This scene isolates the decision, discovery, journey, or reversal named in its title.` The first Chapter XIV scene therefore describes the invented confession before it occurs. Chapter synopses also expose later outcomes at the chapter opening. Write each scene's actual action and review chapter synopses against their opening reveal.
4. **Chapter XXXVI cast, place and object ownership (EX-102, EX-105, EX-106):** the source gives results at Queen's, commencement attended by Matthew, Marilla and Josephine Barry, a return home with Diana, and the next morning's health conversation. Two modeled scenes do not distinguish these transitions. `Avery Scholarship and Gold Medal` is located in the Green Gables kitchen, but the medal placement is at Queen's and the medal is Gilbert's. Review the cuts, cast, placements and custody against the full chapter.
5. **Chronology (EX-006, EX-106):** the model spans approximately 878 days from arrival to the final scene. The text ends with Anne aged sixteen and a half and mentions five years of lost conversations with Gilbert. This is not consistent with the claimed preserved intervals. Rebuild the editorial day ledger using the source's ages, seasons and terms.
6. **Art provenance (EX-307):** the manifest builder manufactures a prompt from each filename rather than reading an archived exact generation request. Its map acceptance and correction statements are automatically written despite the geographic failure above. The reader's Lore contains no generated-art attribution. Recover actual prompts where available, label any unrecoverable brief honestly, and add reader-facing provenance.
7. **Validation evidence (EX-208, EX-508):** `validate-event-state.mjs` verifies that names exist and casts are unique; it does not compare physical presence with prose. The boundary auditor verifies nonempty rationale fields, many of which are formulaic. The UI script sets the final cursor through localStorage and checks three layout URLs only for the book title. It contains no playback assertion and does not prove that Page is rendered. The completion checklist's playback and complete narrative-review claims exceed this evidence.

Do not treat a passing automated gate as resolution of these findings. The published manuscript text remains intact. No PWK or artwork was changed by this audit, and no remote action was performed.

## Resolution record

| Finding | Correction and evidence |
| --- | --- |
| 1. Geography | Shared projection, land-constrained paths, negative controls, four rendered-map screenshots and all three gateways |
| 2. Snapshot prose | 527 individual source-authored states across 203 scenes; no standing-role templates |
| 3. Event/reveal prose | Scene-specific actions; chapter synopses reveal only their opening; name and offstage-report UI checks |
| 4. Queen's results | Five Chapter 36 locations/casts, Gilbert's medal inventory, pinned results-sheet art, Diana at home |
| 5. Chronology | Five-year editorial calendar; documented ages/seasons and strict regression rejection |
| 6. Provenance | 78 exact prompts, four deterministic map briefs, hash-bound visual acceptances, reader-facing attribution |
| 7. Validation | Exact reviewed-ledger comparison, source-hash boundary checks, six negative-control tests, real Page rendering, nine timed playback transitions, latest fetched development UI |

Source reconstruction remains identical. No remote action was performed. The old smoke run and old counts above are historical evidence of the failed version, not results for the corrected edition.
