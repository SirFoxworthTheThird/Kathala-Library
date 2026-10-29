import fs from 'node:fs'
import {expect,test}from 'vitest'
import {applyIllustratedMaps}from '../scripts/les-miserables/map-illustration-review.mjs'
import {illustratedMapRegistration}from '../scripts/les-miserables/map-registration-plan.mjs'
import {loadBaseMapLayouts,loadMapLayouts,validateLocationPlans}from '../scripts/les-miserables/validate-location-plans.mjs'

const read=()=>JSON.parse(fs.readFileSync(new URL('../scripts/les-miserables/MAP_ILLUSTRATION_ACCEPTANCE.json',import.meta.url),'utf8'))

test('uses reviewed illustrations and newly registered dimensions rather than temporary diagrams',()=>{
  const layouts=loadMapLayouts()
  expect(layouts['chanvrerie-streets'].image).toBe('chanvrerie-streets-illustrated.webp')
  expect([layouts['chanvrerie-streets'].width,layouts['chanvrerie-streets'].height]).toEqual([1484,1060])
  expect(layouts['paris-hospital-quarter'].locations['rue-petit-banquier-low-wall']).toEqual([198,325])
  expect(layouts['paris-hospital-quarter'].locations['gorbeau-house-entrance']).toEqual([578,414])
  const report=validateLocationPlans()
  expect(report.stagedIllustratedMaps.slice().sort()).toEqual(['arras-court','arras-town','atlantic-context','bastille-elephant-exterior','bastille-elephant-interior','bishop-first-floor','bishop-ground-floor','cafe-musain','chanvrerie-streets','corinthe-first-floor','corinthe-ground-floor','digne','digne-civic-details','fantine-rented-rooms','faverolles-village','france','gillenormand-details','gorbeau-lodgings','homme-arme-rooms','hougomont-details','la-force-details','larks-meadow','luxembourg-details','mabeuf-cottage','madeleine-premises','montfermeil-country','montreuil-town','orion-deck','orion-main-yard','paris','paris-cafe-details','paris-carriage-details','paris-environs','paris-hospital-quarter','paris-les-halles','paris-lodging-details','paris-public-room-details','paris-room-details','paris-sewers','pere-lachaise-corner','petit-picpus-interiors','petit-picpus-site','picpus-approaches','plumet-house','roi-sicile-ruin','southern-country','southern-local-details','thenardier-inn-details','toulon-harbour','vaugirard-cemetery','vernon-details','villers-source-details','waterloo-country'])
  expect(report.mapsAwaitingIllustratedReplacement).toEqual([])
  expect(report.releaseComplete).toBe(false)
})

test('returns independent marker arrays for each loaded map',()=>{
  const first=loadMapLayouts()
  first['bishop-ground-floor'].locations['bishop-bedroom'][0]=0
  delete first['bishop-ground-floor'].locations['bishop-house']
  const second=loadMapLayouts()
  expect(second['bishop-ground-floor'].locations['bishop-bedroom']).toEqual([845,820])
  expect(second['bishop-ground-floor'].locations['bishop-house']).toEqual([330,650])
})

test('does not treat an existing image file as visual acceptance',()=>{
  const result=applyIllustratedMaps(loadBaseMapLayouts(),{images:[]})
  expect(result.accepted).toEqual([])
  expect(result.pending).toHaveLength(53)
  expect(result.layouts['chanvrerie-streets'].image).toBe('chanvrerie-streets.webp')
})

test('rejects a stale image approval and a changed marker position',()=>{
  const stale=read()
  stale.images[0].encodedSha256='0'.repeat(64)
  expect(()=>applyIllustratedMaps(loadBaseMapLayouts(),stale)).toThrow('fresh visual review')
  const changed=structuredClone(illustratedMapRegistration)
  changed['chanvrerie-streets'].locations.corinthe=[100,100]
  expect(()=>applyIllustratedMaps(loadBaseMapLayouts(),read(),changed)).toThrow('positions need fresh visual review')
})

test('rejects omitting a marker or restoring the schematic after illustration approval',()=>{
  const incomplete=structuredClone(illustratedMapRegistration)
  delete incomplete['chanvrerie-streets'].locations['corinthe-door']
  expect(()=>applyIllustratedMaps(loadBaseMapLayouts(),read(),incomplete)).toThrow('All map markers need fresh registration')
  const old=loadMapLayouts()
  old['chanvrerie-streets'].image='chanvrerie-streets.webp'
  expect(()=>validateLocationPlans(old)).toThrow('Approved illustration reference not applied')
})
