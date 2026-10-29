import {expect,test} from 'vitest'
import {itemDefinitions} from '../scripts/les-miserables/item-ledger.mjs'
import {enrichedReview} from '../scripts/les-miserables/build-enrichment-audit.mjs'

test('models the nun’s own coffin separately from the municipal coffin used for the escape',()=>{
 const own=itemDefinitions.get('mother-crucifixion-own-coffin')
 const municipal=itemDefinitions.get('municipal-burial-coffin')
 expect(own?.description).toContain('slept')
 expect(municipal?.description).toContain('administration')
 expect(municipal?.description).not.toContain('Valjean')
 const review=enrichedReview()
 expect(review.get(140).find(row=>row.at===41).items).toContain('mother-crucifixion-own-coffin')
 expect(review.get(140).find(row=>row.at===176).items).toContain('municipal-burial-coffin')
 expect(review.get(143)[0].items).toContain('municipal-burial-coffin')
 expect(review.get(145).find(row=>row.at===43).items).toEqual(expect.arrayContaining(['mother-crucifixion-own-coffin','municipal-burial-coffin']))
})
