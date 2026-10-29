import fs from 'node:fs'
import assert from 'node:assert/strict'
import { locationDefinitions, mapDefinitions, mapGatewayPlans } from './location-ledger.mjs'
import { buildEnrichmentAudit } from './build-enrichment-audit.mjs'
import { mapIllustrationRequirements } from './map-illustration-plan.mjs'
import { applyIllustratedMaps } from './map-illustration-review.mjs'
import { inspectMapHierarchy } from './map-hierarchy.mjs'

const read = name => JSON.parse(fs.readFileSync(new URL(`./map-staging/${name}`, import.meta.url), 'utf8'))
export function loadBaseMapLayouts() {
  const digne = read('digne-layout.json')
  const gorbeau=read('gorbeau-layout.json')
  const boulevard=read('gorbeau-surroundings-layout.json')
  return { ...read('parent-layouts.json'), ...read('house-layout.json'), ...read('corinthe-layout.json'), [digne.key]: digne,[gorbeau.key]:gorbeau,[boulevard.key]:boulevard }
}

export function loadMapLayouts(){return applyIllustratedMaps(loadBaseMapLayouts()).layouts}

export function validateLocationPlans(layouts = loadMapLayouts()) {
  const illustrations=applyIllustratedMaps(loadBaseMapLayouts())
  const maps = new Map(mapDefinitions.map(map => [map.key, map]))
  const places = new Map(locationDefinitions.map(place => [place.key, place]))
  assert.equal(maps.size, mapDefinitions.length, 'Duplicate map definition')
  assert.equal(places.size, locationDefinitions.length, 'Duplicate location definition')
  for (const map of mapDefinitions) {
    assert.ok(mapIllustrationRequirements[map.key], `Map needs an illustration requirement: ${map.key}`)
    const layout = layouts[map.key]
    assert.ok(layout, `Map needs a layout: ${map.key}`)
    if(illustrations.accepted.includes(map.key)){
      const approved=illustrations.layouts[map.key]
      assert.equal(layout.image,approved.image,`Approved illustration reference not applied: ${map.key}`)
      assert.deepEqual([layout.width,layout.height],[approved.width,approved.height])
    }
    assert.ok(layout.width > 0 && layout.height > 0)
    assert.match(layout.image, /^[a-z0-9-]+\.webp$/)
    assert.ok(fs.existsSync(new URL(`./map-staging/${layout.image}`, import.meta.url)))
    assert.ok(layout.source.length > 0)
    assert.equal(layout.levelGroup, map.levelGroup)
    assert.equal(layout.levelIndex, map.levelIndex)
    for (const [key, position] of Object.entries(layout.locations)) {
      const place = places.get(key)
      assert.ok(place, `Plotted place needs a definition: ${key}`)
      assert.equal(place.map, map.key, `Place plotted on wrong map: ${key}`)
      assert.equal(position.length, 2)
      const [x,y] = position
      assert.ok(Number.isFinite(x) && x >= 0 && x <= layout.width &&
        Number.isFinite(y) && y >= 0 && y <= layout.height, `Point outside map: ${key}`)
    }
  }
  for (const place of locationDefinitions) {
    assert.ok(place.name.trim() && place.description.trim())
    assert.ok(maps.has(place.map), `Unknown assigned map: ${place.key}`)
    assert.ok(layouts[place.map].locations[place.key], `Place needs coordinates: ${place.key}`)
  }
  for(const key of illustrations.accepted){
    assert.deepEqual(layouts[key].locations,illustrations.layouts[key].locations,`Approved marker registration not applied: ${key}`)
  }
  const hierarchy=inspectMapHierarchy(mapDefinitions,locationDefinitions,mapGatewayPlans)
  const unmapped = buildEnrichmentAudit().locations.filter(place => !places.has(place.key)).map(place => place.key)
  return { maps:maps.size, definedLocations:places.size, unmappedSourceLocations:unmapped,
    mapsAwaitingIllustratedReplacement:illustrations.pending,
    stagedIllustratedMaps:illustrations.accepted,
    ...hierarchy, releaseComplete:false,
    status:'Staged coordinates checked; complete hierarchy, source coverage and app QA remain open' }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  const report = validateLocationPlans()
  console.log(JSON.stringify({...report,unmappedSourceLocations:report.unmappedSourceLocations.length},null,2))
}
