import fs from 'node:fs'
import assert from 'node:assert/strict'
import { itemDefinitions } from './item-ledger.mjs'
import { buildEnrichmentAudit } from './build-enrichment-audit.mjs'
import { retained,chapters } from './source-text.mjs'

const audit=buildEnrichmentAudit()
const sourceRanges={
 'mabeuf-diogenes-volume':[265,2,3],
 'brujon-escape-rope':[251,2,4],
 'brujon-rope-fragment':[251,22,23],
 'la-force-drugged-wine-bottle':[251,28,29],
 'marius-prison-payment-coin':[232,0,1],
 'barge-address-paper':[249,13,15],
 'mabeuf-lane-gift-purse':[242,68,69],
 'marius-gold-watch':[181,18,23],
 'marius-bloodied-coat':[363,189,191],
 'mother-crucifixion-own-coffin':[140,87,109],
 'municipal-burial-coffin':[140,176,194],
 'gribier-cemetery-card':[144,35,55],
 'pontmercy-ring':[89,23,25], 'pontmercy-legion-cross':[89,33,38],
 'pontmercy-watch':[89,35,38], 'pontmercy-purse':[89,35,38],
 'madeleine-route-slip':[56,64,71], 'valjean-property-note':[70,27,32],
 'silver-candlesticks':[6,16,17], 'silver-tableware':[6,15,18],
 'yellow-passport':[17,9,12], 'gervais-forty-sous':[27,6,10],
 'valjean-thorn-cudgel':[57,81,82], 'valjean-old-outfit':[57,81,82],
}
const cues={
 'mabeuf-diogenes-volume':'ONE cherished old seventeenth-century printed book, closed on a modest plain wooden reading table in early1830sFrance. Worn simple brown calf binding, raised spine bands and age-darkened cream paper edges are restrained editorial interpretations; no specific surviving copy or binding is asserted. No readable title, author, date, gilded fake lettering, modern dust jacket, stack of books, spectacles, coin, person or later sale scene. The source identifies a Lyons1644Diogenes Laertius edition, not a modern book or manuscript scroll.',
 'brujon-escape-rope':'ONE roughly hand-woven early nineteenth-century rope, loosely coiled on a plain rough stone floor, intact at this first introduction. Coarse natural fibers, no modern nylon, carabiner, climbing harness, manufactured packaging, knots suggesting a noose, person, prison bars, body, weapon or later break. The exact fiber and length are not specified; do not invent a measured scale.',
 'brujon-rope-fragment':'ONE short broken fragment of coarse hand-woven natural-fiber rope resting alone on plain aged roof stone. Frayed broken end clearly visible. No whole coil, second rope, noose, hook, person, body, prison escape action or later knotted repair. The exact length and fiber remain interpretive.',
 'la-force-drugged-wine-bottle':'ONE plain early nineteenth-century dark green glass wine bottle, about half filled, standing on rough stone in a simple still life. No label, readable writing, poison emblem, skull, medicine vial, glass for drinking, person, body or scene of administering a drink. The source identifies the contents through narration; do not invent a visible chemical or claim a specific narcotic.' ,
 'cosette-bread-fifteen-sous':'Exactly ONE worn small silver fifteen-sou piece on a plain old wooden table. No other coins or food. Keep die relief faint and indistinct: no readable denomination, date, mint or ruler portrait. Not gold, modern decimal currency or a banknote. The source explicitly gives a single fifteen-sou piece; no exact undocumented die is asserted.',
 'cosette-childhood-mourning-clothes':'An unworn small early nineteenth-century BLACK clothing bundle laid out on a plain bench: woollen gown, apron, fustian bodice, kerchief, petticoat, woollen stockings and plain shoes. All black, sized for a girl of seven. No child, doll, mannequin, body part, luxurious lace, patterned color or modern footwear. A practical modest complete outfit, not a fashionable adult mourning dress.',
 'cosette-gold-twenty-franc-piece':'Exactly ONE small worn GOLD twenty-franc coin resting in the hollow of ONE coarse old wooden sabot on a cold stone hearth. The shoe is worn with dried mud and ash; no living foot, person or second shoe. Coin relief must be indistinct, without readable date, name, denomination or invented ruler portrait. No fire, gift wrapping, fairy or modern token.',
 'courfeyrac-barricade-coffer':'ONE large plain square wooden coffer approximately the size of a large travelling valise, CLOSED, partly emerging from a heap of crumpled old linen on a modest lodging floor. Simple early nineteenth-century joinery and plain iron latch. No miniature jewel box, precious ornament, open lid or visible contents. Cartridges are not revealed at this first appearance. No person, hat, purse, readable labels or later barricade.',
 'fantine-child-release-letter':'ONE modest sheet of early nineteenth-century cream laid paper, loosely folded, with a plain ink pen resting beside it on an ordinary wooden desk. Frame the unmarked back of the folded letter so no writing is legible. No wax seal, stamp, ribbon, printed letterhead, invented signature, readable quotation, modern envelope or second document. This is a simple dictated authorization, not an ornate certificate.',
 'fantine-knitted-petticoat':'ONE small practical knitted wool petticoat for a young child, unworn, neatly folded over a plain wooden bench so its waistband and knitted skirt are distinguishable. Muted undyed wool is an editorial color choice; no color is specified. No person, mannequin, knitting needles, yarn ball, luxury lace, ribbon, embroidery, readable label or later wearer. It is purchased ready-made, not shown being knitted.',
 'gavroche-triggerless-pistol':'ONE old early nineteenth-century single-shot holster pistol with a worn wooden stock, long steel barrel and simple flintlock, lying sideways on plain cloth. The trigger is visibly MISSING: an empty trigger guard, no trigger inside. No revolver cylinder, cartridges, modern gun, hand, firing, smoke, blood or second weapon. Clear detailed object profile, distinct from the later captured musket and the pair of signal pistols.',
 'gavroche-woollen-shawl':'ONE plain coarse WOOLLEN shawl, spread loosely over a bare wooden bench, showing a thick comfortable woven texture and a little wear. Restrained brown-gray is an editorial color choice, not a documented exact color. No person, body part, wearer, window, lace, bright silk, pins or lettering. It is a single cloth usable wrapped about neck and shoulders, not a modern fitted scarf.',
 'mother-crucifixion-own-coffin':'One closed, plain, aged DARK WOOD coffin used for many years as a sleeping box in an austere French convent in1824. A long simple six-sided box with a worn flat lid, unadorned joinery and no metallic trim, handles, carving, cross, lettering or badge. Resting on two plain low supports in a restrained dim stone room. No corpse, person, human shape, bedding, nun, burial scene or open grave. The exact wood species, dark finish and outline are artistic interpretation: the source establishes her own long-used coffin rather than a specific surviving object.',
 'municipal-burial-coffin':'One EMPTY new simple PINE coffin supplied by a French burial administration in1824, long enough for an adult, pale unpainted softwood with visible plain board joinery. Its flat lid rests slightly to one side so a small part of the empty interior is visible; a plain folded WHITE cloth lies beside it on a trestle. Object-focused three-quarter view, light plaster background, no other coffin. No corpse, person, living passenger, straw, earth, air holes, graphic scene, black cloth, modern polished casket, metal handles, cross, lettering, dates or seal. Do not reveal its later escape use. Plain construction and exact outline are interpretation.',
 'gribier-cemetery-card':'One small plain WHITE cemetery access card of substantial early nineteenth-century paper, resting alone at an angle on dark coarse waistcoat cloth. A few short faint indistinct ink lines are permissible but NOTHING readable, no exact name, number, date, invented official seal, modern ID photo, barcode, plastic, lamination, hole punch, metal tag, ribbon, envelope, hand or person. Material thickness and exact dimensions are modest interpretation; the source establishes a white card carried in the waistcoat pocket. No theft or later gate scene. Closely framed object illustration with paper edges and creases clearly visible.',
 'pontmercy-ring':'Exactly ONE simple GOLD finger ring, worn smooth, resting alone on a small fold of coarse linen against plain dark earth tones. No finger, hand, corpse, blood, thief, diamond, heraldic crest, engraving or readable inscription. The text specifies gold but no particular gem or ornament; the plain band is an artistic interpretation rather than an authenticated family ring.',
 'pontmercy-legion-cross':'One small FIRST EMPIRE French Legion of Honor decoration in SILVER, not a Christian crucifix: a five-rayed star with DOUBLE-POINTED white enamel arms, silver edging, oak/laurel wreath between the arms, small indistinct central medallion with a muted blue ring, a short folded RED RIBBON. Interpret period construction without assigning an exact manufacturer or variant. Do not depict the modern Republican decoration, modern lettering, a four-arm cross, huge grand-cross breast star, gold officer badge, person, blood or robbery. No readable inscription or exact imperial portrait in the tiny center.',
 'pontmercy-watch':'One early nineteenth-century French POCKET WATCH with a plain worn silver-tone metal case and simple small suspension loop, resting on coarse cloth. Closed case, no readable maker/date/dial, no wrist strap, modern watch, diamond ornament, ownership monogram, blood or person. The source establishes a watch in the fob but does not specify its metal or decoration; restrained case appearance is interpretation.',
 'pontmercy-purse':'One small worn early nineteenth-century dark brown soft LEATHER DRAWSTRING PURSE, tied closed and resting on coarse cloth, no coins spilling out, denomination, initials or embroidered crest. Leather, color and exact closure are modest period interpretation; the source establishes a purse but not the amount or exact material. No person, hand, body, blood or robbery tableau.',
 'madeleine-route-slip':'One SMALL folded/creased paper slip lying on a plain modest mantel shelf in provincial France1823, with a few indistinct ink calculations that are NOT LEGIBLE. No large illustrated map, diagram, exact readable town names, modern ticket, seal, ink-stamp, person or later outcome. Source notes distances written on a forgotten slip; depict the paper object, not its route as an illustration.',
 'valjean-property-note':'One ordinary UNFOLDED handwritten instruction sheet of early nineteenth-century paper, lying on a plain wooden table, a few short indistinct ink paragraphs without readable wording, names, signatures, figures or address. No envelope, testament seal, elaborate parchment, modern lined notebook, coins, candlesticks, recipient or dying man. The note is a practical paper with instructions for property and charitable expenses, not a formal illuminated will.',
 'silver-candlesticks':'Exactly TWO large, substantial matching silver candlesticks, each with one unlit wax candle, on a plain coarse linen cloth. Classical early nineteenth-century domestic silver, modest fluted stems and broad stable bases; no ornate church candelabrum, multiple branches, gold, brass, people, theft, fire or later outcome. Source6:16 establishes the pair; exact ornament is artistic interpretation.',
 'silver-tableware':'The bishop’s small silver dining service, with several overlapping period knives/forks and a large soup ladle partly revealed from a coarse linen cloth. Make the ladle and solid silver utensils clearly legible. Not candlesticks, gold vessels, porcelain service, palace feast or later theft. Chapter6:15/17 calls them knives and forks, while24 calls them forks and spoons; the partial arrangement must not pretend to resolve that wording into an exact visible inventory.',
 'yellow-passport':'One worn yellow paper passport document from France about1815, creased from folding and unfolded on a plain table. Faded dark period handwritten/printed lines must be indistinct and UNREADABLE, no invented official seal or readable date/name. Its yellow paper, simple form and travelling wear identify the object; not a modern booklet, photograph ID, modern stamp, later white election passport or police badge.',
 'gervais-forty-sous':'Exactly ONE small worn silver coin of the forty-sou value in circulation in France in1815, lying on dusty earth beside a small pebble for ordinary context. Faint worn relief, no legible denomination, emperor portrait, mint mark or exact date asserted. No gold, banknote, pile of coins, foot, person or later blackening/fire. Specific undocumented die design must remain indistinct.',
 'valjean-thorn-cudgel':'One complete heavy knotted THORN-WOOD travelling cudgel, iron-shod at BOTH ends, lying diagonally against a plain coarse cloth background. Rough irregular dark wood and plain iron ferrules, no blade, spike, firearm, fantasy ornament or readable inscription. Show the intact source object as revealed in the cupboard before the fire in57:81, no burning or later broken metal remnants.',
 'valjean-old-outfit':'A small group of worn early nineteenth-century travelling belongings: ONE faded BLUE linen blouse, old plain trousers and an old knapsack. Folded together on a plain shelf, coarse cloth and patched leather, no person. Do not include the separate cudgel, silver candlesticks, passport, red convict uniform, modern backpack, readable label or flames. Source57:81 shows these intact before their destruction; precise cuts/patches are interpretation.',
}

export function itemArtPlan(key){
 const item=itemDefinitions.get(key);assert.ok(item,`Unknown illustrated item: ${key}`)
 const occurrence=audit.items.find(row=>row.key===key)?.occurrences[0]
 assert.ok(occurrence,`Item needs source occurrence: ${key}`)
 const scene=audit.scenes.find(row=>row.scene===occurrence.scene)
 const range=sourceRanges[key]
 const passage=range?chapters[range[0]-1].paragraphs.slice(range[1],range[2]).map(p=>p.text).join('\n\n'):
  retained.slice(scene.start,scene.end).trim().slice(0,6500)
 const prompt=[
  'One finished OBJECT illustration for Victor Hugo’s Les Misérables reading companion. Refined literary ink crosshatching with restrained watercolor on warm cream paper, natural materials and period detail. No text, captions, borders, collage, photograph, cartoon or fantasy style. The object is the clear focus, with a minimal grounded background, not a map or portrait.',
  `SUBJECT ONLY: ${item.name}. ${item.description}`,
  cues[key]??'Depict the precise object described in its source introduction. Its later use, damage, ownership and revelations are not part of this first-appearance image. Unspecified minor decoration is artistic interpretation, never invented readable text.',
  'No people or body parts. People and places in the following passage are source context only. No extra story props or later event. Use a useful close still-life composition; show enough of the object to identify it. Any paper text or marks must be indistinct, not counterfeit quotations.',
  `Source context for the depicted object:\n${passage}`,
 ].join('\n\n')
 return{key,kind:'item',firstScene:occurrence.scene,sourceChapter:occurrence.chapter,
  ...(range?{depictionSource:{chapter:range[0],paragraphs:range.slice(1),endExclusive:true}}:{}),
  prompt,status:'Candidate requires source and visual review; no automatic acceptance'}
}

if(process.argv[1]&&import.meta.url.endsWith(process.argv[1].replace(/\\/g,'/'))){
 const option=process.argv.find(value=>value.startsWith('--keys='))
 const keys=option?option.slice(7).split(','):[...itemDefinitions.keys()]
 const plans=keys.map(itemArtPlan)
 if(option)console.log(JSON.stringify(plans))
 else{
  fs.writeFileSync(new URL('./ITEM_ART_PLAN.json',import.meta.url),JSON.stringify(plans,null,2)+'\n')
  console.log(`${plans.length} source-context object plans; candidate plans are not accepted artwork`)
 }
}
