import assert from 'node:assert/strict'
import fs from 'node:fs'
import{enrichedReview}from './build-enrichment-audit.mjs'
const pivotalCuts=JSON.parse(fs.readFileSync(new URL('./PIVOTAL_PACING_CUTS.json',import.meta.url),'utf8'))

// Editorial dramatic pressure, not a sentiment or keyword score. Section
// baselines follow the source action; named scene overrides shape its turns.
// Arguments and apparatus do not inherit a nearby battle's physical danger.
export const pacingSections=[
 [1,14,2,'Pastoral encounters and disputed charity within a reflective portrait.'],
 [15,27,3,'Refusal of shelter, moral risk and the reversal of the theft.'],
 [28,36,2,'The pleasure excursion conceals an approaching abandonment.'],
 [37,39,3,'A paid custody arrangement develops into a child’s servitude.'],
 [40,50,3,'Manufacturing prosperity contrasts with dismissal and desperate poverty.'],
 [51,52,4,'Public humiliation, arrest and competing claims of authority.'],
 [53,54,3,'Bedside hope is interrupted by the denunciation and mistaken prosecution.'],
 [55,65,4,'Deliberation, obstructed journey and the public choice at the trial.'],
 [66,70,4,'The bedside confrontation destroys the promised reunion.'],
 [71,89,4,'Battle, collapse and the ambiguous rescue among the dead.'],
 [90,103,3,'Imprisonment, the child’s water errand and contested departure from the inn.'],
 [104,108,2,'Shelter and growing attachment under increasingly uncertain concealment.'],
 [109,118,4,'A continuous pursuit and improvised refuge under immediate threat.'],
 [119,137,1,'Institutional history, religious practice and the narrator’s argument.'],
 [138,146,3,'A difficult admission requires a dangerous burial deception.'],
 [147,167,2,'The city child and the old household are introduced through portraits and habits.'],
 [168,175,3,'A father’s death and a political awakening rupture the family order.'],
 [176,181,2,'Friendships and political argument broaden the student’s loyalties.'],
 [182,187,2,'Sustained poverty and isolation rather than an immediate attack.'],
 [188,196,3,'Romantic recognition gives way to uncertainty and disappearance.'],
 [197,200,2,'The criminal network is introduced before its next action.'],
 [201,222,4,'Discovery, surveillance, hostage demands and intervention in the ambush.'],
 [223,228,2,'Political conditions and errands prepare the later rising.'],
 [229,232,3,'Isolation, poverty and a difficult promise to reveal the address.'],
 [233,240,3,'The household’s fragile peace is disturbed by separation and the chain-gang.'],
 [241,248,3,'An injury, suspicious visits and the concealed beginning of love.'],
 [249,251,4,'Street danger, threatened children and a prison escape.'],
 [252,255,1,'The language and conditions of poverty become an explicit social argument.'],
 [256,262,3,'Lovers’ happiness meets a threatened departure and a failed appeal.'],
 [263,265,4,'Warnings, absence and destitution converge on the eve of the rising.'],
 [266,276,4,'The funeral becomes an uprising and draws recruits through dangerous streets.'],
 [277,284,4,'Corinthe is fortified; suspicion and the execution of Le Cabuc alter its company.'],
 [285,294,5,'Approach, first assault, sacrificial intervention and deaths at the barricade.'],
 [295,298,4,'The letter and its delivery place Valjean inside the crisis.'],
 [299,307,4,'The last night closes the exits while the artillery presses the defenders.'],
 [308,313,5,'Dawn, depleted ammunition and Gavroche’s exposed expedition.'],
 [314,315,3,'Parallel waiting and deprivation keep the threatened families in view.'],
 [316,322,5,'The noon deadline, Javert’s release and final destruction of the barricade.'],
 [323,328,1,'Historical and technical sewer digressions pause the escape.'],
 [329,340,4,'The burdened escape faces pursuit, exhaustion and the shore encounter.'],
 [341,341,4,'Javert’s divided duty becomes an irreversible personal crisis.'],
 [342,349,2,'Recovery, reconciliation and financial preparations relieve the immediate danger.'],
 [350,353,2,'Wedding joy is accompanied by concealed estrangement and unease.'],
 [354,355,4,'The voluntary confession transforms trust into suspicion.'],
 [356,361,3,'Repeated exclusions and diminishing visits become a quiet decline.'],
 [362,364,4,'The unfinished letter, corrected accusations and final reunion converge.'],
 [365,365,2,'The plain grave concludes the narrative before the authorial apparatus.'],
]

// One score per reviewed cut in these pivotal chapters. Binding by cut rather
// than title prevents an editorial rename from changing the dramatic curve.
export const pivotalPacing={
 10:[2,2,2,3,3,3,3,4,3,2,2],
 15:[3,1,3,4,3,4,4,3,3,2],
 26:[2,2,4,3],27:[2,4,4,3,3,2],
 36:[2,4,2,4],37:[1,2,2,3,2,3,4,3],
 47:[2,1,3,4],49:[3,4,2,3,4,4,4,5,3,4],
 51:[1,4,4],52:[3,4,4,4,5,3],
 57:[2,4,3,4,5,4,4,4],65:[5,5,4,2],69:[5,5,4],
 97:[3,3,4,4],99:[3,3,3],
 100:[3,3,3,2,3,4,4,3,2,3,2,4,3,2],
 102:[4,4,4,5,2],113:[4,5,4,5],143:[4,4,5],144:[4,5,4,3,3,3],
 196:[3,3,4,3,4],
 220:[5,5,5,4,5,4,5,5,5,5,5,2,5,5,5,5],
 221:[3,5,5,4,3],248:[3,3,4,3],
 259:[4,3,5,4,5,4,3,3],262:[2,2,2,3,4,3,4,4,5,4],
 288:[4,3,5,5,5],291:[3,5,5,5,3],293:[5,5,4,4,4,5],
 313:[4,4,5,5,5],317:[4,4,5,4,4,4],321:[5,5,5,3],
 334:[2,5,4],337:[3,1,5,4],341:[4,4,5,4,3,5],
 345:[2,2,2,2,3],354:[3,3,4,5,4,4,4,4,4,3],
 363:[2,2,1,3,3,3,3,1,4,4,2,5,5,5,5,3,4,4],
 364:[4,4,5,5,4,5],365:[3,1,1],
}

export const pacingNote='Dramatic tension is an editorial scale from one to five: reflection and contextual description, ordinary interaction, consequential uncertainty, immediate danger or decisive emotional conflict, and acute irreversible crisis. A quiet revelation can score highly without physical violence. The historical essays and endnotes retain their reflective pace instead of inheriting the danger of adjoining action.'

export function buildPacingPlan(review=enrichedReview()){
 const bases=new Map(),result=new Map()
 for(const[first,last,value,reason]of pacingSections){
  assert.ok(Number.isInteger(value)&&value>=1&&value<=5&&reason.trim())
  for(let n=first;n<=last;n++){
   assert.ok(!bases.has(n),`Repeated pacing section: ${n}`)
   bases.set(n,{value,reason})
  }
 }
 for(const[chapter,rows]of review){
  const base=bases.get(chapter)
  assert.ok(base,`Missing pacing section: ${chapter}`)
  const pivotal=pivotalPacing[chapter]
  if(pivotal){
   assert.equal(pivotal.length,rows.length,`Pivotal pacing cuts changed: ${chapter}`)
   assert.deepEqual(rows.map(row=>row.at),pivotalCuts[chapter],`Pivotal pacing cut moved: ${chapter}`)
  }
  for(const[index,row]of rows.entries()){
   const tension=pivotal?.[index]??(['exposition','apparatus'].includes(row.kind)?1:
    row.kind==='document'?2:row.kind==='reported'?Math.min(3,base.value):base.value)
   assert.ok(Number.isInteger(tension)&&tension>=1&&tension<=5)
   result.set(`${chapter}-${index+1}`,{tension,basis:pivotal?'Individually scored pivotal source beat. '+base.reason:base.reason,
    at:row.at,title:row.title,kind:row.kind})
  }
 }
 return result
}

if(process.argv[1]&&import.meta.url.endsWith(process.argv[1].replace(/\\/g,'/'))){
 const scenes=[...buildPacingPlan()].map(([scene,values])=>({scene,...values}))
 fs.writeFileSync(new URL('./PACING_REVIEW.json',import.meta.url),JSON.stringify({
  scope:'Initial editorial pacing pass; final full-book curve review pending',note:pacingNote,scenes,
 },null,2)+'\n')
 console.log(`${scenes.length} editorial pacing records`)
}
