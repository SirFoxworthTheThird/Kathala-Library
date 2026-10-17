import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import {fileURLToPath} from 'node:url'

const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'../..')
const data=JSON.parse(fs.readFileSync(path.join(root,'library/the-cold-choir.pwk'),'utf8'))
const sha=b=>crypto.createHash('sha256').update(b).digest('hex')
const output={
 'character-lio':'exec-ed689092-326b-4048-9655-a7351e258aff.png','character-lund':'exec-4b3965dc-6fba-4b20-b52f-eabec3f77e48.png','character-ansel':'exec-da65a32e-e93d-4e84-a34a-f557945dcfc6.png','character-warden':'exec-daa7ab36-d2b4-474f-91c9-1ad50ec0236f.png',
 'item-roll':'exec-9d53dcee-ae71-4e48-a744-9e9fcbae9905.png','item-ledger':'exec-bcd09e54-7ec2-4b5c-9eec-41e96f45b80f.png','item-notebook':'exec-d2a94a5e-67dd-49e6-a7ce-87e0829c38b3.png','item-names':'exec-f85b8f85-8531-4216-899f-68380fd3d037.png','item-recorder':'exec-c1a8e7ec-f6d9-4f63-8c24-ca60193e822a.png','item-drawings':'exec-1a3c3d99-1ccd-4bc8-a21b-721274e0245a.png','item-card':'exec-c495d53f-86f4-485e-be86-076e8dceb99d.png','item-letter':'exec-d8486c22-f272-4b72-8575-01e717548ebe.png',
 'location-archive-locker':'exec-a0afa1e7-08e8-40d7-9433-749143e65916.png','location-bridge':'exec-869e6247-e03c-4b56-9357-8e21bd6b1c84.png','location-deck-nine':'exec-c8c017e3-e691-4646-8d0a-bf597cf59da2.png','location-ducts':'exec-589c2879-0fa4-4a86-8edf-f43c0b65583f.png','location-forward-hold':'exec-92239d8c-8af9-4a38-ac40-c2e0a041c17c.png','location-medbay':'exec-e7124520-a298-42d0-8bbe-dfe2969eef2c.png','location-observation':'exec-7a5c70ea-1fec-410f-a1f7-ee0098377796.png','location-store':'exec-36efc697-7e3c-4940-9cb2-19bcb6ed15ae.png',
 'location-hall':'exec-55e46dcd-17dc-449a-b1e5-3fd383ec71d1.png','location-spine':'exec-d9ded874-3298-49e9-ab6b-f209528ce8cf.png','location-conservation':'exec-e475d567-1db9-4843-9633-db08996027e5.png','location-warden-residence':'exec-d3556d47-0bcb-43ad-b335-6bbbfaa553d2.png','location-ring-b':'exec-0127d7fe-4b12-4232-9a26-7c0739c4ae88.png','location-shaft-twelve':'exec-84ca91c5-7b80-4762-b990-e1ed7aa6d4b1.png','location-archive-stair':'exec-81666ef8-854a-4bbb-826b-3f2222f29940.png','location-hal-rooms':'exec-8c53ec0a-7522-45f2-8cb7-14d308f13e46.png','location-watch-house':'exec-fed34b58-6eb3-40fb-a208-5f293279da9e.png','location-obedient':'exec-dc2f3394-766f-4080-9b04-a4c7975ad61d.png',
 'location-pelican':'exec-56e2db53-f192-421a-bb18-4016b479bfaf.png','location-counting-house':'exec-0d5cdf71-f421-4969-a115-8820181ed4c6.png','location-pelican-galley':'exec-71e5f9a3-4530-4dc3-84bc-4db52dc83ada.png','location-hulk-spine':'exec-a574f45d-76e4-40f5-b652-f56313b10055.png','location-wreck':'exec-2fb8c00b-27b6-46a3-8453-3c2c375bdf17.png','location-chapel':'exec-c47fa56b-9d35-4616-92cd-a36fb3540e4b.png','location-gallows':'exec-8226344e-39de-4956-877c-9b72306b0a3b.png','location-interdict-field':'exec-e83bf1e9-884e-42da-bbb0-e6a8c18856d1.png','location-crawler':'exec-4b950215-0e67-46b7-9923-7319f0c10ebb.png','location-shaft':'exec-77b4c56a-4908-4bba-adbe-fe5b43c9da71.png','location-cold-cell':'exec-6a5e347a-0434-4464-92f3-225d460cf8c3.png',
 'faction-mercy':'exec-2db6e161-797d-498b-b41c-582d2a1164f5.png','faction-compact':'exec-821bd524-e0f8-4746-a753-c6fe074e4e43.png','faction-kin':'exec-11cb7dbb-1525-43c0-a0c2-f500bcacd6dd.png','faction-union':'exec-70969bf8-59f0-43c6-8cb3-39307c78387a.png','faction-counting':'exec-a5f123f3-9ad1-45dd-80f6-a1dd96a41e6b.png','faction-navy':'exec-25645652-1e0c-4e95-b92c-44e92fec3c25.png'
}
const corrections={
 'character-warden':'Accepted corrected portrait; rejected exec-e66b261c-fa9c-4321-8099-9d74c405db0f.png because it turned the Key into a conventional toothed key.',
 'location-counting-house':'Accepted corrected interior; rejected exec-aafbd180-94b7-4c96-894a-457b32b975b3.png because invented skull trophies and fantasy décor contradicted the manuscript.',
 'location-gallows':'Accepted corrected town; rejected exec-6ef5c037-8348-4132-a5a9-39669e4396a6.png because it added rings to Hesper.',
 'location-crawler':'Accepted corrected vehicle scene; rejected exec-b9a07257-a340-448f-8159-676ab4129ed3.png because it rendered the Key as a conventional door key.',
 'faction-compact':'Accepted corrected civic emblem; rejected exec-a9444fc1-f1d8-4e1d-9ad9-8e74f4f035ea.png because its imperial cathedral imagery and conventional wrench were misleading.'
}
const entities=new Map()
entities.set(data.world.coverImageId,{kind:'world',key:'cover',name:data.world.name,description:data.world.description})
for(const x of data.mapLayers)entities.set(x.imageId,{kind:'map',key:x.id.replace('cold-choir-map-',''),name:x.name,description:x.description})
for(const x of data.characters)entities.set(x.portraitImageId,{kind:'character',key:x.id.replace('cold-choir-char-',''),name:x.name,description:x.description})
for(const x of data.items)entities.set(x.imageId,{kind:'item',key:x.id.replace('cold-choir-item-',''),name:x.name,description:x.description})
for(const x of data.locationMarkers)entities.set(x.imageId,{kind:'location',key:x.id.replace('cold-choir-loc-',''),name:x.name,description:x.description})
for(const x of data.factions)entities.set(x.coverImageId,{kind:'faction',key:x.id.replace('cold-choir-faction-',''),name:x.name,description:x.description})
const assets=data.blobs.map(blob=>{
 const e=entities.get(blob.id);if(!e)throw Error(`Unclassified image ${blob.id}`)
 const p=path.join(root,blob.url),b=fs.readFileSync(p),w=b.readUInt32BE(16),h=b.readUInt32BE(20),k=`${e.kind}-${e.key}`
 const prompt=e.kind==='map'
  ? `Create a mature, functional topographic or navigational plate for ${e.name}. ${e.description} Strict overhead or map projection, coherent traversable geometry, restrained hard-science-fiction materials, no labels, no decorative icons, no childish schematic style.`
  : `Create a distinct mature literary hard-science-fiction ${e.kind} illustration for ${e.name}. ${e.description} Ground every visible detail in the manuscript; tactile metal, frost, cloth or paper; restrained archival palette; no text, no logo, no caricature.`
 return {id:k,kind:e.kind,name:e.name,path:blob.url,bytes:b.length,sha256:sha(b),width:w,height:h,tool:'OpenAI ImageGen',promptRecord:'Session prompt preserved as an asset-specific production brief; wording normalized for the manifest.',prompt,sourceOutput:output[k]??null,review:corrections[k]??'Accepted after visual inspection for source fit, maturity, distinct composition, clean anatomy or geometry, and absence of unintended text.'}
}).sort((a,b)=>a.kind.localeCompare(b.kind)||a.id.localeCompare(b.id))
const counts=Object.fromEntries([...new Set(assets.map(x=>x.kind))].sort().map(k=>[k,assets.filter(x=>x.kind===k).length]))
const manifest={version:1,generatedAt:'2026-10-17',styleDirection:'Mature literary hard-science-fiction illustration with tactile frost, metal, paper and restrained archival color. Maps are functional topographic or navigational images, never childlike diagrams.',generatedOriginalsDirectory:'F:/CodexData/.codex/generated_images/01a122a5-b3bf-77d1-b375-60ed5f31c9fa',counts,total:assets.length,assets}
fs.writeFileSync(path.join(here,'ARTWORK_MANIFEST.json'),JSON.stringify(manifest,null,2)+'\n')
console.log(`Wrote ${assets.length} artwork records: ${JSON.stringify(counts)}`)
