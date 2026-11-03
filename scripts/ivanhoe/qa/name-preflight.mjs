import fs from 'node:fs'
import assert from 'node:assert/strict'
import {readerTexts,sortKeys,firstSeen} from '../../lib/reader-gate.mjs'
const w=JSON.parse(fs.readFileSync(new URL('../authoring-review.pwk',import.meta.url),'utf8'))
const key=sortKeys(w),met=firstSeen(w),texts=readerTexts(w),early=[]
for(const c of w.characters){
 for(const n of [...c.nameChanges.map(n=>({name:n.name,eventId:n.eventId})),...c.aliasesFrom.map(a=>({name:a.alias,eventId:a.eventId}))]){
  const at=key.get(n.eventId);if(!(at>(met.get(c.id)??-Infinity)))continue
  if(w.world.name.toLowerCase().includes(n.name.toLowerCase()))continue
  const rx=new RegExp('\\b'+n.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','i')
  for(const t of texts){if(t.from===undefined||t.from>=at)continue;const r=w[t.table].find(r=>r.id===t.id);if(typeof r?.[t.field]==='string'&&rx.test(r[t.field]))early.push([n.name,t.id,t.field])}
 }
}
assert.deepEqual(early,[]);console.log('Candidate name-gate preflight passed')
