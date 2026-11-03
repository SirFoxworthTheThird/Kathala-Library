// Source-authored cartographic plates. No randomly assigned coordinates or
// modern castle ruins. Retained SVG is the editable drawing source.
import fs from 'node:fs'
const out=new URL('./map-originals/',import.meta.url)
const defs=`<defs>
<pattern id="turf" width="37" height="31" patternUnits="userSpaceOnUse"><rect width="37" height="31" fill="#b8c58b"/><path d="m5 15 2-5 2 5m19 8 2-4" stroke="#8fa76b" fill="none" opacity=".45"/></pattern>
<pattern id="palisade" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#70533b"/><path d="M4 0v12M9 0v12" stroke="#b18b5c" stroke-width="2"/></pattern>
<g id="tree"><circle cy="6" r="26" fill="#7d925c"/><circle cx="-13" cy="-9" r="22" fill="#96a772"/><circle cx="15" cy="-13" r="21" fill="#a6b37a"/><path d="M0 6v20m0-16L-14-4M0 8l15-12" stroke="#6a704d" stroke-width="3"/></g>
<g id="tent"><path d="M-43 22-26-15H26l17 37Z" fill="#c0aa7a" stroke="#786044" stroke-width="3"/><path d="m-26-15 26-25 26 25Z" fill="#925d49" stroke="#614c39" stroke-width="3"/><path d="M0-40v-15l27 8-27 5M0-15v37" stroke="#4b3a2e" stroke-width="3" fill="#534639"/></g>
</defs>`
function plate(width,height,title,subtitle,content,notes){return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${defs}<rect width="${width}" height="${height}" fill="#eee3cb"/><g font-family="Georgia,serif" fill="#382f25"><text x="65" y="65" font-size="35">${title}</text><text x="65" y="103" font-size="18">${subtitle}</text>${content}<path d="M65 ${height-130}H${width-65}" stroke="#bea780"/>${notes.map((s,i)=>`<text x="65" y="${height-95+i*27}" font-size="16">${s}</text>`).join('')}</g></svg>`}
let c=`<rect x="70" y="155" width="965" height="1030" rx="25" fill="url(#turf)"/>
<g fill="none" stroke="#8a9864" stroke-width="3" opacity=".5"><rect x="155" y="250" width="760" height="855" rx="155"/><rect x="195" y="285" width="680" height="790" rx="130"/><rect x="235" y="315" width="600" height="730" rx="105"/></g>
<text x="95" y="194" font-size="17">Sloping meadow and turf spectator banks</text>
<path d="M150 285v-50m-9 16 9-16 9 16" fill="none" stroke="#625a43" stroke-width="3"/><text x="142" y="225" font-size="20">N</text>
<rect x="450" y="350" width="320" height="640" rx="45" fill="#c5cf97" stroke="url(#palisade)" stroke-width="14"/>
<path d="M579 350h62M579 990h62" stroke="#c5cf97" stroke-width="18"/>
<path d="M570 350v-90h80v90M570 990v98h80v-98" fill="#c2b588" stroke="#755b40" stroke-width="4"/>
<text x="605" y="390" font-size="17" text-anchor="middle">North gate</text><text x="605" y="969" font-size="17" text-anchor="middle">South gate</text>
<path d="M603 430v460" stroke="#98ab73" stroke-width="2" stroke-dasharray="8 9"/>
<text x="610" y="655" text-anchor="middle" font-size="21">Level riding ground</text>
<text x="610" y="687" text-anchor="middle" font-size="17">Quarter-mile long</text>
<text x="610" y="714" text-anchor="middle" font-size="17">about half as wide</text>
<rect x="460" y="205" width="300" height="70" rx="5" fill="#b4b97f" stroke="#79654a" stroke-width="4"/>
<text x="610" y="230" font-size="17" text-anchor="middle">Entrants’ waiting enclosure</text>
<text x="610" y="254" font-size="15" text-anchor="middle">Refreshments and attendants beyond</text>
<rect x="825" y="405" width="145" height="75" fill="#c2ad91" stroke="#72513b" stroke-width="4"/>
<text x="898" y="432" text-anchor="middle" font-size="16">Neighbouring</text><text x="898" y="456" text-anchor="middle" font-size="16">gallery</text>
<rect x="825" y="590" width="145" height="130" fill="#a5725c" stroke="#72513b" stroke-width="4"/>
<path d="m820 590 78-40 78 40" fill="#ad8c5d" stroke="#72513b" stroke-width="4"/>
<text x="897" y="633" text-anchor="middle" font-size="18">Prince’s</text><text x="897" y="659" text-anchor="middle" font-size="18">gallery</text><text x="897" y="691" text-anchor="middle" font-size="16">EAST</text>
<rect x="245" y="590" width="145" height="130" fill="#8b9f71" stroke="#72513b" stroke-width="4"/>
<path d="m240 590 78-40 78 40" fill="#bb9c91" stroke="#72513b" stroke-width="4"/>
<text x="317" y="633" text-anchor="middle" font-size="18">Queen’s</text><text x="317" y="659" text-anchor="middle" font-size="18">gallery</text><text x="317" y="691" text-anchor="middle" font-size="16">WEST</text>
<path d="M780 585h40m-40 10h40m-40 10h40M397 685h40m-40 10h40m-40 10h40" stroke="#7e674b" stroke-width="3"/>
<text x="90" y="820" font-size="17">Lower spectators’ ring</text><path d="M270 810 420 760" stroke="#7d7758" fill="none"/>
<rect x="350" y="1100" width="520" height="75" rx="6" fill="#c7b88c" stroke="#786046" stroke-width="4"/>
${[395,500,605,710,815].map(x=>`<use href="#tent" x="${x}" y="1139"/>`).join('')}
<text x="610" y="1222" text-anchor="middle" font-size="18">Five challenger pavilions on higher southern ground</text>
${[[100,350],[165,460],[105,600],[155,930],[960,390],[975,970]].map(([x,y])=>`<use href="#tree" x="${x}" y="${y}"/>`).join('')}
<text x="1100" y="190" font-size="22">POSITIONS NOT SPECIFIED</text>
<text x="1100" y="225" font-size="16">Separate detail index; these panels</text><text x="1100" y="251" font-size="16">do not assign compass positions.</text>
<rect x="1110" y="300" width="385" height="155" rx="8" fill="#d4c29f" stroke="#aa926c"/>
<path d="M1150 410h160m-150-12h150m-140-12h140" stroke="#907459" stroke-width="6"/>
<text x="1140" y="335" font-size="20">The Saxon company’s gallery</text><text x="1140" y="367" font-size="16">Stepped approach from lower ring</text>
<text x="1115" y="520" font-size="17">A neighbouring gallery is close to</text><text x="1115" y="548" font-size="17">the Prince’s. Its exact side and</text><text x="1115" y="576" font-size="17">separation are reconstructed above.</text>
<rect x="1110" y="635" width="385" height="170" rx="8" fill="#d4c29f" stroke="#aa926c"/>
<use href="#tent" x="1200" y="725"/><text x="1260" y="686" font-size="19">A borrowed pavilion</text><text x="1260" y="717" font-size="16">At an extremity;</text><text x="1260" y="743" font-size="16">which end is unstated</text>
<rect x="1110" y="850" width="385" height="330" rx="8" fill="#c4cf98" stroke="#aa926c"/>
<text x="1135" y="885" font-size="20">Southern archery avenue</text>
<text x="1135" y="916" font-size="15">Relative order; shot distance unspecified</text>
<path d="M1190 950v190m210-190v190" stroke="#8d805b" stroke-width="3"/>
<circle cx="1295" cy="967" r="19" fill="#e1d4b3" stroke="#876e4f" stroke-width="3"/><circle cx="1295" cy="967" r="8" fill="#9a6650"/>
<text x="1327" y="974" font-size="16">Mark, upper end</text>
<path d="M1240 1125h110m-55-22v-65m-8 12 8-12 8 12" stroke="#766345" stroke-width="3" fill="none"/>
<text x="1208" y="1160" font-size="16">Archers, bottom access</text>`
fs.writeFileSync(new URL('ashby-lists.svg',out),plate(1600,1400,'Ashby · the tournament meadow','VII.7–12; IX.52; XIII.44 · north/south gates, east/west principal galleries',c,[
'Source proportions govern the enclosure. Gallery sizes, relief strokes, trees and approach shapes are interpretive; no surveyed heights are claimed.',
'The separate detail panels preserve unknown positions. The borrowed pavilion is not identified with a challenger’s tent or a particular end.',
'No occupant, winner or concealed identity is encoded in the drawing. The archery detail has no exact measured distance or compass bearing.'
]))
// A local topographic reading plate: only the wood/meadow/town relationship
// is established. The town is not drawn from later Hastings-era castle ruins.
c=`<rect x="70" y="155" width="1260" height="555" rx="22" fill="url(#turf)"/>
<g fill="none" stroke="#96a16b" stroke-width="3" opacity=".55"><path d="M80 225q320-90 625 30t610 5M75 250q310-90 630 35t610 0M75 280q310-90 630 35t610 0M85 650q310-80 560-10t655-25M85 680q310-80 560-10t655-25"/></g>
${Array.from({length:19},(_,i)=>`<use href="#tree" x="${120+(i%10)*112}" y="${205+Math.floor(i/10)*92}"/>`).join('')}
<text x="120" y="361" font-size="23">Woodland verge</text>
<ellipse cx="470" cy="475" rx="225" ry="125" fill="#c4cf94" stroke="#a4b77c" stroke-width="3"/>
<rect x="380" y="400" width="180" height="120" rx="17" fill="#bfca92" stroke="url(#palisade)" stroke-width="8"/>
<text x="470" y="560" text-anchor="middle" font-size="23">Tournament meadow</text>
<path d="M565 504q130 100 260 45" fill="none" stroke="#cbb78a" stroke-width="22"/>
<text x="665" y="600" font-size="18">Road between field and town</text>
<g fill="#c9b897" stroke="#84694c" stroke-width="3">${[[900,445],[980,460],[1050,430],[1120,480],[940,540],[1040,535],[1140,560]].map(([x,y])=>`<path d="M${x} ${y}h50v48h-50Z"/><path d="m${x-7} ${y} 32-25 32 25Z" fill="#8d7957"/>`).join('')}</g>
<text x="1025" y="642" text-anchor="middle" font-size="26">Ashby</text>
<rect x="805" y="165" width="485" height="135" rx="8" fill="#e4d6b9" stroke="#b5a079"/>
<text x="830" y="199" font-size="20">Destinations in and near Ashby</text><text x="830" y="230" font-size="17">Castle and country lodging: exact relative</text><text x="830" y="257" font-size="17">positions in the vicinity are not supplied.</text>`
fs.writeFileSync(new URL('ashby.svg',out),plate(1400,900,'Ashby · town and woodland meadow','VII.6–12; IX.51–52; X; XIV · interpretive local topography',c,[
'The wood approaches within a mile of Ashby; a sloping meadow lies on its verge. The field and town are connected by the crowd’s route.',
'Compass direction, route bends, building positions, vegetation extent and relief strokes are reconstructed; this is not a surveyed town plan.',
'The destination index is non-geographic. Castle detail must follow the narrative rather than the later Hastings ruins.'
]))
console.log('Wrote ashby.svg and ashby-lists.svg')
