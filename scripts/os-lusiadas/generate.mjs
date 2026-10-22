import {webpWidth,webpHeight} from '../lib/webp.mjs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { calendar, sceneClocks, timelineDefs } from './chronology.mjs'
import { cuts } from './scene-cuts.mjs'
import { mapDefs, places } from './map-model.mjs'
import { actorNames, sceneState } from './scene-state.mjs'
import { snapshotNotes } from './snapshot-ledger.mjs'
import { cantos as englishCantos, wordCount as englishWordCount } from '../os-lusiadas-en/source-text.mjs'

const here=path.dirname(fileURLToPath(import.meta.url))
const repo=path.resolve(here,'../..')
const data=JSON.parse(fs.readFileSync(path.join(here,'manuscript-draft.pwk'),'utf8'))
const worldId=data.world.id
const stamp={worldId,createdAt:data.exportedAt,updatedAt:data.exportedAt}
const eventId=(canto,start)=>`os-lusiadas-event-${String(canto).padStart(2,'0')}-${String(start).padStart(3,'0')}`
const charId=code=>`os-lusiadas-char-${code.toLowerCase()}`
const locId=key=>`os-lusiadas-loc-${key}`
const mapId=key=>`os-lusiadas-map-${key}`
const imageId=kind=>`os-lusiadas-image-${kind}`
const pngDimensions=file=>{
  const bytes=fs.readFileSync(file)

  return [webpWidth(bytes),webpHeight(bytes)]
}
const addPng=(id,relative)=>{
  const absolute=path.join(repo,relative)
  if(!fs.existsSync(absolute)) return null
  data.blobs.push({...stamp,id:imageId(id),mimeType:'image/webp',url:relative.replaceAll('\\','/')})
  return imageId(id)
}

data.world={...data.world,description:'A sea voyage to India unfolds amid remembered Portuguese history, classical gods, and a poet’s address to his king.',coverImageId:addPng('world','library/os-lusiadas/art/world.webp'),calendar}
data.timelines=[
  {...stamp,id:'os-lusiadas-poem-order',name:'The poem in ten cantos',description:'The printed order in which the voyage, memories, myth, and poet’s voice are read.',color:'#31586b',dayOffset:0},
  ...timelineDefs.map(([key,name,description],index)=>({...stamp,id:`os-lusiadas-${key}`,name,description,color:['#4b7180','#886e58','#7a647c','#5b7598','#8b7558'][index],dayOffset:0})),
]
data.mapLayers=mapDefs.map(([key,parent,name,description])=>{
  const relative=`library/os-lusiadas/maps/${key}.webp`
  const [imageWidth,imageHeight]=pngDimensions(path.join(repo,relative))
  return {...stamp,id:mapId(key),parentMapId:parent?mapId(parent):null,name,description,
    imageId:addPng(`map-${key}`,relative),imageWidth,imageHeight,scalePixelsPerUnit:null,scaleUnit:null,
    levelGroupId:null,levelIndex:0,levelLabel:''}
})
data.locationMarkers=places.map(place=>({...stamp,id:locId(place.key),mapLayerId:mapId(place.map),
  linkedMapLayerId:place.child?mapId(place.child):null,name:place.name,description:place.description,
  x:place.x,y:place.y,imageId:addPng(`place-${place.key}`,`library/os-lusiadas/art/places/${place.key}.webp`),
  iconType:place.child?'city':'landmark',tags:[],factionId:null}))

const usedCodes=new Set(sceneState.flat().flatMap(row=>row[2]?row[2].split(' '):[]))
const characterDescriptions={
  G:'The Portuguese captain who leads the fleet across the seas toward India.',
  J:'The Olympian presiding over a council about the voyagers.',
  B:'A god who fears the sailors will eclipse his fame in the East.',
  V:'A goddess who favors the Portuguese fleet in the poem’s divine action.',
  M:'The god of war who speaks for the voyage at the Olympian council.',
  Q:'The island ruler who receives the fleet off the East African coast.',
  P:'A pilot offered to the fleet after its first African landfall.',
  T:'A sea messenger who bears Venus toward the Portuguese vessels.',
  E:'A divine messenger sent from Olympus to prepare the sailors’ welcome.',
  K:'The coastal ruler who welcomes the sailors at Melinde.',
  LE:'The Leonese ruler whose campaigns enter Gama’s account of Iberia.',
  HE:'A count whose marriage and territorial grant begin the Portuguese dynastic account.',
  TE:'The daughter given in marriage to Count Henrique in that account.',
  AH:'The first Portuguese king as remembered in Gama’s account.',
  EG:'A loyal household servant drawn into the disputed allegiance of the early kingdom.',
  EW:'The wife who accompanies Egas Moniz and their children before the Castilian court.',
  CK:'A Castilian ruler who hears Egas Moniz’s fulfillment of a difficult pledge.',
  IS:'A commander among the opposing kings at Ourique in Gama’s historical account.',
  CH:'The crucified figure appearing in Afonso’s vision before battle.',
  GI:'A daring Portuguese fighter associated with the taking of Évora.',
  BR:'The ruler resisting Afonso’s advance at fortified Badajoz.',
  SA:'Afonso’s son, shown leading armed men before inheriting the crown.',
  A2:'A Portuguese king recalled for a southern campaign after Sancho.',
  S2:'A successor whose reliance on courtiers becomes part of Gama’s account.',
  A3:'Sancho’s brother, drawn into a dispute over rule before taking the crown.',
  DI:'A king remembered for law, peace, and the advancement of learning.',
  A4:'Dinis’s successor, whose relations with Castile enter the historical account.',
  MA:'A Portuguese princess who asks her father to aid the Castilian kingdom.',
  CL:'The Castilian king fighting beside Afonso on the field at Salado.',
  IN:'A woman at the Portuguese court whose fate enters Gama’s history.',
  PE:'The heir whose connection to Inês enters the royal history.',
  FE:'Pedro’s successor, whose reign brings an invasion and succession dispute.',
  JI:'The king at the center of the succession struggle described in the poem.',
  NU:'The Portuguese commander who counsels and leads in the succession war.',
  DU:'The heir whose reign follows John’s in Gama’s account.',
  FP:'A Portuguese prince held after a failed North African undertaking.',
  AV:'A king whose campaigns extend the dynastic account across North Africa.',
  FA:'The Aragonese ruler who opposes Afonso’s Castilian intervention.',
  J2:'A young royal heir taking part in his father’s Castilian campaign.',
  MN:'The king who commands the search for a sea route to India.',
  RF:'An elder figure rising from the river in a vision of the kingdom.',
  RS:'A second elder who appears with the first in the river vision.',
  PG:'Gama’s brother and a captain aboard the fleet.',
  NC:'A Portuguese captain whose ship accompanies Gama.',
  OM:'An elder on the departure shore who addresses the sailors from the crowd.',
  VE:'A sailor whose report and shipboard tale interrupt the passage.',
  AD:'A vast figure who appears at the southern headland.',
  DO:'A sea nymph who carries an answer to the giant at the headland.',
  TH:'A sea goddess who enters the remembered story at the southern headland.',
  FM:'A sailor able to understand the Arabic speech encountered on the coast.',
  NP:'The sea god who gathers an undersea council.',
  PRO:'A sea god whose foreknowledge is sought by the divine company.',
  AMP:'The figure beside Neptune at the undersea council, first seen without a name.',
  AEO:'The keeper of the winds called into the conflict over the fleet.',
  LI:'A sailor who speaks to his companions during the crossing.',
  DL:'An English nobleman appealed to by women in Veloso’s shipboard tale.',
  MG:'A Portuguese champion who chooses a separate road to England.',
  ML:'The woman awaiting her assigned champion at the English court.',
  EK:'The ruler before whom the challenge of Veloso’s tale is fought.',
  SM:'The ship’s master who directs the crew as the sea rises.',
  BO:'A violent wind personified in the storm facing the fleet.',
  OR:'The figure who addresses Boreas and asks him to relent.',
  NO:'Another personified wind driven toward the Portuguese ships.',
  GA:'A sea figure who appeals to Notus during the storm.',
  MP:'A pilot taken aboard for the crossing from East Africa to India.',
  PM:'The first envoy sent from the ships to announce their arrival at Calicut.',
  MO:'A resident of Calicut from Berberia who speaks with the Portuguese visitors.',
  CAT:'An officer of the Calicut court assigned to the foreign visitors.',
  SAM:'The ruler who receives the Portuguese embassy in Calicut.',
  DIV:'A court diviner asked to examine signs about the arriving strangers.',
  CLER:'A religious figure in Calicut who dreams of a warning about the visitors.',
  AL:'One of two Portuguese factors left ashore with the fleet’s goods.',
  DG:'The second factor responsible for Portuguese goods at Calicut.',
  CU:'Venus’s son, first shown preparing his arrows on Ida.',
  FAME:'An allegorical figure summoned to carry the sailors’ renown.',
  EP:'A nymph who joins the island encounter with a sailor.',
  IQ:'A leading nymph who receives the Portuguese captain apart from the company.',
  SN:'The nymph whose song at the island feast tells of future deeds.',
}
data.characters=[...usedCodes].map((code,index)=>{
  const name=actorNames[code]
  const slug=name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
  const record={...stamp,id:charId(code),name,aliases:[],description:characterDescriptions[code]??`A figure directly present in the ${code==='CH'?'vision':'remembered action'} of the poem.`,
    portraitImageId:addPng(`character-${code.toLowerCase()}`,`library/os-lusiadas/art/characters/${slug}.webp`),
    color:['#526c78','#756c5a','#6e6680','#7a685a'][index%4],tags:[],isAlive:!['AH','DI','IN','FE','JI'].includes(code),birthDate:null}
  const nameReveals={AD:[5,51,'Adamastor'],AMP:[6,22,'Amphitrite'],MO:[7,26,'Monçaide'],SAM:[7,22,'Samorim']}
  if(nameReveals[code]) {const [canto,start,name]=nameReveals[code];record.nameChanges=[{eventId:eventId(canto,start),name}]}
  if(code==='IQ') record.revealedAs={characterId:charId('TH'),eventId:eventId(9,89)}
  return record
})

let global=0
const startByDraftId=new Map()
for(let canto=1;canto<=10;canto++) {
  const scenes=data.events.filter(event=>event.chapterId===`os-lusiadas-canto-${canto}`)
  const state=sceneState[canto-1]
  const clocks=sceneClocks[canto-1]
  if(scenes.length!==state.length||scenes.length!==clocks.length) throw Error(`Canto ${canto} ledger mismatch`)
  scenes.forEach((event,index)=>{
    const [start,place,cast,tension,handoff]=state[index]
    const clock=clocks[index]
    const oldId=event.id
    event.id=eventId(canto,start)
    event.timelineId=`os-lusiadas-${clock.timeline}`
    event.locationMarkerId=place?locId(place):null
    event.involvedCharacterIds=cast?cast.split(' ').map(charId):[]
    event.mentionedCharacterIds=[]
    event.sortOrder=global++
    event.travelDays=clock.travelDays
    event.inWorldTime=clock.inWorldTime
    event.tension=tension
    event.isFlashback=clock.isFlashback
    event.status='final'
    event.notes=`Stanza ${start}; ${handoff}`
    event.povCharacterId=null
    startByDraftId.set(oldId,event.id)
  })
}
for(const scene of data.sceneTexts) scene.eventId=startByDraftId.get(scene.eventId)
// Places used only in a geographic description still need a first-appearance
// moment; without one the reader gate treats an unreferenced marker as visible
// from the beginning. The overrides point to the first reviewed passage.
const describedPlaceStarts={
  'st-helena':[5,24],'sofala':[1,54],'kilwa':[1,54],
  'cannanore':[6,92],'cochin':[7,30],
  'fishing-harbor':[7,16],'warehouse':[8,94],'channel':[6,56],
}
data.locationSnapshots=places.map(place=>{
  let first=null
  for(let canto=1;canto<=10;canto++) for(const [start,key] of sceneState[canto-1]) {
    if(key===place.key&&!first) {first=[canto,start];break}
  }
  if(describedPlaceStarts[place.key]) first=describedPlaceStarts[place.key]
  if(!first) throw Error(`Unintroduced place ${place.key}`)
  return {...stamp,id:`os-lusiadas-place-reveal-${place.key}`,locationMarkerId:locId(place.key),eventId:eventId(...first),
    sortKey:first[0]+first[1]/100000,status:'Known by this point in the poem',notes:'The place first enters the poem at this reading position.'}
})
data.characterSnapshots=[]
for(let canto=1;canto<=10;canto++) for(const [start,place,cast] of sceneState[canto-1]) {
  if(!cast) continue
  const codes=cast.split(' ')
  codes.forEach((code,index)=>{
    const placeDef=places.find(p=>p.key===place)
    const note=snapshotNotes[`${canto}:${start}`]?.[code]
    if(!note) throw Error(`Missing snapshot ${canto}:${start}/${code}`)
    data.characterSnapshots.push({...stamp,id:`os-lusiadas-snapshot-${canto}-${start}-${code.toLowerCase()}`,
      characterId:charId(code),eventId:eventId(canto,start),isAlive:(canto===3&&start===83&&code==='AH'||canto===3&&start===132&&code==='IN')?false:true,
      currentLocationMarkerId:place?locId(place):null,currentMapLayerId:placeDef?mapId(placeDef.map):null,
      locationMarkerId:place?locId(place):null,inventoryItemIds:[],inventoryNotes:'',travelModeId:null,
      sortKey:canto+start/100000,statusNotes:note})
  })
}

const threadDefs=[
  ['voyage','The sea road to India','The fleet crosses open sea, seeks pilots and harbors, and negotiates its passage.','#466d78'],
  ['royal-history','The remembered kingdom','Gama’s account of Portuguese rulers, war, loyalty, and succession.','#896b55'],
  ['divine','The gods and the fleet','Divine speakers debate and intervene in the sailors’ course.','#69748e'],
  ['calicut','The Calicut embassy','Portuguese visitors seek an audience and trade in the Malabar port.','#997553'],
  ['island','The island welcome','The gods prepare a place of rest for the homeward sailors.','#6f806d'],
]
data.plotThreads=threadDefs.map(([key,name,description,color])=>({...stamp,id:`os-lusiadas-thread-${key}`,name,description,color}))
const motifDefs=[
  ['sea','Sea as road and trial','The water both carries the fleet and tests its survival.','#466d78'],
  ['fame','Fame and remembrance','The poem weighs hard deeds against the names and rewards granted to them.','#9a7847'],
  ['speech','Counsel and persuasion','Councils, embassies, warnings, and appeals repeatedly change a course of action.','#75687f'],
  ['vision','Dreams and visions','Portents and revealed images carry knowledge between the poem’s planes.','#6b7b89'],
  ['threshold','Coasts and crossings','A shore, headland, or harbor often marks a new test for the travelers.','#668375'],
]
data.motifs=motifDefs.map(([key,name,description,color])=>({...stamp,id:`os-lusiadas-motif-${key}`,name,description,color}))
for(const event of data.events) {
  const canto=Number(event.chapterId.split('-').at(-1))
  const frame=cuts[canto-1][sceneState[canto-1].findIndex(row=>event.id===eventId(canto,row[0]))][3]
  const threads=[]
  if(/voyage|recounted-voyage/.test(frame)) threads.push('voyage')
  if(/history/.test(frame)) threads.push('royal-history')
  if(/mythic/.test(frame)) threads.push('divine')
  if(canto>=7&&canto<=9&&event.locationMarkerId?.includes('calicut')) threads.push('calicut')
  if(canto>=9&&event.sortOrder>=data.events.find(e=>e.id===eventId(9,21)).sortOrder&&canto<=10&&event.sortOrder<=data.events.find(e=>e.id===eventId(10,143)).sortOrder) threads.push('island')
  event.threadIds=[...new Set(threads)].map(key=>`os-lusiadas-thread-${key}`)
  const motifs=[]
  if(/sea|ocean|roadstead|landing/.test(event.locationMarkerId??'')) motifs.push('sea')
  if(canto===1&&event.sortOrder<=2||canto>=9) motifs.push('fame')
  if(/council|court|audience/.test(event.locationMarkerId??'')) motifs.push('speech')
  if(/vision|dream|globe/i.test(event.title)) motifs.push('vision')
  if(/coast|cape|landing|beach/.test(event.locationMarkerId??'')) motifs.push('threshold')
  event.motifIds=[...new Set(motifs)].map(key=>`os-lusiadas-motif-${key}`)
}

const factDefs=[
  ['afonso-death','Afonso dies after a long reign','The account describes illness and age overtaking the first king.',3,83],
  ['dinis-death','Dinis dies; Afonso IV succeeds','The transition is reported after the account of Dinis’s building and reforms.',3,98],
  ['ines-death','Inês is killed','The narrated execution follows her appeal to Afonso IV.',3,132],
  ['fernando-death','Fernando has died','The opening of the succession account reports Fernando’s death.',4,1],
  ['john-death','John dies after the African campaign','The account reports the king’s death before turning to his heir.',4,50],
  ['mozambique','The island port is Mozambique','Visitors give the island its name as the sailors ask about the coast.',1,54],
  ['bacchus','Bacchus works against the fleet','The god seeks to obstruct the voyage from the African shore.',1,77],
  ['john','John is acclaimed king','The disputed succession reaches an acclamation in Gama’s account.',4,2],
  ['giant','The headland giant gives his name','The apparition identifies himself in the southern headland encounter.',5,51],
  ['amphitrite','Neptune’s consort is named','The poem identifies the figure attending the sea council.',6,22],
  ['moncaide','The Calicut resident is Monçaide','The poem gives the Berberian resident his name.',7,26],
  ['samorim','The ruler bears the title Samorim','The coastal survey names the title held by Calicut’s ruler before the audience.',7,22],
  ['catual','The Catual is involved in the obstruction','The official’s place in the effort against the fleet is disclosed.',8,81],
  ['red-sea','Opponents await Red Sea vessels','Monçaide learns why the factors are being detained.',9,6],
  ['efire','The nymph is Efire','The poem names the nymph pursued by Leonardo.',9,76],
  ['queen','The island queen is Thetis','The poet names Thetis while interpreting the island encounter.',9,89],
  ['globe','The globe shows the world machine','Thetis explains the ordered cosmos displayed to Gama.',10,80],
]
const offstageDeaths={'dinis-death':'DI','fernando-death':'FE','john-death':'JI'}
data.knowledgeFacts=factDefs.map(([key,title,description,canto,start])=>({...stamp,id:`os-lusiadas-fact-${key}`,title,description,
  tags:offstageDeaths[key]?[`offstage-death:${charId(offstageDeaths[key])}`]:[],
  readerLearnsAtEventId:eventId(canto,start),originEventId:eventId(canto,start)}))
for(const [canto,start,codes] of [[3,98,['DI','A4']],[4,1,['FE']],[4,50,['JI']]]) {
  data.events.find(event=>event.id===eventId(canto,start)).mentionedCharacterIds.push(...codes.map(charId))
}
data.knowledgeReveals=[
  ['red-sea','MO',9,6,'Monçaide learns the opponents’ timetable.'],
  ['red-sea','G',9,7,'Monçaide conveys the expected attack to Gama.'],
  ['catual','G',8,81,'Gama understands why the officer has obstructed his return.'],
  ['globe','G',10,80,'Thetis explains the globe’s ordered circles to Gama.'],
].map(([fact,code,canto,start,note],index)=>({...stamp,id:`os-lusiadas-knowledge-reveal-${index+1}`,
  factId:`os-lusiadas-fact-${fact}`,characterId:charId(code),eventId:eventId(canto,start),note}))

const factionDefs=[
  ['fleet','Portuguese fleet','The captains and sailors who make the crossing to India.','#496f7c',['G','PG','NC','VE','FM','LI','SM','AL','DG']],
  ['olympus','Olympian council','The gods who debate the sailors’ passage.','#786a91',['J','B','V','M','E']],
  ['melinde','Court of Melinde','The ruler and attendants who receive the travelers on the East African coast.','#8c7856',['K']],
  ['calicut','Court of Calicut','The ruler and officers receiving the Portuguese visitors in Malabar.','#8e654f',['SAM','CAT','DIV']],
  ['island','Island nymphs','The sea and island figures gathered for the homeward sailors.','#6c8278',['TH','EP','IQ','SN']],
]
data.factions=factionDefs.map(([key,name,description,color])=>({...stamp,id:`os-lusiadas-faction-${key}`,name,description,color,
  coverImageId:addPng(`faction-${key}`,`library/os-lusiadas/art/factions/${key}.webp`),tags:[]}))
const firstEventForCode=code=>{
  for(let canto=1;canto<=10;canto++) for(const [start,,cast] of sceneState[canto-1]) if(cast?.split(' ').includes(code)) return eventId(canto,start)
  throw Error(`Unused actor ${code}`)
}
data.factionMemberships=factionDefs.flatMap(([key,,,,codes])=>codes.map(code=>({...stamp,
  id:`os-lusiadas-membership-${key}-${code.toLowerCase()}`,factionId:`os-lusiadas-faction-${key}`,characterId:charId(code),
  role:key==='fleet'?'Voyager':'Member',startEventId:key==='island'&&code==='TH'?eventId(9,65):firstEventForCode(code),endEventId:null,notes:''})))

const relationDefs=[
  ['G','PG','brothers','Family aboard the fleet',4,81,'positive'],
  ['V','CU','mother and son','Venus asks her son to help prepare an island welcome.',9,36,'positive'],
  ['G','K','captain and host','The ruler receives the visiting captain at Melinde.',2,85,'positive'],
  ['G','MO','captain and resident','Monçaide speaks with Gama aboard the anchored fleet.',7,29,'positive'],
  ['G','SAM','envoy and ruler','The captain presents his king’s purpose at the Calicut audience.',7,59,'neutral'],
  ['G','CAT','captain and court officer','The officer escorts the visiting captain inland.',7,44,'neutral'],
  ['LI','EP','sailor and nymph','Leonardo and Efire meet directly on the island.',9,82,'positive'],
  ['G','IQ','captain and island guide','The leading nymph receives Gama apart from the crew.',9,85,'positive'],
  ['IN','PE','beloved','The remembered courtly bond between Inês and Pedro.',3,120,'positive'],
  ['AH','EG','prince and pledged servant','Egas pledges his honor during Afonso’s dispute.',3,35,'positive'],
]
data.relationships=relationDefs.map(([a,b,label,description,canto,start,sentiment],index)=>({...stamp,
  id:`os-lusiadas-relationship-${index+1}`,characterAId:charId(a),characterBId:charId(b),label,
  strength:3,sentiment,description,isBidirectional:true,startEventId:eventId(canto,start)}))
data.relationshipSnapshots=[
  {...stamp,id:'os-lusiadas-relationship-moncaide-interpreter',relationshipId:'os-lusiadas-relationship-4',eventId:eventId(7,46),
    sortKey:7.00046,label:'captain and interpreter',strength:3,sentiment:'positive',
    description:'Monçaide interprets the local shrine visit for Gama.',isActive:true},
  {...stamp,id:'os-lusiadas-relationship-catual-hostile',relationshipId:'os-lusiadas-relationship-6',eventId:eventId(8,81),
    sortKey:8.00081,label:'captain and obstructing officer',strength:4,sentiment:'negative',
    description:'Gama sees the official’s role in keeping him from the ships.',isActive:true},
  {...stamp,id:'os-lusiadas-relationship-moncaide-warning',relationshipId:'os-lusiadas-relationship-4',eventId:eventId(9,7),
    sortKey:9.00007,label:'captain and informant',strength:4,sentiment:'positive',
    description:'Monçaide brings the captain a warning learned in Calicut.',isActive:true},
]

const goalDefs=[
  ['G',1,57,9,13,'want','Reach India by sea and secure an audience and trade.'],
  ['B',1,73,6,35,'want','Prevent the fleet from establishing its fame in the East.'],
  ['V',1,30,9,53,'want','Guide the sailors through opposition and grant them a welcome.'],
  ['MO',9,5,9,15,'want','Warn the Portuguese of the plan forming against their ships.'],
  ['SAM',7,57,9,12,'need','Judge the foreign embassy while preserving order in his port.'],
]
data.characterGoals=goalDefs.map(([code,sc,ss,ec,es,type,text],index)=>({...stamp,id:`os-lusiadas-goal-${index+1}`,
  characterId:charId(code),startEventId:eventId(sc,ss),endEventId:eventId(ec,es),type,text}))

// The surveyed coastline and editorial sea track are drawn in ocean.webp.
// Kathala's mapRoutes joins marker centres with straight lines, which would
// falsely send the ships over Africa between the Cape and East African ports.
data.mapRoutes=[]

const itemDefs=[
  ['padrao','Stone padrão','A carved stone marker raised at the East African river to mark the voyage’s passage.','landmark',false,[[5,78]],'good-signs-river'],
  ['banners','Painted ship banners','Painted fabric displayed aboard the flagship, showing remembered Portuguese deeds.','flag',true,[[7,74],[7,75],[8,1]],'roadstead'],
  ['goods','Portuguese trade goods','Merchandise carried for exchange during the Calicut visit.','chest',true,[[8,92],[8,93],[8,94],[9,1],[9,12]],'roadstead'],
  ['spices','Spices for the return','Pepper and other spices carried aboard the homeward ships.','package',true,[[9,14],[9,15]],'calicut-sea'],
  ['bow','Cupid’s bow','The ivory bow Cupid takes up for Venus’s plan.','weapon',false,[[9,43],[9,47],[9,48]],'high-air'],
  ['globe','Transparent world globe','A luminous globe displayed at the island’s height for Gama to study.','artifact',false,[[10,77],[10,79],[10,80]],'island-height'],
]
data.items=itemDefs.map(([key,name,description,iconType,isCollective])=>({...stamp,
  id:`os-lusiadas-item-${key}`,name,description,iconType,isCollective,tags:[],
  imageId:addPng(`item-${key}`,`library/os-lusiadas/art/items/${key}.webp`)}))
for(const [key,,,,,moments,firstPlace] of itemDefs) {
  const id=`os-lusiadas-item-${key}`
  for(const [canto,start] of moments) data.events.find(e=>e.id===eventId(canto,start)).involvedItemIds.push(id)
  const [firstCanto,firstStart]=moments[0]
  data.itemPlacements.push({...stamp,id:`os-lusiadas-placement-${key}-first`,itemId:id,
    eventId:eventId(firstCanto,firstStart),locationMarkerId:locId(firstPlace),sortKey:firstCanto+firstStart/100000,
    notes:`The ${nameForItem(key)} is shown here for the first time.`})
  if(key==='goods') data.itemPlacements.push({...stamp,id:'os-lusiadas-placement-goods-shore',itemId:id,
    eventId:eventId(8,94),locationMarkerId:locId('landing'),sortKey:8.00094,
    notes:'The merchandise is delivered to the Calicut shore under the Catual’s bargain.'})
  if(key==='goods') data.itemPlacements.push({...stamp,id:'os-lusiadas-placement-goods-return',itemId:id,
    eventId:eventId(9,12),locationMarkerId:locId('roadstead'),sortKey:9.00012,
    notes:'The factors and their goods return to the anchored ships.'})
  for(const [canto,start] of moments) data.itemSnapshots.push({...stamp,id:`os-lusiadas-item-status-${key}-${canto}-${start}`,
    itemId:id,eventId:eventId(canto,start),sortKey:canto+start/100000,
    condition:key==='goods'&&canto===9&&start===12?'Returned to the fleet':'Present in the narrated action',
    notes:data.events.find(e=>e.id===eventId(canto,start)).description})
}
function nameForItem(key) {return itemDefs.find(row=>row[0]===key)[1].toLowerCase()}

// This generator is intentionally deterministic. Entity enrichment and art
// references are added below without changing the imported verse payload.
data.loreCategories=[{...stamp,id:'os-lusiadas-lore-reading',name:'Reading the poem',description:'The edition and its narrative frames.',sortOrder:0}]
const lore=(slug,title,body,at)=>({...stamp,id:`os-lusiadas-lore-${slug}`,categoryId:'os-lusiadas-lore-reading',title,body,
  tags:[],coverImageId:null,linkedEntityIds:[],visibleFromEventId:at?eventId(...at):null})
data.lorePages=[
  lore('edition','Translation and spelling','The reading text is Richard Francis Burton’s complete English verse translation, edited by Isabel Burton and published in London in 1880. Project Gutenberg eBooks 77660 and 77661 transcribe the two volumes. Stanza numbering, numeric note calls, one ornamental divider in Canto I, and one in Canto X are excluded. An unnumbered interpolation after X.40 is omitted so the 1,102 numbered stanzas align with Camões’s 1572 poem. Burton’s historical English spelling and punctuation remain. The original Portuguese is available in the companion entry. See the source audit for exact boundaries and normalization. Both poem and translation are public domain.',[1,1]),
  lore('frames','Voyage, memory, and gods','The cantos follow the order of Camões’s telling. Gama begins already at sea, then recounts earlier Portuguese history and the voyage outward. The gods act in a parallel epic plane; the poet also speaks directly to his king.',[1,19]),
  lore('calendar','Editorial dates','Dates on the calendar are reading aids. Named voyage milestones follow a surviving voyage journal; events between them are interpolated. Older history uses approximate years, the Twelve of England an undated tale position, and divine action its own clock. The poem does not supply a day for every scene.',[3,1]),
  lore('maps','Charts and places','The ocean and coastal charts use geographic coastlines. The gold sea road follows the voyage in broad strokes; exact open-sea positions are editorial.',[1,19]),
  lore('allegory-map','The island and the divine charts','The island and divine diagrams are schematic because the poem gives no survey coordinates for those settings.',[9,21]),
  lore('artwork','Illustrations and chart sources','The cover, portraits, object studies, place views, and faction illustrations were generated for this edition with OpenAI imagegen in October 2026. They are interpretive images, not historical portraits or photographs. The five geographic charts use public-domain Natural Earth 1:10m land geometry and shaded relief; their voyage routes and three allegorical plans are editorial.',[1,1]),
]

data.world.name = 'The Lusiads — Burton translation'
let englishScene = 0
for (let cantoIndex = 0; cantoIndex < englishCantos.length; cantoIndex++) {
  const canto = englishCantos[cantoIndex]
  const chapter = data.chapters[cantoIndex]
  chapter.title = canto.title
  chapter.notes = 'English translation by Richard Francis Burton (1880); source stanza order retained.'
  chapter.wordGoal = englishWordCount(canto.stanzas.map(stanza => stanza.text).join('\n\n'))
  for (let index = 0; index < cuts[cantoIndex].length; index++) {
    const start = cuts[cantoIndex][index][0]
    const end = (cuts[cantoIndex][index + 1]?.[0] ?? canto.stanzas.length + 1) - 1
    const scene = data.sceneTexts[englishScene++]
    scene.text = canto.stanzas.slice(start - 1, end).map(stanza => stanza.text).join('\n\n')
    scene.wordCount = englishWordCount(scene.text)
  }
}
if (englishScene !== data.sceneTexts.length) throw Error('English scene alignment drift')

const out=path.join(repo,'library/os-lusiadas.pwk')
fs.writeFileSync(out,JSON.stringify(data,null,2)+'\n')
console.log(`Generated ${path.relative(repo,out)}: ${data.chapters.length} cantos, ${data.events.length} scenes, ${data.characters.length} characters, ${data.characterSnapshots.length} snapshots, ${data.locationMarkers.length} locations, ${data.mapLayers.length} maps, ${englishWordCount(data.sceneTexts.map(s=>s.text).join('\n\n'))} English verse words`)
