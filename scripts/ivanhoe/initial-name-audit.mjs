import assert from 'node:assert/strict'
import {sections} from './source-text.mjs'

// This catches newly introduced proper names in permanent character metadata.
// It is a review aid for given names, not a substitute for alias/identity and
// full biography review. Whole-scene states describe its completed action.
export function auditInitialNames(world){
  const results=[]
  for(const character of world.characters){
    if(/^The /i.test(character.name))continue
    const first=world.events.find(event=>event.involvedCharacterIds.includes(character.id))
    if(!first)continue
    const chapter=world.chapters.find(chapter=>chapter.id===first.chapterId)
    const source=sections.find(section=>section.number===chapter.number&&section.kind==='narrative')
    assert.ok(source,`Narrative first appearance ${character.id}`)
    const scene=world.sceneTexts.find(row=>row.eventId===first.id).text
    const offset=source.text.indexOf(scene)
    assert.ok(offset>=0,`Exact first-appearance source ${character.id}`)
    const available=sections.filter(section=>section.kind==='narrative'&&section.number<source.number).map(section=>section.text).join('\n')+'\n'+source.text.slice(0,offset+scene.length)
    const name=character.name.replace(/^(Sir|Rabbi|Brother|Father|Prior) /,'')
    const token=/^De /i.test(name)?name:name.split(/[ -]/)[0]
    const escaped=token.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\s+/g,'\\s+')
    const known=new RegExp(`(?<!\\p{L})${escaped}(?!\\p{L})`,'iu').test(available)
    results.push({characterId:character.id,initialName:character.name,firstEventId:first.id,identifyingToken:token,knownInNarrativeByFirstAppearance:known})
  }
  return results
}
