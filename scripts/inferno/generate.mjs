import fs from 'node:fs'
import crypto from 'node:crypto'
import {cantos,verseText,verseLineCount,countWords,normalize,sourceSha256} from './source-text.mjs'
import {reviewedCantos,reviewedBoundaries,sceneClock} from './reviewed-scenes.mjs'
import {cantoPlans,characterNames} from './scene-plan.mjs'

const W='inferno-world',now=Date.UTC(2026,9,18),stamp={worldId:W,createdAt:now,updatedAt:now},id=(kind,key)=>`inferno-${kind}-${key}`
const blobs=[]
function png(kind,key,rel){const url=`library/inferno/${rel}`,file=new URL(`../../${url}`,import.meta.url);if(!fs.existsSync(file))return null;const bytes=fs.readFileSync(file),imageId=id('image',`${kind}-${key}`);if(bytes.subarray(1,4).toString()!=='PNG')throw Error(`Not a PNG: ${url}`);blobs.push({...stamp,id:imageId,mimeType:'image/png',url});return{id:imageId,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)}}

const mapDefs={
 overview:['The Descent Through Hell','A topographic cutaway of the dark wood, the funnel of Hell, the centre of Earth, and the hidden ascent.'],
 upper:['Upper Hell','A topographic plan from the gate and Acheron through Limbo, the circles of appetite, Styx, and the walls of Dis.'],
 lower:['Dis and the Circle of Violence','A topographic plan of the burning tombs, the three rings of violence, Phlegethon, the thorn wood, burning sand, and cataract.'],
 malebolge:['Malebolge','A mature topographic plan of the ten stone bolgias, their bridges, broken crossings, and the giants’ well.'],
 cocytus:['Cocytus and the Earth’s Centre','A topographic plan of the four frozen zones, Lucifer at the centre, and the upward passage.'],
 history:['Italy and the Western Sea','A historical topographic map for the poem’s embedded memories in Rimini, Mantua, Montefeltro, Rome, Pisa, and Ulysses’ western voyage.'],
}
const mapLayers=Object.entries(mapDefs).map(([key,[name,description]])=>{const art=png('map',key,`maps/${key}.png`);return{...stamp,id:id('map',key),name,description,parentMapId:['upper','lower','malebolge','cocytus'].includes(key)?id('map','overview'):null,imageId:art?.id??null,imageWidth:art?.width??1536,imageHeight:art?.height??1024,scalePixelsPerUnit:null,scaleUnit:null,levelGroupId:null,levelIndex:null,levelLabel:null}})
const locDefs={
 'dark-wood':['overview','The Dark Wood','A tangled woodland below the sunlit slope where the straight path is lost.',430,860,null],
 'sunlit-slope':['overview','The Sunlit Slope','The first rising ground above the wood, blocked by three beasts.',1080,870,null],
 'hell-mouth':['overview','The Mouth of Hell','The upper opening of the immense cone beneath the inhabited world.',768,805,'upper'],
 'dis-region':['overview','The City of Dis','The red-walled division between upper Hell and the deeper circles.',768,555,'lower'],
 'malebolge-region':['overview','Malebolge','The eighth circle forms ten descending stone trenches around a central well.',768,335,'malebolge'],
 'cocytus-region':['overview','Cocytus','The frozen ninth circle and the centre of gravity at the cone’s point.',768,120,'cocytus'],
 'hell-gate':['upper','The Gate of Hell','The inscribed threshold from the mortal approach into the infernal vestibule.',160,850,null],
 'vestibule':['upper','The Vestibule','The waste where neutral souls run behind an empty banner.',310,780,null],
 'acheron':['upper','Acheron','The first infernal river and Charon’s crowded crossing.',470,720,null],
 'limbo-rim':['upper','The Rim of Limbo','The brink from which the travellers first hear the sighs of the first circle.',610,690,null],
 'limbo':['upper','Limbo','A dim meadow holding virtuous souls outside hope of Heaven.',730,650,null],
 'noble-castle':['upper','The Noble Castle','A luminous enclosure with seven walls and a green meadow for the ancient wise.',850,650,null],
 'circle-two':['upper','The Second Circle','Minos judges at the entrance to a lightless region swept by perpetual wind.',930,560,null],
 'circle-three':['upper','The Third Circle','Cold foul rain falls upon a muddy field guarded by Cerberus.',1060,500,null],
 'circle-four':['upper','The Fourth Circle','Two burdened crowds collide and reverse along the divided circle.',1140,400,null],
 'styx':['upper','The Marsh of Styx','Wrathful souls strike above the black marsh while the sullen lie beneath.',1020,300,null],
 'styx-tower':['upper','The Signal Tower','A tower above Styx answers distant flames before Phlegyas arrives.',880,340,null],
 'dis-gate':['upper','The Gate of Dis','Iron walls and fiery towers bar the route into lower Hell.',760,220,'lower'],
 'circle-six':['lower','The Sixth Circle','Open fiery tombs fill the cemetery immediately inside Dis.',190,800,null],
 'lower-hell-rim':['lower','The Rim of Lower Hell','A broken bank above the deeper circles where the travellers pause against the stench.',360,730,null],
 'circle-seven-rim':['lower','The Landslide','A shattered descent guarded by the Minotaur leads to the circle of violence.',500,650,null],
 'phlegethon':['lower','Phlegethon','A boiling river of blood patrolled by armed centaurs.',650,610,null],
 'suicide-wood':['lower','The Wood of the Suicides','A pathless thorn forest inhabited by Harpies and imprisoned voices.',790,510,null],
 'burning-sand':['lower','The Burning Sand','An arid plain receives an unending rain of fire.',930,420,null],
 'cataract':['lower','The Cataract','Phlegethon plunges from the burning plain into Malebolge.',1080,270,'malebolge'],
 'malebolge-overlook':['malebolge','The Rim of Malebolge','The eighth circle opens as a vast stone basin crossed by spoke-like bridges.',210,820,null],
 'bolgia-one':['malebolge','First Bolgia','Panders and seducers move in opposed files under the lashes of demons.',330,730,null],
 'bolgia-two':['malebolge','Second Bolgia','Flatterers lie in a ditch of corrupt filth.',430,670,null],
 'bolgia-three':['malebolge','Third Bolgia','Simoniacs are planted headfirst in fiery stone apertures.',520,620,null],
 'bolgia-four':['malebolge','Fourth Bolgia','Diviners walk with their faces twisted backward.',595,580,null],
 'bolgia-five':['malebolge','Fifth Bolgia','Boiling pitch conceals grafters under the hooks of the Malebranche.',655,545,null],
 'bolgia-six':['malebolge','Sixth Bolgia','Hypocrites circle under gilded cloaks of lead.',705,515,null],
 'broken-bridge':['malebolge','The Broken Bridges','Collapsed arches force a dangerous climb between the sixth and seventh trenches.',825,540,null],
 'bolgia-seven':['malebolge','Seventh Bolgia','Thieves and serpents exchange shapes in a stone-filled pit.',740,480,null],
 'bolgia-eight':['malebolge','Eighth Bolgia','Fraudulent counsellors move concealed inside individual flames.',760,440,null],
 'bolgia-nine':['malebolge','Ninth Bolgia','Sowers of division circle through repeated wounds.',770,395,null],
 'bolgia-ten':['malebolge','Tenth Bolgia','Falsifiers suffer disease, thirst, fever, and madness.',770,345,'cocytus'],
 'giants-well':['cocytus','The Giants’ Well','Ancient giants stand around the shaft between Malebolge and the frozen lake.',260,820,null],
 'cocytus':['cocytus','Cocytus','The frozen lake of the ninth circle spreads below the giants’ well.',410,720,null],
 'caina':['cocytus','Caina','Traitors to kindred bow their faces above the ice.',535,640,null],
 'antenora':['cocytus','Antenora','Traitors to country stand deeper in Cocytus.',630,575,null],
 'ptolomaea':['cocytus','Ptolomaea','Traitors to guests lie face upward while their tears freeze.',700,530,null],
 'judecca':['cocytus','Judecca','Traitors to benefactors are sealed wholly inside transparent ice.',745,500,null],
 'earth-centre':['cocytus','The Centre of Earth','Gravity reverses beside Lucifer’s body at the lowest point of the descent.',768,475,null],
 'hidden-passage':['cocytus','The Hidden Passage','A narrow stream and winding tunnel climb toward the stars of the other hemisphere.',1230,250,null],
 'rimini':['history','Rimini','The Adriatic city associated with Francesca’s memory of Paolo and the fatal reading.',960,570,null],
 'mantua-marsh':['history','The Mincio Marsh','The wetland below Lake Garda where Virgil places Manto’s settlement and Mantua’s origin.',720,700,null],
 'mediterranean':['history','The Mediterranean','The sea crossed by Ulysses after leaving Circe.',520,430,null],
 'western-ocean':['history','Beyond the Pillars','The Atlantic west of Gibraltar where Ulysses pursues the unknown sea.',160,380,null],
 'montefeltro-memory':['history','Montefeltro','The rugged Romagnol territory associated with Guido’s military life.',820,620,null],
 'lateran':['history','The Lateran','The papal court in Rome where Boniface demands fraudulent counsel.',760,400,null],
 'hunger-tower':['history','The Hunger Tower','The Pisan prison in which Ugolino remembers the sealed door and his children’s deaths.',650,520,null],
}
const locationMarkers=Object.entries(locDefs).map(([key,[map,name,description,x,y,linked]])=>({...stamp,id:id('loc',key),name,description,mapLayerId:id('map',map),linkedMapLayerId:linked?id('map',linked):null,x,y,iconType:'landmark',imageId:png('location',key,`art/locations/${key}.png`)?.id??null,tags:[],factionId:null}))

const firstStateByCharacter={}
for(const canto of reviewedCantos)for(const scene of canto)for(const [key,state] of Object.entries(scene.states))firstStateByCharacter[key]??=state
const initialNames={geryon:'The Monster of Fraud',nicholas:'The Buried Pope'}
const colors=['#6f473f','#87705a','#6a6478','#5a5662','#82574c','#79664b','#65494d','#8b7458','#4d5961','#745552','#8b6a42','#5c4750']
const characters=Object.entries(characterNames).map(([key,name],index)=>({...stamp,id:id('char',key),name:initialNames[key]??name,aliases:[],description:`At first appearance, ${firstStateByCharacter[key][0].toLowerCase()}${firstStateByCharacter[key].slice(1)}`,color:colors[index%colors.length],portraitImageId:png('character',key,`art/characters/${key}.png`)?.id??null,isAlive:key==='dante',birthDate:null,tags:[],nameChanges:[]}))

const itemDefs={
 cord:['Dante’s cord','A cord Dante once intended as a snare and gives Virgil to signal into the abyss.','rope'],
 oar:['Charon’s oar','The ferryman’s implement for steering and striking the delaying dead.','tool'],
 bow:['The centaurs’ bows','Collective bows and arrows carried by the patrol along Phlegethon.','weapon'],
 purse:['The heraldic purses','Collective purses whose emblems identify families among the usurers.','container'],
 hook:['The Malebranche hooks','Collective grappling hooks used to drag grafters from boiling pitch.','tool'],
 ship:['Ulysses’ ship','The vessel that carries Ulysses and his companions beyond the Pillars of Hercules.','vehicle'],
 florins:['Counterfeit florins','The false gold coins Master Adam made at Romena.','artifact'],
 horn:['Nimrod’s horn','The immense horn whose blast crosses the darkness above Cocytus.','instrument'],
}
const items=Object.entries(itemDefs).map(([key,[name,description,iconType]])=>({...stamp,id:id('item',key),name,description,iconType,imageId:png('item',key,`art/items/${key}.png`)?.id??null,tags:[],isCollective:['bow','purse','hook','florins'].includes(key)}))
const itemByTitle={
 'The Cord Cast Down':['cord'],'Charon and the Crossing':['oar'],'The Centaur Patrol':['bow'],'Nessus Guides the Ford':['bow'],'The Usurers':['purse'],
 'The Ten Malebranche':['hook'],'Hooks Around the Prisoner':['hook'],'Ciampolo Escapes':['hook'],'Ulysses Leaves Home':['ship'],'Beyond the Pillars':['ship'],
 'The Counterfeit Florins':['florins'],'The Horn in the Darkness':['horn'],'Nimrod':['horn'],
}

const timelineDefs={
 descent:['The Descent','The primary journey from the dark wood through Hell to the stars. Fractions place scenes within the traditional Good Friday to Easter-morning sequence.','#7d473d',0],
 intercession:['The Celestial Intercession','Virgil’s account of Beatrice descending to Limbo shortly before the journey begins.','#76688b',-0.25],
 'francesca-memory':['Francesca’s Memory','The fatal reading in Rimini, placed approximately in the conventional year of Francesca’s death, 1285.','#8c5f68',-5475],
 'mantua-history':['The Founding of Mantua','Virgil’s legendary account of Manto and Mantua, assigned an explicitly approximate ancient editorial position.','#67785e',-912500],
 'ulysses-voyage':['Ulysses’ Last Voyage','Ulysses’ narrated voyage beyond the Pillars, assigned to a broad legendary post-Trojan era rather than the descent.','#526a7b',-912500],
 'guido-memory':['Guido’s Last Counsel','Guido’s account of Pope Boniface’s demand and the logic at his death, placed approximately in 1298.','#7a6254',-730],
 'ugolino-memory':['Ugolino in the Tower','Ugolino’s imprisonment and death with the children, placed approximately in 1289.','#70605b',-4015],
}
const timelines=Object.entries(timelineDefs).map(([key,[name,description,color,dayOffset]])=>({...stamp,id:id('timeline',key),name,description,color,dayOffset}))

const chapters=[],events=[],sceneTexts=[],characterSnapshots=[],itemPlacements=[]
let sortOrder=0
const firstEventByChar={},lastTime=Object.fromEntries(Object.keys(timelineDefs).map(key=>[key,null]))
for(let ci=0;ci<cantos.length;ci++){
 const canto=cantos[ci],plan=cantoPlans[ci],points=reviewedBoundaries(canto),chapterId=id('canto',ci+1)
 chapters.push({...stamp,id:chapterId,timelineId:id('timeline','descent'),number:ci+1,title:`Canto ${canto.label}`,synopsis:`The complete Longfellow text of Canto ${canto.label}, divided at reviewed tercet boundaries.`,notes:'Dante’s authorial canto division.',wordGoal:countWords(canto.text)})
 for(let si=0;si<plan.length;si++){
  const [title,description,locKey,castString,tension]=plan[si],cast=castString?castString.split(' '):[],eventId=id('event',`${ci+1}-${si+1}`),text=canto.lines.slice(points[si],points[si+1]).join('\n'),reviewed=reviewedCantos[ci][si],timeline=reviewed.timeline,inWorldTime=sceneClock(ci+1,reviewed)
  const itemKeys=itemByTitle[title]??reviewed.items??[]
  const travelDays=lastTime[timeline]===null?0:Math.max(0,Math.floor(inWorldTime)-Math.floor(lastTime[timeline]));lastTime[timeline]=inWorldTime
  const thread=timeline==='descent'?'descent':timeline
  events.push({...stamp,id:eventId,chapterId,timelineId:id('timeline',timeline),title,description,locationMarkerId:id('loc',locKey),involvedCharacterIds:cast.map(key=>id('char',key)),mentionedCharacterIds:[],involvedItemIds:itemKeys.map(key=>id('item',key)),threadIds:[id('thread',thread)],motifIds:[id('motif',/word|speak|confess|account|prophe|names|asks|tells|reply|quarrel|rebuk/i.test(`${title} ${description}`)?'speech':/bridge|gate|river|road|climb|descent|passage|cross|path|shore|rim|slope|wood/i.test(`${title} ${locKey}`)?'passage':'body')],sortOrder:sortOrder++,travelDays,inWorldTime,tension,tags:[`Canto ${canto.label}, source lines ${points[si]+1}-${points[si+1]}`],structureBeat:null,status:'final',povCharacterId:cast.includes('dante')?id('char','dante'):cast[0]?id('char',cast[0]):null,isFlashback:timeline!=='descent'})
  sceneTexts.push({...stamp,id:id('text',`${ci+1}-${si+1}`),eventId,text,wordCount:countWords(text)})
  const location=locationMarkers.find(loc=>loc.id===id('loc',locKey));if(!location)throw Error(`Unknown location ${locKey}`)
  cast.forEach((key,index)=>{firstEventByChar[key]??=eventId;characterSnapshots.push({...stamp,id:id('snapshot',`${ci+1}-${si+1}-${key}`),characterId:id('char',key),eventId,isAlive:key==='dante',currentLocationMarkerId:id('loc',locKey),currentMapLayerId:location.mapLayerId,inventoryItemIds:[],inventoryNotes:'',travelModeId:null,sortKey:sortOrder+index/100,statusNotes:reviewed.states[key]})})
  itemKeys.forEach((key,index)=>itemPlacements.push({...stamp,id:id('placement',`${ci+1}-${si+1}-${key}`),itemId:id('item',key),eventId,locationMarkerId:id('loc',locKey),sortKey:index,notes:`Directly present in “${title}”.`}))
 }
}
if(normalize(sceneTexts.map(scene=>scene.text).join('\n\n'))!==normalize(verseText))throw Error('Generated scenes do not reconstruct the complete poem')
const first=title=>{const event=events.find(entry=>entry.title===title);if(!event)throw Error(`Unknown event: ${title}`);return event.id}
characters.find(character=>character.id===id('char','geryon')).nameChanges=[{eventId:first('Mounting Fraud'),name:'Geryon'}]
characters.find(character=>character.id===id('char','nicholas')).nameChanges=[{eventId:first('Nicholas Names the Succession'),name:'Pope Nicholas III'}]

const plotThreads=[
 ['descent','The Descent','Dante and Virgil move from the lost wood through the ordered depths toward the opposite hemisphere.'],
 ['intercession','Mercy Before the Journey','Beatrice’s descent to Limbo explains why Virgil comes to the lost traveller.'],
 ['francesca-memory','Francesca’s Memory','A remembered reading gives personal history to one encounter in the second circle.'],
 ['mantua-history','Mantua’s Legendary Origin','Virgil corrects a foundation story while the travellers cross the diviners’ trench.'],
 ['ulysses-voyage','Beyond the Known World','Ulysses recounts the purpose and last course of his final voyage.'],
 ['guido-memory','Counsel and Absolution','Guido recounts the counsel he gave under a promise he believed could excuse it.'],
 ['ugolino-memory','The Sealed Tower','Ugolino recounts the prison days that explain his hatred on the ice.'],
].map(([key,name,description])=>({...stamp,id:id('thread',key),name,description,color:'#7b5548',status:'complete',tags:[]}))
const motifs=[
 ['passage','Gates, Bridges, and Crossings','Thresholds make moral and physical descent visible through gates, ferries, rivers, bridges, cliffs, and the final hidden road.'],
 ['speech','Testimony and Name','The dead speak through confession, prophecy, defiance, evasion, and requests for remembrance.'],
 ['body','The Altered Body','Wind, mud, fire, wounds, disease, ice, and metamorphosis give each encounter a distinct bodily form.'],
].map(([key,name,description])=>({...stamp,id:id('motif',key),name,description,color:'#806858',tags:[]}))
const factionDefs={travellers:['The Travellers','Dante and Virgil moving under a commission Dante does not yet fully understand.'],guardians:['Infernal Guardians','Figures who police thresholds, circles, rivers, and trenches.'],malebranche:['The Malebranche','The hooked devils assigned to the boiling pitch of the fifth bolgia.'],florentines:['Florentine Dead','People of Florence encountered throughout the descent.']}
const factions=Object.entries(factionDefs).map(([key,[name,description]])=>({...stamp,id:id('faction',key),name,description,color:'#75594c',tags:[],coverImageId:null}))
const factionFor={dante:'travellers',virgil:'travellers',charon:'guardians',minos:'guardians',cerberus:'guardians',plutus:'guardians',phlegyas:'guardians',minotaur:'guardians',chiron:'guardians',nessus:'guardians',geryon:'guardians',malacoda:'malebranche',malebranche:'malebranche',ciacco:'florentines',filippo:'florentines',farinata:'florentines',cavalcante:'florentines',brunetto:'florentines',vanni:'florentines',bocca:'florentines'}
const factionMemberships=Object.entries(factionFor).map(([character,faction],index)=>({...stamp,id:id('membership',index+1),factionId:id('faction',faction),characterId:id('char',character),role:faction==='travellers'?'Traveller':faction==='malebranche'?'Pitch warden':faction==='florentines'?'Florentine shade':'Threshold guardian',startEventId:firstEventByChar[character],endEventId:null,notes:''}))
const relationships=[
 ['dante-virgil','dante','virgil','Traveller and guide','positive','Dante accepts Virgil as the guide who can lead him by another road.','The Other Road',9],
 ['virgil-beatrice','virgil','beatrice','Commissioned guide and intercessor','positive','Beatrice entrusts the endangered traveller to Virgil’s speech and care.','Beatrice Descends to Limbo',8],
 ['francesca-paolo','francesca','paolo','Bound lovers','positive','The two move together in the wind and answer Dante’s call as one pair.','The Lovers in the Wind',8],
 ['dante-brunetto','dante','brunetto','Former pupil and teacher','positive','Dante recognizes a former teacher and addresses him with enduring respect.','Brunetto Latini',7],
 ['ulysses-companions','ulysses','companions','Commander and aging crew','positive','The companions share Ulysses’ final voyage beyond the known sea.','Ulysses Leaves Home',7],
 ['ugolino-ruggieri','ugolino','ruggieri','Victim and enemy','negative','Ugolino’s hatred is first visible through the punishment he inflicts on Ruggieri.','One Head Gnaws Another',1],
].map(([key,a,b,label,sentiment,description,start,strength])=>({...stamp,id:id('relationship',key),characterAId:id('char',a),characterBId:id('char',b),label,sentiment,description,strength,isBidirectional:true,startEventId:first(start)}))
const relationshipSnapshots=relationships.map((relationship,index)=>({...stamp,id:id('relationship-state',`initial-${index}`),relationshipId:relationship.id,eventId:relationship.startEventId,label:relationship.label,sentiment:relationship.sentiment,strength:relationship.strength,description:relationship.description,isActive:true,sortKey:index}))
for(const [title,label,sentiment,strength,description] of [
 ['Evening Doubt','Doubt tests trust','neutral',5,'Dante questions both his worth and the road Virgil proposes.'],
 ['Three Blessed Women','Courage restored','positive',9,'Virgil’s account of celestial concern restores Dante’s willingness to follow.'],
 ['Virgil Repulsed','Fear of abandonment','neutral',5,'The barred gate makes Dante fear that his guide may have to leave him.'],
 ['Malacoda’s Lie','Guidance under deception','neutral',6,'Virgil recognizes that another guide deliberately sent them toward a broken route.'],
 ['Dante’s Shame','Correction accepted','positive',9,'Virgil’s rebuke produces honest shame and immediate reconciliation.'],
 ['To Rebehold the Stars','The guidance fulfilled','positive',10,'Virgil leads Dante out from the hidden passage beneath the stars.'],
])relationshipSnapshots.push({...stamp,id:id('relationship-state',title.toLowerCase().replaceAll(' ','-')),relationshipId:id('relationship','dante-virgil'),eventId:first(title),label,sentiment,strength,description,isActive:true,sortKey:relationshipSnapshots.length})
const goals=[
 ['dante','Recover the lost path by following the road now opened to him','The Other Road','To Rebehold the Stars'],
 ['virgil','Guide Dante safely through the realm entrusted to him','A Voice in the Waste','To Rebehold the Stars'],
 ['beatrice','Move Virgil to rescue the endangered traveller','Beatrice Descends to Limbo','Beatrice Descends to Limbo'],
 ['charon','Carry the dead assigned to cross Acheron','Charon and the Crossing','Charon and the Crossing'],
 ['ulysses','Pursue knowledge beyond the known bounds of human travel','Ulysses Leaves Home','Beyond the Pillars'],
 ['ugolino','Make the cause of his hatred known among the living','Ugolino Raises His Mouth','Pisa Condemned'],
].map(([char,text,start,end],index)=>({...stamp,id:id('goal',index+1),characterId:id('char',char),type:'primary',text,startEventId:first(start),endEventId:first(end)}))
const facts=[
 ['virgil','The shade is Virgil','The shade in the wood identifies himself as the Roman poet Virgil.','A Voice in the Waste'],
 ['commission','Virgil was sent to Dante','Virgil explains that mercy moved Beatrice to seek Dante’s rescue.','Three Blessed Women'],
 ['lower-order','Lower Hell follows an articulated order','Virgil distinguishes violence, fraud, and treachery before the deeper descent.','Violence and Fraud'],
 ['futuresight','The dead see distant events differently','Farinata explains that distant events are visible while present events become obscure.','What the Damned Can Know'],
 ['geryon','The monster is named Geryon','Virgil names the creature carrying them down to Malebolge.','Mounting Fraud'],
 ['ugolino','Ugolino’s hatred has a prison history','The count identifies himself and begins the tower account behind the frozen violence.','Ugolino Raises His Mouth'],
 ['centre','The travellers cross Earth’s centre','Virgil explains the reversal of gravity and the changed time after passing the centre.','Past the Centre'],
].map(([key,title,description,event])=>({...stamp,id:id('fact',key),title,description,readerLearnsAtEventId:first(event),originEventId:first(event),tags:[]}))
const loreCategories=[['edition','Edition'],['journey','Journey'],['form','Poetic form']].map(([key,name],index)=>({...stamp,id:id('lore-category',key),name,description:'Reader-facing context grounded in Dante’s poem and the Longfellow edition.',color:'#745c50',sortOrder:index}))
const lorePages=[
 ['source','edition','Text, translation, and rights',`This reading edition preserves all ${cantos.length} cantos, ${verseLineCount.toLocaleString()} verse lines, and ${countWords(verseText).toLocaleString()} words from Project Gutenberg eBook #1001, Henry Wadsworth Longfellow’s English translation of Inferno. Dante died in 1321 and Longfellow in 1882; Project Gutenberg marks the edition public domain in the United States. Downloaded source SHA-256: ${sourceSha256}.`,'Lost in the Dark Wood'],
 ['structure','form','Thirty-four cantos','Inferno is the first canticle of the Divine Comedy and contains thirty-four cantos. The canto headings here preserve Dante’s numbered structure; scene titles are reading aids that appear only with their passages.','Lost in the Dark Wood'],
 ['terza','form','Terza rima in translation','Dante’s Italian poem is built in interlocking tercets. Longfellow preserves the three-line grouping and much of the syntax while using unrhymed English verse. This edition preserves every source verse line.','Lost in the Dark Wood'],
 ['geography','journey','The shape of Hell','The maps follow the poem’s immense funnel beneath the inhabited hemisphere: upper circles above Dis, violence below the city, ten trenches of fraud, and frozen Cocytus at Earth’s centre. They are interpretive reading maps rather than claims of measurable scale.','The Gate of Hell'],
 ['chronology','journey','Journey and remembered histories','The descent follows the traditional Good Friday to Easter-morning sequence in 1300. Fractions locate ordered scenes within those days and do not claim measured travel duration. Beatrice’s intercession and the narrated histories of Francesca, Mantua, Ulysses, Guido, and Ugolino use separate timelines so memory is not mistaken for action occurring during the descent. Ancient and medieval offsets are approximate editorial positions documented by each timeline.','Evening Doubt'],
 ['art','edition','Illustration provenance','The world, portraits, objects, places, and topographic maps are original OpenAI ImageGen illustrations made for this edition. They use a mature late-medieval manuscript and engraved relief-map language without imitating any single historical illustrator.','Lost in the Dark Wood'],
].map(([key,cat,title,body,event])=>({...stamp,id:id('lore',key),categoryId:id('lore-category',cat),title,body,visibleFromEventId:first(event),tags:[],coverImageId:null,linkedEntityIds:[]}))
const routes=[
 ['upper-descent','upper','From the gate to Dis',[[160,850],[310,780],[470,720],[610,690],[730,650],[930,560],[1060,500],[1140,400],[1020,300],[760,220]]],
 ['lower-descent','lower','Through Dis and violence',[[190,800],[360,730],[500,650],[650,610],[790,510],[930,420],[1080,270]]],
 ['malebolge-descent','malebolge','Across the ten bolgias',[[210,820],[330,730],[430,670],[520,620],[595,580],[655,545],[705,515],[825,540],[740,480],[760,440],[770,395],[770,345]]],
 ['cocytus-exit','cocytus','Across Cocytus and upward',[[260,820],[410,720],[535,640],[630,575],[700,530],[745,500],[768,475],[1230,250]]],
 ['ulysses-voyage','history','Ulysses’ western voyage',[[520,430],[160,380]]],
].map(([key,map,name,points])=>({...stamp,id:id('route',key),mapLayerId:id('map',map),name,routeType:key==='ulysses-voyage'?'sea':'road',waypoints:points.map(([x,y])=>({x,y})),color:'#b08a62',notes:'Interpretive route derived from the poem’s ordered places.'}))
const worldImage=png('world','cover','art/world.png')
const out={version:18,type:'world',exportedAt:now,world:{...stamp,id:W,name:'Inferno',description:'A living traveller follows Virgil through the ordered depths beneath the world, where each encounter tests what can be understood, pitied, remembered, and changed.',coverImageId:worldImage?.id??null,theme:'theme-fantasy',readingMode:true,continuityStaleThreshold:5,wordTarget:countWords(verseText),calendar:{startYear:1300,yearSuffix:'',months:[{name:'Holy Week',days:3}]}},chapters,events,sceneTexts,timelines,mapLayers,locationMarkers,characters,items,characterSnapshots,itemPlacements,blobs,relationships,relationshipSnapshots,plotThreads,motifs,loreCategories,lorePages,knowledgeFacts:facts,knowledgeReveals:[],factions,factionMemberships,characterGoals:goals,mapRoutes:routes,characterMovements:[],continuitySuppressions:[],crossTimelineArtifacts:[],factionRelationships:[],itemSnapshots:[],locationSnapshots:[],mapAnnotations:[],mapRegionSnapshots:[],mapRegions:[],sceneRevisions:[],timelineRelationships:[],travelModes:[],writingLogs:[]}
const dest=new URL('../../library/inferno.pwk',import.meta.url);fs.writeFileSync(dest,JSON.stringify(out))
const bytes=fs.readFileSync(dest);console.log(JSON.stringify({chapters:chapters.length,events:events.length,words:countWords(verseText),lines:verseLineCount,timelines:timelines.length,characters:characters.length,snapshots:characterSnapshots.length,locations:locationMarkers.length,maps:mapLayers.length,items:items.length,images:blobs.length,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')},null,2))
