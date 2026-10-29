import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'

test('retains Marius’s direct return and pistol handling on his own side of the wall',()=>{
 for(const at of ['start',37]){
  const row=enrichedReview().get(217).find(row=>row.at===at)
  expect(row.present.map(([key])=>key)).toContain('marius')
  expect(row.actorLocations.marius).toBe('gorbeau-partition-aperture')
 }
})

test('keeps the two morning gifts distinct and exchanges the key for signal pistols',()=>{
 const row=(key:string)=>itemStateChanges.find(change=>change.key===key)
 expect(row('benefactor-coin-assigned')).toMatchObject({item:'leblanc-five-franc-piece',chapter:212,at:55,holder:'madame-jondrette'})
 expect(row('neighbor-coin-assigned')).toMatchObject({item:'marius-five-franc-gift',chapter:217,at:9,holder:'madame-jondrette'})
 expect(row('entrance-key-lent')).toMatchObject({chapter:214,at:26,holder:'pontoise-substitute-inspector'})
 expect(row('signal-pistols-received')).toMatchObject({chapter:214,at:26,holder:'marius'})
 expect(row('signal-pistols-cocked')).toMatchObject({chapter:217,at:37,holder:'marius'})
 expect(row('chairs-arranged')).toMatchObject({chapter:217,at:37,kind:'placed',location:'gorbeau-jondrette-attic'})
 expect(row('evening-gold-set-down')).toMatchObject({chapter:218,at:'start',kind:'placed',location:'gorbeau-jondrette-attic'})
})
