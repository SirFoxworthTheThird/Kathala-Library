import fs from 'node:fs'
import { sections, retainedText, normalize, wordCount, sourceEdition, sourceUrl, sourceSha256 } from './source-text.mjs'
import { plans } from './event-plan.mjs'
import { characters as characterDefs, locations as locationDefs, maps as mapDefs } from './world-ledger.mjs'
import { snapshotNotes } from './snapshot-ledger.mjs'

// Manuscript-first working edition. Exact source reconstruction and assets are
// validated; editorial continuity and reading-mode review remain release gates.
const now = Date.UTC(2026, 9, 3)
const worldId = 'black-arrow-world', timelineId = 'black-arrow-timeline'
const stamp = { worldId, createdAt: now, updatedAt: now }
const chapters = [], events = [], sceneTexts = []
const slug = s => s.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const charId = name => `black-arrow-char-${slug(name)}`
const locId = name => `black-arrow-loc-${slug(name)}`
const mapId = key => `black-arrow-map-${key}`
const characterNames = new Set(characterDefs.map(x=>x[0])), locationNames = new Set(locationDefs.map(x=>x[0]))
const blobs = []
function image(url) {
  const file = new URL(`../../${url}`, import.meta.url)
  if (!fs.existsSync(file)) return null
  const id = `black-arrow-image-${slug(url)}`
  blobs.push({ ...stamp, id, mimeType: url.endsWith('.svg') ? 'image/svg+xml' : 'image/png', url })
  return id
}
function mapSize(key) {
  const bytes = fs.readFileSync(new URL(`../../library/black-arrow/maps/illustrated/${key}.png`, import.meta.url))
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)]
}
const mapSizes = new Map(mapDefs.map(([key]) => [key, mapSize(key)]))
const mapLayers = mapDefs.map(([key,parent,name,description],i)=>{ const [imageWidth,imageHeight]=mapSizes.get(key); return { ...stamp, id:mapId(key), name, description, parentMapId:parent?mapId(parent):null, imageId:image(`library/black-arrow/maps/illustrated/${key}.png`), imageWidth, imageHeight, scalePixelsPerUnit:null, scaleUnit:null, levelGroupId:null, levelIndex:i, levelLabel:null } })
// Editorial coordinates in the ledger use a 1400 × 1000 bottom-origin grid.
// Scale to each separately illustrated map's native dimensions for the PWK.
const locationMarkers = locationDefs.map(([name,map,x,y,description,linked])=>{ const [width,height]=mapSizes.get(map); return { ...stamp, id:locId(name), name, description, mapLayerId:mapId(map), linkedMapLayerId:linked?mapId(linked):null, x:Math.round(x*width/1400), y:Math.round(y*height/1000), iconType:linked?'building':'landmark', imageId:image(`library/black-arrow/art/locations/${slug(name)}.png`), tags:[], factionId:null } })
const characters = characterDefs.map(([name,description])=>({ ...stamp, id:charId(name), name, aliases:[], description, color:'#6d604a', portraitImageId:image(`library/black-arrow/art/characters/${slug(name)}.png`), isAlive:true, birthDate:null, tags:[] }))
const itemDefs = [
  ['black-arrow','Black-fletched arrows','The distinctive shafts used by Ellis Duckworth’s company as weapons and signatures.','arrow'],
  ['warning-rhyme','The warning rhyme','A written threat naming the four men marked by the Black Arrow.','document'],
  ['crossbow','Dick’s crossbow','The young ward’s practical hunting and fighting weapon.','weapon'],
  ['friar-habit','Friar’s habit','A rough hooded disguise taken from the forest den for entry into Shoreby.','clothing'],
  ['wensleydale-letter','Sir Daniel’s letter to Wensleydale','A sealed political letter carried out of the Moat House by Throgmorton.','document'],
  ['shoreby-letter','Lord Shoreby’s secret letter','A sealed letter found in the wallet of Shoreby’s spy.','document'],
]
const itemId = key => `black-arrow-item-${key}`
const items = itemDefs.map(([key,name,description,iconType])=>({...stamp,id:itemId(key),name,description,iconType,isCollective:key==='black-arrow',imageId:image(`library/black-arrow/art/items/${key}.png`),tags:[]}))
const coverImageId = image('library/black-arrow/art/world.png')
const characterSnapshots = []
const deathAt = new Map([
  ['Appleyard', 'Appleyard Falls'],
  ['Selden', 'Dick Calls to Selden'],
  ['Lord Shoreby', 'The Wedding Procession'],
  ['Earl Risingham', 'Dick Turns the Fight'],
  ['Bennet Hatch', 'Bennet’s Men'],
  ['The spy', 'The Spy Is Killed'],
  ['Sir Daniel Brackley', 'A Black Arrow Strikes'],
  ['Lawless', 'The Two Old Men'],
  ['Throgmorton', 'Throgmorton Discovered'],
])
const dead = new Set()
let wensleydaleHeldByDick=false, shorebyHeldByDick=false
let order = 0
let priorTime = null
for (const section of sections) {
  const chapterId = `black-arrow-chapter-${section.number}`
  const title = section.book === 'Prologue' ? section.heading : `${section.book} / ${section.heading}`
  chapters.push({ ...stamp, id: chapterId, timelineId, number: section.number, title, synopsis: plans.get(section.number)?.[0].description ?? '', notes: 'Source heading retained verbatim.', wordGoal: wordCount(section.text) })
  const paragraphs = section.text.split(/\n{2,}/)
  const beats = plans.get(section.number) ?? [{ start: 0, title: section.heading, description: '', place: '', cast: [], tension: 1 }]
  if (beats[0].start !== 0 || beats.some((beat, i) => beat.start < 0 || beat.start >= paragraphs.length || (i && beat.start <= beats[i - 1].start))) throw Error(`Invalid paragraph cuts in section ${section.number}`)
  for (let i = 0; i < beats.length; i++) {
    const beat = beats[i], eventId = `black-arrow-event-${section.number}-${i + 1}`
    if (!locationNames.has(beat.place) || beat.cast.some(name=>!characterNames.has(name))) throw Error(`Unknown place or character in event ${eventId}`)
    if (beat.title==='Throgmorton Discovered') wensleydaleHeldByDick=true
    if (beat.title==='The Earl’s Decision') wensleydaleHeldByDick=false
    if (beat.title==='The Dead Spy’s Warning') shorebyHeldByDick=true
    if (beat.title==='Before Earl Risingham') shorebyHeldByDick=false
    // The text places the first action in a May morning and Shoreby in the
    // first week of January, after months have passed. Exact dates and year
    // are editorial; the numeric positions preserve that seasonal sequence.
    const base = section.number < 14 ? 140 + section.number * 0.35 : 370 + (section.number - 14) * 0.35
    const inWorldTime = section.number === 33 && i >= 3
      ? 365 * 20 + (i - 3) * 365
      : base + i * 0.35 / beats.length
    events.push({ ...stamp, id: eventId, chapterId, timelineId, title: beat.title, description: beat.description, locationMarkerId: locId(beat.place), involvedCharacterIds: beat.cast.map(charId), mentionedCharacterIds: [], involvedItemIds: [], threadIds: [], motifIds: [], sortOrder: order++, travelDays: priorTime===null?0:Math.max(0,inWorldTime-priorTime), inWorldTime, tension: beat.tension, tags: [], structureBeat: null, status: 'draft', povCharacterId: beat.cast.includes('Dick Shelton')?charId('Dick Shelton'):null, isFlashback: false })
    for (const [castOrder, name] of beat.cast.entries()) {
      if (deathAt.get(name) === beat.title) dead.add(name)
      const place = locationMarkers.find(location => location.name === beat.place)
      const inventory = []
      if (name === 'Dick Shelton' && section.number <= 18) inventory.push(itemId('crossbow'))
      if (name === 'Dick Shelton' && (section.number === 20 && i >= 2 || section.number >= 21 && section.number <= 23 || section.number === 24 && i === 0)) inventory.push(itemId('friar-habit'))
      if (name === 'Throgmorton' && ['Throgmorton’s Errand','Throgmorton Escapes'].includes(beat.title)) inventory.push(itemId('wensleydale-letter'))
      if (name === 'Dick Shelton' && wensleydaleHeldByDick) inventory.push(itemId('wensleydale-letter'))
      if (name === 'Dick Shelton' && shorebyHeldByDick) inventory.push(itemId('shoreby-letter'))
      characterSnapshots.push({ ...stamp,
        id: `black-arrow-snapshot-${section.number}-${i + 1}-${slug(name)}`,
        characterId: charId(name), eventId, isAlive: !dead.has(name),
        currentLocationMarkerId: place.id, currentMapLayerId: place.mapLayerId,
        inventoryItemIds: inventory, inventoryNotes: inventory.length ? `Carrying or wearing ${inventory.map(id => itemDefs.find(def=>itemId(def[0])===id)?.[1] ?? 'an item').join(' and ')}.` : '', travelModeId: null,
        sortKey: order + castOrder / 100,
        statusNotes: snapshotNotes[beat.title]?.[name] ?? (()=>{throw Error(`Missing individual snapshot note: ${beat.title} / ${name}`)})(),
      })
    }
    priorTime = inWorldTime
    const text = paragraphs.slice(beat.start, beats[i + 1]?.start ?? paragraphs.length).join('\n\n')
    sceneTexts.push({ ...stamp, id: `black-arrow-scene-${section.number}-${i + 1}`, eventId, text, wordCount: wordCount(text) })
  }
}
if (normalize(sceneTexts.map(s => s.text).join('\n\n')) !== normalize(retainedText)) throw Error('Manuscript reconstruction failed')
for (const character of characters) if (dead.has(character.name)) character.isAlive = false
// Tom dies offstage during Shoreby's sack; Arblaster reports it later. He has
// no death-scene snapshot because he is absent from the report scene.
characters.find(character=>character.name==='Tom').isAlive=false
const eventByTitle = title => {
  const event = events.find(value => value.title === title)
  if (!event) throw Error(`Missing authored event: ${title}`)
  return event.id
}
events.find(event=>event.title==='Arblaster’s Plea').mentionedCharacterIds.push(charId('Tom'))
events.find(event=>event.title==='The Two Old Men').mentionedCharacterIds.push(charId('Tom'))
for (const [title,beat] of [
  ['The Dedication and Tunstall Bell','hook'],
  ['The Black Arrow’s Warning','inciting-incident'],
  ['Flight from the House','plot-point-1'],
  ['The Good Hope Departs','midpoint'],
  ['The Duke of Gloucester','plot-point-2'],
  ['A Black Arrow Strikes','climax'],
  ['The Wedding','resolution'],
]) events.find(event=>event.id===eventByTitle(title)).structureBeat=beat
const plotThreads = [
  ['father','The Death of Harry Shelton','Dick seeks a truthful account of the killing that made him Sir Daniel’s ward.'],
  ['arrows','The Black Arrow’s Reckoning','Marked shafts strike the Tunstall household.'],
  ['joanna','The Two Wards','A fugitive ward asks Dick for protection through dangerous country.'],
  ['roses','The Two Roses','Rival armies contest the coast and the allegiance of Sir Daniel’s men.'],
  ['ship','The Good Hope','Dick’s sea rescue plan depends on Arblaster’s vessel.'],
].map(([key,name,description])=>({...stamp,id:`black-arrow-thread-${key}`,name,description,color:'#725a43',status:'active',tags:[]}))
const motifs = [
  ['arrow','Black arrows','Marked shafts are both weapons and written signatures of revenge.'],
  ['disguise','Disguises and hoods','A false appearance can shelter a fugitive or conceal a threat.'],
  ['oath','Oaths and testimony','Dick repeatedly tests inherited authority against sworn words and evidence.'],
  ['water','Crossings by water','The Till, the moat, and the shore make passage a choice under threat.'],
].map(([key,name,description])=>({...stamp,id:`black-arrow-motif-${key}`,name,description,color:'#6d7358',tags:[]}))
const warningOrder=events.find(x=>x.title==='The Black Arrow’s Warning').sortOrder
for (const event of events) {
  const chapterNumber = Number(event.chapterId.split('-').at(-1))
  const prose = `${event.title} ${event.description}`
  const threadKeys = [
    event.sortOrder >= warningOrder && (chapterNumber <= 13 || /father|Sir Daniel’s Oath|Sir Oliver Must Swear/.test(prose)) ? 'father' : '',
    /arrow|outlaw|Duckworth|revenge|ambush|Selden|Appleyard/.test(prose) ? 'arrows' : '',
    /Matcham|Joanna|marriage|wedding|ward|Foxham/.test(prose) ? 'joanna' : '',
    chapterNumber >= 14 && /Gloucester|Shoreby|battle|York|Lancaster|charge|barricade|Sir Daniel/.test(prose) ? 'roses' : '',
    chapterNumber >= 17 && chapterNumber <= 19 || /Arblaster|Good Hope/.test(prose) ? 'ship' : '',
  ].filter(Boolean)
  const motifKeys = [
    /arrow|archer|crossbow/.test(prose) ? 'arrow' : '',
    /hood|disguis|friar|leper|habit/.test(prose) ? 'disguise' : '',
    /oath|truth|secret|letter|warning|father|testimony/.test(prose) ? 'oath' : '',
    /ferry|river|moat|ship|shore|coast|water/.test(prose) ? 'water' : '',
  ].filter(Boolean)
  event.threadIds = threadKeys.map(key=>`black-arrow-thread-${key}`)
  event.motifIds = motifKeys.map(key=>`black-arrow-motif-${key}`)
}
const relationships = [
  ['Dick Shelton','Sir Daniel Brackley','Ward and guardian','mixed','Dick serves his guardian while seeking the truth about his father.','Dick Rides to the Moat House'],
  ['Dick Shelton','Jack Matcham','Travelling companions','positive','Dick gives the fugitive ward his aid across the fen.','Matcham Asks the Way'],
  ['Dick Shelton','Joanna Sedley','Fellow wards','positive','Dick recognizes the companion he protected across the fen.','Joanna Names Herself'],
  ['Dick Shelton','Lawless','Companions in the forest','positive','Lawless offers Dick the practical help of the forest company.','Lawless and the Company'],
  ['Dick Shelton','Ellis Duckworth','Uneasy allies','mixed','The outlaw’s claim for justice does not always match Dick’s mercy.','Lawless and the Company'],
  ['Dick Shelton','Lord Foxham','Allies for Joanna','positive','Foxham and Dick share an interest in freeing Joanna.','An Alliance for Joanna'],
  ['Dick Shelton','Captain Arblaster','Debtor and injured skipper','negative','Dick’s use of the Good Hope leaves Arblaster with a material grievance.','Arblaster Counts His Loss'],
  ['Dick Shelton','Richard of Gloucester','Soldier and commander','positive','A rescue on the hill places Dick under Gloucester’s command.','The Duke of Gloucester'],
  ['Joanna Sedley','Lord Shoreby','Proposed marriage','negative','Sir Daniel’s arrangement threatens Joanna’s freedom.','An Alliance for Joanna'],
  ['Joanna Sedley','Sir John Hamley','Earlier proposed match','mixed','Hamley was named as a possible husband before Sir Daniel arranged the Shoreby match.','Joanna Names Herself'],
  ['Alicia Risingham','Sir John Hamley','Proposed match','positive','Foxham proposes his kinsman for Alicia, and Gloucester approves the match.','Alicia and the Duke'],
  ['Lord Foxham','Hawksley','Lord and retainer','positive','Hawksley serves Foxham during the shore fight and shipwreck.','Lantern and Recognition'],
  ['Sir Daniel Brackley','Lady Brackley','Husband and wife','mixed','Lady Brackley shares Sir Daniel’s guarded household.','The House in the Snow'],
  ['Dick Shelton','Bennet Hatch','Older friend and retainer','mixed','Bennet serves Dick’s guardian while caring for the young ward.','The Dedication and Tunstall Bell'],
  ['Dick Shelton','Sir Oliver Oates','Priest and questioning ward','mixed','Dick seeks the truth about his father from the priest who served the household.','Sir Oliver Sees the Arrow'],
  ['Joanna Sedley','Alicia Risingham','Confidantes','positive','Alicia helps Joanna endure Sir Daniel’s custody and protect Dick.','Joanna Recognizes Dick'],
  ['Joanna Sedley','Sir Daniel Brackley','Ward and guardian','negative','Sir Daniel uses his authority over Joanna to arrange her marriage.','Joanna Names Herself'],
  ['Sir Daniel Brackley','Lord Shoreby','Marriage alliance','mixed','Sir Daniel offers his ward to Lord Shoreby to secure political advantage.','Sir Daniel and Lord Shoreby'],
  ['Ellis Duckworth','Sir Daniel Brackley','Vengeance','negative','Ellis leads the company that marks Sir Daniel with a black arrow.','Lawless and the Company'],
  ['Sir Daniel Brackley','Sir Oliver Oates','Household allies','mixed','The priest counsels Sir Daniel as danger gathers around their household.','Sir Daniel at Kettley'],
  ['Lawless','Captain Arblaster','Former shipmates','mixed','Lawless uses an old seafaring acquaintance to obtain the Good Hope.','Arblaster and the Good Hope'],
  ['Dick Shelton','Alicia Risingham','Unexpected allies','positive','Alicia sees through Dick’s disguise and aids him in Joanna’s chamber.','Alicia in the Stairway'],
  ['Richard of Gloucester','Catesby','Duke and officer','positive','Catesby attends Gloucester in battle and carries out his orders.','The Charge'],
  ['Sir Daniel Brackley','Throgmorton','Lord and messenger','mixed','Sir Daniel entrusts a dangerous sealed letter to a household servant.','Throgmorton’s Errand'],
  ['Captain Arblaster','Tom','Captain and sailor','positive','Tom serves aboard Arblaster’s Good Hope and follows his captain ashore.','Arblaster and the Good Hope'],
].map(([a,b,label,sentiment,description,start],i)=>({...stamp,id:`black-arrow-relationship-${i+1}`,characterAId:charId(a),characterBId:charId(b),label,sentiment,description,strength:6,isBidirectional:true,startEventId:eventByTitle(start)}))
const relationshipSnapshots = [
  [0,'Dick Asks about His Father','Trust under strain','negative','Dick’s questions about his father make obedience to Sir Daniel increasingly difficult.',3],
  [0,'Sir Daniel’s Oath','Guardian challenged','negative','Dick demands an oath and weighs it against what he has learned.',2],
  [1,'Two Wards of Sir Daniel','Mutual confidence','positive','Their shared danger brings a more candid understanding.',8],
  [2,'The Wedding Procession','Chosen loyalty','positive','Dick risks exposure to protect Joanna from the arranged ceremony.',9],
  [5,'An Alliance for Joanna','Rescue alliance','positive','Foxham and Dick unite around Joanna’s safety.',8],
  [6,'Arblaster’s Plea','A debt acknowledged','mixed','Dick faces the skipper’s loss and must answer for it.',4],
  [7,'Dick Sent Forward','A soldier’s trust','positive','Gloucester entrusts Dick with a dangerous role in the assault.',8],
  [9,'An Alliance for Joanna','Proposal displaced','mixed','Sir Daniel’s plans for Lord Shoreby displace the earlier Hamley match.',2],
  [10,'The Wedding','Courtship begins','positive','Hamley courts Alicia at the wedding breakfast after Gloucester approves the proposed match.',7],
].map(([index,title,label,sentiment,description,strength],i)=>({...stamp,id:`black-arrow-relationship-state-${i+1}`,relationshipId:relationships[index].id,eventId:eventByTitle(title),label,sentiment,description,strength,isActive:true,sortKey:i}))
relationshipSnapshots.find(snapshot=>snapshot.relationshipId===relationships[9].id).isActive=false
for (const [index,title,label,sentiment,description,strength,isActive] of [
  [13,'Bennet’s Men','Friendship ends in battle','negative','Bennet refuses Dick’s demand to yield and falls under his men’s arrows.',1,false],
  [14,'Before the Abbey Altar','Accusation before the altar','negative','Dick confronts the priest about Harry Shelton’s death.',1,true],
  [16,'Before Gloucester','Wardship ended','negative','Joanna is no longer held for Sir Daniel’s marriage bargain.',1,false],
  [17,'The Wedding Procession','Alliance broken by death','negative','Shoreby is killed before the forced marriage can be completed.',1,false],
  [20,'Arblaster Taken','Old acquaintance betrayed','negative','Lawless helps seize Arblaster and the vessel he loves.',1,true],
  [24,'Arblaster’s Plea','Lost shipmate','negative','Arblaster reports Tom’s death in the fighting and mourns the sailor who served him.',1,false],
]) relationshipSnapshots.push({...stamp,id:`black-arrow-relationship-state-${relationshipSnapshots.length+1}`,relationshipId:relationships[index].id,eventId:eventByTitle(title),label,sentiment,description,strength,isActive,sortKey:relationshipSnapshots.length})
const factDefs = [
  ['warning','The black arrow names four targets','The rhyme marks four men for the Black Arrow company’s vengeance.','The Black Arrow’s Warning',['Dick Shelton','Bennet Hatch','Sir Oliver Oates']],
  ['leper','The leper is Sir Daniel','The frightening hooded pursuer reveals his identity to Dick.','The Leper Throws Back His Hood',['Dick Shelton','Jack Matcham','Sir Daniel Brackley']],
  ['ward','Matcham is Joanna','The companion Dick protected is revealed as the young woman under Sir Daniel’s power.','Joanna Names Herself',['Dick Shelton','Joanna Sedley']],
  ['father','The old household knows of Harry Shelton’s death','Carter and the priest are linked to the secret Dick has sought.','Dick Asks about His Father',['Dick Shelton','Carter']],
  ['gloucester','The hill fighter is Richard of Gloucester','The young leader gives Dick his name and command.','The Duke of Gloucester',['Dick Shelton','Richard of Gloucester']],
  ['foxham','The shore fighter is Lord Foxham','The unnamed knight gives Dick his name at St. Bride’s Cross.','Joanna’s Guardian',['Dick Shelton','Lord Foxham']],
  ['daniel-death','Sir Daniel dies by a black arrow','The old knight falls on the Holywood road.','A Black Arrow Strikes',['Dick Shelton','Sir Daniel Brackley']],
  ['rutter','The dead spy was Rutter','Joanna names the spy whose body was found in Sir Daniel’s house.','Joanna and Alicia Wait',['Dick Shelton','Joanna Sedley','Alicia Risingham']],
  ['estate','Sir Daniel offers Risingham’s estate','The letter to Lord Wensleydale promises away the earl’s own property.','The Earl’s Decision',['Dick Shelton','Earl Risingham']],
].map(([key,title,description,at,who])=>({key,title,description,at,who}))
const knowledgeFacts = factDefs.map(({key,title,description,at})=>({...stamp,id:`black-arrow-fact-${key}`,title,description,readerLearnsAtEventId:eventByTitle(at),originEventId:eventByTitle(at),tags:[]}))
knowledgeFacts.push({...stamp,id:'black-arrow-fact-tom-death',title:'Tom was shot during the sack',description:'Arblaster reports that his sailor Tom was shot down and died during the fighting in Shoreby.',readerLearnsAtEventId:eventByTitle('Arblaster’s Plea'),originEventId:eventByTitle('Arblaster’s Plea'),tags:[`offstage-death:${charId('Tom')}`]})
const knowledgeReveals = factDefs.flatMap(({key,at,who})=>who.map(name=>({...stamp,id:`black-arrow-reveal-${key}-${slug(name)}`,factId:`black-arrow-fact-${key}`,characterId:charId(name),eventId:eventByTitle(at),note:'Revealed by the scene’s testimony or direct observation.'})))
knowledgeReveals.push({...stamp,id:'black-arrow-reveal-tom-death-dick',factId:'black-arrow-fact-tom-death',characterId:charId('Dick Shelton'),eventId:eventByTitle('Arblaster’s Plea'),note:'Dick hears the death reported by Arblaster.'})
knowledgeReveals.push({...stamp,id:'black-arrow-reveal-tom-death-arblaster',factId:'black-arrow-fact-tom-death',characterId:charId('Captain Arblaster'),eventId:eventByTitle('Arblaster’s Plea'),note:'Arblaster recounts his sailor’s death.'})
const factions = [
  ['household','Sir Daniel’s Household','Retainers and wards tied to the Moat House and its lord.','#695841'],
  ['arrows','The Black Arrow Company','Forest outlaws pursuing vengeance against Sir Daniel and his allies.','#48583d'],
  ['lancaster','Lancastrian Cause','The armed party holding Shoreby before Gloucester’s assault.','#8a4a45'],
  ['york','Yorkist Army','Gloucester’s force marching on Shoreby.','#d2c3a0'],
].map(([key,name,description,color])=>({...stamp,id:`black-arrow-faction-${key}`,name,description,color,tags:[],coverImageId:null}))
const factionMemberships = [
  ['household','Dick Shelton','Ward','The Dedication and Tunstall Bell'],['household','Bennet Hatch','Retainer','The Dedication and Tunstall Bell'],['household','Sir Daniel Brackley','Lord','Sir Daniel at Kettley'],['household','Sir Oliver Oates','Priest','Sir Oliver Sees the Arrow'],
  ['household','Lady Brackley','Lady of the household','The House in the Snow'],['household','Clipsby','Levied villager','The Dedication and Tunstall Bell'],
  ['household','Throgmorton','Messenger','Throgmorton’s Errand'],
  ['arrows','Ellis Duckworth','Leader','Lawless and the Company'],['arrows','Lawless','Outlaw','Lawless and the Company'],['arrows','Greensheve','Scout','The Outlaws Find Dick'],
  ['lancaster','Lord Shoreby','Nobleman','Sir Daniel and Lord Shoreby'],['lancaster','Earl Risingham','Earl','Joanna Appeals to Risingham'],['lancaster','Sir Daniel Brackley','Knight','A Watch in Shoreby'],['lancaster','The spy','Shoreby’s agent','The Spy Finds a Tassel'],
  ['york','Richard of Gloucester','Commander','The Duke of Gloucester'],['york','Dutton','Soldier','Dick Sent Forward'],['york','Dick Shelton','Knight','The Duke of Gloucester'],['york','Lord Foxham','Lord','Joanna’s Guardian'],['york','Hawksley','Retainer','Lantern and Recognition'],['york','Sir John Hamley','Knight','The Wedding'],
  ['york','Catesby','Officer','The Charge'],
  ['household','Joanna Sedley','Ward','Joanna Names Herself'],['arrows','Capper','Outlaw','Following the Torches'],['arrows','John-a-Fenne','Ferryman ally','Arrows on the Water'],
].map(([faction,name,role,start],i)=>({...stamp,id:`black-arrow-membership-${i+1}`,factionId:`black-arrow-faction-${faction}`,characterId:charId(name),role,startEventId:eventByTitle(start),endEventId:null,notes:''}))
for (const member of factionMemberships) {
  if (member.characterId===charId('Dick Shelton') && member.factionId==='black-arrow-faction-household') member.endEventId=eventByTitle('Flight from the House')
  if (member.characterId===charId('Joanna Sedley') && member.factionId==='black-arrow-faction-household') member.endEventId=eventByTitle('Before Gloucester')
  if (member.characterId===charId('Lord Shoreby')) member.endEventId=eventByTitle('The Wedding Procession')
  if (member.characterId===charId('The spy')) member.endEventId=eventByTitle('The Spy Is Killed')
  if (member.characterId===charId('Bennet Hatch')) member.endEventId=eventByTitle('Bennet’s Men')
  if (member.characterId===charId('Sir Daniel Brackley')) member.endEventId=eventByTitle('A Black Arrow Strikes')
  if (member.characterId===charId('Lawless')) member.endEventId=eventByTitle('The Two Old Men')
  if (member.characterId===charId('Throgmorton')) member.endEventId=eventByTitle('Throgmorton Discovered')
}
const characterGoals = [
  ['Dick Shelton','Learn what happened to his father and act justly on that knowledge','Dick Rides to the Moat House','A Black Arrow Strikes'],
  ['Dick Shelton','Help Matcham cross the fen safely','Matcham Asks the Way','Farewell to Jack Matcham'],
  ['Dick Shelton','Protect Joanna from Sir Daniel’s marriage plan','Joanna Names Herself','Before Gloucester'],
  ['Joanna Sedley','Escape coercion and choose her own marriage','Joanna Names Herself','Before Gloucester'],
  ['Ellis Duckworth','Avenge the wrongs named by the Black Arrow','Lawless and the Company','A Black Arrow Strikes'],
  ['Sir Daniel Brackley','Preserve his household and power through the war','Sir Daniel at Kettley','A Black Arrow Strikes'],
  ['Lord Foxham','Recover Joanna from Sir Daniel’s control','An Alliance for Joanna','Before Gloucester'],
  ['Captain Arblaster','Secure restitution for the Good Hope','Arblaster Counts His Loss','The Two Old Men'],
].map(([name,goal,start,end],i)=>({...stamp,id:`black-arrow-goal-${i+1}`,characterId:charId(name),type:'primary',text:goal,startEventId:eventByTitle(start),endEventId:eventByTitle(end)}))
const mapRoutes = [
  ['fen','To the Till ferry','region',['Fen causeway','River Till ferry','River Till bank'],'trail'],
  ['forest','Through the forest','forest',['Forest road','Forest stream','Forest hillside','Forest ridge'],'trail'],
  ['moat','Flight through the Moat House','moat',['Moat House hall','Moat House chapel wing','Room over the chapel','Moat House passage','Moat House moat'],'trail'],
  ['shoreby','Shoreby rescue and battle','shoreby',['Shoreby harbour','Shoreby streets','Sir Daniel’s Shoreby house','Shoreby abbey','Shoreby barricade'],'trail'],
].map(([key,name,map,points,routeType])=>({...stamp,id:`black-arrow-route-${key}`,mapLayerId:mapId(map),name,routeType,waypoints:points.map(locId),color:'#8b6345',notes:'Interpretive movement; narrated distances are not surveyed.'}))
const itemEvents = [
  ['black-arrow','Appleyard Falls'],['black-arrow','The Black Arrow’s Warning'],['black-arrow','The Dead Spy’s Warning'],['black-arrow','The Wedding Procession'],['black-arrow','A Black Arrow Strikes'],
  ['warning-rhyme','The Black Arrow’s Warning'],
  ['crossbow','Dick Rides to the Moat House'],['crossbow','A Crossbow Offered'],['crossbow','The Ambush on the Road'],['crossbow','The Garden Wall'],
  ['friar-habit','A Friar’s Habit'],['friar-habit','The House in the Snow'],
  ['wensleydale-letter','Throgmorton’s Errand'],['wensleydale-letter','Throgmorton Discovered'],['wensleydale-letter','The Earl’s Decision'],
  ['shoreby-letter','The Dead Spy’s Warning'],['shoreby-letter','Before Earl Risingham'],
]
const itemPlacements = itemEvents.map(([key,title],i)=>{const event=events.find(e=>e.id===eventByTitle(title));return {...stamp,id:`black-arrow-placement-${i+1}`,itemId:itemId(key),eventId:event.id,locationMarkerId:event.locationMarkerId,sortKey:i,notes:`The ${itemDefs.find(x=>x[0]===key)[1]} is active in this scene.`}})
for (const placement of itemPlacements) events.find(event=>event.id===placement.eventId).involvedItemIds.push(placement.itemId)
const loreCategoryId = 'black-arrow-lore-edition'
const data = {
  version: 18, type: 'world', exportedAt: now,
  world: { ...stamp, id: worldId, name: 'The Black Arrow: A Tale of the Two Roses', description: 'During the Wars of the Roses, a young ward comes of age amid divided loyalties in the forests and towns of England.', coverImageId, theme: 'theme-historical', readingMode: true, continuityStaleThreshold: 5, wordTarget: wordCount(retainedText), calendar: { startYear: 1460, yearSuffix: '', months: [{name:'January',days:31},{name:'February',days:28},{name:'March',days:31},{name:'April',days:30},{name:'May',days:31},{name:'June',days:30},{name:'July',days:31},{name:'August',days:31},{name:'September',days:30},{name:'October',days:31},{name:'November',days:30},{name:'December',days:31}] } },
  timelines: [{ ...stamp, id: timelineId, name: 'The Black Arrow', description: 'The prologue and five books in source order.', color: '#604b3c', dayOffset: 0 }],
  chapters, events, sceneTexts, mapLayers, locationMarkers, characters, characterSnapshots, items, itemPlacements, blobs, relationships, relationshipSnapshots, plotThreads, motifs, knowledgeFacts, knowledgeReveals, factions, factionMemberships, characterGoals, mapRoutes,
  loreCategories: [{ ...stamp, id: loreCategoryId, name: 'Edition', color: '#604b3c', sortOrder: 0 }],
  lorePages: [
    { ...stamp, id: 'black-arrow-lore-source', categoryId: loreCategoryId, title: 'Source Edition', body: `${sourceEdition}. ${sourceUrl}. SHA-256: ${sourceSha256}. Stevenson first serialized the story in Young Folks in 1883; book publication followed in 1888. The selected digital text retains the authorial dedication, prologue, five books, and three endnotes through the conclusion. The Gutenberg header, end delimiter, and licence are excluded. Project Gutenberg marks this edition public domain in the United States.`, visibleFromEventId: events[0].id, tags: [], coverImageId: null, linkedEntityIds: [] },
    { ...stamp, id: 'black-arrow-lore-calendar', categoryId: loreCategoryId, title: 'Editorial Calendar', body: 'The bell at Tunstall sounds in late spring, and the next morning is explicitly in May. This world places the first action in May 1460 solely to give the undated story a navigable calendar. The novel does not establish this year.', visibleFromEventId: events[0].id, tags: [], coverImageId: null, linkedEntityIds: [] },
    { ...stamp, id: 'black-arrow-lore-shoreby-calendar', categoryId: loreCategoryId, title: 'Shoreby Calendar', body: 'The Shoreby action begins in the first week of January after months have passed. This edition places it in January 1461 to keep the calendar navigable; the novel does not establish that year.', visibleFromEventId: eventByTitle('A Watch in Shoreby'), tags: [], coverImageId: null, linkedEntityIds: [] },
    { ...stamp, id: 'black-arrow-lore-closing-calendar', categoryId: loreCategoryId, title: 'Closing Chronology', body: 'The closing account of Dick and Joanna’s later peace and the two old men is placed about twenty years after the wedding. The novel does not establish the duration of those later lives.', visibleFromEventId: eventByTitle('The Two Old Men'), tags: [], coverImageId: null, linkedEntityIds: [] },
    { ...stamp, id: 'black-arrow-lore-maps', categoryId: loreCategoryId, title: 'Map Method', body: 'The reading chart follows narrated routes rather than surveyed geography. Building plans are invented where the story gives movement but not dimensions. North and south are approximate, and the distance between places is not to scale.', visibleFromEventId: events[0].id, tags: [], coverImageId: null, linkedEntityIds: [] },
    { ...stamp, id: 'black-arrow-lore-art', categoryId: loreCategoryId, title: 'Artwork Provenance', body: 'The cover, 32 character portraits, 45 location paintings, six item illustrations, and nine illustrated maps were generated separately with OpenAI imagegen for this edition. They are original generated assets for the Library, not taken from a third-party picture collection. These images illustrate the public-domain Stevenson text; the text source and its United States public-domain status are recorded on the Source Edition page.', visibleFromEventId: events[0].id, tags: [], coverImageId: null, linkedEntityIds: [] },
    { ...stamp, id: 'black-arrow-lore-matcham', categoryId: loreCategoryId, title: 'Jack Matcham and Joanna Sedley', body: 'The companion who travelled with Dick as Jack Matcham is Joanna Sedley. The two character cards follow one person before and after the disclosure in the chamber above the chapel.', visibleFromEventId: eventByTitle('Joanna Names Herself'), tags: [], coverImageId: null, linkedEntityIds: [] },
  ]
}
for (const key of ['characterMovements','locationSnapshots','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships','continuitySuppressions','writingLogs','sceneRevisions']) data[key] = []
const output = process.argv.includes('--publish') ? '../../library/black-arrow.pwk' : './draft.pwk'
fs.writeFileSync(new URL(output, import.meta.url), JSON.stringify(data, null, 2) + '\n')
console.log({ chapters: chapters.length, scenes: sceneTexts.length, words: wordCount(retainedText), sourceSha256 })
