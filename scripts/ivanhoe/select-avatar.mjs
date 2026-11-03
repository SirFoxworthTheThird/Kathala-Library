// Apply a manually reviewed, retained avatar variant. This does not approve
// its compression or application presentation; those remain separate reviews.
import fs from 'node:fs'
import assert from 'node:assert/strict'
const book=new URL('./',import.meta.url),root=new URL('../../',import.meta.url)
const path=new URL('./asset-manifest.json',book)
const manifest=JSON.parse(fs.readFileSync(path,'utf8'))
for(const name of process.argv.slice(2)){
  assert.match(name,/^[a-z0-9-]+-review\.json$/)
  const review=JSON.parse(fs.readFileSync(new URL(name,book),'utf8'))
  const asset=manifest.assets.find(a=>a.id===review.id)
  assert.ok(asset&&review.originalReview&&review.prompt)
  assert.equal(asset.original,review.reference,'Review must reference the currently selected original')
  assert.ok(fs.existsSync(new URL(review.original,root)))
  const filename=review.reference.split('/').at(-1).replace(/\.png$/,'.webp')
  const archived=`scripts/ivanhoe/art-reviewed/variants/${filename}`
  fs.mkdirSync(new URL('./art-reviewed/variants/',book),{recursive:true})
  assert.ok(!fs.existsSync(new URL(archived,root)),'Do not overwrite an archived compression')
  fs.copyFileSync(new URL(asset.compressed.path,root),new URL(archived,root))
  asset.otherVariants=[...(asset.otherVariants??[]),{original:asset.original,originalReview:asset.originalReview,compressed:{...asset.compressed,path:archived},compressedReview:asset.compressedReview,reason:review.reason}]
  asset.original=review.original
  asset.avatarPrompt=review.prompt
  asset.originalReview=review.originalReview
  asset.appReviewed=false
  asset.appPresentationFinding=review.reason
  delete asset.appReview
  delete asset.compressedReview
}
fs.writeFileSync(path,JSON.stringify(manifest,null,2)+'\n')
