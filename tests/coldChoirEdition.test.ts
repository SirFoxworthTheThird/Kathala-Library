import {describe,it,expect} from 'vitest'
import fs from 'node:fs'
import {validateCorrections} from '../scripts/the-cold-choir/validate-corrections.mjs'

const d=JSON.parse(fs.readFileSync(new URL('../library/the-cold-choir.pwk',import.meta.url),'utf8'))
const event=(title:string)=>d.events.find((e:any)=>e.title===title)
const snapshots=(title:string)=>d.characterSnapshots.filter((s:any)=>s.eventId===event(title).id)

describe('The Cold Choir reading edition',()=>{
 it('rejects each previously missed model defect',()=>{
  expect(()=>validateCorrections(d)).not.toThrow()
  const mutations=[
   (x:any)=>{const s=x.characterSnapshots[0];s.statusNotes='Ilse: '+x.events.find((e:any)=>e.id===s.eventId).description},
   (x:any)=>{x.events.find((e:any)=>e.title==='The First Hidden Line').inWorldTime=41.02},
   (x:any)=>{x.events.find((e:any)=>e.title==='Ama Opens Her Eyes').inWorldTime=12.52},
   (x:any)=>{x.events.find((e:any)=>e.title==='Row Thirty-One').involvedCharacterIds.pop()},
   (x:any)=>{x.events.find((e:any)=>e.title==='Waking').involvedCharacterIds.push('cold-choir-char-kit')},
   (x:any)=>{x.locationMarkers.find((l:any)=>l.id==='cold-choir-loc-cold-cell').y=512},
   (x:any)=>{x.items.find((i:any)=>i.id==='cold-choir-item-letter').name='Bram’s letter to Ama'}
  ]
  for(const mutate of mutations){const copy=structuredClone(d);mutate(copy);expect(()=>validateCorrections(copy)).toThrow()}
 })
 it('keeps the three historical strands separate',()=>{
  expect(d.timelines.map((x:any)=>x.name)).toEqual(['The Mercy · 1 BL','The Compact · 310–311 AL','The Quiet · 742 AL'])
  expect(new Set(d.events.map((e:any)=>e.timelineId))).toEqual(new Set(d.timelines.map((x:any)=>x.id)))
 })
 it('preserves the complete manuscript across reviewed paragraph cuts',()=>{
  expect(d.chapters).toHaveLength(21)
  expect(d.events).toHaveLength(72)
  expect(d.sceneTexts).toHaveLength(72)
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
  expect(event('Strongbox').involvedCharacterIds).toContain('cold-choir-char-tamsin')
  expect(new Set(event('Arrest').involvedCharacterIds)).toEqual(new Set(['cold-choir-char-neve','cold-choir-char-jory','cold-choir-char-calloway']))
  expect(new Set(event('The Warden').involvedCharacterIds)).toEqual(new Set(['cold-choir-char-tamsin','cold-choir-char-kesh']))
  expect(event("Rhee's Choice").involvedCharacterIds).toContain('cold-choir-char-ansel')
  expect(event('Rhee at the Vigil').involvedCharacterIds).toContain('cold-choir-char-rhee')
  expect(event('The Broadcast').involvedCharacterIds).toContain('cold-choir-char-calloway')
 })
 it('records sleeping Ama before her awakening',()=>{
  const ama='cold-choir-char-ama'
  expect(d.events.filter((e:any)=>e.involvedCharacterIds.includes(ama)).map((e:any)=>e.title)).toEqual(['Row Thirty-One','Ama Opens Her Eyes','Berth Twelve'])
  expect(d.knowledgeFacts.find((f:any)=>f.id==='cold-choir-fact-ama').readerLearnsAtEventId).toBe(event('Row Thirty-One').id)
 })
 it('uses individual source grounded statuses',()=>{
  for(const e of d.events)for(const s of snapshots(e.title)){
   expect(s.statusNotes).not.toContain(e.description)
   expect(s.statusNotes).not.toMatch(/is physically present|directly observed participant|occupies the scene/)
  }
 })
 it('uses bottom-origin map coordinates inside every plate',()=>{
  for(const marker of d.locationMarkers){const map=d.mapLayers.find((m:any)=>m.id===marker.mapLayerId);expect(marker.x).toBeGreaterThanOrEqual(0);expect(marker.x).toBeLessThanOrEqual(map.imageWidth);expect(marker.y).toBeGreaterThanOrEqual(0);expect(marker.y).toBeLessThanOrEqual(map.imageHeight)}
  const hold=d.mapLayers.find((m:any)=>m.id==='cold-choir-map-hold')
  expect(hold.parentMapId).toBe('cold-choir-map-reach')
  expect(d.locationMarkers.filter((m:any)=>m.linkedMapLayerId===hold.id).map((m:any)=>m.id)).toEqual(['cold-choir-loc-shaft'])
  expect(event('Row Thirty-One').locationMarkerId).toBe('cold-choir-loc-row-thirty-one')
 })
 it('uses source-relative elapsed time and keeps the embedded future action in the Quiet',()=>{
  expect(event('The Hatch Opens').timelineId).toBe('cold-choir-timeline-quiet')
  for(const timeline of d.timelines){
   const events=d.events.filter((e:any)=>e.timelineId===timeline.id)
   for(let i=0;i<events.length;i++)expect(events[i].travelDays).toBe(i===0?0:events[i].inWorldTime-events[i-1].inWorldTime)
  }
 })
})
