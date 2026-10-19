export async function checkSourceReveals(page,edition,base){
 const ordered=[...edition.events].sort((a,b)=>a.sortOrder-b.sortOrder),knowledgeChecks=[],revealChecks=[]
 const move=async event=>{await page.evaluate(async id=>(await import('/src/store/index.ts')).useAppStore.getState().setActiveEventId(id),event.id)}
 for(const fact of edition.knowledgeFacts){
  const index=ordered.findIndex(e=>e.id===fact.readerLearnsAtEventId)
  for(const [event,visible] of [[ordered[index-1],false],[ordered[index],true]]){
   await move(event);await page.goto(`${base}/#/worlds/purgatorio-world/knowledge`);await page.waitForTimeout(200)
   const shown=await page.getByText(fact.title,{exact:true}).count()>0
   if(shown!==visible)throw Error(`${fact.title}: ${event.title} visibility ${shown}, expected ${visible}`)
   knowledgeChecks.push({fact:fact.title,event:event.title,visible})
  }
 }
 for(const character of edition.characters.filter(c=>c.nameChanges.length)){
  const change=character.nameChanges[0],index=ordered.findIndex(e=>e.id===change.eventId)
  for(const [event,name] of [[ordered[index-1],character.name],[ordered[index],change.name]]){
   await move(event);await page.goto(`${base}/#/worlds/purgatorio-world/characters/${character.id}`)
   await page.getByRole('heading',{name,exact:true}).waitFor()
   revealChecks.push({character:character.id,event:event.title,name})
  }
 }
 return {knowledgeChecks,revealChecks}
}
