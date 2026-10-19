import fs from 'node:fs'
import crypto from 'node:crypto'
import {cantos,verseText,verseLineCount,countWords,normalize,sourceSha256,stanzaGroupCount} from './source-text.mjs'
import {sourceVerse} from './verse-format.mjs'
const world=JSON.parse(fs.readFileSync(new URL('./manuscript-draft.pwk',import.meta.url),'utf8'))
const scenes=[...world.sceneTexts].sort((a,b)=>world.events.find(e=>e.id===a.eventId).sortOrder-world.events.find(e=>e.id===b.eventId).sortOrder)
const reconstructed=scenes.map(s=>sourceVerse(s.text)).join('\n\n')
if(normalize(reconstructed)!==normalize(verseText))throw Error('Retained verse reconstruction mismatch')
if(world.chapters.length!==33||world.events.length!==33)throw Error('Canto or staging scene count mismatch')
if(scenes.reduce((n,s)=>n+sourceVerse(s.text).split('\n').length,0)!==verseLineCount)throw Error('Verse line count mismatch')
if(scenes.reduce((n,s)=>n+s.wordCount,0)!==countWords(verseText))throw Error('Word count mismatch')
for(const canto of cantos)if(sourceVerse(scenes[canto.number-1].text)!==canto.text)throw Error(`Canto ${canto.label} differs from retained source`)
const hash=crypto.createHash('sha256').update(normalize(reconstructed)).digest('hex')
console.log(`Manuscript PASS: ${cantos.length} cantos, ${stanzaGroupCount} stanza groups, ${verseLineCount} retained lines (4,755 verse + 8 note), ${countWords(verseText)} words`)
console.log(`Source SHA-256: ${sourceSha256}`)
console.log(`Normalized retained verse SHA-256: ${hash}`)
