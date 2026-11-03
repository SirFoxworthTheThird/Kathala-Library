// Rebuild from frozen selected artwork. Image generation itself is not deterministic.
import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {spawnSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
const root=fileURLToPath(new URL('../../',import.meta.url))
const manifest=JSON.parse(fs.readFileSync(new URL('./map-manifest.json',import.meta.url),'utf8'))
const paths=['scripts/ivanhoe/manuscript-draft.pwk','scripts/ivanhoe/authoring-review.pwk',...manifest.maps.flatMap(map=>[map.original,map.vectorSource,map.compressed.path])]
const digest=path=>createHash('sha256').update(fs.readFileSync(new URL(`../../${path}`,import.meta.url))).digest('hex')
const before=new Map(paths.map(path=>[path,digest(path)]))
for(const [program,args] of [[process.execPath,['scripts/ivanhoe/import-manuscript.mjs']],['python',['scripts/ivanhoe/compress-maps.py']],[process.execPath,['scripts/ivanhoe/generate-review-world.mjs','--quiet']]]){
  const result=spawnSync(program,args,{cwd:root,encoding:'utf8',windowsHide:true})
  assert.equal(result.status,0,`${program} ${args.join(' ')}\n${result.stderr}\n${result.stdout}`)
}
const checks=paths.map(path=>{
  const sha256=digest(path)
  assert.equal(sha256,before.get(path),`Deterministic selected-art packaging: ${path}`)
  return {path,sha256,byteIdentical:true}
})
fs.writeFileSync(new URL('./qa/illustrated-map-determinism.json',import.meta.url),JSON.stringify({scope:'Frozen illustrated inputs and incomplete fixture packaging only; not generative reproducibility or release approval',checks},null,2)+'\n')
console.log(`Byte-identical frozen-map rebuild: ${checks.length} files`)
