import{expect,test}from 'vitest'
import{buildWorldReview}from '../scripts/les-miserables/build-world-review.mjs'

test('records the rescue debt, unreturned attachment and late family reconciliation at their source disclosures',()=>{
 const{world}=buildWorldReview({embedded:false}),p='lesmis-world-review'
 const relation=key=>world.relationships.find(row=>row.id===`${p}-relationship-${key}`)
 expect(relation('waterloo-debt')).toMatchObject({startEventId:`${p}-event-89-5`,characterAId:`${p}-character-thenardier`,characterBId:`${p}-character-pontmercy`})
 expect(relation('inherited-waterloo-debt')).toBeDefined()
 const help=relation('eponine-marius')
 expect(help?.description).not.toContain('dies')
 expect(help).toMatchObject({startEventId:`${p}-event-232-4`})
 const attachment=world.relationshipSnapshots.find(row=>row.relationshipId===help.id&&row.eventId===`${p}-event-293-6`)
 expect(attachment).toMatchObject({isActive:false})
 const family=relation('valjean-marius')
 expect(family).toBeDefined()
 expect(world.relationshipSnapshots.find(row=>row.relationshipId===family.id&&row.eventId===`${p}-event-364-1`).label).toBe('Father and grateful son')
})
