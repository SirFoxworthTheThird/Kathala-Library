import {describe,it,expect} from 'vitest'
import fs from 'node:fs'

const d=JSON.parse(fs.readFileSync(new URL('../library/the-cold-choir.pwk',import.meta.url),'utf8'))
const event=(title:string)=>d.events.find((e:any)=>e.title===title)
const snapshots=(title:string)=>d.characterSnapshots.filter((s:any)=>s.eventId===event(title).id)

describe('The Cold Choir reading edition',()=>{
 it('keeps the three historical strands separate',()=>{
  expect(d.timelines.map((x:any)=>x.name)).toEqual(['The Mercy · 1 BL','The Compact · 310–311 AL','The Quiet · 742 AL'])
  expect(new Set(d.events.map((e:any)=>e.timelineId))).toEqual(new Set(d.timelines.map((x:any)=>x.id)))
 })
 it('preserves the complete manuscript across reviewed paragraph cuts',()=>{
  expect(d.chapters).toHaveLength(21)
  expect(d.events).toHaveLength(62)
  expect(d.sceneTexts).toHaveLength(62)
  expect(d.sceneTexts.reduce((n:number,s:any)=>n+s.wordCount,0)).toBe(48573)
  expect(d.sceneTexts.at(-1).text.replace(/_/g,'').trimEnd().endsWith('"Row Thirty-One, berth twelve—"')).toBe(true)
 })
 it('keeps direct presence distinct from reference or transmitted speech',()=>{
  expect(event('Burn').involvedCharacterIds.sort()).toEqual(['cold-choir-char-kesh','cold-choir-char-lund','cold-choir-char-tamsin'])
  expect(event('Burn').mentionedCharacterIds).toContain('cold-choir-char-hollin')
  for(const e of d.events){
   expect(new Set(snapshots(e.title).map((s:any)=>s.characterId))).toEqual(new Set(e.involvedCharacterIds))
   expect(e.involvedCharacterIds.some((id:string)=>e.mentionedCharacterIds.includes(id))).toBe(false)
  }
 })
 it('gates Ama physical presence to the final scene',()=>{
  const ama='cold-choir-char-ama'
  expect(d.events.filter((e:any)=>e.involvedCharacterIds.includes(ama)).map((e:any)=>e.title)).toEqual(['Berth Twelve'])
  expect(d.knowledgeFacts.find((f:any)=>f.id==='cold-choir-fact-ama').readerLearnsAtEventId).toBe(event('Row Thirty-One').id)
 })
 it('uses individual source grounded statuses',()=>{
  for(const e of d.events)for(const s of snapshots(e.title)){
   expect(s.statusNotes).not.toBe(e.description)
   expect(s.statusNotes).not.toMatch(/is physically present|directly observed participant|occupies the scene/)
  }
 })
 it('uses bottom-origin map coordinates inside every plate',()=>{
  for(const marker of d.locationMarkers){const map=d.mapLayers.find((m:any)=>m.id===marker.mapLayerId);expect(marker.x).toBeGreaterThanOrEqual(0);expect(marker.x).toBeLessThanOrEqual(map.imageWidth);expect(marker.y).toBeGreaterThanOrEqual(0);expect(marker.y).toBeLessThanOrEqual(map.imageHeight)}
 })
})
