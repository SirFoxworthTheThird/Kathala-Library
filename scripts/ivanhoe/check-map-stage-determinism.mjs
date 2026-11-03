// Scoped reproducibility check. Passing this does not approve the edition.
import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {spawnSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
const root=fileURLToPath(new URL('../../',import.meta.url))
const torquilstone=process.argv.includes('--torquilstone'),templestowe=process.argv.includes('--templestowe'),later=process.argv.includes('--later-maps')
const keys=later?['botolph','coningsburgh','coningsburgh-keep','coningsburgh-upper','coningsburgh-guests','york','don-woods']:templestowe?['templestowe','templestowe-hall','templestowe-rooms','templestowe-lists']:torquilstone?['torquilstone','torquilstone-interior','torquilstone-dungeon','torquilstone-turret','torquilstone-postern-defence']:['ashby-house','ashby-house-upper','ashby-house-sickroom','ashby-woods','ashby-castle']
const paths=['scripts/ivanhoe/manuscript-draft.pwk','scripts/ivanhoe/authoring-review.pwk',...keys.flatMap(key=>[
  `scripts/ivanhoe/map-originals/${key}.svg`,`scripts/ivanhoe/map-originals/${key}.png`,`scripts/ivanhoe/map-reviewed/${key}.webp`,
])]
const digest=path=>createHash('sha256').update(fs.readFileSync(new URL(`../../${path}`,import.meta.url))).digest('hex')
const before=new Map(paths.map(path=>[path,digest(path)]))
function run(program,args){
  const result=spawnSync(program,args,{cwd:root,encoding:'utf8',windowsHide:true})
  assert.equal(result.status,0,`${program} ${args.join(' ')}\n${result.stderr}\n${result.stdout}`)
}
for(const script of ['import-manuscript.mjs',...(later?['draw-botolph.mjs','draw-coningsburgh.mjs','draw-york.mjs','draw-don-woods.mjs']:templestowe?['draw-templestowe.mjs']:torquilstone?['draw-torquilstone.mjs']:['draw-ashby-house.mjs','draw-ashby-surroundings.mjs'])])run(process.execPath,[`scripts/ivanhoe/${script}`])
for(const key of keys)run(process.execPath,['scripts/ivanhoe/render-plan.mjs',key])
run('python',['scripts/ivanhoe/compress-maps.py'])
run(process.execPath,['scripts/ivanhoe/generate-review-world.mjs'])
const evidence=paths.map(path=>{
  const sha256=digest(path)
  assert.equal(sha256,before.get(path),`Deterministic ${path}`)
  return {path,sha256,byteIdentical:true}
})
fs.writeFileSync(new URL(later?'./qa/later-maps-determinism.json':templestowe?'./qa/templestowe-determinism.json':torquilstone?'./qa/torquilstone-determinism.json':'./qa/country-house-surroundings-determinism.json',import.meta.url),JSON.stringify({scope:'Selected map plans and incomplete source/review fixtures only; not release approval',checks:evidence},null,2)+'\n')
console.log(`Byte-identical regeneration: ${evidence.length} files`)
