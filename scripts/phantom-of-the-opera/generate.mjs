import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { narrativeText, sourceSections, sourceEdition, sourceUrl, splitSection } from './source-text.mjs'
import { sectionPlans } from './story-ledger.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const repo = path.resolve(here, '../..')
const out = path.join(repo, 'library/the-phantom-of-the-opera.pwk')
const W = 'phantom-opera-world'
const T = 'phantom-main-timeline'
const now = Date.UTC(2026, 8, 14, 12)
const stamp = { worldId: W, createdAt: now, updatedAt: now }
const id = s => `phantom-${s}`
const ref = (kind, key) => id(`${kind}-${key}`)
const asset = (kind, key, ext = 'png') => `library/the-phantom-of-the-opera/${kind}/${key}.${ext}`
const words = text => (text.match(/\S+/g) || []).length
const empty = () => []

const mapDefs = [
  ['france-paris', null, 'France and Paris', 'The Paris region and the Breton coast connected by rail in the late nineteenth century.', 1586, 992],
  ['palais-garnier', 'france-paris', 'Palais Garnier — Public Spaces', 'A cutaway plan of the auditorium, foyers, offices, boxes, dressing rooms, and grand staircase.', 1448, 1086],
  ['stage-upper', 'palais-garnier', 'Stage and Upper Works', 'The immense stage house, workshops, fly galleries, trap machinery, and roof access.', 1448, 1086],
  ['opera-roof', 'stage-upper', 'Opera Roof', 'The lead roofs, statuary, domes, and Apollo’s Lyre high above Paris.', 1586, 992],
  ['cellars', 'stage-upper', 'Opera Cellars', 'The lower passages, furnaces, abandoned rooms, and the route toward the underground lake.', 1448, 1086],
  ['lake-house', 'cellars', 'House on the Underground Lake', 'Erik’s isolated home beyond the black water, with music room, drawing room, and concealed defenses.', 1513, 1040],
  ['torture-chamber', 'lake-house', 'Torture Chamber', 'A mirrored hexagonal chamber, iron tree, heated wall, and adjoining powder cellar.', 1415, 1111],
]

const maps = mapDefs.map(([key, parent, name, description, w, h], i) => ({
  ...stamp, id: ref('map', key), parentMapId: parent ? ref('map', parent) : null,
  name, description, imageId: ref('image', `map-${key}`), imageWidth: w, imageHeight: h,
  scalePixelsPerUnit: null, scaleUnit: null, levelGroupId: null, levelIndex: i, levelLabel: null,
}))

const locations = [
  ['opera', 'france-paris', 'Palais Garnier', 'The monumental Paris opera house, whose lavish public rooms conceal a second architecture of service corridors, traps, and flooded foundations.', 1325, 440, 'palais-garnier'],
  ['gare-nord', 'france-paris', 'Gare du Nord', 'The northern railway terminus from which Raoul follows Christine toward Brittany.', 1305, 465],
  ['bois', 'france-paris', 'Bois de Boulogne', 'A fashionable wooded drive west of Paris where a mysterious brougham carries Christine away.', 1240, 410],
  ['persian-flat', 'france-paris', "The Persian’s Flat", 'A discreet Paris residence where the Persian keeps pistols, memories, and hard-won knowledge of Erik.', 1360, 390],
  ['perros-beach', 'france-paris', 'Perros-Guirec Shore', 'A wind-beaten Breton coast remembered from Christine’s childhood and her father’s stories.', 315, 610],
  ['perros-church', 'france-paris', 'Perros Church', 'The village church whose bells and dark aisles frame Christine’s return to her father’s grave.', 350, 595],
  ['perros-churchyard', 'france-paris', 'Perros Churchyard', 'The small cemetery above the Breton sea where Christine keeps vigil at her father’s grave.', 335, 575],
  ['opera-archives', 'palais-garnier', 'Opera Archives', 'Records, reports, and architectural evidence preserved inside the Opera allow the narrator to test the ghost legend.', 1245, 235],
  ['opera-entrance', 'palais-garnier', 'Main Entrance', 'The grand public threshold opening from Paris into marble, gilt, and theatrical spectacle.', 720, 75],
  ['grand-staircase', 'palais-garnier', 'Grand Staircase', 'A ceremonial ascent of marble flights and balconies where performers, patrons, and rumors mingle.', 720, 315],
  ['masked-foyer', 'palais-garnier', 'Grand Foyer', 'A glittering gallery transformed by masked revelers during the Opera ball.', 290, 355],
  ['auditorium', 'palais-garnier', 'Auditorium', 'The red-and-gold horseshoe theater beneath the great chandelier.', 720, 650],
  ['box-five', 'palais-garnier', 'Box Five', 'A first-tier box kept empty at the demand of the unseen Opera Ghost.', 1010, 655],
  ['managers-office', 'palais-garnier', "Managers’ Office", 'The administrative room where memoranda, money, and impossible instructions disturb the new directors.', 240, 285],
  ['sorelli-room', 'palais-garnier', "Sorelli’s Dressing Room", 'The senior dancer’s crowded room, a refuge for frightened corps de ballet girls after reports of the ghost.', 1240, 700],
  ['christine-room', 'palais-garnier', "Christine’s Dressing Room", 'A small dressing room with a mirror that becomes the threshold between public performance and a hidden world.', 1180, 495],
  ['stage-gateway', 'palais-garnier', 'Stage Door', 'The guarded passage into the working stage house, workshops, and upper machinery.', 720, 980, 'stage-upper'],
  ['stage', 'stage-upper', 'Opera Stage', 'A vast working platform of scenery, curtains, machinery, and trap-doors.', 720, 480],
  ['stage-workshops', 'stage-upper', 'Stage Workshops', 'Carpenters, scene-shifters, and firemen work among timber, canvas, ropes, and painted flats.', 270, 685],
  ['fly-tower', 'stage-upper', 'Fly Tower', 'Galleries and rigging rise above the stage, carrying scenery and providing perilous hidden routes.', 720, 900],
  ['stage-trapdoor', 'stage-upper', 'Central Trap-Door', 'One of the stage openings by which scenery—and a practiced trap-door expert—can vanish below.', 720, 435],
  ['roof-gateway', 'stage-upper', 'Roof Stair', 'A narrow stair climbs from the upper stage works to the lead roofs.', 1180, 900, 'opera-roof'],
  ['cellar-gateway', 'stage-upper', 'Lower Trap Passage', 'A guarded stair and trap route descends beneath the stage into the Opera cellars.', 1030, 150, 'cellars'],
  ['apollo-roof', 'opera-roof', "Apollo’s Lyre", 'The monumental roof group where Christine and Raoul speak above Paris, believing height offers privacy.', 790, 900],
  ['roof-ridge', 'opera-roof', 'Lead Roof Ridge', 'Sloping metal roofs and stone parapets command a vertiginous view of the boulevards.', 790, 540],
  ['third-cellar', 'cellars', 'Third Cellar', 'A shadowed basement level associated with Joseph Buquet’s death and the ghost’s earliest terror.', 200, 950],
  ['fifth-cellar', 'cellars', 'Fifth Cellar', 'The deepest regularly used level, patrolled by firemen beside furnaces and old foundations.', 650, 635],
  ['lake-shore', 'cellars', 'Underground Lake Shore', 'Black water fills the oldest foundations, turning the lower Opera into a hidden waterfront.', 1210, 430],
  ['underground-lake', 'cellars', 'Underground Lake', 'A silent reservoir crossed by boat beneath the Opera’s stone mass.', 700, 285],
  ['house-gateway', 'cellars', 'Lake House Landing', 'A landing across the lake leads into Erik’s private house.', 1335, 180, 'lake-house'],
  ['lake-drawing-room', 'lake-house', 'Drawing Room', 'A severe but carefully furnished room where Erik asks to be received as an ordinary man.', 500, 640],
  ['lake-house', 'lake-house', 'Music Room', 'An organ and manuscripts dominate the room in which Erik composes his Don Juan Triumphant.', 960, 700],
  ['mirror-room', 'lake-house', 'Mirror Passage', 'A concealed mirrored route joins Christine’s dressing room to the lower passages.', 110, 690],
  ['little-well', 'lake-house', 'Little Well', 'A narrow well and burial place near the hidden house, later central to the narrator’s evidence.', 1210, 435],
  ['torture-entrance', 'lake-house', 'Concealed Chamber Door', 'A disguised opening leads from the house into Erik’s engineered chamber of ordeal.', 1450, 705, 'torture-chamber'],
  ['iron-tree', 'torture-chamber', 'Iron Tree', 'A metal tree stands at the center of a mirrored illusion of endless forest.', 705, 665],
  ['powder-cellar', 'torture-chamber', 'Powder Cellar', 'Barrels of gunpowder beneath the chamber make Erik’s final ultimatum a threat to the entire Opera.', 1160, 210],
]

const locs = locations.map(([key, map, name, description, x, y, child]) => ({
  ...stamp, id: ref('loc', key), mapLayerId: ref('map', map), linkedMapLayerId: child ? ref('map', child) : null,
  name, description, x, y, iconType: child ? 'building' : 'pin', tags: [], factionId: null,
  imageId: ref('image', `location-${key}`),
}))

const charDefs = [
  ['erik', 'Erik', ['The Opera Ghost', 'O.G.', 'The Angel of Music'], 'A brilliant architect, composer, ventriloquist, illusionist, and trap-door expert who hides beneath the Opera.', '#c9b06b'],
  ['christine', 'Christine Daaé', [], 'A gifted young Swedish soprano whose devotion to music, memory, and compassion draws her into the Opera mystery.', '#e8d7b5'],
  ['raoul', 'Raoul de Chagny', ['Vicomte de Chagny'], 'Christine’s childhood companion, a young naval officer whose love makes him challenge the Opera Ghost.', '#557ba6'],
  ['persian', 'The Persian', ['The Daroga'], 'A former Persian official who knows Erik’s methods and becomes Raoul’s guide beneath the Opera.', '#9b6647'],
  ['richard', 'Armand Moncharmin', [], 'One of the Opera’s skeptical new managers, methodical even while the impossible closes around him.', '#8b4d43'],
  ['moncharmin', 'Firmin Richard', [], 'The more hot-tempered of the new Opera managers, determined not to be ruled by superstition.', '#655057'],
  ['mme-giry', 'Mme. Giry', [], 'The Box Five attendant whose faith in the ghost is bound to hopes for her daughter Meg.', '#796147'],
  ['meg', 'Meg Giry', [], 'Mme. Giry’s daughter, a dancer in the Opera corps de ballet and friend to Christine.', '#b8879a'],
  ['sorelli', 'La Sorelli', [], 'The principal dancer around whom the ballet girls gather when the Opera’s old rumors turn frightening.', '#bc7b45'],
  ['jammes', 'Little Jammes', [], 'A lively young ballet dancer whose fear and curiosity sharpen the backstage ghost stories.', '#bb8893'],
  ['buquet', 'Joseph Buquet', [], 'The chief scene-shifter, familiar with the Opera’s upper and lower workings.', '#6f5b4b'],
  ['carlotta', 'La Carlotta', [], 'The established prima donna, proud of her place and unwilling to yield it to an unknown rival.', '#9b363f'],
  ['piangi', 'Ubaldo Piangi', [], 'The Opera’s principal tenor and Carlotta’s loyal stage partner.', '#76504a'],
  ['debienne', 'Debienne', [], 'One of the retiring Opera managers who passes the ghost’s peculiar terms to his successors.', '#536d70'],
  ['poligny', 'Poligny', [], 'Debienne’s partner in the departing management, careful not to provoke the unseen tenant of Box Five.', '#5a6473'],
  ['philippe', 'Philippe de Chagny', ['Comte de Chagny'], 'Raoul’s elder brother, a prominent patron concerned with family honor and his brother’s future.', '#4c6080'],
  ['valerius', 'Mamma Valérius', [], 'Christine’s elderly guardian and a keeper of the promises and legends inherited from Christine’s father.', '#8d735c'],
  ['mifroid', 'M. Mifroid', [], 'The police commissary who treats Christine’s disappearance as a practical criminal inquiry.', '#555b62'],
  ['narrator', 'The Narrator', [], 'An investigating writer who assembles testimony, documents, and architecture into the history behind the legend.', '#756b5c'],
]
const characters = charDefs.map(([key,name,aliases,description,color]) => ({ ...stamp, id: ref('char', key), name, aliases, description, portraitImageId: ref('image', `character-${key}`), color, tags: [], isAlive: true, birthDate: null }))

const itemDefs = [
  ['persian-papers', "The Persian’s Papers", 'Documents and testimony that preserve the hidden history of Erik and the Opera.', 'book'],
  ['gold-ring', 'Plain Gold Ring', 'A simple ring given to Christine as a sign of obedience, later transformed by mercy and remembrance.', 'ring'],
  ['punjab-lasso', 'Punjab Lasso', 'A silent noose used with terrifying skill in confined and dark places.', 'rope'],
  ['violin', "Christine’s Father’s Violin", 'The instrument associated with the music and promises of Christine’s childhood.', 'music'],
  ['ghost-memorandum', "O.G.’s Memorandum", 'A formal demand for Box Five and a monthly allowance from the Opera management.', 'letter'],
  ['chandelier', 'Great Chandelier', 'The enormous auditorium chandelier whose weight turns spectacle into catastrophe.', 'light'],
  ['engagement-ring', 'Raoul’s Engagement Ring', 'A token of the secret future Christine and Raoul try to protect.', 'ring'],
  ['red-death-costume', 'Red Death Costume', 'A scarlet masked-ball costume crowned by a broad hat and a death’s-head.', 'clothing'],
  ['black-mask', 'Erik’s Black Mask', 'A dark mask Erik uses to conceal the face that has shaped his isolation.', 'mask'],
  ['money-envelope', 'Twenty-Thousand-Franc Envelope', 'The Opera Ghost’s allowance, sealed and handled according to precise instructions.', 'money'],
  ['safety-pin', 'Safety-Pin', 'A tiny seal placed on a coat pocket to expose impossible theft.', 'tool'],
  ['ghost-letters', 'Letters Signed O.G.', 'Typed and handwritten instructions through which the Opera Ghost manages people at a distance.', 'letter'],
  ['pistols', "The Persian’s Pistols", 'A matched pair carried into the Opera cellars as protection against Erik’s lasso.', 'weapon'],
  ['gunpowder-barrels', 'Gunpowder Barrels', 'A vast hidden charge wired beneath the torture chamber.', 'container'],
  ['electric-wire', 'Electric Detonator Wire', 'An insulated wire linking the final choice mechanism to the powder cellar.', 'tool'],
  ['scorpion-grasshopper', 'Scorpion and Grasshopper', 'Two bronze figures on a revolving panel that encode Erik’s final demand.', 'mechanism'],
]
const items = itemDefs.map(([key,name,description,iconType])=>({ ...stamp,id:ref('item',key),name,description,iconType,imageId:ref('image',`item-${key}`),tags:[] }))

const eventDates = []
let day = 0
const chapters = []
const events = []
const scenes = []
const snapshots = []
const placements = []
const inventory = new Map()
let order = 0
sourceSections.forEach((section, si) => {
  const plan = sectionPlans[si]
  const chapterId = ref('chapter', String(si + 1).padStart(2, '0'))
  chapters.push({ ...stamp, id: chapterId, timelineId:T, number:si+1, title:section.title, synopsis:plan.synopsis, notes:section.sourceHeading, wordGoal:words(section.text) })
  const pieces = splitSection(section.text, plan.events.length)
  plan.events.forEach((e, ei) => {
    const eventId = ref('event', `${String(si+1).padStart(2,'0')}-${ei+1}`)
    const locationId = ref('loc', e.location)
    const location = locs.find(l=>l.id===locationId)
    // PlotWeave stores calendar pins as numeric day offsets (fractions encode
    // time of day), not ISO timestamps.  The prologue and epilogue are later
    // documentary frames; the novel's central action begins at day zero.
    const inWorldTime = si === 0
      ? 14 * 365 + 59 + ei / 24
      : si === 27
        ? 15 * 365 + 59 + ei / 24
        : day + (18 + (ei % 4)) / 24
    const itemIds=e.items.map(k=>ref('item',k)); const cast=e.cast.map(k=>ref('char',k))
    const search=`${e.title} ${e.description}`.toLowerCase()
    const threadIds=[
      /ghost|erik|persian|skeleton|evidence/.test(search)&&ref('thread','ghost-identity'),
      /voice|angel|music|violin|sing|faust|don juan/.test(search)&&ref('thread','christine-voice'),
      /box five|allowance|envelope|manager|safety-pin/.test(search)&&ref('thread','box-five'),
      /christine|raoul|kiss|ring|choice|love/.test(search)&&ref('thread','love-choice'),
      /cellar|lake|torture|rescue|trap-door/.test(search)&&ref('thread','rescue'),
      (si===0||si===27)&&ref('thread','investigation'),
    ].filter(Boolean)
    const motifIds=[
      /music|voice|violin|sing|opera|faust|don juan/.test(search)&&ref('motif','music'),
      /mask|face|ghost|red death/.test(search)&&ref('motif','masks'),
      /door|mirror|trap|roof|cellar|lake|opera/.test(search)&&ref('motif','architecture'),
      /light|dark|mirror|shadow/.test(search)&&ref('motif','light-dark'),
      /ring|promise|engage/.test(search)&&ref('motif','rings'),
    ].filter(Boolean)
    events.push({ ...stamp,id:eventId,chapterId,timelineId:T,title:e.title,description:e.description,locationMarkerId:locationId,involvedCharacterIds:cast,mentionedCharacterIds:[],involvedItemIds:itemIds,tags:[],threadIds,motifIds,sortOrder:order++,travelDays:ei===0&&si>1?1:0,inWorldTime,tension:e.tension,structureBeat:null,status:'complete',povCharacterId:null,isFlashback:si===0||si===27 })
    scenes.push({ ...stamp,id:ref('scene',`${si+1}-${ei+1}`),eventId,text:pieces[ei],wordCount:words(pieces[ei]) })
    e.cast.forEach((key, ci)=>snapshots.push({ ...stamp,id:ref('snapshot',`${si+1}-${ei+1}-${key}`),characterId:ref('char',key),eventId,isAlive:!/(lies dead|is found dead|body is found)/i.test(e.states[key]),currentLocationMarkerId:locationId,currentMapLayerId:location.mapLayerId,inventoryItemIds:inventory.get(key)||[],inventoryNotes:'',travelModeId:null,sortKey:ci,statusNotes:e.states[key] }))
    itemIds.forEach((itemId, ii)=>placements.push({ ...stamp,id:ref('placement',`${si+1}-${ei+1}-${ii+1}`),itemId,eventId,locationMarkerId:locationId,sortKey:ii,notes:`Present during “${e.title}”.` }))
    day += ei === plan.events.length - 1 ? 1 : 0
  })
})

const relationshipDefs = [
 ['erik-christine','erik','christine','Teacher, captor, and beloved',9,'mixed','Erik teaches Christine through the walls, then tries to compel the love he cannot command.'],
 ['christine-raoul','christine','raoul','Childhood friends and lovers',10,'positive','Shared childhood memory becomes a mutual promise tested by secrecy and danger.'],
 ['raoul-philippe','raoul','philippe','Brothers',7,'positive','Philippe protects family standing but ultimately follows Raoul into the Opera danger.'],
 ['persian-erik','persian','erik','Former keeper and adversary',7,'negative','The Persian once restrained Erik in Persia and understands both his genius and cruelty.'],
 ['persian-raoul','persian','raoul','Rescue allies',8,'positive','The Persian gives Raoul the knowledge needed to pursue Christine below.'],
 ['richard-moncharmin','richard','moncharmin','Management partners',8,'positive','The new directors confront the ghost’s demands together despite clashing temperaments.'],
 ['mme-giry-meg','mme-giry','meg','Mother and daughter',9,'positive','Mme. Giry’s cooperation with the ghost is shaped by hope for Meg’s future.'],
 ['mme-giry-erik','mme-giry','erik','Messenger and unseen patron',5,'mixed','Mme. Giry carries instructions for a figure she fears, trusts, and never fully sees.'],
 ['carlotta-christine','carlotta','christine','Professional rivals',5,'negative','Carlotta treats Christine’s sudden success as a threat to her primacy.'],
 ['carlotta-piangi','carlotta','piangi','Stage partners',7,'positive','The principal singers support one another amid the Opera’s disrupted performances.'],
 ['debienne-poligny','debienne','poligny','Retiring management partners',8,'positive','They pass the Opera and its impossible obligations to their successors.'],
 ['christine-valerius','christine','valerius','Ward and guardian',8,'positive','Mamma Valérius protects Christine and preserves her father’s spiritual vocabulary.'],
]
const relationships=relationshipDefs.map(([key,a,b,label,strength,sentiment,description])=>({...stamp,id:ref('relationship',key),characterAId:ref('char',a),characterBId:ref('char',b),label,strength,sentiment,description,isBidirectional:true,startEventId:events.find(e=>e.involvedCharacterIds.includes(ref('char',a))&&e.involvedCharacterIds.includes(ref('char',b)))?.id||events[0].id}))
const eventByTitle = title => events.find(e=>e.title===title)?.id || events[0].id
const relationshipSnapshots=[
  ['erik-christine','The Voice Claims Christine','Unseen teacher and pupil',6,'mixed','Christine still understands the voice through her father’s promise.'],
  ['erik-christine','Christine Tears Away the Mask','Captor and horrified captive',3,'negative','The unmasking destroys the illusion that allowed Christine to trust him.'],
  ['erik-christine','A Kiss on Erik’s Forehead','Freely compassionate farewell',9,'positive','Christine gives tenderness without agreeing to become his possession.'],
  ['christine-raoul','Raoul Recognizes Christine','Childhood friends reunited',6,'positive','Recognition revives the trust of their shared childhood.'],
  ['christine-raoul','A Secret Engagement','Secretly engaged lovers',9,'positive','They promise a future while knowing an unseen threat surrounds them.'],
  ['persian-raoul','The Persian Offers Help','Rescue allies',8,'positive','Shared urgency overcomes Raoul’s suspicion of the stranger.'],
  ['richard-moncharmin','The Managers Set a Trap','Co-investigators',8,'positive','The directors coordinate every detail of their test of the allowance.'],
  ['mme-giry-erik','Mme. Giry Is Questioned','Compromised messenger',4,'mixed','Her loyalty persists while the managers expose how her hopes were used.'],
].map(([rel,title,label,strength,sentiment,description],sortKey)=>({...stamp,id:ref('relationship-snapshot',String(sortKey+1)),relationshipId:ref('relationship',rel),eventId:eventByTitle(title),sortKey:sortKey*100,label,strength,sentiment,description,isActive:true}))

const mapRoutes=[
  ['breton-journey','france-paris',"Christine’s Breton Journey",'rail',['gare-nord','perros-church','perros-churchyard'],'#6d5965','Raoul follows Christine from Paris to Perros-Guirec.'],
  ['roof-route','opera-roof','Across the Opera Roof','foot',['roof-ridge','apollo-roof'],'#8b6c50','The exposed route to the conversation beneath Apollo’s Lyre.'],
  ['cellar-descent','cellars','Descent to the Lake','foot',['third-cellar','fifth-cellar','lake-shore','house-gateway'],'#555f66','The route through progressively less familiar foundations toward Erik’s house.'],
  ['lake-crossing','cellars','Across the Underground Lake','boat',['lake-shore','underground-lake','house-gateway'],'#405f6e','The black-water crossing to the hidden landing.'],
  ['final-choice','lake-house','From House to Chamber','foot',['lake-drawing-room','torture-entrance'],'#7f3f3f','The concealed route between Erik’s domestic rooms and his final mechanism.'],
].map(([key,map,name,routeType,waypoints,color,notes])=>({...stamp,id:ref('route',key),mapLayerId:ref('map',map),name,routeType,waypoints:waypoints.map(k=>ref('loc',k)),color,notes}))

const threadDefs=[['ghost-identity','Who Is the Opera Ghost?','#8e6d45','Witnesses and investigators move from superstition toward Erik’s identity.'],['christine-voice','The Angel of Music','#d2b66e','Christine’s mysterious teacher changes from sacred promise to dangerous human presence.'],['box-five','Box Five and the Allowance','#914441','The management tests the ghost’s demands and the mechanisms enforcing them.'],['love-choice','Christine’s Choice','#b66b81','Christine’s bonds with Raoul and Erik make love, pity, and freedom the central conflict.'],['rescue','Descent Beneath the Opera','#526f78','Raoul and the Persian follow Christine through the hidden architecture.'],['investigation','The Narrator’s Case','#756b5c','Documents, bodies, and buildings establish the truth behind the legend.']]
const plotThreads=threadDefs.map(([key,name,color,description])=>({...stamp,id:ref('thread',key),name,color,description,status:'complete',tags:[]}))
const motifDefs=[['music','Music and the Unseen Voice','#d0ad62','Music carries memory, seduction, instruction, and emotional truth.'],['masks','Masks and Faces','#3d3d43','Masks protect, deceive, and expose the painful gap between appearance and humanity.'],['architecture','Hidden Architecture','#66727b','Doors, mirrors, traps, roofs, and cellars turn the Opera into an instrument of power.'],['light-dark','Light, Mirrors, and Darkness','#9c825c','Stage light and mirrored illusion compete with the concealment beneath the Opera.'],['rings','Rings and Promises','#b78d63','Rings mark competing promises of love, obedience, and mercy.']]
const motifs=motifDefs.map(([key,name,color,description])=>({...stamp,id:ref('motif',key),name,color,description,tags:[]}))

const cats=[['source','Source and Editorial Notes','#756b5c'],['opera','The Opera House','#8c3f3f'],['legend','The Opera Ghost','#5c5966'],['music','Music and Performance','#b79653']].map(([key,name,color],sortOrder)=>({id:ref('lore-category',key),worldId:W,name,color,sortOrder}))
const loreData=[
 ['edition','source','Edition and Public-Domain Text',`The scene drafts reproduce the complete narrative text of ${sourceEdition}. Source: ${sourceUrl}. The text is public domain in the United States. Structural descriptions, event titles, statuses, and metadata are original editorial writing.`],
 ['chronology','source','Editorial Chronology','The novel gives relative intervals more often than exact dates. Calendar dates in this world are an editorial reading aid: the central action is arranged across an 1881 Opera season, while the Prologue and Epilogue are marked as later investigative framing passages.'],
 ['headings','source','Chapter Headings','The Prologue, twenty-six chapter headings, and Epilogue are preserved from the source edition. Scene boundaries divide public-domain prose at paragraph boundaries without changing its order.'],
 ['palais','opera','The Palais Garnier','The Paris Opera is both a public palace of performance and an enormous working building of stages, workshops, offices, roofs, cellars, passages, and water-filled foundations.'],
 ['lake','opera','The Underground Lake','Water beneath the Opera foundations becomes a navigable hidden boundary between the known building and Erik’s private domain.'],
 ['ghost','legend','The Opera Ghost','O.G. is the name attached to demands, voices, apparitions, and punishments that Opera employees interpret as supernatural. The reading view reveals explanations only as the narrative reaches them.'],
 ['angel','music','The Angel of Music','Christine’s father taught her that an Angel of Music would come after his death. The promise gives her a sacred language for an extraordinary unseen teacher.'],
 ['don-juan','music','Don Juan Triumphant','Erik’s unfinished composition condenses his genius, rage, suffering, and desire to be heard without concealment.'],
]
const lorePages=loreData.map(([key,cat,title,body],i)=>({...stamp,id:ref('lore',key),categoryId:ref('lore-category',cat),title,body,tags:[],coverImageId:null,linkedEntityIds:[],visibleFromEventId:i<4?events[0].id:events[Math.min(events.length-1,i*9)].id}))

const factionDefs=[['management','Opera Management','The directors, administrators, and office staff responsible for keeping the theater running.','#854c45'],['performers','Opera Company','Singers, dancers, musicians, and stage artists whose careers unfold before the public.','#b17a55'],['stagehands','Stage and Cellar Staff','Scene-shifters, firemen, and technicians who know the working building behind the spectacle.','#59666c'],['chagny','House of Chagny','An aristocratic family represented at the Opera by Philippe and Raoul.','#526785']]
const factions=factionDefs.map(([key,name,description,color])=>({...stamp,id:ref('faction',key),name,description,color,coverImageId:null,tags:[]}))
const memberships=[['management','richard','Co-director'],['management','moncharmin','Co-director'],['management','debienne','Retiring director'],['management','poligny','Retiring director'],['performers','christine','Soprano'],['performers','carlotta','Prima donna'],['performers','piangi','Principal tenor'],['performers','meg','Ballet dancer'],['performers','sorelli','Principal dancer'],['performers','jammes','Ballet dancer'],['stagehands','buquet','Chief scene-shifter'],['chagny','raoul','Vicomte'],['chagny','philippe','Comte']].map(([f,c,role],i)=>({...stamp,id:ref('membership',String(i+1)),factionId:ref('faction',f),characterId:ref('char',c),role,startEventId:events.find(e=>e.involvedCharacterIds.includes(ref('char',c)))?.id||events[0].id,endEventId:null,notes:''}))

const factsData=[
 ['ghost-real','The Ghost Has a Body','The Opera Ghost is a living person using the building’s hidden systems.','erik'],
 ['mirror-door','The Dressing-Room Mirror Opens','Christine’s mirror conceals a passage into the lower Opera.','christine'],
 ['erik-name','The Ghost Is Erik','The hidden architect and musician is named Erik.','persian'],
 ['lake-house','A House Stands Beyond the Lake','Erik has built a furnished home beyond the underground water.','christine'],
 ['torture','The Mirrored Room Is a Torture Chamber','Heat, mirrors, and the iron tree create a lethal illusion.','persian'],
 ['powder','The Opera Is Wired to Gunpowder','The final mechanism can ignite barrels beneath the chamber.','christine'],
]
const findEventForChar=k=>events.find(e=>e.involvedCharacterIds.includes(ref('char',k)))?.id||events[0].id
const knowledgeFacts=factsData.map(([key,title,description,who])=>({...stamp,id:ref('fact',key),title,description,tags:[],readerLearnsAtEventId:findEventForChar(who),originEventId:findEventForChar(who)}))
const knowledgeReveals=factsData.map(([key,,,who],i)=>({...stamp,id:ref('reveal',String(i+1)),factId:ref('fact',key),characterId:ref('char',who),eventId:knowledgeFacts[i].readerLearnsAtEventId,note:'Learns this directly during the modeled event.'}))
const goalData=[['christine','Protect Raoul without surrendering her conscience'],['raoul','Find Christine and free her from the hidden threat'],['erik','Win Christine’s freely given love'],['persian','Stop Erik’s violence and bring Raoul back alive'],['richard','Run the Opera without yielding to O.G.'],['moncharmin','Expose the method behind the missing allowance'],['narrator','Establish the historical truth of the Opera Ghost']]
const characterGoals=goalData.map(([c,text],i)=>({...stamp,id:ref('goal',String(i+1)),characterId:ref('char',c),startEventId:findEventForChar(c),endEventId:null,type:'primary',text}))

const blobs=[]
for(const [key] of mapDefs) blobs.push({id:ref('image',`map-${key}`),worldId:W,mimeType:'image/png',url:asset('maps',key),createdAt:now})
for(const [key] of locations) blobs.push({id:ref('image',`location-${key}`),worldId:W,mimeType:'image/png',url:asset('art/locations',key),createdAt:now})
for(const [key] of charDefs) blobs.push({id:ref('image',`character-${key}`),worldId:W,mimeType:'image/png',url:asset('art/characters',key),createdAt:now})
for(const [key] of itemDefs) blobs.push({id:ref('image',`item-${key}`),worldId:W,mimeType:'image/png',url:asset('art/items',key),createdAt:now})
blobs.push({id:ref('image','cover'),worldId:W,mimeType:'image/png',url:asset('art','world-cover'),createdAt:now})

const world={
 version:18,type:'world',exportedAt:now,
 world:{...stamp,id:W,name:'The Phantom of the Opera',description:'Beneath the splendor of the Paris Opera, a hidden musical genius binds a young soprano, her childhood love, and the theater’s skeptical managers into a mystery of beauty, terror, obsession, and compassion.',coverImageId:ref('image','cover'),theme:'theme-gothic',readingMode:true,continuityStaleThreshold:5,calendar:{startYear:1881,yearSuffix:' (editorial)',months:[['January',31],['February',28],['March',31],['April',30],['May',31],['June',30],['July',31],['August',31],['September',30],['October',31],['November',30],['December',31]].map(([name,days])=>({name,days}))},wordTarget:words(narrativeText)},
 mapLayers:maps,locationMarkers:locs,characters,items,characterSnapshots:snapshots,characterMovements:empty(),itemPlacements:placements,locationSnapshots:empty(),itemSnapshots:empty(),relationships,relationshipSnapshots,
 timelines:[{id:T,worldId:W,name:'The Opera Mystery',description:'The novel’s reading-order chronology, including its later investigative frame.',color:'#9b7055',dayOffset:0,createdAt:now}],chapters,events,blobs,travelModes:empty(),timelineRelationships:empty(),crossTimelineArtifacts:empty(),mapRoutes,mapRegions:empty(),mapRegionSnapshots:empty(),mapAnnotations:empty(),loreCategories:cats,lorePages,factions,factionMemberships:memberships,factionRelationships:empty(),knowledgeFacts,knowledgeReveals,characterGoals,sceneTexts:scenes,plotThreads,motifs,continuitySuppressions:empty(),writingLogs:empty(),sceneRevisions:empty(),
}

fs.mkdirSync(path.dirname(out),{recursive:true})
fs.writeFileSync(out,JSON.stringify(world,null,2)+'\n')
const reconstructed=scenes.map(s=>s.text).join('\n\n')
const normalize = text => text.replace(/\s+/g, ' ').trim()
if(normalize(reconstructed)!==normalize(narrativeText)) throw new Error(`Scene text is not lossless after boundary whitespace normalization: ${reconstructed.length} vs ${narrativeText.length}`)
console.log(JSON.stringify({out,chapters:chapters.length,events:events.length,scenes:scenes.length,sceneWords:scenes.reduce((n,s)=>n+s.wordCount,0),characters:characters.length,locations:locs.length,maps:maps.length,items:items.length,blobs:blobs.length},null,2))
