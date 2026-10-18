export async function checkSourceReveals(page,edition,base){
 const results=[]
 for(const [title,visible] of [['Adam and Eve',false],['Satan Overhears the Prohibition',true]]){
  const event=edition.events.find(entry=>entry.title===title)
  await page.evaluate(async id=>(await import('/src/store/index.ts')).useAppStore.getState().setActiveEventId(id),event.id)
  await page.goto(`${base}/#/worlds/paradise-lost-world/knowledge`)
  await page.waitForTimeout(300)
  const shown=await page.getByText('One tree is prohibited',{exact:true}).count()>0
  if(shown!==visible)throw Error(`${title}: prohibition reveal ${shown}, expected ${visible}`)
  results.push({event:title,prohibitionVisible:visible})
 }
 return results
}
