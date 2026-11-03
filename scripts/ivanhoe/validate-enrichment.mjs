import fs from 'node:fs'
import {validateEnrichment} from './enrichment-validation.mjs'
import {readReleaseApproval} from './release-approval.mjs'
const book=new URL('./',import.meta.url)
const result=validateEnrichment(JSON.parse(fs.readFileSync(new URL('./authoring-review.pwk',book),'utf8')))
fs.writeFileSync(new URL('./ENRICHMENT_VALIDATION.json',book),JSON.stringify(result,null,2)+'\n')
console.log(JSON.stringify({...result,initialNames:{checked:result.initialNames.length,allKnownByFirstAppearance:result.initialNames.every(row=>row.knownInNarrativeByFirstAppearance)}},null,2))
if(process.argv.includes('--release'))readReleaseApproval(fs.readFileSync(new URL('./authoring-review.pwk',book)))
