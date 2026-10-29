// Named stages, not reconstructed historical road geometry.
export function addJourneys(world,{stamp,id,cid,eventAt,orderOf}){
 const location=key=>id('location',key)
 world.mapRoutes.push({...stamp,id:id('route','toward-arras'),mapLayerId:id('map','france'),
  name:'Road stages toward Arras',routeType:'road',color:'#9c6b38',
  waypoints:['montreuil-sur-mer','hesdin-inn-front','saint-pol-inn','tinques-road','carency-arras-detour','arras'].map(location),
  notes:'Source-named stages of the journey; this is not a surveyed road. Lines connect approximate editorial map markers and do not establish historical street geometry.'})
 const legs=[
  ['hesdin','valjean',59,17,['montreuil-hesdin-road','montreuil-sur-mer','hesdin-inn-front']],
  ['saint-pol','valjean',59,137,['hesdin-inn-front','saint-pol-inn']],
  ['tinques','valjean',59,154,['saint-pol-inn','tinques-road']],
  ['detour','valjean',59,176,['tinques-road','carency-arras-detour']],
  ['arrival','valjean',61,'start',['carency-arras-detour','arras','arras-hotel-poste']],
  ['guide','tinques-postilion',59,176,['tinques-road','carency-arras-detour']],
 ]
 for(const[key,actor,chapter,at,points]of legs){
  const eventId=eventAt(chapter,at)
  world.characterMovements.push({...stamp,id:id('movement',`arras-${key}`),characterId:cid(actor),eventId,
   waypoints:points.map(location),travelModeId:null,sortKey:orderOf(eventId),
   notes:'The narrated horse-and-cart journey connects these named stages. No calibrated travel speed or exact road alignment is asserted.'})
 }
}
