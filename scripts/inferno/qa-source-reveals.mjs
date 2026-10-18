export async function checkSourceReveals(page,edition,base){
 const results=[]
 for(const [title,visible] of [['The Monster on the Brink',false],['Mounting Fraud',true]]){
  const event=edition.events.find(entry=>entry.title===title)
  await page.evaluate(async id=>(await import('/src/store/index.ts')).useAppStore.getState().setActiveEventId(id),event.id)
  await page.goto(`${base}/#/worlds/inferno-world/knowledge`)
  await page.waitForTimeout(300)
  const shown=await page.getByText('The monster is named Geryon',{exact:true}).count()>0
  if(shown!==visible)throw Error(`${title}: Geryon fact visibility ${shown}, expected ${visible}`)
  results.push({event:title,geryonFactVisible:visible})
 }
 return results
}
