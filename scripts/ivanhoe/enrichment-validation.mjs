import assert from 'node:assert/strict'
import {auditInitialNames} from './initial-name-audit.mjs'

// Reference/order validation is separate from source, artwork and browser QA.
// A passing result deliberately makes no release-readiness claim.
export function validateEnrichment(world){
  const tables=['events','chapters','mapLayers','locationMarkers','characters','characterSnapshots','items','itemSnapshots','itemPlacements','relationships','relationshipSnapshots','characterGoals','factions','factionMemberships','knowledgeFacts','knowledgeReveals','blobs','plotThreads','motifs','loreCategories','lorePages']
  const ids={}
  for(const table of tables){
    assert.ok(Array.isArray(world[table]),`Required table ${table}`)
    ids[table]=new Set(world[table].map(row=>row.id))
    assert.equal(ids[table].size,world[table].length,`Unique ${table} ids`)
  }
  const ref=(table,id,label)=>assert.ok(ids[table].has(id),`${label}: unknown ${table} reference ${id}`)
  const optional=(table,id,label)=>{if(id!==null&&id!==undefined)ref(table,id,label)}
  const eventKeys=new Map()
  for(const event of world.events){
    ref('chapters',event.chapterId,event.id)
    const chapter=world.chapters.find(chapter=>chapter.id===event.chapterId)
    eventKeys.set(event.id,chapter.number+event.sortOrder/1_000_000)
    optional('locationMarkers',event.locationMarkerId,event.id)
    for(const id of [...event.involvedCharacterIds,...event.mentionedCharacterIds])ref('characters',id,event.id)
    for(const id of event.involvedItemIds)ref('items',id,event.id)
    for(const id of event.threadIds)ref('plotThreads',id,event.id)
    for(const id of event.motifIds)ref('motifs',id,event.id)
  }
  const ordered=(start,end,label)=>{
    ref('events',start,label);optional('events',end,label)
    assert.ok(!end||eventKeys.get(end)>=eventKeys.get(start),`${label}: end precedes start`)
  }
  const stateKeys=new Set()
  for(const table of ['characterSnapshots','itemSnapshots','itemPlacements','relationshipSnapshots']){
    const [ownerTable,field]=({characterSnapshots:['characters','characterId'],itemSnapshots:['items','itemId'],itemPlacements:['items','itemId'],relationshipSnapshots:['relationships','relationshipId']})[table]
    for(const row of world[table]){
      ref(ownerTable,row[field],row.id);ref('events',row.eventId,row.id)
      const key=`${table}:${row[field]}:${row.eventId}`
      assert.ok(!stateKeys.has(key),`One state per owner/event ${key}`);stateKeys.add(key)
      assert.equal(row.sortKey,eventKeys.get(row.eventId),`Comparable state sort key ${row.id}`)
      if(table==='characterSnapshots'){
        optional('locationMarkers',row.currentLocationMarkerId,row.id)
        optional('mapLayers',row.currentMapLayerId,row.id)
        for(const id of row.inventoryItemIds)ref('items',id,row.id)
      }
      if(table==='itemPlacements')ref('locationMarkers',row.locationMarkerId,row.id)
      if(table==='relationshipSnapshots'){
        const relationship=world.relationships.find(relationship=>relationship.id===row.relationshipId)
        ordered(relationship.startEventId,row.eventId,row.id)
      }
    }
  }
  for(const row of world.relationships){
    ref('characters',row.characterAId,row.id);ref('characters',row.characterBId,row.id)
    assert.notEqual(row.characterAId,row.characterBId,`Distinct relationship endpoints ${row.id}`)
    ordered(row.startEventId,row.endEventId,row.id)
  }
  for(const row of world.characterGoals){ref('characters',row.characterId,row.id);ordered(row.startEventId,row.endEventId,row.id)}
  for(const row of world.factionMemberships){
    ref('characters',row.characterId,row.id);ref('factions',row.factionId,row.id)
    ordered(row.startEventId,row.endEventId,row.id)
  }
  for(const fact of world.knowledgeFacts){
    optional('events',fact.readerLearnsAtEventId,fact.id);optional('events',fact.originEventId,fact.id)
    for(const tag of fact.tags){
      const prefix='offstage-inventory-removed:'
      if(!tag.startsWith(prefix))continue
      const parts=tag.slice(prefix.length).split(':')
      assert.equal(parts.length,2,`Reported inventory tag ${fact.id}`)
      const [character,item]=parts
      ref('characters',character,fact.id);ref('items',item,fact.id)
      ref('events',fact.readerLearnsAtEventId,fact.id)
      assert.ok(!world.events.find(event=>event.id===fact.readerLearnsAtEventId).involvedCharacterIds.includes(character),`Reported former holder must not be fabricated as present ${fact.id}`)
    }
  }
  for(const row of world.knowledgeReveals){ref('knowledgeFacts',row.factId,row.id);ref('characters',row.characterId,row.id);ref('events',row.eventId,row.id)}
  for(const thread of world.plotThreads){
    optional('events',thread.resolvedEventId,thread.id)
    if(thread.resolvedEventId)assert.ok(world.events.find(e=>e.id===thread.resolvedEventId).threadIds.includes(thread.id),`Thread closing event is tagged ${thread.id}`)
  }
  const entities=new Set([...ids.characters,...ids.items,...ids.locationMarkers])
  for(const page of world.lorePages){
    optional('loreCategories',page.categoryId,page.id);optional('events',page.visibleFromEventId,page.id);optional('blobs',page.coverImageId,page.id)
    for(const id of page.linkedEntityIds)assert.ok(entities.has(id),`Lore linked entity ${page.id}: ${id}`)
  }
  for(const row of world.characters)optional('blobs',row.portraitImageId,row.id)
  for(const row of world.items)optional('blobs',row.imageId,row.id)
  for(const row of world.locationMarkers){optional('mapLayers',row.mapLayerId,row.id);optional('mapLayers',row.linkedMapLayerId,row.id);optional('blobs',row.imageId,row.id)}
  const initialNames=auditInitialNames(world)
  for(const row of initialNames)assert.ok(row.knownInNarrativeByFirstAppearance,`Premature initial name ${row.initialName} at ${row.firstEventId}`)
  return {status:'PASSED COMPILED REFERENCE/ORDER CHECKS ONLY; NOT RELEASE APPROVAL',counts:Object.fromEntries(tables.map(table=>[table,world[table].length])),initialNames}
}
