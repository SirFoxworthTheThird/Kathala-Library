import assert from 'node:assert/strict'

// Missing work is reported during staging. Contradictory links are rejected.
export function inspectMapHierarchy(definitions,locations,gateways){
  const maps=new Map(definitions.map(row=>[row.key,row]))
  const places=new Map(locations.map(row=>[row.key,row]))
  assert.equal(maps.size,definitions.length,'Duplicate map definition')
  assert.equal(places.size,locations.length,'Duplicate location definition')
  const missingParents=[...new Set(definitions.map(row=>row.parent).filter(key=>key&&!maps.has(key)))]
  const missingGatewayLocations=[],covered=new Map(),entrances=new Map()
  for(const gateway of gateways){
    const target=maps.get(gateway.target)
    assert.ok(target,`Gateway needs a target map: ${gateway.target}`)
    assert.equal(target.parent,gateway.parent,`Gateway parent mismatch: ${gateway.target}`)
    assert.ok(gateway.parent,`Root map cannot have a gateway: ${gateway.target}`)
    const location=places.get(gateway.location)
    if(!location)missingGatewayLocations.push(gateway.location)
    else assert.equal(location.map,gateway.parent,`Gateway is on the wrong parent map: ${gateway.location}`)
    const entrance=`${gateway.parent}/${gateway.location}`
    assert.ok(!entrances.has(entrance),`Gateway location opens multiple targets: ${gateway.location}`)
    entrances.set(entrance,gateway.target)
    const targets=gateway.sharedFloorGroup
      ? definitions.filter(row=>row.levelGroup===gateway.sharedFloorGroup)
      : [target]
    if(gateway.sharedFloorGroup){
      assert.ok(target.levelGroup===gateway.sharedFloorGroup,`Floor gateway target is outside its group: ${target.key}`)
      assert.ok(targets.length>1,'Shared floor gateway needs multiple floors')
      assert.equal(new Set(targets.map(row=>row.levelIndex)).size,targets.length,'Duplicate floor index')
      assert.ok(targets.every(row=>row.parent===gateway.parent),'Floor group spans different parents')
    }
    for(const row of targets){
      assert.ok(!covered.has(row.key),`Multiple gateways for map: ${row.key}`)
      covered.set(row.key,gateway.location)
    }
  }
  for(const start of definitions){
    const path=new Set()
    for(let current=start;current;current=maps.get(current.parent)){
      assert.ok(!path.has(current.key),`Map parent cycle: ${current.key}`)
      path.add(current.key)
    }
  }
  return {missingParents,missingGatewayLocations:[...new Set(missingGatewayLocations)],
    missingGateways:definitions.filter(row=>row.parent&&!covered.has(row.key)).map(row=>row.key),
    rootMaps:definitions.filter(row=>!row.parent).map(row=>row.key)}
}
