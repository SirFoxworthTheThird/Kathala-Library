// Editable source-led plates. No measured footprint or invented escape route.
import fs from 'node:fs'
const out=new URL('./map-originals/',import.meta.url)
const defs=`<defs><g id="tree"><circle r="30" fill="#82945f"/><circle cx="-15" cy="-12" r="23" fill="#a2af77"/><path d="M0 7v27m0-17-15-14m15 14L15 0" stroke="#626c48" stroke-width="4"/></g><pattern id="stone" width="55" height="30" patternUnits="userSpaceOnUse"><rect width="55" height="30" fill="#b3ac96"/><path d="M0 0h55v30H0Zm27 0v30" fill="none" stroke="#8e8875" stroke-width="2"/></pattern></defs>`
function plate(w,h,title,source,body,notes){return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs}<rect width="${w}" height="${h}" fill="#eee3cb"/><g font-family="Georgia,serif" fill="#382f25"><text x="65" y="65" font-size="35">${title}</text><text x="65" y="105" font-size="18">${source}</text>${body}<path d="M65 ${h-140}H${w-65}" stroke="#b9a57e"/>${notes.map((s,i)=>`<text x="65" y="${h-102+i*28}" font-size="16">${s}</text>`).join('')}</g></svg>`}
let body=`<rect x="70" y="155" width="1305" height="1060" rx="25" fill="#b7c18d"/>
<g fill="none" stroke="#97a271" stroke-width="3"><path d="M110 350q190-170 370-100M110 390q170-165 340-100M110 430q145-150 310-100M1070 1100q130-160 245-110M1050 1140q160-180 280-110"/></g>
<path d="M1360 175q-150 60-120 160t-55 100" fill="none" stroke="#82a3a5" stroke-width="21"/>
<text x="1110" y="190" font-size="18">Supplying rivulet</text>
<rect x="420" y="325" width="825" height="730" rx="45" fill="#89a6a6" stroke="#788f88" stroke-width="5"/>
<rect x="500" y="390" width="665" height="595" fill="#c1b697" stroke="url(#stone)" stroke-width="24"/>
${[[500,390],[1165,390],[500,985],[1165,985]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="48" fill="url(#stone)" stroke="#756f5e" stroke-width="5"/>`).join('')}
<rect x="730" y="535" width="210" height="240" fill="url(#stone)" stroke="#756f5e" stroke-width="10"/>
<circle cx="935" cy="535" r="27" fill="url(#stone)" stroke="#756f5e" stroke-width="4"/>
<text x="835" y="630" text-anchor="middle" font-size="25">Square keep</text><text x="835" y="665" text-anchor="middle" font-size="18">High main tower</text>
<rect x="580" y="435" width="440" height="65" fill="#ae9d7e" stroke="#7d7059" stroke-width="4"/>
<rect x="1045" y="465" width="65" height="355" fill="#ae9d7e" stroke="#7d7059" stroke-width="4"/>
<text x="800" y="470" text-anchor="middle" font-size="18">Lower buildings</text><text x="780" y="875" font-size="23">Inner court</text>
<text x="1185" y="675" font-size="18" transform="rotate(90 1185 675)">Lower eastern wall</text>
<text x="550" y="740" font-size="18" transform="rotate(-90 550 740)">Western wall</text>
<path d="M780 985h110" stroke="#c1b697" stroke-width="28"/>
<rect x="765" y="1080" width="150" height="100" fill="url(#stone)" stroke="#756f5e" stroke-width="8"/>
${[[765,1080],[915,1080],[765,1180],[915,1180]].map(([x,y])=>`<rect x="${x-17}" y="${y-17}" width="34" height="34" fill="url(#stone)" stroke="#756f5e" stroke-width="3"/>`).join('')}
<path d="M835 985v95" stroke="#8c7251" stroke-width="10" stroke-dasharray="10 8"/>
<text x="950" y="1120" font-size="20">Main gate barbican</text><text x="950" y="1152" font-size="17">Drawbridge alignment</text>
<rect x="255" y="615" width="125" height="150" fill="#c2b28d" stroke="#725b3e" stroke-width="10"/>
<path d="M500 680H380" stroke="#8c7251" stroke-width="7" stroke-dasharray="10 8"/>
<path d="M255 670v45" stroke="#c2b28d" stroke-width="15"/><path d="M500 655v50" stroke="#c1b697" stroke-width="28"/>
<text x="100" y="550" font-size="20">Separate postern outwork</text><text x="100" y="580" font-size="17">Palisade and outward sallyport</text>
<text x="410" y="800" font-size="17">Moat crossing</text><text x="555" y="680" font-size="18">Postern</text>
<path d="M835 1215v-35" stroke="#ae9e77" stroke-width="22"/>
${[[755,1200],[915,1200],[190,1000],[270,1090],[130,855],[180,730],[245,375],[350,285],[1350,640],[1320,825],[1260,1140]].map(([x,y])=>`<use href="#tree" x="${x}" y="${y}"/>`).join('')}
<text x="110" y="1175" font-size="20">Woodland approaches</text>
<path d="M130 260v-65m-10 18 10-18 10 18" fill="none" stroke="#625b45" stroke-width="3"/><text x="120" y="184" font-size="19">N</text>
<rect x="1410" y="155" width="320" height="1060" rx="12" fill="#dfd0ac" stroke="#b09c75"/>
<text x="1430" y="205" font-size="22">Woodland detail index</text><text x="1430" y="238" font-size="16">Positions are not geographic.</text>
<use href="#tree" x="1540" y="335"/><text x="1430" y="395" font-size="18">Oak: three arrow-flights</text><text x="1430" y="423" font-size="16">from the castle walls</text>
<use href="#tree" x="1540" y="585"/><text x="1430" y="645" font-size="18">The broad gathering tree</text><text x="1430" y="673" font-size="16">Half a mile from the castle</text>
<use href="#tree" x="1580" y="835"/><text x="1430" y="895" font-size="18">A tree to one side</text>
<path d="M1440 1030q100-25 250 20" fill="none" stroke="#af9b74" stroke-width="15"/><text x="1430" y="1090" font-size="18">Path beside the gathering</text>`
fs.writeFileSync(new URL('torquilstone.svg',out),plate(1800,1400,'Torquilstone · fortress and wooded approaches','XXI.25–30; XXV; XXVII.55,116; XXIX.17; XXX.17 · source-led relative geography',body,[
'Main-gate barbican and drawbridge are distinct from the fortified postern outwork and its moat crossing. Dashed alignments do not assert an open crossing.',
'Keep, buildings, walls and moat are ground-plan outlines. Their current condition belongs to the scene; outlines do not assert intact roofs or passable routes.',
'Dimensions, exact footprint, slopes, watercourse bends and all positions except stated east/west relations are reconstructed. No measured travel scale is assigned.'
]))
const panels=[
 ['The old hall',70,180,'Heavy Saxon pillars; windows toward the court'],
 ['The new hall',810,180,'Lighter pillars and a vaulted roof'],
 ['Reception apartment',1550,180,'Exact room shape and furnishings unspecified'],
 ['Furnished chamber',70,490,'Faded and damaged tapestry'],
 ['Low arched passage',810,490,'A confined internal route'],
 ['Corner chamber',1550,490,'Raised lattice within the room'],
 ['Small private apartment',70,800,'Table and cupboard; private doorway'],
 ['Postern passage',810,800,'Route toward the secondary exit'],
 ['Armoury and balcony',1550,800,'Lattice opens onto a projecting viewpoint'],
 ['Bedchamber',70,1110,'A room containing a bed'],
 ['Vaulted entrance',810,1110,'Passage just within the postern'],
 ['Vertical room-detail index',1550,1110,'Positions and floor numbers are unstated'],
]
body=panels.map(([title,x,y,note])=>`<g><rect x="${x}" y="${y}" width="680" height="280" fill="#c8b899" stroke="#7e6b50" stroke-width="10"/><text x="${x+30}" y="${y+44}" font-size="27">${title}</text><text x="${x+30}" y="${y+254}" font-size="20">${note}</text></g>`).join('')
for(const x of [230,440,650])for(const y of [285,355])body+=`<circle cx="${x}" cy="${y}" r="19" fill="url(#stone)" stroke="#877861" stroke-width="4"/>`
for(const x of [960,1160,1370])body+=`<circle cx="${x}" cy="310" r="13" fill="#aca083" stroke="#877861" stroke-width="3"/>`
body+=`<path d="M180 460h100m170 0h100" stroke="#889a94" stroke-width="9"/>
<path d="M110 565v140m50-140v140m50-140v140" stroke="#ac8978" stroke-width="25" stroke-dasharray="55 12"/>
<path d="M845 590h600m-600 90h600" stroke="#93836a" stroke-width="15"/>
<rect x="1915" y="570" width="195" height="105" fill="#b39778" stroke="#8a7458" stroke-width="5"/>
<path d="M1570 585h100v110h-100m25-110v110m25-110v110m25-110v110" fill="#b2a17e" stroke="#83745c" stroke-width="4"/>
<path d="M1550 595v85" stroke="#88a29e" stroke-width="10"/>
<text x="1690" y="640" font-size="19">Two or three steps to lattice</text>
<rect x="125" y="890" width="190" height="75" fill="#ab8d68" stroke="#82694b" stroke-width="4"/><rect x="540" y="870" width="155" height="105" fill="#ad9471" stroke="#82694b" stroke-width="4"/>
<path d="M1770 985v-65h220v65" stroke="#7f735e" stroke-width="8" fill="#c0b497"/><path d="M1820 920v-25h100v25" stroke="#88a29e" stroke-width="8" fill="none"/>
<text x="1770" y="1015" font-size="20">Room and adjoining balcony</text>
<rect x="170" y="1190" width="270" height="110" fill="#b19779" stroke="#82694b" stroke-width="5"/>
<path d="M845 1280q280-135 555 0m-555 50q280-135 555 0" fill="none" stroke="#93836a" stroke-width="13"/>
<text x="1600" y="1210" font-size="23">Downward: deep dungeon</text><text x="1600" y="1280" font-size="23">Upward: isolated turret</text>`
fs.writeFileSync(new URL('torquilstone-interior.svg',out),plate(2300,1600,'Torquilstone · distinct rooms and passages','XXI–XXXI · separate room details, not a measured composite footprint',body,[
'Each panel is a separate narrated place. Floor numbers, exact room connections and most dimensions are not supplied; blank gaps between panels are not corridors.',
'The old hall faces the court. The corner-room lattice is raised by two or three steps; its viewer remains in the room. The armoury balcony is a different viewpoint.',
'The dungeon lies below moat level; the isolated turret is reached by steep stairs. Furniture positions, pillar counts and room shapes are illustrative reconstruction; no invented escape doors.'
]))
body=`<rect x="220" y="225" width="1000" height="490" fill="#b2aa93" stroke="url(#stone)" stroke-width="22"/>
<path d="M650 715h110" stroke="#b2aa93" stroke-width="28"/>
<rect x="555" y="745" width="270" height="80" fill="#b1a180" stroke="#7a6e57" stroke-width="4"/><path d="M590 745v80m35-80v80m35-80v80m35-80v80m35-80v80m35-80v80m35-80v80" stroke="#7a6e57" stroke-width="3"/>
<text x="885" y="785" font-size="20">Stair upward and door</text>
<rect x="1030" y="335" width="170" height="215" fill="#908978" stroke="#686758" stroke-width="8"/>
<path d="M1045 350h140m-140 35h140m-140 35h140m-140 35h140m-140 35h140" stroke="#585c54" stroke-width="12"/>
<text x="970" y="600" font-size="20">Fire-grate and iron bars</text>
<path d="M350 225v65m0-65h65m95 0v65m0-65h65" stroke="#77908f" stroke-width="12" fill="none"/>
<text x="320" y="190" font-size="20">High loop-holes, beyond reach</text>
<g fill="none" stroke="#766e5b" stroke-width="5">${[335,425,515].map(x=>`<path d="M${x} 315v100" stroke-dasharray="9 5"/><ellipse cx="${x}" cy="435" rx="18" ry="10"/>`).join('')}</g>
<text x="320" y="500" font-size="20">Old chains and fetters</text>
<path d="M270 610q160-80 300 20t390-10" fill="none" stroke="#93998b" stroke-width="12" opacity=".45"/>
<text x="485" y="665" font-size="22">Damp pavement below moat level</text>`
fs.writeFileSync(new URL('torquilstone-dungeon.svg',out),plate(1450,1050,'Torquilstone · the deep dungeon','XXII.3–9 · a downward room detail, with no invented measured depth',body,[
'The floor is below ground and even below the moat. High loop-holes admit little light; a stair and locked door provide the narrated entrance.',
'Fire-grate, transverse bars and old fetters follow the first description. No fire, torture or injury is asserted by this initial plan.',
'Dimensions, stair side, grate placement, light direction and chain positions are reconstructed. This room is not placed at court level.'
]))
body=`<path d="M430 245a290 290 0 0 0 0 580l0-90a200 200 0 0 1 0-400Z" fill="#b8ae91" stroke="#81735b" stroke-width="10"/>
<path d="M435 320a215 215 0 1 0 0 430h495V320Z" fill="#c7b797" stroke="url(#stone)" stroke-width="18"/>
<path d="M220 490v90" stroke="#879f9b" stroke-width="16"/>
<path d="M210 495v80m-17-80v80m-17-80v80" stroke="#6c796d" stroke-width="4"/>
<text x="545" y="520" font-size="25">Small round-walled cell</text>
<path d="M930 535v95" stroke="#c7b797" stroke-width="26"/>
<rect x="970" y="500" width="235" height="190" fill="#b4a283" stroke="#82735a" stroke-width="6"/>
<path d="M990 525h195m-195 30h195m-195 30h195m-195 30h195m-195 30h195" stroke="#8b785c" stroke-width="4"/>
<text x="1000" y="460" font-size="21">Steep stair down</text>
<text x="505" y="795" font-size="19">Door and stair toward the main building</text>
<text x="135" y="200" font-size="23">Isolated bartisan</text><text x="135" y="230" font-size="18">Embrasures and a parapet above the court</text>
<path d="M140 410h25m-25 85h25m-10 85h25m10 80h25" stroke="#e6d8b9" stroke-width="24"/>
<text x="110" y="865" font-size="20">Lattice opening and parapet above the court</text>`
fs.writeFileSync(new URL('torquilstone-turret.svg',out),plate(1450,1080,'Torquilstone · isolated turret and bartisan','XXIV.3,18,22,42–48 · chamber, window and exposed parapet',body,[
'The chamber is reached by a steep stair. The bartisan detail shows the parapet outside its lattice, above the court.',
'Cell and bartisan shapes, stair direction, door/window sides and all proportions are reconstructed. No floor number or measured height is claimed.',
'Cell, lattice and parapet are separate positions within the raised chamber and its exterior bartisan.'
]))
body=`<rect x="210" y="275" width="1030" height="310" fill="#b8ad92" stroke="url(#stone)" stroke-width="20"/>
<path d="M210 275h150v-55h130v55h170v-55h130v55h170v-55h130v55h150" fill="url(#stone)" stroke="#807660" stroke-width="8"/>
<path d="M650 220v-75h150v75" fill="url(#stone)" stroke="#807660" stroke-width="8"/>
<text x="725" y="125" text-anchor="middle" font-size="20">Projecting stone pinnacle</text>
<text x="725" y="415" text-anchor="middle" font-size="25">Upper defensive position</text>
<text x="725" y="475" text-anchor="middle" font-size="20">Parapet above the gate and attackers</text>
<path d="M725 590v95m-12-20 12 20 12-20" fill="none" stroke="#8a7b5c" stroke-width="4" stroke-dasharray="8 6"/>
<text x="725" y="735" text-anchor="middle" font-size="22">Main-wall postern and moat crossing below</text>
<text x="725" y="780" text-anchor="middle" font-size="18">Use the parent ground plan for the threshold and raft.</text>`
fs.writeFileSync(new URL('torquilstone-postern-defence.svg',out),plate(1450,1000,'Torquilstone · above the main-wall postern','XXXI.20–37 · upper parapet detail, separate from the threshold below',body,[
'The defenders work the projecting stone above the two attackers. The raft and gate threshold are lower positions, not this parapet.',
'Parapet length, shape, pinnacle design and height are reconstructed. The source does not establish a floor number or an exact stair location.',
'The downward guide indicates relative elevation only; no ladder, corridor, stair or passable escape route is invented.'
]))
console.log('Wrote five source-led Torquilstone plates')
