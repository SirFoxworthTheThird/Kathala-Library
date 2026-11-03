import fs from 'node:fs'
import zlib from 'node:zlib'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'

export const sourceUrl = 'https://www.gutenberg.org/cache/epub/82/pg82.txt'
export const sha256 = value => crypto.createHash('sha256').update(value).digest('hex')
export const sourceBytes = zlib.gunzipSync(fs.readFileSync(new URL('./source/pg82.txt.gz', import.meta.url)))
export const sourceSha256 = sha256(sourceBytes)
assert.equal(sourceSha256, '188187a4af0956b01ccb0a9f8fb50587ffa4fca0b2d12d8ff5a82fc6f05f15e0', 'Pinned Gutenberg bytes changed')
const raw = sourceBytes.toString('utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n')
const startMarker = '*** START OF THE PROJECT GUTENBERG EBOOK IVANHOE: A ROMANCE ***'
const endMarker = '*** END OF THE PROJECT GUTENBERG EBOOK IVANHOE: A ROMANCE ***'
const start = raw.indexOf(startMarker), end = raw.indexOf(endMarker)
assert.ok(start >= 0 && end > start)
// All content inside the Gutenberg wrapper is retained, including the title,
// contents, illustration placeholders, epigraphs, introduction, letter and notes.
// Normalize only BOM/line endings; outer wrapper padding is explicitly excluded.
export const retained = raw.slice(start + startMarker.length, end).trim()
const headings = [...retained.matchAll(/^(INTRODUCTION TO IVANHOE\.|DEDICATORY EPISTLE|CHAPTER ([IVXL]+)\.?|NOTE TO CHAPTER [IVXL]+\.?|FOOTNOTES)$/gm)]
assert.equal(headings.length, 57, 'Two front-matter sections, 44 chapters, ten notes and footnotes')
const roman = n => { let out=''; for(const [v,s] of [[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']])while(n>=v){out+=s;n-=v}return out }
assert.deepEqual(headings.filter(m=>m[2]).map(m=>m[2]),Array.from({length:44},(_,i)=>roman(i+1)))
const boundaries = [{index:0,title:'Title, contents and opening epigraph',kind:'preliminaries'}, ...headings.map(m=>({index:m.index,title:m[0],kind:m[2]?'narrative':m[0].startsWith('NOTE')||m[0]==='FOOTNOTES'?'notes':'front-matter'}))]
export const sections = boundaries.map((b,i)=>({...b,number:i+1,text:retained.slice(b.index,boundaries[i+1]?.index??retained.length)}))
export const countWords = text => (text.match(/[\p{L}\p{N}]+(?:[’'][\p{L}\p{N}]+)*/gu)??[]).length
assert.equal(sections.map(s=>s.text).join(''),retained)
export const paragraphs = text => [...text.matchAll(/\S[\s\S]*?(?=\n[ \t]*\n|$)/g)].map(m=>({offset:m.index,text:m[0]}))
