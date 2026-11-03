import assert from 'node:assert/strict'

// XXII.7 explicitly calls them the two attendants of the Templar. Their names
// are established at II.51. Actions divided between "one" and "the other"
// remain unassigned: a source-grounded pair is not evidence for which hand
// held the scales, flint or bellows. No individual torture injury is invented.
export function applyAttendantReviews(chapters){
  // The pair is physically described at II.9–11, before the names at II.51.
  // Do not put the other man's still-undisclosed name into either status.
  // II.56 says the attendants were too far back to hear Wamba's directions.
  const travelling=[
    [0,'Rides behind the two squires among the pair of turbaned attendants as the cavalcade overtakes the servants.'],
    [12,'Continues behind the squires while the two leading riders meet the servants; the party has not yet resumed its journey.'],
    [14,'Waits with the travelling retinue while the churchman seeks lodging; remains behind the leading riders.'],
    [23,'Is with the rear retinue while the armed rider confronts the swineherd; no intervention by either attendant is described.'],
    [30,'Remains with the retinue during the halted riders’ exchange; the later crossroads account establishes that the attendants were too far away to hear the directions.'],
    [35,'Waits behind the leading riders while Wamba gives his misleading directions; is not close enough to hear the route.'],
    [40,'Travels onward with the cavalcade after it leaves the two servants behind; the leading riders discuss Cedric and their wager.'],
    [52,'Reaches Sunken Cross with the retinue; neither attendant was close enough to hear the servants’ earlier directions.'],
    [57,'Is with the company at the crossroads as the stranger agrees to guide it; the horse supplied to the guide comes from the Prior’s attendant.'],
    [62,'Travels with the guided cavalcade across the marshy woodland brooks toward Rotherwood.'],
    [64,'Accompanies the travellers approaching Rotherwood as their guide identifies himself as a Palmer.'],
    [68,'Reaches Rotherwood’s western entrance with the company as the Templar sounds his horn and heavy rain begins.'],
  ]
  const companionStatuses=[
    'Follows the two squires beside the other turbaned attendant when the company comes up with Gurth and Wamba.',
    'Is halted in the rear of the company during the leading riders’ encounter with the two servants.',
    'Remains among the attendants behind the riders while the churchman asks where the company can lodge.',
    'Stays back with the travelling attendants during the armed rider’s confrontation with Gurth.',
    'Is still in the rear company during the roadside dispute, beyond hearing of the directions later discussed at the crossroads.',
    'Has not come within hearing of Wamba’s directions; waits farther back with the attendants.',
    'Leaves the servants behind in the company’s onward movement while the two principal riders converse.',
    'Arrives with the company at Sunken Cross, unable to supply directions he had been too far behind to hear.',
    'Waits among the company at Sunken Cross while the stranger accepts a horse and undertakes to lead the travellers.',
    'Follows the new guide with the mounted company through marshy ground and woodland brooks.',
    'Is in the approaching company when its guide declares that he is a Palmer.',
    'Arrives among the attendants at Rotherwood’s western entrance as the horn is sounded in the rain.',
  ]
  const opening=chapters.find(c=>c.chapter===2)
  for(const [from,status] of travelling){
    const row=opening.scenes.find(s=>s.from===from)
    assert.ok(row,`Travelling attendant witness II.${from}`)
    for(const key of ['hamet','abdalla']){
      assert.ok(!Object.hasOwn(row.cast,key),`Duplicate opening attendant ${from}:${key}`)
      row.cast[key]=key==='hamet'?status:companionStatuses[travelling.findIndex(([paragraph])=>paragraph===from)]
    }
  }
  const rows=[
    [22,7,'Enters the dungeon with OTHER carrying one of the two baskets; waits back while one of the pair lays out scales and weights.'],
    [22,12,'Stands with OTHER during Front-de-Bœuf’s demand for a thousand pounds; no silver is delivered.'],
    [22,21,'With OTHER produces charcoal, bellows and oil and prepares the fire; the text does not identify which man lights it and which works the bellows.'],
    [22,27,'With OTHER lifts Isaac from the floor and holds him while the Baron demands security for the promised ransom.'],
    [22,35,'Continues holding Isaac with OTHER while the Baron refuses to release the other captives on Isaac’s terms.'],
    [22,44,'Lets go of Isaac with OTHER, startled by his cry on learning what has happened to Rebecca.'],
    [22,49,'Remains beside OTHER as Isaac withdraws his agreement to pay unless his daughter is restored safely.'],
    [22,55,'With OTHER tears off Isaac’s upper garment, restores it at the interrupted Baron’s signal, and leaves the dungeon; no burning occurs.'],
    [31,80,'Follows Brian on horseback with OTHER through the drawbridge under arrows and round toward the barbican.'],
  ]
  for(const [chapter,from,text] of rows){
    const row=chapters.find(c=>c.chapter===chapter)?.scenes.find(s=>s.from===from)
    assert.ok(row,`Attendant witness ${chapter}:${from}`)
    for(const [key,other] of [['hamet','Abdalla'],['abdalla','Hamet']]){
      assert.ok(!Object.hasOwn(row.cast,key),`Duplicate attendant state ${chapter}:${from}:${key}`)
      row.cast[key]=text.replaceAll('OTHER',other)
    }
  }
}
