import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'
import {reviewedChapters} from './scene-review.mjs'
import {cutKey} from './scene-ranges.mjs'

// Editorial dramatic pressure, not a claim about the characters’ emotions.
// 1: exposition/rest; 2: uncertainty or restrained disagreement;
// 3: sustained conflict, concealment or consequential choice;
// 4: coercion, imminent violence or serious immediate danger;
// 5: active mortal danger, combat, fire or a life-or-death turning point.
// Explicit ordered ratings below follow the source-reviewed cuts, including
// the fine divisions of the melee. No title/keyword classifier is used.
// Source basis: the pinned complete text and the first-pass scene readings;
// this rating pass does not close the separate exhaustive presence/cut audit.
const chapterRatings=[
 [1,[1,1,2,3,2],'The glade moves from exposition through political resentment to the coming storm.'],
 [2,[2,1,2,4,3,2,1,2,3,2,2,3,2,2],'The raised rod is the immediate threat; the road wager and uncertain marsh passage sustain lesser pressure.'],
 [3,[1,2,3,2,2,2,2,3,2],'A delayed meal and the mention of Wilfred provoke Cedric, before hospitality controls the response.'],
 [4,[1,2,3,1,2,3,2,2],'The threatened household punishment and Brian’s stare interrupt the formal meal.'],
 [5,[3,4,1,2,4,3,3,2,4,1],'Isaac is excluded, the Palmer confronts Brian, and the untranslated instruction closes the threatening encounter.'],
 [6,[2,2,1,3,1,1,2,1,1,3,4,2,3,3,2,3,1,3,2,2,2,1],'The private interview gives way to the explicit abduction warning and concealed escape; the last exchange concerns equipment and gratitude.'],
 [7,[1,1,2,3,3,3,4,4,3,2],'The tournament audience becomes dangerous when John challenges the Saxons’ seating and the lance is severed.'],
 [8,[2,2,3,3,3,3,5,5,4,5,5,3,2],'Formal challenges become successive armed courses, with the attempted sword continuation checked by the marshals.'],
 [9,[2,3,2,3,2,3,2,3,3,3,3,4,1],'The choice of queen and rejected royal invitations increase political friction, ending in the yeoman’s detention.'],
 [10,[2,3,4,2,2,3,2,3,2,2,2,2,2,2,1],'Ransom bargaining and Brian’s unresolved quarrel precede the quieter exchanges over Isaac’s money and Rebecca’s generosity.'],
 [11,[3,4,4,4,3,5,5,3,2,2,2],'The armed roadside seizure escalates through two staff fights before conditional release.'],
 [12,[1,2,2,3,5,5,4,5,5,4,5,5,4,3,3,3,3,4,4,5,5],'The melee and encirclement are mortal action; awards lower the pressure before the wounded victor collapses.'],
 [13,[2,3,3,4,4,3,3,3,3,3,4,3,3,3],'John’s alarm at Richard’s freedom underlies the accelerated games and dangerous archery wager.'],
 [14,[1,2,3,3,3,3,4,3,3,4],'The banquet’s insults develop into an open royal toast dispute and anxiety about Richard.'],
 [15,[3,3,4,4,4,3,3],'Political recruitment and the coercive marriage plot are consequential schemes, not an already completed ambush.'],
 [16,[2,2,2,3,3,2,1,2,2,2,2,2,3,2],'The closed-door dispute and host’s evasions resolve into hospitality, with a renewed challenge over music and identity.'],
 [17,[2,2,2,2,2,3],'Singing and drink dominate until an unexplained knock interrupts the revels.'],
 [18,[3,3,3,4,1,2,4,3,3,3,1],'Ivanhoe’s removal and Gurth’s binding are followed by travel, the dog’s wound and Cedric’s dynastic pressure.'],
 [19,[2,3,3,3,4,5,4,3,3,3,3,3,3],'The litter delays the travellers before an actual armed abduction; survivors then organise help.'],
 [20,[3,2,3,3,2,2,3,3,2,3],'The woodland muster interrupts the hermitage feast and turns it toward the rescue.'],
 [21,[3,4,3,4,4,4,3,4],'The captors’ overnight journey ends in confinement and separation inside the castle.'],
 [22,[4,4,4,5,5,4,5,5,5],'Threatened torture is immediate mortal coercion; the interruption prevents a burning, without making the threat harmless.'],
 [23,[3,4,4,4,4,4,4,1],'Rowena faces confinement and a coercive suitor; the chroniclers’ retrospective commentary is a distinct low-pressure close.'],
 [24,[3,3,3,4,4,4,5,5,5,4,4,3],'Rebecca’s confrontation reaches a threatened leap from the parapet before the summons ends the encounter.'],
 [25,[3,3,3,3,4,3,5,3,3,4,3],'The besiegers’ demand and the written execution threat lead to Wamba’s dangerous substitution.'],
 [26,[4,4,4,5,4,4,3,4,4,4,4],'The confessor disguise crosses a hostile gate, exchanges liberty for captivity and exposes the escaping Cedric to further encounters.'],
 [27,[4,4,4,4,4,4,4,4,4,5,4,4,4,4,4,4,4,5],'Ulrica’s revelation, Cedric’s narrow escape and the discovery of the substitution culminate in deployment for assault.'],
 [28,[4,2,4,2,3,3,3,3,3,2,4,4,4,4],'The narrated return to the wounded knight’s rescue and care reconnects with capture, guard relief and the siege alarm.'],
 [29,[3,4,4,5,5,5,5,5,3,3],'Rebecca witnesses the active siege and broken bridge before the discussion of glory quiets the immediate action.'],
 [30,[4,4,4,4,5,5,5,5,5],'The wounded Baron is trapped in a locked room with the fire prepared below him.'],
 [31,[4,5,5,5,5,5,5,5,4,5,5,5,5,5,5,5,5,5,5],'Assault, spreading fire, rescue and abduction sustain mortal danger until the turret’s collapse.'],
 [32,[1,2,2,2,2,3,2,3,2,2,3,3,4,4,3,3],'The rescue is followed by freedom, mourning and distribution, with the friar’s prisoners and exchanged blows renewing conflict.'],
 [33,[3,3,3,3,4,4,3,3,3,3,2,2,2,2,2],'Ransom negotiation becomes urgent on the disclosure of Rebecca’s captivity, then resolves into letters and departures.'],
 [34,[4,4,4,4,4,4],'John’s council moves from alarming news to refused murder and commissioned pursuit.'],
 [35,[2,3,3,3,4,4,4,5],'Isaac leaves a refuge despite warnings and encounters an authority that turns his appeal into a sorcery accusation.'],
 [36,[4,4,4,4,4,4,4,4],'The planned inquiry and procured witnesses place Rebecca in a court whose judgement is being arranged against her.'],
 [37,[4,4,4,4,4,4,4,5,5,5,5],'Biased testimony escalates toward condemnation and Rebecca’s urgent appeal by combat.'],
 [38,[5,5,4,4,4,4,4,4,4],'The coerced assignment of a champion and the letter create an urgent search while the death sentence remains conditional.'],
 [39,[3,4,4,5,5,4,4,4],'Brian renews the coercive proposal in Rebecca’s cell, then faces the narrowing alternatives imposed by Albert.'],
 [40,[2,2,2,2,2,2,1,2,3,3,5,5,4,4,4,3,3,3,3,2,2],'Travel and playful conflict over the horn become an actual ambush; rescue, mercy and declarations gradually release the pressure.'],
 [41,[3,1,2,4,2,1,2,2],'Ivanhoe’s disobedience and an intentionally manufactured alarm bracket refreshment and the approach to Coningsburgh.'],
 [42,[2,3,2,2,3,3,5,4,4,3,3,3],'Mourning and reconciliation are overturned by Athelstane’s unexpected return and explanation of imprisonment.'],
 [43,[4,3,3,2,4,5,5,5,5,5,5,5,5,5,5,5,5],'The threatened execution, failed bargaining and absent champion sustain mortal stakes through the charge and Brian’s fall.'],
 [44,[1,3,4,3,2,3,2,2,2,1,1,2,2,2,2,2,2,2,1],'The acquittal and royal confrontation resolve into reunion, settlements, marriage and Rebecca’s farewell.'],
]

// Fail if cuts change or move; revisit the editorial sequence instead of
// silently shifting ratings onto a different passage.
assert.equal(createHash('sha256').update(JSON.stringify(reviewedChapters.flatMap(c=>c.scenes.map(s=>[c.chapter,cutKey(s),s.title])))).digest('hex'),'7fb0ec9ef957a370341dca0708ea5edd7a3f968f83c4fd5f55a26ea333ae1743','Tension review requires the reviewed scene-cut sequence')

export const tensionReview=chapterRatings.flatMap(([chapter,ratings,basis])=>{
 const scenes=reviewedChapters.find(c=>c.chapter===chapter)?.scenes
 assert.ok(scenes,`Tension chapter ${chapter}`)
 assert.equal(ratings.length,scenes.length,`Explicit tension coverage chapter ${chapter}`)
 return scenes.map((scene,index)=>({chapter,cut:cutKey(scene),title:scene.title,tension:ratings[index],basis}))
})
assert.equal(tensionReview.length,reviewedChapters.reduce((n,c)=>n+c.scenes.length,0))
export function compileTension(world){
 for(const row of tensionReview){
  assert.ok(Number.isInteger(row.tension)&&row.tension>=1&&row.tension<=5)
  const event=world.events.find(e=>e.id===`ivanhoe-source-${row.chapter+3}-${row.cut}`)
  assert.ok(event,`Tension source event ${row.chapter}:${row.cut}`)
  assert.equal(event.title,row.title)
  event.tension=row.tension
 }
 return {ratedNarrativeScenes:tensionReview.length,scale:'1 rest/exposition through 5 immediate mortal danger',basis:'Explicit source-led editorial ratings; not an automatic title classifier',paratextTension:1}
}
