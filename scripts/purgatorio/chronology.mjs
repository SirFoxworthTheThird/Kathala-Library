// Days since Easter Sunday, 1300. The hours between textual cues are estimates.
// Source: dawn I, noon IV, evening VIII; morning IX, noon XII, afternoon XV,
// sunset XVII, midnight XVIII; dawn XIX, noon XXV, sunset XXVII;
// next dawn XXVII/XXVIII, noon XXXIII. No minute-level accuracy is claimed.
const cantoRanges=[
 [5.5,6],[6,7],[7,9],[9,12],[12,14],[14,16],[16,18],[18,21],
 [26,34],[34,35],[35,36],[36,37],[37,38],[38,39],[39,40.5],[40.5,41.5],
 [41.5,43],[43,48],[53,56],[56,57],[57,58],[58,59],[59,59.5],[59.5,60],
 [60,62],[62,66],[66,78],[78,79],[79,80],[80,81],[81,82],[82,83],[83,84],
]
export function position(cantoIndex,start,lineCount){
 const [from,to]=cantoRanges[cantoIndex]
 if(cantoIndex===26){
  if(start>=109)return 78/24
  if(start>=91)return 77/24
  if(start>=55)return 67/24
  if(start>=34)return 66.5/24
 }
 return (from+(to-from)*(start-1)/lineCount)/24
}
