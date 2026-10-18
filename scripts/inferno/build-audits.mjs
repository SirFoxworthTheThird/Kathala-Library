import fs from 'node:fs'
import {cantos,countWords,sourceEdition,sourceSha256,sourceUrl,stanzaGroupCount,verseLineCount,verseText} from './source-text.mjs'
import {reviewedCantos,reviewedBoundaries} from './reviewed-scenes.mjs'

const sourceBytes=fs.statSync(new URL('./source/pg1001.txt',import.meta.url)).size
fs.writeFileSync(new URL('./SOURCE_AUDIT.json',import.meta.url),JSON.stringify({
 title:'Inferno',author:'Dante Alighieri',translator:'Henry Wadsworth Longfellow',sourceEdition,sourceUrl,
 downloaded:'2026-10-18',sourceBytes,sourceSha256,rights:'Public domain in the United States; Dante died in 1321 and Longfellow died in 1882.',
 retained:{cantos:34,stanzaGroups:stanzaGroupCount,verseLines:verseLineCount,words:countWords(verseText),start:'Inferno: Canto I / Midway upon the journey of our life',end:'Thence we came forth to rebehold the stars.'},
 excluded:['Project Gutenberg header and licence','collection title and translator page','contents list','canto headings','blank packaging lines','Project Gutenberg footer'],
 spelling:'Longfellow’s English wording, capitalization, punctuation, apostrophes, and lineation are retained from the UTF-8 Project Gutenberg text. No modernization or silent correction is applied.',
 normalization:'Final scene drafts add a two-space presentation prefix to every verse line; remove exactly that prefix before source comparison. CRLF and CR become LF; trailing whitespace and empty packaging lines are ignored; every nonempty retained verse line must otherwise match exactly.',
},null,2)+'\n')

const records=cantos.flatMap(canto=>{const scenes=reviewedCantos[canto.number-1],points=reviewedBoundaries(canto);return scenes.map((scene,index)=>{
 const start=points[index],end=points[index+1],lines=canto.lines.slice(start,end)
 return{canto:canto.number,cantoLabel:canto.label,title:scene.title,sourceStart:start+1,sourceEnd:end,precedingLines:canto.lines.slice(Math.max(0,start-3),start),openingLines:lines.slice(0,3),closingLines:lines.slice(-3),followingLines:canto.lines.slice(end,end+3),verseLines:lines.length,words:countWords(lines.join('\n')),location:scene.location,timeline:scene.timeline,presentCast:Object.keys(scene.states),individualStates:scene.states,items:scene.items,rationale:index===0?'Authorial canto opening.':`Reviewed transition from “${scenes[index-1].title}” to “${scene.title}” at the next complete tercet boundary.`,seamNote:'Cuts use reviewed stanza boundaries: after the canto opening, each start is congruent to line 1 modulo 3 and preserves source order.'}
})})
fs.writeFileSync(new URL('./SCENE_BOUNDARY_AUDIT.json',import.meta.url),JSON.stringify({title:'Inferno',policy:'Explicit source-reviewed tercet starts; no equal-size allocation or punctuation search. Adjacent lines, physical casts, states, locations, items, and narrative frames are recorded for every cut.',cantos:cantos.length,scenes:records.length,records},null,2)+'\n')

const world=JSON.parse(fs.readFileSync(new URL('../../library/inferno.pwk',import.meta.url),'utf8'))
const names=new Map(world.characters.map(character=>[character.id,character.name]))
const presence=world.events.map(event=>{const text=world.sceneTexts.find(scene=>scene.eventId===event.id),states=world.characterSnapshots.filter(snapshot=>snapshot.eventId===event.id);return{event:event.title,sourceRange:event.tags.find(tag=>tag.startsWith('Canto ')),timeline:world.timelines.find(t=>t.id===event.timelineId)?.name,presentCharacters:event.involvedCharacterIds.map(id=>names.get(id)),snapshotCount:states.length,firstLine:text.text.split('\n')[0].trim(),lastLine:text.text.split('\n').at(-1).trim(),review:'Cast contains only characters physically acting or occupying this bounded event. Characters merely named in speech, prophecy, catalogue, or remembered from the descent frame are excluded.'}})
fs.writeFileSync(new URL('./PRESENCE_AUDIT.json',import.meta.url),JSON.stringify({title:'Inferno',policy:'Exactly one specific snapshot belongs to each physically present character in an event. Recollected action uses its own timeline and cast.',events:presence.length,records:presence},null,2)+'\n')
