import fs from 'node:fs'
import vm from 'node:vm'
const requests=JSON.parse(fs.readFileSync(new URL('./generation-requests.json',import.meta.url),'utf8'))
const fixed=[['world','cover'],null,null,null,null,null,null,null,
 ['items','carpetbag','brooch','slate','cordial'],['items','liniment','dress','dye','flat'],
 ['mixed','items/medal','items/scholarship','locations/prince-edward-island','locations/charlottetown'],
 ['locations','avonlea-district','bright-river','white-sands','green-gables'],
 ['locations','lynde-s-hollow','orchard-slope','lake-of-shining-waters','white-way-of-delight'],
 ['locations','avonlea-school','avonlea-church','avonlea-manse','haunted-wood'],
 ['locations','lover-s-lane','idlewild','barry-pond-bridge','diana-s-playhouse'],
 ['locations','green-gables-kitchen','east-gable','green-gables-parlour','green-gables-orchard'],
 ['locations','green-gables-yard','queen-s-academy','charlottetown-exhibition','white-sands-hotel'],
 ['mixed','locations/beechwood','factions/household','factions/queens','factions/story'],
 ['characters','miss-rogerson']]
const aliases={anne:'anne-shirley',marilla:'marilla-cuthbert',matthew:'matthew-cuthbert',diana:'diana-barry',stationmaster:'the-stationmaster'}
const rows=[]
for(let i=0;i<requests.length;i++){
 const request=requests[i], prompts=[]
 // The archived code has no tool access in this context. The sole callable
 // stub records request arguments; it never generates or loads an image.
 const context=vm.createContext({tools:{image_gen__imagegen:async args=>{prompts.push(args.prompt);return {output_hint:'recorded'}}},text:()=>{},generatedImage:()=>{},store:()=>{}})
 await new vm.Script(`(async()=>{${request.requestCode}\n})()`).runInContext(context,{timeout:1000})
 let mapping=fixed[i]
 if(!mapping){const literal=request.requestCode.match(/const specs\s*=\s*(\[[\s\S]*?\]);/)[1];const specs=new vm.Script(literal).runInNewContext();mapping=['characters',...specs.map(([id])=>aliases[id]??id)]}
 for(let j=0;j<prompts.length;j++){
  const kind=mapping[0], id=mapping[j+1],relative=kind==='mixed'?id:`${kind}/${id}`
  const path=kind==='world'?'library/anne-of-green-gables/art/generated/cover.png':`library/anne-of-green-gables/art/generated/${relative}.png`
  rows.push({path,prompt:prompts[j],requestId:request.callId,recovery:'Exact tool request recovered from the authoring-session log.'})
 }
}
for(const a of JSON.parse(fs.readFileSync(new URL('./new-art-prompts.json',import.meta.url),'utf8'))){const path=`library/anne-of-green-gables/art/generated/${a.category}/${a.id}.png`;if(!rows.some(r=>r.path===path))rows.push({path,prompt:a.prompt,recovery:'Exact tool request recorded at generation on 12 October 2026.'})}
const extra=JSON.parse(fs.readFileSync(new URL('./extra-art-prompt.json',import.meta.url),'utf8'))
rows.push({path:`library/anne-of-green-gables/art/generated/characters/${extra.id}.png`,prompt:extra.prompt,recovery:'Exact tool request recorded at generation on 12 October 2026.'})
const replacement=JSON.parse(fs.readFileSync(new URL('./replacement-art-prompt.json',import.meta.url),'utf8'))
rows[rows.findIndex(r=>r.path===replacement.path)]=replacement
fs.writeFileSync(new URL('./art-prompts.json',import.meta.url),JSON.stringify(rows,null,2)+'\n')
console.log(`Recovered ${rows.length} exact asset prompts.`)
