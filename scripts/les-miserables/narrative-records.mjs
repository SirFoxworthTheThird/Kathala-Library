import assert from 'node:assert/strict'
import {chapters,retained,countWords}from './source-text.mjs'
import {enrichedReview}from './build-enrichment-audit.mjs'
import {cutOffset}from './validate-scene-review.mjs'
import {reportedDeaths}from './continuity-ledger.mjs'

// Serialization only. Calendar and pacing must be supplied by reviewed plans;
// source order must never silently become an invented historical date.
// This module neither publishes a world nor certifies its remaining release gates.
export function buildNarrativeRecords({stamp,timelineId,locations,resolveTiming,resolveTension,
  review=enrichedReview(),idPrefix='lesmis'}){
  assert.ok(stamp?.worldId&&timelineId,'World and timeline required')
  assert.equal(typeof resolveTiming,'function','Reviewed chronology provider required')
  assert.equal(typeof resolveTension,'function','Reviewed pacing provider required')
  const eventId=key=>`${idPrefix}-event-${key}`,characterId=key=>`${idPrefix}-character-${key}`
  const locationId=key=>`${idPrefix}-location-${key}`
  const placeById=new Map(locations.map(row=>[row.id,row]))
  const place=key=>{
    if(key===null||key===undefined)return null
    const row=placeById.get(locationId(key))
    assert.ok(row,`Unmapped source place: ${key}`)
    return row
  }
  const events=[],sceneTexts=[],characterSnapshots=[],dead=new Set()
  for(const chapter of chapters){
    const rows=review.get(chapter.number)
    assert.ok(rows?.length,`Unreviewed chapter: ${chapter.number}`)
    for(const [index,row]of rows.entries()){
      const key=`${chapter.number}-${index+1}`,id=eventId(key)
      const start=cutOffset(chapter,row.at),end=index+1<rows.length?cutOffset(chapter,rows[index+1].at):chapter.end
      const text=retained.slice(start,end),where=place(row.location)
      const timing=resolveTiming({chapter:chapter.number,index,row,key})
      assert.ok(Number.isFinite(timing?.inWorldTime),`Invalid chronology: ${key}`)
      assert.ok(Number.isFinite(timing.travelDays)&&timing.travelDays>=0,`Invalid elapsed time: ${key}`)
      assert.equal(typeof timing.isFlashback,'boolean',`Flashback decision required: ${key}`)
      const tension=resolveTension({chapter:chapter.number,index,row,key})
      assert.ok(Number.isInteger(tension)&&tension>=1&&tension<=5,`Invalid pacing: ${key}`)
      for(const fact of reportedDeaths)if(fact.chapter===chapter.number&&fact.at===row.at)dead.add(fact.character)
      for(const change of row.stateChanges??[]){
        if(change.isAlive===false)dead.add(change.character)
        if(change.isAlive===true)dead.delete(change.character)
      }
      const cast=row.present.map(([actor])=>actor)
      assert.equal(new Set(cast).size,cast.length,`Repeated present actor: ${key}`)
      events.push({...stamp,id,chapterId:`${idPrefix}-chapter-${chapter.number}`,timelineId,
        title:row.title,description:row.description,locationMarkerId:where?.id??null,
        involvedCharacterIds:cast.map(characterId),mentionedCharacterIds:(row.mentioned??[]).map(characterId),
        involvedItemIds:(row.items??[]).map(item=>`${idPrefix}-item-${item}`),threadIds:[],motifIds:[],
        sortOrder:index,inWorldTime:timing.inWorldTime,travelDays:timing.travelDays,isFlashback:timing.isFlashback,
        tension,tags:[row.kind],
        structureBeat:null,status:'draft',povCharacterId:null,
      })
      sceneTexts.push({...stamp,id:`${idPrefix}-text-${key}`,eventId:id,text,wordCount:countWords(text)})
      for(const [actor,statusNotes]of row.present){
        assert.ok(statusNotes.trim(),`Missing individual state: ${key}/${actor}`)
        const actorPlace=place(row.actorLocations&&Object.hasOwn(row.actorLocations,actor)?row.actorLocations[actor]:row.location)
        characterSnapshots.push({...stamp,id:`${idPrefix}-snapshot-${key}-${actor}`,characterId:characterId(actor),eventId:id,
          sortKey:chapter.number+index/1_000_000,isAlive:!dead.has(actor),
          currentLocationMarkerId:actorPlace?.id??null,currentMapLayerId:actorPlace?.mapLayerId??null,
          inventoryItemIds:[],inventoryNotes:'',statusNotes,travelModeId:null,
        })
      }
    }
  }
  assert.equal(sceneTexts.map(row=>row.text).join(''),retained,'Serialized manuscript changed')
  return {events,sceneTexts,characterSnapshots}
}
