import assert from 'node:assert/strict'

export function validateCorrections(data){
 const event=title=>{const value=data.events.find(entry=>entry.title===title);assert.ok(value,`Missing ${title}`);return value}
 const prose=title=>data.sceneTexts.find(text=>text.eventId===event(title).id).text
 assert.equal(prose('The Argument and Invocation').split('\n').length,26,'Invocation must end before the infernal narrative')
 assert.ok(prose('The Argument and Invocation').endsWith('And justify the ways of God to men.'))
 assert.ok(prose('Mammon Mines the Hill').includes('Mammon led them on'))
 assert.ok(!prose('Mammon Mines the Hill').includes('For ever now to have their lot in pain'))
 assert.equal(event('Raphael Ends the Warning').timelineId,'paradise-lost-timeline-fall')
 assert.equal(event('Raphael Ends the Warning').isFlashback,false)
 assert.ok(prose('Raphael Ends the Warning').startsWith('Thus, measuring things in Heaven'))
 assert.equal(event('Adam Recalls Awakening').timelineId,'paradise-lost-timeline-memory')
 assert.equal(event('Adam Recalls Awakening').isFlashback,true)
 const offset=id=>data.timelines.find(timeline=>timeline.id===id).dayOffset
 assert.ok(offset('paradise-lost-timeline-memory')+event('Adam Recalls Awakening').inWorldTime<0,'Adam’s remembered state must predate the main narrative')
 assert.ok(offset('paradise-lost-timeline-rebellion')+event('The Son Returns in Triumph').inWorldTime<=offset('paradise-lost-timeline-creation'),'War must precede creation')
 assert.ok(prose('Adam Recalls Awakening').includes('Soft on the flowery herb I found me laid'))
 assert.equal(event('Cain and Abel').isFlashback,false,'Prospective presentation is not a flashback')
 assert.equal(event('The Scales in Heaven').locationMarkerId,'paradise-lost-loc-western-watch')
 assert.equal(event('Raphael Warns of Passion').involvedCharacterIds.includes('paradise-lost-char-eve'),false,'Eve has retired before the private counsel')
 assert.ok(event('Satan at Eve’s Ear').involvedCharacterIds.includes('paradise-lost-char-adam'),'Sleeping Adam remains physically present')
 for(const title of ['Satan’s First Revolt','God Declares Creation','The Sabbath Hymn'])assert.ok(!event(title).involvedCharacterIds.includes('paradise-lost-char-raphael'),`${title}: narrator is outside the recounted scene`)
 for(const snapshot of data.characterSnapshots){
  assert.ok(!/places (?:this decisive action|their distinct response) at|is physically present|presses his will against defeat|speaks and chooses from her own perception/.test(snapshot.statusNotes),'Generic snapshot template')
  const owner=data.events.find(entry=>entry.id===snapshot.eventId)
  assert.equal(snapshot.currentLocationMarkerId,owner.locationMarkerId,'Snapshot follows its source scene')
 }
 for(const [title,sentiment] of [['Mutual Accusation','negative'],['Shared Burden','positive'],['Repentance','positive']]){
  const snapshot=data.relationshipSnapshots.find(state=>state.relationshipId==='paradise-lost-relationship-adam-eve'&&state.eventId===event(title).id)
  assert.ok(snapshot,`${title}: relationship change required`);assert.equal(snapshot.sentiment,sentiment)
 }
 const sin=data.characters.find(character=>character.id==='paradise-lost-char-sin')
 assert.equal(sin.name,'The Gatekeeper');assert.equal(sin.nameChanges[0].eventId,event('Sin Tells Her Origin').id)
 const fact=data.knowledgeFacts.find(entry=>entry.id==='paradise-lost-fact-prohibition')
 assert.equal(fact.readerLearnsAtEventId,event('Satan Overhears the Prohibition').id)
 for(const event of data.events)assert.ok(Number.isInteger(event.travelDays)&&event.travelDays>=0,'Only whole-day lower bounds are elapsed durations')
 const art=data.lorePages.find(page=>page.id==='paradise-lost-lore-art')
 assert.ok(!/committed artwork manifest|scripts\//.test(art.body),'Reader lore must contain attribution without unavailable build-file pointers')
}
