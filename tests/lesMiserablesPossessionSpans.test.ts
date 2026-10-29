import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'
import{applyReviewedPossessions,reviewedPossessionSpans}from'../scripts/les-miserables/possession-spans.mjs'
import{itemStateChanges}from'../scripts/les-miserables/item-state-ledger.mjs'

test('keeps the entrusted pistols in Marius’s inventory during the continuous ambush episode',()=>{
 const{world}=buildWorldReview({embedded:false})
 const item='lesmis-world-review-item-javert-signal-pistols'
 const snapshots=world.characterSnapshots.filter(row=>row.characterId==='lesmis-world-review-character-marius'&&row.sortKey>=215&&row.sortKey<221)
 expect(snapshots.length).toBeGreaterThanOrEqual(10)
 for(const snapshot of snapshots)expect(snapshot.inventoryItemIds, snapshot.eventId).toContain(item)
 const before=world.characterSnapshots.find(row=>row.characterId==='lesmis-world-review-character-marius'&&row.eventId==='lesmis-world-review-event-214-1')
 expect(before.inventoryItemIds).not.toContain(item)
 const after=world.characterSnapshots.find(row=>row.characterId==='lesmis-world-review-character-marius'&&row.eventId==='lesmis-world-review-event-229-1')
 expect(after.inventoryItemIds).not.toContain(item)
})

const context={eventAt:(chapter:number,at:number|string)=>`${chapter}|${at}`,
 orderOf:(event:string)=>{const[c,a]=event.split('|');return Number(c)+(a==='start'?0:Number(a)/1e6)},
 cid:(key:string)=>key,id:(_kind:string,key:string)=>key}
const minimalWorld=()=>({items:[{id:'javert-signal-pistols'}],characterSnapshots:[]})

test('a confirmed hand-off or placement inside an interval invalidates assumed possession',()=>{
 const conflict={key:'hypothetical-surrender',item:'javert-signal-pistols',chapter:217,at:37,kind:'placed',location:'gorbeau-marius-room'}
 expect(()=>applyReviewedPossessions(minimalWorld(),context,reviewedPossessionSpans,[...itemStateChanges,conflict])).toThrow('Conflicting custody')
})

test('changed literal source evidence invalidates a possession approval',()=>{
 const spans=structuredClone(reviewedPossessionSpans)
 spans[0].anchors[0][2]='Marius returned both pistols.'
 expect(()=>applyReviewedPossessions(minimalWorld(),context,spans)).toThrow('Stale possession evidence')
})
