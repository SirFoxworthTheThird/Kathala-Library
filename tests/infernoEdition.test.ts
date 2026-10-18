import {describe,it,expect} from 'vitest'
import fs from 'node:fs'
import {formatVerse,sourceVerse} from '../scripts/inferno/verse-format.mjs'
import {cantos} from '../scripts/inferno/source-text.mjs'
import {validateCorrections} from '../scripts/inferno/validate-corrections.mjs'

const world=JSON.parse(fs.readFileSync(new URL('../library/inferno.pwk',import.meta.url),'utf8'))
const event=(data:any,title:string)=>data.events.find((entry:any)=>entry.title===title)

describe('Inferno reading edition',()=>{
 it('preserves the complete poem and final verse',()=>{
  expect(world.chapters).toHaveLength(34)
  expect(world.events).toHaveLength(197)
  expect(world.sceneTexts).toHaveLength(197)
  expect(world.sceneTexts.reduce((sum:number,scene:any)=>sum+scene.text.split('\n').filter(Boolean).length,0)).toBe(4720)
  expect(world.sceneTexts.reduce((sum:number,scene:any)=>sum+scene.wordCount,0)).toBe(37417)
  expect(world.sceneTexts.at(-1).text.trimEnd().endsWith('Thence we came forth to rebehold the stars.')).toBe(true)
 })
 it('marks every scene as verse and preserves source indentation exactly',()=>{
  for(const scene of world.sceneTexts){
   const lines=scene.text.split('\n')
   expect(lines.length).toBeGreaterThan(1)
   expect(lines.every((line:string)=>/^[ \t]+\S/.test(line))).toBe(true)
  }
  expect(world.sceneTexts.map((scene:any)=>sourceVerse(scene.text)).join('\n').split('\n')).toEqual(cantos.flatMap((canto:any)=>canto.lines))
  expect(sourceVerse(formatVerse('First\n  Indented'))).toBe('First\n  Indented')
  expect(()=>sourceVerse('First\n  Second')).toThrow()
 })
 it('keeps the descent and six embedded histories distinct',()=>{
  expect(world.timelines.map((entry:any)=>entry.name)).toEqual(['The Descent','The Celestial Intercession','Francesca’s Memory','The Founding of Mantua','Ulysses’ Last Voyage','Guido’s Last Counsel','Ugolino in the Tower'])
  expect(()=>validateCorrections(world)).not.toThrow()
 })
 it('ships the complete distinct art and topographic map set',()=>{
  expect(world.blobs).toHaveLength(133)
  expect(new Set(world.blobs.map((entry:any)=>entry.url)).size).toBe(133)
  expect(world.mapLayers).toHaveLength(6)
  for(const map of world.mapLayers)expect(map.imageId).toBeTruthy()
  for(const entity of [world.world,...world.characters,...world.items,...world.locationMarkers])expect(entity.coverImageId||entity.portraitImageId||entity.imageId).toBeTruthy()
 })
 it('rejects the source, presence, chronology, reveal, gateway, and lore defects found during review',()=>{
  const mutations=[
   (d:any)=>{event(d,'The Fatal Reading').timelineId='inferno-timeline-descent'},
   (d:any)=>{event(d,'Manto’s Wandering').involvedCharacterIds.push('inferno-char-dante')},
   (d:any)=>{d.characterSnapshots=d.characterSnapshots.filter((s:any)=>s.eventId!==d.events[0].id)},
   (d:any)=>{event(d,'The Usurers').description+=' Geryon waits nearby.'},
   (d:any)=>{event(d,'Mounting Fraud').travelDays=.25},
   (d:any)=>{d.locationMarkers.find((l:any)=>l.id==='inferno-loc-hell-mouth').linkedMapLayerId=null},
   (d:any)=>{d.relationshipSnapshots=[]},
   (d:any)=>{d.lorePages[0].body+=' See scripts/inferno/SOURCE.md.'},
  ]
  for(const mutate of mutations){const copy=structuredClone(world);mutate(copy);expect(()=>validateCorrections(copy)).toThrow()}
 })
})
