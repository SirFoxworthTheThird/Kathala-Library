import fs from 'node:fs'
import { execFileSync } from 'node:child_process'

for (const slug of ['a-princess-of-mars', 'call-of-cthulhu', 'carmilla', 'kidnapped', 'the-thirty-nine-steps']) {
  const filename = `library/${slug}.pwk`
  const saved = fs.readFileSync(filename)
  const expected = new Map(JSON.parse(saved).characterSnapshots.map(snapshot => [snapshot.id, snapshot.statusNotes]))
  try {
    execFileSync(process.execPath, [`scripts/${slug}/generate.mjs`], { stdio: 'pipe' })
    const generated = JSON.parse(fs.readFileSync(filename))
    if (generated.characterSnapshots.length !== expected.size) throw new Error(`${slug}: snapshot count changed`)
    for (const snapshot of generated.characterSnapshots) {
      if (expected.get(snapshot.id) !== snapshot.statusNotes) throw new Error(`${slug}: regenerated status differs: ${snapshot.id}`)
    }
    console.log(`${slug}: ${expected.size} regenerated states match the published repair`)
  } finally {
    // Some legacy generators precede unrelated release migrations. Preserve the
    // validated publication even when those generators fail or differ elsewhere.
    fs.writeFileSync(filename, saved)
  }
}
