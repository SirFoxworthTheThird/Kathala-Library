import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { authoredStates, applyAuthoredSnapshotStates } from '../scripts/lib/authored-snapshot-states.mjs'
import { repairSnapshotStatus } from '../scripts/lib/snapshot-status-quality.mjs'

type Event = { id: string; title: string }
type Snapshot = { id: string; eventId: string; statusNotes?: string }
type World = { events?: Event[]; characterSnapshots?: Snapshot[] }

const library = path.resolve(__dirname, '..', 'library')
const files = fs.readdirSync(library).filter(name => name.endsWith('.pwk')).sort()
const authoredFiles = files.filter(filename => authoredStates.has(JSON.parse(fs.readFileSync(path.join(library, filename), 'utf8')).world.name))
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function directlyInterpolatesSceneTitle(note: string, title: string): boolean {
  const escaped = escapeRegExp(title)
  return new RegExp(`[“”�"]${escaped}[,;:]?[“”�"]`).test(note)
    || new RegExp(`\\b(?:during|through|in)\\s+${escaped}(?=[.!?]|$)`).test(note)
}

describe('Library character snapshot states', () => {
  test('requires authored prose rather than synthesizing a status from generic action labels', () => {
    expect(() => repairSnapshotStatus('Laura acts at the center of “The Visit”.', {
      id: 'visit', title: 'The Visit', description: 'A stranger arrives at the castle.',
    }, 'Laura')).toThrow(/authored state/)
  })

  test('Carmilla distinguishes the symptom, examination, and warning in the same scene', () => {
    const world = JSON.parse(fs.readFileSync(path.join(library, 'carmilla.pwk'), 'utf8'))
    const event = world.events.find((entry: Event) => entry.title === 'The Blue Mark')
    const states = world.characterSnapshots.filter((snapshot: Snapshot) => snapshot.eventId === event.id)
    expect(states.find((snapshot: { characterId: string }) => snapshot.characterId === 'carmilla-char-laura').statusNotes).toMatch(/Shows.*mark/)
    expect(states.find((snapshot: { characterId: string }) => snapshot.characterId === 'carmilla-char-doctor').statusNotes).toMatch(/Inspects.*warns/)
    expect(states.find((snapshot: { characterId: string }) => snapshot.characterId === 'carmilla-char-father').statusNotes).toMatch(/Receives.*assessment/)
  })

  test.each(authoredFiles)('%s keeps authored states stable and rejects changed cast assignments', filename => {
    const world = JSON.parse(fs.readFileSync(path.join(library, filename), 'utf8'))
    expect(applyAuthoredSnapshotStates(world)).toBe(0)
    const original = world.characterSnapshots[0].statusNotes
    world.characterSnapshots[0].statusNotes = 'takes a distinct part in the immediate action.'
    expect(applyAuthoredSnapshotStates(world)).toBe(1)
    expect(world.characterSnapshots[0].statusNotes).toBe(original)
    world.characterSnapshots[0].characterId = 'unreviewed-character'
    expect(() => applyAuthoredSnapshotStates(world)).toThrow(/cast changed/)
  })

  test.each(files)('%s omits generic action labels and appended scene summaries', filename => {
    const world = JSON.parse(fs.readFileSync(path.join(library, filename), 'utf8')) as World
    const filler = /(?:leads|experiences|part in) the immediate action|distinct (?:part|position)|is physically present|central action|At this moment:|intervém em com|procura em proteger|Supports Kvothe with warmth and loyalty|Holds her ground in the mercenary party|observing events while trying to reason and survive/i
    const offenders = (world.characterSnapshots ?? []).filter(snapshot => filler.test(snapshot.statusNotes ?? ''))
    expect(offenders.map(snapshot => snapshot.id)).toEqual([])
  })

  test.each(files)('%s uses event-specific state instead of scene-title templates', filename => {
    const world = JSON.parse(fs.readFileSync(path.join(library, filename), 'utf8')) as World
    const events = new Map((world.events ?? []).map(event => [event.id, event]))
    const offenders = (world.characterSnapshots ?? []).flatMap(snapshot => {
      const event = events.get(snapshot.eventId)
      const note = snapshot.statusNotes?.trim() ?? ''
      if (!event || !directlyInterpolatesSceneTitle(note, event.title)) return []
      return [`${snapshot.id} (${event.title}): ${note}`]
    })

    expect(offenders, offenders.join('\n')).toEqual([])
  })
})
