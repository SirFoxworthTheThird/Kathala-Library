import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { validatePresence } from '../scripts/little-women/validate-presence.mjs'
import { locationFor } from '../scripts/little-women/world-ledger.mjs'

const world = JSON.parse(readFileSync(new URL('../library/little-women.pwk', import.meta.url), 'utf8'))
const imageLayout = JSON.parse(readFileSync(new URL('../scripts/little-women/map-layout.json', import.meta.url), 'utf8'))
const event = (title: string) => world.events.find((row: any) => row.title === title)
const cast = (title: string) => event(title).involvedCharacterIds.map((id: string) =>
  world.characters.find((row: any) => row.id === id).name).sort()

describe('Little Women source presence regressions', () => {
  it('reviews every scene and retains the explicit long intervals and parallel account', () => {
    expect(validatePresence(world)).toBe(641)
    expect(event('Three Years Later').inWorldTime - event('The Curtain Falls on Part One').inWorldTime).toBeGreaterThanOrEqual(1095)
    expect(event('Apple-Picking Day').inWorldTime - event('Plumfield Begins').inWorldTime).toBe(1825)
    expect(event('A Year of Work and Waiting').inWorldTime - event('Work and Wait').inWorldTime).toBe(365)
    expect(event('Amy Writes Her Will').inWorldTime).toBeLessThan(event('Send for Mother').inWorldTime)
    expect(event('Amy Writes Her Will').isFlashback).toBe(true)
  })

  it('keeps window observers and indoor speakers in their individual places', () => {
    const snapshots = world.characterSnapshots.filter((s: any) => s.eventId === event('Jo Watches Beth').id)
    expect(snapshots.find((s: any) => s.characterId === 'little-women-char-laurie').currentLocationMarkerId).toBe('little-women-loc-marchyard')
    expect(snapshots.find((s: any) => s.characterId === 'little-women-char-beth').currentLocationMarkerId).toBe('little-women-loc-marchgateway')
    const copy = structuredClone(world)
    copy.characterSnapshots.find((s: any) => s.eventId === event('Jo Watches Beth').id && s.characterId === 'little-women-char-laurie').currentLocationMarkerId = 'little-women-loc-marchgateway'
    expect(() => validatePresence(copy)).toThrow()
  })

  it('includes Rob at the harvest and keeps the former duplicate Sallie as one person', () => {
    expect(cast('Apple-Picking Day')).toContain('Rob Bhaer')
    expect(world.characters.some((c: any) => c.id === 'little-women-char-salliemoffat')).toBe(false)
    expect(world.characters.find((c: any) => c.id === 'little-women-char-salliegardiner').nameChanges).toEqual([
      { eventId: event('John’s Work and Meg’s Waiting').id, name: 'Sallie Moffat' },
    ])
  })

  it('reports Aunt March’s death without creating an absent-person snapshot', () => {
    const report = event('A Year of Work and Waiting')
    const fact = world.knowledgeFacts.find((f: any) => f.tags.includes('offstage-death:little-women-char-auntmarch'))
    expect(fact.readerLearnsAtEventId).toBe(report.id)
    expect(report.involvedCharacterIds).not.toContain('little-women-char-auntmarch')
    expect(world.characterSnapshots.some((s: any) => s.characterId === 'little-women-char-auntmarch' && s.eventId === report.id)).toBe(false)
  })

  it('introduces and transfers the actual Christmas books, saved lock and piano', () => {
    const books = world.items.find((i: any) => i.id === 'little-women-item-pilgrim-books')
    expect(books.name).toBe('Four Christmas guidebooks')
    expect(world.itemPlacements.find((p: any) => p.itemId === books.id).eventId).toBe(event('Books Under the Pillows').id)
    const holder = world.characterSnapshots.find((s: any) => s.eventId === event('How Jo Sold Her Hair').id && s.characterId === 'little-women-char-marmee')
    expect(holder.inventoryItemIds).toContain('little-women-item-jo-hair')
    expect(world.itemPlacements.find((p: any) => p.itemId === 'little-women-item-beth-piano' && p.eventId === event('The Room Made Dear').id).locationMarkerId).toBe('little-women-loc-marchbedrooms')
  })
  it('converts top-down artwork pixels to Leaflet coordinates on every layer', () => {
    for (const [map, points] of Object.entries(imageLayout)) {
      const layer = world.mapLayers.find((row: any) => row.id === `little-women-map-${map}`)
      for (const [key, point] of Object.entries(points as Record<string, number[]>)) {
        const marker = world.locationMarkers.find((row: any) => row.id === `little-women-loc-${key.toLowerCase()}`)
        expect(marker.x, key).toBe(point[0])
        expect(marker.y, key).toBe(layer.imageHeight - point[1])
      }
    }
  })
  it('preserves every source-bound cast and location correction in the ledger and export', () => {
    expect(validatePresence(world)).toBeGreaterThanOrEqual(73)
  })

  it('rejects the former absent-cast and wrong-room mutations', () => {
    for (const corrupt of [
      (copy: any) => copy.events.find((row: any) => row.title === 'Three Days Without Bhaer').involvedCharacterIds.push('little-women-char-professorbhaer'),
      (copy: any) => { copy.events.find((row: any) => row.title === 'A Bargain to Do Good').locationMarkerId = 'little-women-loc-laurencegrounds' },
      (copy: any) => { copy.characterSnapshots.find((row: any) => row.eventId === event('Beth Dies at Dawn').id && row.characterId === 'little-women-char-beth').isAlive = true },
    ]) {
      const copy = structuredClone(world)
      corrupt(copy)
      expect(() => validatePresence(copy)).toThrow()
    }
  })

  it('rejects unknown location aliases instead of guessing from their spelling', () => {
    expect(locationFor('marchGarden')).toBe('marchYard')
    expect(locationFor('marchHouseSteps')).toBe('marchHall')
    expect(locationFor('laurenceDrawingRoom')).toBe('laurenceParlor')
    expect(() => locationFor('unreviewedMarchGarden')).toThrow(/No reviewed location/)
  })
  it.each([
    ['Three Days Without Bhaer', ['Jo March', 'Marmee']],
    ['Bhaer Is Going West', ['Jo March', 'Professor Bhaer']],
    ['In the Garret', ['Jo March', 'Professor Bhaer']],
    ['Work and Wait', ['Jo March', 'Professor Bhaer']],
    ['A Favor for Tina', ['Jo March', 'Professor Bhaer']],
    ['A Bargain to Do Good', ['Amy March', 'Theodore “Laurie” Laurence']],
  ])('%s includes only its directly present cast', (title, expected) => {
    expect(cast(title as string)).toEqual((expected as string[]).slice().sort())
  })

  it('locates the drawing-room conversation indoors', () => {
    const room = world.locationMarkers.find((row: any) => row.id === event('A Bargain to Do Good').locationMarkerId)
    expect(room.id).toBe('little-women-loc-laurenceparlor')
  })

  it('keeps Beth dead during the physical farewell and out of later memories', () => {
    const death = event('Beth Dies at Dawn')
    const later = world.characterSnapshots.filter((row: any) => row.characterId === 'little-women-char-beth' &&
      event('Beth Dies at Dawn').sortOrder <= world.events.find((e: any) => e.id === row.eventId).sortOrder)
    expect(later.map((row: any) => world.events.find((e: any) => e.id === row.eventId).title)).toEqual([
      death.title, 'Made Ready for Sleep', 'The Empty Room',
    ])
    expect(later.every((row: any) => row.isAlive === false)).toBe(true)
    // Presence before death remains represented; absence checks must not pass on an empty world.
    expect(cast('Beth Finds My Beth')).toEqual(['Beth March', 'Jo March'])
  })
})
