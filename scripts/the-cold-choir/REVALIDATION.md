# Repeat validation — 17 October 2026

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
