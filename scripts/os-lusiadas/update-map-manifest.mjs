import fs from 'node:fs'
import crypto from 'node:crypto'

const path=new URL('./artwork-manifest.json',import.meta.url)
const manifest=JSON.parse(fs.readFileSync(path,'utf8'))
const specs={
  ocean:['Atlantic and Indian Ocean route with true coastlines, Lisbon, Cape Verde, the Cape, East African ports and Calicut.','Checked land shapes, port dots, departure-to-India route, Cape rounding and bottom-edge coordinates; later names were removed from fixed labels for reading-mode gating.'],
  iberia:['Portugal and neighboring coast with departure and sites in the remembered monarchy.','Checked Lisbon/Belém, Coimbra, Ourique, Aljubarrota, Badajoz, Porto and Ceuta dots against the peninsula and strait; only the early Lisbon name is fixed on the image.'],
  'east-africa':['East African coast from Sofala to Melinde, with the poem’s ports at a useful regional scale.','Checked coastline and Mozambique, Kilwa, Mombasa and Melinde dot order; later port names are provided by gated markers.'],
  malabar:['West Indian coast approaching Calicut and nearby Mount Eli, Kappad, Cannanore and Cochin.','Checked Arabian Sea approach, Malabar coastline and close port dots; labels are supplied by gated markers.'],
  england:['England and Channel chart for Veloso’s embedded tale.','Checked island and Channel shapes; English court and crossing markers are illustrative, not a claimed tournament site.'],
  'calicut-city':['Schematic coastal plan of the poem’s Calicut roadstead, landing, shrine, lodging, royal audience and trading quarter.','Checked all eight plotted site labels and routes; caption explicitly says the relative layout is not surveyed.'],
  island:['Schematic island coastline with landing beach, grove, Leonardo’s path, feast and Tethys’s height.','Checked five distinct locations and their route; caption identifies allegorical terrain with no earthly coordinates.'],
  divine:['Conceptual chart of Olympus, high air, winds and sea in the poem’s mythic plane.','Checked seven distinct domains and joining paths; caption identifies the symbolic, non-geographic layout.'],
}
manifest.assets=manifest.assets.filter(asset=>!asset.path.includes('/maps/'))
for(const [name,[brief,review]] of Object.entries(specs)) {
  const relative=`library/os-lusiadas/maps/${name}.png`
  const file=new URL(`../../${relative}`,import.meta.url)
  const bytes=fs.readFileSync(file)
  manifest.assets.push({
    path:relative,entity:`${name} navigable map`,
    source:name==='calicut-city'||name==='island'
      ? 'Original deterministic Pillow cartography in render-maps.py; poem-based schematic.'
      : 'Natural Earth 1:110m public-domain land polygons rendered by render-maps.py, with original editorial route and labels.',
    prompt:`Cartographic brief: ${brief} Mature navy, parchment and gold chart design; legible markers and no decorative illustration substituted for a map.`,
    review,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),
  })
}
fs.writeFileSync(path,JSON.stringify(manifest,null,2)+'\n')
console.log(`Recorded ${Object.keys(specs).length} visually reviewed maps in artwork manifest`)
