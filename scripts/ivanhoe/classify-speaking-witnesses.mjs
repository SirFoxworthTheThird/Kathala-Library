import fs from 'node:fs'
import assert from 'node:assert/strict'
import {reviewedChapters} from './scene-review.mjs'
import {canonicalCast} from './character-ledger.mjs'

// Each candidate paragraph was opened from the pinned source. These decisions
// resolve only this named-attribution concordance, not every background figure.
const report=JSON.parse(fs.readFileSync(new URL('./qa/speaking-witness-candidates.json',import.meta.url),'utf8'))
const special={
 '2.44:cedric':['identification, not speech','Aymer describes the absent landholder as universally called Cedric the Saxon.'],
 '9.28:isaac':['recollected speech','The narrator looks back to Isaac watching the first course, before the present award.'],
 '9.29:rebecca':['recollected speech','Rebecca answers Isaac during that recalled course, not at a new present-time gathering.'],
 '9.30:isaac':['recollected speech','Isaac’s prayers and equipment calculations are narrated retrospectively.'],
 '10.6:brian':['legal anaphor, not speech','Baldwin offers the equipment of the said Brian; Brian is the absent master.'],
 '20.55:cedric':['identification in report','The woodsman describes a captive called Cedric; Cedric is elsewhere in Torquilstone.'],
 '25.20:cedric':['legal anaphor in document','Brian reads a demand naming the said Cedric; the captive is not composing or speaking it here.'],
 '27.60:john':['quoted absent speaker','Front-de-Boeuf invokes something Prince John said; John is not at the castle.'],
 '28.52:oswald':['reported speech within recollection','Rebecca tells Ivanhoe what Oswald said about Gurth. No new bodily presence or precise location is given to Oswald.'],
 '31.79:wamba':['narrator recalls prior words','Well said Wamba is the narrator’s reference to the earlier bonnet warning, not fresh dialogue from Wamba beside the blow.'],
}
const malvoisin=new Set(['36.28','36.30','36.36','36.38','36.45','36.49','38.25','39.62','39.70','43.42','43.46','43.62','43.65','43.70'])
const richard=new Set(['40.116','40.120','40.125','40.130','40.132','40.144','41.7','41.11','41.14','41.27','41.32','42.30','42.49','42.53','44.8','44.23'])
const fitzurse=new Set(['40.112','40.115'])
const decisions=[]
for(const row of report.candidates){
 const point=`${row.chapter}.${row.paragraph}`,key=`${point}:${row.key}`
 let decision=special[key],representedBy=null
 if(row.key==='malvoisin'&&malvoisin.has(point)){decision=['distinct person already present','This Malvoisin is Albert, the Preceptor, not the earlier tournament knight Sir Malvoisin.'];representedBy='albert'}
 if(row.key==='richard'&&richard.has(point)){decision=['embodied identity already present','The king is represented by the Black Knight’s continuing embodied record after the source identity reveal, rather than a duplicate Richard snapshot.'];representedBy='blackknight'}
 if(row.key==='fitzurse'&&fitzurse.has(point)){decision=['embodied identity already present','The captured Blue Knight speaks after being identified as Fitzurse; the embodied Blue Knight record is present.'];representedBy='blueknight'}
 assert.ok(decision,`Unreviewed source attribution ${key}`)
 const scenes=reviewedChapters.find(chapter=>chapter.chapter===row.chapter).scenes.filter(scene=>scene.from<=row.paragraph&&(scene.to>row.paragraph||(scene.to===row.paragraph&&(scene.toOffset??0)>0)))
 if(representedBy)assert.ok(scenes.some(scene=>canonicalCast(scene).some(person=>person.key===representedBy)),`Missing embodied actor ${key}`)
 decisions.push({source:point,candidate:row.key,classification:decision[0],reason:decision[1],representedBy})
}
assert.equal(decisions.length,42)
fs.writeFileSync(new URL('./qa/speaking-witness-review.json',import.meta.url),JSON.stringify({scope:'All42 remaining named-attribution concordance candidates manually source-classified. One genuine Wamba departure overlap was repaired before regeneration; this is not an exhaustive background presence approval.',sourceSha256:report.sourceSha256,decisions},null,2)+'\n')
console.log('42/42 named-attribution candidates source-classified; embodied alias coverage checked')
