import fs from 'node:fs'
import {readReleaseApproval} from './release-approval.mjs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {reviewedChapters} from './scene-review.mjs'
import {sections} from './source-text.mjs'
import {characters,canonicalCast,unresolvedIdentities} from './character-ledger.mjs'
import {items,custodyEvidence,inventoryBlockers} from './item-ledger.mjs'
import {mapDefinitions,locationDefinitions,locationAliases,locationBlockers} from './location-ledger.mjs'
import {factions,relationships,facts,goals,featureBlockers} from './feature-ledger.mjs'
import {revealGates} from './reveal-gates.mjs'
import {compileKnowledge} from './compile-knowledge.mjs'
import {mapCoordinates} from './map-coordinates.mjs'
import {cutKey} from './scene-ranges.mjs'
import {locationStates} from './location-state-ledger.mjs'
import {exactSourceEvent} from './source-anchors.mjs'

const root=new URL('../../',import.meta.url),book=new URL('./',import.meta.url)
const unique=(rows,label)=>{const keys=rows.map(r=>r.key??r.id);assert.equal(new Set(keys).size,keys.length,`Unique ${label}`);return new Set(keys)}
const people=unique(characters,'characters'),objects=unique(items,'items'),maps=unique(mapDefinitions,'maps'),places=unique(locationDefinitions,'places')
unique(factions,'factions')
const scenes=new Set()
let candidateStates=0
for(const c of reviewedChapters){
  const section=sections.filter(s=>s.kind==='narrative')[c.chapter-1]
  for(const scene of c.scenes){
    const eventId=`ivanhoe-source-${section.number}-${cutKey(scene)}`
    assert.ok(!scenes.has(eventId),`Unique source scene ${eventId}`)
    scenes.add(eventId)
    const cast=canonicalCast(scene)
    candidateStates+=cast.length
    if(scene.location!==null)assert.ok(places.has(locationAliases[scene.location]??scene.location),`Scene place ${scene.location}`)
    for(const person of cast){
      assert.ok(person.status.trim().length>20,`Specific state ${person.key}`)
      assert.ok(!/takes a distinct part in the immediate action|state carried through|ongoing context|not yet directly involved/i.test(person.status),`Filler state ${person.key}`)
      if(person.location!==null)assert.ok(places.has(locationAliases[person.location]??person.location),`Person place ${person.location}`)
    }
  }
}
for(const c of characters){
  for(const change of [...c.nameChanges,...c.aliasesFrom])assert.ok(scenes.has(change.eventId),`Name gate for ${c.key}`)
  if(c.revealedAs){
    const head=characters.find(h=>h.key===c.revealedAs.key)
    assert.ok(head&&!head.revealedAs&&head.key!==c.key,`One-way identity head ${c.key}`)
    assert.ok(scenes.has(c.revealedAs.eventId),`Identity gate ${c.key}`)
  }
}
for(const place of locationDefinitions)assert.ok(maps.has(place.map),`Map for ${place.key}`)
const locationConditionKeys=new Set()
for(const state of locationStates){
  assert.ok(places.has(state.place),`Condition place ${state.place}`)
  const eventId=exactSourceEvent(state.source),key=`${state.place}:${eventId}`
  assert.ok(scenes.has(eventId)&&!locationConditionKeys.has(key),`Unique anchored condition ${key}`)
  locationConditionKeys.add(key)
  assert.ok(['active','occupied','sieged','abandoned','ruined','destroyed','rebuilt','unknown'].includes(state.status),`Supported location condition ${key}`)
  assert.ok(state.notes.length>40,`Source-specific location condition ${key}`)
}
assert.equal(mapDefinitions.filter(m=>m.parent===null).length,1,'One root map')
for(const map of mapDefinitions){
  const seen=new Set([map.key]);let parent=map.parent
  while(parent){assert.ok(maps.has(parent),`Map parent ${parent}`);assert.ok(!seen.has(parent),`Acyclic map hierarchy ${map.key}`);seen.add(parent);parent=mapDefinitions.find(m=>m.key===parent).parent}
}
for(const evidence of custodyEvidence)for(const item of evidence.items)assert.ok(objects.has(item),`Custody reference ${item}`)
for(const relationship of relationships)for(const key of [relationship.a,relationship.b])assert.ok(people.has(key),`Relationship endpoint ${key}`)
for(const goal of goals)assert.ok(people.has(goal.character),`Goal owner ${goal.character}`)
for(const fact of facts)for(const key of fact.learners)assert.ok(people.has(key),`Knowledge recipient ${key}`)
const compiledKnowledge=compileKnowledge({worldId:'ivanhoe-world',createdAt:0,updatedAt:0})
assert.deepEqual(compiledKnowledge.pending,[],'Every candidate knowledge anchor is exact')
assert.equal(compiledKnowledge.knowledgeFacts.length,facts.length,'No silently dropped candidate knowledge facts')
for(const reveal of compiledKnowledge.knowledgeReveals)assert.ok(scenes.has(reveal.eventId),'Learning moment resolves')

const art=JSON.parse(fs.readFileSync(new URL('./asset-manifest.json',import.meta.url),'utf8'))
const mapArt=JSON.parse(fs.readFileSync(new URL('./map-manifest.json',import.meta.url),'utf8'))
for(const [key,coordinate] of Object.entries(mapCoordinates)){
  const place=locationDefinitions.find(l=>l.key===key),plan=mapArt.maps.find(m=>m.id===coordinate.map)
  assert.equal(place?.map,coordinate.map,`Coordinate map ${key}`)
  assert.ok(plan,`Drawn plan for coordinates ${key}`)
  assert.ok(coordinate.x>=0&&coordinate.x<=plan.compressed.width&&coordinate.y>=0&&coordinate.y<=plan.compressed.height,`Coordinate image bounds ${key}`)
  if(coordinate.linked)assert.equal(mapDefinitions.find(m=>m.key===coordinate.linked)?.parent,coordinate.map,`Coordinate gateway parent ${key}`)
}
const hashes=new Set()
for(const row of [...art.assets,...mapArt.maps]){
  for(const [path,hash] of [[row.original,row.originalSha256],[row.compressed.path,row.compressed.sha256]]){
    const bytes=fs.readFileSync(new URL(path,root))
    assert.equal(createHash('sha256').update(bytes).digest('hex'),hash,`Asset bytes ${path}`)
  }
  assert.ok(!hashes.has(row.compressed.sha256),`Distinct compressed asset ${row.id}`)
  hashes.add(row.compressed.sha256)
  assert.ok(row.originalReview&&row.compressedReview,`Original and compressed review ${row.id}`)
  assert.ok(!/^PENDING\b/i.test(row.originalReview)&&!/^PENDING\b/i.test(row.compressedReview),`Selected asset requires actual original and compressed inspection: ${row.id}`)
}
const portraitIds=new Set(art.assets.filter(a=>a.id!=='cover').map(a=>a.id)),mapIds=new Set(mapArt.maps.map(m=>m.id))
for(const c of characters)if(c.portraitAsset)assert.ok(portraitIds.has(c.portraitAsset),`Manifested portrait ${c.key}`)
for(const item of items)if(item.portraitAsset)assert.ok(art.assets.some(a=>a.id===item.portraitAsset),`Manifested item illustration ${item.key}`)
const missing={portraits:characters.filter(c=>!c.portraitAsset).map(c=>c.key),locations:locationDefinitions.filter(l=>!art.assets.some(a=>a.entity===`place:${l.key}`)).map(l=>l.key),items:items.filter(i=>!i.portraitAsset).map(i=>i.key),maps:mapDefinitions.filter(m=>!mapIds.has(m.key)).map(m=>m.key)}
if(process.argv.includes('--release'))assert.deepEqual([...unresolvedIdentities,...inventoryBlockers,...locationBlockers,...featureBlockers],[],'Unresolved authoring blockers')
if(process.argv.includes('--release'))readReleaseApproval(fs.readFileSync(new URL('./authoring-review.pwk',book)))
const report={
  status:process.argv.includes('--release')?'PASSED SOURCE MODEL REFERENCES AND RECORDED RELEASE APPROVAL':'SOURCE MODEL REFERENCE AUDIT; MANUAL RELEASE APPROVAL IS SEPARATE',
  locationConditions:locationStates.length,
  counts:{narrativeChapters:reviewedChapters.length,proposedScenes:scenes.size,candidateCharacters:people.size,candidateStates,candidateMaps:maps.size,candidateLocations:places.size,initialItems:objects.size,custodyEntries:custodyEvidence.length,factions:factions.length,relationships:relationships.length,facts:facts.length,goals:goals.length,revealBoundaries:Object.keys(revealGates).length},
  assets:{selectedIllustrations:art.assets.length,selectedMapPlans:mapArt.maps.length,applicationReviewed:[...art.assets,...mapArt.maps].filter(a=>a.appReviewed).length,missing},
  mapCoordinates:{placed:Object.keys(mapCoordinates).length,pending:locationDefinitions.filter(l=>!mapCoordinates[l.key]).map(l=>l.key),gateways:Object.entries(mapCoordinates).filter(([,c])=>c.linked).map(([key,c])=>({key,parent:c.map,child:c.linked})),scope:'166 reviewed coordinates; five deliberately source-unlocated sites; all30 illustrated layers and26 gateways reviewed.'},
  openGates:process.argv.includes('--release')?[]:[...unresolvedIdentities,...inventoryBlockers,...locationBlockers,...featureBlockers,'Complete all final physical casts, silent participants and scene-level states.','Generate the enriched world and validate exact reconstruction again.','Complete final dedicated validators, catalogue and application QA on the authoritative downloadable PWK.'],
}
fs.writeFileSync(new URL('./AUTHORING_MODEL_AUDIT.json',book),JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify({status:report.status,...report.counts,selectedIllustrations:art.assets.length,selectedMapPlans:mapArt.maps.length,applicationReviewed:report.assets.applicationReviewed},null,2))
