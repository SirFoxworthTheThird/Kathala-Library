import assert from 'node:assert/strict'
import { cuts } from './scene-cuts.mjs'
import { calendar, day, sceneClocks, timelineDefs } from './chronology.mjs'

const clocks=sceneClocks.flat()
assert.equal(clocks.length,cuts.flat().length)
assert.equal(new Set(timelineDefs.map(t=>t[0])).size,timelineDefs.length)
assert.equal(calendar.months.reduce((n,m)=>n+m.days,0),365)
for(const scene of clocks) {
  assert.equal(scene.start,cuts[scene.canto-1].find(([start])=>start===scene.start)?.[0])
  assert.ok(timelineDefs.some(t=>t[0]===scene.timeline),`${scene.canto}:${scene.start} timeline`)
  assert.ok(Number.isFinite(scene.inWorldTime),`${scene.canto}:${scene.start} date`)
  assert.ok(Number.isFinite(scene.travelDays)&&scene.travelDays>=0,`${scene.canto}:${scene.start} elapsed`)
}
const history=clocks.filter(scene=>scene.timeline==='history')
for(let index=1;index<history.length;index++) assert.ok(history[index].inWorldTime>=history[index-1].inWorldTime,`History date reverses at ${history[index].canto}:${history[index].start}`)
const at=(canto,start)=>clocks.find(s=>s.canto===canto&&s.start===start)
assert.equal(at(4,84).inWorldTime,day(1497,7,8))
assert.equal(at(1,45).inWorldTime,day(1498,3,2))
assert.equal(at(2,73).inWorldTime,day(1498,4,14))
assert.equal(at(7,16).inWorldTime,day(1498,5,20))
assert.equal(at(10,144).inWorldTime,day(1499,8,29))
assert.equal(at(3,42).inWorldTime,day(1139,7,25))
assert.equal(at(4,28).inWorldTime,day(1385,8,14))
assert.equal(at(3,130).inWorldTime,day(1355))
assert.ok(at(4,84).inWorldTime<at(2,109).inWorldTime,'Gama recounts earlier departure after Melinde audience')
assert.notEqual(at(3,42).timeline,at(2,109).timeline,'recounted history is not the Melinde audience')
assert.notEqual(at(10,10).timeline,at(10,144).timeline,'prophecy is not the homeward fleet')
console.log(`PASS: ${clocks.length} candidate scenes on ${timelineDefs.length} clocks; all numeric dates and elapsed days valid`)
