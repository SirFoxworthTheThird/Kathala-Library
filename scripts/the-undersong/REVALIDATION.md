# Independent revalidation of d747fe9

Original validation result: NOT READY FOR RELEASE. The automated checks pass, but source and visual checks expose authoring defects that the dedicated validator does not detect.

## Confirmed findings

1. **Wrong event location.** `What the Children Say in Sleep` is assigned to Agnes's house. Its opening explicitly moves the Ledger back to the schoolroom, and the conversation takes place at the high desk. Correct the event, snapshots, and placements to the school.
2. **Missing present character and misattributed action.** `Tom Comes Out of the Earth` includes only Tom, but Ezra is directly present in the aftermath (Jack Bower's conduct frightens him). The desperate attempt to reopen the mine belongs to Jack Bower, not Tom, although the current description attaches it to Tom. Review the boundary and whether Bower needs his own character record.
3. **False presence and movement.** `Silas Leaves Footprints` places Tom in the churchyard. The Listener remains on Long Scar; his mention in the account of Silas's tracks does not move him to the churchyard. The description also says Ezra follows onward across the seabed, whereas the source explicitly says he did not follow the tracks onward.
4. **Incorrect item ownership.** `The Parcel for Ezra` gives the Dream Ledger to Agnes's inventory even though Ezra receives it and leaves carrying it. The generator assigns item holders by cast index (`ix === n`), which has no narrative basis and requires a complete item-holder audit. A placement or item reference alone also does not establish that a character carries an object.
5. **Generic individual state.** All snapshots use a character-name/location prefix followed by the same event synopsis. Names make the strings unique but do not satisfy EX-103's requirement to describe each individual's state or action. Write independently reviewed per-character notes.
6. **Map geometry does not match the illustration.** The mine's Adit marker is on blank hillside rather than the depicted entrance, the Hollow marker is below the depicted chamber, and the straight overlay route crosses solid rock rather than following the visible galleries. On the coast map Whitby is marked inland rather than at the depicted coastal harbour. Matching overlay coordinates to PWK coordinates proves numerical consistency, not geographic correctness. Rework geometry against the images and repeat every-marker UI review.
7. **Artwork fidelity.** Pell's source item is a pocketbook used underground, but its recorded art prompt asks for a heavy accounts ledger with brass clasp. The hydrophone prompt asks for a homemade listening box rather than the source's squat tripod-mounted instrument with a glass dial. Review and correct these assets against the manuscript. The prompt manifest was assembled from subject summaries and a common scaffold, so it must not be described as an exact transcript of all generation requests without recovering those requests.
8. **QA evidence overstatement.** The prior UI record claims every location image and map marker was checked, but the recorded interaction sequence establishes only selected visible assets and layer switching. This does not establish all-location artwork inspection, every gateway interaction, or before/after identity reveal checks. Repeat and record those checks after corrections.

## Checks repeated

- Source reconstruction: PASS, 8 chapters, 26 sections, 15,530 narrative words.
- Dedicated book validator: PASS, but its snapshot test accepts the generic template and its geometry test checks only image bounds. These checks need stronger independent expectations.
- Catalogue check: PASS, 53 entries; PWK remains 242,949 bytes.
- Full test suite: PASS, 919 tests across 15 files.
- PWK SHA-256 unchanged: `362afa995a9926251e0b32ef3e2eaddb50e17ac6999d51661d0e4d3fa5a95367`.

No edition content has been changed by this validation. The completion checklist has been reopened for the failed manual gates. No remote action was taken.

## Resolution

All eight findings above are corrected in the current worktree:

1. The conversation, snapshots and Ledger placement use the school.
2. Ezra and Jack Bower are present at the blocked entrance; Bower owns the attempt to reopen it, with a new distinct portrait.
3. The churchyard event contains Ezra alone and states that he returns without following the tracks onward.
4. Explicit source-reviewed holders replace cast-index allocation. Held objects no longer receive simultaneous location placements. The final UI confirms Ezra carries the handed-over Ledger.
5. All 98 snapshots have separately written individual actions in event-state.mjs; relationship changes at the proposal and sibling recognition also have timed snapshots.
6. The coast base was regenerated; all marker positions and route polylines were retraced. Village labels were separated with leader lines. Local plans no longer claim an invented north direction.
7. The pocketbook and hydrophone were regenerated and inspected against their source descriptions. Exact original generation requests were recovered from session tool calls for every retained asset.
8. UI_QA.md now distinguishes the exact downloads and identifies all 20 opened location panels, actual gateway clicks, observed playback transition, identity boundary, final prose and supporting-view checks.

The regression suite contains five focused tests. A deliberate wrong-location mutation was rejected by the dedicated validator and the original file was restored. The complete manuscript still reconstructs exactly at 15,530 words. The refreshed edition has 11 characters, 42 scenes, 98 snapshots and 45 distinct artwork assets.

Final release checks: dedicated manuscript and book validators PASS; catalogue check PASS for 53 entries; 924 tests PASS across 16 files; repository gate reports zero failures; git diff --check PASS. Regenerating the maps, manifest, audit and PWK preserves the final PWK bytes. Final file size: 229,753 bytes. SHA-256: `d57f685207baa45c495b2d64cdb9b8c54d982c49a8f8df8b4c34413679004770`.
