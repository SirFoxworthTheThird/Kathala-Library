import {describe,it,expect} from 'vitest'
import fs from 'node:fs'
import {validateCorrections} from '../scripts/paradise-lost/validate-corrections.mjs'

const d=JSON.parse(fs.readFileSync(new URL('../library/paradise-lost.pwk',import.meta.url),'utf8'))
const event=(title:string)=>d.events.find((entry:any)=>entry.title===title)
const snapshots=(title:string)=>d.characterSnapshots.filter((entry:any)=>entry.eventId===event(title).id)

describe('Paradise Lost reading edition',()=>{
 it('preserves the complete twelve-book poem and final verse',()=>{
  expect(d.chapters).toHaveLength(12)
  expect(d.events).toHaveLength(164)
  expect(d.sceneTexts).toHaveLength(164)
  expect(d.sceneTexts.reduce((n:number,scene:any)=>n+scene.text.split('\n').filter(Boolean).length,0)).toBe(10566)
  expect(d.sceneTexts.reduce((n:number,scene:any)=>n+scene.wordCount,0)).toBe(80146)
  expect(d.sceneTexts.at(-1).text.trimEnd().endsWith('Through Eden took their solitary way.')).toBe(true)
 })
 it('keeps narrative, recollection, creation, vision, and poetic address separate',()=>{
  expect(d.timelines.map((entry:any)=>entry.name)).toEqual(['Poetic address','Fall narrative','War in Heaven','Creation','Adam’s first memories','Michael’s vision'])
  expect(event('Satan’s First Revolt').timelineId).toBe('paradise-lost-timeline-rebellion')
  expect(event('Third Day').timelineId).toBe('paradise-lost-timeline-creation')
  expect(event('Cain and Abel').timelineId).toBe('paradise-lost-timeline-vision')
  expect(event('Invocation to Holy Light').timelineId).toBe('paradise-lost-timeline-address')
 })
 it('does not place the frame narrator inside recounted action',()=>{
  for(const title of ['Satan’s First Revolt','God Declares Creation','The Sabbath Hymn'])expect(event(title).involvedCharacterIds).not.toContain('paradise-lost-char-raphael')
  expect(event('Raphael Ends the Warning').involvedCharacterIds).toContain('paradise-lost-char-raphael')
 })
 it('gives exactly one specific state to each present character',()=>{
  for(const entry of d.events){
   const states=snapshots(entry.title)
   expect(new Set(states.map((state:any)=>state.characterId))).toEqual(new Set(entry.involvedCharacterIds))
   expect(states).toHaveLength(entry.involvedCharacterIds.length)
   for(const state of states){expect(state.statusNotes).not.toContain(entry.description);expect(state.statusNotes).not.toMatch(/is physically present|directly observed participant|occupies the scene/)}
  }
 })
 it('uses bounded bottom-origin map coordinates and three gateways',()=>{
  for(const map of d.mapLayers)expect(map.levelGroupId).toBeNull()
  for(const marker of d.locationMarkers){const map=d.mapLayers.find((entry:any)=>entry.id===marker.mapLayerId);expect(marker.x).toBeGreaterThanOrEqual(0);expect(marker.x).toBeLessThanOrEqual(map.imageWidth);expect(marker.y).toBeGreaterThanOrEqual(0);expect(marker.y).toBeLessThanOrEqual(map.imageHeight)}
  expect(d.locationMarkers.filter((entry:any)=>entry.linkedMapLayerId).map((entry:any)=>entry.id).sort()).toEqual(['paradise-lost-loc-earth','paradise-lost-loc-heaven-region','paradise-lost-loc-hell-region'])
 })
 it('ships distinct art for every illustrated entity',()=>{
  expect(d.blobs).toHaveLength(66)
  expect(new Set(d.blobs.map((entry:any)=>entry.url)).size).toBe(66)
  for(const map of d.mapLayers)expect(map.imageId).toBeTruthy()
  for(const entity of [d.world,...d.characters,...d.items,...d.locationMarkers,...d.factions])expect(entity.coverImageId||entity.portraitImageId||entity.imageId).toBeTruthy()
 })
 it('rejects every previously missed source and continuity defect',()=>{
  expect(()=>validateCorrections(d)).not.toThrow()
  const mutations=[
   (x:any)=>{const a=x.sceneTexts[0],b=x.sceneTexts[1];a.text+='\n'+b.text.split('\n')[0];b.text=b.text.split('\n').slice(1).join('\n')},
   (x:any)=>{x.characterSnapshots[0].statusNotes='The Poet shapes the reader’s attention; this scene places this decisive action at the cosmos.'},
   (x:any)=>{x.events.find((e:any)=>e.title==='Raphael Ends the Warning').timelineId='paradise-lost-timeline-rebellion'},
   (x:any)=>{x.events.find((e:any)=>e.title==='Adam Recalls Awakening').isFlashback=false},
   (x:any)=>{x.events.find((e:any)=>e.title==='Cain and Abel').isFlashback=true},
   (x:any)=>{x.events.find((e:any)=>e.title==='Raphael Warns of Passion').involvedCharacterIds.push('paradise-lost-char-eve')},
   (x:any)=>{x.events.find((e:any)=>e.title==='Satan at Eve’s Ear').involvedCharacterIds=x.events.find((e:any)=>e.title==='Satan at Eve’s Ear').involvedCharacterIds.filter((id:string)=>!id.endsWith('-adam'))},
   (x:any)=>{x.relationshipSnapshots=[]},
   (x:any)=>{x.characters.find((c:any)=>c.id==='paradise-lost-char-sin').name='Sin'},
   (x:any)=>{x.events[0].travelDays=0.125},
   (x:any)=>{x.knowledgeFacts.find((f:any)=>f.id==='paradise-lost-fact-prohibition').readerLearnsAtEventId=event('Adam and Eve').id},
   (x:any)=>{x.lorePages.find((l:any)=>l.id==='paradise-lost-lore-art').body+=' See the committed artwork manifest.'},
  ]
  for(const mutate of mutations){const copy=structuredClone(d);mutate(copy);expect(()=>validateCorrections(copy)).toThrow()}
 })
})
