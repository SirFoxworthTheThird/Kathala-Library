# Scene boundary audit

The 115 scenes use only retained paragraph boundaries. `BOUNDARY_AUDIT.json` records every chapter and scene number, title, inclusive paragraph range, preceding and following paragraph excerpts, opening and closing excerpts, and the SHA-256 of the exact scene prose. The ranges cover paragraphs 1 through the last paragraph of every chapter with no gaps or overlap.

Cuts follow changes in place, company, immediate action, or narrative purpose. Letters and reported histories remain inside the physical scene where they are read or told. Chapter IV is modeled as Anne’s present reflection at Kellynch; Lady Russell, Sir Walter, and Wentworth are mentioned within that recollection and receive no physical-presence snapshot there. Chapter XXI keeps Mrs Smith’s account in Westgate Buildings. Each event’s `involvedCharacterIds` has exactly one matching snapshot per modeled physical participant, and no snapshot is generated from `mentionedCharacterIds`.

Regenerate with `node scripts/persuasion/build-boundary-audit.mjs`; `validate-book.mjs` checks all 115 rows.
