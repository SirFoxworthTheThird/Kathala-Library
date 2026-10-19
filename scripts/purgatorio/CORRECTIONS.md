# Purgatorio repeat validation — 19 October 2026

The earlier release claim was too strong. Green reconstruction and structural tests did not establish accurate scene cuts, physical presence, or individual state. This review found and corrected the following defects in the source model and generator.

## Source and narrative

- Calculated thirds of every canto were replaced by 129 explicit source starts at complete tercet boundaries. The 33 cantos remain in order, and the entire retained body reconstructs exactly.
- The old scene titles could describe action outside their own drafts. In particular Canto XXIV now places the Bonagiunta exchange before Forese’s departure, the second tree, and the angel; Canto XXVII separates the flame, night halt, Leah dream, and release of Dante’s will.
- The retained count is 4,755 poem lines plus eight lines of Longfellow’s English note following Arnaut’s Provençal speech. The previous 4,763 “verse lines” and 1,609 “stanza groups” incorrectly treated the note as verse. No text was removed: the same 37,410 words and normalized retained hash remain. The poem has 1,607 stanza groups.

## Cast, state, and reading mode

- All 485 snapshots now contain individually written, source-reviewed states. They replace the earlier event-summary templates. Standing character descriptions are separate prose.
- Lucia has no presence snapshot: Virgil reports a visit that ended before Dante awoke. The report has a gated knowledge fact and illustrated Lore page.
- Virgil has no snapshot in Canto XXX or later: the poem says he has already left when Dante turns to him. The guiding relationship becomes inactive at the discovery of his departure.
- The griffin and the larger procession leave after the binding of the chariot; their snapshots stop before the later assault. A collective allegorical record represents the assailants without turning them into ordinary travellers.
- Jacopo’s testimony and Provenzan’s directly visible presence now have their own records and portraits. Jacopo remains “The Man from Fano”: his familiar scholarly name is identified as editorial rather than claimed as spoken by the source.
- Eight delayed names have event-linked changes. Matelda’s identity waits until Canto XXXIII, rather than appearing on her first card in Canto XXVIII or in an early knowledge fact.
- Six facts have matching reader reveal points and Dante knowledge records. The UI checks both sides of all six fact gates and eight name changes.

## Calendar and application data

- The canto-number day scale was replaced by a four-day editorial chronology anchored to the poem’s dawn, noon, sunset, and midnight cues. Every elapsed interval agrees with its numeric position and is nonnegative.
- Relationship strengths now use Kathala’s `weak`, `moderate`, `strong`, and `bond` values rather than unsupported numbers. Goal categories use `want` rather than the unsupported `primary` value.
- Character, relationship, item-placement, and item-state ordering keys use the application’s chapter-plus-order formula.
- Thirteen item states track the rush, keys, changing marks, and chariot. Relationship changes record Virgil’s release and departure and Beatrice’s rebuke and unveiling.

## Maps and images

- Every marker was rechecked against the full-resolution art. The old shore pin was offshore and several terrace markers were on the wrong rings. The reviewed coordinates now place the pins on the beach, ledges, corresponding cornices, stairs, tree, and streams.
- The gateway to the terraces moved from the royal valley to the gate approach. All three gateways and both cross-layer playback transitions pass in the current app.
- Three distinct illustrations were added with the built-in OpenAI ImageGen tool and visually inspected: Jacopo, Provenzan, and the allegorical assailants. Lucia’s existing illustration accompanies the gated report instead of an invented physical appearance.
- All 93 exact original prompts were recovered from generation call records. The manifest no longer substitutes reconstructed generic briefs for actual prompts.

## Evidence

- The dedicated validator checks the source ledger, individual states, calendar, enum values, snapshot positions, item changes, image hashes, catalogue bytes, and retained-text totals. It rejects the previous committed edition.
- Ten explicit mutation regressions reject the former presence, placeholder, date, name, map, goal, relationship, ordering, and source-loss defects.
- Full suite: 1,023 tests across 20 files; repository gate, catalogue check, and diff check pass.
- Fresh browser run against remote-main application commit `e920677e47ad79ea110c37855f0e0e05749e52e2`: 129 displayed verse blocks containing all 4,763 retained lines; final verse; Book layouts; supporting views; four maps; 32 place images; three gateways; two playback transitions; 12 fact visibility assertions; 16 name assertions; ten character states; four goal panels; zero console or page errors.
- The UI harness rejects a PWK change during its run, so the recorded hash identifies the actual imported edition.

Final PWK: 700,653 UTF-8 bytes. SHA-256: `b65f77d26d34e0b6651c7bd35ec3e2d8ccc0361174e96d82d40042b55cd6216a`.
