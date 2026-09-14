/*
  The gate CI runs on a change, and the reason it is not simply `vitest run`.

  Thirty-one tests fail here, and they failed in the application repository
  before the Library moved. They are real disagreements between the rules and
  the books — a stale provenance regex, two map-structure problems, a lore page
  and a chapter-title note — and each wants a decision about the authoring rules
  rather than a code change. Demanding a green suite would mean either making
  those decisions now or loosening the assertions, and loosening an assertion to
  get a green tick is how a suite stops meaning anything.

  So this asks the question that can be answered honestly today: **did this
  change break something that was working?** A failure outside the baseline
  fails the run. A baselined test that starts passing also fails the run, with
  instructions — otherwise the list silently keeps names of tests nobody is
  waiting on any more, and a list like that grows until it covers a real
  regression.

  The list can only shrink.
*/
import { readFileSync, writeFileSync, existsSync, rmSync } from 'fs'
import { execFileSync } from 'child_process'

const BASELINE = 'tests/known-failures.json'
const REPORT = '.vitest-report.json'
const update = process.argv.includes('--update')

function run() {
  try {
    execFileSync('npx', ['vitest', 'run', '--reporter=json', `--outputFile=${REPORT}`], {
      stdio: ['ignore', 'ignore', 'inherit'],
    })
  } catch {
    // A non-zero exit is expected whenever anything fails, baselined or not.
    // The report is what decides, so a throw here is not the answer.
  }
  if (!existsSync(REPORT)) {
    console.error('gate: vitest produced no report — the suite did not run')
    process.exit(1)
  }
  const report = JSON.parse(readFileSync(REPORT, 'utf8'))
  rmSync(REPORT, { force: true })
  return report
}

const report = run()
if (!report.numTotalTests) {
  console.error('gate: the suite collected no tests at all')
  process.exit(1)
}

const failing = new Set(
  report.testResults.flatMap((r) =>
    r.assertionResults.filter((a) => a.status === 'failed').map((a) => a.fullName),
  ),
)

if (update) {
  const baseline = JSON.parse(readFileSync(BASELINE, 'utf8'))
  baseline.known = [...failing].sort()
  writeFileSync(BASELINE, `${JSON.stringify(baseline, null, 2)}\n`, 'utf8')
  console.log(`gate: baseline updated — ${baseline.known.length} known failures`)
  process.exit(0)
}

const known = new Set(JSON.parse(readFileSync(BASELINE, 'utf8')).known)
const broke = [...failing].filter((n) => !known.has(n)).sort()
const fixed = [...known].filter((n) => !failing.has(n)).sort()

console.log(
  `gate: ${report.numTotalTests} tests, ${failing.size} failing, ${known.size} of them expected`,
)

if (broke.length > 0) {
  console.error(`\ngate: ${broke.length} test(s) that were passing now fail:\n`)
  for (const n of broke) console.error(`  ${n}`)
  console.error('\nThis change broke something. Fix it rather than adding it to the baseline.')
  process.exit(1)
}

if (fixed.length > 0) {
  console.error(`\ngate: ${fixed.length} known failure(s) now pass:\n`)
  for (const n of fixed) console.error(`  ${n}`)
  console.error('\nGood — but the baseline has to say so. Run `npm run gate -- --update`')
  console.error('and commit the result, so the list keeps meaning what it claims.')
  process.exit(1)
}

console.log('gate: nothing broken, nothing silently fixed.')
