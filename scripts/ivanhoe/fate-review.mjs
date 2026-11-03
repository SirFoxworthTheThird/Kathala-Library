import assert from 'node:assert/strict'

// Only directly established deaths belong on the embodied person's state.
// Reported deaths, including the mistaken report about Athelstane, are facts
// with their own reading-order correction, never an invented body snapshot.
export const directFates=[
  {chapter:31,from:92,key:'ulrica',isAlive:false,source:'XXXI.92',reason:'The narrator explicitly describes her death in the collapsing turret.'},
  {chapter:43,from:82,key:'brian',isAlive:false,source:'XLIII.84',reason:'The unhelmeted champion is explicitly found dead after the combat.'},
]

export function applyFateReviews(chapters){
  for(const fate of directFates){
    const scene=chapters.find(c=>c.chapter===fate.chapter)?.scenes.find(s=>s.from===fate.from)
    assert.ok(scene&&Object.hasOwn(scene.cast,fate.key),`Direct fate actor ${fate.chapter}:${fate.from}:${fate.key}`)
    scene.fates={...scene.fates,[fate.key]:{isAlive:fate.isAlive,source:fate.source,reason:fate.reason}}
  }
}
