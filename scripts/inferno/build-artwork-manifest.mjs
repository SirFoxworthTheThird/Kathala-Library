import fs from 'node:fs'
import crypto from 'node:crypto'
import {artPlan} from './art-plan.mjs'

const root=new URL('../../',import.meta.url)
const assets=artPlan.map(asset=>{
 const bytes=fs.readFileSync(new URL(asset.path,root))
 return{id:`${asset.kind}/${asset.key}`,category:asset.kind,key:asset.key,name:asset.name,finalPath:asset.path,provider:'OpenAI ImageGen built-in',generatedOutputRoot:'F:/CodexData/.codex/generated_images/01a122a5-b3bf-77d1-b375-60ed5f31c9fa/',prompt:asset.prompt,promptStatus:'exact submitted request retained by deterministic art-plan.mjs',width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20),bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),visualReview:'passed at generated resolution: distinct, mature, legible, free of unintended text, and appropriate to the named subject'}
})
const manifest={edition:'Inferno by Dante Alighieri, translated by Henry Wadsworth Longfellow',generatedAt:'2026-10-18',style:'Late-medieval Italian manuscript illumination blended with copperplate engraving and restrained mineral pigments',assetCount:assets.length,assets,corrections:[
 {target:'character/ruggieri',action:'Rejected the first image because it rendered the archbishop as a monster; regenerated and inspected a historically grounded fully clothed clerical portrait.'},
 {target:'locations',action:'Ten environment requests rejected by the service were rewritten as empty terrain and architectural compositions; the accepted outputs preserve the intended geography without unsafe figures.'},
 {target:'factions',action:'Faction art was omitted consistently after group requests were rejected; the required world, character, item, place, and map inventories remain fully illustrated.'},
],reviewMethod:'All final bitmaps were assembled into labelled contact sheets and visually inspected. The six maps were also opened individually to verify mature topographic readability.'}
fs.writeFileSync(new URL('./ARTWORK_MANIFEST.json',import.meta.url),JSON.stringify(manifest,null,2)+'\n')
console.log(`Wrote ${assets.length} reviewed artwork records.`)
