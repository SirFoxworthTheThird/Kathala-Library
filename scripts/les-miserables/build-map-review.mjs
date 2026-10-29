import fs from 'node:fs'
import {buildMapRecords}from './map-records.mjs'

// A separate, deterministic review fixture. Never overwrite the manuscript or
// put this incomplete, maps-only world into the Library publish directory.
const seed=JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk',import.meta.url),'utf8'))
const worldId='les-miserables-map-review',stamp={worldId,createdAt:seed.exportedAt,updatedAt:seed.exportedAt}
const fixture={version:seed.version,type:'world',exportedAt:seed.exportedAt}
for(const [key,value]of Object.entries(seed))if(Array.isArray(value))fixture[key]=[]
fixture.world={...stamp,id:worldId,name:'Les Misérables — Map Review',
  description:'An unfinished map-review workspace containing the currently illustrated layers. It omits the novel, characters, scene visibility and ordinary place illustrations; it is not the reading edition.',
  coverImageId:null,theme:'theme-historical',readingMode:false,
}
Object.assign(fixture,buildMapRecords(stamp,{idPrefix:'lesmis-map-review'}))
fs.writeFileSync(new URL('./qa/map-review.pwk',import.meta.url),JSON.stringify(fixture,null,2)+'\n')
console.log(JSON.stringify({kind:'maps-only review fixture, not a release',worldId,
  maps:fixture.mapLayers.length,locations:fixture.locationMarkers.length,
  embeddedMapImages:fixture.blobs.length,characters:0,events:0},null,2))
