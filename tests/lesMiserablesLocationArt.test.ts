import {expect,test} from 'vitest'
import {locationArtPlan,locationDepictions} from '../scripts/les-miserables/location-art-plan.mjs'
import {buildWorldReview} from '../scripts/les-miserables/build-world-review.mjs'

test('uses source-passage place illustrations separate from the topographic map artwork',()=>{
 const{world,report}=buildWorldReview({embedded:false})
 const maps=new Set(world.mapLayers.map(row=>row.imageId))
 const images=[]
 for(const key of Object.keys(locationDepictions)){
  const plan=locationArtPlan(key)
  expect(plan.status).toContain('Candidate')
  expect(plan.prompt).toContain('not a map')
  expect(plan.depictionSource.endExclusive).toBe(true)
  const place=world.locationMarkers.find(row=>row.id===`lesmis-world-review-location-${key}`)
  expect(place.imageId).toBeTruthy()
  expect(maps.has(place.imageId)).toBe(false)
  expect(world.blobs.find(row=>row.id===place.imageId).url).toBe(`art-staging/locations/${key}.webp`)
  images.push(place.imageId)
 }
 expect(new Set(images).size).toBe(92)
 expect(report.missingLocationIllustrations).toBe(324)
 expect(()=>locationArtPlan('unreviewed-place')).toThrow('Source depiction passage required')
})
