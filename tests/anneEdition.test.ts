import { describe,it,expect } from 'vitest'
import fs from 'node:fs'
import { validateModel } from '../scripts/anne-of-green-gables/validate-model.mjs'
const edition=JSON.parse(fs.readFileSync(new URL('../library/anne-of-green-gables.pwk',import.meta.url),'utf8'))
describe('Anne source-grounded edition corrections',()=>{
 it('accepts the reviewed edition',()=>expect(()=>validateModel(edition)).not.toThrow())
 it('rejects the former offshore marker',()=>{const d=structuredClone(edition);Object.assign(d.locationMarkers.find(l=>l.name==='Avonlea district'),{x:650,y:650});expect(()=>validateModel(d)).toThrow(/Projected island marker/)})
 it('rejects generic standing-role status',()=>{const d=structuredClone(edition);d.characterSnapshots[0].statusNotes='Rachel participates as Avonlea’s candid observer and forceful neighbour.';expect(()=>validateModel(d)).toThrow(/Individual state/)})
 it('rejects the compressed chronology',()=>{const d=structuredClone(edition);d.events.at(-1).inWorldTime=1030;expect(()=>validateModel(d)).toThrow(/Source-anchored calendar/)})
 it('rejects assigning the medal to Anne',()=>{const d=structuredClone(edition);const e=d.events.find(e=>e.title==='Avery Scholarship and Gold Medal');const g=d.characterSnapshots.find(s=>s.eventId===e.id&&s.characterId==='anne-char-gilbert-blythe');g.inventoryItemIds=[];d.characterSnapshots.find(s=>s.eventId===e.id&&s.characterId==='anne-char-anne-shirley').inventoryItemIds.push('anne-item-medal');expect(()=>validateModel(d)).toThrow(/medal belongs to Gilbert/)})
 it('rejects a chapter synopsis giving a later outcome',()=>{const d=structuredClone(edition);d.chapters[13].synopsis='Anne invents a confession and misses the picnic.';expect(()=>validateModel(d)).toThrow(/Synopsis reveals only chapter opening/)})
 it('rejects making Diana present at the Academy',()=>{const d=structuredClone(edition);d.events.find(e=>e.title==='The First Day at Queen’s').involvedCharacterIds.push('anne-char-diana-barry');expect(()=>validateModel(d)).toThrow(/Actual scene cast/)})
})
