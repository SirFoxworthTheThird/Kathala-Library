// Source-grounded companion entries. These are editorial descriptions of
// affiliations, intentions and recurring patterns, not extra manuscript prose.
export const factionPlans=[
 {key:'patron-minette',name:'Patron-Minette',color:'#635a66',description:'A criminal association arranges ambushes and supplies accomplices for profitable schemes in the Seine department. Four distinct men direct its work; the larger network includes other named associates. Its shared disguises and aliases do not make it one supernatural individual.',
  members:[
   ...['babet','gueulemer','claquesous','montparnasse'].map(character=>[character,200,'start','One of the four leaders','The account identifies four separate men combining their resources and planning.']),
   ['panchaud',200,5,'Named associate','The source roster gives Panchaud, Printanier and Bigrenaille as names of the same man.'],
   ['brujon',200,5,'Named associate','Brujon appears in the source roster; the reference to a dynasty does not identify every generation as this individual.'],
   ['boulatruelle',200,5,'Named associate','The roster explicitly identifies the road-mender already introduced. Earlier village suspicions alone did not establish this affiliation.'],
  ]},
 {key:'friends-abc',name:'Friends of the A B C',color:'#79554e',description:'A small republican association brings students and a workingman into political discussion and practical organization. Its members differ in belief, temperament and confidence.',
  members:[
   ['enjolras',176,12,'Political leader','Directs the association’s political purpose.'],
   ['combeferre',176,12,'Companion and thinker','Balances revolutionary commitment with learning and humane argument.'],
   ['jean-prouvaire',176,15,'Poet','Belongs to the group while cultivating poetry and gentleness.'],
   ['feuilly',176,15,'Workingman','Brings the experience of a fan-maker and an interest in oppressed peoples.'],
   ['courfeyrac',176,17,'Companion and organizer','Forms the sociable centre connecting the group’s different temperaments.'],
   ['bahorel',176,17,'Companion','Brings combative energy and resistance to settled authority.'],
   ['bossuet',176,28,'Companion','Combines recurring ill fortune with good humor.'],
   ['joly',176,28,'Medical student','Joins the friends while retaining his preoccupation with health.'],
   ['grantaire',176,41,'Skeptical companion','Is tolerated among believers despite his skepticism; attachment to Enjolras does not make his opinions identical to theirs.'],
  ]},
 {key:'petit-picpus',name:'The Petit-Picpus community',color:'#706e5e',description:'The enclosed religious house combines a convent, a school and the labor needed to maintain its garden. Religious authority, paid service and a pupil’s place are distinct roles.',
  members:[
   ['fauchelevent',119,'start','Gardener','Already works in the garden when the house and its rules are described.'],
   ['mother-innocente',138,69,'Prioress','Receives the gardener in the reserved parlor and directs the house’s affairs.'],
   ['valjean',145,8,'Assistant gardener under a cover name','Is admitted as the gardener’s supposed brother; this is an accepted cover story, not a second biological identity.'],
   ['cosette',145,8,'Pupil','Is admitted to the school while remaining attached to her guardian.'],
  ]},
 {key:'police-service',name:'Police authority',color:'#586776',description:'Officials investigate, pursue and detain under public authority. This groups the policing role across the narrated years without claiming that every office belongs to one unchanged administrative corps.',
  members:[
   ['javert',44,'start','Inspector','Serves as an inspector in the provincial account and later in Paris.'],
   ['chatelet-police-sergeant',341,59,'Post sergeant','Receives the visiting inspector at the Châtelet post.'],
  ]},
]

// key, character, type, text, first cut, final cut (or null).
export const goalPlans=[
 ['a-night-under-cover','valjean','want','Find food and a place to sleep without being driven away.',[15,'start'],[17,'start']],
 ['welcome-the-stranger','myriel','want','Offer the stranger food, shelter and ordinary human respect.',[17,'start'],[26,53]],
 ['live-after-the-charge','valjean','need','Find a way to live that is not governed by the bitterness of punishment.',[27,65],[364,112]],
 ['pay-for-care','fantine','want','Keep her child sheltered and fed by sending the demanded payments.',[37,51],[69,33]],
 ['the-water-errand','cosette','want','Bring back the water demanded at the inn.',[95,21],[99,68]],
 ['keep-the-child-safe','valjean','want','Keep the child in his care safe from cruelty and pursuit.',[101,'start'],[364,112]],
 ['fear-separation','valjean','fear','Avoid losing the affection that has become the centre of his life.',[239,'start'],[364,'start']],
 ['understand-the-father','marius','want','Learn who his father was beyond the account supplied by his grandfather.',[173,'start'],[175,30]],
 ['find-the-address','marius','want','Find the young woman whose disappearance has interrupted his visits to the gardens.',[196,32],[232,23]],
 ['bring-him-to-the-garden','eponine','want','Keep her promise to show Marius the address he has been seeking.',[232,23],[248,'start']],
 ['marriage-permission','marius','want','Persuade his grandfather, during this visit, to consent to the marriage he wants.',[262,25],[262,121]],
 ['a-price-for-the-hostage','thenardier','want','Extract money through threats against his captive and the child.',[220,107],[221,48]],
 ['law-as-the-whole-man','javert','flaw','Treat legal categories as a complete judgment of a person.',[44,7],[341,28]],
 ['a-divided-duty','javert','fear','Face the possibility that obedience to the law and a just response to mercy cannot be made identical.',[341,10],[341,78]],
 ['organize-the-rising','enjolras','want','Turn political conviction into organized action with the companions he trusts.',[228,'start'],[321,23]],
 ['return-to-the-guardian','marius','want','Reach the man he now knows carried him away from the fighting.',[363,189],[364,'start']],
 ['explain-the-fortune','valjean','want','Leave an explanation of the money so that its honest origin can be understood.',[362,14],[364,32]],
]

export const threadPlans=[
 {key:'mercy-law',name:'Mercy and the law',color:'#826c4f',description:'Acts of hospitality, judgment and mercy repeatedly challenge the assumption that punishment settles a person’s worth.',
  points:[[4,23],[17,'start'],[26,28],[27,65],[52,40],[57,41],[65,'start'],[69,'start'],[214,'start'],[317,14],[337,15],[341,28],[354,42],[364,32]],resolved:[364,32]},
 {key:'care-kinship',name:'Care and kinship',color:'#997064',description:'Paid care, obligation and chosen affection make family something that must be enacted rather than merely named.',
  points:[[20,1],[37,51],[39,'start'],[49,14],[52,73],[69,33],[97,20],[100,149],[102,58],[105,'start'],[145,8],[241,8],[249,'start'],[314,19],[345,'start'],[354,168],[356,30],[358,40],[364,'start'],[364,112]],resolved:[364,112]},
 {key:'name-past',name:'A name and a past',color:'#6b7780',description:'Names, documents, recognition and concealment determine what one person believes about another.',
  points:[[15,49],[40,'start'],[54,29],[57,'start'],[65,11],[89,60],[103,'start'],[117,17],[145,8],[204,'start'],[220,21],[221,48],[337,15],[354,42],[363,132],[363,189]],resolved:[363,189]},
 {key:'fathers-account',name:'Learning a father',color:'#72816b',description:'A son’s inherited loyalties are tested by testimony, history, family quarrels and a debt whose meaning remains uncertain.',
  points:[[171,'start'],[172,'start'],[173,'start'],[175,30],[183,'start'],[214,'start'],[220,47],[344,13],[363,91],[363,189]],resolved:[363,189]},
 {key:'love-separation',name:'Love and separation',color:'#926978',description:'Recognition and mutual affection develop amid secrecy, unequal power and threatened separation.',
  points:[[188,'start'],[189,'start'],[196,32],[232,23],[245,'start'],[246,'start'],[248,21],[256,2],[259,21],[261,'start'],[262,117],[264,8],[293,75],[294,11],[343,4],[344,13],[345,'start'],[350,'start'],[354,168],[358,40],[364,'start']],resolved:[364,'start']},
 {key:'republican-company',name:'Republican commitment',color:'#86615b',description:'Political discussion becomes collective action, placing conviction, friendship and responsibility to others under pressure.',
  points:[[176,'start'],[179,'start'],[228,'start'],[265,15],[268,4],[278,56],[278,86],[283,'start'],[284,'start'],[288,17],[291,13],[292,20],[302,22],[313,38],[317,14],[319,26],[321,23],[321,31]],resolved:[321,31]},
]

export const motifPlans=[
 {key:'light',name:'Light and darkness',color:'#a18b60',description:'Lamps, windows, night travel and moral illumination repeatedly join physical sight to uncertain judgment.',points:[[15,85],[19,'start'],[24,'start'],[26,53],[97,'start'],[113,4],[115,'start'],[189,'start'],[278,69],[308,'start'],[337,'start'],[361,'start']]},
 {key:'silver',name:'Silver and obligation',color:'#8c9495',description:'Objects of value can be stolen, given, kept or bequeathed; their moral meaning depends on the act around them.',points:[[24,'start'],[25,'start'],[26,28],[57,88],[362,'start'],[364,112]]},
 {key:'names',name:'Names and documents',color:'#79818d',description:'Passports, letters, assumed names and public declarations can imprison a person in a category or open a different understanding.',points:[[17,'start'],[54,29],[65,'start'],[102,17],[145,8],[173,'start'],[202,'start'],[204,'start'],[220,258],[294,11],[341,62],[354,42],[363,160]]},
 {key:'thresholds',name:'Doors and thresholds',color:'#857662',description:'Doors, gates and walls distinguish exclusion from welcome, confinement from refuge, and intimacy from distance.',points:[[15,78],[15,127],[17,'start'],[113,22],[119,'start'],[145,4],[196,6],[248,'start'],[259,21],[335,'start'],[356,'start'],[358,40],[362,15],[364,'start']]},
 {key:'hunger',name:'Hunger and small necessities',color:'#8e7b61',description:'Bread, water, fuel, small coins and ordinary meals expose the distance between what is available and what a person needs.',points:[[20,1],[20,7],[49,'start'],[95,21],[97,20],[182,'start'],[231,'start'],[242,'start'],[250,'start'],[265,3],[314,19],[361,1]]},
 {key:'gardens',name:'Gardens and cultivation',color:'#74856c',description:'Cultivated ground offers work, refuge, reflection and encounters; its apparent peace does not remove the pressures beyond its walls.',points:[[6,18],[117,17],[126,'start'],[145,43],[169,'start'],[188,'start'],[231,'start'],[232,5],[235,'start'],[248,21],[256,2],[314,19],[358,3]]},
]

export function addStoryFeatures(world,{stamp,id,cid,eventAt,orderOf}){
 for(const faction of factionPlans){
  world.factions.push({...stamp,id:id('faction',faction.key),name:faction.name,description:faction.description,color:faction.color,coverImageId:null,tags:[]})
  for(const[character,chapter,at,role,notes]of faction.members)world.factionMemberships.push({...stamp,id:id('membership',`${faction.key}-${character}`),
   factionId:id('faction',faction.key),characterId:cid(character),role,notes,startEventId:eventAt(chapter,at),endEventId:null})
 }
 for(const[key,character,type,text,first,last]of goalPlans){
  const startEventId=eventAt(...first),endEventId=last?eventAt(...last):null
  if(endEventId&&orderOf(endEventId)<orderOf(startEventId))throw Error(`Reversed goal interval: ${key}`)
  world.characterGoals.push({...stamp,id:id('goal',key),characterId:cid(character),type,text,startEventId,endEventId})
 }
 const eventById=new Map(world.events.map(event=>[event.id,event]))
 for(const thread of threadPlans){
  const threadId=id('thread',thread.key)
  world.plotThreads.push({...stamp,id:threadId,name:thread.name,description:thread.description,color:thread.color,resolvedEventId:eventAt(...thread.resolved)})
  for(const point of thread.points)eventById.get(eventAt(...point)).threadIds.push(threadId)
 }
 for(const motif of motifPlans){
  const motifId=id('motif',motif.key)
  world.motifs.push({...stamp,id:motifId,name:motif.name,description:motif.description,color:motif.color})
  for(const point of motif.points)eventById.get(eventAt(...point)).motifIds.push(motifId)
 }
}
