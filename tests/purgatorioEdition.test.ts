import {validateCorrections} from '../scripts/purgatorio/validate-corrections.mjs'
import {describe,it,expect} from 'vitest';import fs from 'node:fs';import {sourceVerse} from '../scripts/purgatorio/verse-format.mjs';import {cantos} from '../scripts/purgatorio/source-text.mjs'
const world=JSON.parse(fs.readFileSync(new URL('../library/purgatorio.pwk',import.meta.url),'utf8'))
describe('Purgatorio reading edition',()=>{
 it('matches the source-reviewed presence, boundaries, time and reveal ledger',()=>{expect(validateCorrections(world)).toBe(true)})
 for(const [label,mutate] of [
 ['unsupported goal category', (w:any)=>w.characterGoals[0].type='primary'],
 ['numeric relationship strength', (w:any)=>w.relationships[0].strength=9],
 ['wrong snapshot order scale', (w:any)=>w.characterSnapshots[0].sortKey=10000],
 ['reported Lucia', (w:any)=>w.events.find((e:any)=>e.title==='Before the Gate').involvedCharacterIds.push('purgatorio-char-lucia')],
 ['departed Virgil', (w:any)=>w.events.find((e:any)=>e.title==='Beatrice Arrives').involvedCharacterIds.push('purgatorio-char-virgil')],
 ['placeholder status', (w:any)=>w.characterSnapshots[0].statusNotes='Dante experiences and records this part of the ascent.'],
 ['compressed dates', (w:any)=>w.events.at(-1).inWorldTime=32.6],
 ['early Matelda identity', (w:any)=>w.characters.find((c:any)=>c.id==='purgatorio-char-matelda').nameChanges=[]],
 ['displaced map marker', (w:any)=>w.locationMarkers.find((l:any)=>l.id==='purgatorio-loc-shore').y=170],
 ['missing source line', (w:any)=>w.sceneTexts[0].text=w.sceneTexts[0].text.split('\n').slice(1).join('\n')],
 ] as const)it(`rejects regression: ${label}`,()=>{const w=structuredClone(world);mutate(w);expect(()=>validateCorrections(w)).toThrow()})

 it('preserves the complete poem and final verse',()=>{expect(world.chapters).toHaveLength(33);expect(world.events).toHaveLength(129);expect(world.sceneTexts.reduce((n:number,s:any)=>n+sourceVerse(s.text).split('\n').length,0)).toBe(4763);expect(world.sceneTexts.reduce((n:number,s:any)=>n+s.wordCount,0)).toBe(37410);expect(sourceVerse(world.sceneTexts.at(-1).text).endsWith('Pure and disposed to mount unto the stars.')).toBe(true)})
 it('marks every scene as verse and preserves source indentation',()=>{for(const s of world.sceneTexts)expect(s.text.split('\n').every((line:string)=>/^[ \t]+\S/.test(line))).toBe(true);expect(world.sceneTexts.map((s:any)=>sourceVerse(s.text)).join('\n').split('\n')).toEqual(cantos.flatMap((c:any)=>c.lines))})
 it('has exact physical snapshots and unique art',()=>{for(const e of world.events){const states=world.characterSnapshots.filter((s:any)=>s.eventId===e.id);expect(new Set(states.map((s:any)=>s.characterId))).toEqual(new Set(e.involvedCharacterIds));expect(states).toHaveLength(e.involvedCharacterIds.length)}expect(world.blobs).toHaveLength(93);expect(new Set(world.blobs.map((b:any)=>b.url)).size).toBe(93)})
 it('has one gateway for each nested topographic map',()=>{for(const child of world.mapLayers.filter((m:any)=>m.parentMapId))expect(world.locationMarkers.filter((l:any)=>l.mapLayerId===child.parentMapId&&l.linkedMapLayerId===child.id)).toHaveLength(1)})
})
