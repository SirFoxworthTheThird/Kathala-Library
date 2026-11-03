import fs from 'node:fs'
const out=new URL('./map-originals/',import.meta.url)
const plate=(w,h,title,source,body,notes)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#eee3cc"/><g font-family="Georgia,serif" fill="#392f25"><text x="65" y="65" font-size="34">${title}</text><text x="65" y="105" font-size="19">${source}</text>${body}<path d="M65 ${h-155}H${w-65}" stroke="#b8a17b"/>${notes.map((n,i)=>`<text x="65" y="${h-115+i*30}" font-size="16">${n}</text>`).join('')}</g></svg>`
const buttresses=(cx,cy,r)=>Array.from({length:6},(_,i)=>{const a=i*Math.PI/3;return `<rect x="${cx+r*Math.cos(a)-45}" y="${cy+r*Math.sin(a)-45}" width="90" height="90" fill="#b4a486" stroke="#78664d" stroke-width="8" transform="rotate(${i*60} ${cx+r*Math.cos(a)} ${cy+r*Math.sin(a)})"/>`}).join('')
let body=`<rect x="70" y="155" width="1660" height="1090" rx="25" fill="#bbc995"/>
<path d="M60 1140Q420 960 610 1060T1110 1080T1750 970" fill="none" stroke="#8aafba" stroke-width="100"/><text x="1160" y="1105" font-size="28">River Don</text>
${[0,1,2,3].map(i=>`<path d="M${220+i*55} ${970-i*45}Q260 ${350-i*10} 860 ${240+i*35}T${1530-i*55} ${910-i*40}" fill="none" stroke="#9cad7e" stroke-width="4"/>`).join('')}
<path d="M390 850L450 390Q900 250 1380 400L1450 850L1000 920L850 920Z" fill="#cfbd98" stroke="#81694b" stroke-width="14" stroke-dasharray="12 8"/>
<text x="910" y="375" text-anchor="middle" font-size="23">Palisaded court · reconstructed outline</text>
${buttresses(1190,585,145)}<circle cx="1190" cy="585" r="145" fill="#aa9d84" stroke="#78664d" stroke-width="18"/><text x="1190" y="580" text-anchor="middle" font-size="24">Round keep</text><text x="1190" y="620" text-anchor="middle" font-size="19">Six buttresses</text>
<path d="M1190 775V730" stroke="#7d6b4d" stroke-width="35"/><text x="1190" y="825" text-anchor="middle" font-size="21">Southern entrance</text>
<path d="M650 965Q750 940 900 920" fill="none" stroke="#b49c73" stroke-width="45"/><text x="360" y="965" font-size="23">Ascent from the Don country</text>
<text x="650" y="585" font-size="27">Open castle court</text><text x="600" y="625" font-size="20">Hospitality and gathering places</text>
${[[550,480],[600,790],[910,780]].map(([x,y])=>`<rect x="${x}" y="${y}" width="90" height="35" fill="#a38259"/><path d="M${x} ${y-12}h90m-90 60h90" stroke="#80664b" stroke-width="5"/>`).join('')}
<text x="115" y="210" font-size="24">Don-side mount</text>`
fs.writeFileSync(new URL('coningsburgh.svg',out),plate(1800,1450,'Coningsburgh · the story-time enclosure','XLI.36–44 · river, rising mount, palisade and round keep',body,[
'Scott describes the story-time outer enclosure as a rude palisade, unlike the later fortifications seen by his contemporary visitor.',
'Keep and six buttresses are source-established. Mount contours, river bend, court outline, food stations and distances are reconstructed.',
'No later outer stone curtain is imported. The drawing represents the novel’s architecture, not a modern measured archaeological survey.'
]))
body=`${buttresses(680,610,320)}<circle cx="680" cy="610" r="320" fill="#a99b80" stroke="#78664d" stroke-width="13"/><circle cx="680" cy="610" r="230" fill="#cfbea0" stroke="#78664d" stroke-width="5"/>
<rect x="580" y="535" width="200" height="95" fill="#9f7d51" stroke="#785c3c" stroke-width="5"/><text x="680" y="475" text-anchor="middle" font-size="25">Round gathering room</text><text x="680" y="685" text-anchor="middle" font-size="20">Large oaken table</text>
<rect x="630" y="755" width="100" height="60" fill="#55483a"/><text x="680" y="850" text-anchor="middle" font-size="18">Square opening to lower vaults</text>
<path d="M680 1030V940Q930 910 970 650" fill="none" stroke="#826c4c" stroke-width="22"/><path d="M630 1010h100m-100-20h100m-100-20h100" stroke="#b59d77" stroke-width="5"/>
<text x="400" y="1030" font-size="19">South portal and steep outer steps</text><text x="800" y="1090" font-size="19">Stair within thick wall</text>
<rect x="1130" y="230" width="500" height="650" rx="10" fill="#dfd0b2" stroke="#b8a17b" stroke-dasharray="10 7"/>
<text x="1380" y="275" text-anchor="middle" font-size="20">Buttress details · exact junction unknown</text>
<rect x="1200" y="330" width="350" height="255" fill="#bfae8e" stroke="#78664d" stroke-width="9"/><rect x="1320" y="355" width="110" height="40" fill="#9a8d74"/><path d="M1375 345v-32m-13 15h26" stroke="#65533b" stroke-width="5"/><text x="1375" y="510" text-anchor="middle" font-size="25">Chapel</text><text x="1375" y="550" text-anchor="middle" font-size="18">Stone altar · narrow loophole</text>
<path d="M1375 585v65m-45-45h90m-90 20h90" stroke="#8d7756" stroke-width="4"/>
<rect x="1230" y="650" width="290" height="155" fill="#c8b99b" stroke="#78664d" stroke-width="8"/><path d="M1230 710h-30v30h30" fill="#ded3b9" stroke="#78664d" stroke-width="4"/><text x="1375" y="705" text-anchor="middle" font-size="24">Oratory</text><text x="1375" y="745" text-anchor="middle" font-size="18">West-facing loophole</text><text x="1375" y="780" text-anchor="middle" font-size="17">A few steps above the chapel</text>
<path d="M350 420q-80 90-20 160" fill="none" stroke="#816d4e" stroke-width="14"/><text x="100" y="350" font-size="20">Buttress stair to fourth storey</text>`
fs.writeFileSync(new URL('coningsburgh-keep.svg',out),plate(1750,1350,'Coningsburgh · the third storey','XLII.3–12 · gathering room, buttress chapel and adjoining raised oratory',body,[
'The southern portal and wall stair lead to the third-storey round room. Two dark vault storeys lie below its square floor opening.',
'The chapel occupies a buttress; its adjoining oratory is reached by a few steps and has a western loophole. Detail panels do not fix a buttress.',
'Wall thickness, room geometry, table and stair positions are schematic. The chapel’s exact buttress and compass orientation are unstated.'
]))
body=`${buttresses(700,570,305)}<circle cx="700" cy="570" r="305" fill="#ab9d83" stroke="#78664d" stroke-width="13"/><circle cx="700" cy="570" r="225" fill="#cfbea0" stroke="#78664d" stroke-width="5"/>
<text x="700" y="510" text-anchor="middle" font-size="26">Upper round apartment</text><text x="700" y="555" text-anchor="middle" font-size="21">Immediately above the gathering room</text>
<path d="M480 650h150m140 0h150" stroke="#9d7f55" stroke-width="30"/><text x="700" y="725" text-anchor="middle" font-size="19">Work and gathering places · reconstructed</text>
<path d="M390 390q-70 100-20 165" fill="none" stroke="#816d4e" stroke-width="14"/><text x="120" y="245" font-size="21">Winding stair from the third storey</text>`
fs.writeFileSync(new URL('coningsburgh-upper.svg',out),plate(1450,1150,'Coningsburgh · the fourth storey','XLII.13–18 · the round room above the first gathering place',body,[
'A winding stair ascends to the round apartment immediately above the gathering room. The source establishes this relative floor explicitly.',
'The six-buttress envelope follows the keep’s described form; internal work positions, furniture, windows and exact stair junction are reconstructed.',
'The circle represents the source-described room; its diameter is not supplied as a measured survey.'
]))
body=`<rect x="260" y="245" width="930" height="515" fill="#c5b697" stroke="#78664d" stroke-width="13"/><path d="M260 650h80" stroke="#eee3cc" stroke-width="18"/><path d="M260 650h80a80 80 0 0 0-80-80" fill="none" stroke="#9b8260" stroke-width="3" stroke-dasharray="7 6"/>
<text x="725" y="430" text-anchor="middle" font-size="30">The guests’ room</text><text x="725" y="485" text-anchor="middle" font-size="22">Small room for visitors less closely connected</text><text x="725" y="525" text-anchor="middle" font-size="22">to the mourning household</text><text x="725" y="650" text-anchor="middle" font-size="20">Doorway shown schematically</text>`
fs.writeFileSync(new URL('coningsburgh-guests.svg',out),plate(1450,1100,'Coningsburgh · a separate room detail','XLII.19 onward · exact floor and connecting route not established',body,[
'Cedric brings the two guests here after the upper-room visit, but the source does not establish its floor or the intervening route.',
'The rectangle, dimensions, orientation and doorway side are reconstructed. This detail is not attached to an invented numbered storey.',
'No measured size or furniture arrangement is supplied for this room. Its plan records only the established enclosure and doorway.'
]))
