# The Cold Choir — local release evidence

Status: corrected locally after the second validation. No push,
pull request, or merge has been performed.

## Package

- Source: creator-supplied original English manuscript by Solomon Darko,
  copyright 2026, authorized for this edition.
- Source archive: 259,445 bytes; SHA-256
  `22c091779484a001a52c8cea193028efa8f941abd61f708ca50b8236137366a8`.
- Retained text: 21 chapters, 44 authorial sections, 72 reviewed scenes,
  48,573 words.
- World model: 3 separated timelines, 21 characters, 168 character snapshots,
  33 locations, 4 maps, and 9 items.
- Artwork: 74 single-copy PNG assets: 1 world, 21 character, 9 item,
  33 location, 6 faction, and 4 map images.
- PWK: 516,673 bytes; SHA-256
  `462f1bb98751f2165a0a9018933b573dd80659c0fd3a4852dd89d03bb9d4539a`.

## Corrective review

The repeat validation findings in `REVALIDATION.md` are resolved in the source
model and protected by the dedicated validator and Vitest regression checks.
The correction adds Tamsin to Strongbox; restores Jory and Mother Calloway to
Arrest; separates Hollin, Kesh, and Tamsin at the Warden handoff; adds Rhee to
the vigil and Ansel to Rhee's decision; separates the Quiet interlude inside
The Broadcast; and moves the final cold rows to a nested Ninefold sleeper-hold
map. All 168 snapshot notes are individually authored in character-states.mjs;
there is no description-copy or source-extraction fallback.

Chronology uses source-relative days within each of the three strands. It
records explicit anchors including the nine-day council interval, the
eighteen-hour store-fire interval, the forty-day landfall approach,
Investiture eighteen days before the Tricentennial, the arrest conversation
four days before it, and the first day of 311 AL. Immediate paragraph cuts share a calendar position and retain source order.
CHRONOLOGY_AUDIT.md records every section placement and the manuscript’s
conflicting thirty-one versus forty-day cues. The repeated forty-day custody
anchor controls the editorial chronology; the source text is untouched.

## Validation

- Exact normalized reconstruction matches the archived manuscript, including
  the final line; the mutation test is rejected.
- Two consecutive final generator runs produced the same byte count and SHA.
- Catalogue: 54 worlds with the exact 516,673-byte PWK size.
- Tests: 17 files and 948 tests passed.
- Gate: 948 tests, 0 failing, 0 expected failures.
- `git diff --check`: passed.

## Application review

Fresh automated browser QA used Kathala development commit
`e920677e47ad79ea110c37855f0e0e05749e52e2` and the PWK hash above. It passed
download/import, the reading-mode opening and sequential reveal, all three
timeline manuscripts in Cards and Read views, ten supporting views, 33
locations, four map images, the Reach-to-sleeper-hold gateway, eight distinct
map transitions in playback, all visible artwork, the final line, and a clean
browser console.

See `qa/ui-results.json` and the retained screenshots for machine-readable and
visual evidence.
