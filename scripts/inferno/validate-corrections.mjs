import assert from 'node:assert/strict'

export function validateCorrections(world){
 const event=title=>world.events.find(entry=>entry.title===title)
 const before=(field,title)=>world.events.filter(entry=>entry.sortOrder<event(title).sortOrder).flatMap(entry=>field==='events'?[entry]:world[field].filter(record=>record.eventId===entry.id))
 for(const entry of world.events){
  const states=world.characterSnapshots.filter(snapshot=>snapshot.eventId===entry.id)
  assert.deepEqual(new Set(states.map(state=>state.characterId)),new Set(entry.involvedCharacterIds),`${entry.title}: exact snapshot cast`)
  assert.equal(states.length,entry.involvedCharacterIds.length,`${entry.title}: one snapshot per character`)
  assert.ok(Number.isInteger(entry.travelDays)&&entry.travelDays>=0,`${entry.title}: elapsed time`)
 }
 assert.equal(event('Beatrice Descends to Limbo').timelineId,'inferno-timeline-intercession')
 assert.equal(event('The Fatal Reading').timelineId,'inferno-timeline-francesca-memory')
 assert.equal(event('Manto’s Wandering').timelineId,'inferno-timeline-mantua-history')
 assert.equal(event('Ulysses Leaves Home').timelineId,'inferno-timeline-ulysses-voyage')
 assert.equal(event('From Soldier to Friar').timelineId,'inferno-timeline-guido-memory')
 assert.equal(event('The Tower Is Sealed').timelineId,'inferno-timeline-ugolino-memory')
 for(const title of ['Manto’s Wandering','The Founding of Mantua','Ulysses Leaves Home','Beyond the Pillars','The Tower Is Sealed','The Dream of the Hunt'])for(const id of ['inferno-char-dante','inferno-char-virgil'])assert.ok(!event(title).involvedCharacterIds.includes(id),`${title}: no descent-frame traveller`)
 const geryonReveal=event('Mounting Fraud')
 for(const entry of before('events','Mounting Fraud'))assert.ok(!entry.description.includes('Geryon'),`${entry.title}: early Geryon`)
 for(const state of before('characterSnapshots','Mounting Fraud'))assert.ok(!state.statusNotes.includes('Geryon'),`${state.id}: early Geryon`)
 assert.equal(world.characters.find(c=>c.id==='inferno-char-geryon').nameChanges[0].eventId,geryonReveal.id)
 assert.equal(world.characters.find(c=>c.id==='inferno-char-nicholas').nameChanges[0].eventId,event('Nicholas Names the Succession').id)
 const gateways=world.locationMarkers.filter(location=>location.linkedMapLayerId)
 assert.equal(gateways.length,7)
 for(const map of world.mapLayers.filter(entry=>entry.parentMapId)){assert.equal(gateways.filter(g=>g.mapLayerId==='inferno-map-overview'&&g.linkedMapLayerId===map.id).length,1,`${map.name}: overview gateway`);assert.ok(gateways.some(g=>g.linkedMapLayerId===map.id),`${map.name}: reachable`)}
 assert.ok(world.relationshipSnapshots.length>world.relationships.length,'changing relationships')
 for(const page of world.lorePages)assert.ok(!/scripts[\\/]|\.md\b|manifest file|committed/i.test(page.body),`${page.title}: reader-facing lore`)
}
