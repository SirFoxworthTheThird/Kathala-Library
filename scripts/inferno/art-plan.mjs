import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..')
const world=JSON.parse(fs.readFileSync(path.join(root,'library/inferno.pwk'),'utf8'))
const cleanKey=(id,prefix)=>id.slice(prefix.length)

const portraitOverride={
  mahomet:'A dignified medieval figure as Dante’s poem imagines him, standing in grave profile with a visibly divided outer robe used as a restrained symbolic allusion; fully clothed, no bodily wound, no blood, respectful and non-caricatured.',
  lucifer:'The immense emperor of the frozen depth as an austere three-faced ruined angel emerging from dark ice, six folded batlike wings, tragic monumental scale, no gore.',
  cerberus:'A powerful three-headed hound in cold rain and mud, anatomically coherent, solemn bestiary treatment rather than cartoon fantasy.',
  minotaur:'A massive bull-headed guardian on a shattered rocky descent, restrained bestiary realism, tense but not gory.',
  geryon:'A strange full figure with a calm human face, patterned leonine body, hairy paws, and a long scorpion tail, rendered as an intelligent medieval allegory.',
  malebranche:'A small coordinated patrol of black winged trench wardens carrying long grappling hooks, disciplined group silhouette, grotesque but not comic.',
  children:'Four young prisoners gathered close around their father in a bare medieval tower, quiet courage and hunger conveyed without suffering spectacle.',
  francesca:'Francesca da Rimini as an adult medieval Italian noblewoman in a fully covering thirteenth-century gown and mantle, grave, articulate, and carried by a suggestion of wind; solo portrait.',
  paolo:'Paolo Malatesta as an adult medieval Italian nobleman in a fully covering thirteenth-century tunic, mantle, and hose, silent and sorrowful in a suggestion of wind; solo portrait.',
  charon:'Charon as an elderly ferryman in a fully covering dark wool tunic, hooded mantle, gloves, and heavy boots, standing in a narrow medieval river skiff with one oar; stern and weathered, no exposed torso.',
  minos:'King Minos as an elderly medieval magistrate in a fully covering floor-length dark wool robe, mantle, gloves, boots, and plain crown, seated upright on a stone judgment chair; grave and imposing, solo portrait, ordinary human anatomy, no exposed torso, no serpent imagery.',
  lano:'Lano da Siena as an adult medieval Tuscan rider in a fully covering long tunic, cloak, hose, gloves, and boots, running through a dark thorn wood; solo portrait, no exposed skin beyond face and hands, no pursuers, no injury.',
  agnello:'Agnello Brunelleschi as an adult medieval Florentine in a fully covering tunic, mantle, hose, and boots, standing warily beside a single small symbolic serpent motif carved into stone; normal human anatomy, no transformation, no exposed torso.',
  griffolino:'Griffolino d’Arezzo as an adult medieval artisan-alchemist in a fully covering wool robe, mantle, gloves, and cap, seated beside a closed crucible and tongs; thoughtful and weary, healthy skin, no disease imagery.',
  ruggieri:'Archbishop Ruggieri degli Ubaldini as a grave adult thirteenth-century Pisan churchman, standing alone in a fully covering dark ecclesiastical robe and mantle with a historically plausible simple mitre held at his side; calculating expression, ordinary human anatomy, no monsters, no other people, no violence.',
}

const common='Style/medium: refined late-medieval Italian manuscript illumination blended with copperplate engraving and restrained mineral pigments, mature literary edition art. Lighting/mood: solemn, psychologically specific, subtle ember light and deep lapis shadow. Constraints: historically grounded clothing or poem-specific anatomy; respectful, non-caricatured treatment; no readable text, no letters, no logos, no watermark, no modern objects, no graphic gore, no cartoon styling.'

const locationOverride={
  'malebolge-region':'An empty aerial topographic view of ten concentric stone trenches descending toward a central well, linked by fractured rock bridges, severe volcanic terrain, no people or creatures.',
  'hell-gate':'A monumental empty iron gate set into a sheer dark stone escarpment, austere medieval masonry, windswept threshold, no people or creatures.',
  acheron:'An empty dark river crossing beneath steep mineral cliffs with one small weathered ferry moored at a stone landing, no people or creatures.',
  'limbo-rim':'An empty high cliff overlook above a broad mist-filled valley and distant seven-walled citadel, quiet twilight, no people or creatures.',
  'circle-two':'An empty wind-carved stone basin beneath layered storm clouds, with long ribbons of pale mist tracing a circular gale around a quiet central rock, no people or creatures.',
  styx:'An empty black marsh crossed by a narrow raised stone causeway, reed beds and mineral pools beneath a low ember-coloured sky, no people or creatures.',
  'circle-seven-rim':'An empty fractured stone rim descending into a broad lower valley, layered geological terraces and a narrow switchback path, no people or creatures.',
  'malebolge-overlook':'An empty elevated stone overlook above a vast system of concentric rock trenches and bridges, severe engineered terrain, no people or creatures.',
  'bolgia-one':'An empty circular stone trench with two parallel processional paths divided by a central ridge, worn paving and high retaining walls, no people or creatures.',
  'bolgia-two':'An empty circular drainage trench of dark stone, mineral-stained channels and a narrow arching bridge, no people or creatures.',
  'bolgia-seven':'An empty circular stone trench patterned with pale winding mineral veins, fractured ledges and a narrow bridge, no people or creatures.',
  'bolgia-eight':'An empty circular stone trench containing many small enclosed amber lights like lanterns among black rocks, viewed from a high bridge, no people or creatures.',
  'bolgia-nine':'An empty circular stone trench marked by repeated vertical fissures in its walls and a narrow central path, austere geological study, no people or creatures.',
  'bolgia-ten':'An empty circular stone trench with abandoned crucibles, sealed jars and mineral deposits beside a narrow bridge, no people or creatures.',
}

const characters=world.characters.map(character=>{
  const key=cleanKey(character.id,'inferno-char-')
  const subject=portraitOverride[key]??`${character.name}, shown at the moment implied by this spoiler-safe description: ${character.description}`
  return {kind:'character',key,name:character.name,path:`library/inferno/art/characters/${key}.png`,prompt:`Use case: historical-scene. Asset type: distinct Kathala character portrait. Primary request: ${subject} Composition: portrait-oriented three-quarter or full-figure study with a simple setting appropriate to the first appearance, one clear subject unless the record is explicitly collective. ${common}`}
})

const locations=world.locationMarkers.map(location=>{
  const key=cleanKey(location.id,'inferno-loc-')
  const subject=locationOverride[key]??`${location.name}. ${location.description}`
  return {kind:'location',key,name:location.name,path:`library/inferno/art/locations/${key}.png`,prompt:`Use case: historical-scene. Asset type: distinct Kathala place illustration, separate from the navigable map. Primary request: ${subject} Composition: landscape environmental view at human eye level, strong specific terrain and architecture, no dominant portrait subject. ${common}`}
})

const items=world.items.map(item=>{
  const key=cleanKey(item.id,'inferno-item-')
  return {kind:'item',key,name:item.name,path:`library/inferno/art/items/${key}.png`,prompt:`Use case: historical-scene. Asset type: distinct Kathala object illustration. Primary request: ${item.name}. ${item.description} Composition: centered object or coherent collective set on stone, parchment, or dark cloth, close detail, material texture, no person holding it. ${common}`}
})

const factions=world.factions.map(faction=>{
  const key=cleanKey(faction.id,'inferno-faction-')
  return {kind:'faction',key,name:faction.name,path:`library/inferno/art/factions/${key}.png`,prompt:`Use case: historical-scene. Asset type: distinct Kathala faction illustration. Primary request: ${faction.name}. ${faction.description} Composition: landscape group tableau with clear shared purpose and period-appropriate visual identity, no heraldic text. ${common}`}
})

const coverPrompt="Use case: historical-scene. Asset type: Kathala book cover illustration. Primary request: Dante and Virgil stand at the brink of the immense descending topography of Inferno, a dark wood behind them, concentric rocky circles and distant fire below, frozen blue-black depth at the centre, and a small opening of stars far beyond. Subject: two adult medieval Italian poets in historically grounded early fourteenth-century robes, Dante in a restrained red cap and robe, Virgil in muted classical mantle; solemn, intelligent, mature, never theatrical caricature. Style/medium: refined late-medieval Italian manuscript illumination blended with engraved relief and restrained mineral pigments, sophisticated literary edition art. Composition: portrait-oriented central descent with the two figures small enough to emphasize scale, strong readable silhouette for a library cover. Lighting/mood: austere ember glow, lapis darkness, pale starlight, moral gravity. Constraints: no readable text, no letters, no logos, no watermark, no modern objects, no graphic gore, no cartoon styling."
const cover=[{kind:'world',key:'cover',name:'Inferno',path:'library/inferno/art/world.webp',prompt:coverPrompt}]

const mapPrompts={
 overview:"Use case: historical-scene. Asset type: navigable topographic map illustration for Kathala. Primary request: a rigorous cutaway map of Dante's Inferno beneath the inhabited northern hemisphere, showing the dark wood and sunlit slope at the surface, a vast descending conical cavity with distinct terraces, the red City of Dis, the concentric trenches of Malebolge, frozen Cocytus at Earth's centre, and a narrow hidden ascent curving toward the opposite hemisphere. Style: mature early-fourteenth-century Italian portolan and manuscript cartography blended with engraved geological relief, restrained umber, iron red, soot black, lapis and ice blue. Composition: landscape 3:2, north/surface at top and Earth's centre low, clear terrain hierarchy and navigable open spaces for markers. Constraints: image must read as a serious topographic map, no decorative border, no labels, no readable text, no letters, no compass text, no cartoon icons, no watermark, no graphic gore.",
 upper:'Use case: historical-scene. Asset type: navigable topographic submap for Kathala. Primary request: overhead oblique relief map of Upper Hell from the monumental gate through the vestibule, Acheron ferry crossing, dim meadow of Limbo with a seven-walled noble castle, windy second circle, rain-soaked third, burden tracks of the fourth, black marsh of Styx with signal tower, and red iron walls of Dis. Style: mature medieval Italian cartography with engraved terrain and restrained mineral pigments. Composition: landscape 3:2, sequential descending terrain with distinct waterways, ridges, roads, and landmark architecture, ample marker space. Constraints: true map readability, no labels or readable text, no decorative scene montage, no cartoon style, no watermark, no graphic gore.',
 lower:'Use case: historical-scene. Asset type: navigable topographic submap for Kathala. Primary request: overhead oblique relief map inside the City of Dis showing the cemetery of fiery tombs, a broken rocky descent, boiling red river Phlegethon with centaur patrol path, a dense black thorn forest, an arid burning-sand plateau crossed by a narrow red rill, and a great cataract falling toward Malebolge. Style: serious early Renaissance engraved relief map with muted manuscript colour, geographically coherent connected terrain. Composition: landscape 3:2, clear elevation changes and route continuity, no dominant figures. Constraints: map, not narrative illustration; no labels, no readable text, no cartoon symbols, no watermark, no graphic gore.',
 malebolge:"Use case: historical-scene. Asset type: navigable topographic submap for Kathala. Primary request: a precise overhead oblique relief map of Malebolge as ten concentric descending stone trenches around a central giants' well, crossed by radial rock bridges, with several collapsed bridge sections, distinct trench textures including pitch, flame, serpents, and diseased ground shown symbolically and subtly. Style: mature medieval engineering plan blended with engraved volcanic topography and restrained iron-red pigments. Composition: landscape 3:2, every ring and bridge clearly legible, open marker areas, central depth emphasized. Constraints: no labels, numbers, readable text, cartoon figures, decorative border, watermark, or graphic gore.",
 cocytus:"Use case: historical-scene. Asset type: navigable topographic submap for Kathala. Primary request: overhead oblique relief map of frozen Cocytus below the giants' well, with four progressively deeper ice zones, wind-scoured cracks, a dark central shaft at Earth's centre, a monumental shadow fixed in the deepest ice, and a narrow rocky passage turning upward beside a hidden stream. Style: sober engraved glacial topography with lapis, lead grey, silver and muted umber, late-medieval manuscript discipline. Composition: landscape 3:2, clearly separated zones and an intelligible exit route. Constraints: serious map readability, no labels, no readable text, no cartoon icons, no watermark, no graphic gore.",
 history:'Use case: historical-scene. Asset type: historical topographic map for Kathala. Primary request: a geographically coherent medieval Mediterranean and Italy relief map extending from the Atlantic west of Gibraltar to Italy, with the Pillars of Hercules, western ocean, central Mediterranean sea lanes, Rome, Pisa, Rimini, Mantua and Montefeltro indicated only through accurate terrain and small unlabeled landmarks. Style: mature portolan chart and engraved topography on warm parchment, restrained lapis sea and earth pigments. Composition: landscape 3:2, north up, coastlines and mountains recognizable, generous space for app markers. Constraints: no labels, no readable text, no invented islands, no decorative monsters, no cartoon look, no watermark.',
}
const maps=Object.entries(mapPrompts).map(([key,prompt])=>({kind:'map',key,name:world.mapLayers.find(map=>map.id===`inferno-map-${key}`).name,path:`library/inferno/maps/${key}.png`,prompt}))

export const artPlan=[...cover,...maps,...characters,...items,...locations]

if(process.argv[1]===fileURLToPath(import.meta.url)){
 const kind=process.argv[2]??'all',start=Number(process.argv[3]??0),count=Number(process.argv[4]??artPlan.length)
 const selected=(kind==='all'?artPlan:artPlan.filter(asset=>asset.kind===kind)).slice(start,start+count)
 process.stdout.write(JSON.stringify(selected))
}
