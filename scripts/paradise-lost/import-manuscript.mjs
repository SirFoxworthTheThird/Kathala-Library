import fs from 'node:fs'
import {books,verseText,verseLineCount,countWords,normalize} from './source-text.mjs'
import {bookPlans} from './scene-plan.mjs'
import {reviewedBoundaries} from './reviewed-scenes.mjs'

const worldId='paradise-lost-world', timelineId='paradise-lost-poem-order', now=Date.UTC(2026,9,18)
const stamp={worldId,createdAt:now,updatedAt:now}
const chapters=[],events=[],sceneTexts=[]
let sortOrder=0

let currentBook
for(let bi=0;bi<books.length;bi++){
  currentBook=books[bi]
  const plan=bookPlans[bi]
  if(!plan?.length)throw Error(`Missing scene plan for Book ${currentBook.label}`)
  const points=reviewedBoundaries(currentBook)
  const chapterId=`paradise-lost-book-${bi+1}`
  chapters.push({...stamp,id:chapterId,timelineId,number:bi+1,title:`Book ${currentBook.label}`,synopsis:'',notes:'Authorial twelve-book division; complete blank verse retained.',wordGoal:countWords(currentBook.text)})
  for(let si=0;si<plan.length;si++){
    const [title,description]=plan[si],start=points[si],end=points[si+1],eventId=`paradise-lost-event-${bi+1}-${si+1}`
    const text=currentBook.lines.slice(start,end).join('\n')
    events.push({...stamp,id:eventId,chapterId,timelineId,title,description,locationMarkerId:null,involvedCharacterIds:[],mentionedCharacterIds:[],involvedItemIds:[],threadIds:[],motifIds:[],sortOrder:sortOrder++,travelDays:0,inWorldTime:sortOrder,tension:1,tags:[`Source lines ${start+1}-${end} of Book ${currentBook.label}`],structureBeat:null,status:'draft',povCharacterId:null,isFlashback:false})
    sceneTexts.push({...stamp,id:`paradise-lost-text-${bi+1}-${si+1}`,eventId,text,wordCount:countWords(text)})
  }
}
const reconstructed=sceneTexts.map(scene=>scene.text).join('\n\n')
if(normalize(reconstructed)!==normalize(verseText))throw Error('Imported manuscript does not reconstruct all retained verse')
const world={version:18,type:'world',exportedAt:now,world:{...stamp,id:worldId,name:'Paradise Lost',description:'Milton’s epic moves through Heaven, Hell, Chaos, and Eden as human freedom faces its first trial.',coverImageId:null,theme:'theme-fantasy',readingMode:true,wordTarget:countWords(verseText)},timelines:[{...stamp,id:timelineId,name:'Poem order',description:'The complete twelve-book poem before chronology and embedded-action modeling.',color:'#7f684b',dayOffset:0}],chapters,events,sceneTexts}
for(const key of ['mapLayers','locationMarkers','characters','characterSnapshots','items','itemPlacements','blobs','relationships','relationshipSnapshots','plotThreads','motifs','knowledgeFacts','knowledgeReveals','factions','factionMemberships','characterGoals','mapRoutes','loreCategories','lorePages','characterMovements','locationSnapshots','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships','continuitySuppressions','writingLogs','sceneRevisions'])world[key]=[]
fs.writeFileSync(new URL('./manuscript-draft.pwk',import.meta.url),JSON.stringify(world,null,2)+'\n')
console.log(`Imported ${books.length} books in ${events.length} scenes, ${verseLineCount} verse lines, ${countWords(verseText)} words`)

