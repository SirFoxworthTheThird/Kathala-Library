import assert from 'node:assert/strict'
import {reviewedChapters} from './scene-review.mjs'
import {cutKey} from './scene-ranges.mjs'

// Editorial end-of-scene pins. Story day1 is1June1194. The relative days
// follow the source witnesses in CHRONOLOGY_REVIEW.md; clock times and otherwise
// unstated intervals are approximate editorial choices, not historical dates.
// Complete Julian month lengths; no invented weekday is assigned.
export const editorialCalendar={
  months:[['January',31],['February',28],['March',31],['April',30],['May',31],['June',30],['July',31],['August',31],['September',30],['October',31],['November',30],['December',31]].map(([name,days])=>({name,days})),
  startYear:1194,yearSuffix:'AD',leap:{month:1,days:1,every:4},
}
const clock=(day,hour)=>151+(day-1)+hour/24
// [chapter, first story day/hour, last story day/hour, optional source-cut pins]
export const chronologyFrames=[
 [1,1,20.75,1,21.1], [2,1,21.15,1,21.6],
 [3,1,21.65,1,22.1], [4,1,22.15,1,22.8], [5,1,22.85,1,23.8],
 [6,2,.2,2,7,[[27,2,5],[29,2,5.1],[65,2,6],[73,2,6.5]]],
 [7,3,9,3,11], [8,3,11.1,3,14], [9,3,14.1,3,21],
 [10,3,21.1,3,22.2,[[40,3,21.5]]], [11,3,22.25,3,23.7],
 [12,4,6,4,13.5,[[35,4,12],[49,4,13]]],
 [13,4,13.6,4,16], [14,4,18,4,20], [15,4,20.1,4,20.6],
 [16,4,22,5,22,[[4,5,21],[8,5,21.15],[12,5,21.3]]],
 [17,5,22.1,6,.5],
 [18,4,13.5,5,14,[[17,5,9],[39,5,14]]],
 [19,5,18,5,21], [20,6,0,6,2],
 [21,6,6,6,12.4,[[24,6,8],[29,6,9],[30,6,12],[47,6,12.3]]],
 [22,6,9,6,12.4,[[7,6,12]]],
 [23,6,11.9,6,12.4,[[4,6,12.05],[31,6,12.4]]],
 [24,6,11.5,6,12.4,[[58,6,12.4]]],
 [25,6,12.4,6,13.2,[[42,6,12.8]]],
 [26,6,13.25,6,13.6], [27,6,13.65,6,14],
 [28,4,14,6,14.1,[[12,3,8],[13,4,14.2],[19,4,21],[25,4,21.1],[36,4,21.2],[47,4,21.4],[55,5,8],[56,5,18],[58,5,20],[59,6,14],[60,6,14.1]]],
 [29,6,14.25,6,16], [30,6,16,6,17], [31,6,17,6,21],
 [32,7,7,7,10], [33,7,10.1,7,13],
 [34,7,8,7,16,[[22,7,14]]],
 [35,8,7,8,11,[[7,8,8],[16,8,9],[17,8,9.1]]],
 [36,8,11.1,8,12.1,[[53,8,12]]],
 [37,8,12.2,8,14], [38,8,14.1,8,17], [39,8,20,8,21],
 [40,8,8,8,13.5], [41,8,13.6,8,16], [42,8,16.1,8,18],
 [43,11,9,11,12.5,[[38,11,9.5],[66,11,11.5]]],
 [44,11,12.6,22,12,[[50,18,15],[51,20,11],[54,22,9]]],
]

export function compileChronology(world){
  world.world.calendar=editorialCalendar
  const evidence=[]
  for(const [chapter,startDay,startHour,endDay,endHour,extra=[]] of chronologyFrames){
    const review=reviewedChapters.find(c=>c.chapter===chapter)
    assert.ok(review,`Chronology chapter ${chapter}`)
    const points=new Map([[0,clock(startDay,startHour)],[review.scenes.length-1,clock(endDay,endHour)]])
    for(const [paragraph,day,hour] of extra){
      const index=review.scenes.findIndex(scene=>scene.from===paragraph&&!(scene.fromOffset??0))
      assert.ok(index>=0,`Chronology needs reviewed source cut ${chapter}.${paragraph}`)
      points.set(index,clock(day,hour))
    }
    const anchors=[...points].sort(([a],[b])=>a-b)
    for(const [index,scene] of review.scenes.entries()){
      let right=anchors.findIndex(([i])=>i>=index)
      if(right<0)right=anchors.length-1
      const [ri,rt]=anchors[right], [li,lt]=anchors[Math.max(0,right-1)]
      const time=ri===li?rt:lt+(rt-lt)*(index-li)/(ri-li)
      // Round the explicitly approximate interpolation to a minute.
      const pin=Math.round(time*1440)/1440
      const event=world.events.find(e=>e.id===`ivanhoe-source-${chapter+3}-${cutKey(scene)}`)
      assert.ok(event,`Chronology event ${chapter}:${cutKey(scene)}`)
      event.inWorldTime=pin
      evidence.push({eventId:event.id,sourceChapter:chapter,sourceFrom:scene.from,storyDay:Math.floor(pin)-150,hour:(pin-Math.floor(pin))*24,editorial:true,isRetrospective:event.isFlashback})
    }
  }
  // Paratext has no medieval scene date. These are presentation-frame pins,
  // explicitly explained in Lore, not dates of composition or publication.
  const first=clock(1,20),last=clock(22,12)
  for(const event of world.events){
    const number=world.chapters.find(c=>c.id===event.chapterId).number
    if(number<=3)event.inWorldTime=first
    else if(number>47)event.inWorldTime=last
    assert.ok(Number.isFinite(event.inWorldTime),`Finite editorial clock ${event.id}`)
  }
  let previous=null
  for(const event of world.events){
    event.travelDays=previous===null?0:Math.max(0,event.inWorldTime-previous)
    previous=event.inWorldTime
  }
  return {status:'DISCLOSED EDITORIAL CLOCK; MANUAL SOURCE AND APPLICATION APPROVAL RECORDED SEPARATELY',opening:'1 June 1194, editorial',basis:'Source relative days plus clearly disclosed approximate times; no claim to Richard’s historical itinerary',evidence}
}
