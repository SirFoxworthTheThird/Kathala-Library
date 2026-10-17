import {describe,it,expect} from 'vitest'
import raw from '../library/the-undersong.pwk?raw'
const d=JSON.parse(raw)
const event=(title:string)=>d.events.find((e:any)=>e.title===title)
const cast=(title:string)=>event(title).involvedCharacterIds.map((id:string)=>id.replace('undersong-char-','')).sort()
const snaps=(title:string)=>d.characterSnapshots.filter((s:any)=>s.eventId===event(title).id)

describe('The Undersong source corrections',()=>{
 it('places the Ledger conversation at the high desk in school',()=>{
  const e=event('What the Children Say in Sleep')
  expect(e.locationMarkerId).toBe('undersong-loc-school')
  expect(snaps(e.title).every((s:any)=>s.currentLocationMarkerId===e.locationMarkerId)).toBe(true)
 })
 it('records Ezra and Bower at the blocked entrance and keeps Tom out of the churchyard',()=>{
  expect(cast('Tom Comes Out of the Earth')).toEqual(['bower','ezra','tom'])
  expect(event('Tom Comes Out of the Earth').description).toMatch(/Bower breaking his pick/)
  expect(cast('Silas Leaves Footprints')).toEqual(['ezra'])
  expect(event('Silas Leaves Footprints').description).toMatch(/returns to lock/)
 })
 it('gives the received Ledger to Ezra and does not infer a holder for a mounted instrument',()=>{
  const parcel=snaps('The Parcel for Ezra')
  expect(parcel.find((s:any)=>s.characterId==='undersong-char-ezra').inventoryItemIds).toEqual(['undersong-item-dream-ledger'])
  expect(parcel.find((s:any)=>s.characterId==='undersong-char-agnes').inventoryItemIds).toEqual([])
  expect(d.itemPlacements.filter((p:any)=>p.eventId===event('The Parcel for Ezra').id&&p.itemId==='undersong-item-dream-ledger')).toEqual([])
  expect(snaps('The Hydrophone at the Boards').flatMap((s:any)=>s.inventoryItemIds)).not.toContain('undersong-item-hydrophone')
 })
 it('gives every person an individual action instead of copying the event synopsis',()=>{
  expect(d.characterSnapshots.length).toBe(98)
  for(const e of d.events){
   const rows=snaps(e.title)
   expect(rows.map((s:any)=>s.characterId).sort()).toEqual([...e.involvedCharacterIds].sort())
   for(const s of rows){expect(s.statusNotes).not.toContain(e.description);expect(s.statusNotes).not.toMatch(/is physically present|during “/)}
  }
  expect(snaps('Breathing Stone').find((s:any)=>s.characterId==='undersong-char-tom').statusNotes).toMatch(/bleeding from both ears/)
  expect(snaps('Breathing Stone').find((s:any)=>s.characterId==='undersong-char-pell').statusNotes).toMatch(/Works the pick/)
 })
 it('anchors the mine markers in the entrance and chamber and bends the route along galleries',()=>{
  const loc=(id:string)=>d.locationMarkers.find((l:any)=>l.id==='undersong-loc-'+id)
  expect([loc('adit').x,loc('adit').y]).toEqual([140,290])
  expect([loc('hollow').x,loc('hollow').y]).toEqual([1400,760])
  expect(d.mapRoutes.find((r:any)=>r.id==='undersong-route-drift-descent').waypoints.length).toBeGreaterThan(10)
  expect(loc('whitby').x).toBeGreaterThan(loc('loftus').x)
  expect(loc('whitby').y).toBeLessThan(loc('loftus').y)
 })
})
