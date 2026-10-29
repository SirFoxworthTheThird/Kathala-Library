import {expect,test}from 'vitest'
import {buildNarrativeRecords}from '../scripts/les-miserables/narrative-records.mjs'
import {buildMapRecords}from '../scripts/les-miserables/map-records.mjs'
import {enrichedReview}from '../scripts/les-miserables/build-enrichment-audit.mjs'
import {retained,countWords}from '../scripts/les-miserables/source-text.mjs'

const stamp={worldId:'narrative-test',createdAt:1,updatedAt:1}
const locations=buildMapRecords(stamp,{embedded:false}).locationMarkers
// Test coordinates only, deliberately not a calendar or release pacing plan.
const options={stamp,timelineId:'test-only',locations,
  resolveTiming:({chapter,index}:any)=>({inWorldTime:chapter+index/1000,travelDays:0,isFlashback:false}),
  resolveTension:()=>2,
}

test('round-trips all retained source through application records with the reviewed direct cast',()=>{
  const model=buildNarrativeRecords(options)
  expect(model.events).toHaveLength(1535)
  expect(model.characterSnapshots).toHaveLength(2398)
  expect(model.sceneTexts.map((s:any)=>s.text).join('')).toBe(retained)
  expect(model.sceneTexts.reduce((n:number,s:any)=>n+s.wordCount,0)).toBe(countWords(retained))
  const javert=model.events.find((e:any)=>e.id==='lesmis-event-341-2')
  expect(javert.involvedCharacterIds).toEqual(['lesmis-character-javert'])
  expect(javert.mentionedCharacterIds).toContain('lesmis-character-valjean')
  expect(model.characterSnapshots.filter((s:any)=>s.eventId===javert.id).map((s:any)=>s.characterId)).toEqual(javert.involvedCharacterIds)
  const last=model.characterSnapshots.find((s:any)=>s.eventId==='lesmis-event-364-6'&&s.characterId==='lesmis-character-valjean')
  expect(last.isAlive).toBe(false)
  expect(last.sortKey).toBe(364+5/1_000_000)
})

test('preserves an explicitly unlocated actor rather than moving them to the event location',()=>{
  const review=enrichedReview(),rows=review.get(15)
  rows[0]={...rows[0],actorLocations:{...rows[0].actorLocations,valjean:null}}
  const model=buildNarrativeRecords({...options,review})
  const event=model.events.find((e:any)=>e.id==='lesmis-event-15-1')
  expect(event.locationMarkerId).toBe('lesmis-location-digne')
  const snapshots=model.characterSnapshots.filter((s:any)=>s.eventId===event.id)
  expect(snapshots.find((s:any)=>s.characterId==='lesmis-character-valjean').currentLocationMarkerId).toBeNull()
  expect(snapshots.find((s:any)=>s.characterId==='lesmis-character-valjean').currentMapLayerId).toBeNull()
  expect(snapshots.find((s:any)=>s.characterId==='lesmis-character-digne-townhall-gendarme').currentLocationMarkerId).toBe('lesmis-location-digne')
})

test('requires a chronology and pacing plan instead of silently inventing them from source order',()=>{
  expect(()=>buildNarrativeRecords({...options,resolveTiming:undefined})).toThrow('Reviewed chronology provider required')
  expect(()=>buildNarrativeRecords({...options,resolveTension:undefined})).toThrow('Reviewed pacing provider required')
  expect(()=>buildNarrativeRecords({...options,resolveTiming:()=>({inWorldTime:0,travelDays:-1,isFlashback:false})})).toThrow('Invalid elapsed time')
  expect(()=>buildNarrativeRecords({...options,resolveTension:()=>6})).toThrow('Invalid pacing')
})
