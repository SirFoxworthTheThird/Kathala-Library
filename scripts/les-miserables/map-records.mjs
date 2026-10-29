import fs from 'node:fs'
import assert from 'node:assert/strict'
import {locationDefinitions,mapDefinitions,mapGatewayPlans}from './location-ledger.mjs'
import {loadMapLayouts,validateLocationPlans}from './validate-location-plans.mjs'

// Reusable application records for the reviewed portion of the map model.
// This is not a complete-world generator or a source-coverage release gate.
export function buildMapRecords(stamp,{embedded=true,urlPrefix='library/les-miserables/maps',idPrefix='lesmis'}={}){
  const layouts=loadMapLayouts(),report=validateLocationPlans(layouts)
  assert.equal(report.rootMaps.length,1,'Map review needs one root')
  assert.deepEqual(report.missingParents,[],'Finish current parent maps before map review')
  assert.deepEqual(report.missingGatewayLocations,[],'Finish current gateway locations before map review')
  assert.deepEqual(report.missingGateways,[],'Finish current gateway plans before map review')
  assert.deepEqual(report.mapsAwaitingIllustratedReplacement,[],'Every preview map needs reviewed artwork')
  const mapId=key=>`${idPrefix}-map-${key}`,placeId=key=>`${idPrefix}-location-${key}`
  const imageId=key=>`${idPrefix}-map-image-${key}`
  const gateways=new Map(mapGatewayPlans.map(row=>[row.location,row.target]))
  // Fresh imports select the first map: start at the geographic root.
  const definitionsByKey=new Map(mapDefinitions.map(row=>[row.key,row]))
  const depth=row=>row.parent?1+depth(definitionsByKey.get(row.parent)):0
  const orderedMaps=[...mapDefinitions].sort((a,b)=>depth(a)-depth(b))
  const mapLayers=orderedMaps.map(row=>({...stamp,id:mapId(row.key),name:row.name,
    description:row.description,parentMapId:row.parent?mapId(row.parent):null,
    imageId:imageId(row.key),imageWidth:layouts[row.key].width,imageHeight:layouts[row.key].height,
    scalePixelsPerUnit:null,scaleUnit:null,levelGroupId:row.levelGroup?`${idPrefix}-floor-${row.levelGroup}`:null,
    levelIndex:row.levelIndex??0,levelLabel:row.levelLabel??'',
  }))
  const locationMarkers=locationDefinitions.map(row=>{
    const [x,rasterY]=layouts[row.map].locations[row.key]
    // Registration is top-left raster space; Leaflet CRS.Simple uses upward Y.
    // Convert at the serialization boundary, leaving reviewed artwork points intact.
    const y=layouts[row.map].height-rasterY
    return {...stamp,id:placeId(row.key),name:row.name,description:row.description,
      mapLayerId:mapId(row.map),linkedMapLayerId:gateways.has(row.key)?mapId(gateways.get(row.key)):null,
      x,y,iconType:row.map==='france'?'town':'landmark',imageId:null,tags:[],factionId:null,
    }
  })
  const blobs=mapDefinitions.map(row=>{
    const image=layouts[row.key].image
    return {...stamp,id:imageId(row.key),mimeType:'image/webp',...(embedded
      ?{dataBase64:fs.readFileSync(new URL(`./map-staging/${image}`,import.meta.url)).toString('base64')}
      :{url:`${urlPrefix}/${image}`})}
  })
  return {mapLayers,locationMarkers,blobs}
}
