# The Cold Choir — local release evidence

Status: complete locally on `feature/the-cold-choir-reading-edition`. No push,
pull request, or merge has been performed.

## Package

- Source: creator-supplied original English manuscript by Solomon Darko,
  copyright 2026, authorized for this edition.
- Source archive: 259,445 bytes; SHA-256
  `22c091779484a001a52c8cea193028efa8f941abd61f708ca50b8236137366a8`.
- Retained text: 21 chapters, 44 authorial sections, 70 reviewed scenes,
  48,573 words.
- World model: 3 separated timelines, 21 characters, 163 character snapshots,
  33 locations, 4 maps, and 9 items.
- Artwork: 74 single-copy PNG assets: 1 world, 21 character, 9 item,
  33 location, 6 faction, and 4 map images.
- PWK: 522,778 bytes; SHA-256
  `fe50eb724f2182c8a9f6aa08ea0bd20dbeeaaf39e6c538bbf94884563b236275`.

## Corrective review

The repeat validation findings in `REVALIDATION.md` are resolved in the source
model and protected by the dedicated validator and Vitest regression checks.
The correction adds Tamsin to Strongbox; restores Jory and Mother Calloway to
Arrest; separates Hollin, Kesh, and Tamsin at the Warden handoff; adds Rhee to
the vigil and Ansel to Rhee's decision; separates the Quiet interlude inside
The Broadcast; and moves the final cold rows to a nested Ninefold sleeper-hold
map. Snapshot notes now come from reviewed event descriptions rather than
sentences selected from the manuscript.

Chronology uses source-relative days within each of the three strands. It
records explicit anchors including the nine-day council interval, the
eighteen-hour store-fire interval, the forty-day landfall approach,
Investiture eighteen days before the Tricentennial, the arrest conversation
four days before it, and the first day of 311 AL. Hundredths of a day preserve
the order of immediate paragraph cuts.

## Validation

- Exact normalized reconstruction matches the archived manuscript, including
  the final line; the mutation test is rejected.
- Two consecutive final generator runs produced the same byte count and SHA.
- Catalogue: 54 worlds with the exact 522,778-byte PWK size.
- Tests: 17 files and 947 tests passed.
- Gate: 947 tests, 0 failing, 0 expected failures.
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
