import fs from 'node:fs'
import assert from 'node:assert/strict'
import {compileInventory} from './compile-inventory.mjs'
import {readReleaseApproval} from './release-approval.mjs'

// Do not integrate a source tranche merely because every record has valid
// references. Resolve last-known inventories at every event as the app does:
// absent former holders can otherwise retain an item after its handoff.
const book=new URL('./',import.meta.url)
const world=JSON.parse(fs.readFileSync(new URL('./authoring-review.pwk',book),'utf8'))
const compiled=compileInventory(world,{worldId:world.world.id,createdAt:0,updatedAt:0})
const byEvent=new Map()
for(const row of compiled.evidence)byEvent.set(row.eventId,[...(byEvent.get(row.eventId)??[]),...row.effects])
const latest=new Map(),expected=new Map(),defects=[]
for(const event of world.events){
  for(const snapshot of world.characterSnapshots.filter(row=>row.eventId===event.id))latest.set(snapshot.characterId,snapshot)
  for(const effect of byEvent.get(event.id)??[])expected.set(`ivanhoe-item-${effect.item}`,effect.holder?`ivanhoe-character-${effect.holder}`:null)
  for(const effect of byEvent.get(event.id)??[]){
    const itemId=`ivanhoe-item-${effect.item}`
    const actual=[...latest.values()].filter(row=>{
      if(!row.inventoryItemIds.includes(itemId))return false
      const stateIndex=world.events.findIndex(event=>event.id===row.eventId)
      const nowIndex=world.events.indexOf(event)
      return !world.knowledgeFacts.some(fact=>fact.tags.includes(`offstage-inventory-removed:${row.characterId}:${itemId}`)&&world.events.findIndex(event=>event.id===fact.readerLearnsAtEventId)>stateIndex&&world.events.findIndex(event=>event.id===fact.readerLearnsAtEventId)<=nowIndex)
    }).map(row=>row.characterId)
    const wanted=expected.get(itemId)
    if(actual.some(id=>id!==wanted)||wanted&&!actual.includes(wanted))defects.push({eventId:event.id,title:event.title,itemId,expectedCarrier:wanted,lastKnownCarriers:actual,source:effect.note})
  }
}
assert.equal(defects.length,0,'Unresolved last-known inventory conflicts')
if(process.argv.includes('--release'))readReleaseApproval(fs.readFileSync(new URL('./authoring-review.pwk',book)))
const report={status:process.argv.includes('--release')?'PASSED SOURCE CUSTODY CHECK AND RECORDED RELEASE APPROVAL':'PASSED SOURCE CUSTODY CHECK; MANUAL APPLICATION APPROVAL IS SEPARATE',...compiled,defects,limitations:['Custody is the last source record, not an invented disposal or unshown handoff.','The55-object selection and uncertain outcomes are documented in INVENTORY_REVIEW.md.','Absent former-holder states must not be fabricated as physical presence.']}
fs.writeFileSync(new URL('./qa/inventory-source-audit.json',book),JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify({status:report.status,actions:compiled.compiledActions,itemStates:compiled.compiledItemStates,placements:compiled.compiledPlacements,lastKnownCustodyDefects:defects.length},null,2))
