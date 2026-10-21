import fs from 'node:fs'
import crypto from 'node:crypto'
export const sourceUrl='https://www.gutenberg.org/cache/epub/514/pg514.txt'
const bytes=fs.readFileSync(new URL('./source/pg514.txt',import.meta.url))
export const sourceSha256=crypto.createHash('sha256').update(bytes).digest('hex')
if(sourceSha256!=='36831477b339dbcd7e7206119d77e9e58b9727ef3c299d1a1dc4446e1db97850')throw Error('Pinned source bytes changed')
const raw=bytes.toString('utf8').replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n')
const start=raw.indexOf('\nPART 1\n'),end=raw.indexOf('\n*** END OF THE PROJECT GUTENBERG EBOOK LITTLE WOMEN ***')
if(start<0||end<start)throw Error('Source boundaries missing')
export const extracted=raw.slice(start+1,end).trim()
const headings=[...extracted.matchAll(/^CHAPTER ([A-Z-]+)\n([^\n]+)\n/gm)]
const partTwoStart=extracted.indexOf('\nPART 2\n')
export const partTwoPreamble=extracted.slice(partTwoStart+8,headings[23].index).trim()
if(headings.length!==47)throw Error(`Expected 47 chapters, found ${headings.length}`)
export const chapters=headings.map((m,i)=>{
  let text=extracted.slice(m.index+m[0].length,headings[i+1]?.index??extracted.length).trim()
  if(i===22)text=extracted.slice(m.index+m[0].length,partTwoStart).trim()
  if(i===23)text=partTwoPreamble+'\n\n'+text
  const paragraphStarts=[0]
  for(const gap of text.matchAll(/\n[ \t]*\n+/g))paragraphStarts.push(gap.index+gap[0].length)
  const paragraphs=paragraphStarts.map((start,j)=>text.slice(start,paragraphStarts[j+1]??text.length).trimEnd())
  return {number:i+1,part:i<23?1:2,label:m[1],title:m[2],text,paragraphs,paragraphStarts}
})
export const countWords=text=>(text.match(/[\p{L}\p{N}]+(?:[’'][\p{L}\p{N}]+)*/gu)??[]).length
// Preserve paragraph boundaries and internal line breaks, including verse,
// letters, the newspaper, and the play. Only CRLF and outer whitespace change.
export const normalize=text=>text.replace(/\r\n?/g,'\n').trim()
export const narrative=chapters.map(c=>c.text).join('\n\n')
export const retained=chapters.map(c=>`${c.number===1?'PART 1\n\n':c.number===24?'PART 2\n\n':''}CHAPTER ${c.label}\n${c.title}\n\n${c.text}`).join('\n\n')
