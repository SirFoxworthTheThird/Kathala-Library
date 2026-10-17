export const plans=[
// Ch 1
[
 [{cut:0,title:'The Ebb Beyond the Marker',loc:'surgery',cast:['ezra'],tension:2},{cut:3,title:'Ruth Comes for the Doctor',loc:'cliff-row',cast:['ezra','ruth'],tension:3}],
 [{cut:0,title:'Breathing Stone',loc:'fourth-heading',cast:['tom','pell'],tension:3}],
 [{cut:0,title:'Thirty-One Shores',loc:'school',cast:['agnes','annie','joseph'],tension:3},{cut:10,title:'The Dream Ledger Begins',loc:'school',cast:['agnes'],tension:3},{cut:12,title:'Hands Flat, Eyes Here',loc:'school',cast:['agnes','annie','joseph'],tension:2},{cut:17,title:'The Tide by the Almanac',loc:'agnes-house',cast:['agnes'],tension:3}]
],
// Ch 2
[
 [{cut:0,title:'The Man at the Memorial',loc:'memorial',cast:['ezra','wren','silas'],tension:3}],
 [{cut:0,title:'The Hydrophone at the Boards',loc:'fourth-heading',cast:['wren','pell','tom'],tension:4}],
 [{cut:0,title:'A Spring Tide That Does Not Come',loc:'staithe',cast:['ezra','agnes','harker'],tension:4}]
],
// Ch 3
[
 [{cut:0,title:'The Stone at Vespers',loc:'church',cast:['silas','tom','ruth'],tension:4}],
 [{cut:0,title:'Beyond the Boards',loc:'hollow',cast:['ezra','wren','pell'],tension:5}],
 [{cut:0,title:'The Patient in the Back Room',loc:'surgery',cast:['ezra','tom','ruth'],tension:4}],
 [{cut:0,title:'What the Children Say in Sleep',loc:'agnes-house',cast:['ezra','agnes'],tension:4}]
],
// Ch 4
[
 [{cut:0,title:'Pell Keeps the Record',loc:'fourth-heading',cast:['pell','tom'],tension:4}],
 [{cut:0,title:'The Note Stops',loc:'fourth-heading',cast:['pell','tom'],tension:5},{cut:10,title:'Tom Comes Out of the Earth',loc:'drift-mouth',cast:['tom'],tension:5},{cut:14,title:'Water Without a Tide',loc:'staithe',cast:['harker','silas'],tension:5}],
 [{cut:0,title:'A Coffin Filled with Spoil',loc:'churchyard',cast:['silas','ezra','wren','agnes','ruth','tom'],tension:4}]
],
// Ch 5
[
 [{cut:0,title:'Tom at the End of the Scar',loc:'long-scar',cast:['tom','ruth','harker'],tension:4}],
 [{cut:0,title:'Silas Keeps the Hours',loc:'church',cast:['silas'],tension:3},{cut:2,title:'A Congregation of One',loc:'church',cast:['silas','agnes'],tension:4}],
 [{cut:0,title:'The Watch Kept Dry',loc:'surgery',cast:['ezra','wren'],tension:5}]
],
// Ch 6
[
 [{cut:0,title:'Tracks Across the Bared Sea',loc:'seabed',cast:['ezra','agnes'],tension:5}],
 [{cut:0,title:'The Palm on Elias’s Name',loc:'memorial',cast:['ezra','wren'],tension:5}],
 [{cut:0,title:'The Handwriting in the Ledger',loc:'school',cast:['agnes'],tension:5},{cut:5,title:'The Parcel for Ezra',loc:'school',cast:['agnes','ezra'],tension:4}]
],
// Ch 7
[
 [{cut:0,title:'The Road Will Not Let Them Pass',loc:'whitby-road',cast:['ezra','ruth'],tension:5}],
 [{cut:0,title:'The Children Go Down',loc:'staithe',cast:['ezra','agnes','annie','joseph'],tension:5},{cut:5,title:'The School Command',loc:'long-scar',cast:['ezra','agnes','tom','annie','joseph'],tension:5}],
 [{cut:0,title:'Silas Speaks Without the Pulpit',loc:'church',cast:['silas','ezra','ruth','tom'],tension:5}],
 [{cut:0,title:'Hollin Staithe Empties',loc:'village-square',cast:['ezra','harker','annie'],tension:4},{cut:3,title:'The Empty Schoolhouse',loc:'school',cast:['ezra'],tension:4},{cut:4,title:'Ruth Keeps Her Place',loc:'hesketh-house',cast:['ezra','ruth'],tension:4}]
],
// Ch 8
[
 [{cut:0,title:'Silas Leaves Footprints',loc:'churchyard',cast:['ezra','tom'],tension:5},{cut:3,title:'Three People Left',loc:'hesketh-house',cast:['ezra','ruth'],tension:4},{cut:6,title:'Ezra Goes to the Listener',loc:'long-scar',cast:['ezra','tom'],tension:4}],
 [{cut:0,title:'The Great Low Tide',loc:'long-scar',cast:['ezra','tom','wren'],tension:5},{cut:3,title:'The Door in the Cliff',loc:'hollow',cast:['ezra','tom','wren'],tension:5}],
 [{cut:0,title:'The Sea Returns',loc:'surgery',cast:['ezra'],tension:4},{cut:2,title:'Ruth’s Open Door',loc:'hesketh-house',cast:['ezra'],tension:4},{cut:3,title:'A Case History for Whoever Comes Next',loc:'surgery',cast:['ezra'],tension:5}]
]
]
export function withEnds(section,plan){const n=section.text.split(/\n{2,}/).length;return plan.map((e,i)=>({...e,end:plan[i+1]?.cut??n}))}
