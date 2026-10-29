import{expect,test}from'vitest'
import{enrichedReview}from'../scripts/les-miserables/build-enrichment-audit.mjs'

test('keeps the departed hotel host out of the continuing private discussion',()=>{
 const row=enrichedReview().get(181).find(r=>r.at===3)
 expect(row.present.some(([key])=>key==='hotel-porte-saint-jacques-proprietor')).toBe(true)
 expect(row.actorLocations?.['hotel-porte-saint-jacques-proprietor']).toBeNull()
 expect(row.location).toBe('hotel-porte-saint-jacques')
 expect(row.present.some(([key])=>key==='courfeyrac')).toBe(true)
})

test('does not hold the departing Eponine at the corner after her farewell',()=>{
 const row=enrichedReview().get(258).find(r=>r.at===24)
 expect(row.present.find(([key])=>key==='eponine')?.[1]).toMatch(/leaves/)
 expect(row.actorLocations?.eponine).toBeNull()
 expect(row.location).toBe('rue-plumet-boulevard-invalides-corner')
})
