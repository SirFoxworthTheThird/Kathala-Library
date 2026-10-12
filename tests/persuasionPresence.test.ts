import { describe, expect, it } from 'vitest'

const world = JSON.parse(import.meta.glob('../library/persuasion.pwk', {
  eager: true, query: '?raw', import: 'default',
})['../library/persuasion.pwk'] as string)
const catalogue = JSON.parse(import.meta.glob('../library/index.json', {
  eager: true, query: '?raw', import: 'default',
})['../library/index.json'] as string)

describe('Persuasion presence regression', () => {
  it('does not turn names in the opening register or narrated ending into physical cast', () => {
    const opening = world.events.find((event: { id: string }) => event.id === 'persuasion-event-1-1')
    expect(opening.involvedCharacterIds).toEqual(['persuasion-char-sir-walter-elliot'])
    const ending = world.events.filter((event: { chapterId: string }) => event.chapterId === 'persuasion-chapter-24')
    expect(ending).toHaveLength(5)
    expect(ending.every((event: { involvedCharacterIds: string[] }) => event.involvedCharacterIds.length === 0)).toBe(true)
  })

  it('rejects the former scene-summary snapshot formula', () => {
    const notes = world.characterSnapshots.map((snapshot: { statusNotes: string }) => snapshot.statusNotes)
    expect(notes.length).toBeGreaterThan(300)
    expect(notes.every((note: string) => note.length > 20 && !/is present as|this scene/i.test(note))).toBe(true)
    expect(new Set(notes).size).toBe(notes.length)
  })

  it('keeps reported requests and source objects in their actual scenes', () => {
    const arrangements = world.events.find((event: { id: string }) => event.id === 'persuasion-event-5-2')
    expect(arrangements.involvedCharacterIds).not.toContain('persuasion-char-mary-musgrove')
    const lodge = world.locationMarkers.find((location: { name: string }) => location.name === 'Kellynch Lodge')
    for (const scene of [1, 2, 3]) {
      const event = world.events.find((entry: { id: string }) => entry.id === `persuasion-event-14-${scene}`)
      expect(event.locationMarkerId).toBe(lodge.id)
    }
    expect(world.items.map((item: { name: string }) => item.name)).toEqual([
      'Sir Walter’s Baronetage', 'Wentworth’s letter', 'Benwick’s miniature',
    ])
  })

  it('does not reveal late motives or matches in opening descriptions', () => {
    expect(world.world.description).not.toMatch(/engagement|reconciliation/i)
    const shelf = catalogue.entries.find((entry: { id: string }) => entry.id === 'persuasion')
    expect(shelf.blurb).not.toMatch(/broken engagement|eight years|reconciliation|Louisa.*Benwick/i)
    expect(shelf.notice).toContain('62 distinct artwork assets')
    const benwick = world.characters.find((character: { name: string }) => character.name === 'Captain Benwick')
    expect(benwick.description).not.toMatch(/new attachment|Louisa/i)
    const motive = world.characterGoals.find((goal: { characterId: string }) => goal.characterId === 'persuasion-char-william-elliot')
    const reveal = world.events.find((event: { title: string }) => event.title === 'Anne Leaves Convinced')
    expect(motive.startEventId).toBe(reveal.id)
  })
})
