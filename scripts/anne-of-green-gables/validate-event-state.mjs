import assert from 'node:assert/strict'
import { eventTitles } from './event-titles.mjs'
import { chapterState } from './event-state.mjs'
import { characters, locations } from './world-ledger.mjs'

const characterNames=new Set(characters.map(([name])=>name)), locationNames=new Set(locations.map(([name])=>name))
for(const [chapter,titles] of eventTitles){
  const states=chapterState.get(chapter)
  assert.equal(states?.length,titles.length,`Chapter ${chapter} state count`)
  for(let i=0;i<states.length;i++){
    const [place,cast]=states[i]
    assert.ok(locationNames.has(place),`Unknown place ${chapter}.${i+1}: ${place}`)
    assert.equal(new Set(cast).size,cast.length,`Duplicate cast ${chapter}.${i+1}`)
    for(const name of cast) assert.ok(characterNames.has(name),`Unknown character ${chapter}.${i+1}: ${name}`)
  }
}
console.log(`PASS: ${[...chapterState.values()].flat().length} events have explicit locations and unique physical-presence casts.`)
