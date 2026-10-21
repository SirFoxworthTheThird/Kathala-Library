import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
const root=process.cwd(),app=path.resolve(root,'../Kathala-anne-qa')
const {chromium}=createRequire(path.join(app,'package.json'))('@playwright/test')
const bytes=fs.readFileSync('library/little-women.pwk'),w=JSON.parse(bytes)
const browser=await chromium.launch({headless:true})
try{
 const page=await browser.newPage();await page.goto('http://127.0.0.1:5173')
 const issues=await page.evaluate(async w=>{
  const {computeContinuityIssues}=await import('/src/lib/continuity/computeIssues.ts')
  return computeContinuityIssues({worldId:w.world.id,world:w.world,chapters:w.chapters,allEvents:w.events,characters:w.characters,rels:w.relationships,items:w.items,snapshots:w.characterSnapshots,knowledgeFacts:w.knowledgeFacts,knowledgeReveals:w.knowledgeReveals,sceneTexts:w.sceneTexts,allRelSnaps:w.relationshipSnapshots,allItemPlacements:w.itemPlacements,allLocationSnapshots:w.locationSnapshots,allMarkers:w.locationMarkers,allLayers:w.mapLayers,travelModes:w.travelModes,allMovements:w.characterMovements,artifacts:w.crossTimelineArtifacts,allMapRoutes:w.mapRoutes,allMapRegions:w.mapRegions,allRegionSnapshots:w.mapRegionSnapshots,allFactions:w.factions,allMemberships:w.factionMemberships,allFactionRels:w.factionRelationships,allItemSnapshots:w.itemSnapshots,plotThreads:w.plotThreads})
 },w)
 const counts={};for(const issue of issues)counts[issue.severity+':'+issue.kind]=(counts[issue.severity+':'+issue.kind]??0)+1
 const report={worldSha256:crypto.createHash('sha256').update(bytes).digest('hex'),counts,issues}
 const review=JSON.parse(fs.readFileSync('scripts/little-women/PROSE_MATCH_REVIEW.json','utf8'))
 assert.equal(review.worldSha256,report.worldSha256,'prose-match review belongs to a different export')
 assert.equal(review.errors,0);assert.equal(review.warnings,0);assert.equal(review.notices.length,issues.length)
 for(const issue of issues)assert.ok(review.notices.some(row=>row.scene===issue.eventId&&row.message===issue.message&&row.classification==='false-positive'),`unreviewed continuity notice ${issue.id}`)
 fs.writeFileSync('scripts/little-women/qa/continuity.json',JSON.stringify(report,null,2)+'\n')
 console.log(JSON.stringify({counts,first:issues.filter(i=>i.severity!=='note').slice(0,30)},null,2))
 if(issues.some(i=>i.severity!=='note'))throw Error('Actionable continuity issue remains')
}finally{await browser.close()}
