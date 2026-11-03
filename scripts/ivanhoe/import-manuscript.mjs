import fs from 'node:fs'
import {sections,countWords,paragraphs} from './source-text.mjs'
import {reviewedChapters} from './scene-review.mjs'
import {cutKey,sceneRange} from './scene-ranges.mjs'
const now=Date.UTC(2026,9,29),worldId='ivanhoe-world',timelineId='ivanhoe-reading-order',stamp={worldId,createdAt:now,updatedAt:now}
const w={version:18,type:'world',exportedAt:now,world:{...stamp,id:worldId,name:'Ivanhoe',description:'Travellers cross the forests of an England divided by conquest, while noble households and armed orders contend over hospitality, honour and authority.',coverImageId:null,theme:'theme-historical',readingMode:true},timelines:[{...stamp,id:timelineId,name:'Reading order',description:'The order of the complete source edition, including its front matter and notes.',color:'#795b37',dayOffset:0}],chapters:[],events:[],sceneTexts:[]}
let narrativeNumber=0
for(const s of sections){
  const chapterId=`ivanhoe-section-${s.number}`
  if(s.kind==='narrative')narrativeNumber++
  const review=s.kind==='narrative'?reviewedChapters.find(c=>c.chapter===narrativeNumber):null
  const ps=paragraphs(s.text),cuts=review?.scenes??[{from:0,to:ps.length,title:s.title}]
  w.chapters.push({...stamp,id:chapterId,timelineId,number:s.number,title:s.title,synopsis:'',notes:`Source container (${s.kind}); provisional divisions, not release-reviewed.`,wordGoal:countWords(s.text)})
  for(const cut of cuts){
    const eventId=`ivanhoe-source-${s.number}-${cutKey(cut)}`
    const {startOffset,endOffset}=sceneRange(s,cut)
    const text=s.text.slice(startOffset,endOffset),order=w.events.length
    w.events.push({...stamp,id:eventId,chapterId,timelineId,title:cut.title,description:'',locationMarkerId:null,involvedCharacterIds:[],mentionedCharacterIds:[],involvedItemIds:[],threadIds:[],motifIds:[],sortOrder:order,travelDays:0,inWorldTime:order,tension:1,tags:[],structureBeat:null,status:'draft',povCharacterId:null,isFlashback:false})
    w.sceneTexts.push({...stamp,id:`${eventId}-text`,eventId,text,wordCount:countWords(text)})
  }
}
for(const key of ['mapLayers','locationMarkers','characters','characterSnapshots','items','itemPlacements','blobs','relationships','relationshipSnapshots','plotThreads','motifs','knowledgeFacts','knowledgeReveals','factions','factionMemberships','characterGoals','mapRoutes','loreCategories','lorePages','characterMovements','locationSnapshots','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships','continuitySuppressions','writingLogs','sceneRevisions'])w[key]=[]
fs.writeFileSync(new URL('./manuscript-draft.pwk',import.meta.url),JSON.stringify(w,null,2)+'\n')
console.log(`Imported ${sections.length} source sections in ${w.events.length} draft scenes; ${reviewedChapters.length}/44 narrative chapters have proposed cuts. Not a release.`)
