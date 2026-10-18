import {describe,it,expect} from 'vitest'
import fs from 'node:fs'

const d=JSON.parse(fs.readFileSync(new URL('../library/paradise-lost.pwk',import.meta.url),'utf8'))
const event=(title:string)=>d.events.find((entry:any)=>entry.title===title)
const snapshots=(title:string)=>d.characterSnapshots.filter((entry:any)=>entry.eventId===event(title).id)

describe('Paradise Lost reading edition',()=>{
 it('preserves the complete twelve-book poem and final verse',()=>{
  expect(d.chapters).toHaveLength(12)
  expect(d.events).toHaveLength(110)
  expect(d.sceneTexts).toHaveLength(110)
  expect(d.sceneTexts.reduce((n:number,scene:any)=>n+scene.text.split('\n').filter(Boolean).length,0)).toBe(10566)
  expect(d.sceneTexts.reduce((n:number,scene:any)=>n+scene.wordCount,0)).toBe(80146)
  expect(d.sceneTexts.at(-1).text.trimEnd().endsWith('Through Eden took their solitary way.')).toBe(true)
 })
 it('keeps narrative, recollection, creation, vision, and poetic address separate',()=>{
  expect(d.timelines.map((entry:any)=>entry.name)).toEqual(['Poetic address','Fall narrative','War in Heaven','Creation','Michael’s vision'])
  expect(event('Satan’s First Revolt').timelineId).toBe('paradise-lost-timeline-rebellion')
  expect(event('First Through Third Days').timelineId).toBe('paradise-lost-timeline-creation')
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
  for(const marker of d.locationMarkers){const map=d.mapLayers.find((entry:any)=>entry.id===marker.mapLayerId);expect(marker.x).toBeGreaterThanOrEqual(0);expect(marker.x).toBeLessThanOrEqual(map.imageWidth);expect(marker.y).toBeGreaterThanOrEqual(0);expect(marker.y).toBeLessThanOrEqual(map.imageHeight)}
  expect(d.locationMarkers.filter((entry:any)=>entry.linkedMapLayerId).map((entry:any)=>entry.id).sort()).toEqual(['paradise-lost-loc-earth','paradise-lost-loc-heaven-region','paradise-lost-loc-hell-region'])
 })
 it('ships distinct art for every illustrated entity',()=>{
  expect(d.blobs).toHaveLength(61)
  expect(new Set(d.blobs.map((entry:any)=>entry.url)).size).toBe(61)
  for(const map of d.mapLayers)expect(map.imageId).toBeTruthy()
  for(const entity of [d.world,...d.characters,...d.items,...d.locationMarkers,...d.factions])expect(entity.coverImageId||entity.portraitImageId||entity.imageId).toBeTruthy()
 })
})
