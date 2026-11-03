# Ivanhoe completed local edition and reproduction

Local release complete; see LOCAL_RELEASE.json and RELEASE_REPORT.md.

Use F:/Projects/WorldBreaker/PlotWeave-Library-ivanhoe on
feature/ivanhoe-reading-edition and the separate companion checkout
F:/Projects/WorldBreaker/Kathala-ivanhoe-qa on
fix/ivanhoe-reported-death-correction (e8e8b0c2). Do not modify the protected
Les Miserables branches/checkpoints. No push, PR, merge, publication or branch
deletion is authorized.

Read PROGRESS.md, LOCAL_RELEASE.json when present, REVIEW_CHECKLIST.md,
SOURCE_DECISIONS.md, SOURCE_REVIEW.md, INVENTORY_REVIEW.md,
CHRONOLOGY_REVIEW.md and RELEASE_APPROVAL.json. The final authoritative download
is library/ivanhoe.pwk; scripts/ivanhoe/authoring-review.pwk is its deterministic
review input, not another catalogue entry. All 334 image URLs point into
library/ivanhoe/art/generated/. Preserve those asset paths.

Reproduction: node scripts/ivanhoe/generate-review-world.mjs --release --quiet
requires hash-bound approvals and complete playback. Run npm run catalogue,
the seven source/art/map release validators in qa/release-validators.json,
npm test -- --run libraryCatalogue exampleQuality exampleCompat,
npm run catalogue:check, npm test, npm run gate and git diff --check.
Do not change an approval hash to bless new content: source or image changes
require their corresponding manual and browser reviews again.

The tested app build used VITE_E2E=1 and
KATHALA_LIBRARY=F:/Projects/WorldBreaker/PlotWeave-Library-ivanhoe.
QA server http://127.0.0.1:4186 serves the production dist with staged Library
files. Set KATHALA_APP and KATHALA_QA_URL if those paths change.
node scripts/ivanhoe/qa-review-world.mjs --packaged --library-download
--portrait=fangs --all-pages --cover exercises actual catalogue download.
The full flags recorded in the final browser-run JSON repeat all 537 playback
positions and disclosure/inventory checks. Manual review records retain their
actual fixture hashes; transition proofs justify unchanged source fields,
coordinates, image bytes and custody state across narrow corrections.

Local completion does not mean published completion. Remote image URLs become
available publicly only after a separately authorized Library release; the
companion application changes also require separate remote authorization.


Remote release authorization (2026-11-03): the user requested PR creation and
merge. Library PR76 contains the edition and LFS authoring/visual-review evidence.
Companion app PR648 is merged at e4a09dd968469b4070776b1a3b4d6bea17920c09.
Integration with current main preserves sparse person records, explicit custody
statements and era boundaries. All3347 app tests, lint/build, nine Chromium
regressions and final book-level checks pass. A fresh537-event playback passes
on app build941dedb5285e9a11508f203068b70bf0f00273732707fc612cecb695c30879e0.
The PWK is still exactly3302723 bytes with its original final SHA-256.
Netlify now stages only index.html, CORS headers and library/ into an ignored
build directory. All reader paths retain their library/ prefix; authoring
originals and QA evidence stay in Git LFS instead of the public deploy.
GitHub PR status is authoritative for the final Library merge and deployment.
