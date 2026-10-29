import { expect, test } from 'vitest'
import { loadMapLayouts, validateLocationPlans } from '../scripts/les-miserables/validate-location-plans.mjs'

test('checks the connected staged hierarchy without concealing unfinished source coverage', () => {
  const report = validateLocationPlans()
  expect(report.maps).toBe(53)
  expect(report.missingParents).toEqual([])
  expect(report.missingGatewayLocations).toEqual([])
  expect(report.rootMaps).toEqual(['atlantic-context'])
  expect(report.missingGateways).toEqual([])
  expect(report.missingGatewayLocations).not.toContain('gorbeau-house-entrance')
  expect(report.unmappedSourceLocations).toEqual([])
  expect(report.releaseComplete).toBe(false)
  const layout = loadMapLayouts()
  expect(layout.digne.locations['digne-hospital'][1]).toBeGreaterThan(350)
  expect(layout['corinthe-first-floor'].locations['corinthe-first-floor']).toEqual([965,590])
})

test('rejects missing or off-image positions rather than assigning a default point', () => {
  const layouts = loadMapLayouts()
  delete layouts['bishop-ground-floor'].locations['bishop-bedroom']
  expect(() => validateLocationPlans(layouts)).toThrow('Place needs coordinates: bishop-bedroom')
  const offImage = loadMapLayouts()
  offImage.digne.locations['digne-palace'] = [2000,100]
  expect(() => validateLocationPlans(offImage)).toThrow('Point outside map: digne-palace')
})

test('rejects a point on the wrong floor and conflicting floor metadata', () => {
  const layouts = loadMapLayouts()
  layouts['corinthe-first-floor'].locations['corinthe-taproom'] = [700,600]
  expect(() => validateLocationPlans(layouts)).toThrow('Place plotted on wrong map: corinthe-taproom')
  const wrongFloor = loadMapLayouts()
  wrongFloor['corinthe-first-floor'].levelIndex = 0
  expect(() => validateLocationPlans(wrongFloor)).toThrow()
})
