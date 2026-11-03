# Ivanhoe reading edition

Current status (2026-11-03): COMPLETE LOCAL RELEASE. All required local gates
pass; see RELEASE_REPORT.md and LOCAL_RELEASE.json. No remote action is
authorized or performed. Historical Git versions retain earlier staging notes.

The complete Project Gutenberg 82 source reconstructs exactly:195,107 words,
3,138 paragraphs,44 narrative chapters and 14 ancillary sections. All537 events
(523 narrative cuts) preserve the retained manuscript in reading order.

Current model:78 character records, 1,473 direct states, 171 places (166 mapped,
five source-unlocated),30 illustrated map layers,26 gateways,55 items,
66 source custody actions,92 item states,38 facts and43 learning records,
15 relationships/14 changes,14 goals,7 factions/30 memberships,5 threads,
5 motifs and12 Lore pages. Reader identities merge only at their source reveals;
one reported-only lieutenant is never fabricated as physically present.

All 304 ordinary illustrations and 30 maps are generated, compressed and manually
reviewed. Every166 mapped coordinate,26 gateway entry/return and all three floor
pairs were reviewed in the actual app. The334 URL assets are byte-identical to
the reviewed compressed assets and all 334 returned successfully through the
local application server. Ordinary WebP compression preserves dimensions and
at least38dB PSNR; maps are lossless with exact decoded RGB equality.

The URL candidate is3,302,723 bytes, SHA-256
466697b4262d6a42d3048143aa68dcb744c57975b6ba9ff1b9b700ea1b0cfc29.
The earlier284.6 MB embedded fixture was superseded, not the final delivery.
qa/url-packaging-transition.json records exact model and asset equivalence.
Full537-event playback passes on these URL-candidate bytes, with zero runtime,
console or network errors and all live map images decoded at every step.

Companion application: fix/ivanhoe-reported-death-correction at e8e8b0c2.
All 3105 unit tests, lint and production build passed. Meaningful browser
regressions cover canonical roster inheritance (1) and manuscript/calendar
arrival and bookmark behavior (3). Companion fixes remain local.

LOCAL_RELEASE.json records all completed packaged-file, catalogue/test/gate/
diff checks and final download review.
Source, geometry, chronology and fictional-place uncertainties are documented;
none is silently filled with invented locations or actions.


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
