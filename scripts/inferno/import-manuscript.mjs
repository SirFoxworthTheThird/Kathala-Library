import fs from 'node:fs'
import {cantos,verseText,verseLineCount,countWords,normalize} from './source-text.mjs'

const worldId='inferno-world', timelineId='inferno-poem-order', now=Date.UTC(2026,9,18)
const stamp={worldId,createdAt:now,updatedAt:now}
const chapters=[],events=[],sceneTexts=[]

for(const canto of cantos){
  const chapterId=`inferno-canto-${canto.number}`, eventId=`inferno-event-${canto.number}-1`
  chapters.push({...stamp,id:chapterId,timelineId,number:canto.number,title:`Canto ${canto.label}`,synopsis:'',notes:'Dante’s authorial canto division; Longfellow’s complete translated verse retained.',wordGoal:countWords(canto.text)})
  events.push({...stamp,id:eventId,chapterId,timelineId,title:`Canto ${canto.label}`,description:'Complete canto retained before source-reviewed scene division and world enrichment.',locationMarkerId:null,involvedCharacterIds:[],mentionedCharacterIds:[],involvedItemIds:[],threadIds:[],motifIds:[],sortOrder:canto.number-1,travelDays:0,inWorldTime:canto.number-1,tension:1,tags:[`Source lines 1-${canto.lines.length} of Canto ${canto.label}`],structureBeat:null,status:'draft',povCharacterId:null,isFlashback:false})
  sceneTexts.push({...stamp,id:`inferno-text-${canto.number}-1`,eventId,text:canto.text,wordCount:countWords(canto.text)})
}

const reconstructed=sceneTexts.map(scene=>scene.text).join('\n\n')
if(normalize(reconstructed)!==normalize(verseText))throw Error('Imported manuscript does not reconstruct all retained verse')
const world={version:18,type:'world',exportedAt:now,world:{...stamp,id:worldId,name:'Inferno',description:'A living traveller crosses the ordered depths of Hell under Virgil’s guidance, meeting the dead and learning the moral shape of their choices.',coverImageId:null,theme:'theme-fantasy',readingMode:true,wordTarget:countWords(verseText)},timelines:[{...stamp,id:timelineId,name:'Poem order',description:'The complete thirty-four-canto poem before chronology and embedded-history modeling.',color:'#7b3d32',dayOffset:0}],chapters,events,sceneTexts}
for(const key of ['mapLayers','locationMarkers','characters','characterSnapshots','items','itemPlacements','blobs','relationships','relationshipSnapshots','plotThreads','motifs','knowledgeFacts','knowledgeReveals','factions','factionMemberships','characterGoals','mapRoutes','loreCategories','lorePages','characterMovements','locationSnapshots','itemSnapshots','travelModes','timelineRelationships','crossTimelineArtifacts','mapRegions','mapRegionSnapshots','mapAnnotations','factionRelationships','continuitySuppressions','writingLogs','sceneRevisions'])world[key]=[]
fs.writeFileSync(new URL('./manuscript-draft.pwk',import.meta.url),JSON.stringify(world,null,2)+'\n')
console.log(`Imported ${cantos.length} cantos, ${verseLineCount} verse lines, ${countWords(verseText)} words`)
