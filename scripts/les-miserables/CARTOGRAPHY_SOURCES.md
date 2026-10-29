# Cartographic references and scope

The pinned Hapgood manuscript remains authoritative for the novel's rooms,
movement, fictional geography and disclosure order. Historical records help
check context; they do not silently replace Hugo's described arrangements.

## Paris city overview

Xavier Girard, *Plan de la ville de Paris*, first published 1820 and revised
1830, Goujon and Andriveau; BnF identifier `btv1b53025224x`.
The original Gallica page returned HTTP 403 during this review, so the same
historical scan was obtained from its Wikimedia Commons mirror:
<https://commons.wikimedia.org/wiki/File:Paris_map_of_1830_published_by_Goujon_and_Andriveau_-_Gallica.jpg>.
The primary cartographic object, rather than the mirror's prose, grounds the
city geometry. The mirror marks the historical image as public domain.

Archived scan: `source/cartography/paris-girard-1830.jpg`, 12058 × 7192,
SHA-256 `960c871504357627fe8a805c16f39251b686b3c9d0420df67892bd833587b54b`.
The overview and central/southern details were inspected; Halles crops are
research evidence for the next neighborhood layer, not an accepted new layer.
The illustrated city map preserves the historical map's rotated orientation,
with simplified streets and building footprints and no surveyed scale.
Its first candidate misplaced the hospital-boulevard label; the selected edit
moves it to the interior hospital-quarter road. Twelve registered positions
were checked against the compressed image, including a river point moved off
the bank into the water. Full prompts are retained in the parent illustration
plan. App review is still pending.

## Regional physical overview

Natural Earth land geometry, 1:50 million:
<https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_land.geojson>.
Public-domain terms: <https://www.naturalearthdata.com/about/terms-of-use/>.
Archived bytes: `source/cartography/natural-earth-50m-land.geojson`,
SHA-256 `e874b27a51d146452be360cafb3cc50c86001074a67d534113e6534682f9826b`.
The earlier 1:110m download was too coarse for the southern coastline and is
unused by the selected geometry renderer.

`render-france-reference.mjs` produces a physical coast reference with seven
approximate geographical town centers. Political boundaries are omitted:
present-day borders would misrepresent the Empire/Restoration chronology.
Generated terrain is qualitative illustration, not a digital elevation model;
no measured elevation, travel distance or route is inferred from it.
The first candidate incorrectly connected separate river systems and was
rejected. The selected revision omits inland drainage entirely. Its seven
town positions were registered afresh and checked on the encoded raster.
The Waterloo point is regional context; battlefield movement still needs a
separate detailed map. App review remains open.

## Halles neighborhood

The same Girard 1830 scan supplies the neighborhood reference. The retained
crop covers Saint-Eustache, the old market approaches, Saint-Denis and the
southern lanes. It predates the Rue Rambuteau widening and modern market halls.
Hugo IV.XII.I paragraphs 5–8 governs the Chanvrerie/Mondétour connections;
IV.XIII.I paragraphs 8–14 governs the nighttime approach.

Historical endpoint context: Félix and Louis Lazare, *Dictionnaire administratif
et historique des rues de Paris*, 1844, entry “Contrat-Social (rue du)”,
<https://fr.wikisource.org/wiki/Dictionnaire_administratif_et_historique_des_rues_de_Paris_et_de_ses_monuments/C#Contrat-Social_(rue_du).>.
It identifies the short connection between Tonnellerie and Prouvaires. Its
1844 infrastructure details are not imported into the 1832 setting.

The first illustration had misplaced Tonnellerie/Bourdonnais labels and an
unclear Mondétour junction. The selected edit corrects these. Seven positions
were checked on the encoded raster and again in the current app map fixture.
The tentative Poterie/Contrat-Social identification in the nighttime scene is
retained as uncertainty; neither an exact path nor an exact shot site is
claimed. Local building shapes and distances remain simplified. No barricade,
horses, shooting incident or secret passage is painted into the base map.

## Corinthe and the old Halles streets

- Commission du Vieux Paris, meeting of 19 October 2017, printed pages 33–35,
  PDF pages 17–18:
  <https://cdn.paris.fr/paris/2019/07/24/93bb6132691fdd80e007396945d2a1e0.pdf>.
- PDF page 17 was rendered and inspected. It includes an excerpt of the
  Vasserot atlas (1810–1836), a modern parcel-plan view and a historical
  photograph of the corner property. The historical corner is useful context;
  modern road widening and the later photograph are not the 1832 street plan.
- The report's building history describes a ground floor, four upper floors
  and an attic. Hugo's account describes a lower wine-shop with its own room
  arrangement. The novel's account governs the companion's Corinthe floors.
- Cached reference: `source/cartography/commission-vieux-paris-2017-10-19.pdf`,
  5,302,430 bytes; SHA-256
  `c94dce6fe884bd8c4670259aff849e455675a01f4f6e9786db7ae9557af55fd1`.
- This report is research material only. None of its modern photographs or
  reproduced map pixels is embedded in the generated book illustrations.

## Digne: context and illustrated reconstruction

The local tourism office distinguishes the older Bourg settlement from the
later town on the Rochas hill. Its Saint-Jérôme material also records substantial
nineteenth-century changes. These pages were checked on 25 October 2026:

- <https://www.dignelesbains-tourisme.com/decouvrir/les-incontournables/digne-les-bains/>
- <https://www.dignelesbains-tourisme.com/activites-et-loisirs/culture-et-patrimoine/trois-parcours-pour-decouvrir-digne-les-bains/le-parcours-des-etoiles/>

A modern cathedral view must not be treated as a verified 1815 reconstruction.
The staged replacement uses qualitative hill relief and a textured town plan.
Its building placements and streets remain schematic, not a measured historical
terrain model. The original and compressed raster and all eighteen registered
positions were inspected. The first, excessively oblique candidate was rejected.
The selected overhead reconstruction still has raised architectural edges; it
is not an orthophoto. Source/encoding/marker hashes bind its staged acceptance.
Application review remains open.

## Generated urban illustrations

The selected boulevard and Chanvrerie illustrations are original generated
reconstructions using the local source-derived geometry references. Their
full prompts and four-step revision record are in `map-illustration-plan.mjs`.
Registered points use the new raster dimensions and were visually checked;
they are not scaled copies of the SVG coordinates. Map scale remains unset
because neither street drawing is a measured survey.

## Toulon port context
Official regional heritage inventory IA83001934 (https://pop.culture.gouv.fr/notice/merimee/IA83001934 ; https://dossiersinventaire.maregionsud.fr/dossier/IA83001934) and Musée national de la Marine’s official Toulon history (https://www.musee-marine.fr/nos-musees/toulon/le-musee-a-toulon/a-propos-du-musee-de-toulon/lieu-et-parcours.html) were checked for older arsenal/basin and land-based bagne context. No historic plan image was downloaded or visually inspected for this layer. The regional inventory full-page access was blocked by a JavaScript challenge; search text and the national heritage record provide textual context only. Port artwork does not claim measured basins, exact property parcels or documented ship berths. Hugo chapter 92 establishes the two vessels alongside; first end-to-end candidate rejected and corrected. Ship fittings are editorial, with no claim to a surviving measured Orion plan.

## Southern regional context
render-southern-reference.mjs reuses the pinned public-domain Natural Earth 1:50m physical land geometry. Reference bounds 5.7–7.6 E, 43.3–44.8 N, with rounded approximate Digne, Senez, Jausiers and Grasse centers. The final illustration is a qualitative reconstruction: town symbols, roads and relief are artistic approximations rather than a measured terrain model. Unlocated story settings appear on a separate detail atlas; Chastelar is not asserted to be modern coastal Castellar, and the hidden valley/plain have no invented addresses.

## Atlantic context and Hauteville House

render-atlantic-reference.mjs uses the same pinned public-domain Natural Earth 1:50m physical land geometry, bounds -130 to 35 longitude and -60 to 72 latitude, without political boundaries. Generated relief is qualitative, not measured elevation. Pinned source 363/205–206 names America and a draft on New York but no residence: no specific American destination is asserted. Source 365/7 dates the Hauteville-House letter 18 October 1862. The official Maisons Victor Hugo site confirms Hauteville House at Saint Peter Port, Guernsey: https://www.maisonsvictorhugo.paris.fr/guernesey/la-maison and https://www.maisonsvictorhugo.paris.fr/guernesey . No modern visitor logistics or modern interior plan are imported; map point is island-scale.

## Paris regional geography

Official Etalab API Geo (https://geo.api.gouv.fr/) town-centre responses pinned in source/cartography/paris-region-towns.json, SHA256 548613a8aa5d10c649a7feb6710343a8461c850c57ee6e1e170086204e3f3b85. Requests: https://geo.api.gouv.fr/communes/{code}?fields=nom,centre,code for 75056 Paris, 92064 Saint-Cloud, 92040 Issy-les-Moulineaux, 92071 Sceaux, 95205 Écouen, 94043 Le Kremlin-Bicêtre, 77108 Chelles and 93047 Montfermeil. Only town-centre geography used, not modern outlines/urban extent; source-era label Bicêtre replaces the modern commune name. Retrieved with native HTTPS after Python CA verification failed; browser connector could not expose these JSON endpoints.

Natural Earth 1:10m rivers, public domain under the already cited Natural Earth terms: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_rivers_lake_centerlines.geojson . Pinned source/cartography/natural-earth-10m-rivers.geojson SHA256 bb854a900ecbd3b408df46d5e16e3e0f974ba55993f9d8b5c26e855273c0905a; only Seine and Marne centrelines used. These are physical context, not a reconstruction of 1830 bank widths or engineering. render-paris-region-reference.mjs verifies both hashes and generates the repeatable reference. Selected generated illustration has residual artist drift and explicitly approximate town positions; roads, terrain, settlements and source parcels schematic, no surveyed elevation claim.
