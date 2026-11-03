import assert from 'node:assert/strict'

// Second-pass witnesses from the pinned text, III–VI. These additions preserve
// physically established participants in the uninterrupted supper, rather than
// treating silence as an exit. Only narrated gestures are assigned as actions.
// The broader household/retinue roster remains an explicit release blocker.
export const householdContinuity=[
 [3,23,'hundebert','Leaves with several household attendants to carry out Cedric’s hospitality orders.','III.23'],
 [3,29,'elgitha','Leaves the hall after Cedric directs her to carry his message to Rowena.','III.29'],
 [5,57,'cedric','Receives the guests’ final salutation and retires from the hall by a separate door with his attendants.','V.57'],
 [5,57,'rowena','Receives the parting obeisance and retires with her attendants through a door separate from Cedric’s.','V.57'],
 [2,57,'hugo','Remains with the retinue at Sunken Cross after using his lance to rouse the stranger, who now agrees to guide the party.','II.56–61'],
 [2,62,'hugo','Accompanies the guided party through the woodland brooks after the disagreement at the cross.','II.56,62'],
 [2,64,'hugo','Travels with the retinue approaching Rotherwood while its guide names his calling.','II.62–68'],
 [2,68,'hugo','Arrives with the travelling company before Rotherwood’s western entrance as rain begins.','II.68–70'],
 [3,31,'hugo','Enters with the guests’ retinue behind the steward and torchbearers.','III.31; IV.6'],
 [4,0,'hugo','Is among the visiting attendants whose company crowds the lower table as the Palmer finds a separate settle.','IV.6'],
 [4,26,'hugo','Stands with the company when Rowena enters and receives its salutation.','IV.27'],
 [5,28,'hugo','Turns with the company toward the Palmer’s unexpected assertion about the English knights.','V.30'],
 [5,63,'hugo','Is directed toward a place of repose with the visiting retinue; the source does not identify his room.','V.63'],
 [5,63,'hamet','Is among the visiting retinue directed toward sleeping places; his particular room is not identified.','V.62–63'],
 [5,63,'abdalla','Is directed to repose with the other visiting attendants, without a stated room or sleeping position.','V.62–63'],
 [3,19,'balder','Barks with the dogs in the hall at the horn and is among those silenced by Cedric and the domestics.','III.19'],
 [4,26,'hundebert','Raises his white wand and commands the company to make room for Rowena.','IV.26–27'],
 [4,39,'balder','Is among Cedric’s favourite dogs attending him while he shares food from his trencher with Wamba and the dogs.','III.10; IV.41'],
 [5,0,'rowena','Is seated at Cedric’s right while the household disputes whether the stranger at the gate should be admitted.','IV.27; V.3–13,19'],
 [5,0,'palmer','Remains at the separate chimney settle while the newcomer’s admission is debated; he has not yet given up that place.','IV.6; V.3–17'],
 [5,14,'rowena','Is at the upper table during Isaac’s arrival and the refusal of room at the lower board.','IV.27; V.14–19'],
 [5,14,'palmer','Occupies the separate settle by the chimney when Isaac finds no room at the lower table.','V.14–17'],
 [5,14,'aymer','Is among the principal guests while his attendants cross themselves at Isaac’s approach to the lower table.','V.16–17'],
 [5,20,'rowena','Remains at the upper table as the discussion moves from hunting language to the English knights’ reputation.','V.19–28'],
 [5,20,'palmer','Stands on the other side of the hall, within hearing of the discussion that compares the crusading knights.','V.17,20–30'],
 [5,20,'isaac','Occupies the place at the hearth provided by the Palmer while the upper-table conversation turns to hunting and war.','V.17–20,49'],
 [5,28,'aymer','Turns with the company toward the Palmer when his claim for the English knights interrupts the exchange.','V.30'],
 [5,28,'isaac','Turns with the company toward the Palmer’s unexpected declaration from the place near the hearth.','V.17–18,30'],
 [5,28,'hamet','Turns with the company toward the Palmer when he publicly contradicts the claim about the English knights.','V.16,30'],
 [5,28,'abdalla','Turns with the company toward the Palmer’s unexpected defence of the English chivalry.','V.16,30'],
 [5,36,'rowena','Is at the upper table as the Palmer enumerates the successful knights and leaves the sixth unnamed.','V.28–50'],
 [5,36,'brian','Remains before the company after his angry response to the Palmer’s account, while the successful knights are enumerated and the sixth left unnamed.','V.33,36–45'],
 [5,36,'aymer','Is at the principal table while the names of Richard and four companions are recited; the sixth is withheld.','V.36–49'],
 [5,36,'isaac','Remains at the hearth during the enumeration of the knights; he has not joined the upper table.','V.17–18,36–49'],
 [5,45,'isaac','Does not join the prayers over the alleged relic of the cross; his exception is explicitly named by the narrator.','V.49'],
 [5,45,'rowena','Is among the company as the challenge to Ivanhoe is secured by the reliquary and gold chain.','V.45–50'],
 [5,50,'brian','His challenge and gold-chain pledge stand before the company while Rowena and Cedric vouch for Ivanhoe.','V.49–54'],
 [5,50,'isaac','Remains in the hall while the pledges are assigned to safekeeping and Aymer presses to retire.','V.49–58'],
 [5,57,'hamet','Is addressed with the other attendant by Brian in a language unknown to the bystanders; the order’s contents are not yet translated.','V.62'],
 [5,57,'abdalla','Receives Brian’s words with the other attendant after the encounter with Isaac; the bystanders are not told what is said.','V.62'],
]
export function applyHouseholdContinuity(chapters){
 for(const [chapter,from,key,status,source] of householdContinuity){
  const scene=chapters.find(c=>c.chapter===chapter)?.scenes.find(s=>s.from===from)
  assert.ok(scene,`Household witness ${source}`)
  assert.ok(!Object.hasOwn(scene.cast,key),`Duplicate household witness ${chapter}.${from}:${key}`)
  scene.cast[key]=status
  if(chapter===5&&from===63)scene.places={...scene.places,[key]:null}
 }
}
