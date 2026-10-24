import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

type Event = { id: string; title: string }
type Snapshot = { id: string; eventId: string; statusNotes?: string }
type World = { events?: Event[]; characterSnapshots?: Snapshot[] }

const library = path.resolve(__dirname, '..', 'library')
const files = fs.readdirSync(library).filter(name => name.endsWith('.pwk')).sort()
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function directlyInterpolatesSceneTitle(note: string, title: string): boolean {
  const escaped = escapeRegExp(title)
  return new RegExp(`[“”�"]${escaped}[,;:]?[“”�"]`).test(note)
    || new RegExp(`\\b(?:during|through|in)\\s+${escaped}(?=[.!?]|$)`).test(note)
}

describe('Library character snapshot states', () => {
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
