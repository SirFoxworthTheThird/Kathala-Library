import {compileInventory} from './compile-inventory.mjs'
import {compileReadingNotes} from './compile-reading-notes.mjs'
import {compileChronology} from './compile-chronology.mjs'
import {compileTension} from './tension-review.mjs'
import {createHash} from 'node:crypto'
// Build the deterministic review candidate outside library/. --release packages
// these exact bytes only after hash-bound source and application approvals.
import fs from 'node:fs'
import assert from 'node:assert/strict'
import {validateManuscript} from './manuscript-validation.mjs'
import {reviewedChapters} from './scene-review.mjs'
import {characters,canonicalCast} from './character-ledger.mjs'
import {locationDefinitions,locationAliases,mapDefinitions} from './location-ledger.mjs'
import {items,itemEventEvidence} from './item-ledger.mjs'
import {compileKnowledge} from './compile-knowledge.mjs'
import {compileSupporting} from './compile-supporting.mjs'
import {mapCoordinates} from './map-coordinates.mjs'
import {cutKey} from './scene-ranges.mjs'
import {mapReaderCopy} from './map-reader-copy.mjs'
import {locationStates} from './location-state-ledger.mjs'
import {exactSourceEvent} from './source-anchors.mjs'

const book=new URL('./',import.meta.url),root=new URL('../../',import.meta.url)
const w=JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk',book),'utf8'))
validateManuscript(w)
const stamp={worldId:w.world.id,createdAt:w.exportedAt,updatedAt:w.exportedAt}
const id=(kind,key)=>`ivanhoe-${kind}-${key}`
const art=JSON.parse(fs.readFileSync(new URL('./asset-manifest.json',book),'utf8'))
const maps=JSON.parse(fs.readFileSync(new URL('./map-manifest.json',book),'utf8'))
function image(row){
  if(!row)return null
  const imageId=id('image',row.compressed.path.replace(/[^a-zA-Z0-9-]/g,'-'))
  const assetPath=`library/ivanhoe/art/generated/${row.compressed.path.includes('/map-reviewed/')?'maps/':''}${row.id}.webp`
  const destination=new URL(assetPath,root)
  fs.mkdirSync(new URL('./',destination),{recursive:true})
  fs.copyFileSync(new URL(row.compressed.path,root),destination)
  if(!w.blobs.some(b=>b.id===imageId))w.blobs.push({...stamp,id:imageId,mimeType:'image/webp',url:assetPath})
  return imageId
}
w.world.coverImageId=image(art.assets.find(a=>a.id==='cover'))
w.world.name=process.argv.includes('--candidate')||process.argv.includes('--release')?'Ivanhoe':'Ivanhoe — incomplete authoring review'
w.mapLayers=mapDefinitions.map(m=>{
  const asset=maps.maps.find(a=>a.id===m.key)
  assert.ok(mapReaderCopy[m.key],`First-encounter map description ${m.key}`)
  return {...stamp,id:id('map',m.key),parentMapId:m.parent?id('map',m.parent):null,name:m.name,description:mapReaderCopy[m.key],imageId:image(asset),imageWidth:asset?.compressed.width??1400,imageHeight:asset?.compressed.height??900,scalePixelsPerUnit:null,scaleUnit:null,levelGroupId:m.levelGroup?id('level-group',m.levelGroup):null,levelIndex:m.levelIndex??0,levelLabel:m.levelLabel??''}
})
// Unplaced is an honest supported app state. Never invent a coordinate grid
// simply to make the map-reference validator pass. Final map gates reject it.
w.locationMarkers=locationDefinitions.map(l=>{
  const coordinate=mapCoordinates[l.key]
  const map=coordinate?w.mapLayers.find(m=>m.id===id('map',coordinate.map)):null
  if(coordinate){
    assert.equal(coordinate.map,l.map,`Assigned place map ${l.key}`)
    assert.ok(map?.imageId,`Coordinates require a drawn map ${l.key}`)
    assert.ok(coordinate.x>=0&&coordinate.x<=map.imageWidth&&coordinate.y>=0&&coordinate.y<=map.imageHeight,`Image bounds ${l.key}`)
    if(coordinate.linked)assert.equal(w.mapLayers.find(m=>m.id===id('map',coordinate.linked))?.parentMapId,map.id,`Gateway parent ${l.key}`)
  }
  return {...stamp,id:id('place',l.key),name:l.name,description:l.description,mapLayerId:map?.id??null,linkedMapLayerId:coordinate?.linked?id('map',coordinate.linked):null,x:coordinate?.x??0,y:map?map.imageHeight-coordinate.y:0,imageId:image(art.assets.find(a=>a.entity===`place:${l.key}`)),iconType:coordinate?.linked?'building':'landmark',tags:[],factionId:null}
})
w.characters=characters.map(c=>({...stamp,id:id('character',c.key),name:c.name,aliases:c.aliases,nameChanges:c.nameChanges,aliasesFrom:c.aliasesFrom,...(c.revealedAs?{revealedAs:{characterId:id('character',c.revealedAs.key),eventId:c.revealedAs.eventId}}:{}),description:c.description,portraitImageId:image(art.assets.find(a=>a.id===c.portraitAsset)),tags:c.tags??[],isAlive:true,color:'#795b37',birthDate:null}))
w.items=items.map(i=>({...stamp,id:id('item',i.key),name:i.name,description:i.description,iconType:'artifact',imageId:image(art.assets.find(a=>a.id===i.portraitAsset||a.entity===`item:${i.key}`)),tags:[],isCollective:false}))
for(const evidence of itemEventEvidence){
  const row=reviewedChapters.find(c=>c.chapter===evidence.chapter)?.scenes.filter(s=>s.from===evidence.from)[evidence.part??0]
  assert.ok(row,`Item source beat ${evidence.source}`)
  assert.equal(row.title,evidence.title,`Item source sequence changed: ${evidence.source}`)
  const event=w.events.find(e=>e.id===`ivanhoe-source-${evidence.chapter+3}-${cutKey(row)}`)
  assert.ok(event,`Imported item event ${evidence.source}`)
  event.involvedItemIds=evidence.items.map(key=>{assert.ok(w.items.some(i=>i.id===id('item',key)));return id('item',key)})
}
const alive=new Map(),scenes=new Map(w.events.map(e=>[e.id,e]))
for(const state of locationStates){
  const event=scenes.get(exactSourceEvent(state.source))
  const placeId=id('place',state.place)
  assert.ok(w.locationMarkers.some(place=>place.id===placeId),`Condition place ${state.place}`)
  const chapter=w.chapters.find(chapter=>chapter.id===event.chapterId)
  w.locationSnapshots.push({...stamp,id:id('location-state',`${state.place}-${event.id}`),locationMarkerId:placeId,eventId:event.id,sortKey:chapter.number+event.sortOrder/1_000_000,status:state.status,notes:state.notes})
}
for(const chapter of reviewedChapters){
  for(const row of chapter.scenes){
    const event=scenes.get(`ivanhoe-source-${chapter.chapter+3}-${cutKey(row)}`)
    assert.ok(event,`Imported event ${chapter.chapter}:${row.from}`)
    const cast=canonicalCast(row)
    event.locationMarkerId=row.location?id('place',locationAliases[row.location]??row.location):null
    event.involvedCharacterIds=cast.map(c=>id('character',c.key))
    event.mentionedCharacterIds=(row.mentions??[]).map(key=>{assert.ok(characters.some(c=>c.key===key),`Mentioned source actor ${key}`);return id('character',key)})
    event.isFlashback=Boolean(row.isRecollection)
    // Exact source text remains the reader's prose. These descriptions are
    // only candidate event summaries and still require scene-adjacent review.
    event.description=cast.map(c=>c.status).join(' ')
    for(const person of cast){
      if(Object.hasOwn(person,'isAlive'))alive.set(person.key,person.isAlive)
      const placeId=person.location?id('place',locationAliases[person.location]??person.location):null
      w.characterSnapshots.push({...stamp,id:id('snapshot',`${chapter.chapter}-${cutKey(row).slice(1)}-${person.key}`),characterId:id('character',person.key),eventId:event.id,sortKey:chapter.chapter+3+event.sortOrder/1_000_000,isAlive:alive.get(person.key)??true,currentLocationMarkerId:placeId,currentMapLayerId:w.locationMarkers.find(l=>l.id===placeId)?.mapLayerId??null,inventoryItemIds:[],inventoryNotes:'',statusNotes:person.status,travelModeId:null})
    }
  }
}
for(const event of w.events){
  assert.ok(!event.locationMarkerId||w.locationMarkers.some(l=>l.id===event.locationMarkerId))
  for(const key of event.involvedCharacterIds)assert.equal(w.characterSnapshots.filter(s=>s.eventId===event.id&&s.characterId===key).length,1)
}
validateManuscript(w)
const knowledge=compileKnowledge(stamp)
w.knowledgeFacts=knowledge.knowledgeFacts
w.knowledgeReveals=knowledge.knowledgeReveals
for(const fact of w.knowledgeFacts)assert.ok(scenes.has(fact.readerLearnsAtEventId))
for(const reveal of w.knowledgeReveals)assert.ok(w.characters.some(c=>c.id===reveal.characterId)&&scenes.has(reveal.eventId))
const supporting=compileSupporting(stamp,w)
for(const key of ['relationships','relationshipSnapshots','characterGoals','factions','factionMemberships'])w[key]=supporting[key]
fs.writeFileSync(new URL('./qa/supporting-source-evidence.json',book),JSON.stringify({scope:'Source-led supporting records; affiliation exits and full reader QA remain open',evidence:supporting.evidence},null,2)+'\n')
const inventory=compileInventory(w,stamp)
const readingNotes=compileReadingNotes(stamp,w)
const chronology=compileChronology(w)
const pacing=compileTension(w)
fs.writeFileSync(new URL('./qa/tension-source-evidence.json',book),JSON.stringify({scope:'Editorial dramatic pressure compiler evidence; manual cut/presence approval recorded separately',...pacing,evidence:(await import('./tension-review.mjs')).tensionReview},null,2)+'\n')
fs.writeFileSync(new URL('./qa/chronology-source-evidence.json',book),JSON.stringify(chronology,null,2)+'\n')
fs.writeFileSync(new URL('./qa/thematic-source-evidence.json',book),JSON.stringify({scope:'Source-led thematic and reading-note compiler evidence; reader presentation approval recorded separately',evidence:readingNotes},null,2)+'\n')
fs.writeFileSync(new URL('./qa/inventory-source-evidence.json',book),JSON.stringify(inventory,null,2)+'\n')
fs.writeFileSync(new URL('./authoring-review.pwk',book),JSON.stringify(w,null,2)+'\n')
const report={status:'INCOMPLETE APP REVIEW FIXTURE; NOT A RELEASE',events:w.events.length,characters:w.characters.length,directSnapshots:w.characterSnapshots.length,unplacedLocations:w.locationMarkers.length,items:w.items.length,imageReferences:w.blobs.length,limitations:['Cast/scene endpoints still require exhaustive source review.','Locations are deliberately unplaced; map coordinates, gateways and floors are not implemented.','No custody, memberships, knowledge effects or relationships have been compiled.','Ordinal source-order times are manuscript placeholders, not historical chronology.','Artwork coverage is incomplete; no entity presentation has been approved in the app.','This fixture cannot be packaged or catalogued as a finished edition.']}
report.knowledge={compiledFacts:w.knowledgeFacts.length,compiledReveals:w.knowledgeReveals.length,pending:knowledge.pending}
report.inventory={actions:inventory.compiledActions,itemStates:inventory.compiledItemStates,placements:inventory.compiledPlacements,reportedRelinquishments:inventory.reportedRelinquishments,scope:inventory.scope}
report.artwork={selectedIllustrations:art.assets.length,finalApplicationApproved:art.assets.filter(asset=>asset.appReviewed).length,missingCharacterIllustrations:w.characters.filter(character=>!character.portraitImageId).length,missingLocationIllustrations:w.locationMarkers.filter(place=>!place.imageId).length,missingItemIllustrations:w.items.filter(item=>!item.imageId).length,scope:'Selected artwork covers every character, location and item; final reading-order and artifact approval remain open'}
const playbackPath=new URL('./qa/continuous-playback.json',book)
if(fs.existsSync(playbackPath)){
  const playback=JSON.parse(fs.readFileSync(playbackPath,'utf8'))
  const currentSha=createHash('sha256').update(fs.readFileSync(new URL('./authoring-review.pwk',book))).digest('hex')
  report.playbackEvidence={completed:playback.completed,total:playback.total,fixtureSha256:playback.fixtureSha256??null,matchesCurrentFixture:playback.fixtureSha256===currentSha,scope:playback.scope}
}
report.locationConditions=w.locationSnapshots.length
report.pacing=pacing
report.chronology={status:chronology.status,opening:chronology.opening,calendarMonths:w.world.calendar.months.length,scope:'Provisional source-led relative-day reconstruction with disclosed editorial dates/times; full temporal, pacing and calendar UI review remains open'}
report.limitations=report.limitations.map(s=>s==='Ordinal source-order times are manuscript placeholders, not historical chronology.'?'Provisional editorial calendar replaces ordinal fixture pins; final scene-clock review, narrative/recollection classification and calendar/pacing UI approval remain incomplete.':s)
report.unplacedLocations=w.locationMarkers.filter(l=>l.mapLayerId===null).length
report.maps={drawn:maps.maps.length,placedLocations:w.locationMarkers.length-report.unplacedLocations,gateways:w.locationMarkers.filter(l=>l.linkedMapLayerId).length,applicationReview:'Limited root-entry, Rotherwood, Ashby, country-house floors and hermitage fixture evidence; full playback and final review pending',fixtureEvidence:'scripts/ivanhoe/qa/map-navigation-review.json'}
report.maps.illustratedReplacements=maps.maps.filter(map=>map.illustration?.selected).length
report.maps.awaitingIllustratedReplacement=maps.maps.filter(map=>!map.illustration?.selected).map(map=>map.id)
report.limitations=report.limitations.map(s=>s==='Locations are deliberately unplaced; map coordinates, gateways and floors are not implemented.'?`${maps.maps.length}/${w.mapLayers.length} map layers are drawn; complete coordinate/gateway/floor review and full playback remain incomplete.`:s==='Artwork coverage is incomplete; no entity presentation has been approved in the app.'?'Selected artwork covers every entity; scoped fixture presentation checks do not approve final reading-order disclosure or the release artifact.':s)
report.limitations=report.limitations.map(s=>s==='No custody, memberships, knowledge effects or relationships have been compiled.'?`${inventory.compiledActions} source-reviewed custody actions compile; initial appearances, unresolved holdings and full inventory QA remain open. ${w.relationships.length} relationships/${w.relationshipSnapshots.length} changes, ${w.characterGoals.length} goals, ${w.factionMemberships.length} memberships and ${w.knowledgeFacts.length} knowledge facts compile. Affiliation exits, complete coverage and reader QA remain open.`:s)
if(fs.existsSync(new URL('./RELEASE_APPROVAL.json',book))){
  const {readReleaseApproval}=await import('./release-approval.mjs')
  readReleaseApproval(fs.readFileSync(new URL('./authoring-review.pwk',book)))
  report.status='SOURCE AND CANDIDATE APPLICATION REVIEW APPROVED; see LOCAL_RELEASE.json for final packaging gates'
  report.limitations=['Five source-unlocated sites remain unpinned.','Dates, times, fictional geography and interior geometry are disclosed editorial reconstruction.','Companion application fixes are local; no remote release is authorized.']
  report.artwork.scope='All304 selected ordinary illustrations reviewed original/compressed/actual-app; one intentional shared identity portrait.'
  report.maps.applicationReview='All30 plates,166 coordinates,26 gateways and all floor pairs manually reviewed;537-event playback complete.'
  report.chronology.scope='Source anchors, parallel strands, retrospective events,523 pressure ratings and actual calendar presentation reviewed.'
}
fs.writeFileSync(new URL('./REVIEW_WORLD_STATUS.json',book),JSON.stringify(report,null,2)+'\n')
if(!process.argv.includes('--quiet'))console.log(JSON.stringify(report,null,2))
if(process.argv.includes('--release'))await import('./package-release.mjs')
