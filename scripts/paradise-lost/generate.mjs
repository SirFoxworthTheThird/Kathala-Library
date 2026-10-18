import fs from 'node:fs'
import crypto from 'node:crypto'
import {books,verseText,countWords,normalize,sourceSha256} from './source-text.mjs'
import {bookPlans,characterNames} from './scene-plan.mjs'
import {reviewedBooks,reviewedBoundaries,sceneClock} from './reviewed-scenes.mjs'

const W='paradise-lost-world',now=Date.UTC(2026,9,18),stamp={worldId:W,createdAt:now,updatedAt:now},id=(kind,key)=>`paradise-lost-${kind}-${key}`
const blobs=[]
function png(kind,key,rel){const url=`library/paradise-lost/${rel}`,file=new URL(`../../${url}`,import.meta.url);if(!fs.existsSync(file))return null;const bytes=fs.readFileSync(file),imageId=id('image',`${kind}-${key}`);blobs.push({...stamp,id:imageId,mimeType:'image/png',url});return{id:imageId,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)}}

const mapDefs={
 cosmos:['The Miltonic Cosmos','A cosmographic overview of Heaven above, the pendant created universe, surrounding Chaos, and Hell below.'],
 hell:['Hell and Pandemonium','A topographic infernal basin from the burning lake and plain to Pandemonium and the gate into Chaos.'],
 heaven:['Heaven and the Northern Field','A luminous relief map of the throne, northern mustering ground, battlefield, and outer gate.'],
 eden:['Eden and Its Eastern Bounds','A garden topography from Mount Niphates and the encircling wall to the bower, both central trees, the hill of vision, and eastern gate.'],
}
const mapLayers=Object.entries(mapDefs).map(([key,[name,description]],index)=>{const art=png('map',key,`maps/${key}.png`);return{...stamp,id:id('map',key),name,description,parentMapId:key==='cosmos'?null:id('map','cosmos'),imageId:art?.id??null,imageWidth:art?.width??1536,imageHeight:art?.height??1024,scalePixelsPerUnit:null,scaleUnit:null,levelGroupId:null,levelIndex:null,levelLabel:null}})
const locDefs={
 'cosmos':['cosmos','The Created Universe','The finite starry universe hangs by a golden chain within the surrounding wild of Chaos.',770,470,null],
 'cosmos-gate':['cosmos','The Convex of the Universe','The outer shell where Satan first gains a view into created space.',990,440,null],
 'chaos':['cosmos','Chaos','The unformed abyss between Hell, Heaven, and the created world.',350,390,null],
 'chaos-throne':['cosmos','The Court of Chaos','Chaos and ancient Night keep a shifting court amid elemental disorder.',270,500,null],
 'sun':['cosmos','The Sun','Uriel’s radiant station above the planetary spheres.',680,580,null],
 'earth':['cosmos','Earth','The newly created world containing Eden.',770,515,'eden'],
 'hell-region':['cosmos','Hell','The remote infernal world below creation.',770,80,'hell'],
 'heaven-region':['cosmos','Heaven','The empyrean realm above the created universe.',770,900,'heaven'],
 'burning-lake':['hell','The Burning Lake','A dark fiery flood where the defeated rebel host lies stunned.',400,280,null],
 'hell-plain':['hell','The Plain of Hell','The scorched solid ground beside the lake where the legions assemble.',750,575,null],
 'pandemonium':['hell','Pandemonium','The golden infernal capital and council hall raised from a mined hill.',1190,600,null],
 'hell-gate':['hell','The Gates of Hell','Ninefold gates of brass, iron, and adamant stand between the infernal world and the abyss.',1410,850,null],
 'heaven-throne':['heaven','The Throne of Heaven','The center of divine counsel, praise, and commission.',770,770,null],
 'heaven-north':['heaven','The Northern Quarter','The region where Satan gathers his followers beneath a rival standard.',275,800,null],
 'heaven-field':['heaven','The Field of Heaven','The immense plain across which the angelic armies meet.',760,420,null],
 'heaven-gate':['heaven','The Wall of Heaven','The precipice through which the defeated rebels fall.',780,230,null],
 'niphates':['eden','Mount Niphates','The mountain outside Eden where Satan first alights near the garden.',150,840,null],
 'eden-wall':['eden','The Wall of Paradise','A steep natural enclosure of wooded slopes around Eden.',330,600,null],
 'eden-garden':['eden','The Garden of Eden','Rivers, groves, flowers, and open work grounds fill the human dwelling.',750,500,null],
 'tree-of-life':['eden','The Tree of Life','The high central tree appointed to sustain life within the garden.',790,665,null],
 'tree-of-knowledge':['eden','The Tree of Knowledge','The prohibited tree standing near the garden’s center.',890,660,null],
 'bower':['eden','The Nuptial Bower','Adam and Eve’s flowered shelter for rest, conversation, prayer, and reconciliation.',805,375,null],
 'eden-gate':['eden','The Eastern Gate','The appointed entrance through Paradise’s eastern enclosure.',1410,680,null],
 'vision-hill':['eden','The Hill of Vision','The garden’s highest summit, commanding a wide prospect beyond its enclosure.',860,880,null],
 'western-watch':['eden','The Western Watch','The western meeting of the northward and southward patrols along Paradise’s wooded perimeter.',370,450,null],
}
const locationMarkers=Object.entries(locDefs).map(([key,[map,name,description,x,y,linked]])=>({...stamp,id:id('loc',key),name,description,mapLayerId:id('map',map),linkedMapLayerId:linked?id('map',linked):null,x,y,iconType:'landmark',imageId:png('location',key,`art/locations/${key}.png`)?.id??null,tags:[],factionId:null}))

const charDescriptions={
 azazel:'The fallen power entrusted with the imperial standard when the defeated host regroups.',
 mulciber:'The skilled architect who directs the building of the infernal palace.',
 nisroch:'A wounded rebel power who argues that pain requires stronger weapons and protection.',
 uzziel:'Gabriel’s deputy, given charge of the southern circuit of Eden’s night watch.',
 poet:'The epic’s learned first-person singer, invoking heavenly aid while acknowledging his blindness.',
 satan:'The defeated rebel archangel first seen waking in Hell, immense in power and fixed in defiance.',
 beelzebub:'Satan’s chief companion among the fallen powers, grave in counsel after their defeat.',
 moloch:'A fierce fallen power who prefers immediate open war to delay or accommodation.',
 belial:'An eloquent fallen power whose polished caution shelters aversion to action.',
 mammon:'A fallen power whose attention turns readily from Heaven toward material wealth and construction.',
 sin:'A formidable guardian at Hell’s gate, with a woman’s upper form and a monstrous lower shape.',
 death:'The shapeless armed terror beside the other guardian at the gate of Hell.',
 chaos:'The unstable ruler of the unformed abyss beyond Hell’s gates.',
 night:'Ancient Night sits beside Chaos amid the contending elements.',
 god:'The sovereign creator who speaks from Heaven of freedom, justice, creation, and mercy.',
 son:'The beloved Son seated at the Father’s right hand in the heavenly council.',
 uriel:'Regent of the Sun, celebrated for clear sight yet approached by Satan in disguise.',
 adam:'The first man, rational and affectionate, tending Eden under one stated prohibition.',
 eve:'The first woman, perceptive and eloquent, sharing Eden’s work and freedom with Adam.',
 gabriel:'Commander of the angelic watch stationed at the eastern gate of Paradise.',
 ithuriel:'An angel selected from Gabriel’s night watch to search the garden.',
 zephon:'An angel of the garden watch who accompanies Ithuriel to the nuptial bower.',
 raphael:'A sociable archangel sent to warn Adam through conversation, history, and shared food.',
 abdiel:'The lone seraph who rejects Satan’s assembly and returns openly to loyal service.',
 michael:'The warrior archangel sent at last to disclose human history and conduct the pair from Eden.',
}
const colors=['#866848','#70494a','#715b52','#8b4d3f','#72636e','#8a7144','#78495f','#47444f','#6b6260','#4f5269','#d0b56e','#ba8b4f','#d49a49','#8b765b','#9b715b','#6e7896','#81869b','#717998','#9b8060','#c5aa7b','#7b829a']
const characters=Object.entries(characterNames).map(([key,name],index)=>({...stamp,id:id('char',key),name:key==='sin'?'The Gatekeeper':key==='death'?'The Armed Shape':name,aliases:[],description:charDescriptions[key],color:colors[index%colors.length],portraitImageId:png('character',key,`art/characters/${key}.png`)?.id??null,isAlive:true,birthDate:null,tags:[],nameChanges:[]}))

const itemDefs={
 spear:['Satan’s spear','An immense weapon carried across the burning marl and later into conflict.','weapon'],
 shield:['Satan’s shield','A broad ethereal shield compared to the moon seen through a telescope.','shield'],
 key:['The key of Hell','The fatal key carried by Sin for the ninefold gates.','key'],
 fruit:['Fruit of the Tree of Knowledge','The prohibited fruit whose promised knowledge becomes the instrument of disobedience.','food'],
 scales:['The golden scales','A heavenly balance shown above Gabriel and Satan to reveal the weight of their possible contest.','artifact'],
 sword:['The flaming sword','The turning fiery guard established at Eden’s eastern gate.','weapon'],
 cannon:['Infernal artillery','Engines devised by the rebels from materials prepared beneath Heaven’s soil.','weapon'],
}
const items=Object.entries(itemDefs).map(([key,[name,description,iconType]])=>({...stamp,id:id('item',key),name,description,iconType,imageId:png('item',key,`art/items/${key}.png`)?.id??null,tags:[],isCollective:key==='cannon'}))

const timelineDefs={
 address:['Poetic address','Invocations and direct reflections spoken from the poet’s act of composition.','#76634c',0],
 fall:['Fall narrative','The primary sequence from the rebels waking in Hell through humanity’s exile from Eden.','#8b5b4a',0],
 rebellion:['War in Heaven','Raphael’s recounted rebellion, three battle days, and nine-day expulsion, placed before the infernal stupor.','#68779a',-21.25],
 creation:['Creation','Raphael’s recounted six days and Sabbath, placed after the rebels’ expulsion and before their awakening.','#5f806d',-9],
 memory:['Adam’s first memories','Adam’s awakening and companionship on creation’s sixth day, before Raphael’s visit.','#8d9160',-9],
 vision:['Michael’s vision','Prophetic history presented to Adam on the hill; its clock follows the act of presentation, not the dates of the depicted future.','#8a7652',0],
}
const timelines=Object.entries(timelineDefs).map(([key,[name,description,color,dayOffset]])=>({...stamp,id:id('timeline',key),name,description,color,dayOffset}))
const chapters=[],events=[],sceneTexts=[],characterSnapshots=[],itemPlacements=[]
let sortOrder=0
const firstEventByChar={},lastTime={address:null,fall:null,rebellion:null,creation:null,vision:null,memory:null}
for(let bi=0;bi<books.length;bi++){
 const book=books[bi],plan=bookPlans[bi],points=reviewedBoundaries(book),chapterId=id('book',bi+1)
 chapters.push({...stamp,id:chapterId,timelineId:id('timeline','fall'),number:bi+1,title:`Book ${book.label}`,synopsis:`Milton’s Book ${book.label}, preserved in complete blank verse and divided at reviewed verse-line boundaries.`,notes:'Authorial twelve-book division.',wordGoal:countWords(book.text)})
 for(let si=0;si<plan.length;si++){
  const [title,description,locKey,castString,tension]=plan[si],cast=castString?castString.split(' '):[],eventId=id('event',`${bi+1}-${si+1}`),text=book.lines.slice(points[si],points[si+1]).join('\n'),reviewed=reviewedBooks[bi][si],timeline=reviewed.timeline,inWorldTime=sceneClock(bi+1,reviewed)
  const itemKeys=reviewed.items
  const travelDays=lastTime[timeline]===null?0:Math.max(0,Math.floor(inWorldTime)-Math.floor(lastTime[timeline]));lastTime[timeline]=inWorldTime
  events.push({...stamp,id:eventId,chapterId,timelineId:id('timeline',timeline),title,description,locationMarkerId:id('loc',locKey),involvedCharacterIds:cast.map(key=>id('char',key)),mentionedCharacterIds:[],involvedItemIds:itemKeys.map(key=>id('item',key)),threadIds:[id('thread',timeline==='address'?'poem':timeline)],motifIds:[id('motif',/Fruit|Eden|Adam|Eve|Paradise/.test(title)?'garden':'height')],sortOrder:sortOrder++,travelDays,inWorldTime,tension,tags:[`Book ${book.label}, source lines ${points[si]+1}-${points[si+1]}`],structureBeat:null,status:'final',povCharacterId:cast.length?id('char',cast[0]):null,isFlashback:['rebellion','creation','memory'].includes(timeline)})
  sceneTexts.push({...stamp,id:id('text',`${bi+1}-${si+1}`),eventId,text,wordCount:countWords(text)})
  cast.forEach((key,index)=>{firstEventByChar[key]??=eventId;characterSnapshots.push({...stamp,id:id('snapshot',`${bi+1}-${si+1}-${key}`),characterId:id('char',key),eventId,isAlive:true,currentLocationMarkerId:id('loc',locKey),currentMapLayerId:locationMarkers.find(loc=>loc.id===id('loc',locKey)).mapLayerId,inventoryItemIds:Object.entries(reviewed.holders??{}).filter(([,holder])=>holder===key).map(([item])=>id('item',item)),inventoryNotes:'',travelModeId:null,sortKey:sortOrder+index/100,statusNotes:reviewed.states[key]})})
  itemKeys.forEach((key,index)=>itemPlacements.push({...stamp,id:id('placement',`${bi+1}-${si+1}-${key}`),itemId:id('item',key),eventId,locationMarkerId:id('loc',locKey),sortKey:index,notes:`Directly present in “${title}”.`}))
 }
}
if(normalize(sceneTexts.map(scene=>scene.text).join('\n\n'))!==normalize(verseText))throw Error('Generated scenes do not reconstruct the complete poem')
const first=title=>{const event=events.find(entry=>entry.title===title);if(!event)throw Error(`Unknown event: ${title}`);return event.id}
for(const key of ['sin','death'])characters.find(character=>character.id===id('char',key)).nameChanges=[{eventId:first('Sin Tells Her Origin'),name:characterNames[key]}]
const plotThreads=[
 ['fall','Freedom and the Fall','Commands, arguments, and choices test what freedom means under created order.'],
 ['rebellion','The Revolt in Heaven','Raphael’s warning traces pride from secret assembly to open celestial war.'],
 ['creation','The Making of the World','Raphael recounts the ordered emergence of light, heavens, Earth, life, and humanity.'],
 ['memory','The First Human Experience','Adam recalls how he learned his own nature and need for companionship.'],
 ['vision','History Beyond Eden','Michael’s vision gives Adam a long human future beyond the garden.'],
 ['poem','The Poet’s Argument','Invocations and reflections place the act of telling beside the epic action.'],
].map(([key,name,description])=>({...stamp,id:id('thread',key),name,description,color:'#806c51',status:'complete',tags:[]}))
const motifs=[['height','Height and Descent','Mountains, thrones, gates, falls, flights, and rising paths repeatedly give moral action a vertical form.'],['garden','Fruit, Growth, and Cultivation','The garden joins abundance to deliberate care, appetite, and restraint.'],['light','Light and Darkness','Visible and inward light distinguish knowledge from the concealment that imitates it.'],['speech','Counsel and Persuasion','Public debate, private warning, temptation, confession, and prophecy change what action becomes possible.']].map(([key,name,description])=>({...stamp,id:id('motif',key),name,description,color:'#85765b',tags:[]}))
const factionDefs={faithful:['Heavenly Host','Angels who remain obedient to the Creator.'],fallen:['Fallen Host','The rebel angels gathered under Satan after their expulsion.'],human:['Human Family','Adam and Eve as the first human household.'],infernal:['Powers at Hell Gate','The two terrible guardians at the threshold between Hell and Chaos.']}
const factions=Object.entries(factionDefs).map(([key,[name,description]])=>({...stamp,id:id('faction',key),name,description,color:'#786b58',tags:[],coverImageId:png('faction',key,`art/factions/${key}.png`)?.id??null}))
const factionFor={azazel:'fallen',mulciber:'fallen',nisroch:'fallen',uzziel:'faithful',satan:'fallen',beelzebub:'fallen',moloch:'fallen',belial:'fallen',mammon:'fallen',sin:'infernal',death:'infernal',god:'faithful',son:'faithful',uriel:'faithful',gabriel:'faithful',ithuriel:'faithful',zephon:'faithful',raphael:'faithful',abdiel:'faithful',michael:'faithful',adam:'human',eve:'human'}
const factionMemberships=Object.entries(factionFor).map(([character,faction],index)=>({...stamp,id:id('membership',index+1),factionId:id('faction',faction),characterId:id('char',character),role:faction==='fallen'?'Rebel power':faction==='faithful'?'Heavenly power':faction==='human'?'First parent':'Gate power',startEventId:firstEventByChar[character],endEventId:null,notes:''}))
const relationships=[
 ['satan-beelzebub','satan','beelzebub','Commander and chief counsellor','negative','They first appear as defeated allies turning shared ruin toward renewed resistance.','Awakening on the Burning Lake'],
 ['god-son','god','son','Father and Son','positive','The Son freely answers the Father’s concern for justice and mercy.','The Son Offers Himself'],
 ['adam-eve','adam','eve','Husband and wife','positive','They first appear sharing Eden’s work, affection, and one prohibition.','Adam and Eve'],
 ['adam-raphael','adam','raphael','Host and heavenly messenger','positive','Raphael accepts Adam’s hospitality while bringing a warning.','Raphael Descends'],
 ['satan-sin','satan','sin','Father and daughter','negative','Sin recognizes Satan at Hell’s gate and recounts the bond that produced her.','Sin Tells Her Origin'],
 ['sin-death','sin','death','Mother and son','negative','The gatekeeper’s account reveals the violent family bond joining the guardians.','Sin Tells Her Origin'],
 ['adam-michael','adam','michael','Exile and guide','positive','Michael bears the sentence of departure and prepares Adam to understand what follows.','The Sentence of Exile'],
].map(([key,a,b,label,sentiment,description,start])=>({...stamp,id:id('relationship',key),characterAId:id('char',a),characterBId:id('char',b),label,sentiment,description,strength:8,isBidirectional:true,startEventId:first(start)}))
const relationshipSnapshots=relationships.map((relationship,index)=>({...stamp,id:id('relationship-state',`initial-${index}`),relationshipId:relationship.id,eventId:relationship.startEventId,label:relationship.label,sentiment:relationship.sentiment,strength:relationship.strength,description:relationship.description,isActive:true,sortKey:index}))
for(const [title,label,sentiment,strength,description] of [
 ['The Debate Over Separate Work','Disagreement over safety','neutral',6,'Eve seeks independent work; Adam urges mutual protection but leaves the choice free.'],
 ['Adam Chooses Eve','Solidarity against the command','positive',9,'Adam knowingly chooses to share Eve’s fate rather than endure separation.'],
 ['Mutual Accusation','Estrangement and blame','negative',3,'The shared transgression becomes reciprocal accusation rather than comfort.'],
 ['Eve Seeks Reconciliation','A plea for peace','negative',3,'Eve seeks forgiveness while Adam’s first response remains bitter rejection.'],
 ['Shared Burden','Companions in sorrow','positive',7,'Adam raises Eve and accepts their common burden, restoring their mutual care.'],
 ['Repentance','United in confession','positive',8,'The pair turn together from despair to prayer and accepted responsibility.'],
 ['The World Before Them','Companions in exile','positive',9,'They leave their home hand in hand with a shared mortal future.'],
])relationshipSnapshots.push({...stamp,id:id('relationship-state',title.toLowerCase().replaceAll(' ','-')),relationshipId:id('relationship','adam-eve'),eventId:first(title),label,sentiment,strength,description,isActive:true,sortKey:relationshipSnapshots.length})
const goals=[
 ['satan','Find a form of resistance after defeat','Awakening on the Burning Lake','The World Before Them'],
 ['adam','Understand and keep the order entrusted to him','Adam and Eve','The World Before Them'],
 ['eve','Share in Eden’s knowledge, work, and companionship','Adam and Eve','The World Before Them'],
 ['raphael','Warn Adam through history and reason','Raphael Descends','The Angel Departs'],
 ['michael','Prepare the first parents to leave Eden with informed hope','Michael Enters Paradise','The World Before Them'],
 ['abdiel','Hold allegiance openly against the rebel assembly','Abdiel Answers Satan','The Rebels Cast Out'],
].map(([char,text,start,end],index)=>({...stamp,id:id('goal',index+1),characterId:id('char',char),type:'primary',text,startEventId:first(start),endEventId:first(end)}))
const facts=[
 ['prohibition','One tree is prohibited','Adam and Eve may eat throughout Eden except from the Tree of Knowledge.','Satan Overhears the Prohibition'],
 ['dream','A hostile power can reach Eve’s imagination','The hidden intruder attempts to shape the sleeping Eve’s imagination','Satan at Eve’s Ear'],
 ['serpent','The serpent’s speech is a disguise','Satan enters the serpent before approaching Eve alone.','Satan Returns as Serpent'],
 ['mortality','Death enters human experience','Michael’s vision shows Adam the first murder and the bodily forms of death.','Cain and Abel'],
].map(([key,title,description,event])=>({...stamp,id:id('fact',key),title,description,readerLearnsAtEventId:first(event),originEventId:first(event),tags:[]}))
const loreCategories=[['edition','Edition'],['cosmos','Cosmos'],['form','Poetic form']].map(([key,name],index)=>({...stamp,id:id('lore-category',key),name,description:'Reader-facing context grounded in the poem and this source edition.',color:'#806f55',sortOrder:index}))
const lorePages=[
 ['source','edition','Text and rights',`This reading edition preserves all ${books.length} books, ${books.reduce((sum,book)=>sum+book.lines.length,0).toLocaleString()} verse lines, and ${countWords(verseText).toLocaleString()} words from Project Gutenberg eBook #26, credited to Dr. Joseph Raben. John Milton died in 1674; the source is public domain in the United States. Downloaded source SHA-256: ${sourceSha256}.`,'The Argument and Invocation'],
 ['structure','form','The twelve-book structure','Milton first published Paradise Lost in ten books in 1667 and reorganized the poem into twelve books for the revised 1674 edition. Project Gutenberg eBook #26 follows the twelve-book structure.','The Argument and Invocation'],
 ['verse','form','Blank verse','The poem uses unrhymed iambic pentameter with flexible syntax carried across line endings. This edition preserves the source lineation.','The Argument and Invocation'],
 ['cosmography','cosmos','The poem’s cosmos','The maps interpret the poem’s vertical cosmography: Heaven beyond the created universe, Hell below, Chaos between, and Earth with Eden inside the pendant world. They are reading aids rather than claims about measurable physical scale.','Satan Reaches the Universe'],
 ['chronology','edition','Chronology and frames','The main Fall narrative, Raphael’s earlier war and creation accounts, Adam’s memories, Michael’s prophetic presentation, and the poet’s addresses use separate timelines. Each strand has its own clock. Heavenly war and creation follow the poem’s numbered days; human days are an editorial relative sequence that retains Satan’s seven-night absence. Fractions indicate broad parts of a day, not measured travel times. Michael’s future history is dated by its telling to Adam, not by the centuries it depicts.','Raphael Descends'],
 ['art','edition','Illustration provenance','All world, character, item, place, faction, and map images in this edition are original OpenAI ImageGen illustrations. The illustrations use a mature copperplate engraving style with restrained watercolor. Their subjects interpret the poem; they are modern generated works, not historical engravings.','The Argument and Invocation'],
].map(([key,cat,title,body,event])=>({...stamp,id:id('lore',key),categoryId:id('lore-category',cat),title,body,visibleFromEventId:first(event),tags:[],coverImageId:null,linkedEntityIds:[]}))
const routes=[
 ['satan-outward','cosmos','Satan’s passage from Hell toward Earth',[[770,80],[350,390],[990,440],[680,580],[770,515]]],
 ['eden-exile','eden','Path to the eastern gate',[[805,375],[860,880],[805,375],[1410,680]]],
].map(([key,map,name,points])=>({...stamp,id:id('route',key),mapLayerId:id('map',map),name,routeType:key==='eden-exile'?'road':'flight',waypoints:points.map(([x,y])=>({x,y})),color:'#b28b53',notes:'Interpretive route derived from the poem’s ordered places.'}))
const worldImage=png('world','cover','art/world.png')
const out={version:18,type:'world',exportedAt:now,world:{...stamp,id:W,name:'Paradise Lost',description:'Heaven, Hell, Chaos, and a newly planted world stand around the first human freedom and the voices that seek to guide it.',coverImageId:worldImage?.id??null,theme:'theme-fantasy',readingMode:true,continuityStaleThreshold:5,wordTarget:countWords(verseText),calendar:{startYear:0,yearSuffix:'',months:[{name:'Epic sequence',days:365}]}},chapters,events,sceneTexts,timelines,mapLayers,locationMarkers,characters,items,characterSnapshots,itemPlacements,blobs,relationships,relationshipSnapshots,plotThreads,motifs,loreCategories,lorePages,knowledgeFacts:facts,knowledgeReveals:[],factions,factionMemberships,characterGoals:goals,mapRoutes:routes,characterMovements:[],continuitySuppressions:[],crossTimelineArtifacts:[],factionRelationships:[],itemSnapshots:[],locationSnapshots:[],mapAnnotations:[],mapRegionSnapshots:[],mapRegions:[],sceneRevisions:[],timelineRelationships:[],travelModes:[],writingLogs:[]}
const dest=new URL('../../library/paradise-lost.pwk',import.meta.url);fs.writeFileSync(dest,JSON.stringify(out))
const bytes=fs.readFileSync(dest);console.log(JSON.stringify({chapters:chapters.length,events:events.length,words:countWords(verseText),lines:books.reduce((sum,book)=>sum+book.lines.length,0),timelines:timelines.length,characters:characters.length,snapshots:characterSnapshots.length,locations:locationMarkers.length,maps:mapLayers.length,items:items.length,images:blobs.length,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')},null,2))

