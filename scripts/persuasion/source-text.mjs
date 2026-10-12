import fs from 'node:fs'
import crypto from 'node:crypto'

export const sourceFile=new URL('./source/pg105.txt',import.meta.url)
export const sourceBytes=fs.readFileSync(sourceFile)
export const sourceSha256=crypto.createHash('sha256').update(sourceBytes).digest('hex')
export const normalizedSource=sourceBytes.toString('utf8').replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n')
const narrativeHeadings=[...normalizedSource.matchAll(/^CHAPTER ([IVXLCDM]+)\.$/gm)]
if(narrativeHeadings.length!==24)throw Error(`Expected 24 narrative headings, found ${narrativeHeadings.length}`)
const end=normalizedSource.indexOf('\nFinis\n',narrativeHeadings.at(-1).index)
if(end<0)throw Error('Missing Finis boundary')
export const retainedText=normalizedSource.slice(narrativeHeadings[0].index,end).trim().replace(/\n{3,}/g,'\n\n')
const retainedMatches=[...retainedText.matchAll(/^CHAPTER ([IVXLCDM]+)\.$/gm)]
if(retainedMatches.length!==24)throw Error(`Expected 24 retained chapters, found ${retainedMatches.length}`)
export const chapters=retainedMatches.map((match,index)=>{
  const next=retainedMatches[index+1]?.index??retainedText.length
  const fullText=retainedText.slice(match.index,next).trim()
  const body=fullText.slice(match[0].length).trim()
  return {number:index+1,numeral:match[1],heading:match[0],title:`Chapter ${match[1]}`,body,fullText,paragraphs:body.split(/\n{2,}/)}
})
export const reconstructedText=chapters.map(c=>`${c.heading}\n\n${c.body}`).join('\n\n')
export const retainedSha256=crypto.createHash('sha256').update(retainedText).digest('hex')
export const paragraphCount=chapters.reduce((n,c)=>n+c.paragraphs.length,0)
export const wordCount=text=>(text.match(/\S+/g)??[]).length
if(reconstructedText!==retainedText)throw Error('Exact chapter reconstruction failed')
