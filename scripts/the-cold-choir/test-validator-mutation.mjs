import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import {spawnSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'../..'),source=path.join(root,'library/the-cold-choir.pwk'),temp=path.join(os.tmpdir(),`cold-choir-mutated-${process.pid}.pwk`)
const data=JSON.parse(fs.readFileSync(source,'utf8'));data.sceneTexts[20].text=data.sceneTexts[20].text.replace(/\S+/,'OMITTED');fs.writeFileSync(temp,JSON.stringify(data))
const result=spawnSync(process.execPath,[path.join(here,'validate-book.mjs'),temp],{encoding:'utf8'});fs.rmSync(temp,{force:true})
if(result.status===0)throw Error('Validator accepted a deliberately mutated scene')
if(!/AssertionError/.test(result.stderr))throw Error(`Validator failed for an unexpected reason: ${result.stderr}`)
console.log('PASS: dedicated validator rejected a deliberate manuscript mutation.')
