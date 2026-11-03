import fs from 'node:fs'
const out=new URL('./map-originals/',import.meta.url)
const defs=`<defs><pattern id="stone" width="50" height="28" patternUnits="userSpaceOnUse"><rect width="50" height="28" fill="#b8b19a"/><path d="M0 0h50v28H0Zm25 0v28" fill="none" stroke="#918975" stroke-width="2"/></pattern><g id="tree"><circle r="28" fill="#899d68"/><circle cx="-13" cy="-10" r="21" fill="#acba82"/><path d="M0 6v24m0-13-14-13m14 13L14 0" stroke="#69754e" stroke-width="3"/></g><pattern id="herbs" width="35" height="35" patternUnits="userSpaceOnUse"><rect width="35" height="35" fill="#b6bd84"/><path d="M17 27V10m0 9-8-7m8 7 8-7" stroke="#819260" stroke-width="3"/></pattern></defs>`
function plate(w,h,title,source,body,notes){return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs}<rect width="${w}" height="${h}" fill="#eee3cb"/><g font-family="Georgia,serif" fill="#382f25"><text x="65" y="65" font-size="35">${title}</text><text x="65" y="105" font-size="18">${source}</text>${body}<path d="M65 ${h-140}H${w-65}" stroke="#b9a57e"/>${notes.map((s,i)=>`<text x="65" y="${h-102+i*28}" font-size="16">${s}</text>`).join('')}</g></svg>`}
let body=`<rect x="70" y="155" width="1660" height="1060" rx="22" fill="#c0c997"/>
<path d="M1080 570q40-260 430-300M1110 610q60-270 430-295M1140 650q60-270 440-300M1170 690q80-260 440-300" fill="none" stroke="#a0ac7b" stroke-width="4"/>
<rect x="245" y="480" width="965" height="610" fill="#c8bd9d" stroke="url(#stone)" stroke-width="24"/>
${[[245,480],[1210,480],[245,1090],[1210,1090]].map(([x,y])=>`<rect x="${x-28}" y="${y-28}" width="56" height="56" fill="url(#stone)" stroke="#7c725c" stroke-width="5"/>`).join('')}
<rect x="305" y="570" width="315" height="275" fill="#aeb681" stroke="#8a8b66" stroke-width="5"/>
<path d="M330 595h110v95H330Zm150 0h110v95H480ZM330 725h110v95H330Zm150 0h110v95H480Z" fill="url(#herbs)" stroke="#8c8761" stroke-width="3"/>
<use href="#tree" x="370" y="630"/><use href="#tree" x="540" y="770"/>
<text x="460" y="900" text-anchor="middle" font-size="23">Enclosed garden</text><text x="320" y="935" font-size="17">Curious herbs and imported trees</text>
<rect x="715" y="555" width="405" height="200" fill="#aa9c7d" stroke="#7d7059" stroke-width="6"/>
<path d="M715 555 918 505 1120 555" fill="#aaa18b" stroke="#7d7059" stroke-width="5"/>
<text x="917" y="645" text-anchor="middle" font-size="25">Main buildings</text><text x="917" y="682" text-anchor="middle" font-size="19">Hall and rooms</text>
<rect x="820" y="830" width="300" height="175" fill="#c0b293" stroke="#a08c67" stroke-dasharray="8 6" stroke-width="4"/>
<text x="970" y="885" text-anchor="middle" font-size="21">Within the Preceptory</text><text x="970" y="920" text-anchor="middle" font-size="16">Unspecified internal position</text>
<path d="M655 1090h115" stroke="#c8bd9d" stroke-width="30"/>
<path d="M655 1130v70m115-70v70" stroke="#9a9177" stroke-width="12"/>
<path d="M713 1095v105" stroke="#92744e" stroke-width="9" stroke-dasharray="11 7"/>
<text x="1050" y="1190" font-size="22">Gate and drawbridge alignment</text>
<path d="M713 1210q180-20 370-130t230-400l60-125" fill="none" stroke="#b2a17b" stroke-width="24"/>
<text x="1260" y="770" font-size="21">Gentle ascent</text><text x="1250" y="805" font-size="18">to the levelled tiltyard</text>
<rect x="1170" y="225" width="475" height="315" rx="25" fill="#c8ce9c" stroke="#80694b" stroke-width="11" stroke-dasharray="14 6"/>
<text x="1410" y="350" text-anchor="middle" font-size="25">Exercise enclosure</text><text x="1410" y="390" text-anchor="middle" font-size="19">On the brow of the rise</text>
${[[150,345],[275,280],[590,240],[880,300],[1530,950],[1390,1120],[1650,680],[160,1040]].map(([x,y])=>`<use href="#tree" x="${x}" y="${y}"/>`).join('')}
<text x="110" y="1165" font-size="21">Fair meadows and pastures</text>`
fs.writeFileSync(new URL('templestowe.svg',out),plate(1800,1400,'Templestowe · fortified house, garden and tiltyard','XXXV.17–24; XLIII.4,34–37 · local terrain and source-established connections',body,[
'The garden is inside the fortifications; a drawbridge guards the gate. The adjoining tiltyard occupies levelled ground on a gentle rise.',
'Footprint, garden beds, plant species, paths, compass orientation and building positions are reconstructed. The bridge gap’s depth and water condition are unstated.',
'The dashed internal-position panel records an unspecified place in the house. Drawn spacing is not a measured distance or a claim that a private room has been identified.'
]))
body=`<rect x="300" y="180" width="1250" height="900" fill="#cbbd9d" stroke="url(#stone)" stroke-width="20"/>
<rect x="320" y="200" width="1210" height="500" fill="#c5b18a"/>
<path d="M320 700h1210" stroke="#8f7857" stroke-width="10"/>
<text x="380" y="680" font-size="20">Raised dais</text>
${[600,750,1100,1250].map(x=>`<rect x="${x-30}" y="220" width="60" height="55" fill="#aa8d68" stroke="#7e6348" stroke-width="5"/>`).join('')}
<text x="410" y="315" font-size="19">Four lower seats, set back</text>
<rect x="880" y="285" width="90" height="80" fill="#ac8c62" stroke="#785b3d" stroke-width="6"/>
<text x="925" y="265" text-anchor="middle" font-size="21">Highest seat</text>
<rect x="815" y="420" width="220" height="75" fill="#b19b76" stroke="#7e6b4c" stroke-width="5"/>
<text x="925" y="395" text-anchor="middle" font-size="19">Two scribes at the table</text>
<path d="M500 550h310m240 0h310" stroke="#9a7e57" stroke-width="27"/>
<text x="505" y="595" font-size="19">Knights’ benches below the preceptors</text>
<text x="1050" y="650" font-size="19">Esquires on the platform</text>
<rect x="892" y="750" width="65" height="65" fill="#b69e7b" stroke="#8a7152" stroke-width="4"/>
<text x="985" y="790" font-size="19">Appointed place before the tribunal</text>
<text x="450" y="1010" font-size="25">Lower hall: guards, attendants and country people</text>
<path d="M300 880v110" stroke="#cbbd9d" stroke-width="27"/>
<rect x="90" y="200" width="140" height="850" fill="#c1b18f" stroke="#8a7859" stroke-width="7"/>
<path d="M230 880h70v110h-70" fill="#c1b18f" stroke="#8a7859" stroke-width="5"/>
<path d="M300 880h-55m55 110h-55" stroke="#8c6e4b" stroke-width="7"/>
<text x="170" y="690" text-anchor="middle" font-size="22" transform="rotate(-90 170 690)">Long gallery to the folding doors</text>
<path d="M105 215h110m-110 25h110m-110 25h110m-110 25h110" stroke="#8c7858" stroke-width="4"/>
<text x="80" y="1135" font-size="19">Private stair from the prison-side rooms above · gallery · folding doors · hall</text>`
fs.writeFileSync(new URL('templestowe-hall.svg',out),plate(1650,1350,'Templestowe · the lower gallery and great hall','XXXVI.58–59; XXXVII.3–9 · descent and the tribunal’s internal hierarchy',body,[
'The private stair descends to a long gallery; folding doors open into the great hall. The dais is raised above the lower public floor.',
'The Master’s seat is highest; four preceptors sit lower and set back, with knights and esquires below. Two scribes sit at a table at the Master’s feet.',
'Geometry, orientation, seat positions and dimensions are reconstructed. This is the lower of two known relative levels, not a claimed ground-storey number.'
]))
body=`<rect x="100" y="235" width="800" height="460" fill="#c9b99a" stroke="url(#stone)" stroke-width="18"/>
<rect x="1040" y="235" width="500" height="460" fill="#c7b698" stroke="url(#stone)" stroke-width="18"/>
<text x="500" y="330" text-anchor="middle" font-size="29">Prison chamber</text><text x="500" y="400" text-anchor="middle" font-size="20">A remote place of confinement</text>
<text x="1290" y="330" text-anchor="middle" font-size="26">Adjoining chamber</text><text x="1290" y="400" text-anchor="middle" font-size="19">A waiting place outside the cell</text>
<path d="M440 695h120" stroke="#c9b99a" stroke-width="26"/>
<text x="500" y="750" text-anchor="middle" font-size="20">Door</text>
<rect x="290" y="815" width="410" height="105" fill="#b4a180" stroke="#857053" stroke-width="5"/>
<path d="M335 815v105m45-105v105m45-105v105m45-105v105m45-105v105m45-105v105m45-105v105m45-105v105" stroke="#857053" stroke-width="3"/>
<text x="790" y="860" font-size="23">Private stair down</text><text x="790" y="900" font-size="20">To the long gallery and great hall</text>`
fs.writeFileSync(new URL('templestowe-rooms.svg',out),plate(1650,1200,'Templestowe · prison-side upper rooms','XXXVI.53–59; XXXIX.3,59 · source-established confinement, adjacency and descent',body,[
'A private stair serves the remote confinement and descends to the long gallery. An adjoining chamber lies near the cell.',
'These are separate room details. Adjacency does not establish a particular connecting doorway or corridor; no such route is drawn.',
'Room shapes, dimensions, doorway side and stair placement are reconstructed. The upper/lower relationship is known; absolute storey numbers are not.'
]))
body=`<rect x="80" y="155" width="1640" height="950" rx="20" fill="#bdc98f"/>
<path d="M110 1030q380 100 780 0t790-10M110 1060q380 100 780 0t790-10" fill="none" stroke="#9ca974" stroke-width="4"/>
<rect x="195" y="300" width="1400" height="650" rx="40" fill="#c6cd96" stroke="#806b4b" stroke-width="14" stroke-dasharray="14 6"/>
<rect x="365" y="425" width="880" height="390" rx="15" fill="#cdd4a0" stroke="#abb67c" stroke-width="4"/>
<text x="800" y="615" text-anchor="middle" font-size="27">Levelled ground for the encounter</text>
<rect x="1360" y="425" width="160" height="255" fill="#b6a07a" stroke="#7c6346" stroke-width="5"/>
<rect x="1400" y="455" width="80" height="65" fill="#ab8a5c" stroke="#785a3e" stroke-width="5"/>
<text x="1435" y="725" text-anchor="middle" font-size="22">Eastern tribunal</text>
<path d="M1510 380V215m0 5h110v65h-110" stroke="#7b7157" fill="none" stroke-width="6"/>
<text x="1260" y="190" font-size="19">Order’s standard · design not shown</text>
<path d="M280 570v160" stroke="#72583a" stroke-width="13"/>
${[0,1,2,3,4].map(i=>`<path d="m235 ${640+i*16} 100-45m-95 50 85-5" stroke="#9b7a4d" stroke-width="10"/>`).join('')}
<text x="230" y="790" font-size="22">Western preparation area</text><text x="230" y="825" font-size="18">Stake and unlit fuel</text>
<path d="M450 250h650M450 1000h650" stroke="#a28b60" stroke-width="47"/>
<text x="760" y="220" text-anchor="middle" font-size="22">Spectators’ galleries and benches</text>
<path d="M920 950h110" stroke="#bdc98f" stroke-width="25"/>
<text x="975" y="1055" text-anchor="middle" font-size="20">Entrance · side reconstructed</text>
<path d="M130 260v-60m-10 18 10-18 10 18" fill="none" stroke="#625b45" stroke-width="3"/><text x="120" y="188" font-size="19">N</text>`
fs.writeFileSync(new URL('templestowe-lists.svg',out),plate(1800,1300,'Templestowe · the enclosed lists','XLIII.4–6 · palisade, levelled rise, eastern tribunal and western preparation',body,[
'The tribunal is at the east; the prepared stake and unlit fuel are at the opposite end.',
'The enclosure adjoins the Preceptory on a gentle eminence. Its shape, proportions, entrance side, seating extent and exact measurements are not supplied.',
'Gallery, bench and tribunal details are schematic reconstruction. East/west relations follow the source; drawn distances are not a measured combat scale.'
]))
console.log('Wrote four source-led Templestowe plates')
