import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'

test('models the directly witnessed convoy encounter without moving the observers into its road',()=>{
 const{world}=buildWorldReview({embedded:false})
 const rows=world.characterSnapshots.filter(r=>r.eventId==='lesmis-world-review-event-240-3')
 expect(rows).toHaveLength(6)
 for(const actor of ['valjean','cosette'])expect(rows.find(r=>r.characterId===`lesmis-world-review-character-${actor}`)?.currentLocationMarkerId).toBe('lesmis-world-review-location-barriere-maine-timber-yard')
 for(const actor of ['convoy-escort-captain','convoy-hooked-cudgel-guard','convoy-warning-woman','convoy-warning-boy'])expect(rows.find(r=>r.characterId===`lesmis-world-review-character-${actor}`)?.currentLocationMarkerId).toBe('lesmis-world-review-location-barriere-maine-road')
 expect(new Set(rows.map(r=>r.statusNotes)).size).toBe(6)
 expect(rows.find(r=>r.characterId.endsWith('-convoy-escort-captain'))?.statusNotes).toMatch(/whip/)
 expect(rows.find(r=>r.characterId.endsWith('-convoy-warning-woman'))?.statusNotes).toMatch(/warning/)
})
