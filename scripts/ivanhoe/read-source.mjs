import {sections,paragraphs} from './source-text.mjs'
const sectionMode=process.argv[2]==='--section'
const args=process.argv.slice(sectionMode?3:2)
const chapter=Number(args[0]),from=Number(args[1]??0),to=Number(args[2]??Infinity)
const section=sectionMode?sections.find(s=>s.number===chapter):sections.filter(s=>s.kind==='narrative')[chapter-1]
if(!section)throw Error('Usage: node scripts/ivanhoe/read-source.mjs [--section] <chapter 1-44 or source section 1-58> [first paragraph] [exclusive last paragraph]')
console.log(section.title)
for(const [index,p] of paragraphs(section.text).entries())if(index>=from&&index<to)console.log(`\n[${index}] ${p.text.replace(/\n/g,' ')}`)
