import fs from 'node:fs'
import { buildEnrichmentAudit } from './build-enrichment-audit.mjs'
import { validateManuscript } from './validate-manuscript.mjs'
import { validateReaderProjection } from './validate-enrichment.mjs'
import { reportedDispositions } from './reported-dispositions.mjs'
import { validateStagedArt } from './validate-staged-art.mjs'
import { validateLocationPlans } from './validate-location-plans.mjs'

// A release blocker report, not a replacement for the final world validator or
// visual QA. Its release mode must fail while the book is still in staging.
export function releaseReadiness() {
  validateManuscript(JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk', import.meta.url), 'utf8')))
  validateReaderProjection()
  const audit = buildEnrichmentAudit()
  const maps = validateLocationPlans()
  const unknownLocations = maps.unmappedSourceLocations
  const artwork = validateStagedArt()
  const missingPortraits = artwork.missingPortraits
  const checklist = fs.readFileSync(new URL('./REVIEW_CHECKLIST.md', import.meta.url), 'utf8')
  const unchecked = checklist.split(/\r?\n/).filter(line => /^- \[ \]/.test(line))
  const finalPath = new URL('../../library/les-miserables.pwk', import.meta.url)
  return {
    readyForRelease: false,
    sourceReconstruction: 'passed', boundaryReview: 'complete', readerIdentityProjection: 'passed',
    reviewedSegments: audit.scenes.length,
    secondPassReportedDialogueQueue: audit.scenes.filter(row => row.quotedReportedProse && !reportedDispositions.has(row.scene)).map(row => row.scene),
    unmappedSourceLocationKeys: unknownLocations,
    missingParentMaps: maps.missingParents,
    missingMapGatewayLocations: maps.missingGatewayLocations,
    mapsWithoutGateways: maps.missingGateways,
    rootMaps: maps.rootMaps,
    mapsAwaitingIllustratedReplacement: maps.mapsAwaitingIllustratedReplacement,
    missingProvisionalCharacterPortraits: missingPortraits,
    missingItemIllustrations:artwork.missingItemIllustrations,
    missingLocationIllustrations:artwork.missingLocationIllustrations,
    unreviewedEncodedIllustrations: artwork.unreviewedEncodings,
    visuallyAcceptedIllustrations: artwork.visuallyAccepted,
    // A role/reference may be excluded from the final roster only by a recorded
    // source decision, not by silently suppressing a missing image here.
    pendingGates: [
      'Finish direct-scene cast completeness and resolve every provisional entity decision; the quoted-report pass is separately tracked above.',
      'Finish the full-book review of the first chronology/pacing plans, items, inventories, factions, routes and reader-facing lore.',
      'Promote the complete-text review fixture only after all source and artwork ledgers pass final validation.',
      'Finish remaining portraits and ordinary location/object artwork; map illustrations do not satisfy those separate gates.',
      'Review all illustrated maps with the final book, including scene disclosure, character positions and playback; staged map-only registration/navigation checks have passed.',
      'Validate the downloadable Library copy in reading and full-data modes, including runtime health.',
      'Finish all applicable checklist items and deterministic final packaging.',
    ],
    uncheckedChecklistItems: unchecked,
    finalLibraryFileExists: fs.existsSync(finalPath),
    note: 'Passing the manuscript tests and identity projection does not make the edition ready. No local release claim is authorized by this report.',
  }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  const report = releaseReadiness()
  fs.writeFileSync(new URL('./RELEASE_BLOCKERS.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`)
  console.log(JSON.stringify({ readyForRelease: report.readyForRelease,
    reviewedSegments: report.reviewedSegments,
    secondPassReportedDialogueQueue: report.secondPassReportedDialogueQueue.length,
    unmappedSourceLocationKeys: report.unmappedSourceLocationKeys.length,
    missingProvisionalCharacterPortraits: report.missingProvisionalCharacterPortraits.length,
    uncheckedChecklistItems: report.uncheckedChecklistItems.length,
    finalLibraryFileExists: report.finalLibraryFileExists }, null, 2))
  if (process.argv.includes('--release')) process.exitCode = 1
}
