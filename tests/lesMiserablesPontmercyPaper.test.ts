import {expect,test} from 'vitest'
import {buildWorldReview} from '../scripts/les-miserables/build-world-review.mjs'
import {chapters} from '../scripts/les-miserables/source-text.mjs'

test('models the servant handing the colonel’s instructions to Marius as direct participation',()=>{
 expect(chapters[170].paragraphs[35].text.replace(/\s+/g,' ')).toContain('handed to Marius')
 const{world}=buildWorldReview({embedded:false}),p='lesmis-world-review'
 const event=world.events.find(row=>row.id===`${p}-event-171-5`)
 expect(event.involvedCharacterIds.sort()).toEqual(['marius','pontmercy-servant'].map(key=>`${p}-character-${key}`))
 const rows=world.characterSnapshots.filter(row=>row.eventId===event.id)
 expect(rows).toHaveLength(2)
 expect(rows.find(row=>row.characterId===`${p}-character-marius`).inventoryItemIds).toContain(`${p}-item-pontmercy-last-instructions`)
 expect(rows.find(row=>row.characterId===`${p}-character-pontmercy-servant`).inventoryItemIds).not.toContain(`${p}-item-pontmercy-last-instructions`)
})
