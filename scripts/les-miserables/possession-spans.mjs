import assert from'node:assert/strict'
import{chapters}from'./source-text.mjs'
import{itemStateChanges}from'./item-state-ledger.mjs'

// Reviewed continuous episodes only. Never infer lifelong possession from the
// last hand-off: the following chapter can rewind, skip years or change holder.
export const reviewedPossessionSpans=[{
 key:'signal-pistols-during-ambush',item:'javert-signal-pistols',holder:'marius',
 start:{chapter:214,at:26},endExclusive:{chapter:221,at:'start'},
 anchors:[
  [214,62,'Marius hid the pistols in his trousers pockets.'],
  [216,0,'cold barrels of the steel pistols in his trousers pockets'],
  [217,47,'Marius kept the pistol in his hand.'],
  [220,263,'Marius fretted with the handle of his pistol.'],
 ],
 note:'Keeps the entrusted pair of loaded signal pistols during the ambush; he has not fired the signal.',
 reason:'The same day runs continuously from the police office to the ambush. The text repeatedly confirms possession, including near the confrontation’s end. Stop before the next chapter rewinds to Javert’s preparations; no subsequent return or permanent ownership is inferred.',
},{
 key:'basket-during-cartridge-collection',item:'gavroche-cartridge-basket',holder:'gavroche',
 start:{chapter:313,at:'start'},endExclusive:{chapter:313,at:38},
 anchors:[
  [313,1,'Gavroche had taken a bottle basket from the wine-shop'],
  [313,27,'Then he picked up his basket, replaced the cartridges'],
  [313,34,'emptying the cartridge-boxes,\nand filling his basket.'],
 ],
 note:'Carries the basket while collecting cartridges outside the barricade.',
 reason:'One brief uninterrupted collection in the street. The spilled contents are recovered within their scene; repeated source handling confirms the basket. Stop at the second hit and the separate placement, before Combeferre retrieves it.',
},{
 key:'flask-during-cartridge-collection',item:'gavroche-found-powder-flask',holder:'gavroche',
 start:{chapter:313,at:12},endExclusive:{chapter:313,at:38},
 anchors:[[313,18,'putting it in his pocket.']],
 note:'Keeps the found powder-flask in his pocket during the collection.',
 reason:'The flask is explicitly pocketed during this same brief outing and no hand-off occurs before the second hit. Stop there; the later recovery and joint cartridge-making do not establish which defender carried it back.',
}]

export function applyReviewedPossessions(world,{eventAt,orderOf,cid,id},spans=reviewedPossessionSpans,changes=itemStateChanges){
 const keys=new Set()
 for(const span of spans){
  assert.ok(!keys.has(span.key),`Duplicate possession span: ${span.key}`);keys.add(span.key)
  assert.ok(span.reason.trim()&&span.note.trim())
  const start=orderOf(eventAt(span.start.chapter,span.start.at))
  const end=orderOf(eventAt(span.endExclusive.chapter,span.endExclusive.at))
  assert.ok(start<end,`Empty possession span: ${span.key}`)
  const initial=changes.find(row=>row.item===span.item&&row.chapter===span.start.chapter&&row.at===span.start.at)
  assert.ok(initial?.kind==='held'&&initial.holder===span.holder,`Span needs a confirmed initial holder: ${span.key}`)
  for(const[chapter,paragraph,literal]of span.anchors){
   assert.ok(chapters[chapter-1].paragraphs[paragraph].text.includes(literal),`Stale possession evidence: ${span.key}`)
   assert.ok(chapter>=span.start.chapter&&chapter<=span.endExclusive.chapter)
  }
  for(const change of changes.filter(row=>row.item===span.item)){
   const order=orderOf(eventAt(change.chapter,change.at))
   if(order>=start&&order<end)assert.ok(change.kind==='held'&&change.holder===span.holder,`Conflicting custody inside possession span: ${span.key}`)
  }
  const itemId=id('item',span.item),characterId=cid(span.holder)
  assert.ok(world.items.some(row=>row.id===itemId),`Unknown possession item: ${span.item}`)
  for(const snapshot of world.characterSnapshots){
   if(snapshot.characterId!==characterId||snapshot.sortKey<start||snapshot.sortKey>=end)continue
   if(snapshot.inventoryItemIds.includes(itemId))continue
   snapshot.inventoryItemIds.push(itemId)
   snapshot.inventoryNotes=[snapshot.inventoryNotes,span.note].filter(Boolean).join(' ')
  }
 }
}
