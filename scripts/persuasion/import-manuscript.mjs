import fs from 'node:fs'
import {chapters,wordCount,retainedSha256} from './source-text.mjs'
const stamp={worldId:'persuasion-world',createdAt:Date.UTC(2026,9,12),updatedAt:Date.UTC(2026,9,12)}
const timelineId='persuasion-story'
const data={version:18,type:'world',exportedAt:stamp.createdAt,world:{...stamp,id:'persuasion-world',name:'Persuasion',description:'Complete manuscript staging before enrichment.',coverImageId:null,theme:'theme-historical',readingMode:true,wordTarget:0},timelines:[{...stamp,id:timelineId,name:'The autumn and winter of renewed acquaintance',description:'The novel’s main narrative order.',color:'#6b7480',dayOffset:0}],chapters:[],events:[],sceneTexts:[]}
let sortOrder=0
for(const c of chapters){
 const chapterId=`persuasion-chapter-${c.number}`,eventId=`persuasion-event-${c.number}-1`
 data.chapters.push({...stamp,id:chapterId,timelineId,number:c.number,title:c.title,synopsis:'Editorial scene review pending.',sortOrder:c.number-1})
 data.events.push({...stamp,id:eventId,chapterId,timelineId,title:c.title,description:'Source-first manuscript import; enrichment follows reviewed scene boundaries.',locationMarkerId:null,involvedCharacterIds:[],mentionedCharacterIds:[],involvedItemIds:[],threadIds:[],motifIds:[],sortOrder:sortOrder++,travelDays:0,inWorldTime:c.number-1,tension:1,tags:[],structureBeat:null,status:'draft',povCharacterId:null,isFlashback:false})
 data.sceneTexts.push({...stamp,id:`persuasion-scene-${c.number}-1`,eventId,text:c.body,wordCount:wordCount(c.body)})
}
data.world.wordTarget=data.sceneTexts.reduce((n,s)=>n+s.wordCount,0)
for(const key of ['mapLayers','locationMarkers','characters','characterSnapshots','blobs','plotThreads','motifs','loreCategories','lorePages','items','itemPlacements','relationships','relationshipSnapshots','factions','factionMemberships','characterGoals','knowledgeFacts','knowledgeReveals','mapRoutes','characterMovements','locationSnapshots','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships','continuitySuppressions','writingLogs','sceneRevisions'])data[key]=[]
fs.writeFileSync(new URL('./manuscript-draft.pwk',import.meta.url),JSON.stringify(data,null,2)+'\n')
console.log(`Imported ${chapters.length} chapters, ${data.sceneTexts.length} provisional scenes, ${data.world.wordTarget} words; retained SHA-256 ${retainedSha256}`)
