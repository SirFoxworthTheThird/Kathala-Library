import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('joins the outside accomplices only after the two men have escaped the dormitory',()=>{
 const rows=enrichedReview().get(251)
 const escape=rows.find(row=>row.at===17),meeting=rows.find(row=>row.at===21)
 expect(escape.present.map(([key])=>key)).toEqual(['brujon','gueulemer'])
 expect(escape.actorLocations).toMatchObject({brujon:'la-force',gueulemer:'la-force'})
 expect(meeting).toMatchObject({location:'la-force',kind:'scene'})
 expect(meeting.present.map(([key])=>key)).toEqual(['brujon','gueulemer','babet','montparnasse'])
})

test('keeps the stranded prisoner above the men discussing his rescue',()=>{
 const rows=enrichedReview().get(251)
 for(const at of[39,59,86])expect(rows.find(row=>row.at===at).actorLocations.thenardier).toBe('rue-roi-sicile-ruin-wall')
 const descent=rows.find(row=>row.at===108)
 expect(descent.actorLocations).toMatchObject({gueulemer:'rue-roi-sicile-ruin-enclosure',thenardier:'rue-roi-sicile-ruin'})
})
