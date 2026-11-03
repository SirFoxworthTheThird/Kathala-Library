import {facts} from './feature-ledger.mjs'
import {exactSourceEvent} from './source-anchors.mjs'

// A blocked anchor is recorded, never rounded back to an earlier scene.
// This is a partial compiler while final source/scene review is in progress.
export function compileKnowledge(stamp){
  const knowledgeFacts=[],knowledgeReveals=[],pending=[]
  const cid=key=>`ivanhoe-character-${key}`
  for(const fact of facts){
    let reader,earlier
    try{
      reader=exactSourceEvent(fact.reader)
      if(fact.earlierLearner)earlier=exactSourceEvent(fact.earlierLearner.source)
    }catch(error){pending.push({key:fact.key,source:fact.reader,reason:error.message});continue}
    const id=`ivanhoe-fact-${fact.key}`
    const tags=[...(fact.stateTags??[]),...(fact.stateTag?[fact.stateTag]:[])].map(tag=>{
      const match=tag.match(/^(offstage-death|offstage-location-unknown):(.+)$/)
      if(!match)throw Error(`Unknown state tag ${tag}`)
      return `${match[1]}:${cid(match[2])}`
    })
    knowledgeFacts.push({...stamp,id,title:fact.title,description:fact.description,tags,readerLearnsAtEventId:reader,originEventId:earlier??reader})
    // `kind` is an internal audit classification. In particular, calling an
    // early report "mistaken" would disclose its later correction in the UI.
    for(const key of fact.learners)knowledgeReveals.push({...stamp,id:`${id}-learner-${key}`,factId:id,characterId:cid(key),eventId:fact.earlierLearner?.key===key?earlier:reader,note:`Source: ${fact.earlierLearner?.key===key?fact.earlierLearner.source:fact.reader}.`})
    if(fact.earlierLearner&&!fact.learners.includes(fact.earlierLearner.key))knowledgeReveals.push({...stamp,id:`${id}-earlier-${fact.earlierLearner.key}`,factId:id,characterId:cid(fact.earlierLearner.key),eventId:earlier,note:`Source: ${fact.earlierLearner.source}.`})
  }
  return {knowledgeFacts,knowledgeReveals,pending}
}
