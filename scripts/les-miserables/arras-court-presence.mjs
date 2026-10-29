// Explicit source continuity through the same hearing, not a named-person
// search or a rule that every witness is present from the start. At64:27/32
// the earlier witnesses are told to sit; at65:2 all three are still together.
// Court parties remain through65:35. The later verdict has a time gap, so no
// extra witness attendance is inferred for65:36.
const additions = [
 [61,11,[['arras-landlady','Conducts the traveller from the hotel to the posting office where he books the night mail.']]],
 [63,'start',[
  ['arras-defence-lawyer','Has just finished pleading for Champmathieu when the mayor takes his seat behind the judges.'],
 ]],
 [63,22,[
  ['arras-president','Presides while the prosecution answers the defence and counsel makes a weakened reply.'],
  ['bamatabois','Remains on the jury as the prosecutor demands a severe sentence and the defence replies.'],
 ]],
 [64,'start',[
  ['arras-prosecutor','Is the official at whom the standing prisoner fixes his gaze before giving his own account.'],
  ['arras-defence-lawyer','Remains beside the accused as his client attempts to add to the completed defence.'],
  ['bamatabois','Sits with the jury while Champmathieu’s disordered account draws laughter from the audience.'],
 ]],
 [64,7,[
  ['arras-defence-lawyer','Hears the renewed identity challenge and the president recall counsel’s consent to Javert’s departure.'],
  ['bamatabois','Is among the jurors addressed about Baloup’s absence and the recalled police deposition.'],
 ]],
 [64,20,[
  ['arras-prosecutor','Remains in court while the first of the identifying witnesses he requested is brought back.'],
  ['arras-defence-lawyer','Hears Brevet persist in the identification that his earlier plea had conceded.'],
  ['bamatabois','Listens from the jury to the president’s appeal and Brevet’s repeated recognition.'],
 ]],
 [64,28,[
  ['brevet','Sits where the president has directed him while Chenildieu gives the second identification.'],
  ['arras-prosecutor','Hears Chenildieu confirm the identification after requesting the witnesses’ renewed examination.'],
  ['arras-defence-lawyer','Remains with his client under the second witness’s assertion of shared imprisonment.'],
  ['bamatabois','Hears Chenildieu’s answer as the second recalled witness addresses the court.'],
 ]],
 [64,33,[
  ['brevet','Remains seated after his own deposition as Cochepaille speaks and Madeleine calls all three witnesses.'],
  ['chenildieu','Has taken his seat on the president’s order and hears the mayor call his name after Cochepaille’s answer.'],
  ['arras-defence-lawyer','Watches the last identification and the interruption before the president can sum up.'],
 ]],
 [65,'start',[
  ['arras-defence-lawyer','Remains in the hearing while another man claims the identity attributed to his client.'],
  ['bamatabois','Sits with the jury addressed by the man he has just recognized as the mayor of Montreuil.'],
 ]],
 [65,11,[
  ['arras-defence-lawyer','Is absorbed in the confession and identifying proofs, forgetting for the moment his formal role as counsel.'],
  ['bamatabois','Hears the prison memories and sees the verification that overturns the jury’s apparent certainty.'],
 ]],
 [65,30,[
  ['arras-president','Remains at the court as the man who has confessed is permitted to withdraw without intervention.'],
  ['arras-defence-lawyer','Watches the departure after the confession has displaced the case made against his client.'],
  ['bamatabois','Remains among the jurors while the departing speaker addresses everyone present.'],
  ['champmathieu','Remains the accused when the man who has established his own identity leaves the hall.'],
  ['brevet','Is still with the witnesses as the man who recalled his suspenders offers himself for later arrest.'],
  ['chenildieu','Remains with the other witnesses after confirming the account of his burned shoulder.'],
  ['cochepaille','Stays with the witnesses after displaying the date as the acknowledged Valjean withdraws.'],
 ]],
]

export function projectArrasPresence(chapter,row){
 const extra=additions.find(([n,at])=>n===chapter&&at===row.at)?.[2]
 if(!extra)return row
 for(const[key]of extra)if(row.present.some(([actor])=>actor===key))
  throw Error(`Duplicate reviewed Arras participant: ${chapter}/${row.at}/${key}`)
 return{...row,present:[...row.present,...extra]}
}
