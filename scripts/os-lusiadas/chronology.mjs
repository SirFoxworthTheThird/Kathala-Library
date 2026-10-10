// Editorial positions for the poem's several clocks. A date is a calendar
// display position, not a claim that Camões supplied a daily log. See
// CHRONOLOGY.md for every external anchor and the undated conventions.
import { cuts } from './scene-cuts.mjs'

export const calendar = {
  startYear: 1000, yearSuffix: '',
  months: [
    ['January',31],['February',28],['March',31],['April',30],
    ['May',31],['June',30],['July',31],['August',31],
    ['September',30],['October',31],['November',30],['December',31],
  ].map(([name,days])=>({name,days})),
}

export const timelineDefs = [
  ['voyage','The voyage, 1497–1499','The sailing events, including Gama’s retrospectively told outward passage.'],
  ['history','History in Gama’s account','Past Portuguese events recounted at Melinde, with approximate historical positions.'],
  ['tale','Veloso’s tale','The Twelve of England as a told story with no secure historical day.'],
  ['myth','Divine and allegorical action','Olympus, the sea gods, and the Island of Love alongside the voyage.'],
  ['poet','The poet’s address','The authorial voice, displayed at its publication year, 1572.'],
]

const startYear = calendar.startYear
const daysBeforeMonth = month => calendar.months.slice(0,month-1).reduce((n,m)=>n+m.days,0)
export function day(year,month=1,date=1) {
  if (!Number.isInteger(year)||month<1||month>12||date<1||date>calendar.months[month-1].days) throw Error(`Invalid editorial date ${year}-${month}-${date}`)
  return (year-startYear)*365+daysBeforeMonth(month)+date-1
}

// This anchor table follows the contemporaneous voyage journal at the named
// ports; intermediate scene days are interpolated only for display.
const voyageAnchors = [
  [4,84,1497,7,8],[4,94,1497,7,8],
  [5,1,1497,7,8],[5,4,1497,7,27],[5,8,1497,8,3],
  [5,16,1497,10,15],[5,18,1497,11,1],[5,24,1497,11,4],
  [5,27,1497,11,7],[5,30,1497,11,8],[5,31,1497,11,8],
  [5,37,1497,11,22],[5,41,1497,11,22],[5,49,1497,11,22],
  [5,50,1497,11,22],[5,61,1497,11,25],[5,70,1498,1,16],
  [5,75,1498,2,24],[5,81,1498,3,1],[5,84,1498,4,15],
  [5,90,1498,4,23],
  [1,19,1498,3,2],[1,42,1498,3,2],[1,45,1498,3,2],
  [1,57,1498,3,3],[1,69,1498,3,10],[1,84,1498,3,29],
  [1,93,1498,3,29],[1,100,1498,3,30],
  [2,1,1498,4,7],[2,8,1498,4,7],[2,14,1498,4,8],
  [2,18,1498,4,8],[2,29,1498,4,9],[2,60,1498,4,11],
  [2,65,1498,4,12],[2,70,1498,4,13],[2,73,1498,4,14],
  [2,75,1498,4,14],[2,85,1498,4,14],[2,92,1498,4,15],
  [2,101,1498,4,15],[2,109,1498,4,15],
  [3,3,1498,4,15],[6,1,1498,4,24],[6,38,1498,5,10],
  [6,40,1498,5,10],[6,70,1498,5,15],[6,80,1498,5,17],
  [6,85,1498,5,17],[6,92,1498,5,18],
  [7,1,1498,5,18],[7,16,1498,5,20],[7,24,1498,5,20],
  [7,30,1498,5,20],[7,44,1498,5,28],[7,49,1498,5,28],
  [7,59,1498,5,28],[7,65,1498,5,28],[7,67,1498,5,29],
  [7,73,1498,5,29],[8,1,1498,5,29],[8,44,1498,5,29],
  [8,45,1498,6,1],[8,51,1498,6,2],[8,59,1498,6,3],
  [8,64,1498,6,4],[8,79,1498,8,20],[8,90,1498,8,25],
  [8,94,1498,8,27],[9,1,1498,8,28],[9,5,1498,8,28],
  [9,9,1498,8,29],[9,14,1498,8,30],
  // The Island of Love has no literal location or dated arrival in the poem.
  // Position its allegorical encounter in an approximate homeward interval.
  [9,51,1499,6,1],[9,65,1499,6,1],[9,66,1499,6,1],
  [9,75,1499,6,1],[9,85,1499,6,1],
  [10,1,1499,6,1],[10,10,1499,6,1],[10,73,1499,6,1],
  [10,75,1499,6,1],[10,77,1499,6,1],[10,80,1499,6,1],
  [10,92,1499,6,1],[10,105,1499,6,1],[10,120,1499,6,1],
  [10,125,1499,6,1],[10,138,1499,6,1],[10,142,1499,6,1],
  // The surviving journal does not settle Gama's return day; late August is a
  // neutral display position and is identified as such in the Lore page.
  [10,144,1499,8,29],
]

const historyAnchors = [
  [3,21,1090],[3,23,1096],[3,30,1128],[3,35,1128],
  [3,42,1139,7,25],[3,55,1147],[3,68,1169],
  [3,70,1169],[3,83,1185],[3,85,1185],[3,90,1211],
  [3,91,1223],[3,94,1248],[3,96,1279],[3,98,1325],
  [3,102,1340],[3,107,1340],[3,118,1355],
  [3,120,1355],[3,123,1355],[3,125,1355],[3,130,1355],
  [3,135,1355],[3,136,1357],[3,138,1367],
  [4,1,1383],[4,4,1383],[4,12,1385],
  [4,21,1385,8,14],[4,28,1385,8,14],[4,35,1385,8,14],
  [4,41,1385,8,14],[4,45,1385,8,15],[4,48,1415],
  [4,50,1433],[4,51,1433],[4,52,1437],[4,54,1438],
  [4,57,1476],[4,58,1476],[4,60,1481],[4,66,1495],[4,68,1495],
  [4,76,1497],[6,43,1400],[6,50,1400],[6,60,1400],
]

const ownFrames = new Set(['poet','recounted-history','recounted-geography','recounted-vision'])
export function clockFor(frame,canto,start) {
  if (frame==='poet'||frame==='poet-voyage') return 'poet'
  if (frame==='recounted-history'||frame==='recounted-geography'||frame==='recounted-vision') {
    return canto===6 ? 'tale' : 'history'
  }
  if (frame.startsWith('mythic')||frame.startsWith('recounted-mythic')||frame==='voyage-mythic') return 'myth'
  if (frame==='mythic-voyage') return 'myth'
  if (frame==='recounted-voyage'||frame==='voyage'||frame==='voyage-frame'||frame==='voyage-frame-history') return 'voyage'
  throw Error(`No clock for ${canto}:${start} ${frame}`)
}

function nearestAnchor(anchors,canto,start) {
  const same = anchors.filter(a=>a[0]===canto).sort((a,b)=>a[1]-b[1])
  const before = [...same].reverse().find(a=>a[1]<=start)
  const after = same.find(a=>a[1]>start)
  if (!before && !after) return null
  if (!before) return day(...after.slice(2))
  if (!after) return day(...before.slice(2))
  const first = day(...before.slice(2)), last=day(...after.slice(2))
  return first+(last-first)*(start-before[1])/(after[1]-before[1])
}

export function positionFor(canto,start,frame) {
  const clock=clockFor(frame,canto,start)
  if (clock==='poet') return day(1572,1,1)+(canto-1)/20+start/10000
  if (clock==='tale') return day(1400,1,1)+start/1000
  if (clock==='history') {
    const anchor=nearestAnchor(historyAnchors,canto,start)
    if (anchor===null) throw Error(`Missing history anchor ${canto}:${start}`)
    return anchor
  }
  if (clock==='voyage') {
    const anchor=nearestAnchor(voyageAnchors,canto,start)
    if (anchor===null) throw Error(`Missing voyage anchor ${canto}:${start}`)
    return anchor
  }
  // Separate mythic clock follows the voyage's narrated moment without
  // turning Olympus or the allegorical island into physical ports.
  if (canto===1) return day(1498,3,2)+start/1000
  if (canto===2) return day(1498,4,8)+start/1000
  if (canto===5) return day(1497,11,22)+start/1000
  if (canto===6) return day(1498,5,10)+start/1000
  if (canto===8) return day(1498,6,1)+start/1000
  if (canto===9) return start<51 ? day(1498,8,30)+start/1000 : day(1499,6,1)+start/1000
  if (canto===10) return day(1499,6,1)+0.1+start/1000
  throw Error(`Missing mythic position ${canto}:${start}`)
}

export const sceneClocks=cuts.map((entries,cantoIndex)=>entries.map(([start,,,frame])=>({
  canto:cantoIndex+1,start,frame,timeline:clockFor(frame,cantoIndex+1,start),
  inWorldTime:positionFor(cantoIndex+1,start,frame),
})))

// The printed order remains on chapter and event sortOrder; elapsed time is
// measured only between entries on the same clock and cannot be negative.
const previous=new Map()
for(const scene of sceneClocks.flat()) {
  const earlier=previous.get(scene.timeline)
  scene.travelDays=earlier===undefined?0:Math.max(0,scene.inWorldTime-earlier)
  scene.isFlashback=scene.timeline==='history'||scene.timeline==='tale'||scene.frame==='recounted-voyage'
  previous.set(scene.timeline,scene.inWorldTime)
}
