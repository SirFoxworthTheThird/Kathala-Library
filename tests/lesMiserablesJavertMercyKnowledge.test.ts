import{expect,test}from'vitest'
import{buildWorldReview}from'../scripts/les-miserables/build-world-review.mjs'

test('reveals mercy to the reader and Javert before Marius learns it from the printed proof',()=>{
 const{world}=buildWorldReview({embedded:false})
 const fact=world.knowledgeFacts.find(r=>r.id==='lesmis-world-review-fact-javert-spared')
 expect(fact).toMatchObject({readerLearnsAtEventId:'lesmis-world-review-event-317-3',originEventId:'lesmis-world-review-event-317-3'})
 const reveals=world.knowledgeReveals.filter(r=>r.factId===fact.id)
 expect(reveals.find(r=>r.characterId==='lesmis-world-review-character-javert')).toMatchObject({eventId:'lesmis-world-review-event-317-3'})
 expect(reveals.find(r=>r.characterId==='lesmis-world-review-character-valjean')).toMatchObject({eventId:'lesmis-world-review-event-317-3'})
 const proof=world.events.find(r=>r.title==='The Printed Proofs')
 expect(reveals.find(r=>r.characterId==='lesmis-world-review-character-marius')).toMatchObject({eventId:proof.id})
 expect(reveals.some(r=>r.characterId==='lesmis-world-review-character-cosette')).toBe(false)
})
