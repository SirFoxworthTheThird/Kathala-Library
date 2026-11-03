import assert from 'node:assert/strict'
import {relationships,goals,factions} from './feature-ledger.mjs'
import {characters} from './character-ledger.mjs'
import {reviewedChapters} from './scene-review.mjs'
import {sourcePoint} from './source-anchors.mjs'
import {cutKey} from './scene-ranges.mjs'

// These records describe the end of a whole reading scene, as direct states do.
// The source witness must lie inside that scene. Identity/name/knowledge gates
// retain their separate stricter exact-disclosure-boundary checks.
export function witnessedScene(reference){
  const point=sourcePoint(reference)
  const scene=reviewedChapters.find(c=>c.chapter===point.chapter)?.scenes.find(s=>s.from<=point.paragraph&&s.to>point.paragraph)
  assert.ok(scene,`Source witness has a scene: ${reference}`)
  // A paragraph with internal cuts needs an explicit phase; never guess which
  // transfer, disclosure or departure is meant by its paragraph number.
  assert.ok(!reviewedChapters.find(c=>c.chapter===point.chapter).scenes.some(s=>s.from===point.paragraph&&s.fromOffset),`Internal paragraph phase required: ${reference}`)
  return `ivanhoe-source-${point.section}-${cutKey(scene)}`
}
const relationAnchors={
  'debracy-rowena':'XXIII.4',
  // The masked victor is not named by this relationship before his unhelmeting.
  'ivanhoe-rowena':'XII.49',
}
const changeAnchors={
  'blackknight-hermit:0':'XVII.12',
  'blackknight-hermit:1':'XX.49',
}
const goalAnchors={
  'blackknight:3':{start:'XX.49',end:'XXXI.92'},
  'locksley:4':{start:'XIX.42',end:'XXXI.92'},
  'debracy:5':{start:'XV.12',end:'XXIII.31'},
}
const memberships=[
  ['rotherwood','gurth','Household service','I.9'],
  ['rotherwood','wamba','Jester','I.10'],
  ['rotherwood','cedric','Head of the household','III.7'],
  ['rotherwood','rowena','Ward','II.46'],
  ['rotherwood','oswald','Household officer','III.11'],
  ['rotherwood','elgitha','Handmaid','III.11'],
  ['rotherwood','hundebert','Major-domo','III.22'],
  ['rotherwood','rotherwoodwarder','Warder','III.21'],
  ['rotherwood','anwold','Servant','VI.3'],
  ['rotherwood','edwina','Handmaid','VI.6'],
  ['temple','brian','Knight of the Order','II.32'],
  ['temple','beaumanoir','Grand Master','XXXV.19'],
  ['temple','conrade','Preceptor','XXXV.19'],
  ['temple','albert','Preceptor of Templestowe','XXXVI.3'],
  ['temple','herman','Preceptor of Goodalricke','XXXVII.18'],
  ['temple','damian','Gate officer','XXXV.30'],
  ['hospital','vipont','Knight of the Order','VII.9'],
  ['free-companions','debracy','Captain','VII.30'],
  ['free-companions','winkelbrand','Soldier','XXXIV.13'],
  ['forest-company','outlawcaptain','Captain','XI.15'],
  ['forest-company','locksley','Captain','XX.4'],
  ['forest-company','gilbert','Member of the company','XXXII.70'],
  ['forest-company','clementoutlaw','Member of the company','XXXII.89'],
  ['forest-company','scathlock','Member of the company','XLI.21'],
  ['john-party','john','Prince','VII.17'],
  ['john-party','fitzurse','Adviser','VIII.3'],
  ['john-party','debracy','Military ally','VII.30'],
  ['john-party','hughbardon','Intelligencer','XXXIV.65'],
  ['royal-followers','richard','King','XXXIV.22'],
  ['royal-followers','bohun','Earl of Essex','XLIV.8'],
]
const sentiments={
  'cedric-gurth':'complex','cedric-wamba':'complex','gurth-wamba':'positive',
  'aymer-brian':'complex','cedric-rowena':'complex','isaac-rebecca':'positive',
  'cedric-ivanhoe':'negative','ivanhoe-rowena':'positive','ivanhoe-rebecca':'positive',
  'brian-rebecca':'negative','debracy-rowena':'negative','richard-john':'complex',
  'blackknight-hermit':'complex','edith-athelstane':'positive','malvoisin-albert':'neutral',
}
const initialDescriptions={
  "cedric-gurth": "Gurth’s soldered collar identifies him as Cedric’s born thrall.",
  "cedric-wamba": "Wamba serves Cedric as his household jester and wears a silver thrall collar.",
  "gurth-wamba": "The swineherd and jester keep one another company in the forest glade.",
  "aymer-brian": "The churchman and armed traveller ride together toward Cedric’s hall.",
  "cedric-rowena": "Rowena is under Cedric’s guardianship.",
  "isaac-rebecca": "Rebecca attends the tournament beside her father Isaac.",
  "cedric-ivanhoe": "Cedric recognises the unhelmeted victor as his disowned son.",
  "ivanhoe-rowena": "Rowena recognises the wounded victor and cannot conceal her concern.",
  "ivanhoe-rebecca": "Rebecca undertakes the wounded knight’s care after the tournament.",
  "brian-rebecca": "Brian seeks compliance from Rebecca while she is confined in the isolated turret.",
  "debracy-rowena": "De Bracy uses Rowena’s captivity to press his proposal.",
  "richard-john": "John’s ambitions set him against his brother Richard’s authority.",
  "blackknight-hermit": "The traveller seeks shelter from a reluctant woodland hermit.",
  "edith-athelstane": "Edith mourns her son Athelstane and thanks those who tried to save him.",
  "malvoisin-albert": "Albert is Philip Malvoisin’s brother, and both are close to Brian."
}
export function compileSupporting(stamp,world){
  const cid=key=>{assert.ok(characters.some(c=>c.key===key),`Supporting character ${key}`);return `ivanhoe-character-${key}`}
  const eid=source=>{const id=witnessedScene(source);assert.ok(world.events.some(e=>e.id===id),`Supporting event ${id}`);return id}
  const sort=id=>{const event=world.events.find(e=>e.id===id);return world.chapters.find(c=>c.id===event.chapterId).number+event.sortOrder/1_000_000}
  const result={relationships:[],relationshipSnapshots:[],characterGoals:[],factions:[],factionMemberships:[],pending:[],evidence:[]}
  for(const row of relationships){
    const key=`${row.a}-${row.b}`,id=`ivanhoe-relationship-${key}`
    const start=eid(relationAnchors[key]??row.source)
    const sentiment=sentiments[key]??'complex',strength=['isaac-rebecca','edith-athelstane'].includes(key)?'bond':'strong'
    result.relationships.push({...stamp,id,characterAId:cid(row.a),characterBId:cid(row.b),label:row.label,strength,sentiment,description:initialDescriptions[key],isBidirectional:true,startEventId:start})
    result.evidence.push({kind:'relationship',key,event:start,source:row.source})
    for(const [index,change] of row.changes.entries()){
      const event=eid(changeAnchors[`${key}:${index}`]??change.source)
      assert.ok(sort(event)>=sort(start),`Relationship change follows its beginning: ${key}`)
      result.relationshipSnapshots.push({...stamp,id:`${id}-change-${index}`,relationshipId:id,eventId:event,sortKey:sort(event),label:change.label,strength,sentiment:key==='cedric-ivanhoe'?'positive':sentiment,description:change.note,isActive:change.isActive??true})
    }
  }
  for(const [index,row] of goals.entries()){
    const anchors=goalAnchors[`${row.character}:${index}`]??row
    const start=eid(anchors.start),end=anchors.end?eid(anchors.end):null
    assert.ok(!end||sort(end)>=sort(start),`Goal order: ${row.character}`)
    result.characterGoals.push({...stamp,id:`ivanhoe-goal-${index}`,characterId:cid(row.character),type:'want',text:row.text,startEventId:start,endEventId:end})
    result.evidence.push({kind:'goal',key:row.character,start,end,source:row.evidence})
  }
  result.factions=factions.map(row=>({...stamp,id:`ivanhoe-faction-${row.key}`,name:row.name,description:row.description,color:'#795b37',coverImageId:null,tags:[]}))
  for(const [faction,character,role,source] of memberships){
    assert.ok(result.factions.some(f=>f.id===`ivanhoe-faction-${faction}`))
    const start=eid(source)
    const endSource=({'temple:brian':'XLIII.84','temple:albert':'XLIV.46'})[`${faction}:${character}`]
    const end=endSource?eid(endSource):null
    result.factionMemberships.push({...stamp,id:`ivanhoe-membership-${faction}-${character}`,factionId:`ivanhoe-faction-${faction}`,characterId:cid(character),role,startEventId:start,endEventId:end,notes:`Source: ${source}.`})
    result.evidence.push({kind:'membership',faction,character,start,end,source,endSource})
  }
  return result
}
