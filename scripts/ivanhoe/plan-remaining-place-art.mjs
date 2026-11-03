import fs from 'node:fs'
import {locationDefinitions,mapDefinitions} from './location-ledger.mjs'
import {sections,paragraphs} from './source-text.mjs'

const manifest=JSON.parse(fs.readFileSync(new URL('./asset-manifest.json',import.meta.url)))
const existing=new Set(manifest.assets.map(a=>a.entity))
const narrative=sections.filter(s=>s.kind==='narrative')
const roman=n=>{let out='';for(const [v,s] of [[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']])while(n>=v){out+=s;n-=v}return out}
const angles=['a low oblique view emphasizing the threshold','a quiet eye-level view with strong depth','a close foreground framing a distant architectural opening','an intimate side view with directional natural light','a wide environmental view from a sheltered corner','a diagonal composition with a clearly readable principal feature','a view from just inside looking toward the light','a view from the approach with restrained background detail']
const plan=locationDefinitions.filter(p=>!existing.has('place:'+p.key)).map((p,i)=>{
 const match=p.source.match(/^([IVXL]+)(?:\.(\d+))?/)
 const chapter=narrative.findIndex((s,j)=>roman(j+1)===match?.[1])+1
 const first=Number(match?.[2]??3)
 const sourceExcerpt=chapter?paragraphs(narrative[chapter-1].text).slice(first,first+3).map((x,j)=>`${roman(chapter)}.${first+j}: ${x.text}`).join('\n\n'):''
 const map=mapDefinitions.find(m=>m.key===p.map)
 const prompt=`Square full-bleed mature painterly literary LOCATION illustration for Walter Scott's Ivanhoe, late twelfth-century England. Oil-and-watercolour texture, natural materials, muted forest green, warm grey and old gold. Asset subject: ${p.name}. Specifically: ${p.description} Local architectural/landscape constraints: ${map?.constraints??'Only the immediate source-described environment; no invented geographic landmarks.'} Compose ${angles[i%angles.length]}. This is a distinct environmental portrait, NOT a map, plan, collage or diagram. No people, animals, visible readable text, labels, watermark, frame, modern objects, late Gothic architecture, later ruins, film designs, named identity symbols, battle action, flames or future outcomes. Depict the place in a neutral unoccupied condition; omit event-specific bodies, funeral bier, execution apparatus, loot and open hidden storage. Do not show every feature of the parent site: focus tightly on this asset's named place. Unspecified geometry, furniture, colours and building fabric must remain modest illustrative choices; no invented connections to other rooms, routes or geographic claims. Use the following original source excerpt as the physical reference, excluding all characters and actions from the image:\n${sourceExcerpt}`
 return {id:'place-'+p.key,entity:'place:'+p.key,source:p.source,sourceExcerpt,prompt,status:'pending-generation',reviewStatus:'DEFERRED until all remaining illustrations are generated'}
})
fs.writeFileSync(new URL('./art-batch-places-remaining.json',import.meta.url),JSON.stringify(plan,null,2)+'\n')
console.log(`${plan.length} source-referenced location prompts prepared; no artwork validation performed.`)
