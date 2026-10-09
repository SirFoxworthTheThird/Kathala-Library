import fs from 'node:fs'
import { chapters, events, sceneTexts, stamp, worldId, timelineId } from './manuscript.mjs'
import { retainedText, wordCount, sourceEdition, sourceSha256, sourceUrl } from './source-text.mjs'
import { maps, locations, characters as characterDefs } from './world-ledger.mjs'
import { meta, codes, sceneTime } from './event-meta.mjs'
import { snapshotNotes } from './snapshot-ledger.mjs'

const slug = value => value.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const cid = value => `sign-four-char-${slug(value)}`
const lid = value => `sign-four-loc-${slug(value)}`
const mid = value => `sign-four-map-${value}`
const iid = value => `sign-four-item-${value}`
const sameTitle = (a,b) => a.replace(/[’‘]/g,"'") === b.replace(/[’‘]/g,"'")
const eid = title => { const event = events.find(e => sameTitle(e.title,title)); if (!event) throw Error(`Unknown event ${title}`); return event.id }
const blobs = []
function image(path) {
  const file = new URL(`../../${path}`, import.meta.url)
  if (!fs.existsSync(file)) return null
  const id = `sign-four-image-${slug(path)}`
  blobs.push({ ...stamp, id, mimeType: 'image/png', url: path })
  return id
}
function dimensions(path) {
  const bytes = fs.readFileSync(new URL(`../../${path}`, import.meta.url))
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)]
}
const mapSize = new Map(maps.map(([key]) => [key, dimensions(`library/sign-of-the-four/maps/${key}.png`)]))
const mapLayers = maps.map(([key, parent, name, description, levelGroup, levelIndex, levelLabel], index) => {
  const [imageWidth, imageHeight] = mapSize.get(key)
  return { ...stamp, id: mid(key), name, description, parentMapId: parent ? mid(parent) : null,
    imageId: image(`library/sign-of-the-four/maps/${key}.png`), imageWidth, imageHeight,
    scalePixelsPerUnit: null, scaleUnit: null, levelGroupId: levelGroup ? `sign-four-levels-${levelGroup}` : null,
    levelIndex: levelIndex ?? 0, levelLabel: levelLabel ?? '' }
})
const locationMarkers = locations.map(([name, map, x, y, description, linked]) => {
  const [width, height] = mapSize.get(map)
  return { ...stamp, id: lid(name), name, description, mapLayerId: mid(map), linkedMapLayerId: linked ? mid(linked) : null,
    x: Math.round(x * width / 1400), y: Math.round(y * height / 1000), iconType: linked ? 'building' : 'landmark',
    imageId: image(`library/sign-of-the-four/art/locations/${slug(name)}.png`), tags: [], factionId: null }
})
const characters = characterDefs.map(([name, description]) => ({ ...stamp, id: cid(name), name, aliases: [],
  nameChanges: name === 'The bare-footed accomplice' ? [{ name: 'Tonga', eventId: eid('Small in Custody') }] : [],
  revealedAs: name === 'The old sailor' ? { characterId: cid('Sherlock Holmes'), eventId: eid('Holmes Revealed') } : undefined,
  description: name === 'The bare-footed accomplice' ? 'A small figure seen with the fugitives on the Aurora.' : description,
  color: '#695b4f', portraitImageId: image(`library/sign-of-the-four/art/characters/${slug(name)}.png`),
  isAlive: !['Bartholomew Sholto', 'The bare-footed accomplice', 'Captain Arthur Morstan', 'Major John Sholto', 'Achmet'].includes(name), birthDate: null, tags: [] }))
const itemDefs = [
  ['pearls', 'The anonymous pearls', 'One pearl arrives for Mary each year without a sender’s name.', 'jewelry'],
  ['morstan-letter', 'Mary’s invitation', 'A letter asks Mary to come to the Lyceum with two trusted companions.', 'document'],
  ['agra-plan', 'The Agra treasure plan', 'A marked diagram found among Captain Morstan’s effects bears the sign of four.', 'document'],
  ['poisoned-thorn', 'The poisoned thorn', 'A small pointed weapon found at Bartholomew’s death scene.', 'weapon'],
  ['wooden-leg', 'Small’s wooden leg', 'The prosthesis leaves a distinctive track at Pondicherry Lodge.', 'other'],
  ['creasote-bottle', 'Creasote trace', 'The strong scent on the escape route gives Toby a trail to follow.', 'other'],
  ['iron-chest', 'The Agra iron chest', 'The elaborate locked box at the heart of the treasure dispute.', 'container'],
  ['aurora-launch', 'The Aurora', 'Mordecai Smith’s black steam launch with two red stripes.', 'vehicle'],
]
const items = itemDefs.map(([key, name, description, iconType]) => ({ ...stamp, id: iid(key), name, description, iconType,
  isCollective: key === 'pearls' || key === 'creasote-bottle', imageId: image(`library/sign-of-the-four/art/items/${key}.png`), tags: [] }))
const characterSnapshots = []
let previousTime = null
for (let chapterIndex = 0; chapterIndex < meta.length; chapterIndex++) {
  const chapterEvents = events.filter(e => e.chapterId === chapters[chapterIndex].id)
  if (chapterEvents.length !== meta[chapterIndex].length) throw Error(`Metadata mismatch at chapter ${chapterIndex + 1}`)
  for (const [sceneIndex, event] of chapterEvents.entries()) {
    const [place, cast, tension] = meta[chapterIndex][sceneIndex]
    const location = locationMarkers.find(x => x.name === place)
    if (!location) throw Error(`Unknown location ${place}`)
    const names = cast.split(' ').map(code => codes[code])
    if (names.some(name => !name)) throw Error(`Unknown character code at ${event.title}`)
    const time = sceneTime(chapterIndex + 1, sceneIndex)
    event.locationMarkerId = location.id
    event.involvedCharacterIds = names.map(cid)
    event.tension = tension
    event.inWorldTime = time
    event.travelDays = previousTime === null ? 0 : Math.max(0, time - previousTime)
    event.povCharacterId = names.includes('Dr. John Watson') ? cid('Dr. John Watson') : null
    if (time < (previousTime ?? time)) throw Error(`Calendar goes backward at ${event.title}`)
    previousTime = time
    for (const [castIndex, name] of names.entries()) {
      const snapshotPlace = ['Jonathan Small', 'The bare-footed accomplice', 'Mordecai Smith'].includes(name) && chapterIndex === 9 && sceneIndex >= 4
        ? locationMarkers.find(x => x.name === 'Aurora') : location
      const status = snapshotNotes[event.title.replace(/[’‘]/g,"'")]?.[cast.split(' ')[castIndex]]
      if (!status) throw Error(`Missing individual snapshot note: ${event.title} / ${name}`)
      const inventory = []
      if (name === 'Mary Morstan' && chapterIndex === 1 && sceneIndex >= 3) inventory.push(iid('morstan-letter'))
      if (name === 'Mary Morstan' && chapterIndex === 2 && sceneIndex >= 1) inventory.push(iid('agra-plan'))
      if (name === 'Jonathan Small' && chapterIndex >= 9) inventory.push(iid('wooden-leg'))
      if (name === 'Dr. John Watson' && (chapterIndex === 10 && sceneIndex >= 1 || chapterIndex === 11 && sceneIndex === 0)) inventory.push(iid('iron-chest'))
      characterSnapshots.push({ ...stamp, id: `sign-four-snapshot-${event.sortOrder}-${slug(name)}`,
        characterId: cid(name), eventId: event.id, isAlive: name !== 'Bartholomew Sholto' && !(name === 'The bare-footed accomplice' && chapterIndex === 9 && sceneIndex === 5),
        currentLocationMarkerId: snapshotPlace.id, currentMapLayerId: snapshotPlace.mapLayerId,
        inventoryItemIds: inventory, inventoryNotes: inventory.length ? `Carrying ${inventory.map(id=>itemDefs.find(def=>iid(def[0])===id)?.[1]).join(' and ')}.` : '', travelModeId: null, sortKey: event.sortOrder + castIndex / 100,
        statusNotes: status })
    }
  }
}
const plotThreads = [
  ['morstan', 'Captain Morstan’s Disappearance', 'Mary asks what happened to her father after he returned from India.'],
  ['treasure', 'The Agra Treasure', 'A hidden box and a divided claim bring the Sholtos and Small into conflict.'],
  ['pursuit', 'The Thames Pursuit', 'The search for a steam launch carries Holmes’s inquiry to the river.'],
  ['watson', 'Watson and Mary', 'Watson’s growing attachment unfolds alongside the investigation.'],
].map(([key, name, description]) => ({ ...stamp, id: `sign-four-thread-${key}`, name, description, color: '#735b43', status: 'active', tags: [] }))
const motifs = [
  ['four', 'The sign of four', 'A mark binds four men to a contested treasure.'],
  ['trace', 'Traces and deductions', 'Watch marks, footprints and scent convert small observations into leads.'],
  ['river', 'The Thames', 'The river first conceals and then exposes the fugitives’ route.'],
].map(([key, name, description]) => ({ ...stamp, id: `sign-four-motif-${key}`, name, description, color: '#6b7268', tags: [] }))
for (const event of events) {
  const chapter = chapters.find(x => x.id === event.chapterId).number
  event.threadIds = [chapter <= 5 ? 'morstan' : '', chapter >= 3 ? 'treasure' : '', chapter >= 8 && chapter <= 11 ? 'pursuit' : '', /Mary|Watson|Camberwell|Chest Is Empty|Watson Speaks/.test(event.title) ? 'watson' : ''].filter(Boolean).map(key => `sign-four-thread-${key}`)
  event.motifIds = [/sign|four|treasure|Agra|Pearl|Chest/.test(event.title) ? 'four' : '', /Deduction|Watch|Print|Foot|Trace|Trail|Scent|thorn|marks/i.test(event.title) ? 'trace' : '', chapter >= 8 && chapter <= 11 ? 'river' : ''].filter(Boolean).map(key => `sign-four-motif-${key}`)
}
for (const [title,names] of [
  ['A Missing Father',['Captain Arthur Morstan']],
  ["Holmes's First Lead",['Major John Sholto']],
  ['The Indian Diagram',['Jonathan Small']],
  ['Thaddeus Sholto',['Bartholomew Sholto']],
  ["The Major's Fear",['Major John Sholto']],
  ["Morstan's Fate",['Captain Arthur Morstan','Major John Sholto']],
  ["The Face at the Window",['Major John Sholto']],
  ["Mrs. Smith's Account",['Mordecai Smith']],
  ['Small in Custody',['The bare-footed accomplice']],
  ["A Proposal at the Gate",['Abdullah Khan','Mahomet Singh','Dost Akbar']],
  ["Achmet's Journey",['Achmet']],
  ['The Killing',['Achmet']],
  ['After the Case',['Lal Rao']],
]) events.find(event=>event.id===eid(title)).mentionedCharacterIds.push(...names.map(cid))
const relationships = [
  ['Sherlock Holmes', 'Dr. John Watson', 'Friends and flatmates', 'positive', 'They share rooms and investigate cases together.', 'Holmes at Rest'],
  ['Dr. John Watson', 'Mary Morstan', 'A growing attachment', 'positive', 'Watson is drawn to Mary while helping with her case.', 'Miss Morstan Arrives'],
  ['Mary Morstan', 'Thaddeus Sholto', 'Claimant and informant', 'mixed', 'Thaddeus holds information about Mary’s father and the pearls.', 'Thaddeus Sholto'],
  ['Thaddeus Sholto', 'Bartholomew Sholto', 'Brothers', 'mixed', 'The two brothers disagree over the handling of their father’s treasure.', 'Thaddeus Sholto'],
  ['Sherlock Holmes', 'Athelney Jones', 'Rival investigators', 'mixed', 'Jones challenges Holmes’s account of the Pondicherry Lodge evidence.', 'Athelney Jones'],
  ['Jonathan Small', 'The bare-footed accomplice', 'Fugitive companions', 'positive', 'Small identifies the fallen figure as Tonga, his travelling companion.', 'Small in Custody'],
  ['Mordecai Smith', 'Mrs. Smith', 'Husband and wife', 'positive', 'Mrs. Smith waits at the wharf while Mordecai takes the Aurora away.', 'Mrs. Smith’s Account'],
  ['Sherlock Holmes', 'Wiggins', 'Investigator and scout', 'positive', 'Holmes hires Wiggins and the street boys to search the river.', 'The Irregulars'],
  ['Mary Morstan', 'Captain Arthur Morstan', 'Daughter and missing father', 'positive', 'Mary seeks the father who failed to meet her after his return from India.', 'A Missing Father'],
  ['Captain Arthur Morstan', 'Major John Sholto', 'Former army colleagues', 'mixed', 'Their service in India and dispute over a treasure bind their histories.', "Holmes's First Lead"],
  ['Major John Sholto', 'Thaddeus Sholto', 'Father and son', 'mixed', 'Thaddeus inherited his father’s silence and fear about the Agra treasure.', 'Thaddeus Sholto'],
  ['Major John Sholto', 'Bartholomew Sholto', 'Father and son', 'mixed', 'Bartholomew searched their father’s estate for the hidden chest.', 'Thaddeus Sholto'],
  ['Jonathan Small', 'Abdullah Khan', 'Partners in the Agra agreement', 'mixed', 'Abdullah drew Small into the four men’s pact at the fort.', 'A Proposal at the Gate'],
  ['Jonathan Small', 'Mahomet Singh', 'Partners in the Agra agreement', 'mixed', 'Mahomet Singh guarded the gate for the conspiracy.', 'A Proposal at the Gate'],
  ['Jonathan Small', 'Dost Akbar', 'Partners in the Agra agreement', 'mixed', 'Dost Akbar shared the treasure claim of the four men.', 'A Proposal at the Gate'],
].map(([a,b,label,sentiment,description,start],i)=>({...stamp,id:`sign-four-relationship-${i+1}`,characterAId:cid(a),characterBId:cid(b),label,sentiment,description,strength:6,isBidirectional:true,startEventId:eid(start)}))
const relationshipSnapshots = [
  [1,'The Chest Is Empty','Hope without a fortune','positive','The lost jewels remove the obstacle Watson feared between him and Mary.',8],
  [1,'Watson Speaks','Love declared','positive','Watson speaks plainly of his feelings and Mary accepts him.',10],
  [4,'A Plan for the River','Cooperation','positive','Jones accepts Holmes’s river plan and provides the police launch.',7],
  [5,'Small in Custody','Parted by death','negative','Small names Tonga as his companion and reports his loss in the pursuit.',1],
  [1,'Watson Speaks','Engaged','positive','Watson and Mary choose to marry after the case.',10],
  [3,'Bartholomew Found','Brother lost','negative','Thaddeus finds Bartholomew dead in the chamber.',1],
].map(([index,title,label,sentiment,description,strength],i)=>({...stamp,id:`sign-four-relationship-state-${i+1}`,relationshipId:relationships[index].id,eventId:eid(title),label,sentiment,description,strength,isActive:i!==3,sortKey:i}))
const factDefs = [
  ['morstan', 'Captain Morstan disappeared after his return', 'Mary recounts the disappearance that brought her to Holmes.', 'A Missing Father', ['Mary Morstan','Sherlock Holmes','Dr. John Watson']],
  ['pearls', 'Anonymous pearls arrive yearly', 'Mary describes the annual gifts that follow her father’s disappearance.', 'The Pearls', ['Mary Morstan','Sherlock Holmes','Dr. John Watson']],
  ['morstan-fate', 'Morstan died in Major Sholto’s presence', 'Thaddeus describes what his father concealed from Mary.', 'Morstan’s Fate', ['Thaddeus Sholto','Mary Morstan','Sherlock Holmes','Dr. John Watson']],
  ['treasure', 'The Sholtos found the Agra treasure', 'Thaddeus reports that Bartholomew located the hidden chest.', 'A Pearl Each Year', ['Thaddeus Sholto','Mary Morstan','Sherlock Holmes','Dr. John Watson']],
  ['bartholomew', 'Bartholomew has been killed', 'The locked room reveals the death and the written sign.', 'Bartholomew Found', ['Sherlock Holmes','Dr. John Watson','Thaddeus Sholto']],
  ['small', 'A wooden-legged man fled the chamber', 'The impressions point to an intruder with a wooden leg.', 'The Window Marks', ['Sherlock Holmes','Dr. John Watson']],
  ['tonga', 'The second intruder had small bare feet', 'Holmes distinguishes the accomplice’s marks on the roof route.', 'Above the Chamber', ['Sherlock Holmes','Dr. John Watson']],
  ['aurora', 'The fugitives used the Aurora', 'The boatman’s wife identifies the launch taken from the wharf.', 'Mrs. Smith’s Account', ['Mrs. Smith','Sherlock Holmes','Dr. John Watson']],
  ['sailor', 'The old sailor is Holmes', 'The visitor takes off his disguise in Baker Street.', 'Holmes Revealed', ['Sherlock Holmes','Dr. John Watson','Athelney Jones']],
  ['accomplice', 'The bare-footed accomplice was Tonga', 'Small gives the name of the man who fired from the Aurora.', 'Small in Custody', ['Jonathan Small','Sherlock Holmes','Dr. John Watson','Athelney Jones']],
  ['empty', 'The iron chest is empty', 'Mary and Watson find that the jewels are gone.', 'The Chest Is Empty', ['Mary Morstan','Dr. John Watson']],
  ['small-account', 'Small explains the four men’s claim', 'Small recounts the Agra conspiracy and the later betrayal.', 'The Case Explained', ['Jonathan Small','Sherlock Holmes','Dr. John Watson','Athelney Jones']],
]
const knowledgeFacts = factDefs.map(([key,title,description,at])=>({...stamp,id:`sign-four-fact-${key}`,title,description,readerLearnsAtEventId:eid(at),originEventId:eid(at),tags:[]}))
knowledgeFacts.find(x=>x.id==='sign-four-fact-morstan-fate').tags.push(`offstage-death:${cid('Captain Arthur Morstan')}`)
knowledgeFacts.push({...stamp,id:'sign-four-fact-major-death',title:'Major Sholto dies before completing his confession',description:'Thaddeus recounts the major’s death after a frightening face appears at the window.',readerLearnsAtEventId:eid('The Face at the Window'),originEventId:eid('The Face at the Window'),tags:[`offstage-death:${cid('Major John Sholto')}`]})
knowledgeFacts.push({...stamp,id:'sign-four-fact-achmet-death',title:'Achmet is killed at Agra Fort',description:'Small admits that the merchant carrying the chest was murdered inside the fort.',readerLearnsAtEventId:eid('The Killing'),originEventId:eid('The Killing'),tags:[`offstage-death:${cid('Achmet')}`]})
knowledgeFacts.push({...stamp,id:'sign-four-fact-tonga-death',title:'Tonga died in the river pursuit',description:'Small names the fallen accomplice after the chase.',readerLearnsAtEventId:eid('Small in Custody'),originEventId:eid('Small in Custody'),tags:[`offstage-death:${cid('The bare-footed accomplice')}`]})
const knowledgeReveals = factDefs.flatMap(([key,, ,at,who])=>who.map(name=>({...stamp,id:`sign-four-reveal-${key}-${slug(name)}`,factId:`sign-four-fact-${key}`,characterId:cid(name),eventId:eid(at),note:'Learned through the scene’s account or direct observation.'})))
for (const [fact,title,names] of [
  ['major-death','The Face at the Window',['Thaddeus Sholto','Mary Morstan','Sherlock Holmes','Dr. John Watson']],
  ['achmet-death','The Killing',['Jonathan Small','Sherlock Holmes','Dr. John Watson','Athelney Jones']],
  ['tonga-death','Small in Custody',['Jonathan Small','Sherlock Holmes','Dr. John Watson','Athelney Jones']],
]) for (const name of names) knowledgeReveals.push({...stamp,id:`sign-four-reveal-${fact}-${slug(name)}`,factId:`sign-four-fact-${fact}`,characterId:cid(name),eventId:eid(title),note:'The death is reported in the narrated account.'})
const factions = [
  ['baker','Baker Street Circle','Holmes, Watson and their helpers pursuing the case.','#5d686d'],
  ['sholto','Sholto Household','The family, servants and guard at Pondicherry Lodge.','#79634d'],
  ['yard','Scotland Yard','The police authority involved in the murder inquiry and river pursuit.','#405767'],
  ['four','The Four','Men bound by the Agra treasure agreement.','#665046'],
].map(([key,name,description,color])=>({...stamp,id:`sign-four-faction-${key}`,name,description,color,tags:[],coverImageId:null}))
const factionMemberships = [
  ['baker','Sherlock Holmes','Consulting detective','Holmes at Rest'],['baker','Dr. John Watson','Companion','Holmes at Rest'],['baker','Wiggins','Scout','The Irregulars'],
  ['sholto','Thaddeus Sholto','Son','Thaddeus Sholto'],['sholto','Bartholomew Sholto','Son','Bartholomew Found'],['sholto','Mrs. Bernstone','Housekeeper','Mrs. Bernstone'],['sholto','McMurdo','Gatekeeper','The Guarded Gate'],
  ['yard','Athelney Jones','Detective','Athelney Jones'],['four','Jonathan Small','Member','A Proposal at the Gate'],
  ['four','Abdullah Khan','Member','A Proposal at the Gate'],['four','Mahomet Singh','Member','A Proposal at the Gate'],['four','Dost Akbar','Member','A Proposal at the Gate'],
].map(([key,name,role,start],i)=>({...stamp,id:`sign-four-membership-${i+1}`,factionId:`sign-four-faction-${key}`,characterId:cid(name),role,startEventId:eid(start),endEventId:name==='Bartholomew Sholto'?eid('Bartholomew Found'):null,notes:''}))
const characterGoals = [
  ['Mary Morstan','Learn what happened to her father and why the pearls came','Miss Morstan Arrives','Morstan’s Fate'],
  ['Sherlock Holmes','Identify the intruders and recover the Agra chest','Bartholomew Found','Small in Custody'],
  ['Dr. John Watson','Help Mary safely and understand his feelings for her','Miss Morstan Arrives','Watson Speaks'],
  ['Jonathan Small','Recover the Agra treasure from the Sholtos','The Aurora Runs','Small in Custody'],
  ['Athelney Jones','Solve the murder and arrest those responsible','Athelney Jones','Small in Custody'],
].map(([name,text,start,end],i)=>({...stamp,id:`sign-four-goal-${i+1}`,characterId:cid(name),type:'primary',text,startEventId:eid(start),endEventId:eid(end)}))
const mapRoutes = [
  ['south','Southward carriage journey','london',['Baker Street','Lyceum Theatre','South London carriage road','Thaddeus’s house','Pondicherry Lodge'],'trail'],
  ['lodge-ground','The lodge grounds and approach','pondicherry',['Lodge gate','Lodge grounds','Housekeeper’s room','Lodge boundary wall'],'trail'],
  ['lodge-upper','The upper passage to Bartholomew’s chamber','pondicherry-upper',['Upper passage','Bartholomew’s chamber'],'trail'],
  ['scent','Toby follows the scent','london',['Pondicherry Lodge','South London trail','Timber yard','The Thames'],'trail'],
  ['river','The river pursuit','thames',['Westminster Stairs','Jacobson’s Yard','Police launch','Aurora'],'trail'],
].map(([key,name,map,points,routeType])=>({...stamp,id:`sign-four-route-${key}`,mapLayerId:mid(map),name,routeType,waypoints:points.map(lid),color:'#8a6850',notes:'Interpretive itinerary; distances and floor dimensions are editorial approximations.'}))
const itemEvents = [
  ['pearls','The Pearls'],['morstan-letter','An Invitation'],['agra-plan','The Indian Diagram'],
  ['poisoned-thorn','A Poisoned Thorn'],['wooden-leg','The Window Marks'],['creasote-bottle','The Creasote Trace'],
  ['iron-chest','The Missing Treasure'],['iron-chest','The Iron Chest Arrives'],['iron-chest','The Chest Is Empty'],['iron-chest','Back at Baker Street'],
  ['aurora-launch','The Aurora'],['aurora-launch','The Aurora Runs'],
]
const itemPlacements = itemEvents.map(([key,title],i)=>{const event=events.find(e=>e.id===eid(title));event.involvedItemIds.push(iid(key));return {...stamp,id:`sign-four-placement-${i+1}`,itemId:iid(key),eventId:event.id,locationMarkerId:event.locationMarkerId,sortKey:i,notes:`The ${itemDefs.find(def=>def[0]===key)[1]} is observed or discussed at this point.`}})
const locationSnapshots = [
  ['Jacobson’s Yard','Across the Thames','Named from the river','Holmes points out the repair yard while the launch draws near.'],
  ['Aurora','The Aurora Runs','Seen under way','The black steam launch comes into view and flees downriver.'],
  ['Vauxhall landing','The Iron Chest Arrives','Watson disembarks','Watson lands here with the iron chest before the carriage journey to Camberwell.'],
].map(([place,title,status,notes],i)=>({...stamp,id:`sign-four-place-state-${i+1}`,locationMarkerId:lid(place),eventId:eid(title),sortKey:events.find(e=>e.id===eid(title)).sortOrder,status,notes}))
for (const [title,beat] of [['Miss Morstan Arrives','hook'],['An Invitation','inciting-incident'],['Bartholomew Found','plot-point-1'],['At the River','midpoint'],['The Aurora Runs','plot-point-2'],['Shots at Close Range','climax'],['Watson Speaks','resolution']]) events.find(event=>event.id===eid(title)).structureBeat=beat
const loreCategoryId='sign-four-lore-edition'
const data = {
  version:18,type:'world',exportedAt:stamp.createdAt,
  world:{...stamp,id:worldId,name:'The Sign of the Four',description:'A London mystery draws Holmes and Watson from an unexplained disappearance to a contested Indian treasure and a pursuit down the Thames.',coverImageId:image('library/sign-of-the-four/art/world.png'),theme:'theme-noir',readingMode:true,continuityStaleThreshold:5,wordTarget:wordCount(retainedText),calendar:{startYear:1888,yearSuffix:'',months:[{name:'January',days:31},{name:'February',days:29},{name:'March',days:31},{name:'April',days:30},{name:'May',days:31},{name:'June',days:30},{name:'July',days:31},{name:'August',days:31},{name:'September',days:30},{name:'October',days:31},{name:'November',days:30},{name:'December',days:31}]}},
  timelines:[{...stamp,id:timelineId,name:'The Sign of the Four',description:'Twelve source chapters in narrative order.',color:'#6b5543',dayOffset:0}],
  chapters,events,sceneTexts,mapLayers,locationMarkers,characters,characterSnapshots,items,itemPlacements,locationSnapshots,blobs,relationships,relationshipSnapshots,plotThreads,motifs,knowledgeFacts,knowledgeReveals,factions,factionMemberships,characterGoals,mapRoutes,
  loreCategories:[{...stamp,id:loreCategoryId,name:'Edition and Method',color:'#665347',sortOrder:0}],
  lorePages:[
    {...stamp,id:'sign-four-lore-source',categoryId:loreCategoryId,title:'Source Edition',body:`${sourceEdition}. ${sourceUrl}. SHA-256: ${sourceSha256}. First published in 1890. The Project Gutenberg catalogue marks the text public domain in the United States. The twelve narrative chapters and their headings are retained in full; the Gutenberg header, displayed title/byline, contents list, end marker and licence are excluded.`,visibleFromEventId:events[0].id,tags:[],coverImageId:null,linkedEntityIds:[]},
    {...stamp,id:'sign-four-lore-calendar',categoryId:loreCategoryId,title:'Editorial Calendar',body:'The invitation envelope is postmarked 7 July, while the journey it prompts is described as a September evening. This edition follows the witnessed September setting and uses 1888 as an editorial year to provide a navigable calendar. Exact dates and gaps are approximate.',visibleFromEventId:events[0].id,tags:[],coverImageId:null,linkedEntityIds:[]},
    {...stamp,id:'sign-four-lore-maps',categoryId:loreCategoryId,title:'Map Method',body:'The London and Thames charts represent the narrated route approximately. Baker Street and the Lodge plans are invented from described movement, not surveyed architecture. The Lodge’s three aligned views show its grounds, upper storey and roof; their dimensions are editorial approximations.',visibleFromEventId:events[0].id,tags:[],coverImageId:null,linkedEntityIds:[]},
    {...stamp,id:'sign-four-lore-art',categoryId:loreCategoryId,title:'Artwork Provenance',body:'The cover, character portraits, item studies, place paintings and six navigable maps were created with OpenAI imagegen for this edition. They accompany Arthur Conan Doyle’s public-domain text as new illustrations.',visibleFromEventId:events[0].id,tags:[],coverImageId:null,linkedEntityIds:[]},
    {...stamp,id:'sign-four-lore-disguise',categoryId:loreCategoryId,title:'The Old Sailor',body:'The elderly caller in Baker Street is Holmes in disguise. The visitor’s character card is revealed as Holmes at the unmasking scene.',visibleFromEventId:eid('Holmes Revealed'),tags:[],coverImageId:null,linkedEntityIds:[]},
    {...stamp,id:'sign-four-lore-tonga',categoryId:loreCategoryId,title:'Tonga Revealed',body:'Small names the figure seen aboard the Aurora as Tonga. He identifies the companion who fled Pondicherry Lodge with him.',visibleFromEventId:eid('Small in Custody'),tags:[],coverImageId:image('library/sign-of-the-four/art/characters/tonga.png'),linkedEntityIds:[cid('The bare-footed accomplice')]},
    {...stamp,id:'sign-four-lore-frame',categoryId:loreCategoryId,title:'Small’s Spoken Account',body:'Small tells the history of Agra and the Andaman Islands while speaking at Baker Street. The distant places and companions enter the story through his account.',visibleFromEventId:eid("Small's Early Life"),tags:[],coverImageId:null,linkedEntityIds:[]},
  ]
}
for (const key of ['characterMovements','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships','continuitySuppressions','writingLogs','sceneRevisions']) data[key]=[]
const output=process.argv.includes('--publish')?'../../library/sign-of-the-four.pwk':'./draft.pwk'
fs.writeFileSync(new URL(output,import.meta.url),JSON.stringify(data,null,2)+'\n')
console.log(JSON.stringify({chapters:chapters.length,events:events.length,scenes:sceneTexts.length,words:wordCount(retainedText),snapshots:characterSnapshots.length,missingImages:locationMarkers.filter(x=>!x.imageId).length},null,2))
