import assert from 'node:assert/strict'
import{chapters}from'./source-text.mjs'
import{reviewedChapters}from'./reviewed-scenes.mjs'

// Each approval names actors in one cut and quotes its physical source anchor.
// Unknown means no asserted point, never an invented "unknown" map marker.
export const sourceUnlocatedPositions=[
 {chapter:364,at:92,actors:['homme-arme-portress'],paragraph:105,anchor:'before she disappeared',reason:'The doctor dismisses her after she looks in at the doorway. Her onward position is not shown; do not retain her inside the room.'},
 {chapter:317,at:28,actors:['javert'],paragraph:34,anchor:'When Javert had disappeared',reason:'He has turned the corner before Valjean fires into the air. Do not retain him beside the shooter or invent an onward map position.'},
 {chapter:258,at:24,actors:['eponine'],paragraph:39,anchor:'she went',reason:'She departs after her farewell. No onward location is observed.'},
 {chapter:181,at:3,actors:['hotel-porte-saint-jacques-proprietor'],paragraph:8,anchor:'the host left them',reason:'The host leaves the two friends; his destination is unstated. His final snapshot must not place him in their continuing discussion.'},
 {chapter:309,at:5,actors:['chanvrerie-rooftop-fireman'],paragraph:5,anchor:'on a neighboring roof',reason:'The directly visible observer stands by a chimney on an unidentified neighboring building; no exact roof point can be placed on the maps.'},
 {chapter:309,at:7,actors:['chanvrerie-rooftop-fireman','chanvrerie-rooftop-officer'],paragraph:8,anchor:'No one made his appearance thereafter on that roof',reason:'The first sentinel disappears and his replacement retires; their destinations are not observed. Do not place either at the street barricade.'},
 {chapter:293,at:54,actors:['gavroche'],paragraph:55,anchor:'mounted a table to load his gun',reason:'The table is within hearing of the wounded girl, but its room or exact point within the barricade site is unstated. No map marker is invented and he does not join her conversation.'},
 {chapter:242,at:73,actors:['gavroche'],paragraph:74,anchor:'fled as fast as his legs would carry him',reason:'He flees after throwing the purse; the destination is not observed.'},
 {chapter:242,at:73,actors:['mother-plutarque'],paragraph:79,anchor:'referred the matter to his housekeeper',reason:'The earlier departure is explicit; the concluding consultation does not locate the housekeeper in a particular room or in the garden.'},
 {chapter:175,at:2,actors:['marius'],paragraph:2,anchor:'went off to the bath',reason:'Marius leaves the attic before the later visitor arrives; the particular bath and his onward position are unlocated.'},
 {chapter:67,at:22,actors:['infirmary-yard-girl'],paragraph:28,anchor:'The child retreated as it had come',reason:'The singer leaves the yard; her destination is not given.'},
 {chapter:178,at:11,actors:['bahorel','combeferre','marius'],paragraph:11,anchor:'A theatre poster presented itself',reason:'A particular exchange is quoted without naming its location. The following street episode is a separate anecdote.'},
 {chapter:220,at:179,actors:['madame-thenardier','masked-axe-man'],paragraph:191,anchor:'rapidly retreated and died away',reason:'The carriage departs and its sound recedes; no subsequent observed position is supplied.'},
 {chapter:221,at:64,actors:['monsieur-leblanc'],paragraph:70,anchor:'to dash out of the window',reason:'The prisoner escapes through the unguarded window; the later search does not locate him.'},
 {chapter:236,at:35,actors:['cosette','valjean'],paragraph:35,anchor:'One day Cosette said to him',reason:'The remembered dream conversation is not assigned to a named room or walk.'},
 {chapter:272,at:'start',actors:['gavroche','gavroche-fallen-national-guard-lancer'],paragraph:2,anchor:'the horse of a lancer of the National Guard having fallen',reason:'Gavroche helps the fallen rider before resuming his way. Rue de Thorigny is named only for the subsequent encounter.'},
 {chapter:274,at:13,actors:['gavroche','bahorel','bahorel-window-observer'],paragraph:17,anchor:'recognized at a window a pale young man',reason:'The moving group and window are described without locating this exchange at an identifiable point.'},
 {chapter:274,at:20,actors:['mabeuf','gavroche','courfeyrac'],paragraph:21,anchor:'was walking in the band',reason:'Mabeuf joins the moving band; no specific street point is supplied for the question and answer.'},
]
const pair=(chapter,at,actor)=>`${chapter}/${at}/${actor}`

export function validateUnlocatedPositions(review){
 const approved=new Set(),actual=new Set()
 for(const decision of sourceUnlocatedPositions){
  const rows=review.get(decision.chapter),i=rows.findIndex(row=>row.at===decision.at)
  assert.ok(i>=0,'Stale unknown-position approval: missing cut')
  const row=rows[i],text=chapters[decision.chapter-1].paragraphs[decision.paragraph]?.text.replace(/\s+/g,' ')
  assert.ok(text?.includes(decision.anchor),'Unknown-position evidence changed')
  assert.ok(decision.reason.trim())
  assert.ok(decision.at==='start'||decision.paragraph>=decision.at)
  const next=rows[i+1]?.at
  if(Number.isInteger(next))assert.ok(decision.paragraph<next,'Unknown-position evidence moved outside its cut')
  for(const actor of decision.actors){
   const key=pair(decision.chapter,decision.at,actor)
   assert.ok(!approved.has(key),'Duplicate unknown-position approval')
   approved.add(key)
   const location=Object.hasOwn(row.actorLocations??{},actor)?row.actorLocations[actor]:row.location
   assert.ok(row.present.some(([key])=>key===actor)&&location===null,`Stale unknown-position approval: ${key}`)
  }
 }
 for(const[chapter,rows]of review)for(const row of rows)for(const[actor]of row.present){
  const location=Object.hasOwn(row.actorLocations??{},actor)?row.actorLocations[actor]:row.location
  if(location===null){const key=pair(chapter,row.at,actor);assert.ok(approved.has(key),`Unregistered unknown position: ${key}`);actual.add(key)}
 }
 assert.equal(actual.size,approved.size)
 return{approved:actual.size}
}

export function isSourceUnlocatedSnapshot(snapshot){
 if(snapshot.currentLocationMarkerId!==null||snapshot.currentMapLayerId!==null)return false
 const split=snapshot.eventId.lastIndexOf('-event-')
 if(split<0)return false
 const prefix=snapshot.eventId.slice(0,split)
 return sourceUnlocatedPositions.some(row=>{
  const index=reviewedChapters.get(row.chapter).findIndex(cut=>cut.at===row.at)
  return snapshot.eventId===`${prefix}-event-${row.chapter}-${index+1}`&&row.actors.some(actor=>snapshot.characterId===`${prefix}-character-${actor}`)
 })
}
