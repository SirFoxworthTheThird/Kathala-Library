import fs from 'node:fs'
import crypto from 'node:crypto'

const path=new URL('./artwork-manifest.json',import.meta.url)
const manifest=JSON.parse(fs.readFileSync(path,'utf8'))
const specs={
  ocean:['Atlantic and Indian Ocean route with true coastlines, Lisbon, Cape Verde, the Cape, East African ports and Calicut.','Checked land shapes, port dots, departure-to-India route, Cape rounding and bottom-edge coordinates; later names were removed from fixed labels for reading-mode gating.'],
  iberia:['Portugal and neighboring coast with departure and sites in the remembered monarchy.','Checked Lisbon/Belém, Coimbra, Ourique, Aljubarrota, Badajoz, Porto and Ceuta dots against the peninsula and strait; only the early Lisbon name is fixed on the image.'],
  'east-africa':['East African coast from Sofala to Melinde, with the poem’s ports at a useful regional scale.','Checked coastline and Mozambique, Kilwa, Mombasa and Melinde dot order; later port names are provided by gated markers.'],
  malabar:['West Indian coast approaching Calicut, with Cannanore and Cochin as regional reference pins.','Checked Arabian Sea approach, Malabar coastline, ship track remaining at sea and port dots; labels are supplied by gated markers.'],
  england:['England and Channel chart for Veloso’s embedded tale.','Checked island and Channel shapes; English court and crossing markers are illustrative, not a claimed tournament site.'],
  'calicut-city':['Interpretive coastal relief of the poem’s Calicut roadstead, landing, shrine, lodging, royal audience and trading quarter.','Checked ten plotted site pins and paths; caption explicitly says the relative layout is not surveyed.'],
  island:['Fictional topographic island coastline with landing beach, grove, path, terrace and height.','Checked five distinct locations, shore, contours and paths; caption identifies allegorical terrain with no earthly coordinates.'],
  divine:['Interpretive topographic shore rising to Olympus, with sea and other mythic domains.','Checked seven distinct domain pins and relief; caption identifies symbolic positions with no surveyed coordinates.'],
}
manifest.assets=manifest.assets.filter(asset=>!asset.path.includes('/maps/'))
for(const [name,[brief,review]] of Object.entries(specs)) {
  const relative=`library/os-lusiadas/maps/${name}.png`
  const file=new URL(`../../${relative}`,import.meta.url)
  const bytes=fs.readFileSync(file)
  manifest.assets.push({
    path:relative,entity:`${name} navigable map`,
    source:['calicut-city','island','divine'].includes(name)
      ? 'Original deterministic Pillow relief and contours in render-maps.py; explicitly interpretive, poem-based terrain.'
      : 'Natural Earth 1:10m public-domain land polygons and shaded relief rendered by render-maps.py, with original editorial route and labels.',
    prompt:`Topographic chart brief: ${brief} Legible graticule, coast, relief, route and spoiler-safe pins in a restrained atlas style; no scene illustration or claimed historical surveying.`,
    review,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),
  })
}
fs.writeFileSync(path,JSON.stringify(manifest,null,2)+'\n')
console.log(`Recorded ${Object.keys(specs).length} visually reviewed maps in artwork manifest`)
