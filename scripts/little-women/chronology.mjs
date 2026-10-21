// Relative reading days, not a reconstructed Gregorian calendar. Unstated
// durations are editorial. The novel's ages, seasons and quoted will date
// do not furnish one internally consistent absolute calendar.
const intervals=[
 [0,.5],[1,1.5],[8,8.5],[10,12],[30,30.5],[32,50],[55,55.5],
 [60,60.5],[80,95],[120,120.5],[170,178],[190,190.5],[205,205.5],
 [240,248],[320,320.5],[321,328],[329,330],[342,343],[330,342],
 [343,344],[345,348],[366,366.5],[367,367.5],
 [1462.5,1463],[1464,1464.5],[1490,1492],[1500,1839],
 [1495,1828],[1840,1840.5],[1850,1880],[1885,1950],
 [1960,1980],[1981,2040],[1982,2190],[2220,2240],[2241,2280],
 [2390,2390.5],[2260,2380],[2420,2421],[2281,2646],
 [2422,2680],[2647,2790],[2791,2791.5],[2792,2792.5],
 [2793,2793.5],[2794,2811],[3176,5062]
]
const special={
 'Amy Writes Her Will':330, // November 20; the December 1 crisis is later.
 'Reading Amy’s Will':330.1,
 'New Year’s Masquerade':2039,
 'The New Year’s Masquerade':2039,
 'A Library in One Book':2040,
 'Jo Inherits Plumfield':3200,
 'The Plumfield Vision':3200.1,
 'Plumfield Begins':3235,
 'Jo’s Own Little Sons':4500,
 'Apple-Picking Day':5060, // Exactly five relative years after the wedding.
 'The Harvest Toasts':5060.2,
 'The Sisters Compare Their Castles':5060.3,
 'Marmee’s Harvest':5060.4
}
export function sceneTime(chapter,index,count,title){
 const [start,end]=intervals[chapter-1]
 return special[title]??start+(end-start)*index/Math.max(1,count-1)
}
export function flashbackChapter(chapter){return [19,28,33,34,36,38,40,41,45].includes(chapter)}
export const chronologyNote='Relative editorial days preserve the source sequence through sort order while allowing parallel accounts and recollections to return to earlier time. The will dated November 20 precedes the December 1 crisis. Part II begins three relative years after Part I; Jo’s engagement lasts a year before its second year opens, and the harvest is five years after her wedding. Other durations are approximate reading aids. The source’s ages, seasons and quoted year do not establish a consistent Gregorian calendar; no absolute date is asserted.'
