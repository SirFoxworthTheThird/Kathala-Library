import fs from 'node:fs'
import crypto from 'node:crypto'
import {cantos,verseText,verseLineCount,countWords,normalize,sourceSha256} from './source-text.mjs'

const file=new URL('./manuscript-draft.pwk',import.meta.url)
if(!fs.existsSync(file))throw Error('Run import-manuscript.mjs first')
const world=JSON.parse(fs.readFileSync(file,'utf8'))
const scenes=[...world.sceneTexts].sort((a,b)=>{
  const ea=world.events.find(event=>event.id===a.eventId),eb=world.events.find(event=>event.id===b.eventId)
  return ea.sortOrder-eb.sortOrder
})
const reconstructed=scenes.map(scene=>scene.text).join('\n\n')
if(normalize(reconstructed)!==normalize(verseText))throw Error('Retained verse reconstruction mismatch')
if(world.chapters.length!==34)throw Error(`Expected 34 cantos, found ${world.chapters.length}`)
if(world.events.length!==34)throw Error(`Expected 34 manuscript scenes, found ${world.events.length}`)
if(scenes.reduce((sum,scene)=>sum+scene.text.split('\n').length,0)!==verseLineCount)throw Error('Verse line count mismatch')
if(scenes.reduce((sum,scene)=>sum+scene.wordCount,0)!==countWords(verseText))throw Error('Word count mismatch')
for(const canto of cantos){
  const scene=scenes[canto.number-1]
  if(scene.text!==canto.text)throw Error(`Canto ${canto.label} differs from retained source`)
}
const hash=crypto.createHash('sha256').update(normalize(reconstructed)).digest('hex')
console.log(`Manuscript PASS: ${cantos.length} cantos, ${scenes.length} scenes, ${verseLineCount} verse lines, ${countWords(verseText)} words`)
console.log(`Source SHA-256: ${sourceSha256}`)
console.log(`Normalized retained verse SHA-256: ${hash}`)
