import { expect,test } from 'vitest'
import { itemArtPlan } from '../scripts/les-miserables/item-art-plan.mjs'
import { itemDefinitions } from '../scripts/les-miserables/item-ledger.mjs'
import { buildWorldReview } from '../scripts/les-miserables/build-world-review.mjs'

const keys=['silver-candlesticks','silver-tableware','yellow-passport','gervais-forty-sous','valjean-thorn-cudgel','valjean-old-outfit',
 'cosette-outfit','cosette-water-bucket','cosette-stockings','cosette-lead-sword','catherine-doll','green-watering-pot',
 'pontmercy-ring','pontmercy-legion-cross','pontmercy-watch','pontmercy-purse','madeleine-route-slip','valjean-property-note',
 'mother-crucifixion-own-coffin','municipal-burial-coffin','gribier-cemetery-card',
 'javert-service-note','baptistine-letter','baptistine-supper-letter','bobbies-writing-sample','brujon-rue-plumet-note',
 'chanvrerie-reserve-powder-barrel','coerced-fabre-summons','cosette-blotting-book',
 'four-petitions-packet','jondrette-marius-appeal','leblanc-relief-parcel','leblanc-brown-greatcoat',
 'jondrette-cold-chisel','jondrette-charcoal-brazier','jondrette-kitchen-knife','leblanc-four-louis-relief',
 'cosette-bread-fifteen-sous','cosette-childhood-mourning-clothes','cosette-gold-twenty-franc-piece',
 'courfeyrac-barricade-coffer','fantine-child-release-letter','fantine-knitted-petticoat','gavroche-triggerless-pistol','gavroche-woollen-shawl']

test('gives every modelled object a source-context art plan without accepting candidates',()=>{
 for(const key of itemDefinitions.keys()){
  const plan=itemArtPlan(key)
  expect(plan.key).toBe(key)
  expect(plan.kind).toBe('item')
  expect(plan.firstScene).toMatch(/^\d+-\d+$/)
  expect(plan.status).toContain('Candidate')
 }
 expect(itemArtPlan('silver-candlesticks').depictionSource).toEqual({chapter:6,paragraphs:[16,17],endExclusive:true})
 expect(itemArtPlan('yellow-passport').prompt).toContain('large sheet of yellow')
 expect(itemArtPlan('valjean-thorn-cudgel').prompt).toContain('iron at both ends')
 expect(()=>itemArtPlan('not-a-source-item')).toThrow('Unknown illustrated item')
})

test('assigns accepted object images to objects without borrowing map or portrait assets',()=>{
 const{world,report}=buildWorldReview({embedded:false})
 const forbidden=new Set([...world.mapLayers.map(r=>r.imageId),...world.characters.map(r=>r.portraitImageId)])
 for(const key of keys){
  const item=world.items.find(r=>r.id===`lesmis-world-review-item-${key}`)
  expect(item.imageId,`${key} needs its own accepted object art`).toBeTruthy()
  expect(forbidden.has(item.imageId)).toBe(false)
  expect(world.blobs.find(r=>r.id===item.imageId)?.url).toBe(`art-staging/items/${key}.webp`)
 }
 expect(report.missingItemIllustrations).toBe(2)
 expect(report.missingLocationIllustrations).toBe(324)
})
