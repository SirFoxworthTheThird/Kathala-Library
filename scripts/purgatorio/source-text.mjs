import fs from 'node:fs'
import crypto from 'node:crypto'

export const sourceUrl='https://www.gutenberg.org/cache/epub/1002/pg1002.txt'
export const sourceEdition="Dante Alighieri, Divine Comedy, Longfellow's Translation, Purgatory, translated by Henry Wadsworth Longfellow, Project Gutenberg eBook #1002; released 1 August 1997; source file most recently updated 26 September 2026."
const sourceBytes=fs.readFileSync(new URL('./source/pg1002.txt',import.meta.url))
export const sourceSha256=crypto.createHash('sha256').update(sourceBytes).digest('hex')
const raw=sourceBytes.toString('utf8').replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n')
const startMarker='Purgatorio: Canto I'
const endMarker="*** END OF THE PROJECT GUTENBERG EBOOK DIVINE COMEDY, LONGFELLOW'S TRANSLATION, PURGATORY ***"
const start=raw.indexOf(`\n${startMarker}\n`),end=raw.indexOf(`\n${endMarker}`,start)
if(start<0||end<0)throw Error('Source extraction boundaries missing')
export const extracted=raw.slice(start+1,end).trimEnd()
const roman=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV','XXV','XXVI','XXVII','XXVIII','XXIX','XXX','XXXI','XXXII','XXXIII']
const positions=roman.map(label=>{const marker=`Purgatorio: Canto ${label}`,index=extracted.indexOf(marker);if(index<0)throw Error(`Missing ${marker}`);return{label,marker,index}})
if(positions.some((p,i)=>i&&p.index<=positions[i-1].index))throw Error('Canto headings out of order')
export const cantos=positions.map((p,i)=>{const body=extracted.slice(p.index+p.marker.length,positions[i+1]?.index??extracted.length).trim(),lines=body.split('\n').filter(line=>line.trim()).map(line=>line.trimEnd());if(!lines.length)throw Error(`Canto ${p.label} empty`);return{number:i+1,label:p.label,sourceHeading:p.marker,lines,text:lines.join('\n')}})
export const retainedText=cantos.map(c=>`${c.sourceHeading}\n\n${c.text}`).join('\n\n')
export const verseText=cantos.map(c=>c.text).join('\n\n')
export const verseLineCount=cantos.reduce((n,c)=>n+c.lines.length,0)
export const stanzaGroupCount=cantos.reduce((n,c)=>n+Math.ceil(c.lines.length/3),0)
export const countWords=text=>(text.match(/[\p{L}\p{N}]+(?:[’'][\p{L}\p{N}]+)*/gu)??[]).length
export const normalize=text=>text.replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n').split('\n').map(line=>line.trimEnd()).filter(line=>line.trim()).join('\n').trim()
if(cantos.length!==33)throw Error(`Expected 33 cantos, found ${cantos.length}`)
if(sourceSha256!=='a84c5036f67ad127f1f39d144215bf116afb842c6b5a6d9a9dcd6f6d94cfdb60')throw Error('Upstream source bytes changed')
