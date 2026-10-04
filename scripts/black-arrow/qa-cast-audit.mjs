import fs from 'node:fs/promises'
import path from 'node:path'

const root=path.resolve(import.meta.dirname,'../..')
const world=JSON.parse(await fs.readFile(path.join(root,'library','black-arrow.pwk'),'utf8'))
const byEvent=new Map(world.sceneTexts.map(scene=>[scene.eventId,scene.text]))
const patterns=new Map([
  ['Dick Shelton',/\b(?:Dick|Shelton)\b/gi],['Bennet Hatch',/\b(?:Bennet|Hatch)\b/gi],['Appleyard',/\bAppleyard\b/gi],
  ['Sir Oliver Oates',/\b(?:Sir Oliver|Oates)\b/gi],['Sir Daniel Brackley',/\b(?:Sir Daniel|Brackley)\b/gi],
  ['Jack Matcham',/\b(?:Jack|Matcham)\b/gi],['Hugh Ferryman',/\bHugh\b/gi],['John-a-Fenne',/\bJohn-a-Fenne\b/gi],
  ['Lawless',/\bLawless\b/gi],['Ellis Duckworth',/\b(?:Ellis|Duckworth)\b/gi],['Selden',/\bSelden\b/gi],['Carter',/\bCarter\b/gi],
  ['Goody Hatch',/\bGoody\b/gi],['Joanna Sedley',/\b(?:Joanna|Joan|Sedley)\b/gi],['Greensheve',/\bGreensheve\b/gi],
  ['Lord Shoreby',/\bShoreby\b/gi],['Capper',/\bCapper\b/gi],['Lord Foxham',/\bFoxham\b/gi],['Captain Arblaster',/\bArblaster\b/gi],
  ['Alicia Risingham',/\bAlicia\b/gi],['Earl Risingham',/\bRisingham\b/gi],['Tom',/\bTom\b/gi],['Master Pirret',/\bPirret\b/gi],
  ['Richard of Gloucester',/\b(?:Gloucester|Crookback)\b/gi],['Dutton',/\bDutton\b/gi],['The spy',/\b(?:spy|Rutter)\b/gi],
  ['Sir John Hamley',/\bHamley\b/gi],['Hawksley',/\bHawksley\b/gi],['Lady Brackley',/\bLady Brackley\b/gi],
  ['Clipsby',/\bClipsby\b/gi],['Catesby',/\bCatesby\b/gi],['Throgmorton',/\bThrogmorton\b/gi],
])
const idToName=new Map(world.characters.map(character=>[character.id,character.name]))
for(const event of world.events){
  const cast=new Set(event.involvedCharacterIds.map(id=>idToName.get(id)))
  const text=byEvent.get(event.id)??''
  const hits=[]
  for(const [name,pattern] of patterns){
    const count=[...text.matchAll(pattern)].length
    if(count>=2&&!cast.has(name))hits.push(`${name}:${count}`)
  }
  if(hits.length)console.log(`${String(event.sortOrder).padStart(3)} ${event.title} — ${hits.join(', ')}`)
}
