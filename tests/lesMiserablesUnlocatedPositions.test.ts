import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'
import{sourceUnlocatedPositions,validateUnlocatedPositions,isSourceUnlocatedSnapshot}from'../scripts/les-miserables/unlocated-positions.mjs'

test('requires source evidence for every unknown actor position rather than fabricating a marker',()=>{
 expect(validateUnlocatedPositions(enrichedReview()).approved).toBe(28)
 expect(sourceUnlocatedPositions.flatMap(row=>row.actors)).toHaveLength(28)
})

test('accepts only the registered actor and cut with both position fields unknown',()=>{
 const row={eventId:'test-event-175-2',characterId:'test-character-marius',currentLocationMarkerId:null,currentMapLayerId:null}
 expect(isSourceUnlocatedSnapshot(row)).toBe(true)
 expect(isSourceUnlocatedSnapshot({...row,characterId:'test-character-gillenormand'})).toBe(false)
 expect(isSourceUnlocatedSnapshot({...row,eventId:'test-event-175-3'})).toBe(false)
 expect(isSourceUnlocatedSnapshot({...row,currentMapLayerId:'test-map-paris'})).toBe(false)
})

test('rejects an unregistered unknown position and a stale approval',()=>{
 const review=enrichedReview(),rows=review.get(15).map(row=>({...row}))
 rows[0]={...rows[0],location:null}
 const broken=new Map(review);broken.set(15,rows)
 expect(()=>validateUnlocatedPositions(broken)).toThrow('Unregistered unknown position')
 const changed=new Map(review),at=changed.get(67).findIndex(row=>row.at===22)
 const known=changed.get(67).map(row=>({...row}));known[at]={...known[at],actorLocations:{'infirmary-yard-girl':'montreuil-factory-yard'}};changed.set(67,known)
 expect(()=>validateUnlocatedPositions(changed)).toThrow('Stale unknown-position approval')
})
