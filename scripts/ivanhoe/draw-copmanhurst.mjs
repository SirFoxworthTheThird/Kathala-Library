import fs from 'node:fs'
const root=new URL('./map-originals/',import.meta.url)
const defs=`<defs><pattern id="logs" width="30" height="18" patternUnits="userSpaceOnUse"><rect width="30" height="18" fill="#92704f"/><path d="M0 3h30M0 16h30" stroke="#634e38" stroke-width="2"/></pattern><g id="tree"><circle r="30" fill="#82965d"/><circle cx="-15" cy="-10" r="23" fill="#9aaa73"/><path d="M0 4v25m0-15-15-14m15 14L15-1" stroke="#667049" stroke-width="4"/></g></defs>`
const plate=(title,source,body,notes)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">${defs}<rect width="1400" height="900" fill="#ede2c9"/><g font-family="Georgia,serif" fill="#382f26"><text x="65" y="65" font-size="35">${title}</text><text x="65" y="103" font-size="18">${source}</text>${body}<path d="M65 755H1335" stroke="#bca77d"/>${notes.map((s,i)=>`<text x="65" y="790+${i}" font-size="16">${s}</text>`).join('').replace(/y="790\+(\d+)"/g,(_,n)=>`y="${790+Number(n)*28}"`)}</g></svg>`
const trees=[[140,290],[165,560],[250,630],[1130,620],[1240,530],[1190,690],[190,700],[1050,680]]
let body=`<rect x="70" y="155" width="1260" height="555" rx="25" fill="#c4cf9b"/>
<g fill="none" stroke="#9da778" stroke-width="3"><path d="M90 560q220-95 420 25t760-30M90 595q220-95 420 25t760-30M90 630q220-95 420 25t760-30"/></g>
<path d="m300 290 70-105 170 30 90-55 180 45 105-30 125 70 210-5 45 90-110 75-180-36-190 60-160-45-210 35Z" fill="#aca994" stroke="#807e6a" stroke-width="4"/>
<g fill="none" stroke="#817e6b" stroke-width="3"><path d="m365 265 20-45m50 53 25-50m130 45 20-45m70 70 20-55m80 50 15-45m80 70 25-45m95 48 20-35m80 30 15-30"/></g>
<text x="650" y="205" font-size="23">Rock face with ivy, oak and holly</text>
<rect x="405" y="300" width="310" height="150" fill="url(#logs)" stroke="#65523c" stroke-width="6"/>
<path d="M380 300 560 245 740 300Z" fill="#9f9165" stroke="#756449" stroke-width="4"/>
<path d="M610 450h65" stroke="#c4cf9b" stroke-width="12"/><text x="430" y="354" font-size="23">The hut</text>
<path d="M750 385v105m-28-75h56" stroke="#6b533b" stroke-width="8"/>
<text x="650" y="570" font-size="17">Fir-stem cross by the door</text>
<path d="M545 705q-65-100 25-165t70-90" stroke="#b7a47a" stroke-width="25" fill="none"/>
<text x="305" y="670" font-size="20">Approach across the turf</text>
<ellipse cx="885" cy="360" rx="60" ry="26" fill="#8e9e99" stroke="#787f72" stroke-width="10"/>
<path d="M875 298q-15 35 10 58" stroke="#85aeb2" stroke-width="10" fill="none"/>
<path d="M900 380q80 50 15 100t80 110q55 35 80 85" stroke="#84a8a8" stroke-width="12" fill="none"/>
<text x="810" y="425" font-size="18">Spring and stone basin</text>
<rect x="1035" y="315" width="200" height="150" fill="#c7c3ad" stroke="#85816e" stroke-width="9"/>
<path d="M1048 327 1222 451M1048 451 1222 327" stroke="#9b9782" stroke-width="5"/>
<path d="M1035 390h200v75h-200Z" fill="#9f9a81" opacity=".45"/>
${[[1043,323],[1227,323],[1043,457],[1227,457]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="12" fill="#8f8b74"/>`).join('')}
<path d="M1120 465v28h36v-28" stroke="#817966" fill="#b5b09a" stroke-width="5"/>
<text x="1025" y="555" font-size="19">Partly roofless chapel</text><text x="1050" y="582" font-size="16">Sixteen by twelve feet</text>
${trees.map(([x,y])=>`<use href="#tree" x="${x}" y="${y}"/>`).join('')}`
fs.writeFileSync(new URL('copmanhurst.svg',root),plate('The woodland hermitage · clearing','XVI.8–12 · rock, hut, spring, ruined chapel and woodland approach',body,[
'Spring lies to the approaching traveller’s right; the ruined chapel stands beside it. Water runs down the slope into the wood.',
'Cliff shape, building positions, path bends, chapel entrance side and vegetation extent are reconstructed; compass direction is unstated.',
'Chapel footprint follows the source proportions. Its four corner supports, partial roof and small porch are schematic, not a surveyed ruin.'
]))
body=`<path d="m170 185 160-32 180 28 170-24 210 20 210-20 150 45" fill="none" stroke="#aaa58e" stroke-width="35"/>
<text x="570" y="150" font-size="19">Rock behind the hut</text>
<rect x="190" y="225" width="1020" height="465" rx="8" fill="#cbbb98" stroke="url(#logs)" stroke-width="20"/>
<path d="M660 690h110" stroke="#cbbb98" stroke-width="24"/>
<path d="M660 690V580m0 110a110 110 0 0 0 110-110" stroke="#8c7758" stroke-width="2" fill="none" stroke-dasharray="6 6"/>
<text x="660" y="732" font-size="19">Entrance</text>
<rect x="260" y="290" width="165" height="125" rx="17" fill="#a4a06e" stroke="#8a8059" stroke-width="4"/>
<path d="m275 310 120 70m-110 15 110-75m-100 15 85 45" stroke="#c1bd8a" stroke-width="8"/>
<text x="265" y="454" font-size="19">Bed of leaves</text>
<rect x="610" y="365" width="220" height="115" fill="url(#logs)" stroke="#6d553b" stroke-width="6"/>
<circle cx="555" cy="420" r="28" fill="url(#logs)" stroke="#6d553b" stroke-width="4"/><circle cx="890" cy="420" r="28" fill="url(#logs)" stroke="#6d553b" stroke-width="4"/>
<text x="600" y="530" font-size="18">Rough table and two stools</text>
<rect x="1070" y="300" width="120" height="160" fill="#aaa38d" stroke="#7f7863" stroke-width="7"/>
<path d="m1090 420 75-80m-65 0 60 85" stroke="#795a3d" stroke-width="12"/>
<text x="1065" y="500" font-size="18">Hearth</text>
<path d="M860 270v-45m-17 15h34" stroke="#74583c" stroke-width="7"/>
<rect x="900" y="267" width="66" height="22" fill="#bda781" stroke="#756147" stroke-width="3"/>
<text x="705" y="325" font-size="18">Oak crucifix and missal</text>
<text x="255" y="605" font-size="19">One room for shelter, meals and repose</text>`
fs.writeFileSync(new URL('copmanhurst-hut.svg',root),plate('The woodland hermitage · inside the hut','XVI.26–33 · furnishings in the first description of the room',body,[
'A single multifunctional room. The source supplies no exact dimensions, cardinal orientation or furniture positions.',
'Room shape, door swing, floor texture, hearth and furniture placement are interpretive. The hut leans against the rock.',
'Initial visible furnishings only. No separate stable, guest bedroom or connecting passage is established by the source.'
]))
console.log('Wrote Copmanhurst clearing and hut SVGs')
