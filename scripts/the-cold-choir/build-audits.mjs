import fs from 'node:fs'
import crypto from 'node:crypto'
import {chapters,sourceBytes,sourceSha256,normalize,narrativeText,countWords} from './source-text.mjs'
import {plans,splits} from './story-plan.mjs'

const sections=chapters.flatMap((chapter,chapterIndex)=>chapter.sections.map((section,sectionIndex)=>({chapterIndex,sectionIndex,chapter,section})))
const boundaryReasons={
 2:'Cut after the bedside exchange because Ilse leaves medbay, Oyelaran ceases to be directly present, and Tamsin enters the corridor scene.',
 5:'Cut when salvage outside the wreck ends and the action resumes inside the Pelican galley.',
 7:'Cut when the formal council disperses and the remaining Ilse–Bram–Hollin exchange begins at the hatch.',
 10:'Cut when negotiations end, the Warden and Rhee leave, and Neve walks the corridor with Jory.',
 13:'Cut when Ilse and Hollin leave the guarded hatch and descend to the clamp audit in the Drop Bay.',
 15:'Cut when the public investiture ends and the Warden questions Neve privately in the emptied Hall.',
 21:'Cut at the end of the shooting, again when Rhee reaches town, and again when the report begins aboard the Obedient.',
 29:'Cut after landing preparations, at entry to the Union Hall, and when Kit and Saba leave the memorial.',
 35:'Cut after Fane orders the party to sleep, then after the crew decides to steal the Key; place, custody and immediate action change.',
 38:'Cut after Hollin yields the hatch, then when Ilse enters the pilot cell and the sleeper drum separates from Mercy.',
 43:'Cut when Fane’s guard leaves the hold, then when Osh and Kit begin crossing the rows toward the pilot cell.',
 44:'Cut when Osh leaves Ilse’s cell, then immediately before Ama is physically revealed and awakened.'
}

let sceneCount=0
const records=sections.map(({chapterIndex,sectionIndex,chapter,section},index)=>{
 const paragraphs=section.text.split(/\n\n+/),defs=splits[index+1]??[{title:section.title,end:paragraphs.length}]
 let start=1
 const scenes=defs.map(def=>{const end=def.end??paragraphs.length;sceneCount++;const out={sceneNumber:sceneCount,title:def.title,paragraphStart:start,paragraphEnd:end,wordCount:countWords(paragraphs.slice(start-1,end).join('\n\n'))};start=end+1;return out})
 return {authorialSectionNumber:index+1,chapterNumber:chapterIndex+1,sectionNumber:sectionIndex+1,chapterHeading:chapter.sourceHeading,sectionHeading:section.title,paragraphCount:paragraphs.length,wordCount:countWords(section.text),decision:splits[index+1]?'split':'retain as one scene',reason:boundaryReasons[index+1]??'The authorial section keeps one place, continuous action and a stable directly present cast; internal paragraphs are beats within that scene.',scenes}
})

const sourceAudit={
 title:'The Cold Choir',author:'Solomon Darko',sourceFile:'source/the-cold-choir.md',sourceBytes:sourceBytes.length,sourceSha256,
 rights:'Creator-supplied original manuscript; Copyright © 2026 Solomon Darko. All rights reserved. Authorized by the creator for this Kathala edition.',
 extraction:{start:'First authorial heading: # Ch. 1 — Deceleration',end:'Final narrative line ending: Row Thirty-One, berth twelve—',excluded:'No narrative packaging was excluded. Markdown chapter and section headings are structural metadata and are reconstructed by the manuscript validator.'},
 normalization:['Decode as UTF-8.','Convert CRLF to LF.','Strip trailing spaces and tabs from each line.','Collapse runs of three or more line breaks to one blank line.','End with exactly one LF.'],
 counts:{chapters:chapters.length,authorialSections:sections.length,scenes:sceneCount,narrativeWords:countWords(narrativeText)}
}

fs.writeFileSync(new URL('./SOURCE_AUDIT.json',import.meta.url),JSON.stringify(sourceAudit,null,2)+'\n')
fs.writeFileSync(new URL('./SCENE_BOUNDARY_AUDIT.json',import.meta.url),JSON.stringify({title:'The Cold Choir',author:'Solomon Darko',policy:'Cuts occur only between normalized source paragraphs. Each retained authorial section is either preserved whole or split when place, directly present cast, custody, knowledge state, or continuous action materially changes.',sourceSha256,authorialSections:records.length,scenes:sceneCount,records},null,2)+'\n')
console.log(`Wrote source and boundary audits for ${records.length} sections and ${sceneCount} scenes (${crypto.createHash('sha256').update(normalize(narrativeText)).digest('hex')}).`)
