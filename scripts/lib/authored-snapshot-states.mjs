import { createHash } from 'node:crypto'
import { states as carmilla } from '../carmilla/snapshot-states.mjs'
import { states as cthulhu } from '../call-of-cthulhu/snapshot-states.mjs'
import { states as iliad } from '../the-iliad/snapshot-states.mjs'
import { states as maias } from '../os-maias/snapshot-states.mjs'
import { states as mars } from '../a-princess-of-mars/snapshot-states.mjs'
import { states as war } from '../the-war-of-the-worlds/snapshot-states.mjs'
import { states as kidnapped } from '../kidnapped/snapshot-states.mjs'
import { states as wind } from '../the-name-of-the-wind/snapshot-states.mjs'
import { states as fear } from '../the-wise-man-s-fear/snapshot-states.mjs'

export const authoredStates = new Map([
  ['Carmilla', carmilla], ['The Call of Cthulhu', cthulhu], ['The Iliad', iliad],
  ['Os Maias', maias], ['A Princess of Mars', mars], ['The War of the Worlds', war],
  ['Kidnapped', kidnapped], ['The Name of the Wind', wind], ["The Wise Man's Fear", fear],
])

const reviewedStructure = new Map([
  ['Carmilla', 'fe3213217b9d3740e3553e6074739f709d0061f40170bdf883739d597a7a183b'],
  ['The Call of Cthulhu', '3a4c75fde061fe727bb6e166792e66a02b1357c45fd57b6e1ee49d0af10598c3'],
  ['The Iliad', '379ab2ed849151ac9054e0b9f0a738637c7cb29408c51c9258d563690ca17c1e'],
  ['Os Maias', 'ceb5290526a3989eaef5d6e0219abfc552830771ea668d76223222f6683bf369'],
  ['A Princess of Mars', '53c2cb5b82034b233fb660082c51af08c69dacd0779fefa2f177ad5c754db746'],
  ['The War of the Worlds', 'c74fdffe325ed33a02d4dd90da8385458fef06c01a5d0922fb0603b72e72a792'],
  ['Kidnapped', 'd8da9bb8e9c0c7f74cca596152454a5a0d832d891eadad1eb1a95f051cca61eb'],
  ['The Name of the Wind', 'd5ad4f593455aeb4fe870a3dbd87a8070d57b53440d37b80c1b4d1f593956791'],
  ["The Wise Man's Fear", '390fc270d0fccd15b26d26bab51b99252b3463dbf97692e6d7c3d2780b7430f7'],
])

// These ledgers are intentionally complete: an added/reordered scene or changed
// cast must be reviewed rather than silently receiving a generated status.
export function applyAuthoredSnapshotStates(world) {
  const rows = authoredStates.get(world.world.name)
  if (!rows) return null
  // Carmilla's base generator precedes the separate name-reveal migration.
  // Both identities occupy the same reviewed role in the General's account.
  const identity = id => id === 'carmilla-char-millarca' ? 'carmilla-char-carmilla' : id
  const fingerprint = createHash('sha256').update(JSON.stringify([
    world.events.map(event => [event.id, event.title]),
    world.characterSnapshots.map(snapshot => [snapshot.eventId, identity(snapshot.characterId)]),
  ])).digest('hex')
  if (fingerprint !== reviewedStructure.get(world.world.name)) {
    throw new Error(`${world.world.name}: scene order or snapshot cast changed; review the authored state ledger`)
  }
  const queues = new Map()
  for (const [title, notes] of rows) {
    const queue = queues.get(title) ?? []
    queue.push(notes)
    queues.set(title, queue)
  }
  let changed = 0
  for (const event of world.events) {
    const snapshots = world.characterSnapshots.filter(snapshot => snapshot.eventId === event.id)
    const notes = queues.get(event.title)?.shift()
    if (!notes) throw new Error(`${world.world.name}: no authored states for ${event.title}`)
    if (snapshots.length !== notes.length) {
      throw new Error(`${world.world.name}: ${event.title}: ${snapshots.length} snapshots, ${notes.length} authored states`)
    }
    for (let index = 0; index < notes.length; index++) {
      if (snapshots[index].statusNotes !== notes[index]) {
        snapshots[index].statusNotes = notes[index]
        changed++
      }
    }
  }
  for (const [title, notes] of queues) {
    if (notes.length) throw new Error(`${world.world.name}: unused authored scene: ${title}`)
  }
  return changed
}
