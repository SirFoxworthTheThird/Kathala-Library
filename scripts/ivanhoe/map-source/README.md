# Regional map inputs and limits

The regional plate is a geographic reference, not a reconstruction of medieval
boundaries or the novel's fictional routes. No surveyed positions are claimed
for Rotherwood, Copmanhurst, Torquilstone, Templestowe or Saint Botolph's.
Their gateways occupy an explicitly non-geographic margin index. The Don-country
gateway identifies a broad region rather than a precise woodland boundary.
Application travel scale is deliberately unset.

## Retained numerical inputs

Downloaded 2026-10-30. Rendering reads only these retained bytes.

- `etopo1-region.csv`: NOAA ETOPO1 one-arc-minute terrain, 52.5–54.2 N,
  2.6–0.4 W; SHA256
  `91de1537f14107eda38a3e10be1a9e27cd574cd34c6de16c287e3dca7e364291`.
  [Marine Institute ERDDAP subset](https://erddap.marine.ie/erddap/griddap/etopo180.csv?altitude%5B(52.5):1:(54.2)%5D%5B(-2.6):1:(-0.4)%5D),
  [NOAA metadata and free-use terms](https://coastwatch.pfeg.noaa.gov/erddap/info/etopo180/index.html).
  WGS84 positions; elevation metres relative to mean sea level.
- `natural-earth-rivers-main.geojson`: SHA256
  `bb854a900ecbd3b408df46d5e16e3e0f974ba55993f9d8b5c26e855273c0905a`;
  [retained download source](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_rivers_lake_centerlines.geojson).
- `natural-earth-rivers-europe.geojson`: SHA256
  `90712202ac46985812e90840df9acd5101599a9c649868d5bc55ee96c2fedd4c`;
  [retained download source](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_rivers_europe.geojson).
  Natural Earth 1:10m river data are generalised, not historical channels.
  [Public-domain terms](https://www.naturalearthdata.com/about/terms-of-use/).

These river collections omit the Don at this scale. The dashed Don is therefore
an explicitly author-generalised settlement sequence, not copied survey
geometry: Pennine headwaters, Sheffield, Rotherham, Mexborough, Conisbrough,
Doncaster, Stainforth and the Ouse confluence. Basis:
[Rotherham Council flood-risk toolkit](https://www.rotherham.gov.uk/downloads/file/543/rotherham-flood-risk-toolkit)
and [Environment Agency Don and Rother catchment](https://environment.data.gov.uk/catchment-planning/ManagementCatchment/3029).
Intermediate vertices are illustrative; neither medieval meanders nor modern
engineered channels are represented precisely.

Town reference positions use CC0 Wikidata coordinate statements, rounded in the
renderer, as reference points rather than medieval settlement boundaries:
[York Q42462](https://www.wikidata.org/wiki/Q42462) 53.95,-1.083333;
[Ashby Q2046537](https://www.wikidata.org/wiki/Q2046537) 52.746111,-1.476111;
[Conisbrough Castle Q3662579](https://www.wikidata.org/wiki/Q3662579) 53.4843,-1.22606;
[Doncaster Q58900](https://www.wikidata.org/wiki/Q58900) 53.522778,-1.1325;
[Sheffield coordinate item](https://www.wikidata.org/wiki/Q25526020) 53.380833,-1.470278.
The castle retains the novel's spelling Coningsburgh.

## Reproduction and review

`render-region.py` uses Python 3.14, numpy 2.3.4 and matplotlib 3.10.7 with
DejaVu Sans, fixed SVG hash salt and no SVG date. It outputs 1600×1400 PNG and
SVG. Plot extent and gateway conversion use the same rectangular geographic
frame, x80–980 and y130–1290. Relief uses one-arc-minute spacing, with
approximately 1100 m east-west and 1850 m north-south hillshade spacing.

`compress-maps.py` runs separately with system Pillow 12.3.0: lossless WebP,
method 6, no resizing, exact decoded RGB comparison. Original and compressed
files were opened for visual inspection. Final application coverage, all other
maps and full playback remain release blockers; this plate alone is no release.
