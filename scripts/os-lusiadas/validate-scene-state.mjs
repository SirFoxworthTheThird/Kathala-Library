import assert from 'node:assert/strict'
import { cuts } from './scene-cuts.mjs'
import { places } from './map-model.mjs'
import { actorNames, sceneState } from './scene-state.mjs'

const placeKeys=new Set(places.map(p=>p.key))
let scenes=0,presences=0
for(let cantoIndex=0;cantoIndex<sceneState.length;cantoIndex++) {
  const rows=sceneState[cantoIndex],entries=cuts[cantoIndex]
  assert.equal(rows.length,entries.length,`Canto ${cantoIndex+1} row count`)
  for(let index=0;index<rows.length;index++) {
    const [start,place,cast,tension,handoff]=rows[index]
    assert.equal(start,entries[index][0],`Canto ${cantoIndex+1} scene ${index+1} stanza start`)
    assert.ok(place===null||placeKeys.has(place),`Canto ${cantoIndex+1}:${start} place`)
    const codes=cast?cast.split(' '):[]
    assert.equal(codes.length,new Set(codes).size,`Canto ${cantoIndex+1}:${start} cast unique`)
    for(const code of codes) assert.ok(actorNames[code],`Canto ${cantoIndex+1}:${start} actor ${code}`)
    assert.ok(Number.isInteger(tension)&&tension>=1&&tension<=5,`Canto ${cantoIndex+1}:${start} tension`)
    assert.ok(handoff.length>=25,`Canto ${cantoIndex+1}:${start} handoff note`)
    scenes++;presences+=codes.length
  }
}
console.log(`PASS: direct-presence and hand-off ledger for ${scenes} scenes in ${sceneState.length} of 10 cantos; ${presences} actor-presence decisions.`)
