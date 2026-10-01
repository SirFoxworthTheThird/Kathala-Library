# Generation checkpoint

The built-in image generation tool reached its account usage limit on 2026-10-01. Twenty-three approved images were saved as JPEGs and visually reviewed in the partial contact sheets. The PWK and catalogue have not yet been modified.

At the next session, compare `prompts.json` against JPEG files under `library/the-woman-in-white/art/generated` and generate only missing images. Currently missing:

```text
cover
characters/walter
items/death-certificate
items/grave-marker
items/fosco-confession
items/brotherhood-mark
locations/cumberland-gate
locations/london-gate
locations/hampshire-gate
locations/polesdean
locations/liverpool
locations/limmeridge-house
locations/limmeridge-churchyard
locations/limmeridge-school
locations/cumberland-coast
locations/hampstead
locations/finchley-road
locations/clements-inn
locations/gilmore-kyrle
locations/asylum
locations/st-johns-wood
locations/gowers-walk
locations/opera
locations/blackwater-house
locations/blackwater-lake
locations/east-drive
locations/old-welmingham
locations/paris-seine
locations/paris-morgue
```

After completion, run the contact sheet and conversion scripts without `-AllowPartial`, review all final sheets, then run the integration script, validator, catalogue check, tests, gate, and diff check. Update this file to a completed review record before opening the PR.
