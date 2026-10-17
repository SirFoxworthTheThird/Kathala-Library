import fs from 'node:fs'
import crypto from 'node:crypto'
import {chapters as sourceChapters,narrativeText,countWords,normalize} from './source-text.mjs'
import {plans,splits,characters as charDefs,locations as locDefs,eras} from './story-plan.mjs'

const W='the-cold-choir-world', now=Date.UTC(2026,9,17), stamp={worldId:W,createdAt:now,updatedAt:now}
const id=(kind,key)=>`cold-choir-${kind}-${key}`
const root=new URL('../../',import.meta.url)
const blobs=[]
function png(kind,key,path){const url=`library/the-cold-choir/${path}`;const file=new URL(`../../${url}`,import.meta.url);if(!fs.existsSync(file))return null;const b=fs.readFileSync(file),imageId=id('image',`${kind}-${key}`);blobs.push({...stamp,id:imageId,mimeType:'image/png',url});return{id:imageId,width:b.readUInt32BE(16),height:b.readUInt32BE(20)}}

const worldImage=png('world','cover','art/world.png')
const mapDefs={
 mercy:['The Mercy Before Landfall','A longitudinal cutaway of the generation ship during deceleration and landfall.'],
 compact:['Tolland Station, 310 AL','The Compact’s rings, Spine, institutions and docks built through and around the old Mercy.'],
 reach:['The Reach, 742 AL','An orbital navigator’s chart linking Hesper, Ninefold, the Hulk, the Scree and the Interdict Field.']
}
const mapLayers=Object.entries(mapDefs).map(([key,[name,description]],i)=>{const a=png('map',key,`maps/${key}.png`);if(!a)throw Error(`Missing map ${key}`);return{...stamp,id:id('map',key),name,description,parentMapId:null,imageId:a.id,imageWidth:a.width,imageHeight:a.height,scalePixelsPerUnit:null,scaleUnit:null,levelGroupId:null,levelIndex:i,levelLabel:null}})
const coords={
 mercy:{'deck-nine':[980,520],medbay:[285,650],'forward-hold':[515,700],store:[480,390],observation:[120,510],ducts:[680,770],bridge:[150,520],'archive-locker':[420,700]},
 compact:{hall:[185,520],spine:[760,510],conservation:[310,650],'warden-residence':[250,400],'ring-b':[720,760],'shaft-twelve':[1340,700],'archive-stair':[390,360],'hal-rooms':[610,690],'watch-house':[970,660],obedient:[1380,530]},
 reach:{pelican:[1180,230],'counting-house':[300,270],'pelican-galley':[1160,270],'hulk-spine':[260,290],wreck:[1090,190],chapel:[320,330],gallows:[1330,680],'interdict-field':[1430,790],crawler:[1370,740],shaft:[1450,820],'cold-cell':[1460,850]}
}
const locationMarkers=Object.entries(locDefs).map(([key,[map,name,description]])=>({...stamp,id:id('loc',key),name,description,mapLayerId:id('map',map),linkedMapLayerId:null,x:coords[map][key][0],y:coords[map][key][1],iconType:'landmark',imageId:png('location',key,`art/locations/${key}.png`)?.id??null,tags:[],factionId:null}))

const colors=['#7289a1','#a97665','#8b8478','#688278','#a88d58','#69788d','#7d6e85','#8d725e','#7b8b69','#746b91','#8a6f72','#9a825f','#6f8790','#8b6e55','#6d8172','#856f65','#777b86','#87735d','#8795a2','#8f7868','#667b87']
const characters=Object.entries(charDefs).map(([key,[name,description]],i)=>({...stamp,id:id('char',key),name,aliases:[],description,color:colors[i%colors.length],portraitImageId:png('character',key,`art/characters/${key}.png`)?.id??null,isAlive:true,birthDate:null,tags:[],nameChanges:[]}))

const itemDefs={
 key:['The Key','A long torque wrench with a pale composite handle, made to operate the ship’s manual lock-bolts when computers fail.','key'],
 roll:['The Muster Roll','The handwritten register of four thousand sleepers and the generations of checks made beside their names.','book'],
 ledger:['Bram’s ledger','The quartermaster’s private accounting of air, stores, duty, and the daughter sleeping in Row Thirty-One.','book'],
 notebook:['Neve’s notebook','A concealed record of readings and omissions Neve cannot safely enter into the public archive.','book'],
 names:['The book of Names','Kit’s inherited grey-paper litany, preserving a count beyond the Compact’s official Roll.','book'],
 recorder:['Flight recorder','A surviving wreck recorder whose testimony changes the expedition’s understanding of the old interdict.','device'],
 drawings:['Old ship drawings','Founding plans that disclose compartments and intentions removed from public memory.','document'],
 card:['The Prime’s card','An archival card tied to the first line and the authority that suppressed it.','document'],
 letter:['Bram’s letter to Ama','A message carried across seven centuries to Row Thirty-One, berth twelve.','document']
}
const items=Object.entries(itemDefs).map(([key,[name,description,iconType]])=>({...stamp,id:id('item',key),name,description,iconType,imageId:png('item',key,`art/items/${key}.png`)?.id??null,tags:[],isCollective:key==='drawings'}))
// Reviewed per scene after paragraph splitting. This avoids carrying an object into
// every child scene merely because it appears elsewhere in the source section.
const itemByEvent={
 'The Cold Rows':['key'],"Captain's Bell":['key'],'After the Bell':['key'],'The Muster Roll':['roll'],"Bram's Ledger":['ledger'],"Kit's Prayers":['names'],
 Investiture:['roll','key'],'The Warden’s Question':['key'],"Mother Calloway's Song":['roll'],'Flight Recorder':['recorder'],Strongbox:['ledger'],
 'The Store Burns':['ledger'],'Tamsin Takes the Book':['ledger'],'The First Line':['roll','notebook'],Hal:['notebook','card'],
 'Old Drawings':['drawings'],'The Navigator':['drawings'],Arrest:['notebook'],"Hal's Confession":['roll','notebook','card'],
 Thieves:['key'],'The Decision to Steal':['key'],'The Key Taken':['key'],'Kit Reads':['key','names'],'The Fourth Release':['ledger'],
 'Ninefold Descent':['ledger'],'The Warden':['key','ledger'],'The Last Rows':['roll','notebook'],'The Broadcast':['roll','notebook','names'],
 "Rhee's Choice":['recorder'],Shaft:['key','names'],'The First Berth':['key','names'],'Toward the Pilot Cell':['key','names'],
 Waking:['key','names','letter'],'Row Thirty-One':['names','letter'],'Berth Twelve':['names','letter']
}

const timelineDefs={
 mercy:['The Mercy · 1 BL','The final deceleration and landfall aboard the generation ship, preserved as its own chronology. Numeric positions are source-order indices; no unstated elapsed days are invented.','#59758c',-365],
 compact:['The Compact · 310–311 AL','The station’s tricentennial crisis and Neve Castellan’s archival investigation. Numeric positions are source-order indices; no unstated elapsed days are invented.','#776f86',310*365],
 quiet:['The Quiet · 742 AL','Osh Teague’s salvage voyage from the Hulk to Ninefold and the buried cold rows. Numeric positions are source-order indices; no unstated elapsed days are invented.','#8b694f',742*365]
}
const timelines=Object.entries(timelineDefs).map(([key,[name,description,color,dayOffset]])=>({...stamp,id:id('timeline',key),name,description,color,dayOffset}))
const mentionMatchers={ilse:/\bIlse\b/g,tamsin:/\bTamsin\b/g,oyelaran:/\b(?:Oyelaran|Ines)\b/g,kesh:/\bKesh\b/g,bram:/\bBram\b/g,hollin:/\bHollin\b/g,neve:/\bNeve\b/g,hal:/\bHal\b/g,jory:/\bJory\b/g,rhee:/\bRhee\b/g,warden:/\bWarden-General\b/g,calloway:/\bMother Calloway\b/g,osh:/\bOsh\b/g,kit:/\bKit\b/g,saba:/\bSaba\b/g,fane:/\bFane\b/g,corso:/\bCorso\b/g,lio:/\bBrother Lio\b/g,lund:/\b(?:Sefa|Lund)\b/g,ansel:/\bAnsel\b/g,ama:/\bAma\b/g}
function snapshotNote(key,sceneText){
 const matcher=new RegExp(mentionMatchers[key].source,'i')
 const sentences=sceneText.replace(/\n+/g,' ').split(/(?<=[.!?])\s+/)
 const candidates=sentences.filter(sentence=>matcher.test(sentence)).sort((a,b)=>b.length-a.length)
 const found=candidates[0]??sentences[0]
 const excerpt=found.replace(/[_*]/g,'').replace(/\s+/g,' ').trim()
 return `${charDefs[key][0]} — ${excerpt.length>220?excerpt.slice(0,217).replace(/\s+\S*$/,'')+'…':excerpt}`
}
const chapters=[],events=[],sceneTexts=[],characterSnapshots=[],itemPlacements=[]
const eraOrder={mercy:0,compact:0,quiet:0};let planIndex=0,sortOrder=0
for(let ci=0;ci<sourceChapters.length;ci++){
 const c=sourceChapters[ci], chapterPlans=plans.slice(planIndex,planIndex+c.sections.length);if(chapterPlans.some(p=>p[0]!==chapterPlans[0][0]))throw Error(`Mixed era in chapter ${ci+1}`)
 const era=chapterPlans[0][0],chapterId=id('chapter',ci+1)
 chapters.push({...stamp,id:chapterId,timelineId:id('timeline',era),number:ci+1,title:c.title,synopsis:`The authorial chapter “${c.title}” in the ${timelineDefs[era][0]} strand.`,notes:`Authorial heading: ${c.sourceHeading}`,wordGoal:c.sections.reduce((n,s)=>n+countWords(s.text),0)})
 for(let si=0;si<c.sections.length;si++,planIndex++){
  const section=c.sections[si], [pEra,locKey,cast,description,tension]=plans[planIndex];if(pEra!==era)throw Error(`Plan era mismatch ${section.title}`)
  const paragraphs=section.text.split(/\n\n+/),segmentDefs=splits[planIndex+1]??[{title:section.title,loc:locKey,cast,description,tension}]
  let paragraphStart=0
  for(let gi=0;gi<segmentDefs.length;gi++){
  const segment=segmentDefs[gi],segmentStart=paragraphStart,paragraphEnd=segment.end??paragraphs.length
  if(paragraphEnd<=paragraphStart||paragraphEnd>paragraphs.length)throw Error(`Invalid split in section ${planIndex+1}`)
  const sceneText=paragraphs.slice(paragraphStart,paragraphEnd).join('\n\n');paragraphStart=paragraphEnd
  const sceneTitle=segment.title,eventId=id('event',`${ci+1}-${si+1}-${gi+1}`),loc=locationMarkers.find(x=>x.id===id('loc',segment.loc)),inWorldTime=eraOrder[era]++,used=itemByEvent[sceneTitle]??[]
  const threadKeys=[era, /Roll|Names|Ledger|Line|Drawings|Recorder|Broadcast|Waking/i.test(section.title)?'count':'',/Key|Investiture|Warden|Thieves/i.test(section.title)?'key':''].filter(Boolean)
  const mentioned=Object.entries(mentionMatchers).filter(([key,re])=>!segment.cast.includes(key)&&new RegExp(re.source,re.flags.replace('g','')).test(sceneText)).map(([key])=>id('char',key))
  events.push({...stamp,id:eventId,chapterId,timelineId:id('timeline',era),title:sceneTitle,description:segment.description,locationMarkerId:loc.id,involvedCharacterIds:segment.cast.map(x=>id('char',x)),mentionedCharacterIds:mentioned,involvedItemIds:used.map(x=>id('item',x)),threadIds:threadKeys.map(x=>id('thread',x)),motifIds:[id('motif','breath'),id('motif','names')],sortOrder:sortOrder++,travelDays:0,inWorldTime,tension:segment.tension,tags:[`Authorial section: ${section.title}`,`Paragraphs ${segmentStart+1}-${paragraphEnd}`,'Calendar position: ordinal within this era; elapsed days unstated'],structureBeat:null,status:'final',povCharacterId:id('char',segment.cast[0]),isFlashback:false})
  sceneTexts.push({...stamp,id:id('scene',`${ci+1}-${si+1}-${gi+1}`),eventId,text:sceneText,wordCount:countWords(sceneText)})
  segment.cast.forEach((key,n)=>characterSnapshots.push({...stamp,id:id('snapshot',`${ci+1}-${si+1}-${gi+1}-${key}`),characterId:id('char',key),eventId,isAlive:!(section.title==='The Store Burns'&&key==='bram'),currentLocationMarkerId:loc.id,currentMapLayerId:loc.mapLayerId,inventoryItemIds:[],inventoryNotes:'',travelModeId:null,sortKey:sortOrder+n/100,statusNotes:snapshotNote(key,sceneText)}))
  used.forEach((key,n)=>itemPlacements.push({...stamp,id:id('placement',`${ci+1}-${si+1}-${gi+1}-${key}`),itemId:id('item',key),eventId,locationMarkerId:loc.id,sortKey:n,notes:`The item is directly present during “${sceneTitle}”.`}))
  }
 }
}
if(planIndex!==plans.length)throw Error(`Unused plans: ${plans.length-planIndex}`)
const first=t=>{const e=events.find(e=>e.title===t);if(!e)throw Error(`Unknown event title: ${t}`);return e.id}
const plotThreads=[
 ['mercy','The Air Budget','The final crew measures dwindling life support against its duty to the sleepers.'],
 ['compact','The Unfinished Roll','Neve tests public ritual against the evidence preserved in the archive and Kin memory.'],
 ['quiet','The Interdict','A salvage debt leads from old wreckage to a prohibited field beneath Ninefold’s ice.'],
 ['count','Keep the Count','Rolls, ledgers, songs, cards and names preserve people whom institutions have stopped counting.'],
 ['key','The Key of Office','A manual tool passes between wardens, commanders, creditors and salvagers as both mechanism and claim.']
].map(([key,name,description])=>({...stamp,id:id('thread',key),name,description,color:'#71808b',status:'complete',tags:[]}))
const motifs=[['breath','Breath and Air','Compressors, life support, pressure and exhausted bodies make survival audible.'],['names','Names in Rows','Names written, sung, hidden and read aloud keep the sleepers human across centuries.'],['cold','Cold That Preserves','Frost holds bodies and evidence while societies change around them.'],['debt','Ledgers and Debt','Material accounts repeatedly become claims over lives.']].map(([key,name,description])=>({...stamp,id:id('motif',key),name,description,color:'#77838a',tags:[]}))
const loreCategories=[['edition','Edition'],['history','Eras and institutions'],['science','Ship and world']].map(([key,name],i)=>({...stamp,id:id('lore-category',key),name,description:i===0?'Text, rights, chronology, maps and illustrations.':'Reader-facing context grounded in the novel.',color:'#6f7f8d',sortOrder:i}))
const lorePages=[
 ['source','edition','Text and rights',`This reading edition preserves the complete creator-supplied manuscript of The Cold Choir by Solomon Darko: twenty-one chapters, forty-four authorial sections, and ${countWords(narrativeText).toLocaleString()} narrative words. Copyright © 2026 Solomon Darko. All rights reserved.`,'The Cold Rows'],
 ['eras','history','Three separated eras','The novel alternates among the Mercy in 1 Before Landfall, the Compact in 310–311 After Landfall, and the Quiet in 742 After Landfall. The timelines remain separate; objects, records and testimony connect them.','The Cold Rows'],
 ['maps','edition','Maps and illustrations','The three navigational plates and the world, character, place and object illustrations are original OpenAI ImageGen artwork. The maps are interpretive reading aids grounded in the manuscript’s ship, station and system geography.','The Cold Rows'],
 ['landfall','history','Before and After Landfall','Dates use the settlement’s own era. Before Landfall belongs to the approaching generation ship; After Landfall measures the societies that inherit it.','The Cold Rows'],
 ['mercy','science','The Mercy of Tolland','The generation ship carries four thousand specialists and children in cold berths while a living crew maintains the vessel across the voyage.','The Cold Rows']
].map(([key,cat,title,body,visible])=>({...stamp,id:id('lore',key),categoryId:id('lore-category',cat),title,body,visibleFromEventId:first(visible),tags:[],coverImageId:null,linkedEntityIds:[]}))
const knowledgeFacts=[
 ['roll-checks','The Roll contains generations of checks','Quartermasters continued marking the sleeper register throughout the voyage.','The Muster Roll'],
 ['count-short','The official count ended too early','Kin memory preserves names outside the Compact’s finished public Roll.','News from Ninefold'],
 ['interdict','The old ban concealed a physical site','The prohibition points toward a field on Ninefold rather than only a legal tradition.','The Old Ban'],
 ['ama','Ama Okafor remains in the cold rows','Bram’s daughter is the child assigned to Row Thirty-One, berth twelve.','Row Thirty-One']
].map(([key,title,description,event])=>({...stamp,id:id('fact',key),title,description,readerLearnsAtEventId:first(event),originEventId:first(event),tags:[]}))
const factions=[['mercy','Mercy crew','The working crew responsible for the ship and its sleeping passengers.'],['compact','The Compact','The station polity that organizes authority around charter, Watch and Warden.'],['kin','The Kin','A community whose songs preserve the unfinished count.'],['union','Ninefold Ice Union','Miners and delegates seeking safety, compensation and control of their work.'],['counting','Counting House','Fane’s network of debt, salvage claims and hired force.'],['navy','Compact Navy','The service in which Captain Rhee commands the Obedient.']].map(([key,name,description])=>({...stamp,id:id('faction',key),name,description,color:'#6e7880',tags:[],coverImageId:png('faction',key,`art/factions/${key}.png`)?.id??null}))
const relationshipDefs=[
 ['ilse-tamsin','ilse','tamsin','Warden and apprentice','positive','Ilse teaches Tamsin the physical knowledge of the ship while trusting her navigation at landfall.',8,'The Cold Rows'],
 ['ilse-bram','ilse','bram','Department keepers','positive','The warden and quartermaster share responsibility for the sleepers while disagreeing with command’s arithmetic.',7,"Lund's Arithmetic"],
 ['bram-ama','bram','ama','Father and sleeping daughter','positive','Bram’s duty to all four thousand sleepers is inseparable from Ama’s name in Row Thirty-One.',10,"Bram's Ledger"],
 ['neve-hal','neve','hal','Archivist and mentor','positive','Hal trained Neve to handle the Roll and leaves her to decide what their institution must finally disclose.',8,'The Muster Roll'],
 ['neve-jory','neve','jory','Archivist and Union delegate','positive','Jory’s claim that the count is unfinished gives Neve a living measure for the archive’s omissions.',6,'News from Ninefold'],
 ['osh-kit','osh','kit','Captain and crewmate','positive','Osh’s hard-earned caution protects Kit while Kit’s moral questions keep the captain from treating people as salvage.',9,"Pelican's Debt"],
 ['osh-saba','osh','saba','Old associates','positive','Osh recruits Saba because she trusts her competence when debt and danger converge.',7,'Saba'],
 ['osh-fane','osh','fane','Debtor and creditor','negative','Fane treats Osh’s ship, labor and choices as claims in his ledger; Osh looks for the edge of every term.',8,'The Counting House']
]
const relationships=relationshipDefs.map(([key,a,b,label,sentiment,description,strength,start])=>({...stamp,id:id('relationship',key),characterAId:id('char',a),characterBId:id('char',b),label,sentiment,description,strength,isBidirectional:true,startEventId:first(start)}))
const factionMembershipDefs=[['ilse','mercy','Deck Nine warden','The Cold Rows'],['tamsin','mercy','Navigator','The Cold Rows'],['kesh','mercy','First officer',"Captain's Bell"],['bram','mercy','Quartermaster',"Lund's Arithmetic"],['hollin','mercy','Watch corporal',"Lund's Arithmetic"],['neve','compact','Hall archivist','The Muster Roll'],['hal','compact','Senior archivist','The Muster Roll'],['warden','compact','Warden-General','The Delegation'],['jory','union','Delegate','News from Ninefold'],['calloway','kin','Elder',"Mother Calloway's Song"],['rhee','navy','Captain of the Obedient','The Delegation'],['fane','counting','Creditor','The Counting House'],['corso','counting','Drill-master','Into the Grind']]
const factionMemberships=factionMembershipDefs.map(([char,faction,role,start],i)=>({...stamp,id:id('membership',i+1),factionId:id('faction',faction),characterId:id('char',char),role,startEventId:first(start),endEventId:null,notes:''}))
const goalDefs=[['ilse','Keep the four thousand cold berths alive through landfall','The Cold Rows','Deck Nine Falls'],['tamsin','Plot the approach that preserves the ship and its sleepers','The Cold Rows','Burn'],['bram','Keep a complete account and protect the sleepers from the air budget',"Lund's Arithmetic",'The Store Burns'],['neve','Determine what the Roll omits and place the evidence before the Compact','The Muster Roll','The Broadcast'],['jory','Win safety and restitution for the Ninefold miners','News from Ninefold','The Broadcast'],['rhee','Judge whether obedience can survive the evidence entrusted to her','The Delegation',"Rhee's Choice"],['osh','Complete the Ninefold expedition without surrendering her crew to Fane',"Pelican's Debt",'Waking'],['kit','Keep reading every name that official history abandoned',"Kit's Prayers",'Waking'],['saba','Bring the crew through the Interdict Field alive','Saba','Waking']]
const characterGoals=goalDefs.map(([char,text,start,end],i)=>({...stamp,id:id('goal',i+1),characterId:id('char',char),type:'primary',text,startEventId:first(start),endEventId:first(end)}))
const routes=[
 ['mercy-spine','mercy','Mercy axial passage',[[150,520],[285,650],[515,700],[680,770],[980,520]]],
 ['compact-spine','compact','Compact Spine',[[185,520],[310,650],[610,690],[760,510],[970,660],[1380,530]]],
 ['reach-transfer','reach','Hulk to Ninefold transfer',[[260,290],[1090,190],[1180,230],[1330,680],[1430,790]]]
].map(([key,map,name,points])=>({...stamp,id:id('route',key),mapLayerId:id('map',map),name,routeType:map==='reach'?'ship':'foot',waypoints:points.map(([x,y])=>({x,y})),color:'#b18a58',notes:'Interpretive path aligned with the generated navigational plate.'}))

const out={version:18,type:'world',exportedAt:now,world:{...stamp,id:W,name:'The Cold Choir',description:'Across three eras, wardens, archivists and salvagers inherit a generation ship’s sleepers, its unfinished count, and the Key that can reach them.',coverImageId:worldImage.id,theme:'theme-scifi',readingMode:true,continuityStaleThreshold:5,wordTarget:countWords(narrativeText),calendar:{startYear:0,yearSuffix:' AL',months:[{name:'Shipyear',days:365}]}},chapters,events,sceneTexts,timelines,mapLayers,locationMarkers,characters,items,characterSnapshots,itemPlacements,blobs,relationships,relationshipSnapshots:[],plotThreads,motifs,loreCategories,lorePages,knowledgeFacts,knowledgeReveals:[],factions,factionMemberships,characterGoals,mapRoutes:routes,characterMovements:[],continuitySuppressions:[],crossTimelineArtifacts:[],factionRelationships:[],itemSnapshots:[],locationSnapshots:[],mapAnnotations:[],mapRegionSnapshots:[],mapRegions:[],sceneRevisions:[],timelineRelationships:[],travelModes:[],writingLogs:[]}
const reconstructed=sceneTexts.map(s=>s.text).join('\n\n')
if(normalize(reconstructed)!==normalize(narrativeText))throw Error('Scene text does not reconstruct retained narrative')
const dest=new URL('../../library/the-cold-choir.pwk',import.meta.url);fs.writeFileSync(dest,JSON.stringify(out))
const bytes=fs.readFileSync(dest);console.log(JSON.stringify({chapters:chapters.length,events:events.length,words:countWords(reconstructed),timelines:timelines.length,characters:characters.length,snapshots:characterSnapshots.length,locations:locationMarkers.length,maps:mapLayers.length,items:items.length,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')},null,2))
