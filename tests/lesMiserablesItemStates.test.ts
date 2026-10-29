import { expect, test } from 'vitest'
import { enrichedReview } from '../scripts/les-miserables/build-enrichment-audit.mjs'
import { itemStateChanges } from '../scripts/les-miserables/item-state-ledger.mjs'
import { validateItemStates } from '../scripts/les-miserables/validate-items.mjs'

test('leaves the burned Touquet copy in the Musain fireplace rather than Courfeyrac’s inventory',()=>{
 const row=itemStateChanges.find(change=>change.key==='touquet-charter-burned')
 expect(row).toMatchObject({item:'touquet-charter-copy',chapter:179,at:42,evidenceParagraph:44,kind:'placed',location:'cafe-musain-back-room',condition:'burned'})
 expect(row).not.toHaveProperty('holder')
})

test('distinguishes gifts, storage and bequests from physically carrying the object', () => {
  expect(validateItemStates().sourceConfirmedChanges).toBe(124)
  expect(itemStateChanges.find(row => row.key === 'catherine-set-before-cosette')).toMatchObject({kind:'placed',location:'thenardier-inn-public-room'})
  expect(itemStateChanges.find(row => row.key === 'catherine-in-sleeping-arms')).toMatchObject({kind:'held',holder:'cosette'})
  expect(itemStateChanges.find(row => row.key === 'candlesticks-bequeathed')).toMatchObject({kind:'ownership-report',owner:'cosette'})
  expect(itemStateChanges.find(row => row.key === 'candlesticks-bequeathed')).not.toHaveProperty('holder')
  expect(itemStateChanges.find(row => row.key === 'cosette-outfit-pawned')).toMatchObject({kind:'custody-report',custodian:null})
  const note = itemStateChanges.find(row => row.key === 'javert-note-left')
  expect(note).toMatchObject({kind:'placed',location:'chatelet-police-post',evidenceParagraph:78})
  expect(note).not.toHaveProperty('holder')
})

test('keeps the lost bread coin in the spring and transfers the bucket through the actual hands',()=>{
 expect(itemStateChanges.find(row=>row.key==='bread-coin-given')).toMatchObject({chapter:95,at:21,kind:'held',holder:'cosette',evidenceParagraph:36})
 expect(itemStateChanges.find(row=>row.key==='bread-coin-lost')).toMatchObject({chapter:97,at:9,kind:'placed',location:'montfermeil-forest-spring',evidenceParagraph:10})
 const bucket=itemStateChanges.filter(row=>row.item==='cosette-water-bucket')
 expect(bucket.map(row=>[row.chapter,row.at,row.holder])).toEqual([[97,20,'cosette'],[97,26,'montfermeil-yellow-stranger'],[99,'start','montfermeil-yellow-stranger'],[99,68,'cosette']])
 expect(validateItemStates().sourceConfirmedChanges).toBe(124)
})

test('tracks the cemetery card as a theft followed by surrender at the gate',()=>{
 expect(itemStateChanges.find(row=>row.key==='cemetery-card-stolen')).toMatchObject({item:'gribier-cemetery-card',chapter:144,at:35,evidenceParagraph:38,kind:'held',holder:'fauchelevent'})
 const gate=itemStateChanges.find(row=>row.key==='cemetery-card-surrendered')
 expect(gate).toMatchObject({item:'gribier-cemetery-card',chapter:144,at:119,evidenceParagraph:119,kind:'placed',location:'vaugirard-cemetery-gate'})
 expect(gate).not.toHaveProperty('holder')
})

test('preserves the distinct doll, payment and authorization transfers during the rescue',()=>{
 const row=(key:string)=>itemStateChanges.find(change=>change.key===key)
 expect(row('substitute-coin-pocketed')).toMatchObject({chapter:100,at:25,holder:'madame-thenardier',evidenceParagraph:50})
 expect(row('sisters-doll-set-down')).toMatchObject({chapter:100,at:120,kind:'placed',location:'thenardier-inn-public-room'})
 expect(row('sword-made-into-baby')).toMatchObject({chapter:100,at:96,holder:'cosette'})
 expect(row('gold-coin-in-shoe')).toMatchObject({chapter:100,at:218,kind:'placed',location:'thenardier-children-hearth-room'})
 expect(row('gold-coin-found')).toMatchObject({chapter:101,at:85,holder:'cosette'})
 expect(row('gold-coin-carried-away')).toMatchObject({chapter:101,at:93,holder:'cosette'})
 expect(row('bill-read-by-guest')).toMatchObject({chapter:101,at:21,holder:'montfermeil-yellow-stranger'})
 expect(row('authorization-read')).toMatchObject({chapter:102,at:17,holder:'thenardier'})
 expect(row('authorization-retained')).toMatchObject({chapter:102,at:58,holder:'thenardier'})
 expect(row('catherine-carried-away')).toMatchObject({chapter:101,at:93,holder:'cosette'})
 expect(row('catherine-carried-asleep')).toMatchObject({chapter:103,at:5,holder:'cosette'})
})

test('follows the stolen fragment into the witness’s hand and then Marius’s hand', () => {
  const fragment = itemStateChanges.filter(row => row.item === 'marius-torn-coat-fragment')
  expect(fragment.map(row => [row.chapter,row.at,row.holder])).toEqual([[336,43,'thenardier'],[363,166,'thenardier'],[363,189,'marius']])
  expect(fragment[0].note).toContain('unconscious')
  expect(itemStateChanges.find(row => row.key === 'powder-barrel-broken-open').condition).toBe('broken-open')
})

test('records the Waterloo robbery before the wounded officer offers possessions already taken',()=>{
 const changes=itemStateChanges.filter(row=>row.key.startsWith('waterloo-stolen-'))
 expect(changes).toHaveLength(4)
 expect(changes.map(row=>row.item).sort()).toEqual(['pontmercy-ring','pontmercy-legion-cross','pontmercy-watch','pontmercy-purse'].sort())
 for(const change of changes){
  expect(change).toMatchObject({chapter:89,kind:'held',holder:'waterloo-prowler'})
  expect(change.note).toContain('stolen')
 }
 expect(changes.find(row=>row.item==='pontmercy-ring')).toMatchObject({at:21,evidenceParagraph:24})
 expect(changes.find(row=>row.item==='pontmercy-watch')).toMatchObject({at:33,evidenceParagraph:37})
 expect(changes.find(row=>row.item==='pontmercy-purse')).toMatchObject({at:33,evidenceParagraph:37})
})

test('tracks the abandoned route slip and separates burnt belongings from spared candlesticks', () => {
  expect(itemStateChanges.find(row => row.key === 'route-slip-left')).toMatchObject({
    kind:'placed', chapter:56, at:64, location:'scaufflaire-hire-yard', evidenceParagraph:65,
  })
  for (const item of ['valjean-old-outfit','valjean-thorn-cudgel']) {
    const burnt = itemStateChanges.find(row => row.item === item && row.chapter === 57)
    expect(burnt).toMatchObject({kind:'placed',condition:'burned',at:81,location:'madeleine-bedroom'})
    expect(burnt).not.toHaveProperty('holder')
  }
  expect(itemStateChanges.find(row => row.key === 'candlesticks-restored')).toMatchObject({
    item:'silver-candlesticks',kind:'placed',condition:'intact',chapter:57,at:88,evidenceParagraph:105,
  })
  for (const key of ['passport-pocketed','laffitte-letter-pocketed'])
    expect(itemStateChanges.find(row => row.key === key)).toMatchObject({kind:'held',holder:'valjean',chapter:57,at:41,evidenceParagraph:48})
})

test('follows the posted letter and surviving evidence without rebuilding the burned cudgel',()=>{
 expect(itemStateChanges.find(r=>r.key==='laffitte-letter-posted')).toMatchObject({chapter:68,at:'start',kind:'custody-report',custodian:null})
 expect(itemStateChanges.find(r=>r.key==='gervais-coin-displayed')).toMatchObject({chapter:70,at:22,kind:'placed',location:'madeleine-bedroom'})
 expect(itemStateChanges.find(r=>r.key==='cudgel-tips-displayed')).toMatchObject({item:'valjean-cudgel-iron-tips',chapter:70,at:22,kind:'placed'})
 expect(itemStateChanges.find(r=>r.key==='candlesticks-wrapped')).toMatchObject({chapter:70,at:22,kind:'held',holder:'valjean'})
 expect(itemStateChanges.find(r=>r.key==='property-note-given')).toMatchObject({chapter:70,at:27,kind:'held',holder:'sister-simplice'})
 expect(itemStateChanges.some(r=>r.item==='valjean-thorn-cudgel'&&r.chapter===70)).toBe(false)
})

test('rejects two holders for the same unique object at one scene', () => {
  const gift = itemStateChanges.find(row => row.key === 'candlesticks-given')
  expect(() => validateItemStates(enrichedReview(),[...itemStateChanges,{...gift,key:'duplicate-holder',holder:'myriel'}])).toThrow('Object has two holders')
})

test('rejects an absent inventory holder and source evidence from another segment', () => {
  const gift = itemStateChanges.find(row => row.key === 'candlesticks-given')
  expect(() => validateItemStates(enrichedReview(),[{...gift,holder:'marius'}])).toThrow('Absent inventory holder')
  expect(() => validateItemStates(enrichedReview(),[{...gift,evidenceParagraph:0}])).toThrow('Object evidence outside passage')
})
