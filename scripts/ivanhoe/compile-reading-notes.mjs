import assert from 'node:assert/strict'
import {sourceBytes} from './source-text.mjs'
import {exactSourceEvent} from './source-anchors.mjs'
import {witnessedScene} from './compile-supporting.mjs'

// Ordinary thematic witnesses describe a completed scene. Sensitive reading
// notes instead require a separately audited, exact disclosure boundary.
export const themes=[
  ['thread','service','Service and loyalty','Gurth and Wamba serve in Cedric’s household; their choices test the claims of service.',['I.12','II.35','IV.12','VI.23','X.15','XIX.29','XXV.65','XXVI.47','XXXII.20','XLIV.51']],
  ['thread','ashby','The Ashby contest','The public contests bring competitors and spectators together.',['VII.3','VII.17','VII.30','VIII.40','VIII.50','IX.18','XII.49','XIII.38','XIII.69']],
  ['thread','defiance','The castle challenge','A written defiance demands the captives’ release.',['XXV.18','XXV.42','XXV.65','XXVI.47','XXVII.59','XXX.31','XXXI.92']],
  ['thread','rebecca','Rebecca’s peril','Rebecca faces coercion while confined away from help.',['XXIV.3','XXIV.30','XXXI.80','XXXIII.50','XXXV.55','XXXVI.53','XXXVII.24','XXXVII.50','XXXVII.55','XXXVIII.35','XXXIX.29','XLIII.78','XLIII.84','XLIV.74']],
  ['thread','king','The absent king','The king’s absence leaves room for competing claims to power.',['I.4','XIII.23','XV.3','XXXIV.22','XL.118','XLIV.25']],
  ['motif','language','Language and rank','Speech and forms of address mark divisions of rank and community.',['I.4','I.12','III.11','IV.7','V.20','VII.30','XXV.48','XXVII.14','XLIV.51']],
  ['motif','hospitality','Hospitality','Requests for shelter, food and welcome test hosts and guests.',['II.14','III.21','V.0','V.17','XVI.12','XVI.25','XVI.46','XVII.12']],
  ['motif','pledges','Pledges and tokens','Objects give material form to promises, security and honour.',['II.48','V.48','V.54','X.60','XII.47','XIII.69','XXV.18','XXXII.56','XXXV.49','XXXVII.55','XLIV.71']],
  ['motif','recognition','Concealment and recognition','Covered faces, clothing and recognition shape what people can know about one another.',['VIII.40','X.3','X.15','XII.49','XV.6','XXIV.24','XXIV.30','XXV.65','XXVI.47','XXXIV.22','XL.118','XLIII.73']],
  ['motif','medicine','Medicine and belief','The treatment of illness brings skill, trust and belief into contact.',['XXVIII.15','XXVIII.17','XXXV.55','XXXVII.24','XXXVII.26','XXXVII.28','XXXVII.34','XLIV.74']],
]
export const readingNotes=[
  ['collars','Two neck collars','I.10',false,['character:gurth','character:wamba','item:gurth-collar','item:wamba-collar'],'Gurth’s soldered brass collar identifies him as Cedric’s born thrall. Wamba wears a silver collar bearing the same claim of ownership. Their different dress and occupations do not remove that shared condition.\n\nSource: Chapter I.'],
  ['pledges','Two pledges, two custodians','V.54',false,['character:palmer','character:brian','character:aymer','character:ambrose','item:palmer-reliquary','item:brian-chain'],'The Palmer offers an ivory reliquary, said to contain a fragment of the cross. Brian lays down a gold chain. After the proposed place of safekeeping is discussed, Aymer gives the reliquary to Brother Ambrose and puts the chain in his own pouch. An intended destination and an actual handover are different things.\n\nSource: Chapter V.'],
  ['clothes','An exchange of clothes','XXVI.47',false,['character:wamba','character:cedric','item:frock','item:cowl','item:friar-cord','item:cedric-cloak','item:cedric-girdle'],'Wamba and Cedric complete an exchange of garments. Cedric takes the borrowed clerical disguise; Wamba takes Cedric’s clothes and remains in his place. Clothing supplies a practical means of mistaken recognition; it does not make either man a member of a religious order.\n\nSource: Chapter XXVI.'],
  ['warning','A warning read and destroyed','XXXVII.50',true,['character:rebecca'],'Rebecca reads the words “Demand a Champion!” in the Arabian character and destroys the slip unobserved. At this point the instruction has reached her, but its writer has not identified himself to her. The paper’s destruction and the survival of its message are separate facts.\n\nSource: Chapter XXXVII.'],
  ['gage','The withheld gage','XXXVIII.25',false,['character:albert','character:beaumanoir','character:rebecca','character:brian'],'Albert Malvoisin answers on Brian’s behalf while slipping Rebecca’s glove under his own mantle. The scene shows concealment by the intermediary, rather than delivery of the challenge token to the man whom he says will fight.\n\nSource: Chapter XXXVIII.'],
  ['author','The warning’s author','XXXIX.29',true,['character:rebecca','character:brian'],'Brian claims authorship of the scroll that told Rebecca to demand a champion. This later disclosure explains the instruction she has already read and destroyed; it does not restore the physical paper. His claim also does not promise the arrival of another champion.\n\nSource: Chapter XXXIX.'],
  ['recognition','A private disclosure','XXXIV.22',true,['character:debracy','character:john','character:richard','character:blackknight'],'De Bracy tells Prince John in a low voice that Richard is in England and that he has spoken with him. The black-armoured knight’s identity is being disclosed in a private conversation. Richard is the subject of the report, not a person physically present in this room.\n\nSource: Chapter XXXIV.'],
  ['return','A report contradicted','XLII.38',true,['character:athelstane','character:cedric'],'Athelstane enters alive in burial garments while Cedric is speaking of him as dead. His appearance contradicts the death report. The startling comparison with a spectre describes the observers’ shock; it need not be accepted as a literal account of resurrection.\n\nSource: Chapter XLII.'],
  ['casket','The farewell gift','XLIV.71',true,['character:rebecca','character:rowena','item:silver-casket'],'Only when Rowena opens the casket are the diamond necklace and ear-jewels disclosed. Rowena protests and tenders the gift back; Rebecca urges her to keep it. The passage does not supply a separate spoken declaration of acceptance by Rowena.\n\nSource: Chapter XLIV.'],
]

export function compileReadingNotes(stamp,world){
  const evidence=[],ids=new Set(world.events.map(e=>e.id))
  const event=(reference,strict=false)=>{const id=strict?exactSourceEvent(reference):witnessedScene(reference);assert.ok(ids.has(id),`Reading note event ${reference}`);return id}
  for(const e of world.events){e.threadIds=[];e.motifIds=[]}
  world.plotThreads=[];world.motifs=[]
  for(const [kind,key,name,description,references] of themes){
    const id=`ivanhoe-${kind}-${key}`,events=[...new Set(references.map(ref=>event(ref)))]
    world[kind==='thread'?'plotThreads':'motifs'].push({...stamp,id,name,description,color:'#795b37',...(kind==='thread'?{resolvedEventId:events.at(-1)}:{})})
    for(const eventId of events)world.events.find(e=>e.id===eventId)[kind==='thread'?'threadIds':'motifIds'].push(id)
    evidence.push({kind,key,references,events})
  }
  world.loreCategories=[['edition','Text and illustrations'],['notes','Reading notes']].map(([key,name],sortOrder)=>({id:`ivanhoe-lore-category-${key}`,worldId:stamp.worldId,name,color:'#795b37',sortOrder}))
  const first=world.events[0].id
  const raw=sourceBytes.toString('utf8').replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n')
  const start='*** START OF THE PROJECT GUTENBERG EBOOK IVANHOE: A ROMANCE ***',end='*** END OF THE PROJECT GUTENBERG EBOOK IVANHOE: A ROMANCE ***'
  const notice=raw.slice(0,raw.indexOf(start)).trim(),licence=raw.slice(raw.indexOf(end)+end.length).trim()
  const page=(key,title,body,visibleFromEventId,linkedEntityIds=[],category='notes')=>({...stamp,id:`ivanhoe-lore-${key}`,categoryId:`ivanhoe-lore-category-${category}`,title,body,tags:[],coverImageId:null,linkedEntityIds,visibleFromEventId})
  world.lorePages=[
    page('colophon','Text, maps, and illustrations','This reading edition presents Walter Scott’s English original, Ivanhoe: A Romance (first published 1819, with an 1820 title date). No translation is used. The text follows Project Gutenberg eBook 82, updated 4 June 2021, credited to John P. Roberts, Jr. and David Widger.\n\nSource: https://www.gutenberg.org/cache/epub/82/pg82.txt\n\nThe original work is in the public domain in the United States. Project Gutenberg’s distribution notice and licence are reproduced on the accompanying source-notice page. Readers elsewhere should check their local law.\n\nThe original Roman-numbered chapter headings, introductory material and notes are retained. Scene captions and these reading notes are editorial additions.\n\nThe illustrations were generated for this edition. Unspecified faces, colours, furnishings and minor visual details are artistic interpretations. Maps of fictional sites are reconstructions from Scott’s descriptions, not measured archaeological plans. The regional relief uses public-domain NOAA ETOPO1 and Natural Earth data. A place whose position is not established by the text may remain unplaced.',first,[],'edition'),
    page('source-notice','Source notice and licence',`${notice}\n\n${licence}`,first,[],'edition'),
    page('clock','Reading order and the editorial clock','The scenes follow the order of Scott’s text, including its returns to earlier events. A retrospective passage is marked as such; its map and character states follow that earlier passage. Several castle chapters follow parallel conversations. Moving between these groups can move the editorial clock backward without undoing what the reader has learned.\n\nThe dates are an editorial reconstruction. The opening evening is placed on 1 June 1194, using Julian month lengths. The year follows the novel’s setting, identified by the University of Edinburgh’s Walter Scott Archive: https://www.walterscott.lib.ed.ac.uk/works/novels/ivanhoe.html\n\nScott supplies summer mornings and relative intervals rather than a continuous calendar. The chosen June opening, clock times, and otherwise unstated intervals are approximate editorial choices, not dates stated by Scott or a verified historical itinerary. A prediction, threat or proposed delay is not treated as time that has already elapsed.\n\nThe introductory material and notes have presentation dates beside the narrative; those dates do not describe when the author wrote them. Their original dates, where given, remain in the text.',first,[],'edition'),
  ]
  const entityIds=new Set([...world.characters,...world.items,...world.locationMarkers].map(e=>e.id))
  for(const [key,title,reference,strict,links,body] of readingNotes){
    const linked=links.map(link=>`ivanhoe-${link.replace(':','-')}`)
    for(const id of linked)assert.ok(entityIds.has(id),`Reading note linked entity ${id}`)
    const gate=event(reference,strict)
    world.lorePages.push(page(key,title,body,gate,linked))
    evidence.push({kind:'lore',key,reference,strict,event:gate,linkedEntityIds:linked})
  }
  return evidence
}
