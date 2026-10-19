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
   if(['dark-wood','dis-gate','malebolge-overlook','earth-centre','western-ocean'].some(key=>marker.id===`inferno-loc-${key}`))await page.screenshot({path:path.join(qa,`marker-${marker.id.replace('inferno-loc-','')}.png`)})
  }
 }
 return checked
}
