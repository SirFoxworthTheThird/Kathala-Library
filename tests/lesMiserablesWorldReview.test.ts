import{expect,test}from 'vitest'
import{buildWorldReview}from '../scripts/les-miserables/build-world-review.mjs'
import{buildMapRecords}from '../scripts/les-miserables/map-records.mjs'
import{retained}from '../scripts/les-miserables/source-text.mjs'

const model=()=>buildWorldReview({embedded:false})
const prefix='lesmis-world-review'

test('exports application item conditions so destroyed belongings cannot remain usable',()=>{
 const{world}=model()
 const allowed=['intact','damaged','destroyed','repaired','lost','found','unknown']
 expect(world.itemSnapshots.every((r:any)=>allowed.includes(r.condition))).toBe(true)
 for(const key of ['old-outfit-burned','thorn-cudgel-burned'])
  expect(world.itemSnapshots.find((r:any)=>r.id===`${prefix}-item-state-${key}`).condition).toBe('destroyed')
 expect(world.itemSnapshots.find((r:any)=>r.id===`${prefix}-item-state-candlesticks-restored`).condition).toBe('intact')
 expect(world.itemSnapshots.find((r:any)=>r.id===`${prefix}-item-state-coat-fragment-taken`).condition).toBe('damaged')
 expect(world.itemSnapshots.find((r:any)=>r.id===`${prefix}-item-state-coat-fragment-produced`).condition).toBe('damaged')
 expect(world.itemSnapshots.find((r:any)=>r.id===`${prefix}-item-state-passport-pocketed`).condition).toBe('unknown')
})

test('assembles the complete manuscript under isolated review identities without replacing final edition maps',()=>{
 const{world,report}=model()
 expect(report.releaseComplete).toBe(false)
 expect(world.chapters).toHaveLength(365)
 expect(world.events).toHaveLength(1535)
 expect(world.sceneTexts.map((r:any)=>r.text).join('')).toBe(retained)
 const rows=Object.values(world).flatMap((r:any)=>Array.isArray(r)?r:[])
 const ids=rows.map((r:any)=>r.id)
 expect(new Set(ids).size).toBe(ids.length)
 const final=buildMapRecords({worldId:'final',createdAt:1,updatedAt:1},{embedded:false})
 const finalIds=new Set([...final.mapLayers,...final.locationMarkers,...final.blobs].map((r:any)=>r.id))
 expect(ids.some((id:string)=>finalIds.has(id))).toBe(false)
 expect(rows.every((r:any)=>r.worldId==='les-miserables-world-review')).toBe(true)
})

test('gates identities, reported deaths and unequal knowledge without manufacturing absent snapshots',()=>{
 const{world}=model()
 expect(world.characters.find((r:any)=>r.id===`${prefix}-character-madeleine`).revealedAs).toEqual({characterId:`${prefix}-character-valjean`,eventId:`${prefix}-event-57-1`})
 const death=world.knowledgeFacts.find((r:any)=>r.id===`${prefix}-fact-myriel-death`)
 expect(death.tags).toContain(`offstage-death:${prefix}-character-myriel`)
 expect(world.characterSnapshots.some((r:any)=>r.characterId===`${prefix}-character-myriel`&&r.eventId===death.readerLearnsAtEventId)).toBe(false)
 const rescue=world.knowledgeFacts.find((r:any)=>r.id===`${prefix}-fact-marius-rescuer`)
 expect(rescue.originEventId).toBe(`${prefix}-event-322-1`)
 expect(world.knowledgeReveals.find((r:any)=>r.factId===rescue.id&&r.characterId===`${prefix}-character-marius`).eventId).not.toBe(rescue.originEventId)
 expect(world.characterSnapshots.filter((r:any)=>r.eventId===`${prefix}-event-341-2`).map((r:any)=>r.characterId)).toEqual([`${prefix}-character-javert`])
})

test('keeps the note at the post and the bequest out of a fabricated inventory while using current relationship enums',()=>{
 const{world}=model()
 const note=`${prefix}-item-javert-service-note`
 expect(world.itemPlacements.find((r:any)=>r.id===`${prefix}-item-placement-javert-note-left`).locationMarkerId).toBe(`${prefix}-location-chatelet-police-post`)
 expect(world.characterSnapshots.some((r:any)=>r.inventoryItemIds.includes(note))).toBe(false)
 const cosette=world.characterSnapshots.find((r:any)=>r.eventId===`${prefix}-event-364-6`&&r.characterId===`${prefix}-character-cosette`)
 expect(cosette.inventoryItemIds).not.toContain(`${prefix}-item-silver-candlesticks`)
 const gift=world.characterSnapshots.find((r:any)=>r.eventId===`${prefix}-event-26-3`&&r.characterId===`${prefix}-character-valjean`)
 expect(gift.inventoryItemIds).toContain(`${prefix}-item-silver-candlesticks`)
 expect(world.relationshipSnapshots.every((r:any)=>['weak','moderate','strong','bond'].includes(r.strength)&&['positive','neutral','negative','complex'].includes(r.sentiment))).toBe(true)
})
