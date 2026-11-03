import fs from 'node:fs'
import {sections,paragraphs,sourceSha256} from './source-text.mjs'
import {reviewedChapters} from './scene-review.mjs'
import {canonicalCast} from './character-ledger.mjs'

// A source concordance for manual review, never an automatic presence importer.
// Direct-looking attribution may belong to reported speech, recollection or a
// different concealed identity. Each uncovered candidate needs its paragraph.
const names={gurth:['Gurth'],wamba:['Wamba'],aymer:['Aymer'],brian:['Brian','Bois-Guilbert'],hamet:['Hamet'],abdalla:['Abdalla'],hugo:['Hugo'],cedric:['Cedric'],oswald:['Oswald'],elgitha:['Elgitha'],hundebert:['Hundebert'],rowena:['Rowena'],isaac:['Isaac'],ambrose:['Ambrose'],anwold:['Anwold'],edwina:['Edwina'],wyvil:['Wyvil'],martival:['Martival'],rebecca:['Rebecca'],john:['John'],athelstane:['Athelstane'],debracy:['De Bracy'],fitzurse:['Fitzurse','Waldemar'],frontdeboeuf:['Front-de-Bœuf','Front-de-Boeuf'],malvoisin:['Malvoisin'],grantmesnil:['Grantmesnil'],vipont:['Vipont'],baldwin:['Baldwin'],reuben:['Reuben'],richard:['Richard'],ivanhoe:['Ivanhoe','Wilfred'],debigot:['De Bigot'],locksley:['Locksley','Robin'],hubert:['Hubert'],urfried:['Urfried','Ulrica'],gilbert:['Gilbert'],clementoutlaw:['Clement'],winkelbrand:['Winkelbrand'],hughbardon:['Bardon'],nathan:['Nathan'],beaumanoir:['Beaumanoir'],conrade:['Conrade'],damian:['Damian'],albert:['Albert'],herman:['Goodalricke'],higg:['Higg'],bensamuel:['Ben Samuel'],diggory:['Diggory'],scathlock:['Scathlock'],edith:['Edith'],dennet:['Dennet'],bohun:['Bohun']}
const verbs='said|replied|answered|asked|exclaimed|cried|added|continued|interrupted|muttered|whispered|observed|resumed|demanded|returned|responded|called|shouted|ejaculated|rejoined'
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
const candidates=[]
for(const [index,section] of sections.filter(section=>section.kind==='narrative').entries()){
  const chapter=index+1,review=reviewedChapters.find(row=>row.chapter===chapter)
  for(const [paragraph,p] of paragraphs(section.text).entries()){
    const plain=p.text.replace(/\s+/g,' ')
    const scenes=review.scenes.filter(scene=>scene.from<=paragraph&&(scene.to>paragraph||(scene.to===paragraph&&(scene.toOffset??0)>0)))
    const present=new Set(scenes.flatMap(scene=>canonicalCast(scene).map(person=>person.key)))
    for(const [key,aliases] of Object.entries(names)){
      if(present.has(key))continue
      const alias=aliases.map(escape).join('|')
      const attribution=new RegExp(`\\b(?:${verbs})\\s+(?:(?:Sir|Prince|King|Prior|Father|Rabbi|Lord)\\s+)?(?:${alias})\\b|\\b(?:${alias})\\s+(?:${verbs})\\b`,'i')
      const match=plain.match(attribution)
      if(match)candidates.push({chapter,paragraph,key,attribution:match[0],sceneTitles:scenes.map(scene=>scene.title),recollection:scenes.every(scene=>scene.isRecollection),text:p.text})
    }
  }
}
const report={scope:'Uncovered named-speech candidates from pinned source; attribution syntax alone does not prove physical presence. Manual source classification required.',sourceSha256,candidates}
fs.writeFileSync(new URL('./qa/speaking-witness-candidates.json',import.meta.url),JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify({candidates:candidates.length,points:candidates.map(row=>`${row.chapter}.${row.paragraph}:${row.key} ${row.attribution}${row.recollection?' [recollection]':''}`)},null,2))
