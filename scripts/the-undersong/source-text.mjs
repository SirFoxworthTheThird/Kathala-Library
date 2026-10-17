import fs from 'node:fs'
import crypto from 'node:crypto'
const file=new URL('./source/the-undersong.md',import.meta.url)
export const sourceBytes=fs.readFileSync(file)
export const sourceSha256=crypto.createHash('sha256').update(sourceBytes).digest('hex')
export const sourceText=sourceBytes.toString('utf8')
export const normalize=s=>s.replace(/\r\n/g,'\n').replace(/[ \t]+$/gm,'').replace(/\n{3,}/g,'\n\n').replace(/\n+$/,'')+'\n'
export const countWords=s=>(s.match(/[\p{L}\p{N}]+(?:[’'][\p{L}\p{N}]+)*/gu)||[]).length
const lines=normalize(sourceText).split('\n')
export const chapters=[]
let chapter=null,section=null
for(const line of lines){
 const ch=line.match(/^# (Ch\. \d+ — .+)$/)
 if(ch){chapter={sourceHeading:ch[1],title:ch[1].replace(/^Ch\. \d+ — /,''),sections:[]};chapters.push(chapter);section=null;continue}
 const sh=line.match(/^## (.+)$/)
 if(sh){if(!chapter)throw Error('Section before chapter');section={title:sh[1],lines:[]};chapter.sections.push(section);continue}
 if(section)section.lines.push(line)
 else if(line.trim())throw Error(`Text outside section: ${line}`)
}
for(const c of chapters)for(const s of c.sections)s.text=s.lines.join('\n').replace(/^\n+|\n+$/g,'')
export const reconstructedMarkdown=chapters.map(c=>`# ${c.sourceHeading}\n\n${c.sections.map(s=>`## ${s.title}\n\n${s.text}`).join('\n\n')}`).join('\n\n')+'\n'
export const narrativeText=chapters.flatMap(c=>c.sections.map(s=>s.text)).join('\n\n')
