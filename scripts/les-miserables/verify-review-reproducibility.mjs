import assert from 'node:assert/strict'
import fs from 'node:fs'
import {createHash} from 'node:crypto'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'

// This verifies the unfinished local fixture, never a published Library edition.
const root=new URL('./',import.meta.url)
const commands=['stage-reviewed-manuscript.mjs','chronology-plan.mjs','pacing-plan.mjs','build-world-review.mjs']
const files=['manuscript-draft.pwk','CHRONOLOGY_REVIEW.json','PACING_REVIEW.json','qa/world-review.pwk']
function regenerate(){
 for(const name of commands)execFileSync(process.execPath,[fileURLToPath(new URL(name,root))],{stdio:'pipe'})
}
function digests(){
 return Object.fromEntries(files.map(name=>{
  const bytes=fs.readFileSync(new URL(name,root))
  return[name,{sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length}]
 }))
}
regenerate()
const before=digests()
regenerate()
assert.deepEqual(digests(),before,'Local review files changed across consecutive regeneration')
const report={scope:'local review fixture only; not final release',...before['qa/world-review.pwk'],
 regeneration:'byte-for-byte identical after two consecutive CLI regenerations; manuscript, chronology and pacing also identical',files:before}
fs.writeFileSync(new URL('qa/world-review-reproducibility.json',root),JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify(report,null,2))
