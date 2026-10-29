import fs from 'node:fs'
import assert from 'node:assert/strict'
import{chapters,retained,countWords,retainedSha256}from './source-text.mjs'
import{enrichedReview,buildEnrichmentAudit}from './build-enrichment-audit.mjs'
import{characterIntroductions,characterNameChanges}from './character-ledger.mjs'
import{knownPersonLabels}from './reader-identities.mjs'
import{buildIdentityPlan}from './identity-plan.mjs'
import{buildMapRecords}from './map-records.mjs'
import{buildNarrativeRecords}from './narrative-records.mjs'
import{buildChronologyPlan,chronologyNote}from './chronology-plan.mjs'
import{buildPacingPlan,pacingNote}from './pacing-plan.mjs'
import{itemDefinitions,itemDiscoveries}from './item-ledger.mjs'
import{itemStateChanges}from './item-state-ledger.mjs'
import{applyReviewedPossessions}from './possession-spans.mjs'
import{relationshipDefinitions,relationshipChanges}from './relationships.mjs'
import{reportedDeaths,unequalKnowledge}from './continuity-ledger.mjs'
import{validateStagedArt}from './validate-staged-art.mjs'
import{addStoryFeatures}from './story-features.mjs'
import{addJourneys}from './journeys.mjs'

// Explicitly a namespaced local review fixture. The release generator and its
// remaining source, ordinary-art, feature and reading-mode gates are separate.
export function buildWorldReview({embedded=true}={}){
 const seed=JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk',import.meta.url),'utf8'))
 const worldId='les-miserables-world-review',prefix='lesmis-world-review',timelineId=`${prefix}-narrative`
 const stamp={worldId,createdAt:seed.exportedAt,updatedAt:seed.exportedAt}
 const id=(kind,key)=>`${prefix}-${kind}-${key}`,cid=key=>id('character',key),lid=key=>id('location',key)
 const world={version:seed.version,type:'world',exportedAt:seed.exportedAt}
 for(const[key,value]of Object.entries(seed))if(Array.isArray(value))world[key]=[]
 const review=enrichedReview(),audit=buildEnrichmentAudit(review)
 const chronology=buildChronologyPlan(review),pacing=buildPacingPlan(review)
 Object.assign(world,buildMapRecords(stamp,{embedded,idPrefix:prefix}))
 Object.assign(world,buildNarrativeRecords({stamp,timelineId,idPrefix:prefix,locations:world.locationMarkers,review,
  resolveTiming:({key})=>chronology.get(key),resolveTension:({key})=>pacing.get(key).tension}))
 const events=new Map(world.events.map(row=>[row.id,row]))
 const eventAt=(chapter,at)=>{
  const index=review.get(chapter)?.findIndex(row=>row.at===at)??-1
  assert.ok(index>=0,`Source cut required: ${chapter}/${at}`)
  return id('event',`${chapter}-${index+1}`)
 }
 const orderOf=eventId=>{
  const event=events.get(eventId);assert.ok(event,`Unknown source event: ${eventId}`)
  return Number(event.chapterId.slice(event.chapterId.lastIndexOf('-')+1))+event.sortOrder/1_000_000
 }
 world.chapters=chapters.map(chapter=>({...stamp,id:id('chapter',chapter.number),timelineId,
  number:chapter.number,title:chapter.title,synopsis:review.get(chapter.number)[0].description,
  notes:`Source volume ${chapter.volume}, book ${chapter.book}; authorial heading retained.`,
  wordGoal:countWords(chapter.text),sortOrder:chapter.number-1}))
 world.timelines=[{...stamp,id:timelineId,name:'Narrative order',description:'The five volumes in source order, including recollections, parallel accounts and historical digressions.',color:'#776049',dayOffset:0}]
 const accepted=new Set(JSON.parse(fs.readFileSync(new URL('./ART_ACCEPTANCE.json',import.meta.url),'utf8')).images.map(row=>row.target))
 const artStatus=validateStagedArt()
 const addArt=path=>{
  if(!accepted.has(path))return null
  const imageId=id('art',path.replace(/^art-staging\//,'').replace(/[^a-zA-Z0-9-]/g,'-'))
  if(!world.blobs.some(row=>row.id===imageId))world.blobs.push({...stamp,id:imageId,mimeType:'image/webp',
   ...(embedded?{dataBase64:fs.readFileSync(new URL(path,import.meta.url)).toString('base64')}:{url:path})})
  return imageId
 }
 world.characters=[...characterIntroductions.values()].map(row=>({...stamp,id:cid(row.key),name:row.name,
  aliases:[],description:row.description,portraitImageId:addArt(`art-staging/characters/${row.key}.webp`),
  color:'#795d67',birthDate:null,isAlive:true,tags:[]}))
 const characters=new Map(world.characters.map(row=>[row.id,row]))
 for(const[key,changes]of Object.entries(characterNameChanges))characters.get(cid(key)).nameChanges=changes.map(change=>({eventId:eventAt(change.chapter,change.at),name:change.name}))
 for(const label of knownPersonLabels){
  const character=characters.get(cid(label.character));assert.ok(character)
  if(label.name===character.name)continue
  if(!character.aliases.includes(label.name))character.aliases.push(label.name)
  character.aliasesFrom??=[]
  character.aliasesFrom.push({alias:label.name,eventId:eventAt(label.chapter,label.at)})
 }
 const identity=buildIdentityPlan(review)
 for(const link of identity.links)characters.get(cid(link.identity)).revealedAs={characterId:cid(link.character),eventId:id('event',link.event)}
 const nameAt=(key,eventId)=>{
  const character=characters.get(cid(key));assert.ok(character,`Unknown reader character: ${key}`)
  return (character.nameChanges??[]).filter(change=>orderOf(change.eventId)<=orderOf(eventId)).at(-1)?.name??character.name
 }
 const facts=new Map()
 const addFact=(key,title,description,eventId,tags=[])=>{
  const fact={...stamp,id:id('fact',key),title,description,tags,readerLearnsAtEventId:eventId,originEventId:null}
  assert.ok(!facts.has(key),`Repeated knowledge fact: ${key}`)
  facts.set(key,fact);world.knowledgeFacts.push(fact);return fact
 }
 for(const[index,fact]of identity.facts.entries()){
  const eventId=id('event',fact.event)
  addFact(`identity-${index}`,`${nameAt(fact.identity,eventId)} and ${nameAt(fact.character,eventId)}`,
   `${nameAt(fact.identity,eventId)} is the same person as ${nameAt(fact.character,eventId)}.`,eventId)
 }
 for(const fact of [...reportedDeaths,...unequalKnowledge]){
  const eventId=eventAt(fact.chapter,fact.at)
  const record=addFact(fact.key,fact.title,fact.description,eventId,reportedDeaths.includes(fact)?[`offstage-death:${cid(fact.character)}`]:[])
  if(fact.originAtScene)record.originEventId=eventId
  for(const[index,learning]of fact.learnings.entries())world.knowledgeReveals.push({...stamp,id:id('reveal',`${fact.key}-${index}`),
   factId:id('fact',fact.key),characterId:cid(learning.character),eventId:eventAt(learning.chapter,learning.at),note:learning.note})
 }
 for(const discovery of itemDiscoveries)addFact(discovery.key,discovery.title,discovery.description,eventAt(discovery.chapter,discovery.at))
 world.items=[...itemDefinitions.values()].map(row=>({...stamp,id:id('item',row.key),name:row.name,
  description:row.description,iconType:row.iconType,imageId:addArt(`art-staging/items/${row.key}.webp`),isCollective:row.isCollective,tags:[]}))
 for(const marker of world.locationMarkers){
  const key=marker.id.slice(`${prefix}-location-`.length)
  marker.imageId=addArt(`art-staging/locations/${key}.webp`)
 }
 // Custody and condition are distinct. Export the app's condition vocabulary,
 // carrying an established condition through later custody-only changes.
 const itemConditions=new Map(),conditionValues={burned:'destroyed',torn:'damaged','broken-open':'damaged',intact:'intact'}
 const orderedItemChanges=[...itemStateChanges].sort((a,b)=>orderOf(eventAt(a.chapter,a.at))-orderOf(eventAt(b.chapter,b.at)))
 for(const change of orderedItemChanges){
  const eventId=eventAt(change.chapter,change.at),itemId=id('item',change.item),sortKey=orderOf(eventId)
  if(change.condition){
   assert.ok(Object.hasOwn(conditionValues,change.condition),`Unmapped source item condition: ${change.condition}`)
   itemConditions.set(itemId,conditionValues[change.condition])
  }
  world.itemSnapshots.push({...stamp,id:id('item-state',change.key),itemId,eventId,sortKey,
   condition:itemConditions.get(itemId)??'unknown',notes:change.note})
  if(change.location)world.itemPlacements.push({...stamp,id:id('item-placement',change.key),itemId,eventId,sortKey,locationMarkerId:lid(change.location),notes:change.note})
  if(change.kind==='held'){
   const snapshot=world.characterSnapshots.find(row=>row.eventId===eventId&&row.characterId===cid(change.holder))
   assert.ok(snapshot,`Inventory requires a present holder: ${change.key}`)
   snapshot.inventoryItemIds.push(itemId)
   snapshot.inventoryNotes=[snapshot.inventoryNotes,change.note].filter(Boolean).join(' ')
  }
 }
 applyReviewedPossessions(world,{eventAt,orderOf,cid,id})
 const sentiments={devoted:'positive',loyal:'positive',warm:'positive',welcoming:'positive',allied:'complex',fond:'positive',close:'positive',
  unequal:'complex',uncertain:'complex',suspicious:'negative',helpful:'positive',tender:'positive',controlling:'complex',separated:'complex',
  generous:'positive',unrecognized:'neutral',dependent:'complex',conditional:'complex',merciful:'positive',fearful:'negative',painful:'complex',reconciled:'positive',bereaved:'complex'}
 const relationshipValues=row=>{
  assert.ok(Object.hasOwn(sentiments,row.sentiment),`Unmapped relationship sentiment: ${row.sentiment}`)
  assert.ok(Number.isFinite(row.strength)&&row.strength>=0&&row.strength<=10)
  return{label:row.label,description:row.description,sentiment:sentiments[row.sentiment],
   strength:row.strength>=9?'bond':row.strength>=6?'strong':row.strength>=3?'moderate':'weak'}
 }
 for(const row of relationshipDefinitions){
  const eventId=eventAt(row.chapter,row.at),relationshipId=id('relationship',row.key),values=relationshipValues(row)
  world.relationships.push({...stamp,id:relationshipId,characterAId:cid(row.a),characterBId:cid(row.b),...values,isBidirectional:true,startEventId:eventId})
  world.relationshipSnapshots.push({...stamp,id:id('relationship-state',row.key+'-start'),relationshipId,eventId,sortKey:orderOf(eventId),...values,isActive:true})
 }
 for(const[index,row]of relationshipChanges.entries()){
  const eventId=eventAt(row.chapter,row.at)
  assert.ok(world.relationships.some(rel=>rel.id===id('relationship',row.key)))
  world.relationshipSnapshots.push({...stamp,id:id('relationship-state',`${row.key}-${index}`),relationshipId:id('relationship',row.key),eventId,sortKey:orderOf(eventId),...relationshipValues(row),isActive:row.isActive!==false})
 }
 addStoryFeatures(world,{stamp,id,cid,eventAt,orderOf})
 addJourneys(world,{stamp,id,cid,eventAt,orderOf})
 const firstEvent=world.events[0].id,categoryId=id('lore-category','reading')
 world.loreCategories=[{...stamp,id:categoryId,name:'Reading the novel',color:'#776049',sortOrder:0}]
 const pages=[
  ['edition','The text and its translation','Victor Hugo’s Les Misérables is presented in Isabel F. Hapgood’s English translation, published by Thomas Y. Crowell & Co. in 1887, from Project Gutenberg edition 135. The complete retained narrative includes Hugo’s preface, the five volumes, the letter to M. Daelli and all seventy endnotes. Gutenberg packaging, the duplicated contents and illustration placeholders are excluded; prose wording and source headings are preserved.'],
  ['time','Narrative order and remembered time',chronologyNote+'\n\n'+pacingNote],
  ['art','Maps and imagined appearances','The illustrations are new artistic interpretations rather than historical portraits. The maps combine source-described relationships with historical geographical references; unstated room dimensions, furniture and local geometry are editorial. Broad city and regional points do not establish unknown doorways, complete routes or exact institutional parcels.'],
 ]
 world.lorePages=pages.map(([key,title,body])=>({...stamp,id:id('lore',key),categoryId,title,body,tags:[],coverImageId:null,linkedEntityIds:[],visibleFromEventId:firstEvent}))
 world.world={...stamp,id:worldId,name:'Les Misérables — Work Review',
  description:'An unfinished local review of the complete text and its companion model. Remaining artwork, source checks and release review are still in progress.',
  readingMode:true,theme:'theme-historical',coverImageId:addArt('art-staging/cover.webp')}
 assert.equal(world.sceneTexts.map(row=>row.text).join(''),retained)
 for(const snapshot of world.characterSnapshots){
  assert.ok(characters.has(snapshot.characterId))
  assert.ok(events.get(snapshot.eventId).involvedCharacterIds.includes(snapshot.characterId))
 }
 return{world,report:{scope:'Unfinished local complete-text model review; not a Library release',retainedSha256,
  chapters:world.chapters.length,events:world.events.length,characters:world.characters.length,snapshots:world.characterSnapshots.length,
  maps:world.mapLayers.length,places:world.locationMarkers.length,items:world.items.length,itemStates:world.itemSnapshots.length,
  relationships:world.relationships.length,relationshipStates:world.relationshipSnapshots.length,
  knowledgeFacts:world.knowledgeFacts.length,knowledgeReveals:world.knowledgeReveals.length,
  factions:world.factions.length,memberships:world.factionMemberships.length,goals:world.characterGoals.length,
  threads:world.plotThreads.length,motifs:world.motifs.length,
  acceptedArt:artStatus.visuallyAccepted,missingPortraits:artStatus.missingPortraits.length,
  missingItemIllustrations:artStatus.missingItemIllustrations.length,missingLocationIllustrations:artStatus.missingLocationIllustrations.length,
  remainingFeatureReview:['Full direct-cast audit','Full ownership and item-location review','Full story-feature and disclosure review','Ordinary location and item art','Full-book reading-mode and playback QA','Release packaging and reproducibility'],
  sourceInventory:audit.counts,releaseComplete:false}}
}

if(process.argv[1]&&import.meta.url.endsWith(process.argv[1].replace(/\\/g,'/'))){
 const{world,report}=buildWorldReview()
 fs.writeFileSync(new URL('./qa/world-review.pwk',import.meta.url),JSON.stringify(world,null,2)+'\n')
 fs.writeFileSync(new URL('./qa/WORLD_REVIEW.json',import.meta.url),JSON.stringify(report,null,2)+'\n')
 console.log(JSON.stringify(report,null,2))
}
