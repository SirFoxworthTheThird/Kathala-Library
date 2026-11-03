# Identity and naming decisions

Status: source decisions for enrichment; final generated references and reading
mode presentation remain unverified. Paragraph anchors are chapter:paragraph,
zero-based. Do not blindly use working cast keys as separate people.

| Working identities | Source gate | Required handling |
| --- | --- | --- |
| unknownsquire → Gurth | X:15–16 | Separate concealed persona until named; one-way `revealedAs` to Gurth, no reciprocal link or chain. Keep Gurth’s face covered in the concealed-squire portrait. |
| Disinherited Knight → Ivanhoe | XII:49 | Head’s initial public name can be Ivanhoe, with Wilfred supplied at XIV:13. No parent relationship or exposed face before the unhelmeting/reveal. |
| Palmer → Ivanhoe | XXVIII:18, confirmed by XLIII:73 | The Palmer is never called “Palmer” again after chapter VI. Isaac connects the succour and borrowing at XXVIII:18; Ivanhoe explicitly claims the Rotherwood reliquary gage at XLIII:73. Resolve the exact earliest defensible link in the final knowledge audit; do not silently merge from chapter II or assume the tournament unhelmeting alone names the earlier disguise. |
| unnamed yeoman → Locksley | XIII:38 | Same embodied person with a gated name; reader-facing aliases do not include Robin Hood from the start. |
| masked outlaw captain → Locksley | XIX:45 | Gurth’s recognition of the voice is an inference requiring final adjacent-prose check. Do not replace a tentative recognition with an earlier explicit identity reveal. |
| Locksley → Robin Hood | XL:121 | Name change and gated alias at this public declaration. Robert/Cleave-the-Wand belongs at XXV’s letter; Diccon Bend-the-Bow at XXXIII:64–65. All dates must be checked against final scene IDs. |
| Black Knight → Richard | XXXIV:22–29 | Reader learns through De Bracy’s report before the public declaration at XL:118. XXXI’s private whisper only informs De Bracy. Royal faction membership, title, family relationship to John and portrait heraldry must not reveal identity earlier. |
| Hermit → Clerk of Copmanhurst → Friar Tuck | XVI:40; XL:131 | Gated names on one embodied person. The late printed footnote 22 is not an early alias gate. Initial portrait and room picture must conceal the later weapon cache. |
| old spinner → Urfried → Ulrica | XXIV:6; XXVII:10–17 | Gated names on one person, with Torquil Wolfganger parentage only after disclosure. Do not create multiple women or spoil her plans through the first portrait. |
| Blue Knight → Fitzurse | XL:106–107 | Anonymous armoured persona until Wamba unhelms him. Canonical Fitzurse already exists, but that does not identify the attacker early. Use one-way reveal. |
| minstrel → Allan-a-Dale | XLIII:28 | Gated name; SHERWOOD badge alone is not a personal name. |
| Nathan Ben Israel; Rabbi Ben Samuel | XXXV; XXXVIII | Distinct people. Host’s house is in an unnamed town four miles from Templestowe, not an invented York residence. |
| tournament Malvoisin; Albert de Malvoisin | VII/VIII; XXXVI:3 | Tournament forename varies Richard/Philip in the source. Albert is explicitly Philip’s brother. Keep original text; use a documented conservative Sir Malvoisin label for earlier appearances. Do not manufacture a third brother to reconcile a printing inconsistency. |
| Clement at the castle; Clement among outlaws | XXXII and earlier castle account | No automatic identity merge from a common name. |
| Hundebert/Hundibert | Rotherwood household | Orthographic variants for Cedric’s officer; preserve the source spellings in prose and record a single entity mapping after final reference check. |

Sir Anthony of Scrabelstone is the friar’s invented claim, not an accepted
identity of Richard. Source narrators’ embedded song figures, the introductory
King Edward, and people in Scott’s later Scottish historical quotation do not
become physically present members of this story’s cast.

Application contract examined on refreshed main `e920677e`: `Character`
supports `nameChanges`, `aliasesFrom` and one-way `revealedAs`. Identity heads
cannot themselves be reveal members. Check labels, search results, aliases,
portrait grouping, inherited snapshots, relationship endpoints and factions at
the cursor on both sides of each final gate; a correct record alone is not UI QA.

## 2026-10-30 raised-apartment correction

- Read VI.4–21 directly again. Corrected the antechamber to precede the short passage and seven-step ascent, rather than placing it upstairs. Anwold waits below; his source snapshot remains there while the Palmer enters the raised apartment.
- Added source-led Rowena apartment plan; original PNG, lossless WebP and actual-app image opened. Furniture and entry side are explicitly reconstructed. Four silver candelabras, bed, high seat/ivory footstool, screen, bench and seven oak steps follow the source.
- Browser Next/Previous checks passed the lower-to-raised transition and rewind. This is limited map navigation evidence; complete floor-group validation remains open.
- Actual UI exposed an early name leak: Edwina’s initial head used her later name. Added exact VI.20 disclosure cut and rename gate. Before disclosure the character page now shows The waiting-maid; at VI.20 it shows Edwina. Departure endpoint remains unknown until the following paragraph establishes the anteroom. Screenshots opened; two meaningful regressions added.
- Source reconstruction unchanged: 195107 words, 3138 paragraphs, 58 sections. Now 498 narrative cuts / 512 total scenes, 1305 direct snapshots. Model has 5/25 drawn maps, 22/143 placed locations and 12 gateway candidates; 121 locations unplaced. Full gate: 1199 tests, 0 failures.
