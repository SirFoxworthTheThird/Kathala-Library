# Reported-death correction: focused application evidence

Date: 2026-10-29. Companion checkout: Kathala-ivanhoe-qa, branch
`fix/ivanhoe-reported-death-correction`, based on refreshed remote main
`e920677e47ad79ea110c37855f0e0e05749e52e2`.

This is a focused regression fixture, **not** an Ivanhoe edition release pass.
No completed edition exists to download or review yet.

## Defect and correction

Main’s `applyReportedDeaths` applied a reached death report forever, even over
a later direct snapshot showing the character alive. Its report selection also
depended on array order. This would prevent the later correction to the report
of Athelstane’s death from being shown in the reader’s Current State panel.

The fix selects the latest reached report by reading order and applies it only
when it is newer than the resolved direct snapshot. A same-scene or subsequent
direct state wins. Rewind still resolves the earlier report. Stored snapshots,
cast and inventories are not mutated by this display resolution.

## Tests and observed results

- Before the fix, the three new focused unit tests ran and failed with actual
  assertions: returned Athelstane remained dead, unsorted facts selected the
  wrong report, and same-scene direct evidence lost to the report. The original
  report test passed. A prior dependency-install failure was not counted as a
  successful negative control.
- After the fix: all four focused tests pass.
- Full app suite: 251 test files, 3,073 tests passed. The jsdom informational
  message “Not implemented: navigation to another Document” did not fail tests.
- `npm run lint`: passed. `npm run build`: passed.
- New browser regression `e2e/reportedDeathCorrection.spec.ts` type-checked and
  linted, then passed in Chromium against the production E2E bundle on a locally
  owned preview server at port 4186. Windows-specific temporary runner config
  replaced the standard shell’s POSIX environment assignment for this local run;
  the fixture remains runnable with the repository’s normal CI config.
- Browser test traversed before → report → return → later → return → report →
  before using actual Next/Previous moment controls. Read-only Current State
  showed Alive/Deceased and the appropriate event-specific notes at each cursor.
- Test asserted only two physical snapshots, at before and return; report’s cast
  remains empty with Athelstane mentioned. No uncaught page errors occurred.
- Both screenshots opened and visually inspected: status, notes, active cursor
  and appearance/mention counts agree. Unknown location remains unknown.

`reported-dead.png` shows the report; `corrected-alive.png` shows the return.
The screenshots are fixture evidence only. Final book QA must repeat this check
with the actual generated Ivanhoe records, maps, inventory and identities.

## Completion boundary

The local app fix is validated for the described case. No push, PR or deployment
was performed. A final Ivanhoe release depending on this behavior will require
the companion app change to be available in the reader’s application; the current
published app is not claimed to contain it. Full edition/artwork/navigation QA
remains open. Les Misérables worktrees and branches were not changed.
