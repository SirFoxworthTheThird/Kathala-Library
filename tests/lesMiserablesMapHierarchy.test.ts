import {expect,test}from 'vitest'
import {inspectMapHierarchy}from '../scripts/les-miserables/map-hierarchy.mjs'

const maps=[{key:'country'},{key:'town',parent:'country'},{key:'ground',parent:'town',levelGroup:'house',levelIndex:0},{key:'upper',parent:'town',levelGroup:'house',levelIndex:1}]
const places=[{key:'town-gate',map:'country'},{key:'house-door',map:'town'}]
const gateways=[{parent:'country',target:'town',location:'town-gate'},{parent:'town',target:'ground',location:'house-door',sharedFloorGroup:'house'}]

test('one house entrance covers both floors and an omitted town gateway remains visible',()=>{
  const complete=inspectMapHierarchy(maps,places,gateways)
  expect(complete).toEqual({missingParents:[],missingGatewayLocations:[],missingGateways:[],rootMaps:['country']})
  expect(inspectMapHierarchy(maps,places,gateways.slice(1)).missingGateways).toEqual(['town'])
})

test('reports absent parents and gateway locations without inventing them',()=>{
  const report=inspectMapHierarchy(maps.slice(1),places.slice(1),gateways)
  expect(report.missingParents).toEqual(['country'])
  expect(report.missingGatewayLocations).toEqual(['town-gate'])
  expect(report.rootMaps).toEqual([])
})

test('rejects two entrances to one map and one entrance opening two maps',()=>{
  expect(()=>inspectMapHierarchy(maps,places,[...gateways,{parent:'town',target:'upper',location:'other-door'}])).toThrow('Multiple gateways for map: upper')
  expect(()=>inspectMapHierarchy([...maps,{key:'other-town',parent:'country'}],places,[...gateways,{parent:'country',target:'other-town',location:'town-gate'}])).toThrow('Gateway location opens multiple targets')
})

test('rejects a parent cycle, a misplaced gateway and a false floor group',()=>{
  expect(()=>inspectMapHierarchy([{key:'a',parent:'b'},{key:'b',parent:'a'}],[],[])).toThrow('Map parent cycle')
  expect(()=>inspectMapHierarchy(maps,[{key:'town-gate',map:'town'},places[1]],gateways)).toThrow('Gateway is on the wrong parent map')
  expect(()=>inspectMapHierarchy(maps,places,[{...gateways[0],sharedFloorGroup:'house'}])).toThrow('outside its group')
})
