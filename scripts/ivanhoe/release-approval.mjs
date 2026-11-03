import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'

export const requiredReleaseGates=['sourceAndScenes','castAndStates','chronologyAndPacing','inventory','supportingAndDisclosure','artwork','maps','readerApplication']
export function validateReleaseApproval(approval,candidateSha256,gates=requiredReleaseGates){
  assert.equal(approval.candidateSha256,candidateSha256,'Release blocked: approval belongs to different candidate bytes')
  for(const key of gates){
    const gate=approval.gates?.[key]
    assert.equal(gate?.complete,true,`Release blocked: ${key}`)
    assert.ok(Array.isArray(gate.evidence)&&gate.evidence.length,`Evidence missing: ${key}`)
    assert.ok(gate.evidence.every(path=>typeof path==='string'&&path.length>0),`Invalid evidence: ${key}`)
  }
  return approval
}
export function readReleaseApproval(bytes,gates=requiredReleaseGates){
  const book=new URL('./',import.meta.url),path=new URL('./RELEASE_APPROVAL.json',book)
  assert.ok(fs.existsSync(path),'Release blocked: final source, artwork, custody, disclosure and application approvals are not recorded')
  const approval=validateReleaseApproval(JSON.parse(fs.readFileSync(path,'utf8')),createHash('sha256').update(bytes).digest('hex'),gates)
  for(const key of gates)for(const path of approval.gates[key].evidence)assert.ok(fs.existsSync(new URL(path,book)),`Evidence file missing: ${path}`)
  return approval
}
