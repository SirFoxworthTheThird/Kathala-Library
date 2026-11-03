import fs from 'node:fs'
import {sections,paragraphs,sourceSha256} from './source-text.mjs'
import {reviewedChapters} from './scene-review.mjs'
import {canonicalCast} from './character-ledger.mjs'
const candidates=[]
for(const [index,section] of sections.filter(section=>section.kind==='narrative').entries()){
 for(const [paragraph,p] of paragraphs(section.text).entries()){
  if(!/\b(?:departed|departing|retired|retiring|left the|leave the|leaving the|removed|borne|carried away|withdrew|withdrawn|dismissed)\b/i.test(p.text.replace(/\s+/g,' ')))continue
  const scenes=reviewedChapters.find(chapter=>chapter.chapter===index+1).scenes.filter(scene=>scene.from<=paragraph&&(scene.to>paragraph||(scene.to===paragraph&&(scene.toOffset??0)>0)))
  candidates.push({chapter:index+1,paragraph,text:p.text,scenes:scenes.map(scene=>({from:scene.from,title:scene.title,recollection:scene.isRecollection??false,endpoints:canonicalCast(scene).map(person=>({key:person.key,location:person.location,status:person.status}))}))})
 }
}
fs.writeFileSync(new URL('./qa/departure-candidates.json',import.meta.url),JSON.stringify({scope:'Source departure concordance; manual source classification required, not an automatic endpoint importer',sourceSha256,candidates},null,2)+'\n')
console.log(candidates.length+' departure-word paragraphs; '+candidates.map(row=>`${row.chapter}.${row.paragraph}`).join(' '))
