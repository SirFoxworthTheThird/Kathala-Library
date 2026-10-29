import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { characterIntroductions } from './character-ledger.mjs'
import { itemDefinitions } from './item-ledger.mjs'
import { locationDefinitions } from './location-ledger.mjs'

const root = new URL('./', import.meta.url)
const read = name => JSON.parse(fs.readFileSync(new URL(name, root), 'utf8'))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')

// A visual decision belongs to particular bytes, not to a reusable filename.
// Regenerating or recompressing an accepted image invalidates that decision.
export function validateStagedArt(encoding = read('ART_ENCODING.json'), acceptance = read('ART_ACCEPTANCE.json')) {
  const encoded = new Map(), accepted = new Map(), sourceHashes = new Set(), targetHashes = new Set()
  for (const row of encoding.images) {
    assert.match(row.source, /^image-sources\/(?:(?:characters|items|locations)\/[a-z0-9-]+|cover)\.png$/)
    assert.match(row.target, /^art-staging\/(?:(?:characters|items|locations)\/[a-z0-9-]+|cover)\.webp$/)
    const [,category,filename]=row.source.split('/')
    const entityKey=filename?.replace(/\.png$/,'')
    if(category==='characters')assert.ok(characterIntroductions.has(entityKey),`Unknown portrait: ${entityKey}`)
    if(category==='items')assert.ok(itemDefinitions.has(entityKey),`Unknown object illustration: ${entityKey}`)
    if(category==='locations')assert.ok(locationDefinitions.some(place=>place.key===entityKey),`Unknown location illustration: ${entityKey}`)
    assert.equal(row.target.replace('art-staging/', '').replace(/\.webp$/, ''),
      row.source.replace('image-sources/', '').replace(/\.png$/, ''), 'Source/target subject mismatch')
    assert.ok(!encoded.has(row.target), `Duplicate encoding: ${row.target}`)
    const source = fs.readFileSync(new URL(row.source, root)), target = fs.readFileSync(new URL(row.target, root))
    assert.equal(hash(source), row.sourceSha256, `Changed source: ${row.source}`)
    assert.equal(hash(target), row.encodedSha256, `Changed encoding: ${row.target}`)
    assert.equal(source.length, row.sourceBytes)
    assert.equal(target.length, row.encodedBytes)
    assert.equal(target.toString('ascii', 0, 4), 'RIFF')
    assert.equal(target.toString('ascii', 8, 12), 'WEBP')
    assert.ok(!sourceHashes.has(row.sourceSha256), `Reused original: ${row.source}`)
    assert.ok(!targetHashes.has(row.encodedSha256), `Reused illustration: ${row.target}`)
    sourceHashes.add(row.sourceSha256); targetHashes.add(row.encodedSha256)
    encoded.set(row.target, row)
  }
  for (const row of acceptance.images) {
    assert.ok(!accepted.has(row.target), `Duplicate acceptance: ${row.target}`)
    const image = encoded.get(row.target)
    assert.ok(image, `Acceptance without encoding: ${row.target}`)
    assert.equal(row.source, image.source)
    assert.equal(row.reviewedSourceSha256, image.sourceSha256, `Original requires fresh visual review: ${row.target}`)
    assert.equal(row.reviewedTargetSha256, image.encodedSha256, `Encoding requires fresh visual review: ${row.target}`)
    assert.ok(row.visualReview.trim() && row.evidence.trim())
    accepted.set(row.target, row)
  }
  const missingPortraits = [...characterIntroductions.keys()].filter(key => !accepted.has(`art-staging/characters/${key}.webp`))
  const missingItemIllustrations=[...itemDefinitions.keys()].filter(key=>!accepted.has(`art-staging/items/${key}.webp`))
  const missingLocationIllustrations=locationDefinitions.filter(place=>!accepted.has(`art-staging/locations/${place.key}.webp`)).map(place=>place.key)
  return {
    encoded: encoded.size, visuallyAccepted: accepted.size,
    unreviewedEncodings: [...encoded.keys()].filter(key => !accepted.has(key)),
    missingPortraits,missingItemIllustrations,missingLocationIllustrations,coverAccepted: accepted.has('art-staging/cover.webp'),
    // Location/object art and the in-app review have independent release gates.
    releaseComplete: false,
  }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  const report = validateStagedArt()
  console.log(JSON.stringify({ ...report, missingPortraits: report.missingPortraits.length,
    missingItemIllustrations:report.missingItemIllustrations.length,missingLocationIllustrations:report.missingLocationIllustrations.length }, null, 2))
}
