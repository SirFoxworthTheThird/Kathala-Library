import path from 'node:path'

export async function checkLocations(page,edition,qa,images){
 const checked=[]
 for(const map of edition.mapLayers){
  await page.getByRole('button',{name:map.name,exact:true}).first().click()
  await page.waitForTimeout(250)
  const heading=page.locator('button[aria-expanded]').filter({hasText:/^Locations/})
  if(await heading.getAttribute('aria-expanded')!=='true')await heading.click()
  for(const marker of edition.locationMarkers.filter(location=>location.mapLayerId===map.id)){
   await page.locator('[data-sidebar-section-body="Locations"]').getByRole('button',{name:marker.name,exact:true}).click()
   await page.waitForTimeout(250)
   const blob=edition.blobs.find(asset=>asset.id===marker.imageId)
   await page.locator(`img[src$="/${blob.url}"]`).waitFor({state:'visible'})
   await images(marker.name)
   checked.push({id:marker.id,map:map.id,x:marker.x,y:marker.y,detailImageLoaded:true})
   if(['shore','gateStairs','prideTerrace','wrathTerrace','gluttonyTerrace','knowledgeTree','eunoeBank'].some(key=>marker.id===`purgatorio-loc-${key}`))await page.screenshot({path:path.join(qa,`marker-${marker.id.replace('purgatorio-loc-','')}.png`)})
  }
 }
 return checked
}
