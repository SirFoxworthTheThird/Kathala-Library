import { expect,test } from 'vitest'
import { buildWorldReview } from '../scripts/les-miserables/build-world-review.mjs'

test('records the source stages to Arras without inventing a surveyed road or a guide at the destination',()=>{
 const{world}=buildWorldReview({embedded:false})
 const p='lesmis-world-review',id=(kind:string,key:string)=>`${p}-${kind}-${key}`
 const road=world.mapRoutes.find(r=>r.id===id('route','toward-arras'))
 expect(road).toBeDefined()
 expect(road.mapLayerId).toBe(id('map','france'))
 expect(road.waypoints).toEqual(['montreuil-sur-mer','hesdin-inn-front','saint-pol-inn','tinques-road','carency-arras-detour','arras'].map(key=>id('location',key)))
 expect(road.notes).toContain('not a surveyed road')
 const moves=world.characterMovements.filter(r=>r.id.startsWith(id('movement','arras-')))
 expect(moves).toHaveLength(6)
 for(const move of moves){
  expect(move.waypoints.length).toBeGreaterThanOrEqual(2)
  expect(world.events.find(e=>e.id===move.eventId).involvedCharacterIds).toContain(move.characterId)
  const snap=world.characterSnapshots.find(s=>s.characterId===move.characterId&&s.eventId===move.eventId)
  expect(move.waypoints.at(-1)).toBe(snap.currentLocationMarkerId)
  expect(move.travelModeId).toBeNull()
 }
 expect(moves.filter(r=>r.characterId===id('character','tinques-postilion'))).toHaveLength(1)
 expect(moves.some(r=>r.characterId===id('character','tinques-postilion')&&r.eventId===id('event','61-1'))).toBe(false)
})
