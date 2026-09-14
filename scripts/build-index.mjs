/*
  Rebuild `library/index.json` from what is actually on disk.

  The catalogue used to be maintained by hand, and the parts of it that restate
  a fact about a file drifted every time: `dataBytes` went stale three separate
  times — a reader saw "1.3 MB" on the Download button for a 1.6 MB file, and
  nothing noticed until a test that happened to check it failed.

  So the derived fields are derived. Everything a person actually writes — the
  blurb, the notice, the author, the cover — is read from the existing entry and
  carried through untouched. This script will not invent prose, and it will not
  quietly drop a book: a world on disk with no entry is an error, because the
  words that belong to it are not something a script can supply.
*/
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from 'fs'
import { join } from 'path'

const LIBRARY = 'library'
const INDEX = join(LIBRARY, 'index.json')

/*
  `--check` writes nothing and fails if the catalogue is not what this script
  would produce. That is what CI runs: a book added without regenerating the
  catalogue is the failure this exists to prevent, and a check that silently
  fixed it in CI would let the repository and the deployed site disagree.
*/
const checkOnly = process.argv.includes('--check')

function fail(message) {
  console.error(`build-index: ${message}`)
  process.exit(1)
}

if (!existsSync(INDEX)) fail(`no catalogue at ${INDEX}`)
const index = JSON.parse(readFileSync(INDEX, 'utf8'))
const byData = new Map(index.entries.map((e) => [e.data, e]))

const worlds = readdirSync(LIBRARY).filter((f) => f.endsWith('.pwk')).sort()
if (worlds.length === 0) fail('no worlds found')

const missing = worlds.filter((w) => !byData.has(w))
if (missing.length > 0) {
  fail(
    `these worlds have no catalogue entry, and a blurb and notice cannot be generated:\n` +
    missing.map((m) => `  ${m}`).join('\n'),
  )
}

const orphaned = index.entries.filter((e) => !existsSync(join(LIBRARY, e.data)))
if (orphaned.length > 0) {
  fail(
    `these entries name a world that is not here:\n` +
    orphaned.map((e) => `  ${e.id} -> ${e.data}`).join('\n'),
  )
}

let changed = 0
for (const entry of index.entries) {
  const world = JSON.parse(readFileSync(join(LIBRARY, entry.data), 'utf8'))

  const derived = {
    dataBytes: statSync(join(LIBRARY, entry.data)).size,
    worldId: world.world.id,
    counts: {
      characters: (world.characters ?? []).length,
      chapters: (world.chapters ?? []).length,
      events: (world.events ?? []).length,
      locations: (world.locationMarkers ?? []).length,
    },
  }
  if (entry.images) {
    const p = join(LIBRARY, entry.images)
    if (!existsSync(p)) fail(`${entry.id} names an images bundle that is not here: ${entry.images}`)
    derived.imagesBytes = statSync(p).size
  }

  for (const [key, value] of Object.entries(derived)) {
    if (JSON.stringify(entry[key]) !== JSON.stringify(value)) {
      console.log(`  ${entry.id}: ${key} ${JSON.stringify(entry[key])} -> ${JSON.stringify(value)}`)
      entry[key] = value
      changed += 1
    }
  }
}

// Alphabetical past a leading article, as the app files the shelf (LIB-1), so
// the catalogue on disk reads in the order a reader sees.
const sortKey = (e) => e.title.replace(/^(the|a|an)\s+/i, '').toLocaleLowerCase()
index.entries.sort((a, b) => sortKey(a).localeCompare(sortKey(b)))

const next = `${JSON.stringify(index, null, 2)}\n`
const current = readFileSync(INDEX, 'utf8')

if (checkOnly) {
  if (next !== current) {
    fail(
      'the catalogue is out of date — run `npm run catalogue` and commit the result.\n' +
      (changed > 0
        ? `  ${changed} field(s) disagree with the files on disk (listed above)`
        : '  the entries are correct but not in the order the shelf files them'),
    )
  }
  console.log(`build-index: catalogue matches the ${index.entries.length} worlds on disk`)
  process.exit(0)
}

writeFileSync(INDEX, next, 'utf8')
console.log(
  next === current
    ? `build-index: ${index.entries.length} entries, nothing to correct`
    : `build-index: ${index.entries.length} entries, ${changed} field(s) corrected`,
)
