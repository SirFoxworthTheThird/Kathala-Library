import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { directlyInterpolatesSceneTitle, repairWorldSnapshotStatuses } from './lib/snapshot-status-quality.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const library = path.join(root, 'library')
const targets = new Set([
  'a-princess-of-mars',
  'call-of-cthulhu',
  'carmilla',
  'kidnapped',
  'os-maias',
  'the-iliad',
  'the-name-of-the-wind',
  'the-thirty-nine-steps',
  'the-war-of-the-worlds',
  'the-wise-man-s-fear',
])

const report = []
for (const slug of [...targets].sort()) {
  const filename = path.join(library, `${slug}.pwk`)
  const original = fs.readFileSync(filename, 'utf8')
  const world = JSON.parse(original)
  const changed = repairWorldSnapshotStatuses(world)

  const events = new Map(world.events.map(event => [event.id, event]))
  const remaining = world.characterSnapshots.filter(snapshot => {
    const event = events.get(snapshot.eventId)
    return event && directlyInterpolatesSceneTitle(snapshot.statusNotes, event.title)
  })
  if (remaining.length) throw new Error(`${slug}: ${remaining.length} direct scene-title interpolations remain`)

  const pretty = original.includes('\n  "')
  fs.writeFileSync(filename, JSON.stringify(world, null, pretty ? 2 : 0) + (original.endsWith('\n') ? '\n' : ''))
  report.push({ slug, changed })
}

const indexFilename = path.join(library, 'index.json')
const index = JSON.parse(fs.readFileSync(indexFilename, 'utf8'))
for (const { slug } of report) {
  const entry = index.entries.find(candidate => candidate.id === slug)
  if (!entry) throw new Error(`${slug}: catalogue entry is missing`)
  entry.dataBytes = fs.statSync(path.join(library, entry.data)).size
}
fs.writeFileSync(indexFilename, `${JSON.stringify(index, null, 2)}\n`)

console.log(JSON.stringify({ books: report.length, snapshots: report.reduce((n, row) => n + row.changed, 0), report }, null, 2))
