# Repeat validation — 17 October 2026

## Second corrective validation

Status: RESOLVED LOCALLY after the corrective pass. The following is the
historical finding list; the resolution and fresh evidence follow it.

- EX-103: all 163 snapshot notes are the character name and location followed
  by the identical event description. They do not state each individual's
  current action or condition. The validator only rejects exact equality and
  therefore misses this prefixed copy.
- EX-006: Tamsin Takes the Book is day 20.75 and Burn is day 40. The source
  explicitly says forty days remain when she takes the Ledger. The final
  Warden scene also says she has kept it for forty days. The current modeled
  interval is approximately twenty days. Other day assignments lack an
  individually documented source or editorial justification.
- EX-005/EX-006: Row Thirty-One includes the four-hour waking procedure, but
  Berth Twelve advances by 0.01 days (14.4 minutes). The source's twenty-minute
  search for Kit is also not represented by the automatic 0.01-day increment.
- EX-102: Ama opens her eyes and reacts in paragraphs 24–25 of Row Thirty-One,
  yet her first presence snapshot is in Berth Twelve, starting paragraph 26.
- EX-102/EX-105: Waking explicitly leaves Kit at the hatch while Osh enters
  alone; the event puts both in the pilot cell throughout.
- EX-206/EX-302: the new map and pilot-cell marker put the cell at the centre
  of the drum. Shaft paragraphs 43–45 put its maintenance well aft at the rim.
- The Waking letter is Ilse Varga's signed message, but the linked item is
  named Bram's letter to Ama and its description assigns it to Bram.

### Resolution

- `character-states.mjs` now supplies all 168 individual current-state notes.
  The generator fails on a missing state or a cast mismatch. Regression checks
  reject a character-prefixed copy of an event description.
- `CHRONOLOGY_AUDIT.md` records the position and basis of every section. It
  identifies the source's incompatible twenty-plus-eleven and forty-day cues,
  prioritizes the repeated forty-day custody interval, and leaves prose intact.
  Immediate cuts share dates instead of inventing 14.4-minute intervals.
- Row Thirty-One begins twenty minutes after Waking; the pod opening is four
  hours later. Ama has states while sleeping, waking, and speaking. Kit is at
  the hatch in At the Inner Hatch and has no presence snapshot in Waking.
- The corrected ImageGen map has a flat central gangway and a visible pilot
  compartment at the southern aft rim. The bottom-origin marker is (790,117).
  Input/output provenance, exact edit prompt, rejection reason, dimensions,
  and final hash are recorded in the artwork manifest.
- The letter is Ilse's signed message to whoever comes, with her instructions
  and her message to Ama about Bram. Its name and description now say so.
- The dedicated validator and regression suite enforce these corrections.
  Seven deliberate model mutations are each rejected, alongside the retained
  prose mutation check. The full suite and gate pass at 948 tests.
- Fresh Kathala QA passes five individual state views, all four maps, the
  gateway, eight playback transitions, Book layouts, supporting views, final
  text, and the console on app commit e920677e47ad79ea110c37855f0e0e05749e52e2.

The final package has 72 scenes, 168 snapshots, and 48,573 words. Remote
publication remains separately gated.

Release status: RESOLVED LOCALLY. The defects below were corrected in the
generator, rebuilt package, regression tests, map model, and QA evidence.

The exact normalized manuscript reconstruction, source hash, dedicated validator,
mutation rejection, and catalogue check pass. These establish text integrity;
they do not establish the correctness of the authored model.

## Confirmed source/model defects

- **Strongbox:** the prose explicitly places Ilse and Tamsin behind Bram, and
  Tamsin reads the charter aloud. The model omits Tamsin and her snapshot.
- **Arrest:** the opening is in Mother Calloway's front room with Neve, Jory,
  and the sleeping Calloway physically present. The model places the whole
  section in the Watch-house with Neve alone. Review and split the section.
- **The Warden:** the opening has Hollin deliver the Key; the main bridge
  exchange is Kesh and Tamsin alone, followed by Tamsin in her cabin writing
  in the Ledger. The model has Hollin and Tamsin throughout and omits Kesh.
  Review scene boundaries, locations, snapshots, and the Key hand-off.
- **Rhee's Choice:** Ansel runs the sounding and sends Rhee's report in direct
  dialogue. He needs a presence snapshot; the current model has Rhee alone.
- **Investiture:** Rhee is explicitly present for a quarter of an hour during
  the vigil, but the model omits her. Review the entrance and departure cuts.
- **The Broadcast:** Mother Calloway is physically present in the Hall, but
  the current model omits her. Review all cast changes throughout the section.
- **Final cold rows:** Row Thirty-One and Berth Twelve reference the original
  Deck Nine marker on the pre-landfall Mercy map. The sleepers are now under
  Ninefold's ice. Add the appropriate distinct location and useful nested map
  geography, then repeat marker, gateway, and playback QA.
- **Calendar:** ordinal scene indices are being rendered against an AL day
  calendar, while every elapsed time is zero. The manuscript supplies explicit
  intervals and date anchors, including eighteen days before Tricentennial,
  eighteen hours after the store fire, forty days before landfall, and the first
  day of 311 AL. Build and document a chronology from these anchors.
- **Snapshot prose:** the generator selects the longest sentence mentioning a
  character. This can quote retrospective or spoken text rather than describe
  the individual's current state. Replace it with reviewed original status
  notes and source-backed regression fixtures.
- **Provenance:** the artwork manifest contains reconstructed production briefs
  and null sourceOutput values for some assets. It does not yet establish the
  exact original prompt and output provenance for every image.

## Automated check correction

The repeat full suite initially found one failure (945 passed, 1 failed): the QA
harness hard-coded the retired application name in its fallback checkout path.
The harness now requires KATHALA_QA_APP_ROOT explicitly. The four application-name
tests pass after that correction. No test was weakened.

All findings were corrected. The rebuilt edition passes exact reconstruction,
the dedicated validator, mutation rejection, catalogue checks, the full test
suite, and fresh Kathala browser QA on development commit
`e920677e47ad79ea110c37855f0e0e05749e52e2`. Remote actions remain separately
gated.
