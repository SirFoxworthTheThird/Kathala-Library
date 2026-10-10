import assert from 'node:assert/strict'
import { sceneState } from './scene-state.mjs'
import { snapshotNotes } from './snapshot-ledger.mjs'

let count=0
const allTexts=[]
for(let cantoIndex=0;cantoIndex<sceneState.length;cantoIndex++) {
  for(const [start,,cast] of sceneState[cantoIndex]) {
    const key=`${cantoIndex+1}:${start}`
    const codes=cast?cast.split(' '):[]
    const notes=snapshotNotes[key]??{}
    assert.deepEqual(Object.keys(notes).sort(),[...codes].sort(),`${key} exactly one status per direct actor`)
    for(const [code,text] of Object.entries(notes)) {
      assert.ok(text.length>=45,`${key}/${code} specific status`)
      assert.doesNotMatch(text,/state carried|ongoing context|not yet directly involved/i,`${key}/${code} placeholder`)
      allTexts.push(text)
      count++
    }
  }
}
assert.equal(allTexts.length,new Set(allTexts).size,'No two actor-event snapshots share a status')
assert.equal(Object.keys(snapshotNotes).length,sceneState.flat().filter(row=>row[2]).length,'No orphan snapshot note')
console.log(`PASS: ${count} unique actor-event status notes across ${sceneState.length} reviewed cantos`)
