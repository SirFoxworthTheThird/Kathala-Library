# Remote checkpoint — 2026-10-29

This is unfinished work saved for continuation, not a released edition. Do not publish the review fixture or call it release-ready.

Library branch: feature/les-miserables-reading-edition in SirFoxworthTheThird/Kathala-Library.
Companion application branch: fix/lesmis-reported-state in SirFoxworthTheThird/PlotWeave. The application changes preserve reported-death and future-faction boundaries. The alias provenance issue below is not fixed.

Run `git lfs pull` after checkout to retrieve original artwork, compressed artwork and visual evidence. These assets and the review fixture are intentionally preserved with this checkpoint.

## Current authoritative status

- Complete Gutenberg source: 365 chapters, 1,535 scenes, 568,115 words. Never rerun import-manuscript.mjs over reviewed scenes; use stage-reviewed-manuscript.mjs.
- Model: 360 provisional characters, 2,398 direct states, 416 places, 120 objects, 124 explicit object changes, 28 unknown-position approvals, 60 facts and 15 reveals.
- Accepted artwork: 569 images: one cover, 358 portraits, 118 objects and 92 places. Separate 53 topographic maps. Remaining entity illustrations: 324 places, two portraits and two objects. Do not retry blocked younger-daughter/Azelma presentations or blocked coin-saw/thorn-cudgel requests through alternate wording or aliases; consult ART_REVIEW.md.
- Portrait batch forty-six (two images) and location batch twelve (eight images) have original and compressed visual review plus hash acceptance, but still need actual application dialog review. Earlier batches have scoped evidence in ART_REVIEW.md.
- Latest reproducible fixture: SHA256 4ab91d87ba9d5c76d07330157f6279d970c804593020eb33d4a6639eab86cd73, 381609065 bytes, identical on two regenerations. See qa/world-review-reproducibility.json.
- Full rendered manuscript comparison passed on the earlier source-equivalent 551-art fixture: 365 chapters/1,535 scenes, exact normalized prose/order, zero runtime errors. See the manuscript QA evidence; do not misattribute it to the latest artwork fixture.
- Continuous actual playback on the 559-art fixture checked 1,061 of 1,535 scenes, ending at event lesmis-world-review-event-267-1. Browser/page closure terminated the run. This is NOT a full playback pass. Preserve logs and rerun to completion.
- Last standard gate: 1,483 tests passed before the newest ten artwork additions. Refresh the gate. Catalogue check passed against 58 published worlds. No final library/les-miserables.pwk exists.
- All 53 current map screenshots were inspected; only the specifically evidenced EX-201 checklist entry was closed. Other playback/map gates remain independent.

## Next work

1. Review the ten latest images through qa-art-ui.mjs --portraits=forty-six and qa-place-ui.mjs --places=twelve; render and inspect their app contacts.
2. Refresh gate, catalogue and diff checks, keeping failures explicit.
3. Continue location artwork; batch thirteen is not planned/generated yet. Waterloo terrain is a possible next group; read waterloo-location-plan.mjs and primary source before prompting. Belgium 1861 narrator visits differ from the 1815 battle and from France.
4. Rerun full continuous playback with qa-complete-playback-ui.mjs; do not edit the app during it because HMR invalidates evidence. Browser-controlled reading pauses do not constitute real reading-time review.
5. Resolve the historical alias state presentation in APP_QA_FINDINGS.md. Prefer clear source-scene provenance; never infer or invent absent-character snapshots to overwrite independent facade records.
6. Finish source cast/custody/feature/pacing closure, remaining art, manual release checklist, final packaging and reproducibility. Existing PROGRESS.md contains historical checkpoints, not blanket approvals.

For UI helpers set KATHALA_QA_APP_ROOT to the checked-out companion app. Previous local Vite URL was http://127.0.0.1:5178/. Paths in selected-image metadata may refer to the original local image generation directory; authoritative copied originals are under image-sources/ and map-image-sources/.

No merge to main or release is authorized by this save request.
