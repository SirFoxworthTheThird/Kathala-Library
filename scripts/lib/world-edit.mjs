/*
  An edit to a shipped world that says what it replaces.

  The worlds are their own source: most books have no generator, so a revision
  is a script that opens the `.pwk`, changes it and writes it back. Written as
  "set this field to that", such a script silently overwrites whatever is there
  now — including a fix someone else made since. Written as "this field, which
  says X, now says Y", it refuses when the record has moved, and a second run
  changes nothing.

    const w = openWorld('jane-eyre')
    w.scene('jane-eyre-event-26-3', 'The Wedding Is Stopped')   // the anchor is still where we think
    w.set('characters', 'jane-eyre-char-bertha', 'name', 'Bertha …', 'The Woman in the Attic')
    w.save()

  `save` serialises exactly as the shelf does — two-space JSON and a final
  newline — so an untouched world round-trips byte for byte. Run
  `npm run catalogue` afterwards: the catalogue records each world's size.
*/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

export function openWorld(slug) {
  const file = path.join(root, 'library', `${slug}.pwk`)
  const world = JSON.parse(fs.readFileSync(file, 'utf8'))
  let changed = 0

  const record = (table, id) => {
    const r = table === 'world' ? world.world : (world[table] ?? []).find((x) => x.id === id)
    if (!r) throw new Error(`${slug}: ${table} ${id} not found`)
    return r
  }

  return {
    world,
    record,
    /** A field, from the value it has now to the one it should have. `undefined` removes it. */
    set(table, id, field, from, to) {
      const r = record(table, id)
      if (same(r[field], to)) return
      if (!same(r[field], from)) {
        throw new Error(`${slug}: ${table} ${id}.${field} expected ${JSON.stringify(from)}, found ${JSON.stringify(r[field])}`)
      }
      if (to === undefined) delete r[field]
      else r[field] = to
      changed++
    },
    /**
     * Rewrite part of a text field, where it still says what it said. Idempotent
     * by construction: once the pattern no longer matches, there is nothing to do.
     */
    replace(table, id, field, pattern, replacement) {
      const r = record(table, id)
      if (typeof r[field] !== 'string' || !pattern.test(r[field])) return
      pattern.lastIndex = 0
      r[field] = r[field].replace(pattern, replacement)
      changed++
    },
    /** A new record, once: a second run finds it already there and leaves it. */
    add(table, value) {
      const rows = (world[table] ??= [])
      const there = rows.find((x) => x.id === value.id)
      if (there) {
        if (!same(there, value)) throw new Error(`${slug}: ${table} ${value.id} exists and differs`)
        return
      }
      rows.push(value)
      changed++
    },
    /** Insist a scene is still the one a change is anchored to. */
    scene(id, title) {
      const e = record('events', id)
      if (e.title !== title) throw new Error(`${slug}: ${id} is "${e.title}", not "${title}"`)
      return id
    },
    save() {
      fs.writeFileSync(file, `${JSON.stringify(world, null, 2)}\n`)
      console.log(`${slug}: ${changed} change${changed === 1 ? '' : 's'}`)
    },
  }
}
