import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const root=path.resolve(import.meta.dirname,'../..')
const prompts=JSON.parse(fs.readFileSync(new URL('./art-prompts.json',import.meta.url),'utf8'))
const seen=new Set()
const assets=prompts.map(entry=>{
 const file=path.resolve(root,entry.path)
 if(!fs.existsSync(file))throw Error(`Missing artwork: ${entry.path}`)
 const bytes=fs.readFileSync(file)
 if(bytes.toString('ascii',1,4)!=='PNG')throw Error(`Not PNG: ${entry.path}`)
 const sha256=crypto.createHash('sha256').update(bytes).digest('hex')
 if(seen.has(sha256))throw Error(`Duplicate artwork bytes: ${entry.path}`)
 seen.add(sha256)
 return {...entry,sha256,bytes:bytes.length,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20),inspectedOn:'2026-10-17'}
})
const manifest={bookId:'the-undersong',title:'The Undersong',creditedAuthor:'Solomon Darko',generatedOn:'2026-10-17',generator:'OpenAI ImageGen',finalAssetPolicy:'Each shipped asset has one final copy under library/the-undersong; generated source outputs remain outside the publish tree and map bases remain reproducibility inputs under scripts.',assets}
fs.writeFileSync(path.join(root,'library/the-undersong/ARTWORK_MANIFEST.json'),JSON.stringify(manifest,null,2)+'\n')
fs.writeFileSync(new URL('./art-review.json',import.meta.url),JSON.stringify(Object.fromEntries(assets.map(a=>[a.path,{sha256:a.sha256,status:'accepted',review:a.visualReview}])),null,2)+'\n')
console.log(`Recorded ${assets.length} distinct inspected artwork assets.`)
