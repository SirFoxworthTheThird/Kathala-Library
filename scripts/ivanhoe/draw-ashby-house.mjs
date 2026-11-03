import fs from 'node:fs'
const out=new URL('./map-originals/',import.meta.url)
const defs=`<defs><pattern id="paving" width="60" height="35" patternUnits="userSpaceOnUse"><rect width="60" height="35" fill="#b9af98"/><path d="M0 0h60v35H0ZM30 0v35" fill="none" stroke="#938b77" stroke-width="2"/></pattern><pattern id="cushions" width="65" height="40" patternUnits="userSpaceOnUse"><rect width="65" height="40" fill="#c0a976"/><rect x="5" y="5" width="55" height="30" rx="8" fill="#a97268" stroke="#87664c" stroke-width="2"/></pattern></defs>`
const plate=(title,source,body,notes)=>`<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1000" viewBox="0 0 1400 1000">${defs}<rect width="1400" height="1000" fill="#eee3cc"/><g font-family="Georgia,serif" fill="#392f25"><text x="65" y="65" font-size="34">${title}</text><text x="65" y="104" font-size="18">${source}</text>${body}<path d="M65 850H1335" stroke="#b8a17b"/>${notes.map((s,i)=>`<text x="65" y="${890+i*28}" font-size="16">${s}</text>`).join('')}</g></svg>`
let body=`<rect x="220" y="200" width="900" height="400" fill="#c5b79a" stroke="#78644a" stroke-width="14"/>
<path d="M690 200v260m0 70v70" stroke="#78644a" stroke-width="12"/><path d="M690 460h70m-70 0a70 70 0 0 1 70 70" fill="none" stroke="#9d8766" stroke-dasharray="5 5"/>
<text x="350" y="400" font-size="24">Dark entrance hall</text><text x="820" y="350" font-size="24">Side apartment</text>
<path d="M350 250h180v90H350Zm30 0v90m30-90v90m30-90v90m30-90v90m30-90v90" fill="#ae9370" stroke="#7c654a" stroke-width="3"/>
<text x="340" y="225" font-size="18">Stair to upper room</text>
<path d="M500 600h100" stroke="#c5b79a" stroke-width="18"/>
<rect x="220" y="630" width="900" height="140" fill="url(#paving)" stroke="#89775d" stroke-width="6"/>
<path d="M220 610v160m900-160v160m-900 0h360m100 0h440" fill="none" stroke="#89775d" stroke-width="10"/>
<path d="M580 770h100" stroke="#6d5339" stroke-width="9"/><text x="620" y="690" font-size="23">Paved court</text>
<text x="535" y="815" font-size="19">Entrance gate and wicket</text>
<rect x="1160" y="270" width="190" height="255" rx="8" fill="#dfcfad" stroke="#b19b73"/>
<text x="1180" y="310" font-size="17">Room-detail index</text><text x="1180" y="345" font-size="15">Position and floor</text><text x="1180" y="371" font-size="15">not established</text>`
fs.writeFileSync(new URL('ashby-house.svg',out),plate('The country lodging · lower level','X.66–70 · near Ashby, in the house of Isaac’s unnamed host',body,[
'Lower level: a dark entrance hall, an adjoining apartment, a paved court, and an entrance gate with a wicket.',
'Building shape, room sizes, orientation, stair position and court placement are reconstructed. This is not a surveyed town house.',
'The detail index does not assign an unknown room to this floor or invent a connecting door. Upper and lower levels share the building entrance.'
]))
body=`<rect x="220" y="200" width="900" height="400" fill="#cfbf9b" stroke="#78644a" stroke-width="14"/>
<path d="M245 225h850v350H245Z" fill="none" stroke="url(#cushions)" stroke-width="48"/>
<text x="670" y="180" text-anchor="middle" font-size="18">Cushions along a low surrounding platform</text>
<rect x="350" y="250" width="180" height="90" fill="#ae9370" stroke="#7c654a" stroke-width="3"/>
<path d="M380 250v90m30-90v90m30-90v90m30-90v90m30-90v90" stroke="#7c654a" stroke-width="3"/>
<text x="340" y="380" font-size="18">Stair down to the hall</text>
<rect x="690" y="380" width="210" height="105" rx="5" fill="#554134" stroke="#b4aa91" stroke-width="4"/>
<text x="650" y="535" font-size="18">Small inlaid table</text>
<text x="390" y="690" font-size="22">The upper apartment</text><text x="390" y="725" font-size="18">A small room with rich furnishings; no chairs or stools</text>`
fs.writeFileSync(new URL('ashby-house-upper.svg',out),plate('The country lodging · upper apartment','X.29–66 · cushions and low platform; descent established at X.66',body,[
'The host’s country house is near Ashby. It is temporary accommodation for Isaac, Rebecca and their retinue.',
'Room shape, scale, orientation, stair position and the furniture arrangement are reconstructed. The low platform is seating, not another storey.',
'The source establishes a stair descent, but provides no measured footprint for either level.'
]))
body=`<rect x="220" y="200" width="900" height="400" fill="#cbbb97" stroke="#78644a" stroke-width="14"/>
<rect x="870" y="270" width="180" height="230" rx="8" fill="#ad8275" stroke="#78644a" stroke-width="6"/><rect x="895" y="288" width="130" height="55" rx="18" fill="url(#cushions)"/>
<text x="885" y="550" font-size="21">Curtained couch</text>
<path d="M855 255h215m-215 0v255m215-255v255" stroke="#8b5f58" stroke-width="9"/>
<rect x="335" y="300" width="250" height="70" fill="url(#cushions)" stroke="#9c845f" stroke-width="3"/><text x="350" y="415" font-size="20">Cushioned seating</text>
<path d="M565 600h120" stroke="#b18b78" stroke-width="18"/><text x="460" y="660" font-size="19">Door concealed by tapestry</text>
<text x="320" y="730" font-size="21">Floor and position within the house unknown</text>`
fs.writeFileSync(new URL('ashby-house-sickroom.svg',out),plate('The patient’s room · lodging near Ashby','XXVIII.17–27 · a separate room detail with unestablished floor',body,[
'Cushions, the couch curtain and tapestry-hidden doorway follow the room description. No exact dimensions or compass direction are supplied.',
'Furniture and entrance positions are reconstructed. This room is not silently identified with Isaac’s earlier upper apartment.',
'The parent-map detail index provides navigation only; it is not a claimed corridor or route between floors.'
]))
console.log('Wrote three country-house plates')
